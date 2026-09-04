# Endoscopy Icon Picker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **This repo also gates work:** Scout → Architect → Builder → QA → DevOps, **one step per user `y`**. Prefer Inline Execution mapped to those waves. Do not run Builder+QA in the same turn.
>
> **Commits:** Only when the user explicitly asks — skip “Commit” steps otherwise (user rule).

**Goal:** Replace Endoscopy icon-class TextControls with a shared Media + Dashicon visual grid picker across all editable endo icon slots (scope C).

**Architecture:** Add `src/shared/endo-icon-picker.js` (Inspector + attr helpers) and curated `ENDO_DASHICON_OPTIONS` in `select-options.js`. Render via existing `FlexibleIcon` from `block-helpers.js`. Wire additive attributes into each endo item/eyebrow/chip surface without changing FA-path save markup shape.

**Tech Stack:** Gutenberg (`@wordpress/block-editor`, `@wordpress/components`, `@wordpress/i18n`, `@wordpress/element`), `wp-scripts`, existing `@twork-builder/shared/*` and `@twork-builder/editor-utils` aliases.

**Spec SoT:** `docs/superpowers/specs/2026-08-29-endo-icon-picker-design.md`

## Global Constraints

- Text domain: `twork-builder`
- Endo slugs already in `SKIP_BLOCKS` — do **not** edit `scripts/sync-src-from-mk.py` for this feature
- Additive attributes only; default `iconType` / `*IconType` = `fontawesome`
- FA save branch must remain `<i className={…} aria-hidden="true" />` (or `FlexibleIcon` equivalent with same element/attrs) so existing posts validate
- No `deprecated` arrays in this wave
- No version bump / zip / `build/` commit
- Do not rewrite `centre-*` blocks
- Hardcoded decorative icons (stars, doctor chrome without Inspector fields) stay hardcoded
- Import shared modules as `@twork-builder/shared/endo-icon-picker` and `@twork-builder/shared/block-helpers`
- Verify with `npm run build` + `npx wp-scripts lint-js <paths>` — no Jest suite for these components in-repo

---

## File Structure

| Path | Responsibility |
|------|----------------|
| `src/shared/select-options.js` | Add `ENDO_DASHICON_OPTIONS` (reuse existing `ICON_TYPE_OPTIONS`) |
| `src/shared/endo-icon-picker.js` | `ICON_ATTR_KEYS`, `mapIconAttrs`, `iconPatch`, `hasIconValue`, `EndoIconPicker`, `EndoFlexibleIcon` |
| `src/shared/block-helpers.js` | Touch only if `FlexibleIcon` gaps found (should already cover all 4 types) |
| `src/endo-{hero-float-card,journey-step,condition-item,procedure-item,prep-group,cta-row}/` | Item icon slots (+ chips on procedure-item) |
| `src/endo-{hero,procedures,technology,journey,conditions,prep,team,testimonials,faq,cta}-section/` | Eyebrow (+ FAQ aside) slots |

---

### Task 1: Shared picker module

**Files:**
- Modify: `src/shared/select-options.js`
- Create: `src/shared/endo-icon-picker.js`
- Verify: `src/shared/block-helpers.js` `FlexibleIcon` (read-only unless bug)

**Interfaces:**
- Consumes: `ICON_TYPE_OPTIONS` from `select-options.js`; `FlexibleIcon` from `block-helpers.js`
- Produces:
  - `ENDO_DASHICON_OPTIONS: Array<{ value: string, label: string }>`
  - `DEFAULT_ICON_KEYS = { type:'iconType', fa:'iconClass', dashicon:'iconDashicon', imageUrl:'iconImageUrl', imageId:'iconImageId', videoUrl:'iconVideoUrl', videoId:'iconVideoId' }`
  - `eyebrowIconKeys()` / `asideButtonIconKeys()` returning remapped key objects
  - `mapIconAttrs( attributes, keys = DEFAULT_ICON_KEYS ) → { iconType, iconClass, iconDashicon, iconImageUrl, iconImageId, iconVideoUrl, iconVideoId }`
  - `iconPatch( keys, logicalPatch ) → attribute patch with remapped keys`
  - `hasIconValue( mapped ) → boolean`
  - `EndoIconPicker({ label, help, attributes, setAttributes, keys, showToggle, showToggleChecked, onToggle })`
  - `EndoFlexibleIcon({ attributes, keys, className })` — thin wrapper around `FlexibleIcon`

- [ ] **Step 1: Confirm FlexibleIcon covers all types**

Open `src/shared/block-helpers.js` `FlexibleIcon`. Confirm branches for `image`, `video`, `dashicon`, FA (`faClass`/`iconClass`). If any branch missing, add it before continuing. Do not change FA `<i>` element or `aria-hidden`.

