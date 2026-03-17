import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  MediaPlaceholder,
  RichText,
  InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, ToggleControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { imageUrl, imageId, imageAlt, role, name, specialty, showSpecialty = true } = attributes;

  const blockProps = useBlockProps({
    className: 'em-doc-card twork-em-doc-card-editor',
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Doctor image', 'twork-builder')} initialOpen={true}>
          {!imageUrl ? (
            <MediaPlaceholder
              onSelect={(media) =>
                setAttributes({ imageUrl: media.url, imageId: media.id, imageAlt: media.alt || '' })
              }
              allowedTypes={['image']}
              multiple={false}
              labels={{ title: __('Doctor image', 'twork-builder') }}
            />
          ) : (
            <div>
              <img
                src={imageUrl}
                alt={imageAlt || ''}
                style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', display: 'block', marginBottom: 8 }}
              />
              <Button
                isSecondary
                isSmall
                onClick={() => setAttributes({ imageUrl: '', imageId: null, imageAlt: '' })}
              >
                {__('Remove image', 'twork-builder')}
              </Button>
            </div>
          )}
          <TextControl
            label={__('Alt text', 'twork-builder')}
            value={imageAlt || ''}
            onChange={(val) => setAttributes({ imageAlt: val })}
          />
        </PanelBody>

        <PanelBody title={__('Content', 'twork-builder')} initialOpen={false}>
          <ToggleControl
            label={__('Show description', 'twork-builder')}
            checked={showSpecialty}
            onChange={(val) => setAttributes({ showSpecialty: val })}
            help={__('Toggle the doctor specialty/description text.', 'twork-builder')}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={imageAlt || ''}
            className="em-doc-img"
          />
        )}
        <RichText
          tagName="span"
          className="em-doc-role"
          value={role}
          onChange={(val) => setAttributes({ role: val })}
          placeholder={__('Role (e.g. Head of Emergency)', 'twork-builder')}
        />
        <RichText
          tagName="h4"
          value={name}
          onChange={(val) => setAttributes({ name: val })}
          placeholder={__('Doctor name', 'twork-builder')}
        />
        {showSpecialty && (
          <RichText
            tagName="p"
            value={specialty}
            onChange={(val) => setAttributes({ specialty: val })}
            placeholder={__('Specialty / description', 'twork-builder')}
          />
        )}
      </div>
    </>
  );
}

