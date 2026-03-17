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
        showSectionSubtitle,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        sectionTitleAlignment,
        sectionHeaderMaxWidth,
        sectionHeaderMarginBottom,
        containerMaxWidth,
        containerPadding,
        containerPaddingMobile,
        animationOnScroll,
        animationDelay,
        animationType
    } = attributes;

    const ALLOWED_BLOCKS = ['twork/accommodation-room-card'];
    const TEMPLATE = [
        [
            'twork/accommodation-room-card',
            {
                title: 'Standard Ward',
                imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
                imageAlt: 'Standard Ward',
                priceText: '30,000 MMK / Night',
                amenities: [
                    { id: 1, icon: 'fas fa-bed', text: 'Adjustable Patient Bed' },
                    { id: 2, icon: 'fas fa-wifi', text: 'Free Wi-Fi' },
                    { id: 3, icon: 'fas fa-fan', text: 'Air Conditioning' },
                    { id: 4, icon: 'fas fa-users', text: 'Shared Bathroom' }
                ],
                buttonText: 'Check Availability',
                buttonUrl: 'contact.html?room=standard'
            }
        ],
        [
            'twork/accommodation-room-card',
            {
                title: 'Private Room',
                imageUrl: 'https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?auto=format&fit=crop&q=80&w=800',
                imageAlt: 'Private Room',
                priceText: '65,000 MMK / Night',
                amenities: [
                    { id: 1, icon: 'fas fa-bed', text: 'Electric Bed' },
                    { id: 2, icon: 'fas fa-tv', text: 'LED TV' },
                    { id: 3, icon: 'fas fa-couch', text: 'Sofa for Attendant' },
                    { id: 4, icon: 'fas fa-bath', text: 'Private Bathroom' }
                ],
                buttonText: 'Check Availability',
                buttonUrl: 'contact.html?room=private'
            }
        ],
        [
            'twork/accommodation-room-card',
            {
                title: 'VIP Suite',
                imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800',
                imageAlt: 'VIP Suite',
                priceText: '120,000 MMK / Night',
                titleColor: '#f48b2a',
                amenities: [
                    { id: 1, icon: 'fas fa-layer-group', text: 'Separate Living Area' },
                    { id: 2, icon: 'fas fa-utensils', text: 'Kitchenette & Fridge' },
                    { id: 3, icon: 'fas fa-tv', text: '2 LED TVs' },
                    { id: 4, icon: 'fas fa-concierge-bell', text: '24/7 Dedicated Nurse' }
                ],
                buttonText: 'Book Now',
                buttonUrl: 'contact.html?room=vip',
                buttonBgColor: '#f48b2a',
                buttonTextColor: '#ffffff',
                buttonBorderColor: '#f48b2a'
            }
        ]
    ];

    const blockProps = useBlockProps({
        className: 'twork-accommodation-options-section-editor',
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
                            <ToggleControl label={__('Show Overlay', 'twork-builder')} checked={backgroundOverlay} onChange={(val) => setAttributes({ backgroundOverlay: val })} />
                            {backgroundOverlay && (
                                <>
                                    <PanelColorSettings
                                        title={__('Overlay Color', 'twork-builder')}
                                        colorSettings={[
                                            { value: backgroundOverlayColor, onChange: (val) => setAttributes({ backgroundOverlayColor: val }), label: __('Overlay Color', 'twork-builder') }
                                        ]}
                                    />
                                    <RangeControl label={__('Overlay Opacity', 'twork-builder')} value={backgroundOverlayOpacity} onChange={(val) => setAttributes({ backgroundOverlayOpacity: val })} min={0} max={1} step={0.1} />
                                </>
                            )}
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Section Title', 'twork-builder')} initialOpen={false}>
                    <ToggleControl label={__('Show Section Title', 'twork-builder')} checked={showSectionTitle} onChange={(val) => setAttributes({ showSectionTitle: val })} />
                    {showSectionTitle && (
                        <>
                            <TextControl label={__('Title Text', 'twork-builder')} value={sectionTitle} onChange={(val) => setAttributes({ sectionTitle: val })} />
                            <PanelColorSettings title={__('Title Color', 'twork-builder')} colorSettings={[{ value: sectionTitleColor, onChange: (val) => setAttributes({ sectionTitleColor: val }), label: __('Title Color', 'twork-builder') }]} />
                            <RangeControl label={__('Font Size (rem)', 'twork-builder')} value={sectionTitleFontSize} onChange={(val) => setAttributes({ sectionTitleFontSize: val })} min={1} max={4} step={0.1} />
                            <RangeControl label={__('Font Size Mobile (rem)', 'twork-builder')} value={sectionTitleFontSizeMobile} onChange={(val) => setAttributes({ sectionTitleFontSizeMobile: val })} min={1} max={3} step={0.1} />
                            <RangeControl label={__('Font Weight', 'twork-builder')} value={sectionTitleFontWeight} onChange={(val) => setAttributes({ sectionTitleFontWeight: val })} min={100} max={900} step={100} />
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
                            <RangeControl label={__('Header Max Width (px)', 'twork-builder')} value={sectionHeaderMaxWidth} onChange={(val) => setAttributes({ sectionHeaderMaxWidth: val })} min={400} max={900} step={10} />
                            <RangeControl label={__('Header Margin Bottom (px)', 'twork-builder')} value={sectionHeaderMarginBottom} onChange={(val) => setAttributes({ sectionHeaderMarginBottom: val })} min={20} max={80} step={5} />
                        </>
                    )}
                    <Divider />
                    <ToggleControl label={__('Show Section Subtitle', 'twork-builder')} checked={showSectionSubtitle} onChange={(val) => setAttributes({ showSectionSubtitle: val })} />
                    {showSectionSubtitle && (
                        <>
                            <TextControl label={__('Subtitle Text', 'twork-builder')} value={sectionSubtitle} onChange={(val) => setAttributes({ sectionSubtitle: val })} />
                            <PanelColorSettings title={__('Subtitle Color', 'twork-builder')} colorSettings={[{ value: sectionSubtitleColor, onChange: (val) => setAttributes({ sectionSubtitleColor: val }), label: __('Subtitle Color', 'twork-builder') }]} />
                            <RangeControl label={__('Font Size (rem)', 'twork-builder')} value={sectionSubtitleFontSize} onChange={(val) => setAttributes({ sectionSubtitleFontSize: val })} min={0.8} max={1.5} step={0.05} />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl label={__('Columns (Desktop)', 'twork-builder')} value={columns} onChange={(val) => setAttributes({ columns: val })} min={1} max={4} step={1} />
                    <RangeControl label={__('Columns (Tablet)', 'twork-builder')} value={columnsTablet} onChange={(val) => setAttributes({ columnsTablet: val })} min={1} max={3} step={1} />
                    <RangeControl label={__('Columns (Mobile)', 'twork-builder')} value={columnsMobile} onChange={(val) => setAttributes({ columnsMobile: val })} min={1} max={2} step={1} />
                    <RangeControl label={__('Gap Between Cards (px)', 'twork-builder')} value={gap} onChange={(val) => setAttributes({ gap: val })} min={0} max={60} step={5} />
                    <RangeControl label={__('Gap Mobile (px)', 'twork-builder')} value={gapMobile} onChange={(val) => setAttributes({ gapMobile: val })} min={0} max={50} step={5} />
                </PanelBody>

                <PanelBody title={__('Container', 'twork-builder')} initialOpen={false}>
                    <RangeControl label={__('Max Width (px)', 'twork-builder')} value={containerMaxWidth} onChange={(val) => setAttributes({ containerMaxWidth: val })} min={800} max={1920} step={10} />
                    <RangeControl label={__('Container Padding (px)', 'twork-builder')} value={containerPadding} onChange={(val) => setAttributes({ containerPadding: val })} min={0} max={60} step={5} />
                    <RangeControl label={__('Container Padding Mobile (px)', 'twork-builder')} value={containerPaddingMobile} onChange={(val) => setAttributes({ containerPaddingMobile: val })} min={0} max={40} step={5} />
                </PanelBody>

                <PanelBody title={__('Section Padding', 'twork-builder')} initialOpen={false}>
                    <RangeControl label={__('Padding Top (px)', 'twork-builder')} value={paddingTop} onChange={(val) => setAttributes({ paddingTop: val })} min={0} max={200} step={5} />
                    <RangeControl label={__('Padding Bottom (px)', 'twork-builder')} value={paddingBottom} onChange={(val) => setAttributes({ paddingBottom: val })} min={0} max={200} step={5} />
                    <RangeControl label={__('Padding Top Mobile (px)', 'twork-builder')} value={paddingTopMobile} onChange={(val) => setAttributes({ paddingTopMobile: val })} min={0} max={120} step={5} />
                    <RangeControl label={__('Padding Bottom Mobile (px)', 'twork-builder')} value={paddingBottomMobile} onChange={(val) => setAttributes({ paddingBottomMobile: val })} min={0} max={120} step={5} />
                </PanelBody>

                <PanelBody title={__('Animation', 'twork-builder')} initialOpen={false}>
                    <ToggleControl label={__('Enable Scroll Animation', 'twork-builder')} checked={animationOnScroll} onChange={(val) => setAttributes({ animationOnScroll: val })} />
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
                            <RangeControl label={__('Animation Delay (ms)', 'twork-builder')} value={animationDelay} onChange={(val) => setAttributes({ animationDelay: val })} min={0} max={500} step={50} />
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {backgroundImage && backgroundOverlay && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: backgroundOverlayColor, opacity: backgroundOverlayOpacity, zIndex: 1 }} />
                )}

                <div className="jivaka-container" style={containerStyle}>
                    {(showSectionTitle || showSectionSubtitle) && (
                        <div className="section-header fade-up" style={sectionHeaderStyle}>
                            {showSectionTitle && (
                                <RichText
                                    tagName="h2"
                                    value={sectionTitle}
                                    onChange={(val) => setAttributes({ sectionTitle: val })}
                                    placeholder={__('Section Title...', 'twork-builder')}
                                    style={{ fontSize: `${sectionTitleFontSize}rem`, fontWeight: sectionTitleFontWeight, color: sectionTitleColor, marginBottom: showSectionSubtitle ? '10px' : '0' }}
                                />
                            )}
                            {showSectionSubtitle && (
                                <RichText
                                    tagName="p"
                                    value={sectionSubtitle}
                                    onChange={(val) => setAttributes({ sectionSubtitle: val })}
                                    placeholder={__('Section Subtitle...', 'twork-builder')}
                                    style={{ fontSize: `${sectionSubtitleFontSize}rem`, color: sectionSubtitleColor, margin: 0 }}
                                />
                            )}
                        </div>
                    )}

                    <div className="rooms-grid twork-accommodation-rooms-grid" style={gridStyle} data-columns={columns}>
                        <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} renderAppender={InnerBlocks.ButtonBlockAppender} />
                    </div>
                </div>
            </div>
        </>
    );
}
