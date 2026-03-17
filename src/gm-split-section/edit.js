import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText,
    MediaPlaceholder,
    URLInput,
    PanelColorSettings,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    TextControl,
    ToggleControl,
    SelectControl,
    BaseControl,
    Button,
    __experimentalDivider as Divider,
} from '@wordpress/components';

const DEFAULT_FEATURE = { label: '', text: '' };

export default function Edit({ attributes, setAttributes }) {
    const {
        imageUrl,
        imageId,
        imageAlt,
        imagePosition,
        title,
        description,
        featureItems,
        showButton,
        buttonText,
        buttonUrl,
        buttonTarget,
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        titleColor,
        titleFontSize,
        descriptionColor,
        splitGap,
    } = attributes;

    const blockProps = useBlockProps({
        className: [
            'twork-gm-split-section',
            'twork-gm-split-section-editor',
            'jivaka-gm-section',
            imagePosition === 'left' ? 'gm-split-image-left' : 'gm-split-image-right',
        ].filter(Boolean).join(' '),
        style: {
            backgroundColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        display: 'grid',
        gridTemplateColumns: imagePosition === 'left' ? '1fr 1fr' : '1fr 1fr',
        gap: `${splitGap}px`,
        alignItems: 'center',
    };

    const addFeature = () => {
        setAttributes({
            featureItems: [...(featureItems || []), { ...DEFAULT_FEATURE }],
        });
    };

    const removeFeature = (index) => {
        const next = (featureItems || []).filter((_, i) => i !== index);
        setAttributes({ featureItems: next });
    };

    const updateFeature = (index, field, value) => {
        const next = [...(featureItems || [])];
        if (!next[index]) next[index] = { ...DEFAULT_FEATURE };
        next[index] = { ...next[index], [field]: value };
        setAttributes({ featureItems: next });
    };

    const imageCol = (
        <div className="jivaka-gm-img-wrapper gm-anim-fade gm-split-image-col">
            {!imageUrl ? (
                <MediaPlaceholder
                    onSelect={(media) =>
                        setAttributes({
                            imageUrl: media.url,
                            imageId: media.id,
                            imageAlt: media.alt || imageAlt,
                        })
                    }
                    allowedTypes={['image']}
                    multiple={false}
                    labels={{ title: __('Section Image', 'twork-builder') }}
                />
            ) : (
                <>
                    <img
                        src={imageUrl}
                        alt={imageAlt}
                        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }}
                    />
                    <Button
                        isSecondary
                        isSmall
                        onClick={() => setAttributes({ imageUrl: '', imageId: null })}
                        style={{ marginTop: 8 }}
                    >
                        {__('Remove Image', 'twork-builder')}
                    </Button>
                </>
            )}
        </div>
    );

    const contentCol = (
        <div className="gm-anim-fade gm-split-content-col">
            <RichText
                tagName="h2"
                value={title}
                onChange={(val) => setAttributes({ title: val })}
                placeholder={__('Why Choose Jivaka?', 'twork-builder')}
                style={{
                    fontSize: `${titleFontSize}rem`,
                    marginBottom: 20,
                    color: titleColor,
                }}
            />
            <RichText
                tagName="p"
                value={description}
                onChange={(val) => setAttributes({ description: val })}
                placeholder={__('Description...', 'twork-builder')}
                style={{
                    color: descriptionColor,
                    marginBottom: 24,
                    lineHeight: 1.6,
                }}
            />
            <ul className="jivaka-gm-feature-list">
                {(featureItems || []).map((item, i) => (
                    <li key={i}>
                        <strong>{item.label || __('Label', 'twork-builder')}</strong>{' '}
                        {item.text || __('Text', 'twork-builder')}
                    </li>
                ))}
            </ul>
            {showButton !== false ? (
                <span
                    className="jivaka-gm-btn jivaka-gm-btn-primary"
                    style={{ pointerEvents: 'none', cursor: 'default' }}
                >
                    {buttonText || __('Contact Us Today', 'twork-builder')}
                </span>
            ) : (
                <span
                    className="jivaka-gm-btn-placeholder"
                    style={{
                        display: 'inline-block',
                        padding: '10px 16px',
                        fontSize: '13px',
                        color: '#757575',
                        border: '1px dashed #ccc',
                        borderRadius: 4,
                        backgroundColor: '#fafafa',
                    }}
                >
                    {__('Button hidden (toggle on in sidebar to show)', 'twork-builder')}
                </span>
            )}
        </div>
    );

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Image', 'twork-builder')} initialOpen={true}>
                    <SelectControl
                        label={__('Image & text layout', 'twork-builder')}
                        value={imagePosition}
                        options={[
                            { label: __('Image left, text right', 'twork-builder'), value: 'left' },
                            { label: __('Image right, text left', 'twork-builder'), value: 'right' },
                        ]}
                        onChange={(val) => setAttributes({ imagePosition: val })}
                        help={__('Swap the side of the image and the text content.', 'twork-builder')}
                    />
                    <TextControl
                        label={__('Image Alt Text', 'twork-builder')}
                        value={imageAlt}
                        onChange={(val) => setAttributes({ imageAlt: val })}
                    />
                </PanelBody>

                <PanelBody title={__('Feature List', 'twork-builder')} initialOpen={false}>
                    {(featureItems || []).map((item, i) => (
                        <div
                            key={i}
                            style={{
                                marginBottom: 16,
                                paddingBottom: 16,
                                borderBottom: '1px solid #ddd',
                            }}
                        >
                            <TextControl
                                label={`${__('Label', 'twork-builder')} ${i + 1}`}
                                value={item.label || ''}
                                onChange={(v) => updateFeature(i, 'label', v)}
                            />
                            <TextControl
                                label={`${__('Text', 'twork-builder')} ${i + 1}`}
                                value={item.text || ''}
                                onChange={(v) => updateFeature(i, 'text', v)}
                            />
                            <Button
                                isDestructive
                                isSmall
                                onClick={() => removeFeature(i)}
                                style={{ marginTop: 4 }}
                            >
                                {__('Remove', 'twork-builder')}
                            </Button>
                        </div>
                    ))}
                    <Button isSecondary onClick={addFeature}>
                        {__('Add feature item', 'twork-builder')}
                    </Button>
                </PanelBody>

                <PanelBody title={__('Button', 'twork-builder')} initialOpen={true}>
                    <ToggleControl
                        label={__('Show CTA button', 'twork-builder')}
                        checked={showButton !== false}
                        onChange={(v) => setAttributes({ showButton: v })}
                        help={__('Display the call-to-action button below the feature list. Turn off to hide it.', 'twork-builder')}
                    />
                    {showButton !== false && (
                        <>
                            <Divider />
                            <TextControl
                                label={__('Button Text', 'twork-builder')}
                                value={buttonText}
                                onChange={(v) => setAttributes({ buttonText: v })}
                                placeholder={__('Contact Us Today', 'twork-builder')}
                            />
                            <BaseControl label={__('Button URL', 'twork-builder')} help={__('Link destination when the button is clicked.', 'twork-builder')}>
                                <URLInput
                                    value={buttonUrl}
                                    onChange={(url) => setAttributes({ buttonUrl: url || '#contact' })}
                                />
                            </BaseControl>
                            <ToggleControl
                                label={__('Open in new tab', 'twork-builder')}
                                checked={buttonTarget}
                                onChange={(v) => setAttributes({ buttonTarget: v })}
                                help={__('Add target="_blank" and rel="noopener noreferrer".', 'twork-builder')}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Typography', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Title Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: titleColor,
                                onChange: (v) => setAttributes({ titleColor: v }),
                                label: __('Title Color', 'twork-builder'),
                            },
                        ]}
                    />
                    <RangeControl
                        label={__('Title Font Size (rem)', 'twork-builder')}
                        value={titleFontSize}
                        onChange={(v) => setAttributes({ titleFontSize: v })}
                        min={1.5}
                        max={3.5}
                        step={0.1}
                    />
                    <PanelColorSettings
                        title={__('Description Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: descriptionColor,
                                onChange: (v) => setAttributes({ descriptionColor: v }),
                                label: __('Description Color', 'twork-builder'),
                            },
                        ]}
                    />
                </PanelBody>

                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
                    <SelectControl
                        label={__('Image & text side', 'twork-builder')}
                        value={imagePosition}
                        options={[
                            { label: __('Image left', 'twork-builder'), value: 'left' },
                            { label: __('Image right', 'twork-builder'), value: 'right' },
                        ]}
                        onChange={(val) => setAttributes({ imagePosition: val })}
                        help={__('Choose which side the image appears on.', 'twork-builder')}
                    />
                    <RangeControl
                        label={__('Container Max Width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(v) => setAttributes({ containerMaxWidth: v })}
                        min={800}
                        max={1920}
                        step={10}
                    />
                    <RangeControl
                        label={__('Container Padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(v) => setAttributes({ containerPadding: v })}
                        min={0}
                        max={80}
                        step={4}
                    />
                    <RangeControl
                        label={__('Gap between columns (px)', 'twork-builder')}
                        value={splitGap}
                        onChange={(v) => setAttributes({ splitGap: v })}
                        min={40}
                        max={120}
                        step={10}
                    />
                    <RangeControl
                        label={__('Padding Top (px)', 'twork-builder')}
                        value={paddingTop}
                        onChange={(v) => setAttributes({ paddingTop: v })}
                        min={40}
                        max={160}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding Bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(v) => setAttributes({ paddingBottom: v })}
                        min={40}
                        max={160}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Background', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Background Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: backgroundColor,
                                onChange: (v) => setAttributes({ backgroundColor: v }),
                                label: __('Background Color', 'twork-builder'),
                            },
                        ]}
                    />
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div
                    className="jivaka-gm-container jivaka-gm-split"
                    style={containerStyle}
                >
                    {imagePosition === 'left' ? (
                        <>
                            {imageCol}
                            {contentCol}
                        </>
                    ) : (
                        <>
                            {contentCol}
                            {imageCol}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
