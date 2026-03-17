import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    MediaPlaceholder,
    InspectorControls
} from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Button, RangeControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { logoUrl, logoId, logoAlt, logoWidth = 0, logoHeight = 0, linkUrl, linkTarget, linkRel } = attributes;

    const logoImgStyle = {
        ...(logoWidth > 0 && { width: logoWidth + 'px', maxWidth: logoWidth + 'px' }),
        ...(logoHeight > 0 && { height: logoHeight + 'px' }),
        ...(logoWidth > 0 || logoHeight > 0 ? { objectFit: 'contain' } : { maxWidth: 150, height: 'auto' })
    };

    const blockProps = useBlockProps({
        className: 'twork-affiliation-logo-item-editor partner-logo-wrap',
        style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80px',
            padding: '20px',
            border: '2px dashed #e0e0e0',
            borderRadius: '8px',
            background: '#fafafa'
        }
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Logo Image', 'twork-builder')} initialOpen={true}>
                    {!logoUrl ? (
                        <MediaPlaceholder
                            onSelect={(media) => setAttributes({
                                logoUrl: media.url,
                                logoId: media.id,
                                logoAlt: media.alt || ''
                            })}
                            allowedTypes={['image']}
                            multiple={false}
                            labels={{ title: __('Partner Logo', 'twork-builder') }}
                        />
                    ) : (
                        <div>
                            <img
                                src={logoUrl}
                                alt=""
                                style={{ width: '100%', maxWidth: 150, height: 'auto', marginBottom: '10px' }}
                            />
                            <TextControl
                                label={__('Alt Text', 'twork-builder')}
                                value={logoAlt}
                                onChange={(val) => setAttributes({ logoAlt: val })}
                                help={__('For accessibility (e.g., ISO Logo)', 'twork-builder')}
                            />
                            <RangeControl
                                label={__('Logo width (px)', 'twork-builder')}
                                value={logoWidth || 0}
                                onChange={(val) => setAttributes({ logoWidth: val ? Number(val) : 0 })}
                                min={0}
                                max={300}
                                step={5}
                                help={__('0 = use section default', 'twork-builder')}
                            />
                            <RangeControl
                                label={__('Logo height (px)', 'twork-builder')}
                                value={logoHeight || 0}
                                onChange={(val) => setAttributes({ logoHeight: val ? Number(val) : 0 })}
                                min={0}
                                max={200}
                                step={5}
                                help={__('0 = use section default', 'twork-builder')}
                            />
                            <Button
                                isSecondary
                                isSmall
                                onClick={() => setAttributes({ logoUrl: '', logoId: null, logoAlt: '' })}
                                style={{ marginTop: '10px' }}
                            >
                                {__('Replace Logo', 'twork-builder')}
                            </Button>
                        </div>
                    )}
                </PanelBody>

                <PanelBody title={__('Link', 'twork-builder')} initialOpen={false}>
                    <TextControl
                        label={__('Link URL', 'twork-builder')}
                        value={linkUrl}
                        onChange={(val) => setAttributes({ linkUrl: val })}
                        placeholder="https://"
                        help={__('Optional: Link to partner website', 'twork-builder')}
                    />
                    {linkUrl && (
                        <>
                            <ToggleControl
                                label={__('Open in New Tab', 'twork-builder')}
                                checked={linkTarget === '_blank'}
                                onChange={(val) => setAttributes({ linkTarget: val ? '_blank' : '_self' })}
                            />
                            <TextControl
                                label={__('Link Rel', 'twork-builder')}
                                value={linkRel}
                                onChange={(val) => setAttributes({ linkRel: val })}
                                help={__('e.g., noopener noreferrer', 'twork-builder')}
                            />
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {!logoUrl ? (
                    <span style={{ color: '#999', fontSize: '0.9rem' }}>
                        {__('Add logo from sidebar', 'twork-builder')}
                    </span>
                ) : linkUrl ? (
                    <a
                        href={linkUrl}
                        target={linkTarget}
                        rel={linkRel}
                        onClick={(e) => e.preventDefault()}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <img
                            src={logoUrl}
                            alt={logoAlt}
                            className="partner-logo"
                            style={logoImgStyle}
                        />
                    </a>
                ) : (
                    <img
                        src={logoUrl}
                        alt={logoAlt}
                        className="partner-logo"
                        style={logoImgStyle}
                    />
                )}
            </div>
        </>
    );
}
