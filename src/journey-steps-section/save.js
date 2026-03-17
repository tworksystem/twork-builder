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
        columns,
        columnsTablet,
        columnsMobile,
        gap,
        gapMobile,
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontSizeMobile,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        showSectionSubtitle,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        sectionSubtitleFontSizeMobile,
        sectionHeaderMaxWidth,
        sectionHeaderMarginBottom,
        containerMaxWidth,
        containerPadding,
        containerPaddingMobile,
        cardBorderRadius,
        cardBoxShadow,
        cardBoxShadowColor,
        cardBoxShadowBlur,
        cardBoxShadowSpread,
        cardBoxShadowOffsetX,
        cardBoxShadowOffsetY,
        cardBoxShadowHover,
        cardBoxShadowBlurHover,
        cardBoxShadowSpreadHover,
        cardBoxShadowOffsetXHover,
        cardBoxShadowOffsetYHover,
        cardBorderTopWidth,
        cardBorderTopColor,
        hoverEffect,
        hoverTranslateY,
        animationOnScroll,
        animationDelay,
        animationType
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'twork-journey-steps-section section-padding',
        style: {
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative',
            '--columns-tablet': columnsTablet,
            '--columns-mobile': columnsMobile,
            '--gap-mobile': `${gapMobile}px`,
            '--padding-top-mobile': `${paddingTopMobile}px`,
            '--padding-bottom-mobile': `${paddingBottomMobile}px`,
            '--container-padding-mobile': `${containerPaddingMobile}px`,
            '--card-border-radius': `${cardBorderRadius}px`,
            '--card-border-top-width': `${cardBorderTopWidth}px`,
            '--card-border-top-color': cardBorderTopColor,
            '--card-shadow': cardBoxShadow
                ? `${cardBoxShadowOffsetX}px ${cardBoxShadowOffsetY}px ${cardBoxShadowBlur}px ${cardBoxShadowSpread}px ${cardBoxShadowColor}`
                : 'none',
            '--card-shadow-hover': cardBoxShadow
                ? `${cardBoxShadowOffsetXHover}px ${cardBoxShadowOffsetYHover}px ${cardBoxShadowBlurHover}px ${cardBoxShadowSpreadHover}px ${cardBoxShadowHover}`
                : 'none',
            '--hover-translate-y': `${hoverTranslateY}px`
        },
        'data-padding-top-mobile': paddingTopMobile,
        'data-padding-bottom-mobile': paddingBottomMobile,
        'data-columns': columns,
        'data-columns-tablet': columnsTablet,
        'data-columns-mobile': columnsMobile,
        'data-gap': gap,
        'data-gap-mobile': gapMobile,
        'data-container-padding': containerPadding,
        'data-container-padding-mobile': containerPaddingMobile,
        'data-card-border-radius': cardBorderRadius,
        'data-card-box-shadow': cardBoxShadow,
        'data-card-border-top-width': cardBorderTopWidth,
        'data-card-border-top-color': cardBorderTopColor,
        'data-card-shadow-color': cardBoxShadowColor,
        'data-card-shadow-hover': cardBoxShadowHover,
        'data-hover-effect': hoverEffect,
        'data-hover-translate-y': hoverTranslateY,
        'data-animation': animationOnScroll,
        'data-animation-type': animationType,
        'data-animation-delay': animationDelay,
        'data-title-font-size-mobile': sectionTitleFontSizeMobile,
        'data-subtitle-font-size-mobile': sectionSubtitleFontSizeMobile
    });

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

            <div
                className="jivaka-container"
                style={{
                    maxWidth: `${containerMaxWidth}px`,
                    margin: '0 auto',
                    padding: `0 ${containerPadding}px`,
                    position: 'relative',
                    zIndex: 2
                }}
            >
                {(showSectionTitle || showSectionSubtitle) && (
                    <div
                        className="section-header"
                        style={{
                            textAlign: sectionTitleAlignment,
                            maxWidth: `${sectionHeaderMaxWidth}px`,
                            margin: `0 auto ${sectionHeaderMarginBottom}px`
                        }}
                    >
                        {showSectionTitle && (
                            <RichText.Content
                                tagName="h2"
                                value={sectionTitle}
                                className="section-title"
                                style={{
                                    fontSize: `${sectionTitleFontSize}rem`,
                                    fontWeight: sectionTitleFontWeight,
                                    color: sectionTitleColor,
                                    marginBottom: showSectionSubtitle ? '15px' : '0'
                                }}
                            />
                        )}
                        {showSectionSubtitle && (
                            <RichText.Content
                                tagName="p"
                                value={sectionSubtitle}
                                className="section-subtitle"
                                style={{
                                    fontSize: `${sectionSubtitleFontSize}rem`,
                                    color: sectionSubtitleColor,
                                    margin: 0
                                }}
                            />
                        )}
                    </div>
                )}

                <div
                    className="steps-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gap: `${gap}px`
                    }}
                    data-columns={columns}
                    data-columns-tablet={columnsTablet}
                    data-columns-mobile={columnsMobile}
                    data-gap={gap}
                    data-gap-mobile={gapMobile}
                >
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}