- [ ] **Step 2: Add `ENDO_DASHICON_OPTIONS`**

In `src/shared/select-options.js`, after `DASHICON_OPTIONS`, append (curated ~50; values must be full `dashicons-*` class names):

```js
export const ENDO_DASHICON_OPTIONS = [
	{ value: 'dashicons-heart', label: __( 'Heart', 'twork-builder' ) },
	{ value: 'dashicons-plus-alt', label: __( 'Plus', 'twork-builder' ) },
	{ value: 'dashicons-yes', label: __( 'Yes', 'twork-builder' ) },
	{ value: 'dashicons-yes-alt', label: __( 'Yes alt', 'twork-builder' ) },
	{ value: 'dashicons-no', label: __( 'No', 'twork-builder' ) },
	{ value: 'dashicons-warning', label: __( 'Warning', 'twork-builder' ) },
	{ value: 'dashicons-info', label: __( 'Info', 'twork-builder' ) },
	{ value: 'dashicons-editor-help', label: __( 'Help', 'twork-builder' ) },
	{ value: 'dashicons-star-filled', label: __( 'Star', 'twork-builder' ) },
	{ value: 'dashicons-flag', label: __( 'Flag', 'twork-builder' ) },
	{ value: 'dashicons-location', label: __( 'Location', 'twork-builder' ) },
	{ value: 'dashicons-location-alt', label: __( 'Location alt', 'twork-builder' ) },
	{ value: 'dashicons-phone', label: __( 'Phone', 'twork-builder' ) },
	{ value: 'dashicons-email', label: __( 'Email', 'twork-builder' ) },
	{ value: 'dashicons-admin-users', label: __( 'Users', 'twork-builder' ) },
	{ value: 'dashicons-admin-user', label: __( 'User', 'twork-builder' ) },
	{ value: 'dashicons-groups', label: __( 'Groups', 'twork-builder' ) },
	{ value: 'dashicons-businessman', label: __( 'Businessman', 'twork-builder' ) },
	{ value: 'dashicons-calendar', label: __( 'Calendar', 'twork-builder' ) },
	{ value: 'dashicons-calendar-alt', label: __( 'Calendar alt', 'twork-builder' ) },
	{ value: 'dashicons-clock', label: __( 'Clock', 'twork-builder' ) },
	{ value: 'dashicons-backup', label: __( 'Backup / time', 'twork-builder' ) },
	{ value: 'dashicons-clipboard', label: __( 'Clipboard', 'twork-builder' ) },
	{ value: 'dashicons-media-document', label: __( 'Document', 'twork-builder' ) },
	{ value: 'dashicons-media-text', label: __( 'Text', 'twork-builder' ) },
	{ value: 'dashicons-portfolio', label: __( 'Portfolio', 'twork-builder' ) },
	{ value: 'dashicons-hammer', label: __( 'Hammer', 'twork-builder' ) },
	{ value: 'dashicons-admin-tools', label: __( 'Tools', 'twork-builder' ) },
	{ value: 'dashicons-admin-generic', label: __( 'Cog', 'twork-builder' ) },
	{ value: 'dashicons-admin-settings', label: __( 'Settings', 'twork-builder' ) },
	{ value: 'dashicons-performance', label: __( 'Performance', 'twork-builder' ) },
	{ value: 'dashicons-chart-bar', label: __( 'Chart bar', 'twork-builder' ) },
	{ value: 'dashicons-chart-line', label: __( 'Chart line', 'twork-builder' ) },
	{ value: 'dashicons-chart-area', label: __( 'Chart area', 'twork-builder' ) },
	{ value: 'dashicons-analytics', label: __( 'Analytics', 'twork-builder' ) },
	{ value: 'dashicons-visibility', label: __( 'Visibility', 'twork-builder' ) },
	{ value: 'dashicons-search', label: __( 'Search', 'twork-builder' ) },
	{ value: 'dashicons-filter', label: __( 'Filter', 'twork-builder' ) },
	{ value: 'dashicons-update', label: __( 'Update', 'twork-builder' ) },
	{ value: 'dashicons-migrate', label: __( 'Migrate', 'twork-builder' ) },
	{ value: 'dashicons-arrow-right-alt', label: __( 'Arrow right', 'twork-builder' ) },
	{ value: 'dashicons-arrow-right-alt2', label: __( 'Arrow right 2', 'twork-builder' ) },
	{ value: 'dashicons-arrow-left-alt', label: __( 'Arrow left', 'twork-builder' ) },
	{ value: 'dashicons-arrow-up-alt', label: __( 'Arrow up', 'twork-builder' ) },
	{ value: 'dashicons-arrow-down-alt', label: __( 'Arrow down', 'twork-builder' ) },
	{ value: 'dashicons-plus', label: __( 'Plus small', 'twork-builder' ) },
	{ value: 'dashicons-minus', label: __( 'Minus', 'twork-builder' ) },
	{ value: 'dashicons-dismiss', label: __( 'Dismiss', 'twork-builder' ) },
	{ value: 'dashicons-marker', label: __( 'Marker', 'twork-builder' ) },
	{ value: 'dashicons-tag', label: __( 'Tag', 'twork-builder' ) },
	{ value: 'dashicons-category', label: __( 'Category', 'twork-builder' ) },
	{ value: 'dashicons-building', label: __( 'Building', 'twork-builder' ) },
	{ value: 'dashicons-store', label: __( 'Store', 'twork-builder' ) },
	{ value: 'dashicons-cart', label: __( 'Cart', 'twork-builder' ) },
	{ value: 'dashicons-shield', label: __( 'Shield', 'twork-builder' ) },
	{ value: 'dashicons-lock', label: __( 'Lock', 'twork-builder' ) },
	{ value: 'dashicons-unlock', label: __( 'Unlock', 'twork-builder' ) },
	{ value: 'dashicons-awards', label: __( 'Awards', 'twork-builder' ) },
	{ value: 'dashicons-smiley', label: __( 'Smiley', 'twork-builder' ) },
	{ value: 'dashicons-format-image', label: __( 'Image', 'twork-builder' ) },
	{ value: 'dashicons-format-video', label: __( 'Video', 'twork-builder' ) },
	{ value: 'dashicons-video-alt3', label: __( 'Video alt', 'twork-builder' ) },
	{ value: 'dashicons-microphone', label: __( 'Microphone', 'twork-builder' ) },
	{ value: 'dashicons-megaphone', label: __( 'Megaphone', 'twork-builder' ) },
	{ value: 'dashicons-lightbulb', label: __( 'Lightbulb', 'twork-builder' ) },
	{ value: 'dashicons-sos', label: __( 'SOS', 'twork-builder' ) },
	{ value: 'dashicons-tickets-alt', label: __( 'Tickets', 'twork-builder' ) },
	{ value: 'dashicons-universal-access', label: __( 'Accessibility', 'twork-builder' ) },
	{ value: 'dashicons-universal-access-alt', label: __( 'Accessibility alt', 'twork-builder' ) },
];
```

