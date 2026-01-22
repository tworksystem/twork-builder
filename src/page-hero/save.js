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
        containerMaxWidth,
        containerPadding,
        containerPaddingTablet,
        containerPaddingMobile,
        textAlignment,
        animationOnScroll,
        animationType,
        imageOpacity,
        imageSaturation
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'page-hero',
        style: {
            // Use CSS variables only; actual height is handled in SCSS to keep it responsive
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
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        textAlign: textAlignment,
        // Responsive paddings driven by CSS variables, actual padding defined in SCSS
        '--container-padding-desktop': `${containerPadding}px`,
        '--container-padding-tablet': `${containerPaddingTablet}px`,
        '--container-padding-mobile': `${containerPaddingMobile}px`
    };

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

            <div 
                className="hero-container animate-hero"
                style={containerStyle}
            >
                {showBreadcrumb && (
                    <span 
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
                    >
                        {breadcrumbText}
                    </span>
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
                    <span className="hero-title-main">
                        {titleText}
                    </span>
                    {titleHighlightText && (
                        <span
                            className="hero-title-highlight"
                            style={{ color: titleHighlightColor }}
                        >
                            {titleHighlightText}
                        </span>
                    )}
                </h1>
            </div>
        </section>
    );
}
