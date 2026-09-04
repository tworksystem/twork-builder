# Endoscopy Prep Tabs CRUD Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **This repo also gates work:** Scout → Architect → Builder → QA → DevOps, **one step per user `y`**. Prefer Inline Execution mapped to those waves. Do not run Builder+QA in the same turn.
>
> **Commits:** Only when the user explicitly asks — skip “Commit” steps otherwise (user rule).

**Goal:** Let editors Add / Rename / Reorder / Delete / Set-default Prep tabs from the `endo-prep-section` Inspector without selecting hidden canvas tab blocks.

**Architecture:** Keep `twork/endo-prep-tab` InnerBlocks as SoT. Add pure helpers + an Inspector panel that calls `core/block-editor` (`insertBlock`, `updateBlockAttributes`, `moveBlockToPosition`, `removeBlock`, `selectBlock`). Reuse `setEndoPrepActivePanel` for canvas panel visibility. No section-level tabs attribute array; no save markup / deprecation.

**Tech Stack:** Gutenberg `@wordpress/block-editor`, `@wordpress/blocks` (`createBlock`), `@wordpress/components`, `@wordpress/data`, `@wordpress/i18n`, `@wordpress/notices`; alias `@twork-builder/shared/*`; `wp-scripts`.

**Spec SoT:** `docs/superpowers/specs/2026-08-30-endo-prep-tabs-crud-design.md`

## Global Constraints

- Text domain: `twork-builder`
- `endo-prep-section` / `endo-prep-tab` / `endo-prep-group` already in `SKIP_BLOCKS` — do **not** edit `scripts/sync-src-from-mk.py`
- No `block.json` attribute schema changes · no `deprecated` arrays
- No FE rewrite of `assets/js/endo-prep-init.js`
- Forbid deleting the last remaining `twork/endo-prep-tab` (count by block name, not `showTab`)
- Exactly one `isDefaultActive: true` among tabs with `showTab !== false` after mutations that touch default
- `panelKey` sanitize to `[a-z0-9-]+`; uniquify among sibling prep-tabs
- Renaming `tabLabel` must **not** auto-rewrite `panelKey`
- No version bump / zip / `build/` commit
- Verify: `npm run build` + `npx wp-scripts lint-js` on touched paths — no Jest suite for these components in-repo

---

## File Structure

| Path | Responsibility |
|------|----------------|
| `src/shared/endo-prep-tab-ops.js` | Pure slug/uniquify helpers + `createPrepTabBlock()` factory |
| `src/shared/endo-prep-tabs-inspector.js` | `EndoPrepTabsInspector` PanelBody UI + dispatch wiring |
| `src/endo-prep-section/edit.js` | Mount inspector; split `tabs` (visible) vs `allTabs` (Inspector list) |
| Unchanged | `endo-prep-tab/edit.js`, `endo-prep-ui.js`, `endo-prep-init.js`, `block.json`s |

---

### Task 1: Pure tab ops helpers

**Files:**
- Create: `src/shared/endo-prep-tab-ops.js`

**Interfaces:**
- Produces:
  - `slugifyPanelKey( raw: string ): string` — lowercase, non `[a-z0-9]` → `-`, collapse dashes, trim; empty → `'tab'`
  - `uniquePanelKey( base: string, takenKeys: string[], ignoreKey?: string ): string` — if `base` free (or equals `ignoreKey`) return it; else `base-2`, `base-3`, …
  - `createPrepTabBlock( { tabLabel, panelKey, isDefaultActive } ): Block` — `createBlock( 'twork/endo-prep-tab', attrs, [ createBlock( 'twork/endo-prep-group', { groupTitle: 'Checklist group', items: [ { showItem: true, text: '', listStyle: 'check' } ] } ) ] )`

- [ ] **Step 1: Add helper module**

