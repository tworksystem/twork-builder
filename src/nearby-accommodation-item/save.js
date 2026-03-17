import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        image,
        imageAlt,
        title,
        titleColor,
        titleFontSize,
        titleFontWeight,
        subtitle,
        subtitleColor,
        subtitleFontSize,
        overlayPadding,
        overlayGradientStart,
        overlayGradientEnd,
        cardHeight,
        cardBorderRadius,
        linkUrl,
        linkOpenInNewTab
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'hotel-card stagger-hotel',
        style: {
            '--card-height': `${cardHeight}px`,
            '--card-border-radius': `${cardBorderRadius}px`,
            '--overlay-padding': `${overlayPadding}px`,
            '--overlay-gradient': `linear-gradient(${overlayGradientStart}, ${overlayGradientEnd})`
        }
    });

    const cardContent = image && (
        <>
            <img
                src={image}
                alt={imageAlt || ''}
                decoding="async"
            />
            <div
                className="hotel-overlay"
                style={{
                    padding: `${overlayPadding}px`,
                    background: `linear-gradient(${overlayGradientStart}, ${overlayGradientEnd})`
                }}
            >
                {title && (
                    <RichText.Content
                        tagName="h4"
                        value={title}
                        style={{
                            margin: 0,
                            fontSize: `${titleFontSize}rem`,
                            fontWeight: titleFontWeight,
                            color: titleColor
                        }}
                    />
                )}
                {subtitle && (
                    <RichText.Content
                        tagName="p"
                        value={subtitle}
                        style={{
                            margin: '5px 0 0',
                            fontSize: `${subtitleFontSize}rem`,
                            color: subtitleColor,
                            opacity: 0.9
                        }}
                    />
                )}
            </div>
        </>
    );

    if (!cardContent) {
        return <div {...blockProps} />;
    }

    return (
        <div {...blockProps}>
            {linkUrl ? (
                <a
                    href={linkUrl}
                    target={linkOpenInNewTab ? '_blank' : undefined}
                    rel={linkOpenInNewTab ? 'noopener noreferrer' : undefined}
                    className="hotel-card-link"
                    style={{ display: 'block', height: '100%', textDecoration: 'none', color: 'inherit' }}
                >
                    {cardContent}
                </a>
            ) : (
                cardContent
            )}
        </div>
    );
}
