import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { iconClass, title, description } = attributes;

  const blockProps = useBlockProps.save({
    className: 'rad-tech-item',
  });

  const raw = (iconClass || 'fas fa-bolt').trim();
  const parts = raw.split(/\s+/).filter(Boolean);
  const hasFa = parts.some(
    (p) => p === 'fa' || p === 'fas' || p === 'far' || p === 'fab'
  );
  const iconClassResolved = hasFa ? raw : 'fas ' + raw;

  return (
    <div {...blockProps}>
      <h4>
        {iconClassResolved && (
          <i className={iconClassResolved} aria-hidden="true" />
        )}
        <RichText.Content tagName="span" value={title} />
      </h4>
      <RichText.Content tagName="p" value={description} />
    </div>
  );
}

