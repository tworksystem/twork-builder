<?php
/**
 * Twork CSR Initiative - Post Meta for Initiatives Section
 *
 * Displays posts from WP Admin → Posts. Uses csr_icon_class meta for
 * Font Awesome icon (e.g. fas fa-ambulance). Featured image, title, excerpt.
 *
 * @package TworkBuilder
 * @since 1.0.0
 */

defined('ABSPATH') || exit;

/**
 * Register csr_icon_class meta for default 'post' type.
 * Font Awesome class for initiative card icon.
 */
function twork_register_csr_icon_meta()
{
    register_post_meta(
        'post',
        'csr_icon_class',
        array(
            'show_in_rest'      => true,
            'single'            => true,
            'type'              => 'string',
            'default'           => 'fas fa-heart',
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback'     => function () {
                return current_user_can('edit_posts');
            },
            'description'       => __('Font Awesome icon class for CSR Initiatives block (e.g. fas fa-ambulance).', 'twork-builder'),
        )
    );
}
add_action('init', 'twork_register_csr_icon_meta');

/**
 * Add CSR Icon meta box to Post edit screen
 */
function twork_post_csr_icon_meta_box()
{
    add_meta_box(
        'twork_csr_icon',
        __('CSR Initiative Icon (optional)', 'twork-builder'),
        'twork_post_csr_icon_callback',
        'post',
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'twork_post_csr_icon_meta_box');

function twork_post_csr_icon_callback($post)
{
    wp_nonce_field('twork_csr_icon_nonce', 'twork_csr_icon_nonce');
    $icon = get_post_meta($post->ID, 'csr_icon_class', true) ?: 'fas fa-heart';
    ?>
    <p>
        <label for="csr_icon_class"><?php esc_html_e('Font Awesome class', 'twork-builder'); ?></label>
        <input type="text" id="csr_icon_class" name="csr_icon_class" value="<?php echo esc_attr($icon); ?>" class="widefat" placeholder="fas fa-ambulance" />
        <span class="description"><?php esc_html_e('e.g. fas fa-ambulance, fas fa-heart', 'twork-builder'); ?></span>
    </p>
    <?php
}

function twork_post_save_csr_icon_meta($post_id)
{
    if (!isset($_POST['twork_csr_icon_nonce']) ||
        !wp_verify_nonce($_POST['twork_csr_icon_nonce'], 'twork_csr_icon_nonce')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    if (isset($_POST['csr_icon_class'])) {
        $val = sanitize_text_field($_POST['csr_icon_class']);
        update_post_meta($post_id, 'csr_icon_class', $val ?: 'fas fa-heart');
    }
}
add_action('save_post_post', 'twork_post_save_csr_icon_meta');

/**
 * Render callback for twork/csr-initiatives-section dynamic block.
 * Fetches WordPress Posts (by category or selected IDs) and outputs initiative cards.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 * @return string HTML output.
 */
function twork_render_csr_initiatives_section($attributes, $content, $block)
{
    $defaults = array(
        'source'                    => 'category',
        'categoryId'                => 0,
        'postIds'                   => array(),
        'numberOfItems'             => 6,
        'orderBy'                   => 'date',
        'order'                     => 'DESC',
        'backgroundColor'           => '#ffffff',
        'backgroundImage'           => '',
        'backgroundOverlay'         => false,
        'backgroundOverlayColor'    => 'rgba(0, 0, 0, 0.5)',
        'backgroundOverlayOpacity'  => 0.5,
        'paddingTop'                => 80,
        'paddingBottom'             => 80,
        'columns'                   => 3,
        'gap'                       => 30,
        'showSectionTitle'          => true,
        'sectionTitle'              => 'Our Core Initiatives',
        'sectionTitleColor'         => '#212121',
        'sectionTitleFontSize'      => 2.2,
        'sectionTitleFontWeight'    => 700,
        'sectionTitleAlignment'     => 'center',
        'sectionTitleMarginBottom'  => 20,
        'showSectionSubtitle'       => true,
        'sectionSubtitle'           => 'We focus on sustainable health projects that provide long-term benefits to underprivileged communities.',
        'sectionSubtitleColor'      => '#666666',
        'sectionSubtitleFontSize'   => 1.1,
        'sectionSubtitleMarginBottom' => 60,
        'containerMaxWidth'         => 1200,
        'containerPadding'          => 30,
        'imageHeight'               => 220,
        'iconColor'                 => '#f48b2a',
        'iconBgColor'               => '#fff3e0',
        'iconSize'                  => 1.5,
        'titleFontSize'             => 1.3,
        'titleFontWeight'           => 700,
        'descFontSize'              => 0.95,
        'contentPadding'            => 30,
        'showReadMoreButton'        => true,
        'readMoreLabel'             => 'View Detail',
        'hoverEffect'               => true,
        'hoverTranslateY'           => -8,
        'animationOnScroll'         => true,
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

    if (!$has_valid_filter) {
        $query_args['post__in'] = array(0);
    }

    $init_query = new WP_Query($query_args);

    $section_style = array(
        'background-color'    => $atts['backgroundColor'],
        'background-image'    => $atts['backgroundImage'] ? 'url(' . esc_url($atts['backgroundImage']) . ')' : 'none',
        'background-size'     => 'cover',
        'background-position' => 'center',
        'padding-top'         => $atts['paddingTop'] . 'px',
        'padding-bottom'      => $atts['paddingBottom'] . 'px',
        '--hover-translate-y' => $atts['hoverTranslateY'] . 'px',
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
        class="section-padding twork-csr-initiatives-section wp-block-twork-csr-initiatives-section"
        style="<?php echo esc_attr($section_style_str); ?>"
        data-hover-effect="<?php echo $atts['hoverEffect'] ? 'true' : 'false'; ?>"
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
            <?php if ($atts['showSectionTitle'] || $atts['showSectionSubtitle']) : ?>
                <div
                    class="intro-text fade-up"
                    style="text-align:<?php echo esc_attr($atts['sectionTitleAlignment']); ?>;max-width:800px;margin:0 auto <?php echo absint($atts['sectionSubtitleMarginBottom']); ?>px;"
                >
                    <?php if ($atts['showSectionTitle']) : ?>
                        <h2 style="font-size:<?php echo floatval($atts['sectionTitleFontSize']); ?>rem;font-weight:<?php echo absint($atts['sectionTitleFontWeight']); ?>;color:<?php echo esc_attr($atts['sectionTitleColor']); ?>;margin-bottom:<?php echo absint($atts['sectionTitleMarginBottom']); ?>px;">
                            <?php echo esc_html($atts['sectionTitle']); ?>
                        </h2>
                    <?php endif; ?>
                    <?php if ($atts['showSectionSubtitle']) : ?>
                        <p style="font-size:<?php echo floatval($atts['sectionSubtitleFontSize']); ?>rem;color:<?php echo esc_attr($atts['sectionSubtitleColor']); ?>;margin:0;line-height:1.6;">
                            <?php echo esc_html($atts['sectionSubtitle']); ?>
                        </p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div
                class="initiatives-grid"
                style="display:grid;grid-template-columns:repeat(<?php echo absint($atts['columns']); ?>,1fr);gap:<?php echo absint($atts['gap']); ?>px;"
            >
                <?php
                if ($init_query->have_posts()) :
                    $show_btn   = ! empty($atts['showReadMoreButton']);
                    $btn_label  = ! empty($atts['readMoreLabel']) ? $atts['readMoreLabel'] : __('View Detail', 'twork-builder');
                    $card_style = 'display:flex;flex-direction:column;height:100%;transition:0.4s ease;';
                    $idx        = 0;
                    while ($init_query->have_posts()) :
                        $init_query->the_post();
                        $post_id   = get_the_ID();
                        $permalink = get_permalink($post_id);
                        $icon      = get_post_meta($post_id, 'csr_icon_class', true) ?: 'fas fa-heart';
                        $thumb_id  = get_post_thumbnail_id($post_id);
                        $image_url = $thumb_id ? wp_get_attachment_image_url($thumb_id, 'medium_large') : '';
                        $title     = get_the_title();
                        $desc      = has_excerpt() ? get_the_excerpt() : wp_trim_words(get_the_content(), 30);
                        $idx++;
                        ?>
                        <?php if ($show_btn) : ?>
                        <div
                            class="initiative-card stagger-card animate-on-scroll"
                            style="transition-delay:<?php echo (float) ($idx * 0.1); ?>s;<?php echo esc_attr($card_style); ?>"
                        >
                            <?php if ($image_url) : ?>
                                <div class="init-img-wrap" style="height:<?php echo absint($atts['imageHeight']); ?>px;overflow:hidden;">
                                    <img
                                        src="<?php echo esc_url($image_url); ?>"
                                        alt="<?php echo esc_attr($title); ?>"
                                        decoding="async"
                                        style="width:100%;height:100%;object-fit:cover;display:block;transition:0.5s;"
                                    />
                                </div>
                            <?php endif; ?>

                            <div class="init-content" style="padding:<?php echo absint($atts['contentPadding']); ?>px;flex:1;display:flex;flex-direction:column;">
                                <div
                                    class="init-icon"
                                    style="color:<?php echo esc_attr($atts['iconColor']); ?>;background:<?php echo esc_attr($atts['iconBgColor']); ?>;font-size:<?php echo floatval($atts['iconSize']); ?>rem;width:50px;height:50px;display:flex;align-items:center;justify-content:center;border-radius:50%;margin-bottom:15px;"
                                >
                                    <i class="<?php echo esc_attr($icon); ?>" aria-hidden="true"></i>
                                </div>
                                <?php if ($title) : ?>
                                    <h3 style="margin:0 0 10px;font-size:<?php echo floatval($atts['titleFontSize']); ?>rem;font-weight:<?php echo absint($atts['titleFontWeight']); ?>;color:#212121;line-height:1.3;">
                                        <?php echo esc_html($title); ?>
                                    </h3>
                                <?php endif; ?>
                                <?php if ($desc) : ?>
                                    <p style="margin:0;font-size:<?php echo floatval($atts['descFontSize']); ?>rem;color:#666666;line-height:1.6;flex:1;">
                                        <?php echo esc_html($desc); ?>
                                    </p>
                                <?php endif; ?>

                                <a
                                    href="<?php echo esc_url($permalink); ?>"
                                    class="initiative-read-more jivaka-btn btn-primary"
                                    rel="bookmark"
                                >
                                    <?php echo esc_html($btn_label); ?>
                                </a>
                            </div>
                        </div>
                        <?php else : ?>
                        <a
                            href="<?php echo esc_url($permalink); ?>"
                            class="initiative-card initiative-card-link stagger-card animate-on-scroll"
                            style="transition-delay:<?php echo (float) ($idx * 0.1); ?>s;<?php echo esc_attr($card_style); ?>text-decoration:none;color:inherit;"
                            rel="bookmark"
                        >
                            <?php if ($image_url) : ?>
                                <div class="init-img-wrap" style="height:<?php echo absint($atts['imageHeight']); ?>px;overflow:hidden;">
                                    <img
                                        src="<?php echo esc_url($image_url); ?>"
                                        alt="<?php echo esc_attr($title); ?>"
                                        decoding="async"
                                        style="width:100%;height:100%;object-fit:cover;display:block;transition:0.5s;"
                                    />
                                </div>
                            <?php endif; ?>

                            <div class="init-content" style="padding:<?php echo absint($atts['contentPadding']); ?>px;">
                                <div
                                    class="init-icon"
                                    style="color:<?php echo esc_attr($atts['iconColor']); ?>;background:<?php echo esc_attr($atts['iconBgColor']); ?>;font-size:<?php echo floatval($atts['iconSize']); ?>rem;width:50px;height:50px;display:flex;align-items:center;justify-content:center;border-radius:50%;margin-bottom:15px;"
                                >
                                    <i class="<?php echo esc_attr($icon); ?>" aria-hidden="true"></i>
                                </div>
                                <?php if ($title) : ?>
                                    <h3 style="margin:0 0 10px;font-size:<?php echo floatval($atts['titleFontSize']); ?>rem;font-weight:<?php echo absint($atts['titleFontWeight']); ?>;color:#212121;line-height:1.3;">
                                        <?php echo esc_html($title); ?>
                                    </h3>
                                <?php endif; ?>
                                <?php if ($desc) : ?>
                                    <p style="margin:0;font-size:<?php echo floatval($atts['descFontSize']); ?>rem;color:#666666;line-height:1.6;">
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
                        class="initiative-card"
                        style="grid-column:1/-1;padding:40px;text-align:center;background:#fff;border-radius:12px;border:2px dashed #e0e0e0;color:#666;"
                    >
                        <p style="margin:0;"><?php echo esc_html($empty_msg); ?></p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
