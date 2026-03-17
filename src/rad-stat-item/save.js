import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { statNumber, statLabel } = attributes;

  const blockProps = useBlockProps.save({
    className: 'rad-stat-item',
  });

  return (
    <div {...blockProps}>
      <RichText.Content tagName="span" className="rad-stat-num" value={statNumber} />
      <RichText.Content tagName="span" className="rad-stat-label" value={statLabel} />
    </div>
  );
}

