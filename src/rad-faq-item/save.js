import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { question, answer } = attributes;

  const blockProps = useBlockProps.save({
    className: 'rad-faq-item',
  });

  return (
    <div {...blockProps}>
      <button className="rad-faq-q" type="button">
        <RichText.Content tagName="span" value={question} />
        <i className="fas fa-plus" aria-hidden="true" />
      </button>
      <div className="rad-faq-a">
        <RichText.Content tagName="div" value={answer} />
      </div>
    </div>
  );
}

