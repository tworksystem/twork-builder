#!/usr/bin/env node
/**
 * Save-markup parity gate for the recovered laparo legacy blocks.
 *
 * Runs each block's shipped bundle and its rebuilt bundle inside a VM with the
 * same stubbed `window.wp.*` / JSX-runtime globals, calls `save()` with the
 * block.json defaults plus mutated fixtures, and diffs the serialized element
 * trees. Identical trees mean existing posts still validate after the rebuild.
 *
 * Usage: node scripts/verify-save-parity.mjs <pristine-build-dir> [slug...]
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import vm from 'node:vm';

const ROOT = resolve( import.meta.dirname, '..' );
const NEW_BUILD = process.env.NEW_BUILD_DIR
	? resolve( process.env.NEW_BUILD_DIR )
	: join( ROOT, 'build' );

const FRAGMENT = Symbol.for( 'stub.Fragment' );

function componentName( type ) {
	if ( typeof type === 'string' ) return type;
	if ( type === FRAGMENT ) return '<>';
	if ( type && type.__stubName ) return type.__stubName;
	if ( typeof type === 'function' ) return `fn:${ type.name || 'anon' }`;
	return String( type );
}

/** Marks a stub component so the serializer can name it stably. */
function stubComponent( name ) {
	const fn = () => null;
	fn.__stubName = name;
	return fn;
}

function makeElement( type, props ) {
	return { __el: true, type, props: props || {} };
}

function serialize( node, depth = 0 ) {
	if ( node === null || node === undefined || node === false || node === true ) {
		return String( node );
	}
	if ( Array.isArray( node ) ) {
		return node.map( ( n ) => serialize( n, depth ) ).join( '\n' );
	}
	if ( typeof node !== 'object' ) return JSON.stringify( node );
	if ( ! node.__el ) return JSON.stringify( node );

	const pad = '  '.repeat( depth );
	const { children, ...rest } = node.props;
	const props = Object.keys( rest )
		.map( ( k ) => `${ k }=${ JSON.stringify( normalizeValue( rest[ k ] ) ) }` )
		.join( ' ' );

	let out = `${ pad }<${ componentName( node.type ) }${ props ? ' ' + props : '' }>`;
	if ( children !== undefined ) {
		out += '\n' + serialize( children, depth + 1 );
	}
	return out;
}

function normalizeValue( v ) {
	if ( typeof v === 'function' ) return '[fn]';
	if ( v && typeof v === 'object' && v.__el ) return '[element]';
	return v;
}

/** Minimal deterministic stand-ins; both bundles see the exact same ones. */
function makeSandbox( capture ) {
	const jsx = ( type, props ) => makeElement( type, props );
	const useBlockProps = ( props ) => ( { ...( props || {} ) } );
	useBlockProps.save = ( props ) => ( { ...( props || {} ) } );

	const RichText = stubComponent( 'RichText' );
	RichText.Content = stubComponent( 'RichText.Content' );
	const InnerBlocks = stubComponent( 'InnerBlocks' );
	InnerBlocks.Content = stubComponent( 'InnerBlocks.Content' );

	const components = new Proxy(
		{},
		{
			get: ( target, prop ) => {
				if ( typeof prop !== 'string' ) return undefined;
				if ( ! target[ prop ] ) target[ prop ] = stubComponent( prop );
				return target[ prop ];
			},
		}
	);

	const win = {
		React: { createElement: jsx, Fragment: FRAGMENT, useMemo: ( f ) => f() },
		ReactJSXRuntime: { jsx, jsxs: jsx, Fragment: FRAGMENT },
		wp: {
			blocks: {
				registerBlockType: ( name, settings ) =>
					capture.push( { name, settings } ),
				createBlock: ( name, attrs ) => ( { name, attrs } ),
			},
			element: {
				createElement: jsx,
				Fragment: FRAGMENT,
				useMemo: ( f ) => f(),
				useState: ( v ) => [ v, () => {} ],
				useEffect: () => {},
				useRef: () => ( { current: null } ),
				useCallback: ( f ) => f,
				RawHTML: stubComponent( 'RawHTML' ),
			},
			blockEditor: {
				useBlockProps,
				RichText,
				InnerBlocks,
				InspectorControls: stubComponent( 'InspectorControls' ),
				BlockControls: stubComponent( 'BlockControls' ),
				MediaUpload: stubComponent( 'MediaUpload' ),
				MediaUploadCheck: stubComponent( 'MediaUploadCheck' ),
				URLInputButton: stubComponent( 'URLInputButton' ),
				PanelColorSettings: stubComponent( 'PanelColorSettings' ),
				useInnerBlocksProps: Object.assign(
					( props ) => ( { ...( props || {} ) } ),
					{ save: ( props ) => ( { ...( props || {} ) } ) }
				),
			},
			components,
			i18n: {
				__: ( s ) => s,
				_x: ( s ) => s,
				_n: ( s ) => s,
				sprintf: ( s ) => s,
			},
			data: {
				useSelect: () => undefined,
				useDispatch: () => ( {} ),
				select: () => ( {} ),
			},
			hooks: { addFilter: () => {}, applyFilters: ( n, v ) => v },
			apiFetch: () => Promise.resolve( {} ),
			serverSideRender: stubComponent( 'ServerSideRender' ),
		},
	};
	win.window = win;
	win.globalThis = win;
	win.self = win;
	win.document = {
		createElement: () => ( { style: {}, setAttribute: () => {} } ),
		addEventListener: () => {},
		querySelectorAll: () => [],
	};
	return win;
}

