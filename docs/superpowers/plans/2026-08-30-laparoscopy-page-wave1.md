# Laparoscopy Page Wave 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **This repo also gates work:** Scout → Architect → Builder → QA → DevOps, **one step per user `y`**. Prefer Inline Execution mapped to those waves. Do not run Builder+QA in the same turn.
>
> **Commits:** Only when the user explicitly asks — skip “Commit” steps otherwise (user rule).

**Goal:** Ship Wave 1 `twork/laparo-*` blocks (hero · stats · procedures · technology · CTA) as an endo-parity fork with teal tokens and light hero/CTA visual diffs.

**Architecture:** Scripted copy of matching `src/endo-*` folders → `src/laparo-*` with mechanical `endo`→`laparo` renames; new `_laparo-tokens.scss` / `_laparo-atoms.scss`; clone front-end init scripts; wire `twork-builder.php` enqueue; protect slugs via `SKIP_BLOCKS`. No shared specialty core; do not modify `src/endo-*`.

**Tech Stack:** Gutenberg block.json + edit/save JS, SCSS via `wp-scripts`, vanilla `assets/js/*-init.js`, PHP register/enqueue in `twork-builder.php`.

**Spec SoT:** `docs/superpowers/specs/2026-08-30-laparoscopy-page-design.md`

## Global Constraints

- Text domain: `twork-builder`
- Wave 1 slugs **must** be in `SKIP_BLOCKS` before relying on edits across builds
- Do **not** edit `src/endo-*` or endo shared files (except read-only clone source)
- Do **not** touch `split-section` / GS surgical blocks
- CSS vars: `--laparo-*` only; no leftover `--endo-*` under laparo roots
- After fork: `rg -n 'endo' src/laparo-* assets/js/laparo-* assets/css/laparo-*` → ideally empty (icon-picker import path `endo-icon-picker` is the only allowed leftover if present)
- Teal primary: `#0d9488` series; hero frame radius `~22px`; CTA heavier weight
- No `placehold.co` / hotlink placeholders in defaults
- No version bump / zip / `build/` commit
- Verify: `npm run build` + targeted `lint-js` + inserter/front smoke — no Jest suite for these blocks

---

## File Structure

| Path | Responsibility |
|------|----------------|
| `scripts/clone-endo-to-laparo-wave1.py` | One-shot clone + rename (may delete after success or keep) |
| `src/shared/_laparo-tokens.scss` | `--laparo-*` tokens for Wave 1 section roots |
| `src/shared/_laparo-atoms.scss` | Shared atoms scoped to Wave 1 laparo roots |
| `src/laparo-{hero,stats,procedures,technology,cta}-*` | Forked blocks (10 folders) |
| `assets/js/laparo-{stats,procedures,technology}-init.js` | Front-end init clones |
| `assets/css/laparo-stats-critical.css` | Critical CSS clone |
| `scripts/sync-src-from-mk.py` | `SKIP_BLOCKS` entries |
| `twork-builder.php` | Script register + block map + stats style enqueue |

**Wave 1 slug list (exact):**

```
laparo-hero-section
laparo-hero-float-card
laparo-stats-section
laparo-stat-item
laparo-procedures-section
laparo-procedure-item
laparo-technology-section
laparo-tech-item
laparo-cta-section
laparo-cta-row
```

---

### Task 1: SKIP_BLOCKS + clone script

**Files:**
- Modify: `scripts/sync-src-from-mk.py` (append after endo CTA entries ~lines 128–129)
- Create: `scripts/clone-endo-to-laparo-wave1.py`

**Interfaces:**
- Produces: runnable clone that creates `src/laparo-*` from `src/endo-*` with renames below
- Consumes: existing `src/endo-*` Wave 1 counterparts

- [ ] **Step 1: Add SKIP_BLOCKS entries**

In `scripts/sync-src-from-mk.py`, after `"endo-cta-row",`, insert:

```python
        # Laparoscopy page blocks Wave 1 (endo-parity fork)
        "laparo-hero-section",
        "laparo-hero-float-card",
        "laparo-stats-section",
        "laparo-stat-item",
        "laparo-procedures-section",
        "laparo-procedure-item",
        "laparo-technology-section",
        "laparo-tech-item",
        "laparo-cta-section",
        "laparo-cta-row",
```

- [ ] **Step 2: Write clone script**

Create `scripts/clone-endo-to-laparo-wave1.py`:

