import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { title, description } = attributes;

    const blockProps = useBlockProps.save({
        className: 'phy-journey-item',
    });

    return (
        <div {...blockProps}>
            <RichText.Content tagName="h3" value={title} />
            <RichText.Content tagName="p" value={description} />
        </div>
    );
}

