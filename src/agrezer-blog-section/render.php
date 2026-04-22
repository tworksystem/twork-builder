<?php
/**
 * Dynamic render for twork/posts-grid.
 *
 * Attribute names MUST match src/agrezer-blog-section/block.json (e.g. categoryIds, excludeIds).
 *
 * @package TworkBuilder
 */

defined('ABSPATH') || exit;

if (!function_exists('twork_posts_grid_icon_svg')) {
    /**
     * Inline SVG for posts grid CTA icons (parity with agrezer-team-card ICONS).
     *
     * @param string $type     Icon key: diagonal-arrow, arrow-right, external, plus.
     * @param string $fallback Used when $type is unknown.
     * @return string
     */
    function twork_posts_grid_icon_svg($type, $fallback = 'diagonal-arrow')
    {
        $icons = array(
            'diagonal-arrow' => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>',
            'arrow-right'    => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
            'external'       => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
            'plus'           => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
        );
        $type = is_string($type) ? $type : '';
        if (!isset($icons[$type])) {
            $type = isset($icons[$fallback]) ? $fallback : 'diagonal-arrow';
        }
        return $icons[$type] ?? $icons['diagonal-arrow'];
    }
}

$attributes = (isset($attributes) && is_array($attributes)) ? $attributes : array();

// Singular keys are not in block.json; support them only for legacy/migrated content.
if (!isset($attributes['categoryIds']) && isset($attributes['categoryId'])) {
    $attributes['categoryIds'] = $attributes['categoryId'];
}
if (!isset($attributes['excludeIds']) && isset($attributes['excludeId'])) {
    $attributes['excludeIds'] = $attributes['excludeId'];
}

$defaults = array(
    'sectionTitle'      => 'Explore Our Latest<br>News &amp; Blog',
    'tagline'           => 'Read Our Blog',
    'tagIcon'           => '',
    'tagIconAlt'        => '',
    'tagIconMime'       => 'image',
    'moreButtonUrl'     => '',
    'moreButtonText'    => 'More News',
    'showMoreButtonIcon' => true,
    'moreButtonIconType' => 'diagonal-arrow',
    'showReadMoreIcon'  => true,
    'readMoreIconType'  => 'arrow-right',
    'moreButtonNewTab'  => false,
    'readMoreText'      => 'Read More',
    'postsToShow'       => 3,
    'columns'           => 3,
    'orderBy'           => 'date',
    'order'             => 'DESC',
    'categoryIds'       => array(),
    'excludeIds'        => array(),
    'offset'            => 0,
    'imageSize'         => 'large',
    'backgroundColor'   => '#FAFAFA',
    'paddingTop'        => 100,
    'paddingBottom'     => 100,
    'containerMaxWidth' => 1200,
    'containerWidthPct' => 90,
    'showAuthorMeta'    => true,
    'authorPrefix'      => '👤 ',
    'showCommentsMeta'  => true,
    'commentPrefix'     => '💬 ',
    'titleColor'                    => '#000000',
    'titleFontSize'                 => 48,
    'titleFontWeight'               => '700',
    'taglineColor'                  => '#222222',
    'taglineBackgroundColor'        => 'transparent',
    'taglineFontSize'               => 16,
    'taglineFontWeight'             => '600',
    'moreButtonTextColor'           => '#000000',
    'moreButtonBackgroundColor'     => '#dce55d',
    'moreButtonHoverTextColor'      => '#ffffff',
    'moreButtonHoverBackgroundColor'=> '#8bc34a',
    'postTitleColor'                => '#000000',
    'postTitleHoverColor'           => '#8bc34a',
    'postTitleFontSize'             => 22,
    'postTitleFontWeight'           => '700',
    'postMetaColor'                 => '#777777',
    'postMetaIconColor'             => '#8bc34a',
    'postMetaFontSize'              => 15,
    'postMetaFontWeight'            => '500',
    'dateBadgeBackgroundColor'      => '#8bc34a',
    'dateBadgeTextColor'            => '#ffffff',
    'dateBadgeBorderRadius'         => 12,
    'readMoreTextColor'             => '#000000',
    'readMoreBackgroundColor'       => 'transparent',
    'readMoreHoverTextColor'        => '#8bc34a',
    'readMoreHoverBackgroundColor'  => 'transparent',
    'readMoreIconColor'             => '#000000',
    'readMoreIconBackgroundColor'   => '#f5f5f5',
    'readMoreIconHoverColor'        => '#ffffff',
    'readMoreIconHoverBackgroundColor' => '#8bc34a',
    'cardBackgroundColor'           => '#ffffff',
    'cardBorderRadius'              => 20,
    'cardBorderColor'               => '#ebebeb',
    'cardBorderWidth'               => 1,
    'cardBoxShadow'                 => '0 0 0 rgba(0, 0, 0, 0)',
    'cardBoxShadowHover'            => '0 15px 40px rgba(0, 0, 0, 0.05)',
    'cardHoverTranslateY'           => -10,
    'imageAspectRatio'              => '16/9',
    'imageObjectFit'                => 'cover',
    'imageHeight'                   => 260,
    'imageBorderRadius'             => 0,
    'imageOverlayColor'             => '#000000',
    'imageOverlayOpacity'           => 0,
    'imageOverlayGradient'          => '',
    'imageOverlayHoverColor'        => '#000000',
    'imageOverlayHoverOpacity'      => 0,
    'imageOverlayHoverGradient'     => '',
);

