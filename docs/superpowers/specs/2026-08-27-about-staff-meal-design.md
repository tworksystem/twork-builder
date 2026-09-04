# About Staff Meal Section — Design Spec

**Date:** 2026-08-27  
**Status:** Approved (conversation) — pending user review of this file  
**Plugin:** twork-builder (WordPress block plugin)  
**Pattern:** `endo-*` suite (static save, parent + InnerBlocks children, rich toggles)

## Goal

Add an About Us section that presents the hospital staff meal program (“MEAL TREAT FOR DUTY TIME”), matching the AGM report page content structure: title, image gallery, staff feedback columns, highlight quote, with optional AGM chrome (logo / company / page badge / footer).

Every visual element is toggleable. Inspector settings cover layout, spacing, color, typography, and motion where practical.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Priority vs endoscopy Wave 2 | Pause endo; staff meal first |
| Block shape | Parent + children (Approach 1 / endo pattern) |
| AGM chrome | Optional; master + per-piece toggles; **default OFF** |
| Gallery layout | Hybrid: `featured-trio` \| `equal-grid` \| `stacked`; default `featured-trio` |
| Render | Static `save.js` (not PHP dynamic like `about-story`) |
| Sync | All new slugs in `SKIP_BLOCKS` |
| Motion | Vanilla IntersectionObserver only; no GSAP |
| Default images | Empty (Media Library); no hotlinked Unsplash / placeholders in defaults |

## Out of scope

- Endoscopy Wave 2 continuation
- AGM PDF export / print stylesheet
- Real Instagram / social embeds
- Version bump / release zip (until DevOps step)
- Kit template page wiring (optional follow-up)

## Block map

| Block name | Slug | Role |
|------------|------|------|
| `twork/about-staff-meal-section` | `about-staff-meal-section` | Parent shell |
| `twork/about-staff-meal-gallery-item` | `about-staff-meal-gallery-item` | Gallery image child |
| `twork/about-staff-meal-feedback-item` | `about-staff-meal-feedback-item` | Staff feedback child |

**Nesting**

```
about-staff-meal-section
├── chrome (attrs) — logo, company name, page badge
├── header (attrs) — eyebrow, title, underline
├── gallery region — InnerBlocks → gallery-item × N
├── feedback region — InnerBlocks → feedback-item × N
├── quote (attrs)
└── footer (attrs) — AGM line
```

**Allowed inner blocks**

- Gallery region: only `twork/about-staff-meal-gallery-item`
- Feedback region: only `twork/about-staff-meal-feedback-item`
- Edit UI: **two explicit `InnerBlocks` regions** (gallery + feedback), each with its own `allowedBlocks` + default `template` of 3 items. Not a single flat InnerBlocks list.

## File plan

```
src/about-staff-meal-section/
  block.json, index.js, edit.js, save.js, style.scss
src/about-staff-meal-gallery-item/
  block.json, index.js, edit.js, save.js, style.scss
src/about-staff-meal-feedback-item/
  block.json, index.js, edit.js, save.js, style.scss
src/shared/_about-staff-meal-tokens.scss
assets/js/about-staff-meal-init.js          # optional scroll reveal
scripts/sync-src-from-mk.py                 # SKIP_BLOCKS += 3 slugs
twork-builder.php                           # viewScript enqueue map if init used
```

Category: `twork-builder`  
Keywords: about, staff meal, meal treat, jivaka, agm  
Text domain: `twork-builder`  
BEM root: `.twork-about-staff-meal` / `.twork-about-staff-meal-gallery-item` / `.twork-about-staff-meal-feedback-item`

## Parent attributes (contract)

### Shell

| Attr | Type | Default | Notes |
|------|------|---------|-------|
| `showSection` | boolean | `true` | Master hide |
| `sectionId` | string | `staff-meal` | Anchor id |
| `backgroundColor` | string | `#ffffff` | |
| `paddingTop` / `paddingBottom` | number | `80` / `80` | px |
| `paddingTopMobile` / `paddingBottomMobile` | number | `48` / `48` | |
| `containerMaxWidth` | number | `1100` | |
| `containerPadding` | number | `24` | |
| `accentColor` | string | `#e85d04` | AGM orange; drives underline, badges, quote marks |

