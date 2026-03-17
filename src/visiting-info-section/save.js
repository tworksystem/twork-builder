import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        backgroundColor,
        backgroundImage,
        backgroundOverlay,
        backgroundOverlayColor,
        backgroundOverlayOpacity,
        paddingTop,
        paddingBottom,
        paddingTopMobile,
        paddingBottomMobile,
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontSizeMobile,
        sectionTitleFontWeight,
        sectionTitleMarginBottom,
        showSectionDescription,
        sectionDescription,
        sectionDescriptionColor,
        sectionDescriptionFontSize,
        sectionDescriptionMarginBottom,
        showImage,
        imageUrl,
        imageAlt,
        imageBorderRadius,
        imageBoxShadow,
        containerMaxWidth,
        containerPadding,
        layoutGap,
        layoutGapMobile,
        imageFirstOnMobile,
        hoursCardBgColor,
        hoursCardPadding,
        hoursCardBorderRadius,
        hoursCardBoxShadow,
        animationOnScroll,
        animationType,
        animationDelay
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'twork-visiting-info-section section-padding info-section',
        style: {
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative',
            '--padding-top-mobile': `${paddingTopMobile}px`,
            '--padding-bottom-mobile': `${paddingBottomMobile}px`,
            '--layout-gap': `${layoutGap}px`,
            '--layout-gap-mobile': `${layoutGapMobile}px`,
            '--title-font-size-mobile': `${sectionTitleFontSizeMobile}rem`
        },
        'data-image-first-mobile': imageFirstOnMobile,
        'data-animation': animationOnScroll,
        'data-animation-type': animationType,
        'data-animation-delay': animationDelay
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        position: 'relative',
        zIndex: 2
    };

    const infoLayoutStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: `${layoutGap}px`,
        alignItems: 'center'
    };

    const hoursCardStyle = {
        background: hoursCardBgColor,
        padding: `${hoursCardPadding}px`,
        borderRadius: `${hoursCardBorderRadius}px`,
        boxShadow: hoursCardBoxShadow ? '0 20px 50px rgba(0, 0, 0, 0.1)' : 'none'
    };

    const imageStyle = {
        borderRadius: `${imageBorderRadius}px`,
        boxShadow: imageBoxShadow ? '0 10px 30px rgba(0, 0, 0, 0.1)' : 'none',
        width: '100%',
        height: 'auto',
        display: 'block'
    };

    return (
        <section {...blockProps}>
            {backgroundImage && backgroundOverlay && (
                <div
                    className="background-overlay"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: backgroundOverlayColor,
                        opacity: backgroundOverlayOpacity,
                        zIndex: 1
                    }}
                />
            )}

            <div className="jivaka-container" style={containerStyle}>
                <div className="info-layout" style={infoLayoutStyle} data-image-first-mobile={imageFirstOnMobile}>
                    <div className="info-content fade-up">
                        {(showSectionTitle || showSectionDescription) && (
                            <div className="info-header">
                                {showSectionTitle && (
                                    <RichText.Content
                                        tagName="h2"
                                        value={sectionTitle}
                                        className="info-section-title"
                                        style={{
                                            fontSize: `${sectionTitleFontSize}rem`,
                                            fontWeight: sectionTitleFontWeight,
                                            color: sectionTitleColor,
                                            marginBottom: showSectionDescription ? `${sectionTitleMarginBottom}px` : '0'
                                        }}
                                    />
                                )}
                                {showSectionDescription && (
                                    <RichText.Content
                                        tagName="p"
                                        value={sectionDescription}
                                        className="info-section-description"
                                        style={{
                                            fontSize: `${sectionDescriptionFontSize}rem`,
                                            color: sectionDescriptionColor,
                                            marginBottom: `${sectionDescriptionMarginBottom}px`
                                        }}
                                    />
                                )}
                            </div>
                        )}

                        <div className="hours-card" style={hoursCardStyle}>
                            <InnerBlocks.Content />
                        </div>
                    </div>

                    {showImage && imageUrl && (
                        <div className="info-img fade-up">
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                style={imageStyle}
                                decoding="async"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
