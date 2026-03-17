import { useBlockProps, RichText } from '@wordpress/block-editor';

const DEFAULT_LIST_ITEMS = [
    { id: '1', iconClass: 'fas fa-compress-arrows-alt', title: 'Micro Incisions', subtitle: 'Tiny cuts (0.5cm - 1cm) leading to better cosmetic results.' },
    { id: '2', iconClass: 'fas fa-running', title: 'Rapid Recovery', subtitle: 'Return to normal activities within days, not weeks.' },
];

export default function save({ attributes }) {
    const {
        sectionClass,
        label,
        title,
        description,
        listItems = DEFAULT_LIST_ITEMS,
        buttonText,
        buttonUrl,
        buttonTarget,
        imageUrl,
        imageAlt,
        badgeIcon,
        badgeTitle,
        badgeSubtitle,
        containerMaxWidth,
        containerPadding,
        gridGap,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: sectionClass || 'section-padding split-section',
    });

    const items = Array.isArray(listItems) && listItems.length > 0 ? listItems : DEFAULT_LIST_ITEMS;

    return (
        <section {...blockProps}>
            <div
                className="container"
                style={{
                    maxWidth: `${containerMaxWidth}px`,
                    margin: '0 auto',
                    padding: `0 ${containerPadding}px`,
                }}
            >
                <div
                    className="split-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        alignItems: 'center',
                        gap: `${gridGap}px`,
                    }}
                >
                    <div className="fade-up split-section-text">
                        <RichText.Content tagName="span" value={label} className="split-section-label" />
                        <RichText.Content tagName="h2" value={title} className="split-section-title" />
                        <RichText.Content tagName="p" value={description} className="split-section-description" />
                        <ul className="lap-list">
                            {items.map((item) => (
                                <li key={item.id}>
                                    <i className={item.iconClass || 'fas fa-check'} aria-hidden="true" />
                                    <div>
                                        <h4 className="lap-list-title">{item.title}</h4>
                                        <p className="lap-list-subtitle">{item.subtitle}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <a
                            href={buttonUrl || '#'}
                            className="btn btn-primary split-section-btn"
                            target={buttonTarget ? '_blank' : '_self'}
                            rel={buttonTarget ? 'noopener noreferrer' : undefined}
                        >
                            {buttonText || 'Learn about Keyhole'}
                        </a>
                    </div>
                    <div className="lap-img-container fade-up">
                        {imageUrl && (
                            <>
                                <img src={imageUrl} alt={imageAlt || ''} />
                                <div className="floating-badge">
                                    <i className={badgeIcon || 'fas fa-star'} aria-hidden="true" />
                                    <div>
                                        <strong className="floating-badge-title">{badgeTitle}</strong>
                                        <span className="floating-badge-subtitle">{badgeSubtitle}</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
