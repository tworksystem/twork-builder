import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        contentMaxWidth,
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        animationOnScroll,
        animationType,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'hc-section twork-hc-faq-section',
        style: {
            backgroundColor: backgroundColor || '#fafafa',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
        'data-animation': animationOnScroll,
        'data-animation-type': animationType || 'fade-up',
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
    };

    const innerStyle = {
        maxWidth: `${contentMaxWidth}px`,
        margin: '0 auto',
    };

    return (
        <section {...blockProps}>
            <div className="hc-container" style={containerStyle}>
                {showSectionTitle && sectionTitle && (
                    <div
                        className={`hc-header ${animationOnScroll && animationType ? animationType : ''}`}
                        style={{ textAlign: 'center', marginBottom: 30 }}
                    >
                        <RichText.Content
                            tagName="h2"
                            value={sectionTitle}
                            style={{ color: sectionTitleColor || '#212121' }}
                        />
                    </div>
                )}
                <div style={innerStyle}>
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}
