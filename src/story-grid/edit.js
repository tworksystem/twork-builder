import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';
import {
    useBlockProps,
    InnerBlocks,
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
        backgroundColor,
        backgroundImage,
        backgroundImageId,
        backgroundOverlay,
        backgroundOverlayColor,
        backgroundOverlayOpacity,
        paddingTop,
        paddingBottom,
        gap,
        gapTablet,
        gapMobile,
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        showSectionSubtitle,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        containerMaxWidth,
        containerPadding,
        alignItems,
        hoverEffect,
        animationOnScroll,
        animationDelay,
        animationType
    } = attributes;

    const ALLOWED_BLOCKS = ['twork/story-item'];
    const TEMPLATE = [
        ['twork/story-item', {}]
    ];

    // Use ref to track block container
    const blockContainerRef = useRef(null);

    // Style block appender using JavaScript for guaranteed targeting
    useEffect(() => {
        const styleBlockAppender = () => {
            // Find all possible block appender elements related to story-grid
            const selectors = [
                '.wp-block-twork-story-grid .block-list-appender',
                '[data-type="twork/story-grid"] .block-list-appender',
                '.twork-story-grid-editor .block-list-appender',
                '.twork-story-grid-container .block-list-appender',
                '.twork-story-grid-container ~ .block-list-appender',
                '.block-editor-inner-blocks .block-list-appender'
            ];

            selectors.forEach(selector => {
                const appenders = document.querySelectorAll(selector);
                appenders.forEach(appender => {
                    // Check if this appender is related to our story-grid block
                    const blockElement = appender.closest('[data-type="twork/story-grid"]') || 
                                       appender.closest('.wp-block-twork-story-grid') ||
                                       appender.closest('.twork-story-grid-editor') ||
                                       document.querySelector('.wp-block-twork-story-grid');
                    
                    if (blockElement) {
                        // Style the appender container
                        appender.style.cssText = `
                            display: block !important;
                            visibility: visible !important;
                            opacity: 1 !important;
                            position: absolute !important;
                            bottom: 16px !important;
                            right: 16px !important;
                            left: auto !important;
                            top: auto !important;
                            width: 32px !important;
                            height: 32px !important;
                            min-width: 32px !important;
                            min-height: 32px !important;
                            max-width: 32px !important;
                            max-height: 32px !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            z-index: 1000 !important;
                            pointer-events: auto !important;
                            overflow: visible !important;
                            transform: none !important;
                            border: none !important;
                            background: transparent !important;
                            box-shadow: none !important;
                        `;

                        // Style the button inside
                        const buttons = appender.querySelectorAll('button, .components-button, .block-editor-button-block-appender');
                        buttons.forEach(button => {
                            button.style.cssText = `
                                width: 32px !important;
                                height: 32px !important;
                                min-width: 32px !important;
                                min-height: 32px !important;
                                max-width: 32px !important;
                                max-height: 32px !important;
                                padding: 0 !important;
                                margin: 0 !important;
                                border-radius: 50% !important;
                                background-color: #2271b1 !important;
                                color: #ffffff !important;
                                border: 2px solid #ffffff !important;
                                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
                                display: flex !important;
                                align-items: center !important;
                                justify-content: center !important;
                                cursor: pointer !important;
                                transition: all 0.2s ease !important;
                                font-size: 18px !important;
                                line-height: 1 !important;
                                position: relative !important;
                            `;

                            // Style icons inside button
                            const icons = button.querySelectorAll('svg, .block-editor-block-icon, .dashicons');
                            icons.forEach(icon => {
                                icon.style.cssText = `
                                    width: 18px !important;
                                    height: 18px !important;
                                    font-size: 18px !important;
                                    line-height: 1 !important;
                                    margin: 0 !important;
                                `;
                            });
                        });
                    }
                });
            });
        };

        // Run immediately
        styleBlockAppender();

        // Run after a short delay to catch dynamically added elements
        const timeoutId = setTimeout(styleBlockAppender, 100);
        
        // Use MutationObserver to catch dynamically added appenders
        const observer = new MutationObserver(styleBlockAppender);
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => {
            clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, []);

    const blockProps = useBlockProps({
        ref: blockContainerRef,
        className: 'twork-story-grid-editor',
        style: {
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom + 60}px`, // Add extra bottom padding for appender button
            position: 'relative' // CRITICAL: Must be relative for absolute child positioning
        }
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        position: 'relative',
        zIndex: 2
    };

    const gridStyle = {
        '--story-grid-gap': `${gap}px`,
        '--story-grid-gap-tablet': `${gapTablet}px`,
        '--story-grid-gap-mobile': `${gapMobile}px`,
        display: 'grid',
        gridTemplateColumns: '1fr', // Single column - each story item spans full width
        gap: `${gap}px`,
        alignItems: alignItems || 'center',
        width: '100%'
    };

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={__('Section Background', 'twork-builder')}
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
                    title={__('Section Title', 'twork-builder')}
                    initialOpen={false}
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
                                label={__('Font Size (rem)', 'twork-builder')}
                                value={sectionTitleFontSize}
                                onChange={(val) => setAttributes({ sectionTitleFontSize: val })}
                                min={1}
                                max={5}
                                step={0.1}
                            />

                            <RangeControl
                                label={__('Font Weight', 'twork-builder')}
                                value={sectionTitleFontWeight}
                                onChange={(val) => setAttributes({ sectionTitleFontWeight: val })}
                                min={100}
                                max={900}
                                step={100}
                            />

                            <SelectControl
                                label={__('Alignment', 'twork-builder')}
                                value={sectionTitleAlignment}
                                options={[
                                    { label: __('Left', 'twork-builder'), value: 'left' },
                                    { label: __('Center', 'twork-builder'), value: 'center' },
                                    { label: __('Right', 'twork-builder'), value: 'right' }
                                ]}
                                onChange={(val) => setAttributes({ sectionTitleAlignment: val })}
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
                                label={__('Font Size (rem)', 'twork-builder')}
                                value={sectionSubtitleFontSize}
                                onChange={(val) => setAttributes({ sectionSubtitleFontSize: val })}
                                min={0.8}
                                max={2}
                                step={0.1}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody
                    title={__('Layout Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <RangeControl
                        label={__('Gap Between Items (px)', 'twork-builder')}
                        value={gap}
                        onChange={(val) => setAttributes({ gap: val })}
                        min={0}
                        max={120}
                        step={5}
                        help={__('Gap between content and image on desktop', 'twork-builder')}
                    />

                    <RangeControl
                        label={__('Gap (Tablet) (px)', 'twork-builder')}
                        value={gapTablet}
                        onChange={(val) => setAttributes({ gapTablet: val })}
                        min={0}
                        max={80}
                        step={5}
                        help={__('Gap between content and image on tablet', 'twork-builder')}
                    />

                    <RangeControl
                        label={__('Gap (Mobile) (px)', 'twork-builder')}
                        value={gapMobile}
                        onChange={(val) => setAttributes({ gapMobile: val })}
                        min={0}
                        max={60}
                        step={5}
                        help={__('Gap between content and image on mobile', 'twork-builder')}
                    />

                    <Divider />

                    <SelectControl
                        label={__('Vertical Alignment', 'twork-builder')}
                        value={alignItems}
                        options={[
                            { label: __('Top', 'twork-builder'), value: 'start' },
                            { label: __('Center', 'twork-builder'), value: 'center' },
                            { label: __('Bottom', 'twork-builder'), value: 'end' },
                            { label: __('Stretch', 'twork-builder'), value: 'stretch' }
                        ]}
                        onChange={(val) => setAttributes({ alignItems: val })}
                        help={__('Vertical alignment of grid items', 'twork-builder')}
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
                        label={__('Container Padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(val) => setAttributes({ containerPadding: val })}
                        min={0}
                        max={100}
                        step={5}
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
                    title={__('Hover Effects', 'twork-builder')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Enable Hover Effects', 'twork-builder')}
                        checked={hoverEffect}
                        onChange={(val) => setAttributes({ hoverEffect: val })}
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
                                max={500}
                                step={50}
                            />
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {backgroundImage && backgroundOverlay && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: backgroundOverlayColor,
                        opacity: backgroundOverlayOpacity,
                        zIndex: 1
                    }} />
                )}
                
                <div style={containerStyle}>
                    {(showSectionTitle || showSectionSubtitle) && (
                        <div style={{
                            textAlign: sectionTitleAlignment,
                            marginBottom: '50px'
                        }}>
                            {showSectionTitle && (
                                <RichText
                                    tagName="h2"
                                    value={sectionTitle}
                                    onChange={(val) => setAttributes({ sectionTitle: val })}
                                    placeholder={__('Section Title...', 'twork-builder')}
                                    style={{
                                        fontSize: `${sectionTitleFontSize}rem`,
                                        fontWeight: sectionTitleFontWeight,
                                        color: sectionTitleColor,
                                        marginBottom: showSectionSubtitle ? '10px' : '0'
                                    }}
                                />
                            )}
                            {showSectionSubtitle && (
                                <RichText
                                    tagName="p"
                                    value={sectionSubtitle}
                                    onChange={(val) => setAttributes({ sectionSubtitle: val })}
                                    placeholder={__('Section Subtitle...', 'twork-builder')}
                                    style={{
                                        fontSize: `${sectionSubtitleFontSize}rem`,
                                        color: sectionSubtitleColor,
                                        margin: 0
                                    }}
                                />
                            )}
                        </div>
                    )}

                    <div 
                        className="twork-story-grid-container"
                        style={{
                            ...gridStyle,
                            position: 'relative', // CRITICAL: Must be relative for absolute child positioning
                            paddingBottom: '60px' // Add bottom padding for appender button
                        }}
                    >
                        <InnerBlocks
                            allowedBlocks={ALLOWED_BLOCKS}
                            template={TEMPLATE}
                            renderAppender={InnerBlocks.ButtonBlockAppender}
                            orientation="vertical"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
