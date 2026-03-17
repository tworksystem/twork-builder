import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    RichText,
    URLInput
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    TextControl,
    PanelColorSettings,
    __experimentalDivider as Divider
} from '@wordpress/components';

const ALLOWED_BLOCKS = ['twork/hotline-accordion-item'];
const TEMPLATE = [
    ['twork/hotline-accordion-item', { title: 'Heart Centre Hotline', phoneNumber: '09-111 222 333' }],
    ['twork/hotline-accordion-item', { title: 'Neuro Centre Hotline', phoneNumber: '09-444 555 666' }],
    ['twork/hotline-accordion-item', { title: 'Pharmacy & Lab', phoneNumber: '09-777 888 999' }]
];

export default function Edit({ attributes, setAttributes }) {
    const {
        accordionHeading,
        locationHeading,
        locationHeadingMarginTop,
        mapEmbedUrl,
        mapHeight,
        formTitle,
        formNameLabel,
        formPhoneLabel,
        formMessageLabel,
        buttonText,
        formId,
        layoutGap,
        containerMaxWidth,
        containerPadding,
        paddingBottom,
        primaryColor
    } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-contact-layout-section-editor',
        style: {
            paddingBottom: `${paddingBottom}px`,
            '--contact-primary': primaryColor
        }
    });

    const layoutStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr',
        gap: `${layoutGap}px`,
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={true}>
                    <RangeControl
                        label={__('Gap between columns (px)', 'twork-builder')}
                        value={layoutGap}
                        onChange={(val) => setAttributes({ layoutGap: val })}
                        min={20}
                        max={100}
                        step={5}
                    />
                    <RangeControl
                        label={__('Container max width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(val) => setAttributes({ containerMaxWidth: val })}
                        min={800}
                        max={1600}
                        step={10}
                    />
                    <RangeControl
                        label={__('Container padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(val) => setAttributes({ containerPadding: val })}
                        min={0}
                        max={80}
                        step={5}
                    />
                    <RangeControl
                        label={__('Section padding bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(val) => setAttributes({ paddingBottom: val })}
                        min={40}
                        max={160}
                        step={5}
                    />
                    <Divider />
                    <RangeControl
                        label={__('"Our Location" heading margin top (px)', 'twork-builder')}
                        value={locationHeadingMarginTop}
                        onChange={(val) => setAttributes({ locationHeadingMarginTop: val })}
                        min={0}
                        max={80}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Map', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Map height (px)', 'twork-builder')}
                        value={mapHeight}
                        onChange={(val) => setAttributes({ mapHeight: val })}
                        min={200}
                        max={500}
                        step={10}
                    />
                    <div className="components-base-control" style={{ marginTop: 12 }}>
                        <label className="components-base-control__label">
                            {__('Google Maps embed URL', 'twork-builder')}
                        </label>
                        <URLInput
                            value={mapEmbedUrl}
                            onChange={(val) => setAttributes({ mapEmbedUrl: val })}
                            placeholder={__('Paste iframe embed URL…', 'twork-builder')}
                            style={{ marginTop: 4 }}
                        />
                    </div>
                </PanelBody>

                <PanelBody title={__('Form labels', 'twork-builder')} initialOpen={false}>
                    <TextControl
                        label={__('Name field label', 'twork-builder')}
                        value={formNameLabel}
                        onChange={(val) => setAttributes({ formNameLabel: val })}
                    />
                    <TextControl
                        label={__('Phone field label', 'twork-builder')}
                        value={formPhoneLabel}
                        onChange={(val) => setAttributes({ formPhoneLabel: val })}
                    />
                    <TextControl
                        label={__('Message field label', 'twork-builder')}
                        value={formMessageLabel}
                        onChange={(val) => setAttributes({ formMessageLabel: val })}
                    />
                    <TextControl
                        label={__('Submit button text', 'twork-builder')}
                        value={buttonText}
                        onChange={(val) => setAttributes({ buttonText: val })}
                    />
                    <TextControl
                        label={__('Form ID (for JS)', 'twork-builder')}
                        value={formId}
                        onChange={(val) => setAttributes({ formId: val })}
                        help={__('Used as id attribute on the form element.', 'twork-builder')}
                    />
                </PanelBody>

                <PanelBody title={__('Colors', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Primary / accent', 'twork-builder')}
                        colorSettings={[
                            {
                                value: primaryColor,
                                onChange: (val) => setAttributes({ primaryColor: val }),
                                label: __('Primary color', 'twork-builder')
                            }
                        ]}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="contact-layout contact-layout-editor" style={layoutStyle}>
                    <div className="contact-details animate-up">
                        <RichText
                            tagName="h2"
                            value={accordionHeading}
                            onChange={(val) => setAttributes({ accordionHeading: val })}
                            placeholder={__('Direct Department Lines', 'twork-builder')}
                            className="contact-details-heading"
                        />
                        <div className="hotline-accordion">
                            <InnerBlocks
                                allowedBlocks={ALLOWED_BLOCKS}
                                template={TEMPLATE}
                                renderAppender={InnerBlocks.ButtonBlockAppender}
                            />
                        </div>
                        <RichText
                            tagName="h2"
                            value={locationHeading}
                            onChange={(val) => setAttributes({ locationHeading: val })}
                            placeholder={__('Our Location', 'twork-builder')}
                            style={{ marginTop: `${locationHeadingMarginTop}px` }}
                        />
                        <div className="map-container" style={{ height: `${mapHeight}px` }}>
                            {mapEmbedUrl ? (
                                <iframe
                                    src={mapEmbedUrl}
                                    title={__('Map', 'twork-builder')}
                                    allowFullScreen
                                    loading="lazy"
                                    style={{ width: '100%', height: '100%', border: 'none' }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        background: '#f0f0f0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#666',
                                        fontSize: 14
                                    }}
                                >
                                    {__('Add map embed URL in block settings (Map panel)', 'twork-builder')}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="contact-form-wrapper animate-up">
                        <RichText
                            tagName="h3"
                            value={formTitle}
                            onChange={(val) => setAttributes({ formTitle: val })}
                            placeholder={__('Send us a Message', 'twork-builder')}
                            className="form-title"
                        />
                        <form id={formId || 'contactForm'} className="contact-form-preview">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder=" "
                                    disabled
                                    readOnly
                                />
                                <label className="form-label">{formNameLabel}</label>
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder=" "
                                    disabled
                                    readOnly
                                />
                                <label className="form-label">{formPhoneLabel}</label>
                            </div>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    placeholder=" "
                                    disabled
                                    readOnly
                                    rows={4}
                                />
                                <label className="form-label">{formMessageLabel}</label>
                            </div>
                            <button type="button" className="jivaka-btn btn-primary" style={{ width: '100%', border: 'none' }} disabled>
                                {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
