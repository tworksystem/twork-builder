import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { attachLegacyBlockEditor } from '../shared/register-legacy-block-editors.js';

const blockSettings = {
	edit: Edit,
	save,
};

registerBlockType( metadata.name, blockSettings );
attachLegacyBlockEditor( 'mk/csr-stats-section', Edit, save );
