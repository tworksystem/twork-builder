import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    PanelColorSettings,
    RichText,
    URLInput,
    MediaPlaceholder
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
    TextControl,
    BaseControl,
    Button,
    __experimentalDivider as Divider
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        backgroundType,
        backgroundColor,
        backgroundImage,
        backgroundImageId,
        backgroundImageSize,
        backgroundImagePosition,
        backgroundVideoUrl,
        backgroundVideoId,
        videoPosterUrl,
        videoLoop,
        videoMuted,
        videoAutoplay,
        backgroundOverlay,
        backgroundOverlayColor,
        backgroundOverlayOpacity,
        textColor,
        paddingTop,
        paddingBottom,
        showTitle,
        title,
        titleColor,
        titleFontSize,
        titleFontWeight,
        titleMarginBottom,
        showParagraph,
        paragraph,
        paragraphColor,
        paragraphFontSize,
        paragraphMaxWidth,
        paragraphMarginBottom,
        buttonText,
        buttonUrl,
        buttonOpensInNewTab,
        containerMaxWidth,
        containerPadding,
        textAlignment,
        animationOnScroll
    } = attributes;

    const hasMedia = (backgroundType === 'image' && backgroundImage) || (backgroundType === 'video' && backgroundVideoUrl);

    const blockProps = useBlockProps({
        className: 'twork-csr-cta-section-editor',
        style: {
            backgroundColor: backgroundType === 'color' || !hasMedia ? backgroundColor : 'transparent',
            backgroundImage: backgroundType === 'image' && backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: backgroundType === 'image' && backgroundImage ? backgroundImageSize : undefined,
            backgroundPosition: backgroundType === 'image' && backgroundImage ? backgroundImagePosition : undefined,
            color: textColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            textAlign: textAlignment,
            position: 'relative',
            overflow: hasMedia ? 'hidden' : undefined
        }
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        position: 'relative'
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Content', 'twork-builder')} initialOpen={true}>
                    <ToggleControl
                        label={__('Show Title', 'twork-builder')}
                        checked={showTitle}
                        onChange={(val) => setAttributes({ showTitle: val })}
                    />
                    {showTitle && (
                        <>
                            <TextControl
                                label={__('Title', 'twork-builder')}
                                value={title}
                                onChange={(val) => setAttributes({ title: val })}
                            />
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
                                min={1}
                                max={3}
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
                            <RangeControl
                                label={__('Title Margin Bottom (px)', 'twork-builder')}
                                value={titleMarginBottom}
                                onChange={(val) => setAttributes({ titleMarginBottom: val })}
                                min={0}
                                max={60}
                                step={5}
                            />
                        </>
                    )}
                    <Divider />
                    <ToggleControl
                        label={__('Show Paragraph', 'twork-builder')}
                        checked={showParagraph}
                        onChange={(val) => setAttributes({ showParagraph: val })}
                    />
                    {showParagraph && (
                        <>
                            <TextControl
                                label={__('Paragraph', 'twork-builder')}
                                value={paragraph}
                                onChange={(val) => setAttributes({ paragraph: val })}
                            />
                            <PanelColorSettings
                                title={__('Paragraph Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: paragraphColor,
                                        onChange: (val) => setAttributes({ paragraphColor: val }),
                                        label: __('Paragraph Color', 'twork-builder')
                                    }
                                ]}
                            />
                            <RangeControl
                                label={__('Paragraph Font Size (rem)', 'twork-builder')}
                                value={paragraphFontSize}
                                onChange={(val) => setAttributes({ paragraphFontSize: val })}
                                min={0.9}
                                max={1.5}
                                step={0.05}
                            />
                            <RangeControl
                                label={__('Paragraph Max Width (px)', 'twork-builder')}
                                value={paragraphMaxWidth}
                                onChange={(val) => setAttributes({ paragraphMaxWidth: val })}
                                min={300}
                                max={900}
                                step={50}
                            />
                            <RangeControl
                                label={__('Paragraph Margin Bottom (px)', 'twork-builder')}
                                value={paragraphMarginBottom}
                                onChange={(val) => setAttributes({ paragraphMarginBottom: val })}
                                min={0}
                                max={60}
                                step={5}
                            />
                        </>
                    )}
                    <Divider />
                    <TextControl
                        label={__('Button Text', 'twork-builder')}
                        value={buttonText}
                        onChange={(val) => setAttributes({ buttonText: val })}
                    />
                    <BaseControl label={__('Button URL', 'twork-builder')}>
                        <URLInput
                            value={buttonUrl}
                            onChange={(val) => setAttributes({ buttonUrl: val })}
                        />
                    </BaseControl>
                    <ToggleControl
                        label={__('Open in New Tab', 'twork-builder')}
                        checked={buttonOpensInNewTab}
                        onChange={(val) => setAttributes({ buttonOpensInNewTab: val })}
                    />
                </PanelBody>

                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
                    <SelectControl
                        label={__('Text Alignment', 'twork-builder')}
                        value={textAlignment}
                        options={[
                            { label: __('Left', 'twork-builder'), value: 'left' },
                            { label: __('Center', 'twork-builder'), value: 'center' },
                            { label: __('Right', 'twork-builder'), value: 'right' }
                        ]}
                        onChange={(val) => setAttributes({ textAlignment: val })}
                    />
                </PanelBody>

                <PanelBody title={__('Background', 'twork-builder')} initialOpen={true}>
                    <SelectControl
                        label={__('Background Type', 'twork-builder')}
                        value={backgroundType}
                        options={[
                            { label: __('Color', 'twork-builder'), value: 'color' },
                            { label: __('Image', 'twork-builder'), value: 'image' },
                            { label: __('Video', 'twork-builder'), value: 'video' }
                        ]}
                        onChange={(val) => setAttributes({
                            backgroundType: val,
                            backgroundImage: val !== 'image' ? '' : backgroundImage,
                            backgroundImageId: val !== 'image' ? null : backgroundImageId,
                            backgroundVideoUrl: val !== 'video' ? '' : backgroundVideoUrl,
                            backgroundVideoId: val !== 'video' ? null : backgroundVideoId
                        })}
                    />

                    {backgroundType === 'color' && (
                        <PanelColorSettings
                            title={__('Background Color', 'twork-builder')}
                            colorSettings={[
                                {
                                    value: backgroundColor,
                                    onChange: (val) => setAttributes({ backgroundColor: val }),
                                    label: __('Background Color', 'twork-builder')
                                }
                            ]}
                        />
                    )}

                    {backgroundType === 'image' && (
                        <>
                            <BaseControl label={__('Background Image', 'twork-builder')}>
                                {!backgroundImage ? (
                                    <MediaPlaceholder
                                        onSelect={(media) => setAttributes({
                                            backgroundImage: media.url,
                                            backgroundImageId: media.id
                                        })}
                                        allowedTypes={['image']}
                                        multiple={false}
                                        labels={{ title: __('Background Image', 'twork-builder') }}
                                    />
                                ) : (
                                    <div>
                                        <img src={backgroundImage} alt="" style={{ width: '100%', maxHeight: 150, objectFit: 'cover', marginBottom: 10, borderRadius: 4 }} />
                                        <Button isSecondary isSmall onClick={() => setAttributes({ backgroundImage: '', backgroundImageId: null })}>
                                            {__('Remove Image', 'twork-builder')}
                                        </Button>
                                    </div>
                                )}
                            </BaseControl>
                            <SelectControl
                                label={__('Image Size', 'twork-builder')}
                                value={backgroundImageSize}
                                options={[
                                    { label: __('Cover', 'twork-builder'), value: 'cover' },
                                    { label: __('Contain', 'twork-builder'), value: 'contain' }
                                ]}
                                onChange={(val) => setAttributes({ backgroundImageSize: val })}
                            />
                            <SelectControl
                                label={__('Image Position', 'twork-builder')}
                                value={backgroundImagePosition}
                                options={[
                                    { label: __('Center', 'twork-builder'), value: 'center center' },
                                    { label: __('Top', 'twork-builder'), value: 'center top' },
                                    { label: __('Bottom', 'twork-builder'), value: 'center bottom' }
                                ]}
                                onChange={(val) => setAttributes({ backgroundImagePosition: val })}
                            />
                        </>
                    )}

                    {backgroundType === 'video' && (
                        <>
                            <BaseControl label={__('Background Video', 'twork-builder')}>
                                {!backgroundVideoUrl ? (
                                    <MediaPlaceholder
                                        onSelect={(media) => setAttributes({
                                            backgroundVideoUrl: media.url,
                                            backgroundVideoId: media.id,
                                            videoPosterUrl: media.image?.src || videoPosterUrl || ''
                                        })}
                                        allowedTypes={['video']}
                                        multiple={false}
                                        labels={{ title: __('Background Video', 'twork-builder') }}
                                    />
                                ) : (
                                    <div>
                                        <video src={backgroundVideoUrl} muted playsInline style={{ width: '100%', maxHeight: 150, objectFit: 'cover', marginBottom: 10, borderRadius: 4 }} />
                                        <Button isSecondary isSmall onClick={() => setAttributes({
                                            backgroundVideoUrl: '',
                                            backgroundVideoId: null,
                                            videoPosterUrl: ''
                                        })}>
                                            {__('Remove Video', 'twork-builder')}
                                        </Button>
                                    </div>
                                )}
                            </BaseControl>
                            <ToggleControl label={__('Loop', 'twork-builder')} checked={videoLoop} onChange={(val) => setAttributes({ videoLoop: val })} />
                            <ToggleControl label={__('Muted', 'twork-builder')} checked={videoMuted} onChange={(val) => setAttributes({ videoMuted: val })} help={__('Muted is required for autoplay in browsers.', 'twork-builder')} />
                            <ToggleControl label={__('Autoplay', 'twork-builder')} checked={videoAutoplay} onChange={(val) => setAttributes({ videoAutoplay: val })} />
                        </>
                    )}

                    {(backgroundType === 'image' || backgroundType === 'video') && hasMedia && (
                        <>
                            <Divider />
                            <ToggleControl
                                label={__('Show Overlay', 'twork-builder')}
                                checked={backgroundOverlay}
                                onChange={(val) => setAttributes({ backgroundOverlay: val })}
                                help={__('Dark overlay improves text readability on media backgrounds.', 'twork-builder')}
                            />
                            {backgroundOverlay && (
                                <>
                                    <PanelColorSettings
                                        title={__('Overlay Color', 'twork-builder')}
                                        colorSettings={[{ value: backgroundOverlayColor, onChange: (val) => setAttributes({ backgroundOverlayColor: val }), label: __('Overlay Color', 'twork-builder') }]}
                                    />
                                    <RangeControl
                                        label={__('Overlay Opacity', 'twork-builder')}
                                        value={backgroundOverlayOpacity}
                                        onChange={(val) => setAttributes({ backgroundOverlayOpacity: val })}
                                        min={0}
                                        max={1}
                                        step={0.1}
                                    />
                                </>
                            )}
                        </>
                    )}

                    <Divider />
                    <PanelColorSettings
                        title={__('Text Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: textColor,
                                onChange: (val) => setAttributes({ textColor: val }),
                                label: __('Text Color', 'twork-builder')
                            }
                        ]}
                    />
                </PanelBody>

                <PanelBody title={__('Container', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Max Width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(val) => setAttributes({ containerMaxWidth: val })}
                        min={600}
                        max={1920}
                        step={10}
                    />
                    <RangeControl
                        label={__('Container Padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(val) => setAttributes({ containerPadding: val })}
                        min={0}
                        max={80}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Section Padding', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Padding Top (px)', 'twork-builder')}
                        value={paddingTop}
                        onChange={(val) => setAttributes({ paddingTop: val })}
                        min={30}
                        max={120}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding Bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(val) => setAttributes({ paddingBottom: val })}
                        min={30}
                        max={120}
                        step={5}
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
                {backgroundType === 'video' && backgroundVideoUrl && (
                    <div className="csr-cta-bg-video-wrap" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 1 }}>
                        <video
                            src={backgroundVideoUrl}
                            poster={videoPosterUrl || undefined}
                            autoPlay={videoAutoplay}
                            muted={videoMuted}
                            loop={videoLoop}
                            playsInline
                            style={{ position: 'absolute', top: '50%', left: '50%', minWidth: '100%', minHeight: '100%', width: 'auto', height: 'auto', transform: 'translate(-50%, -50%)', objectFit: 'cover' }}
                        />
                    </div>
                )}
                {hasMedia && backgroundOverlay && (
                    <div
                        className="csr-cta-overlay"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: backgroundOverlayColor,
                            opacity: backgroundOverlayOpacity,
                            zIndex: 2
                        }}
                    />
                )}
                <div
                    className={`jivaka-container ${animationOnScroll ? 'fade-up' : ''}`}
                    style={{ ...containerStyle, position: 'relative', zIndex: 3 }}
                    data-animation={animationOnScroll}
                >
                    {showTitle && (
                        <RichText
                            tagName="h2"
                            value={title}
                            onChange={(val) => setAttributes({ title: val })}
                            placeholder={__('Join Our Mission', 'twork-builder')}
                            style={{
                                marginTop: 0,
                                marginBottom: `${titleMarginBottom}px`,
                                color: titleColor,
                                fontSize: `${titleFontSize}rem`,
                                fontWeight: titleFontWeight
                            }}
                        />
                    )}
                    {showParagraph && (
                        <RichText
                            tagName="p"
                            value={paragraph}
                            onChange={(val) => setAttributes({ paragraph: val })}
                            placeholder={__('Your call-to-action message...', 'twork-builder')}
                            style={{
                                marginBottom: `${paragraphMarginBottom}px`,
                                maxWidth: `${paragraphMaxWidth}px`,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                color: paragraphColor,
                                fontSize: `${paragraphFontSize}rem`,
                                lineHeight: 1.6
                            }}
                        />
                    )}
                    {buttonText && (
                        <a
                            href={buttonUrl || '#'}
                            className="jivaka-btn btn-primary"
                            onClick={(e) => e.preventDefault()}
                            style={{ fontSize: '0.9rem', padding: '12px 28px' }}
                        >
                            {buttonText}
                        </a>
                    )}
                </div>
            </div>
        </>
    );
}
