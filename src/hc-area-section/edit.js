import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    RichText,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    TextControl,
    __experimentalDivider as Divider,
} from '@wordpress/components';
import { PanelColorSettings } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['twork/hc-area-tag'];
const TEMPLATE = [
    ['twork/hc-area-tag', { label: 'Chanayethazan' }],
    ['twork/hc-area-tag', { label: 'Chanmyathazi' }],
    ['twork/hc-area-tag', { label: 'Maha Aungmye' }],
    ['twork/hc-area-tag', { label: 'Aungmyethazan' }],
    ['twork/hc-area-tag', { label: 'Pyigyidagun' }],
    ['twork/hc-area-tag', { label: 'Amarapura' }],
    ['twork/hc-area-tag', { label: 'Patheingyi' }],
];

export default function Edit({ attributes, setAttributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        sectionTitle,
        sectionSubtitle,
        titleColor,
        subtitleColor,
        gap,
        animationOnScroll,
        animationType,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'hc-section hc-area-section twork-hc-area-section-editor',
        style: {
            backgroundColor: backgroundColor || '#212121',
            color: '#fff',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        textAlign: 'center',
    };

    const gridStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: `${gap}px`,
        marginTop: 30,
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section', 'twork-builder')} initialOpen={true}>
                    {PanelColorSettings && (
                        <PanelColorSettings
                            title={__('Background', 'twork-builder')}
                            colorSettings={[
                                { value: backgroundColor, onChange: (val) => setAttributes({ backgroundColor: val }), label: __('Background Color', 'twork-builder') },
                            ]}
                        />
                    )}
                    <RangeControl
                        label={__('Padding Top (px)', 'twork-builder')}
                        value={paddingTop}
                        onChange={(val) => setAttributes({ paddingTop: val })}
                        min={20}
                        max={120}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding Bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(val) => setAttributes({ paddingBottom: val })}
                        min={20}
                        max={120}
                        step={5}
                    />
                    <Divider />
                    <RangeControl
                        label={__('Container Max Width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(val) => setAttributes({ containerMaxWidth: val })}
                        min={800}
                        max={1400}
                        step={20}
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
                <PanelBody title={__('Header', 'twork-builder')} initialOpen={true}>
                    {PanelColorSettings && (
                        <PanelColorSettings
                            title={__('Text colors', 'twork-builder')}
                            colorSettings={[
                                { value: titleColor, onChange: (val) => setAttributes({ titleColor: val }), label: __('Title color', 'twork-builder') },
                                { value: subtitleColor, onChange: (val) => setAttributes({ subtitleColor: val }), label: __('Subtitle color', 'twork-builder') },
                            ]}
                        />
                    )}
                </PanelBody>
                <PanelBody title={__('Grid', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Gap between tags (px)', 'twork-builder')}
                        value={gap}
                        onChange={(val) => setAttributes({ gap: val })}
                        min={0}
                        max={40}
                        step={5}
                    />
                </PanelBody>
                <PanelBody title={__('Animation', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Animation on scroll', 'twork-builder')}
                        checked={animationOnScroll}
                        onChange={(val) => setAttributes({ animationOnScroll: val })}
                    />
                    {animationOnScroll && (
                        <TextControl
                            label={__('Animation class', 'twork-builder')}
                            value={animationType}
                            onChange={(val) => setAttributes({ animationType: val || 'fade-up' })}
                        />
                    )}
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className={`hc-container ${animationOnScroll ? animationType : ''}`} style={containerStyle}>
                    <RichText
                        tagName="h2"
                        value={sectionTitle}
                        onChange={(val) => setAttributes({ sectionTitle: val })}
                        placeholder={__('Service Coverage Areas', 'twork-builder')}
                        style={{ color: titleColor || '#fff', marginBottom: 0 }}
                    />
                    <RichText
                        tagName="p"
                        value={sectionSubtitle}
                        onChange={(val) => setAttributes({ sectionSubtitle: val })}
                        placeholder={__('We currently provide home care services in the following townships:', 'twork-builder')}
                        style={{ opacity: 0.8, marginBottom: 30, marginTop: 10, color: subtitleColor || 'rgba(255,255,255,0.8)' }}
                    />
                    <div className="hc-area-grid" style={gridStyle}>
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
