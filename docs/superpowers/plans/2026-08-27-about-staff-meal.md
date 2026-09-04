# About Staff Meal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **This repo also gates work:** Scout → Architect → Builder → QA → DevOps, **one step per user `y`**. Prefer Inline Execution mapped to those waves (Task 1 = Wave 1 Builder, etc.). Do not run Builder+QA in the same turn.

**Goal:** Ship an About Us “MEAL TREAT FOR DUTY TIME” section as hand-written `twork/about-staff-meal-*` blocks with per-element toggles and rich Inspector settings, matching `docs/superpowers/specs/2026-08-27-about-staff-meal-design.md`.

**Architecture:** Static `save.js` parent shell (chrome / header / quote / footer as attributes) plus **two internal region blocks** (each owns one `InnerBlocks`) holding gallery-item and feedback-item children. Optional front-end scroll reveal via `assets/js/about-staff-meal-init.js` enqueued from `twork-builder.php`.

**Tech Stack:** WordPress Gutenberg (`@wordpress/blocks`, `block-editor`, `components`, `i18n`), `wp-scripts` build, SCSS, vanilla IIFE front-end JS. Pattern reference: `src/endo-faq-section/` + `src/csr-moments-gallery-item/`.

## Global Constraints

- Spec SoT: `docs/superpowers/specs/2026-08-27-about-staff-meal-design.md`
- Text domain: `twork-builder`; category: `twork-builder`; BEM root: `.twork-about-staff-meal`
- All new slugs **must** be in `SKIP_BLOCKS` before first `npm run build`
- Static save only — no PHP `render_callback` / `render.php`
- No GSAP; IntersectionObserver only; honor `prefers-reduced-motion` when `respectReducedMotion`
- Default images empty (Media Library); no hotlinked Unsplash / AGM JPG in plugin
- Chrome + footer default **OFF**; gallery layout default `featured-trio`
- No version bump / zip until DevOps
- `useStableBlockProps` from `@twork-builder/editor-utils` in edit.js (endo pattern)
- Gutenberg allows **one** `InnerBlocks` per block → region shells required (see File Structure)

### Gutenberg adaptation (locked for this plan)

Spec asked for “two InnerBlocks regions” on one parent. Core only allows one `InnerBlocks` per block. Implement with **two internal region blocks** (`inserter: false`):

| Block | Inserter | Role |
|-------|----------|------|
| `twork/about-staff-meal-section` | yes | Parent shell |
| `twork/about-staff-meal-gallery` | no | Gallery region (InnerBlocks → gallery-item) |
| `twork/about-staff-meal-feedback` | no | Feedback region (InnerBlocks → feedback-item) |
| `twork/about-staff-meal-gallery-item` | via parent | Image child |
| `twork/about-staff-meal-feedback-item` | via parent | Feedback child |

Parent template locks both regions (move/remove locked). Site editors still only insert the section from the inserter.

---

## File Structure

| Path | Responsibility |
|------|----------------|
| `scripts/sync-src-from-mk.py` | Add 5 slugs to `SKIP_BLOCKS` |
| `src/shared/_about-staff-meal-tokens.scss` | Accent, gaps, quote marks, breakpoints |
| `src/about-staff-meal-section/` | Parent: attrs, Inspector, chrome/header/quote/footer, region template |
| `src/about-staff-meal-gallery/` | Region shell + layout attrs passthrough via parent CSS vars / data attrs on parent |
| `src/about-staff-meal-feedback/` | Region shell |
| `src/about-staff-meal-gallery-item/` | Image + badge + caption toggles |
| `src/about-staff-meal-feedback-item/` | Name + heart + RichText body |
| `assets/js/about-staff-meal-init.js` | Scroll reveal IIFE |
| `twork-builder.php` | Register + map `twork/about-staff-meal-section` → init handle |

Gallery layout (`featured-trio` \| `equal-grid` \| `stacked`), columns, gaps live on **parent** attributes and are applied as `data-*` / CSS variables on the section; gallery region reads them via ancestor CSS (no prop drilling).

