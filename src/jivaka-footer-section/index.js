import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import legacySave from './legacy-save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	deprecated: [
		{
			attributes: metadata.attributes,
			save: legacySave,
			migrate: ( attributes ) => attributes,
		},
	],
} );
