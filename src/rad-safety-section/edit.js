import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  PanelColorSettings,
  RichText,
  MediaPlaceholder,
} from '@wordpress/block-editor';
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  TextControl,
  __experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = ['twork/rad-safety-card'];

const TEMPLATE = [
  [
    'twork/rad-safety-card',
    {
      iconClass: 'fas fa-shield-alt',
      title: 'Dose Management',
      description:
        'Automated dose tracking for every patient to prevent overexposure.',
    },
  ],
  [
    'twork/rad-safety-card',
    {
      iconClass: 'fas fa-child',
      title: 'Pediatric Protocols',
      description:
        'Specialized low-dose settings specifically for children.',
    },
  ],
  [
    'twork/rad-safety-card',
    {
      iconClass: 'fas fa-pump-medical',
      title: 'Contrast Safety',
      description:
        'Strict kidney function checks before administering contrast media.',
    },
  ],
];

export default function Edit({ attributes, setAttributes }) {
  const {
    backgroundColor,
    paddingTop,
    paddingBottom,
    containerMaxWidth,
    containerPadding,
    showSectionTitle,
    sectionTitle,
    sectionTitleColor,
    sectionTitleFontSize,
    showSectionSubtitle,
    sectionSubtitle,
    sectionSubtitleColor,
    sectionSubtitleFontSize,
    imageUrl,
    imageId,
    imageAlt,
    animationOnScroll,
    animationType,
    animationDelay,
  } = attributes;

  const blockProps = useBlockProps({
    className: 'twork-rad-safety-section-editor rad-section',
    style: {
      backgroundColor,
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
    },
  });

  const containerStyle = {
    maxWidth: `${containerMaxWidth}px`,
    margin: '0 auto',
    padding: `0 ${containerPadding}px`,
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '0.8fr 1.2fr',
    gap: '50px',
    alignItems: 'center',
  };

  return (
    <>
      <InspectorControls>
        <PanelBody
          title={__('Section Background', 'twork-builder')}
          initialOpen={true}
        >
          <PanelColorSettings
            title={__('Background Color', 'twork-builder')}
            colorSettings={[
              {
                value: backgroundColor,
                onChange: (val) => setAttributes({ backgroundColor: val }),
                label: __('Background Color', 'twork-builder'),
              },
            ]}
          />

          <Divider />

          <RangeControl
            label={__('Padding Top (px)', 'twork-builder')}
            value={paddingTop}
            onChange={(val) => setAttributes({ paddingTop: val })}
            min={40}
            max={160}
            step={5}
          />

          <RangeControl
            label={__('Padding Bottom (px)', 'twork-builder')}
            value={paddingBottom}
            onChange={(val) => setAttributes({ paddingBottom: val })}
            min={40}
            max={160}
            step={5}
          />
        </PanelBody>

        <PanelBody
          title={__('Section Content', 'twork-builder')}
          initialOpen={false}
        >
          <ToggleControl
            label={__('Show Section Title', 'twork-builder')}
            checked={showSectionTitle}
            onChange={(val) => setAttributes({ showSectionTitle: val })}
          />

          {showSectionTitle && (
            <>
              <TextControl
                label={__('Title', 'twork-builder')}
                value={sectionTitle}
                onChange={(val) => setAttributes({ sectionTitle: val })}
              />

              <PanelColorSettings
                title={__('Title Color', 'twork-builder')}
                colorSettings={[
                  {
                    value: sectionTitleColor,
                    onChange: (val) =>
                      setAttributes({ sectionTitleColor: val }),
                    label: __('Title Color', 'twork-builder'),
                  },
                ]}
              />

              <RangeControl
                label={__('Title Font Size (rem)', 'twork-builder')}
                value={sectionTitleFontSize}
                onChange={(val) =>
                  setAttributes({ sectionTitleFontSize: val })
                }
                min={1.8}
                max={3}
                step={0.1}
              />
            </>
          )}

          <Divider />

          <ToggleControl
            label={__('Show Subtitle', 'twork-builder')}
            checked={showSectionSubtitle}
            onChange={(val) => setAttributes({ showSectionSubtitle: val })}
          />

          {showSectionSubtitle && (
            <>
              <TextControl
                label={__('Subtitle', 'twork-builder')}
                value={sectionSubtitle}
                onChange={(val) => setAttributes({ sectionSubtitle: val })}
              />

              <PanelColorSettings
                title={__('Subtitle Color', 'twork-builder')}
                colorSettings={[
                  {
                    value: sectionSubtitleColor,
                    onChange: (val) =>
                      setAttributes({ sectionSubtitleColor: val }),
                    label: __('Subtitle Color', 'twork-builder'),
                  },
                ]}
              />

              <RangeControl
                label={__('Subtitle Font Size (rem)', 'twork-builder')}
                value={sectionSubtitleFontSize}
                onChange={(val) =>
                  setAttributes({ sectionSubtitleFontSize: val })
                }
                min={0.9}
                max={1.2}
                step={0.05}
              />
            </>
          )}
        </PanelBody>

        <PanelBody title={__('Image', 'twork-builder')} initialOpen={false}>
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={imageAlt}
                style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
              />
              <TextControl
                label={__('Alt Text', 'twork-builder')}
                value={imageAlt}
                onChange={(val) => setAttributes({ imageAlt: val })}
              />
              <button
                type="button"
                className="components-button is-secondary is-small"
                onClick={() =>
                  setAttributes({
                    imageUrl: '',
                    imageId: undefined,
                    imageAlt: '',
                  })
                }
              >
                {__('Remove Image', 'twork-builder')}
              </button>
            </>
          ) : (
            <MediaPlaceholder
              onSelect={(media) => {
                if (!media) return;
                setAttributes({
                  imageUrl: media.url || '',
                  imageId: media.id || 0,
                  imageAlt: media.alt || media.title || '',
                });
              }}
              onSelectURL={(url) =>
                setAttributes({
                  imageUrl: url || '',
                  imageId: 0,
                })
              }
              accept="image/*"
              allowedTypes={['image']}
              labels={{
                title: __('Safety Image', 'twork-builder'),
              }}
            />
          )}
        </PanelBody>

        <PanelBody
          title={__('Container', 'twork-builder')}
          initialOpen={false}
        >
          <RangeControl
            label={__('Max Width (px)', 'twork-builder')}
            value={containerMaxWidth}
            onChange={(val) => setAttributes({ containerMaxWidth: val })}
            min={800}
            max={1920}
            step={10}
          />

          <RangeControl
            label={__('Horizontal Padding (px)', 'twork-builder')}
            value={containerPadding}
            onChange={(val) => setAttributes({ containerPadding: val })}
            min={0}
            max={80}
            step={5}
          />
        </PanelBody>

        <PanelBody
          title={__('Animation', 'twork-builder')}
          initialOpen={false}
        >
          <ToggleControl
            label={__('Enable Scroll Animation', 'twork-builder')}
            checked={animationOnScroll}
            onChange={(val) => setAttributes({ animationOnScroll: val })}
          />

          {animationOnScroll && (
            <>
              <TextControl
                label={__('Animation Type CSS Class', 'twork-builder')}
                help={__('e.g. fade-up, fadeIn, slideInLeft', 'twork-builder')}
                value={animationType}
                onChange={(val) => setAttributes({ animationType: val })}
              />

              <RangeControl
                label={__('Animation Delay (ms)', 'twork-builder')}
                value={animationDelay}
                onChange={(val) => setAttributes({ animationDelay: val })}
                min={0}
                max={400}
                step={50}
              />
            </>
          )}
        </PanelBody>
      </InspectorControls>

      <section {...blockProps}>
        <div className="rad-container" style={containerStyle}>
          <div className="rad-safety-grid" style={gridStyle}>
            <div className="rad-safety-image fade-up">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  style={{
                    borderRadius: 'var(--rad-radius)',
                    boxShadow: 'var(--rad-shadow)',
                    width: '100%',
                  }}
                />
              )}
            </div>

            <div className="rad-safety-content fade-up">
              {(showSectionTitle || showSectionSubtitle) && (
                <>
                  {showSectionTitle && (
                    <RichText
                      tagName="h2"
                      value={sectionTitle}
                      onChange={(val) => setAttributes({ sectionTitle: val })}
                      placeholder={__('Safety First Approach', 'twork-builder')}
                      style={{
                        fontSize: `${sectionTitleFontSize}rem`,
                        marginBottom: '20px',
                        color: sectionTitleColor,
                      }}
                    />
                  )}
                  {showSectionSubtitle && (
                    <RichText
                      tagName="p"
                      value={sectionSubtitle}
                      onChange={(val) =>
                        setAttributes({ sectionSubtitle: val })
                      }
                      placeholder={__(
                        'We adhere to ALARA principles to ensure patient safety…',
                        'twork-builder'
                      )}
                      style={{
                        color: sectionSubtitleColor,
                        marginBottom: '30px',
                        fontSize: `${sectionSubtitleFontSize}rem`,
                      }}
                    />
                  )}
                </>
              )}

              <div className="rad-safety-cards">
                <InnerBlocks
                  allowedBlocks={ALLOWED_BLOCKS}
                  template={TEMPLATE}
                  renderAppender={InnerBlocks.ButtonBlockAppender}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

