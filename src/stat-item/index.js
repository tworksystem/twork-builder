import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { attachLegacyBlockEditor } from '../shared/register-legacy-block-editors.js';
import './style.scss';

const blockSettings = {
	edit: Edit,
	save,
};

registerBlockType( metadata.name, blockSettings );
attachLegacyBlockEditor( 'mk/stat-item', Edit, save );