- [ ] **Step 3: Create `endo-icon-picker.js`**

Create `src/shared/endo-icon-picker.js` with the full module below (do not truncate):

```js
/**
 * Endoscopy shared icon Inspector + attr helpers.
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
	MediaUpload,
	MediaUploadCheck,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	SelectControl,
	TextControl,
	TextControl as SearchControl,
} from '@wordpress/components';
import { FlexibleIcon } from '@twork-builder/shared/block-helpers';
import {
	ICON_TYPE_OPTIONS,
	ENDO_DASHICON_OPTIONS,
} from '@twork-builder/shared/select-options';

export const DEFAULT_ICON_KEYS = {
	type: 'iconType',
	fa: 'iconClass',
	dashicon: 'iconDashicon',
	imageUrl: 'iconImageUrl',
	imageId: 'iconImageId',
	videoUrl: 'iconVideoUrl',
	videoId: 'iconVideoId',
};

export function eyebrowIconKeys() {
	return {
		type: 'eyebrowIconType',
		fa: 'eyebrowIcon',
		dashicon: 'eyebrowIconDashicon',
		imageUrl: 'eyebrowIconImageUrl',
		imageId: 'eyebrowIconImageId',
		videoUrl: 'eyebrowIconVideoUrl',
		videoId: 'eyebrowIconVideoId',
	};
}

export function asideButtonIconKeys() {
	return {
		type: 'asideButtonIconType',
		fa: 'asideButtonIcon',
		dashicon: 'asideButtonIconDashicon',
		imageUrl: 'asideButtonIconImageUrl',
		imageId: 'asideButtonIconImageId',
		videoUrl: 'asideButtonIconVideoUrl',
		videoId: 'asideButtonIconVideoId',
	};
}

export function mapIconAttrs( attributes = {}, keys = DEFAULT_ICON_KEYS ) {
	return {
		iconType: attributes[ keys.type ] || 'fontawesome',
		iconClass: attributes[ keys.fa ] || '',
		iconDashicon: attributes[ keys.dashicon ] || '',
		iconImageUrl: attributes[ keys.imageUrl ] || '',
		iconImageId: attributes[ keys.imageId ] || 0,
		iconVideoUrl: attributes[ keys.videoUrl ] || '',
		iconVideoId: attributes[ keys.videoId ] || 0,
	};
}

export function iconPatch( keys, logicalPatch ) {
	const out = {};
	if ( Object.prototype.hasOwnProperty.call( logicalPatch, 'iconType' ) ) {
		out[ keys.type ] = logicalPatch.iconType;
	}
	if ( Object.prototype.hasOwnProperty.call( logicalPatch, 'iconClass' ) ) {
		out[ keys.fa ] = logicalPatch.iconClass;
	}
	if ( Object.prototype.hasOwnProperty.call( logicalPatch, 'iconDashicon' ) ) {
		out[ keys.dashicon ] = logicalPatch.iconDashicon;
	}
	if ( Object.prototype.hasOwnProperty.call( logicalPatch, 'iconImageUrl' ) ) {
		out[ keys.imageUrl ] = logicalPatch.iconImageUrl;
	}
	if ( Object.prototype.hasOwnProperty.call( logicalPatch, 'iconImageId' ) ) {
		out[ keys.imageId ] = logicalPatch.iconImageId;
	}
	if ( Object.prototype.hasOwnProperty.call( logicalPatch, 'iconVideoUrl' ) ) {
		out[ keys.videoUrl ] = logicalPatch.iconVideoUrl;
	}
	if ( Object.prototype.hasOwnProperty.call( logicalPatch, 'iconVideoId' ) ) {
		out[ keys.videoId ] = logicalPatch.iconVideoId;
	}
	return out;
}

export function hasIconValue( mapped ) {
	const type = mapped.iconType || 'fontawesome';
	if ( type === 'image' ) {
		return Boolean( mapped.iconImageUrl );
	}
	if ( type === 'video' ) {
		return Boolean( mapped.iconVideoUrl );
	}
	if ( type === 'dashicon' ) {
		return Boolean( mapped.iconDashicon );
	}
	return Boolean( mapped.iconClass );
}

export function EndoFlexibleIcon( {
	attributes,
	keys = DEFAULT_ICON_KEYS,
	className = '',
} ) {
	const m = mapIconAttrs( attributes, keys );
	if ( ! hasIconValue( m ) ) {
		return null;
	}
	return (
		<FlexibleIcon
			iconType={ m.iconType }
			iconClass={ m.iconClass }
			dashicon={ m.iconDashicon }
			imageUrl={ m.iconImageUrl }
			videoUrl={ m.iconVideoUrl }
			className={ className }
		/>
	);
}

function DashiconGrid( { value, onSelect } ) {
	const [ query, setQuery ] = useState( '' );
	const q = query.trim().toLowerCase();
	const options = ENDO_DASHICON_OPTIONS.filter( ( opt ) => {
		if ( ! q ) {
			return true;
		}
		return (
			opt.label.toLowerCase().includes( q ) ||
			opt.value.toLowerCase().includes( q )
		);
	} );

	return (
		<div className="twork-endo-icon-picker__dashgrid">
			<TextControl
				label={ __( 'Search icons', 'twork-builder' ) }
				value={ query }
				onChange={ setQuery }
			/>
			<div
				role="listbox"
				aria-label={ __( 'WordPress icons', 'twork-builder' ) }
				style={ {
					display: 'grid',
					gridTemplateColumns: 'repeat(6, 1fr)',
					gap: 4,
					maxHeight: 220,
					overflowY: 'auto',
					marginTop: 8,
				} }
			>
				{ options.map( ( opt ) => {
					const selected = value === opt.value;
					return (
						<button
							key={ opt.value }
							type="button"
							role="option"
							aria-selected={ selected }
							title={ opt.label }
							onClick={ () => onSelect( opt.value ) }
							style={ {
								padding: 6,
								border: selected
									? '2px solid #2271b1'
									: '1px solid #ddd',
								background: selected ? '#f0f6fc' : '#fff',
								cursor: 'pointer',
							} }
						>
							<span
								className={ `dashicons ${ opt.value }` }
								aria-hidden="true"
							/>
							<span className="screen-reader-text">
								{ opt.label }
							</span>
						</button>
					);
				} ) }
			</div>
		</div>
	);
}

/**
 * @param {Object} props
 * @param {string} [props.label]
 * @param {string} [props.help]
 * @param {Object} props.attributes
 * @param {Function} props.setAttributes
 * @param {Object} [props.keys]
 */
export function EndoIconPicker( {
	label = __( 'Icon', 'twork-builder' ),
	help,
	attributes,
	setAttributes,
	keys = DEFAULT_ICON_KEYS,
} ) {
	const m = mapIconAttrs( attributes, keys );
	const type = m.iconType || 'fontawesome';
	const apply = ( logicalPatch ) => {
		setAttributes( iconPatch( keys, logicalPatch ) );
	};

	return (
		<BaseControl label={ label } help={ help }>
			<SelectControl
				label={ __( 'Icon type', 'twork-builder' ) }
				value={ type }
				options={ ICON_TYPE_OPTIONS }
				onChange={ ( v ) => apply( { iconType: v } ) }
			/>
			{ type === 'fontawesome' && (
				<TextControl
					label={ __( 'Font Awesome class', 'twork-builder' ) }
					value={ m.iconClass }
					onChange={ ( v ) => apply( { iconClass: v } ) }
					help={ __(
						'Optional legacy. Prefer WordPress icon, image, or video.',
						'twork-builder'
					) }
				/>
			) }
			{ type === 'dashicon' && (
				<DashiconGrid
					value={ m.iconDashicon || 'dashicons-heart' }
					onSelect={ ( v ) =>
						apply( {
							iconType: 'dashicon',
							iconDashicon: v,
						} )
					}
				/>
			) }
			{ type === 'image' && (
				<>
					{ ! m.iconImageUrl ? (
						<MediaPlaceholder
							onSelect={ ( media ) =>
								apply( {
									iconType: 'image',
									iconImageUrl: media.url,
									iconImageId: media.id,
								} )
							}
							allowedTypes={ [ 'image' ] }
							multiple={ false }
							labels={ {
								title: __( 'Icon image / GIF', 'twork-builder' ),
							} }
						/>
					) : (
						<div>
							<img
								src={ m.iconImageUrl }
								alt=""
								style={ {
									maxWidth: '100%',
									height: 'auto',
									marginBottom: 8,
								} }
							/>
							<Button
								variant="secondary"
								isSmall
								onClick={ () =>
									apply( {
										iconImageUrl: '',
										iconImageId: 0,
									} )
								}
							>
								{ __( 'Remove', 'twork-builder' ) }
							</Button>
						</div>
					) }
				</>
			) }
			{ type === 'video' && (
				<>
					{ ! m.iconVideoUrl ? (
						<MediaPlaceholder
							onSelect={ ( media ) =>
								apply( {
									iconType: 'video',
									iconVideoUrl: media.url,
									iconVideoId: media.id,
								} )
							}
							allowedTypes={ [ 'video' ] }
							multiple={ false }
							labels={ {
								title: __( 'Icon video', 'twork-builder' ),
							} }
						/>
					) : (
						<div>
							<video
								src={ m.iconVideoUrl }
								muted
								loop
								playsInline
								style={ {
									maxWidth: '100%',
									marginBottom: 8,
								} }
							/>
							<Button
								variant="secondary"
								isSmall
								onClick={ () =>
									apply( {
										iconVideoUrl: '',
										iconVideoId: 0,
									} )
								}
							>
								{ __( 'Remove', 'twork-builder' ) }
							</Button>
						</div>
					) }
				</>
			) }
		</BaseControl>
	);
}

// Silence unused import if MediaUpload unused in v1 — prefer MediaPlaceholder above.
void MediaUpload;
void MediaUploadCheck;
void SearchControl;
```

