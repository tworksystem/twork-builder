import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    MediaPlaceholder,
    URLInput
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    ToggleControl,
    BaseControl,
    Button,
    RangeControl
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { image, imageId, alt, url, linkTarget, linkRel, imageHeight } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-tele-store-btn-editor'
    });

    const linkProps = url
        ? { href: url, target: linkTarget, rel: linkRel }
        : { href: '#', role: 'button', 'aria-disabled': 'true' };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Link', 'twork-builder')} initialOpen={true}>
                    <BaseControl label={__('URL', 'twork-builder')}>
                        <URLInput
                            value={url}
                            onChange={(value) => setAttributes({ url: value || '' })}
                            placeholder={__('https://...', 'twork-builder')}
                        />
                    </BaseControl>
                    <ToggleControl
                        label={__('Open in new tab', 'twork-builder')}
                        checked={linkTarget === '_blank'}
                        onChange={(checked) => setAttributes({
                            linkTarget: checked ? '_blank' : '_self'
                        })}
                    />
                    <TextControl
                        label={__('Link rel', 'twork-builder')}
                        value={linkRel}
                        onChange={(val) => setAttributes({ linkRel: val || 'noopener noreferrer' })}
                        help={__('e.g. noopener noreferrer', 'twork-builder')}
                    />
                </PanelBody>
                <PanelBody title={__('Image', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Alt text', 'twork-builder')}
                        value={alt}
                        onChange={(val) => setAttributes({ alt: val })}
                        help={__('Accessibility description for the badge image', 'twork-builder')}
                    />
                    <RangeControl
                        label={__('Image height (px)', 'twork-builder')}
                        value={imageHeight}
                        onChange={(val) => setAttributes({ imageHeight: val })}
                        min={32}
                        max={80}
                        step={2}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {!image ? (
                    <MediaPlaceholder
                        onSelect={(media) => setAttributes({
                            image: media.url,
                            imageId: media.id,
                            alt: alt || media.alt
                        })}
                        allowedTypes={['image']}
                        multiple={false}
                        labels={{
                            title: __('App store badge', 'twork-builder'),
                            instructions: __('Upload or select a badge image (e.g. App Store, Google Play)', 'twork-builder')
                        }}
                    />
                ) : (
                    <div style={{ display: 'inline-block' }}>
                        <a
                            {...linkProps}
                            className="store-btn store-btn-image"
                            style={{ pointerEvents: url ? 'none' : 'auto', display: 'inline-block' }}
                        >
                            <img
                                src={image}
                                alt={alt || ''}
                                className="store-btn-img"
                                style={{
                                    height: `${imageHeight}px`,
                                    width: 'auto',
                                    display: 'block'
                                }}
                            />
                        </a>
                        <Button
                            isSecondary
                            isSmall
                            onClick={() => setAttributes({ image: '', imageId: null })}
                            style={{ marginTop: 8 }}
                        >
                            {__('Replace image', 'twork-builder')}
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
