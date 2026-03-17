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
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontSizeMobile,
        sectionTitleFontWeight,
        sectionTitleMarginBottom,
        showSectionDescription,
        sectionDescription,
        sectionDescriptionColor,
        sectionDescriptionFontSize,
        sectionDescriptionMarginBottom,
        showImage,
        imageUrl,
        imageId,
        imageAlt,
        imageBorderRadius,
        imageBoxShadow,
        containerMaxWidth,
        containerPadding,
        layoutGap,
        layoutGapMobile,
        imageFirstOnMobile,
        hoursCardBgColor,
        hoursCardPadding,
        hoursCardBorderRadius,
        hoursCardBoxShadow,
        animationOnScroll,
        animationType,
        animationDelay
    } = attributes;

    const ALLOWED_BLOCKS = ['twork/visiting-hours-item'];
    const TEMPLATE = [
        ['twork/visiting-hours-item', { wardName: 'General Ward', timeSlot: '10:00 AM – 8:00 PM', iconClass: 'fas fa-procedures' }],
        ['twork/visiting-hours-item', { wardName: 'ICU / CCU', timeSlot: '11:00 AM – 12:00 PM', iconClass: 'fas fa-heartbeat' }],
        ['twork/visiting-hours-item', { wardName: 'Private Rooms', timeSlot: '8:00 AM – 9:00 PM', iconClass: 'fas fa-user-md' }],
        ['twork/visiting-hours-item', { wardName: 'NICU (Parents)', timeSlot: '24 Hours Allowed', iconClass: 'fas fa-baby' }]
    ];

    const blockProps = useBlockProps({
        className: 'twork-visiting-info-section-editor',
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

    const infoLayoutStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: `${layoutGap}px`,
        alignItems: 'center'
    };

    const hoursCardStyle = {
        background: hoursCardBgColor,
        padding: `${hoursCardPadding}px`,
        borderRadius: `${hoursCardBorderRadius}px`,
        boxShadow: hoursCardBoxShadow ? '0 20px 50px rgba(0, 0, 0, 0.1)' : 'none'
    };

    const imageStyle = {
        borderRadius: `${imageBorderRadius}px`,
        boxShadow: imageBoxShadow ? '0 10px 30px rgba(0, 0, 0, 0.1)' : 'none',
        width: '100%',
        height: 'auto',
        display: 'block'
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section Content', 'twork-builder')} initialOpen={true}>
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
                                label={__('Font Size Mobile (rem)', 'twork-builder')}
                                value={sectionTitleFontSizeMobile}
                                onChange={(val) => setAttributes({ sectionTitleFontSizeMobile: val })}
                                min={1}
                                max={2.2}
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
                            <RangeControl
                                label={__('Margin Bottom (px)', 'twork-builder')}
                                value={sectionTitleMarginBottom}
                                onChange={(val) => setAttributes({ sectionTitleMarginBottom: val })}
                                min={10}
                                max={40}
                                step={5}
                            />
                        </>
                    )}

                    <Divider />

                    <ToggleControl
                        label={__('Show Description', 'twork-builder')}
                        checked={showSectionDescription}
                        onChange={(val) => setAttributes({ showSectionDescription: val })}
                    />
                    {showSectionDescription && (
                        <>
                            <TextControl
                                label={__('Description Text', 'twork-builder')}
                                value={sectionDescription}
                                onChange={(val) => setAttributes({ sectionDescription: val })}
                                help={__('Intro text above the visiting hours card', 'twork-builder')}
                            />
                            <PanelColorSettings
                                title={__('Description Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: sectionDescriptionColor,
                                        onChange: (val) => setAttributes({ sectionDescriptionColor: val }),
                                        label: __('Description Color', 'twork-builder')
                                    }
                                ]}
                            />
                            <RangeControl
                                label={__('Font Size (rem)', 'twork-builder')}
                                value={sectionDescriptionFontSize}
                                onChange={(val) => setAttributes({ sectionDescriptionFontSize: val })}
                                min={0.85}
                                max={1.3}
                                step={0.05}
                            />
                            <RangeControl
                                label={__('Margin Bottom (px)', 'twork-builder')}
                                value={sectionDescriptionMarginBottom}
                                onChange={(val) => setAttributes({ sectionDescriptionMarginBottom: val })}
                                min={15}
                                max={50}
                                step={5}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Image', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Show Image', 'twork-builder')}
                        checked={showImage}
                        onChange={(val) => setAttributes({ showImage: val })}
                    />
                    {showImage && (
                        <>
                            <BaseControl label={__('Image', 'twork-builder')}>
                                {!imageUrl ? (
                                    <MediaPlaceholder
                                        onSelect={(media) => setAttributes({
                                            imageUrl: media.url,
                                            imageId: media.id,
                                            imageAlt: media.alt || 'Reception'
                                        })}
                                        allowedTypes={['image']}
                                        multiple={false}
                                        labels={{ title: __('Select Image', 'twork-builder') }}
                                    />
                                ) : (
                                    <div>
                                        <img
                                            src={imageUrl}
                                            alt=""
                                            style={{ width: '100%', height: 'auto', marginBottom: '10px', borderRadius: '8px' }}
                                        />
                                        <Button
                                            isSecondary
                                            isSmall
                                            onClick={() => setAttributes({
                                                imageUrl: '',
                                                imageId: null,
                                                imageAlt: 'Reception'
                                            })}
                                        >
                                            {__('Remove Image', 'twork-builder')}
                                        </Button>
                                    </div>
                                )}
                            </BaseControl>
                            <TextControl
                                label={__('Alt Text', 'twork-builder')}
                                value={imageAlt}
                                onChange={(val) => setAttributes({ imageAlt: val })}
                            />
                            <RangeControl
                                label={__('Border Radius (px)', 'twork-builder')}
                                value={imageBorderRadius}
                                onChange={(val) => setAttributes({ imageBorderRadius: val })}
                                min={0}
                                max={30}
                                step={1}
                            />
                            <ToggleControl
                                label={__('Enable Box Shadow', 'twork-builder')}
                                checked={imageBoxShadow}
                                onChange={(val) => setAttributes({ imageBoxShadow: val })}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Hours Card', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Card Background', 'twork-builder')}
                        colorSettings={[
                            {
                                value: hoursCardBgColor,
                                onChange: (val) => setAttributes({ hoursCardBgColor: val }),
                                label: __('Background Color', 'twork-builder')
                            }
                        ]}
                    />
                    <RangeControl
                        label={__('Padding (px)', 'twork-builder')}
                        value={hoursCardPadding}
                        onChange={(val) => setAttributes({ hoursCardPadding: val })}
                        min={20}
                        max={60}
                        step={5}
                    />
                    <RangeControl
                        label={__('Border Radius (px)', 'twork-builder')}
                        value={hoursCardBorderRadius}
                        onChange={(val) => setAttributes({ hoursCardBorderRadius: val })}
                        min={0}
                        max={24}
                        step={1}
                    />
                    <ToggleControl
                        label={__('Enable Box Shadow', 'twork-builder')}
                        checked={hoursCardBoxShadow}
                        onChange={(val) => setAttributes({ hoursCardBoxShadow: val })}
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

                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
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
                    <RangeControl
                        label={__('Gap Between Columns (px)', 'twork-builder')}
                        value={layoutGap}
                        onChange={(val) => setAttributes({ layoutGap: val })}
                        min={20}
                        max={80}
                        step={5}
                    />
                    <RangeControl
                        label={__('Gap Mobile (px)', 'twork-builder')}
                        value={layoutGapMobile}
                        onChange={(val) => setAttributes({ layoutGapMobile: val })}
                        min={20}
                        max={50}
                        step={5}
                    />
                    <ToggleControl
                        label={__('Image First on Mobile', 'twork-builder')}
                        checked={imageFirstOnMobile}
                        onChange={(val) => setAttributes({ imageFirstOnMobile: val })}
                        help={__('Show image above content on small screens', 'twork-builder')}
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
                    <div
                        className="info-layout"
                        style={infoLayoutStyle}
                        data-image-first-mobile={imageFirstOnMobile}
                        data-layout-gap={layoutGap}
                        data-layout-gap-mobile={layoutGapMobile}
                    >
                        <div className="info-content fade-up">
                            {(showSectionTitle || showSectionDescription) && (
                                <div className="info-header">
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
                                                marginBottom: showSectionDescription ? `${sectionTitleMarginBottom}px` : '0'
                                            }}
                                        />
                                    )}
                                    {showSectionDescription && (
                                        <RichText
                                            tagName="p"
                                            value={sectionDescription}
                                            onChange={(val) => setAttributes({ sectionDescription: val })}
                                            placeholder={__('Description...', 'twork-builder')}
                                            style={{
                                                fontSize: `${sectionDescriptionFontSize}rem`,
                                                color: sectionDescriptionColor,
                                                marginBottom: `${sectionDescriptionMarginBottom}px`
                                            }}
                                        />
                                    )}
                                </div>
                            )}

                            <div className="hours-card" style={hoursCardStyle}>
                                <InnerBlocks
                                    allowedBlocks={ALLOWED_BLOCKS}
                                    template={TEMPLATE}
                                    renderAppender={InnerBlocks.ButtonBlockAppender}
                                />
                            </div>
                        </div>

                        {showImage && (
                            <div className="info-img fade-up">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={imageAlt}
                                        style={imageStyle}
                                        decoding="async"
                                    />
                                ) : (
                                    <MediaPlaceholder
                                        onSelect={(media) => setAttributes({
                                            imageUrl: media.url,
                                            imageId: media.id,
                                            imageAlt: media.alt || 'Reception'
                                        })}
                                        allowedTypes={['image']}
                                        multiple={false}
                                        labels={{ title: __('Select Image', 'twork-builder') }}
                                        className="info-img-placeholder"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