```js
/**
 * Prep tab create/slug helpers (editor).
 */
import { createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * @param {string} raw Raw label or key.
 * @return {string} Slug safe for panelKey / #panel-*.
 */
export function slugifyPanelKey( raw ) {
	const slug = String( raw || '' )
		.toLowerCase()
		.replace( /[^a-z0-9]+/g, '-' )
		.replace( /^-+|-+$/g, '' )
		.replace( /-{2,}/g, '-' );
	return slug || 'tab';
}

/**
 * @param {string}   base      Desired key (already slugified preferred).
 * @param {string[]} takenKeys Sibling panelKeys.
 * @param {string}   [ignoreKey] Key belonging to the row being edited.
 * @return {string} Unique key.
 */
export function uniquePanelKey( base, takenKeys, ignoreKey ) {
	const root = slugifyPanelKey( base );
	const taken = new Set(
		( takenKeys || [] ).filter( ( key ) => key && key !== ignoreKey )
	);
	if ( ! taken.has( root ) ) {
		return root;
	}
	let n = 2;
	while ( taken.has( `${ root }-${ n }` ) ) {
		n += 1;
	}
	return `${ root }-${ n }`;
}

/**
 * @param {Object}  opts
 * @param {string}  opts.tabLabel
 * @param {string}  opts.panelKey
 * @param {boolean} [opts.isDefaultActive]
 * @return {Object} Gutenberg block object.
 */
export function createPrepTabBlock( {
	tabLabel,
	panelKey,
	isDefaultActive = false,
} ) {
	const group = createBlock( 'twork/endo-prep-group', {
		groupTitle: __( 'Checklist group', 'twork-builder' ),
		items: [
			{
				showItem: true,
				text: '',
				listStyle: 'check',
			},
		],
	} );
	return createBlock(
		'twork/endo-prep-tab',
		{
			showTab: true,
			tabLabel,
			panelKey,
			isDefaultActive: isDefaultActive === true,
		},
		[ group ]
	);
}
```

- [ ] **Step 2: Smoke-check helpers in Node (no Jest)**

Run:

```bash
node -e "
const { pathToFileURL } = require('url');
// wp-scripts ESM may not load; instead assert via quick regex copy:
function slugifyPanelKey(raw){const s=String(raw||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').replace(/-{2,}/g,'-');return s||'tab'}
function uniquePanelKey(base,taken,ignore){const root=slugifyPanelKey(base);const t=new Set((taken||[]).filter(k=>k&&k!==ignore));if(!t.has(root))return root;let n=2;while(t.has(root+'-'+n))n++;return root+'-'+n}
console.assert(slugifyPanelKey('Before!')==='before');
console.assert(uniquePanelKey('before',['before','during'])==='before-2');
console.assert(uniquePanelKey('before',['before'],'before')==='before');
console.log('ok');
"
```

Expected: `ok`

- [ ] **Step 3: Commit** — skip unless user asks

---

### Task 2: `EndoPrepTabsInspector` panel

**Files:**
- Create: `src/shared/endo-prep-tabs-inspector.js`

**Interfaces:**
- Consumes: helpers from Task 1; `setEndoPrepActivePanel` from `@twork-builder/shared/endo-prep-ui`
- Produces: `EndoPrepTabsInspector( { sectionClientId, allTabs, onActivatePanel } )`
  - `allTabs: Array<{ clientId, panelKey, tabLabel, isDefaultActive, showTab }>` — **all** prep-tab children (including `showTab === false`)
  - `onActivatePanel( panelKey )` — parent sets local `activePanelKey` state

- [ ] **Step 1: Implement inspector**

