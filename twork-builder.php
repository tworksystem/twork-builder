<?php

/**
 * Plugin Name:       Twork Builder
 * Plugin URI:        https://www.tworksystem.com/twork-builder
 * Description:       General Company Page Builder Blocks for Twork Ecosystem.
 * Version:           1.0.0
 * Author:            T-Work System Co., Ltd.
 * Author URI:        https://www.tworksystem.com
 * Text Domain:       twork-builder
 * Domain Path:       /languages
 * Requires at least: 6.0
 * Requires PHP:      7.4
 *
 * @package           TworkBuilder
 */

// Security: Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/** Define Constants */
define('TWORK_BUILDER_VERSION', '1.0.0');
define('TWORK_BUILDER_PATH', plugin_dir_path(__FILE__));
define('TWORK_BUILDER_URL', plugin_dir_url(__FILE__));

/**
 * 1. Register custom block category for Twork Builder.
 * Places the category at the top of the block inserter panel.
 */
function twork_builder_register_category($categories)
{
    // Use array_unshift to add category at the beginning (top of inserter)
    array_unshift(
        $categories,
        array(
            'slug' => 'twork-builder',
            'title' => __('Twork Builder Blocks', 'twork-builder'),
            'icon' => 'admin-site-alt3',
        )
    );
    
    return $categories;
}

add_filter('block_categories_all', 'twork_builder_register_category', 10, 1);

/**
 * 2. Enqueue Frontend Assets
 * Enqueues all necessary CSS and JavaScript for blocks.
 * All scripts use pure JavaScript - no external library dependencies.
 */
