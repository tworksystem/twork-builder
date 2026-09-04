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
 * @param {string}   base        Desired key (already slugified preferred).
 * @param {string[]} takenKeys   Sibling panelKeys.
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