---

### Task 1: SKIP_BLOCKS + tokens + parent shell + empty regions (Wave 1)

**Files:**
- Modify: `scripts/sync-src-from-mk.py` (`SKIP_BLOCKS` frozenset)
- Create: `src/shared/_about-staff-meal-tokens.scss`
- Create: `src/about-staff-meal-section/{block.json,index.js,edit.js,save.js,style.scss}`
- Create: `src/about-staff-meal-gallery/{block.json,index.js,edit.js,save.js,style.scss}`
- Create: `src/about-staff-meal-feedback/{block.json,index.js,edit.js,save.js,style.scss}`

**Interfaces:**
- Consumes: endo-faq Inspector/toggle patterns; `useStableBlockProps`
- Produces: Parent attrs per spec §Parent attributes; region blocks accepting only their child type (items stubbed in Task 2–3); parent TEMPLATE inserting both regions

- [ ] **Step 1: Add SKIP_BLOCKS entries**

In `scripts/sync-src-from-mk.py`, inside the `SKIP_BLOCKS = frozenset({...})` set, add (alphabetically near other `about-*` / after endo block if none):

```python
        "about-staff-meal-section",
        "about-staff-meal-gallery",
        "about-staff-meal-feedback",
        "about-staff-meal-gallery-item",
        "about-staff-meal-feedback-item",
```

- [ ] **Step 2: Create tokens SCSS**

Create `src/shared/_about-staff-meal-tokens.scss`:

```scss
// About Staff Meal — shared tokens (imported by section + children)
$asm-accent: #e85d04;
$asm-container: 1100px;
$asm-quote-mark-size: 48px;
$asm-gallery-gap: 12px;
$asm-feedback-gap: 24px;
$asm-feedback-min: 220px;
$asm-bp-mobile: 768px;
```

- [ ] **Step 3: Create gallery region block (shell only)**

`src/about-staff-meal-gallery/block.json`:

```json
{
	"$schema": "https://schemas.wp.org/trunk/block.json",
	"apiVersion": 3,
	"name": "twork/about-staff-meal-gallery",
	"version": "1.0.0",
	"title": "Staff Meal Gallery",
	"category": "twork-builder",
	"parent": ["twork/about-staff-meal-section"],
	"description": "Gallery region for About Staff Meal (internal).",
	"supports": { "html": false, "inserter": false, "reusable": false, "lock": false },
	"textdomain": "twork-builder",
	"editorScript": "file:./index.js",
	"style": "file:./style-index.css"
}
```

`src/about-staff-meal-gallery/index.js`:

```js
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, { edit: Edit, save } );
```

`src/about-staff-meal-gallery/edit.js` (Task 1: empty appender OK; Task 2 wires gallery-item):

```js
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'twork/about-staff-meal-gallery-item' ];
const TEMPLATE = [
	[
		'twork/about-staff-meal-gallery-item',
		{ imageRole: 'featured', showBadge: false },
	],
	[
		'twork/about-staff-meal-gallery-item',
		{
			imageRole: 'secondary',
			showBadge: true,
			badgeText: 'Meal',
		},
	],
	[
		'twork/about-staff-meal-gallery-item',
		{ imageRole: 'secondary', showBadge: false },
	],
];

export default function Edit() {
	const blockProps = useStableBlockProps( () => ( {
		className: 'twork-about-staff-meal-gallery',
	} ) );

	return (
		<div { ...blockProps }>
			<p className="twork-about-staff-meal-gallery__label">
				{ __( 'Gallery', 'twork-builder' ) }
			</p>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
				templateLock={ false }
			/>
		</div>
	);
}
```

`src/about-staff-meal-gallery/save.js`:

```js
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save( {
		className: 'twork-about-staff-meal-gallery',
	} );
	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
```

`src/about-staff-meal-gallery/style.scss`:

