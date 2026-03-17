import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        backgroundImage,
        backgroundOverlay,
        backgroundOverlayColor,
        backgroundOverlayOpacity,
        heightDesktop,
        heightTablet,
        heightMobile,
        showBreadcrumb,
        breadcrumbText,
        breadcrumbColor,
        breadcrumbFontSize,
        breadcrumbFontSizeTablet,
        breadcrumbFontSizeMobile,
        breadcrumbFontWeight,
        breadcrumbBackground,
        breadcrumbPadding,
        breadcrumbPaddingHorizontal,
        breadcrumbBorderRadius,
        titleText,
        titleHighlightText,
        titleHighlightColor,
        titleColor,
        titleFontSize,
        titleFontSizeTablet,
        titleFontSizeMobile,
        titleFontWeight,
        titleLineHeight,
        titleMarginBottom,
        showSubtitle,
        subtitleText,
        subtitleColor,
        subtitleFontSize,
        subtitleFontSizeTablet,
        subtitleFontSizeMobile,
        subtitleFontWeight,
        subtitleLineHeight,
        subtitleMarginTop,
        subtitleMaxWidth,
        containerMaxWidth,
        containerPadding,
        containerPaddingTablet,
        containerPaddingMobile,
        textAlignment,
        animationOnScroll,
        animationType,
        imageOpacity,
        imageSaturation,
        heroStyle,
        showPrimaryButton,
        primaryButtonText,
        primaryButtonUrl,
        primaryButtonPulse,
        showSecondaryButton,
        secondaryButtonText,
        secondaryButtonUrl
    } = attributes;

    const isEmergency = heroStyle === 'emergency';

    const blockProps = useBlockProps.save({
        className: isEmergency ? 'em-hero page-hero page-hero-emergency' : 'page-hero',
        style: isEmergency
            ? undefined
            : {
                '--hero-height-desktop': `${heightDesktop}px`,
                '--hero-height-tablet': `${heightTablet}px`,
                '--hero-height-mobile': `${heightMobile}px`
            },
        'data-animation': animationOnScroll,
        'data-animation-type': animationType
    });

    const containerStyle = {
        position: 'relative',
        zIndex: 3,
        width: '100%',
        maxWidth: isEmergency ? 1280 : containerMaxWidth,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        textAlign: textAlignment,
        '--container-padding-desktop': `${containerPadding}px`,
        '--container-padding-tablet': `${containerPaddingTablet}px`,
        '--container-padding-mobile': `${containerPaddingMobile}px`
    };

    if (isEmergency) {
        return (
            <header {...blockProps}>
                {backgroundImage && (
                    <img
                        src={backgroundImage}
                        alt=""
                        className="em-hero-bg"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: imageOpacity ?? 0.4,
                            filter: `saturate(${imageSaturation})`
                        }}
                    />
                )}
                <div className="em-container" style={containerStyle}>
                    <div className="em-hero-content em-animate-hero">
                        {showBreadcrumb !== false && breadcrumbText && (
                            <RichText.Content tagName="span" value={breadcrumbText} className="em-hero-badge" />
                        )}
                        {titleText && (
                            <RichText.Content tagName="h1" value={titleText} className="em-hero-title" />
                        )}
                        {showSubtitle !== false && subtitleText && (
                            <RichText.Content tagName="p" value={subtitleText} className="em-hero-desc" />
                        )}
                        <div className="em-hero-buttons">
                            {showPrimaryButton !== false && primaryButtonText && (
                                <a
                                    href={primaryButtonUrl || '#'}
                                    className={`em-btn em-btn-primary ${primaryButtonPulse !== false ? 'em-btn-pulse' : ''}`}
                                >
                                    <i className="fas fa-phone-alt" aria-hidden="true" />
                                    {primaryButtonText}
                                </a>
                            )}
                            {showSecondaryButton !== false && secondaryButtonText && (
                                <a
                                    href={secondaryButtonUrl || '#'}
                                    className="em-btn em-btn-glass"
                                >
                                    {secondaryButtonText}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <section {...blockProps}>
            {backgroundImage && (
                <div
                    className="hero-bg-wrapper"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '120%',
                        zIndex: 1
                    }}
                >
                    <img
                        src={backgroundImage}
                        alt=""
                        className="hero-bg-img"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: imageOpacity,
                            filter: `saturate(${imageSaturation})`
                        }}
                    />
                </div>
            )}

            {backgroundImage && backgroundOverlay && (
                <div
                    className="background-overlay"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: backgroundOverlayColor,
                        opacity: backgroundOverlayOpacity,
                        zIndex: 2
                    }}
                />
            )}

            <div className="hero-container animate-hero" style={containerStyle}>
                {showBreadcrumb && (
                    <RichText.Content
                        tagName="span"
                        value={breadcrumbText}
                        className="hero-breadcrumb"
                        style={{
                            fontWeight: breadcrumbFontWeight,
                            color: breadcrumbColor,
                            background: breadcrumbBackground,
                            padding: `${breadcrumbPadding}px ${breadcrumbPaddingHorizontal}px`,
                            borderRadius: `${breadcrumbBorderRadius}px`,
                            display: 'inline-block',
                            marginBottom: '15px',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            backdropFilter: 'blur(5px)',
                            '--breadcrumb-font-size-desktop': `${breadcrumbFontSize}rem`,
                            '--breadcrumb-font-size-tablet': `${breadcrumbFontSizeTablet}rem`,
                            '--breadcrumb-font-size-mobile': `${breadcrumbFontSizeMobile}rem`
                        }}
                    />
                )}

                <h1
                    className="hero-title"
                    style={{
                        fontWeight: titleFontWeight,
                        color: titleColor,
                        lineHeight: titleLineHeight,
                        margin: `0 0 ${titleMarginBottom}px 0`,
                        '--title-font-size-desktop': `${titleFontSize}rem`,
                        '--title-font-size-tablet': `${titleFontSizeTablet}rem`,
                        '--title-font-size-mobile': `${titleFontSizeMobile}rem`
                    }}
                >
                    <RichText.Content tagName="span" value={titleText} className="hero-title-main" />
                    {titleHighlightText && (
                        <RichText.Content
                            tagName="span"
                            value={titleHighlightText}
                            className="hero-title-highlight"
                            style={{ color: titleHighlightColor }}
                        />
                    )}
                </h1>

                {showSubtitle && subtitleText && (
                    <RichText.Content
                        tagName="p"
                        className="hero-subtitle"
                        value={subtitleText}
                        style={{
                            color: subtitleColor,
                            fontWeight: subtitleFontWeight,
                            lineHeight: subtitleLineHeight,
                            margin: `${subtitleMarginTop || 0}px auto 0`,
                            maxWidth: subtitleMaxWidth ? `${subtitleMaxWidth}px` : undefined,
                            '--subtitle-font-size-desktop': `${subtitleFontSize}rem`,
                            '--subtitle-font-size-tablet': `${subtitleFontSizeTablet}rem`,
                            '--subtitle-font-size-mobile': `${subtitleFontSizeMobile}rem`
                        }}
                    />
                )}
            </div>
        </section>
    );
}
