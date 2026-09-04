# Staff Meal Gallery Size + Slider/Slideshow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **This repo also gates work:** Scout → Architect → Builder → QA → DevOps, **one step per user `y`**. Map: Task 1 = Builder G1; Tasks 2–4 = Builder G2 (can batch in one Builder turn if user `y` unlocks G2); Task 5 = QA turn. Do not run Builder+QA in the same turn.
>
> **Commit policy:** UNRESOLVED — do **not** `git commit` unless the user explicitly asks. Skip commit steps or pause and ask.

**Goal:** Fix oversized staff-meal gallery images in editor/front end, make adding images obvious, and add `slider` / `slideshow` layouts with vanilla JS (GIF stays image MIME; no video).

**Architecture:** Keep parent-owned `galleryLayout` + CSS variables. Constrain gallery-item images with aspect-ratio (drop `height: 100%`). Additive enum values `slider` | `slideshow`. Front-end IIFE injects prev/next/dots and autoplay; without JS, CSS shows first slide only. Editor never runs autoplay.

**Tech Stack:** Gutenberg blocks (`@wordpress/block-editor`, `components`, `i18n`), SCSS, `wp-scripts`, vanilla IIFE in `assets/js/`, enqueue via `twork-builder.php` block map.

## Global Constraints

- Spec SoT: `docs/superpowers/specs/2026-08-27-about-staff-meal-gallery-layouts-design.md`
- Parent design: `docs/superpowers/specs/2026-08-27-about-staff-meal-design.md`
- Text domain: `twork-builder`; BEM: `.twork-about-staff-meal*`
- Slugs already in `SKIP_BLOCKS` (do not remove): `about-staff-meal-section`, `about-staff-meal-gallery`, `about-staff-meal-feedback`, `about-staff-meal-gallery-item`, `about-staff-meal-feedback-item`
- No Swiper/Embla/GSAP; no new npm packages; no video this wave
- No version bump / zip unless DevOps asked
- `useStableBlockProps` from `@twork-builder/editor-utils`
- Markup/attr changes that alter saved HTML need `deprecated` — prefer additive `data-*` only on section

---

## File Structure

| Path | Responsibility |
|------|----------------|
| `src/about-staff-meal-gallery-item/style.scss` | Image size / aspect fix |
| `src/about-staff-meal-gallery/edit.js` | ButtonBlockAppender + hint |
| `src/about-staff-meal-gallery/style.scss` | Editor hint styles (optional) |
| `src/about-staff-meal-section/block.json` | `galleryAutoplay`, `galleryAutoplayMs`; layout still string |
| `src/about-staff-meal-section/edit.js` | Layout options + autoplay controls; data attrs |
| `src/about-staff-meal-section/save.js` | Same data attrs on wrapper |
| `src/about-staff-meal-section/style.scss` | Slider/slideshow + no-JS fallback; grid `minmax(0,1fr)` |
| `assets/js/about-staff-meal-init.js` | Reveal (if needed) + slider/slideshow |
| `twork-builder.php` | Register + map section → init |

---

### Task 1: Image size fix + gallery appender (Builder G1)

**Files:**
- Modify: `src/about-staff-meal-gallery-item/style.scss`
- Modify: `src/about-staff-meal-gallery/edit.js`
- Modify: `src/about-staff-meal-section/style.scss` (grid `minmax` only if needed)
- Test: visual in editor after `npm run build` (manual); `npx wp-scripts lint-style` on touched scss paths

**Interfaces:**
- Consumes: existing BEM `.twork-about-staff-meal-gallery-item`
- Produces: Constrained `img` box; visible `InnerBlocks.ButtonBlockAppender`

- [ ] **Step 1: Replace gallery-item image rules**

In `src/about-staff-meal-gallery-item/style.scss`, change the `img` / featured rules to:

```scss
.twork-about-staff-meal-gallery-item {
	position: relative;
	margin: 0;
	overflow: hidden;
	border-radius: 8px;
	background: #f5f5f5;
	min-height: 0;
	width: 100%;
	max-width: 100%;

	img {
		display: block;
		width: 100%;
		height: auto;
		max-width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		vertical-align: middle;
	}

	&.is-featured img {
		aspect-ratio: 16 / 9;
	}

	/* keep existing .is-empty, __badge, __caption, __toolbar rules */
}
```