```scss
@import '../shared/about-staff-meal-tokens';

.twork-about-staff-meal-gallery {
	width: 100%;

	&__label {
		display: none;
	}

	.block-editor-block-list__layout &__label {
		display: block;
		margin: 0 0 8px;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: #757575;
	}
}
```

Note: wp-scripts resolves `@import '../shared/about-staff-meal-tokens'` — file is `_about-staff-meal-tokens.scss`; Sass allows omit `_` and extension. If build fails on partial name, use `@import '../shared/about-staff-meal-tokens';` (underscore optional in Sass) or match existing repo import style from other blocks (check `src/endo-faq-section/style.scss`).

- [ ] **Step 4: Create feedback region block (shell only)**

Mirror gallery with:

- name: `twork/about-staff-meal-feedback`
- class: `twork-about-staff-meal-feedback`
- `ALLOWED_BLOCKS = [ 'twork/about-staff-meal-feedback-item' ]`
- TEMPLATE of 3 feedback items (names/body filled in Task 3; Task 1 can use empty stubs once item block exists — **if item block missing, build fails**. So either (a) create minimal stub item blocks in Task 1, or (b) use empty TEMPLATE `[]` until Task 2–3).

**Required for green build in Task 1:** use `template={ [] }` and `allowedBlocks` pointing at item names that will exist; register **minimal stub** gallery-item + feedback-item in Task 1 (block.json + index + edit returning placeholder + save returning null/empty wrapper) so `registerBlockType` succeeds. Task 2–3 flesh them out.

Minimal stub `src/about-staff-meal-gallery-item/` (expand in Task 2):

```json
{
	"$schema": "https://schemas.wp.org/trunk/block.json",
	"apiVersion": 3,
	"name": "twork/about-staff-meal-gallery-item",
	"version": "1.0.0",
	"title": "Staff Meal Gallery Image",
	"category": "twork-builder",
	"parent": ["twork/about-staff-meal-gallery"],
	"supports": { "html": false },
	"attributes": {
		"showItem": { "type": "boolean", "default": true },
		"imageUrl": { "type": "string", "default": "" },
		"imageAlt": { "type": "string", "default": "" },
		"imageId": { "type": "number", "default": 0 },
		"imageRole": { "type": "string", "default": "secondary" },
		"showCaption": { "type": "boolean", "default": false },
		"caption": { "type": "string", "default": "" },
		"showBadge": { "type": "boolean", "default": false },
		"badgeText": { "type": "string", "default": "Meal" },
		"badgeColor": { "type": "string", "default": "#e85d04" }
	},
	"textdomain": "twork-builder",
	"editorScript": "file:./index.js",
	"style": "file:./style-index.css"
}
```

Stub edit: dashed box + “Gallery image”. Stub save: `null` if `!showItem`, else empty `<figure>` with optional img if url.

Minimal stub feedback-item similarly with attrs from spec §Child feedback-item; parent `twork/about-staff-meal-feedback`.

- [ ] **Step 5: Parent block.json (full attribute contract)**

Create `src/about-staff-meal-section/block.json` with **all** parent attributes from the spec (Shell, Chrome, Header, Gallery, Feedback, Quote, Footer, Motion). Exact keys/defaults:

