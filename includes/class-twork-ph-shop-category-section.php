<?php
/**
 * Twork Pharmacy Shop by Category Section
 *
 * Displays WooCommerce product categories in a bento-style grid,
 * matching the "Shop by Category" design from pharmacy.html.
 *
 * @package TworkBuilder
 * @since 1.0.0
 */

defined('ABSPATH') || exit;

/**
 * Render callback for twork/ph-shop-category-section dynamic block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string
 */
function twork_render_ph_shop_category_section($attributes, $content, $block)
{
    // Require WooCommerce for product_cat taxonomy.
    if (!class_exists('WooCommerce')) {
        return '<!-- Twork Pharmacy Shop Section: WooCommerce not active. -->';
    }

    $defaults = array(
        'source'            => 'top', // top | children | selected.
        'parentCategoryId'  => 0,
        'categoryIds'       => array(),
        'numberOfItems'     => 5,
        'backgroundColor'   => '#ffffff',
        'paddingTop'        => 80,
        'paddingBottom'     => 80,
        'showSectionHeader' => true,
        'sectionTitle'      => __('Shop by Category', 'twork-builder'),
        'sectionSubtitle'   => __('Browse our wide range of healthcare products.', 'twork-builder'),
        'containerMaxWidth' => 1200,
        'containerPadding'  => 20,
        'animationOnScroll' => true,
        'animationType'     => 'fade-up',
    );

    $atts = wp_parse_args($attributes, $defaults);

    // Normalize boolean (serialized block may pass string "true"/"false"); default true when not set.
    $atts['showSectionHeader'] = isset($attributes['showSectionHeader'])
        ? filter_var($atts['showSectionHeader'], FILTER_VALIDATE_BOOLEAN)
        : (bool) $defaults['showSectionHeader'];

    $term_args = array(
        'taxonomy'   => 'product_cat',
        'hide_empty' => true,
        'number'     => absint($atts['numberOfItems']),
        'orderby'    => 'name',
        'order'      => 'ASC',
    );

    $source = $atts['source'];

    if ($source === 'children' && !empty($atts['parentCategoryId'])) {
        $term_args['parent'] = absint($atts['parentCategoryId']);
    } elseif ($source === 'selected') {
        $raw_ids = $atts['categoryIds'];
        if (is_string($raw_ids)) {
            $raw_ids = json_decode($raw_ids, true);
        }
        $ids = is_array($raw_ids) ? array_map('absint', array_filter($raw_ids)) : array();
        if (!empty($ids)) {
            $term_args['include'] = $ids;
            $term_args['number']  = count($ids);
            $term_args['orderby'] = 'include';
        } else {
            // Force no results if selection is empty.
            $term_args['include'] = array(0);
        }
    } else {
        // "top" – top-level categories.
        $term_args['parent'] = 0;
    }

    $terms = get_terms($term_args);

    if (is_wp_error($terms) || empty($terms)) {
        return '';
    }

    $section_style = sprintf(
        'background-color:%s;padding-top:%dpx;padding-bottom:%dpx;',
        esc_attr($atts['backgroundColor']),
        absint($atts['paddingTop']),
        absint($atts['paddingBottom'])
    );

    $container_style = sprintf(
        'max-width:%dpx;margin:0 auto;padding:0 %dpx;',
        absint($atts['containerMaxWidth']),
        absint($atts['containerPadding'])
    );

    $header_class = 'section-header';
    if ($atts['animationOnScroll'] && !empty($atts['animationType'])) {
        $header_class .= ' ' . esc_attr($atts['animationType']);
    }

    $grid_classes = array('ph-bento-grid');

    // Cycle through bento layout modifiers to mimic design.
    $bento_classes = array('bento-large', 'bento-tall', 'bento-std', 'bento-wide', 'bento-std');

    ob_start();
    ?>
    <section class="ph-section twork-ph-shop-category-section" style="<?php echo esc_attr($section_style); ?>">
        <div class="ph-container" style="<?php echo esc_attr($container_style); ?>">
            <?php if ($atts['showSectionHeader']) : ?>
                <div class="<?php echo esc_attr($header_class); ?> twork-ph-shop-category-section-header">
                    <?php if (!empty($atts['sectionTitle'])) : ?>
                        <h2 class="twork-ph-shop-category-section-title"><?php echo esc_html($atts['sectionTitle']); ?></h2>
                    <?php endif; ?>
                    <?php if (!empty($atts['sectionSubtitle'])) : ?>
                        <p class="twork-ph-shop-category-section-subtitle"><?php echo esc_html($atts['sectionSubtitle']); ?></p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div class="<?php echo esc_attr(implode(' ', $grid_classes)); ?>">
                <?php
                $index = 0;
                foreach ($terms as $term) :
                    $term_link = get_term_link($term);
                    if (is_wp_error($term_link)) {
                        continue;
                    }

                    $thumb_id  = get_term_meta($term->term_id, 'thumbnail_id', true);
                    $image_url = $thumb_id ? wp_get_attachment_image_url($thumb_id, 'large') : '';

                    $layout_class = $bento_classes[$index % count($bento_classes)];
                    $index++;
                    ?>
                    <a
                        href="<?php echo esc_url($term_link); ?>"
                        class="ph-bento-item <?php echo esc_attr($layout_class); ?> stagger-up"
                    >
                        <?php if ($image_url) : ?>
                            <img
                                src="<?php echo esc_url($image_url); ?>"
                                alt="<?php echo esc_attr($term->name); ?>"
                                class="ph-bento-img"
                            />
                        <?php endif; ?>
                        <div class="ph-bento-content">
                            <h3><?php echo esc_html($term->name); ?></h3>
                            <?php if (!empty($term->description)) : ?>
                                <p><?php echo esc_html(wp_trim_words($term->description, 14)); ?></p>
                            <?php endif; ?>
                        </div>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php

    return ob_get_clean();
}

