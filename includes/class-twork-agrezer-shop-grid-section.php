<?php
/**
 * Agrezer Shop Grid Section — WooCommerce shop layout (sidebar + product grid).
 *
 * Renders product categories, mini products, and a paginated product grid from WooCommerce.
 *
 * @package TworkBuilder
 */

defined('ABSPATH') || exit;

/**
 * Convert WooCommerce average rating (0–5) to a simple star string (★ / ☆).
 *
 * @param float $rating Average rating.
 * @param int   $max    Max stars.
 *
 * @return string
 */
function twork_agrezer_shop_grid_star_string($rating, $max = 5)
{
    $rating = (float) $rating;
    $full   = (int) min($max, max(0, round($rating)));

    $out = '';
    for ($i = 1; $i <= $max; $i++) {
        $out .= $i <= $full ? '★' : '☆';
    }

    return $out;
}

/**
 * Resolve current sort order from GET (frontend) or block default (editor / no GET).
 *
 * @param array $atts Parsed attributes.
 *
 * @return string Whitelisted orderby key.
 */
function twork_agrezer_shop_grid_resolve_orderby($atts)
{
    $allowed = array('default', 'date', 'price', 'price-desc', 'popularity', 'rating');
    $default = isset($atts['defaultOrderby']) ? $atts['defaultOrderby'] : 'default';

    if (! in_array($default, $allowed, true)) {
        $default = 'default';
    }

    $is_rest = defined('REST_REQUEST') && REST_REQUEST;

    if (! $is_rest && ! is_admin() && isset($_GET['orderby'])) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        $raw = sanitize_text_field(wp_unslash($_GET['orderby'])); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        if (in_array($raw, $allowed, true)) {
            return $raw;
        }
    }

    return $default;
}

/**
 * Apply orderby to a product WP_Query args array.
 *
 * @param array  $args    Query args (modified in place).
 * @param string $orderby Whitelisted key.
 */
function twork_agrezer_shop_grid_apply_product_orderby(&$args, $orderby)
{
    switch ($orderby) {
        case 'price':
            $args['orderby']  = 'meta_value_num';
            $args['meta_key'] = '_price';
            $args['order']    = 'ASC';
            break;
        case 'price-desc':
            $args['orderby']  = 'meta_value_num';
            $args['meta_key'] = '_price';
            $args['order']    = 'DESC';
            break;
        case 'popularity':
            $args['orderby']  = 'meta_value_num';
            $args['meta_key'] = 'total_sales';
            $args['order']    = 'DESC';
            break;
        case 'rating':
            $args['orderby']  = 'meta_value_num';
            $args['meta_key'] = '_wc_average_rating';
            $args['order']    = 'DESC';
            break;
        case 'date':
            $args['orderby'] = 'date';
            $args['order']   = 'DESC';
            break;
        case 'default':
        default:
            $args['orderby'] = 'menu_order title';
            $args['order']   = 'ASC';
            break;
    }
}

/**
 * Build query args for mini products (sidebar).
 *
 * @param array $atts Attributes.
 *
 * @return array
 */
function twork_agrezer_shop_grid_mini_product_args($atts)
{
    $limit  = max(1, absint($atts['miniProductsCount']));
    $source = isset($atts['miniProductsSource']) ? $atts['miniProductsSource'] : 'rating';

    $args = array(
        'limit'   => $limit,
        'status'  => 'publish',
        'return'  => 'objects',
        'orderby' => 'date',
        'order'   => 'DESC',
    );

    switch ($source) {
        case 'featured':
            $args['featured'] = true;
            $args['orderby']  = 'date';
            break;
        case 'on_sale':
            $args['on_sale'] = true;
            $args['orderby'] = 'date';
            break;
        case 'popularity':
            $args['orderby'] = 'popularity';
            break;
        case 'rating':
            $args['orderby'] = 'rating';
            break;
        case 'rand':
            $args['orderby'] = 'rand';
            break;
        case 'recent':
        default:
            $args['orderby'] = 'date';
            $args['order']   = 'DESC';
            break;
    }

    return $args;
}

/**
 * Render callback for twork/agrezer-shop-grid-section dynamic block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string
 */
