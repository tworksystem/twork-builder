import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  PanelColorSettings,
  RichText,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  TextControl,
  SelectControl,
  __experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = ['twork/rad-step-item'];

const TEMPLATE = [
  [
    'twork/rad-step-item',
    {
      iconClass: 'far fa-calendar-check',
      title: 'Book',
      description: 'Schedule via phone or app.',
    },
  ],
  [
    'twork/rad-step-item',
    {
      iconClass: 'fas fa-user-nurse',
      title: 'Prepare',
      description: 'Fast or drink contrast (if needed).',
    },
  ],
  [
    'twork/rad-step-item',
    {
      iconClass: 'fas fa-radiation',
      title: 'Scan',
      description: 'Quick and painless imaging.',
    },
  ],
  [
    'twork/rad-step-item',
    {
      iconClass: 'fas fa-file-medical-alt',
      title: 'Report',
      description: 'Digital report within 2 hours.',
    },
  ],
];

export default function Edit({ attributes, setAttributes, clientId }) {
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
    sectionTitleAlignment,
    columns,
    columnsTablet,
    columnsMobile,
    gap,
    animationOnScroll,
    animationType,
    animationDelay,
  } = attributes;

  const innerBlockCount = useSelect(
    (select) => select('core/block-editor').getBlockCount(clientId),
    [clientId]
  );

  const columnsToUse = Math.min(
    columns,
    Math.max(1, innerBlockCount || 0)
  );

  const blockProps = useBlockProps({
    className: 'twork-rad-process-section-editor rad-section',
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
    gridTemplateColumns: `repeat(${columnsToUse}, 1fr)`,
    gap: `${gap}px`,
    textAlign: 'center',
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

              <SelectControl
                label={__('Title Alignment', 'twork-builder')}
                value={sectionTitleAlignment}
                options={[
                  { label: __('Left', 'twork-builder'), value: 'left' },
                  { label: __('Center', 'twork-builder'), value: 'center' },
                  { label: __('Right', 'twork-builder'), value: 'right' },
                ]}
                onChange={(val) =>
                  setAttributes({ sectionTitleAlignment: val || 'center' })
                }
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
            max={6}
            step={1}
          />

          <RangeControl
            label={__('Columns (Tablet)', 'twork-builder')}
            value={columnsTablet}
            onChange={(val) => setAttributes({ columnsTablet: val })}
            min={1}
            max={4}
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
            label={__('Gap Between Steps (px)', 'twork-builder')}
            value={gap}
            onChange={(val) => setAttributes({ gap: val })}
            min={8}
            max={40}
            step={2}
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
                help={__('e.g. fade-up, fadeInUp', 'twork-builder')}
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
          {showSectionTitle && (
            <div
              className="rad-header fade-up"
              style={{ textAlign: sectionTitleAlignment || 'center' }}
            >
              <RichText
                tagName="h2"
                value={sectionTitle}
                onChange={(val) => setAttributes({ sectionTitle: val })}
                placeholder={__('Your Visit Workflow', 'twork-builder')}
                style={{
                  fontSize: `${sectionTitleFontSize}rem`,
                }}
              />
            </div>
          )}

          <div className="rad-process-grid" style={gridStyle}>
            <InnerBlocks
              allowedBlocks={ALLOWED_BLOCKS}
              template={TEMPLATE}
              templateLock={false}
              renderAppender={InnerBlocks.ButtonBlockAppender}
            />
          </div>
        </div>
      </section>
    </>
  );
}

