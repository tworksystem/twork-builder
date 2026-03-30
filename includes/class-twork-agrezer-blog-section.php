<?php
/**
 * Agrezer Blog Section — dynamic block from WordPress posts.
 *
 * @package TworkBuilder
 */

defined('ABSPATH') || exit;

/**
 * Render callback for twork/agrezer-blog-section.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Unused.
 * @param WP_Block $block      Block instance.
 * @return string
 */
function twork_render_agrezer_blog_section($attributes, $content, $block)
{
    $defaults = array(
        'sectionTitle'        => 'Explore Our Latest<br>News &amp; Blog',
        'tagline'             => 'Read Our Blog',
        'tagIcon'             => '',
        'tagIconAlt'          => '',
        'moreButtonUrl'       => '',
        'moreButtonText'      => 'More News ↗',
        'moreButtonNewTab'    => false,
        'readMoreText'        => 'Read More',
        'postsToShow'         => 3,
        'columns'             => 3,
        'orderBy'             => 'date',
        'order'               => 'DESC',
        'categoryIds'         => '',
        'excludeIds'          => '',
        'offset'              => 0,
        'imageSize'           => 'large',
        'backgroundColor'     => '#FAFAFA',
        'paddingTop'          => 100,
        'paddingBottom'       => 100,
        'containerMaxWidth'   => 1200,
        'containerWidthPct'   => 90,
        'showAuthorMeta'      => true,
        'authorPrefix'        => '👤 ',
        'showCommentsMeta'    => true,
        'commentPrefix'       => '💬 ',
    );

    $atts = wp_parse_args($attributes, $defaults);

    $posts_to_show = max(1, min(12, (int) $atts['postsToShow']));
    $columns       = max(1, min(4, (int) $atts['columns']));
    $offset        = max(0, (int) $atts['offset']);

    $query_args = array(
        'post_type'           => 'post',
        'post_status'         => 'publish',
        'posts_per_page'      => $posts_to_show,
        'offset'              => $offset,
        'orderby'             => sanitize_key($atts['orderBy']),
        'order'               => strtoupper($atts['order']) === 'ASC' ? 'ASC' : 'DESC',
        'ignore_sticky_posts' => true,
        'no_found_rows'       => true,
    );

    $allowed_orderby = array('date', 'title', 'modified', 'comment_count', 'rand');
    if (!in_array($query_args['orderby'], $allowed_orderby, true)) {
        $query_args['orderby'] = 'date';
    }

    if (!empty($atts['categoryIds'])) {
        $raw = array_map('trim', explode(',', (string) $atts['categoryIds']));
        $cat_ids = array_filter(array_map('absint', $raw));
        if (!empty($cat_ids)) {
            $query_args['category__in'] = $cat_ids;
        }
    }

    if (!empty($atts['excludeIds'])) {
        $raw = array_map('trim', explode(',', (string) $atts['excludeIds']));
        $ex  = array_filter(array_map('absint', $raw));
        if (!empty($ex)) {
            $query_args['post__not_in'] = $ex;
        }
    }

    $image_size = sanitize_key($atts['imageSize']);
    if ($image_size === '') {
        $image_size = 'large';
    }

    $q = new WP_Query($query_args);

    $more_url = $atts['moreButtonUrl'];
    if ($more_url === '' || $more_url === '#') {
        $posts_page = (int) get_option('page_for_posts');
        $more_url   = $posts_page ? get_permalink($posts_page) : home_url('/');
    }

    $section_style = sprintf(
        'background-color:%s;padding-top:%dpx;padding-bottom:%dpx;--agrezer-blog-cols:%d;--agrezer-blog-max:%dpx;--agrezer-blog-width:%d%%;',
        esc_attr($atts['backgroundColor']),
        (int) $atts['paddingTop'],
        (int) $atts['paddingBottom'],
        $columns,
        (int) $atts['containerMaxWidth'],
        (int) $atts['containerWidthPct']
    );

    $more_target = !empty($atts['moreButtonNewTab']);

    ob_start();
    ?>
    <section class="agrezer-blog wp-block-twork-agrezer-blog-section twork-agrezer-blog-section" style="<?php echo esc_attr($section_style); ?>">
        <div class="agrezer-blog__container">
            <div class="agrezer-blog__header-row">
                <div class="agrezer-blog__header-left">
                    <?php if (!empty($atts['tagline']) || !empty($atts['tagIcon'])) : ?>
                        <div class="agrezer-blog__tagline">
                            <?php if (!empty($atts['tagIcon'])) : ?>
                                <img
                                    src="<?php echo esc_url($atts['tagIcon']); ?>"
                                    alt="<?php echo esc_attr($atts['tagIconAlt']); ?>"
                                    class="agrezer-blog__tag-icon"
                                    width="20"
                                    height="20"
                                    loading="lazy"
                                    decoding="async"
                                />
                            <?php endif; ?>
                            <?php if (!empty($atts['tagline'])) : ?>
                                <span><?php echo wp_kses_post($atts['tagline']); ?></span>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                    <?php if (!empty($atts['sectionTitle'])) : ?>
                        <h2 class="agrezer-blog__title"><?php echo wp_kses_post($atts['sectionTitle']); ?></h2>
                    <?php endif; ?>
                </div>
                <div class="agrezer-blog__header-right">
                    <a
                        href="<?php echo esc_url($more_url); ?>"
                        class="agrezer-blog__more-btn"
                        <?php echo $more_target ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>
                    >
                        <?php echo esc_html($atts['moreButtonText']); ?>
                    </a>
                </div>
            </div>

            <div class="agrezer-blog__grid">
                <?php
                if ($q->have_posts()) :
                    while ($q->have_posts()) :
                        $q->the_post();
                        $post_id   = get_the_ID();
                        $permalink = get_permalink($post_id);
                        $title     = get_the_title();
                        $thumb_id  = get_post_thumbnail_id($post_id);
                        $img_url   = $thumb_id ? wp_get_attachment_image_url($thumb_id, $image_size) : '';
                        $day       = get_the_date('j', $post_id);
                        $month     = get_the_date('M', $post_id);
                        $comments  = (int) get_comments_number($post_id);
                        $author    = get_the_author_meta('display_name', (int) get_post_field('post_author', $post_id));
                        ?>
                        <article class="agrezer-blog-card">
                            <div class="agrezer-blog-card__img-box">
                                <?php if ($img_url) : ?>
                                    <a href="<?php echo esc_url($permalink); ?>">
                                        <img
                                            src="<?php echo esc_url($img_url); ?>"
                                            class="agrezer-blog-card__img"
                                            alt="<?php echo esc_attr($title); ?>"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </a>
                                <?php else : ?>
                                    <a href="<?php echo esc_url($permalink); ?>" class="agrezer-blog-card__img-link agrezer-blog-card__img-link--placeholder" aria-hidden="true">
                                        <span class="agrezer-blog-card__img-placeholder"></span>
                                    </a>
                                <?php endif; ?>
                                <div class="agrezer-blog-card__date" aria-hidden="true">
                                    <span class="agrezer-blog-card__date-day"><?php echo esc_html($day); ?></span>
                                    <span class="agrezer-blog-card__date-month"><?php echo esc_html($month); ?></span>
                                </div>
                            </div>
                            <div class="agrezer-blog-card__content">
                                <?php if (!empty($atts['showAuthorMeta']) || !empty($atts['showCommentsMeta'])) : ?>
                                    <div class="agrezer-blog-card__meta">
                                        <?php if (!empty($atts['showAuthorMeta'])) : ?>
                                            <span>
                                                <?php
                                                if ($atts['authorPrefix'] !== '') {
                                                    echo wp_kses_post($atts['authorPrefix']);
                                                }
                                                echo esc_html($author);
                                                ?>
                                            </span>
                                        <?php endif; ?>
                                        <?php if (!empty($atts['showCommentsMeta'])) : ?>
                                            <span>
                                                <?php
                                                if ($atts['commentPrefix'] !== '') {
                                                    echo wp_kses_post($atts['commentPrefix']);
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
                                <h3 class="agrezer-blog-card__title">
                                    <a href="<?php echo esc_url($permalink); ?>"><?php echo esc_html($title); ?></a>
                                </h3>
                                <div class="agrezer-blog-card__footer">
                                    <a href="<?php echo esc_url($permalink); ?>" class="agrezer-blog-card__read-btn">
                                        <?php echo esc_html($atts['readMoreText']); ?>
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
                    <p class="agrezer-blog__empty"><?php esc_html_e('No posts found.', 'twork-builder'); ?></p>
                    <?php
                endif;
                ?>
            </div>
        </div>
    </section>
    <?php

    return ob_get_clean();
}
