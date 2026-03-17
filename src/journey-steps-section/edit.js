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
        paddingTopMobile,
        paddingBottomMobile,
        columns,
        columnsTablet,
        columnsMobile,
        gap,
        gapMobile,
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontSizeMobile,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        showSectionSubtitle,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        sectionSubtitleFontSizeMobile,
        sectionHeaderMaxWidth,
        sectionHeaderMarginBottom,
        containerMaxWidth,
        containerPadding,
        containerPaddingMobile,
        cardBorderRadius,
        cardBoxShadow,
        cardBoxShadowColor,
        cardBoxShadowBlur,
        cardBoxShadowSpread,
        cardBoxShadowOffsetX,
        cardBoxShadowOffsetY,
        cardBoxShadowHover,
        cardBoxShadowBlurHover,
        cardBoxShadowSpreadHover,
        cardBoxShadowOffsetXHover,
        cardBoxShadowOffsetYHover,
        cardBorderTopWidth,
        cardBorderTopColor,
        hoverEffect,
        hoverTranslateY,
        animationOnScroll,
        animationDelay,
        animationType
    } = attributes;

    const ALLOWED_BLOCKS = ['twork/journey-step-item'];
    const TEMPLATE = [
        ['twork/journey-step-item', {
            stepNumber: 1,
            title: 'Inquiry & Estimate',
            description: 'Send us your medical reports. Our specialists will review them and provide a treatment plan and cost estimate.'
        }],
        ['twork/journey-step-item', {
            stepNumber: 2,
            title: 'Travel & Visa',
            description: 'We assist with medical visa invitation letters and can help arrange accommodation and transport.'
        }],
        ['twork/journey-step-item', {
            stepNumber: 3,
            title: 'Arrival & Care',
            description: 'Airport pickup, dedicated interpreters, and priority admission to ensure a stress-free experience.'
        }],
        ['twork/journey-step-item', {
            stepNumber: 4,
            title: 'Post-Care Follow-up',
            description: 'Even after you return home, we stay connected for follow-up consultations and recovery monitoring.'
        }]
    ];

    const cardShadowValue = cardBoxShadow
        ? `${cardBoxShadowOffsetX}px ${cardBoxShadowOffsetY}px ${cardBoxShadowBlur}px ${cardBoxShadowSpread}px ${cardBoxShadowColor}`
        : 'none';
    const cardShadowHoverValue = cardBoxShadow
        ? `${cardBoxShadowOffsetXHover}px ${cardBoxShadowOffsetYHover}px ${cardBoxShadowBlurHover}px ${cardBoxShadowSpreadHover}px ${cardBoxShadowHover}`
        : 'none';

    const blockProps = useBlockProps({
        className: 'twork-journey-steps-section-editor',
        style: {
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative',
            '--card-shadow': cardShadowValue,
            '--card-shadow-hover': cardShadowHoverValue
        }
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        position: 'relative',
        zIndex: 2
    };

    const sectionHeaderStyle = {
        textAlign: sectionTitleAlignment,
        maxWidth: `${sectionHeaderMaxWidth}px`,
        margin: `0 auto ${sectionHeaderMarginBottom}px`
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section Background', 'twork-builder')} initialOpen={true}>
                    <PanelColorSettings
                        title={__('Background Color', 'twork-builder')}
                        colorSettings={[
                            { value: backgroundColor, onChange: (val) => setAttributes({ backgroundColor: val }), label: __('Background Color', 'twork-builder') }
                        ]}
                    />
                    <Divider />
                    <BaseControl label={__('Background Image', 'twork-builder')}>
                        {!backgroundImage ? (
                            <MediaPlaceholder
                                onSelect={(media) => setAttributes({ backgroundImage: media.url, backgroundImageId: media.id })}
                                allowedTypes={['image']}
                                multiple={false}
                                labels={{ title: __('Background Image', 'twork-builder') }}
                            />
                        ) : (
                            <div>
                                <img src={backgroundImage} alt="" style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                                <Button isSecondary isSmall onClick={() => setAttributes({ backgroundImage: '', backgroundImageId: null })}>
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
                                            { value: backgroundOverlayColor, onChange: (val) => setAttributes({ backgroundOverlayColor: val }), label: __('Overlay Color', 'twork-builder') }
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

                <PanelBody title={__('Section Title', 'twork-builder')} initialOpen={false}>
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
                                    { value: sectionTitleColor, onChange: (val) => setAttributes({ sectionTitleColor: val }), label: __('Title Color', 'twork-builder') }
                                ]}
                            />
                            <RangeControl
                                label={__('Font Size (rem)', 'twork-builder')}
                                value={sectionTitleFontSize}
                                onChange={(val) => setAttributes({ sectionTitleFontSize: val })}
                                min={1}
                                max={4}
                                step={0.1}
                            />
                            <RangeControl
                                label={__('Font Size Mobile (rem)', 'twork-builder')}
                                value={sectionTitleFontSizeMobile}
                                onChange={(val) => setAttributes({ sectionTitleFontSizeMobile: val })}
                                min={1}
                                max={3}
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
                                    { value: sectionSubtitleColor, onChange: (val) => setAttributes({ sectionSubtitleColor: val }), label: __('Subtitle Color', 'twork-builder') }
                                ]}
                            />
                            <RangeControl
                                label={__('Font Size (rem)', 'twork-builder')}
                                value={sectionSubtitleFontSize}
                                onChange={(val) => setAttributes({ sectionSubtitleFontSize: val })}
                                min={0.8}
                                max={1.5}
                                step={0.05}
                            />
                            <RangeControl
                                label={__('Font Size Mobile (rem)', 'twork-builder')}
                                value={sectionSubtitleFontSizeMobile}
                                onChange={(val) => setAttributes({ sectionSubtitleFontSizeMobile: val })}
                                min={0.8}
                                max={1.3}
                                step={0.05}
                            />
                        </>
                    )}
                    <Divider />
                    <RangeControl
                        label={__('Header Max Width (px)', 'twork-builder')}
                        value={sectionHeaderMaxWidth}
                        onChange={(val) => setAttributes({ sectionHeaderMaxWidth: val })}
                        min={400}
                        max={900}
                        step={10}
                    />
                    <RangeControl
                        label={__('Header Margin Bottom (px)', 'twork-builder')}
                        value={sectionHeaderMarginBottom}
                        onChange={(val) => setAttributes({ sectionHeaderMarginBottom: val })}
                        min={20}
                        max={80}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Layout Settings', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Columns (Desktop)', 'twork-builder')}
                        value={columns}
                        onChange={(val) => setAttributes({ columns: val })}
                        min={1}
                        max={6}
                        step={1}
                    />
                    <RangeControl
                        label={__('Columns (Tablet)', 'twork-builder')}
                        value={columnsTablet}
                        onChange={(val) => setAttributes({ columnsTablet: val })}
                        min={1}
                        max={4}
                        step={1}
                    />
                    <RangeControl
                        label={__('Columns (Mobile)', 'twork-builder')}
                        value={columnsMobile}
                        onChange={(val) => setAttributes({ columnsMobile: val })}
                        min={1}
                        max={2}
                        step={1}
                    />
                    <Divider />
                    <RangeControl
                        label={__('Gap Between Cards (px)', 'twork-builder')}
                        value={gap}
                        onChange={(val) => setAttributes({ gap: val })}
                        min={0}
                        max={60}
                        step={5}
                    />
                    <RangeControl
                        label={__('Gap Mobile (px)', 'twork-builder')}
                        value={gapMobile}
                        onChange={(val) => setAttributes({ gapMobile: val })}
                        min={0}
                        max={50}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Section Padding', 'twork-builder')} initialOpen={false}>
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
                        label={__('Padding Top Mobile (px)', 'twork-builder')}
                        value={paddingTopMobile}
                        onChange={(val) => setAttributes({ paddingTopMobile: val })}
                        min={0}
                        max={120}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding Bottom Mobile (px)', 'twork-builder')}
                        value={paddingBottomMobile}
                        onChange={(val) => setAttributes({ paddingBottomMobile: val })}
                        min={0}
                        max={120}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Container', 'twork-builder')} initialOpen={false}>
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
                        max={60}
                        step={5}
                    />
                    <RangeControl
                        label={__('Container Padding Mobile (px)', 'twork-builder')}
                        value={containerPaddingMobile}
                        onChange={(val) => setAttributes({ containerPaddingMobile: val })}
                        min={0}
                        max={40}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Card Styling', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Card Border Radius (px)', 'twork-builder')}
                        value={cardBorderRadius}
                        onChange={(val) => setAttributes({ cardBorderRadius: val })}
                        min={0}
                        max={30}
                        step={1}
                    />
                    <RangeControl
                        label={__('Card Top Border Width (px)', 'twork-builder')}
                        value={cardBorderTopWidth}
                        onChange={(val) => setAttributes({ cardBorderTopWidth: val })}
                        min={0}
                        max={10}
                        step={1}
                    />
                    <PanelColorSettings
                        title={__('Card Top Border Color', 'twork-builder')}
                        colorSettings={[
                            { value: cardBorderTopColor, onChange: (val) => setAttributes({ cardBorderTopColor: val }), label: __('Top Border Color', 'twork-builder') }
                        ]}
                    />
                    <Divider />
                    <ToggleControl
                        label={__('Enable Box Shadow', 'twork-builder')}
                        checked={cardBoxShadow}
                        onChange={(val) => setAttributes({ cardBoxShadow: val })}
                    />
                    {cardBoxShadow && (
                        <>
                            <PanelColorSettings
                                title={__('Shadow Color', 'twork-builder')}
                                colorSettings={[
                                    { value: cardBoxShadowColor, onChange: (val) => setAttributes({ cardBoxShadowColor: val }), label: __('Shadow Color', 'twork-builder') },
                                    { value: cardBoxShadowHover, onChange: (val) => setAttributes({ cardBoxShadowHover: val }), label: __('Shadow Hover Color', 'twork-builder') }
                                ]}
                            />
                            <RangeControl
                                label={__('Blur (px)', 'twork-builder')}
                                value={cardBoxShadowBlur}
                                onChange={(val) => setAttributes({ cardBoxShadowBlur: val })}
                                min={0}
                                max={100}
                                step={1}
                            />
                            <RangeControl
                                label={__('Spread (px)', 'twork-builder')}
                                value={cardBoxShadowSpread}
                                onChange={(val) => setAttributes({ cardBoxShadowSpread: val })}
                                min={-50}
                                max={50}
                                step={1}
                            />
                            <RangeControl
                                label={__('Offset X (px)', 'twork-builder')}
                                value={cardBoxShadowOffsetX}
                                onChange={(val) => setAttributes({ cardBoxShadowOffsetX: val })}
                                min={-50}
                                max={50}
                                step={1}
                            />
                            <RangeControl
                                label={__('Offset Y (px)', 'twork-builder')}
                                value={cardBoxShadowOffsetY}
                                onChange={(val) => setAttributes({ cardBoxShadowOffsetY: val })}
                                min={-50}
                                max={50}
                                step={1}
                            />
                            <Divider />
                            <p style={{ margin: '8px 0 4px', fontSize: '12px', fontWeight: 600 }}>{__('Hover Shadow', 'twork-builder')}</p>
                            <RangeControl
                                label={__('Hover Blur (px)', 'twork-builder')}
                                value={cardBoxShadowBlurHover}
                                onChange={(val) => setAttributes({ cardBoxShadowBlurHover: val })}
                                min={0}
                                max={100}
                                step={1}
                            />
                            <RangeControl
                                label={__('Hover Spread (px)', 'twork-builder')}
                                value={cardBoxShadowSpreadHover}
                                onChange={(val) => setAttributes({ cardBoxShadowSpreadHover: val })}
                                min={-50}
                                max={50}
                                step={1}
                            />
                            <RangeControl
                                label={__('Hover Offset X (px)', 'twork-builder')}
                                value={cardBoxShadowOffsetXHover}
                                onChange={(val) => setAttributes({ cardBoxShadowOffsetXHover: val })}
                                min={-50}
                                max={50}
                                step={1}
                            />
                            <RangeControl
                                label={__('Hover Offset Y (px)', 'twork-builder')}
                                value={cardBoxShadowOffsetYHover}
                                onChange={(val) => setAttributes({ cardBoxShadowOffsetYHover: val })}
                                min={-50}
                                max={50}
                                step={1}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Hover & Animation', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Enable Hover Effect', 'twork-builder')}
                        checked={hoverEffect}
                        onChange={(val) => setAttributes({ hoverEffect: val })}
                    />
                    {hoverEffect && (
                        <RangeControl
                            label={__('Hover Translate Y (px)', 'twork-builder')}
                            value={hoverTranslateY}
                            onChange={(val) => setAttributes({ hoverTranslateY: val })}
                            min={-20}
                            max={0}
                            step={1}
                        />
                    )}
                    <Divider />
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
                    <div
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
                    {(showSectionTitle || showSectionSubtitle) && (
                        <div className="section-header" style={sectionHeaderStyle}>
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
                                        marginBottom: showSectionSubtitle ? '15px' : '0'
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

                    <div className="twork-journey-steps-grid steps-grid" style={gridStyle} data-columns={columns}>
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
