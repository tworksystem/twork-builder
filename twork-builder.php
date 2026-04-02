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

/** Load Agrezer Shop Grid Section (WooCommerce shop layout) render callback */
require_once TWORK_BUILDER_PATH . 'includes/class-twork-agrezer-shop-grid-section.php';

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
 * 2. Register frontend scripts for Twork Builder blocks.
 * Scripts are registered globally and only enqueued conditionally per page.
 */
function twork_builder_register_frontend_scripts()
{
    $version   = TWORK_BUILDER_VERSION;
    $assets_js = TWORK_BUILDER_URL . 'assets/js/';

    $scripts = array(
        'twork-jivaka-header-init'          => 'jivaka-header-init.js',
        'twork-hero-new-init'             => 'hero-new-init.js',
        'twork-lab-hero-init'             => 'lab-hero-init.js',
        'twork-dept-layout-init'          => 'dept-layout-init.js',
        'twork-centre-layout-init'        => 'centre-layout-init.js',
        'twork-services-grid-init'        => 'services-grid-init.js',
        'twork-contact-layout-init'       => 'contact-layout-init.js',
        'twork-team-members-init'         => 'team-members-init.js',
        'twork-amb-fleet-section-init'    => 'amb-fleet-section-init.js',
        'twork-amb-tech-section-init'     => 'amb-tech-section-init.js',
        'twork-amb-process-section-init'  => 'amb-process-section-init.js',
        'twork-amb-map-section-init'      => 'amb-map-section-init.js',
        'twork-doctor-directory-init'     => 'doctor-directory-init.js',
        'twork-csr-initiatives-init'      => 'csr-initiatives-init.js',
        'twork-csr-moments-gallery-init'  => 'csr-moments-gallery-init.js',
        'twork-csr-events-init'           => 'csr-events-init.js',
        'twork-journey-steps-init'        => 'journey-steps-init.js',
        'twork-exclusive-services-init'   => 'exclusive-services-init.js',
        'twork-testimonial-init'          => 'testimonial-init.js',
        'twork-nearby-accommodation-init' => 'nearby-accommodation-init.js',
        'twork-inquiry-form-init'         => 'inquiry-form-init.js',
        'twork-profile-tabs-init'         => 'profile-tabs-init.js',
        'twork-neuro-faq-init'            => 'neuro-faq-init.js',
        'twork-rad-prep-faq-init'         => 'rad-prep-faq-init.js',
        'twork-phy-faq-init'              => 'phy-faq-init.js',
        'twork-neuro-centre-init'         => 'neuro-centre-init.js',
        'twork-benefits-init'             => 'benefits-init.js',
        'twork-job-openings-init'         => 'job-openings-init.js',
    );

    foreach ($scripts as $handle => $file) {
        wp_register_script(
            $handle,
            $assets_js . $file,
            array(),
            $version,
            true
        );
    }
}

add_action('init', 'twork_builder_register_frontend_scripts');

/**
 * 2a. Enqueue Frontend Assets
 * Conditionally enqueues JavaScript for interactive blocks based on presence in the current post content.
 * Also enqueues shared frontend styles (Font Awesome, Dashicons).
 */
