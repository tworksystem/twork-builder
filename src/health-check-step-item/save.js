import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { icon = 'fas fa-ban', title = '', description = '' } = attributes;

    const blockProps = useBlockProps.save({
        className: 'chk-step-item stagger-up',
    });

    return (
        <div {...blockProps}>
            <div className="chk-step-icon">
                <i className={icon || 'fas fa-circle'} aria-hidden="true" />
            </div>
            <RichText.Content tagName="h4" value={title} />
            <RichText.Content tagName="p" value={description} />
        </div>
    );
}