Remove the `void MediaUpload` / unused imports before shipping — use only what is needed (`MediaPlaceholder`, `TextControl`, etc.). Do not leave dead imports (lint will fail).

- [ ] **Step 4: Syntax / lint shared module**

Run:

```bash
npx wp-scripts lint-js src/shared/endo-icon-picker.js src/shared/select-options.js
```

Expected: exit 0 (or only pre-existing baseline alias warnings unrelated to these files).

- [ ] **Step 5: Commit (only if user asked)**

```bash
git add src/shared/endo-icon-picker.js src/shared/select-options.js
git commit -m "$(cat <<'EOF'
feat(endo): add shared EndoIconPicker and dashicon options

EOF
)"
```

---

### Task 2: Wire item blocks (no chips) — reference `endo-cta-row` then clone pattern

**Files:**
- Modify: `src/endo-cta-row/{block.json,edit.js,save.js}`
- Modify: `src/endo-hero-float-card/{block.json,edit.js,save.js}`
- Modify: `src/endo-journey-step/{block.json,edit.js,save.js}`
- Modify: `src/endo-condition-item/{block.json,edit.js,save.js}`
- Modify: `src/endo-prep-group/{block.json,edit.js,save.js}`

**Interfaces:**
- Consumes: `EndoIconPicker`, `EndoFlexibleIcon`, `DEFAULT_ICON_KEYS`, `hasIconValue`, `mapIconAttrs` from `@twork-builder/shared/endo-icon-picker`
- Produces: Item blocks with additive icon attrs; Inspector uses picker; canvas/save use `EndoFlexibleIcon`

