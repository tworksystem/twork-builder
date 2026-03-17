import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  PanelColorSettings,
  RichText,
} from '@wordpress/block-editor';
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  SelectControl,
  __experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const {
    backgroundColor,
    paddingTop,
    paddingBottom,
    containerMaxWidth,
    containerPadding,
    columns,
    columnsTablet,
    columnsMobile,
    gap,
    showSectionTitle,
    sectionTitle,
    sectionTitleColor,
    sectionTitleFontSize,
    sectionTitleFontWeight,
    sectionTitleAlignment,
    showSectionSubtitle,
    sectionSubtitle,
    sectionSubtitleColor,
    sectionSubtitleFontSize,
  } = attributes;

  const ALLOWED_BLOCKS = ['twork/rad-why-item'];
  const TEMPLATE = [
    [
      'twork/rad-why-item',
      {
        iconClass: 'fas fa-certificate',
        title: 'ISO Certified',
        description: 'Internationally recognized quality standards.',
      },
    ],
    [
      'twork/rad-why-item',
      {
        iconClass: 'fas fa-bolt',
        title: 'Fast Turnaround',
        description: 'Emergency reports within 1 hour.',
      },
    ],
    [
      'twork/rad-why-item',
      {
        iconClass: 'fas fa-user-md',
        title: 'Sub-Specialists',
        description: 'Neuro, Cardiac, and MSK Radiology experts.',
      },
    ],
    [
      'twork/rad-why-item',
      {
        iconClass: 'fas fa-money-bill-wave',
        title: 'Affordable',
        description: 'Transparent pricing with no hidden costs.',
      },
    ],
  ];

  const blockProps = useBlockProps({
    className: 'twork-rad-why-section-editor',
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
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
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
            min={0}
            max={200}
            step={5}
          />

          <RangeControl
            label={__('Padding Bottom (px)', 'twork-builder')}
            value={paddingBottom}
            onChange={(val) => setAttributes({ paddingBottom: val })}
            min={0}
            max={200}
            step={5}
          />
        </PanelBody>

        <PanelBody
          title={__('Section Heading', 'twork-builder')}
          initialOpen={false}
        >
          <ToggleControl
            label={__('Show Section Title', 'twork-builder')}
            checked={showSectionTitle}
            onChange={(val) => setAttributes({ showSectionTitle: val })}
          />

          {showSectionTitle && (
            <>
              <RichText
                tagName="h2"
                value={sectionTitle}
                onChange={(val) => setAttributes({ sectionTitle: val })}
                placeholder={__('Section Title...', 'twork-builder')}
                style={{ marginBottom: '10px' }}
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
                min={1.5}
                max={4}
                step={0.1}
              />

              <RangeControl
                label={__('Title Font Weight', 'twork-builder')}
                value={sectionTitleFontWeight}
                onChange={(val) =>
                  setAttributes({ sectionTitleFontWeight: val })
                }
                min={300}
                max={900}
                step={100}
              />

              <SelectControl
                label={__('Title Alignment', 'twork-builder')}
                value={sectionTitleAlignment}
                options={[
                  { label: __('Left', 'twork-builder'), value: 'left' },
                  { label: __('Center', 'twork-builder'), value: 'center' },
                  { label: __('Right', 'twork-builder'), value: 'right' },
                ]}
                onChange={(val) =>
                  setAttributes({ sectionTitleAlignment: val })
                }
              />
            </>
          )}

          <Divider />

          <ToggleControl
            label={__('Show Section Subtitle', 'twork-builder')}
            checked={showSectionSubtitle}
            onChange={(val) => setAttributes({ showSectionSubtitle: val })}
          />

          {showSectionSubtitle && (
            <>
              <RichText
                tagName="p"
                value={sectionSubtitle}
                onChange={(val) => setAttributes({ sectionSubtitle: val })}
                placeholder={__('Section Subtitle...', 'twork-builder')}
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
                min={0.8}
                max={2}
                step={0.1}
              />
            </>
          )}
        </PanelBody>

        <PanelBody
          title={__('Grid Layout', 'twork-builder')}
          initialOpen={false}
        >
          <RangeControl
            label={__('Columns (Desktop)', 'twork-builder')}
            value={columns}
            onChange={(val) => setAttributes({ columns: val })}
            min={1}
            max={4}
            step={1}
          />

          <RangeControl
            label={__('Columns (Tablet)', 'twork-builder')}
            value={columnsTablet}
            onChange={(val) => setAttributes({ columnsTablet: val })}
            min={1}
            max={3}
            step={1}
          />

          <RangeControl
            label={__('Columns (Mobile)', 'twork-builder')}
            value={columnsMobile}
            onChange={(val) => setAttributes({ columnsMobile: val })}
            min={1}
            max={2}
            step={1}
          />

          <Divider />

          <RangeControl
            label={__('Gap Between Items (px)', 'twork-builder')}
            value={gap}
            onChange={(val) => setAttributes({ gap: val })}
            min={0}
            max={60}
            step={5}
          />
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
      </InspectorControls>

      <section {...blockProps}>
        <div className="rad-container" style={containerStyle}>
          {(showSectionTitle || showSectionSubtitle) && (
            <div
              className="rad-header fade-up"
              style={{
                textAlign: sectionTitleAlignment,
                marginBottom: '50px',
              }}
            >
              {showSectionTitle && (
                <RichText
                  tagName="h2"
                  value={sectionTitle}
                  onChange={(val) => setAttributes({ sectionTitle: val })}
                  placeholder={__('Section Title...', 'twork-builder')}
                  style={{
                    fontSize: `${sectionTitleFontSize}rem`,
                    fontWeight: sectionTitleFontWeight,
                    color: sectionTitleColor,
                    marginBottom: showSectionSubtitle ? '10px' : '0',
                  }}
                />
              )}
              {showSectionSubtitle && (
                <RichText
                  tagName="p"
                  value={sectionSubtitle}
                  onChange={(val) => setAttributes({ sectionSubtitle: val })}
                  placeholder={__('Section Subtitle...', 'twork-builder')}
                  style={{
                    fontSize: `${sectionSubtitleFontSize}rem`,
                    color: sectionSubtitleColor,
                    margin: 0,
                  }}
                />
              )}
            </div>
          )}

          <div
            className="rad-why-grid"
            style={gridStyle}
            data-columns={columns}
          >
            <InnerBlocks
              allowedBlocks={ALLOWED_BLOCKS}
              template={TEMPLATE}
              renderAppender={InnerBlocks.ButtonBlockAppender}
            />
          </div>
        </div>
      </section>
    </>
  );
}