Remove any `height: 100%` on `img`.

- [ ] **Step 2: Harden parent grid tracks (optional but preferred)**

In `src/about-staff-meal-section/style.scss`, for `featured-trio` and `equal-grid` rules that set `grid-template-columns`, use `minmax(0, 1fr)` instead of bare `1fr` (both FE and editor selectors already listed).

Example for equal-grid:

```scss
grid-template-columns: repeat(var(--asm-gallery-cols, 2), minmax(0, 1fr));
```

For featured-trio:

```scss
grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
```

- [ ] **Step 3: Explicit ButtonBlockAppender + hint**

Replace gallery `edit.js` return body with:

```javascript
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
			<p className="twork-about-staff-meal-gallery__hint">
				{ __(
					'Add more images with the + control below.',
					'twork-builder'
				) }
			</p>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
				templateLock={ false }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
			/>
		</div>
	);
}
```

Add editor-only hint style in `src/about-staff-meal-gallery/style.scss`:

```scss
.twork-about-staff-meal-gallery {
	&__hint {
		display: none;
	}

	.block-editor-block-list__layout &__hint {
		display: block;
		margin: 0 0 12px;
		font-size: 12px;
		color: #757575;
	}
}
```

- [ ] **Step 4: Build smoke (G1)**

Run:

```bash
npm run build
```

Expected: exit 0; staff-meal gallery-item CSS in `build/` without `height: 100%` on item img.

- [ ] **Step 5: Commit** — **SKIP unless user asks** (policy UNRESOLVED)

---

### Task 2: Parent attrs + Inspector + save/edit data-* (Builder G2 part A)

**Files:**
- Modify: `src/about-staff-meal-section/block.json`
- Modify: `src/about-staff-meal-section/edit.js`
- Modify: `src/about-staff-meal-section/save.js`

**Interfaces:**
- Consumes: existing `galleryLayout`, `showGallery`, …
- Produces: `galleryAutoplay: boolean` default `true`; `galleryAutoplayMs: number` default `4500`; section `data-gallery-autoplay`, `data-gallery-autoplay-ms`; layout options include `slider`, `slideshow`

- [ ] **Step 1: Add attributes to block.json**

After `showCaptions`, add:

```json
		"galleryAutoplay": { "type": "boolean", "default": true },
		"galleryAutoplayMs": { "type": "number", "default": 4500 },
```

- [ ] **Step 2: Extend GALLERY_LAYOUT_OPTIONS**

```javascript
const GALLERY_LAYOUT_OPTIONS = [
	{ label: __( 'Featured trio', 'twork-builder' ), value: 'featured-trio' },
	{ label: __( 'Equal grid', 'twork-builder' ), value: 'equal-grid' },
	{ label: __( 'Stacked', 'twork-builder' ), value: 'stacked' },
	{ label: __( 'Slider', 'twork-builder' ), value: 'slider' },
	{ label: __( 'Slideshow', 'twork-builder' ), value: 'slideshow' },
];
```

- [ ] **Step 3: Destructure + blockProps data attrs (edit + save)**

Add to destructuring: `galleryAutoplay`, `galleryAutoplayMs`.

On `useStableBlockProps` / `useBlockProps.save` objects, add:

```javascript
'data-gallery-autoplay':
	galleryLayout === 'slideshow' && galleryAutoplay !== false
		? '1'
		: '0',
'data-gallery-autoplay-ms': String( galleryAutoplayMs || 4500 ),
```

Include `galleryAutoplay`, `galleryAutoplayMs` in the edit dependency array for `useStableBlockProps`.

- [ ] **Step 4: Inspector controls under Gallery Layout panel**

After gap / captions toggles, when layout is slideshow:

