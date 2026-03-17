import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        showSectionTitle,
        sectionTitle,
        sectionSubtitle,
        sectionTitleColor,
        sectionSubtitleColor,
        sectionTitleAlignment,
        sectionTitleFontSize,
        sectionSubtitleFontSize,
        gridGap,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'twork-gm-services-section jivaka-gm-section',
        style: {
            backgroundColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    return (
        <section {...blockProps}>
            <div
                className="jivaka-gm-container"
                style={{
                    maxWidth: `${containerMaxWidth}px`,
                    margin: '0 auto',
                    padding: `0 ${containerPadding}px`,
                }}
            >
                {(showSectionTitle || sectionSubtitle) && (
                    <div
                        className="jivaka-gm-header-center"
                        style={{ textAlign: sectionTitleAlignment }}
                    >
                        {showSectionTitle && (
                            <RichText.Content
                                tagName="h2"
                                value={sectionTitle}
                                style={{
                                    color: sectionTitleColor,
                                    fontSize: `${sectionTitleFontSize}rem`,
                                }}
                            />
                        )}
                        {sectionSubtitle && (
                            <RichText.Content
                                tagName="p"
                                value={sectionSubtitle}
                                style={{
                                    color: sectionSubtitleColor,
                                    fontSize: `${sectionSubtitleFontSize}rem`,
                                }}
                            />
                        )}
                    </div>
                )}

                <div
                    className="jivaka-gm-services-grid"
                    style={{ gap: `${gridGap}px` }}
                >
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}