```json
{
	"$schema": "https://schemas.wp.org/trunk/block.json",
	"apiVersion": 3,
	"name": "twork/about-staff-meal-section",
	"version": "1.0.0",
	"title": "About Staff Meal",
	"category": "twork-builder",
	"icon": "food",
	"description": "Staff meal program section for About Us (MEAL TREAT FOR DUTY TIME).",
	"keywords": ["about", "staff meal", "meal treat", "jivaka", "agm"],
	"attributes": {
		"showSection": { "type": "boolean", "default": true },
		"sectionId": { "type": "string", "default": "staff-meal" },
		"backgroundColor": { "type": "string", "default": "#ffffff" },
		"paddingTop": { "type": "number", "default": 80 },
		"paddingBottom": { "type": "number", "default": 80 },
		"paddingTopMobile": { "type": "number", "default": 48 },
		"paddingBottomMobile": { "type": "number", "default": 48 },
		"containerMaxWidth": { "type": "number", "default": 1100 },
		"containerPadding": { "type": "number", "default": 24 },
		"accentColor": { "type": "string", "default": "#e85d04" },
		"showChrome": { "type": "boolean", "default": false },
		"showLogo": { "type": "boolean", "default": true },
		"logoUrl": { "type": "string", "default": "" },
		"logoAlt": { "type": "string", "default": "" },
		"logoId": { "type": "number", "default": 0 },
		"showCompanyName": { "type": "boolean", "default": true },
		"companyName": {
			"type": "string",
			"default": "BLISSFUL HEALTH COMPANY LIMITED"
		},
		"showPageBadge": { "type": "boolean", "default": true },
		"pageBadgeText": { "type": "string", "default": "Pg 51" },
		"showEyebrow": { "type": "boolean", "default": false },
		"eyebrowText": { "type": "string", "default": "Staff benefits" },
		"showTitle": { "type": "boolean", "default": true },
		"title": {
			"type": "string",
			"default": "MEAL TREAT FOR DUTY TIME"
		},
		"headingLevel": { "type": "number", "default": 2 },
		"showTitleUnderline": { "type": "boolean", "default": true },
		"titleColor": { "type": "string", "default": "#e85d04" },
		"titleFontSize": { "type": "number", "default": 28 },
		"showGallery": { "type": "boolean", "default": true },
		"galleryLayout": { "type": "string", "default": "featured-trio" },
		"galleryColumns": { "type": "number", "default": 2 },
		"galleryGap": { "type": "number", "default": 12 },
		"showCaptions": { "type": "boolean", "default": false },
		"showFeedback": { "type": "boolean", "default": true },
		"feedbackColumns": { "type": "number", "default": 3 },
		"feedbackGap": { "type": "number", "default": 24 },
		"showAuthor": { "type": "boolean", "default": true },
		"allowEmoji": { "type": "boolean", "default": true },
		"showQuote": { "type": "boolean", "default": true },
		"quoteText": {
			"type": "string",
			"default": "စားသောက်မှု အရသာ ကျေနပ်မှု ဆန်းစစ်ချက် မှတ်တမ်းများမှ ရရှိသော အကြံပြုချက်များကို အခြေခံကာ ဝန်ထမ်းများအတွက် သန့်ရှင်းလတ်ဆတ်ပြီး အရသာရှိသော အစားအစာများကို နေ့စဉ် ချက်ပြုတ်ကျွေးမွေးလျက်ရှိပါသည်။"
		},
		"showQuoteMarks": { "type": "boolean", "default": true },
		"quoteMarkColor": { "type": "string", "default": "#e85d04" },
		"quoteTextColor": { "type": "string", "default": "#e85d04" },
		"quoteFontSize": { "type": "number", "default": 22 },
		"quoteMaxWidth": { "type": "number", "default": 900 },
		"showFooter": { "type": "boolean", "default": false },
		"footerText": {
			"type": "string",
			"default": "2nd AGM (2025-2026)"
		},
		"showFooterLines": { "type": "boolean", "default": true },
		"footerLineColor": { "type": "string", "default": "#e85d04" },
		"animationOnScroll": { "type": "boolean", "default": true },
		"animationType": { "type": "string", "default": "fade-up" },
		"animationDelay": { "type": "number", "default": 0 },
		"respectReducedMotion": { "type": "boolean", "default": true }
	},
	"supports": { "html": false, "anchor": true, "align": ["wide", "full"] },
	"example": {
		"viewportWidth": 1200,
		"attributes": {
			"sectionId": "staff-meal",
			"title": "MEAL TREAT FOR DUTY TIME"
		}
	},
	"textdomain": "twork-builder",
	"editorScript": "file:./index.js",
	"style": "file:./style-index.css"
}
```

