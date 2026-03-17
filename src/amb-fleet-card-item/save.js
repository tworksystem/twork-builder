import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        badgeText,
        badgeStyle,
        badgeBgColor,
        image,
        imageAlt,
        imageHeight,
        imageObjectFit,
        title,
        titleColor,
        titleFontSize,
        titleFontWeight,
        description,
        descriptionColor,
        descriptionFontSize,
        descriptionMarginBottom,
        listItems,
        listIconColor,
        infoPadding
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'amb-fleet-card twork-amb-fleet-card',
        style: { position: 'relative' }
    });

    const getBadgeStyle = () => {
        if (badgeBgColor) return { background: badgeBgColor };
        if (badgeStyle === 'primary') return { background: 'var(--amb-primary, #f48b2a)' };
        return { background: 'var(--amb-dark, #0f172a)' };
    };

    return (
        <div {...blockProps}>
            {badgeText && (
                <span
                    className="amb-fleet-badge"
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        zIndex: 2,
                        color: '#fff',
                        padding: '5px 15px',
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        ...getBadgeStyle()
                    }}
                >
                    {badgeText}
                </span>
            )}

            {image && (
                <img
                    src={image}
                    alt={imageAlt || title}
                    className="amb-fleet-img"
                    style={{
                        width: '100%',
                        height: `${imageHeight}px`,
                        objectFit: imageObjectFit,
                        display: 'block'
                    }}
                />
            )}

            <div
                className="amb-fleet-info"
                style={{
                    padding: `${infoPadding}px`
                }}
            >
                {title && (
                    <RichText.Content
                        tagName="h3"
                        value={title}
                        style={{
                            color: titleColor,
                            fontSize: `${titleFontSize}rem`,
                            fontWeight: titleFontWeight,
                            marginTop: 0,
                            marginBottom: '15px'
                        }}
                    />
                )}

                {description && (
                    <RichText.Content
                        tagName="p"
                        value={description}
                        style={{
                            color: descriptionColor,
                            fontSize: `${descriptionFontSize}rem`,
                            marginBottom: `${descriptionMarginBottom}px`
                        }}
                    />
                )}

                {listItems && listItems.length > 0 && (
                    <ul className="amb-fleet-list">
                        {listItems.map((item) => (
                            <li key={item.id}>
                                <i
                                    className={`fas ${item.icon || 'fa-check-circle'}`}
                                    style={{ color: listIconColor }}
                                    aria-hidden="true"
                                />
                                {item.text}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
