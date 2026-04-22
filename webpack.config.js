/**
 * WordPress Block Editor Build Configuration
 *
 * Extends the default @wordpress/scripts webpack config with custom settings.
 *
 * Sass loader is configured for modern API + deprecation silencing so
 * project builds stay clean while gradually migrating legacy Sass patterns.
 *
 * Memory: Terser runs with parallel: false to reduce peak heap during build.
 * Use NODE_OPTIONS=--max-old-space-size=8192 if the build still hits OOM.
 *
 * PHP (render.php): @wordpress/scripts copies PHP under src/ when WP_COPY_PHP_FILES_TO_DIST=1
 * (see package.json `build` script) or when paths are listed from block.json `render`. Both are fine;
 * the env flag guarantees render.php lands in build/ for dynamic blocks.
 */

const path = require( 'path' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

/**
 * Single-emission global stylesheet (shared utility classes, etc.).
 * Builds to `build/global.css` alongside block bundles.
 *
 * @wordpress/scripts uses `entry` as a *function* that returns entry points; merge must preserve that.
 */
const globalStyleEntry = path.resolve( __dirname, 'src/global.scss' );

function mergeGlobalWebpackEntry( entry ) {
	if ( typeof entry === 'function' ) {
		return ( ...args ) => {
			const points = entry( ...args );
			if (
				points &&
				typeof points === 'object' &&
				! Array.isArray( points )
			) {
				return { ...points, global: globalStyleEntry };
			}
			return points;
		};
	}
	if ( entry && typeof entry === 'object' && ! Array.isArray( entry ) ) {
		return { ...entry, global: globalStyleEntry };
	}
	return { global: globalStyleEntry };
}

function patchSassLoaderOptions( rules = [] ) {
	return rules.map( ( rule ) => {
		if ( rule && Array.isArray( rule.use ) ) {
			return {
				...rule,
				use: rule.use.map( ( useEntry ) => {
					if (
						! useEntry ||
						typeof useEntry !== 'object' ||
						typeof useEntry.loader !== 'string' ||
						! useEntry.loader.includes( 'sass-loader' )
					) {
						return useEntry;
					}

					return {
						...useEntry,
						options: {
							...( useEntry.options || {} ),
							implementation: require( 'sass' ),
							api: 'modern',
							sassOptions: {
								...( useEntry.options &&
								useEntry.options.sassOptions
									? useEntry.options.sassOptions
									: {} ),
								silenceDeprecations: [
									'legacy-js-api',
									'import',
								],
							},
						},
					};
				} ),
			};
		}

		if ( rule && Array.isArray( rule.oneOf ) ) {
			return {
				...rule,
				oneOf: patchSassLoaderOptions( rule.oneOf ),
			};
		}

		return rule;
	} );
}

const patchedModule = defaultConfig.module
	? {
			...defaultConfig.module,
			rules: patchSassLoaderOptions( defaultConfig.module.rules || [] ),
	  }
	: defaultConfig.module;

module.exports = {
	...defaultConfig,
	entry: mergeGlobalWebpackEntry( defaultConfig.entry ),
	module: patchedModule,

	resolve: {
		...defaultConfig.resolve,
		alias: {
			...( defaultConfig.resolve && defaultConfig.resolve.alias
				? defaultConfig.resolve.alias
				: {} ),
			'@twork-builder/editor-utils': path.resolve(
				__dirname,
				'src/editor-utils/block-editor-performance.js'
			),
		},
	},

	// Optimization settings for better caching and performance
	optimization: {
		...defaultConfig.optimization,
		// Ensure consistent chunk IDs for better long-term caching
		moduleIds: 'deterministic',
		chunkIds: 'deterministic',
		// Lower memory use: single-threaded Terser (avoids OOM on large block sets)
		minimizer: [
			new TerserPlugin( {
				parallel: false,
				terserOptions: {
					output: { comments: /translators:/i },
					compress: { passes: 2 },
					mangle: { reserved: [ '__', '_n', '_nx', '_x' ] },
				},
				extractComments: false,
			} ),
		],
	},

	// Performance hints - adjust thresholds as needed
	performance: {
		...defaultConfig.performance,
		hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
		maxAssetSize: 512000, // 500kb per asset
		maxEntrypointSize: 512000, // 500kb per entry point
	},
};
