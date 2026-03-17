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
        showBorder,
        borderPosition,
        borderColor,
        borderColorHover,
        borderWidth,
        borderWidthMobile,
        borderStyle,
        borderOpacity,
        showBorderDesktop,
        showBorderTablet,
        showBorderMobile,
        disableAllBorders,
        sectionBorderWidth,
        sectionBorderColor,
        sectionBorderStyle,
        sectionBorderRadius,
        sectionBoxShadow,
        sectionBoxShadowColor,
        sectionBoxShadowBlur,
        sectionBoxShadowSpread,
        sectionBoxShadowX,
        sectionBoxShadowY,
        containerMaxWidth,
        containerPadding,
        containerPaddingMobile,
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontSizeMobile,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        sectionTitleMarginBottom,
        showSectionSubtitle,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        sectionSubtitleFontSizeMobile,
        sectionSubtitleFontWeight,
        sectionSubtitleMarginBottom,
        animationOnScroll,
        animationDelay,
        animationType,
        hoverEffect,
        hoverScale,
        hoverTranslateY
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'key-services-section jivaka-section twork-key-services-section',
        style: {
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative'
            // CRITICAL: Do NOT use inline border styles - WordPress core CSS will interfere
            // WordPress core rule: html :where([style*=border-width]) { border-style: solid; }
            // We use CSS custom properties via data attributes instead
            // Borders are controlled via CSS classes and data attributes, NOT inline styles
        },
        'data-section-border-width': sectionBorderWidth,
        'data-section-border-color': sectionBorderColor,
        'data-section-border-style': sectionBorderStyle,
        'data-section-border-radius': sectionBorderRadius,
        'data-section-box-shadow': sectionBoxShadow,
        'data-section-box-shadow-color': sectionBoxShadowColor,
        'data-section-box-shadow-blur': sectionBoxShadowBlur,
        'data-section-box-shadow-spread': sectionBoxShadowSpread,
        'data-section-box-shadow-x': sectionBoxShadowX,
        'data-section-box-shadow-y': sectionBoxShadowY,
        'data-padding-top-mobile': paddingTopMobile,
        'data-padding-bottom-mobile': paddingBottomMobile,
        'data-gap': gap,
        'data-gap-mobile': gapMobile,
        'data-columns': columns,
        'data-columns-tablet': columnsTablet,
        'data-columns-mobile': columnsMobile,
        'data-disable-all-borders': disableAllBorders ? 'true' : 'false',
        'data-show-border': (!disableAllBorders && showBorder) ? 'true' : 'false',
        'data-border-position': borderPosition,
        'data-border-color': borderColor,
        'data-border-color-hover': borderColorHover,
        'data-border-width': borderWidth,
        'data-border-width-mobile': borderWidthMobile,
        'data-border-style': borderStyle,
        'data-border-opacity': borderOpacity,
        'data-show-border-desktop': showBorderDesktop,
        'data-show-border-tablet': showBorderTablet,
        'data-show-border-mobile': showBorderMobile,
        'data-container-padding': containerPadding,
        'data-container-padding-mobile': containerPaddingMobile,
        'data-hover-effect': hoverEffect,
        'data-hover-scale': hoverScale,
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
                            marginBottom: `${sectionSubtitleMarginBottom}px`
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
                                    marginBottom: showSectionSubtitle ? `${sectionTitleMarginBottom}px` : '0',
                                    marginTop: 0
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
                                    fontWeight: sectionSubtitleFontWeight,
                                    color: sectionSubtitleColor,
                                    margin: 0
                                }}
                            />
                        )}
                    </div>
                )}

                <div 
                    className="key-services-grid twork-key-services-grid"
                    style={{
                        '--grid-columns': columns,
                        '--grid-columns-tablet': columnsTablet,
                        '--grid-columns-mobile': columnsMobile,
                        '--grid-gap': `${gap}px`,
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