```python
#!/usr/bin/env python3
"""One-shot: copy Wave 1 endo blocks → laparo with mechanical renames."""
from __future__ import annotations

import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
ASSETS_JS = ROOT / "assets" / "js"
ASSETS_CSS = ROOT / "assets" / "css"

PAIRS = [
    ("endo-hero-section", "laparo-hero-section"),
    ("endo-hero-float-card", "laparo-hero-float-card"),
    ("endo-stats-section", "laparo-stats-section"),
    ("endo-stat-item", "laparo-stat-item"),
    ("endo-procedures-section", "laparo-procedures-section"),
    ("endo-procedure-item", "laparo-procedure-item"),
    ("endo-technology-section", "laparo-technology-section"),
    ("endo-tech-item", "laparo-tech-item"),
    ("endo-cta-section", "laparo-cta-section"),
    ("endo-cta-row", "laparo-cta-row"),
]

JS_PAIRS = [
    ("endo-stats-init.js", "laparo-stats-init.js"),
    ("endo-procedures-init.js", "laparo-procedures-init.js"),
    ("endo-technology-init.js", "laparo-technology-init.js"),
]

CSS_PAIRS = [
    ("endo-stats-critical.css", "laparo-stats-critical.css"),
]

# Order matters: longer / more specific first
REPLACEMENTS: list[tuple[str, str]] = [
    ("twork/endo-", "twork/laparo-"),
    ("twork-endo-", "twork-laparo-"),
    (".twork-endo-", ".twork-laparo-"),
    ("wp-block-twork-endo-", "wp-block-twork-laparo-"),
    ("Endoscopy Centre", "Laparoscopy Centre"),
    ("Endoscopy Hero", "Laparoscopy Hero"),
    ("Endoscopy ", "Laparoscopy "),
    ("endoscopy", "laparoscopy"),
    ("Endoscopy", "Laparoscopy"),
    ("endo-tokens", "laparo-tokens"),
    ("endo-atoms", "laparo-atoms"),
    ("endo-editor", "laparo-editor"),  # only if file exists later
    ("--endo-", "--laparo-"),
    ("endoCountDone", "laparoCountDone"),
    ("endoStatsBound", "laparoStatsBound"),
    ("endoSpotlightBound", "laparoSpotlightBound"),
    ("endoProceduresBound", "laparoProceduresBound"),
    ("endoTechBound", "laparoTechBound"),  # if present
    ("data-endo-", "data-laparo-"),
    ("endo-", "laparo-"),
    ("Endo", "Laparo"),
    ("ENDO", "LAPARO"),
]


def transform(text: str) -> str:
    out = text
    for old, new in REPLACEMENTS:
        out = out.replace(old, new)
    return out


def copy_tree(src: Path, dest: Path) -> int:
    if not src.is_dir():
        raise SystemExit(f"missing source: {src}")
    if dest.exists():
        shutil.rmtree(dest)
    dest.mkdir(parents=True)
    n = 0
    for path in sorted(src.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(src)
        out = dest / rel
        out.parent.mkdir(parents=True, exist_ok=True)
        if path.suffix.lower() in {".js", ".json", ".scss", ".css", ".php", ".md"}:
            out.write_text(transform(path.read_text(encoding="utf-8")), encoding="utf-8")
        else:
            shutil.copy2(path, out)
        n += 1
    return n


def copy_file(src: Path, dest: Path) -> None:
    if not src.is_file():
        raise SystemExit(f"missing source: {src}")
    dest.write_text(transform(src.read_text(encoding="utf-8")), encoding="utf-8")


def main() -> int:
    total = 0
    for old, new in PAIRS:
        total += copy_tree(SRC / old, SRC / new)
        print(f"block {old} → {new}")
    for old, new in JS_PAIRS:
        copy_file(ASSETS_JS / old, ASSETS_JS / new)
        print(f"js {new}")
    for old, new in CSS_PAIRS:
        copy_file(ASSETS_CSS / old, ASSETS_CSS / new)
        print(f"css {new}")
    print(f"done, files written in blocks: {total}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

- [ ] **Step 3: Run clone**

```bash
python3 scripts/clone-endo-to-laparo-wave1.py
```

Expected: prints 10 block lines + 3 js + 1 css · `ls src/laparo-*` shows 10 dirs

- [ ] **Step 4: Rename gate**

```bash
rg -n 'endo' src/laparo-* assets/js/laparo-* assets/css/laparo-* || true
```

Expected: empty, **or** only `../shared/endo-icon-picker` import paths (allowed). Fix any class/handle leftovers before continuing.

- [ ] **Step 5: Commit (only if user asked)**

```bash
git add scripts/sync-src-from-mk.py scripts/clone-endo-to-laparo-wave1.py src/laparo-* assets/js/laparo-* assets/css/laparo-stats-critical.css
git commit -m "$(cat <<'EOF'
feat(laparo): scaffold Wave 1 blocks from endo fork

