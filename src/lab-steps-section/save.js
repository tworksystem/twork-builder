import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

const DEFAULT_ATTRS = {
    backgroundColor: '#fafafa',
    paddingTop: 100,
    paddingBottom: 100,
    containerMaxWidth: 1200,
    containerPadding: 20,
    stepsContainerMaxWidth: 800,
    stepsGap: 40,
    showSectionTitle: true,
    sectionTitle: 'How It Works',
    sectionTitleColor: '#000000',
    sectionTitleFontSize: 2.5,
    sectionTitleFontWeight: 700,
    sectionTitleAlignment: 'center',
    showSectionSubtitle: false,
    sectionSubtitle: '',
    sectionSubtitleColor: '#666666',
    sectionSubtitleFontSize: 1.1,
    animationOnScroll: true,
    animationType: 'stagger-up',
    animationDelay: 100,
    primaryColor: '#f48b2a',
    stepNumTextColor: '#ffffff',
    stepContentBgColor: '#ffffff',
    stepTitleColor: '#000000',
    stepDescColor: '#666666',
    lineColor: '#eeeeee',
};

export default function save({ attributes }) {
    const attrs = { ...DEFAULT_ATTRS, ...attributes };
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        stepsContainerMaxWidth,
        stepsGap,
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        showSectionSubtitle,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        animationOnScroll,
        animationType,
        animationDelay,
        primaryColor,
        stepNumTextColor,
        stepContentBgColor,
        stepTitleColor,
        stepDescColor,
        lineColor,
    } = attrs;

    const blockProps = useBlockProps.save({
        className: 'lab-section twork-lab-steps-section',
        style: {
            backgroundColor: backgroundColor || DEFAULT_ATTRS.backgroundColor,
            paddingTop: `${Number(paddingTop)}px`,
            paddingBottom: `${Number(paddingBottom)}px`,
            position: 'relative',
            '--lab-primary': primaryColor,
            '--lab-step-num-text': stepNumTextColor,
            '--lab-step-content-bg': stepContentBgColor,
            '--lab-step-title-color': stepTitleColor,
            '--lab-step-desc-color': stepDescColor,
            '--lab-step-line-color': lineColor,
        },
        'data-animation': animationOnScroll ? 'true' : 'false',
        'data-animation-type': animationType || 'stagger-up',
        'data-animation-delay': String(Number(animationDelay ?? 100)),
    });

    return (
        <section {...blockProps}>
            <div
                className="lab-container"
                style={{
                    maxWidth: `${Number(containerMaxWidth)}px`,
                    margin: '0 auto',
                    padding: `0 ${Number(containerPadding)}px`,
                    position: 'relative',
                }}
            >
                {(showSectionTitle || showSectionSubtitle) && (
                    <div className="lab-header fade-up" style={{ marginBottom: '60px', textAlign: sectionTitleAlignment }}>
                        {showSectionTitle && (
                            <RichText.Content
                                tagName="h2"
                                value={sectionTitle}
                                style={{
                                    fontSize: `${sectionTitleFontSize}rem`,
                                    fontWeight: sectionTitleFontWeight,
                                    color: sectionTitleColor,
                                    marginBottom: showSectionSubtitle ? '15px' : 0,
                                    marginTop: 0,
                                    textAlign: sectionTitleAlignment,
                                }}
                            />
                        )}
                        {showSectionSubtitle && sectionSubtitle && (
                            <RichText.Content
                                tagName="p"
                                value={sectionSubtitle}
                                style={{
                                    fontSize: `${sectionSubtitleFontSize}rem`,
                                    color: sectionSubtitleColor,
                                    margin: 0,
                                }}
                            />
                        )}
                    </div>
                )}

                <div
                    className="lab-steps-container"
                    style={{
                        maxWidth: `${Number(stepsContainerMaxWidth)}px`,
                        margin: '0 auto',
                        position: 'relative',
                        gap: `${Number(stepsGap)}px`,
                    }}
                >
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}
