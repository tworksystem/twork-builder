import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        paddingTopMobile,
        paddingBottomMobile,
        minColumnWidth,
        gap,
        gapMobile,
        showSectionHeader,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontSizeMobile,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        sectionSubtitleMaxWidth,
        showHeaderLine,
        headerLineColor,
        headerMarginBottom,
        containerMaxWidth,
        containerPadding,
        containerPaddingMobile,
        animationOnScroll,
        animationDelay,
        animationType
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'twork-benefits-section section-padding benefits-section',
        style: {
            backgroundColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            '--padding-top-mobile': `${paddingTopMobile}px`,
            '--padding-bottom-mobile': `${paddingBottomMobile}px`,
            '--gap-mobile': `${gapMobile}px`,
            '--container-padding-mobile': `${containerPaddingMobile}px`
        },
        'data-animation': animationOnScroll,
        'data-animation-delay': animationDelay,
        'data-animation-type': animationType
    });

    return (
        <section {...blockProps}>
            <div
                className="jivaka-container"
                style={{
                    maxWidth: `${containerMaxWidth}px`,
                    margin: '0 auto',
                    padding: `0 ${containerPadding}px`
                }}
            >
                {showSectionHeader && (
                    <div
                        className="section-header fade-up"
                        style={{
                            textAlign: 'center',
                            marginBottom: `${headerMarginBottom}px`
                        }}
                    >
                        <RichText.Content
                            tagName="h2"
                            value={sectionTitle}
                            style={{
                                fontSize: `${sectionTitleFontSize}rem`,
                                margin: '0 0 15px 0',
                                color: sectionTitleColor
                            }}
                        />
                        <RichText.Content
                            tagName="p"
                            value={sectionSubtitle}
                            style={{
                                color: sectionSubtitleColor,
                                fontSize: `${sectionSubtitleFontSize}rem`,
                                maxWidth: `${sectionSubtitleMaxWidth}px`,
                                margin: '0 auto'
                            }}
                        />
                        {showHeaderLine && (
                            <div
                                className="line"
                                style={{
                                    width: '60px',
                                    height: '4px',
                                    background: headerLineColor,
                                    margin: '20px auto 0',
                                    borderRadius: '2px'
                                }}
                            />
                        )}
                    </div>
                )}

                <div
                    className="benefits-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}px, 1fr))`,
                        gap: `${gap}px`
                    }}
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
