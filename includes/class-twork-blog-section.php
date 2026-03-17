<?php
/**
 * Twork Blog Section – main blog layout.
 *
 * Outputs markup similar to blog.html:
 * - Featured post
 * - Blog grid
 * - Sidebar widgets (search, categories, recent posts, tags)
 * - Pagination
 *
 * @package TworkBuilder
 * @since 1.0.0
 */

defined('ABSPATH') || exit;

/**
 * Estimate reading time in minutes for a post.
 *
 * @param int $post_id Post ID.
 * @return int
 */
function twork_blog_estimate_reading_time($post_id)
{
    $content   = get_post_field('post_content', $post_id);
    $word_count = $content ? str_word_count(wp_strip_all_tags($content)) : 0;
    $minutes    = max(1, (int) ceil($word_count / 200));
    return $minutes;
}

/**
 * Render callback for twork/blog-section dynamic block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content (unused).
 * @param WP_Block $block      Block instance.
 * @return string HTML output.
 */
function twork_render_blog_section($attributes, $content, $block)
{
    $defaults = array(
        'postsPerPage'         => 4,
        'orderBy'              => 'date',
        'order'                => 'DESC',
        'backgroundColor'      => '#ffffff',
        'paddingTop'           => 80,
        'paddingBottom'        => 80,
        'containerMaxWidth'    => 1200,
        'containerPadding'     => 20,
        'showFeatured'         => true,
        'featuredPostId'       => 0,
        'showGrid'             => true,
        'showSidebar'          => true,
        'showPagination'       => true,
        'showSearchWidget'     => true,
        'searchTitle'          => __('Search', 'twork-builder'),
        'showCategoriesWidget' => true,
        'categoriesTitle'      => __('Categories', 'twork-builder'),
        'categoriesInclude'    => '',
        'showRecentWidget'     => true,
        'recentTitle'          => __('Recent Posts', 'twork-builder'),
        'recentItems'          => 3,
        'recentSource'         => 'latest',
        'recentCategoryId'     => 0,
        'recentPostIds'        => '',
        'showTagsWidget'       => true,
        'tagsTitle'            => __('Popular Tags', 'twork-builder'),
        'tagsInclude'          => '',
        'excerptLength'        => 30,
        'readMoreLabel'        => __('Read More', 'twork-builder'),
    );

    $atts = wp_parse_args($attributes, $defaults);

    $paged = max(
        1,
        (int) get_query_var('paged'),
        (int) get_query_var('page')
    );

    $per_page = max(1, (int) $atts['postsPerPage']);

    $featured_post     = null;
    $grid_posts        = array();
    $pagination_query  = null;

    $common_query_args = array(
        'post_type'   => 'post',
        'post_status' => 'publish',
        'orderby'     => sanitize_key($atts['orderBy']),
        'order'       => strtoupper($atts['order']) === 'ASC' ? 'ASC' : 'DESC',
        'paged'       => $paged,
    );

    // Mode 1: automatic featured (first post from query).
    if ($atts['showFeatured'] && empty($atts['featuredPostId'])) {
        $total_posts = $atts['showGrid'] ? $per_page + 1 : 1;
        $query_args  = array_merge(
            $common_query_args,
            array('posts_per_page' => $total_posts)
        );

        $blog_query      = new WP_Query($query_args);
        $pagination_query = $blog_query;

        if ($blog_query->have_posts()) {
            while ($blog_query->have_posts()) {
                $blog_query->the_post();
                $post_obj = get_post();
                if ($atts['showFeatured'] && null === $featured_post) {
                    $featured_post = $post_obj;
                } else {
                    $grid_posts[] = $post_obj;
                }
            }
            wp_reset_postdata();
        }
    } else {
        // Mode 2: specific featured post ID (or no featured).
        if ($atts['showFeatured'] && !empty($atts['featuredPostId'])) {
            $maybe_post = get_post((int) $atts['featuredPostId']);
            if ($maybe_post instanceof WP_Post && $maybe_post->post_status === 'publish') {
                $featured_post = $maybe_post;
            }
        }

        if ($atts['showGrid']) {
            $grid_args = array_merge(
                $common_query_args,
                array('posts_per_page' => $per_page)
            );

            if ($featured_post instanceof WP_Post) {
                $grid_args['post__not_in'] = array($featured_post->ID);
            }

            $grid_query       = new WP_Query($grid_args);
            $pagination_query = $grid_query;

            if ($grid_query->have_posts()) {
                while ($grid_query->have_posts()) {
                    $grid_query->the_post();
                    $grid_posts[] = get_post();
                }
                wp_reset_postdata();
            }
        }
    }

    // If no grid posts but we have featured, allow featured alone.
    if (!$atts['showGrid']) {
        $grid_posts = array();
    }

    $section_style = sprintf(
        'background-color:%s;padding-top:%dpx;padding-bottom:%dpx;',
        esc_attr($atts['backgroundColor']),
        (int) $atts['paddingTop'],
        (int) $atts['paddingBottom']
    );

    ob_start();
    ?>
    <div class="blog-section wp-block-twork-blog-section" style="<?php echo esc_attr($section_style); ?>">
        <div
            class="jivaka-container blog-layout"
            style="max-width:<?php echo (int) $atts['containerMaxWidth']; ?>px;margin:0 auto;padding:0 <?php echo (int) $atts['containerPadding']; ?>px;"
        >
            <div class="main-content">
                <?php if ($atts['showFeatured'] && $featured_post instanceof WP_Post) : ?>
                    <?php
                    $post_id   = $featured_post->ID;
                    $permalink = get_permalink($post_id);
                    $thumb_id  = get_post_thumbnail_id($post_id);
                    $image_url = $thumb_id ? wp_get_attachment_image_url($thumb_id, 'large') : '';
                    $title     = get_the_title($post_id);
                    $date_str  = get_the_date('', $post_id);
                    $excerpt   = has_excerpt($post_id)
                        ? get_the_excerpt($post_id)
                        : wp_trim_words(get_post_field('post_content', $post_id), (int) $atts['excerptLength']);
                    $terms     = get_the_terms($post_id, 'category');
                    $tag_label = $terms && !is_wp_error($terms) ? $terms[0]->name : __('Blog', 'twork-builder');
                    ?>
                    <article class="featured-post animate-up">
                        <?php if ($image_url) : ?>
                            <div class="featured-img">
                                <a href="<?php echo esc_url($permalink); ?>">
                                    <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($title); ?>" loading="lazy" decoding="async" />
                                </a>
                            </div>
                        <?php endif; ?>
                        <div class="featured-content">
                            <span class="post-tag"><?php echo esc_html($tag_label); ?></span>
                            <div class="post-date">
                                <i class="far fa-calendar-alt" aria-hidden="true"></i>
                                <?php echo esc_html($date_str); ?>
                            </div>
                            <h2>
                                <a href="<?php echo esc_url($permalink); ?>">
                                    <?php echo esc_html($title); ?>
                                </a>
                            </h2>
                            <?php if (!empty($excerpt)) : ?>
                                <p><?php echo esc_html($excerpt); ?></p>
                            <?php endif; ?>
                            <a href="<?php echo esc_url($permalink); ?>" class="jivaka-btn btn-text">
                                <?php echo esc_html($atts['readMoreLabel']); ?>
                                <i class="fas fa-arrow-right" aria-hidden="true"></i>
                            </a>
                        </div>
                    </article>
                <?php endif; ?>

                <?php if ($atts['showGrid']) : ?>
                    <div class="blog-grid">
                        <?php
                        if (!empty($grid_posts)) :
                            foreach ($grid_posts as $post_obj) :
                                $post_id   = $post_obj->ID;
                                $permalink = get_permalink($post_id);
                                $thumb_id  = get_post_thumbnail_id($post_id);
                                $image_url = $thumb_id ? wp_get_attachment_image_url($thumb_id, 'medium_large') : '';
                                $title     = get_the_title($post_id);
                                $terms     = get_the_terms($post_id, 'category');
                                $cat_name  = $terms && !is_wp_error($terms) ? $terms[0]->name : __('Blog', 'twork-builder');
                                $read_min  = twork_blog_estimate_reading_time($post_id);
                                ?>
                                <article class="blog-card animate-up">
                                    <?php if ($image_url) : ?>
                                        <div class="blog-img">
                                            <a href="<?php echo esc_url($permalink); ?>">
                                                <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($title); ?>" loading="lazy" decoding="async" />
                                            </a>
                                        </div>
                                    <?php endif; ?>
                                    <div class="blog-body">
                                        <div class="blog-meta">
                                            <span>
                                                <i class="far fa-folder" aria-hidden="true"></i>
                                                <?php echo esc_html($cat_name); ?>
                                            </span>
                                            <span>
                                                <i class="far fa-clock" aria-hidden="true"></i>
                                                <?php
                                                printf(
                                                    /* translators: %d: minutes */
                                                    esc_html__('%d min read', 'twork-builder'),
                                                    (int) $read_min
                                                );
                                                ?>
                                            </span>
                                        </div>
                                        <h3>
                                            <a href="<?php echo esc_url($permalink); ?>">
                                                <?php echo esc_html($title); ?>
                                            </a>
                                        </h3>
                                        <div class="blog-footer">
                                            <a href="<?php echo esc_url($permalink); ?>" class="btn-text">
                                                <?php echo esc_html($atts['readMoreLabel']); ?>
                                            </a>
                                            <i class="fas fa-share-alt" style="color:#ccc;cursor:pointer;" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </article>
                                <?php
                            endforeach;
                        else :
                            ?>
                            <p><?php esc_html_e('No posts found.', 'twork-builder'); ?></p>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>

                <?php
                if ($atts['showPagination'] && $pagination_query instanceof WP_Query && $pagination_query->max_num_pages > 1 && $atts['showGrid']) :
                    $big = 999999999;
                    $links = paginate_links(array(
                        'base'      => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                        'format'    => '?paged=%#%',
                        'current'   => $paged,
                        'total'     => $pagination_query->max_num_pages,
                        'type'      => 'array',
                        'prev_text' => '<i class="fas fa-chevron-left" aria-hidden="true"></i>',
                        'next_text' => '<i class="fas fa-chevron-right" aria-hidden="true"></i>',
                    ));
                    if (!empty($links)) :
                        ?>
                        <div class="pagination">
                            <?php foreach ($links as $link_html) : ?>
                                <?php
                                // Wrap each link with page-link class if not already.
                                if (strpos($link_html, 'page-numbers') !== false) {
                                    $link_html = str_replace('page-numbers', 'page-link page-numbers', $link_html);
                                } else {
                                    $link_html = sprintf(
                                        '<span class="page-link">%s</span>',
                                        $link_html
                                    );
                                }
                                echo $link_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                                ?>
                            <?php endforeach; ?>
                        </div>
                        <?php
                    endif;
                endif;
                ?>
            </div>

            <?php if ($atts['showSidebar']) : ?>
                <aside class="sidebar animate-sidebar">
                    <?php if ($atts['showSearchWidget']) : ?>
                        <div class="widget widget-search">
                            <h3 class="widget-title"><?php echo esc_html($atts['searchTitle']); ?></h3>
                            <form class="search-form" role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>">
                                <input
                                    type="search"
                                    class="search-input"
                                    name="s"
                                    placeholder="<?php esc_attr_e('Search articles…', 'twork-builder'); ?>"
                                />
                                <button type="submit" class="search-btn">
                                    <i class="fas fa-search" aria-hidden="true"></i>
                                    <span class="screen-reader-text"><?php esc_html_e('Search', 'twork-builder'); ?></span>
                                </button>
                            </form>
                        </div>
                    <?php endif; ?>

                    <?php if ($atts['showCategoriesWidget']) : ?>
                        <div class="widget widget-categories">
                            <h3 class="widget-title"><?php echo esc_html($atts['categoriesTitle']); ?></h3>
                            <ul class="cat-list">
                                <?php
                                $cat_args = array(
                                    'hide_empty' => true,
                                );
                                if (!empty($atts['categoriesInclude'])) {
                                    $raw_ids = array_map('trim', explode(',', (string) $atts['categoriesInclude']));
                                    $ids     = array_filter(array_map('absint', $raw_ids));
                                    if (!empty($ids)) {
                                        $cat_args['include'] = $ids;
                                    }
                                }
                                $categories = get_categories($cat_args);
                                foreach ($categories as $cat) :
                                    ?>
                                    <li>
                                        <a href="<?php echo esc_url(get_category_link($cat)); ?>">
                                            <?php echo esc_html($cat->name); ?>
                                            <span class="cat-count"><?php echo (int) $cat->count; ?></span>
                                        </a>
                                    </li>
                                    <?php
                                endforeach;
                                ?>
                            </ul>
                        </div>
                    <?php endif; ?>

                    <?php if ($atts['showRecentWidget']) : ?>
                        <div class="widget widget-recent-posts">
                            <h3 class="widget-title"><?php echo esc_html($atts['recentTitle']); ?></h3>
                            <?php
                            $recent_args = array(
                                'numberposts' => (int) $atts['recentItems'],
                                'post_status' => 'publish',
                            );

                            if ($atts['recentSource'] === 'category' && (int) $atts['recentCategoryId'] > 0) {
                                $recent_args['category'] = (int) $atts['recentCategoryId'];
                            } elseif ($atts['recentSource'] === 'ids' && !empty($atts['recentPostIds'])) {
                                $raw_ids = array_map('trim', explode(',', (string) $atts['recentPostIds']));
                                $ids     = array_filter(array_map('absint', $raw_ids));
                                if (!empty($ids)) {
                                    $recent_args['include']    = $ids;
                                    $recent_args['numberposts'] = count($ids);
                                }
                            }

                            $recent_posts = wp_get_recent_posts($recent_args);
                            foreach ($recent_posts as $recent) :
                                $post_id   = $recent['ID'];
                                $permalink = get_permalink($post_id);
                                $title     = get_the_title($post_id);
                                $date_str  = get_the_date('', $post_id);
                                $thumb_id  = get_post_thumbnail_id($post_id);
                                $image_url = $thumb_id ? wp_get_attachment_image_url($thumb_id, 'thumbnail') : '';
                                ?>
                                <div class="recent-post-item" style="display:flex;gap:15px;margin-bottom:20px;">
                                    <?php if ($image_url) : ?>
                                        <a href="<?php echo esc_url($permalink); ?>">
                                            <img
                                                src="<?php echo esc_url($image_url); ?>"
                                                alt="<?php echo esc_attr($title); ?>"
                                                style="width:70px;height:70px;border-radius:5px;object-fit:cover;"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </a>
                                    <?php endif; ?>
                                    <div>
                                        <h5 style="margin:0 0 5px;font-size:0.9rem;line-height:1.3;">
                                            <a href="<?php echo esc_url($permalink); ?>">
                                                <?php echo esc_html($title); ?>
                                            </a>
                                        </h5>
                                        <span style="font-size:0.75rem;color:#999;"><?php echo esc_html($date_str); ?></span>
                                    </div>
                                </div>
                                <?php
                            endforeach;
                            ?>
                        </div>
                    <?php endif; ?>

                    <?php if ($atts['showTagsWidget']) : ?>
                        <div class="widget widget-tags">
                            <h3 class="widget-title"><?php echo esc_html($atts['tagsTitle']); ?></h3>
                            <div class="tags-cloud">
                                <?php
                                $tag_args = array(
                                    'orderby' => 'count',
                                    'order'   => 'DESC',
                                    'number'  => 12,
                                );

                                if (!empty($atts['tagsInclude'])) {
                                    $tokens = array_map('trim', explode(',', (string) $atts['tagsInclude']));
                                    $include_ids = array();

                                    foreach ($tokens as $token) {
                                        if ($token === '') {
                                            continue;
                                        }
                                        if (ctype_digit($token)) {
                                            $include_ids[] = (int) $token;
                                        } else {
                                            $term = get_term_by('slug', $token, 'post_tag');
                                            if ($term && !is_wp_error($term)) {
                                                $include_ids[] = (int) $term->term_id;
                                            }
                                        }
                                    }

                                    if (!empty($include_ids)) {
                                        $tag_args['include'] = $include_ids;
                                        unset($tag_args['orderby'], $tag_args['order']);
                                    }
                                }

                                $tags = get_tags($tag_args);
                                foreach ($tags as $tag) :
                                    ?>
                                    <a
                                        href="<?php echo esc_url(get_tag_link($tag)); ?>"
                                        class="tag-link"
                                    >
                                        <?php echo esc_html($tag->name); ?>
                                    </a>
                                    <?php
                                endforeach;
                                ?>
                            </div>
                        </div>
                    <?php endif; ?>
                </aside>
            <?php endif; ?>
        </div>
    </div>
    <?php

    return ob_get_clean();
}

