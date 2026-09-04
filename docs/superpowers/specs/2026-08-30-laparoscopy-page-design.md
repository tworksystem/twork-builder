# Laparoscopy Page (endo-parity suite) — Design Spec

**Date:** 2026-08-30  
**Status:** Approved (user) — Wave 1 scoped  

**Plugin:** twork-builder (WordPress block plugin)  
**Reference:** `endoscopy.html` / `src/endo-*` (UI + structure) · `general-surgery.html` (laparo copy defaults)

## Goal

Ship a **Laparoscopy / Keyhole** specialty page as a dedicated `twork/laparo-*` block suite that mirrors the Endoscopy page structure and interactions, with **subtle visual differentiation** (tokens + hero/CTA), so editors can assemble a full clinical landing page without reusing Endoscopy blocks or the thinner General Surgery mock blocks alone.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Scope | **A** — Full endo-parity suite (`laparo-*`), not GS kit-only |
| Visual base | **A** — Clone endoscopy UI / layout / motion |
| Subtle diffs | **B** — Tokens + light hero/CTA tweaks; section structure identical |
| Code strategy | **A** — Full fork `endo-*` → `laparo-*` (no shared specialty core this wave) |
| Shipping | **B** — Phased waves (Wave 1 core sections first) |
| Clone method | **1** — Scripted rename fork + manual token/hero/CTA polish |
| Sync | New `laparo-*` slugs **must** be added to `SKIP_BLOCKS` (user-approved with this spec) |
| Existing GS blocks | Leave `split-section` / `features-section` / `surgical-services-section` untouched |

## Out of scope (Wave 1)

- Wave 2 blocks: journey, conditions, prep (+ tabs/groups), team, testimonials, faq
- Shared specialty core extract (`src/shared/specialty-*`)
- Static `laparoscopy.html` demo / page kit JSON
- Deprecating or replacing General Surgery page blocks
- Version bump / release zip
- Editing any `endo-*` source (except read-only clone)

## Wave 1 — Block inventory

Namespace: `twork/laparo-*` · CSS root: `.twork-laparo-*-section`

| Block | Role |
|-------|------|
| `laparo-hero-section` | Page hero + actions + proof |
| `laparo-hero-float-card` | Inner float card(s) on hero visual |
| `laparo-stats-section` | Stats strip parent |
| `laparo-stat-item` | Stat child (`data-count`) |
| `laparo-procedures-section` | Procedure cards parent |
| `laparo-procedure-item` | Procedure card child |
| `laparo-technology-section` | Tech stage + list parent |
| `laparo-tech-item` | Tech list item child |
| `laparo-cta-section` | Closing CTA parent |
| `laparo-cta-row` | CTA row child |

### Supporting assets (Wave 1)

| Path | Purpose |
|------|---------|
| `src/shared/_laparo-tokens.scss` | `--laparo-*` design tokens |
| `src/shared/_laparo-atoms.scss` | Atom styles adapted from endo (optional if inlined via tokens + section SCSS) |
| `assets/js/laparo-stats-init.js` | Count-up (clone of endo-stats) |
| `assets/js/laparo-procedures-init.js` | Card spotlight |
| `assets/js/laparo-technology-init.js` | Tech stage swap |
| `assets/css/laparo-stats-critical.css` | Optional critical CSS (endo pattern) |
| `twork-builder.php` | Register scripts + conditional enqueue map |
| `scripts/sync-src-from-mk.py` | Add Wave 1 slugs to `SKIP_BLOCKS` |

Icon picker: Wave 1 may **import** existing `src/shared/endo-icon-picker.js` (no rename required). Prep tab shared helpers are Wave 2 only.

## Visual differentiation (subtle — option B)

### Tokens

- Layout, spacing scale, motion easings: match endo.
- Palette: **teal / slate** primary series (e.g. `#0d9488` + hover/soft/tint) — must not collide with endo orange `#f48b2a`.
- CSS custom properties namespaced `--laparo-*` only under `.twork-laparo-*-section` selectors.
- Hero frame radius slightly tighter than endo (`~22px` vs endo `--endo-r-lg: 28px`).
- CTA: heavier button weight + subtler shadow than endo.

### Unchanged vs endo

