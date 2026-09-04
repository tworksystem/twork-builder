<?php
/**
 * Shweghee Shop blocks — WooCommerce render callbacks.
 *
 * @package TworkBuilder
 * @since 1.0.12
 */

defined('ABSPATH') || exit;

/**
 * WooCommerce inactive notice (HTML comment only).
 *
 * @return string
 */
function twork_shop_woocommerce_missing()
{
    return '<!-- Twork Shop: WooCommerce not active. -->';
}

/**
 * Query WooCommerce products for shop blocks.
 *
 * @param array $args Block-driven query args.
 *
 * @return WC_Product[]
 */
function twork_shop_query_products($args = array())
{
    if (!class_exists('WooCommerce')) {
        return array();
    }

    $defaults = array(
        'source'        => 'recent',
        'numberOfItems' => 4,
        'orderby'       => '',
        'order'         => 'DESC',
        'paged'         => 1,
        'category'      => '',
    );

    $atts = wp_parse_args($args, $defaults);
    $limit = max(1, absint($atts['numberOfItems']));

    $query = array(
        'status'  => 'publish',
        'limit'   => $limit,
        'return'  => 'objects',
        'paginate' => !empty($atts['paged']) && absint($atts['paged']) > 0,
        'page'    => max(1, absint($atts['paged'])),
        'orderby' => 'date',
        'order'   => $atts['order'],
    );

    $source = $atts['source'];

    if ($source === 'on_sale') {
        $query['on_sale'] = true;
    } elseif ($source === 'featured') {
        $query['featured'] = true;
    } elseif ($source === 'best_selling') {
        $query['meta_key'] = 'total_sales';
        $query['orderby']  = 'meta_value_num';
        $query['order']    = 'DESC';
    }

    if (!empty($atts['category'])) {
        $query['category'] = array(sanitize_title($atts['category']));
    }

    if (!empty($atts['orderby'])) {
        switch ($atts['orderby']) {
            case 'price-asc':
                $query['orderby'] = 'price';
                $query['order']   = 'ASC';
                break;
            case 'price-desc':
                $query['orderby'] = 'price';
                $query['order']   = 'DESC';
                break;
            case 'latest':
                $query['orderby'] = 'date';
                $query['order']   = 'DESC';
                break;
            default:
                $query['orderby'] = 'menu_order';
                $query['order']   = 'ASC';
                break;
        }
    }

    $result = wc_get_products($query);

    if (is_array($result) && isset($result['products'])) {
        return $result['products'];
    }

    return is_array($result) ? $result : array();
}

/**
 * Render star rating markup for a product card.
 *
 * @param WC_Product $product Product object.
 *
 * @return string
 */
function twork_shop_render_product_stars($product)
{
    $rating = (float) $product->get_average_rating();
    $count  = (int) $product->get_review_count();
    $filled = max(0, min(5, (int) round($rating)));

    $stars = '';
    for ($i = 0; $i < 5; $i++) {
        $cls = $i < $filled ? 'product-card__star--filled' : 'product-card__star--empty';
        $stars .= '<span class="product-card__star ' . esc_attr($cls) . '" aria-hidden="true">★</span>';
    }

    return sprintf(
        '<div class="product-card__rating" aria-label="%1$d out of 5 stars, %2$d reviews">%3$s<span class="product-card__reviews">(%2$d)</span></div>',
        $filled,
        $count,
        $stars
    );
}

/**
 * Render product card markup (grid or compact).
 *
 * @param WC_Product $product Product object.
 * @param string     $variant grid|compact.
 *
 * @return string
 */
