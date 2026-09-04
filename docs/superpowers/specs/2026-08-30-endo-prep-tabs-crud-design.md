# Endoscopy Prep Tabs CRUD — Design Spec

**Date:** 2026-08-30  
**Status:** Approved (user)  

**Plugin:** twork-builder (WordPress block plugin)  
**Scope:** Section Inspector Tab list for `twork/endo-prep-section` children

## Goal

Editors can **Create / Read / Update / Delete / Reorder** Before·During·After-style tabs from the **section Inspector**, without relying on List View or selecting hidden inactive tab blocks on the canvas.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| UX | **A** — Section Inspector `Tabs` panel only (no canvas `+` this wave) |
| Approach | **①** Inspector → `core/block-editor` ops on existing InnerBlocks |
| Data model | Keep `twork/endo-prep-tab` InnerBlocks — **no** section-level tabs attribute array |
| Create | `insertBlock( 'twork/endo-prep-tab', … )` with unique `panelKey` |
| Update | `updateBlockAttributes` for `tabLabel` / `panelKey` / `isDefaultActive` |
| Reorder | `moveBlocks` (▲▼ buttons) |
| Delete | `removeBlock` · **forbid** deleting the last remaining tab |
| Default | Exactly one `isDefaultActive: true` after any CRUD that breaks the invariant |
| Activate | Row focus / “Open” → `selectBlock` + `setEndoPrepActivePanel` so canvas shows that panel |
| Validation | `panelKey` = slug `[a-z0-9-]+` · unique among siblings |
| Deprecation | None expected (attributes/markup unchanged) |
| Sync | `endo-prep-section` / `endo-prep-tab` / `endo-prep-group` already in `SKIP_BLOCKS` |

## Out of scope

- Canvas tab-button inline rename / `+` add (option B/C — later wave)
- Checklist group item CRUD redesign (already in `endo-prep-group` Inspector)
- FE `endo-prep-init.js` rewrite (already reads `data-tab-key` / `data-tab-label` from saved markup)
- Moving tabs into a serialized attribute array on the section
- Version bump / release zip

## Current baseline (why Inspector CRUD)

- `templateLock: false` already allows List View add/remove/reorder.
- Inactive tabs use `display: none !important` in editor CSS → canvas select is painful.
- Section already builds the visible tablist from `getBlocks( clientId )` — Inspector can drive the same children.

## Inspector UX

**Panel:** `Tabs` (under section Inspector, `initialOpen: true` or just below Section/Header).

Per row:

| Control | Behavior |
|---------|----------|
| Label | `TextControl` → `tabLabel` |
| Panel key | `TextControl` (advanced / secondary) → `panelKey`; on blur sanitize + uniquify |
| Default | `ToggleControl` or radio — setting true clears siblings’ `isDefaultActive` |
| ▲ / ▼ | Reorder among prep-tab siblings only |
| Open | `selectBlock( tabClientId )` + activate panel |
| Delete | Confirm optional (Button destructive) · disabled if only one tab left |

Footer:

| Control | Behavior |
|---------|----------|
| Add Tab | Insert after last tab · label `Tab N` · `panelKey` `tab-n` (unique) · `isDefaultActive: false` · activate new tab · seed **one** default `endo-prep-group` |

## Create defaults

```text
tabLabel: "Tab {n}"          // n = existing count + 1
panelKey: uniqueSlug("tab-{n}")
isDefaultActive: false
showTab: true
inner: [ twork/endo-prep-group with defaults from block.json ]
```

## Invariants (must hold after every op)

1. At least **one** `twork/endo-prep-tab` with `showTab !== false` when section is shown (delete last → no-op + notice).
2. Exactly **one** `isDefaultActive === true` among visible tabs (if none → first visible; if many → keep the one matching current active or first).
3. All visible `panelKey` values unique; collision → append `-2`, `-3`, …
4. Editor `resolvedActive` / Map always points at an existing `panelKey` after delete/reorder/rename key.

## Edge cases

| Case | Handling |
|------|----------|
| Rename label only | Do **not** auto-change `panelKey` (avoids breaking FE `#panel-*` / saved anchors mid-edit) |
| Change `panelKey` while active | Update Map + local `activePanelKey` to new key |
| Duplicate keys pasted/legacy | On Inspector mount / before activate, uniquify colliding keys via `updateBlockAttributes` |
| `showTab: false` | Hidden from tablist (existing) · still listed in Inspector with “Show Tab” toggle |
| Empty checklist groups | Allowed — editor appender on tab remains |

## Failure + fallback

- If `insertBlock` fails / wrong parent → no-op; surface `createNotice` error.
- If CRUD leaves panels blank again → re-check `data-editor-active` hide CSS (prior fix) before touching Map sync.

## Files (expected)

| File | Change |
|------|--------|
| `src/endo-prep-section/edit.js` | `Tabs` Inspector panel + block-editor dispatch helpers |
| (optional extract) `src/shared/endo-prep-tabs-inspector.js` | Keep `edit.js` thin if panel > ~80 lines |
| `src/endo-prep-tab/edit.js` | Unchanged unless Open/select needs a small hook |
| `src/shared/endo-prep-ui.js` | Unchanged (reuse `setEndoPrepActivePanel`) |
| `assets/js/endo-prep-init.js` | Unchanged |
| `block.json` | No attribute schema change |

## Success criteria

1. Section selected → Inspector can add a 4th tab; canvas tablist + FE save show it.
2. Rename label updates tab pill text without List View.
3. Reorder ▲▼ changes pill order and saved InnerBlocks order.
4. Delete non-last tab removes pill + panel; active falls back safely.
5. Set default persists `isDefaultActive` so front-end first paint matches.
6. `npm run build` exit 0; no new block validation (no save markup change).

## Open decisions (none blocking)

- Soft confirm on delete: **yes** (simple `window.confirm` or WP `Modal` — prefer confirm dialog for destructive).
- New tab seed: **one** default `endo-prep-group` (not zero).

## Context handoff paste

```
Continue twork-builder from active_context.md + progress.md.
DONE: Prep tab CRUD design approved (A) — spec written
NEXT: user review docs/superpowers/specs/2026-08-30-endo-prep-tabs-crud-design.md → then writing-plans / Scout→Architect
SoT: Inspector→InnerBlocks ops; no tabs attribute array; no last-tab delete
If context thin: handoff only — no code.
```