```javascript
{ galleryLayout === 'slideshow' && (
	<>
		<ToggleControl
			label={ __( 'Autoplay', 'twork-builder' ) }
			checked={ galleryAutoplay !== false }
			onChange={ ( value ) =>
				setAttributes( { galleryAutoplay: value } )
			}
			disabled={ showGallery === false }
		/>
		<RangeControl
			label={ __( 'Autoplay interval (ms)', 'twork-builder' ) }
			value={ galleryAutoplayMs }
			onChange={ ( value ) =>
				setAttributes( { galleryAutoplayMs: value } )
			}
			min={ 2000 }
			max={ 12000 }
			step={ 500 }
			disabled={
				showGallery === false || galleryAutoplay === false
			}
		/>
	</>
) }
```

Mirror the same attribute wiring in `save.js` (destructure + data attrs). No control chrome in save markup.

- [ ] **Step 5: Commit** — SKIP unless user asks

---

### Task 3: Slider/slideshow CSS + no-JS fallback (Builder G2 part B)

**Files:**
- Modify: `src/about-staff-meal-section/style.scss`

**Interfaces:**
- Consumes: `data-gallery-layout="slider"|"slideshow"` on `.twork-about-staff-meal`
- Produces: Viewport layout; `.is-asm-gallery-ready` unlocks multi-slide JS mode; without ready class, only first slide visible on FE

- [ ] **Step 1: Add slider/slideshow rules**

Append to `src/about-staff-meal-section/style.scss` (after existing gallery layout blocks):

```scss
	&[data-gallery-layout="slider"] .twork-about-staff-meal-gallery,
	&[data-gallery-layout="slideshow"] .twork-about-staff-meal-gallery {
		position: relative;
		width: 100%;
	}

	/* FE no-JS / pre-init: show first slide only */
	&[data-gallery-layout="slider"]:not(.is-asm-gallery-ready) .twork-about-staff-meal-gallery > .twork-about-staff-meal-gallery-item:not(:first-child),
	&[data-gallery-layout="slideshow"]:not(.is-asm-gallery-ready) .twork-about-staff-meal-gallery > .twork-about-staff-meal-gallery-item:not(:first-child),
	&[data-gallery-layout="slider"]:not(.is-asm-gallery-ready) .twork-about-staff-meal-gallery > .wp-block-twork-about-staff-meal-gallery-item:not(:first-child),
	&[data-gallery-layout="slideshow"]:not(.is-asm-gallery-ready) .twork-about-staff-meal-gallery > .wp-block-twork-about-staff-meal-gallery-item:not(:first-child) {
		display: none;
	}

	&[data-gallery-layout="slider"].is-asm-gallery-ready .twork-about-staff-meal-gallery,
	&[data-gallery-layout="slideshow"].is-asm-gallery-ready .twork-about-staff-meal-gallery {
		overflow: hidden;
	}

	&[data-gallery-layout="slider"].is-asm-gallery-ready .twork-about-staff-meal-gallery > .twork-about-staff-meal-gallery-item,
	&[data-gallery-layout="slideshow"].is-asm-gallery-ready .twork-about-staff-meal-gallery > .twork-about-staff-meal-gallery-item,
	&[data-gallery-layout="slider"].is-asm-gallery-ready .twork-about-staff-meal-gallery > .wp-block-twork-about-staff-meal-gallery-item,
	&[data-gallery-layout="slideshow"].is-asm-gallery-ready .twork-about-staff-meal-gallery > .wp-block-twork-about-staff-meal-gallery-item {
		display: none;
		width: 100%;
	}

	&[data-gallery-layout="slider"].is-asm-gallery-ready .twork-about-staff-meal-gallery > .twork-about-staff-meal-gallery-item.is-active,
	&[data-gallery-layout="slideshow"].is-asm-gallery-ready .twork-about-staff-meal-gallery > .twork-about-staff-meal-gallery-item.is-active,
	&[data-gallery-layout="slider"].is-asm-gallery-ready .twork-about-staff-meal-gallery > .wp-block-twork-about-staff-meal-gallery-item.is-active,
	&[data-gallery-layout="slideshow"].is-asm-gallery-ready .twork-about-staff-meal-gallery > .wp-block-twork-about-staff-meal-gallery-item.is-active {
		display: block;
	}

	/* Editor: keep all slides editable (stacked) for slider/slideshow */
	.block-editor-block-list__layout &[data-gallery-layout="slider"] .twork-about-staff-meal-gallery .block-editor-inner-blocks > .block-editor-block-list__layout,
	.block-editor-block-list__layout &[data-gallery-layout="slideshow"] .twork-about-staff-meal-gallery .block-editor-inner-blocks > .block-editor-block-list__layout {
		display: flex;
		flex-direction: column;
		gap: var(--asm-gallery-gap, #{$asm-gallery-gap});
	}

	.block-editor-block-list__layout &[data-gallery-layout="slider"] .twork-about-staff-meal-gallery .twork-about-staff-meal-gallery-item,
	.block-editor-block-list__layout &[data-gallery-layout="slideshow"] .twork-about-staff-meal-gallery .twork-about-staff-meal-gallery-item {
		display: block;
		max-width: 100%;
	}

	.twork-about-staff-meal-gallery__controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		margin-top: 12px;
	}

	.twork-about-staff-meal-gallery__btn {
		appearance: none;
		border: 1px solid #ccc;
		background: #fff;
		border-radius: 4px;
		padding: 6px 12px;
		cursor: pointer;
		font-size: 14px;
		line-height: 1;
	}

	.twork-about-staff-meal-gallery__dots {
		display: flex;
		gap: 8px;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.twork-about-staff-meal-gallery__dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		border: 0;
		padding: 0;
		background: #ccc;
		cursor: pointer;

		&.is-active {
			background: var(--asm-accent, #{$asm-accent});
		}
	}
```

