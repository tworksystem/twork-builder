/**
 * Migrates:
 * - `useBlockProps( { ... } )` → `useStableBlockProps( () => ( { ... } ), [deps] )`
 * - `useBlockProps()` → `useStableBlockProps( () => ( {} ), [] )`
 *
 * Skips: useBlockProps( variable ), objects with top-level spread.
 *
 * Run: node scripts/migrate-stable-block-props.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire( import.meta.url );
const parser = require( '@babel/parser' );
const traverse = require( '@babel/traverse' ).default;
const generate = require( '@babel/generator' ).default;

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );
const SRC = path.join( __dirname, '..', 'src' );

const IGNORE_IDENT = new Set( [
	'__',
	'_n',
	'_nx',
	'_x',
	'sprintf',
	'console',
	'Math',
	'JSON',
	'Object',
	'Array',
	'String',
	'Number',
	'Boolean',
	'Date',
	'parseInt',
	'parseFloat',
	'isNaN',
	'encodeURI',
	'decodeURI',
	'React',
	'Fragment',
] );

function walk( dir ) {
	const out = [];
	for ( const ent of fs.readdirSync( dir, { withFileTypes: true } ) ) {
		const p = path.join( dir, ent.name );
		if ( ent.isDirectory() ) {
			out.push( ...walk( p ) );
		} else if ( ent.name === 'edit.js' ) {
			out.push( p );
		}
	}
	return out;
}

function collectDeps( astNode, scope ) {
	const ids = new Set();
	traverse(
		astNode,
		{
			ReferencedIdentifier( path ) {
				const name = path.node.name;
				if ( IGNORE_IDENT.has( name ) ) {
					return;
				}
				if ( ! path.scope.hasBinding( name ) ) {
					return;
				}
				ids.add( name );
			},
		},
		scope
	);
	return [ ...ids ].sort();
}

function parseCode( code ) {
	return parser.parse( code, {
		sourceType: 'module',
		allowAwaitOutsideFunction: true,
		allowReturnOutsideFunction: true,
		plugins: [
			'jsx',
			'importMeta',
			'optionalChaining',
			'nullishCoalescingOperator',
			'classProperties',
			'classPrivateProperties',
			'classPrivateMethods',
			'decorators-legacy',
			'objectRestSpread',
			'functionBind',
			'exportDefaultFrom',
			'exportNamespaceFrom',
			'dynamicImport',
			'topLevelAwait',
			'numericSeparator',
		],
		tokens: true,
		errorRecovery: true,
	} );
}

function hasTopLevelSpread( obj ) {
	return obj.properties.some( ( p ) => p.type === 'SpreadElement' );
}

function removeUseBlockPropsImport( code ) {
	if ( ! code.includes( 'useBlockProps' ) ) {
		return code;
	}
	try {
		const ast = parseCode( code );
		let changed = false;
		traverse( ast, {
			ImportDeclaration( path ) {
				if ( path.node.source.value !== '@wordpress/block-editor' ) {
					return;
				}
				const before = path.node.specifiers.length;
				path.node.specifiers = path.node.specifiers.filter( ( s ) => {
					if (
						s.type === 'ImportSpecifier' &&
						s.imported.name === 'useBlockProps'
					) {
						return false;
					}
					return true;
				} );
				if ( path.node.specifiers.length !== before ) {
					changed = true;
				}
				if ( path.node.specifiers.length === 0 ) {
					path.remove();
				}
			},
		} );
		if ( ! changed ) {
			return code;
		}
		return generate( ast, { retainLines: true, comments: true } ).code;
	} catch ( e ) {
		console.warn( 'Import cleanup failed:', e.message );
		return code;
	}
}

function processFile( filePath ) {
	let code = fs.readFileSync( filePath, 'utf8' );
	if ( ! code.includes( 'useBlockProps(' ) ) {
		return false;
	}

	let ast;
	try {
		ast = parseCode( code );
	} catch ( e ) {
		console.warn( 'Parse skip:', filePath, e.message );
		return false;
	}

	const replacements = [];

	traverse( ast, {
		CallExpression( path ) {
			const c = path.node.callee;
			if ( c.type !== 'Identifier' || c.name !== 'useBlockProps' ) {
				return;
			}
			const args = path.node.arguments;
			if ( args.length === 0 ) {
				replacements.push( {
					kind: 'empty',
					callStart: path.node.start,
					callEnd: path.node.end,
				} );
				return;
			}
			if ( args.length !== 1 ) {
				return;
			}
			const arg = args[ 0 ];
			if ( arg.type !== 'ObjectExpression' ) {
				return;
			}
			if ( hasTopLevelSpread( arg ) ) {
				return;
			}
			const start = arg.start;
			const end = arg.end;
			if ( start == null || end == null ) {
				return;
			}
			const deps = collectDeps( arg, path.scope );
			const depsStr = deps.length ? deps.join( ', ' ) : '';
			replacements.push( {
				kind: 'object',
				callStart: path.node.start,
				callEnd: path.node.end,
				objStart: start,
				objEnd: end,
				depsStr,
			} );
		},
	} );

	if ( replacements.length === 0 ) {
		return false;
	}

	replacements.sort( ( a, b ) => b.callStart - a.callStart );

	let out = code;
	for ( const r of replacements ) {
		let newCall;
		if ( r.kind === 'empty' ) {
			newCall = 'useStableBlockProps( () => ( {} ), [] )';
		} else {
			const objText = code.slice( r.objStart, r.objEnd );
			const inner = `() => ( ${ objText } ), [ ${ r.depsStr } ]`;
			newCall = `useStableBlockProps( ${ inner } )`;
		}
		out = out.slice( 0, r.callStart ) + newCall + out.slice( r.callEnd );
	}

	if ( out === code ) {
		return false;
	}

	if ( ! out.includes( "from '@twork-builder/editor-utils'" ) ) {
		const utilsImport =
			"import { useStableBlockProps } from '@twork-builder/editor-utils';\n";
		const i18n = out.indexOf( "from '@wordpress/i18n'" );
		if ( i18n !== -1 ) {
			const lineEnd = out.indexOf( '\n', i18n );
			out =
				out.slice( 0, lineEnd + 1 ) +
				utilsImport +
				out.slice( lineEnd + 1 );
		} else {
			out = utilsImport + out;
		}
	}

	out = removeUseBlockPropsImport( out );

	fs.writeFileSync( filePath, out, 'utf8' );
	return true;
}

function main() {
	const files = walk( SRC );
	let n = 0;
	const failed = [];
	for ( const f of files ) {
		try {
			if ( processFile( f ) ) {
				n++;
				console.log( 'Updated:', path.relative( SRC, f ) );
			}
		} catch ( e ) {
			failed.push( { f, err: e.message } );
		}
	}
	console.log( 'Total updated:', n );
	if ( failed.length ) {
		console.warn( 'Errors:', failed );
	}
}

main();
