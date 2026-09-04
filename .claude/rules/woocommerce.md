---
paths:
  - "includes/class-twork-shop-blocks.php"
  - "includes/class-twork-agrezer-shop-grid-section.php"
  - "includes/class-twork-ph-*-section.php"
  - "src/shop-*/**"
  - "src/product-*/**"
  - "src/ph-*-section/**"
  - "woocommerce-import/**"
---

# WooCommerce-backed blocks

Full rule: `.cursor/rules/woocommerce-blocks.mdc`.

Hard guards:

- WooCommerce is **optional** — keep the `twork_shop_woocommerce_missing()` fallback; never call `wc_*` or `WC()` without a `class_exists('WooCommerce')` / `function_exists()` guard
- `wc_get_products()` / `wc_get_product()` — never a raw `WP_Query` on `post_type=product`, never `query_posts()`
- HPOS-compatible only: order data through `wc_get_order()` CRUD, never `postmeta`
- `$_GET` `orderby` / `order` / `paged` / category are untrusted — keep the existing allow-list resolver (`twork_*_resolve_orderby`)
- Cap every product query; no unbounded `limit => -1`
- Extend via Woo hooks; never copy a Woo template into this plugin or modify Woo core
- No `wc_get_product()` inside a loop over known IDs — batch with `include`
- No cart / checkout / payment logic in a page-builder block
- No `declare(strict_types=1)` retrofits — this plugin targets PHP 7.4
