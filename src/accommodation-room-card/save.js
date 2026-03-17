import { useBlockProps, RichText } from '@wordpress/block-editor';

const PRIMARY_ORANGE = '#f48b2a';
const DARK_GREY = '#212121';
const MEDIUM_GREY = '#666666';
const WHITE = '#ffffff';

export default function save({ attributes }) {
    const {
        title,
        titleColor,
        titleFontSize,
        titleFontWeight,
        imageUrl,
        imageAlt,
        imageHeight,
        imageObjectFit,
        priceText,
        priceBgColor,
        priceTextColor,
        priceFontSize,
        amenities,
        amenityIconColor,
        amenityTextColor,
        amenityFontSize,
        showButton,
        buttonText,
        buttonUrl,
        buttonTarget,
        buttonRel,
        buttonBgColor,
        buttonTextColor,
        buttonBorderColor,
        buttonFontSize,
        buttonFontWeight,
        detailsPadding,
        detailsPaddingMobile
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'room-card fade-up',
        style: {
            '--details-padding-mobile': detailsPaddingMobile ? `${detailsPaddingMobile}px` : undefined
        }
    });

    const effectiveTitleColor = titleColor || DARK_GREY;
    const effectivePriceBg = priceBgColor || PRIMARY_ORANGE;
    const effectivePriceColor = priceTextColor || WHITE;
    const effectiveAmenityIcon = amenityIconColor || PRIMARY_ORANGE;
    const effectiveAmenityText = amenityTextColor || MEDIUM_GREY;
    const effectiveBtnBg = buttonBgColor || 'transparent';
    const effectiveBtnText = buttonTextColor || DARK_GREY;
    const effectiveBtnBorder = buttonBorderColor || DARK_GREY;

    return (
        <div {...blockProps}>
            {imageUrl && (
                <div className="room-img" style={{ height: `${imageHeight}px`, overflow: 'hidden', position: 'relative' }}>
                    <img src={imageUrl} alt={imageAlt || title} style={{ width: '100%', height: '100%', objectFit: imageObjectFit, display: 'block' }} decoding="async" />
                    {priceText && (
                        <div
                            className="room-price"
                            style={{
                                position: 'absolute',
                                bottom: '15px',
                                right: '15px',
                                background: effectivePriceBg,
                                color: effectivePriceColor,
                                padding: '5px 15px',
                                borderRadius: '20px',
                                fontWeight: 700,
                                fontSize: `${priceFontSize}rem`
                            }}
                        >
                            {priceText}
                        </div>
                    )}
                </div>
            )}

            <div className="room-details" style={{ padding: `${detailsPadding}px`, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {title && (
                    <RichText.Content
                        tagName="h3"
                        value={title}
                        style={{
                            fontSize: `${titleFontSize}rem`,
                            fontWeight: titleFontWeight,
                            color: effectiveTitleColor,
                            margin: '0 0 10px'
                        }}
                    />
                )}

                {amenities && amenities.length > 0 && (
                    <ul className="room-amenities" style={{ listStyle: 'none', margin: '15px 0', padding: 0, color: effectiveAmenityText, fontSize: `${amenityFontSize}rem` }}>
                        {amenities.map((item) => (
                            <li key={item.id} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {item.icon && <i className={item.icon} style={{ color: effectiveAmenityIcon, width: '20px', textAlign: 'center', flexShrink: 0 }} aria-hidden="true" />}
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {showButton && buttonText && (
                    <a
                        href={buttonUrl || '#'}
                        className="room-btn"
                        target={buttonTarget ? '_blank' : '_self'}
                        rel={buttonRel || (buttonTarget ? 'noopener noreferrer' : undefined)}
                        style={{
                            marginTop: 'auto',
                            width: '100%',
                            textAlign: 'center',
                            padding: '10px',
                            border: `1px solid ${effectiveBtnBorder}`,
                            borderRadius: '5px',
                            fontWeight: buttonFontWeight,
                            fontSize: `${buttonFontSize}rem`,
                            backgroundColor: effectiveBtnBg,
                            color: effectiveBtnText,
                            textDecoration: 'none',
                            display: 'block',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {buttonText}
                    </a>
                )}
            </div>
        </div>
    );
}
