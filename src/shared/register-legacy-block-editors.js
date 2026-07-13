/**
 * Attach edit/save to legacy mk/* block names that PHP registers from the same build folder.
 * Server-side register_block_type_from_metadata runs before JS; a second registerBlockType()
 * would no-op, leaving mk/* blocks without interactive editors.
 */
import { addFilter } from '@wordpress/hooks';

export function attachLegacyBlockEditor( legacyName, edit, save ) {
	addFilter(
		'blocks.registerBlockType',
		`twork-builder/legacy-editor-${ legacyName.replace( '/', '-' ) }`,
		( settings, name ) => {
			if ( name === legacyName ) {
				return {
					...settings,
					edit,
					save,
				};
			}
			return settings;
		}
	);
}
