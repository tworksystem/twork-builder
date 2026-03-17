import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { stepNumber, iconClass, title, description } = attributes;

    const blockProps = useBlockProps.save({
        className: 'twork-tele-process-card-wrapper'
    });

    const titleValue = title ?? '';
    const descriptionValue = description ?? '';

    return (
        <div {...blockProps}>
            <div className="process-card stagger-card">
                <div className="step-icon" data-step={String(stepNumber ?? 1)}>
                    <i className={iconClass || 'fas fa-user-md'} aria-hidden="true" />
                </div>
                <RichText.Content tagName="h4" value={titleValue} />
                <RichText.Content tagName="p" value={descriptionValue} />
            </div>
        </div>
    );
}