- [ ] **Step 6: Parent edit.js + save.js (chrome/header/quote/footer + locked region template)**

Parent `TEMPLATE`:

```js
const TEMPLATE = [
	[
		'twork/about-staff-meal-gallery',
		{},
		[],
	],
	[
		'twork/about-staff-meal-feedback',
		{},
		[],
	],
];

const ALLOWED_BLOCKS = [
	'twork/about-staff-meal-gallery',
	'twork/about-staff-meal-feedback',
];
```

Use `<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } template={ TEMPLATE } templateLock="all" />` so editors cannot remove regions.

Inspector panels (order): Section → Chrome → Header → Gallery layout → Feedback layout → Quote → Footer → Motion. Mirror `endo-faq-section/edit.js` ToggleControl / RangeControl / TextControl / PanelColorSettings patterns. Every toggle must gate the matching node in both edit preview and save.

`save.js` rules from spec edge cases:

- `showSection === false` → `return null`
- Chrome only if `showChrome`; sub-toggles ignored when chrome off
- Gallery / feedback regions: still output InnerBlocks content but wrap in `hidden` / omit wrapper when `showGallery` / `showFeedback` false — **prefer omit wrapper with CSS `display:none` via class when false so InnerBlocks.Content still serializes** (required for editor round-trip). Use class `is-hidden` when toggle off; front-end CSS `display: none`.
- Quote omit when `showQuote === false` or empty `quoteText`
- Footer only if `showFooter`

Data attributes on `<section>`:

```js
'data-gallery-layout': galleryLayout,
'data-gallery-columns': String( galleryColumns ),
'data-feedback-columns': String( feedbackColumns ),
'data-animation': animationOnScroll ? '1' : '0',
'data-animation-type': animationType,
'data-animation-delay': String( animationDelay ),
'data-reduced-motion': respectReducedMotion ? '1' : '0',
```

CSS variables on section style:

```js
'--asm-accent': accentColor,
'--asm-container': `${ containerMaxWidth }px`,
'--asm-gallery-gap': `${ galleryGap }px`,
'--asm-feedback-gap': `${ feedbackGap }px`,
'--asm-feedback-cols': String( feedbackColumns ),
paddingTop / paddingBottom as px,
backgroundColor,
```

Heading: `const TitleTag = 'h' + Math.min( 4, Math.max( 2, headingLevel || 2 ) );`

- [ ] **Step 7: Parent style.scss (shell + layout hooks)**

Import tokens. Implement:

- `.twork-about-staff-meal` container max-width / padding
- Chrome row (logo | company + badge)
- Title center + underline from accent
- Quote with `::before`/`::after` marks when `.has-quote-marks`
- Footer with horizontal lines
- `.is-hidden { display: none !important; }`
- Mobile padding via `@media (max-width: 768px)` using `--asm-pad-top-m` / `--asm-pad-bottom-m` set from attributes
- Gallery layout hooks (can be incomplete until Task 2): `[data-gallery-layout="featured-trio"] .twork-about-staff-meal-gallery` CSS grid

- [ ] **Step 8: Build smoke**

Run:

```bash
npm run build
```

Expected: exit 0; `build/about-staff-meal-section/`, `build/about-staff-meal-gallery/`, `build/about-staff-meal-feedback/`, and stub item folders present. Sync must **not** delete these (SKIP_BLOCKS).

Run:

```bash
npx wp-scripts lint-js src/about-staff-meal-section src/about-staff-meal-gallery src/about-staff-meal-feedback src/about-staff-meal-gallery-item src/about-staff-meal-feedback-item
```

Expected: no new errors (parity-only unresolved `@twork-builder/editor-utils` is OK if endo has same).

- [ ] **Step 9: Commit (only if user asked to commit)**

Do **not** commit unless the user explicitly requests a commit. If they do:

```bash
git add scripts/sync-src-from-mk.py src/shared/_about-staff-meal-tokens.scss \
  src/about-staff-meal-section src/about-staff-meal-gallery \
  src/about-staff-meal-feedback src/about-staff-meal-gallery-item \
  src/about-staff-meal-feedback-item
git commit -m "$(cat <<'EOF'
feat: scaffold about-staff-meal section shell and regions

EOF
)"
```

---

### Task 2: Gallery item + layout modes + captions/badges (Wave 2)

**Files:**
- Modify: `src/about-staff-meal-gallery-item/{edit.js,save.js,style.scss,block.json}` (replace stubs)
- Modify: `src/about-staff-meal-section/style.scss` (featured-trio / equal-grid / stacked)
- Modify: `src/about-staff-meal-gallery/style.scss` if needed

**Interfaces:**
- Consumes: parent `data-gallery-layout`, `--asm-gallery-gap`, `showCaptions` (section-level: item still respects own `showCaption`; when section `showCaptions` false, CSS hides `.twork-about-staff-meal-gallery-item__caption` unless item forces — **implement:** section sets `data-show-captions="0|1"`; CSS `[data-show-captions="0"] ...__caption { display:none }`)
- Produces: Featured/secondary roles; badge overlay; empty-url omits `<img>`

- [ ] **Step 1: Gallery item edit.js**

Use `MediaPlaceholder` / `MediaUpload` like `csr-moments-gallery-item/edit.js`. Inspector: Show item, Image role (`SelectControl`: featured | secondary), Show caption + text, Show badge + badgeText + badgeColor (`PanelColorSettings` or `ColorPicker`).

Editor preview: figure with img or dashed placeholder; badge absolute bottom-left when on.

- [ ] **Step 2: Gallery item save.js**

```js
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		showItem,
		imageUrl,
		imageAlt,
		imageRole,
		showCaption,
		caption,
		showBadge,
		badgeText,
		badgeColor,
	} = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: [
			'twork-about-staff-meal-gallery-item',
			imageRole === 'featured' ? 'is-featured' : 'is-secondary',
		].join( ' ' ),
		'data-role': imageRole || 'secondary',
	} );

	return (
		<figure { ...blockProps }>
			{ imageUrl ? (
				<img
					src={ imageUrl }
					alt={ imageAlt || '' }
					loading="lazy"
					decoding="async"
				/>
			) : null }
			{ showBadge !== false && badgeText ? (
				<span
					className="twork-about-staff-meal-gallery-item__badge"
					style={ { backgroundColor: badgeColor } }
				>
					{ badgeText }
				</span>
			) : null }
			{ showCaption && caption ? (
				<RichText.Content
					tagName="figcaption"
					className="twork-about-staff-meal-gallery-item__caption"
					value={ caption }
				/>
			) : null }
		</figure>
	);
}
```

- [ ] **Step 3: Gallery layout CSS on parent**

```scss
.twork-about-staff-meal[data-gallery-layout='featured-trio']
	.twork-about-staff-meal-gallery
	.block-editor-inner-blocks
	> .block-editor-block-list__layout,
.twork-about-staff-meal[data-gallery-layout='featured-trio']
	.twork-about-staff-meal-gallery {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--asm-gallery-gap, 12px);

	> .twork-about-staff-meal-gallery-item.is-featured,
	> .wp-block-twork-about-staff-meal-gallery-item.is-featured {
		grid-column: 1 / -1;
	}
}

.twork-about-staff-meal[data-gallery-layout='equal-grid']
	.twork-about-staff-meal-gallery {
	display: grid;
	grid-template-columns: repeat(var(--asm-gallery-cols, 2), 1fr);
	gap: var(--asm-gallery-gap, 12px);
}

.twork-about-staff-meal[data-gallery-layout='stacked']
	.twork-about-staff-meal-gallery {
	display: flex;
	flex-direction: column;
	gap: var(--asm-gallery-gap, 12px);
}
```

