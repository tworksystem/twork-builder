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
    SelectControl,
    TextControl,
    __experimentalDivider as Divider
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        gap,
        minColumnWidth,
        showSectionHeader,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontWeight,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        headerMaxWidth,
        headerMarginBottom,
        animationOnScroll,
        animationType
    } = attributes;

    const ALLOWED_BLOCKS = ['twork/em-triage-card'];
    const TEMPLATE = [
        ['twork/em-triage-card', {
            iconClass: 'fas fa-heartbeat',
            cardTitle: 'Heart Attack Signs',
            listItems: [
                { id: 1, text: 'Squeezing chest pain or pressure' },
                { id: 2, text: 'Pain radiating to jaw, neck, or left arm' },
                { id: 3, text: 'Shortness of breath & cold sweats' },
                { id: 4, text: 'Nausea or lightheadedness' }
            ]
        }],
        ['twork/em-triage-card', {
            iconClass: 'fas fa-lungs',
            cardTitle: 'Breathing Issues',
            listItems: [
                { id: 1, text: 'Severe asthma unresponsive to inhalers' },
                { id: 2, text: 'Choking or gasping for air' },
                { id: 3, text: 'Bluish lips or face (Cyanosis)' },
                { id: 4, text: 'Inability to speak in full sentences' }
            ]
        }],
        ['twork/em-triage-card', {
            iconClass: 'fas fa-brain',
            cardTitle: 'Stroke (F.A.S.T)',
            listItems: [
                { id: 1, text: 'Face drooping on one side' },
                { id: 2, text: 'Arm weakness or numbness' },
                { id: 3, text: 'Speech difficulty (slurred)' },
                { id: 4, text: 'Sudden severe headache & confusion' }
            ]
        }],
        ['twork/em-triage-card', {
            iconClass: 'fas fa-car-crash',
            cardTitle: 'Severe Trauma',
            listItems: [
                { id: 1, text: 'Heavy, uncontrollable bleeding' },
                { id: 2, text: 'Deep wounds or gunshot/knife wounds' },
                { id: 3, text: 'Compound fractures (bone visible)' },
                { id: 4, text: 'Head injury with loss of consciousness' }
            ]
        }]
    ];

    const blockProps = useBlockProps({
        className: 'twork-em-triage-section-editor',
        style: {
            backgroundColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative'
        }
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        position: 'relative'
    };

    const headerStyle = {
        textAlign: 'center',
        maxWidth: `${headerMaxWidth}px`,
        margin: `0 auto ${headerMarginBottom}px`
    };

    // Editor: fixed 3 columns per row for predictable WYSIWYG layout (frontend remains responsive via save.js)
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: `${gap}px`,
        width: '100%'
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section', 'twork-builder')} initialOpen={true}>
                    <PanelColorSettings
                        title={__('Background Color', 'twork-builder')}
                        colorSettings={[
                            { value: backgroundColor, onChange: (val) => setAttributes({ backgroundColor: val }), label: __('Background', 'twork-builder') }
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

                <PanelBody title={__('Section Header', 'twork-builder')} initialOpen={true}>
                    <ToggleControl
                        label={__('Show Section Header', 'twork-builder')}
                        checked={showSectionHeader}
                        onChange={(val) => setAttributes({ showSectionHeader: val })}
                    />
                    {showSectionHeader && (
                        <>
                            <TextControl
                                label={__('Title', 'twork-builder')}
                                value={sectionTitle}
                                onChange={(val) => setAttributes({ sectionTitle: val })}
                            />
                            <PanelColorSettings
                                title={__('Title Color', 'twork-builder')}
                                colorSettings={[
                                    { value: sectionTitleColor, onChange: (val) => setAttributes({ sectionTitleColor: val }), label: __('Title Color', 'twork-builder') }
                                ]}
                            />
                            <RangeControl
                                label={__('Title Font Size (rem)', 'twork-builder')}
                                value={sectionTitleFontSize}
                                onChange={(val) => setAttributes({ sectionTitleFontSize: val })}
                                min={1.5}
                                max={3.5}
                                step={0.1}
                            />
                            <RangeControl
                                label={__('Title Font Weight', 'twork-builder')}
                                value={sectionTitleFontWeight}
                                onChange={(val) => setAttributes({ sectionTitleFontWeight: val })}
                                min={400}
                                max={900}
                                step={100}
                            />
                            <Divider />
                            <TextControl
                                label={__('Subtitle', 'twork-builder')}
                                value={sectionSubtitle}
                                onChange={(val) => setAttributes({ sectionSubtitle: val })}
                                multiline
                            />
                            <PanelColorSettings
                                title={__('Subtitle Color', 'twork-builder')}
                                colorSettings={[
                                    { value: sectionSubtitleColor, onChange: (val) => setAttributes({ sectionSubtitleColor: val }), label: __('Subtitle Color', 'twork-builder') }
                                ]}
                            />
                            <RangeControl
                                label={__('Subtitle Font Size (rem)', 'twork-builder')}
                                value={sectionSubtitleFontSize}
                                onChange={(val) => setAttributes({ sectionSubtitleFontSize: val })}
                                min={0.85}
                                max={1.3}
                                step={0.05}
                            />
                            <RangeControl
                                label={__('Header Max Width (px)', 'twork-builder')}
                                value={headerMaxWidth}
                                onChange={(val) => setAttributes({ headerMaxWidth: val })}
                                min={500}
                                max={900}
                                step={10}
                            />
                            <RangeControl
                                label={__('Header Margin Bottom (px)', 'twork-builder')}
                                value={headerMarginBottom}
                                onChange={(val) => setAttributes({ headerMarginBottom: val })}
                                min={20}
                                max={80}
                                step={5}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Grid Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Min Column Width (px)', 'twork-builder')}
                        value={minColumnWidth}
                        onChange={(val) => setAttributes({ minColumnWidth: val })}
                        min={220}
                        max={400}
                        step={10}
                        help={__('Minimum width per card before wrapping', 'twork-builder')}
                    />
                    <RangeControl
                        label={__('Gap Between Cards (px)', 'twork-builder')}
                        value={gap}
                        onChange={(val) => setAttributes({ gap: val })}
                        min={15}
                        max={50}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Container', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Container Max Width (px)', 'twork-builder')}
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
                        max={60}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Animation', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Enable scroll animation', 'twork-builder')}
                        checked={animationOnScroll}
                        onChange={(val) => setAttributes({ animationOnScroll: val })}
                    />
                    {animationOnScroll && (
                        <SelectControl
                            label={__('Animation type', 'twork-builder')}
                            value={animationType}
                            options={[
                                { label: __('Fade up', 'twork-builder'), value: 'fade-up' },
                                { label: __('Fade in', 'twork-builder'), value: 'fadeIn' },
                                { label: __('None', 'twork-builder'), value: 'none' }
                            ]}
                            onChange={(val) => setAttributes({ animationType: val })}
                        />
                    )}
                </PanelBody>
            </InspectorControls>

            <section {...blockProps} className="em-section">
                <div className="em-container" style={containerStyle}>
                    {showSectionHeader && (
                        <div className="em-header" style={headerStyle} data-animation={animationOnScroll ? animationType : ''}>
                            <RichText
                                tagName="h2"
                                value={sectionTitle}
                                onChange={(val) => setAttributes({ sectionTitle: val })}
                                placeholder={__('When to Visit Emergency?', 'twork-builder')}
                                style={{
                                    fontSize: `${sectionTitleFontSize}rem`,
                                    fontWeight: sectionTitleFontWeight,
                                    color: sectionTitleColor,
                                    marginBottom: '15px',
                                    marginTop: 0
                                }}
                            />
                            <RichText
                                tagName="p"
                                value={sectionSubtitle}
                                onChange={(val) => setAttributes({ sectionSubtitle: val })}
                                placeholder={__('Recognizing the signs...', 'twork-builder')}
                                style={{
                                    fontSize: `${sectionSubtitleFontSize}rem`,
                                    color: sectionSubtitleColor,
                                    margin: 0
                                }}
                            />
                        </div>
                    )}

                    <div className="em-triage-grid" style={gridStyle}>
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
