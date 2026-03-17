import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { label } = attributes;

    const blockProps = useBlockProps.save({
        className: 'hc-area-tag',
    });

    return (
        <span {...blockProps}>
            <RichText.Content tagName="span" value={label} />
        </span>
    );
}