EOF
)"
```

---

### Task 2: Laparo tokens + atoms

**Files:**
- Create: `src/shared/_laparo-tokens.scss`
- Create: `src/shared/_laparo-atoms.scss` (clone of `_endo-atoms.scss` with Wave 1 roots + rename — script may have created broken imports; rewrite deliberately)

**Interfaces:**
- Produces: `@import "../shared/laparo-tokens"` / `laparo-atoms` resolving for all Wave 1 section `style.scss`
- Consumes: Wave 1 section class roots from Task 1

- [ ] **Step 1: Write `_laparo-tokens.scss`**

```scss
// Laparoscopy page design tokens (endo layout parity · teal palette)
.twork-laparo-hero-section,
.twork-laparo-stats-section,
.twork-laparo-procedures-section,
.twork-laparo-technology-section,
.twork-laparo-cta-section {
	--laparo-primary-teal: #0d9488;
	--laparo-brand-teal-hover: #0f766e;
	--laparo-teal-soft: #ccfbf1;
	--laparo-teal-tint: #f0fdfa;
	--laparo-dark-grey: #212121;
	--laparo-medium-grey: #666;
	--laparo-light-grey-bg: #f8f9fa;
	--laparo-white: #fff;
	--laparo-border: #e0e0e0;
	--laparo-donts-red: #c0392b;

	--laparo-primary: var(--laparo-primary-teal);
	--laparo-primary-600: var(--laparo-brand-teal-hover);
	--laparo-primary-100: var(--laparo-teal-soft);

	--laparo-ink: var(--laparo-dark-grey);
	--laparo-ink-700: #333;
	--laparo-ink-500: #555;
	--laparo-muted: var(--laparo-medium-grey);
	--laparo-section-bg: #f9f9f9;

	--laparo-accent: var(--laparo-brand-teal-hover);
	--laparo-accent-100: var(--laparo-teal-tint);
	--laparo-alt: var(--laparo-dark-grey);
	--laparo-alt-100: var(--laparo-light-grey-bg);

	--laparo-bg: var(--laparo-light-grey-bg);
	--laparo-line: var(--laparo-border);
	--laparo-line-strong: #cfcfcf;

	--laparo-r-sm: 14px;
	--laparo-r-md: 20px;
	--laparo-r-lg: 22px; /* tighter than endo 28px — subtle diff */
	--laparo-r-xl: 36px;

	--laparo-sh-sm: 0 5px 15px rgba(0, 0, 0, 0.05);
	--laparo-sh-md: 0 18px 40px -18px rgba(0, 0, 0, 0.18);
	--laparo-sh-lg: 0 20px 50px rgba(0, 0, 0, 0.1);

	--laparo-ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
	--laparo-ease-out: cubic-bezier(0.16, 1, 0.3, 1);

	--laparo-container: 1200px;
}
```

- [ ] **Step 2: Write `_laparo-atoms.scss`**

Copy `src/shared/_endo-atoms.scss` → rewrite:

1. Root selector list = same five Wave 1 `.twork-laparo-*-section` roots as tokens (not Wave 2 sections yet).
2. Replace every `endo` class fragment the clone would have used: `.laparo-container` etc. (mechanical `endo`→`laparo` on the file contents).
3. Ensure no `--endo-*` remains.

```bash
cp src/shared/_endo-atoms.scss src/shared/_laparo-atoms.scss
# then edit: root selectors + sed-equivalent renames
python3 - <<'PY'
from pathlib import Path
p = Path("src/shared/_laparo-atoms.scss")
t = Path("src/shared/_endo-atoms.scss").read_text()
# Drop Wave-2-only roots from the opening selector list by rewriting header — keep structure,
# replace endo→laparo globally, then set Wave-1-only roots.
for a,b in [
 ("endo","laparo"),("Endo","Laparo"),
]:
    t = t.replace(a,b)
