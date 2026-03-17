<?php
/**
 * Twork Emergency Units Section – Specialized Emergency Units
 *
 * Displays WordPress posts as unit cards (image, title, description, link text).
 * Content from Posts: Featured Image, Title, Excerpt, and post meta
 * "Emergency Unit Link Text" / "Emergency Unit Link URL".
 *
 * @package TworkBuilder
 * @since 1.0.0
 */

defined('ABSPATH') || exit;

/**
 * Register post meta for Emergency Unit link text and URL (used when post is shown in Units section).
 */
function twork_em_units_register_post_meta()
{
    register_post_meta(
        'post',
        'em_unit_link_text',
        array(
            'show_in_rest'  => true,
            'single'       => true,
            'type'         => 'string',
            'default'      => '',
            'description'  => __('Label shown on unit card (e.g. "Level 1 Care", "Golden Hour Ready").', 'twork-builder'),
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        )
    );

    register_post_meta(
        'post',
        'em_unit_link_url',
        array(
            'show_in_rest'  => true,
            'single'       => true,
            'type'         => 'string',
            'default'      => '',
            'description'  => __('Optional URL for the unit link. Leave empty to use post permalink.', 'twork-builder'),
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        )
    );
}
add_action('init', 'twork_em_units_register_post_meta', 20);

/**
 * Add meta box on post edit screen for Emergency Unit fields.
 */
function twork_em_units_add_meta_box()
{
    add_meta_box(
        'twork_em_unit_meta',
        __('Emergency Unit (for Units Section)', 'twork-builder'),
        'twork_em_units_meta_box_callback',
        'post',
        'normal',
        'default'
    );
}
add_action('add_meta_boxes', 'twork_em_units_add_meta_box');

function twork_em_units_meta_box_callback($post)
{
    wp_nonce_field('twork_em_units_meta', 'twork_em_units_meta_nonce');
    $link_text = get_post_meta($post->ID, 'em_unit_link_text', true);
    $link_url  = get_post_meta($post->ID, 'em_unit_link_url', true);
    ?>
    <p>
        <label for="em_unit_link_text"><strong><?php esc_html_e('Link text', 'twork-builder'); ?></strong></label><br>
        <input type="text" id="em_unit_link_text" name="em_unit_link_text" value="<?php echo esc_attr($link_text); ?>"
               class="widefat" placeholder="<?php esc_attr_e('e.g. Level 1 Care, Golden Hour Ready', 'twork-builder'); ?>">
        <span class="description"><?php esc_html_e('Shown at the bottom of the unit card when this post is used in the Emergency Units section.', 'twork-builder'); ?></span>
    </p>
    <p>
        <label for="em_unit_link_url"><strong><?php esc_html_e('Link URL (optional)', 'twork-builder'); ?></strong></label><br>
        <input type="url" id="em_unit_link_url" name="em_unit_link_url" value="<?php echo esc_attr($link_url); ?>"
               class="widefat" placeholder="<?php esc_attr_e('Leave empty to use post link', 'twork-builder'); ?>">
    </p>
    <?php
}

