import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';

registerBlockType('twork/feature-card', {
    edit: Edit,
    save,
});
