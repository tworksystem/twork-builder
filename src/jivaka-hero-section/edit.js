import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    RichText,
    MediaPlaceholder,
    PanelColorSettings
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
    TextControl,
    BaseControl,
    Button,
    __experimentalDivider as Divider
} from '@wordpress/components';

const ALLOWED_BLOCKS = ['twork/jivaka-badge-item'];
const TEMPLATE = [
    ['twork/jivaka-badge-item', {}],
    ['twork/jivaka-badge-item', {}],
    ['twork/jivaka-badge-item', {}]
];

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        subtitle,
        gradientStart,
        gradientEnd,
        gradientAngle,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        phoneMockupImage,
        phoneMockupImageId,
        phoneMockupMaxWidth,
        titleColor,
        titleFontSize,
        titleFontWeight,
        subtitleColor,
        subtitleFontSize,
        subtitleMarginBottom,
        badgeGap,
        badgeHeight,
        enablePhoneFloatAnimation,
        textAlignment,
        minHeight
    } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-jivaka-hero-section-editor',
        style: {
            background: `linear-gradient(${gradientAngle}deg, ${gradientStart}, ${gradientEnd})`,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            minHeight: minHeight || '100vh',
            position: 'relative',
            overflow: 'hidden'
        }
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        width: '100%',
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        color: 'white',
        boxSizing: 'border-box'
    };

    const textContentStyle = {
        flex: '1 1 400px',
        padding: '20px',
        textAlign: textAlignment
    };

    const badgesStyle = {
        display: 'flex',
        gap: `${badgeGap}px`,
        flexWrap: 'wrap',
        justifyContent: textAlignment === 'center' ? 'center' : 'flex-start',
        marginBottom: '0',
        '--jivaka-badge-height': `${badgeHeight}px`
    };

    const phoneMockupStyle = {
        flex: '1 1 400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
    };

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={__('Content', 'twork-builder')}
                    initialOpen={true}
                >
                    <TextControl
                        label={__('Title', 'twork-builder')}
                        value={title}
                        onChange={(val) => setAttributes({ title: val })}
                    />
                    <TextControl
                        label={__('Subtitle', 'twork-builder')}
                        value={subtitle}
                        onChange={(val) => setAttributes({ subtitle: val })}
                    />
                    <SelectControl
                        label={__('Text Alignment', 'twork-builder')}
                        value={textAlignment}
                        options={[
                            { label: __('Left', 'twork-builder'), value: 'left' },
                            { label: __('Center', 'twork-builder'), value: 'center' },
                            { label: __('Right', 'twork-builder'), value: 'right' }
                        ]}
                        onChange={(val) => setAttributes({ textAlignment: val })}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Title & Subtitle Styling', 'twork-builder')}
                    initialOpen={false}
                >
                    <PanelColorSettings
                        title={__('Title Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: titleColor,
                                onChange: (val) => setAttributes({ titleColor: val }),
                                label: __('Title Color', 'twork-builder')
                            }
                        ]}
                    />
                    <RangeControl
                        label={__('Title Font Size (rem)', 'twork-builder')}
                        value={titleFontSize}
                        onChange={(val) => setAttributes({ titleFontSize: val })}
                        min={1.5}
                        max={5}
                        step={0.1}
                    />
                    <RangeControl
                        label={__('Title Font Weight', 'twork-builder')}
                        value={titleFontWeight}
                        onChange={(val) => setAttributes({ titleFontWeight: val })}
                        min={100}
                        max={900}
                        step={100}
                    />
                    <Divider />
                    <PanelColorSettings
                        title={__('Subtitle Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: subtitleColor,
                                onChange: (val) => setAttributes({ subtitleColor: val }),
                                label: __('Subtitle Color', 'twork-builder')
                            }
                        ]}
                    />
                    <RangeControl
                        label={__('Subtitle Font Size (rem)', 'twork-builder')}
                        value={subtitleFontSize}
                        onChange={(val) => setAttributes({ subtitleFontSize: val })}
                        min={0.9}
                        max={2.5}
                        step={0.1}
                    />
                    <RangeControl
                        label={__('Subtitle Margin Bottom (px)', 'twork-builder')}
                        value={subtitleMarginBottom}
                        onChange={(val) => setAttributes({ subtitleMarginBottom: val })}
                        min={0}
                        max={60}
                        step={5}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Background Gradient', 'twork-builder')}
                    initialOpen={false}
                >
                    <PanelColorSettings
                        title={__('Gradient Start', 'twork-builder')}
                        colorSettings={[
                            {
                                value: gradientStart,
                                onChange: (val) => setAttributes({ gradientStart: val }),
                                label: __('Start Color', 'twork-builder')
                            }
                        ]}
                    />
                    <PanelColorSettings
                        title={__('Gradient End', 'twork-builder')}
                        colorSettings={[
                            {
                                value: gradientEnd,
                                onChange: (val) => setAttributes({ gradientEnd: val }),
                                label: __('End Color', 'twork-builder')
                            }
                        ]}
                    />
                    <RangeControl
                        label={__('Gradient Angle (deg)', 'twork-builder')}
                        value={gradientAngle}
                        onChange={(val) => setAttributes({ gradientAngle: val })}
                        min={0}
                        max={360}
                        step={5}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Phone Mockup', 'twork-builder')}
                    initialOpen={false}
                >
                    <BaseControl label={__('Phone Mockup Image', 'twork-builder')}>
                        {!phoneMockupImage ? (
                            <MediaPlaceholder
                                onSelect={(media) => setAttributes({
                                    phoneMockupImage: media.url,
                                    phoneMockupImageId: media.id
                                })}
                                allowedTypes={['image']}
                                multiple={false}
                                labels={{ title: __('Phone Mockup Image', 'twork-builder') }}
                            />
                        ) : (
                            <div>
                                <img
                                    src={phoneMockupImage}
                                    alt=""
                                    style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
                                />
                                <Button
                                    isSecondary
                                    isSmall
                                    onClick={() => setAttributes({
                                        phoneMockupImage: '',
                                        phoneMockupImageId: null
                                    })}
                                >
                                    {__('Remove Image', 'twork-builder')}
                                </Button>
                            </div>
                        )}
                    </BaseControl>
                    <RangeControl
                        label={__('Phone Max Width (px)', 'twork-builder')}
                        value={phoneMockupMaxWidth}
                        onChange={(val) => setAttributes({ phoneMockupMaxWidth: val })}
                        min={200}
                        max={500}
                        step={10}
                    />
                    <ToggleControl
                        label={__('Enable Float Animation', 'twork-builder')}
                        checked={enablePhoneFloatAnimation}
                        onChange={(val) => setAttributes({ enablePhoneFloatAnimation: val })}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Badge Settings', 'twork-builder')}
                    initialOpen={false}
                >
                    <RangeControl
                        label={__('Gap Between Badges (px)', 'twork-builder')}
                        value={badgeGap}
                        onChange={(val) => setAttributes({ badgeGap: val })}
                        min={0}
                        max={30}
                        step={2}
                    />
                    <RangeControl
                        label={__('Badge Image Height (px)', 'twork-builder')}
                        value={badgeHeight}
                        onChange={(val) => setAttributes({ badgeHeight: val })}
                        min={30}
                        max={80}
                        step={5}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Layout & Spacing', 'twork-builder')}
                    initialOpen={false}
                >
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
                        min={0}
                        max={80}
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
            </InspectorControls>

            <div {...blockProps}>
                <div className="jivaka-hero-container" style={containerStyle}>
                    <div className="jivaka-hero-text-content" style={textContentStyle}>
                        <RichText
                            tagName="h1"
                            value={title}
                            onChange={(val) => setAttributes({ title: val })}
                            placeholder={__('Jivaka Care', 'twork-builder')}
                            style={{
                                fontSize: `${titleFontSize}rem`,
                                fontWeight: titleFontWeight,
                                color: titleColor,
                                marginBottom: '10px',
                                lineHeight: 1.2
                            }}
                        />
                        <RichText
                            tagName="p"
                            value={subtitle}
                            onChange={(val) => setAttributes({ subtitle: val })}
                            placeholder={__('Caring with Compassion', 'twork-builder')}
                            style={{
                                fontSize: `${subtitleFontSize}rem`,
                                color: subtitleColor,
                                margin: `0 0 ${subtitleMarginBottom}px 0`
                            }}
                        />
                        <div
                            className="jivaka-hero-badges"
                            style={badgesStyle}
                            data-badge-gap={badgeGap}
                            data-badge-height={badgeHeight}
                        >
                            <InnerBlocks
                                allowedBlocks={ALLOWED_BLOCKS}
                                template={TEMPLATE}
                                renderAppender={InnerBlocks.ButtonBlockAppender}
                            />
                        </div>
                    </div>
                    <div className="jivaka-hero-phone-mockup" style={phoneMockupStyle}>
                        {phoneMockupImage ? (
                            <img
                                src={phoneMockupImage}
                                alt={__('Jivaka App Screenshot', 'twork-builder')}
                                style={{
                                    width: '100%',
                                    maxWidth: `${phoneMockupMaxWidth}px`,
                                    height: 'auto',
                                    filter: 'drop-shadow(0 20px 50px rgba(0, 0, 0, 0.2))'
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: '100%',
                                    maxWidth: `${phoneMockupMaxWidth}px`,
                                    height: 400,
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: 24,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'rgba(255,255,255,0.6)',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {__('Add phone mockup image in sidebar', 'twork-builder')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
