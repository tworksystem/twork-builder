import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

const DEFAULT_ATTRS = {
    backgroundColor: '#f9f9f9',
    paddingTop: 60,
    paddingBottom: 80,
    containerMaxWidth: 1280,
    containerPadding: 24,
    showSectionTitle: true,
    sectionTitle: 'Conditions We Treat',
    showSectionSubtitle: true,
    sectionSubtitle: 'Targeted therapy for every part of your body.',
    headerAlign: 'center',
    gap: 30,
    animationOnScroll: true,
    animationType: 'fade-up',
    animationDelay: 100,
};

export default function save({ attributes = {} }) {
    const attrs = { ...DEFAULT_ATTRS, ...attributes };
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        showSectionTitle,
        sectionTitle,
        showSectionSubtitle,
        sectionSubtitle,
        headerAlign,
        gap,
        animationOnScroll,
        animationType,
        animationDelay,
    } = attrs;

    const blockProps = useBlockProps.save({
        className: 'phy-section phy-cond-section twork-phy-conditions-section',
        style: {
            backgroundColor,
            paddingTop: `${Number(paddingTop)}px`,
            paddingBottom: `${Number(paddingBottom)}px`,
            position: 'relative',
        },
        'data-animation': animationOnScroll ? 'true' : 'false',
        'data-animation-type': animationType,
        'data-animation-delay': Number(animationDelay),
    });

    return (
        <section {...blockProps}>
            <div
                className="phy-container"
                style={{
                    maxWidth: `${Number(containerMaxWidth)}px`,
                    margin: '0 auto',
                    padding: `0 ${Number(containerPadding)}px`,
                }}
            >
                {(showSectionTitle || showSectionSubtitle) && (
                    <div
                        className={`phy-header ${animationOnScroll ? animationType : ''}`}
                        style={{ textAlign: headerAlign, maxWidth: 700, margin: '0 auto 50px' }}
                    >
                        {showSectionTitle && sectionTitle && (
                            <RichText.Content tagName="h2" value={sectionTitle} />
                        )}
                        {showSectionSubtitle && sectionSubtitle && (
                            <RichText.Content tagName="p" value={sectionSubtitle} />
                        )}
                    </div>
                )}

                <div
                    className="phy-cond-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: `${Number(gap) || 30}px`,
                    }}
                >
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}

