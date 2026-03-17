import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { iconClass, title, subtitle } = attributes;

    const blockProps = useBlockProps.save({
        className: 'paed-cond-card paed-stagger',
    });

    return (
        <div {...blockProps}>
            <div className="paed-cond-icon">
                {iconClass && <i className={iconClass} aria-hidden="true" />}
            </div>
            {title && <RichText.Content tagName="h5" value={title} />}
            {subtitle && <RichText.Content tagName="span" value={subtitle} />}
        </div>
    );
}
