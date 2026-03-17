import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        statNumber,
        statLabel,
        numberColor,
        numberFontSize,
        numberFontWeight,
        labelColor,
        labelFontSize,
        labelFontWeight,
        labelTextTransform
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'stat-item'
    });

    return (
        <div {...blockProps}>
            <RichText.Content
                tagName="h3"
                value={statNumber}
                style={{
                    fontSize: `${numberFontSize}rem`,
                    fontWeight: numberFontWeight,
                    color: numberColor,
                    margin: 0,
                    lineHeight: 1.2
                }}
            />
            <RichText.Content
                tagName="p"
                value={statLabel}
                style={{
                    fontSize: `${labelFontSize}rem`,
                    fontWeight: labelFontWeight,
                    color: labelColor,
                    textTransform: labelTextTransform,
                    margin: '5px 0 0 0',
                    lineHeight: 1.3
                }}
            />
        </div>
    );
}
