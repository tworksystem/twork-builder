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
        clipPath,
        clipPathPolygon,
        columns,
        gap,
        containerMaxWidth,
        containerPadding,
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        sectionTitleMarginBottom,
        showSectionSubtitle,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        sectionSubtitleMarginBottom,
        animationOnScroll,
        animationDelay,
        animationType
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'twork-amb-fleet-section amb-section amb-fleet-section',
        style: {
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative',
            clipPath: clipPath ? `polygon(${clipPathPolygon})` : 'none'
        },
        'data-animation': animationOnScroll,
        'data-animation-type': animationType,
        'data-animation-delay': animationDelay
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
                className="amb-container jivaka-container"
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
                        className="section-header amb-fleet-header amb-header"
                        style={{
                            textAlign: sectionTitleAlignment,
                            maxWidth: '700px',
                            margin: '0 auto',
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
                                    color: sectionSubtitleColor,
                                    margin: 0
                                }}
                            />
                        )}
                    </div>
                )}

                <div
                    className="amb-fleet-grid twork-amb-fleet-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gap: `${gap}px`,
                        marginTop: '50px'
                    }}
                >
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}
