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
        columns,
        columnsTablet,
        columnsMobile,
        gap,
        gridMarginTop,
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        showSectionSubtitle,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        sectionHeaderMaxWidth,
        sectionHeaderMarginBottom,
        containerMaxWidth,
        containerPadding,
        hoverEffect,
        hoverTranslateY
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'twork-insurance-partners-section section-padding',
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
            '--hover-translate-y': `${hoverTranslateY}px`
        },
        'data-hover-effect': hoverEffect,
        'data-hover-translate-y': hoverTranslateY
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
                        className="section-header fade-up"
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
                                    marginBottom: showSectionSubtitle ? '10px' : '0'
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
                    className="insurance-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gap: `${gap}px`,
                        marginTop: `${gridMarginTop}px`,
                        '--columns-tablet': columnsTablet,
                        '--columns-mobile': columnsMobile
                    }}
                    data-columns={columns}
                    data-columns-tablet={columnsTablet}
                    data-columns-mobile={columnsMobile}
                >
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}
