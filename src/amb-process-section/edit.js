import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    PanelColorSettings,
    RichText
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        columns,
        columnsTablet,
        columnsMobile,
        gap,
        containerMaxWidth,
        containerPadding,
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        sectionTitleMarginBottom,
        showConnectorLine,
        stepNumberColor,
        stepNumberBgColor,
        animationOnScroll,
        animationDelay
    } = attributes;

    const ALLOWED_BLOCKS = ['twork/amb-process-step'];
    const TEMPLATE = [
        ['twork/amb-process-step', { title: 'Call 1911', description: 'Our dispatch center gathers location and patient condition.' }],
        ['twork/amb-process-step', { title: 'Dispatch', description: 'The nearest ALS/BLS unit is deployed immediately.' }],
        ['twork/amb-process-step', { title: 'Stabilize', description: 'Paramedics begin treatment on-site and en route.' }],
        ['twork/amb-process-step', { title: 'Hospital Arrival', description: 'ER team is pre-informed and ready for handover.' }]
    ];

    const blockProps = useBlockProps({
        className: 'twork-amb-process-section-editor',
        style: {
            backgroundColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative',
            '--amb-step-number-color': stepNumberColor,
            '--amb-step-number-bg': stepNumberBgColor
        }
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        position: 'relative',
        zIndex: 2
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        textAlign: 'center'
    };

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={__('Section Title', 'twork-builder')}
                    initialOpen={true}
                >
                    <ToggleControl
                        label={__('Show Section Title', 'twork-builder')}
                        checked={showSectionTitle}
                        onChange={(val) => setAttributes({ showSectionTitle: val })}
                    />
                    {showSectionTitle && (
                        <>
                            <PanelColorSettings
                                title={__('Title Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: sectionTitleColor,
                                        onChange: (val) => setAttributes({ sectionTitleColor: val }),
                                        label: __('Title Color', 'twork-builder')
                                    }
                                ]}
                            />
                            <RangeControl
                                label={__('Title Font Size (rem)', 'twork-builder')}
                                value={sectionTitleFontSize}
                                onChange={(val) => setAttributes({ sectionTitleFontSize: val })}
                                min={1.5}
                                max={4}
                                step={0.1}
                            />
                            <RangeControl
                                label={__('Title Font Weight', 'twork-builder')}
                                value={sectionTitleFontWeight}
                                onChange={(val) => setAttributes({ sectionTitleFontWeight: val })}
                                min={100}
                                max={900}
                                step={100}
                            />
                            <SelectControl
                                label={__('Title Alignment', 'twork-builder')}
                                value={sectionTitleAlignment}
                                options={[
                                    { label: __('Left', 'twork-builder'), value: 'left' },
                                    { label: __('Center', 'twork-builder'), value: 'center' },
                                    { label: __('Right', 'twork-builder'), value: 'right' }
                                ]}
                                onChange={(val) => setAttributes({ sectionTitleAlignment: val })}
                            />
                            <RangeControl
                                label={__('Title Margin Bottom (px)', 'twork-builder')}
                                value={sectionTitleMarginBottom}
                                onChange={(val) => setAttributes({ sectionTitleMarginBottom: val })}
                                min={20}
                                max={100}
                                step={5}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Section Style', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Background Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: backgroundColor,
                                onChange: (val) => setAttributes({ backgroundColor: val }),
                                label: __('Background', 'twork-builder')
                            }
                        ]}
                    />
                    <RangeControl
                        label={__('Padding Top (px)', 'twork-builder')}
                        value={paddingTop}
                        onChange={(val) => setAttributes({ paddingTop: val })}
                        min={40}
                        max={150}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding Bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(val) => setAttributes({ paddingBottom: val })}
                        min={40}
                        max={150}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Step Number Circle', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Number Circle', 'twork-builder')}
                        colorSettings={[
                            {
                                value: stepNumberBgColor,
                                onChange: (val) => setAttributes({ stepNumberBgColor: val }),
                                label: __('Background', 'twork-builder')
                            },
                            {
                                value: stepNumberColor,
                                onChange: (val) => setAttributes({ stepNumberColor: val }),
                                label: __('Number Color', 'twork-builder')
                            }
                        ]}
                    />
                </PanelBody>

                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Columns (Desktop)', 'twork-builder')}
                        value={columns}
                        onChange={(val) => setAttributes({ columns: val })}
                        min={2}
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
                    <RangeControl
                        label={__('Gap (px)', 'twork-builder')}
                        value={gap}
                        onChange={(val) => setAttributes({ gap: val })}
                        min={0}
                        max={60}
                        step={5}
                    />
                    <ToggleControl
                        label={__('Show Connector Line Between Steps', 'twork-builder')}
                        checked={showConnectorLine}
                        onChange={(val) => setAttributes({ showConnectorLine: val })}
                    />
                </PanelBody>

                <PanelBody title={__('Container', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Max Width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(val) => setAttributes({ containerMaxWidth: val })}
                        min={800}
                        max={1920}
                        step={10}
                    />
                    <RangeControl
                        label={__('Container Padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(val) => setAttributes({ containerPadding: val })}
                        min={0}
                        max={100}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Animation', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Enable Scroll Animation', 'twork-builder')}
                        checked={animationOnScroll}
                        onChange={(val) => setAttributes({ animationOnScroll: val })}
                    />
                    {animationOnScroll && (
                        <RangeControl
                            label={__('Stagger Delay (ms)', 'twork-builder')}
                            value={animationDelay}
                            onChange={(val) => setAttributes({ animationDelay: val })}
                            min={0}
                            max={300}
                            step={20}
                        />
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div style={containerStyle}>
                    <div
                        className="editor-label"
                        style={{
                            textAlign: 'center',
                            padding: '10px',
                            background: '#2271b1',
                            color: '#fff',
                            fontWeight: '600',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            marginBottom: '20px',
                            borderRadius: '4px'
                        }}
                    >
                        {__('Ambulance Process Section (Emergency Protocol)', 'twork-builder')}
                    </div>

                    {showSectionTitle && (
                        <div
                            className="section-header amb-process-header amb-header"
                            style={{
                                textAlign: sectionTitleAlignment,
                                marginBottom: `${sectionTitleMarginBottom}px`
                            }}
                        >
                            <RichText
                                tagName="h2"
                                value={sectionTitle}
                                onChange={(val) => setAttributes({ sectionTitle: val })}
                                placeholder={__('Section Title...', 'twork-builder')}
                                className="section-title"
                                style={{
                                    fontSize: `${sectionTitleFontSize}rem`,
                                    fontWeight: sectionTitleFontWeight,
                                    color: sectionTitleColor,
                                    marginTop: 0,
                                    marginBottom: 0
                                }}
                            />
                        </div>
                    )}

                    <div
                        className="twork-amb-steps-container amb-steps"
                        style={gridStyle}
                        data-columns={columns}
                        data-connector={showConnectorLine}
                    >
                        <InnerBlocks
                            allowedBlocks={ALLOWED_BLOCKS}
                            template={TEMPLATE}
                            renderAppender={InnerBlocks.ButtonBlockAppender}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
