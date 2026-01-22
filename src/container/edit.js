import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    PanelColorSettings,
    MediaPlaceholder
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
    BaseControl,
    Button,
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
        backgroundSize,
        backgroundPosition,
        backgroundRepeat,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        containerMaxWidth,
        containerPadding,
        marginTop,
        marginBottom,
        borderRadius,
        borderWidth,
        borderColor,
        borderStyle,
        boxShadow,
        boxShadowColor,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowOffsetX,
        boxShadowOffsetY,
        overflow,
        zIndex,
        animationOnScroll,
        animationType,
        animationDelay
    } = attributes;

    // Allow all blocks inside the container
    const ALLOWED_BLOCKS = null; // null means all blocks are allowed
    const TEMPLATE = [
        ['core/paragraph', { placeholder: __('Add content here...', 'twork-builder') }]
    ];

    const blockProps = useBlockProps({
        className: 'twork-container-editor',
        style: {
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: backgroundImage ? backgroundSize : 'auto',
            backgroundPosition: backgroundImage ? backgroundPosition : 'center',
            backgroundRepeat: backgroundImage ? backgroundRepeat : 'no-repeat',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            paddingLeft: `${paddingLeft}px`,
            paddingRight: `${paddingRight}px`,
            marginTop: `${marginTop}px`,
            marginBottom: `${marginBottom}px`,
            borderRadius: `${borderRadius}px`,
            borderWidth: borderWidth > 0 ? `${borderWidth}px` : '0',
            borderColor: borderWidth > 0 ? borderColor : 'transparent',
            borderStyle: borderWidth > 0 ? borderStyle : 'none',
            boxShadow: boxShadow
                ? `${boxShadowOffsetX}px ${boxShadowOffsetY}px ${boxShadowBlur}px ${boxShadowSpread}px ${boxShadowColor}`
                : 'none',
            overflow: overflow,
            position: 'relative',
            zIndex: zIndex
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
                    title={__('Background Settings', 'twork-builder')}
                    initialOpen={true}
                >
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

                    <Divider />

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
                                    style={{ width: '100%', height: 'auto', marginBottom: '10px', borderRadius: '4px' }}
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
                            <SelectControl
                                label={__('Background Size', 'twork-builder')}
                                value={backgroundSize}
                                options={[
                                    { label: __('Cover', 'twork-builder'), value: 'cover' },
                                    { label: __('Contain', 'twork-builder'), value: 'contain' },
                                    { label: __('Auto', 'twork-builder'), value: 'auto' },
                                    { label: __('100%', 'twork-builder'), value: '100%' }
                                ]}
                                onChange={(val) => setAttributes({ backgroundSize: val })}
                            />

                            <SelectControl
                                label={__('Background Position', 'twork-builder')}
                                value={backgroundPosition}
                                options={[
                                    { label: __('Center', 'twork-builder'), value: 'center' },
                                    { label: __('Top', 'twork-builder'), value: 'top' },
                                    { label: __('Bottom', 'twork-builder'), value: 'bottom' },
                                    { label: __('Left', 'twork-builder'), value: 'left' },
                                    { label: __('Right', 'twork-builder'), value: 'right' },
                                    { label: __('Top Left', 'twork-builder'), value: 'top left' },
                                    { label: __('Top Right', 'twork-builder'), value: 'top right' },
                                    { label: __('Bottom Left', 'twork-builder'), value: 'bottom left' },
                                    { label: __('Bottom Right', 'twork-builder'), value: 'bottom right' }
                                ]}
                                onChange={(val) => setAttributes({ backgroundPosition: val })}
                            />

                            <SelectControl
                                label={__('Background Repeat', 'twork-builder')}
                                value={backgroundRepeat}
                                options={[
                                    { label: __('No Repeat', 'twork-builder'), value: 'no-repeat' },
                                    { label: __('Repeat', 'twork-builder'), value: 'repeat' },
                                    { label: __('Repeat X', 'twork-builder'), value: 'repeat-x' },
                                    { label: __('Repeat Y', 'twork-builder'), value: 'repeat-y' }
                                ]}
                                onChange={(val) => setAttributes({ backgroundRepeat: val })}
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
                    title={__('Container Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <RangeControl
                        label={__('Max Width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(val) => setAttributes({ containerMaxWidth: val })}
                        min={600}
                        max={1920}
                        step={10}
                        help={__('Maximum width of the inner container', 'twork-builder')}
                    />

                    <RangeControl
                        label={__('Container Padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(val) => setAttributes({ containerPadding: val })}
                        min={0}
                        max={100}
                        step={5}
                        help={__('Horizontal padding for the inner container', 'twork-builder')}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Spacing', 'twork-builder')}
                    initialOpen={false}
                >
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

                    <RangeControl
                        label={__('Padding Left (px)', 'twork-builder')}
                        value={paddingLeft}
                        onChange={(val) => setAttributes({ paddingLeft: val })}
                        min={0}
                        max={100}
                        step={5}
                    />

                    <RangeControl
                        label={__('Padding Right (px)', 'twork-builder')}
                        value={paddingRight}
                        onChange={(val) => setAttributes({ paddingRight: val })}
                        min={0}
                        max={100}
                        step={5}
                    />

                    <Divider />

                    <RangeControl
                        label={__('Margin Top (px)', 'twork-builder')}
                        value={marginTop}
                        onChange={(val) => setAttributes({ marginTop: val })}
                        min={0}
                        max={200}
                        step={5}
                    />

                    <RangeControl
                        label={__('Margin Bottom (px)', 'twork-builder')}
                        value={marginBottom}
                        onChange={(val) => setAttributes({ marginBottom: val })}
                        min={0}
                        max={200}
                        step={5}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Border Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <RangeControl
                        label={__('Border Width (px)', 'twork-builder')}
                        value={borderWidth}
                        onChange={(val) => setAttributes({ borderWidth: val })}
                        min={0}
                        max={20}
                        step={1}
                    />

                    {borderWidth > 0 && (
                        <>
                            <PanelColorSettings
                                title={__('Border Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: borderColor,
                                        onChange: (val) => setAttributes({ borderColor: val }),
                                        label: __('Border Color', 'twork-builder')
                                    }
                                ]}
                            />

                            <SelectControl
                                label={__('Border Style', 'twork-builder')}
                                value={borderStyle}
                                options={[
                                    { label: __('Solid', 'twork-builder'), value: 'solid' },
                                    { label: __('Dashed', 'twork-builder'), value: 'dashed' },
                                    { label: __('Dotted', 'twork-builder'), value: 'dotted' },
                                    { label: __('Double', 'twork-builder'), value: 'double' }
                                ]}
                                onChange={(val) => setAttributes({ borderStyle: val })}
                            />
                        </>
                    )}

                    <Divider />

                    <RangeControl
                        label={__('Border Radius (px)', 'twork-builder')}
                        value={borderRadius}
                        onChange={(val) => setAttributes({ borderRadius: val })}
                        min={0}
                        max={50}
                        step={1}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Box Shadow', 'twork-builder')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Enable Box Shadow', 'twork-builder')}
                        checked={boxShadow}
                        onChange={(val) => setAttributes({ boxShadow: val })}
                    />

                    {boxShadow && (
                        <>
                            <PanelColorSettings
                                title={__('Shadow Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: boxShadowColor,
                                        onChange: (val) => setAttributes({ boxShadowColor: val }),
                                        label: __('Shadow Color', 'twork-builder')
                                    }
                                ]}
                            />

                            <RangeControl
                                label={__('Blur (px)', 'twork-builder')}
                                value={boxShadowBlur}
                                onChange={(val) => setAttributes({ boxShadowBlur: val })}
                                min={0}
                                max={100}
                                step={1}
                            />

                            <RangeControl
                                label={__('Spread (px)', 'twork-builder')}
                                value={boxShadowSpread}
                                onChange={(val) => setAttributes({ boxShadowSpread: val })}
                                min={-50}
                                max={50}
                                step={1}
                            />

                            <RangeControl
                                label={__('Offset X (px)', 'twork-builder')}
                                value={boxShadowOffsetX}
                                onChange={(val) => setAttributes({ boxShadowOffsetX: val })}
                                min={-50}
                                max={50}
                                step={1}
                            />

                            <RangeControl
                                label={__('Offset Y (px)', 'twork-builder')}
                                value={boxShadowOffsetY}
                                onChange={(val) => setAttributes({ boxShadowOffsetY: val })}
                                min={-50}
                                max={50}
                                step={1}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody
                    title={__('Advanced Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <SelectControl
                        label={__('Overflow', 'twork-builder')}
                        value={overflow}
                        options={[
                            { label: __('Visible', 'twork-builder'), value: 'visible' },
                            { label: __('Hidden', 'twork-builder'), value: 'hidden' },
                            { label: __('Scroll', 'twork-builder'), value: 'scroll' },
                            { label: __('Auto', 'twork-builder'), value: 'auto' }
                        ]}
                        onChange={(val) => setAttributes({ overflow: val })}
                    />

                    <RangeControl
                        label={__('Z-Index', 'twork-builder')}
                        value={zIndex}
                        onChange={(val) => setAttributes({ zIndex: val })}
                        min={0}
                        max={100}
                        step={1}
                        help={__('Layer stacking order', 'twork-builder')}
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
                        <>
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

                            <RangeControl
                                label={__('Animation Delay (ms)', 'twork-builder')}
                                value={animationDelay}
                                onChange={(val) => setAttributes({ animationDelay: val })}
                                min={0}
                                max={1000}
                                step={50}
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
                            zIndex: 1,
                            pointerEvents: 'none'
                        }}
                    />
                )}

                <div
                    className="twork-container"
                    style={containerStyle}
                >
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
                        {__('Twork Container (Editor View)', 'twork-builder')}
                    </div>

                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={TEMPLATE}
                        renderAppender={InnerBlocks.ButtonBlockAppender}
                    />
                </div>
            </div>
        </>
    );
}
