import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

const DEFAULT_ATTRS = {
    backgroundColor: '#ffffff',
    primaryColor: '#f48b2a',
    headingColor: '#000000',
    subtitleColor: '#666666',
    cardBackgroundColor: '#ffffff',
    hexIconBgColor: '#f2f2f2',
    paddingTop: 100,
    paddingBottom: 100,
    containerMaxWidth: 1200,
    containerPadding: 20,
    showSectionHeader: true,
    sectionTitle: 'Our Departments',
    sectionSubtitle: 'We cover the full spectrum of diagnostic pathology.',
    headerAlign: 'center',
    headerMaxWidth: 700,
    gap: 30,
    minColumnWidth: 300,
    animationOnScroll: true,
};

export default function save({ attributes = {} }) {
    const attrs = { ...DEFAULT_ATTRS, ...attributes };
    const {
        backgroundColor,
        primaryColor,
        headingColor,
        subtitleColor,
        cardBackgroundColor,
        hexIconBgColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        showSectionHeader,
        sectionTitle,
        sectionSubtitle,
        headerAlign,
        headerMaxWidth,
        gap,
        minColumnWidth,
        animationOnScroll,
    } = attrs;

    const blockProps = useBlockProps.save({
        className: 'lab-section twork-lab-depts-section',
        style: {
            backgroundColor,
            paddingTop: `${Number(paddingTop)}px`,
            paddingBottom: `${Number(paddingBottom)}px`,
            position: 'relative',
            '--lab-primary': primaryColor,
            '--lab-text': headingColor,
            '--lab-text-muted': subtitleColor,
            '--lab-bg': cardBackgroundColor,
            '--lab-hex-bg': hexIconBgColor,
        },
        'data-animation': animationOnScroll ? 'true' : 'false',
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
                {showSectionHeader && (
                    <div
                        className={`lab-header ${animationOnScroll ? 'fade-up' : ''}`}
                        style={{
                            textAlign: headerAlign,
                            maxWidth: `${Number(headerMaxWidth)}px`,
                            margin: '0 auto 30px',
                        }}
                    >
                        {sectionTitle && (
                            <RichText.Content tagName="h2" value={sectionTitle} />
                        )}
                        {sectionSubtitle && (
                            <RichText.Content tagName="p" value={sectionSubtitle} />
                        )}
                    </div>
                )}

                <div
                    className="lab-dept-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(auto-fit, minmax(${Number(minColumnWidth)}px, 1fr))`,
                        gap: `${Number(gap)}px`,
                    }}
                >
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}

