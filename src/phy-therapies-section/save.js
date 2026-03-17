import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

const DEFAULT_ATTRS = {
    backgroundColor: 'transparent',
    paddingTop: 60,
    paddingBottom: 80,
    containerMaxWidth: 1280,
    containerPadding: 24,
    showSectionTitle: true,
    sectionTitle: 'Our Therapies',
    showSectionSubtitle: true,
    sectionSubtitle: 'A multimodal approach to faster recovery.',
    headerAlign: 'center',
    gap: 20,
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
        className: 'phy-section twork-phy-therapies-section',
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
        <section {...blockProps} id="services">
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
                    className="phy-services-grid"
                    style={{
                        display: 'flex',
                        gap: `${Number(gap) || 20}px`,
                        minHeight: 400,
                    }}
                >
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}