**Standard `block.json` attrs to add** (after existing `iconClass`):

```json
"iconType": { "type": "string", "default": "fontawesome" },
"iconDashicon": { "type": "string", "default": "" },
"iconImageUrl": { "type": "string", "default": "" },
"iconImageId": { "type": "number", "default": 0 },
"iconVideoUrl": { "type": "string", "default": "" },
"iconVideoId": { "type": "number", "default": 0 }
```

- [ ] **Step 1: Update `endo-cta-row/block.json`**

Add the six attributes above next to `iconClass`. Keep `iconClass` default `"fas fa-clock"`.

- [ ] **Step 2: Update `endo-cta-row/edit.js`**

Replace Icon Class `TextControl` block with:

```jsx
import {
	EndoIconPicker,
	EndoFlexibleIcon,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';
```

Inside Inspector, when `showIcon !== false`:

```jsx
<EndoIconPicker
	label={ __( 'Icon', 'twork-builder' ) }
	attributes={ attributes }
	setAttributes={ setAttributes }
/>
```

Canvas replace:

```jsx
{ showIcon !== false && hasIconValue( mapIconAttrs( attributes ) ) && (
	<EndoFlexibleIcon attributes={ attributes } />
) }
```

Remove unused `TextControl` import if no longer needed.

- [ ] **Step 3: Update `endo-cta-row/save.js`**