function twork_shop_render_product_card($product, $variant = 'grid')
{
    if (!$product instanceof WC_Product) {
        return '';
    }

    $product_id = $product->get_id();
    $permalink  = get_permalink($product_id);
    $title      = $product->get_name();
    $image_id   = $product->get_image_id();
    $image_url  = $image_id ? wp_get_attachment_image_url($image_id, 'medium') : wc_placeholder_img_src('medium');

    $badge = '';
    if ($product->is_on_sale()) {
        $badge = '<span class="product-card__badge product-card__badge--sale">' . esc_html__('Sale', 'twork-builder') . '</span>';
    } elseif (!$product->is_in_stock()) {
        $badge = '<span class="product-card__badge product-card__badge--stock">' . esc_html__('Out of Stock', 'twork-builder') . '</span>';
    }

    $price_html = $product->get_price_html();
    $price      = $price_html
        ? '<p class="product-card__price">' . wp_kses_post($price_html) . '</p>'
        : '';

    if ($variant === 'compact') {
        ob_start();
        ?>
        <article class="product-card product-card--compact" data-item-id="<?php echo esc_attr((string) $product_id); ?>">
            <a class="product-card__thumb-link" href="<?php echo esc_url($permalink); ?>">
                <img class="product-card__thumb" src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($title); ?>" width="80" height="80" loading="lazy" />
            </a>
            <div class="product-card__body">
                <h3 class="product-card__title"><a href="<?php echo esc_url($permalink); ?>"><?php echo esc_html($title); ?></a></h3>
                <?php echo twork_shop_render_product_stars($product); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                <?php echo wp_kses_post($price); ?>
            </div>
        </article>
        <?php
        return ob_get_clean();
    }

    ob_start();
    ?>
    <article class="product-card product-card--grid" data-item-id="<?php echo esc_attr((string) $product_id); ?>">
        <div class="product-card__media">
            <?php echo wp_kses_post($badge); ?>
            <a href="<?php echo esc_url($permalink); ?>" class="product-card__image-link">
                <img class="product-card__image" src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($title); ?>" width="280" height="280" loading="lazy" />
            </a>
        </div>
        <div class="product-card__body">
            <h3 class="product-card__title"><a href="<?php echo esc_url($permalink); ?>"><?php echo esc_html($title); ?></a></h3>
            <?php echo twork_shop_render_product_stars($product); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
            <?php echo wp_kses_post($price); ?>
        </div>
    </article>
    <?php
    return ob_get_clean();
}

/**
 * Build carousel slides from products (4 per slide).
 *
 * @param WC_Product[] $products Products.
 *
 * @return string
 */
function twork_shop_render_product_carousel_slides($products)
{
    if (empty($products)) {
        return '';
    }

    $chunks = array_chunk($products, 4);
    $html   = '';

    foreach ($chunks as $index => $chunk) {
        $active = $index === 0 ? ' is-active' : '';
        $hidden = $index === 0 ? 'false' : 'true';
        $cards  = '';

        foreach ($chunk as $product) {
            $cards .= twork_shop_render_product_card($product, 'grid');
        }

        $html .= sprintf(
            '<div class="product-carousel__slide%s" data-carousel-slide aria-hidden="%s"><div class="product-carousel__grid" data-list="products">%s</div></div>',
            esc_attr($active),
            esc_attr($hidden),
            $cards
        );
    }

    return $html;
}

/**
 * Render carousel dot navigation.
 *
 * @param int $count Slide count.
 *
 * @return string
 */
function twork_shop_render_carousel_dots($count)
{
    if ($count < 2) {
        return '';
    }

    $dots = '';
    for ($i = 0; $i < $count; $i++) {
        $active = $i === 0 ? ' is-active' : '';
        $dots  .= sprintf(
            '<button type="button" class="carousel-dots__dot%s" data-action="carousel-go" data-slide-index="%d" aria-label="%s"></button>',
            esc_attr($active),
            $i,
            esc_attr(sprintf(/* translators: %d: slide number */ __('Slide %d', 'twork-builder'), $i + 1))
        );
    }

    return $dots;
}

/**
 * Render twork/daily-offers-carousel or twork/best-sellers-carousel.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string
 */
