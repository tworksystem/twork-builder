import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        title,
        subtitle,
        gradientStart,
        gradientEnd,
        gradientAngle,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        phoneMockupImage,
        phoneMockupMaxWidth,
        titleColor,
        titleFontSize,
        titleFontWeight,
        subtitleColor,
        subtitleFontSize,
        subtitleMarginBottom,
        badgeGap,
        badgeHeight,
        enablePhoneFloatAnimation,
        textAlignment,
        minHeight = '100vh'
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'jivaka-hero-section twork-jivaka-hero-section',
        style: {
            background: `linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})`,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            minHeight: minHeight || '100vh',
            position: 'relative',
            overflow: 'hidden'
        },
        'data-float-animation': enablePhoneFloatAnimation
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        width: '100%',
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        color: 'white',
        boxSizing: 'border-box'
    };

    const textContentStyle = {
        flex: '1 1 400px',
        padding: '20px',
        textAlign: textAlignment
    };

    const badgesStyle = {
        display: 'flex',
        gap: `${badgeGap}px`,
        flexWrap: 'wrap',
        justifyContent: textAlignment === 'center' ? 'center' : 'flex-start',
        '--jivaka-badge-height': `${badgeHeight}px`
    };

    const phoneMockupStyle = {
        flex: '1 1 400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
    };

    return (
        <section {...blockProps}>
            <div className="jivaka-hero-container" style={containerStyle}>
                <div className="jivaka-hero-text-content" style={textContentStyle}>
                    <RichText.Content
                        tagName="h1"
                        value={title}
                        className="jivaka-hero-title"
                        style={{
                            fontSize: `${titleFontSize}rem`,
                            fontWeight: titleFontWeight,
                            color: titleColor,
                            marginBottom: '10px',
                            lineHeight: 1.2
                        }}
                    />
                    <RichText.Content
                        tagName="p"
                        value={subtitle}
                        className="jivaka-hero-subtitle"
                        style={{
                            fontSize: `${subtitleFontSize}rem`,
                            color: subtitleColor,
                            margin: `0 0 ${subtitleMarginBottom}px 0`
                        }}
                    />
                    <div
                        className="jivaka-hero-badges"
                        style={badgesStyle}
                        data-badge-gap={badgeGap}
                        data-badge-height={badgeHeight}
                    >
                        <InnerBlocks.Content />
                    </div>
                </div>
                <div className="jivaka-hero-phone-mockup" style={phoneMockupStyle}>
                    {phoneMockupImage && (
                        <img
                            src={phoneMockupImage}
                            alt=""
                            className="jivaka-hero-phone-image"
                            style={{
                                width: '100%',
                                maxWidth: `${phoneMockupMaxWidth}px`,
                                height: 'auto',
                                filter: 'drop-shadow(0 20px 50px rgba(0, 0, 0, 0.2))'
                            }}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
