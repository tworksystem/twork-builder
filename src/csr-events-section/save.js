import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        paddingTopMobile,
        paddingBottomMobile,
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
        containerMaxWidth,
        containerPadding,
        containerPaddingMobile,
        animationOnScroll,
        animationDelay
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'section-padding twork-csr-events-section',
        style: {
            backgroundColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative',
            '--padding-top-mobile': `${paddingTopMobile || 60}px`,
            '--padding-bottom-mobile': `${paddingBottomMobile || 60}px`,
            '--container-padding-mobile': `${containerPaddingMobile || 20}px`
        },
        'data-animation': animationOnScroll,
        'data-animation-delay': animationDelay
    });

    return (
        <section {...blockProps}>
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
                        className="intro-text fade-up"
                        style={{
                            textAlign: sectionTitleAlignment,
                            maxWidth: '800px',
                            margin: `0 auto ${sectionSubtitleMarginBottom}px`
                        }}
                    >
                        {showSectionTitle && (
                            <RichText.Content
                                tagName="h2"
                                value={sectionTitle}
                                style={{
                                    fontSize: `${sectionTitleFontSize}rem`,
                                    fontWeight: sectionTitleFontWeight,
                                    color: sectionTitleColor,
                                    marginBottom: showSectionSubtitle ? `${sectionTitleMarginBottom}px` : '0'
                                }}
                            />
                        )}
                        {showSectionSubtitle && (
                            <RichText.Content
                                tagName="p"
                                value={sectionSubtitle}
                                style={{
                                    fontSize: `${sectionSubtitleFontSize}rem`,
                                    color: sectionSubtitleColor,
                                    margin: 0,
                                    lineHeight: 1.6
                                }}
                            />
                        )}
                    </div>
                )}

                <div className="csr-events-list">
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}
