/**
 * WordPress Block Editor Build Configuration
 * 
 * Extends the default @wordpress/scripts webpack config with custom settings.
 * 
 * Note: Sass deprecation warnings are harmless and will be resolved when
 * @wordpress/scripts updates to the modern Sass API.
 */

const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
    ...defaultConfig,
    
    // Optimization settings for better caching and performance
    optimization: {
        ...defaultConfig.optimization,
        // Ensure consistent chunk IDs for better long-term caching
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
    },

    // Performance hints - adjust thresholds as needed
    performance: {
        ...defaultConfig.performance,
        hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
        maxAssetSize: 512000, // 500kb per asset
        maxEntrypointSize: 512000, // 500kb per entry point
    },
};
