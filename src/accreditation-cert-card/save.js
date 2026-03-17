import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        iconClass,
        certTitle,
        certBadge,
        certDescription,
        iconColor,
        iconSize,
        iconBgColor,
        titleColor,
        titleFontSize,
        titleFontWeight,
        badgeBgColor,
        badgeTextColor,
        badgeFontSize,
        badgeFontWeight,
        badgeBorderRadius,
        descriptionColor,
        descriptionFontSize,
        descriptionLineHeight,
        cardPadding,
        cardPaddingHorizontal,
        cardBorderRadius,
        cardBorderColor,
        cardBorderWidth,
        cardBgColor,
        showTopBarOnHover,
        topBarColor
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `cert-card stagger-up ${showTopBarOnHover ? 'has-top-bar' : ''}`,
        style: {
            background: cardBgColor,
            '--card-bg': cardBgColor,
            border: `${cardBorderWidth}px solid ${cardBorderColor}`,
            borderRadius: `${cardBorderRadius}px`,
            padding: `${cardPadding}px ${cardPaddingHorizontal}px`,
            '--icon-color': iconColor,
            '--icon-size': `${iconSize}rem`,
            '--icon-bg': iconBgColor,
            '--title-color': titleColor,
            '--title-size': `${titleFontSize}rem`,
            '--title-weight': titleFontWeight,
            '--badge-bg': badgeBgColor,
            '--badge-color': badgeTextColor,
            '--badge-size': `${badgeFontSize}rem`,
            '--badge-weight': badgeFontWeight,
            '--badge-radius': `${badgeBorderRadius}px`,
            '--desc-color': descriptionColor,
            '--desc-size': `${descriptionFontSize}rem`,
            '--desc-line-height': descriptionLineHeight,
            '--top-bar-color': topBarColor
        }
    });

    return (
        <div {...blockProps}>
            <div className="cert-icon">
                <i className={iconClass} aria-hidden="true" />
            </div>
            {certTitle && (
                <h3 className="cert-title">
                    <RichText.Content value={certTitle} />
                </h3>
            )}
            {certBadge && (
                <span className="cert-badge">
                    <RichText.Content value={certBadge} />
                </span>
            )}
            {certDescription && (
                <p className="cert-description">
                    <RichText.Content value={certDescription} />
                </p>
            )}
        </div>
    );
}
