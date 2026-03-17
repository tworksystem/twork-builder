import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        imageUrl,
        imageAlt,
        badgeText,
        badgeColor,
        title,
        titleFontSize,
        titleColor,
        description,
        descriptionColor,
        primaryColor,
        animationOnScroll,
        animationType,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'hc-section twork-hc-intro-section',
        style: {
            backgroundColor: backgroundColor || '#ffffff',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            '--hc-primary': primaryColor || '#f48b2a',
        },
        'data-animation': animationOnScroll,
        'data-animation-type': animationType || 'fade-up',
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
    };

    const animClass = animationOnScroll && animationType ? animationType : '';

    return (
        <section {...blockProps}>
            <div className="hc-container hc-intro-grid" style={containerStyle}>
                <div className={animClass}>
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={imageAlt || ''}
                            className="hc-intro-img"
                        />
                    )}
                </div>
                <div className={animClass}>
                    {badgeText && (
                        <h4
                            style={{
                                color: badgeColor || 'var(--hc-primary)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                marginBottom: 10,
                                marginTop: 0,
                            }}
                        >
                            {badgeText}
                        </h4>
                    )}
                    {title && (
                        <RichText.Content
                            tagName="h2"
                            value={title}
                            style={{
                                fontSize: `${titleFontSize}rem`,
                                fontWeight: 700,
                                marginBottom: 20,
                                color: titleColor || '#212121',
                            }}
                        />
                    )}
                    {description && (
                        <RichText.Content
                            tagName="p"
                            value={description}
                            style={{
                                marginBottom: 25,
                                color: descriptionColor || '#555555',
                                lineHeight: 1.7,
                            }}
                        />
                    )}
                    <ul className="hc-check-list">
                        <InnerBlocks.Content />
                    </ul>
                </div>
            </div>
        </section>
    );
}
