/**
 * Twork Testimonial Item – Editor
 * Matches home.html: testimonial-image-wrapper (img + quote-icon), blockquote, p.name, p.procedure.
 */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    PanelColorSettings,
    MediaPlaceholder
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    TextControl,
    Button,
    BaseControl,
    __experimentalDivider as Divider
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        image,
        imageId,
        imageAlt,
        imageSize,
        showQuoteIcon,
        name,
        nameColor,
        nameFontSize,
        nameFontWeight,
        procedure,
        procedureColor,
        procedureFontSize,
        location,
        quote,
        quoteColor,
        quoteFontSize,
        quoteLineHeight,
        quoteFontStyle
    } = attributes;

    // Editor: light card background so use dark text for readability (front-end uses section bg + white text).
    const editorTextColor = '#212121';
    const editorMutedColor = '#555555';

    const blockProps = useBlockProps({
        className: 'twork-testimonial-item-editor testimonial-card',
        style: {
            padding: '24px',
            borderRadius: '8px',
            border: '2px dashed #e0e0e0',
            background: '#fafafa',
            textAlign: 'center',
            color: editorTextColor
        }
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Avatar', 'twork-builder')} initialOpen={true}>
                    <BaseControl label={__('Patient Image', 'twork-builder')}>
                        {!image ? (
                            <MediaPlaceholder
                                onSelect={(media) => setAttributes({ image: media.url, imageId: media.id })}
                                allowedTypes={['image']}
                                multiple={false}
                                labels={{ title: __('Patient Image', 'twork-builder') }}
                            />
                        ) : (
                            <div>
                                <img
                                    src={image}
                                    alt={imageAlt}
                                    style={{ width: `${Math.min(imageSize, 80)}px`, height: `${Math.min(imageSize, 80)}px`, borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }}
                                />
                                <Button isSecondary isSmall onClick={() => setAttributes({ image: '', imageId: null })}>
                                    {__('Remove', 'twork-builder')}
                                </Button>
                            </div>
                        )}
                    </BaseControl>
                    <TextControl label={__('Alt Text', 'twork-builder')} value={imageAlt} onChange={(val) => setAttributes({ imageAlt: val })} />
                    <RangeControl label={__('Image Size (px)', 'twork-builder')} value={imageSize} onChange={(val) => setAttributes({ imageSize: val })} min={60} max={150} step={5} />
                    <ToggleControl label={__('Show Quote Icon', 'twork-builder')} checked={showQuoteIcon} onChange={(val) => setAttributes({ showQuoteIcon: val })} />
                </PanelBody>

                <PanelBody title={__('Quote', 'twork-builder')} initialOpen={true}>
                    <RichText
                        tagName="p"
                        value={quote}
                        onChange={(val) => setAttributes({ quote: val })}
                        placeholder={__('Testimonial quote...', 'twork-builder')}
                        style={{ fontStyle: quoteFontStyle, marginBottom: '12px' }}
                    />
                    <PanelColorSettings title={__('Quote Color', 'twork-builder')} colorSettings={[{ value: quoteColor, onChange: (val) => setAttributes({ quoteColor: val }), label: __('Color', 'twork-builder') }]} />
                    <RangeControl label={__('Font Size (rem)', 'twork-builder')} value={quoteFontSize} onChange={(val) => setAttributes({ quoteFontSize: val })} min={0.8} max={1.2} step={0.05} />
                    <RangeControl label={__('Line Height', 'twork-builder')} value={quoteLineHeight} onChange={(val) => setAttributes({ quoteLineHeight: val })} min={1.3} max={2} step={0.1} />
                </PanelBody>

                <PanelBody title={__('Name & Procedure', 'twork-builder')} initialOpen={false}>
                    <TextControl label={__('Name', 'twork-builder')} value={name} onChange={(val) => setAttributes({ name: val })} />
                    <PanelColorSettings title={__('Name Color', 'twork-builder')} colorSettings={[{ value: nameColor, onChange: (val) => setAttributes({ nameColor: val }), label: __('Color', 'twork-builder') }]} />
                    <RangeControl label={__('Name Font Size (rem)', 'twork-builder')} value={nameFontSize} onChange={(val) => setAttributes({ nameFontSize: val })} min={0.8} max={1.2} step={0.05} />
                    <RangeControl label={__('Name Font Weight', 'twork-builder')} value={nameFontWeight} onChange={(val) => setAttributes({ nameFontWeight: val })} min={400} max={900} step={100} />
                    <Divider />
                    <TextControl label={__('Procedure', 'twork-builder')} value={procedure || location} onChange={(val) => setAttributes({ procedure: val })} help={__('e.g. CBR, Valve Prolapse Repair', 'twork-builder')} />
                    <RangeControl label={__('Procedure Font Size (rem)', 'twork-builder')} value={procedureFontSize} onChange={(val) => setAttributes({ procedureFontSize: val })} min={0.65} max={1} step={0.05} />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="testimonial-image-wrapper" style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
                    {image ? (
                        <img
                            src={image}
                            alt={imageAlt || name || 'Patient'}
                            style={{
                                width: `${imageSize}px`,
                                height: `${imageSize}px`,
                                borderRadius: '50%',
                                border: '4px solid #fff',
                                objectFit: 'cover',
                                display: 'block'
                            }}
                        />
                    ) : (
                        <div style={{ width: `${imageSize}px`, height: `${imageSize}px`, borderRadius: '50%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '0.8rem' }}>
                            {__('Avatar', 'twork-builder')}
                        </div>
                    )}
                    {showQuoteIcon && (
                        <span className="quote-icon" style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: 30,
                            height: 30,
                            backgroundColor: '#212121',
                            borderRadius: '50%',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem',
                            fontWeight: 900,
                            fontFamily: 'serif'
                        }}>"</span>
                    )}
                </div>
                <RichText
                    tagName="blockquote"
                    value={quote}
                    onChange={(val) => setAttributes({ quote: val })}
                    placeholder={__('Testimonial quote...', 'twork-builder')}
                    style={{
                        fontStyle: quoteFontStyle,
                        fontSize: `${quoteFontSize}rem`,
                        color: editorTextColor,
                        lineHeight: quoteLineHeight,
                        border: 'none',
                        padding: 0,
                        margin: '0 0 15px 0'
                    }}
                />
                <RichText
                    tagName="p"
                    className="name"
                    value={name}
                    onChange={(val) => setAttributes({ name: val })}
                    placeholder={__('Patient Name', 'twork-builder')}
                    style={{
                        fontWeight: nameFontWeight,
                        fontSize: `${nameFontSize}rem`,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        margin: 0,
                        color: editorTextColor
                    }}
                />
                <RichText
                    tagName="p"
                    className="procedure"
                    value={procedure || location}
                    onChange={(val) => setAttributes({ procedure: val })}
                    placeholder={__('CBR', 'twork-builder')}
                    style={{
                        fontSize: `${procedureFontSize}rem`,
                        margin: '5px 0 0 0',
                        color: editorMutedColor,
                        opacity: 1
                    }}
                />
            </div>
        </>
    );
}