function twork_builder_enqueue_assets()
{
    // Services Grid initialization script (Pure JavaScript)
    wp_enqueue_script(
        'twork-services-grid-init',
        TWORK_BUILDER_URL . 'assets/js/services-grid-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Team Members Grid initialization script (Pure JavaScript)
    wp_enqueue_script(
        'twork-team-members-init',
        TWORK_BUILDER_URL . 'assets/js/team-members-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Font Awesome for icons (optional - only if not already loaded by theme)
    if (!wp_style_is('font-awesome', 'enqueued')) {
        wp_enqueue_style(
            'font-awesome',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
            array(),
            '6.5.2'
        );
    }
}

add_action('wp_enqueue_scripts', 'twork_builder_enqueue_assets', 5); // Priority 5 to load early

/**
 * 2b. Enqueue Editor Assets
 * Enqueues Font Awesome and other assets needed in the Gutenberg editor.
 */
function twork_builder_enqueue_editor_assets()
{
    // Font Awesome for icons in editor (optional - only if not already loaded)
    if (!wp_style_is('font-awesome', 'enqueued')) {
        wp_enqueue_style(
            'font-awesome',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
            array(),
            '6.5.2'
        );
    }
}

add_action('enqueue_block_editor_assets', 'twork_builder_enqueue_editor_assets');

/**
 * 3. Initialize Blocks.
 * Registers all blocks from the /build directory with comprehensive error handling.
 */
function twork_builder_init_blocks()
{
    // Early exit if register_block_type is not available
    if (!function_exists('register_block_type')) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('Twork Builder: register_block_type function not available');
        }
        return;
    }

    $blocks_path = TWORK_BUILDER_PATH . 'build/';

    // Check if build directory exists
    if (!is_dir($blocks_path)) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('Twork Builder: Build directory does not exist: ' . $blocks_path);
        }
        // Don't break the site if build directory is missing
        return;
    }

    // Get block folders with error handling
    $block_folders = @scandir($blocks_path);
    if ($block_folders === false) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('Twork Builder: Failed to scan build directory: ' . $blocks_path);
        }
        return;
    }

    $block_folders = array_diff($block_folders, array('..', '.', 'images'));

    if (empty($block_folders)) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('Twork Builder: No block folders found in build directory');
        }
        return;
    }

    $registered_count = 0;
    $failed_count = 0;

    foreach ($block_folders as $folder) {
        $block_dir = $blocks_path . $folder;
        
        // Skip if not a directory
        if (!is_dir($block_dir)) {
            continue;
        }

        // Check if block.json exists and is readable
        $block_json = $block_dir . '/block.json';
        if (!file_exists($block_json) || !is_readable($block_json)) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('Twork Builder: block.json not found or not readable: ' . $block_json);
            }
            $failed_count++;
            continue;
        }

        // Validate block.json is valid JSON
        $block_json_content = @file_get_contents($block_json);
        if ($block_json_content === false) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('Twork Builder: Failed to read block.json for ' . $folder);
            }
            $failed_count++;
            continue;
        }

        $block_data = json_decode($block_json_content, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('Twork Builder: Invalid JSON in block.json for ' . $folder . ': ' . json_last_error_msg());
            }
            $failed_count++;
            continue;
        }

        // Check if block has required name attribute
        if (empty($block_data['name'])) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('Twork Builder: Block missing name attribute: ' . $folder);
            }
            $failed_count++;
            continue;
        }

        // Check if required index.js exists
        $index_js = $block_dir . '/index.js';
        if (!file_exists($index_js)) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('Twork Builder: index.js not found for block: ' . $folder);
            }
            $failed_count++;
            continue;
        }

        // Register block with error suppression (to prevent one bad block from breaking all)
        try {
            $result = register_block_type($block_dir);
            
            if ($result && !is_wp_error($result)) {
                $registered_count++;
                
                if (defined('WP_DEBUG') && WP_DEBUG && WP_DEBUG_LOG) {
                    error_log('Twork Builder: Successfully registered block: ' . $block_data['name']);
                }
            } else {
                $failed_count++;
                $error_message = is_wp_error($result) ? $result->get_error_message() : 'Unknown error';
                
                if (defined('WP_DEBUG') && WP_DEBUG) {
                    error_log('Twork Builder: Failed to register block ' . $folder . ' (' . $block_data['name'] . '): ' . $error_message);
                }
            }
        } catch (Exception $e) {
            $failed_count++;
            
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('Twork Builder: Exception registering block ' . $folder . ': ' . $e->getMessage());
            }
            continue;
        } catch (Error $e) {
            $failed_count++;
            
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('Twork Builder: Fatal error registering block ' . $folder . ': ' . $e->getMessage());
            }
            continue;
        }
    }

    // Log summary in debug mode
    if (defined('WP_DEBUG') && WP_DEBUG && WP_DEBUG_LOG) {
        error_log('Twork Builder: Registration complete - Success: ' . $registered_count . ', Failed: ' . $failed_count);
    }

    // If no blocks registered at all, log warning
    if ($registered_count === 0) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('Twork Builder WARNING: No blocks were successfully registered!');
        }
    }
}

// Use priority 20 to ensure WordPress core blocks are registered first
// Wrap in error handler to prevent fatal errors from breaking the site
add_action('init', function() {
    try {
        twork_builder_init_blocks();
    } catch (Exception $e) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('Twork Builder: Exception during block initialization: ' . $e->getMessage());
        }
    } catch (Error $e) {
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('Twork Builder: Fatal error during block initialization: ' . $e->getMessage());
        }
    }
}, 20);

/**
 * 4. Activation Hook - Verify plugin can be activated safely
 */
function twork_builder_activation_check()
{
    // Check if build directory exists
    $blocks_path = TWORK_BUILDER_PATH . 'build/';
    if (!is_dir($blocks_path)) {
        deactivate_plugins(plugin_basename(__FILE__));
        wp_die(
            __('Twork Builder plugin could not be activated. Build directory is missing. Please run "npm run build" first.', 'twork-builder'),
            __('Plugin Activation Error', 'twork-builder'),
            array('back_link' => true)
        );
    }
}
register_activation_hook(__FILE__, 'twork_builder_activation_check');

/**
 * 5. Add admin notice if blocks fail to register
 */
function twork_builder_admin_notices()
{
    // Only show on admin pages
    if (!is_admin()) {
        return;
    }

    // Check if we're in the block editor
    $screen = get_current_screen();
    if (!$screen || $screen->base !== 'post') {
        return;
    }

    // This is a placeholder - actual check would need to be more sophisticated
    // For now, we rely on error logging
}
add_action('admin_notices', 'twork_builder_admin_notices');
