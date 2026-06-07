# Section to WordPress Block Mapping

Industry-agnostic block names (`twork/*`) — reusable across food, retail, healthcare, and other sectors.

| Static Component | `data-block` | `src/` folder | Notes |
| --- | --- | --- | --- |
| `header` | `twork/brand-header` | `brand-header` | Logo + hotline + nav; child `twork/brand-nav-item` |
| `hero` | `twork/hero-banner-carousel` | `hero-banner-carousel` | Child `twork/hero-banner-slide` |
| `services-carousel` | `twork/image-card-carousel` | `image-card-carousel` | Child `twork/image-card-slide` |
| `why-choose-us` | `twork/numbered-features-grid` | `numbered-features-grid` | Child `twork/numbered-feature-item` |
| `product-categories` | `twork/category-card-grid` | `category-card-grid` | Child `twork/category-card` |
| `partners` | `twork/logo-showcase-section` | `logo-showcase-section` | Child `twork/logo-showcase-item` |
| `blog-news` | `twork/news-card-grid` | `news-card-grid` | Child `twork/news-card` |
| `testimonials` | `twork/review-carousel` | `review-carousel` | Child `twork/review-card` |
| `app-promo` | `twork/split-promo-section` | `split-promo-section` | Split layout CTA + features + image |
| `faq` | `twork/faq-accordion-section` | `faq-accordion-section` | Child `twork/faq-accordion-item`; FAQPage schema |
| `newsletter` | `twork/subscribe-bar` | `subscribe-bar` | Email subscribe strip + honeypot |
| `footer` | `twork/brand-footer` | `brand-footer` | Children: `brand-footer-info-card`, `brand-footer-column` |

## Legacy aliases (deprecated)

| Old `data-block` | New `data-block` |
| --- | --- |
| `farmart/header` | `twork/brand-header` |
| `farmart/hero-slider` | `twork/hero-banner-carousel` |
| `farmart/services-carousel` | `twork/image-card-carousel` |
| `farmart/why-choose-us` | `twork/numbered-features-grid` |
| `farmart/product-categories` | `twork/category-card-grid` |
| `farmart/partners` | `twork/logo-showcase-section` |
| `farmart/blog-news` | `twork/news-card-grid` |
| `farmart/testimonials` | `twork/review-carousel` |
| `farmart/app-promo` | `twork/split-promo-section` |
| `farmart/faq` | `twork/faq-accordion-section` |
| `farmart/newsletter-cta` | `twork/subscribe-bar` |
| `farmart/footer` | `twork/brand-footer` |

## Shop page blocks (unchanged — future phase)

| Static Component | `data-block` | Notes |
| --- | --- | --- |
| `shop-header` | `farmart/shop-header` | Utility bar, search, nav, cart |
| `breadcrumb` | `farmart/breadcrumb` | BreadcrumbList schema |
| `shop-hero` | `farmart/shop-hero-slider` | Shop promo slides |
| `shop-sidebar` | `farmart/shop-sidebar` | Categories accordion + recommendations |
| `featured-categories` | `farmart/featured-categories` | Category cards carousel |
| `daily-offers` | `farmart/daily-offers` | Product carousel |
| `best-sellers` | `farmart/best-sellers` | Product carousel |
| `shop-toolbar` | `farmart/shop-toolbar` | Sort, per-page, layout toggles |
| `product-grid` | `farmart/product-grid` | Woo loop + pagination |
| `product-card` | `farmart/product-card` | Shared inner card template |
| `shop-footer` | `farmart/shop-footer` | Contact, columns, newsletter |
| `back-to-top` | `farmart/back-to-top` | Fixed scroll control |

## Migration Checklist

1. Keep `data-block`, `data-list`, `data-item-id` on saved markup.
2. One block scaffold per row in the table above.
3. Port each `*.css` to block `style.scss`.
4. Port each `init*` to block `viewScript`.
5. Replace `home.mock.json` fields with block attributes.
6. Visual compare against reference URL per section.
