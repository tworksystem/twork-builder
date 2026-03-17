import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { imageUrl, imageAlt, role, name, specialty, showSpecialty = true } = attributes;

  const blockProps = useBlockProps.save({
    className: 'em-doc-card stagger-up',
  });

  return (
    <div {...blockProps}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={imageAlt || ''}
          className="em-doc-img"
        />
      )}
      <RichText.Content
        tagName="span"
        className="em-doc-role"
        value={role}
      />
      <RichText.Content
        tagName="h4"
        value={name}
      />
      {showSpecialty && (
        <RichText.Content
          tagName="p"
          value={specialty}
        />
      )}
    </div>
  );
}

