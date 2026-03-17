import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    PanelColorSettings,
    MediaPlaceholder,
    RichText
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
    TextControl,
    Button,
    BaseControl,
    __experimentalDivider as Divider
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        backgroundImage,
        backgroundImageId,
        backgroundOverlay,
        backgroundOverlayColor,
        backgroundOverlayOpacity,
        heightDesktop,
        heightTablet,
        heightMobile,
        showBreadcrumb,
        breadcrumbText,
        breadcrumbColor,
        breadcrumbFontSize,
        breadcrumbFontSizeTablet,
        breadcrumbFontSizeMobile,
        breadcrumbFontWeight,
        breadcrumbBackground,
        breadcrumbPadding,
        breadcrumbPaddingHorizontal,
        breadcrumbBorderRadius,
        titleText,
        titleHighlightText,
        titleHighlightColor,
        titleColor,
        titleFontSize,
        titleFontSizeTablet,
        titleFontSizeMobile,
        titleFontWeight,
        titleLineHeight,
        titleMarginBottom,
        showSubtitle,
        subtitleText,
        subtitleColor,
        subtitleFontSize,
        subtitleFontSizeTablet,
        subtitleFontSizeMobile,
        subtitleFontWeight,
        subtitleLineHeight,
        subtitleMarginTop,
        subtitleMaxWidth,
        containerMaxWidth,
        containerPadding,
        containerPaddingTablet,
        containerPaddingMobile,
        textAlignment,
        animationOnScroll,
        animationType,
        imageOpacity,
        imageSaturation,
        heroStyle,
        showPrimaryButton,
        primaryButtonText,
        primaryButtonUrl,
        primaryButtonPulse,
        showSecondaryButton,
        secondaryButtonText,
        secondaryButtonUrl
    } = attributes;

    const isEmergency = heroStyle === 'emergency';

    const blockProps = useBlockProps({
        className: `twork-page-hero-editor ${isEmergency ? 'em-hero page-hero-emergency' : ''}`,
        style: {
            position: 'relative',
            height: `${isEmergency ? 600 : heightDesktop}px`,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            background: isEmergency ? '#0b1c2c' : '#000',
            color: '#fff'
        }
    });

    const containerStyle = {
        position: 'relative',
        zIndex: 3,
        width: '100%',
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        textAlign: textAlignment
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Hero Style', 'twork-builder')} initialOpen={true}>
                    <SelectControl
                        label={__('Style', 'twork-builder')}
                        value={heroStyle}
                        options={[
                            { label: __('Default', 'twork-builder'), value: 'default' },
                            { label: __('Emergency (24/7)', 'twork-builder'), value: 'emergency' }
                        ]}
                        onChange={(val) => setAttributes({ heroStyle: val })}
                        help={__('Emergency style shows badge, title, description and two CTA buttons.', 'twork-builder')}
                    />
                </PanelBody>

                {isEmergency && (
                    <PanelBody title={__('Buttons', 'twork-builder')} initialOpen={true}>
                        <ToggleControl
                            label={__('Show primary button', 'twork-builder')}
                            checked={showPrimaryButton !== false}
                            onChange={(val) => setAttributes({ showPrimaryButton: val })}
                        />
                        {showPrimaryButton !== false && (
                            <>
                                <TextControl
                                    label={__('Primary button text', 'twork-builder')}
                                    value={primaryButtonText}
                                    onChange={(val) => setAttributes({ primaryButtonText: val })}
                                />
                                <TextControl
                                    label={__('Primary button URL', 'twork-builder')}
                                    value={primaryButtonUrl}
                                    onChange={(val) => setAttributes({ primaryButtonUrl: val })}
                                    help={__('e.g. tel:199 or tel:09789101101', 'twork-builder')}
                                />
                                <ToggleControl
                                    label={__('Pulse animation', 'twork-builder')}
                                    checked={primaryButtonPulse !== false}
                                    onChange={(val) => setAttributes({ primaryButtonPulse: val })}
                                />
                            </>
                        )}
                        <Divider />
                        <ToggleControl
                            label={__('Show secondary button', 'twork-builder')}
                            checked={showSecondaryButton !== false}
                            onChange={(val) => setAttributes({ showSecondaryButton: val })}
                        />
                        {showSecondaryButton !== false && (
                            <>
                                <TextControl
                                    label={__('Secondary button text', 'twork-builder')}
                                    value={secondaryButtonText}
                                    onChange={(val) => setAttributes({ secondaryButtonText: val })}
                                />
                                <TextControl
                                    label={__('Secondary button URL', 'twork-builder')}
                                    value={secondaryButtonUrl}
                                    onChange={(val) => setAttributes({ secondaryButtonUrl: val })}
                                />
                            </>
                        )}
                    </PanelBody>
                )}

                <PanelBody
                    title={__('Background Settings', 'twork-builder')}
                    initialOpen={true}
                >
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
                                <img
                                    src={backgroundImage}
                                    alt=""
                                    style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                                />
                                <Button
                                    isSecondary
                                    isSmall
                                    onClick={() => setAttributes({
                                        backgroundImage: '',
                                        backgroundImageId: null
                                    })}
                                >
                                    {__('Remove Image', 'twork-builder')}
                                </Button>
                            </div>
                        )}
                    </BaseControl>

                    {backgroundImage && (
                        <>
                            <Divider />
                            <RangeControl
                                label={__('Image Opacity', 'twork-builder')}
                                value={imageOpacity}
                                onChange={(val) => setAttributes({ imageOpacity: val })}
                                min={0}
                                max={1}
                                step={0.1}
                            />

                            <RangeControl
                                label={__('Image Saturation', 'twork-builder')}
                                value={imageSaturation}
                                onChange={(val) => setAttributes({ imageSaturation: val })}
                                min={0}
                                max={1}
                                step={0.1}
                            />

                            <Divider />
                            <ToggleControl
                                label={__('Show Overlay', 'twork-builder')}
                                checked={backgroundOverlay}
                                onChange={(val) => setAttributes({ backgroundOverlay: val })}
                            />

                            {backgroundOverlay && (
                                <>
                                    <PanelColorSettings
                                        title={__('Overlay Color', 'twork-builder')}
                                        colorSettings={[
                                            {
                                                value: backgroundOverlayColor,
                                                onChange: (val) => setAttributes({ backgroundOverlayColor: val }),
                                                label: __('Overlay Color', 'twork-builder')
                                            }
                                        ]}
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
                </PanelBody>

                <PanelBody
                    title={__('Height Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <RangeControl
                        label={__('Height Desktop (px)', 'twork-builder')}
                        value={heightDesktop}
                        onChange={(val) => setAttributes({ heightDesktop: val })}
                        min={200}
                        max={800}
                        step={10}
                    />

                    <RangeControl
                        label={__('Height Tablet (px)', 'twork-builder')}
                        value={heightTablet}
                        onChange={(val) => setAttributes({ heightTablet: val })}
                        min={200}
                        max={600}
                        step={10}
                    />

                    <RangeControl
                        label={__('Height Mobile (px)', 'twork-builder')}
                        value={heightMobile}
                        onChange={(val) => setAttributes({ heightMobile: val })}
                        min={200}
                        max={500}
                        step={10}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Breadcrumb Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Show Breadcrumb', 'twork-builder')}
                        checked={showBreadcrumb}
                        onChange={(val) => setAttributes({ showBreadcrumb: val })}
                    />

                    {showBreadcrumb && (
                        <>
                            <TextControl
                                label={__('Breadcrumb Text', 'twork-builder')}
                                value={breadcrumbText}
                                onChange={(val) => setAttributes({ breadcrumbText: val })}
                            />

                            <PanelColorSettings
                                title={__('Breadcrumb Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: breadcrumbColor,
                                        onChange: (val) => setAttributes({ breadcrumbColor: val }),
                                        label: __('Breadcrumb Color', 'twork-builder')
                                    }
                                ]}
                            />

                            <PanelColorSettings
                                title={__('Breadcrumb Background', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: breadcrumbBackground,
                                        onChange: (val) => setAttributes({ breadcrumbBackground: val }),
                                        label: __('Background Color', 'twork-builder')
                                    }
                                ]}
                            />

                            <RangeControl
                                label={__('Font Size Desktop (rem)', 'twork-builder')}
                                value={breadcrumbFontSize}
                                onChange={(val) => setAttributes({ breadcrumbFontSize: val })}
                                min={0.6}
                                max={1.5}
                                step={0.05}
                            />

                            <RangeControl
                                label={__('Font Size Tablet (rem)', 'twork-builder')}
                                value={breadcrumbFontSizeTablet}
                                onChange={(val) => setAttributes({ breadcrumbFontSizeTablet: val })}
                                min={0.6}
                                max={1.5}
                                step={0.05}
                            />

                            <RangeControl
                                label={__('Font Size Mobile (rem)', 'twork-builder')}
                                value={breadcrumbFontSizeMobile}
                                onChange={(val) => setAttributes({ breadcrumbFontSizeMobile: val })}
                                min={0.6}
                                max={1.5}
                                step={0.05}
                            />

                            <RangeControl
                                label={__('Font Weight', 'twork-builder')}
                                value={breadcrumbFontWeight}
                                onChange={(val) => setAttributes({ breadcrumbFontWeight: val })}
                                min={100}
                                max={900}
                                step={100}
                            />

                            <RangeControl
                                label={__('Padding Vertical (px)', 'twork-builder')}
                                value={breadcrumbPadding}
                                onChange={(val) => setAttributes({ breadcrumbPadding: val })}
                                min={0}
                                max={20}
                                step={1}
                            />

                            <RangeControl
                                label={__('Padding Horizontal (px)', 'twork-builder')}
                                value={breadcrumbPaddingHorizontal}
                                onChange={(val) => setAttributes({ breadcrumbPaddingHorizontal: val })}
                                min={0}
                                max={40}
                                step={1}
                            />

                            <RangeControl
                                label={__('Border Radius (px)', 'twork-builder')}
                                value={breadcrumbBorderRadius}
                                onChange={(val) => setAttributes({ breadcrumbBorderRadius: val })}
                                min={0}
                                max={50}
                                step={1}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody
                    title={__('Title Settings', 'twork-builder')}
                    initialOpen={true}
                >
                    <TextControl
                        label={__('Title Text', 'twork-builder')}
                        value={titleText}
                        onChange={(val) => setAttributes({ titleText: val })}
                    />

                    <TextControl
                        label={__('Title Highlight Text', 'twork-builder')}
                        value={titleHighlightText}
                        onChange={(val) => setAttributes({ titleHighlightText: val })}
                        help={__('Text that will be highlighted in the title', 'twork-builder')}
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

                    <PanelColorSettings
                        title={__('Highlight Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: titleHighlightColor,
                                onChange: (val) => setAttributes({ titleHighlightColor: val }),
                                label: __('Highlight Color', 'twork-builder')
                            }
                        ]}
                    />

                    <Divider />

                    <RangeControl
                        label={__('Font Size Desktop (rem)', 'twork-builder')}
                        value={titleFontSize}
                        onChange={(val) => setAttributes({ titleFontSize: val })}
                        min={1.5}
                        max={6}
                        step={0.1}
                    />

                    <RangeControl
                        label={__('Font Size Tablet (rem)', 'twork-builder')}
                        value={titleFontSizeTablet}
                        onChange={(val) => setAttributes({ titleFontSizeTablet: val })}
                        min={1.5}
                        max={5}
                        step={0.1}
                    />

                    <RangeControl
                        label={__('Font Size Mobile (rem)', 'twork-builder')}
                        value={titleFontSizeMobile}
                        onChange={(val) => setAttributes({ titleFontSizeMobile: val })}
                        min={1.5}
                        max={4}
                        step={0.1}
                    />

                    <RangeControl
                        label={__('Font Weight', 'twork-builder')}
                        value={titleFontWeight}
                        onChange={(val) => setAttributes({ titleFontWeight: val })}
                        min={100}
                        max={900}
                        step={100}
                    />

                    <RangeControl
                        label={__('Line Height', 'twork-builder')}
                        value={titleLineHeight}
                        onChange={(val) => setAttributes({ titleLineHeight: val })}
                        min={1}
                        max={2}
                        step={0.1}
                    />

                    <RangeControl
                        label={__('Margin Bottom (px)', 'twork-builder')}
                        value={titleMarginBottom}
                        onChange={(val) => setAttributes({ titleMarginBottom: val })}
                        min={0}
                        max={50}
                        step={5}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Subtitle Settings', 'twork-builder')}
                    initialOpen={true}
                >
                    <ToggleControl
                        label={__('Show Subtitle', 'twork-builder')}
                        checked={showSubtitle}
                        onChange={(val) => setAttributes({ showSubtitle: val })}
                    />

                    {showSubtitle && (
                        <>
                            <TextControl
                                label={__('Subtitle Text', 'twork-builder')}
                                value={subtitleText}
                                onChange={(val) => setAttributes({ subtitleText: val })}
                                placeholder={__('e.g. Committed to international standards…', 'twork-builder')}
                                help={__('Optional line below the title. Also editable in the hero preview.', 'twork-builder')}
                            />
                            <PanelColorSettings
                                title={__('Subtitle Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: subtitleColor,
                                        onChange: (val) => setAttributes({ subtitleColor: val }),
                                        label: __('Subtitle Color', 'twork-builder')
                                    }
                                ]}
                            />
                            <RangeControl
                                label={__('Font Size Desktop (rem)', 'twork-builder')}
                                value={subtitleFontSize}
                                onChange={(val) => setAttributes({ subtitleFontSize: val })}
                                min={0.8}
                                max={2}
                                step={0.05}
                            />
                            <RangeControl
                                label={__('Font Size Tablet (rem)', 'twork-builder')}
                                value={subtitleFontSizeTablet}
                                onChange={(val) => setAttributes({ subtitleFontSizeTablet: val })}
                                min={0.8}
                                max={1.8}
                                step={0.05}
                            />
                            <RangeControl
                                label={__('Font Size Mobile (rem)', 'twork-builder')}
                                value={subtitleFontSizeMobile}
                                onChange={(val) => setAttributes({ subtitleFontSizeMobile: val })}
                                min={0.8}
                                max={1.5}
                                step={0.05}
                            />
                            <RangeControl
                                label={__('Font Weight', 'twork-builder')}
                                value={subtitleFontWeight}
                                onChange={(val) => setAttributes({ subtitleFontWeight: val })}
                                min={100}
                                max={900}
                                step={100}
                            />
                            <RangeControl
                                label={__('Line Height', 'twork-builder')}
                                value={subtitleLineHeight}
                                onChange={(val) => setAttributes({ subtitleLineHeight: val })}
                                min={1}
                                max={2}
                                step={0.1}
                            />
                            <RangeControl
                                label={__('Margin Top (px)', 'twork-builder')}
                                value={subtitleMarginTop}
                                onChange={(val) => setAttributes({ subtitleMarginTop: val })}
                                min={0}
                                max={40}
                                step={2}
                            />
                            <RangeControl
                                label={__('Max Width (px)', 'twork-builder')}
                                value={subtitleMaxWidth}
                                onChange={(val) => setAttributes({ subtitleMaxWidth: val })}
                                min={300}
                                max={900}
                                step={50}
                                help={__('Max width for subtitle text (centered).', 'twork-builder')}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody
                    title={__('Container Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <RangeControl
                        label={__('Max Width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(val) => setAttributes({ containerMaxWidth: val })}
                        min={800}
                        max={1920}
                        step={10}
                    />

                    <RangeControl
                        label={__('Padding Desktop (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(val) => setAttributes({ containerPadding: val })}
                        min={0}
                        max={100}
                        step={5}
                    />

                    <RangeControl
                        label={__('Padding Tablet (px)', 'twork-builder')}
                        value={containerPaddingTablet}
                        onChange={(val) => setAttributes({ containerPaddingTablet: val })}
                        min={0}
                        max={100}
                        step={5}
                    />

                    <RangeControl
                        label={__('Padding Mobile (px)', 'twork-builder')}
                        value={containerPaddingMobile}
                        onChange={(val) => setAttributes({ containerPaddingMobile: val })}
                        min={0}
                        max={100}
                        step={5}
                    />

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

                <PanelBody
                    title={__('Animation Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Enable Scroll Animation', 'twork-builder')}
                        checked={animationOnScroll}
                        onChange={(val) => setAttributes({ animationOnScroll: val })}
                    />

                    {animationOnScroll && (
                        <SelectControl
                            label={__('Animation Type', 'twork-builder')}
                            value={animationType}
                            options={[
                                { label: __('Fade In Up', 'twork-builder'), value: 'fadeInUp' },
                                { label: __('Fade In', 'twork-builder'), value: 'fadeIn' },
                                { label: __('Slide In Left', 'twork-builder'), value: 'slideInLeft' },
                                { label: __('Slide In Right', 'twork-builder'), value: 'slideInRight' },
                                { label: __('Zoom In', 'twork-builder'), value: 'zoomIn' }
                            ]}
                            onChange={(val) => setAttributes({ animationType: val })}
                        />
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {backgroundImage && (
                    <div
                        className={isEmergency ? 'em-hero-bg-wrap' : 'hero-bg-wrapper'}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '120%',
                            zIndex: 1
                        }}
                    >
                        <img
                            src={backgroundImage}
                            alt=""
                            className={isEmergency ? 'em-hero-bg' : 'hero-bg-img'}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: isEmergency ? (imageOpacity || 0.4) : imageOpacity,
                                filter: `saturate(${imageSaturation})`
                            }}
                        />
                    </div>
                )}

                {backgroundImage && backgroundOverlay && !isEmergency && (
                    <div
                        className="background-overlay"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: backgroundOverlayColor,
                            opacity: backgroundOverlayOpacity,
                            zIndex: 2
                        }}
                    />
                )}

                <div
                    className={isEmergency ? 'em-container' : 'hero-container'}
                    style={{ ...containerStyle, ...(isEmergency ? { maxWidth: 1280 } : {}) }}
                >
                    {isEmergency ? (
                        <div className="em-hero-content em-animate-hero" style={{ width: '100%' }}>
                            {showBreadcrumb !== false && (
                                <RichText
                                    tagName="span"
                                    value={breadcrumbText}
                                    onChange={(val) => setAttributes({ breadcrumbText: val })}
                                    placeholder={__('Badge text…', 'twork-builder')}
                                    className="em-hero-badge"
                                />
                            )}
                            <RichText
                                tagName="h1"
                                value={titleText ?? ''}
                                onChange={(val) => setAttributes({ titleText: val })}
                                placeholder={__('Hero title…', 'twork-builder')}
                                className="em-hero-title"
                            />
                            {showSubtitle !== false && (
                                <RichText
                                    tagName="p"
                                    value={subtitleText}
                                    onChange={(val) => setAttributes({ subtitleText: val })}
                                    placeholder={__('Description…', 'twork-builder')}
                                    className="em-hero-desc"
                                />
                            )}
                            <div className="em-hero-buttons" style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
                                {showPrimaryButton !== false && primaryButtonText && (
                                    <a
                                        href={primaryButtonUrl}
                                        className={`em-btn em-btn-primary ${primaryButtonPulse !== false ? 'em-btn-pulse' : ''}`}
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="fas fa-phone-alt" />
                                        {primaryButtonText}
                                    </a>
                                )}
                                {showSecondaryButton !== false && secondaryButtonText && (
                                    <a
                                        href={secondaryButtonUrl}
                                        className="em-btn em-btn-glass"
                                        style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', backdropFilter: 'blur(5px)', border: '1px solid #fff' }}
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        {secondaryButtonText}
                                    </a>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            {showBreadcrumb && (
                                <RichText
                                    tagName="span"
                                    value={breadcrumbText}
                                    onChange={(val) => setAttributes({ breadcrumbText: val })}
                                    placeholder={__('Breadcrumb text...', 'twork-builder')}
                                    className="hero-breadcrumb"
                                    style={{
                                        fontSize: `${breadcrumbFontSize}rem`,
                                        fontWeight: breadcrumbFontWeight,
                                        color: breadcrumbColor,
                                        background: breadcrumbBackground,
                                        padding: `${breadcrumbPadding}px ${breadcrumbPaddingHorizontal}px`,
                                        borderRadius: `${breadcrumbBorderRadius}px`,
                                        display: 'inline-block',
                                        marginBottom: '15px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px'
                                    }}
                                />
                            )}

                            <div className="hero-title-wrapper" style={{ width: '100%' }}>
                                <h1
                                    className="hero-title"
                                    style={{
                                        fontSize: `${titleFontSize}rem`,
                                        fontWeight: titleFontWeight,
                                        color: titleColor,
                                        lineHeight: titleLineHeight,
                                        margin: `0 0 ${titleMarginBottom}px 0`,
                                        '--title-font-size-desktop': `${titleFontSize}rem`,
                                        '--title-font-size-tablet': `${titleFontSizeTablet}rem`,
                                        '--title-font-size-mobile': `${titleFontSizeMobile}rem`
                                    }}
                                >
                                    <RichText
                                        tagName="span"
                                        value={titleText ?? ''}
                                        onChange={(val) => setAttributes({ titleText: val })}
                                        placeholder={__('Title text…', 'twork-builder')}
                                        className="hero-title-main"
                                        identifier="hero-title-main"
                                    />
                                    <RichText
                                        tagName="span"
                                        value={titleHighlightText ?? ''}
                                        onChange={(val) => setAttributes({ titleHighlightText: val })}
                                        placeholder={__('Title highlight text…', 'twork-builder')}
                                        className="hero-title-highlight"
                                        identifier="hero-title-highlight"
                                        style={{
                                            display: 'block',
                                            margin: '0.2em 0 0',
                                            color: titleHighlightColor || undefined
                                        }}
                                    />
                                </h1>
                            </div>

                            {showSubtitle && (
                                <RichText
                                    tagName="p"
                                    value={subtitleText}
                                    onChange={(val) => setAttributes({ subtitleText: val })}
                                    placeholder={__('Hero subtitle…', 'twork-builder')}
                                    className="hero-subtitle"
                                    style={{
                                        fontSize: `${subtitleFontSize}rem`,
                                        fontWeight: subtitleFontWeight,
                                        color: subtitleColor,
                                        lineHeight: subtitleLineHeight,
                                        margin: `${subtitleMarginTop}px auto 0`,
                                        maxWidth: subtitleMaxWidth ? `${subtitleMaxWidth}px` : undefined
                                    }}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
