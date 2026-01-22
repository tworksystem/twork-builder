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
        containerMaxWidth,
        containerPadding,
        containerPaddingTablet,
        containerPaddingMobile,
        textAlignment,
        animationOnScroll,
        animationType,
        imageOpacity,
        imageSaturation
    } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-page-hero-editor',
        style: {
            position: 'relative',
            height: `${heightDesktop}px`,
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            background: '#000',
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
                        className="hero-bg-wrapper"
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
                            className="hero-bg-img"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: imageOpacity,
                                filter: `saturate(${imageSaturation})`
                            }}
                        />
                    </div>
                )}

                {backgroundImage && backgroundOverlay && (
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
                    className="hero-container animate-hero"
                    style={containerStyle}
                >
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

                    <h1
                        className="hero-title"
                        style={{
                            fontSize: `${titleFontSize}rem`,
                            fontWeight: titleFontWeight,
                            color: titleColor,
                            lineHeight: titleLineHeight,
                            margin: `0 0 ${titleMarginBottom}px 0`
                        }}
                    >
                        <RichText
                            tagName="span"
                            value={titleText}
                            onChange={(val) => setAttributes({ titleText: val })}
                            placeholder={__('Hero title...', 'twork-builder')}
                            style={{ display: 'block' }}
                            className="hero-title-main"
                        />
                        {titleHighlightText && (
                            <span
                                className="hero-title-highlight"
                                style={{
                                    color: titleHighlightColor,
                                    display: 'block'
                                }}
                            >
                                {titleHighlightText}
                            </span>
                        )}
                    </h1>
                </div>
            </div>
        </>
    );
}
