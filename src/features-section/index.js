import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';

registerBlockType('twork/features-section', {
    edit: Edit,
    save,
});
