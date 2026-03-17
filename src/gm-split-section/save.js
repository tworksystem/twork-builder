import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        imageUrl,
        imageAlt,
        imagePosition,
        title,
        description,
        featureItems,
        showButton,
        buttonText,
        buttonUrl,
        buttonTarget,
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        titleColor,
        titleFontSize,
        descriptionColor,
        splitGap,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: [
            'twork-gm-split-section',
            'jivaka-gm-section',
            imagePosition === 'left' ? 'gm-split-image-left' : 'gm-split-image-right',
        ].filter(Boolean).join(' '),
        style: {
            backgroundColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
        'data-show-button': showButton !== false ? 'true' : 'false',
    });

    const hasImage = !!imageUrl;
    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        display: hasImage ? 'grid' : 'block',
        gridTemplateColumns: hasImage ? '1fr 1fr' : undefined,
        gap: hasImage ? `${splitGap}px` : undefined,
        alignItems: hasImage ? 'center' : undefined,
    };

    const imageCol = imageUrl && (
        <div className="jivaka-gm-img-wrapper gm-anim-fade gm-split-image-col">
            <img
                decoding="async"
                src={imageUrl}
                alt={imageAlt || ''}
            />
        </div>
    );

    const contentCol = (
        <div className="gm-anim-fade gm-split-content-col">
            <RichText.Content
                tagName="h2"
                value={title}
                style={{
                    fontSize: `${titleFontSize}rem`,
                    marginBottom: 20,
                    color: titleColor,
                }}
            />
            <RichText.Content
                tagName="p"
                value={description}
                style={{
                    color: descriptionColor,
                    marginBottom: 24,
                    lineHeight: 1.6,
                }}
            />
            <ul className="jivaka-gm-feature-list">
                {(featureItems || []).map((item, i) => (
                    <li key={i}>
                        {item.label && <strong>{item.label}</strong>}
                        {item.label && ' '}
                        {item.text}
                    </li>
                ))}
            </ul>
            {showButton !== false && buttonText && (
                <a
                    href={buttonUrl || '#contact'}
                    className="jivaka-gm-btn jivaka-gm-btn-primary"
                    target={buttonTarget ? '_blank' : undefined}
                    rel={buttonTarget ? 'noopener noreferrer' : undefined}
                >
                    {buttonText}
                </a>
            )}
        </div>
    );

    return (
        <section {...blockProps}>
            <div
                className="jivaka-gm-container jivaka-gm-split"
                style={containerStyle}
            >
                {hasImage && imagePosition === 'left' && imageCol}
                {contentCol}
                {hasImage && imagePosition === 'right' && imageCol}
            </div>
        </section>
    );
}
