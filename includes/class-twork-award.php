<?php
/**
 * Twork Awards Section - Uses WordPress Default Posts
 *
 * Displays posts from WP Admin → Posts. Users can select by category
 * or pick specific posts. Optional award_year meta overrides post date.
 *
 * @package TworkBuilder
 * @since 1.0.0
 */

defined('ABSPATH') || exit;

/**
 * Register optional award_year meta for default 'post' type.
 * When set, overrides the year displayed (otherwise uses post date).
 */
function twork_register_post_award_meta()
{
    register_post_meta(
        'post',
        'award_year',
        array(
            'show_in_rest'      => true,
            'single'            => true,
            'type'              => 'string',
            'default'           => '',
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback'     => function () {
                return current_user_can('edit_posts');
            },
            'description'       => __('Award year override (e.g. 2024). Leave empty to use post date.', 'twork-builder'),
        )
    );
}
add_action('init', 'twork_register_post_award_meta');

/**
 * Add Award Year meta box to Post edit screen (optional override)
 */
function twork_post_award_meta_box()
{
    add_meta_box(
        'twork_award_year',
        __('Award Year (optional)', 'twork-builder'),
        'twork_post_award_year_callback',
        'post',
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'twork_post_award_meta_box');

function twork_post_award_year_callback($post)
{
    wp_nonce_field('twork_award_year_nonce', 'twork_award_year_nonce');
    $year = get_post_meta($post->ID, 'award_year', true);
    ?>
    <p>
        <label for="award_year"><?php esc_html_e('Year for Awards block (e.g. 2024)', 'twork-builder'); ?></label>
        <input type="text" id="award_year" name="award_year" value="<?php echo esc_attr($year); ?>" class="widefat" placeholder="<?php echo esc_attr(get_the_date('Y', $post)); ?>" />
        <span class="description"><?php esc_html_e('Leave empty to use post date.', 'twork-builder'); ?></span>
    </p>
    <?php
}

function twork_post_save_award_meta($post_id)
{
    if (!isset($_POST['twork_award_year_nonce']) ||
        !wp_verify_nonce($_POST['twork_award_year_nonce'], 'twork_award_year_nonce')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    if (isset($_POST['award_year'])) {
        update_post_meta($post_id, 'award_year', sanitize_text_field($_POST['award_year']));
    }
}
add_action('save_post_post', 'twork_post_save_award_meta');

/**
 * Render callback for twork/awards-section dynamic block.
 * Fetches WordPress default Posts (by category or selected IDs).
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 * @return string HTML output.
 */
function twork_render_awards_section($attributes, $content, $block)
{
    $defaults = array(
        'source'                => 'category',
        'categoryId'            => 0,
        'postIds'               => array(),
        'numberOfItems'         => 6,
        'orderBy'               => 'date',
        'order'                 => 'DESC',
        'backgroundColor'       => '#f8f9fa',
        'backgroundImage'       => '',
        'backgroundOverlay'     => false,
        'backgroundOverlayColor' => 'rgba(0, 0, 0, 0.5)',
        'backgroundOverlayOpacity' => 0.5,
        'paddingTop'            => 80,
        'paddingBottom'         => 80,
        'gap'                   => 30,
        'gridMinWidth'          => 280,
        'gridMarginTop'         => 50,
        'showIntroTitle'        => true,
        'introTitle'            => 'Awards & Recognition',
        'introTitleColor'       => '#212121',
        'introTitleFontSize'    => 2.2,
        'introTitleFontWeight'  => 700,
        'introTitleAlignment'   => 'center',
        'introMarginBottom'     => 40,
        'containerMaxWidth'     => 1200,
        'containerPadding'      => 30,
        'hoverEffect'           => true,
        'hoverTranslateY'       => -5,
        'imageZoomOnHover'      => true,
        'animationOnScroll'     => true,
        'imageHeight'           => 200,
        'yearColor'             => '#f48b2a',
        'yearFontSize'          => 0.9,
        'titleFontSize'         => 1.2,
        'descFontSize'          => 0.9,
        'contentPadding'        => 25,
        'showReadMoreButton'    => true,
        'readMoreLabel'         => 'View Detail',
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
    }

    // When no valid filter: show no posts (avoid showing all categories' data)
    if (!$has_valid_filter) {
        $query_args['post__in'] = array(0);
    }

    $awards_query = new WP_Query($query_args);

    $section_style = array(
        'background-color'       => $atts['backgroundColor'],
        'background-image'       => $atts['backgroundImage'] ? 'url(' . esc_url($atts['backgroundImage']) . ')' : 'none',
        'background-size'        => 'cover',
        'background-position'    => 'center',
        'padding-top'            => $atts['paddingTop'] . 'px',
        'padding-bottom'         => $atts['paddingBottom'] . 'px',
        '--hover-translate-y'    => $atts['hoverTranslateY'] . 'px',
    );

    $section_style_str = '';
    foreach ($section_style as $k => $v) {
        if ($v !== '' && $v !== 'none') {
            $section_style_str .= $k . ':' . $v . ';';
        }
    }

    ob_start();
    ?>
    <section
        class="twork-awards-section section-padding awards-section wp-block-twork-awards-section"
        style="<?php echo esc_attr($section_style_str); ?>"
        data-hover-effect="<?php echo $atts['hoverEffect'] ? 'true' : 'false'; ?>"
        data-image-zoom="<?php echo $atts['imageZoomOnHover'] ? 'true' : 'false'; ?>"
        data-animation="<?php echo $atts['animationOnScroll'] ? 'true' : 'false'; ?>"
        data-animation-type="fadeInUp"
        data-animation-delay="100"
    >
        <?php if ($atts['backgroundImage'] && $atts['backgroundOverlay']) : ?>
            <div
                class="background-overlay"
                style="position:absolute;top:0;left:0;right:0;bottom:0;background-color:<?php echo esc_attr($atts['backgroundOverlayColor']); ?>;opacity:<?php echo esc_attr($atts['backgroundOverlayOpacity']); ?>;z-index:1;"
            ></div>
        <?php endif; ?>

        <div
            class="jivaka-container"
            style="max-width:<?php echo absint($atts['containerMaxWidth']); ?>px;margin:0 auto;padding:0 <?php echo absint($atts['containerPadding']); ?>px;position:relative;z-index:2;"
        >
            <?php if ($atts['showIntroTitle']) : ?>
                <div
                    class="intro-text fade-up"
                    style="text-align:<?php echo esc_attr($atts['introTitleAlignment']); ?>;margin-bottom:<?php echo absint($atts['introMarginBottom']); ?>px;"
                >
                    <h2 style="font-size:<?php echo floatval($atts['introTitleFontSize']); ?>rem;font-weight:<?php echo absint($atts['introTitleFontWeight']); ?>;color:<?php echo esc_attr($atts['introTitleColor']); ?>;margin:0;">
                        <?php echo esc_html($atts['introTitle']); ?>
                    </h2>
                </div>
            <?php endif; ?>

            <div
                class="awards-grid"
                style="display:grid;grid-template-columns:repeat(auto-fill,minmax(<?php echo absint($atts['gridMinWidth']); ?>px,1fr));gap:<?php echo absint($atts['gap']); ?>px;margin-top:<?php echo absint($atts['gridMarginTop']); ?>px;"
            >
                <?php
                if ($awards_query->have_posts()) :
                    $show_btn = ! empty($atts['showReadMoreButton']);
                    $btn_label = ! empty($atts['readMoreLabel']) ? $atts['readMoreLabel'] : __('View Detail', 'twork-builder');
                    while ($awards_query->have_posts()) :
                        $awards_query->the_post();
                        $post_id   = get_the_ID();
                        $permalink = get_permalink($post_id);
                        $year      = get_post_meta($post_id, 'award_year', true);
                        if (empty($year)) {
                            $year = get_the_date('Y', $post_id);
                        }
                        $thumb_id  = get_post_thumbnail_id($post_id);
                        $image_url = $thumb_id ? wp_get_attachment_image_url($thumb_id, 'medium_large') : '';
                        $title     = get_the_title();
                        $desc      = has_excerpt() ? get_the_excerpt() : wp_trim_words(get_the_content(), 20);
                        $card_style = 'background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,0.05);transition:0.3s;display:flex;flex-direction:column;height:100%;';
                        ?>
                        <?php if ($show_btn) : ?>
                        <div
                            class="award-item stagger-up"
                            style="<?php echo esc_attr($card_style); ?>"
                        >
                            <?php if ($image_url) : ?>
                                <div class="award-img-wrap" style="height:<?php echo absint($atts['imageHeight']); ?>px;overflow:hidden;position:relative;">
                                    <img
                                        src="<?php echo esc_url($image_url); ?>"
                                        alt="<?php echo esc_attr($title); ?>"
                                        decoding="async"
                                        style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;transition:0.5s;"
                                    />
                                </div>
                            <?php endif; ?>

                            <div class="award-content" style="padding:<?php echo absint($atts['contentPadding']); ?>px;flex:1;display:flex;flex-direction:column;">
                                <?php if ($year) : ?>
                                    <span
                                        class="award-year"
                                        style="color:<?php echo esc_attr($atts['yearColor']); ?>;font-weight:700;font-size:<?php echo floatval($atts['yearFontSize']); ?>rem;margin-bottom:5px;display:block;"
                                    >
                                        <?php echo esc_html($year); ?>
                                    </span>
                                <?php endif; ?>

                                <?php if ($title) : ?>
                                    <h4 style="margin:0 0 10px;font-size:<?php echo floatval($atts['titleFontSize']); ?>rem;color:#212121;">
                                        <?php echo esc_html($title); ?>
                                    </h4>
                                <?php endif; ?>

                                <?php if ($desc) : ?>
                                    <p style="margin:0;font-size:<?php echo floatval($atts['descFontSize']); ?>rem;color:#666;line-height:1.6;flex:1;">
                                        <?php echo esc_html($desc); ?>
                                    </p>
                                <?php endif; ?>

                                <a
                                    href="<?php echo esc_url($permalink); ?>"
                                    class="award-read-more jivaka-btn btn-primary"
                                    rel="bookmark"
                                >
                                    <?php echo esc_html($btn_label); ?>
                                </a>
                            </div>
                        </div>
                        <?php else : ?>
                        <a
                            href="<?php echo esc_url($permalink); ?>"
                            class="award-item award-item-link stagger-up"
                            style="<?php echo esc_attr($card_style); ?>text-decoration:none;color:inherit;"
                            rel="bookmark"
                        >
                            <?php if ($image_url) : ?>
                                <div class="award-img-wrap" style="height:<?php echo absint($atts['imageHeight']); ?>px;overflow:hidden;position:relative;">
                                    <img
                                        src="<?php echo esc_url($image_url); ?>"
                                        alt="<?php echo esc_attr($title); ?>"
                                        decoding="async"
                                        style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block;transition:0.5s;"
                                    />
                                </div>
                            <?php endif; ?>

                            <div class="award-content" style="padding:<?php echo absint($atts['contentPadding']); ?>px;">
                                <?php if ($year) : ?>
                                    <span
                                        class="award-year"
                                        style="color:<?php echo esc_attr($atts['yearColor']); ?>;font-weight:700;font-size:<?php echo floatval($atts['yearFontSize']); ?>rem;margin-bottom:5px;display:block;"
                                    >
                                        <?php echo esc_html($year); ?>
                                    </span>
                                <?php endif; ?>

                                <?php if ($title) : ?>
                                    <h4 style="margin:0 0 10px;font-size:<?php echo floatval($atts['titleFontSize']); ?>rem;color:#212121;">
                                        <?php echo esc_html($title); ?>
                                    </h4>
                                <?php endif; ?>

                                <?php if ($desc) : ?>
                                    <p style="margin:0;font-size:<?php echo floatval($atts['descFontSize']); ?>rem;color:#666;line-height:1.6;">
                                        <?php echo esc_html($desc); ?>
                                    </p>
                                <?php endif; ?>
                            </div>
                        </a>
                        <?php endif; ?>
                        <?php
                    endwhile;
                    wp_reset_postdata();
                else :
                    $empty_msg = __('No posts found.', 'twork-builder');
                    if (!$has_valid_filter) {
                        if ($atts['source'] === 'category') {
                            $empty_msg = __('Please select a category in the block settings to display posts.', 'twork-builder');
                        } elseif ($atts['source'] === 'ids') {
                            $empty_msg = __('Please add specific posts in the block settings to display them.', 'twork-builder');
                        }
                    }
                    ?>
                    <div
                        class="award-item"
                        style="grid-column:1/-1;padding:40px;text-align:center;background:#fff;border-radius:12px;border:2px dashed #e0e0e0;color:#666;"
                    >
                        <p style="margin:0;">
                            <?php echo esc_html($empty_msg); ?>
                        </p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
