<?php
/**
 * Twork Pharmacy Popular Products Section
 *
 * Displays WooCommerce products as "Popular Products" cards,
 * matching the design from pharmacy.html.
 *
 * @package TworkBuilder
 * @since 1.0.0
 */

defined('ABSPATH') || exit;

/**
 * Render callback for twork/ph-popular-products-section dynamic block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string
 */
function twork_render_ph_popular_products_section($attributes, $content, $block)
{
    if (!class_exists('WooCommerce')) {
        return '<!-- Twork Pharmacy Popular Products: WooCommerce not active. -->';
    }

    $defaults = array(
        'source'            => 'featured', // featured | on_sale | category | recent.
        'productCategoryId' => 0,
        'numberOfItems'     => 5,
        'backgroundColor'   => '#ffffff',
        'paddingTop'        => 80,
        'paddingBottom'     => 80,
        'showSectionHeader' => true,
        'sectionTitle'      => __('Popular Products', 'twork-builder'),
        'sectionSubtitle'   => __('Trusted by our patients for daily wellness.', 'twork-builder'),
        'containerMaxWidth' => 1200,
        'containerPadding'  => 20,
        'showAddToCart'     => true,
        'addToCartLabel'    => __('Add to Cart', 'twork-builder'),
        'animationOnScroll' => true,
        'animationType'     => 'stagger-up',
    );

    $atts = wp_parse_args($attributes, $defaults);

    $product_args = array(
        'status' => 'publish',
        'limit'  => absint($atts['numberOfItems']),
        'return' => 'objects',
        'orderby' => 'date',
        'order'   => 'DESC',
    );

    $source = $atts['source'];

    if ($source === 'featured') {
        $product_args['featured'] = true;
    } elseif ($source === 'on_sale') {
        $product_args['on_sale'] = true;
    } elseif ($source === 'category' && !empty($atts['productCategoryId'])) {
        $term = get_term(absint($atts['productCategoryId']), 'product_cat');
        if ($term && !is_wp_error($term)) {
            $product_args['category'] = array($term->slug);
        }
    }

    $products = wc_get_products($product_args);

    if (empty($products)) {
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
    if (!empty($atts['animationOnScroll']) && !empty($atts['animationType'])) {
        $header_class .= ' ' . esc_attr($atts['animationType']);
    }

    $card_class = 'ph-product-card';
    if (!empty($atts['animationOnScroll']) && !empty($atts['animationType'])) {
        $card_class .= ' ' . esc_attr($atts['animationType']);
    }

    ob_start();
    ?>
    <section class="ph-section twork-ph-popular-products-section" style="<?php echo esc_attr($section_style); ?>">
        <div class="ph-container" style="<?php echo esc_attr($container_style); ?>">
            <?php if (!empty($atts['showSectionHeader'])) : ?>
                <div class="<?php echo esc_attr($header_class); ?>">
                    <?php if (!empty($atts['sectionTitle'])) : ?>
                        <h2><?php echo esc_html($atts['sectionTitle']); ?></h2>
                    <?php endif; ?>
                    <?php if (!empty($atts['sectionSubtitle'])) : ?>
                        <p><?php echo esc_html($atts['sectionSubtitle']); ?></p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div class="ph-products-wrapper">
                <?php foreach ($products as $product) : ?>
                    <?php
                    $product_id   = $product->get_id();
                    $permalink    = get_permalink($product_id);
                    $title        = $product->get_name();
                    $price_html   = $product->get_price_html();
                    $image_id     = $product->get_image_id();
                    $image_url    = $image_id ? wp_get_attachment_image_url($image_id, 'medium') : '';

                    $tag_label    = '';
                    $terms        = get_the_terms($product_id, 'product_cat');
                    if ($terms && !is_wp_error($terms)) {
                        $primary = array_shift($terms);
                        $tag_label = $primary ? $primary->name : '';
                    }
                    ?>
                    <div class="<?php echo esc_attr($card_class); ?>">
                        <?php if ($tag_label) : ?>
                            <span class="ph-prod-tag"><?php echo esc_html($tag_label); ?></span>
                        <?php endif; ?>

                        <?php if ($image_url) : ?>
                            <a href="<?php echo esc_url($permalink); ?>">
                                <img
                                    src="<?php echo esc_url($image_url); ?>"
                                    alt="<?php echo esc_attr($title); ?>"
                                    class="ph-prod-img"
                                />
                            </a>
                        <?php endif; ?>

                        <h4 class="ph-prod-title">
                            <a href="<?php echo esc_url($permalink); ?>" style="text-decoration:none;color:inherit;">
                                <?php echo esc_html($title); ?>
                            </a>
                        </h4>

                        <?php if ($price_html) : ?>
                            <span class="ph-prod-price"><?php echo wp_kses_post($price_html); ?></span>
                        <?php endif; ?>

                        <?php if (!empty($atts['showAddToCart'])) : ?>
                            <?php
                            $add_to_cart_url  = $product->add_to_cart_url();
                            $add_to_cart_text = $atts['addToCartLabel'];
                            ?>
                            <a
                                href="<?php echo esc_url($add_to_cart_url); ?>"
                                class="ph-add-btn add_to_cart_button"
                                data-product_id="<?php echo esc_attr($product_id); ?>"
                            >
                                <?php echo esc_html($add_to_cart_text); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
    <?php

    return ob_get_clean();
}

