import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        icon,
        title,
        description,
        titleColor,
        titleFontSize,
        titleFontWeight,
        descriptionColor,
        descriptionFontSize,
        descriptionLineHeight,
        descriptionMarginTop,
        descriptionMarginBottom
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'before-you-come-item-card'
    });

    return (
        <div {...blockProps}>
            <div
                className="item-icon-title"
                style={{
                    fontSize: `${titleFontSize}rem`,
                    fontWeight: titleFontWeight,
                    color: titleColor
                }}
            >
                <i className={icon} aria-hidden />
                <RichText.Content
                    tagName="h4"
                    value={title}
                    style={{ margin: 0 }}
                />
            </div>
            <RichText.Content
                tagName="p"
                className="item-description"
                value={description}
                style={{
                    margin: `${descriptionMarginTop}px 0 ${descriptionMarginBottom}px 0`,
                    color: descriptionColor,
                    fontSize: `${descriptionFontSize}rem`,
                    lineHeight: descriptionLineHeight
                }}
            />
        </div>
    );
}
