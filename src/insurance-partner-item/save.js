import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        partnerName,
        iconClass,
        partnerNameColor,
        partnerNameFontSize,
        partnerNameFontWeight,
        partnerNameTextTransform,
        iconColor,
        iconSize,
        cardBgColor,
        cardBorderColor,
        cardBorderWidth,
        cardBorderRadius,
        cardPadding,
        cardMinHeight,
        hoverBorderColor,
        hoverTextColor,
        hoverIconColor
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'insurance-card fade-up',
        style: {
            background: cardBgColor,
            border: `${cardBorderWidth}px solid ${cardBorderColor}`,
            borderRadius: `${cardBorderRadius}px`,
            minHeight: `${cardMinHeight}px`,
            padding: `${cardPadding}px`,
            '--partner-name-color': partnerNameColor,
            '--partner-name-font-size': `${partnerNameFontSize}rem`,
            '--partner-name-font-weight': partnerNameFontWeight,
            '--partner-name-transform': partnerNameTextTransform,
            '--icon-color': iconColor,
            '--icon-size': `${iconSize}rem`,
            '--hover-border-color': hoverBorderColor,
            '--hover-text-color': hoverTextColor,
            '--hover-icon-color': hoverIconColor
        }
    });

    return (
        <div {...blockProps}>
            <div className="partner-logo">
                <i className={iconClass} style={{ color: iconColor, fontSize: `${iconSize}rem` }} aria-hidden="true" />
                <RichText.Content
                    tagName="span"
                    value={partnerName}
                />
            </div>
        </div>
    );
}
