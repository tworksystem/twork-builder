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
        sectionHeaderMarginBottom,
        containerMaxWidth,
        containerPadding,
        containerPaddingMobile,
        animationOnScroll,
        animationDelay,
        animationType
    } = attributes;

    const ALLOWED_BLOCKS = ['twork/visitor-guidelines-column'];
    const TEMPLATE = [
        [
            'twork/visitor-guidelines-column',
            {
                columnType: 'dos',
                title: "Do's",
                titleIcon: 'fas fa-check-circle',
                itemIcon: 'fas fa-check',
                listItems: [
                    { id: 1, text: 'Wear a mask at all times within the premises.' },
                    { id: 2, text: 'Sanitize your hands before entering the ward.' },
                    { id: 3, text: 'Keep your mobile phones on silent mode.' },
                    { id: 4, text: 'Respect the privacy of other patients.' }
                ]
            }
        ],
        [
            'twork/visitor-guidelines-column',
            {
                columnType: 'donts',
                title: "Don'ts",
                titleIcon: 'fas fa-times-circle',
                itemIcon: 'fas fa-times',
                listItems: [
                    { id: 1, text: 'Do not bring outside food or flowers.' },
                    { id: 2, text: 'Children under 12 are not advised to visit.' },
                    { id: 3, text: 'Do not smoke or consume alcohol on premises.' },
                    { id: 4, text: 'Do not make loud noises in the corridors.' }
                ]
            }
        ]
    ];

    const blockProps = useBlockProps({
        className: 'twork-visitor-guidelines-section-editor',
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

    const sectionHeaderStyle = {
        textAlign: sectionTitleAlignment,
        marginBottom: `${sectionHeaderMarginBottom}px`
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
                            <RangeControl
                                label={__('Header Margin Bottom (px)', 'twork-builder')}
                                value={sectionHeaderMarginBottom}
                                onChange={(val) => setAttributes({ sectionHeaderMarginBottom: val })}
                                min={20}
                                max={80}
                                step={5}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Columns (Desktop)', 'twork-builder')}
                        value={columns}
                        onChange={(val) => setAttributes({ columns: val })}
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
                        label={__('Gap Between Columns (px)', 'twork-builder')}
                        value={gap}
                        onChange={(val) => setAttributes({ gap: val })}
                        min={0}
                        max={80}
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

                <div className="jivaka-container" style={containerStyle}>
                    {showSectionTitle && (
                        <div className="section-header fade-up" style={sectionHeaderStyle}>
                            <RichText
                                tagName="h2"
                                value={sectionTitle}
                                onChange={(val) => setAttributes({ sectionTitle: val })}
                                placeholder={__('Section Title...', 'twork-builder')}
                                style={{
                                    fontSize: `${sectionTitleFontSize}rem`,
                                    fontWeight: sectionTitleFontWeight,
                                    color: sectionTitleColor,
                                    margin: 0
                                }}
                            />
                        </div>
                    )}

                    <div className="guidelines-grid twork-visitor-guidelines-grid" style={gridStyle} data-columns={columns}>
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
