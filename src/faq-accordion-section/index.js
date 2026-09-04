import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './view.js';

registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
