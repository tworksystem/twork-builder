import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        backgroundColor,
        backgroundImage,
        backgroundOverlay,
        backgroundOverlayColor,
        backgroundOverlayOpacity,
        paddingTop,
        paddingBottom,
        gap,
        gapTablet,
        gapMobile,
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
        containerMaxWidth,
        containerPadding,
        alignItems,
        hoverEffect,
        animationOnScroll,
        animationDelay,
        animationType
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'twork-story-section',
        style: {
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative'
        },
        'data-hover-effect': hoverEffect ? 'true' : 'false',
        'data-animation': animationOnScroll ? 'true' : 'false',
        'data-animation-type': animationType || 'fadeInUp',
        'data-animation-delay': animationDelay || 100
    });

    return (
        <section {...blockProps}>
            {backgroundImage && backgroundOverlay && (
                <div 
                    className="background-overlay"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: backgroundOverlayColor,
                        opacity: backgroundOverlayOpacity,
                        zIndex: 1
                    }}
                />
            )}

            <div 
                className="jivaka-container story-grid"
                style={{
                    maxWidth: `${containerMaxWidth}px`,
                    margin: '0 auto',
                    padding: `0 ${containerPadding}px`,
                    position: 'relative',
                    zIndex: 2,
                    display: 'grid',
                    gridTemplateColumns: '1fr', // Single column - each story item spans full width
                    gap: `${gap}px`,
                    alignItems: alignItems,
                    '--story-grid-gap': `${gap}px`,
                    '--story-grid-gap-tablet': `${gapTablet}px`,
                    '--story-grid-gap-mobile': `${gapMobile}px`
                }}
            >
                {(showSectionTitle || showSectionSubtitle) && (
                    <div 
                        className="section-header"
                        style={{
                            gridColumn: '1 / -1',
                            textAlign: sectionTitleAlignment,
                            marginBottom: '50px'
                        }}
                    >
                        {showSectionTitle && (
                            <RichText.Content
                                tagName="h2"
                                value={sectionTitle}
                                className="section-title"
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
                                className="section-subtitle"
                                style={{
                                    fontSize: `${sectionSubtitleFontSize}rem`,
                                    color: sectionSubtitleColor,
                                    margin: 0
                                }}
                            />
                        )}
                    </div>
                )}

                <InnerBlocks.Content />
            </div>
        </section>
    );
}