### Chrome (default OFF)

| Attr | Type | Default |
|------|------|---------|
| `showChrome` | boolean | `false` |
| `showLogo` | boolean | `true` (when chrome on) |
| `logoUrl` / `logoAlt` / `logoId` | string/number | empty |
| `showCompanyName` | boolean | `true` |
| `companyName` | string | `BLISSFUL HEALTH COMPANY LIMITED` |
| `showPageBadge` | boolean | `true` |
| `pageBadgeText` | string | `Pg 51` |

### Header

| Attr | Type | Default |
|------|------|---------|
| `showEyebrow` | boolean | `false` |
| `eyebrowText` | string | `Staff benefits` |
| `showTitle` | boolean | `true` |
| `title` | string | `MEAL TREAT FOR DUTY TIME` |
| `headingLevel` | number | `2` | 2–4 |
| `showTitleUnderline` | boolean | `true` |
| `titleColor` | string | accent |
| `titleFontSize` | number | `28` | desktop px |

### Gallery

| Attr | Type | Default |
|------|------|---------|
| `showGallery` | boolean | `true` |
| `galleryLayout` | string | `featured-trio` | enum: `featured-trio` \| `equal-grid` \| `stacked` |
| `galleryColumns` | number | `2` | used by `equal-grid` (2–3) |
| `galleryGap` | number | `12` | px |
| `showCaptions` | boolean | `false` | section-level; item can still hide |

### Feedback

| Attr | Type | Default |
|------|------|---------|
| `showFeedback` | boolean | `true` |
| `feedbackColumns` | number | `3` | 1–3 |
| `feedbackGap` | number | `24` | |
| `showAuthor` | boolean | `true` | section-level gate for names |
| `allowEmoji` | boolean | `true` | documentation only; body is RichText |

### Quote

| Attr | Type | Default |
|------|------|---------|
| `showQuote` | boolean | `true` |
| `quoteText` | string | Burmese highlight from AGM (see Defaults) |
| `showQuoteMarks` | boolean | `true` |
| `quoteMarkColor` | string | accent |
| `quoteTextColor` | string | accent |
| `quoteFontSize` | number | `22` | |
| `quoteMaxWidth` | number | `900` | |

### Footer (default OFF)

| Attr | Type | Default |
|------|------|---------|
| `showFooter` | boolean | `false` |
| `footerText` | string | `2nd AGM (2025-2026)` |
| `showFooterLines` | boolean | `true` |
| `footerLineColor` | string | accent |

### Motion

| Attr | Type | Default |
|------|------|---------|
| `animationOnScroll` | boolean | `true` |
| `animationType` | string | `fade-up` |
| `animationDelay` | number | `0` |
| `respectReducedMotion` | boolean | `true` |

## Child: gallery-item

| Attr | Type | Default |
|------|------|---------|
| `showItem` | boolean | `true` |
| `imageUrl` / `imageAlt` / `imageId` | | empty |
| `imageRole` | string | `secondary` | `featured` \| `secondary` — trio layout uses first `featured` (or first item) as wide top |
| `showCaption` | boolean | `false` |
| `caption` | string | `` |
| `showBadge` | boolean | `false` |
| `badgeText` | string | `Meal` |
| `badgeColor` | string | accent |

Empty image: editor placeholder; front-end omits `<img>` (no broken icon).

## Child: feedback-item

| Attr | Type | Default |
|------|------|---------|
| `showItem` | boolean | `true` |
| `showName` | boolean | `true` |
| `name` | string | sample author |
| `showHeart` | boolean | `true` |
| `body` | string | Burmese sample (RichText) |

## Defaults content

