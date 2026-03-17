import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText,
    MediaPlaceholder,
    PanelColorSettings,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    TextControl,
    Button,
    __experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        badge,
        title,
        subtitle,
        primaryButtonText,
        primaryButtonUrl,
        outlineButtonText,
        outlineButtonUrl,
        outlineButtonLight,
        backgroundImage,
        backgroundImageId,
        backgroundOverlay,
        backgroundOverlayColor,
        backgroundOverlayOpacity,
        imageUrl,
        imageId,
        imageAlt,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        minHeight,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'paed-hero twork-paediatrics-hero-editor',
        style: {
            backgroundColor: '#000000',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            minHeight: `${minHeight}px`,
            position: 'relative',
            overflow: 'hidden',
        },
    });

    const layoutStyle = {
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '50px',
    };

    const buttonsWrapStyle = {
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    };

    const outlineBtnStyle = outlineButtonLight
        ? { color: '#fff', borderColor: '#fff' }
        : undefined;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Content', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Badge', 'twork-builder')}
                        value={badge}
                        onChange={(val) => setAttributes({ badge: val })}
                        help={__('Small label above the title.', 'twork-builder')}
                    />
                    <p style={{ marginBottom: 4, fontWeight: 600 }}>{__('Title (Enter for line break)', 'twork-builder')}</p>
                    <RichText
                        tagName="div"
                        value={title}
                        onChange={(val) => setAttributes({ title: val })}
                        placeholder={__('Hero title…', 'twork-builder')}
                        multiline="br"
                        style={{ marginBottom: 12 }}
                    />
                    <p style={{ marginBottom: 4, fontWeight: 600 }}>{__('Subtitle', 'twork-builder')}</p>
                    <RichText
                        tagName="p"
                        value={subtitle}
                        onChange={(val) => setAttributes({ subtitle: val })}
                        placeholder={__('Hero subtitle…', 'twork-builder')}
                        style={{ marginBottom: 12 }}
                    />
                    <Divider />
                    <TextControl
                        label={__('Primary button text', 'twork-builder')}
                        value={primaryButtonText}
                        onChange={(val) => setAttributes({ primaryButtonText: val })}
                    />
                    <TextControl
                        label={__('Primary button URL', 'twork-builder')}
                        value={primaryButtonUrl}
                        onChange={(val) => setAttributes({ primaryButtonUrl: val })}
                    />
                    <TextControl
                        label={__('Outline button text', 'twork-builder')}
                        value={outlineButtonText}
                        onChange={(val) => setAttributes({ outlineButtonText: val })}
                    />
                    <TextControl
                        label={__('Outline button URL', 'twork-builder')}
                        value={outlineButtonUrl}
                        onChange={(val) => setAttributes({ outlineButtonUrl: val })}
                    />
                    <ToggleControl
                        label={__('Outline button light (white text/border)', 'twork-builder')}
                        checked={!!outlineButtonLight}
                        onChange={(val) => setAttributes({ outlineButtonLight: val })}
                    />
                </PanelBody>

                <PanelBody title={__('Background image', 'twork-builder')} initialOpen={false}>
                    {!backgroundImage ? (
                        <MediaPlaceholder
                            onSelect={(media) =>
                                setAttributes({
                                    backgroundImage: media.url,
                                    backgroundImageId: media.id,
                                })
                            }
                            allowedTypes={['image']}
                            multiple={false}
                            labels={{ title: __('Hero background', 'twork-builder') }}
                        />
                    ) : (
                        <div>
                            <img
                                src={backgroundImage}
                                alt=""
                                style={{ width: '100%', height: 'auto', marginBottom: 8, borderRadius: 4 }}
                            />
                            <Button
                                isSecondary
                                isSmall
                                onClick={() =>
                                    setAttributes({ backgroundImage: '', backgroundImageId: null })
                                }
                            >
                                {__('Remove', 'twork-builder')}
                            </Button>
                        </div>
                    )}
                    {backgroundImage && (
                        <>
                            <Divider />
                            <ToggleControl
                                label={__('Overlay', 'twork-builder')}
                                checked={backgroundOverlay}
                                onChange={(val) => setAttributes({ backgroundOverlay: val })}
                            />
                            {backgroundOverlay && (
                                <>
                                    <PanelColorSettings
                                        colorSettings={[
                                            {
                                                value: backgroundOverlayColor,
                                                onChange: (v) => setAttributes({ backgroundOverlayColor: v ?? undefined }),
                                                label: __('Overlay color', 'twork-builder'),
                                            },
                                        ]}
                                    />
                                    <RangeControl
                                        label={__('Overlay opacity', 'twork-builder')}
                                        value={backgroundOverlayOpacity}
                                        onChange={(v) => setAttributes({ backgroundOverlayOpacity: v })}
                                        min={0}
                                        max={1}
                                        step={0.1}
                                    />
                                </>
                            )}
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Side image', 'twork-builder')} initialOpen={false}>
                    {!imageUrl ? (
                        <MediaPlaceholder
                            onSelect={(media) =>
                                setAttributes({
                                    imageUrl: media.url,
                                    imageId: media.id,
                                    imageAlt: media.alt || '',
                                })
                            }
                            allowedTypes={['image']}
                            multiple={false}
                            labels={{ title: __('Hero side image', 'twork-builder') }}
                        />
                    ) : (
                        <div>
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                style={{ width: '100%', height: 'auto', marginBottom: 8, borderRadius: 8 }}
                            />
                            <Button
                                isSecondary
                                isSmall
                                onClick={() =>
                                    setAttributes({ imageUrl: '', imageId: null, imageAlt: '' })
                                }
                            >
                                {__('Remove', 'twork-builder')}
                            </Button>
                            <TextControl
                                label={__('Alt text', 'twork-builder')}
                                value={imageAlt}
                                onChange={(v) => setAttributes({ imageAlt: v })}
                                style={{ marginTop: 8 }}
                            />
                        </div>
                    )}
                </PanelBody>

                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Padding top (px)', 'twork-builder')}
                        value={paddingTop}
                        onChange={(v) => setAttributes({ paddingTop: v })}
                        min={40}
                        max={200}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(v) => setAttributes({ paddingBottom: v })}
                        min={40}
                        max={200}
                        step={5}
                    />
                    <RangeControl
                        label={__('Min height (px)', 'twork-builder')}
                        value={minHeight}
                        onChange={(v) => setAttributes({ minHeight: v })}
                        min={400}
                        max={900}
                        step={20}
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
                </PanelBody>
            </InspectorControls>

            <header {...blockProps}>
                {backgroundImage && (
                    <img
                        src={backgroundImage}
                        alt=""
                        className="paed-hero-bg"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.3,
                            zIndex: 1,
                        }}
                    />
                )}
                {backgroundImage && backgroundOverlay && (
                    <div
                        className="paed-hero-overlay"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: backgroundOverlayColor,
                            opacity: backgroundOverlayOpacity,
                            zIndex: 1,
                        }}
                    />
                )}
                <div className="paed-hero-layout paed-animate-hero" style={layoutStyle}>
                    <div className="paed-hero-text">
                        {badge && (
                            <span className="paed-badge">{badge}</span>
                        )}
                        <RichText
                            tagName="h1"
                            className="paed-title"
                            value={title}
                            onChange={(val) => setAttributes({ title: val })}
                            placeholder={__('Gentle Care for Your Little Ones', 'twork-builder')}
                            multiline="br"
                        />
                        <RichText
                            tagName="p"
                            className="paed-subtitle"
                            value={subtitle}
                            onChange={(val) => setAttributes({ subtitle: val })}
                            placeholder={__('Hero subtitle…', 'twork-builder')}
                        />
                        <div style={buttonsWrapStyle}>
                            <a
                                href={primaryButtonUrl || '#'}
                                className="paed-btn paed-btn-primary"
                                style={{ pointerEvents: 'none' }}
                            >
                                {primaryButtonText || __('Book Appointment', 'twork-builder')}
                            </a>
                            <a
                                href={outlineButtonUrl || '#'}
                                className="paed-btn paed-btn-outline"
                                style={{ ...outlineBtnStyle, pointerEvents: 'none' }}
                            >
                                {outlineButtonText || __('View Services', 'twork-builder')}
                            </a>
                        </div>
                    </div>
                    <div className="paed-hero-img-col">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={imageAlt || ''}
                                className="paed-hero-visual"
                            />
                        ) : (
                            <div
                                className="paed-hero-visual paed-hero-placeholder"
                                style={{
                                    width: 450,
                                    maxWidth: '100%',
                                    height: 280,
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: 16,
                                    border: '2px dashed rgba(255,255,255,0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'rgba(255,255,255,0.6)',
                                    fontSize: 14,
                                }}
                            >
                                {__('Side image', 'twork-builder')}
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}
