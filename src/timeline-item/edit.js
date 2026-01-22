import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    MediaPlaceholder,
    InspectorControls,
    PanelColorSettings
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    ToggleControl,
    SelectControl,
    RangeControl,
    Button,
    BaseControl,
    __experimentalDivider as Divider
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        year,
        yearColor,
        yearFontSize,
        yearFontWeight,
        heading,
        headingColor,
        headingFontSize,
        headingFontWeight,
        description,
        descriptionColor,
        descriptionFontSize,
        descriptionLineHeight,
        showImage,
        image,
        imageId,
        imageHeight,
        imageObjectFit,
        imageObjectPosition,
        imageBorderRadius,
        showImageOverlay,
        imageOverlayColor,
        imageOverlayOpacity,
        contentBackgroundColor,
        contentPadding,
        contentBorderRadius,
        contentBoxShadow,
        contentBoxShadowColor,
        contentBoxShadowBlur,
        contentBoxShadowSpread,
        contentBoxShadowOffsetX,
        contentBoxShadowOffsetY,
        contentBorderWidth,
        contentBorderColor,
        contentBorderStyle,
        showButton,
        buttonText,
        buttonUrl,
        buttonTarget,
        buttonRel,
        buttonStyle,
        buttonBgColor,
        buttonTextColor,
        buttonBorderRadius,
        buttonPaddingVertical,
        buttonPaddingHorizontal,
        buttonFontSize,
        buttonFontWeight,
        buttonTextTransform,
        buttonIcon,
        buttonIconPosition,
        buttonBorderWidth,
        buttonBorderColor,
        buttonBorderStyle,
        buttonHoverBgColor,
        buttonHoverTextColor,
        buttonHoverBorderColor,
        buttonBoxShadow,
        buttonBoxShadowColor,
        buttonBoxShadowBlur,
        buttonBoxShadowSpread,
        buttonBoxShadowOffsetX,
        buttonBoxShadowOffsetY,
        buttonHoverBoxShadow,
        buttonHoverBoxShadowColor,
        buttonHoverBoxShadowBlur,
        buttonHoverBoxShadowSpread,
        buttonHoverBoxShadowOffsetX,
        buttonHoverBoxShadowOffsetY,
        buttonWidth,
        buttonWidthCustom,
        buttonAlignment,
        buttonMarginTop,
        buttonMarginBottom,
        buttonMarginLeft,
        buttonMarginRight,
        buttonLetterSpacing,
        buttonLineHeight,
        buttonTransitionDuration,
        buttonHoverScale,
        buttonHoverTranslateY,
        buttonFontSizeMobile,
        buttonPaddingVerticalMobile,
        buttonPaddingHorizontalMobile
    } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-timeline-item-editor',
        style: {
            borderRadius: '8px',
            overflow: 'visible',
            border: '2px dashed #e0e0e0',
            background: '#fafafa',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            width: '100%'
        }
    });

    const buttonWidthOptions = [
        { label: __('Auto', 'twork-builder'), value: 'auto' },
        { label: __('Full Width', 'twork-builder'), value: 'full' },
        { label: __('Custom', 'twork-builder'), value: 'custom' }
    ];

    const buttonAlignmentOptions = [
        { label: __('Left', 'twork-builder'), value: 'left' },
        { label: __('Center', 'twork-builder'), value: 'center' },
        { label: __('Right', 'twork-builder'), value: 'right' }
    ];

    const borderStyleOptions = [
        { label: __('Solid', 'twork-builder'), value: 'solid' },
        { label: __('Dashed', 'twork-builder'), value: 'dashed' },
        { label: __('Dotted', 'twork-builder'), value: 'dotted' },
        { label: __('Double', 'twork-builder'), value: 'double' }
    ];

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={__('Year Settings', 'twork-builder')}
                    initialOpen={true}
                >
                    <PanelColorSettings
                        title={__('Year Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: yearColor,
                                onChange: (val) => setAttributes({ yearColor: val }),
                                label: __('Year Color', 'twork-builder')
                            }
                        ]}
                    />

                    <RangeControl
                        label={__('Font Size (rem)', 'twork-builder')}
                        value={yearFontSize}
                        onChange={(val) => setAttributes({ yearFontSize: val })}
                        min={1}
                        max={4}
                        step={0.1}
                    />

                    <RangeControl
                        label={__('Font Weight', 'twork-builder')}
                        value={yearFontWeight}
                        onChange={(val) => setAttributes({ yearFontWeight: val })}
                        min={100}
                        max={900}
                        step={100}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Heading Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <PanelColorSettings
                        title={__('Heading Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: headingColor,
                                onChange: (val) => setAttributes({ headingColor: val }),
                                label: __('Heading Color', 'twork-builder')
                            }
                        ]}
                    />

                    <RangeControl
                        label={__('Font Size (rem)', 'twork-builder')}
                        value={headingFontSize}
                        onChange={(val) => setAttributes({ headingFontSize: val })}
                        min={0.8}
                        max={3}
                        step={0.1}
                    />

                    <RangeControl
                        label={__('Font Weight', 'twork-builder')}
                        value={headingFontWeight}
                        onChange={(val) => setAttributes({ headingFontWeight: val })}
                        min={100}
                        max={900}
                        step={100}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Description Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <PanelColorSettings
                        title={__('Description Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: descriptionColor,
                                onChange: (val) => setAttributes({ descriptionColor: val }),
                                label: __('Description Color', 'twork-builder')
                            }
                        ]}
                    />

                    <RangeControl
                        label={__('Font Size (rem)', 'twork-builder')}
                        value={descriptionFontSize}
                        onChange={(val) => setAttributes({ descriptionFontSize: val })}
                        min={0.7}
                        max={1.5}
                        step={0.05}
                    />

                    <RangeControl
                        label={__('Line Height', 'twork-builder')}
                        value={descriptionLineHeight}
                        onChange={(val) => setAttributes({ descriptionLineHeight: val })}
                        min={1}
                        max={2.5}
                        step={0.1}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Image Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Show Image', 'twork-builder')}
                        checked={showImage}
                        onChange={(val) => setAttributes({ showImage: val })}
                    />

                    {showImage && (
                        <>
                            {!image ? (
                                <MediaPlaceholder
                                    onSelect={(media) => setAttributes({
                                        image: media.url,
                                        imageId: media.id
                                    })}
                                    allowedTypes={['image']}
                                    multiple={false}
                                    labels={{ title: __('Timeline Image', 'twork-builder') }}
                                />
                            ) : (
                                <div>
                                    <img
                                        src={image}
                                        alt=""
                                        style={{ width: '100%', marginBottom: '10px' }}
                                    />
                                    <Button
                                        isSecondary
                                        isSmall
                                        onClick={() => setAttributes({
                                            image: '',
                                            imageId: null
                                        })}
                                    >
                                        {__('Change Image', 'twork-builder')}
                                    </Button>
                                </div>
                            )}

                            <Divider />

                            <RangeControl
                                label={__('Image Height (px)', 'twork-builder')}
                                value={imageHeight}
                                onChange={(val) => setAttributes({ imageHeight: val })}
                                min={100}
                                max={400}
                                step={10}
                            />

                            <SelectControl
                                label={__('Object Fit', 'twork-builder')}
                                value={imageObjectFit}
                                options={[
                                    { label: __('Cover', 'twork-builder'), value: 'cover' },
                                    { label: __('Contain', 'twork-builder'), value: 'contain' },
                                    { label: __('Fill', 'twork-builder'), value: 'fill' },
                                    { label: __('None', 'twork-builder'), value: 'none' }
                                ]}
                                onChange={(val) => setAttributes({ imageObjectFit: val })}
                            />

                            <SelectControl
                                label={__('Object Position', 'twork-builder')}
                                value={imageObjectPosition}
                                options={[
                                    { label: __('Center', 'twork-builder'), value: 'center' },
                                    { label: __('Top', 'twork-builder'), value: 'top' },
                                    { label: __('Bottom', 'twork-builder'), value: 'bottom' },
                                    { label: __('Left', 'twork-builder'), value: 'left' },
                                    { label: __('Right', 'twork-builder'), value: 'right' }
                                ]}
                                onChange={(val) => setAttributes({ imageObjectPosition: val })}
                            />

                            <RangeControl
                                label={__('Border Radius (px)', 'twork-builder')}
                                value={imageBorderRadius}
                                onChange={(val) => setAttributes({ imageBorderRadius: val })}
                                min={0}
                                max={30}
                                step={1}
                            />

                            <Divider />

                            <ToggleControl
                                label={__('Show Image Overlay', 'twork-builder')}
                                checked={showImageOverlay}
                                onChange={(val) => setAttributes({ showImageOverlay: val })}
                            />

                            {showImageOverlay && (
                                <>
                                    <PanelColorSettings
                                        title={__('Overlay Color', 'twork-builder')}
                                        colorSettings={[
                                            {
                                                value: imageOverlayColor,
                                                onChange: (val) => setAttributes({ imageOverlayColor: val }),
                                                label: __('Overlay Color', 'twork-builder')
                                            }
                                        ]}
                                    />

                                    <RangeControl
                                        label={__('Overlay Opacity', 'twork-builder')}
                                        value={imageOverlayOpacity}
                                        onChange={(val) => setAttributes({ imageOverlayOpacity: val })}
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
                    title={__('Content Styling', 'twork-builder')}
                    initialOpen={false}
                >
                    <PanelColorSettings
                        title={__('Background Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: contentBackgroundColor,
                                onChange: (val) => setAttributes({ contentBackgroundColor: val }),
                                label: __('Background Color', 'twork-builder')
                            }
                        ]}
                    />

                    <RangeControl
                        label={__('Content Padding (px)', 'twork-builder')}
                        value={contentPadding}
                        onChange={(val) => setAttributes({ contentPadding: val })}
                        min={10}
                        max={60}
                        step={5}
                    />

                    <RangeControl
                        label={__('Border Radius (px)', 'twork-builder')}
                        value={contentBorderRadius}
                        onChange={(val) => setAttributes({ contentBorderRadius: val })}
                        min={0}
                        max={30}
                        step={1}
                    />

                    <Divider />

                    <RangeControl
                        label={__('Border Width (px)', 'twork-builder')}
                        value={contentBorderWidth}
                        onChange={(val) => setAttributes({ contentBorderWidth: val })}
                        min={0}
                        max={10}
                        step={1}
                    />

                    {contentBorderWidth > 0 && (
                        <>
                            <PanelColorSettings
                                title={__('Border Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: contentBorderColor,
                                        onChange: (val) => setAttributes({ contentBorderColor: val }),
                                        label: __('Border Color', 'twork-builder')
                                    }
                                ]}
                            />

                            <SelectControl
                                label={__('Border Style', 'twork-builder')}
                                value={contentBorderStyle}
                                options={borderStyleOptions}
                                onChange={(val) => setAttributes({ contentBorderStyle: val })}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody
                    title={__('Content Box Shadow', 'twork-builder')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Enable Box Shadow', 'twork-builder')}
                        checked={contentBoxShadow}
                        onChange={(val) => setAttributes({ contentBoxShadow: val })}
                    />

                    {contentBoxShadow && (
                        <>
                            <PanelColorSettings
                                title={__('Shadow Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: contentBoxShadowColor,
                                        onChange: (val) => setAttributes({ contentBoxShadowColor: val }),
                                        label: __('Shadow Color', 'twork-builder')
                                    }
                                ]}
                            />

                            <RangeControl
                                label={__('Blur (px)', 'twork-builder')}
                                value={contentBoxShadowBlur}
                                onChange={(val) => setAttributes({ contentBoxShadowBlur: val })}
                                min={0}
                                max={100}
                                step={1}
                            />

                            <RangeControl
                                label={__('Spread (px)', 'twork-builder')}
                                value={contentBoxShadowSpread}
                                onChange={(val) => setAttributes({ contentBoxShadowSpread: val })}
                                min={-50}
                                max={50}
                                step={1}
                            />

                            <RangeControl
                                label={__('Offset X (px)', 'twork-builder')}
                                value={contentBoxShadowOffsetX}
                                onChange={(val) => setAttributes({ contentBoxShadowOffsetX: val })}
                                min={-50}
                                max={50}
                                step={1}
                            />

                            <RangeControl
                                label={__('Offset Y (px)', 'twork-builder')}
                                value={contentBoxShadowOffsetY}
                                onChange={(val) => setAttributes({ contentBoxShadowOffsetY: val })}
                                min={-50}
                                max={50}
                                step={1}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody
                    title={__('Button Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Show Button', 'twork-builder')}
                        checked={showButton}
                        onChange={(val) => setAttributes({ showButton: val })}
                    />

                    {showButton && (
                        <>
                            <TextControl
                                label={__('Button Text', 'twork-builder')}
                                value={buttonText}
                                onChange={(val) => setAttributes({ buttonText: val })}
                            />

                            <TextControl
                                label={__('Button URL', 'twork-builder')}
                                value={buttonUrl}
                                onChange={(val) => setAttributes({ buttonUrl: val })}
                                type="url"
                            />

                            <ToggleControl
                                label={__('Open in New Tab', 'twork-builder')}
                                checked={buttonTarget}
                                onChange={(val) => setAttributes({ buttonTarget: val })}
                            />

                            <TextControl
                                label={__('Button Rel', 'twork-builder')}
                                value={buttonRel}
                                onChange={(val) => setAttributes({ buttonRel: val })}
                                help={__('For SEO (e.g., noopener noreferrer)', 'twork-builder')}
                            />

                            <Divider />

                            <SelectControl
                                label={__('Button Style', 'twork-builder')}
                                value={buttonStyle}
                                options={[
                                    { label: __('Primary', 'twork-builder'), value: 'primary' },
                                    { label: __('Secondary', 'twork-builder'), value: 'secondary' },
                                    { label: __('Outline', 'twork-builder'), value: 'outline' },
                                    { label: __('Text', 'twork-builder'), value: 'text' }
                                ]}
                                onChange={(val) => setAttributes({ buttonStyle: val })}
                            />

                            <PanelColorSettings
                                title={__('Button Colors', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: buttonBgColor,
                                        onChange: (val) => setAttributes({ buttonBgColor: val }),
                                        label: __('Background Color', 'twork-builder')
                                    },
                                    {
                                        value: buttonTextColor,
                                        onChange: (val) => setAttributes({ buttonTextColor: val }),
                                        label: __('Text Color', 'twork-builder')
                                    }
                                ]}
                            />

                            <RangeControl
                                label={__('Border Radius (px)', 'twork-builder')}
                                value={buttonBorderRadius}
                                onChange={(val) => setAttributes({ buttonBorderRadius: val })}
                                min={0}
                                max={50}
                                step={1}
                            />

                            <RangeControl
                                label={__('Padding Vertical (px)', 'twork-builder')}
                                value={buttonPaddingVertical}
                                onChange={(val) => setAttributes({ buttonPaddingVertical: val })}
                                min={5}
                                max={30}
                                step={1}
                            />

                            <RangeControl
                                label={__('Padding Horizontal (px)', 'twork-builder')}
                                value={buttonPaddingHorizontal}
                                onChange={(val) => setAttributes({ buttonPaddingHorizontal: val })}
                                min={10}
                                max={60}
                                step={5}
                            />

                            <RangeControl
                                label={__('Font Size (rem)', 'twork-builder')}
                                value={buttonFontSize}
                                onChange={(val) => setAttributes({ buttonFontSize: val })}
                                min={0.7}
                                max={1.5}
                                step={0.05}
                            />

                            <RangeControl
                                label={__('Font Weight', 'twork-builder')}
                                value={buttonFontWeight}
                                onChange={(val) => setAttributes({ buttonFontWeight: val })}
                                min={100}
                                max={900}
                                step={100}
                            />

                            <SelectControl
                                label={__('Text Transform', 'twork-builder')}
                                value={buttonTextTransform}
                                options={[
                                    { label: __('None', 'twork-builder'), value: 'none' },
                                    { label: __('Uppercase', 'twork-builder'), value: 'uppercase' },
                                    { label: __('Lowercase', 'twork-builder'), value: 'lowercase' },
                                    { label: __('Capitalize', 'twork-builder'), value: 'capitalize' }
                                ]}
                                onChange={(val) => setAttributes({ buttonTextTransform: val })}
                            />

                            <Divider />

                            <TextControl
                                label={__('Button Icon (Font Awesome class)', 'twork-builder')}
                                value={buttonIcon}
                                onChange={(val) => setAttributes({ buttonIcon: val })}
                                help={__('e.g., fa-arrow-right', 'twork-builder')}
                            />

                            <SelectControl
                                label={__('Icon Position', 'twork-builder')}
                                value={buttonIconPosition}
                                options={[
                                    { label: __('Left', 'twork-builder'), value: 'left' },
                                    { label: __('Right', 'twork-builder'), value: 'right' }
                                ]}
                                onChange={(val) => setAttributes({ buttonIconPosition: val })}
                            />

                            <Divider />

                            <BaseControl label={__('Button Layout', 'twork-builder')}>
                                <SelectControl
                                    label={__('Button Width', 'twork-builder')}
                                    value={buttonWidth}
                                    options={buttonWidthOptions}
                                    onChange={(val) => setAttributes({ buttonWidth: val })}
                                />

                                {buttonWidth === 'custom' && (
                                    <RangeControl
                                        label={__('Custom Width (px)', 'twork-builder')}
                                        value={buttonWidthCustom}
                                        onChange={(val) => setAttributes({ buttonWidthCustom: val })}
                                        min={100}
                                        max={500}
                                        step={10}
                                        help={__('Custom button width in pixels', 'twork-builder')}
                                    />
                                )}

                                <SelectControl
                                    label={__('Button Alignment', 'twork-builder')}
                                    value={buttonAlignment}
                                    options={buttonAlignmentOptions}
                                    onChange={(val) => setAttributes({ buttonAlignment: val })}
                                />
                            </BaseControl>

                            <Divider />

                            <BaseControl label={__('Button Border', 'twork-builder')}>
                                <RangeControl
                                    label={__('Border Width (px)', 'twork-builder')}
                                    value={buttonBorderWidth}
                                    onChange={(val) => setAttributes({ buttonBorderWidth: val })}
                                    min={0}
                                    max={10}
                                    step={1}
                                />

                                {buttonBorderWidth > 0 && (
                                    <>
                                        <SelectControl
                                            label={__('Border Style', 'twork-builder')}
                                            value={buttonBorderStyle}
                                            options={borderStyleOptions}
                                            onChange={(val) => setAttributes({ buttonBorderStyle: val })}
                                        />
                                        <PanelColorSettings
                                            title={__('Border Color', 'twork-builder')}
                                            colorSettings={[
                                                {
                                                    value: buttonBorderColor,
                                                    onChange: (val) => setAttributes({ buttonBorderColor: val }),
                                                    label: __('Border Color', 'twork-builder')
                                                }
                                            ]}
                                        />
                                    </>
                                )}
                            </BaseControl>

                            <Divider />

                            <BaseControl label={__('Button Spacing', 'twork-builder')}>
                                <RangeControl
                                    label={__('Margin Top (px)', 'twork-builder')}
                                    value={buttonMarginTop}
                                    onChange={(val) => setAttributes({ buttonMarginTop: val })}
                                    min={0}
                                    max={50}
                                    step={1}
                                />
                                <RangeControl
                                    label={__('Margin Bottom (px)', 'twork-builder')}
                                    value={buttonMarginBottom}
                                    onChange={(val) => setAttributes({ buttonMarginBottom: val })}
                                    min={0}
                                    max={50}
                                    step={1}
                                />
                                <RangeControl
                                    label={__('Margin Left (px)', 'twork-builder')}
                                    value={buttonMarginLeft}
                                    onChange={(val) => setAttributes({ buttonMarginLeft: val })}
                                    min={0}
                                    max={50}
                                    step={1}
                                />
                                <RangeControl
                                    label={__('Margin Right (px)', 'twork-builder')}
                                    value={buttonMarginRight}
                                    onChange={(val) => setAttributes({ buttonMarginRight: val })}
                                    min={0}
                                    max={50}
                                    step={1}
                                />
                            </BaseControl>

                            <Divider />

                            <BaseControl label={__('Button Typography', 'twork-builder')}>
                                <RangeControl
                                    label={__('Letter Spacing (px)', 'twork-builder')}
                                    value={buttonLetterSpacing}
                                    onChange={(val) => setAttributes({ buttonLetterSpacing: val })}
                                    min={0}
                                    max={3}
                                    step={0.1}
                                />
                                <RangeControl
                                    label={__('Line Height', 'twork-builder')}
                                    value={buttonLineHeight}
                                    onChange={(val) => setAttributes({ buttonLineHeight: val })}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                />
                            </BaseControl>

                            <Divider />

                            <PanelBody
                                title={__('Button Shadow', 'twork-builder')}
                                initialOpen={false}
                            >
                                <ToggleControl
                                    label={__('Enable Box Shadow', 'twork-builder')}
                                    checked={buttonBoxShadow}
                                    onChange={(val) => setAttributes({ buttonBoxShadow: val })}
                                />

                                {buttonBoxShadow && (
                                    <>
                                        <PanelColorSettings
                                            title={__('Shadow Color', 'twork-builder')}
                                            colorSettings={[
                                                {
                                                    value: buttonBoxShadowColor,
                                                    onChange: (val) => setAttributes({ buttonBoxShadowColor: val }),
                                                    label: __('Shadow Color', 'twork-builder')
                                                }
                                            ]}
                                        />
                                        <RangeControl
                                            label={__('Blur (px)', 'twork-builder')}
                                            value={buttonBoxShadowBlur}
                                            onChange={(val) => setAttributes({ buttonBoxShadowBlur: val })}
                                            min={0}
                                            max={50}
                                            step={1}
                                        />
                                        <RangeControl
                                            label={__('Spread (px)', 'twork-builder')}
                                            value={buttonBoxShadowSpread}
                                            onChange={(val) => setAttributes({ buttonBoxShadowSpread: val })}
                                            min={-20}
                                            max={20}
                                            step={1}
                                        />
                                        <RangeControl
                                            label={__('Offset X (px)', 'twork-builder')}
                                            value={buttonBoxShadowOffsetX}
                                            onChange={(val) => setAttributes({ buttonBoxShadowOffsetX: val })}
                                            min={-20}
                                            max={20}
                                            step={1}
                                        />
                                        <RangeControl
                                            label={__('Offset Y (px)', 'twork-builder')}
                                            value={buttonBoxShadowOffsetY}
                                            onChange={(val) => setAttributes({ buttonBoxShadowOffsetY: val })}
                                            min={-20}
                                            max={20}
                                            step={1}
                                        />
                                    </>
                                )}
                            </PanelBody>

                            <Divider />

                            <PanelBody
                                title={__('Button Hover Effects', 'twork-builder')}
                                initialOpen={false}
                            >
                                <PanelColorSettings
                                    title={__('Hover Colors', 'twork-builder')}
                                    colorSettings={[
                                        {
                                            value: buttonHoverBgColor,
                                            onChange: (val) => setAttributes({ buttonHoverBgColor: val }),
                                            label: __('Hover Background Color', 'twork-builder')
                                        },
                                        {
                                            value: buttonHoverTextColor,
                                            onChange: (val) => setAttributes({ buttonHoverTextColor: val }),
                                            label: __('Hover Text Color', 'twork-builder')
                                        },
                                        {
                                            value: buttonHoverBorderColor,
                                            onChange: (val) => setAttributes({ buttonHoverBorderColor: val }),
                                            label: __('Hover Border Color', 'twork-builder')
                                        }
                                    ]}
                                />

                                <Divider />

                                <RangeControl
                                    label={__('Hover Scale', 'twork-builder')}
                                    value={buttonHoverScale}
                                    onChange={(val) => setAttributes({ buttonHoverScale: val })}
                                    min={0.9}
                                    max={1.2}
                                    step={0.01}
                                    help={__('Scale transformation on hover', 'twork-builder')}
                                />

                                <RangeControl
                                    label={__('Hover Translate Y (px)', 'twork-builder')}
                                    value={buttonHoverTranslateY}
                                    onChange={(val) => setAttributes({ buttonHoverTranslateY: val })}
                                    min={-10}
                                    max={10}
                                    step={1}
                                    help={__('Vertical movement on hover (negative = up)', 'twork-builder')}
                                />

                                <Divider />

                                <ToggleControl
                                    label={__('Enable Hover Shadow', 'twork-builder')}
                                    checked={buttonHoverBoxShadow}
                                    onChange={(val) => setAttributes({ buttonHoverBoxShadow: val })}
                                />

                                {buttonHoverBoxShadow && (
                                    <>
                                        <PanelColorSettings
                                            title={__('Hover Shadow Color', 'twork-builder')}
                                            colorSettings={[
                                                {
                                                    value: buttonHoverBoxShadowColor,
                                                    onChange: (val) => setAttributes({ buttonHoverBoxShadowColor: val }),
                                                    label: __('Hover Shadow Color', 'twork-builder')
                                                }
                                            ]}
                                        />
                                        <RangeControl
                                            label={__('Hover Shadow Blur (px)', 'twork-builder')}
                                            value={buttonHoverBoxShadowBlur}
                                            onChange={(val) => setAttributes({ buttonHoverBoxShadowBlur: val })}
                                            min={0}
                                            max={50}
                                            step={1}
                                        />
                                        <RangeControl
                                            label={__('Hover Shadow Spread (px)', 'twork-builder')}
                                            value={buttonHoverBoxShadowSpread}
                                            onChange={(val) => setAttributes({ buttonHoverBoxShadowSpread: val })}
                                            min={-20}
                                            max={20}
                                            step={1}
                                        />
                                        <RangeControl
                                            label={__('Hover Shadow Offset X (px)', 'twork-builder')}
                                            value={buttonHoverBoxShadowOffsetX}
                                            onChange={(val) => setAttributes({ buttonHoverBoxShadowOffsetX: val })}
                                            min={-20}
                                            max={20}
                                            step={1}
                                        />
                                        <RangeControl
                                            label={__('Hover Shadow Offset Y (px)', 'twork-builder')}
                                            value={buttonHoverBoxShadowOffsetY}
                                            onChange={(val) => setAttributes({ buttonHoverBoxShadowOffsetY: val })}
                                            min={-20}
                                            max={20}
                                            step={1}
                                        />
                                    </>
                                )}

                                <Divider />

                                <RangeControl
                                    label={__('Transition Duration (s)', 'twork-builder')}
                                    value={buttonTransitionDuration}
                                    onChange={(val) => setAttributes({ buttonTransitionDuration: val })}
                                    min={0.1}
                                    max={1}
                                    step={0.1}
                                    help={__('Animation speed for hover effects', 'twork-builder')}
                                />
                            </PanelBody>

                            <Divider />

                            <PanelBody
                                title={__('Button Responsive Settings', 'twork-builder')}
                                initialOpen={false}
                            >
                                <BaseControl label={__('Mobile Settings', 'twork-builder')}>
                                    <RangeControl
                                        label={__('Font Size Mobile (rem)', 'twork-builder')}
                                        value={buttonFontSizeMobile || buttonFontSize}
                                        onChange={(val) => setAttributes({ buttonFontSizeMobile: val })}
                                        min={0.6}
                                        max={2}
                                        step={0.05}
                                        help={__('Font size on mobile devices. Set to 0 to use desktop size.', 'twork-builder')}
                                    />
                                    <RangeControl
                                        label={__('Padding Vertical Mobile (px)', 'twork-builder')}
                                        value={buttonPaddingVerticalMobile || buttonPaddingVertical}
                                        onChange={(val) => setAttributes({ buttonPaddingVerticalMobile: val })}
                                        min={0}
                                        max={30}
                                        step={1}
                                        help={__('Vertical padding on mobile. Set to 0 to use desktop value.', 'twork-builder')}
                                    />
                                    <RangeControl
                                        label={__('Padding Horizontal Mobile (px)', 'twork-builder')}
                                        value={buttonPaddingHorizontalMobile || buttonPaddingHorizontal}
                                        onChange={(val) => setAttributes({ buttonPaddingHorizontalMobile: val })}
                                        min={0}
                                        max={60}
                                        step={1}
                                        help={__('Horizontal padding on mobile. Set to 0 to use desktop value.', 'twork-builder')}
                                    />
                                </BaseControl>
                            </PanelBody>
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="timeline-dot" style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '20px',
                    height: '20px',
                    background: '#fff',
                    border: '4px solid #f48b2a',
                    borderRadius: '50%',
                    zIndex: 4,
                    boxShadow: '0 0 0 5px rgba(255, 255, 255, 0.8)',
                    pointerEvents: 'none'
                }} />
                
                {showImage && image ? (
                    <div className="timeline-image-wrapper" style={{ 
                        position: 'relative', 
                        width: '45%', 
                        flex: '0 0 45%',
                        marginBottom: 0
                    }}>
                        <img
                            src={image}
                            alt=""
                            style={{
                                width: '100%',
                                height: `${imageHeight}px`,
                                objectFit: imageObjectFit,
                                objectPosition: imageObjectPosition,
                                display: 'block',
                                borderRadius: `${imageBorderRadius}px`
                            }}
                        />
                        {showImageOverlay && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: imageOverlayColor,
                                opacity: imageOverlayOpacity,
                                borderRadius: `${imageBorderRadius}px`,
                                pointerEvents: 'none'
                            }} />
                        )}
                    </div>
                ) : null}

                <div className="timeline-content" style={{
                    width: '45%',
                    flex: '0 0 45%',
                    padding: `${contentPadding}px`,
                    background: contentBackgroundColor || '#fff',
                    borderRadius: `${contentBorderRadius}px`,
                    borderWidth: `${contentBorderWidth}px`,
                    borderColor: contentBorderColor,
                    borderStyle: contentBorderStyle,
                    boxShadow: contentBoxShadow
                        ? `${contentBoxShadowOffsetX}px ${contentBoxShadowOffsetY}px ${contentBoxShadowBlur}px ${contentBoxShadowSpread}px ${contentBoxShadowColor}`
                        : '0 5px 15px rgba(0, 0, 0, 0.05)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <RichText
                        tagName="h3"
                        value={year}
                        onChange={(val) => setAttributes({ year: val })}
                        placeholder={__('Year...', 'twork-builder')}
                        className="timeline-year"
                        style={{
                            fontSize: `${yearFontSize}rem`,
                            fontWeight: yearFontWeight,
                            color: yearColor || '#f48b2a',
                            marginTop: 0,
                            marginBottom: '10px',
                            lineHeight: 1.2
                        }}
                    />

                    <RichText
                        tagName="h4"
                        value={heading}
                        onChange={(val) => setAttributes({ heading: val })}
                        placeholder={__('Heading...', 'twork-builder')}
                        className="timeline-heading"
                        style={{
                            fontSize: `${headingFontSize}rem`,
                            fontWeight: headingFontWeight,
                            color: headingColor || '#212121',
                            marginTop: 0,
                            marginBottom: '10px',
                            lineHeight: 1.3
                        }}
                    />

                    <RichText
                        tagName="p"
                        value={description}
                        onChange={(val) => setAttributes({ description: val })}
                        placeholder={__('Description...', 'twork-builder')}
                        className="timeline-description"
                        style={{
                            fontSize: `${descriptionFontSize}rem`,
                            lineHeight: descriptionLineHeight,
                            color: descriptionColor || '#666',
                            marginBottom: showButton ? '20px' : '0',
                            marginTop: 0
                        }}
                    />

                    {showButton && (
                        <div
                            className="timeline-button-wrapper"
                            style={{
                                marginTop: 'auto',
                                width: buttonWidth === 'full' ? '100%' : buttonWidth === 'custom' ? `${buttonWidthCustom}px` : 'auto',
                                textAlign: buttonAlignment,
                                marginTop: `${buttonMarginTop}px`,
                                marginBottom: `${buttonMarginBottom}px`,
                                marginLeft: `${buttonMarginLeft}px`,
                                marginRight: `${buttonMarginRight}px`,
                                '--button-font-size-mobile': buttonFontSizeMobile > 0 ? `${buttonFontSizeMobile}rem` : `${buttonFontSize}rem`,
                                '--button-padding-vertical-mobile': buttonPaddingVerticalMobile > 0 ? `${buttonPaddingVerticalMobile}px` : `${buttonPaddingVertical}px`,
                                '--button-padding-horizontal-mobile': buttonPaddingHorizontalMobile > 0 ? `${buttonPaddingHorizontalMobile}px` : `${buttonPaddingHorizontal}px`
                            }}
                        >
                            <a
                                href={buttonUrl}
                                target={buttonTarget ? '_blank' : '_self'}
                                rel={buttonRel}
                                className="timeline-button"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    backgroundColor: buttonBgColor,
                                    color: buttonTextColor,
                                    padding: `${buttonPaddingVertical}px ${buttonPaddingHorizontal}px`,
                                    borderRadius: `${buttonBorderRadius}px`,
                                    fontSize: `${buttonFontSize}rem`,
                                    fontWeight: buttonFontWeight,
                                    textTransform: buttonTextTransform,
                                    letterSpacing: `${buttonLetterSpacing}px`,
                                    lineHeight: buttonLineHeight,
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    borderWidth: `${buttonBorderWidth}px`,
                                    borderStyle: buttonBorderStyle,
                                    borderColor: buttonBorderColor,
                                    boxShadow: buttonBoxShadow
                                        ? `${buttonBoxShadowOffsetX}px ${buttonBoxShadowOffsetY}px ${buttonBoxShadowBlur}px ${buttonBoxShadowSpread}px ${buttonBoxShadowColor}`
                                        : 'none',
                                    transition: `all ${buttonTransitionDuration}s ease`,
                                    width: buttonWidth === 'full' ? '100%' : buttonWidth === 'custom' ? `${buttonWidthCustom}px` : 'auto',
                                    justifyContent: buttonAlignment === 'center' ? 'center' : buttonAlignment === 'right' ? 'flex-end' : 'flex-start',
                                    '--hover-bg-color': buttonHoverBgColor || buttonBgColor,
                                    '--hover-text-color': buttonHoverTextColor || buttonTextColor,
                                    '--hover-border-color': buttonHoverBorderColor || buttonBorderColor,
                                    '--hover-scale': buttonHoverScale || 1,
                                    '--hover-translate-y': `${buttonHoverTranslateY || 0}px`,
                                    '--hover-shadow': buttonHoverBoxShadow && (buttonHoverBoxShadowColor || buttonBoxShadowColor)
                                        ? `${buttonHoverBoxShadowOffsetX || 0}px ${buttonHoverBoxShadowOffsetY || 0}px ${buttonHoverBoxShadowBlur || 0}px ${buttonHoverBoxShadowSpread || 0}px ${buttonHoverBoxShadowColor || buttonBoxShadowColor}`
                                        : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (buttonHoverBgColor) e.target.style.backgroundColor = buttonHoverBgColor;
                                    if (buttonHoverTextColor) e.target.style.color = buttonHoverTextColor;
                                    if (buttonHoverBorderColor && buttonBorderWidth > 0) e.target.style.borderColor = buttonHoverBorderColor;
                                    if (buttonHoverBoxShadow) {
                                        e.target.style.boxShadow = `${buttonHoverBoxShadowOffsetX}px ${buttonHoverBoxShadowOffsetY}px ${buttonHoverBoxShadowBlur}px ${buttonHoverBoxShadowSpread}px ${buttonHoverBoxShadowColor || buttonBoxShadowColor}`;
                                    }
                                    e.target.style.transform = `translateY(${buttonHoverTranslateY}px) scale(${buttonHoverScale})`;
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = buttonBgColor;
                                    e.target.style.color = buttonTextColor;
                                    if (buttonBorderWidth > 0) e.target.style.borderColor = buttonBorderColor;
                                    e.target.style.boxShadow = buttonBoxShadow
                                        ? `${buttonBoxShadowOffsetX}px ${buttonBoxShadowOffsetY}px ${buttonBoxShadowBlur}px ${buttonBoxShadowSpread}px ${buttonBoxShadowColor}`
                                        : 'none';
                                    e.target.style.transform = 'translateY(0) scale(1)';
                                }}
                                onClick={(e) => e.preventDefault()}
                            >
                                {buttonIcon && buttonIconPosition === 'left' && (
                                    <i className={`fa ${buttonIcon}`} aria-hidden="true" />
                                )}
                                {buttonText}
                                {buttonIcon && buttonIconPosition === 'right' && (
                                    <i className={`fa ${buttonIcon}`} aria-hidden="true" />
                                )}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