- Section order and InnerBlocks parent/child model
- Markup hierarchy / class *roles* (renamed `endo` → `laparo`)
- Front-end interaction contracts (stats IntersectionObserver, procedures `--mx/--my`, tech stage activation)
- `prefers-reduced-motion` behavior

## Content defaults

English, laparoscopy-oriented (inspired by `general-surgery.html`, not colonoscopy screening tone):

- **Hero:** Laparoscopic / Keyhole Surgery · consult / book CTA
- **Procedures (examples):** Cholecystectomy · Hernia repair · Appendectomy · Diagnostic laparoscopy
- **Technology (examples):** 4K laparoscopy tower · Energy devices · Insufflation / OR suite · Monitored recovery
- **Stats / CTA:** surgical volume / experience / consult framing — not “Book a Screening”

No `placehold.co` / hotlink placeholders in `block.json` examples; prefer empty media + MediaUpload, or plugin-shipped assets only if zip budget allows.

## Naming & i18n

- Block titles: “Laparo …” / “Laparoscopy …” as appropriate
- Keywords: laparoscopy, keyhole, surgery
- Text domain: `twork-builder`
- User-facing strings: `__()` / `_x()` per existing endo pattern
- Do not leave stray `endo` strings/classes inside `src/laparo-*` after fork

## Registration & enqueue

Mirror endo in `twork-builder.php`:

1. `twork_builder_register_frontend_scripts` — add:
   - `twork-laparo-stats-init` → `laparo-stats-init.js`
   - `twork-laparo-procedures-init` → `laparo-procedures-init.js`
   - `twork-laparo-technology-init` → `laparo-technology-init.js`
2. Block → script map entries for the three parent sections
3. Optional critical CSS / render-time style enqueue for stats (copy endo-stats pattern with laparo handles)

Blocks auto-register via existing `register_block_type` from `build/` metadata (same as endo).

## Clone procedure (recommended)

1. Copy listed Wave 1 `src/endo-*` folders → `src/laparo-*`
2. Mechanical replace within those folders + new init JS:
   - `endo` → `laparo` (slug, classes, data attrs, handles, comments)
   - `Endo` / `Endoscopy` → `Laparo` / `Laparoscopy` in titles/defaults where appropriate
3. Add `_laparo-tokens.scss`; point section SCSS imports at laparo tokens
4. Apply hero + CTA visual diffs only
5. Replace default attribute copy with laparo content
6. Add slugs to `SKIP_BLOCKS`
7. Wire `twork-builder.php`
8. `npm run build` + editor/front smoke

**Verification gate:** `rg 'endo' src/laparo-* assets/js/laparo-*` must return only intentional comments (ideally zero).

## Wave 2 (preview — separate plan later)

- `laparo-journey-*`, `laparo-conditions-*`, `laparo-prep-*` (incl. tab CRUD parity), `laparo-team-*`, `laparo-testimonials-*`, `laparo-faq-*`
- Matching init scripts + tokens selector list expansion
- Optional `laparoscopy.html` static reference and/or kit template
- Revisit shared extract only after both suites are stable

## Edge cases & failure modes

| Risk | Fallback |
|------|----------|
| Rename miss → styles/JS never bind | `rg` gate + build + front smoke per section |
| Sync wipes new blocks | `SKIP_BLOCKS` before any lasting edit; user already approved |
| Zip size from demo images | No new heavy binaries; Media Library IDs |
| Visual too similar / too different | Tokens + hero/CTA only; no section layout forks in Wave 1 |
| Editor validation on new blocks | N/A for first ship; no deprecate needed |

## QA checklist (Wave 1)

- [ ] `npm run build` exit 0
- [ ] All 10 blocks appear in inserter under expected titles
- [ ] Each parent + children: insert, edit, save — no block validation error
- [ ] Front: stats count-up · procedures spotlight · tech stage · CTA
- [ ] Teal tokens + hero/CTA diffs visible; layout matches endo structure
- [ ] `prefers-reduced-motion` respected on stats (and any motion)
- [ ] No accidental edits under `src/endo-*`
- [ ] `SKIP_BLOCKS` contains all Wave 1 `laparo-*` slugs

## Success criteria

Editors can build a Laparoscopy landing page from Wave 1 blocks alone that reads as the same product family as Endoscopy but is visually distinguishable (teal + hero/CTA) and medically themed for keyhole surgery.