- **Title:** `MEAL TREAT FOR DUTY TIME`
- **Quote (MY):** စားသောက်မှု အရသာ ကျေနပ်မှု ဆန်းစစ်ချက် မှတ်တမ်းများမှ ရရှိသော အကြံပြုချက်များကို အခြေခံကာ ဝန်ထမ်းများအတွက် သန့်ရှင်းလတ်ဆတ်ပြီး အရသာရှိသော အစားအစာများကို နေ့စဉ် ချက်ပြုတ်ကျွေးမွေးလျက်ရှိပါသည်။
- **Feedback:** 3 sample items with short Burmese copy (inspired by AGM names: Kay Khaing Win, Hay Mar Thin, + one more). Keep samples short; editors replace with full text.
- **Gallery template:** 3 items — item1 `imageRole: featured`, item2/3 `secondary`; badge on item2 optional default ON with text `Meal`.
- **Chrome / footer:** OFF so About Us web pages stay clean by default.

## CSS

- Tokens file: accent, container, quote-mark font-size, gallery gap, feedback column min-width.
- `featured-trio`: CSS grid — row1 full-width featured; row2 two equal cells. Map children by `imageRole` (or order fallback: first = featured).
- `equal-grid`: `repeat(N, 1fr)` from `galleryColumns`.
- `stacked`: single column.
- Feedback: CSS columns / grid from `feedbackColumns`; mobile force 1 column ≤768px.
- Quote: large decorative `“` `”` via CSS `::before`/`::after` or spans; color from attrs.
- `prefers-reduced-motion`: disable reveal transforms.

## Front-end JS

`assets/js/about-staff-meal-init.js` (IIFE, guard + re-bind safe):

- If `animationOnScroll` and not reduced motion: IntersectionObserver → `.is-visible` on section regions.
- Enqueue from `twork-builder.php` viewScript map when block present (same pattern as `endo-stats-init.js`).

## Inspector UX (edit.js)

Parent panels (suggested order):

1. Section (show, id, spacing, bg, accent)
2. Chrome
3. Header
4. Gallery layout
5. Feedback layout
6. Quote
7. Footer
8. Motion

Children: MediaUpload + per-field toggles + text fields.

Editor preview must respect the same toggles as save output (no “always show in editor” except empty placeholders).

## Edge cases

| Case | Behaviour |
|------|-----------|
| `showSection` false | Empty save / null render |
| `showGallery` false or zero visible items | Gallery region omitted |
| `featured-trio` with &lt; 3 items | Render available items only; no empty slots |
| Multiple `featured` roles | First featured wins; others treated secondary |
| `showFeedback` false or zero visible | Feedback region omitted |
| `showQuote` false or empty text | Quote omitted |
| `showChrome` false | Logo/company/badge ignored even if sub-toggles true |
| Reduced motion | No scroll animation classes applied |

## Failure scenario + fallback

- **Zip &gt; 2 MB** after assets: keep image defaults empty; do not ship AGM JPG in plugin; site editors upload via Media Library.
- **Sync wipe:** forgetting `SKIP_BLOCKS` → blocks deleted on `npm run build`. Mitigate: add all three slugs before first build.

## Builder waves (implementation)

1. **Wave 1** — `SKIP_BLOCKS` + tokens + parent shell (header/chrome/quote/footer toggles) + empty InnerBlocks regions + build smoke  
2. **Wave 2** — gallery-item + layout modes + captions/badges  
3. **Wave 3** — feedback-item + columns + init JS enqueue + lint  

QA after each wave: `npm run build`, `php -l` N/A for pure JS unless PHP enqueue touched, lint-js on new folders, editor smoke deferred to user unless requested.

## Verification checklist (QA)

- [ ] Build OK  
- [ ] Blocks appear in inserter under twork-builder  
- [ ] Each toggle hides the matching front-end node  
- [ ] `featured-trio` / `equal-grid` / `stacked` switch correctly  
- [ ] No broken image when URL empty  
- [ ] Reduced motion respected  
- [ ] Existing posts: N/A (new blocks; no deprecation needed on first ship)  
- [ ] Editor smoke (manual)  

## Open decisions

None locked-open. Optional later: kit HTML template slot for About page — not required for block ship.
