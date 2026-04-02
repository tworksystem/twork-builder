<?php
/**
 * Dynamic render for twork/posts-grid.
 *
 * @package TworkBuilder
 */

defined('ABSPATH') || exit;

$attributes = isset($attributes) && is_array($attributes) ? $attributes : array();

$defaults = array(
    'sectionTitle'      => 'Explore Our Latest<br>News &amp; Blog',
    'tagline'           => 'Read Our Blog',
    'tagIcon'           => '',
    'tagIconAlt'        => '',
    'moreButtonUrl'     => '',
    'moreButtonText'    => 'More News ↗',
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
);

$atts = wp_parse_args($attributes, $defaults);

// JSON may deserialize null or wrong types; keep query args safe.
if (!is_array($atts['categoryIds'])) {
    $atts['categoryIds'] = array();
}
if (!is_array($atts['excludeIds'])) {
    $atts['excludeIds'] = array();
}

$posts_to_show = max(1, min(12, (int) $atts['postsToShow']));
$columns       = max(1, min(4, (int) $atts['columns']));
$offset        = max(0, (int) $atts['offset']);

$orderby_raw = (string) $atts['orderBy'];
$allowed_orderby = array('date', 'title', 'modified', 'comment_count', 'rand');
$orderby = in_array($orderby_raw, $allowed_orderby, true) ? $orderby_raw : 'date';

$order = strtoupper((string) $atts['order']) === 'ASC' ? 'ASC' : 'DESC';

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

// Accept arrays (new schema) and comma-separated strings (legacy safety).
$category_ids = array();
if (is_array($atts['categoryIds'])) {
    $category_ids = array_filter(array_map('absint', $atts['categoryIds']));
} elseif (!empty($atts['categoryIds'])) {
    $raw = array_map('trim', explode(',', (string) $atts['categoryIds']));
    $category_ids = array_filter(array_map('absint', $raw));
}
if (!empty($category_ids)) {
    $query_args['category__in'] = $category_ids;
}

// Accept arrays (new schema) and comma-separated strings (legacy safety).
$exclude_ids = array();
if (is_array($atts['excludeIds'])) {
    $exclude_ids = array_filter(array_map('absint', $atts['excludeIds']));
} elseif (!empty($atts['excludeIds'])) {
    $raw = array_map('trim', explode(',', (string) $atts['excludeIds']));
    $exclude_ids = array_filter(array_map('absint', $raw));
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
    $more_url = $posts_page ? get_permalink($posts_page) : home_url('/');
}

$wrapper_attributes = '';
if (function_exists('get_block_wrapper_attributes')) {
    $extra = array(
        'class' => 'twork-blog',
        'style' => sprintf(
            'background-color:%s;padding-top:%dpx;padding-bottom:%dpx;--twork-blog-cols:%d;--twork-blog-max:%dpx;--twork-blog-width:%d%%;',
            esc_attr((string) $atts['backgroundColor']),
            (int) $atts['paddingTop'],
            (int) $atts['paddingBottom'],
            $columns,
            (int) $atts['containerMaxWidth'],
            (int) $atts['containerWidthPct']
        ),
    );
    if (isset($block) && $block instanceof WP_Block) {
        $wrapper_attributes = get_block_wrapper_attributes($extra, $block);
    } else {
        $wrapper_attributes = get_block_wrapper_attributes($extra);
    }
}

$more_target = !empty($atts['moreButtonNewTab']);

ob_start();
?>
<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <div class="twork-blog__container">
        <div class="twork-blog__header-row">
            <div class="twork-blog__header-left">
                <?php if (!empty($atts['tagline']) || !empty($atts['tagIcon'])) : ?>
                    <div class="twork-blog__tagline">
                        <?php if (!empty($atts['tagIcon'])) : ?>
                            <img
                                src="<?php echo esc_url((string) $atts['tagIcon']); ?>"
                                alt="<?php echo esc_attr((string) $atts['tagIconAlt']); ?>"
                                class="twork-blog__tag-icon"
                                width="20"
                                height="20"
                                loading="lazy"
                                decoding="async"
                            />
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
                    <?php echo esc_html((string) $atts['moreButtonText']); ?>
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
                    $thumb_id = get_post_thumbnail_id($post_id);
                    $img_url  = '';
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
                                    <span class="icon-circle" aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </article>
                    <?php
                endwhile;
                wp_reset_postdata();
            else :
                ?>
                <p class="twork-blog__empty"><?php esc_html_e('No posts found.', 'twork-builder'); ?></p>
                <?php
            endif;
            ?>
        </div>
    </div>
</section>
<?php
return ob_get_clean();

