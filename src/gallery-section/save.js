import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        paddingTopMobile,
        paddingBottomMobile,
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontSizeMobile,
        sectionTitleFontWeight,
        showSectionSubtitle,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        sectionTitleAlignment,
        sectionHeaderMarginBottom,
        tabsMarginBottom,
        tabs,
        containerMaxWidth,
        containerPadding,
        gridColumns,
        gridColumnsTablet,
        gridColumnsMobile,
        gridGap,
        gridAutoRows
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'twork-gallery-section section-padding gallery-section',
        style: {
            backgroundColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative',
            '--padding-top-mobile': `${paddingTopMobile}px`,
            '--padding-bottom-mobile': `${paddingBottomMobile}px`,
            '--title-font-size-mobile': `${sectionTitleFontSizeMobile}rem`,
            '--grid-columns-tablet': gridColumnsTablet,
            '--grid-columns-mobile': gridColumnsMobile,
            '--grid-gap': `${gridGap}px`,
            '--grid-auto-rows': `${gridAutoRows}px`
        },
        'data-grid-columns': gridColumns,
        'data-grid-columns-tablet': gridColumnsTablet,
        'data-grid-columns-mobile': gridColumnsMobile
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
                {(showSectionTitle || showSectionSubtitle) && (
                    <div
                        className="section-header fade-up"
                        style={{
                            textAlign: sectionTitleAlignment,
                            marginBottom: `${sectionHeaderMarginBottom}px`
                        }}
                    >
                        {showSectionTitle && (
                            <RichText.Content
                                tagName="h2"
                                value={sectionTitle}
                                style={{
                                    fontSize: `${sectionTitleFontSize}rem`,
                                    fontWeight: sectionTitleFontWeight,
                                    color: sectionTitleColor,
                                    marginBottom: showSectionSubtitle ? '10px' : '0'
                                }}
                            />
                        )}
                        {showSectionSubtitle && (
                            <RichText.Content
                                tagName="p"
                                value={sectionSubtitle}
                                style={{
                                    fontSize: `${sectionSubtitleFontSize}rem`,
                                    color: sectionSubtitleColor,
                                    margin: 0
                                }}
                            />
                        )}
                    </div>
                )}

                {tabs && tabs.length > 0 && (
                    <div
                        className="gallery-tabs fade-up"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '15px',
                            marginBottom: `${tabsMarginBottom}px`,
                            flexWrap: 'wrap'
                        }}
                    >
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.id}
                                type="button"
                                className={`tab-btn ${index === 0 ? 'active' : ''}`}
                                data-filter={tab.filter}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                )}

                <div
                    className="gallery-grid"
                    id="galleryGrid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                        gap: `${gridGap}px`,
                        gridAutoRows: `${gridAutoRows}px`
                    }}
                    data-columns={gridColumns}
                    data-columns-tablet={gridColumnsTablet}
                    data-columns-mobile={gridColumnsMobile}
                >
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}
