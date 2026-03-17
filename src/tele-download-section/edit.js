import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    RichText,
    PanelColorSettings
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    TextControl,
    __experimentalDivider as Divider
} from '@wordpress/components';

const ALLOWED_BLOCKS = ['twork/tele-store-btn'];
const TEMPLATE = [
    ['twork/tele-store-btn', { url: 'https://jivakahospital.com/download-detail/' }],
    ['twork/tele-store-btn', { url: 'https://play.google.com/store/apps/details?id=com.jivaka.user' }],
    ['twork/tele-store-btn', { url: 'https://jivaka.advent-soft.com/download/jivaka-care.apk' }]
];

export default function Edit({ attributes, setAttributes }) {
    const {
        sectionPaddingTop,
        sectionPaddingBottom,
        containerMaxWidth,
        containerPadding,
        title,
        description,
        ctaPaddingTop,
        ctaPaddingBottom,
        ctaPaddingHorizontal,
        ctaBorderRadius,
        gradientStart,
        gradientEnd,
        gradientAngle,
        titleColor,
        titleFontSize,
        titleFontWeight,
        descriptionColor,
        descriptionFontSize,
        descriptionMarginBottom,
        storeBtnsGap,
        useFadeUp,
        sectionAnchor
    } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-tele-download-section-editor',
        style: {
            paddingTop: `${sectionPaddingTop}px`,
            paddingBottom: `${sectionPaddingBottom}px`
        }
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        position: 'relative'
    };

    const ctaStyle = {
        background: `linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})`,
        color: '#fff',
        padding: `${ctaPaddingTop}px ${ctaPaddingHorizontal}px ${ctaPaddingBottom}px`,
        borderRadius: `${ctaBorderRadius}px`,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(244, 139, 42, 0.25)'
    };

    const storeBtnsStyle = {
        display: 'flex',
        gap: `${storeBtnsGap}px`,
        justifyContent: 'center',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Content', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Section anchor ID', 'twork-builder')}
                        value={sectionAnchor}
                        onChange={(val) => setAttributes({ sectionAnchor: val || 'download' })}
                        help={__('Used for #download link. Leave empty to use block anchor.', 'twork-builder')}
                    />
                    <TextControl
                        label={__('Title', 'twork-builder')}
                        value={title}
                        onChange={(val) => setAttributes({ title: val })}
                    />
                    <TextControl
                        label={__('Description', 'twork-builder')}
                        value={description}
                        onChange={(val) => setAttributes({ description: val })}
                    />
                    <ToggleControl
                        label={__('Add fade-up class (for GSAP)', 'twork-builder')}
                        checked={useFadeUp}
                        onChange={(val) => setAttributes({ useFadeUp: val })}
                    />
                </PanelBody>
                <PanelBody title={__('Title & Description', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Title Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: titleColor,
                                onChange: (val) => setAttributes({ titleColor: val }),
                                label: __('Title Color', 'twork-builder')
                            }
                        ]}
                    />
                    <RangeControl
                        label={__('Title Font Size (rem)', 'twork-builder')}
                        value={titleFontSize}
                        onChange={(val) => setAttributes({ titleFontSize: val })}
                        min={1.2}
                        max={4}
                        step={0.1}
                    />
                    <RangeControl
                        label={__('Title Font Weight', 'twork-builder')}
                        value={titleFontWeight}
                        onChange={(val) => setAttributes({ titleFontWeight: val })}
                        min={400}
                        max={900}
                        step={100}
                    />
                    <Divider />
                    <PanelColorSettings
                        title={__('Description Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: descriptionColor,
                                onChange: (val) => setAttributes({ descriptionColor: val }),
                                label: __('Description Color', 'twork-builder')
                            }
                        ]}
                    />
                    <RangeControl
                        label={__('Description Font Size (rem)', 'twork-builder')}
                        value={descriptionFontSize}
                        onChange={(val) => setAttributes({ descriptionFontSize: val })}
                        min={0.9}
                        max={1.5}
                        step={0.1}
                    />
                    <RangeControl
                        label={__('Description Margin Bottom (px)', 'twork-builder')}
                        value={descriptionMarginBottom}
                        onChange={(val) => setAttributes({ descriptionMarginBottom: val })}
                        min={20}
                        max={80}
                        step={5}
                    />
                </PanelBody>
                <PanelBody title={__('CTA Box', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Gradient', 'twork-builder')}
                        colorSettings={[
                            { value: gradientStart, onChange: (val) => setAttributes({ gradientStart: val }), label: __('Start', 'twork-builder') },
                            { value: gradientEnd, onChange: (val) => setAttributes({ gradientEnd: val }), label: __('End', 'twork-builder') }
                        ]}
                    />
                    <RangeControl
                        label={__('Gradient Angle (deg)', 'twork-builder')}
                        value={gradientAngle}
                        onChange={(val) => setAttributes({ gradientAngle: val })}
                        min={0}
                        max={360}
                        step={5}
                    />
                    <RangeControl
                        label={__('CTA Padding Top (px)', 'twork-builder')}
                        value={ctaPaddingTop}
                        onChange={(val) => setAttributes({ ctaPaddingTop: val })}
                        min={40}
                        max={120}
                        step={5}
                    />
                    <RangeControl
                        label={__('CTA Padding Bottom (px)', 'twork-builder')}
                        value={ctaPaddingBottom}
                        onChange={(val) => setAttributes({ ctaPaddingBottom: val })}
                        min={40}
                        max={120}
                        step={5}
                    />
                    <RangeControl
                        label={__('CTA Padding Horizontal (px)', 'twork-builder')}
                        value={ctaPaddingHorizontal}
                        onChange={(val) => setAttributes({ ctaPaddingHorizontal: val })}
                        min={20}
                        max={80}
                        step={5}
                    />
                    <RangeControl
                        label={__('CTA Border Radius (px)', 'twork-builder')}
                        value={ctaBorderRadius}
                        onChange={(val) => setAttributes({ ctaBorderRadius: val })}
                        min={0}
                        max={40}
                        step={2}
                    />
                    <RangeControl
                        label={__('Gap Between Buttons (px)', 'twork-builder')}
                        value={storeBtnsGap}
                        onChange={(val) => setAttributes({ storeBtnsGap: val })}
                        min={10}
                        max={40}
                        step={5}
                    />
                </PanelBody>
                <PanelBody title={__('Section & Container', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Section Padding Top (px)', 'twork-builder')}
                        value={sectionPaddingTop}
                        onChange={(val) => setAttributes({ sectionPaddingTop: val })}
                        min={40}
                        max={200}
                        step={5}
                    />
                    <RangeControl
                        label={__('Section Padding Bottom (px)', 'twork-builder')}
                        value={sectionPaddingBottom}
                        onChange={(val) => setAttributes({ sectionPaddingBottom: val })}
                        min={40}
                        max={200}
                        step={5}
                    />
                    <RangeControl
                        label={__('Container Max Width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(val) => setAttributes({ containerMaxWidth: val })}
                        min={800}
                        max={1600}
                        step={10}
                    />
                    <RangeControl
                        label={__('Container Padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(val) => setAttributes({ containerPadding: val })}
                        min={12}
                        max={60}
                        step={4}
                    />
                </PanelBody>
            </InspectorControls>

            <section {...blockProps} id={sectionAnchor || undefined}>
                <div className="jivaka-container" style={containerStyle}>
                    <div
                        className={`tele-cta ${useFadeUp ? 'fade-up' : ''}`}
                        style={ctaStyle}
                    >
                        <RichText
                            tagName="h2"
                            value={title}
                            onChange={(val) => setAttributes({ title: val })}
                            placeholder={__('Download Jivaka Health App', 'twork-builder')}
                            style={{
                                fontSize: `${titleFontSize}rem`,
                                fontWeight: titleFontWeight,
                                color: titleColor,
                                marginBottom: '15px',
                                position: 'relative',
                                zIndex: 1
                            }}
                        />
                        <RichText
                            tagName="p"
                            value={description}
                            onChange={(val) => setAttributes({ description: val })}
                            placeholder={__('Manage appointments, view lab reports…', 'twork-builder')}
                            style={{
                                fontSize: `${descriptionFontSize}rem`,
                                color: descriptionColor,
                                maxWidth: '600px',
                                margin: `0 auto ${descriptionMarginBottom}px`,
                                position: 'relative',
                                zIndex: 1
                            }}
                        />
                        <div className="store-btns" style={storeBtnsStyle}>
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
