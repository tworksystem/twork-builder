import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import saveDeprecated from './save-deprecated';
import metadata from './block.json';
import { attachLegacyBlockEditor } from '../shared/register-legacy-block-editors.js';

const deprecated = [
	{
		attributes: metadata.attributes,
		save: saveDeprecated,
		migrate: ( attributes ) => attributes,
	},
];

const blockSettings = {
	edit: Edit,
	save,
	deprecated,
};

registerBlockType( metadata.name, blockSettings );
attachLegacyBlockEditor( 'mk/csr-stats-section', Edit, save, { deprecated } );