Parent save/edit must set `--asm-gallery-cols: ${ galleryColumns }`. Front-end: target `.twork-about-staff-meal-gallery` direct children (saved markup has no editor wrappers).

Featured mapping: first `.is-featured` wins; if none, CSS fallback:

```scss
.twork-about-staff-meal[data-gallery-layout='featured-trio']
	.twork-about-staff-meal-gallery
	> .twork-about-staff-meal-gallery-item:first-child {
	grid-column: 1 / -1;
}
```

- [ ] **Step 4: Build + lint**

```bash
npm run build
npx wp-scripts lint-js src/about-staff-meal-gallery-item src/about-staff-meal-section
```

Expected: OK.

- [ ] **Step 5: Commit only if user asked**

---

### Task 3: Feedback item + columns + init JS enqueue (Wave 3)

**Files:**
- Modify: `src/about-staff-meal-feedback-item/*` (full implementation)
- Modify: `src/about-staff-meal-section/style.scss` (feedback columns)
- Create: `assets/js/about-staff-meal-init.js`
- Modify: `twork-builder.php` (register script + `$block_script_map` entry)

**Interfaces:**
- Consumes: parent `data-feedback-columns`, `--asm-feedback-gap`, `showAuthor`, `data-animation*`
- Produces: 3-column feedback grid; scroll reveal `.is-visible`

- [ ] **Step 1: Feedback item block**

Defaults (sample authors from spec):

| # | name | body (short MY) |
|---|------|-----------------|
| 1 | Kay Khaing Win | Short Burmese praise of daily meal taste/cleanliness |
| 2 | Kay Khaing Win | Short variant — gratitude / energy for duty |
| 3 | Hay Mar Thin | Short variant — fresh food appreciation |

`edit.js`: toggles `showItem`, `showName`, `showHeart`; `TextControl` name; `RichText` body. When parent `showAuthor` is false, names still save but CSS `[data-show-author="0"] .twork-about-staff-meal-feedback-item__name { display:none }` — set `data-show-author` on section.

`save.js`: return null if `!showItem`; else article/blockquote structure with name + optional ♥ + RichText body. Escape via React text / RichText.Content only (no `dangerouslySetInnerHTML`).

- [ ] **Step 2: Feedback grid CSS**

```scss
.twork-about-staff-meal-feedback {
	display: grid;
	grid-template-columns: repeat(var(--asm-feedback-cols, 3), minmax(0, 1fr));
	gap: var(--asm-feedback-gap, 24px);
}

@media (max-width: 768px) {
	.twork-about-staff-meal-feedback {
		grid-template-columns: 1fr;
	}
}
```

- [ ] **Step 3: Front-end init JS**

Create `assets/js/about-staff-meal-init.js`:

```js
/**
 * About Staff Meal — scroll reveal (vanilla IntersectionObserver).
 */
( function () {
	'use strict';

	var SECTION_SELECTOR = '.twork-about-staff-meal';
	var REVEAL_SELECTOR = '.asm-reveal';

	function prefersReducedMotion() {
		return (
			window.matchMedia &&
			window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches
		);
	}

	function initSection( section ) {
		if ( section.dataset.asmBound === '1' ) {
			return;
		}
		section.dataset.asmBound = '1';

		var enabled = section.getAttribute( 'data-animation' ) === '1';
		var respect =
			section.getAttribute( 'data-reduced-motion' ) === '1' &&
			prefersReducedMotion();

		var targets = section.querySelectorAll( REVEAL_SELECTOR );
		if ( ! targets.length ) {
			return;
		}

		if ( ! enabled || respect ) {
			targets.forEach( function ( el ) {
				el.classList.add( 'is-visible' );
			} );
			return;
		}

		var delay = parseInt(
			section.getAttribute( 'data-animation-delay' ) || '0',
			10
		);

		if ( ! window.IntersectionObserver ) {
			targets.forEach( function ( el ) {
				el.classList.add( 'is-visible' );
			} );
			return;
		}

		var observer = new IntersectionObserver(
			function ( entries, obs ) {
				entries.forEach( function ( entry ) {
					if ( ! entry.isIntersecting ) {
						return;
					}
					var el = entry.target;
					window.setTimeout( function () {
						el.classList.add( 'is-visible' );
					}, delay );
					obs.unobserve( el );
				} );
			},
			{ threshold: 0.15 }
		);

		targets.forEach( function ( el ) {
			observer.observe( el );
		} );
	}

	function initAll() {
		document
			.querySelectorAll( SECTION_SELECTOR )
			.forEach( initSection );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
```

