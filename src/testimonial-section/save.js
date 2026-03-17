/**
 * Twork Testimonial Section – Save
 * Matches home.html: testimonials-section, section-top-link, jivaka-section-title, testimonials-grid.
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        backgroundColor,
        backgroundImage,
        backgroundOverlay,
        backgroundOverlayColor,
        backgroundOverlayOpacity,
        paddingTop,
        paddingBottom,
        paddingTopMobile,
        paddingBottomMobile,
        showSectionTopLink,
        sectionTopLinkText,
        sectionTopLinkUrl,
        showMetaTitle,
        metaTitle,
        metaTitleColor,
        metaTitleFontSize,
        metaTitleFontSizeTablet,
        metaTitleFontSizeMobile,
        showSectionTitle,
        sectionTitle,
        highlightText,
        highlightColor,
        showSubtitle,
        subtitle,
        subtitleColor,
        subtitleFontSize,
        subtitleFontSizeTablet,
        subtitleFontSizeMobile,
        columns,
        columnsTablet,
        columnsMobile,
        gap,
        gapMobile,
        minColumnWidth,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontSizeTablet,
        sectionTitleFontSizeMobile,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        sectionTitleAlignmentTablet,
        sectionTitleAlignmentMobile,
        sectionTitleMarginBottom,
        containerMaxWidth,
        containerPadding,
        containerPaddingMobile,
        cardBorderRadius,
        cardBorderColor,
        cardBoxShadow,
        animationOnScroll,
        animationDelay,
        animationType
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'testimonials-section jivaka-section twork-testimonial-section',
        style: {
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
            ...(backgroundImage && {
                backgroundImage: `linear-gradient(rgba(244, 139, 42, 0.9), rgba(244, 139, 42, 0.9)), url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }),
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative',
            '--padding-top-mobile': `${paddingTopMobile ?? 60}px`,
            '--padding-bottom-mobile': `${paddingBottomMobile ?? 60}px`,
            '--container-padding': `${containerPadding ?? 20}px`,
            '--container-padding-mobile': `${containerPaddingMobile ?? 20}px`,
            '--columns': columns ?? 4,
            '--columns-tablet': columnsTablet ?? 3,
            '--columns-mobile': columnsMobile ?? 1,
            '--gap': `${gap ?? 20}px`,
            '--gap-mobile': `${gapMobile ?? 40}px`,
            '--meta-font-size': `${metaTitleFontSize ?? 0.9}rem`,
            '--meta-font-size-tablet': `${metaTitleFontSizeTablet ?? 0.85}rem`,
            '--meta-font-size-mobile': `${metaTitleFontSizeMobile ?? 0.8}rem`,
            '--section-title-font-size': `${sectionTitleFontSize ?? 2.5}rem`,
            '--section-title-font-size-tablet': `${sectionTitleFontSizeTablet ?? 2.2}rem`,
            '--section-title-font-size-mobile': `${sectionTitleFontSizeMobile ?? 1.8}rem`,
            '--section-title-alignment': sectionTitleAlignment ?? 'center',
            '--section-title-alignment-tablet': sectionTitleAlignmentTablet ?? 'center',
            '--section-title-alignment-mobile': sectionTitleAlignmentMobile ?? 'center',
            '--subtitle-font-size': `${subtitleFontSize ?? 1.1}rem`,
            '--subtitle-font-size-tablet': `${subtitleFontSizeTablet ?? 1.05}rem`,
            '--subtitle-font-size-mobile': `${subtitleFontSizeMobile ?? 1}rem`
        },
        'data-columns': columns,
        'data-columns-tablet': columnsTablet,
        'data-columns-mobile': columnsMobile,
        'data-gap': gap,
        'data-gap-mobile': gapMobile,
        'data-animation': animationOnScroll,
        'data-animation-type': animationType,
        'data-animation-delay': animationDelay
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
                        zIndex: 1,
                        pointerEvents: 'none'
                    }}
                />
            )}

            <div
                className="jivaka-container"
                style={{
                    maxWidth: `${containerMaxWidth ?? 1200}px`,
                    margin: '0 auto',
                    paddingLeft: `${containerPadding ?? 20}px`,
                    paddingRight: `${containerPadding ?? 20}px`,
                    paddingTop: 0,
                    paddingBottom: 0,
                    position: 'relative',
                    zIndex: 2
                }}
            >
                {showSectionTopLink && (
                    <div className="section-top-link">
                        <a href={sectionTopLinkUrl || '#'}>{sectionTopLinkText || 'View All Services'}</a>
                    </div>
                )}

                {(showMetaTitle || showSectionTitle || showSubtitle) && (
                    <div className="jivaka-section-title">
                        {showMetaTitle && (
                            <p className="meta-title">{metaTitle}</p>
                        )}
                        {showSectionTitle && (
                            <h2>
                                {sectionTitle}
                                {highlightText && !(sectionTitle || '').trimEnd().endsWith((highlightText || '').trim()) && (
                                    <span className="highlight-dark">
                                        {sectionTitle && !sectionTitle.endsWith(' ') ? ' ' : ''}{highlightText}
                                    </span>
                                )}
                            </h2>
                        )}
                        {showSubtitle && (
                            <p className="subtitle">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                <div className="testimonials-grid">
                    <InnerBlocks.Content />
                </div>
            </div>
        </section>
    );
}
