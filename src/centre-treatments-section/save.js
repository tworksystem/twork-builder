import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { sectionId, title, subtitle } = attributes;
    const blockProps = useBlockProps.save({ className: 'content-section fade-up', id: sectionId });

    return (
        <div {...blockProps}>
            <RichText.Content tagName="h2" value={title} />
            <RichText.Content tagName="p" value={subtitle} className="body-text" />
            <div className="treatment-grid">
                <InnerBlocks.Content />
            </div>
        </div>
    );
}
