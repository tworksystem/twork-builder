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

/** Load Award CPT and dynamic block support */
require_once TWORK_BUILDER_PATH . 'includes/class-twork-award.php';

/** Load CSR Initiative post meta support */
require_once TWORK_BUILDER_PATH . 'includes/class-twork-csr-initiative.php';

/** Load Updates Section (Hospital News & Updates) render callback */
require_once TWORK_BUILDER_PATH . 'includes/class-twork-updates-section.php';

/** Load Blog Section (Blog layout: featured, grid, sidebar, pagination) render callback */
require_once TWORK_BUILDER_PATH . 'includes/class-twork-blog-section.php';

/** Load Emergency Units Section (Specialized Units from Posts) render callback + post meta */
require_once TWORK_BUILDER_PATH . 'includes/class-twork-em-units-section.php';

/** Load Pharmacy Shop by Category Section (WooCommerce product categories) render callback */
require_once TWORK_BUILDER_PATH . 'includes/class-twork-ph-shop-category-section.php';

/** Load Pharmacy Popular Products Section (WooCommerce products) render callback */
require_once TWORK_BUILDER_PATH . 'includes/class-twork-ph-popular-products-section.php';

/** Load Physio Facilities Section (Facilities cards from Posts) render callback */
require_once TWORK_BUILDER_PATH . 'includes/class-twork-phy-facilities-section.php';

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
    // Hero New Section initialization script (Pure JavaScript, no GSAP)
    wp_enqueue_script(
        'twork-hero-new-init',
        TWORK_BUILDER_URL . 'assets/js/hero-new-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Lab Hero Section – fade-up reveal (Pure JavaScript, no GSAP)
    wp_enqueue_script(
        'twork-lab-hero-init',
        TWORK_BUILDER_URL . 'assets/js/lab-hero-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Dept Layout Section – sidebar scroll spy
    wp_enqueue_script(
        'twork-dept-layout-init',
        TWORK_BUILDER_URL . 'assets/js/dept-layout-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Centre Layout Section (Neuro / Heart / Cancer etc.) – FAQ accordion + scroll animations
    wp_enqueue_script(
        'twork-centre-layout-init',
        TWORK_BUILDER_URL . 'assets/js/centre-layout-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Services Grid initialization script (Pure JavaScript)
    wp_enqueue_script(
        'twork-services-grid-init',
        TWORK_BUILDER_URL . 'assets/js/services-grid-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Contact Layout Section – hotline accordion (Pure JavaScript)
    wp_enqueue_script(
        'twork-contact-layout-init',
        TWORK_BUILDER_URL . 'assets/js/contact-layout-init.js',
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

    // Ambulance Fleet Section – scroll animations (Pure JavaScript)
    wp_enqueue_script(
        'twork-amb-fleet-section-init',
        TWORK_BUILDER_URL . 'assets/js/amb-fleet-section-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Ambulance Tech Section (ICU on Wheels) – scroll animations (Pure JavaScript)
    wp_enqueue_script(
        'twork-amb-tech-section-init',
        TWORK_BUILDER_URL . 'assets/js/amb-tech-section-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Ambulance Process Section (Emergency Protocol) – scroll animations (Pure JavaScript)
    wp_enqueue_script(
        'twork-amb-process-section-init',
        TWORK_BUILDER_URL . 'assets/js/amb-process-section-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Ambulance Map / Coverage Section – scroll animation (Pure JavaScript)
    wp_enqueue_script(
        'twork-amb-map-section-init',
        TWORK_BUILDER_URL . 'assets/js/amb-map-section-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Doctor Directory Section – search/filter (searchInput, deptFilter, genderFilter, resetBtn)
    wp_enqueue_script(
        'twork-doctor-directory-init',
        TWORK_BUILDER_URL . 'assets/js/doctor-directory-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // CSR Initiatives Section initialization script (Pure JavaScript)
    wp_enqueue_script(
        'twork-csr-initiatives-init',
        TWORK_BUILDER_URL . 'assets/js/csr-initiatives-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // CSR Moments Gallery initialization script (Pure JavaScript)
    wp_enqueue_script(
        'twork-csr-moments-gallery-init',
        TWORK_BUILDER_URL . 'assets/js/csr-moments-gallery-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // CSR Events Section initialization script (Pure JavaScript)
    wp_enqueue_script(
        'twork-csr-events-init',
        TWORK_BUILDER_URL . 'assets/js/csr-events-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Journey Steps Section initialization script (Pure JavaScript)
    wp_enqueue_script(
        'twork-journey-steps-init',
        TWORK_BUILDER_URL . 'assets/js/journey-steps-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Exclusive Services Section initialization script (Pure JavaScript)
    wp_enqueue_script(
        'twork-exclusive-services-init',
        TWORK_BUILDER_URL . 'assets/js/exclusive-services-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Testimonial Section initialization script (Pure JavaScript)
    wp_enqueue_script(
        'twork-testimonial-init',
        TWORK_BUILDER_URL . 'assets/js/testimonial-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Nearby Accommodation Section initialization script (Pure JavaScript)
    wp_enqueue_script(
        'twork-nearby-accommodation-init',
        TWORK_BUILDER_URL . 'assets/js/nearby-accommodation-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Inquiry Form Section initialization script (Pure JavaScript)
    wp_enqueue_script(
        'twork-inquiry-form-init',
        TWORK_BUILDER_URL . 'assets/js/inquiry-form-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Profile Tabs Section (OPD Schedule / Experience / Booking) initialization script (Pure JavaScript)
    wp_enqueue_script(
        'twork-profile-tabs-init',
        TWORK_BUILDER_URL . 'assets/js/profile-tabs-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Neuro Centre Section – FAQ accordion (add/remove/open/close)
    wp_enqueue_script(
        'twork-neuro-faq-init',
        TWORK_BUILDER_URL . 'assets/js/neuro-faq-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Radiology Prep FAQ Section – accordion (open/close FAQ items)
    wp_enqueue_script(
        'twork-rad-prep-faq-init',
        TWORK_BUILDER_URL . 'assets/js/rad-prep-faq-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Physio FAQ Section – accordion (open/close FAQ items, plus/minus icon)
    wp_enqueue_script(
        'twork-phy-faq-init',
        TWORK_BUILDER_URL . 'assets/js/phy-faq-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Neuro Centre Section – fade-up & stagger-card scroll animations
    wp_enqueue_script(
        'twork-neuro-centre-init',
        TWORK_BUILDER_URL . 'assets/js/neuro-centre-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Benefits Section initialization script (Pure JavaScript)
    wp_enqueue_script(
        'twork-benefits-init',
        TWORK_BUILDER_URL . 'assets/js/benefits-init.js',
        array(),
        TWORK_BUILDER_VERSION,
        true
    );

    // Job Openings Section initialization script (Pure JavaScript)
    wp_enqueue_script(
        'twork-job-openings-init',
        TWORK_BUILDER_URL . 'assets/js/job-openings-init.js',
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

    // WordPress Dashicons (for Info Cards and other blocks using Dashicons on frontend)
    wp_enqueue_style('dashicons');
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
            $block_args = array();
            if (isset($block_data['name']) && $block_data['name'] === 'twork/awards-section') {
                $block_args['render_callback'] = 'twork_render_awards_section';
            }
            if (isset($block_data['name']) && $block_data['name'] === 'twork/csr-initiatives-section') {
                $block_args['render_callback'] = 'twork_render_csr_initiatives_section';
            }
            if (isset($block_data['name']) && $block_data['name'] === 'twork/updates-section') {
                $block_args['render_callback'] = 'twork_render_updates_section';
            }
            if (isset($block_data['name']) && $block_data['name'] === 'twork/blog-section') {
                $block_args['render_callback'] = 'twork_render_blog_section';
            }
            if (isset($block_data['name']) && $block_data['name'] === 'twork/em-units-section') {
                $block_args['render_callback'] = 'twork_render_em_units_section';
            }
            if (isset($block_data['name']) && $block_data['name'] === 'twork/ph-shop-category-section') {
                $block_args['render_callback'] = 'twork_render_ph_shop_category_section';
            }
            if (isset($block_data['name']) && $block_data['name'] === 'twork/ph-popular-products-section') {
                $block_args['render_callback'] = 'twork_render_ph_popular_products_section';
            }
            if (isset($block_data['name']) && $block_data['name'] === 'twork/phy-facilities-section') {
                $block_args['render_callback'] = 'twork_render_phy_facilities_section';
            }
            $result = register_block_type($block_dir, $block_args);
            
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
 * 3b. Invalidate post cache on save so static blocks (e.g. rad-process-section with InnerBlocks)
 * reflect backend changes on the front-end. Clears WordPress object cache for the post;
 * full-page cache plugins should hook into save_post and purge their cache.
 */
function twork_builder_invalidate_post_cache_on_save($post_id)
{
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    clean_post_cache($post_id);
    do_action('twork_builder_after_post_save_cache_invalidate', $post_id);
}
add_action('save_post', 'twork_builder_invalidate_post_cache_on_save', 20, 1);

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
