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
        columns,
        columnsTablet,
        columnsMobile,
        gap,
        gridMarginTop,
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
        sectionHeaderMaxWidth,
        sectionHeaderMarginBottom,
        containerMaxWidth,
        containerPadding,
        hoverEffect,
        hoverTranslateY
    } = attributes;

    const ALLOWED_BLOCKS = ['twork/insurance-partner-item'];
    const TEMPLATE = [
        ['twork/insurance-partner-item', { partnerName: 'AIA Myanmar', iconClass: 'fas fa-shield-alt' }],
        ['twork/insurance-partner-item', { partnerName: 'Prudential', iconClass: 'fas fa-umbrella' }],
        ['twork/insurance-partner-item', { partnerName: 'Manulife', iconClass: 'fas fa-leaf' }],
        ['twork/insurance-partner-item', { partnerName: 'GGI Insurance', iconClass: 'fas fa-building' }],
        ['twork/insurance-partner-item', { partnerName: 'IKBZ Insurance', iconClass: 'fas fa-landmark' }],
        ['twork/insurance-partner-item', { partnerName: 'CB Insurance', iconClass: 'fas fa-hand-holding-heart' }],
        ['twork/insurance-partner-item', { partnerName: 'MGA Insurance', iconClass: 'fas fa-globe-asia' }],
        ['twork/insurance-partner-item', { partnerName: 'Others', iconClass: 'fas fa-file-medical' }]
    ];

    const blockProps = useBlockProps({
        className: 'twork-insurance-partners-section-editor',
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
        '--grid-columns': columns,
        '--grid-gap': `${gap}px`,
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        marginTop: `${gridMarginTop}px`
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section Title & Subtitle', 'twork-builder')} initialOpen={true}>
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
                                min={1.2}
                                max={3}
                                step={0.1}
                            />
                            <RangeControl
                                label={__('Font Weight', 'twork-builder')}
                                value={sectionTitleFontWeight}
                                onChange={(val) => setAttributes({ sectionTitleFontWeight: val })}
                                min={400}
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
                                min={0.85}
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
                        min={10}
                        max={60}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Layout Settings', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Columns (Desktop)', 'twork-builder')}
                        value={columns}
                        onChange={(val) => setAttributes({ columns: val })}
                        min={2}
                        max={6}
                        step={1}
                        help={__('Number of columns on desktop', 'twork-builder')}
                    />
                    <RangeControl
                        label={__('Columns (Tablet)', 'twork-builder')}
                        value={columnsTablet}
                        onChange={(val) => setAttributes({ columnsTablet: val })}
                        min={2}
                        max={4}
                        step={1}
                    />
                    <RangeControl
                        label={__('Columns (Mobile)', 'twork-builder')}
                        value={columnsMobile}
                        onChange={(val) => setAttributes({ columnsMobile: val })}
                        min={1}
                        max={3}
                        step={1}
                    />
                    <Divider />
                    <RangeControl
                        label={__('Gap Between Cards (px)', 'twork-builder')}
                        value={gap}
                        onChange={(val) => setAttributes({ gap: val })}
                        min={10}
                        max={40}
                        step={5}
                    />
                    <RangeControl
                        label={__('Grid Margin Top (px)', 'twork-builder')}
                        value={gridMarginTop}
                        onChange={(val) => setAttributes({ gridMarginTop: val })}
                        min={20}
                        max={80}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Section Background', 'twork-builder')} initialOpen={false}>
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
                                <img src={backgroundImage} alt="" style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
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

                <PanelBody title={__('Container & Padding', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Container Max Width (px)', 'twork-builder')}
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

                <PanelBody title={__('Hover Effect', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Enable Hover Effect', 'twork-builder')}
                        checked={hoverEffect}
                        onChange={(val) => setAttributes({ hoverEffect: val })}
                        help={__('Lift card on hover', 'twork-builder')}
                    />
                    {hoverEffect && (
                        <RangeControl
                            label={__('Translate Y (px)', 'twork-builder')}
                            value={hoverTranslateY}
                            onChange={(val) => setAttributes({ hoverTranslateY: val })}
                            min={-15}
                            max={0}
                            step={1}
                            help={__('Vertical movement on hover', 'twork-builder')}
                        />
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
                        <div
                            className="section-header"
                            style={{
                                textAlign: sectionTitleAlignment,
                                maxWidth: `${sectionHeaderMaxWidth}px`,
                                margin: `0 auto ${sectionHeaderMarginBottom}px`
                            }}
                        >
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
                        className="twork-insurance-partners-grid insurance-grid"
                        style={gridStyle}
                        data-columns={columns}
                        data-columns-tablet={columnsTablet}
                        data-columns-mobile={columnsMobile}
                        data-hover-effect={hoverEffect}
                        data-hover-translate-y={hoverTranslateY}
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