Parent save/edit: add class `asm-reveal` to gallery region, feedback region, and quote when `animationOnScroll`. SCSS:

```scss
.twork-about-staff-meal .asm-reveal {
	opacity: 0;
	transform: translateY(16px);
	transition: opacity 0.5s ease, transform 0.5s ease;

	&.is-visible {
		opacity: 1;
		transform: none;
	}
}

@media (prefers-reduced-motion: reduce) {
	.twork-about-staff-meal .asm-reveal {
		opacity: 1;
		transform: none;
		transition: none;
	}
}
```

- [ ] **Step 4: Enqueue in twork-builder.php**

In `twork_builder_register_frontend_scripts` `$scripts` array, add:

```php
'twork-about-staff-meal-init' => 'about-staff-meal-init.js',
```

In `$block_script_map`, add:

```php
'twork/about-staff-meal-section' => array( 'twork-about-staff-meal-init' ),
```

Place near About / endo entries for readability.

- [ ] **Step 5: Verify PHP syntax + build + lint**

```bash
php -l twork-builder.php
npm run build
npx wp-scripts lint-js src/about-staff-meal-feedback-item src/about-staff-meal-section
npx wp-scripts lint-style "src/about-staff-meal-*/**/*.scss" "src/shared/_about-staff-meal-tokens.scss"
node scripts/find-duplicate-block-names.mjs
```

Expected: PHP OK; build OK; lint clean aside from known editor-utils parity; no duplicate block names.

- [ ] **Step 6: Manual editor smoke checklist (user or agent with browser)**

- [ ] Block appears under twork-builder as “About Staff Meal”
- [ ] Each parent toggle hides matching front-end node
- [ ] `featured-trio` / `equal-grid` / `stacked` switch
- [ ] Empty image → no broken `<img>`
- [ ] Reduced motion → no stuck opacity 0
- [ ] New blocks → no deprecation needed

- [ ] **Step 7: Commit only if user asked**

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Parent + gallery/feedback children + toggles | 1–3 |
| Two InnerBlocks regions | 1 (region shells adaptation) |
| Chrome/footer default OFF | 1 block.json defaults |
| Gallery layouts hybrid | 2 |
| Quote + Burmese default | 1 |
| Motion IO / reduced motion | 3 |
| SKIP_BLOCKS | 1 |
| Enqueue map | 3 |
| No default hotlinked images | 1–2 |
| Kit template wiring | Out of scope (spec) |

## Placeholder scan

No TBD/TODO left in task steps. Region-block adaptation is explicit.

## Type consistency

- Block names: `twork/about-staff-meal-{section|gallery|feedback|gallery-item|feedback-item}`
- Init handle: `twork-about-staff-meal-init` → file `about-staff-meal-init.js`
- Section selector: `.twork-about-staff-meal`
- Reveal class: `.asm-reveal` / `.is-visible`

---

## Execution handoff

Plan saved to `docs/superpowers/plans/2026-08-27-about-staff-meal.md`.

**Repo workflow:** next user `y` → **Scout** (target file list only), then Architect, then Builder Task 1 / Wave 1.

**Execution options (after Scout/Architect if following `.cursorrules`):**

1. **Subagent-Driven** — fresh subagent per task + review between tasks  
2. **Inline Execution** — this session, one Builder wave per `y`
