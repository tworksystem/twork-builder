import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        displayType,
        icon,
        iconColor,
        iconColorHover,
        iconSize,
        iconSizeMobile,
        iconMarginBottom,
        iconMarginBottomMobile,
        image,
        imageId,
        imageWidth,
        imageWidthMobile,
        imageHeight,
        imageHeightMobile,
        imageObjectFit,
        imageObjectPosition,
        imageBorderRadius,
        imageMarginBottom,
        imageMarginBottomMobile,
        title,
        titleColor,
        titleColorHover,
        titleFontSize,
        titleFontSizeMobile,
        titleFontWeight,
        titleMarginBottom,
        titleMarginBottomMobile,
        showTitleUnderline,
        titleUnderlineColor,
        titleUnderlineWidth,
        titleUnderlineHeight,
        description,
        descriptionColor,
        descriptionFontSize,
        descriptionFontSizeMobile,
        descriptionLineHeight,
        itemPadding,
        itemPaddingMobile,
        itemAlignment,
        itemBackgroundColor,
        itemBackgroundColorHover,
        itemBorderRadius,
        itemBorderWidth,
        itemBorderWidthTop,
        itemBorderWidthRight,
        itemBorderWidthBottom,
        itemBorderWidthLeft,
        itemBorderWidthMobile,
        itemBorderColor,
        itemBorderColorHover,
        itemBorderStyle,
        itemBorderOpacity,
        enableItemBorder,
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
        buttonIconPosition
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'key-service-item animate-on-scroll twork-key-service-item',
        style: {
            padding: `${itemPadding}px`,
            textAlign: itemAlignment,
            backgroundColor: itemBackgroundColor || 'transparent',
            borderRadius: `${itemBorderRadius}px`,
            // CRITICAL: Do NOT use inline border styles - WordPress core CSS will interfere
            // WordPress core rule: html :where([style*=border-width]) { border-style: solid; }
            // We use CSS custom properties via data attributes instead
            display: 'flex',
            flexDirection: 'column',
            alignItems: itemAlignment === 'center' ? 'center' : itemAlignment === 'right' ? 'flex-end' : 'flex-start',
            // CSS custom properties for borders (accessed via CSS, not inline styles)
            '--item-border-width': enableItemBorder ? `${itemBorderWidth}px` : '0px',
            '--item-border-width-top': enableItemBorder ? `${itemBorderWidthTop || itemBorderWidth}px` : '0px',
            '--item-border-width-right': enableItemBorder ? `${itemBorderWidthRight || itemBorderWidth}px` : '0px',
            '--item-border-width-bottom': enableItemBorder ? `${itemBorderWidthBottom || itemBorderWidth}px` : '0px',
            '--item-border-width-left': enableItemBorder ? `${itemBorderWidthLeft || itemBorderWidth}px` : '0px',
            '--item-border-width-mobile': enableItemBorder ? `${itemBorderWidthMobile || itemBorderWidth}px` : '0px',
            '--item-border-color': itemBorderColor || '#e0e0e0',
            '--item-border-color-hover': itemBorderColorHover || itemBorderColor || '#e0e0e0',
            '--item-border-style': itemBorderStyle || 'solid',
            '--item-border-opacity': itemBorderOpacity || 1,
            // Icon CSS custom properties
            '--icon-size': `${iconSize}rem`,
            '--icon-size-mobile': `${iconSizeMobile}rem`,
            '--icon-color': iconColor || '#f48b2a',
            '--icon-color-hover': iconColorHover || iconColor || '#e67a22',
            '--icon-margin-bottom': `${iconMarginBottom}px`,
            '--icon-margin-bottom-mobile': `${iconMarginBottomMobile}px`
        },
        'data-enable-item-border': enableItemBorder ? 'true' : 'false',
        'data-item-border-width': enableItemBorder ? itemBorderWidth : 0,
        'data-item-border-width-top': enableItemBorder ? (itemBorderWidthTop || itemBorderWidth) : 0,
        'data-item-border-width-right': enableItemBorder ? (itemBorderWidthRight || itemBorderWidth) : 0,
        'data-item-border-width-bottom': enableItemBorder ? (itemBorderWidthBottom || itemBorderWidth) : 0,
        'data-item-border-width-left': enableItemBorder ? (itemBorderWidthLeft || itemBorderWidth) : 0,
        'data-item-border-width-mobile': enableItemBorder ? (itemBorderWidthMobile || itemBorderWidth) : 0,
        'data-item-border-color': itemBorderColor,
        'data-item-border-color-hover': itemBorderColorHover || '',
        'data-item-border-style': itemBorderStyle,
        'data-item-border-opacity': itemBorderOpacity,
        'data-display-type': displayType,
        'data-icon-color': iconColor,
        'data-icon-color-hover': iconColorHover,
        'data-icon-size': iconSize,
        'data-icon-size-mobile': iconSizeMobile,
        'data-icon-margin-bottom': iconMarginBottom,
        'data-icon-margin-bottom-mobile': iconMarginBottomMobile,
        'data-image-width': imageWidth,
        'data-image-width-mobile': imageWidthMobile,
        'data-image-height': imageHeight,
        'data-image-height-mobile': imageHeightMobile,
        'data-image-margin-bottom': imageMarginBottom,
        'data-image-margin-bottom-mobile': imageMarginBottomMobile,
        'data-title-color': titleColor,
        'data-title-color-hover': titleColorHover,
        'data-title-font-size': titleFontSize,
        'data-title-font-size-mobile': titleFontSizeMobile,
        'data-title-margin-bottom': titleMarginBottom,
        'data-title-margin-bottom-mobile': titleMarginBottomMobile,
        'data-description-font-size': descriptionFontSize,
        'data-description-font-size-mobile': descriptionFontSizeMobile,
        'data-item-padding': itemPadding,
        'data-item-padding-mobile': itemPaddingMobile,
        'data-background-color-hover': itemBackgroundColorHover,
        'data-border-position': 'vertical' // Inherited from parent, but set for item-level control
    });

    return (
        <div {...blockProps}>
            {displayType === 'icon' && icon && (
                <i 
                    className={icon}
                    aria-hidden="true"
                    style={{
                        fontSize: `${iconSize}rem`,
                        color: iconColor,
                        marginBottom: `${iconMarginBottom}px`,
                        display: 'block'
                    }}
                />
            )}

            {displayType === 'image' && image && (
                <img
                    src={image}
                    alt={title || ''}
                    className="key-service-image"
                    style={{
                        width: `${imageWidth}px`,
                        height: `${imageHeight}px`,
                        objectFit: imageObjectFit,
                        objectPosition: imageObjectPosition,
                        borderRadius: `${imageBorderRadius}px`,
                        display: 'block',
                        marginBottom: `${imageMarginBottom}px`
                    }}
                />
            )}

            {title && (
                <h3 
                    className="key-service-title"
                    style={{
                        fontSize: `${titleFontSize}rem`,
                        fontWeight: titleFontWeight,
                        color: titleColor,
                        marginTop: 0,
                        marginBottom: `${titleMarginBottom}px`,
                        position: 'relative'
                    }}
                >
                    <RichText.Content value={title} />
                </h3>
            )}

            {showTitleUnderline && (
                <div
                    className="key-service-title-underline"
                    style={{
                        width: `${titleUnderlineWidth}px`,
                        height: `${titleUnderlineHeight}px`,
                        backgroundColor: titleUnderlineColor,
                        margin: itemAlignment === 'center' ? '0 auto' : itemAlignment === 'right' ? '0 0 0 auto' : '0',
                        marginTop: `-${titleMarginBottom}px`,
                        marginBottom: `${titleMarginBottom}px`
                    }}
                />
            )}

            {description && (
                <p 
                    className="key-service-description"
                    style={{
                        fontSize: `${descriptionFontSize}rem`,
                        lineHeight: descriptionLineHeight,
                        color: descriptionColor,
                        marginTop: 0,
                        marginBottom: showButton ? '20px' : '0'
                    }}
                >
                    <RichText.Content value={description} />
                </p>
            )}

            {showButton && buttonText && (
                <a
                    href={buttonUrl || '#'}
                    className="key-service-button jivaka-btn"
                    target={buttonTarget ? '_blank' : '_self'}
                    rel={buttonRel || (buttonTarget ? 'noopener noreferrer' : undefined)}
                    style={{
                        backgroundColor: buttonBgColor,
                        color: buttonTextColor,
                        borderRadius: `${buttonBorderRadius}px`,
                        padding: `${buttonPaddingVertical}px ${buttonPaddingHorizontal}px`,
                        fontSize: `${buttonFontSize}rem`,
                        fontWeight: buttonFontWeight,
                        textTransform: buttonTextTransform,
                        alignSelf: itemAlignment === 'center' ? 'center' : itemAlignment === 'right' ? 'flex-end' : 'flex-start',
                        marginTop: 'auto',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
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
            )}
        </div>
    );
}
