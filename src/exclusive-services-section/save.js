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
        minColumnWidth,
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontSizeMobile,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        sectionTitleMarginBottom,
        containerMaxWidth,
        containerPadding,
        containerPaddingMobile,
        cardBorderRadius,
        hoverEffect,
        hoverTranslateX,
        animationOnScroll,
        animationDelay,
        animationType
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'twork-exclusive-services-section section-padding services-section',
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
            '--hover-translate-x': `${hoverTranslateX}px`
        },
        'data-padding-top-mobile': paddingTopMobile,
        'data-padding-bottom-mobile': paddingBottomMobile,
        'data-columns': columns,
        'data-columns-tablet': columnsTablet,
        'data-columns-mobile': columnsMobile,
        'data-min-column-width': minColumnWidth,
        'data-gap': gap,
        'data-gap-mobile': gapMobile,
        'data-container-padding': containerPadding,
        'data-container-padding-mobile': containerPaddingMobile,
        'data-hover-effect': hoverEffect,
        'data-hover-translate-x': hoverTranslateX,
        'data-animation': animationOnScroll,
        'data-animation-type': animationType,
        'data-animation-delay': animationDelay,
        'data-title-font-size-mobile': sectionTitleFontSizeMobile
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
                {showSectionTitle && (
                    <RichText.Content
                        tagName="h2"
                        value={sectionTitle}
                        className="section-title fade-up"
                        style={{
                            fontSize: `${sectionTitleFontSize}rem`,
                            fontWeight: sectionTitleFontWeight,
                            color: sectionTitleColor,
                            textAlign: sectionTitleAlignment,
                            marginBottom: `${sectionTitleMarginBottom}px`
                        }}
                    />
                )}

                <div
                    className="svc-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(auto-fill, minmax(${minColumnWidth}px, 1fr))`,
                        gap: `${gap}px`
                    }}
                    data-columns={columns}
                    data-columns-tablet={columnsTablet}
                    data-columns-mobile={columnsMobile}
                    data-min-column-width={minColumnWidth}
                    data-gap={gap}
                    data-gap-mobile={gapMobile}
                >
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}