function twork_em_units_save_meta_box($post_id)
{
    if (!isset($_POST['twork_em_units_meta_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['twork_em_units_meta_nonce'])), 'twork_em_units_meta')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    if (isset($_POST['em_unit_link_text'])) {
        update_post_meta($post_id, 'em_unit_link_text', sanitize_text_field(wp_unslash($_POST['em_unit_link_text'])));
    }
    if (isset($_POST['em_unit_link_url'])) {
        update_post_meta($post_id, 'em_unit_link_url', esc_url_raw(wp_unslash($_POST['em_unit_link_url'])));
    }
}
add_action('save_post', 'twork_em_units_save_meta_box');

/**
 * Render callback for twork/em-units-section dynamic block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block     Block instance.
 * @return string HTML output.
 */
function twork_render_em_units_section($attributes, $content, $block)
{
    $defaults = array(
        'source'              => 'recent',
        'categoryId'          => 0,
        'postIds'             => array(),
        'numberOfItems'       => 6,
        'orderBy'             => 'date',
        'order'               => 'DESC',
        'backgroundColor'     => '#fffbf7',
        'paddingTop'          => 80,
        'paddingBottom'       => 80,
        'showSectionHeader'   => true,
        'sectionTitle'        => 'Specialized Emergency Units',
        'sectionTitleColor'   => '#212121',
        'sectionTitleFontSize' => 2.5,
        'sectionTitleFontWeight' => 700,
        'sectionSubtitle'     => 'Dedicated zones to handle specific types of emergencies effectively.',
        'sectionSubtitleColor' => '#333333',
        'sectionSubtitleFontSize' => 1,
        'headerMaxWidth'      => 700,
        'headerMarginBottom'  => 50,
        'containerMaxWidth'   => 1280,
        'containerPadding'    => 20,
        'minColumnWidth'      => 300,
        'gap'                 => 25,
        'imageHeight'         => 220,
        'bodyPadding'         => 25,
        'showUnitLink'        => true,
        'defaultLinkText'     => '',
        'linkTextColor'       => '#f48b2a',
        'linkFontSize'        => 0.9,
        'linkFontWeight'      => 700,
        'linkTextTransform'   => 'uppercase',
        'animationOnScroll'   => true,
        'animationType'       => 'fade-up',
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

    if ($atts['source'] === 'ids') {
        $raw_ids = $atts['postIds'];
        if (is_string($raw_ids)) {
            $raw_ids = json_decode($raw_ids, true);
        }
        $ids = is_array($raw_ids) ? array_map('absint', array_filter($raw_ids)) : array();
        if (!empty($ids)) {
            $query_args['post__in']       = $ids;
            $query_args['orderby']        = 'post__in';
            $query_args['posts_per_page'] = count($ids);
            $has_valid_filter             = true;
        }
    } elseif ($atts['source'] === 'category') {
        $cat_id = absint($atts['categoryId']);
        if ($cat_id > 0) {
            $query_args['cat'] = $cat_id;
            $has_valid_filter  = true;
        }
    } else {
        $has_valid_filter = true;
    }

    if (!$has_valid_filter) {
        $query_args['post__in'] = array(0);
    }

    $units_query = new WP_Query($query_args);

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
        'text-align:center;max-width:%dpx;margin:0 auto %dpx;',
        absint($atts['headerMaxWidth']),
        absint($atts['headerMarginBottom'])
    );

    $grid_style = sprintf(
        'display:grid;grid-template-columns:repeat(auto-fit,minmax(%dpx,1fr));gap:%dpx;',
        absint($atts['minColumnWidth']),
        absint($atts['gap'])
    );

    $title_style = sprintf(
        'font-size:%srem;font-weight:%d;color:%s;margin-bottom:15px;margin-top:0;',
        esc_attr($atts['sectionTitleFontSize']),
        absint($atts['sectionTitleFontWeight']),
        esc_attr($atts['sectionTitleColor'])
    );

    $subtitle_style = sprintf(
        'font-size:%srem;color:%s;margin:0;',
        esc_attr($atts['sectionSubtitleFontSize']),
        esc_attr($atts['sectionSubtitleColor'])
    );

    $body_style = sprintf('padding:%dpx;', absint($atts['bodyPadding']));
    $img_style  = sprintf('height:%dpx;width:100%%;object-fit:cover;', absint($atts['imageHeight']));
    $link_style = sprintf(
        'color:%s;font-size:%srem;font-weight:%d;text-transform:%s;',
        esc_attr($atts['linkTextColor']),
        esc_attr($atts['linkFontSize']),
        absint($atts['linkFontWeight']),
        esc_attr($atts['linkTextTransform'])
    );

    $header_class = 'em-header';
    if ($atts['animationOnScroll'] && $atts['animationType']) {
        $header_class .= ' ' . esc_attr($atts['animationType']);
    }
    $card_class = 'em-unit-card stagger-up';
    if ($atts['animationOnScroll'] && $atts['animationType']) {
        $card_class .= ' ' . esc_attr($atts['animationType']);
    }

    ob_start();
    ?>
    <section class="em-section em-units-section twork-em-units-section" style="<?php echo esc_attr($section_style); ?>"
             data-animation="<?php echo $atts['animationOnScroll'] ? 'true' : 'false'; ?>"
             data-animation-type="<?php echo esc_attr($atts['animationType']); ?>">
        <div class="em-container" style="<?php echo esc_attr($container_style); ?>">
            <?php if ($atts['showSectionHeader']) : ?>
                <div class="<?php echo esc_attr($header_class); ?>" style="<?php echo esc_attr($header_style); ?>">
                    <h2 style="<?php echo esc_attr($title_style); ?>"><?php echo esc_html($atts['sectionTitle']); ?></h2>
                    <p style="<?php echo esc_attr($subtitle_style); ?>"><?php echo esc_html($atts['sectionSubtitle']); ?></p>
                </div>
            <?php endif; ?>

            <div class="em-triage-grid" style="<?php echo esc_attr($grid_style); ?>">
                <?php
                if ($units_query->have_posts()) :
                    $idx = 0;
                    while ($units_query->have_posts()) :
                        $units_query->the_post();
                        $post_id   = get_the_ID();
                        $permalink = get_permalink($post_id);
                        $title     = get_the_title();
                        $excerpt   = has_excerpt() ? get_the_excerpt() : wp_trim_words(get_the_content(), 20);
                        $thumb_id  = get_post_thumbnail_id($post_id);
                        $image_url = $thumb_id ? wp_get_attachment_image_url($thumb_id, 'medium_large') : '';
                        $link_text = get_post_meta($post_id, 'em_unit_link_text', true);
                        $link_url  = get_post_meta($post_id, 'em_unit_link_url', true);
                        if ($link_url) {
                            $card_url = esc_url($link_url);
                        } else {
                            $card_url = get_permalink($post_id);
                        }
                        $idx++;
                        $stagger_style = $atts['animationOnScroll'] ? sprintf(' transition-delay:%dms;', ($idx - 1) * 100) : '';
                        $card_label    = sprintf(/* translators: %s: post title */ __('View %s', 'twork-builder'), $title);
                        ?>
                        <a href="<?php echo esc_url($card_url); ?>"
                           class="<?php echo esc_attr($card_class); ?>"
                           style="<?php echo esc_attr($stagger_style); ?>"
                           rel="bookmark"
                           aria-label="<?php echo esc_attr($card_label); ?>">
                            <?php if ($image_url) : ?>
                                <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($title); ?>"
                                     class="em-unit-img" style="<?php echo esc_attr($img_style); ?>"
                                     decoding="async" loading="lazy">
                            <?php else : ?>
                                <div class="em-unit-img" style="<?php echo esc_attr($img_style); ?>background:#e8e8e8;display:flex;align-items:center;justify-content:center;color:#999;font-size:0.9rem;">
                                    <?php esc_html_e('No image', 'twork-builder'); ?>
                                </div>
                            <?php endif; ?>
                            <div class="em-unit-body" style="<?php echo esc_attr($body_style); ?>">
                                <h3><?php echo esc_html($title); ?></h3>
                                <p><?php echo esc_html($excerpt); ?></p>
                                <?php
                                if (!empty($atts['showUnitLink'])) {
                                    $display_link_text = !empty($link_text) ? $link_text : $atts['defaultLinkText'];
                                    if ($display_link_text !== '') {
                                        ?>
                                        <span class="em-unit-link" style="<?php echo esc_attr($link_style); ?>">
                                            <?php echo esc_html($display_link_text); ?>
                                        </span>
                                        <?php
                                    }
                                }
                                ?>
                            </div>
                        </a>
                        <?php
                    endwhile;
                    wp_reset_postdata();
                else :
                    $empty_msg = __('No posts found.', 'twork-builder');
                    if (!$has_valid_filter) {
                        if ($atts['source'] === 'category') {
                            $empty_msg = __('Please select a category in the block settings.', 'twork-builder');
                        } elseif ($atts['source'] === 'ids') {
                            $empty_msg = __('Please add specific posts in the block settings.', 'twork-builder');
                        }
                    }
                    ?>
                    <div class="em-unit-card" style="grid-column:1/-1;padding:40px;text-align:center;background:#fff;border:2px dashed #e0e0e0;border-radius:16px;color:#666;">
                        <p style="margin:0;"><?php echo esc_html($empty_msg); ?></p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
