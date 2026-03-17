import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        columns,
        columnsTablet,
        columnsMobile,
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
        showConnectorLine,
        stepNumberColor,
        stepNumberBgColor,
        animationOnScroll,
        animationDelay
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'twork-amb-process-section amb-section amb-process-section',
        style: {
            backgroundColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative',
            '--amb-step-number-color': stepNumberColor,
            '--amb-step-number-bg': stepNumberBgColor,
            '--amb-process-gap': gap != null ? `${gap}px` : '20px',
            '--amb-container-padding': containerPadding != null ? `${containerPadding}px` : '20px'
        },
        'data-animation': animationOnScroll,
        'data-connector': showConnectorLine,
        'data-animation-delay': animationDelay,
        'data-columns': columns,
        'data-columns-tablet': columnsTablet,
        'data-columns-mobile': columnsMobile
    });

    return (
        <section {...blockProps}>
            <div
                className="amb-container jivaka-container"
                style={{
                    maxWidth: `${containerMaxWidth}px`,
                    margin: '0 auto',
                    padding: '0 var(--amb-container-padding)',
                    position: 'relative',
                    zIndex: 2
                }}
            >
                {showSectionTitle && sectionTitle && (
                    <div
                        className="section-header amb-process-header amb-header"
                        style={{
                            textAlign: sectionTitleAlignment,
                            marginBottom: `${sectionTitleMarginBottom}px`
                        }}
                    >
                        <RichText.Content
                            tagName="h2"
                            value={sectionTitle}
                            className="section-title"
                            style={{
                                fontSize: `${sectionTitleFontSize}rem`,
                                fontWeight: sectionTitleFontWeight,
                                color: sectionTitleColor,
                                marginTop: 0,
                                marginBottom: 0
                            }}
                        />
                    </div>
                )}

                <div className="amb-steps twork-amb-steps">
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}
