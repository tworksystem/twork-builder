import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { iconClass, title, description, listItems = [], linkText, linkUrl, linkTarget } = attributes;
    const blockProps = useBlockProps.save({
        className: 'service-card stagger-up',
    });

    return (
        <div {...blockProps}>
            <i className={`${iconClass || 'fas fa-procedures'} service-icon-bg`} aria-hidden="true" />
            <div className="service-content">
                <div className="service-header">
                    <i className={iconClass || 'fas fa-procedures'} aria-hidden="true" />
                </div>
                <RichText.Content tagName="h3" value={title} />
                <RichText.Content tagName="p" value={description} className="service-description" />
                {Array.isArray(listItems) && listItems.length > 0 && (
                    <ul style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '15px' }}>
                        {listItems.map((text, index) => (
                            <li key={index}>
                                <i className="fas fa-check" style={{ color: '#0093E9', marginRight: '5px' }} aria-hidden="true" />
                                {text}
                            </li>
                        ))}
                    </ul>
                )}
                <a
                    href={linkUrl || '#'}
                    className="service-link"
                    target={linkTarget ? '_blank' : '_self'}
                    rel={linkTarget ? 'noopener noreferrer' : undefined}
                >
                    {linkText || 'Read More'} <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }} aria-hidden="true" />
                </a>
            </div>
        </div>
    );
}