```js
/**
 * Section Inspector — Prep tabs CRUD via InnerBlocks ops.
 */
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Button,
} from '@wordpress/components';
import {
	createPrepTabBlock,
	slugifyPanelKey,
	uniquePanelKey,
} from '@twork-builder/shared/endo-prep-tab-ops';
import { setEndoPrepActivePanel } from '@twork-builder/shared/endo-prep-ui';

/**
 * @param {Object}   props
 * @param {string}   props.sectionClientId
 * @param {Array}    props.allTabs
 * @param {Function} props.onActivatePanel
 */
export default function EndoPrepTabsInspector( {
	sectionClientId,
	allTabs,
	onActivatePanel,
} ) {
	const {
		insertBlock,
		updateBlockAttributes,
		moveBlockToPosition,
		removeBlock,
		selectBlock,
	} = useDispatch( 'core/block-editor' );
	const { createNotice } = useDispatch( 'core/notices' );

	const blockIndexById = useSelect(
		( select ) => {
			const { getBlockIndex } = select( 'core/block-editor' );
			const map = {};
			( allTabs || [] ).forEach( ( tab ) => {
				map[ tab.clientId ] = getBlockIndex(
					tab.clientId,
					sectionClientId
				);
			} );
			return map;
		},
		[ allTabs, sectionClientId ]
	);

	const takenKeys = ( allTabs || [] ).map( ( t ) => t.panelKey );

	function ensureSingleDefault( preferClientId ) {
		const visible = ( allTabs || [] ).filter(
			( t ) => t.showTab !== false
		);
		if ( ! visible.length ) {
			return;
		}
		const preferred =
			visible.find( ( t ) => t.clientId === preferClientId ) ||
			visible.find( ( t ) => t.isDefaultActive ) ||
			visible[ 0 ];
		visible.forEach( ( t ) => {
			const next = t.clientId === preferred.clientId;
			if ( t.isDefaultActive !== next ) {
				updateBlockAttributes( t.clientId, {
					isDefaultActive: next,
				} );
			}
		} );
	}

	function openTab( tab ) {
		selectBlock( tab.clientId );
		onActivatePanel( tab.panelKey );
		setEndoPrepActivePanel( sectionClientId, tab.panelKey );
	}

	function addTab() {
		const n = ( allTabs || [] ).length + 1;
		const label = `Tab ${ n }`;
		const panelKey = uniquePanelKey( `tab-${ n }`, takenKeys );
		const block = createPrepTabBlock( {
			tabLabel: label,
			panelKey,
			isDefaultActive: false,
		} );
		const index = ( allTabs || [] ).length;
		insertBlock( block, index, sectionClientId );
		onActivatePanel( panelKey );
		setEndoPrepActivePanel( sectionClientId, panelKey );
		selectBlock( block.clientId );
	}

	function moveTab( tab, direction ) {
		const from = blockIndexById[ tab.clientId ];
		if ( typeof from !== 'number' || from < 0 ) {
			return;
		}
		const to = from + direction;
		if ( to < 0 || to >= ( allTabs || [] ).length ) {
			return;
		}
		moveBlockToPosition(
			tab.clientId,
			sectionClientId,
			sectionClientId,
			to
		);
	}

	function deleteTab( tab ) {
		if ( ( allTabs || [] ).length <= 1 ) {
			createNotice(
				'warning',
				__( 'At least one prep tab is required.', 'twork-builder' ),
				{ type: 'snackbar', isDismissible: true }
			);
			return;
		}
		// eslint-disable-next-line no-alert
		if (
			! window.confirm(
				__( 'Delete this prep tab and its checklists?', 'twork-builder' )
			)
		) {
			return;
		}
		removeBlock( tab.clientId, false );
		const remaining = ( allTabs || [] ).filter(
			( t ) => t.clientId !== tab.clientId
		);
		const next = remaining[ 0 ];
		if ( next ) {
			ensureSingleDefault( next.clientId );
			onActivatePanel( next.panelKey );
			setEndoPrepActivePanel( sectionClientId, next.panelKey );
		}
	}

	function setDefault( tab, value ) {
		if ( value ) {
			( allTabs || [] ).forEach( ( t ) => {
				updateBlockAttributes( t.clientId, {
					isDefaultActive: t.clientId === tab.clientId,
				} );
			} );
			onActivatePanel( tab.panelKey );
			setEndoPrepActivePanel( sectionClientId, tab.panelKey );
		} else {
			updateBlockAttributes( tab.clientId, {
				isDefaultActive: false,
			} );
			ensureSingleDefault( null );
		}
	}

	function commitPanelKey( tab, raw ) {
		const next = uniquePanelKey(
			slugifyPanelKey( raw ),
			takenKeys,
			tab.panelKey
		);
		if ( next === tab.panelKey ) {
			return;
		}
		updateBlockAttributes( tab.clientId, { panelKey: next } );
		onActivatePanel( next );
		setEndoPrepActivePanel( sectionClientId, next );
	}

	return (
		<PanelBody
			title={ __( 'Tabs', 'twork-builder' ) }
			initialOpen={ true }
		>
			<p style={ { marginTop: 0, color: '#666', fontSize: 12 } }>
				{ __(
					'Add, rename, reorder, or delete preparation tabs.',
					'twork-builder'
				) }
			</p>
			{ ( allTabs || [] ).map( ( tab, index ) => (
				<div
					key={ tab.clientId }
					style={ {
						marginBottom: 12,
						padding: 10,
						border: '1px solid #ddd',
						borderRadius: 6,
					} }
				>
					<strong>
						{ index + 1 }. { tab.tabLabel || tab.panelKey }
					</strong>
					<TextControl
						label={ __( 'Tab Label', 'twork-builder' ) }
						value={ tab.tabLabel || '' }
						onChange={ ( value ) =>
							updateBlockAttributes( tab.clientId, {
								tabLabel: value,
							} )
						}
					/>
					<TextControl
						label={ __( 'Panel Key', 'twork-builder' ) }
						value={ tab.panelKey || '' }
						onChange={ ( value ) =>
							updateBlockAttributes( tab.clientId, {
								panelKey: value,
							} )
						}
						onBlur={ ( event ) =>
							commitPanelKey( tab, event.target.value )
						}
						help={ __(
							'Sanitized on blur. Must be unique.',
							'twork-builder'
						) }
					/>
					<ToggleControl
						label={ __( 'Show Tab', 'twork-builder' ) }
						checked={ tab.showTab !== false }
						onChange={ ( value ) => {
							updateBlockAttributes( tab.clientId, {
								showTab: value,
							} );
							if ( ! value ) {
								ensureSingleDefault( null );
							}
						} }
					/>
					<ToggleControl
						label={ __( 'Default Active', 'twork-builder' ) }
						checked={ tab.isDefaultActive === true }
						onChange={ ( value ) => setDefault( tab, value ) }
					/>
					<div
						style={ {
							display: 'flex',
							flexWrap: 'wrap',
							gap: 8,
							marginTop: 8,
						} }
					>
						<Button
							variant="secondary"
							onClick={ () => moveTab( tab, -1 ) }
							disabled={ index === 0 }
						>
							{ __( 'Up', 'twork-builder' ) }
						</Button>
						<Button
							variant="secondary"
							onClick={ () => moveTab( tab, 1 ) }
							disabled={ index >= ( allTabs || [] ).length - 1 }
						>
							{ __( 'Down', 'twork-builder' ) }
						</Button>
						<Button
							variant="secondary"
							onClick={ () => openTab( tab ) }
						>
							{ __( 'Open', 'twork-builder' ) }
						</Button>
						<Button
							variant="secondary"
							isDestructive
							onClick={ () => deleteTab( tab ) }
							disabled={ ( allTabs || [] ).length <= 1 }
						>
							{ __( 'Delete', 'twork-builder' ) }
						</Button>
					</div>
				</div>
			) ) }
			<Button variant="primary" onClick={ addTab }>
				{ __( 'Add Tab', 'twork-builder' ) }
			</Button>
		</PanelBody>
	);
}
```

