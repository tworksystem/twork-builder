import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText,
    MediaPlaceholder
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    TextControl,
    BaseControl,
    Button,
    __experimentalDivider as Divider
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        sectionPaddingTop,
        sectionPaddingBottom,
        containerMaxWidth,
        containerPadding,
        wrapperMarginTop,
        leftBackgroundImage,
        leftBackgroundImageId,
        leftOverlayColor,
        leftOverlayOpacity,
        leftContentPadding,
        leftTitle,
        leftTitleColor,
        leftTitleFontSize,
        leftDescription,
        leftDescriptionColor,
        leftDescriptionFontSize,
        leftPhone,
        leftEmail,
        leftContactColor,
        leftContactFontSize,
        formPadding,
        fullNameLabel,
        fullNamePlaceholder,
        countryLabel,
        countryPlaceholder,
        phoneLabel,
        phonePlaceholder,
        emailLabel,
        emailPlaceholder,
        specialtyLabel,
        specialtyOptions,
        messageLabel,
        messagePlaceholder,
        submitButtonText,
        submitButtonBgColor,
        submitButtonTextColor,
        animationOnScroll,
        formAction,
        formMethod
    } = attributes;

    const specialtyOptionsList = (specialtyOptions || '').split('\n').filter(Boolean);

    const blockProps = useBlockProps({
        className: 'twork-inquiry-form-section-editor',
        style: {
            paddingTop: `${sectionPaddingTop}px`,
            paddingBottom: `${sectionPaddingBottom}px`,
            position: 'relative'
        }
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        position: 'relative'
    };

    const inquiryImgStyle = {
        background: leftBackgroundImage ? `url(${leftBackgroundImage}) center/cover no-repeat` : '#f0f0f0',
        position: 'relative',
        minHeight: '300px'
    };

    const inquiryTextStyle = {
        position: 'relative',
        zIndex: 2,
        padding: `${leftContentPadding}px`,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '280px'
    };

    const formContainerStyle = {
        padding: `${formPadding}px`,
        background: '#fff',
        border: '2px dashed #e0e0e0'
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section Padding', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Padding Top (px)', 'twork-builder')}
                        value={sectionPaddingTop}
                        onChange={(val) => setAttributes({ sectionPaddingTop: val })}
                        min={0}
                        max={200}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding Bottom (px)', 'twork-builder')}
                        value={sectionPaddingBottom}
                        onChange={(val) => setAttributes({ sectionPaddingBottom: val })}
                        min={0}
                        max={200}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Left Panel - Background', 'twork-builder')} initialOpen={true}>
                    <BaseControl label={__('Background Image', 'twork-builder')}>
                        {!leftBackgroundImage ? (
                            <MediaPlaceholder
                                onSelect={(media) => setAttributes({ leftBackgroundImage: media.url, leftBackgroundImageId: media.id })}
                                allowedTypes={['image']}
                                multiple={false}
                                labels={{ title: __('Background Image', 'twork-builder') }}
                            />
                        ) : (
                            <div>
                                <img src={leftBackgroundImage} alt="" style={{ width: '100%', height: 'auto', maxHeight: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
                                <Button isSecondary isSmall onClick={() => setAttributes({ leftBackgroundImage: '', leftBackgroundImageId: null })}>
                                    {__('Remove', 'twork-builder')}
                                </Button>
                            </div>
                        )}
                    </BaseControl>
                    <TextControl
                        label={__('Overlay Color', 'twork-builder')}
                        value={leftOverlayColor}
                        onChange={(val) => setAttributes({ leftOverlayColor: val })}
                    />
                    <RangeControl
                        label={__('Overlay Opacity', 'twork-builder')}
                        value={leftOverlayOpacity}
                        onChange={(val) => setAttributes({ leftOverlayOpacity: val })}
                        min={0}
                        max={1}
                        step={0.1}
                    />
                </PanelBody>

                <PanelBody title={__('Left Panel - Content', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Title', 'twork-builder')}
                        value={leftTitle}
                        onChange={(val) => setAttributes({ leftTitle: val })}
                    />
                    <TextControl
                        label={__('Description', 'twork-builder')}
                        value={leftDescription}
                        onChange={(val) => setAttributes({ leftDescription: val })}
                    />
                    <TextControl
                        label={__('Phone', 'twork-builder')}
                        value={leftPhone}
                        onChange={(val) => setAttributes({ leftPhone: val })}
                    />
                    <TextControl
                        label={__('Email', 'twork-builder')}
                        value={leftEmail}
                        onChange={(val) => setAttributes({ leftEmail: val })}
                    />
                </PanelBody>

                <PanelBody title={__('Form Settings', 'twork-builder')} initialOpen={false}>
                    <TextControl
                        label={__('Form Action URL', 'twork-builder')}
                        value={formAction}
                        onChange={(val) => setAttributes({ formAction: val })}
                        help={__('Leave empty for same page. Use admin-ajax.php or Contact Form 7 endpoint for handling.', 'twork-builder')}
                    />
                    <TextControl
                        label={__('Full Name Label', 'twork-builder')}
                        value={fullNameLabel}
                        onChange={(val) => setAttributes({ fullNameLabel: val })}
                    />
                    <TextControl
                        label={__('Country Label', 'twork-builder')}
                        value={countryLabel}
                        onChange={(val) => setAttributes({ countryLabel: val })}
                    />
                    <TextControl
                        label={__('Phone Label', 'twork-builder')}
                        value={phoneLabel}
                        onChange={(val) => setAttributes({ phoneLabel: val })}
                    />
                    <TextControl
                        label={__('Email Label', 'twork-builder')}
                        value={emailLabel}
                        onChange={(val) => setAttributes({ emailLabel: val })}
                    />
                    <TextControl
                        label={__('Specialty Label', 'twork-builder')}
                        value={specialtyLabel}
                        onChange={(val) => setAttributes({ specialtyLabel: val })}
                    />
                    <TextControl
                        label={__('Specialty Options (one per line)', 'twork-builder')}
                        value={specialtyOptions}
                        onChange={(val) => setAttributes({ specialtyOptions: val })}
                        help={__('First line = placeholder. One option per line.', 'twork-builder')}
                    />
                    <TextControl
                        label={__('Message Label', 'twork-builder')}
                        value={messageLabel}
                        onChange={(val) => setAttributes({ messageLabel: val })}
                    />
                    <TextControl
                        label={__('Submit Button Text', 'twork-builder')}
                        value={submitButtonText}
                        onChange={(val) => setAttributes({ submitButtonText: val })}
                    />
                </PanelBody>

                <PanelBody title={__('Animation', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Enable Scroll Animation', 'twork-builder')}
                        checked={animationOnScroll}
                        onChange={(val) => setAttributes({ animationOnScroll: val })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div style={containerStyle}>
                    <div
                        className="inquiry-wrapper"
                        style={{
                            background: '#fff',
                            borderRadius: 'var(--radius, 12px)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            marginTop: `${wrapperMarginTop}px`
                        }}
                    >
                        <div className="inquiry-img" style={inquiryImgStyle}>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: leftOverlayColor,
                                    opacity: leftOverlayOpacity
                                }}
                            />
                            <div className="inquiry-text" style={inquiryTextStyle}>
                                <RichText
                                    tagName="h3"
                                    value={leftTitle}
                                    onChange={(val) => setAttributes({ leftTitle: val })}
                                    placeholder={__('Title...', 'twork-builder')}
                                    style={{
                                        fontSize: `${leftTitleFontSize}rem`,
                                        margin: '0 0 20px 0',
                                        color: leftTitleColor
                                    }}
                                />
                                <RichText
                                    tagName="p"
                                    value={leftDescription}
                                    onChange={(val) => setAttributes({ leftDescription: val })}
                                    placeholder={__('Description...', 'twork-builder')}
                                    style={{
                                        fontSize: `${leftDescriptionFontSize}rem`,
                                        opacity: 0.9,
                                        margin: 0,
                                        color: leftDescriptionColor
                                    }}
                                />
                                <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
                                    <li style={{ marginBottom: '10px' }}>
                                        <i className="fas fa-phone-alt" style={{ marginRight: '8px' }} />
                                        <span style={{ color: leftContactColor, fontSize: `${leftContactFontSize}rem` }}>{leftPhone}</span>
                                    </li>
                                    <li>
                                        <i className="fas fa-envelope" style={{ marginRight: '8px' }} />
                                        <span style={{ color: leftContactColor, fontSize: `${leftContactFontSize}rem` }}>{leftEmail}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="form-container" style={formContainerStyle}>
                            <form>
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>{fullNameLabel}</label>
                                    <input type="text" className="form-control" placeholder={fullNamePlaceholder} disabled readOnly style={{ width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '6px' }} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div className="form-group" style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>{countryLabel}</label>
                                        <input type="text" className="form-control" placeholder={countryPlaceholder} disabled readOnly style={{ width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '6px' }} />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>{phoneLabel}</label>
                                        <input type="text" className="form-control" placeholder={phonePlaceholder} disabled readOnly style={{ width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '6px' }} />
                                    </div>
                                </div>
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>{emailLabel}</label>
                                    <input type="email" className="form-control" placeholder={emailPlaceholder} disabled readOnly style={{ width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '6px' }} />
                                </div>
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>{specialtyLabel}</label>
                                    <select className="form-control" disabled style={{ width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '6px' }}>
                                        {specialtyOptionsList.map((opt, i) => (
                                            <option key={i}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group" style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>{messageLabel}</label>
                                    <textarea className="form-control" placeholder={messagePlaceholder} disabled readOnly style={{ width: '100%', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '6px', minHeight: '100px' }} />
                                </div>
                                <button
                                    type="button"
                                    className="jivaka-btn btn-primary"
                                    style={{
                                        width: '100%',
                                        background: submitButtonBgColor,
                                        color: submitButtonTextColor,
                                        padding: '12px 28px',
                                        border: 'none',
                                        borderRadius: '6px',
                                        fontWeight: 700,
                                        cursor: 'default'
                                    }}
                                >
                                    {submitButtonText}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
