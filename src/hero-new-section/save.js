import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        backgroundType,
        backgroundImage,
        backgroundImageAlt,
        slideshowImages = [],
        slideshowInterval,
        slideshowStyle,
        slideshowImagePosition,
        backgroundVideoUrl,
        backgroundVideoId,
        videoPosterUrl,
        videoLoop,
        videoMuted,
        videoAutoplay,
        imageOpacity,
        imageScale,
        showOverlay,
        overlayGradientStart,
        overlayGradientMid,
        overlayGradientEnd,
        minHeight,
        minHeightTablet,
        minHeightMobile,
        taglineText,
        headingLine1,
        headingHighlight,
        headingLine2,
        headingHighlightColor,
        description,
        primaryButtonText,
        primaryButtonUrl,
        primaryButtonOpenInNewTab,
        showPrimaryButton = true,
        primaryButtonIconType = 'dashicon',
        primaryButtonIconValue = 'dashicons-arrow-right-alt2',
        primaryButtonIconImageUrl = '',
        primaryButtonIconPosition = 'right',
        primaryButtonBgColor = '',
        primaryButtonTextColor = '',
        primaryButtonBorderRadius = 6,
        primaryButtonPaddingV = 14,
        primaryButtonPaddingH = 32,
        primaryButtonFontSize = 0.85,
        primaryButtonHoverBgColor = '',
        primaryButtonHoverTextColor = '',
        secondaryButtonText,
        secondaryButtonUrl,
        secondaryButtonOpenInNewTab,
        showSecondaryButton = true,
        secondaryButtonIconType = 'dashicon',
        secondaryButtonIconValue = 'dashicons-admin-users',
        secondaryButtonIconImageUrl = '',
        secondaryButtonIconPosition = 'right',
        secondaryButtonBgColor = '',
        secondaryButtonTextColor = '',
        secondaryButtonBorderRadius = 6,
        secondaryButtonPaddingV = 14,
        secondaryButtonPaddingH = 32,
        secondaryButtonFontSize = 0.85,
        secondaryButtonHoverBgColor = '',
        secondaryButtonHoverTextColor = '',
        showGlassCard,
        glassCardTitle,
        glassCardDescription,
        containerMaxWidth,
        containerPadding,
        animationOnScroll
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'hero-new wp-block-twork-hero-new-section',
        style: {
            '--hero-new-min-height': `${minHeight}px`,
            '--hero-new-min-height-tablet': `${minHeightTablet}px`,
            '--hero-new-min-height-mobile': `${minHeightMobile}px`
        },
        'data-animation': animationOnScroll ? 'true' : 'false',
        'data-background-type': backgroundType || 'image'
    });

    const overlayStyle = showOverlay ? {
        background: `linear-gradient(90deg, ${overlayGradientStart} 0%, ${overlayGradientMid} 40%, ${overlayGradientEnd} 100%)`
    } : undefined;

    const primaryButtonTarget = primaryButtonOpenInNewTab ? '_blank' : undefined;
    const primaryButtonRel = primaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined;
    const secondaryButtonTarget = secondaryButtonOpenInNewTab ? '_blank' : undefined;
    const secondaryButtonRel = secondaryButtonOpenInNewTab ? 'noopener noreferrer' : undefined;

    // Normalize slideshow: support array of { url, alt } or legacy string URLs; filter invalid entries
    const slides = Array.isArray(slideshowImages)
        ? slideshowImages
            .map((item) => {
                if (!item) return null;
                const url = typeof item === 'string' ? item : (item.url || item.src || '');
                const alt = typeof item === 'string' ? '' : (item.alt || '');
                return url ? { url, alt } : null;
            })
            .filter(Boolean)
        : [];
    const hasSlideshow = backgroundType === 'slideshow' && slides.length > 0;
    const hasVideo = backgroundType === 'video' && backgroundVideoUrl;

    return (
        <section {...blockProps}>
            {/* Background media */}
            {(!backgroundType || backgroundType === 'image') && backgroundImage && (
                <img
                    decoding="async"
                    src={backgroundImage}
                    alt={backgroundImageAlt || ''}
                    className="hero-bg-img"
                    style={{
                        opacity: imageOpacity,
                        transform: `scale(${imageScale})`
                    }}
                />
            )}

            {hasSlideshow && (
                <div
                    className="hero-bg-slideshow"
                    data-slideshow-interval={Number(slideshowInterval) || 5000}
                    data-slideshow-count={slides.length}
                    data-slideshow-style={slideshowStyle || 'fade'}
                    data-slideshow-position={slideshowImagePosition || 'center'}
                >
                    {slides.map((img, index) => (
                        <img
                            key={index}
                            src={img.url}
                            alt={img.alt || ''}
                            className={'hero-bg-slide' + (index === 0 ? ' is-active' : '')}
                            decoding="async"
                        />
                    ))}
                </div>
            )}

            {hasVideo && (
                <div className="hero-bg-video-wrap">
                    <video
                        className="hero-bg-video"
                        src={backgroundVideoUrl}
                        poster={videoPosterUrl || undefined}
                        autoPlay={videoAutoplay}
                        muted={videoMuted}
                        loop={videoLoop}
                        playsInline
                    />
                </div>
            )}

            {showOverlay && (
                <div
                    className="hero-overlay"
                    style={overlayStyle}
                />
            )}

            <div
                className="hero-content-wrapper"
                style={{
                    maxWidth: `${containerMaxWidth}px`,
                    '--hero-container-padding': `${containerPadding}px`,
                    '--hero-container-padding-mobile': `${Math.min(containerPadding, 16)}px`
                }}
            >
                <div className={`hero-text-col ${animationOnScroll ? 'gsap-reveal' : ''}`}>
                    <div className="top-tagline">
                        <span className="dot" />
                        <span dangerouslySetInnerHTML={{ __html: taglineText || '' }} />
                    </div>
                    <h1 className="main-heading">
                        {headingLine1 && (
                            <>
                                {headingLine1}
                                <br />
                            </>
                        )}
                        {headingHighlight && (
                            <span
                                className="text-orange"
                                style={headingHighlightColor ? { color: headingHighlightColor } : undefined}
                            >
                                {headingHighlight}
                            </span>
                        )}
                        {headingLine2 && ` ${headingLine2}`}
                    </h1>
                    <RichText.Content
                        tagName="p"
                        value={description}
                        className="hero-desc"
                    />
                    {(showPrimaryButton || showSecondaryButton) && (
                        <div className="hero-btns">
                            {showPrimaryButton && (
                                <a
                                    href={primaryButtonUrl || '#'}
                                    className="jivaka-btn btn-primary hero-btn-primary"
                                    target={primaryButtonTarget}
                                    rel={primaryButtonRel}
                                    style={{
                                        ...(primaryButtonBgColor && { backgroundColor: primaryButtonBgColor }),
                                        ...(primaryButtonTextColor && { color: primaryButtonTextColor }),
                                        borderRadius: `${primaryButtonBorderRadius}px`,
                                        padding: `${primaryButtonPaddingV}px ${primaryButtonPaddingH}px`,
                                        fontSize: `${primaryButtonFontSize}rem`,
                                        ...(primaryButtonHoverBgColor && { '--hero-primary-hover-bg': primaryButtonHoverBgColor }),
                                        ...(primaryButtonHoverTextColor && { '--hero-primary-hover-color': primaryButtonHoverTextColor })
                                    }}
                                >
                                    {primaryButtonIconType === 'dashicon' && primaryButtonIconPosition === 'left' && primaryButtonIconValue && (
                                        <span className={`dashicons ${primaryButtonIconValue}`} aria-hidden="true" />
                                    )}
                                    {primaryButtonIconType === 'image' && primaryButtonIconPosition === 'left' && primaryButtonIconImageUrl && (
                                        <img src={primaryButtonIconImageUrl} alt="" className="hero-btn-icon" aria-hidden="true" />
                                    )}
                                    <span>{primaryButtonText}</span>
                                    {primaryButtonIconType === 'dashicon' && primaryButtonIconPosition === 'right' && primaryButtonIconValue && (
                                        <span className={`dashicons ${primaryButtonIconValue}`} aria-hidden="true" />
                                    )}
                                    {primaryButtonIconType === 'image' && primaryButtonIconPosition === 'right' && primaryButtonIconImageUrl && (
                                        <img src={primaryButtonIconImageUrl} alt="" className="hero-btn-icon" aria-hidden="true" />
                                    )}
                                </a>
                            )}
                            {showSecondaryButton && (
                                <a
                                    href={secondaryButtonUrl || '#'}
                                    className="jivaka-btn btn-glass hero-btn-secondary"
                                    target={secondaryButtonTarget}
                                    rel={secondaryButtonRel}
                                    style={{
                                        ...(secondaryButtonBgColor && { backgroundColor: secondaryButtonBgColor }),
                                        ...(secondaryButtonTextColor && { color: secondaryButtonTextColor }),
                                        borderRadius: `${secondaryButtonBorderRadius}px`,
                                        padding: `${secondaryButtonPaddingV}px ${secondaryButtonPaddingH}px`,
                                        fontSize: `${secondaryButtonFontSize}rem`,
                                        ...(secondaryButtonHoverBgColor && { '--hero-secondary-hover-bg': secondaryButtonHoverBgColor }),
                                        ...(secondaryButtonHoverTextColor && { '--hero-secondary-hover-color': secondaryButtonHoverTextColor })
                                    }}
                                >
                                    {secondaryButtonIconType === 'dashicon' && secondaryButtonIconPosition === 'left' && secondaryButtonIconValue && (
                                        <span className={`dashicons ${secondaryButtonIconValue}`} aria-hidden="true" />
                                    )}
                                    {secondaryButtonIconType === 'image' && secondaryButtonIconPosition === 'left' && secondaryButtonIconImageUrl && (
                                        <img src={secondaryButtonIconImageUrl} alt="" className="hero-btn-icon" aria-hidden="true" />
                                    )}
                                    <span>{secondaryButtonText}</span>
                                    {secondaryButtonIconType === 'dashicon' && secondaryButtonIconPosition === 'right' && secondaryButtonIconValue && (
                                        <span className={`dashicons ${secondaryButtonIconValue}`} aria-hidden="true" />
                                    )}
                                    {secondaryButtonIconType === 'image' && secondaryButtonIconPosition === 'right' && secondaryButtonIconImageUrl && (
                                        <img src={secondaryButtonIconImageUrl} alt="" className="hero-btn-icon" aria-hidden="true" />
                                    )}
                                </a>
                            )}
                        </div>
                    )}
                </div>

                {showGlassCard && (
                    <div className={`glass-card-col ${animationOnScroll ? 'gsap-reveal' : ''}`}>
                        <div className="glass-card">
                            <RichText.Content
                                tagName="h3"
                                value={glassCardTitle}
                            />
                            <RichText.Content
                                tagName="p"
                                value={glassCardDescription}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
