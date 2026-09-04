# Endoscopy Icon Picker — Design Spec

**Date:** 2026-08-29  
**Status:** Approved (conversation) — pending user review of this file  
**Plugin:** twork-builder (WordPress block plugin)  
**Scope:** All Endoscopy icon class text fields (scope **C**)

## Goal

Replace Endoscopy “type Font Awesome class by hand” Inspector fields with a shared picker so editors can:

1. Pick **WordPress Dashicons** from a **searchable visual grid** (no class typing required)
2. Pick **image / GIF** or **video** from the Media Library
3. Keep **Font Awesome class** as an optional legacy type (existing content + power users)

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Scope | **C** — every endo surface that currently stores an icon class string |
| Approach | **①** Shared `EndoIconPicker` + existing `FlexibleIcon` render |
| Dashicon UX | Visual searchable grid (curated medical/UI + common WP set — not a 200+ dump) |
| Media | Image + video via Media Library (`MediaUpload` / `MediaPlaceholder`) |
| FA typing | Remains only when `iconType === 'fontawesome'` |
| Defaults | `iconType` default `fontawesome` so existing posts keep working |
| Validation | Additive attributes only — no `deprecated` required if FA `<i>` path markup stays equivalent |
| Sync | Endo blocks already in `SKIP_BLOCKS` — safe to edit in this repo |

## Out of scope

- Rewriting `centre-*` / non-endo icon UIs (they already have a similar pattern)
- Full Dashicons catalog dump / custom SVG-as-icon upload type
- Font Awesome visual catalog picker
- Version bump / release zip (DevOps separate)
- Changing FE animation init scripts unless render wrappers require CSS hooks

## Attribute shape

### Per icon slot (item / row)

| Attribute | Type | Default / note |
|-----------|------|----------------|
| `iconType` | string | `fontawesome` \| `dashicon` \| `image` \| `video` · default `fontawesome` |
| `iconClass` | string | Existing FA class (unchanged key) |
| `iconDashicon` | string | e.g. `dashicons-heart` |
| `iconImageUrl` | string | |
| `iconImageId` | number | optional, for Media Library re-open |
| `iconVideoUrl` | string | |
| `iconVideoId` | number | optional |

### Eyebrow slots (section-level)

Prefix the same shape: `eyebrowIcon` stays as FA class; add `eyebrowIconType`, `eyebrowIconDashicon`, `eyebrowIconImageUrl`, `eyebrowIconImageId`, `eyebrowIconVideoUrl`, `eyebrowIconVideoId`.

### FAQ aside button

Same pattern on `asideButtonIcon` → `asideButtonIconType`, `asideButtonIconDashicon`, media fields.

### Procedure chips

Each chip object gains the same keys (`iconType`, `iconDashicon`, media fields) alongside existing `iconClass`. Missing keys ⇒ treat as FA.

## Shared modules

| Module | Role |
|--------|------|
| `src/shared/endo-icon-picker.js` | Inspector control: type select + Dashicon grid + media pickers + optional FA text |
| `src/shared/block-helpers.js` → `FlexibleIcon` | Canvas + save render (already supports image / video / dashicon / FA) |
| `src/shared/select-options.js` | Extend / share `ICON_TYPE_OPTIONS`; add curated `ENDO_DASHICON_OPTIONS` (value + label; grid uses same list) |

### `EndoIconPicker` API (sketch)

```js
<EndoIconPicker
  label={ __( 'Icon', 'twork-builder' ) }
  value={ {
    iconType, iconClass, iconDashicon,
    iconImageUrl, iconImageId, iconVideoUrl, iconVideoId,
  } }
  onChange={ ( patch ) => setAttributes( patch ) }
  // optional key remapping for eyebrow / aside prefixes
  keys={ { type: 'eyebrowIconType', fa: 'eyebrowIcon', ... } }
/>
```

Helpers: `mapIconAttrs( attributes, prefix )`, `iconPatch( prefix, patch )` to avoid eyebrow naming drift.

### Dashicon grid

