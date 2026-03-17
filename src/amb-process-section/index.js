import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import saveDeprecated from './save-deprecated';
import metadata from './block.json';

/**
 * Migrate from old markup (grid inline styles) to new (CSS-driven responsive).
 * Returns same attributes and innerBlocks so block re-saves with current save().
 */
function migrateProcessSection(attributes, innerBlocks) {
    return [attributes, innerBlocks];
}

registerBlockType(metadata.name, {
    edit: Edit,
    save,
    deprecated: [
        {
            save: saveDeprecated,
            migrate: migrateProcessSection
        }
    ]
});
