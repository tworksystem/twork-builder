import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        itemType,
        cardStyle,
        customBgColor,
        customTextColor,
        gradientStart,
        gradientEnd,
        gradientAngle,
        image,
        imageHeight,
        imageObjectFit,
        imageObjectPosition,
        metaText,
        metaColor,
        metaFontSize,
        metaTextTransform,
        title,
        titleColor,
        titleFontSize,
        titleFontWeight,
        description,
        descriptionColor,
        descriptionFontSize,
        showButton,
        buttonText,
        buttonUrl,
        buttonTarget,
        buttonRel,
        buttonBgColor,
        buttonTextColor,
        buttonBorderRadius,
        buttonPaddingVertical,
        buttonPaddingHorizontal,
        buttonFontSize,
        buttonFontWeight,
        buttonTextTransform,
        buttonIcon,
        buttonIconPosition,
        buttonBorderWidth,
        buttonBorderColor,
        buttonBorderStyle,
        buttonHoverBgColor,
        buttonHoverTextColor,
        buttonHoverBorderColor,
        buttonBoxShadow,
        buttonBoxShadowColor,
        buttonBoxShadowBlur,
        buttonBoxShadowSpread,
        buttonBoxShadowOffsetX,
        buttonBoxShadowOffsetY,
        buttonHoverBoxShadow,
        buttonHoverBoxShadowColor,
        buttonHoverBoxShadowBlur,
        buttonHoverBoxShadowSpread,
        buttonHoverBoxShadowOffsetX,
        buttonHoverBoxShadowOffsetY,
        buttonWidth,
        buttonWidthCustom,
        buttonAlignment,
        buttonMarginTop,
        buttonMarginBottom,
        buttonMarginLeft,
        buttonMarginRight,
        buttonLetterSpacing,
        buttonLineHeight,
        buttonTransitionDuration,
        buttonHoverScale,
        buttonHoverTranslateY,
        buttonFontSizeMobile,
        buttonPaddingVerticalMobile,
        buttonPaddingHorizontalMobile,
        contentPadding,
        infoBlocks,
        showOverlay,
        overlayColor,
        overlayOpacity,
        borderWidth,
        borderColor,
        borderStyle
    } = attributes;

    // Get background style based on card style
    const getBackgroundStyle = () => {
        if (cardStyle === 'primary') {
            return {
                background: `linear-gradient(${gradientAngle}deg, #f48b2a 0%, #e67a22 100%)`
            };
        } else if (cardStyle === 'dark') {
            return {
                background: `linear-gradient(${gradientAngle}deg, #212121 0%, #1a1a1a 100%)`
            };
        } else if (cardStyle === 'custom') {
            return {
                background: `linear-gradient(${gradientAngle}deg, ${gradientStart} 0%, ${gradientEnd} 100%)`
            };
        } else {
            return {
                backgroundColor: customBgColor || '#f9f9f9'
            };
        }
    };

    const getTextColor = () => {
        if (customTextColor) return customTextColor;
        if (cardStyle === 'primary' || cardStyle === 'dark' || cardStyle === 'custom') {
            return '#ffffff';
        }
        return '#212121';
    };

    const blockProps = useBlockProps.save({
        className: `service-card animate-on-scroll service-item-${itemType} style-${cardStyle}`,
        style: {
            borderWidth: `${borderWidth}px`,
            borderColor,
            borderStyle
        }
    });

    const contentStyle = {
        ...getBackgroundStyle(),
        color: getTextColor(),
        padding: `${contentPadding}px`
    };

    const buttonStyle = {
        backgroundColor: buttonBgColor,
        color: buttonTextColor,
        borderRadius: `${buttonBorderRadius}px`,
        padding: `${buttonPaddingVertical}px ${buttonPaddingHorizontal}px`,
        fontSize: `${buttonFontSize}rem`,
        fontWeight: buttonFontWeight,
        textTransform: buttonTextTransform,
        letterSpacing: `${buttonLetterSpacing}px`,
        lineHeight: buttonLineHeight,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none',
        borderWidth: `${buttonBorderWidth}px`,
        borderStyle: buttonBorderStyle,
        borderColor: buttonBorderColor,
        boxShadow: buttonBoxShadow
            ? `${buttonBoxShadowOffsetX}px ${buttonBoxShadowOffsetY}px ${buttonBoxShadowBlur}px ${buttonBoxShadowSpread}px ${buttonBoxShadowColor}`
            : 'none',
        transition: `all ${buttonTransitionDuration}s ease`,
        width: buttonWidth === 'full' ? '100%' : buttonWidth === 'custom' ? `${buttonWidthCustom}px` : 'auto',
        justifyContent: buttonAlignment === 'center' ? 'center' : buttonAlignment === 'right' ? 'flex-end' : 'flex-start'
    };

    return (
        <div {...blockProps}>
            {itemType === 'card' ? (
                <>
                    {image && (
                        <div className="service-image-wrapper">
                            <img
                                src={image}
                                alt={title || ''}
                                className="service-image"
                                style={{
                                    width: '100%',
                                    height: `${imageHeight}px`,
                                    objectFit: imageObjectFit,
                                    objectPosition: imageObjectPosition,
                                    display: 'block'
                                }}
                            />
                            {showOverlay && (
                                <div 
                                    className="image-overlay"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: overlayColor,
                                        opacity: overlayOpacity,
                                        pointerEvents: 'none'
                                    }}
                                />
                            )}
                        </div>
                    )}
                    <div 
                        className="service-content"
                        style={contentStyle}
                    >
                        {metaText && (
                            <p 
                                className="service-meta"
                                style={{
                                    fontSize: `${metaFontSize}rem`,
                                    textTransform: metaTextTransform,
                                    color: metaColor || 'inherit',
                                    fontWeight: 600,
                                    opacity: 0.85,
                                    marginBottom: '8px',
                                    marginTop: 0,
                                    letterSpacing: '0.5px'
                                }}
                            >
                                {metaText}
                            </p>
                        )}
                        {title && (
                            <h3 
                                className="service-title"
                                style={{
                                    fontSize: `${titleFontSize}rem`,
                                    fontWeight: titleFontWeight,
                                    color: titleColor || 'inherit',
                                    marginTop: 0,
                                    marginBottom: '16px',
                                    lineHeight: 1.3
                                }}
                            >
                                <RichText.Content value={title} />
                            </h3>
                        )}
                        {description && (
                            <p 
                                className="service-description"
                                style={{
                                    fontSize: `${descriptionFontSize}rem`,
                                    color: descriptionColor || 'inherit',
                                    lineHeight: 1.65,
                                    marginTop: 0,
                                    marginBottom: '28px',
                                    opacity: 0.95
                                }}
                            >
                                <RichText.Content value={description} />
                            </p>
                        )}
                        {showButton && buttonText && (
                            <div
                                className="service-button-wrapper"
                                style={{
                                    marginTop: 'auto',
                                    width: buttonWidth === 'full' ? '100%' : buttonWidth === 'custom' ? `${buttonWidthCustom}px` : 'auto',
                                    textAlign: buttonAlignment,
                                    marginTop: `${buttonMarginTop}px`,
                                    marginBottom: `${buttonMarginBottom}px`,
                                    marginLeft: `${buttonMarginLeft}px`,
                                    marginRight: `${buttonMarginRight}px`,
                                    '--button-font-size-mobile': buttonFontSizeMobile > 0 ? `${buttonFontSizeMobile}rem` : `${buttonFontSize}rem`,
                                    '--button-padding-vertical-mobile': buttonPaddingVerticalMobile > 0 ? `${buttonPaddingVerticalMobile}px` : `${buttonPaddingVertical}px`,
                                    '--button-padding-horizontal-mobile': buttonPaddingHorizontalMobile > 0 ? `${buttonPaddingHorizontalMobile}px` : `${buttonPaddingHorizontal}px`
                                }}
                            >
                                <a
                                    href={buttonUrl || '#'}
                                    className="service-button"
                                    target={buttonTarget ? '_blank' : '_self'}
                                    rel={buttonRel || (buttonTarget ? 'noopener noreferrer' : undefined)}
                                    style={{
                                        ...buttonStyle,
                                        '--hover-bg-color': buttonHoverBgColor || buttonBgColor,
                                        '--hover-text-color': buttonHoverTextColor || buttonTextColor,
                                        '--hover-border-color': buttonHoverBorderColor || buttonBorderColor,
                                        '--hover-scale': buttonHoverScale || 1,
                                        '--hover-translate-y': `${buttonHoverTranslateY || 0}px`,
                                        '--hover-shadow': buttonHoverBoxShadow && (buttonHoverBoxShadowColor || buttonBoxShadowColor)
                                            ? `${buttonHoverBoxShadowOffsetX || 0}px ${buttonHoverBoxShadowOffsetY || 0}px ${buttonHoverBoxShadowBlur || 0}px ${buttonHoverBoxShadowSpread || 0}px ${buttonHoverBoxShadowColor || buttonBoxShadowColor}`
                                            : 'none'
                                    }}
                                >
                                    {buttonIcon && buttonIconPosition === 'left' && (
                                        <i className={buttonIcon} aria-hidden="true"></i>
                                    )}
                                    <span>{buttonText}</span>
                                    {buttonIcon && buttonIconPosition === 'right' && (
                                        <i className={buttonIcon} aria-hidden="true"></i>
                                    )}
                                </a>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div 
                    className="service-content"
                    style={contentStyle}
                >
                    <div className="info-blocks">
                        {infoBlocks && infoBlocks.length > 0 && infoBlocks.map((block, index) => (
                            <div key={index} className="info-block">
                                <div className="info-icon">
                                    <i 
                                        className={block.icon}
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="info-content">
                                    <h4 className="info-title">{block.title}</h4>
                                    <p className="info-text">
                                        {block.content}
                                    </p>
                                    {block.subtitle && (
                                        <p className="info-subtitle">{block.subtitle}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

