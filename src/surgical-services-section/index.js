import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';

registerBlockType( 'twork/surgical-services-section', {
	edit: Edit,
	save,
} );