function twork_builder_enqueue_assets()
{
    if (is_admin()) {
        return;
    }

    // Header interactions are needed site-wide (template parts / site editor header).
    if (wp_script_is('twork-jivaka-header-init', 'registered') && !wp_script_is('twork-jivaka-header-init', 'enqueued')) {
        wp_enqueue_script('twork-jivaka-header-init');
    }

    global $post;
    if (!$post instanceof WP_Post) {
        // Fallback: no global post (e.g. template parts, some archives) – skip block-conditional scripts.
        // Keep global assets (like header interactions) enqueued above.
        return;
    }

    // Map block names to their frontend script handles.
    $block_script_map = array(
        // Hero / layout
        'twork/hero-new-section'              => array('twork-hero-new-init'),
        'twork/lab-hero-section'              => array('twork-lab-hero-init'),
        'twork/dept-layout-section'           => array('twork-dept-layout-init'),
        'twork/centre-layout-section'         => array('twork-centre-layout-init'),

        // Services / team / contact
        'twork/services-section'              => array('twork-services-grid-init'),
        'twork/services-grid'                 => array('twork-services-grid-init'),
        'twork/contact-layout-section'        => array('twork-contact-layout-init'),
        'twork/team-members-section'          => array('twork-team-members-init'),

        // Ambulance related
        'twork/amb-fleet-section'             => array('twork-amb-fleet-section-init'),
        'twork/amb-tech-section'              => array('twork-amb-tech-section-init'),
        'twork/amb-process-section'           => array('twork-amb-process-section-init'),
        'twork/amb-map-section'               => array('twork-amb-map-section-init'),

        // Doctor directory
        'twork/doctor-directory-section'      => array('twork-doctor-directory-init'),
        'twork/doctor-search-filter-section'  => array('twork-doctor-directory-init'),

        // CSR
        'twork/csr-initiatives-section'       => array('twork-csr-initiatives-init'),
        'twork/csr-moments-gallery-section'   => array('twork-csr-moments-gallery-init'),
        'twork/csr-events-section'            => array('twork-csr-events-init'),

        // Journey / Exclusive / Nearby
        'twork/journey-steps-section'         => array('twork-journey-steps-init'),
        'twork/exclusive-services-section'    => array('twork-exclusive-services-init'),
        'twork/nearby-accommodation-section'  => array('twork-nearby-accommodation-init'),

        // Forms / tabs
        'twork/inquiry-form-section'          => array('twork-inquiry-form-init'),
        'twork/profile-tabs-section'          => array('twork-profile-tabs-init'),

        // Neuro / Rad / Physio
        'twork/neuro-centre-section'          => array('twork-neuro-centre-init'),
        'twork/neuro-faq-section'             => array('twork-neuro-faq-init'),
        'twork/rad-prep-faq-section'          => array('twork-rad-prep-faq-init'),
        'twork/phy-faq-section'               => array('twork-phy-faq-init'),

        // Benefits / jobs
        'twork/benefits-section'              => array('twork-benefits-init'),
        'twork/job-openings-section'          => array('twork-job-openings-init'),

        // Testimonials
        'twork/testimonial-section'           => array('twork-testimonial-init'),
    );

    foreach ($block_script_map as $block_name => $handles) {
        if (has_block($block_name, $post)) {
            foreach ($handles as $handle) {
                if (wp_script_is($handle, 'registered') && !wp_script_is($handle, 'enqueued')) {
                    wp_enqueue_script($handle);
                }
            }
        }
    }

    // Font Awesome for icons (optional - only if not already loaded by theme)
    if (!wp_style_is('twork-font-awesome', 'enqueued')) {
        wp_enqueue_style(
            'twork-font-awesome',
            plugins_url('assets/vendor/fontawesome/css/all.min.css', __FILE__),
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
    if (!wp_style_is('twork-font-awesome', 'enqueued')) {
        wp_enqueue_style(
            'twork-font-awesome',
            plugins_url('assets/vendor/fontawesome/css/all.min.css', __FILE__),
            array(),
            '6.5.2'
        );
    }
}

add_action('enqueue_block_editor_assets', 'twork_builder_enqueue_editor_assets');

/**
 * 2c. Enqueue shared Google Fonts once for blocks.
 * Loads on both front-end and block editor via enqueue_block_assets.
 */
function twork_builder_enqueue_global_block_fonts()
{
    if (!wp_style_is('twork-builder-google-fonts', 'enqueued')) {
        wp_enqueue_style(
            'twork-builder-google-fonts',
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Manrope:wght@400;500;600;700;800&family=Marcellus&family=Roboto:wght@300;400;500;600;700;900&display=swap',
            array(),
            null
        );
    }
}
add_action('enqueue_block_assets', 'twork_builder_enqueue_global_block_fonts');


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

    /**
     * Dynamic blocks that declare "render": "file:./render.php" in block.json (for example
     * twork/posts-grid under build/agrezer-blog-section/) are registered automatically by this loop via
     * register_block_type( $block_dir ). WordPress resolves render.php relative to that folder.
     *
     * Requirements:
     * - Run `npm run build` so build/agrezer-blog-section/ contains block.json, index.js, and render.php.
     * - Do not register the same block twice (no extra register_block_type for agrezer-blog-section here).
     * - Do not set render_callback for twork/posts-grid unless overriding PHP output intentionally.
     *
     * Optional one-off registration (same as one loop iteration; use only if not using this loop):
     * register_block_type( TWORK_BUILDER_PATH . 'build/agrezer-blog-section' );
     * // or: register_block_type_from_metadata( TWORK_BUILDER_PATH . 'build/agrezer-blog-section' );
     *
     * Note: includes/class-twork-blog-section.php provides twork_render_blog_section for twork/blog-section
     * only — it does not affect twork/posts-grid.
     */

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
            if (isset($block_data['name']) && $block_data['name'] === 'twork/agrezer-shop-grid-section') {
                $block_args['render_callback'] = 'twork_render_agrezer_shop_grid_section';
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
