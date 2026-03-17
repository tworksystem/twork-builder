import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  InspectorControls,
  MediaPlaceholder,
} from '@wordpress/block-editor';
import {
  PanelBody,
  RangeControl,
  TextControl,
  Button,
  __experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const {
    backgroundImage,
    backgroundImageId,
    badgeText,
    title,
    description,
    buttonText,
    buttonUrl,
    minHeight,
  } = attributes;

  const blockProps = useBlockProps({
    className: 'rad-hero twork-rad-hero-section',
    style: {
      minHeight: `${minHeight}px`,
    },
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Background image', 'twork-builder')} initialOpen={true}>
          {!backgroundImage ? (
            <MediaPlaceholder
              onSelect={(media) =>
                setAttributes({
                  backgroundImage: media.url,
                  backgroundImageId: media.id,
                })
              }
              allowedTypes={['image']}
              multiple={false}
              labels={{ title: __('Background image', 'twork-builder') }}
            />
          ) : (
            <div>
              <img
                src={backgroundImage}
                alt=""
                style={{ width: '100%', height: 'auto', marginBottom: 10 }}
              />
              <Button
                isSecondary
                isSmall
                onClick={() =>
                  setAttributes({
                    backgroundImage: '',
                    backgroundImageId: null,
                  })
                }
              >
                {__('Remove image', 'twork-builder')}
              </Button>
            </div>
          )}
        </PanelBody>

        <PanelBody title={__('Content', 'twork-builder')} initialOpen={true}>
          <TextControl
            label={__('Badge text', 'twork-builder')}
            value={badgeText}
            onChange={(val) => setAttributes({ badgeText: val })}
            placeholder={__('Advanced Diagnostics', 'twork-builder')}
          />
          <Divider />
          <RangeControl
            label={__('Minimum height (px)', 'twork-builder')}
            value={minHeight}
            onChange={(val) => setAttributes({ minHeight: val })}
            min={400}
            max={800}
            step={20}
          />
        </PanelBody>

        <PanelBody title={__('Button', 'twork-builder')} initialOpen={false}>
          <TextControl
            label={__('Button text', 'twork-builder')}
            value={buttonText}
            onChange={(val) => setAttributes({ buttonText: val })}
            placeholder={__('Book an Appointment', 'twork-builder')}
          />
          <TextControl
            label={__('Button URL', 'twork-builder')}
            value={buttonUrl}
            onChange={(val) => setAttributes({ buttonUrl: val })}
            placeholder="#book"
          />
        </PanelBody>
      </InspectorControls>

      <header {...blockProps}>
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt=""
            className="rad-hero-bg"
          />
        )}
        <div className="rad-container rad-hero-content">
          <div className="rad-hero-grid">
            <div className="rad-hero-copy fade-up">
              {badgeText && (
                <span
                  style={{
                    color: 'var(--rad-primary)',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  {badgeText}
                </span>
              )}
              <RichText
                tagName="h1"
                value={title}
                onChange={(val) => setAttributes({ title: val })}
                placeholder={__('Precision Imaging,\nAccurate Results.', 'twork-builder')}
              />
              <RichText
                tagName="p"
                value={description}
                onChange={(val) => setAttributes({ description: val })}
                placeholder={__(
                  'State-of-the-art Radiology centre equipped with 1.5T MRI and 64-Slice CT Scanners for crystal clear diagnosis.',
                  'twork-builder'
                )}
              />
              {buttonText && (
                <a
                  href={buttonUrl || '#'}
                  className="rad-btn"
                  onClick={(e) => e.preventDefault()}
                >
                  {buttonText}
                </a>
              )}
            </div>
            <div className="rad-hero-empty" />
          </div>
        </div>
      </header>
    </>
  );
}

