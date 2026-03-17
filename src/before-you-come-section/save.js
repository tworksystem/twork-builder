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
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        sectionTitleMarginBottom,
        showSectionDescription,
        sectionDescription,
        sectionDescriptionColor,
        sectionDescriptionFontSize,
        sectionDescriptionAlignment,
        sectionDescriptionMarginTop,
        sectionDescriptionMarginBottom,
        minColumnWidth,
        gap,
        cardBackgroundColor,
        cardPadding,
        cardBorderRadius
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'twork-before-you-come-section',
        style: {
            backgroundColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative',
            '--byc-min-column': `${minColumnWidth}px`,
            '--byc-gap': `${gap}px`,
            '--byc-card-bg': cardBackgroundColor,
            '--byc-card-padding': `${cardPadding}px`,
            '--byc-card-radius': `${cardBorderRadius}px`
        }
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
                {showSectionTitle && sectionTitle && (
                    <RichText.Content
                        tagName="h2"
                        value={sectionTitle}
                        className="before-you-come-title"
                        style={{
                            textAlign: sectionTitleAlignment,
                            marginBottom: `${sectionTitleMarginBottom}px`,
                            fontSize: `${sectionTitleFontSize}rem`,
                            fontWeight: sectionTitleFontWeight,
                            color: sectionTitleColor,
                            marginTop: 0
                        }}
                    />
                )}
                {showSectionDescription && sectionDescription && (
                    <RichText.Content
                        tagName="p"
                        value={sectionDescription}
                        className="before-you-come-description"
                        style={{
                            textAlign: sectionDescriptionAlignment,
                            marginTop: `${sectionDescriptionMarginTop}px`,
                            marginBottom: `${sectionDescriptionMarginBottom}px`,
                            fontSize: `${sectionDescriptionFontSize}rem`,
                            color: sectionDescriptionColor,
                            lineHeight: 1.6
                        }}
                    />
                )}
                <div
                    className="before-you-come-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}px, 1fr))`,
                        gap: `${gap}px`
                    }}
                >
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}