function loadBundle( file ) {
	const capture = [];
	const sandbox = makeSandbox( capture );
	vm.createContext( sandbox );
	try {
		new vm.Script( readFileSync( file, 'utf8' ), { filename: file } ).runInContext(
			sandbox,
			{ timeout: 10000 }
		);
	} catch ( err ) {
		return { error: `${ err.name }: ${ err.message }` };
	}
	if ( ! capture.length ) return { error: 'no registerBlockType call' };
	return { registrations: capture };
}

/** Attribute fixtures: defaults, then every attribute flipped to a probe value. */
function fixtures( meta ) {
	const attrs = meta.attributes || {};
	const defaults = {};
	for ( const [ key, def ] of Object.entries( attrs ) ) {
		defaults[ key ] = def.default !== undefined ? def.default : probe( def.type, key );
	}

	const cases = [ { label: 'defaults', attrs: defaults } ];
	for ( const [ key, def ] of Object.entries( attrs ) ) {
		cases.push( {
			label: `probe:${ key }`,
			attrs: { ...defaults, [ key ]: probe( def.type, key ) },
		} );
	}
	return cases;
}

function probe( type, key ) {
	switch ( type ) {
		case 'boolean':
			return false;
		case 'number':
			return 7;
		case 'array':
			return [ { label: `${ key }-a` }, { label: `${ key }-b` } ];
		case 'object':
			return { [ key ]: 'probe' };
		default:
			return `probe-${ key }`;
	}
}

function runSave( settings, attrs ) {
	if ( typeof settings.save !== 'function' ) return 'NO_SAVE_FN';
	try {
		return serialize(
			settings.save( { attributes: attrs, innerBlocks: [] } )
		);
	} catch ( err ) {
		return `THREW ${ err.name }: ${ err.message }`;
	}
}

function main() {
	const [ pristineArg, ...only ] = process.argv.slice( 2 );
	if ( ! pristineArg ) {
		console.error(
			'usage: node scripts/verify-save-parity.mjs <pristine-build-dir> [slug...]'
		);
		return 2;
	}
	const pristine = resolve( pristineArg );

	const slugs = only.length
		? only
		: readdirSync( pristine ).filter( ( n ) =>
				existsSync( join( pristine, n, 'index.js' ) )
		  );

	const results = [];
	for ( const slug of slugs.sort() ) {
		const oldFile = join( pristine, slug, 'index.js' );
		const newFile = join( NEW_BUILD, slug, 'index.js' );
		if ( ! existsSync( newFile ) ) {
			results.push( { slug, status: 'MISSING_NEW_BUILD' } );
			continue;
		}

		const oldB = loadBundle( oldFile );
		const newB = loadBundle( newFile );
		if ( oldB.error ) {
			results.push( { slug, status: 'OLD_LOAD_FAIL', detail: oldB.error } );
			continue;
		}
		if ( newB.error ) {
			results.push( { slug, status: 'NEW_LOAD_FAIL', detail: newB.error } );
			continue;
		}

		const oldReg = oldB.registrations[ 0 ];
		const newReg = newB.registrations[ 0 ];
		if ( oldReg.name !== newReg.name ) {
			results.push( {
				slug,
				status: 'NAME_MISMATCH',
				detail: `${ oldReg.name } vs ${ newReg.name }`,
			} );
			continue;
		}

		const meta = JSON.parse(
			readFileSync( join( pristine, slug, 'block.json' ), 'utf8' )
		);

		let mismatch = null;
		for ( const fixture of fixtures( meta ) ) {
			const a = runSave( oldReg.settings, fixture.attrs );
			const b = runSave( newReg.settings, fixture.attrs );
			if ( a !== b ) {
				mismatch = { fixture: fixture.label, old: a, new: b };
				break;
			}
		}

		results.push(
			mismatch
				? { slug, status: 'SAVE_DIFF', detail: mismatch }
				: { slug, status: 'PASS', cases: fixtures( meta ).length }
		);
	}

	const pass = results.filter( ( r ) => r.status === 'PASS' );
	const fail = results.filter( ( r ) => r.status !== 'PASS' );

	for ( const r of fail ) {
		console.log( `\n✗ ${ r.slug } — ${ r.status }` );
		if ( r.detail && r.detail.fixture ) {
			console.log( `  fixture: ${ r.detail.fixture }` );
			console.log( `  --- shipped ---\n${ r.detail.old }` );
			console.log( `  --- rebuilt ---\n${ r.detail.new }` );
		} else if ( r.detail ) {
			console.log( `  ${ r.detail }` );
		}
	}

	console.log(
		`\n${ JSON.stringify( {
			gate: 'save-parity',
			total: results.length,
			pass: pass.length,
			fail: fail.length,
			failing: fail.map( ( r ) => `${ r.slug }:${ r.status }` ),
		} ) }`
	);

	return fail.length ? 1 : 0;
}

process.exit( main() );
