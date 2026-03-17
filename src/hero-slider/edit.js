/**
 * Hero Slider Block Editor Component
 *
 * Professional editor interface for the Hero Slider block.
 * Plain CSS/JS only – no GSAP, Swiper, or other slider libraries.
 * Provides comprehensive controls for slide content, styling, and slider settings.
 *
 * Features:
 * - Multiple slides management
 * - Rich content editing (meta title, title, description)
 * - Background image upload
 * - Customizable separator bar
 * - Button configuration (primary & secondary)
 * - Responsive typography controls
 * - Slider effects and autoplay settings
 *
 * @param {Object} props Component props
 * @param {Object} props.attributes Block attributes
 * @param {Function} props.setAttributes Function to update block attributes
 * @returns {JSX.Element} The editor interface
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    SelectControl,
    Button,
    TextControl,
    ToggleControl,
    __experimentalUnitControl as UnitControl,
    BaseControl,
    ColorPalette,
    TextareaControl
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { slides, autoplayDelay, effect } = attributes;
    const blockProps = useBlockProps({
        className: 'twork-hero-slider-editor hero-section hero-slider',
    });

    const updateSlide = (index, field, value) => {
        const newSlides = [...slides];
        newSlides[index] = { ...newSlides[index], [field]: value };
        setAttributes({ slides: newSlides });
    };

    const addSlide = () => {
        setAttributes({
            slides: [
                ...slides,
                {
                    metaTitle: '',
                    metaTitleFontSize: '0.75rem',
                    metaTitleColor: 'rgba(255, 255, 255, 0.9)',
                    metaTitleLetterSpacing: '3px',
                    metaTitleFontSizeMobile: '0.65rem',
                    metaTitleLetterSpacingMobile: '2px',
                    showSeparator: true,
                    separatorColor: '#f48b2a',
                    separatorWidth: '60px',
                    separatorHeight: '3px',
                    separatorBorderRadius: '2px',
                    separatorOpacity: '1',
                    separatorAlignment: 'center',
                    separatorMarginTop: '0px',
                    separatorMarginBottom: '20px',
                    separatorWidthMobile: '50px',
                    separatorHeightMobile: '2px',
                    separatorMarginBottomMobile: '15px',
                    title: 'New Slide',
                    titlePart1Color: '#f48b2a',
                    titlePart2Color: '#2c3e50',
                    titleFontSize: '4.5rem',
                    titleLineHeight: '1.1',
                    titleFontWeight: '900',
                    titleFontSizeTablet: '3.5rem',
                    titleFontSizeMobile: '2.2rem',
                    description: '',
                    descriptionFontSize: '1.25rem',
                    descriptionColor: 'rgba(255, 255, 255, 0.95)',
                    descriptionLineHeight: '1.8',
                    descriptionFontSizeTablet: '1.1rem',
                    descriptionFontSizeMobile: '0.95rem',
                    descriptionLineHeightMobile: '1.6',
                    backgroundImage: '',
                    primaryButtonText: '',
                    primaryButtonLink: '#',
                    primaryButtonFontSize: '0.9rem',
                    primaryButtonPadding: '16px 40px',
                    primaryButtonFontSizeMobile: '0.85rem',
                    primaryButtonPaddingMobile: '14px 30px',
                    secondaryButtonText: '',
                    secondaryButtonLink: '#',
                    secondaryButtonFontSize: '0.9rem',
                    secondaryButtonPadding: '16px 40px',
                    secondaryButtonFontSizeMobile: '0.85rem',
                    secondaryButtonPaddingMobile: '14px 30px',
                },
            ],
        });
    };

    const removeSlide = (index) => {
        if (slides.length > 1) {
            const newSlides = slides.filter((_, i) => i !== index);
            setAttributes({ slides: newSlides });
        }
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Slider Settings', 'twork-builder')} initialOpen={false}>
                    <SelectControl
                        label={__('Transition Effect', 'twork-builder')}
                        value={effect}
                        options={[
                            { label: 'Fade', value: 'fade' },
                            { label: 'Slide', value: 'slide' },
                            { label: 'Cube', value: 'cube' },
                        ]}
                        onChange={(value) => setAttributes({ effect: value })}
                        help={__('Choose the transition effect between slides. Fade provides a smooth crossfade effect.', 'twork-builder')}
                    />
                    <RangeControl
                        label={__('Autoplay Delay', 'twork-builder')}
                        value={autoplayDelay}
                        onChange={(value) => setAttributes({ autoplayDelay: value })}
                        min={1000}
                        max={10000}
                        step={500}
                        help={__('Time in milliseconds before automatically advancing to the next slide. Recommended: 4000-5000ms.', 'twork-builder')}
                    />
                </PanelBody>

                <PanelBody title={__('Slides', 'twork-builder')} initialOpen={true}>
                    {slides.map((slide, index) => (
                        <PanelBody
                            key={`slide-${index}`}
                            title={__('Slide', 'twork-builder') + ' ' + (index + 1)}
                            initialOpen={index === 0}
                        >
                            {/* Content */}
                            <PanelBody title={__('Content', 'twork-builder')} initialOpen={true}>
                                <TextControl
                                    label={__('Meta Title', 'twork-builder')}
                                    value={slide.metaTitle || ''}
                                    onChange={(value) => updateSlide(index, 'metaTitle', value)}
                                    help={__('Small uppercase text above the main title', 'twork-builder')}
                                />
                                <BaseControl
                                    label={__('Title', 'twork-builder')}
                                    help={__('Main heading for the slide. Use &lt;br&gt; for line breaks. Example: "Caring with&lt;br&gt;Compassion"', 'twork-builder')}
                                >
                                    <TextareaControl
                                        value={slide.title || ''}
                                        onChange={(value) => updateSlide(index, 'title', value)}
                                        rows={3}
                                        placeholder={__('Enter title (use &lt;br&gt; for line breaks)', 'twork-builder')}
                                    />
                                </BaseControl>
                                <TextareaControl
                                    label={__('Description', 'twork-builder')}
                                    value={slide.description || ''}
                                    onChange={(value) => updateSlide(index, 'description', value)}
                                    rows={3}
                                    placeholder={__('Enter a compelling description for your slide', 'twork-builder')}
                                    help={__('Supporting text that appears below the title. Keep it concise and engaging.', 'twork-builder')}
                                />
                                <BaseControl
                                    label={__('Background Image', 'twork-builder')}
                                    className="hero-slider-image-control"
                                    help={__('Upload a high-quality background image. Recommended size: 1920x700px or larger. A dark overlay will be automatically applied.', 'twork-builder')}
                                >
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={(media) => updateSlide(index, 'backgroundImage', media.url)}
                                            allowedTypes={['image']}
                                            value={slide.backgroundImage}
                                            render={({ open }) => (
                                                <div style={{ marginTop: '8px' }}>
                                                    {slide.backgroundImage && (
                                                        <img
                                                            src={slide.backgroundImage}
                                                            alt="Background"
                                                            style={{
                                                                width: '100%',
                                                                maxWidth: '300px',
                                                                marginBottom: '8px',
                                                                borderRadius: '4px',
                                                                display: 'block',
                                                                border: '1px solid #ddd',
                                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                            }}
                                                        />
                                                    )}
                                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                        <Button isPrimary onClick={open} variant="primary">
                                                            {slide.backgroundImage
                                                                ? __('Change Image', 'twork-builder')
                                                                : __('Select Image', 'twork-builder')}
                                                        </Button>
                                                        {slide.backgroundImage && (
                                                            <Button
                                                                isDestructive
                                                                onClick={() => updateSlide(index, 'backgroundImage', '')}
                                                                variant="secondary"
                                                            >
                                                                {__('Remove', 'twork-builder')}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </MediaUploadCheck>
                                </BaseControl>
                            </PanelBody>

                            {/* Separator */}
                            <PanelBody title={__('Separator Bar', 'twork-builder')} initialOpen={false}>
                                <ToggleControl
                                    label={__('Show Separator', 'twork-builder')}
                                    checked={slide.showSeparator !== false}
                                    onChange={(value) => updateSlide(index, 'showSeparator', value)}
                                />
                                {slide.showSeparator !== false && (
                                    <>
                                        <PanelBody title={__('Color', 'twork-builder')} initialOpen={true}>
                                            <BaseControl label={__('Color', 'twork-builder')} help={__('Select a color from the palette or enter a custom hex code', 'twork-builder')}>
                                                <ColorPalette
                                                    value={slide.separatorColor || '#f48b2a'}
                                                    onChange={(value) => updateSlide(index, 'separatorColor', value)}
                                                    colors={[
                                                        { name: 'Orange', color: '#f48b2a' },
                                                        { name: 'Red', color: '#dc3545' },
                                                        { name: 'Blue', color: '#007bff' },
                                                        { name: 'Green', color: '#28a745' },
                                                        { name: 'Dark', color: '#2c3e50' },
                                                        { name: 'White', color: '#ffffff' },
                                                    ]}
                                                />
                                                <TextControl
                                                    value={slide.separatorColor || '#f48b2a'}
                                                    onChange={(value) => updateSlide(index, 'separatorColor', value)}
                                                    placeholder="#f48b2a"
                                                    style={{ marginTop: '12px' }}
                                                />
                                            </BaseControl>
                                        </PanelBody>

                                        <PanelBody title={__('Size', 'twork-builder')} initialOpen={true}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                                <BaseControl>
                                                    <UnitControl
                                                        label={__('Width', 'twork-builder')}
                                                        value={slide.separatorWidth || '60px'}
                                                        onChange={(value) => updateSlide(index, 'separatorWidth', value || '60px')}
                                                        units={[
                                                            { value: 'px', label: 'px' },
                                                            { value: 'rem', label: 'rem' },
                                                        ]}
                                                    />
                                                </BaseControl>
                                                <BaseControl>
                                                    <UnitControl
                                                        label={__('Height', 'twork-builder')}
                                                        value={slide.separatorHeight || '3px'}
                                                        onChange={(value) => updateSlide(index, 'separatorHeight', value || '3px')}
                                                        units={[
                                                            { value: 'px', label: 'px' },
                                                            { value: 'rem', label: 'rem' },
                                                        ]}
                                                    />
                                                </BaseControl>
                                            </div>
                                            <BaseControl>
                                                <UnitControl
                                                    label={__('Border Radius', 'twork-builder')}
                                                    value={slide.separatorBorderRadius || '2px'}
                                                    onChange={(value) => updateSlide(index, 'separatorBorderRadius', value || '2px')}
                                                    units={[
                                                        { value: 'px', label: 'px' },
                                                        { value: 'rem', label: 'rem' },
                                                    ]}
                                                />
                                            </BaseControl>
                                        </PanelBody>

                                        <PanelBody title={__('Appearance', 'twork-builder')} initialOpen={false}>
                                            <BaseControl help={__('Control the transparency of the separator bar', 'twork-builder')}>
                                                <RangeControl
                                                    label={__('Opacity', 'twork-builder')}
                                                    value={parseFloat(slide.separatorOpacity || '1')}
                                                    onChange={(value) => updateSlide(index, 'separatorOpacity', value.toString())}
                                                    min={0}
                                                    max={1}
                                                    step={0.1}
                                                />
                                            </BaseControl>
                                            <BaseControl help={__('Horizontal alignment of the separator bar', 'twork-builder')}>
                                                <SelectControl
                                                    label={__('Alignment', 'twork-builder')}
                                                    value={slide.separatorAlignment || 'center'}
                                                    options={[
                                                        { label: 'Left', value: 'left' },
                                                        { label: 'Center', value: 'center' },
                                                        { label: 'Right', value: 'right' },
                                                    ]}
                                                    onChange={(value) => updateSlide(index, 'separatorAlignment', value)}
                                                />
                                            </BaseControl>
                                        </PanelBody>

                                        <PanelBody title={__('Spacing', 'twork-builder')} initialOpen={false}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                                <BaseControl>
                                                    <UnitControl
                                                        label={__('Margin Top', 'twork-builder')}
                                                        value={slide.separatorMarginTop || '0px'}
                                                        onChange={(value) => updateSlide(index, 'separatorMarginTop', value || '0px')}
                                                        units={[
                                                            { value: 'px', label: 'px' },
                                                            { value: 'rem', label: 'rem' },
                                                        ]}
                                                    />
                                                </BaseControl>
                                                <BaseControl>
                                                    <UnitControl
                                                        label={__('Margin Bottom', 'twork-builder')}
                                                        value={slide.separatorMarginBottom || '20px'}
                                                        onChange={(value) => updateSlide(index, 'separatorMarginBottom', value || '20px')}
                                                        units={[
                                                            { value: 'px', label: 'px' },
                                                            { value: 'rem', label: 'rem' },
                                                        ]}
                                                    />
                                                </BaseControl>
                                            </div>
                                        </PanelBody>

                                        <PanelBody title={__('Mobile Settings', 'twork-builder')} initialOpen={false}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                                <BaseControl>
                                                    <UnitControl
                                                        label={__('Width', 'twork-builder')}
                                                        value={slide.separatorWidthMobile || '50px'}
                                                        onChange={(value) => updateSlide(index, 'separatorWidthMobile', value || '50px')}
                                                        units={[
                                                            { value: 'px', label: 'px' },
                                                            { value: 'rem', label: 'rem' },
                                                        ]}
                                                    />
                                                </BaseControl>
                                                <BaseControl>
                                                    <UnitControl
                                                        label={__('Height', 'twork-builder')}
                                                        value={slide.separatorHeightMobile || '2px'}
                                                        onChange={(value) => updateSlide(index, 'separatorHeightMobile', value || '2px')}
                                                        units={[
                                                            { value: 'px', label: 'px' },
                                                            { value: 'rem', label: 'rem' },
                                                        ]}
                                                    />
                                                </BaseControl>
                                            </div>
                                            <BaseControl>
                                                <UnitControl
                                                    label={__('Margin Bottom', 'twork-builder')}
                                                    value={slide.separatorMarginBottomMobile || '15px'}
                                                    onChange={(value) => updateSlide(index, 'separatorMarginBottomMobile', value || '15px')}
                                                    units={[
                                                        { value: 'px', label: 'px' },
                                                        { value: 'rem', label: 'rem' },
                                                    ]}
                                                />
                                            </BaseControl>
                                        </PanelBody>
                                    </>
                                )}
                            </PanelBody>

                            {/* Typography */}
                            <PanelBody title={__('Typography', 'twork-builder')} initialOpen={false}>
                                <PanelBody title={__('Meta Title', 'twork-builder')} initialOpen={false}>
                                    <PanelBody title={__('Color', 'twork-builder')} initialOpen={true}>
                                        <BaseControl
                                            label={__('Color', 'twork-builder')}
                                            help={__('Color value (rgba or hex, e.g., rgba(255, 255, 255, 0.9) or #ffffff)', 'twork-builder')}
                                        >
                                            <TextControl
                                                value={slide.metaTitleColor || 'rgba(255, 255, 255, 0.9)'}
                                                onChange={(value) => updateSlide(index, 'metaTitleColor', value)}
                                                placeholder="rgba(255, 255, 255, 0.9)"
                                            />
                                        </BaseControl>
                                    </PanelBody>
                                    <PanelBody title={__('Typography', 'twork-builder')} initialOpen={true}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <BaseControl>
                                                <UnitControl
                                                    label={__('Font Size', 'twork-builder')}
                                                    value={slide.metaTitleFontSize || '0.75rem'}
                                                    onChange={(value) => updateSlide(index, 'metaTitleFontSize', value || '0.75rem')}
                                                    units={[
                                                        { value: 'rem', label: 'rem' },
                                                        { value: 'px', label: 'px' },
                                                    ]}
                                                />
                                            </BaseControl>
                                            <BaseControl>
                                                <UnitControl
                                                    label={__('Letter Spacing', 'twork-builder')}
                                                    value={slide.metaTitleLetterSpacing || '3px'}
                                                    onChange={(value) => updateSlide(index, 'metaTitleLetterSpacing', value || '3px')}
                                                    units={[
                                                        { value: 'px', label: 'px' },
                                                    ]}
                                                />
                                            </BaseControl>
                                        </div>
                                    </PanelBody>
                                    <PanelBody title={__('Mobile Settings', 'twork-builder')} initialOpen={false}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <BaseControl>
                                                <UnitControl
                                                    label={__('Font Size', 'twork-builder')}
                                                    value={slide.metaTitleFontSizeMobile || '0.65rem'}
                                                    onChange={(value) => updateSlide(index, 'metaTitleFontSizeMobile', value || '0.65rem')}
                                                    units={[
                                                        { value: 'rem', label: 'rem' },
                                                        { value: 'px', label: 'px' },
                                                    ]}
                                                />
                                            </BaseControl>
                                            <BaseControl>
                                                <UnitControl
                                                    label={__('Letter Spacing', 'twork-builder')}
                                                    value={slide.metaTitleLetterSpacingMobile || '2px'}
                                                    onChange={(value) => updateSlide(index, 'metaTitleLetterSpacingMobile', value || '2px')}
                                                    units={[
                                                        { value: 'px', label: 'px' },
                                                    ]}
                                                />
                                            </BaseControl>
                                        </div>
                                    </PanelBody>
                                </PanelBody>

                                <PanelBody title={__('Title', 'twork-builder')} initialOpen={false}>
                                    <PanelBody title={__('Colors', 'twork-builder')} initialOpen={true}>
                                        <BaseControl
                                            label={__('Part 1 Color (First Line)', 'twork-builder')}
                                            help={__('Color for the first line of the title', 'twork-builder')}
                                        >
                                            <ColorPalette
                                                value={slide.titlePart1Color || '#f48b2a'}
                                                onChange={(value) => updateSlide(index, 'titlePart1Color', value)}
                                                colors={[
                                                    { name: 'Orange', color: '#f48b2a' },
                                                    { name: 'Red', color: '#dc3545' },
                                                    { name: 'Blue', color: '#007bff' },
                                                    { name: 'Green', color: '#28a745' },
                                                    { name: 'Dark', color: '#2c3e50' },
                                                    { name: 'White', color: '#ffffff' },
                                                ]}
                                            />
                                            <TextControl
                                                value={slide.titlePart1Color || '#f48b2a'}
                                                onChange={(value) => updateSlide(index, 'titlePart1Color', value)}
                                                placeholder="#f48b2a"
                                                style={{ marginTop: '12px' }}
                                            />
                                        </BaseControl>
                                        <BaseControl
                                            label={__('Part 2 Color (Second Line)', 'twork-builder')}
                                            help={__('Color for the second line of the title', 'twork-builder')}
                                        >
                                            <ColorPalette
                                                value={slide.titlePart2Color || '#2c3e50'}
                                                onChange={(value) => updateSlide(index, 'titlePart2Color', value)}
                                                colors={[
                                                    { name: 'Orange', color: '#f48b2a' },
                                                    { name: 'Red', color: '#dc3545' },
                                                    { name: 'Blue', color: '#007bff' },
                                                    { name: 'Green', color: '#28a745' },
                                                    { name: 'Dark', color: '#2c3e50' },
                                                    { name: 'White', color: '#ffffff' },
                                                ]}
                                            />
                                            <TextControl
                                                value={slide.titlePart2Color || '#2c3e50'}
                                                onChange={(value) => updateSlide(index, 'titlePart2Color', value)}
                                                placeholder="#2c3e50"
                                                style={{ marginTop: '12px' }}
                                            />
                                        </BaseControl>
                                    </PanelBody>
                                    <PanelBody title={__('Typography', 'twork-builder')} initialOpen={true}>
                                        <BaseControl>
                                            <UnitControl
                                                label={__('Font Size', 'twork-builder')}
                                                value={slide.titleFontSize || '4.5rem'}
                                                onChange={(value) => updateSlide(index, 'titleFontSize', value || '4.5rem')}
                                                units={[
                                                    { value: 'rem', label: 'rem' },
                                                    { value: 'px', label: 'px' },
                                                ]}
                                            />
                                        </BaseControl>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <BaseControl>
                                                <UnitControl
                                                    label={__('Line Height', 'twork-builder')}
                                                    value={slide.titleLineHeight || '1.1'}
                                                    onChange={(value) => updateSlide(index, 'titleLineHeight', value || '1.1')}
                                                    units={[
                                                        { value: '', label: 'Unitless' },
                                                    ]}
                                                />
                                            </BaseControl>
                                            <BaseControl>
                                                <RangeControl
                                                    label={__('Font Weight', 'twork-builder')}
                                                    value={parseInt(slide.titleFontWeight || '900')}
                                                    onChange={(value) => updateSlide(index, 'titleFontWeight', value.toString())}
                                                    min={100}
                                                    max={900}
                                                    step={100}
                                                />
                                            </BaseControl>
                                        </div>
                                    </PanelBody>
                                    <PanelBody title={__('Responsive Settings', 'twork-builder')} initialOpen={false}>
                                        <BaseControl help={__('Font size for tablet devices (≤1200px)', 'twork-builder')}>
                                            <UnitControl
                                                label={__('Tablet Font Size', 'twork-builder')}
                                                value={slide.titleFontSizeTablet || '3.5rem'}
                                                onChange={(value) => updateSlide(index, 'titleFontSizeTablet', value || '3.5rem')}
                                                units={[
                                                    { value: 'rem', label: 'rem' },
                                                    { value: 'px', label: 'px' },
                                                ]}
                                            />
                                        </BaseControl>
                                        <BaseControl help={__('Font size for mobile devices (≤768px)', 'twork-builder')}>
                                            <UnitControl
                                                label={__('Mobile Font Size', 'twork-builder')}
                                                value={slide.titleFontSizeMobile || '2.2rem'}
                                                onChange={(value) => updateSlide(index, 'titleFontSizeMobile', value || '2.2rem')}
                                                units={[
                                                    { value: 'rem', label: 'rem' },
                                                    { value: 'px', label: 'px' },
                                                ]}
                                            />
                                        </BaseControl>
                                    </PanelBody>
                                </PanelBody>

                                <PanelBody title={__('Description', 'twork-builder')} initialOpen={false}>
                                    <PanelBody title={__('Color', 'twork-builder')} initialOpen={true}>
                                        <BaseControl
                                            label={__('Color', 'twork-builder')}
                                            help={__('Color value (rgba or hex, e.g., rgba(255, 255, 255, 0.95) or #ffffff)', 'twork-builder')}
                                        >
                                            <TextControl
                                                value={slide.descriptionColor || 'rgba(255, 255, 255, 0.95)'}
                                                onChange={(value) => updateSlide(index, 'descriptionColor', value)}
                                                placeholder="rgba(255, 255, 255, 0.95)"
                                            />
                                        </BaseControl>
                                    </PanelBody>
                                    <PanelBody title={__('Typography', 'twork-builder')} initialOpen={true}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <BaseControl>
                                                <UnitControl
                                                    label={__('Font Size', 'twork-builder')}
                                                    value={slide.descriptionFontSize || '1.25rem'}
                                                    onChange={(value) => updateSlide(index, 'descriptionFontSize', value || '1.25rem')}
                                                    units={[
                                                        { value: 'rem', label: 'rem' },
                                                        { value: 'px', label: 'px' },
                                                    ]}
                                                />
                                            </BaseControl>
                                            <BaseControl>
                                                <UnitControl
                                                    label={__('Line Height', 'twork-builder')}
                                                    value={slide.descriptionLineHeight || '1.8'}
                                                    onChange={(value) => updateSlide(index, 'descriptionLineHeight', value || '1.8')}
                                                    units={[
                                                        { value: '', label: 'Unitless' },
                                                    ]}
                                                />
                                            </BaseControl>
                                        </div>
                                    </PanelBody>
                                    <PanelBody title={__('Responsive Settings', 'twork-builder')} initialOpen={false}>
                                        <BaseControl help={__('Font size for tablet devices (≤1200px)', 'twork-builder')}>
                                            <UnitControl
                                                label={__('Tablet Font Size', 'twork-builder')}
                                                value={slide.descriptionFontSizeTablet || '1.1rem'}
                                                onChange={(value) => updateSlide(index, 'descriptionFontSizeTablet', value || '1.1rem')}
                                                units={[
                                                    { value: 'rem', label: 'rem' },
                                                    { value: 'px', label: 'px' },
                                                ]}
                                            />
                                        </BaseControl>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <BaseControl>
                                                <UnitControl
                                                    label={__('Mobile Font Size', 'twork-builder')}
                                                    value={slide.descriptionFontSizeMobile || '0.95rem'}
                                                    onChange={(value) => updateSlide(index, 'descriptionFontSizeMobile', value || '0.95rem')}
                                                    units={[
                                                        { value: 'rem', label: 'rem' },
                                                        { value: 'px', label: 'px' },
                                                    ]}
                                                />
                                            </BaseControl>
                                            <BaseControl>
                                                <UnitControl
                                                    label={__('Mobile Line Height', 'twork-builder')}
                                                    value={slide.descriptionLineHeightMobile || '1.6'}
                                                    onChange={(value) => updateSlide(index, 'descriptionLineHeightMobile', value || '1.6')}
                                                    units={[
                                                        { value: '', label: 'Unitless' },
                                                    ]}
                                                />
                                            </BaseControl>
                                        </div>
                                    </PanelBody>
                                </PanelBody>
                            </PanelBody>

                            {/* Buttons */}
                            <PanelBody title={__('Buttons', 'twork-builder')} initialOpen={false}>
                                <PanelBody
                                    title={__('Primary Button', 'twork-builder')}
                                    initialOpen={false}
                                    className="hero-slider-button-panel"
                                >
                                    <PanelBody title={__('Content', 'twork-builder')} initialOpen={true}>
                                        <BaseControl>
                                            <TextControl
                                                label={__('Button Text', 'twork-builder')}
                                                value={slide.primaryButtonText || ''}
                                                onChange={(value) => updateSlide(index, 'primaryButtonText', value)}
                                            />
                                        </BaseControl>
                                        <BaseControl>
                                            <TextControl
                                                label={__('Button Link', 'twork-builder')}
                                                value={slide.primaryButtonLink || '#'}
                                                onChange={(value) => updateSlide(index, 'primaryButtonLink', value)}
                                                help={__('URL for the button link', 'twork-builder')}
                                            />
                                        </BaseControl>
                                    </PanelBody>
                                    <PanelBody title={__('Typography & Spacing', 'twork-builder')} initialOpen={true}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <BaseControl>
                                                <UnitControl
                                                    label={__('Font Size', 'twork-builder')}
                                                    value={slide.primaryButtonFontSize || '0.9rem'}
                                                    onChange={(value) => updateSlide(index, 'primaryButtonFontSize', value || '0.9rem')}
                                                    units={[
                                                        { value: 'rem', label: 'rem' },
                                                        { value: 'px', label: 'px' },
                                                    ]}
                                                />
                                            </BaseControl>
                                            <BaseControl>
                                                <TextControl
                                                    label={__('Padding', 'twork-builder')}
                                                    value={slide.primaryButtonPadding || '16px 40px'}
                                                    onChange={(value) => updateSlide(index, 'primaryButtonPadding', value)}
                                                    placeholder="16px 40px"
                                                />
                                            </BaseControl>
                                        </div>
                                    </PanelBody>
                                    <PanelBody title={__('Mobile Settings', 'twork-builder')} initialOpen={false}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <BaseControl>
                                                <UnitControl
                                                    label={__('Font Size', 'twork-builder')}
                                                    value={slide.primaryButtonFontSizeMobile || '0.85rem'}
                                                    onChange={(value) => updateSlide(index, 'primaryButtonFontSizeMobile', value || '0.85rem')}
                                                    units={[
                                                        { value: 'rem', label: 'rem' },
                                                        { value: 'px', label: 'px' },
                                                    ]}
                                                />
                                            </BaseControl>
                                            <BaseControl>
                                                <TextControl
                                                    label={__('Padding', 'twork-builder')}
                                                    value={slide.primaryButtonPaddingMobile || '14px 30px'}
                                                    onChange={(value) => updateSlide(index, 'primaryButtonPaddingMobile', value)}
                                                    placeholder="14px 30px"
                                                />
                                            </BaseControl>
                                        </div>
                                    </PanelBody>
                                </PanelBody>

                                <PanelBody
                                    title={__('Secondary Button', 'twork-builder')}
                                    initialOpen={false}
                                    className="hero-slider-button-panel"
                                >
                                    <PanelBody title={__('Content', 'twork-builder')} initialOpen={true}>
                                        <BaseControl>
                                            <TextControl
                                                label={__('Button Text', 'twork-builder')}
                                                value={slide.secondaryButtonText || ''}
                                                onChange={(value) => updateSlide(index, 'secondaryButtonText', value)}
                                            />
                                        </BaseControl>
                                        <BaseControl>
                                            <TextControl
                                                label={__('Button Link', 'twork-builder')}
                                                value={slide.secondaryButtonLink || '#'}
                                                onChange={(value) => updateSlide(index, 'secondaryButtonLink', value)}
                                                help={__('URL for the button link', 'twork-builder')}
                                            />
                                        </BaseControl>
                                    </PanelBody>
                                    <PanelBody title={__('Typography & Spacing', 'twork-builder')} initialOpen={true}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <BaseControl>
                                                <UnitControl
                                                    label={__('Font Size', 'twork-builder')}
                                                    value={slide.secondaryButtonFontSize || '0.9rem'}
                                                    onChange={(value) => updateSlide(index, 'secondaryButtonFontSize', value || '0.9rem')}
                                                    units={[
                                                        { value: 'rem', label: 'rem' },
                                                        { value: 'px', label: 'px' },
                                                    ]}
                                                />
                                            </BaseControl>
                                            <BaseControl>
                                                <TextControl
                                                    label={__('Padding', 'twork-builder')}
                                                    value={slide.secondaryButtonPadding || '16px 40px'}
                                                    onChange={(value) => updateSlide(index, 'secondaryButtonPadding', value)}
                                                    placeholder="16px 40px"
                                                />
                                            </BaseControl>
                                        </div>
                                    </PanelBody>
                                    <PanelBody title={__('Mobile Settings', 'twork-builder')} initialOpen={false}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <BaseControl>
                                                <UnitControl
                                                    label={__('Font Size', 'twork-builder')}
                                                    value={slide.secondaryButtonFontSizeMobile || '0.85rem'}
                                                    onChange={(value) => updateSlide(index, 'secondaryButtonFontSizeMobile', value || '0.85rem')}
                                                    units={[
                                                        { value: 'rem', label: 'rem' },
                                                        { value: 'px', label: 'px' },
                                                    ]}
                                                />
                                            </BaseControl>
                                            <BaseControl>
                                                <TextControl
                                                    label={__('Padding', 'twork-builder')}
                                                    value={slide.secondaryButtonPaddingMobile || '14px 30px'}
                                                    onChange={(value) => updateSlide(index, 'secondaryButtonPaddingMobile', value)}
                                                    placeholder="14px 30px"
                                                />
                                            </BaseControl>
                                        </div>
                                    </PanelBody>
                                </PanelBody>
                            </PanelBody>

                            {slides.length > 1 && (
                                <Button
                                    isDestructive
                                    onClick={() => removeSlide(index)}
                                    style={{ marginTop: '10px' }}
                                >
                                    {__('Remove Slide', 'twork-builder')}
                                </Button>
                            )}
                        </PanelBody>
                    ))}
                    <Button isPrimary onClick={addSlide}>
                        {__('Add Slide', 'twork-builder')}
                    </Button>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="swiper-wrapper">
                    {slides.map((slide, index) => {
                        const separatorStyle = {
                            backgroundColor: slide.separatorColor || '#f48b2a',
                            width: slide.separatorWidth || '60px',
                            height: slide.separatorHeight || '3px',
                            borderRadius: slide.separatorBorderRadius || '2px',
                            opacity: slide.separatorOpacity || '1',
                            marginTop: slide.separatorMarginTop || '0px',
                            marginBottom: slide.separatorMarginBottom || '20px',
                            marginLeft: slide.separatorAlignment === 'left' ? '0' : 'auto',
                            marginRight: slide.separatorAlignment === 'right' ? '0' : 'auto',
                        };

                        // Background image with gradient overlay (matching HTML structure)
                        const backgroundImage = slide.backgroundImage
                            ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.backgroundImage})`
                            : '';

                        return (
                            <div
                                key={`slide-${index}`}
                                className="swiper-slide"
                                style={{
                                    backgroundImage: backgroundImage,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <div className="jivaka-container">
                                    {slide.metaTitle && (
                                        <>
                                            <p
                                                className="hero__meta-title"
                                                style={{
                                                    fontSize: slide.metaTitleFontSize || '0.75rem',
                                                    color: slide.metaTitleColor || 'rgba(255, 255, 255, 0.9)',
                                                    letterSpacing: slide.metaTitleLetterSpacing || '3px',
                                                }}
                                            >
                                                {slide.metaTitle}
                                            </p>
                                            {slide.showSeparator !== false && (
                                                <div
                                                    className="hero__separator"
                                                    style={separatorStyle}
                                                    data-width-mobile={slide.separatorWidthMobile || '50px'}
                                                    data-height-mobile={slide.separatorHeightMobile || '2px'}
                                                    data-margin-bottom-mobile={slide.separatorMarginBottomMobile || '15px'}
                                                />
                                            )}
                                        </>
                                    )}
                                    {slide.title && slide.title.trim() && (
                                        <h1
                                            style={{
                                                fontSize: slide.titleFontSize || '4rem',
                                                lineHeight: slide.titleLineHeight || '1.2',
                                                fontWeight: slide.titleFontWeight || '900',
                                                marginBottom: '20px',
                                            }}
                                            data-font-size-tablet={slide.titleFontSizeTablet || '3.5rem'}
                                            data-font-size-mobile={slide.titleFontSizeMobile || '2.5rem'}
                                            dangerouslySetInnerHTML={{
                                                __html: (() => {
                                                    const html = (slide.title || '').trim();
                                                    if (!html) return '';

                                                    const parts = html.split(/(<br\s*\/?>)/i);
                                                    const firstLineColor = slide.titlePart1Color || '#f48b2a';
                                                    const secondLineColor = slide.titlePart2Color || '#2c3e50';

                                                    return parts.map((part, idx) => {
                                                        if (part.match(/<br\s*\/?>/i)) return part;
                                                        if (part.trim()) {
                                                            const lineIndex = parts.slice(0, idx).filter((p) => p.match(/<br\s*\/?>/i)).length;
                                                            const color = lineIndex === 0 ? firstLineColor : secondLineColor;
                                                            return `<span style="color: ${color}">${part}</span>`;
                                                        }
                                                        return part;
                                                    }).join('');
                                                })(),
                                            }}
                                        />
                                    )}
                                    {slide.description && (
                                        <p
                                            style={{
                                                fontSize: slide.descriptionFontSize || '1.2rem',
                                                color: slide.descriptionColor || 'rgba(255, 255, 255, 0.95)',
                                                lineHeight: slide.descriptionLineHeight || '1.6',
                                                marginBottom: '30px',
                                                maxWidth: '500px',
                                            }}
                                            data-font-size-tablet={slide.descriptionFontSizeTablet || '1.1rem'}
                                            data-font-size-mobile={slide.descriptionFontSizeMobile || '0.95rem'}
                                            data-line-height-mobile={slide.descriptionLineHeightMobile || '1.6'}
                                        >
                                            {slide.description}
                                        </p>
                                    )}
                                    <div className="hero__buttons">
                                        {slide.primaryButtonText && (
                                            <a
                                                href={slide.primaryButtonLink}
                                                className="jivaka-btn jivaka-btn-primary"
                                                style={{
                                                    fontSize: slide.primaryButtonFontSize || '0.9rem',
                                                    padding: slide.primaryButtonPadding || '12px 28px',
                                                    marginRight: '15px',
                                                }}
                                                data-font-size-mobile={slide.primaryButtonFontSizeMobile || '0.85rem'}
                                                data-padding-mobile={slide.primaryButtonPaddingMobile || '14px 30px'}
                                            >
                                                {slide.primaryButtonText}
                                            </a>
                                        )}
                                        {slide.secondaryButtonText && (
                                            <a
                                                href={slide.secondaryButtonLink}
                                                className="jivaka-btn jivaka-btn-secondary"
                                                style={{
                                                    fontSize: slide.secondaryButtonFontSize || '0.9rem',
                                                    padding: slide.secondaryButtonPadding || '12px 28px',
                                                }}
                                                data-font-size-mobile={slide.secondaryButtonFontSizeMobile || '0.85rem'}
                                                data-padding-mobile={slide.secondaryButtonPaddingMobile || '14px 30px'}
                                            >
                                                {slide.secondaryButtonText}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-pagination"></div>
            </div>
        </>
    );
}