- Curated list (~40–80 icons): medical-ish + common UI (heart, yes, plus, calendar, admin-users, location, phone, star, warning, etc.)
- Search filters by label / slug
- Selected state highlighted; click sets `iconDashicon` + forces `iconType: 'dashicon'`
- Renders preview with `dashicons dashicons-*` classes (editor already loads dashicons)

### Media

- Image: `allowedTypes: ['image']` (GIF included)
- Video: `allowedTypes: ['video']`
- Preview + Remove clears URL + ID
- Empty media → render nothing (no broken `<img>`)

### Render rules

Use `FlexibleIcon` in `edit.js` and `save.js`:

1. `image` + URL → `<img alt="">`
2. `video` + URL → `<video muted loop playsInline autoPlay aria-hidden>`
3. `dashicon` + name → `<span class="dashicons {name}" aria-hidden>`
4. else FA `iconClass` → `<i className={iconClass} aria-hidden>`
5. unknown type → FA fallback

Video autoplay requires muted + playsInline.

## Target blocks

### Item / row icons

| Block | Slots |
|-------|--------|
| `endo-hero-float-card` | card icon |
| `endo-journey-step` | step icon |
| `endo-condition-item` | condition icon |
| `endo-procedure-item` | card icon + **chips[]** |
| `endo-prep-group` | group icon |
| `endo-cta-row` | row icon |

### Section eyebrow (+ FAQ aside)

| Block | Slots |
|-------|--------|
| `endo-hero-section` | `eyebrowIcon*` |
| `endo-procedures-section` | `eyebrowIcon*` |
| `endo-technology-section` | `eyebrowIcon*` |
| `endo-journey-section` | `eyebrowIcon*` |
| `endo-conditions-section` | `eyebrowIcon*` |
| `endo-prep-section` | `eyebrowIcon*` |
| `endo-team-section` | `eyebrowIcon*` |
| `endo-testimonials-section` | `eyebrowIcon*` |
| `endo-faq-section` | `eyebrowIcon*` + `asideButtonIcon*` |
| `endo-cta-section` | `eyebrowIcon*` |

Per touched block: `block.json` attributes · `edit.js` Inspector + canvas · `save.js` output.

Hardcoded decorative icons (e.g. testimonial stars, doctor calendar chrome that are not editor fields) stay hardcoded unless they already expose an Inspector class field.

## Migration / validation

- Existing saved content: only `iconClass` / `eyebrowIcon` present → `iconType` defaults to `fontawesome` → identical FA markup path
- New attributes are additive → **no `deprecated` array required** as long as FA branch markup matches prior `<i className=…>`
- If a future change wraps icons in a new element that alters save HTML for the FA path, ship `deprecated` then — not in this wave

## Risks & fallbacks

| Risk | Fallback |
|------|----------|
| save markup drift on FA path | Keep FA branch byte-equivalent to current `<i>` |
| Eyebrow prefix typos across 10 sections | Shared `mapIconAttrs` / `iconPatch` only |
| Mobile video autoplay blocked | muted + playsInline + loop; still show poster frame if browser blocks |
| Grid list feels “not enough icons” | Search + keep FA type; expand curated list later without schema change |
| Chip objects missing new keys | Treat as FA via `iconClass` |

## QA checklist

- [ ] `npm run build` OK for touched endo blocks
- [ ] lint-js on `src/shared/endo-icon-picker.js` + touched `edit.js`
- [ ] Editor: switch all 4 types; Dashicon grid search + select; image/video pick + remove
- [ ] FE: legacy FA endoscopy page unchanged
- [ ] FE: dashicon / image / video render on one item + one eyebrow
- [ ] Re-open existing endoscopy post — no block validation errors
- [ ] Chips: change one chip icon type without wiping sibling chips

## Implementation order (for plan)

1. Shared: `ENDO_DASHICON_OPTIONS` + `endo-icon-picker.js` + confirm `FlexibleIcon` covers all cases
2. Item blocks (6) — float-card, journey-step, condition-item, procedure-item+chips, prep-group, cta-row
3. Section eyebrows (10) + FAQ aside
4. Build + lint + manual validation smoke notes

## Non-goals reminder

Do not bump `TWORK_BUILDER_VERSION` / `package.json` / `readme.txt` in this feature wave. Do not commit `build/`.
