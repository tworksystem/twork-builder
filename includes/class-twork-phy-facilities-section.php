<?php
/**
 * Twork Physio Facilities Section
 *
 * Displays WordPress posts as horizontal facility cards (image, title, excerpt),
 * matching physiotherapy-rehab.html facilities slider.
 *
 * @package TworkBuilder
 * @since 1.0.0
 */

defined('ABSPATH') || exit;

/**
 * Render callback for twork/phy-facilities-section dynamic block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 * @return string HTML output.
 */
function twork_render_phy_facilities_section($attributes, $content, $block)
{
    $defaults = array(
        'source'            => 'recent',
        'categoryId'        => 0,
        'numberOfItems'     => 4,
        'orderBy'           => 'date',
        'order'             => 'DESC',
        'backgroundColor'   => '#fdfdfd',
        'paddingTop'        => 80,
        'paddingBottom'     => 80,
        'containerMaxWidth' => 1280,
        'containerPadding'  => 24,
        'showSectionHeader' => true,
        'sectionTitle'      => 'Our Facilities',
        'sectionSubtitle'   => 'Fully equipped gym and therapy rooms.',
        'headerAlign'       => 'center',
        'headerMaxWidth'    => 700,
        'cardWidth'         => 350,
        'imageHeight'       => 220,
        'gap'               => 20,
        'animationOnScroll' => true,
        'staggerClass'      => 'stagger-up',
    );

    $atts = wp_parse_args($attributes, $defaults);

    $query_args = array(
        'post_type'      => 'post',
        'post_status'    => 'publish',
        'posts_per_page' => absint($atts['numberOfItems']),
        'orderby'        => sanitize_key($atts['orderBy']),
        'order'          => strtoupper($atts['order']) === 'ASC' ? 'ASC' : 'DESC',
    );

    $has_valid_filter = false;

    if ($atts['source'] === 'category') {
        $cat_id = absint($atts['categoryId']);
        if ($cat_id > 0) {
            $query_args['cat'] = $cat_id;
            $has_valid_filter  = true;
        }
    } else {
        // 'recent' – latest posts
        $has_valid_filter = true;
    }

    if (!$has_valid_filter) {
        $query_args['post__in'] = array(0);
    }

    $facilities_query = new WP_Query($query_args);

    $section_style = sprintf(
        'background-color:%s;padding-top:%dpx;padding-bottom:%dpx;',
        esc_attr($atts['backgroundColor']),
        absint($atts['paddingTop']),
        absint($atts['paddingBottom'])
    );

    $container_style = sprintf(
        'max-width:%dpx;margin:0 auto;padding:0 %dpx;position:relative;',
        absint($atts['containerMaxWidth']),
        absint($atts['containerPadding'])
    );

    $header_style = sprintf(
        'text-align:%s;max-width:%dpx;margin:0 auto 30px;',
        esc_attr($atts['headerAlign']),
        absint($atts['headerMaxWidth'])
    );

    $slider_style = sprintf(
        'display:flex;overflow-x:auto;gap:%dpx;padding-bottom:40px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;',
        absint($atts['gap'])
    );

    $card_style = sprintf(
        'flex:0 0 %dpx;scroll-snap-align:start;background:#fff;border-radius:var(--phy-radius,16px);overflow:hidden;box-shadow:var(--phy-shadow,0 5px 20px rgba(0,0,0,0.08));',
        absint($atts['cardWidth'])
    );

    $img_style = sprintf(
        'height:%dpx;width:100%%;object-fit:cover;',
        absint($atts['imageHeight'])
    );

    ob_start();
    ?>
    <section
        class="phy-section twork-phy-facilities-section"
        style="<?php echo esc_attr($section_style); ?>"
        data-animation="<?php echo $atts['animationOnScroll'] ? 'true' : 'false'; ?>"
    >
        <div class="phy-container" style="<?php echo esc_attr($container_style); ?>">
            <?php if (!empty($atts['showSectionHeader'])) : ?>
                <div class="phy-header fade-up" style="<?php echo esc_attr($header_style); ?>">
                    <?php if (!empty($atts['sectionTitle'])) : ?>
                        <h2><?php echo esc_html($atts['sectionTitle']); ?></h2>
                    <?php endif; ?>
                    <?php if (!empty($atts['sectionSubtitle'])) : ?>
                        <p><?php echo esc_html($atts['sectionSubtitle']); ?></p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div class="phy-facility-slider <?php echo $atts['animationOnScroll'] ? esc_attr($atts['staggerClass']) : ''; ?>" style="<?php echo esc_attr($slider_style); ?>">
                <?php
                if ($facilities_query->have_posts()) :
                    while ($facilities_query->have_posts()) :
                        $facilities_query->the_post();
                        $post_id   = get_the_ID();
                        $title     = get_the_title();
                        $excerpt   = has_excerpt() ? get_the_excerpt() : wp_trim_words(get_the_content(), 18);
                        $thumb_id  = get_post_thumbnail_id($post_id);
                        $image_url = $thumb_id ? wp_get_attachment_image_url($thumb_id, 'medium_large') : '';
                        $alt       = $thumb_id ? get_post_meta($thumb_id, '_wp_attachment_image_alt', true) : '';
                        if ($alt === '') {
                            $alt = $title;
                        }
                        ?>
                        <div class="phy-facility-card" style="<?php echo esc_attr($card_style); ?>">
                            <?php if ($image_url) : ?>
                                <img
                                    src="<?php echo esc_url($image_url); ?>"
                                    alt="<?php echo esc_attr($alt); ?>"
                                    class="phy-facility-img"
                                    style="<?php echo esc_attr($img_style); ?>"
                                    decoding="async"
                                    loading="lazy"
                                />
                            <?php else : ?>
                                <div
                                    class="phy-facility-img"
                                    style="<?php echo esc_attr($img_style); ?>background:#e0e0e0;display:flex;align-items:center;justify-content:center;color:#777;font-size:0.9rem;"
                                >
                                    <?php esc_html_e('No image', 'twork-builder'); ?>
                                </div>
                            <?php endif; ?>

                            <div class="phy-facility-info">
                                <?php if ($title) : ?>
                                    <h4><?php echo esc_html($title); ?></h4>
                                <?php endif; ?>
                                <?php if ($excerpt) : ?>
                                    <p><?php echo esc_html($excerpt); ?></p>
                                <?php endif; ?>
                            </div>
                        </div>
                        <?php
                    endwhile;
                    wp_reset_postdata();
                else :
                    ?>
                    <div
                        class="phy-facility-card"
                        style="<?php echo esc_attr($card_style); ?>min-height:180px;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px;"
                    >
                        <p style="margin:0;color:#666;">
                            <?php
                            echo esc_html__(
                                'No posts found. Add posts with featured images to show facilities here.',
                                'twork-builder'
                            );
                            ?>
                        </p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <?php

    return ob_get_clean();
}

