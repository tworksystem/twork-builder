import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { question, answer } = attributes;

    const blockProps = useBlockProps.save({
        className: 'hc-faq-item stagger-up',
    });

    return (
        <div {...blockProps}>
            <button type="button" className="hc-faq-q" aria-expanded="false">
                <RichText.Content tagName="span" value={question} />
                <i className="fas fa-plus" aria-hidden="true" />
            </button>
            <RichText.Content tagName="div" className="hc-faq-a" value={answer} />
        </div>
    );
}
