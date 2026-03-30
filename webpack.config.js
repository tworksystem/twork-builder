/**
 * WordPress Block Editor Build Configuration
 *
 * Extends the default @wordpress/scripts webpack config with custom settings.
 *
 * Note: Sass deprecation warnings are harmless and will be resolved when
 * @wordpress/scripts updates to the modern Sass API.
 *
 * Memory: Terser runs with parallel: false to reduce peak heap during build.
 * Use NODE_OPTIONS=--max-old-space-size=8192 if the build still hits OOM.
 */

const path = require( 'path' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,

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