Note: `TextControl` may not forward `onBlur` in all WP versions — if lint/runtime fails, use local row state + blur via wrapping `<div onBlur={…}>` or commit on Change with debounce. Prefer checking `@wordpress/components` TextControl props in installed package; fallback: commit sanitize when Add/Open/Delete runs + a “Apply key” button.

- [ ] **Step 2: Commit** — skip unless user asks

---

### Task 3: Wire into `endo-prep-section/edit.js`

**Files:**
- Modify: `src/endo-prep-section/edit.js`

**Interfaces:**
- Consumes: `EndoPrepTabsInspector`
- Produces: `allTabs` for Inspector; keep existing `tabs` filter for canvas tablist pills

- [ ] **Step 1: Import + split selects**

Add:

```js
import EndoPrepTabsInspector from '@twork-builder/shared/endo-prep-tabs-inspector';
```

Replace the single `tabs` `useSelect` with two (or one select returning both):

```js
const { tabs, allTabs } = useSelect(
	( select ) => {
		const { getBlocks } = select( 'core/block-editor' );
		const children = getBlocks( clientId ).filter(
			( block ) => block.name === 'twork/endo-prep-tab'
		);
		const mapTab = ( block ) => ( {
			clientId: block.clientId,
			panelKey: block.attributes.panelKey || 'tab',
			tabLabel:
				block.attributes.tabLabel ||
				block.attributes.panelKey ||
				'',
			isDefaultActive: block.attributes.isDefaultActive === true,
			showTab: block.attributes.showTab !== false,
		} );
		const mapped = children.map( mapTab );
		return {
			allTabs: mapped,
			tabs: mapped.filter( ( t ) => t.showTab !== false ),
		};
	},
	[ clientId ]
);
```