# Restrict root list to Wave 1 only
import re
roots = """.twork-laparo-hero-section,
.twork-laparo-stats-section,
.twork-laparo-procedures-section,
.twork-laparo-technology-section,
.twork-laparo-cta-section"""
t2 = re.sub(
    r"\.twork-laparo-hero-section,[\s\S]*?\.twork-laparo-cta-section \{",
    roots + " {",
    t,
    count=1,
)
# If original had more sections between hero and cta, the regex above may fail —
# fallback: replace the whole first selector block manually in editor.
p.write_text(t2 if t2 != t else t)
print("wrote", p, "len", len(p.read_text()))
PY
```

If the regex fails (selector order differs), **manually** set the opening multi-selector to the five Wave 1 roots only.

- [ ] **Step 3: Verify section imports**

```bash
rg -n "laparo-tokens|laparo-atoms|endo-tokens|endo-atoms" src/laparo-*/style.scss src/laparo-*/editor.scss
```

Expected: every `style.scss` imports `laparo-tokens` + `laparo-atoms`; **zero** `endo-tokens` / `endo-atoms`.

- [ ] **Step 4: Commit (only if user asked)**

---

### Task 3: Hero + CTA subtle diffs + content defaults

**Files:**
- Modify: `src/laparo-hero-section/block.json` (defaults)
- Modify: `src/laparo-hero-section/style.scss` (aurora uses teal soft/tint; frame radius)
- Modify: `src/laparo-cta-section/style.scss` (button weight / shadow)
- Modify: `src/laparo-cta-section/block.json` (defaults if any)
- Modify: procedure / tech / stat item `block.json` defaults (laparo copy)
- Modify: float-card defaults if endoscopy-specific

**Interfaces:**
- Consumes: `--laparo-*` tokens from Task 2
- Produces: editor defaults that read as keyhole surgery, not screening

- [ ] **Step 1: Patch hero `block.json` defaults**

Set (keep other attrs):

```json
"eyebrowIcon": { "default": "fas fa-user-md" },
"eyebrowText": { "default": "Laparoscopy Centre of Excellence" },
"titleLine1": { "default": "Smaller cuts." },
"titleLine2": { "default": "Faster recovery." },
"titleLine3": { "default": "Precision care." },
"leadText": { "default": "Consultant-led keyhole surgery with 4K laparoscopy towers, modern modular theatres, and day-case pathways where clinically appropriate." },
"primaryCtaText": { "default": "Book a Consultation" },
"primaryCtaUrl": { "default": "#book" },
"secondaryCtaText": { "default": "Explore Procedures" },
"secondaryCtaUrl": { "default": "#procedures" },
"keywords": [ "laparoscopy", "hero", "keyhole", "surgery", "mk" ]
```

Update `title` / `description` if still saying Endoscopy after clone.

- [ ] **Step 2: Hero visual tweaks in `style.scss`**

Ensure aurora / background gradients use `var(--laparo-teal-soft)` / `var(--laparo-teal-tint)` (clone may have renamed orange token names incorrectly — fix to teal token names from Task 2).

On `.hero-frame` (or equivalent), set:

```scss
border-radius: var(--laparo-r-lg); // 22px
```

If float badge exists, keep structure; optional `box-shadow: var(--laparo-sh-sm)`.

- [ ] **Step 3: CTA visual tweaks**

In `src/laparo-cta-section/style.scss`, for primary button (match actual selector from clone, e.g. `.btn-primary` / `.cta-btn`):

```scss
font-weight: 700;
letter-spacing: 0.01em;
box-shadow: var(--laparo-sh-sm);
```

Keep endo layout; do not change column structure.

- [ ] **Step 4: Procedure / tech / stats defaults**

Update `block.json` (and parent template defaults if hardcoded in `edit.js`) to examples:

| Area | Defaults |
|------|----------|
| Procedures | Cholecystectomy · Hernia repair · Appendectomy · Diagnostic laparoscopy |
| Tech | 4K Laparoscopy Tower · Energy Devices · Insufflation / OR Suite · Monitored Recovery |
| Stats | e.g. procedures / consultants / years — not “screensings” |
| CTA | Book a Consultation / Call the centre |

Exact attribute keys: read each forked `block.json` and change only `default` string values that still say gastroscopy/colonoscopy/screening/polyp.

- [ ] **Step 5: Spot-check**

```bash
rg -ni 'gastroscop|colonoscop|screening|polyp|endoscop' src/laparo-*/block.json || true
```

Expected: empty (or only historical comments — prefer empty).

- [ ] **Step 6: Commit (only if user asked)**

---

### Task 4: Wire `twork-builder.php`

**Files:**
- Modify: `twork-builder.php` (script register ~136–142, block map ~242–249, duplicate stats enqueue helpers for laparo)

**Interfaces:**
- Consumes: `assets/js/laparo-*-init.js`, `assets/css/laparo-stats-critical.css`, `build/laparo-stats-section/style-index.css` (after build)
- Produces: conditional enqueue when page contains laparo parent blocks

- [ ] **Step 1: Register scripts**

After endo faq init entry, add:

```php
        'twork-laparo-stats-init'           => 'laparo-stats-init.js',
        'twork-laparo-procedures-init'      => 'laparo-procedures-init.js',
        'twork-laparo-technology-init'      => 'laparo-technology-init.js',