```jsx
import {
	EndoFlexibleIcon,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';
```

Replace the `<i className={ iconClass } …>` branch with:

```jsx
{ showIcon !== false && hasIconValue( mapIconAttrs( attributes ) ) && (
	<EndoFlexibleIcon attributes={ attributes } />
) }
```

Keep surrounding structure identical. For FA default content, `EndoFlexibleIcon` → `FlexibleIcon` must still emit `<i class="fas fa-clock" aria-hidden="true"></i>`.

- [ ] **Step 4: Repeat Steps 1–3 for the other four item blocks**

| Block | Keep wrapper around icon? |
|-------|---------------------------|
| `endo-hero-float-card` | Yes — keep `.fc-icon` div + colors; only replace inner `<i>` with `<EndoFlexibleIcon />`; gate with `hasIconValue` |
| `endo-journey-step` | Match existing wrapper if any |
| `endo-condition-item` | Direct replace like cta-row |
| `endo-prep-group` | Direct replace; leave listStyle xmark/check logic untouched |

For each: add attrs to `block.json`; swap Inspector TextControl → `EndoIconPicker`; swap save/edit `<i className={iconClass}>` → `EndoFlexibleIcon` gated by `hasIconValue`.

- [ ] **Step 5: Smoke lint**

```bash
npx wp-scripts lint-js \
  src/endo-cta-row/edit.js src/endo-cta-row/save.js \
  src/endo-hero-float-card/edit.js src/endo-hero-float-card/save.js \
  src/endo-journey-step/edit.js src/endo-journey-step/save.js \
  src/endo-condition-item/edit.js src/endo-condition-item/save.js \
  src/endo-prep-group/edit.js src/endo-prep-group/save.js
```

Expected: exit 0 (ignore known `@twork-builder/editor-utils` unresolved baseline if it appears).

- [ ] **Step 6: Commit (only if user asked)**

```bash
git add src/endo-cta-row src/endo-hero-float-card src/endo-journey-step src/endo-condition-item src/endo-prep-group
git commit -m "$(cat <<'EOF'
feat(endo): wire EndoIconPicker on item icon blocks

EOF
)"
```

---

### Task 3: `endo-procedure-item` card icon + chips

**Files:**
- Modify: `src/endo-procedure-item/{block.json,edit.js,save.js}`

**Interfaces:**
- Consumes: same shared helpers; chips use logical keys inside each chip object (no prefix remap)
- Produces: Card-level attrs + chip objects supporting `iconType` / media / dashicon

- [ ] **Step 1: Extend `block.json` card attrs**

Add the same six additive attrs next to card `iconClass`. Do **not** change chip schema in `block.json` if chips are a freeform array — document chip keys in code defaults only.

- [ ] **Step 2: Card Inspector + render**

Same as Task 2 for the card-level `iconClass` TextControl → `EndoIconPicker` / `EndoFlexibleIcon`.

- [ ] **Step 3: Chip Inspector**

Where chip `iconClass` TextControl exists, replace with a chip-scoped picker. Because chips are array items (not block attributes), pass a synthetic attributes object and custom setter:

```jsx
<EndoIconPicker
	label={ __( 'Chip icon', 'twork-builder' ) }
	attributes={ {
		iconType: chip.iconType || 'fontawesome',
		iconClass: chip.iconClass || '',
		iconDashicon: chip.iconDashicon || '',
		iconImageUrl: chip.iconImageUrl || '',
		iconImageId: chip.iconImageId || 0,
		iconVideoUrl: chip.iconVideoUrl || '',
		iconVideoId: chip.iconVideoId || 0,
	} }
	setAttributes={ ( patch ) => updateChip( index, patch ) }
/>
```

`updateChip` must merge `patch` into that chip only (spread), never replace the whole chips array incorrectly.

- [ ] **Step 4: Chip canvas + save render**

Replace `{ chip.iconClass && <i className={ chip.iconClass } /> }` with:

```jsx
{ hasIconValue( mapIconAttrs( chip ) ) && (
	<EndoFlexibleIcon attributes={ chip } />
) }
```

(`mapIconAttrs(chip)` works because chip uses default key names.)

- [ ] **Step 5: Lint procedure-item**

```bash
npx wp-scripts lint-js src/endo-procedure-item/edit.js src/endo-procedure-item/save.js
```

- [ ] **Step 6: Commit (only if user asked)**

```bash
git add src/endo-procedure-item
git commit -m "$(cat <<'EOF'
feat(endo): EndoIconPicker on procedure card and chips

EOF
)"
```

---

### Task 4: Section eyebrow icons (9 sections, FAQ aside in Task 5)

**Files:**
- Modify each: `block.json`, `edit.js`, `save.js` for:
  - `endo-hero-section`
  - `endo-procedures-section`
  - `endo-technology-section`
  - `endo-journey-section`
  - `endo-conditions-section`
  - `endo-prep-section`
  - `endo-team-section`
  - `endo-testimonials-section`
  - `endo-cta-section`

**Interfaces:**
- Consumes: `EndoIconPicker`, `EndoFlexibleIcon`, `eyebrowIconKeys`, `hasIconValue`, `mapIconAttrs`
- Produces: Additive `eyebrowIconType` + media/dashicon attrs; `eyebrowIcon` remains FA string

**Standard eyebrow attrs to add** (keep existing `eyebrowIcon`):

```json
"eyebrowIconType": { "type": "string", "default": "fontawesome" },
"eyebrowIconDashicon": { "type": "string", "default": "" },
"eyebrowIconImageUrl": { "type": "string", "default": "" },
"eyebrowIconImageId": { "type": "number", "default": 0 },
"eyebrowIconVideoUrl": { "type": "string", "default": "" },
"eyebrowIconVideoId": { "type": "number", "default": 0 }
```

- [ ] **Step 1: Per section `block.json`**

Add the six attrs next to `eyebrowIcon` in every section listed above.

- [ ] **Step 2: Per section `edit.js` Inspector**

Find the `TextControl` bound to `eyebrowIcon` (label often “Eyebrow Icon” / “Icon Class”). Replace with:

```jsx
import {
	EndoIconPicker,
	EndoFlexibleIcon,
	eyebrowIconKeys,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

const EYEBROW_KEYS = eyebrowIconKeys();

<EndoIconPicker
	label={ __( 'Eyebrow icon', 'twork-builder' ) }
	attributes={ attributes }
	setAttributes={ setAttributes }
	keys={ EYEBROW_KEYS }
/>
```

- [ ] **Step 3: Per section canvas + `save.js`**

Replace:

```jsx
{ eyebrowIcon && <i className={ eyebrowIcon } aria-hidden="true" /> }
```

with:

```jsx
{ hasIconValue( mapIconAttrs( attributes, EYEBROW_KEYS ) ) && (
	<EndoFlexibleIcon attributes={ attributes } keys={ EYEBROW_KEYS } />
) }
```

Define `EYEBROW_KEYS` in both edit and save (or import once per file).

- [ ] **Step 4: Lint all nine sections**

```bash
npx wp-scripts lint-js \
  src/endo-hero-section/edit.js src/endo-hero-section/save.js \
  src/endo-procedures-section/edit.js src/endo-procedures-section/save.js \
  src/endo-technology-section/edit.js src/endo-technology-section/save.js \
  src/endo-journey-section/edit.js src/endo-journey-section/save.js \
  src/endo-conditions-section/edit.js src/endo-conditions-section/save.js \
  src/endo-prep-section/edit.js src/endo-prep-section/save.js \
  src/endo-team-section/edit.js src/endo-team-section/save.js \
  src/endo-testimonials-section/edit.js src/endo-testimonials-section/save.js \
  src/endo-cta-section/edit.js src/endo-cta-section/save.js
```

- [ ] **Step 5: Commit (only if user asked)**

