import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { sectionId, title } = attributes;
    const blockProps = useBlockProps.save({ className: 'content-section' });

    return (
        <section {...blockProps} id={sectionId}>
            <h2>{title}</h2>
            <InnerBlocks.Content />
        </section>
    );
}
