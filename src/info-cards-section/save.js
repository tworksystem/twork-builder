import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

const DEFAULT_ATTRS = {
    showSectionHeader: true,
    sectionTitle: 'Contact & Information',
    showSectionDescription: true,
    sectionDescription: 'Get in touch or find what you need.',
    headerAlign: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingBottom: 60,
    containerMaxWidth: 1100,
    containerPadding: 20,
    columns: 3,
    columnsTablet: 2,
    columnsMobile: 1,
    gap: 24,
    accentColor: '#dc3545',
    iconColor: '#dc3545',
    iconBackground: '#fff2e8',
    animationOnScroll: true,
    animationDelay: 120,
    animationType: 'fadeInUp'
};

export default function save({ attributes = {} }) {
    const attrs = { ...DEFAULT_ATTRS, ...attributes };
    const {
        showSectionHeader,
        sectionTitle,
        showSectionDescription,
        sectionDescription,
        headerAlign,
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        columns,
        columnsTablet,
        columnsMobile,
        gap,
        accentColor,
        iconColor,
        iconBackground,
        animationOnScroll,
        animationDelay,
        animationType
    } = attrs;

    const blockProps = useBlockProps.save({
        className: 'info-cards-section',
        style: {
            backgroundColor: backgroundColor ?? DEFAULT_ATTRS.backgroundColor,
            paddingTop: `${Number(paddingTop)}px`,
            paddingBottom: `${Number(paddingBottom)}px`,
            '--info-accent-color': accentColor ?? DEFAULT_ATTRS.accentColor,
            '--info-icon-color': iconColor ?? accentColor ?? DEFAULT_ATTRS.iconColor,
            '--info-icon-bg': iconBackground ?? DEFAULT_ATTRS.iconBackground,
            '--info-columns-desktop': columns,
            '--info-columns-tablet': columnsTablet,
            '--info-columns-mobile': columnsMobile,
            '--info-grid-gap': `${Number(gap)}px`
        },
        'data-animation': animationOnScroll === true ? 'true' : 'false',
        'data-animation-type': typeof animationType === 'string' ? animationType : DEFAULT_ATTRS.animationType,
        'data-animation-delay': Number(animationDelay)
    });

    return (
        <section {...blockProps}>
            <div
                className="jivaka-container"
                style={{
                    maxWidth: `${Number(containerMaxWidth)}px`,
                    margin: '0 auto',
                    padding: `0 ${Number(containerPadding)}px`
                }}
            >
                {(showSectionHeader || showSectionDescription) && (
                    <div
                        className="info-cards-section-header"
                        style={{ textAlign: headerAlign || 'center' }}
                    >
                        {showSectionHeader && sectionTitle && (
                            <RichText.Content
                                tagName="h2"
                                className="info-cards-section-title"
                                value={sectionTitle}
                            />
                        )}
                        {showSectionDescription && sectionDescription && (
                            <RichText.Content
                                tagName="p"
                                className="info-cards-section-description"
                                value={sectionDescription}
                            />
                        )}
                    </div>
                )}
                <div className="info-grid">
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}