Note: editor selector may need nesting as `.editor-styles-wrapper .twork-about-staff-meal[data-gallery-layout=…]` if the block-list parent selector above does not match — verify after build; adjust to whatever ancestor the canvas uses so editor keeps stacked slides.

- [ ] **Step 2: Commit** — SKIP unless user asks

---

### Task 4: Front-end init + enqueue (Builder G2 part C)

**Files:**
- Create: `assets/js/about-staff-meal-init.js`
- Modify: `twork-builder.php` (register scripts array ~line 136; block_script_map ~line 248)

**Interfaces:**
- Consumes: section `.twork-about-staff-meal` with `data-gallery-layout`, `data-gallery-autoplay`, `data-gallery-autoplay-ms`, `data-animation`, `data-reduced-motion`
- Produces: `window` none required; marks section `.is-asm-gallery-ready`; toggles `.is-active` on slides; injects `.twork-about-staff-meal-gallery__controls`

- [ ] **Step 1: Create init script**

Create `assets/js/about-staff-meal-init.js`:

```javascript
/**
 * About Staff Meal — scroll reveal + gallery slider/slideshow.
 */
( function () {
	'use strict';

	var SECTION_SELECTOR = '.twork-about-staff-meal';
	var GALLERY_SELECTOR = '.twork-about-staff-meal-gallery';
	var SLIDE_SELECTOR =
		'.twork-about-staff-meal-gallery-item, .wp-block-twork-about-staff-meal-gallery-item';

	function prefersReducedMotion() {
		return (
			window.matchMedia &&
			window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches
		);
	}

	function getSlides( gallery ) {
		return Array.prototype.slice
			.call( gallery.children )
			.filter( function ( el ) {
				return (
					el.classList.contains(
						'twork-about-staff-meal-gallery-item'
					) ||
					el.classList.contains(
						'wp-block-twork-about-staff-meal-gallery-item'
					)
				);
			} );
	}

	function setActive( slides, index, dots ) {
		slides.forEach( function ( slide, i ) {
			var on = i === index;
			slide.classList.toggle( 'is-active', on );
			slide.setAttribute( 'aria-hidden', on ? 'false' : 'true' );
		} );
		if ( dots ) {
			dots.forEach( function ( dot, i ) {
				dot.classList.toggle( 'is-active', i === index );
				dot.setAttribute( 'aria-current', i === index ? 'true' : 'false' );
			} );
		}
	}

	function initGallery( section ) {
		var layout = section.getAttribute( 'data-gallery-layout' );
		if ( layout !== 'slider' && layout !== 'slideshow' ) {
			return;
		}

		var gallery = section.querySelector( GALLERY_SELECTOR );
		if ( ! gallery || gallery.dataset.asmGalleryBound === '1' ) {
			return;
		}
		gallery.dataset.asmGalleryBound = '1';

		var slides = getSlides( gallery );
		if ( ! slides.length ) {
			return;
		}

		section.classList.add( 'is-asm-gallery-ready' );

		if ( slides.length === 1 ) {
			slides[ 0 ].classList.add( 'is-active' );
			slides[ 0 ].setAttribute( 'aria-hidden', 'false' );
			return;
		}

		var index = 0;
		var controls = document.createElement( 'div' );
		controls.className = 'twork-about-staff-meal-gallery__controls';

		var prev = document.createElement( 'button' );
		prev.type = 'button';
		prev.className = 'twork-about-staff-meal-gallery__btn';
		prev.setAttribute( 'aria-label', 'Previous slide' );
		prev.textContent = '‹';

		var next = document.createElement( 'button' );
		next.type = 'button';
		next.className = 'twork-about-staff-meal-gallery__btn';
		next.setAttribute( 'aria-label', 'Next slide' );
		next.textContent = '›';

		var dotsWrap = document.createElement( 'div' );
		dotsWrap.className = 'twork-about-staff-meal-gallery__dots';
		dotsWrap.setAttribute( 'role', 'tablist' );

		var dots = slides.map( function ( _slide, i ) {
			var dot = document.createElement( 'button' );
			dot.type = 'button';
			dot.className = 'twork-about-staff-meal-gallery__dot';
			dot.setAttribute( 'aria-label', 'Go to slide ' + ( i + 1 ) );
			dot.addEventListener( 'click', function () {
				index = i;
				setActive( slides, index, dots );
				restartTimer();
			} );
			dotsWrap.appendChild( dot );
			return dot;
		} );

		function go( delta ) {
			index = ( index + delta + slides.length ) % slides.length;
			setActive( slides, index, dots );
		}

		prev.addEventListener( 'click', function () {
			go( -1 );
			restartTimer();
		} );
		next.addEventListener( 'click', function () {
			go( 1 );
			restartTimer();
		} );

		controls.appendChild( prev );
		controls.appendChild( dotsWrap );
		controls.appendChild( next );
		gallery.appendChild( controls );

		setActive( slides, 0, dots );

		gallery.setAttribute( 'tabindex', '0' );
		gallery.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'ArrowLeft' ) {
				e.preventDefault();
				go( -1 );
				restartTimer();
			} else if ( e.key === 'ArrowRight' ) {
				e.preventDefault();
				go( 1 );
				restartTimer();
			}
		} );

		var timer = null;
		var ms =
			parseInt( section.getAttribute( 'data-gallery-autoplay-ms' ), 10 ) ||
			4500;
		var autoplay =
			layout === 'slideshow' &&
			section.getAttribute( 'data-gallery-autoplay' ) === '1';
		var respectReduced =
			section.getAttribute( 'data-reduced-motion' ) !== '0';

		function clearTimer() {
			if ( timer ) {
				window.clearInterval( timer );
				timer = null;
			}
		}

		function startTimer() {
			clearTimer();
			if ( ! autoplay ) {
				return;
			}
			if ( respectReduced && prefersReducedMotion() ) {
				return;
			}
			timer = window.setInterval( function () {
				go( 1 );
			}, ms );
		}

		function restartTimer() {
			startTimer();
		}

		gallery.addEventListener( 'mouseenter', clearTimer );
		gallery.addEventListener( 'mouseleave', startTimer );
		gallery.addEventListener( 'focusin', clearTimer );
		gallery.addEventListener( 'focusout', startTimer );

		startTimer();
	}

	function initReveal( section ) {
		if ( section.getAttribute( 'data-animation' ) !== '1' ) {
			return;
		}
		if (
			section.getAttribute( 'data-reduced-motion' ) !== '0' &&
			prefersReducedMotion()
		) {
			return;
		}
		var targets = section.querySelectorAll(
			'.twork-about-staff-meal-gallery, .twork-about-staff-meal-feedback, .twork-about-staff-meal__quote'
		);
		if ( ! targets.length || ! ( 'IntersectionObserver' in window ) ) {
			return;
		}
		var delay =
			parseInt( section.getAttribute( 'data-animation-delay' ), 10 ) || 0;
		targets.forEach( function ( el, i ) {
			el.classList.add( 'asm-reveal' );
			el.style.transitionDelay = delay + i * 80 + 'ms';
		} );
		var observer = new IntersectionObserver(
			function ( entries ) {
				entries.forEach( function ( entry ) {
					if ( entry.isIntersecting ) {
						entry.target.classList.add( 'is-visible' );
						observer.unobserve( entry.target );
					}
				} );
			},
			{ threshold: 0.15 }
		);
		targets.forEach( function ( el ) {
			observer.observe( el );
		} );
	}

	function initSection( section ) {
		if ( section.dataset.asmBound === '1' ) {
			return;
		}
		section.dataset.asmBound = '1';
		initGallery( section );
		initReveal( section );
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

If reveal CSS for `.asm-reveal` / `.is-visible` is missing, add minimal rules to section `style.scss` (opacity/transform) or strip `initReveal` call to avoid dead code — prefer add 6–8 lines of reveal CSS matching endo fade-up.

- [ ] **Step 2: Register + map in twork-builder.php**

In `$scripts` array after endo-faq line:

```php
        'twork-about-staff-meal-init'     => 'about-staff-meal-init.js',
