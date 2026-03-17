import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  PanelColorSettings,
} from '@wordpress/block-editor';
import {
  PanelBody,
  RangeControl,
  ToggleControl,
  SelectControl,
  __experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = ['twork/rad-stat-item'];
const TEMPLATE = [
  [
    'twork/rad-stat-item',
    { statNumber: '24/7', statLabel: 'Operating Hours' },
  ],
  [
    'twork/rad-stat-item',
    { statNumber: '1.5T', statLabel: 'MRI Power' },
  ],
  [
    'twork/rad-stat-item',
    { statNumber: '100%', statLabel: 'Digital Reports' },
  ],
  [
    'twork/rad-stat-item',
    { statNumber: '15+', statLabel: 'Specialists' },
  ],
];

export default function Edit({ attributes, setAttributes }) {
  const {
    backgroundColor,
    paddingTop,
    paddingBottom,
    marginTop,
    containerMaxWidth,
    containerPadding,
    columns,
    columnsTablet,
    columnsMobile,
    gap,
    animationOnScroll,
    animationType,
    animationDelay,
  } = attributes;

  const blockProps = useBlockProps({
    className: 'twork-rad-stats-section-editor rad-section',
  });

  const containerStyle = {
    maxWidth: `${containerMaxWidth}px`,
    margin: '0 auto',
    padding: `0 ${containerPadding}px`,
  };

  const statsWrapperStyle = {
    marginTop: `${marginTop}px`,
    paddingBottom: '60px',
  };

  const statsBoxStyle = {
    backgroundColor,
    padding: `${paddingTop}px ${paddingBottom}px`,
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
    textAlign: 'center',
  };

  return (
    <>
      <InspectorControls>
        <PanelBody
          title={__('Stats Strip Appearance', 'twork-builder')}
          initialOpen={true}
        >
          <PanelColorSettings
            title={__('Box Background', 'twork-builder')}
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
            min={20}
            max={80}
            step={5}
          />

          <RangeControl
            label={__('Padding Bottom (px)', 'twork-builder')}
            value={paddingBottom}
            onChange={(val) => setAttributes({ paddingBottom: val })}
            min={20}
            max={80}
            step={5}
          />

          <RangeControl
            label={__('Margin Top (px)', 'twork-builder')}
            value={marginTop}
            onChange={(val) => setAttributes({ marginTop: val })}
            min={-120}
            max={40}
            step={5}
            help={__(
              'Negative values overlap with the hero (e.g. -60).',
              'twork-builder'
            )}
          />
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
            label={__('Gap Between Items (px)', 'twork-builder')}
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
            label={__('Container Max Width (px)', 'twork-builder')}
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
              <SelectControl
                label={__('Animation Type', 'twork-builder')}
                value={animationType}
                options={[
                  { label: __('Fade Up', 'twork-builder'), value: 'fade-up' },
                  { label: __('Fade In', 'twork-builder'), value: 'fadeIn' },
                  {
                    label: __('Slide In Left', 'twork-builder'),
                    value: 'slideInLeft',
                  },
                  {
                    label: __('Slide In Right', 'twork-builder'),
                    value: 'slideInRight',
                  },
                ]}
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
          <div className="rad-stats" style={statsWrapperStyle}>
            <div className="rad-stats-box" style={statsBoxStyle}>
              <InnerBlocks
                allowedBlocks={ALLOWED_BLOCKS}
                template={TEMPLATE}
                renderAppender={InnerBlocks.ButtonBlockAppender}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

