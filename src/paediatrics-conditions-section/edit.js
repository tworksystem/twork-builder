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
} from '@wordpress/components';

const ALLOWED_BLOCKS = ['twork/paediatrics-condition-card'];
const TEMPLATE = [
    ['twork/paediatrics-condition-card', { iconClass: 'fas fa-lungs', title: 'Respiratory Issues', subtitle: 'Asthma, Pneumonia' }],
    ['twork/paediatrics-condition-card', { iconClass: 'fas fa-temperature-high', title: 'Infectious Diseases', subtitle: 'Dengue, Typhoid' }],
    ['twork/paediatrics-condition-card', { iconClass: 'fas fa-allergies', title: 'Allergies & Skin', subtitle: 'Eczema, Rashes' }],
    ['twork/paediatrics-condition-card', { iconClass: 'fas fa-utensils', title: 'Nutritional Health', subtitle: 'Malnutrition, Obesity' }],
    ['twork/paediatrics-condition-card', { iconClass: 'fas fa-brain', title: 'Development', subtitle: 'Autism, Speech Delay' }],
    ['twork/paediatrics-condition-card', { iconClass: 'fas fa-baby', title: 'Neonatal Care', subtitle: 'Jaundice, Preterm' }],
    ['twork/paediatrics-condition-card', { iconClass: 'fas fa-heartbeat', title: 'Congenital Heart', subtitle: 'Defects, Murmurs' }],
    ['twork/paediatrics-condition-card', { iconClass: 'fas fa-bone', title: 'Orthopaedics', subtitle: 'Fractures, Clubfoot' }],
];

export default function Edit({ attributes, setAttributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        showSectionHeader,
        sectionTitle,
        sectionSubtitle,
        sectionTitleColor,
        sectionSubtitleColor,
        sectionTitleFontSize,
        sectionSubtitleFontSize,
        minColumnWidth,
        gap,
        animationOnScroll,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'paed-section paed-conditions-section twork-paed-conditions-section-editor',
        style: {
            backgroundColor: backgroundColor || '#ffffff',
            paddingTop: `${Number(paddingTop)}px`,
            paddingBottom: `${Number(paddingBottom)}px`,
            position: 'relative',
        },
    });

    const containerStyle = {
        maxWidth: `${Number(containerMaxWidth)}px`,
        margin: '0 auto',
        padding: `0 ${Number(containerPadding)}px`,
        position: 'relative',
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${Number(minColumnWidth)}px, 1fr))`,
        gap: `${Number(gap)}px`,
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section header', 'twork-builder')} initialOpen={true}>
                    <ToggleControl
                        label={__('Show section header', 'twork-builder')}
                        checked={!!showSectionHeader}
                        onChange={(val) => setAttributes({ showSectionHeader: val })}
                    />
                    {showSectionHeader && (
                        <>
                            <PanelColorSettings
                                colorSettings={[
                                    { value: sectionTitleColor, onChange: (v) => setAttributes({ sectionTitleColor: v ?? undefined }), label: __('Title color', 'twork-builder') },
                                    { value: sectionSubtitleColor, onChange: (v) => setAttributes({ sectionSubtitleColor: v ?? undefined }), label: __('Subtitle color', 'twork-builder') },
                                ]}
                            />
                            <RangeControl
                                label={__('Title font size (rem)', 'twork-builder')}
                                value={sectionTitleFontSize}
                                onChange={(v) => setAttributes({ sectionTitleFontSize: v })}
                                min={1.5}
                                max={3.5}
                                step={0.1}
                            />
                            <RangeControl
                                label={__('Subtitle font size (rem)', 'twork-builder')}
                                value={sectionSubtitleFontSize}
                                onChange={(v) => setAttributes({ sectionSubtitleFontSize: v })}
                                min={0.9}
                                max={1.4}
                                step={0.05}
                            />
                        </>
                    )}
                </PanelBody>
                <PanelBody title={__('Colors', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        colorSettings={[
                            { value: backgroundColor, onChange: (v) => setAttributes({ backgroundColor: v ?? undefined }), label: __('Section background', 'twork-builder') },
                        ]}
                    />
                </PanelBody>
                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Padding top (px)', 'twork-builder')}
                        value={paddingTop}
                        onChange={(v) => setAttributes({ paddingTop: v })}
                        min={0}
                        max={200}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(v) => setAttributes({ paddingBottom: v })}
                        min={0}
                        max={200}
                        step={5}
                    />
                    <RangeControl
                        label={__('Container max width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(v) => setAttributes({ containerMaxWidth: v })}
                        min={800}
                        max={1400}
                        step={20}
                    />
                    <RangeControl
                        label={__('Container padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(v) => setAttributes({ containerPadding: v })}
                        min={0}
                        max={80}
                        step={5}
                    />
                    <RangeControl
                        label={__('Min column width (px)', 'twork-builder')}
                        value={minColumnWidth}
                        onChange={(v) => setAttributes({ minColumnWidth: v })}
                        min={180}
                        max={400}
                        step={10}
                    />
                    <RangeControl
                        label={__('Gap between cards (px)', 'twork-builder')}
                        value={gap}
                        onChange={(v) => setAttributes({ gap: v })}
                        min={10}
                        max={50}
                        step={5}
                    />
                </PanelBody>
                <PanelBody title={__('Animation', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Animation on scroll', 'twork-builder')}
                        checked={!!animationOnScroll}
                        onChange={(val) => setAttributes({ animationOnScroll: val })}
                    />
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="paed-container" style={containerStyle}>
                    {showSectionHeader && (
                        <div className="paed-header paed-fade-up" style={{ marginBottom: '60px' }}>
                            <RichText
                                tagName="h2"
                                value={sectionTitle}
                                onChange={(val) => setAttributes({ sectionTitle: val })}
                                placeholder={__('Conditions We Treat', 'twork-builder')}
                                style={{
                                    fontSize: `${sectionTitleFontSize}rem`,
                                    color: sectionTitleColor,
                                    marginBottom: '15px',
                                    marginTop: 0,
                                    textAlign: 'center',
                                }}
                            />
                            <RichText
                                tagName="p"
                                value={sectionSubtitle}
                                onChange={(val) => setAttributes({ sectionSubtitle: val })}
                                placeholder={__('Expert care for…', 'twork-builder')}
                                style={{
                                    fontSize: `${sectionSubtitleFontSize}rem`,
                                    color: sectionSubtitleColor,
                                    margin: 0,
                                    textAlign: 'center',
                                }}
                            />
                        </div>
                    )}
                    <div className="paed-conditions-grid" style={gridStyle}>
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