$atts = wp_parse_args($attributes, $defaults);

$twork_hex_to_rgba = static function ($color, $opacity) {
    $color = is_string($color) ? trim($color) : '';
    if (!preg_match('/^#([a-f0-9]{3}|[a-f0-9]{6})$/i', $color)) {
        $color = '#000000';
    }
    $hex = ltrim($color, '#');
    if (strlen($hex) === 3) {
        $hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
    }
    $int = hexdec($hex);
    $r = ($int >> 16) & 255;
    $g = ($int >> 8) & 255;
    $b = $int & 255;
    $o = max(0, min(1, (float) $opacity));
    return sprintf('rgba(%d,%d,%d,%.2f)', $r, $g, $b, $o);
};

// wp_parse_args uses array_merge: explicit null in saved attrs can override defaults.
foreach (array('categoryIds', 'excludeIds') as $list_key) {
    if (!isset($atts[$list_key]) || !is_array($atts[$list_key])) {
        $atts[$list_key] = array();
    }
}

/**
 * Normalize block list attributes into a clean list of positive integers.
 *
 * @param mixed $raw Array, comma-separated string, single scalar, or empty.
 * @return int[]
 */
$twork_normalize_post_grid_ids = static function ($raw) {
    if (is_array($raw)) {
        $out = array_map('absint', $raw);
    } elseif (is_string($raw) && $raw !== '') {
        $out = array_map('absint', array_map('trim', explode(',', $raw)));
    } elseif ($raw === null || $raw === '' || false === $raw) {
        return array();
    } else {
        $out = array(absint($raw));
    }
    $out = array_filter(
        $out,
        static function ($id) {
            return $id > 0;
        }
    );
    return array_values(array_unique($out));
};

$category_ids = $twork_normalize_post_grid_ids($atts['categoryIds']);
$exclude_ids  = $twork_normalize_post_grid_ids($atts['excludeIds']);

$posts_to_show = isset($atts['postsToShow']) ? (int) $atts['postsToShow'] : 3;
$posts_to_show = max(1, min(12, $posts_to_show));

$columns = isset($atts['columns']) ? (int) $atts['columns'] : 3;
$columns = max(1, min(4, $columns));

$offset = isset($atts['offset']) ? (int) $atts['offset'] : 0;
$offset = max(0, $offset);

$orderby_raw     = isset($atts['orderBy']) ? (string) $atts['orderBy'] : 'date';
$allowed_orderby = array('date', 'title', 'modified', 'comment_count', 'rand');
$orderby         = in_array($orderby_raw, $allowed_orderby, true) ? $orderby_raw : 'date';

$order = isset($atts['order']) && strtoupper((string) $atts['order']) === 'ASC' ? 'ASC' : 'DESC';

$query_args = array(
    'post_type'           => 'post',
    'post_status'         => 'publish',
    'posts_per_page'      => $posts_to_show,
    'offset'              => $offset,
    'orderby'             => $orderby,
    'order'               => $order,
    'ignore_sticky_posts' => true,
    'no_found_rows'       => true,
);

// Never pass empty arrays — WordPress treats category__in => array() as "match nothing".
if (!empty($category_ids)) {
    $query_args['category__in'] = $category_ids;
}

if (!empty($exclude_ids)) {
    $query_args['post__not_in'] = $exclude_ids;
}

$image_size = sanitize_key((string) $atts['imageSize']);
if ($image_size === '') {
    $image_size = 'large';
}

$q = new WP_Query($query_args);

// Resolve "More news" URL.
$more_url = (string) $atts['moreButtonUrl'];
if ($more_url === '' || $more_url === '#') {
    $posts_page = (int) get_option('page_for_posts');
    $more_url   = $posts_page ? get_permalink($posts_page) : home_url('/');
}

