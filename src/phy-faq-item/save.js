import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { question, answer } = attributes;

    const blockProps = useBlockProps.save({
        className: 'phy-faq-item',
    });

    return (
        <div {...blockProps}>
            <div className="phy-faq-q">
                <RichText.Content
                    tagName="span"
                    value={question || ''}
                />
                <i className="fas fa-plus" aria-hidden="true" />
            </div>
            <div className="phy-faq-a">
                <RichText.Content
                    tagName="p"
                    value={answer || ''}
                />
            </div>
        </div>
    );
}

