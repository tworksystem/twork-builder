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
        minColumnWidth,
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontSizeMobile,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        sectionTitleMarginBottom,
        showSectionDescription,
        sectionDescription,
        containerMaxWidth,
        containerPadding,
        containerPaddingMobile,
        animationOnScroll,
        animationDelay,
        animationType
    } = attributes;

    const ALLOWED_BLOCKS = ['twork/nearby-accommodation-item'];
    const TEMPLATE = [
        ['twork/nearby-accommodation-item', {
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
            title: 'Mandalay Hill Resort',
            subtitle: '5 Star • 5 mins away'
        }],
        ['twork/nearby-accommodation-item', {
            image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
            title: 'Mercure Mandalay',
            subtitle: '4 Star • 10 mins away'
        }],
        ['twork/nearby-accommodation-item', {
            image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80',
            title: 'Sedona Hotel',
            subtitle: '5 Star • 15 mins away'
        }],
        ['twork/nearby-accommodation-item', {
            image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=600&q=80',
            title: 'Eastern Palace',
            subtitle: '4 Star • 12 mins away'
        }]
    ];

    const blockProps = useBlockProps({
        className: 'twork-nearby-accommodation-section-editor',
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

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${minColumnWidth}px, 1fr))`,
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

                <PanelBody title={__('Header (Section Title)', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Show header', 'twork-builder')}
                        checked={showSectionTitle}
                        onChange={(val) => setAttributes({ showSectionTitle: val })}
                        help={__('Toggle the section title on/off.', 'twork-builder')}
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
                            <RangeControl
                                label={__('Margin Bottom (px)', 'twork-builder')}
                                value={sectionTitleMarginBottom}
                                onChange={(val) => setAttributes({ sectionTitleMarginBottom: val })}
                                min={20}
                                max={80}
                                step={5}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Section Description', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Show description', 'twork-builder')}
                        checked={showSectionDescription}
                        onChange={(val) => setAttributes({ showSectionDescription: val })}
                        help={__('Toggle the section description below the title on/off.', 'twork-builder')}
                    />
                    {showSectionDescription && (
                        <>
                            <TextControl
                                label={__('Description text', 'twork-builder')}
                                value={sectionDescription}
                                onChange={(val) => setAttributes({ sectionDescription: val })}
                                help={__('Optional intro text below the section title.', 'twork-builder')}
                                multiline
                                rows={3}
                            />
                        </>
                    )}
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
                    <RangeControl
                        label={__('Min Column Width (px)', 'twork-builder')}
                        value={minColumnWidth}
                        onChange={(val) => setAttributes({ minColumnWidth: val })}
                        min={200}
                        max={400}
                        step={10}
                    />
                    <Divider />
                    <RangeControl
                        label={__('Gap Between Cards (px)', 'twork-builder')}
                        value={gap}
                        onChange={(val) => setAttributes({ gap: val })}
                        min={0}
                        max={50}
                        step={5}
                    />
                    <RangeControl
                        label={__('Gap Mobile (px)', 'twork-builder')}
                        value={gapMobile}
                        onChange={(val) => setAttributes({ gapMobile: val })}
                        min={0}
                        max={40}
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

                <PanelBody title={__('Animation', 'twork-builder')} initialOpen={false}>
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
                    {(showSectionTitle || showSectionDescription) && (
                        <div className="section-header" style={{ marginBottom: showSectionTitle ? `${sectionTitleMarginBottom}px` : 20 }}>
                            {showSectionTitle && (
                                <RichText
                                    tagName="h2"
                                    value={sectionTitle}
                                    onChange={(val) => setAttributes({ sectionTitle: val })}
                                    placeholder={__('Section Title...', 'twork-builder')}
                                    className="section-title fade-up"
                                    style={{
                                        fontSize: `${sectionTitleFontSize}rem`,
                                        fontWeight: sectionTitleFontWeight,
                                        color: sectionTitleColor,
                                        textAlign: sectionTitleAlignment,
                                        marginBottom: showSectionDescription ? 12 : 0
                                    }}
                                />
                            )}
                            {showSectionDescription && (
                                <p className="section-description" style={{ margin: 0, color: '#666', fontSize: '1rem', lineHeight: 1.5 }}>
                                    {sectionDescription}
                                </p>
                            )}
                        </div>
                    )}

                    <div
                        className="twork-hotel-grid hotel-grid"
                        style={gridStyle}
                        data-columns={columns}
                        data-columns-tablet={columnsTablet}
                        data-columns-mobile={columnsMobile}
                        data-min-column-width={minColumnWidth}
                        data-gap={gap}
                        data-gap-mobile={gapMobile}
                    >
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
