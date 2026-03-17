import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { sectionId, title, introText, showSection } = attributes;

    const blockProps = useBlockProps.save({
        className: [
            'content-section',
            'fade-up',
            'gsap-fade-up',
            showSection === false ? 'centre-technology-section--hidden' : '',
        ].filter(Boolean).join(' '),
        id: sectionId || undefined,
    });

    return (
        <section {...blockProps}>
            <RichText.Content tagName="h2" value={title} />
            {introText && <p>{introText}</p>}
            <div className="tech-grid">
                <InnerBlocks.Content />
            </div>
        </section>
    );
}
