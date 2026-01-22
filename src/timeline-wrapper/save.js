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
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        sectionTitleMarginBottom,
        showSectionSubtitle,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        sectionSubtitleFontWeight,
        sectionSubtitleMarginBottom,
        containerMaxWidth,
        containerPadding,
        timelineLineColor,
        timelineLineWidth,
        timelineProgressColor,
        timelineDotSize,
        timelineDotBorderWidth,
        timelineDotColor,
        timelineItemGap,
        timelineContentBorderRadius,
        timelineContentBoxShadow,
        timelineContentBoxShadowColor,
        timelineContentBoxShadowBlur,
        timelineContentBoxShadowSpread,
        timelineContentBoxShadowOffsetX,
        timelineContentBoxShadowOffsetY,
        hoverEffect,
        hoverTranslateY,
        hoverScale,
        animationOnScroll,
        animationDelay,
        animationType
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'twork-timeline-wrapper-section',
        style: {
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative'
        },
        'data-hover-effect': hoverEffect,
        'data-hover-translate-y': hoverTranslateY,
        'data-hover-scale': hoverScale,
        'data-animation': animationOnScroll,
        'data-animation-type': animationType,
        'data-animation-delay': animationDelay,
        'data-timeline-line-color': timelineLineColor,
        'data-timeline-line-width': timelineLineWidth,
        'data-timeline-progress-color': timelineProgressColor,
        'data-timeline-dot-size': timelineDotSize,
        'data-timeline-dot-border-width': timelineDotBorderWidth,
        'data-timeline-dot-color': timelineDotColor,
        'data-timeline-item-gap': timelineItemGap,
        'data-timeline-content-border-radius': timelineContentBorderRadius,
        'data-timeline-content-box-shadow': timelineContentBoxShadow,
        'data-timeline-content-box-shadow-color': timelineContentBoxShadowColor,
        'data-timeline-content-box-shadow-blur': timelineContentBoxShadowBlur,
        'data-timeline-content-box-shadow-spread': timelineContentBoxShadowSpread,
        'data-timeline-content-box-shadow-offset-x': timelineContentBoxShadowOffsetX,
        'data-timeline-content-box-shadow-offset-y': timelineContentBoxShadowOffsetY
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
                        className="section-header"
                        style={{
                            textAlign: sectionTitleAlignment,
                            marginBottom: `${sectionSubtitleMarginBottom}px`
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
                                    marginBottom: showSectionSubtitle ? `${sectionTitleMarginBottom}px` : '0',
                                    marginTop: 0
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
                                    fontWeight: sectionSubtitleFontWeight,
                                    color: sectionSubtitleColor,
                                    margin: 0
                                }}
                            />
                        )}
                    </div>
                )}

                <div 
                    className="timeline-wrapper twork-timeline-wrapper"
                    style={{
                        position: 'relative',
                        padding: '40px 0',
                        '--timeline-line-color': timelineLineColor || '#eeeeee',
                        '--timeline-line-width': `${timelineLineWidth || 4}px`,
                        '--timeline-progress-color': timelineProgressColor || '#f48b2a',
                        '--timeline-dot-size': `${timelineDotSize || 20}px`,
                        '--timeline-dot-border-width': `${timelineDotBorderWidth || 4}px`,
                        '--timeline-dot-color': timelineDotColor || '#f48b2a',
                        '--timeline-item-gap': `${timelineItemGap || 80}px`,
                        '--timeline-content-border-radius': `${timelineContentBorderRadius || 10}px`,
                        '--timeline-content-box-shadow': timelineContentBoxShadow 
                            ? `${timelineContentBoxShadowOffsetX || 0}px ${timelineContentBoxShadowOffsetY || 5}px ${timelineContentBoxShadowBlur || 15}px ${timelineContentBoxShadowSpread || 0}px ${timelineContentBoxShadowColor || 'rgba(0, 0, 0, 0.05)'}`
                            : 'none'
                    }}
                >
                    {/* IMPORTANT: No inline layout styles here.
                        Inline styles would override responsive CSS (mobile/tablet breakpoints).
                        Colors/widths are controlled via CSS vars on the wrapper above. */}
                    <div className="timeline-line" aria-hidden="true" />
                    <div className="timeline-progress" aria-hidden="true" />
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}
