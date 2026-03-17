import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        icon,
        iconColor,
        iconBgColor,
        iconSize,
        iconSizePx,
        title,
        titleColor,
        titleFontSize,
        titleFontWeight,
        description,
        descriptionColor,
        descriptionFontSize,
        cardPadding,
        cardPaddingMobile
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'benefit-card fade-up',
        style: {
            padding: `${cardPadding}px 30px`,
            '--card-padding-mobile': `${cardPaddingMobile}px`,
            '--icon-size': `${iconSizePx}px`,
            '--icon-font-size': `${iconSize}rem`,
            '--icon-color': iconColor,
            '--icon-bg': iconBgColor
        }
    });

    return (
        <div {...blockProps}>
            <div
                className="b-icon"
                style={{
                    width: `${iconSizePx}px`,
                    height: `${iconSizePx}px`,
                    background: iconBgColor,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 25px',
                    fontSize: `${iconSize}rem`,
                    color: iconColor
                }}
            >
                {icon && <i className={icon} aria-hidden="true" />}
            </div>
            {title && (
                <RichText.Content
                    tagName="h4"
                    value={title}
                    style={{
                        margin: '0 0 10px 0',
                        fontSize: `${titleFontSize}rem`,
                        fontWeight: titleFontWeight,
                        color: titleColor
                    }}
                />
            )}
            {description && (
                <RichText.Content
                    tagName="p"
                    value={description}
                    style={{
                        fontSize: `${descriptionFontSize}rem`,
                        color: descriptionColor,
                        margin: 0
                    }}
                />
            )}
        </div>
    );
}
