import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

const DEFAULT_ATTRS = {
    backgroundColor: 'transparent',
    paddingTop: 60,
    paddingBottom: 80,
    containerMaxWidth: 1280,
    containerPadding: 24,
    showSectionTitle: true,
    sectionTitle: 'Common Questions',
    headerAlign: 'center',
    contentMaxWidth: 800,
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
        headerAlign,
        contentMaxWidth,
        animationOnScroll,
        animationType,
        animationDelay,
    } = attrs;

    const blockProps = useBlockProps.save({
        className: 'phy-section twork-phy-faq-section',
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
                {showSectionTitle && sectionTitle && (
                    <div
                        className={`phy-header ${animationOnScroll ? animationType : ''}`}
                        style={{ textAlign: headerAlign, maxWidth: 700, margin: '0 auto 30px' }}
                    >
                        <RichText.Content tagName="h2" value={sectionTitle} />
                    </div>
                )}

                <div
                    className="fade-up"
                    style={{
                        maxWidth: `${Number(contentMaxWidth)}px`,
                        margin: '0 auto',
                    }}
                >
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}