$wrapper_attributes = '';
if (function_exists('get_block_wrapper_attributes')) {
    $overlay_opacity       = max(0, min(100, (int) $atts['imageOverlayOpacity'])) / 100;
    $overlay_hover_opacity = max(0, min(100, (int) $atts['imageOverlayHoverOpacity'])) / 100;
    $overlay_css = (string) $atts['imageOverlayGradient'];
    $overlay_hover_css = (string) $atts['imageOverlayHoverGradient'];
    if ($overlay_css === '') {
        $overlay_css = $twork_hex_to_rgba((string) $atts['imageOverlayColor'], $overlay_opacity);
    }
    if ($overlay_hover_css === '') {
        $overlay_hover_css = $twork_hex_to_rgba((string) $atts['imageOverlayHoverColor'], $overlay_hover_opacity);
    }
    $image_aspect = (string) $atts['imageAspectRatio'];
    if (!in_array($image_aspect, array('16/9', '4/3', '1/1', 'auto'), true)) {
        $image_aspect = '16/9';
    }
    $extra = array(
        'class' => 'twork-blog',
        'style' => sprintf(
            'background-color:%s;padding-top:%dpx;padding-bottom:%dpx;--twork-blog-cols:%d;--twork-blog-max:%dpx;--twork-blog-width:%d%%;--twork-title-color:%s;--twork-title-size:%dpx;--twork-title-weight:%s;--twork-tagline-color:%s;--twork-tagline-bg:%s;--twork-tagline-size:%dpx;--twork-tagline-weight:%s;--twork-more-text:%s;--twork-more-bg:%s;--twork-more-text-hover:%s;--twork-more-bg-hover:%s;--twork-card-title-color:%s;--twork-card-title-hover:%s;--twork-card-title-size:%dpx;--twork-card-title-weight:%s;--twork-meta-color:%s;--twork-meta-icon-color:%s;--twork-meta-size:%dpx;--twork-meta-weight:%s;--twork-date-bg:%s;--twork-date-text:%s;--twork-date-radius:%dpx;--twork-read-text:%s;--twork-read-bg:%s;--twork-read-text-hover:%s;--twork-read-bg-hover:%s;--twork-read-icon:%s;--twork-read-icon-bg:%s;--twork-read-icon-hover:%s;--twork-read-icon-bg-hover:%s;--twork-card-bg:%s;--twork-card-radius:%dpx;--twork-card-border:%s;--twork-card-border-width:%dpx;--twork-card-shadow:%s;--twork-card-shadow-hover:%s;--twork-card-lift:%dpx;--twork-img-height:%dpx;--twork-img-fit:%s;--twork-img-radius:%dpx;--twork-img-aspect:%s;--twork-img-overlay:%s;--twork-img-overlay-hover:%s;',
            esc_attr((string) $atts['backgroundColor']),
            (int) $atts['paddingTop'],
            (int) $atts['paddingBottom'],
            $columns,
            (int) $atts['containerMaxWidth'],
            (int) $atts['containerWidthPct'],
            esc_attr((string) $atts['titleColor']),
            (int) $atts['titleFontSize'],
            esc_attr((string) $atts['titleFontWeight']),
            esc_attr((string) $atts['taglineColor']),
            esc_attr((string) $atts['taglineBackgroundColor']),
            (int) $atts['taglineFontSize'],
            esc_attr((string) $atts['taglineFontWeight']),
            esc_attr((string) $atts['moreButtonTextColor']),
            esc_attr((string) $atts['moreButtonBackgroundColor']),
            esc_attr((string) $atts['moreButtonHoverTextColor']),
            esc_attr((string) $atts['moreButtonHoverBackgroundColor']),
            esc_attr((string) $atts['postTitleColor']),
            esc_attr((string) $atts['postTitleHoverColor']),
            (int) $atts['postTitleFontSize'],
            esc_attr((string) $atts['postTitleFontWeight']),
            esc_attr((string) $atts['postMetaColor']),
            esc_attr((string) $atts['postMetaIconColor']),
            (int) $atts['postMetaFontSize'],
            esc_attr((string) $atts['postMetaFontWeight']),
            esc_attr((string) $atts['dateBadgeBackgroundColor']),
            esc_attr((string) $atts['dateBadgeTextColor']),
            (int) $atts['dateBadgeBorderRadius'],
            esc_attr((string) $atts['readMoreTextColor']),
            esc_attr((string) $atts['readMoreBackgroundColor']),
            esc_attr((string) $atts['readMoreHoverTextColor']),
            esc_attr((string) $atts['readMoreHoverBackgroundColor']),
            esc_attr((string) $atts['readMoreIconColor']),
            esc_attr((string) $atts['readMoreIconBackgroundColor']),
            esc_attr((string) $atts['readMoreIconHoverColor']),
            esc_attr((string) $atts['readMoreIconHoverBackgroundColor']),
            esc_attr((string) $atts['cardBackgroundColor']),
            (int) $atts['cardBorderRadius'],
            esc_attr((string) $atts['cardBorderColor']),
            (int) $atts['cardBorderWidth'],
            esc_attr((string) $atts['cardBoxShadow']),
            esc_attr((string) $atts['cardBoxShadowHover']),
            (int) $atts['cardHoverTranslateY'],
            (int) $atts['imageHeight'],
            esc_attr((string) $atts['imageObjectFit']),
            (int) $atts['imageBorderRadius'],
            esc_attr($image_aspect),
            esc_attr($overlay_css),
            esc_attr($overlay_hover_css)
        ),
    );
    if (isset($block) && $block instanceof WP_Block) {
        $wrapper_attributes = get_block_wrapper_attributes($extra, $block);
    } else {
        $wrapper_attributes = get_block_wrapper_attributes($extra);
    }
}

