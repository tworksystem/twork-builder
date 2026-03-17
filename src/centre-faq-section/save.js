import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { sectionId, title } = attributes;
    const blockProps = useBlockProps.save({ className: 'content-section fade-up', id: sectionId });

    return (
        <div {...blockProps}>
            <RichText.Content tagName="h2" value={title} />
            <InnerBlocks.Content />
        </div>
    );
}