```

In `$block_script_map` after endo-faq map entry:

```php
        'twork/about-staff-meal-section'      => array('twork-about-staff-meal-init'),
```

- [ ] **Step 3: Build**

```bash
npm run build
```

Expected: exit 0.

- [ ] **Step 4: php -l**

```bash
php -l twork-builder.php
```

Expected: `No syntax errors detected`.

- [ ] **Step 5: Commit** — SKIP unless user asks

---

### Task 5: QA gate (separate `y` turn)

**Files:** none (verify only)

- [ ] **Step 1: Build**

```bash
npm run build
```

Expected: OK

- [ ] **Step 2: Lint JS (touched)**

```bash
npx wp-scripts lint-js src/about-staff-meal-section src/about-staff-meal-gallery src/about-staff-meal-gallery-item
```

Expected: no new errors (parity OK if only pre-existing editor-utils)

- [ ] **Step 3: Lint style**

```bash
npx wp-scripts lint-style "src/about-staff-meal-*/**/*.scss"
```

Expected: OK or fix introduced issues only

- [ ] **Step 4: Duplicate blocks**

```bash
node scripts/find-duplicate-block-names.mjs
```

Expected: OK

- [ ] **Step 5: Grep size regression**

```bash
rg "height:\\s*100%" src/about-staff-meal-gallery-item/style.scss
```

Expected: no matches on `img` rules

- [ ] **Step 6: Update progress.md** with QA JSON (`editor_smoke`: `NOT_RUN` unless user smoke-tested)

- [ ] **Step 7: Output 3-line PASS/FAIL JSON** per `.cursorrules` QA format

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Drop `height:100%` / aspect boxes | Task 1 |
| Appender / add-image UX | Task 1 |
| `slider` / `slideshow` enum | Task 2 |
| Autoplay attrs | Task 2 |
| Slider CSS + no-JS fallback | Task 3 |
| Editor no autoplay / stacked editable | Task 3 |
| Vanilla init + controls | Task 4 |
| Enqueue map | Task 4 |
| GIF via image MIME | No code change (already `allowedTypes: ['image']`) |
| Video out | Rejected — no task |
| QA checklist | Task 5 |

## Placeholder scan

None intentional. Commit steps gated on user ask.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-27-about-staff-meal-gallery-layouts.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — this session, executing-plans, checkpoints (maps cleanly to G1 → G2 → QA `y` gates)

**Which approach?** (or reply `y` for Inline → Builder **Task 1 / G1** only)