function twork_render_shop_product_carousel($attributes, $content, $block)
{
    if (!class_exists('WooCommerce')) {
        return twork_shop_woocommerce_missing();
    }

    $block_name = is_object($block) && !empty($block->name) ? $block->name : '';
    $is_daily   = $block_name === 'twork/daily-offers-carousel';

    $defaults = array(
        'sectionTitle'  => $is_daily ? __('Daily Offers', 'twork-builder') : __('Best Sellers', 'twork-builder'),
        'numberOfItems' => 4,
        'source'        => $is_daily ? 'on_sale' : 'best_selling',
        'viewAllHref'   => wc_get_page_permalink('shop'),
    );

    $atts     = wp_parse_args($attributes, $defaults);
    $products = twork_shop_query_products(
        array(
            'source'        => $atts['source'],
            'numberOfItems' => absint($atts['numberOfItems']),
        )
    );

    if (empty($products)) {
        return '';
    }

    $slides      = twork_shop_render_product_carousel_slides($products);
    $slide_count = (int) ceil(count($products) / 4);
    $dots        = twork_shop_render_carousel_dots($slide_count);

    $panel_class = $is_daily ? 'daily-offers__panel' : 'best-sellers__panel';
    $stage_class = $is_daily ? 'daily-offers__stage' : 'best-sellers__stage';
    $track_class = $is_daily ? 'daily-offers__track' : 'best-sellers__track';
    $dots_class  = $is_daily ? 'daily-offers__dots' : 'best-sellers__dots';
    $root_class  = $is_daily ? 'daily-offers' : 'best-sellers';

    $icon = $is_daily
        ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>'
        : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>';

    ob_start();
    ?>
    <section class="<?php echo esc_attr($root_class); ?>" data-block="<?php echo esc_attr($block_name); ?>">
        <div class="l-section">
            <div class="shop-panel <?php echo esc_attr($panel_class); ?>">
                <header class="shop-panel__head">
                    <div class="shop-panel__title-wrap">
                        <span class="shop-panel__icon" aria-hidden="true"><?php echo $icon; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
                        <h2 class="shop-panel__title"><?php echo esc_html($atts['sectionTitle']); ?></h2>
                    </div>
                    <?php if (!empty($atts['viewAllHref'])) : ?>
                        <a class="shop-panel__view-all" href="<?php echo esc_url($atts['viewAllHref']); ?>"><?php esc_html_e('View All ›', 'twork-builder'); ?></a>
                    <?php endif; ?>
                </header>
                <div class="<?php echo esc_attr($stage_class); ?>" role="region" aria-label="<?php echo esc_attr($atts['sectionTitle']); ?>" data-brand-carousel="1" data-autoplay-ms="0">
                    <div class="<?php echo esc_attr($track_class); ?>"><?php echo $slides; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
                </div>
                <?php if ($dots) : ?>
                    <div class="<?php echo esc_attr($dots_class); ?> carousel-dots"><?php echo $dots; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

/**
 * Render twork/daily-offers-carousel.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string
 */
function twork_render_daily_offers_carousel($attributes, $content, $block)
{
    return twork_render_shop_product_carousel($attributes, $content, $block);
}

/**
 * Render twork/best-sellers-carousel.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string
 */
function twork_render_best_sellers_carousel($attributes, $content, $block)
{
    return twork_render_shop_product_carousel($attributes, $content, $block);
}

/**
 * Render twork/featured-categories-carousel.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string
 */
function twork_render_featured_categories_carousel($attributes, $content, $block)
{
    if (!class_exists('WooCommerce')) {
        return twork_shop_woocommerce_missing();
    }

    $defaults = array(
        'sectionTitle'  => __('Featured Categories', 'twork-builder'),
        'numberOfItems' => 8,
        'viewAllHref'   => wc_get_page_permalink('shop'),
    );

    $atts = wp_parse_args($attributes, $defaults);

    $terms = get_terms(
        array(
            'taxonomy'   => 'product_cat',
            'hide_empty' => true,
            'number'     => absint($atts['numberOfItems']),
            'parent'     => 0,
            'orderby'    => 'name',
            'order'      => 'ASC',
        )
    );

    if (is_wp_error($terms) || empty($terms)) {
        return '';
    }

    $cards = array();
    foreach ($terms as $term) {
        $thumb_id  = get_term_meta($term->term_id, 'thumbnail_id', true);
        $image_url = $thumb_id ? wp_get_attachment_image_url((int) $thumb_id, 'medium') : wc_placeholder_img_src('medium');
        $term_link = get_term_link($term);

        $children = get_terms(
            array(
                'taxonomy'   => 'product_cat',
                'hide_empty' => true,
                'parent'     => $term->term_id,
                'number'     => 3,
            )
        );

        $links = '';
        if (!is_wp_error($children) && !empty($children)) {
            foreach ($children as $child) {
                $links .= sprintf(
                    '<a class="featured-categories__link" href="%1$s" data-item-id="%2$s">%3$s</a>',
                    esc_url(get_term_link($child)),
                    esc_attr((string) $child->term_id),
                    esc_html($child->name)
                );
            }
        }

        $links .= sprintf(
            '<a class="featured-categories__link featured-categories__link--cta" href="%1$s" data-item-id="%2$s">%3$s ›</a>',
            esc_url($term_link),
            esc_attr((string) $term->term_id),
            esc_html__('Shop All', 'twork-builder')
        );

        $cards[] = sprintf(
            '<article class="featured-categories__card" data-item-id="%1$s"><div class="featured-categories__media"><img src="%2$s" alt="%3$s" width="200" height="160" loading="lazy" /></div><h3 class="featured-categories__name">%3$s</h3><nav class="featured-categories__links">%4$s</nav></article>',
            esc_attr((string) $term->term_id),
            esc_url($image_url),
            esc_html($term->name),
            $links
        );
    }

    $chunks = array_chunk($cards, 4);
    $slides = '';
    foreach ($chunks as $index => $chunk) {
        $active = $index === 0 ? ' is-active' : '';
        $hidden = $index === 0 ? 'false' : 'true';
        $slides .= sprintf(
            '<div class="featured-categories__slide%s" data-carousel-slide aria-hidden="%s"><div class="featured-categories__grid" data-list="categories">%s</div></div>',
            esc_attr($active),
            esc_attr($hidden),
            implode('', $chunk)
        );
    }

    $dots = twork_shop_render_carousel_dots(count($chunks));

    ob_start();
    ?>
    <section class="featured-categories" data-block="twork/featured-categories-carousel">
        <div class="l-section">
            <div class="shop-panel featured-categories__panel">
                <header class="shop-panel__head">
                    <div class="shop-panel__title-wrap">
                        <span class="shop-panel__icon" aria-hidden="true">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 16l4-8 4 5 5-9"/></svg>
                        </span>
                        <h2 class="shop-panel__title"><?php echo esc_html($atts['sectionTitle']); ?></h2>
                    </div>
                    <?php if (!empty($atts['viewAllHref'])) : ?>
                        <a class="shop-panel__view-all" href="<?php echo esc_url($atts['viewAllHref']); ?>"><?php esc_html_e('View All ›', 'twork-builder'); ?></a>
                    <?php endif; ?>
                </header>
                <div class="featured-categories__stage" role="region" aria-label="<?php echo esc_attr($atts['sectionTitle']); ?>" data-brand-carousel="1" data-autoplay-ms="0">
                    <button type="button" class="featured-categories__arrow featured-categories__arrow--prev" data-action="carousel-prev" aria-label="<?php esc_attr_e('Previous', 'twork-builder'); ?>">‹</button>
                    <div class="featured-categories__track"><?php echo $slides; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
                    <button type="button" class="featured-categories__arrow featured-categories__arrow--next" data-action="carousel-next" aria-label="<?php esc_attr_e('Next', 'twork-builder'); ?>">›</button>
                </div>
                <?php if ($dots) : ?>
                    <div class="featured-categories__dots carousel-dots"><?php echo $dots; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
                <?php endif; ?>
            </div>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

/**
 * Render twork/product-grid-section.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string
 */
function twork_render_product_grid_section($attributes, $content, $block)
{
    if (!class_exists('WooCommerce')) {
        return twork_shop_woocommerce_missing();
    }

    $defaults = array(
        'columns' => 4,
        'perPage' => 12,
    );

    $atts = wp_parse_args($attributes, $defaults);

    $per_page = max(1, absint($atts['perPage']));
    $columns  = max(2, min(4, absint($atts['columns'])));
    $paged    = max(1, absint(get_query_var('paged')));
    if (!$paged && isset($_GET['paged'])) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        $paged = max(1, absint(wp_unslash($_GET['paged']))); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
    }

    $orderby = isset($_GET['orderby']) ? sanitize_key(wp_unslash($_GET['orderby'])) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
    $layout  = isset($_GET['layout']) ? sanitize_key(wp_unslash($_GET['layout'])) : 'grid-4'; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

    $product_query = wc_get_products(
        array_merge(
            array(
                'status'   => 'publish',
                'limit'    => $per_page,
                'page'     => $paged,
                'paginate' => true,
                'return'   => 'objects',
            ),
            twork_shop_grid_wc_order_args($orderby)
        )
    );

    $products    = is_array($product_query) && isset($product_query['products']) ? $product_query['products'] : array();
    $total_pages = is_array($product_query) && isset($product_query['max_num_pages']) ? (int) $product_query['max_num_pages'] : 1;

    if (empty($products)) {
        return '';
    }

    $grid_class = 'product-grid__grid product-grid__grid--' . $columns;
    if ($layout === 'list') {
        $grid_class = 'product-grid__list';
    } elseif ($layout === 'grid-3') {
        $grid_class = 'product-grid__grid product-grid__grid--3';
    }

    $cards = '';
    foreach ($products as $product) {
        $cards .= twork_shop_render_product_card($product, 'grid');
    }

    ob_start();
    ?>
    <section class="product-grid" data-block="twork/product-grid-section" data-columns="<?php echo esc_attr((string) $columns); ?>" data-per-page="<?php echo esc_attr((string) $per_page); ?>">
        <div class="product-grid__live" aria-live="polite" aria-atomic="true">
            <div class="<?php echo esc_attr($grid_class); ?>" data-list="products" id="products"><?php echo $cards; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
        </div>
        <?php if ($total_pages > 1) : ?>
            <nav class="product-grid__pagination" aria-label="<?php esc_attr_e('Product pagination', 'twork-builder'); ?>">
                <span class="product-grid__page-label"><?php esc_html_e('Page', 'twork-builder'); ?></span>
                <span class="product-grid__page-box">
                    <input type="text" inputmode="numeric" value="<?php echo esc_attr((string) $paged); ?>" aria-label="<?php esc_attr_e('Current page', 'twork-builder'); ?>" data-action="grid-page-input" />
                </span>
                <span class="product-grid__page-total">/ <?php echo esc_html((string) $total_pages); ?></span>
                <?php if ($paged < $total_pages) : ?>
                    <a class="product-grid__page-next" href="<?php echo esc_url(add_query_arg('paged', $paged + 1)); ?>" aria-label="<?php esc_attr_e('Next page', 'twork-builder'); ?>">›</a>
                <?php else : ?>
                    <button type="button" class="product-grid__page-next" disabled aria-disabled="true" aria-label="<?php esc_attr_e('Next page', 'twork-builder'); ?>">›</button>
                <?php endif; ?>
            </nav>
        <?php endif; ?>
    </section>
    <?php
    return ob_get_clean();
}

/**
 * Map toolbar orderby keys to wc_get_products args.
 *
 * @param string $orderby Sort key.
 *
 * @return array
 */
function twork_shop_grid_wc_order_args($orderby)
{
    switch ($orderby) {
        case 'price-asc':
            return array('orderby' => 'price', 'order' => 'ASC');
        case 'price-desc':
            return array('orderby' => 'price', 'order' => 'DESC');
        case 'latest':
            return array('orderby' => 'date', 'order' => 'DESC');
        default:
            return array('orderby' => 'menu_order', 'order' => 'ASC');
    }
}

/**
 * Render twork/product-detail-section.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 *
 * @return string
 */
function twork_render_product_detail_section($attributes, $content, $block)
{
    if (!class_exists('WooCommerce')) {
        return twork_shop_woocommerce_missing();
    }

    $defaults = array(
        'productId' => 0,
    );

    $atts = wp_parse_args($attributes, $defaults);

    $product_id = absint($atts['productId']);
    if (!$product_id && is_singular('product')) {
        $product_id = get_queried_object_id();
    }

    $product = $product_id ? wc_get_product($product_id) : null;

    if (!$product || !$product->is_visible()) {
        ob_start();
        ?>
        <section class="product-detail" data-block="twork/product-detail-section">
            <div class="product-detail__inner l-section">
                <div class="product-detail__not-found">
                    <h1><?php esc_html_e('Product Not Found', 'twork-builder'); ?></h1>
                    <p><?php esc_html_e('ဤထုတ်ကုန်ကို ရှာမတွေ့ပါ။', 'twork-builder'); ?></p>
                    <a class="btn btn--primary" href="<?php echo esc_url(wc_get_page_permalink('shop')); ?>"><?php esc_html_e('Back to Shop', 'twork-builder'); ?></a>
                </div>
            </div>
        </section>
        <?php
        return ob_get_clean();
    }

    $permalink   = get_permalink($product_id);
    $title       = $product->get_name();
    $image_id    = $product->get_image_id();
    $image_url   = $image_id ? wp_get_attachment_image_url($image_id, 'large') : wc_placeholder_img_src('large');
    $price_html  = $product->get_price_html();
    $sku         = $product->get_sku();
    $in_stock    = $product->is_in_stock();
    $description = wp_strip_all_tags($product->get_short_description() ?: $product->get_description());

    $terms = get_the_terms($product_id, 'product_cat');
    $cat   = ($terms && !is_wp_error($terms)) ? $terms[0]->name : '';

    $badge = $product->is_on_sale()
        ? '<span class="product-detail__badge">' . esc_html__('Sale', 'twork-builder') . '</span>'
        : '';

    $related_ids = wc_get_related_products($product_id, 4);
    $related     = '';
    foreach ($related_ids as $rel_id) {
        $rel_product = wc_get_product($rel_id);
        if ($rel_product) {
            $related .= twork_shop_render_product_card($rel_product, 'compact');
        }
    }

    $tab_buttons = '';
    $tab_panels  = '';
    $tabs        = apply_filters(
        'woocommerce_product_tabs',
        array(
            'description' => array(
                'title'    => __('Description', 'twork-builder'),
                'priority' => 10,
                'callback' => 'woocommerce_product_description_tab',
            ),
        )
    );

    uasort(
        $tabs,
        function ($a, $b) {
            return ($a['priority'] ?? 10) <=> ($b['priority'] ?? 10);
        }
    );

    $tab_index = 0;
    foreach ($tabs as $key => $tab) {
        $active = $tab_index === 0 ? ' is-active' : '';
        $hidden = $tab_index === 0 ? '' : ' hidden';
        $tab_buttons .= sprintf(
            '<button type="button" class="product-detail__tab-btn%s" data-action="tab-switch" data-tab="%s" aria-selected="%s">%s</button>',
            esc_attr($active),
            esc_attr($key),
            $tab_index === 0 ? 'true' : 'false',
            esc_html($tab['title'])
        );

        ob_start();
        if (!empty($tab['callback']) && is_callable($tab['callback'])) {
            call_user_func($tab['callback'], $key, $tab);
        }
        $panel_content = ob_get_clean();

        $tab_panels .= sprintf(
            '<div class="product-detail__tab-panel%s" data-tab-panel="%s"%s><div class="product-detail__tab-panel-inner">%s</div></div>',
            esc_attr($active),
            esc_attr($key),
            $hidden,
            wp_kses_post($panel_content)
        );
        $tab_index++;
    }

    ob_start();
    ?>
    <section class="product-detail" data-block="twork/product-detail-section">
        <div class="product-detail__inner l-section">
            <div class="product-detail__grid">
                <div class="product-detail__gallery">
                    <?php echo wp_kses_post($badge); ?>
                    <img class="product-detail__image" src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($title); ?>" width="500" height="500" loading="eager" decoding="async" />
                </div>
                <div class="product-detail__info">
                    <?php if ($cat) : ?>
                        <p class="product-detail__category"><?php echo esc_html($cat); ?></p>
                    <?php endif; ?>
                    <h1 class="product-detail__title"><?php echo esc_html($title); ?></h1>
                    <?php echo twork_shop_render_product_stars($product); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                    <?php if ($price_html) : ?>
                        <p class="product-detail__price"><?php echo wp_kses_post($price_html); ?></p>
                    <?php endif; ?>
                    <?php if ($sku) : ?>
                        <p class="product-detail__sku"><?php echo esc_html(sprintf(/* translators: %s: SKU */ __('SKU: %s', 'twork-builder'), $sku)); ?></p>
                    <?php endif; ?>
                    <?php if ($description) : ?>
                        <p class="product-detail__desc"><?php echo esc_html($description); ?></p>
                    <?php endif; ?>
                    <p class="product-detail__stock <?php echo esc_attr($in_stock ? 'product-detail__stock--in' : 'product-detail__stock--out'); ?>">
                        <?php echo esc_html($in_stock ? __('In Stock', 'twork-builder') : __('Out of Stock', 'twork-builder')); ?>
                    </p>
                    <div class="product-detail__actions">
                        <?php if ($in_stock) : ?>
                            <a class="btn btn--primary product-detail__cart-btn add_to_cart_button" href="<?php echo esc_url($product->add_to_cart_url()); ?>" data-product_id="<?php echo esc_attr((string) $product_id); ?>">
                                <?php esc_html_e('ADD TO CART', 'twork-builder'); ?>
                            </a>
                        <?php else : ?>
                            <button class="btn btn--primary product-detail__cart-btn" type="button" disabled><?php esc_html_e('OUT OF STOCK', 'twork-builder'); ?></button>
                        <?php endif; ?>
                        <a class="btn btn--outline" href="tel:095255122"><?php esc_html_e('CALL TO ORDER', 'twork-builder'); ?></a>
                    </div>
                </div>
            </div>

            <?php if ($tab_buttons) : ?>
                <div class="product-detail__tabs">
                    <div class="product-detail__tab-nav" role="tablist"><?php echo $tab_buttons; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
                    <div class="product-detail__tab-content"><?php echo $tab_panels; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
                </div>
            <?php endif; ?>

            <?php if ($related) : ?>
                <aside class="product-detail__related">
                    <h2 class="product-detail__related-title"><?php esc_html_e('Related Products', 'twork-builder'); ?></h2>
                    <div class="product-detail__related-grid"><?php echo $related; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></div>
                </aside>
            <?php endif; ?>
        </div>
    </section>
    <?php
    return ob_get_clean();
}
