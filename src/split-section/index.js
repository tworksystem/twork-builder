import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';

registerBlockType('twork/split-section', {
    edit: Edit,
    save,
});
