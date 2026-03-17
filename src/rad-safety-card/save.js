import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { iconClass, title, description } = attributes;

  const blockProps = useBlockProps.save({
    className: 'rad-safety-card',
  });

  const raw = (iconClass || 'fas fa-shield-alt').trim();
  const parts = raw.split(/\s+/).filter(Boolean);
  const hasFa = parts.some(
    (p) => p === 'fa' || p === 'fas' || p === 'far' || p === 'fab'
  );
  const iconClassResolved = hasFa ? raw : 'fas ' + raw;

  return (
    <div {...blockProps}>
      <i className={`rad-safety-icon ${iconClassResolved}`} aria-hidden="true" />
      <div>
        <RichText.Content tagName="h4" value={title} />
        <RichText.Content tagName="p" value={description} />
      </div>
    </div>
  );
}

