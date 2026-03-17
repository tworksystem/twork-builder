<?php
/**
 * Twork Updates Section – Hospital News & Updates
 *
 * Displays WordPress default posts in a card grid.
 * Source: recent (latest), category, or specific post IDs.
 *
 * @package TworkBuilder
 * @since 1.0.0
 */

defined('ABSPATH') || exit;

/**
 * Render callback for twork/updates-section dynamic block.
 * Fetches WordPress posts and outputs update cards.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 * @return string HTML output.
 */
function twork_render_updates_section($attributes, $content, $block)
{
    $defaults = array(
        'source'                    => 'recent',
        'categoryId'                => 0,
        'postIds'                   => array(),
        'numberOfItems'             => 3,
        'orderBy'                   => 'date',
        'order'                     => 'DESC',
        'backgroundColor'           => '#f9f9f9',
        'paddingTop'                => 80,
        'paddingBottom'             => 80,
        'showSectionTitle'          => true,
        'sectionTitle'              => 'Hospital News & Updates',
        'sectionTitleColor'         => '#212121',
        'sectionTitleFontSize'      => 2.5,
        'sectionTitleFontWeight'    => 700,
        'sectionTitleAlignment'     => 'center',
        'sectionTitleMarginBottom'  => 10,
        'showSectionSubtitle'       => true,
        'sectionSubtitle'           => 'Read our latest articles and stay informed.',
        'sectionSubtitleColor'      => '#666666',
        'sectionSubtitleFontSize'   => 1.1,
        'sectionSubtitleMarginBottom' => 50,
        'containerMaxWidth'         => 1200,
        'containerPadding'          => 30,
        'columns'                   => 3,
        'columnsTablet'             => 2,
        'columnsMobile'             => 1,
        'gap'                       => 30,
        'imageHeight'               => 200,
        'contentPadding'            => 20,
        'metaColor'                 => '#666666',
        'metaFontSize'              => 0.9,
        'titleFontSize'             => 1.3,
        'excerptFontSize'           => 1,
        'readMoreLabel'             => 'Read More →',
        'readMoreColor'             => '#f48b2a',
        'hoverEffect'               => true,
        'hoverTranslateY'           => -5,
        'animationOnScroll'         => true,
        'animationType'             => 'fadeInUp',
        'animationDelay'             => 100,
        'showBlogLink'              => false,
        'blogLinkText'              => __('View All on Blog', 'twork-builder'),
        'blogLinkUrl'               => '',
    );

    $atts = wp_parse_args($attributes, $defaults);

    // Resolve blog link URL: attribute, or WordPress "Posts page" if set
    $blog_href = '';
    if (!empty($atts['blogLinkUrl'])) {
        $blog_href = $atts['blogLinkUrl'];
    } elseif (get_option('page_for_posts')) {
        $blog_href = get_permalink((int) get_option('page_for_posts'));
    }
    $show_blog_link = !empty($atts['showBlogLink']) && $blog_href !== '';

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
        // 'recent' – latest posts, no category filter
        $has_valid_filter = true;
    }

    if (!$has_valid_filter) {
        $query_args['post__in'] = array(0);
    }

    $updates_query = new WP_Query($query_args);

    $section_style = sprintf(
        'background-color:%s;padding-top:%dpx;padding-bottom:%dpx;--hover-translate-y:%dpx;',
        esc_attr($atts['backgroundColor']),
        absint($atts['paddingTop']),
        absint($atts['paddingBottom']),
        $atts['hoverEffect'] ? absint($atts['hoverTranslateY']) : 0
    );

    $grid_style = sprintf(
        '--updates-columns:%d;--updates-columns-tablet:%d;--updates-columns-mobile:%d;--updates-gap:%dpx;--update-image-height:%dpx;--update-content-padding:%dpx;--meta-color:%s;--meta-font-size:%srem;--title-font-size:%srem;--excerpt-font-size:%srem;--read-more-color:%s;',
        absint($atts['columns']),
        absint($atts['columnsTablet']),
        absint($atts['columnsMobile']),
        absint($atts['gap']),
        absint($atts['imageHeight']),
        absint($atts['contentPadding']),
        esc_attr($atts['metaColor']),
        floatval($atts['metaFontSize']),
        floatval($atts['titleFontSize']),
        floatval($atts['excerptFontSize']),
        esc_attr($atts['readMoreColor'])
    );

    $title_style = sprintf(
        '--section-title-alignment:%s;--section-title-color:%s;--section-title-font-size:%srem;--section-title-font-weight:%d;--section-title-margin-bottom:%dpx;',
        esc_attr($atts['sectionTitleAlignment']),
        esc_attr($atts['sectionTitleColor']),
        floatval($atts['sectionTitleFontSize']),
        absint($atts['sectionTitleFontWeight']),
        absint($atts['sectionTitleMarginBottom'])
    );

    $subtitle_style = sprintf(
        '--section-subtitle-color:%s;--section-subtitle-font-size:%srem;--section-subtitle-margin-bottom:%dpx;',
        esc_attr($atts['sectionSubtitleColor']),
        floatval($atts['sectionSubtitleFontSize']),
        absint($atts['sectionSubtitleMarginBottom'])
    );

    ob_start();
    ?>
    <section
        class="updates-section jivaka-section twork-updates-section wp-block-twork-updates-section"
        style="<?php echo esc_attr($section_style); ?>"
        data-hover-effect="<?php echo $atts['hoverEffect'] ? 'true' : 'false'; ?>"
        data-animation="<?php echo $atts['animationOnScroll'] ? 'true' : 'false'; ?>"
        data-animation-type="<?php echo esc_attr($atts['animationType']); ?>"
        data-animation-delay="<?php echo absint($atts['animationDelay']); ?>"
    >
        <div
            class="jivaka-container"
            style="max-width:<?php echo absint($atts['containerMaxWidth']); ?>px;margin:0 auto;padding:0 <?php echo absint($atts['containerPadding']); ?>px;position:relative;z-index:2;"
        >
            <?php if ($atts['showSectionTitle'] || $atts['showSectionSubtitle']) : ?>
                <div class="jivaka-section-title" style="<?php echo esc_attr($title_style . $subtitle_style); ?>">
                    <?php if ($atts['showSectionTitle']) : ?>
                        <h2><?php echo esc_html($atts['sectionTitle']); ?></h2>
                    <?php endif; ?>
                    <?php if ($atts['showSectionSubtitle']) : ?>
                        <p><?php echo esc_html($atts['sectionSubtitle']); ?></p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div class="updates-grid" style="<?php echo esc_attr($grid_style); ?>">
                <?php
                if ($updates_query->have_posts()) :
                    $read_more_label = !empty($atts['readMoreLabel']) ? $atts['readMoreLabel'] : __('Read More →', 'twork-builder');
                    $idx = 0;
                    while ($updates_query->have_posts()) :
                        $updates_query->the_post();
                        $post_id   = get_the_ID();
                        $permalink = get_permalink($post_id);
                        $date_str  = get_the_date('', $post_id);
                        $author    = get_the_author();
                        $meta_str  = $date_str . ' | By ' . esc_html($author);
                        $thumb_id  = get_post_thumbnail_id($post_id);
                        $image_url = $thumb_id ? wp_get_attachment_image_url($thumb_id, 'medium_large') : '';
                        $title     = get_the_title();
                        $excerpt   = has_excerpt() ? get_the_excerpt() : wp_trim_words(get_the_content(), 20);
                        $idx++;
                        $stagger = $atts['animationOnScroll'] ? ' stagger-up' : '';
                        ?>
                        <article class="update-post<?php echo esc_attr($stagger); ?>" style="<?php echo $atts['animationOnScroll'] ? 'transition-delay:' . (($idx - 1) * $atts['animationDelay'] / 1000) . 's;' : ''; ?>">
                            <a href="<?php echo esc_url($permalink); ?>" aria-hidden="true" tabindex="-1">
                                <?php if ($image_url) : ?>
                                    <img
                                        src="<?php echo esc_url($image_url); ?>"
                                        alt="<?php echo esc_attr($title); ?>"
                                        decoding="async"
                                        loading="lazy"
                                    />
                                <?php else : ?>
                                    <div style="height:<?php echo absint($atts['imageHeight']); ?>px;background:#e0e0e0;display:flex;align-items:center;justify-content:center;color:#999;font-size:0.9rem;">
                                        <?php esc_html_e('No image', 'twork-builder'); ?>
                                    </div>
                                <?php endif; ?>
                            </a>
                            <div class="update-content">
                                <p class="meta"><?php echo esc_html($meta_str); ?></p>
                                <h3>
                                    <a href="<?php echo esc_url($permalink); ?>" rel="bookmark"><?php echo esc_html($title); ?></a>
                                </h3>
                                <p><?php echo esc_html($excerpt); ?></p>
                                <a href="<?php echo esc_url($permalink); ?>" class="update-read-more" rel="bookmark" aria-label="<?php echo esc_attr(sprintf(__('Read more about %s', 'twork-builder'), $title)); ?>">
                                    <?php echo esc_html($read_more_label); ?>
                                </a>
                            </div>
                        </article>
                        <?php
                    endwhile;
                    wp_reset_postdata();
                else :
                    $empty_msg = __('No posts found.', 'twork-builder');
                    if (!$has_valid_filter) {
                        if ($atts['source'] === 'category') {
                            $empty_msg = __('Please select a category in the block settings to display posts.', 'twork-builder');
                        } elseif ($atts['source'] === 'ids') {
                            $empty_msg = __('Please add specific posts in the block settings.', 'twork-builder');
                        }
                    }
                    ?>
                    <div
                        class="update-post"
                        style="grid-column:1/-1;padding:40px;text-align:center;background:#fff;border:2px dashed #e0e0e0;border-radius:5px;color:#666;"
                    >
                        <p style="margin:0;"><?php echo esc_html($empty_msg); ?></p>
                    </div>
                <?php endif; ?>
            </div>

            <?php if ($show_blog_link) : ?>
                <?php
                $label = !empty($atts['blogLinkText']) ? $atts['blogLinkText'] : __('View All on Blog', 'twork-builder');
                ?>
                <div class="updates-section-blog-link">
                    <a href="<?php echo esc_url($blog_href); ?>" class="updates-blog-link-btn">
                        <?php echo esc_html($label); ?>
                        <span aria-hidden="true">→</span>
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
