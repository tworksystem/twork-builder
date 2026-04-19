import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import Edit from './edit';
import save from './save';
import saveDeprecated from './save-deprecated';
import metadata from './block.json';

function migrateTeamSection( attributes, innerBlocks ) {
	return [ attributes, innerBlocks ];
}

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	deprecated: [
		{
			attributes: metadata.attributes,
			save: saveDeprecated,
			migrate: migrateTeamSection,
		},
	],
} );