- [ ] **Step 2: Mount inspector when section selected**

Inside the existing `{ isSelected && ( <InspectorControls>…` ) }` block, after the Header `PanelBody` (or before it), render:

```jsx
<EndoPrepTabsInspector
	sectionClientId={ clientId }
	allTabs={ allTabs }
	onActivatePanel={ setActivePanelKey }
/>
```

Do **not** remove per-tab Inspector in `endo-prep-tab/edit.js` (still useful when Open selects the tab).

- [ ] **Step 3: Commit** — skip unless user asks

---

### Task 4: QA / verification

**Files:** none (commands only)

- [ ] **Step 1: Lint touched paths**

```bash
npx wp-scripts lint-js \
  src/shared/endo-prep-tab-ops.js \
  src/shared/endo-prep-tabs-inspector.js \
  src/endo-prep-section/edit.js
```

Expected: 0 errors (fix prettier if auto-fixable). `import/no-unresolved` on `@twork-builder/shared/*` may be pre-existing alias noise — same as other shared imports.

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: webpack exit 0 (unrelated surgical-services Sass warnings OK).

- [ ] **Step 3: Confirm bundle contains inspector strings**

```bash
rg -l "Add Tab|At least one prep tab" build/endo-prep-section/
```

Expected: match in `build/endo-prep-section/index.js` (or chunk).

- [ ] **Step 4: Editor smoke (manual / DevOps)**

1. Hard-refresh editor with Prep section  
2. Select section → Tabs panel → Add Tab → 4th pill appears; Open shows seeded group  
3. Rename label → pill text updates  
4. Up/Down reorder → pill order matches  
5. Delete non-last → confirm → tab gone; last Delete disabled / notice  
6. Default Active → save → front-end first panel matches  
7. Existing Before/During/After content still validates (no save markup change)

- [ ] **Step 5: Commit** — skip unless user asks

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Inspector Tabs panel (A) | T2–T3 |
| Add with unique key + one group | T1 `createPrepTabBlock` + T2 `addTab` |
| Rename label without auto panelKey | T2 Label `onChange` only |
| Panel key sanitize + unique on blur | T2 `commitPanelKey` |
| Reorder ▲▼ | T2 `moveTab` |
| Delete + forbid last | T2 `deleteTab` |
| Single default active | T2 `ensureSingleDefault` / `setDefault` |
| Open → select + activate | T2 `openTab` |
| No attribute array / no FE rewrite / no deprecation | Global Constraints |
| `SKIP_BLOCKS` untouched | Global Constraints |

**Placeholder scan:** none intentional. `TextControl` `onBlur` has documented fallback if WP build rejects the prop.

**Type consistency:** `allTabs` shape `{ clientId, panelKey, tabLabel, isDefaultActive, showTab }` used in T2 and T3.

---

## Execution Handoff

Plan saved to `docs/superpowers/plans/2026-08-30-endo-prep-tabs-crud.md`.

**Two execution options:**

1. **Subagent-Driven (recommended by skill)** — fresh subagent per task, review between tasks  
2. **Inline Execution (recommended for this repo)** — this session, Scout→Architect→Builder→QA one `y` each via `executing-plans` checkpoints  

Which approach?
