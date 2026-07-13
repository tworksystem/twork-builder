/**
 * WordPress Block Editor Build Configuration
 *
 * Extends @wordpress/scripts with twork-builder aliases and global styles.
 */

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

const globalStyleEntry = path.resolve(__dirname, 'src/global.scss');

function mergeGlobalWebpackEntry(entry) {
	if (typeof entry === 'function') {
		return (...args) => {
			const points = entry(...args);
			if (points && typeof points === 'object' && !Array.isArray(points)) {
				return { ...points, global: globalStyleEntry };
			}
			return points;
		};
	}
	if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
		return { ...entry, global: globalStyleEntry };
	}
	return { global: globalStyleEntry };
}

function patchSassLoaderOptions(rules = []) {
	return rules.map((rule) => {
		if (rule && Array.isArray(rule.use)) {
			return {
				...rule,
				use: rule.use.map((useEntry) => {
					if (
						!useEntry ||
						typeof useEntry !== 'object' ||
						typeof useEntry.loader !== 'string' ||
						!useEntry.loader.includes('sass-loader')
					) {
						return useEntry;
					}

					return {
						...useEntry,
						options: {
							...(useEntry.options || {}),
							implementation: require('sass'),
							api: 'modern',
							sassOptions: {
								...(useEntry.options?.sassOptions || {}),
								silenceDeprecations: ['legacy-js-api', 'import'],
							},
						},
					};
				}),
			};
		}

		if (rule && Array.isArray(rule.oneOf)) {
			return {
				...rule,
				oneOf: patchSassLoaderOptions(rule.oneOf),
			};
		}

		return rule;
	});
}

const patchedModule = defaultConfig.module
	? {
			...defaultConfig.module,
			rules: patchSassLoaderOptions(defaultConfig.module.rules || []),
	  }
	: defaultConfig.module;

module.exports = {
	...defaultConfig,
	entry: mergeGlobalWebpackEntry(defaultConfig.entry),
	module: patchedModule,
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...(defaultConfig.resolve?.alias || {}),
			'@twork-builder/editor-utils': path.resolve(
				__dirname,
				'src/editor-utils/block-editor-performance.js'
			),
			'@twork-builder/shared': path.resolve( __dirname, 'src/shared' ),
		},
	},
	optimization: {
		...defaultConfig.optimization,
		moduleIds: 'deterministic',
		chunkIds: 'deterministic',
		minimizer: [
			new TerserPlugin({
				parallel: false,
				terserOptions: {
					output: { comments: /translators:/i },
					compress: { passes: 2 },
					mangle: { reserved: ['__', '_n', '_nx', '_x'] },
				},
				extractComments: false,
			}),
		],
	},
	performance: {
		...defaultConfig.performance,
		hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
		maxAssetSize: 512000,
		maxEntrypointSize: 512000,
	},
};
