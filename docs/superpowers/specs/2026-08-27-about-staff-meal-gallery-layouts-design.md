# About Staff Meal Gallery — Size Fix + Slider/Slideshow

**Date:** 2026-08-27  
**Status:** Approved (conversation) — pending user review of this file  
**Plugin:** twork-builder  
**Parent spec:** `docs/superpowers/specs/2026-08-27-about-staff-meal-design.md`  
**Scope:** Approach A / Architect Approach 1

## Goal

1. Fix oversized gallery images in editor + front end (CLS-safe aspect boxes).
2. Extend gallery layouts with `slider` and `slideshow`.
3. Keep GIF support via image MIME; **no video** this wave.
4. Make “add another image” discoverable in the editor.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Approach | CSS constraint + extend `galleryLayout` enum + vanilla init |
| New layouts | `slider` (manual prev/next + dots) · `slideshow` (autoplay) |
| Keep layouts | `featured-trio` \| `equal-grid` \| `stacked` |
| GIF | `allowedTypes: ['image']` only (GIF already allowed) |
| Video | Out of scope |
| Slider lib | None (vanilla JS; no Swiper/Embla/GSAP) |
| Default layout | Unchanged: `featured-trio` |
| Sync | Existing 5 staff-meal slugs already in `SKIP_BLOCKS` |
| Version / zip | Not this wave unless DevOps asked |

## Out of scope

- Video / external embed items
- New npm packages
- Version bump / release zip
- Feedback region changes
- Re-adding AGM chrome

## Root cause (size bug)

`.twork-about-staff-meal-gallery-item img` uses `height: 100%` with `object-fit: cover`, which fights `aspect-ratio` and lets intrinsic media size blow the figure in editor and front end.

## File plan

```
src/about-staff-meal-gallery-item/style.scss   # size fix
src/about-staff-meal-gallery/edit.js           # appender UX
src/about-staff-meal-gallery/style.scss        # editor appender hint (optional)
src/about-staff-meal-section/block.json        # galleryLayout enum + autoplay attrs
src/about-staff-meal-section/edit.js           # layout options + autoplay controls
src/about-staff-meal-section/save.js           # data-* for slider/slideshow
src/about-staff-meal-section/style.scss        # slider/slideshow CSS
assets/js/about-staff-meal-init.js             # reveal + slider/slideshow (new or extend)
twork-builder.php                              # viewScript enqueue map if needed
```

Optional: `src/about-staff-meal-gallery-item/edit.js` — no media-type change required if already `image`.

## Attribute contract (parent section)

| Attr | Type | Default | Notes |
|------|------|---------|-------|
| `galleryLayout` | string | `featured-trio` | enum += `slider` \| `slideshow` |
| `galleryAutoplay` | boolean | `true` | slideshow only; ignored otherwise |
| `galleryAutoplayMs` | number | `4500` | 2000–12000; slideshow only |
| existing | `galleryColumns`, `galleryGap`, `showCaptions`, `showGallery` | unchanged |

`data-gallery-layout`, `data-gallery-autoplay` (`1`/`0`), `data-gallery-autoplay-ms` on section wrapper (edit + save).

## CSS — size fix

Gallery item figure:

- `overflow: hidden`; fixed aspect box
- `img`: `width: 100%`; `height: auto`; `aspect-ratio: 4 / 3` (featured `16 / 9`); `object-fit: cover`; **remove `height: 100%`**
- Optional `max-height` clamp in editor if still oversized (e.g. `min(420px, 56vw)` for featured)

Grid layouts keep current parent selectors; ensure `minmax(0, 1fr)` so grid children cannot blow column width.

## CSS / markup — slider & slideshow

When `galleryLayout` is `slider` or `slideshow`:

- Gallery region is a single-viewport track; each item is a slide
- One visible slide at a time; non-active slides `aria-hidden="true"` (JS) / visually off
- Controls: prev/next buttons + dot list (hidden if ≤1 item)
- Slideshow: same chrome; timer advances; pause on hover/focus; `prefers-reduced-motion` → no autoplay, show static first (or all stacked fallback)

Editor: for slider/slideshow, show a compact stack or same aspect boxes so multiple items remain editable (do not run autoplay in editor). Prefer CSS-only editor preview (all slides stacked/grid with max-height) so InnerBlocks appender stays usable.

## Front-end JS

`assets/js/about-staff-meal-init.js` (IIFE, re-bind safe):

1. Existing/planned scroll reveal (if already mapped).
2. If `data-gallery-layout` ∈ `slider|slideshow`:
   - Bind gallery root `.twork-about-staff-meal-gallery`
   - Wire prev/next/dots; keyboard (ArrowLeft/Right when focused)
   - Slideshow: `setInterval` from `data-gallery-autoplay-ms` when autoplay `1` and not reduced motion
3. ≤1 slide: hide controls, no timer

Enqueue via existing `twork-builder.php` viewScript / block-present map (same pattern as `endo-*-init.js`).

Controls markup: inject on front end via JS **or** static empty control shells in gallery `save.js`. Prefer **JS-injected controls** on FE only so static save markup of items stays valid and editor stays simple. Document that FE without JS still shows all slides (stacked/grid CSS fallback for slider modes: show first only via CSS `:first-child` + hide siblings if no `.is-asm-gallery-ready` class).

## Editor UX

- Gallery `InnerBlocks`: keep `templateLock={ false }`; ensure default appender visible (`renderAppender={ InnerBlocks.ButtonBlockAppender }` if needed)
- Short editor-only hint under Gallery label: “Add images with +”
- Layout controls stay on **parent section** panel “Gallery Layout” (not on image item)
- Image item: keep MediaPlaceholder / Replace / Remove; GIF ok as image

## Edge cases

| Case | Behaviour |
|------|-----------|
| 0 images | Empty gallery / placeholders only |
| 1 image | No dots/arrows; no autoplay |
| `showGallery` false | Region hidden (existing) |
| Reduced motion + slideshow | No autoplay; first slide (or static stack) |
| Existing posts on trio/grid/stacked | Unchanged; new enum values additive |
| Block validation | Prefer no saved markup change on items; section gains data attrs only — if save HTML shape changes, ship `deprecated` |

## Failure + fallback

- Init fails / JS blocked → CSS shows first slide only (or stacked); no broken layout
- Zip size: no new binary assets

## Builder waves

1. **Wave G1** — size CSS fix + appender UX + build smoke  
2. **Wave G2** — `slider`/`slideshow` attrs + CSS + init JS + enqueue  

QA each wave: `npm run build`, lint touched folders, duplicate-block check; editor smoke deferred unless asked.

## Verification checklist

- [ ] Editor: first image no longer fills canvas; 2nd/3rd items addable via +
- [ ] Front end: same aspect constraint
- [ ] Layout switch: trio / grid / stacked / slider / slideshow
- [ ] Slideshow respects reduced motion + autoplay toggle
- [ ] GIF selectable as image
- [ ] No video UI
- [ ] Existing trio posts still valid

## Open decisions

None — video deferred explicitly.