function twork_render_agrezer_shop_grid_section($attributes, $content, $block)
{
    if (! class_exists('WooCommerce')) {
        return '<!-- Twork Agrezer Shop Grid: WooCommerce not active. -->';
    }

    $defaults = array(
        'categoryTitle'           => __('Product Category', 'twork-builder'),
        'productsTitle'           => __('Products', 'twork-builder'),
        'contactTitle'            => __('Contact Info', 'twork-builder'),
        'showCategoryWidget'      => true,
        'showMiniProductsWidget'  => true,
        'showContactWidget'       => true,
        'categoriesHideEmpty'     => false,
        'categoriesLimit'         => 0,
        'categoriesTopLevelOnly'  => false,
        'miniProductsCount'       => 5,
        'miniProductsSource'      => 'rating',
        'productsPerPage'         => 9,
        'gridColumns'             => 3,
        'gridColumnsTablet'       => 2,
        'gridColumnsMobile'       => 1,
        'defaultOrderby'          => 'default',
        'showToolbar'             => true,
        'showPagination'          => true,
        'mainCategoryId'          => 0,
        'contactAddress'          => '132, Tic St, Kingston, NY, USA',
        'contactPhone'            => '+(528) 456-7592',
        'contactEmail'            => 'info@agrezen.com',
        'backgroundColor'         => '#f6f6f6',
        'paddingTop'              => 80,
        'paddingBottom'           => 100,
        'containerMaxWidth'       => 1240,
        'containerPadding'        => 0,
    );

    $atts = wp_parse_args($attributes, $defaults);

    foreach (array('showCategoryWidget', 'showMiniProductsWidget', 'showContactWidget', 'categoriesHideEmpty', 'categoriesTopLevelOnly', 'showToolbar', 'showPagination') as $bool_key) {
        if (isset($attributes[$bool_key])) {
            $atts[$bool_key] = filter_var($atts[$bool_key], FILTER_VALIDATE_BOOLEAN);
        }
    }

    $orderby = twork_agrezer_shop_grid_resolve_orderby($atts);

    $paged = max(1, (int) get_query_var('paged'), (int) get_query_var('page'));

    $sort_select_id = wp_unique_id('agrezer-shop-orderby-');

    $per_page = max(1, absint($atts['productsPerPage']));

    $query_args = array(
        'post_type'      => 'product',
        'post_status'    => 'publish',
        'posts_per_page' => $per_page,
        'paged'          => $paged,
    );

    twork_agrezer_shop_grid_apply_product_orderby($query_args, $orderby);

    $main_cat = absint($atts['mainCategoryId']);
    if ($main_cat > 0) {
        $query_args['tax_query'] = array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
            array(
                'taxonomy' => 'product_cat',
                'field'    => 'term_id',
                'terms'    => $main_cat,
            ),
        );
    }

    $products_query = new WP_Query($query_args);

    $section_style = sprintf(
        'background-color:%s;padding-top:%dpx;padding-bottom:%dpx;',
        esc_attr($atts['backgroundColor']),
        absint($atts['paddingTop']),
        absint($atts['paddingBottom'])
    );

    $container_max = absint($atts['containerMaxWidth']);
    $pad             = absint($atts['containerPadding']);
    $container_style = sprintf(
        'width:min(%dpx, 92%%);margin:0 auto;padding:0 %dpx;',
        $container_max,
        $pad
    );

    $grid_cols        = max(1, min(6, absint($atts['gridColumns'])));
    $grid_cols_tablet = max(1, min(4, absint($atts['gridColumnsTablet'])));
    $grid_cols_mobile = max(1, min(2, absint($atts['gridColumnsMobile'])));

    $products_style = sprintf(
        '--agrezer-shop-cols:%d;--agrezer-shop-cols-md:%d;--agrezer-shop-cols-sm:%d;',
        $grid_cols,
        $grid_cols_tablet,
        $grid_cols_mobile
    );

    // Categories sidebar.
    $term_args = array(
        'taxonomy'   => 'product_cat',
        'hide_empty' => $atts['categoriesHideEmpty'],
        'orderby'    => 'name',
        'order'      => 'ASC',
    );
    if ($atts['categoriesTopLevelOnly']) {
        $term_args['parent'] = 0;
    }
    if ($atts['categoriesLimit'] > 0) {
        $term_args['number'] = absint($atts['categoriesLimit']);
    }

    $categories = get_terms($term_args);
    if (is_wp_error($categories)) {
        $categories = array();
    }

    // Mini products.
    $mini_products = array();
    if ($atts['showMiniProductsWidget']) {
        $mini_products = wc_get_products(twork_agrezer_shop_grid_mini_product_args($atts));
    }

    $add_args = array();
    if ($orderby && 'default' !== $orderby) {
        $add_args['orderby'] = $orderby;
    }

    ob_start();
    ?>
    <section
        class="wp-block-twork-agrezer-shop-grid-section agrezer-shop-grid"
        style="<?php echo esc_attr($section_style); ?>"
    >
        <div class="agrezer-shop-grid__container" style="<?php echo esc_attr($container_style); ?>">
            <aside class="agrezer-shop-grid__sidebar" aria-label="<?php esc_attr_e('Shop sidebar', 'twork-builder'); ?>">
                <?php if ($atts['showCategoryWidget']) : ?>
                    <div class="agrezer-shop-widget">
                        <h3 class="agrezer-shop-widget__title">
                            <span class="agrezer-shop-widget__dot" aria-hidden="true"></span>
                            <?php echo esc_html($atts['categoryTitle']); ?>
                        </h3>
                        <?php if (! empty($categories)) : ?>
                            <ul class="agrezer-shop-widget__category-list">
                                <?php foreach ($categories as $term) : ?>
                                    <?php
                                    $link = get_term_link($term);
                                    if (is_wp_error($link)) {
                                        continue;
                                    }
                                    ?>
                                    <li>
                                        <a href="<?php echo esc_url($link); ?>">
                                            <?php echo esc_html($term->name); ?>
                                            (<?php echo esc_html((string) (int) $term->count); ?>)
                                        </a>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        <?php else : ?>
                            <p class="agrezer-shop-widget__empty"><?php esc_html_e('No categories found.', 'twork-builder'); ?></p>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>

                <?php if ($atts['showMiniProductsWidget']) : ?>
                    <div class="agrezer-shop-widget">
                        <h3 class="agrezer-shop-widget__title">
                            <span class="agrezer-shop-widget__dot" aria-hidden="true"></span>
                            <?php echo esc_html($atts['productsTitle']); ?>
                        </h3>
                        <?php if (! empty($mini_products)) : ?>
                            <ul class="agrezer-shop-widget__mini-products">
                                <?php foreach ($mini_products as $product) : ?>
                                    <?php
                                    if (! $product instanceof WC_Product) {
                                        continue;
                                    }
                                    $pid       = $product->get_id();
                                    $permalink = get_permalink($pid);
                                    $title     = $product->get_name();
                                    $img_id    = $product->get_image_id();
                                    $img_url   = $img_id ? wp_get_attachment_image_url($img_id, 'thumbnail') : wc_placeholder_img_src('thumbnail');
                                    $rating    = (float) $product->get_average_rating();
                                    ?>
                                    <li>
                                        <div>
                                            <h4>
                                                <a href="<?php echo esc_url($permalink); ?>"><?php echo esc_html($title); ?></a>
                                            </h4>
                                            <div class="agrezer-shop-widget__stars" aria-label="<?php echo esc_attr(sprintf(__('Rated %s out of 5', 'twork-builder'), wc_format_decimal($rating, 1))); ?>">
                                                <?php echo esc_html(twork_agrezer_shop_grid_star_string($rating)); ?>
                                            </div>
                                            <p class="agrezer-shop-widget__price price">
                                                <?php echo wp_kses_post($product->get_price_html()); ?>
                                            </p>
                                        </div>
                                        <a href="<?php echo esc_url($permalink); ?>" class="agrezer-shop-widget__thumb-link">
                                            <img src="<?php echo esc_url($img_url); ?>" alt="<?php echo esc_attr($title); ?>" loading="lazy" width="56" height="56" />
                                        </a>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        <?php else : ?>
                            <p class="agrezer-shop-widget__empty"><?php esc_html_e('No products to show.', 'twork-builder'); ?></p>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>

                <?php if ($atts['showContactWidget']) : ?>
                    <div class="agrezer-shop-widget">
                        <h3 class="agrezer-shop-widget__title">
                            <span class="agrezer-shop-widget__dot" aria-hidden="true"></span>
                            <?php echo esc_html($atts['contactTitle']); ?>
                        </h3>
                        <ul class="agrezer-shop-widget__contact-list">
                            <?php if (! empty($atts['contactAddress'])) : ?>
                                <li><span aria-hidden="true">◉</span> <?php echo esc_html($atts['contactAddress']); ?></li>
                            <?php endif; ?>
                            <?php if (! empty($atts['contactPhone'])) : ?>
                                <li><span aria-hidden="true">◉</span> <?php echo esc_html($atts['contactPhone']); ?></li>
                            <?php endif; ?>
                            <?php if (! empty($atts['contactEmail'])) : ?>
                                <li><span aria-hidden="true">◉</span> <a href="mailto:<?php echo esc_attr($atts['contactEmail']); ?>"><?php echo esc_html($atts['contactEmail']); ?></a></li>
                            <?php endif; ?>
                        </ul>
                    </div>
                <?php endif; ?>
            </aside>

            <div class="agrezer-shop-grid__products-wrap">
                <?php if ($atts['showToolbar']) : ?>
                    <div class="agrezer-shop-grid__toolbar">
                        <?php
                        $found = (int) $products_query->found_posts;
                        $from  = $found > 0 ? (($paged - 1) * $per_page) + 1 : 0;
                        $to    = min($found, $paged * $per_page);
                        ?>
                        <p>
                            <?php
                            if ($found > 0) {
                                printf(
                                    /* translators: 1: from index, 2: to index, 3: total results */
                                    esc_html__('Showing %1$d–%2$d of %3$d results', 'twork-builder'),
                                    $from,
                                    $to,
                                    $found
                                );
                            } else {
                                esc_html_e('No results', 'twork-builder');
                            }
                            ?>
                        </p>
                        <form method="get" action="<?php echo esc_url(get_permalink()); ?>" class="agrezer-shop-grid__sort-form">
                            <label class="screen-reader-text" for="<?php echo esc_attr($sort_select_id); ?>"><?php esc_html_e('Sort products', 'twork-builder'); ?></label>
                            <select id="<?php echo esc_attr($sort_select_id); ?>" name="orderby" aria-label="<?php esc_attr_e('Sort products', 'twork-builder'); ?>" onchange="this.form.submit()">
                                <option value="default" <?php selected($orderby, 'default'); ?>><?php esc_html_e('Default sorting', 'twork-builder'); ?></option>
                                <option value="date" <?php selected($orderby, 'date'); ?>><?php esc_html_e('Newest', 'twork-builder'); ?></option>
                                <option value="price" <?php selected($orderby, 'price'); ?>><?php esc_html_e('Price: low to high', 'twork-builder'); ?></option>
                                <option value="price-desc" <?php selected($orderby, 'price-desc'); ?>><?php esc_html_e('Price: high to low', 'twork-builder'); ?></option>
                                <option value="popularity" <?php selected($orderby, 'popularity'); ?>><?php esc_html_e('Popularity', 'twork-builder'); ?></option>
                                <option value="rating" <?php selected($orderby, 'rating'); ?>><?php esc_html_e('Average rating', 'twork-builder'); ?></option>
                            </select>
                        </form>
                    </div>
                <?php endif; ?>

                <div class="agrezer-shop-products" style="<?php echo esc_attr($products_style); ?>">
                    <?php if ($products_query->have_posts()) : ?>
                        <?php
                        while ($products_query->have_posts()) :
                            $products_query->the_post();
                            $product = wc_get_product(get_the_ID());
                            if (! $product instanceof WC_Product) {
                                continue;
                            }
                            $rating = (float) $product->get_average_rating();
                            ?>
                            <article class="agrezer-product-card">
                                <?php if ($product->is_on_sale()) : ?>
                                    <span class="agrezer-product-card__badge"><?php esc_html_e('Sale!', 'twork-builder'); ?></span>
                                <?php endif; ?>
                                <a href="<?php echo esc_url(get_permalink()); ?>" class="agrezer-product-card__image-link">
                                    <?php echo $product->get_image('woocommerce_thumbnail'); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                                </a>
                                <h3 class="agrezer-product-card__title">
                                    <a href="<?php echo esc_url(get_permalink()); ?>"><?php echo esc_html(get_the_title()); ?></a>
                                </h3>
                                <div class="agrezer-product-card__stars" aria-label="<?php echo esc_attr(sprintf(__('Rated %s out of 5', 'twork-builder'), wc_format_decimal($rating, 1))); ?>">
                                    <?php echo esc_html(twork_agrezer_shop_grid_star_string($rating)); ?>
                                </div>
                                <p class="agrezer-product-card__price price"><?php echo wp_kses_post($product->get_price_html()); ?></p>
                            </article>
                        <?php endwhile; ?>
                        <?php wp_reset_postdata(); ?>
                    <?php else : ?>
                        <p class="agrezer-shop-grid__empty"><?php esc_html_e('No products found.', 'twork-builder'); ?></p>
                    <?php endif; ?>
                </div>

                <?php if ($atts['showPagination'] && $products_query->max_num_pages > 1) : ?>
                    <?php
                    $pagination = paginate_links(
                        array(
                            'total'     => $products_query->max_num_pages,
                            'current'   => $paged,
                            'type'      => 'array',
                            'mid_size'  => 2,
                            'prev_text' => '&laquo;',
                            'next_text' => '&rarr;',
                            'add_args'  => $add_args,
                        )
                    );
                    ?>
                    <?php if (! empty($pagination) && is_array($pagination)) : ?>
                        <nav class="agrezer-shop-grid__pagination" aria-label="<?php esc_attr_e('Product pagination', 'twork-builder'); ?>">
                            <?php
                            // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- paginate_links() markup.
                            echo implode('', $pagination);
                            ?>
                        </nav>
                    <?php endif; ?>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <?php
    return (string) ob_get_clean();
}