$more_target = !empty($atts['moreButtonNewTab']);
$tag_icon_url = (string) $atts['tagIcon'];
$tag_icon_mime = (string) $atts['tagIconMime'];
$tag_icon_is_video = (strpos($tag_icon_mime, 'video') === 0) || preg_match('/\.(mp4|webm|ogg)$/i', $tag_icon_url);

ob_start();
?>
<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <div class="twork-blog__container">
        <div class="twork-blog__header-row">
            <div class="twork-blog__header-left">
                <?php if (!empty($atts['tagline']) || !empty($atts['tagIcon'])) : ?>
                    <div class="twork-blog__tagline">
                        <?php if (!empty($atts['tagIcon'])) : ?>
                            <?php if ($tag_icon_is_video) : ?>
                                <video
                                    src="<?php echo esc_url($tag_icon_url); ?>"
                                    class="twork-blog__tag-icon twork-blog__tag-icon--media"
                                    autoplay
                                    loop
                                    muted
                                    playsinline
                                ></video>
                            <?php else : ?>
                                <img
                                    src="<?php echo esc_url($tag_icon_url); ?>"
                                    alt="<?php echo esc_attr((string) $atts['tagIconAlt']); ?>"
                                    class="twork-blog__tag-icon"
                                    width="20"
                                    height="20"
                                    loading="lazy"
                                    decoding="async"
                                />
                            <?php endif; ?>
                        <?php endif; ?>
                        <?php if (!empty($atts['tagline'])) : ?>
                            <span><?php echo wp_kses_post((string) $atts['tagline']); ?></span>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>

                <?php if (!empty($atts['sectionTitle'])) : ?>
                    <h2 class="twork-blog__title"><?php echo wp_kses_post((string) $atts['sectionTitle']); ?></h2>
                <?php endif; ?>
            </div>

            <div class="twork-blog__header-right">
                <a
                    href="<?php echo esc_url($more_url); ?>"
                    class="twork-blog__more-btn"
                    <?php echo $more_target ? 'target="_blank" rel="noopener noreferrer"' : ''; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                >
                    <span class="twork-blog__more-btn-label"><?php echo esc_html((string) $atts['moreButtonText']); ?></span>
                    <?php if (!empty($atts['showMoreButtonIcon'])) : ?>
                        <span class="twork-blog__more-btn-icon" aria-hidden="true"><?php echo twork_posts_grid_icon_svg((string) $atts['moreButtonIconType'], 'diagonal-arrow'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
                    <?php endif; ?>
                </a>
            </div>
        </div>

        <div class="twork-blog__grid">
            <?php
            if ($q->have_posts()) :
                while ($q->have_posts()) :
                    $q->the_post();
                    $post_id   = get_the_ID();
                    $permalink = get_permalink($post_id);
                    $title     = get_the_title($post_id);
                    $thumb_id  = get_post_thumbnail_id($post_id);
                    $img_url   = '';
                    if ($thumb_id) {
                        $img_url = wp_get_attachment_image_url($thumb_id, $image_size);
                        if (!$img_url) {
                            foreach (array('large', 'medium_large', 'medium', 'thumbnail', 'full') as $fb_size) {
                                $try = wp_get_attachment_image_url($thumb_id, $fb_size);
                                if ($try) {
                                    $img_url = $try;
                                    break;
                                }
                            }
                        }
                    }
                    $day       = get_the_date('j', $post_id);
                    $month     = get_the_date('M', $post_id);
                    $comments  = (int) get_comments_number($post_id);
                    $author_id = (int) get_post_field('post_author', $post_id);
                    $author    = $author_id ? get_the_author_meta('display_name', $author_id) : '';
                    ?>
                    <article class="twork-blog-card">
                        <div class="twork-blog-card__img-box">
                            <?php if ($img_url) : ?>
                                <a href="<?php echo esc_url($permalink); ?>" class="twork-blog-card__img-link">
                                    <img
                                        src="<?php echo esc_url($img_url); ?>"
                                        class="twork-blog-card__img"
                                        alt="<?php echo esc_attr($title); ?>"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <span class="twork-blog-card__img-overlay" aria-hidden="true"></span>
                                </a>
                            <?php else : ?>
                                <a
                                    href="<?php echo esc_url($permalink); ?>"
                                    class="twork-blog-card__img-link twork-blog-card__img-link--placeholder"
                                    aria-hidden="true"
                                    tabindex="-1"
                                >
                                    <span class="twork-blog-card__img-placeholder"></span>
                                </a>
                            <?php endif; ?>

                            <div class="twork-blog-card__date" aria-hidden="true">
                                <span class="twork-blog-card__date-day"><?php echo esc_html($day); ?></span>
                                <span class="twork-blog-card__date-month"><?php echo esc_html($month); ?></span>
                            </div>
                        </div>

                        <div class="twork-blog-card__content">
                            <?php if (!empty($atts['showAuthorMeta']) || !empty($atts['showCommentsMeta'])) : ?>
                                <div class="twork-blog-card__meta">
                                    <?php if (!empty($atts['showAuthorMeta'])) : ?>
                                        <span>
                                            <span class="twork-blog-card__meta-icon" aria-hidden="true">●</span>
                                            <?php
                                            if ((string) $atts['authorPrefix'] !== '') {
                                                echo wp_kses_post((string) $atts['authorPrefix']);
                                            }
                                            echo esc_html($author);
                                            ?>
                                        </span>
                                    <?php endif; ?>

                                    <?php if (!empty($atts['showCommentsMeta'])) : ?>
                                        <span>
                                            <span class="twork-blog-card__meta-icon" aria-hidden="true">●</span>
                                            <?php
                                            if ((string) $atts['commentPrefix'] !== '') {
                                                echo wp_kses_post((string) $atts['commentPrefix']);
                                            }
                                            echo esc_html(
                                                sprintf(
                                                    /* translators: %d: number of comments */
                                                    _n('%d Comment', '%d Comments', $comments, 'twork-builder'),
                                                    $comments
                                                )
                                            );
                                            ?>
                                        </span>
                                    <?php endif; ?>
                                </div>
                            <?php endif; ?>

                            <h3 class="twork-blog-card__title">
                                <a href="<?php echo esc_url($permalink); ?>"><?php echo esc_html($title); ?></a>
                            </h3>

                            <div class="twork-blog-card__footer">
                                <a href="<?php echo esc_url($permalink); ?>" class="twork-blog-card__read-btn">
                                    <?php echo esc_html((string) $atts['readMoreText']); ?>
                                    <?php if (!empty($atts['showReadMoreIcon'])) : ?>
                                        <span class="icon-circle" aria-hidden="true"><?php echo twork_posts_grid_icon_svg((string) $atts['readMoreIconType'], 'arrow-right'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
                                    <?php endif; ?>
                                </a>
                            </div>
                        </div>
                    </article>
                    <?php
                endwhile;
                wp_reset_postdata();
            else :
                $debug_payload = array(
                    'post_count'   => (int) $q->post_count,
                    'category__in' => !empty($category_ids) ? $category_ids : null,
                    'post__not_in' => !empty($exclude_ids) ? $exclude_ids : null,
                    'posts_per_pg' => $posts_to_show,
                    'offset'       => $offset,
                );
                // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Debug JSON inside HTML comment only.
                echo "\n<!-- twork/posts-grid: no posts matched query. " . esc_html(wp_json_encode($debug_payload)) . " -->\n";
                ?>
                <p class="twork-blog__empty"><?php esc_html_e('No posts found.', 'twork-builder'); ?></p>
                <?php
            endif;
            ?>
        </div>
    </div>
</section>
<?php
echo ob_get_clean();
