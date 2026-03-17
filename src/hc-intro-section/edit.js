import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    RichText,
    MediaUpload,
    MediaUploadCheck,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    TextControl,
    Button,
    __experimentalDivider as Divider,
} from '@wordpress/components';
import { PanelColorSettings } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['twork/hc-intro-list-item'];
const TEMPLATE = [
    ['twork/hc-intro-list-item', { text: 'Licensed & Verified Professionals' }],
    ['twork/hc-intro-list-item', { text: 'Personalized Care Plans' }],
    ['twork/hc-intro-list-item', { text: '24/7 Support & Monitoring' }],
    ['twork/hc-intro-list-item', { text: 'Latest Medical Equipment' }],
];

export default function Edit({ attributes, setAttributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        imageId,
        imageUrl,
        imageAlt,
        badgeText,
        badgeColor,
        title,
        titleFontSize,
        titleColor,
        description,
        descriptionColor,
        primaryColor,
        animationOnScroll,
        animationType,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'hc-section twork-hc-intro-section-editor',
        style: {
            backgroundColor: backgroundColor || '#ffffff',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            '--hc-primary': primaryColor || '#f48b2a',
        },
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '50px',
        alignItems: 'center',
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section', 'twork-builder')} initialOpen={true}>
                    {PanelColorSettings && (
                        <PanelColorSettings
                            title={__('Background', 'twork-builder')}
                            colorSettings={[
                                {
                                    value: backgroundColor,
                                    onChange: (val) => setAttributes({ backgroundColor: val }),
                                    label: __('Background Color', 'twork-builder'),
                                },
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

                <PanelBody title={__('Image', 'twork-builder')} initialOpen={true}>
                    <MediaUploadCheck>
                        {!imageUrl ? (
                            <MediaUpload
                                onSelect={(media) =>
                                    setAttributes({
                                        imageId: media.id,
                                        imageUrl: media.url || (media.sizes?.large?.url) || media.sizes?.full?.url || '',
                                        imageAlt: media.alt || imageAlt,
                                    })
                                }
                                allowedTypes={['image']}
                                value={imageId}
                                render={({ open }) => (
                                    <Button variant="secondary" onClick={open} style={{ width: '100%' }}>
                                        {__('Choose image', 'twork-builder')}
                                    </Button>
                                )}
                            />
                        ) : (
                            <div>
                                <img
                                    src={imageUrl}
                                    alt=""
                                    style={{ width: '100%', height: 'auto', marginBottom: 10, borderRadius: 8 }}
                                />
                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    <MediaUpload
                                        onSelect={(media) =>
                                            setAttributes({
                                                imageId: media.id,
                                                imageUrl: media.url || (media.sizes?.large?.url) || '',
                                                imageAlt: media.alt || imageAlt,
                                            })
                                        }
                                        allowedTypes={['image']}
                                        value={imageId}
                                        render={({ open }) => (
                                            <Button variant="primary" onClick={open}>
                                                {__('Replace', 'twork-builder')}
                                            </Button>
                                        )}
                                    />
                                    <Button
                                        variant="secondary"
                                        isDestructive
                                        onClick={() => setAttributes({ imageId: 0, imageUrl: '', imageAlt: 'Doctor Visiting Patient' })}
                                    >
                                        {__('Remove', 'twork-builder')}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </MediaUploadCheck>
                    {imageUrl && (
                        <TextControl
                            label={__('Image alt text', 'twork-builder')}
                            value={imageAlt}
                            onChange={(val) => setAttributes({ imageAlt: val })}
                        />
                    )}
                </PanelBody>

                <PanelBody title={__('Content styling', 'twork-builder')} initialOpen={false}>
                    {PanelColorSettings && (
                        <PanelColorSettings
                            title={__('Colors', 'twork-builder')}
                            colorSettings={[
                                { value: badgeColor, onChange: (val) => setAttributes({ badgeColor: val }), label: __('Badge color', 'twork-builder') },
                                { value: titleColor, onChange: (val) => setAttributes({ titleColor: val }), label: __('Title color', 'twork-builder') },
                                { value: descriptionColor, onChange: (val) => setAttributes({ descriptionColor: val }), label: __('Description color', 'twork-builder') },
                                { value: primaryColor, onChange: (val) => setAttributes({ primaryColor: val }), label: __('Check icon color', 'twork-builder') },
                            ]}
                        />
                    )}
                    <RangeControl
                        label={__('Title font size (rem)', 'twork-builder')}
                        value={titleFontSize}
                        onChange={(val) => setAttributes({ titleFontSize: val })}
                        min={1.5}
                        max={3.5}
                        step={0.1}
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
                            help={__('e.g. fade-up, fadeInUp', 'twork-builder')}
                        />
                    )}
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="hc-container hc-intro-grid" style={containerStyle}>
                    <div className={animationOnScroll ? animationType : ''} style={{ margin: 0 }}>
                        {imageUrl ? (
                            <img src={imageUrl} alt={imageAlt || ''} className="hc-intro-img" style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 16 }} />
                        ) : (
                            <div
                                className="hc-intro-img-placeholder"
                                style={{
                                    width: '100%',
                                    height: 400,
                                    background: '#f0f0f0',
                                    borderRadius: 16,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#999',
                                    fontSize: 14,
                                }}
                            >
                                {__('Choose an image in the sidebar', 'twork-builder')}
                            </div>
                        )}
                    </div>
                    <div className={animationOnScroll ? animationType : ''} style={{ margin: 0 }}>
                        <RichText
                            tagName="h4"
                            value={badgeText}
                            onChange={(val) => setAttributes({ badgeText: val })}
                            placeholder={__('Badge text…', 'twork-builder')}
                            style={{
                                color: badgeColor || 'var(--hc-primary)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                marginBottom: 10,
                            }}
                        />
                        <RichText
                            tagName="h2"
                            value={title}
                            onChange={(val) => setAttributes({ title: val })}
                            placeholder={__('Section title…', 'twork-builder')}
                            style={{
                                fontSize: `${titleFontSize}rem`,
                                fontWeight: 700,
                                marginBottom: 20,
                                color: titleColor || '#212121',
                            }}
                        />
                        <RichText
                            tagName="p"
                            value={description}
                            onChange={(val) => setAttributes({ description: val })}
                            placeholder={__('Description…', 'twork-builder')}
                            style={{
                                marginBottom: 25,
                                color: descriptionColor || '#555',
                                lineHeight: 1.7,
                            }}
                        />
                        <ul className="hc-check-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <InnerBlocks
                                allowedBlocks={ALLOWED_BLOCKS}
                                template={TEMPLATE}
                                templateLock={false}
                                renderAppender={InnerBlocks.ButtonBlockAppender}
                            />
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