```

- [ ] **Step 2: Block → script map**

After endo faq map entry, add:

```php
        // Laparoscopy Wave 1
        'twork/laparo-stats-section'            => array('twork-laparo-stats-init'),
        'twork/laparo-procedures-section'       => array('twork-laparo-procedures-init'),
        'twork/laparo-technology-section'       => array('twork-laparo-technology-init'),
```

- [ ] **Step 3: Stats critical / style enqueue (mirror endo)**

1. Find `has_block('twork/endo-stats-section'` early-enqueue branch (~280) and add parallel:

```php
    if (has_block('twork/laparo-stats-section', $post) || has_block('twork/laparo-stat-item', $post)) {
        twork_builder_enqueue_laparo_stats_styles();
    }
```

2. Copy functions `twork_builder_enqueue_endo_stats_styles` + `twork_builder_render_block_enqueue_endo_stats_styles` to laparo variants:
   - Paths: `build/laparo-stats-section/style-index.css`
   - Handles: `twork-laparo-stats-section-style`, `wp-block-twork-laparo-stats-section`
   - Critical: `assets/css/laparo-stats-critical.css`, handle `twork-laparo-stats-critical`
   - Filter checks: `twork/laparo-stats-section` || `twork/laparo-stat-item`
   - `add_filter('render_block', 'twork_builder_render_block_enqueue_laparo_stats_styles', 5, 2);`

Do **not** remove endo helpers.

- [ ] **Step 4: PHP lint**

```bash
php -l twork-builder.php
```

Expected: `No syntax errors detected`

- [ ] **Step 5: Commit (only if user asked)**

---

### Task 5: Build + verify Wave 1

**Files:**
- Verify only (build outputs under `build/laparo-*` — do not commit)

- [ ] **Step 1: Build**

```bash
npm run build
```

Expected: exit 0 · `build/laparo-hero-section/` … `build/laparo-cta-row/` exist

Note: sync runs first; `SKIP_BLOCKS` must already include laparo slugs or local `src/laparo-*` could be wiped if upstream ever gains same names — Wave 1 protection is mandatory.

- [ ] **Step 2: Lint touched JS**

```bash
npx wp-scripts lint-js src/laparo-hero-section src/laparo-stats-section src/laparo-procedures-section src/laparo-technology-section src/laparo-cta-section assets/js/laparo-stats-init.js assets/js/laparo-procedures-init.js assets/js/laparo-technology-init.js
```

Expected: no new errors (fix prettier locally if needed)

- [ ] **Step 3: Bundle smoke**

```bash
rg -n 'twork/laparo-hero-section|Book a Consultation|0d9488' build/laparo-hero-section/ build/laparo-hero-section/style-index.css 2>/dev/null | head
rg -n 'laparoStatsBound|twork-laparo-stats-section' build/laparo-stats-section/ assets/js/laparo-stats-init.js | head
```

Expected: block name + consultation CTA in hero bundle; stats selector/bound flag present

- [ ] **Step 4: Editor / front checklist (manual)**

- [ ] Inserter shows Laparoscopy Hero / Stats / Procedures / Technology / CTA (+ children)
- [ ] Insert hero+float, stats+items, procedures+items, tech+items, cta+row → save → no validation error
- [ ] Front: teal accents · hero radius tighter · CTA weight · stats count-up · procedures spotlight · tech stage
- [ ] `prefers-reduced-motion`: stats show final value without animation
- [ ] `src/endo-*` git diff empty for this work

- [ ] **Step 5: Update handoff files**

Set `active_context.md` / `progress.md` Next = Wave 1 QA evidence + Wave 2 later.

- [ ] **Step 6: Commit (only if user asked)**

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Full fork Wave 1 10 blocks | 1 |
| SKIP_BLOCKS | 1 |
| `_laparo-tokens` teal + r-lg 22px | 2 |
| `_laparo-atoms` Wave 1 roots | 2 |
| Hero/CTA subtle diffs | 3 |
| Laparo content defaults | 3 |
| Init JS clone | 1 |
| Critical CSS | 1 + 4 |
| `twork-builder.php` register/map/enqueue | 4 |
| Rename gate / no endo edit | 1 + 5 |
| Build + smoke QA | 5 |
| Wave 2 excluded | — (out of plan) |

**Placeholder scan:** none intentional.  
**Type consistency:** handles `twork-laparo-*-init` match PHP map and asset filenames.

---

## Execution handoff

Plan saved to `docs/superpowers/plans/2026-08-30-laparoscopy-page-wave1.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — this session, Scout→Architect→Builder→QA one `y` each (repo gate)

Which approach?
