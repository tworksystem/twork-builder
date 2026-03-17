import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        sectionTitle,
        sectionSubtitle,
        titleColor,
        subtitleColor,
        gap,
        animationOnScroll,
        animationType,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'hc-section hc-area-section twork-hc-area-section',
        style: {
            backgroundColor: backgroundColor || '#212121',
            color: '#fff',
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
        textAlign: 'center',
    };

    const gridStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: `${gap}px`,
        marginTop: 30,
    };

    return (
        <section {...blockProps}>
            <div className={`hc-container ${animationOnScroll && animationType ? animationType : ''}`} style={containerStyle}>
                {sectionTitle && (
                    <RichText.Content
                        tagName="h2"
                        value={sectionTitle}
                        style={{ color: titleColor || '#fff', marginBottom: 0 }}
                    />
                )}
                {sectionSubtitle && (
                    <RichText.Content
                        tagName="p"
                        value={sectionSubtitle}
                        style={{ opacity: 0.8, marginBottom: 30, marginTop: 10, color: subtitleColor || 'rgba(255,255,255,0.8)' }}
                    />
                )}
                <div className="hc-area-grid" style={gridStyle}>
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}