```bash
git add src/endo-hero-section src/endo-procedures-section src/endo-technology-section \
  src/endo-journey-section src/endo-conditions-section src/endo-prep-section \
  src/endo-team-section src/endo-testimonials-section src/endo-cta-section
git commit -m "$(cat <<'EOF'
feat(endo): EndoIconPicker on section eyebrow icons

EOF
)"
```

---

### Task 5: FAQ section eyebrow + aside button icon

**Files:**
- Modify: `src/endo-faq-section/{block.json,edit.js,save.js}`

**Interfaces:**
- Consumes: `eyebrowIconKeys`, `asideButtonIconKeys`, picker + flexible icon
- Produces: Both slots wired

- [ ] **Step 1: `block.json` attrs**

Add eyebrow six attrs (Task 4) **and** aside six:

```json
"asideButtonIconType": { "type": "string", "default": "fontawesome" },
"asideButtonIconDashicon": { "type": "string", "default": "" },
"asideButtonIconImageUrl": { "type": "string", "default": "" },
"asideButtonIconImageId": { "type": "number", "default": 0 },
"asideButtonIconVideoUrl": { "type": "string", "default": "" },
"asideButtonIconVideoId": { "type": "number", "default": 0 }
```

Keep existing `eyebrowIcon` and `asideButtonIcon` defaults.

- [ ] **Step 2: `edit.js`**

Replace both icon TextControls with two `EndoIconPicker`s (`keys={ eyebrowIconKeys() }` and `keys={ asideButtonIconKeys() }`). Replace canvas `<i className={ eyebrowIcon|asideButtonIcon }>` with `EndoFlexibleIcon` + `hasIconValue` gates.

- [ ] **Step 3: `save.js`**

Same render swap for both slots.

- [ ] **Step 4: Lint**

```bash
npx wp-scripts lint-js src/endo-faq-section/edit.js src/endo-faq-section/save.js
```

- [ ] **Step 5: Commit (only if user asked)**

```bash
git add src/endo-faq-section
git commit -m "$(cat <<'EOF'
feat(endo): EndoIconPicker on FAQ eyebrow and aside button

EOF
)"
```

---

### Task 6: Build + QA evidence (workflow QA step)

**Files:** none new — verify only

- [ ] **Step 1: Build**

```bash
npm run build
```

Expected: exit 0. Note any unrelated sass deprecations; do not “fix” unrelated blocks.

- [ ] **Step 2: Spot-check built block.json**

Confirm additive attrs appear in `build/endo-cta-row/block.json` and `build/endo-faq-section/block.json`.

- [ ] **Step 3: Manual editor checklist (human or browser)**

1. Insert/select `endo-cta-row` — type Dashicon → grid pick → canvas shows dashicon  
2. Type Image → pick media → remove  
3. Type Video → pick → muted preview  
4. Type FA → existing class still works  
5. Re-open a page that already had FA endoscopy content — no validation error  
6. Procedure chip: change one chip icon type; sibling chips unchanged  
7. FAQ aside + one section eyebrow: Dashicon path on FE after save

- [ ] **Step 4: Update `progress.md` QA JSON**

```json
{
  "status": "PASS|FAIL",
  "phase": "endo-icon-picker",
  "build": "OK|FAIL",
  "lint_js": "OK|FAIL",
  "editor_smoke": "NOT_RUN|PASS|FAIL",
  "validation_legacy_fa": "NOT_RUN|PASS|FAIL",
  "errors": 0
}
```

- [ ] **Step 5: Update `active_context.md`** Done / Next / Not verified

Do **not** claim Visual PASS without editor evidence.

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Shared EndoIconPicker | Task 1 |
| Dashicon visual searchable grid | Task 1 |
| Image + video Media Library | Task 1 |
| FA legacy type | Task 1 |
| `FlexibleIcon` render | Task 1–5 |
| Item slots (6) | Tasks 2–3 |
| Procedure chips | Task 3 |
| Eyebrows (10) | Tasks 4–5 |
| FAQ aside | Task 5 |
| Additive attrs / no deprecated | All wire tasks |
| QA checklist | Task 6 |
| No version bump / centre-* | Global Constraints |

**Placeholder scan:** none intentionally left.  
**Type consistency:** logical keys always `iconType`/`iconClass`/`iconDashicon`/`iconImageUrl`/`iconImageId`/`iconVideoUrl`/`iconVideoId`; remapped only via `keys` objects from `eyebrowIconKeys` / `asideButtonIconKeys` / `DEFAULT_ICON_KEYS`.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-29-endo-icon-picker.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — this session, executing-plans, checkpoints; maps to repo `y` gates (Task 1 Builder → user `y` → Task 2 … → Task 6 = QA)

Which approach?
