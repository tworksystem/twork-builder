/**
 * Twork Emergency Ambulance Section – Save
 */
import { useBlockProps } from '@wordpress/block-editor';

function FeatureIcon({ item, iconColor, iconBgColor, iconSizePx }) {
    if (item.iconType === 'image' && item.iconImageUrl) {
        return (
            <img
                src={item.iconImageUrl}
                alt=""
                style={{ width: iconSizePx, height: iconSizePx, objectFit: 'cover', borderRadius: '50%', display: 'block' }}
            />
        );
    }
    const iconStyle = {
        color: iconColor,
        backgroundColor: iconBgColor,
        width: iconSizePx,
        height: iconSizePx,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${iconSizePx * 0.5}px`
    };
    if (item.iconType === 'dashicons' && item.iconValue) {
        return <span className={item.iconValue} style={iconStyle} aria-hidden="true" />;
    }
    if (item.iconValue) {
        return <i className={item.iconValue} style={iconStyle} aria-hidden="true" />;
    }
    return <span style={{ ...iconStyle, backgroundColor: iconBgColor }} aria-hidden="true" />;
}

export default function save({ attributes }) {
    const {
        layout,
        imageUrl,
        imageAlt,
        title,
        titleColor,
        titleFontSize,
        description,
        descriptionColor,
        descriptionFontSize,
        features,
        iconColor,
        iconBgColor,
        iconSizePx,
        buttonText,
        buttonUrl,
        buttonStyle,
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        gap,
        imageBorderRadius,
        animationOnScroll,
        animationType
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'em-section twork-em-amb-section'
    });

    const sectionStyle = {
        backgroundColor,
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
        position: 'relative'
    };

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        position: 'relative'
    };

    const wrapperStyle = {
        display: 'grid',
        gap: `${gap}px`,
        alignItems: 'center'
    };

    const imageOrder = layout === 'image-left' ? 1 : 2;
    const contentOrder = layout === 'image-left' ? 2 : 1;

    const items = Array.isArray(features) ? features : [];
    const animClass = animationOnScroll && animationType ? animationType : '';

    return (
        <section {...blockProps} style={sectionStyle} data-layout={layout}>
            <div className="em-container" style={containerStyle}>
                <div className="em-amb-wrapper" style={wrapperStyle}>
                    <div className="em-amb-col em-amb-col-image" style={{ order: imageOrder }}>
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={imageAlt || ''}
                                className={`em-amb-img ${animClass}`}
                                style={{ borderRadius: `${imageBorderRadius}px`, width: '100%', height: 'auto', display: 'block' }}
                            />
                        ) : (
                            <div className="em-amb-img" style={{ borderRadius: `${imageBorderRadius}px`, minHeight: 200, background: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                                {null}
                            </div>
                        )}
                    </div>
                    <div className="em-amb-col em-amb-col-content" style={{ order: contentOrder }}>
                        <h2 className={animClass} style={{ fontSize: `${titleFontSize}rem`, marginBottom: 20, color: titleColor }}>
                            {title}
                        </h2>
                        <p className={animClass} style={{ color: descriptionColor, marginBottom: 30, fontSize: `${descriptionFontSize}rem` }}>
                            {description}
                        </p>
                        {items.length > 0 && (
                            <ul className="em-feature-list">
                                {items.map((item) => (
                                    <li key={item.id}>
                                        <FeatureIcon item={item} iconColor={iconColor} iconBgColor={iconBgColor} iconSizePx={iconSizePx} />
                                        <div>
                                            <strong>{item.title}</strong>
                                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {buttonText && (
                            <a
                                href={buttonUrl || '#'}
                                className={`em-btn em-btn-${buttonStyle} ${animClass}`}
                            >
                                {buttonText}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
