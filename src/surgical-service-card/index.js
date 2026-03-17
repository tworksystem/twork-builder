import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';

registerBlockType('twork/surgical-service-card', {
    edit: Edit,
    save,
});
