import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText,
    PanelColorSettings,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    TextControl,
    SelectControl,
    BaseControl,
    __experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        subtitle,
        buttonText,
        buttonUrl,
        openInNewTab,
        backgroundColor,
        backgroundImage,
        backgroundImageId,
        padding,
        borderRadius,
        textAlign,
        titleColor,
        subtitleColor,
        subtitleOpacity,
        buttonBackgroundColor,
        buttonTextColor,
        marginBottom,
        containerMaxWidth,
        containerPadding,
        animationOnScroll,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-health-check-cta-section-editor',
        style: {
            marginBottom: `${marginBottom}px`,
        },
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        position: 'relative',
    };

    const ctaBoxStyle = {
        background: backgroundColor || '#005f73',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        color: subtitleColor || '#fff',
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
        textAlign: textAlign || 'center',
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Content', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Button Text', 'twork-builder')}
                        value={buttonText}
                        onChange={(val) => setAttributes({ buttonText: val })}
                    />
                    <TextControl
                        label={__('Button URL', 'twork-builder')}
                        value={buttonUrl}
                        onChange={(val) => setAttributes({ buttonUrl: val })}
                        help={__('e.g. appointment.html or https://...', 'twork-builder')}
                    />
                    <ToggleControl
                        label={__('Open link in new tab', 'twork-builder')}
                        checked={openInNewTab}
                        onChange={(val) => setAttributes({ openInNewTab: val })}
                    />
                </PanelBody>

                <PanelBody title={__('Background', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Background Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: backgroundColor,
                                onChange: (val) => setAttributes({ backgroundColor: val }),
                                label: __('Background Color', 'twork-builder'),
                            },
                        ]}
                    />
                    <Divider />
                    <BaseControl label={__('Pattern / Texture Image URL', 'twork-builder')}>
                        <TextControl
                            value={backgroundImage || ''}
                            onChange={(val) => setAttributes({ backgroundImage: val || '' })}
                            placeholder="https://..."
                            help={__('Optional. Leave empty for solid color.', 'twork-builder')}
                        />
                    </BaseControl>
                </PanelBody>

                <PanelBody title={__('Container & Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Section Margin Bottom (px)', 'twork-builder')}
                        value={marginBottom}
                        onChange={(val) => setAttributes({ marginBottom: val })}
                        min={0}
                        max={120}
                        step={5}
                    />
                    <RangeControl
                        label={__('Container Max Width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(val) => setAttributes({ containerMaxWidth: val })}
                        min={800}
                        max={1600}
                        step={10}
                    />
                    <RangeControl
                        label={__('Container Padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(val) => setAttributes({ containerPadding: val })}
                        min={16}
                        max={60}
                        step={5}
                    />
                    <Divider />
                    <RangeControl
                        label={__('CTA Box Padding (px)', 'twork-builder')}
                        value={padding}
                        onChange={(val) => setAttributes({ padding: val })}
                        min={24}
                        max={100}
                        step={5}
                    />
                    <RangeControl
                        label={__('Border Radius (px)', 'twork-builder')}
                        value={borderRadius}
                        onChange={(val) => setAttributes({ borderRadius: val })}
                        min={0}
                        max={50}
                        step={5}
                    />
                    <SelectControl
                        label={__('Text Alignment', 'twork-builder')}
                        value={textAlign}
                        options={[
                            { label: __('Left', 'twork-builder'), value: 'left' },
                            { label: __('Center', 'twork-builder'), value: 'center' },
                            { label: __('Right', 'twork-builder'), value: 'right' },
                        ]}
                        onChange={(val) => setAttributes({ textAlign: val })}
                    />
                </PanelBody>

                <PanelBody title={__('Typography & Colors', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Title Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: titleColor,
                                onChange: (val) => setAttributes({ titleColor: val }),
                                label: __('Title Color', 'twork-builder'),
                            },
                        ]}
                    />
                    <PanelColorSettings
                        title={__('Subtitle Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: subtitleColor,
                                onChange: (val) => setAttributes({ subtitleColor: val }),
                                label: __('Subtitle Color', 'twork-builder'),
                            },
                        ]}
                    />
                    <RangeControl
                        label={__('Subtitle Opacity', 'twork-builder')}
                        value={subtitleOpacity}
                        onChange={(val) => setAttributes({ subtitleOpacity: val })}
                        min={0.3}
                        max={1}
                        step={0.1}
                    />
                    <Divider />
                    <PanelColorSettings
                        title={__('Button', 'twork-builder')}
                        colorSettings={[
                            {
                                value: buttonBackgroundColor,
                                onChange: (val) => setAttributes({ buttonBackgroundColor: val }),
                                label: __('Button Background', 'twork-builder'),
                            },
                            {
                                value: buttonTextColor,
                                onChange: (val) => setAttributes({ buttonTextColor: val }),
                                label: __('Button Text Color', 'twork-builder'),
                            },
                        ]}
                    />
                </PanelBody>

                <PanelBody title={__('Animation', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Fade up on scroll', 'twork-builder')}
                        checked={animationOnScroll}
                        onChange={(val) => setAttributes({ animationOnScroll: val })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="chk-container" style={containerStyle}>
                    <div
                        className="chk-cta-box fade-up"
                        style={ctaBoxStyle}
                        data-animation={animationOnScroll}
                    >
                        <RichText
                            tagName="h2"
                            value={title}
                            onChange={(v) => setAttributes({ title: v })}
                            placeholder={__('Book Your Slot Today', 'twork-builder')}
                            style={{
                                color: titleColor || '#fff',
                                marginTop: 0,
                                marginBottom: 15,
                            }}
                        />
                        <RichText
                            tagName="p"
                            value={subtitle}
                            onChange={(v) => setAttributes({ subtitle: v })}
                            placeholder={__('Health is wealth. Don\'t delay your check-up.', 'twork-builder')}
                            style={{
                                color: subtitleColor || '#fff',
                                opacity: subtitleOpacity,
                                marginBottom: 30,
                            }}
                        />
                        {buttonText ? (
                            <a
                                href={buttonUrl || '#'}
                                className="chk-btn chk-cta-btn"
                                style={{
                                    background: buttonBackgroundColor || '#fff',
                                    color: buttonTextColor || '#005f73',
                                    pointerEvents: 'none',
                                }}
                                onClick={(e) => e.preventDefault()}
                                rel={openInNewTab ? 'noopener noreferrer' : undefined}
                                target={openInNewTab ? '_blank' : undefined}
                            >
                                {buttonText}
                            </a>
                        ) : (
                            <span className="chk-cta-btn-placeholder" style={{ opacity: 0.7 }}>
                                {__('Add button text in sidebar', 'twork-builder')}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
