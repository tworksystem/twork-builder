import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { sectionId, title, intro } = attributes;
    const blockProps = useBlockProps.save({ className: 'content-section' });

    return (
        <section {...blockProps} id={sectionId}>
            <h2>{title}</h2>
            <p>{intro}</p>
            <div className="tech-grid">
                <InnerBlocks.Content />
            </div>
        </section>
    );
}
