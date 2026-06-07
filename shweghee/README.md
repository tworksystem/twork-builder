# Farmart Static (HTML / CSS / JS)

Modular pages ready for WordPress block migration:

- **Home** — [Farmart Home Business Style 7](https://drfurithemes.com/farmart/home-business/?home_style=7)
- **Shop** — [Farmart Shop](https://drfurithemes.com/farmart/shop/)

## SEO

- `src/sitemap.xml` — update domain before production deploy
- `src/robots.txt` — points to sitemap

## Run locally

ES modules require a local server (do not open HTML via `file://`):

```bash
cd src
python3 -m http.server 8080
```

- Home: [http://localhost:8080/pages/home.html](http://localhost:8080/pages/home.html)
- Shop: [http://localhost:8080/pages/shop.html](http://localhost:8080/pages/shop.html)
- About: [http://localhost:8080/pages/about.html](http://localhost:8080/pages/about.html)
- Contact: [http://localhost:8080/pages/contact.html](http://localhost:8080/pages/contact.html)
- Blog: [http://localhost:8080/pages/blog.html](http://localhost:8080/pages/blog.html)
- FAQ: [http://localhost:8080/pages/faq.html](http://localhost:8080/pages/faq.html)
- Wholesale: [http://localhost:8080/pages/wholesale.html](http://localhost:8080/pages/wholesale.html)
- Privacy: [http://localhost:8080/pages/privacy.html](http://localhost:8080/pages/privacy.html)
- Quality: [http://localhost:8080/pages/quality.html](http://localhost:8080/pages/quality.html)
- Where to Buy: [http://localhost:8080/pages/where-to-buy.html](http://localhost:8080/pages/where-to-buy.html)
- Careers: [http://localhost:8080/pages/careers.html](http://localhost:8080/pages/careers.html)
- Accessibility: [http://localhost:8080/pages/accessibility.html](http://localhost:8080/pages/accessibility.html)
- Blog Article: [http://localhost:8080/pages/blog-single.html?id=post_1](http://localhost:8080/pages/blog-single.html?id=post_1)
- 404: [http://localhost:8080/pages/404.html](http://localhost:8080/pages/404.html)
- Product: [http://localhost:8080/pages/product.html?id=p1](http://localhost:8080/pages/product.html?id=p1)

## Structure

- `src/components/*` — one section per folder (`*.js`, `*.css`)
- `src/scripts/data/home.mock.json` — content (replace with WP block attributes later)
- `src/scripts/core/slider.js` — shared carousel + image fallback
- `src/scripts/core/accordion.js` — FAQ accordion
- `docs/block-mapping.md` — WordPress block mapping

## Home sections (top to bottom)

Header → Hero → Services → Why Choose Us → Product Categories → Partners → Blog → Testimonials → App Promo → FAQ → Newsletter → Footer

## Shop sections (top to bottom)

Shop Header → Breadcrumb → Shop Hero → Sidebar (categories + recommendations) → Featured Categories → Daily Offers → Best Sellers → Toolbar → Product Grid → Shop Footer
