import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        marginTop,
        clipPath,
        clipPathPolygon,
        gridMinWidth,
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
        animationDelay
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'twork-amb-tech-section amb-section amb-tech-section',
        style: {
            backgroundColor,
            color: '#fff',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            marginTop: `${marginTop}px`,
            position: 'relative',
            clipPath: clipPath ? `polygon(${clipPathPolygon})` : 'none'
        },
        'data-animation': animationOnScroll,
        'data-animation-delay': animationDelay
    });

    return (
        <section {...blockProps}>
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
                        className="section-header amb-tech-header amb-header"
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
                    className="amb-tech-grid twork-amb-tech-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(auto-fit, minmax(${gridMinWidth}px, 1fr))`,
                        gap: `${gap}px`
                    }}
                >
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}
