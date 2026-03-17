import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        backgroundColor,
        backgroundImage,
        backgroundOverlay,
        overlayColor,
        overlayOpacity,
        backgroundAttachment,
        paddingTop,
        paddingBottom,
        paddingTopMobile,
        paddingBottomMobile,
        showIcon,
        iconClass,
        iconColor,
        iconSize,
        iconSizeMobile,
        iconMarginBottom,
        title,
        titleColor,
        titleFontSize,
        titleFontSizeMobile,
        titleFontWeight,
        titleMarginBottom,
        subtitle,
        subtitleColor,
        subtitleFontSize,
        subtitleFontSizeMobile,
        subtitleOpacity,
        subtitleMarginBottom,
        showButton,
        buttonText,
        buttonUrl,
        buttonTarget,
        buttonRel,
        buttonBgColor,
        buttonTextColor,
        buttonHoverBgColor,
        buttonFontSize,
        buttonFontWeight,
        buttonPaddingVertical,
        buttonPaddingHorizontal,
        buttonBorderRadius,
        containerMaxWidth,
        containerPadding
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'twork-tour-section tour-section',
        style: {
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            color: '#fff',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment:
                backgroundAttachment === 'fixed' ? 'fixed' : 'scroll',
            // CSS custom properties for responsive and button theming
            '--twork-tour-padding-top-mobile': `${paddingTopMobile}px`,
            '--twork-tour-padding-bottom-mobile': `${paddingBottomMobile}px`,
            '--twork-tour-title-font-size-mobile': `${titleFontSizeMobile}rem`,
            '--twork-tour-subtitle-font-size-mobile': `${subtitleFontSizeMobile}rem`,
            '--twork-tour-icon-size-mobile': `${iconSizeMobile}rem`,
            '--twork-tour-button-bg': buttonBgColor,
            '--twork-tour-button-color': buttonTextColor,
            '--twork-tour-button-hover-bg': buttonHoverBgColor || buttonBgColor
        }
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
                        backgroundColor: overlayColor,
                        opacity: overlayOpacity,
                        zIndex: 1
                    }}
                    aria-hidden="true"
                />
            )}

            <div
                className="jivaka-container fade-up"
                style={{
                    position: 'relative',
                    zIndex: 2,
                    maxWidth: `${containerMaxWidth}px`,
                    margin: '0 auto',
                    padding: `0 ${containerPadding}px`
                }}
            >
                {showIcon && iconClass && (
                    <div
                        className="tour-icon"
                        style={{
                            fontSize: `${iconSize}rem`,
                            marginBottom: `${iconMarginBottom}px`,
                            color: iconColor,
                            display: 'inline-block'
                        }}
                        aria-hidden="true"
                    >
                        <i className={iconClass} aria-hidden="true" />
                    </div>
                )}
                {title && (
                    <RichText.Content
                        tagName="h2"
                        value={title}
                        className="tour-section-title"
                        style={{
                            fontSize: `${titleFontSize}rem`,
                            fontWeight: titleFontWeight,
                            color: titleColor,
                            marginBottom: `${titleMarginBottom}px`
                        }}
                    />
                )}
                {subtitle && (
                    <RichText.Content
                        tagName="p"
                        value={subtitle}
                        className="tour-section-subtitle"
                        style={{
                            fontSize: `${subtitleFontSize}rem`,
                            color: subtitleColor,
                            opacity: subtitleOpacity,
                            marginBottom: `${subtitleMarginBottom}px`
                        }}
                    />
                )}
                {showButton && buttonText && (
                    <a
                        href={buttonUrl || '#'}
                        className="jivaka-btn btn-primary tour-section-btn"
                        target={buttonTarget ? '_blank' : undefined}
                        rel={
                            buttonRel ||
                            (buttonTarget ? 'noopener noreferrer' : undefined)
                        }
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: `${buttonPaddingVertical}px ${buttonPaddingHorizontal}px`,
                            borderRadius: `${buttonBorderRadius}px`,
                            fontWeight: buttonFontWeight,
                            fontSize: `${buttonFontSize}rem`,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            backgroundColor: buttonBgColor,
                            color: buttonTextColor,
                            textDecoration: 'none',
                            border: '2px solid transparent',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {buttonText}
                    </a>
                )}
            </div>
        </section>
    );
}
