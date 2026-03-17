import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { title, labelText, phoneNumber, iconClass } = attributes;

    const blockProps = useBlockProps.save({
        className: 'acc-item'
    });

    return (
        <div {...blockProps}>
            <div className="acc-head">
                <RichText.Content tagName="span" value={title} className="acc-head-title" />
                <i className={iconClass || 'fas fa-chevron-down'} aria-hidden="true" />
            </div>
            <div className="acc-body">
                <div className="acc-content-wrapper">
                    <div className="acc-icon">
                        <i className={iconClass || 'fas fa-phone-alt'} aria-hidden="true" />
                    </div>
                    <div className="acc-text">
                        <span>{labelText}</span>
                        <strong>{phoneNumber}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}
