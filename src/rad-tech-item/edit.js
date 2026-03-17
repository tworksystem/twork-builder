import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { iconClass, title, description } = attributes;

  const blockProps = useBlockProps({
    className: 'rad-tech-item twork-rad-tech-item-editor',
  });

  const raw = (iconClass || 'fas fa-bolt').trim();
  const parts = raw.split(/\s+/).filter(Boolean);
  const hasFa = parts.some(
    (p) => p === 'fa' || p === 'fas' || p === 'far' || p === 'fab'
  );
  const iconClassResolved = hasFa ? raw : 'fas ' + raw;

  return (
    <>
      <InspectorControls>
        <PanelBody
          title={__('Tech Item', 'twork-builder')}
          initialOpen={true}
        >
          <TextControl
            label={__('Icon Class (Font Awesome)', 'twork-builder')}
            value={iconClass}
            onChange={(val) =>
              setAttributes({ iconClass: val || 'fas fa-bolt' })
            }
            help={__(
              'e.g. fas fa-bolt, fas fa-tachometer-alt, fas fa-wifi, fas fa-desktop',
              'twork-builder'
            )}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <h4>
          {iconClassResolved && (
            <i className={iconClassResolved} aria-hidden="true" />
          )}
          <RichText
            tagName="span"
            value={title}
            onChange={(val) => setAttributes({ title: val })}
            placeholder={__('Low Dose', 'twork-builder')}
          />
        </h4>
        <RichText
          tagName="p"
          value={description}
          onChange={(val) => setAttributes({ description: val })}
          placeholder={__(
            'Protocols to minimize radiation exposure.',
            'twork-builder'
          )}
        />
      </div>
    </>
  );
}

