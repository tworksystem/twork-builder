import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    PanelColorSettings,
    RichText,
    MediaPlaceholder
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
        backgroundColor,
        backgroundImage,
        backgroundImageId,
        backgroundOverlay,
        backgroundOverlayColor,
        backgroundOverlayOpacity,
        paddingTop,
        paddingBottom,
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        sectionTitleMarginBottom,
        showSectionSubtitle,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        sectionSubtitleFontWeight,
        sectionSubtitleMarginBottom,
        containerMaxWidth,
        containerPadding,
        timelineLineColor,
        timelineLineWidth,
        timelineProgressColor,
        timelineDotSize,
        timelineDotBorderWidth,
        timelineDotColor,
        timelineItemGap,
        timelineContentBorderRadius,
        timelineContentBoxShadow,
        timelineContentBoxShadowColor,
        timelineContentBoxShadowBlur,
        timelineContentBoxShadowSpread,
        timelineContentBoxShadowOffsetX,
        timelineContentBoxShadowOffsetY,
        hoverEffect,
        hoverTranslateY,
        hoverScale,
        animationOnScroll,
        animationDelay,
        animationType
    } = attributes;

    const ALLOWED_BLOCKS = ['twork/timeline-item'];
    const TEMPLATE = [
        ['twork/timeline-item', {}],
        ['twork/timeline-item', {}],
        ['twork/timeline-item', {}],
        ['twork/timeline-item', {}]
    ];

    const blockProps = useBlockProps({
        className: 'twork-timeline-wrapper-editor',
        style: {
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative'
        }
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        position: 'relative',
        zIndex: 2
    };

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={__('Section Title & Subtitle', 'twork-builder')}
                    initialOpen={true}
                >
                    <ToggleControl
                        label={__('Show Section Title', 'twork-builder')}
                        checked={showSectionTitle}
                        onChange={(val) => setAttributes({ showSectionTitle: val })}
                    />

                    {showSectionTitle && (
                        <>
                            <TextControl
                                label={__('Title Text', 'twork-builder')}
                                value={sectionTitle}
                                onChange={(val) => setAttributes({ sectionTitle: val })}
                            />

                            <PanelColorSettings
                                title={__('Title Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: sectionTitleColor,
                                        onChange: (val) => setAttributes({ sectionTitleColor: val }),
                                        label: __('Title Color', 'twork-builder')
                                    }
                                ]}
                            />

                            <RangeControl
                                label={__('Title Font Size (rem)', 'twork-builder')}
                                value={sectionTitleFontSize}
                                onChange={(val) => setAttributes({ sectionTitleFontSize: val })}
                                min={1.5}
                                max={4}
                                step={0.1}
                            />

                            <RangeControl
                                label={__('Title Font Weight', 'twork-builder')}
                                value={sectionTitleFontWeight}
                                onChange={(val) => setAttributes({ sectionTitleFontWeight: val })}
                                min={100}
                                max={900}
                                step={100}
                            />

                            <SelectControl
                                label={__('Title Alignment', 'twork-builder')}
                                value={sectionTitleAlignment}
                                options={[
                                    { label: __('Left', 'twork-builder'), value: 'left' },
                                    { label: __('Center', 'twork-builder'), value: 'center' },
                                    { label: __('Right', 'twork-builder'), value: 'right' }
                                ]}
                                onChange={(val) => setAttributes({ sectionTitleAlignment: val })}
                            />

                            <RangeControl
                                label={__('Title Margin Bottom (px)', 'twork-builder')}
                                value={sectionTitleMarginBottom}
                                onChange={(val) => setAttributes({ sectionTitleMarginBottom: val })}
                                min={0}
                                max={50}
                                step={5}
                            />
                        </>
                    )}

                    <Divider />

                    <ToggleControl
                        label={__('Show Section Subtitle', 'twork-builder')}
                        checked={showSectionSubtitle}
                        onChange={(val) => setAttributes({ showSectionSubtitle: val })}
                    />

                    {showSectionSubtitle && (
                        <>
                            <TextControl
                                label={__('Subtitle Text', 'twork-builder')}
                                value={sectionSubtitle}
                                onChange={(val) => setAttributes({ sectionSubtitle: val })}
                            />

                            <PanelColorSettings
                                title={__('Subtitle Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: sectionSubtitleColor,
                                        onChange: (val) => setAttributes({ sectionSubtitleColor: val }),
                                        label: __('Subtitle Color', 'twork-builder')
                                    }
                                ]}
                            />

                            <RangeControl
                                label={__('Subtitle Font Size (rem)', 'twork-builder')}
                                value={sectionSubtitleFontSize}
                                onChange={(val) => setAttributes({ sectionSubtitleFontSize: val })}
                                min={0.8}
                                max={2}
                                step={0.1}
                            />

                            <RangeControl
                                label={__('Subtitle Font Weight', 'twork-builder')}
                                value={sectionSubtitleFontWeight}
                                onChange={(val) => setAttributes({ sectionSubtitleFontWeight: val })}
                                min={100}
                                max={900}
                                step={100}
                            />

                            <RangeControl
                                label={__('Subtitle Margin Bottom (px)', 'twork-builder')}
                                value={sectionSubtitleMarginBottom}
                                onChange={(val) => setAttributes({ sectionSubtitleMarginBottom: val })}
                                min={20}
                                max={100}
                                step={5}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody
                    title={__('Background Settings', 'twork-builder')}
                    initialOpen={false}
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

                    {!backgroundImage && (
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

                    {backgroundImage && (
                        <>
                            <Divider />
                            <ToggleControl
                                label={__('Enable Overlay', 'twork-builder')}
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
                        help={__('Maximum width of the container', 'twork-builder')}
                    />

                    <RangeControl
                        label={__('Container Padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(val) => setAttributes({ containerPadding: val })}
                        min={0}
                        max={100}
                        step={5}
                        help={__('Horizontal padding for the container', 'twork-builder')}
                    />

                    <Divider />

                    <RangeControl
                        label={__('Padding Top (px)', 'twork-builder')}
                        value={paddingTop}
                        onChange={(val) => setAttributes({ paddingTop: val })}
                        min={0}
                        max={200}
                        step={5}
                    />

                    <RangeControl
                        label={__('Padding Bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(val) => setAttributes({ paddingBottom: val })}
                        min={0}
                        max={200}
                        step={5}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Timeline Line Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <PanelColorSettings
                        title={__('Line Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: timelineLineColor,
                                onChange: (val) => setAttributes({ timelineLineColor: val }),
                                label: __('Line Color', 'twork-builder')
                            }
                        ]}
                    />

                    <RangeControl
                        label={__('Line Width (px)', 'twork-builder')}
                        value={timelineLineWidth}
                        onChange={(val) => setAttributes({ timelineLineWidth: val })}
                        min={2}
                        max={10}
                        step={1}
                    />

                    <Divider />

                    <PanelColorSettings
                        title={__('Progress Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: timelineProgressColor,
                                onChange: (val) => setAttributes({ timelineProgressColor: val }),
                                label: __('Progress Color', 'twork-builder')
                            }
                        ]}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Timeline Dot Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <PanelColorSettings
                        title={__('Dot Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: timelineDotColor,
                                onChange: (val) => setAttributes({ timelineDotColor: val }),
                                label: __('Dot Color', 'twork-builder')
                            }
                        ]}
                    />

                    <RangeControl
                        label={__('Dot Size (px)', 'twork-builder')}
                        value={timelineDotSize}
                        onChange={(val) => setAttributes({ timelineDotSize: val })}
                        min={12}
                        max={40}
                        step={2}
                    />

                    <RangeControl
                        label={__('Dot Border Width (px)', 'twork-builder')}
                        value={timelineDotBorderWidth}
                        onChange={(val) => setAttributes({ timelineDotBorderWidth: val })}
                        min={2}
                        max={10}
                        step={1}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Timeline Item Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <RangeControl
                        label={__('Item Gap (px)', 'twork-builder')}
                        value={timelineItemGap}
                        onChange={(val) => setAttributes({ timelineItemGap: val })}
                        min={40}
                        max={150}
                        step={10}
                        help={__('Vertical spacing between timeline items', 'twork-builder')}
                    />

                    <RangeControl
                        label={__('Content Border Radius (px)', 'twork-builder')}
                        value={timelineContentBorderRadius}
                        onChange={(val) => setAttributes({ timelineContentBorderRadius: val })}
                        min={0}
                        max={30}
                        step={1}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Content Box Shadow', 'twork-builder')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Enable Box Shadow', 'twork-builder')}
                        checked={timelineContentBoxShadow}
                        onChange={(val) => setAttributes({ timelineContentBoxShadow: val })}
                    />

                    {timelineContentBoxShadow && (
                        <>
                            <PanelColorSettings
                                title={__('Shadow Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: timelineContentBoxShadowColor,
                                        onChange: (val) => setAttributes({ timelineContentBoxShadowColor: val }),
                                        label: __('Shadow Color', 'twork-builder')
                                    }
                                ]}
                            />

                            <RangeControl
                                label={__('Blur (px)', 'twork-builder')}
                                value={timelineContentBoxShadowBlur}
                                onChange={(val) => setAttributes({ timelineContentBoxShadowBlur: val })}
                                min={0}
                                max={100}
                                step={1}
                            />

                            <RangeControl
                                label={__('Spread (px)', 'twork-builder')}
                                value={timelineContentBoxShadowSpread}
                                onChange={(val) => setAttributes({ timelineContentBoxShadowSpread: val })}
                                min={-50}
                                max={50}
                                step={1}
                            />

                            <RangeControl
                                label={__('Offset X (px)', 'twork-builder')}
                                value={timelineContentBoxShadowOffsetX}
                                onChange={(val) => setAttributes({ timelineContentBoxShadowOffsetX: val })}
                                min={-50}
                                max={50}
                                step={1}
                            />

                            <RangeControl
                                label={__('Offset Y (px)', 'twork-builder')}
                                value={timelineContentBoxShadowOffsetY}
                                onChange={(val) => setAttributes({ timelineContentBoxShadowOffsetY: val })}
                                min={-50}
                                max={50}
                                step={1}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody
                    title={__('Hover Effects', 'twork-builder')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Enable Hover Effects', 'twork-builder')}
                        checked={hoverEffect}
                        onChange={(val) => setAttributes({ hoverEffect: val })}
                        help={__('Enable hover animations for timeline items', 'twork-builder')}
                    />

                    {hoverEffect && (
                        <>
                            <RangeControl
                                label={__('Translate Y (px)', 'twork-builder')}
                                value={hoverTranslateY}
                                onChange={(val) => setAttributes({ hoverTranslateY: val })}
                                min={-20}
                                max={20}
                                step={1}
                                help={__('Vertical movement on hover (negative = up)', 'twork-builder')}
                            />

                            <RangeControl
                                label={__('Scale', 'twork-builder')}
                                value={hoverScale}
                                onChange={(val) => setAttributes({ hoverScale: val })}
                                min={0.8}
                                max={1.2}
                                step={0.01}
                                help={__('Scale transformation on hover', 'twork-builder')}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody
                    title={__('Animation Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Enable Scroll Animation', 'twork-builder')}
                        checked={animationOnScroll}
                        onChange={(val) => setAttributes({ animationOnScroll: val })}
                        help={__('Animate items when they scroll into view', 'twork-builder')}
                    />

                    {animationOnScroll && (
                        <>
                            <SelectControl
                                label={__('Animation Type', 'twork-builder')}
                                value={animationType}
                                options={[
                                    { label: __('Fade In', 'twork-builder'), value: 'fadeIn' },
                                    { label: __('Fade In Up', 'twork-builder'), value: 'fadeInUp' },
                                    { label: __('Slide In Left', 'twork-builder'), value: 'slideInLeft' },
                                    { label: __('Slide In Right', 'twork-builder'), value: 'slideInRight' },
                                    { label: __('Zoom In', 'twork-builder'), value: 'zoomIn' }
                                ]}
                                onChange={(val) => setAttributes({ animationType: val })}
                            />

                            <RangeControl
                                label={__('Animation Delay (ms)', 'twork-builder')}
                                value={animationDelay}
                                onChange={(val) => setAttributes({ animationDelay: val })}
                                min={0}
                                max={500}
                                step={50}
                                help={__('Delay between each item animation', 'twork-builder')}
                            />
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {backgroundImage && backgroundOverlay && (
                    <div 
                        className="background-overlay"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: backgroundOverlayColor,
                            opacity: backgroundOverlayOpacity,
                            zIndex: 1
                        }}
                    />
                )}

                <div style={containerStyle}>
                    <div className="editor-label" style={{
                        textAlign: 'center',
                        padding: '10px',
                        background: '#2271b1',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        marginBottom: '20px',
                        borderRadius: '4px'
                    }}>
                        {__('Timeline Wrapper (Editor View)', 'twork-builder')}
                    </div>

                    {(showSectionTitle || showSectionSubtitle) && (
                        <div 
                            className="section-header"
                            style={{
                                textAlign: sectionTitleAlignment,
                                marginBottom: `${sectionSubtitleMarginBottom}px`
                            }}
                        >
                            {showSectionTitle && (
                                <RichText
                                    tagName="h2"
                                    value={sectionTitle}
                                    onChange={(val) => setAttributes({ sectionTitle: val })}
                                    placeholder={__('Section Title...', 'twork-builder')}
                                    className="section-title"
                                    style={{
                                        fontSize: `${sectionTitleFontSize}rem`,
                                        fontWeight: sectionTitleFontWeight,
                                        color: sectionTitleColor,
                                        marginBottom: showSectionSubtitle ? `${sectionTitleMarginBottom}px` : '0',
                                        marginTop: 0
                                    }}
                                />
                            )}
                            {showSectionSubtitle && (
                                <RichText
                                    tagName="p"
                                    value={sectionSubtitle}
                                    onChange={(val) => setAttributes({ sectionSubtitle: val })}
                                    placeholder={__('Section Subtitle...', 'twork-builder')}
                                    className="section-subtitle"
                                    style={{
                                        fontSize: `${sectionSubtitleFontSize}rem`,
                                        fontWeight: sectionSubtitleFontWeight,
                                        color: sectionSubtitleColor,
                                        margin: 0
                                    }}
                                />
                            )}
                        </div>
                    )}

                    <div 
                        className="timeline-wrapper twork-timeline-wrapper"
                        style={{
                            position: 'relative',
                            padding: '40px 0'
                        }}
                    >
                        <div 
                            className="timeline-line"
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: 0,
                                bottom: 0,
                                width: `${timelineLineWidth}px`,
                                background: timelineLineColor,
                                transform: 'translateX(-50%)',
                                zIndex: 1,
                                pointerEvents: 'none'
                            }}
                        />
                        <div 
                            className="timeline-progress"
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: 0,
                                width: `${timelineLineWidth}px`,
                                background: timelineProgressColor,
                                transform: 'translateX(-50%)',
                                height: '50%',
                                zIndex: 2,
                                pointerEvents: 'none',
                                transition: 'height 0.3s ease'
                            }}
                        />
                        <InnerBlocks
                            allowedBlocks={ALLOWED_BLOCKS}
                            template={TEMPLATE}
                            renderAppender={InnerBlocks.ButtonBlockAppender}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
