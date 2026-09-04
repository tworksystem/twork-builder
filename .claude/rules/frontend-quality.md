---
paths:
  - "src/**/*.{scss,css}"
  - "includes/**/*.php"
  - "templates/**/*"
  - "assets/**/*"
  - "*.html"
---

# Front-end output — performance, a11y, media

Full rules: `.cursor/rules/web-app-optimization.mdc` and
`.cursor/rules/landing-page-image-quality.mdc`. Read them for anything beyond a small fix.

Hard guards:

- **Escape at output, every time** — `esc_html` / `esc_attr` / `esc_url` / `wp_kses_post`; block attributes are untrusted
- Enqueue per block via `block.json` (`style` / `viewScript`), versioned off `TWORK_BUILDER_VERSION` — never site-wide
- Every image needs `width`/`height` or `aspect-ratio` (CLS); `loading="lazy"` below the fold, never on the LCP image
- No placeholder services (`placehold.co`, `picsum.photos`, …) — including in `block.json` `example` and attribute defaults
- Media by Media Library ID (`wp_get_attachment_image()`), not a hardcoded URL; plugin art via `TWORK_BUILDER_URL`
- Informative images get a specific, editable `alt`; decorative get `alt=""`
- No `WP_Query` inside a render loop; no `posts_per_page => -1` on a growing query
- Keyboard reachability + visible focus on tabs, accordions, filters, modals; `aria-expanded` / `aria-controls` on disclosures
- Do not mutate existing responsive rules when fixing a mobile view
- No new animation library; respect `prefers-reduced-motion`
