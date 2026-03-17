import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    PanelColorSettings,
    RichText,
    MediaPlaceholder,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    TextControl,
    Button,
    __experimentalDivider as ExperimentalDivider,
    Divider as StableDivider,
} from '@wordpress/components';

const Divider = StableDivider || ExperimentalDivider || function DividerFallback() {
    return <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #ddd' }} />;
};

const DEFAULT_ATTRS = {
    backgroundColor: '#fdfdfd',
    paddingTop: 60,
    paddingBottom: 80,
    containerMaxWidth: 1280,
    containerPadding: 24,
    badgeText: 'Long Term Wellness',
    title: 'Continue Healing at Home',
    description:
        "Recovery doesn't stop at the clinic. We provide you with a digital home exercise plan including video guides to ensure you continue progressing every day.",
    items: [
        'Personalized Video Instructions',
        'Progress Tracking App',
        'Daily Reminders',
    ],
    imageUrl:
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Home Exercise',
};

export default function Edit({ attributes = {}, setAttributes }) {
    const attrs = { ...DEFAULT_ATTRS, ...attributes };
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        badgeText,
        title,
        description,
        items = [],
        imageUrl,
        imageAlt,
    } = attrs;

    const blockProps = useBlockProps({
        className: 'phy-section twork-phy-home-ex-section-editor',
        style: {
            backgroundColor,
            paddingTop: `${Number(paddingTop)}px`,
            paddingBottom: `${Number(paddingBottom)}px`,
            position: 'relative',
        },
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        position: 'relative',
    };

    const updateItem = (index, value) => {
        const next = [...(items || [])];
        next[index] = value;
        setAttributes({ items: next });
    };

    const addItem = () => {
        setAttributes({ items: [...(items || []), __('New item…', 'twork-builder')] });
    };

    const removeItem = (index) => {
        const next = [...(items || [])];
        next.splice(index, 1);
        setAttributes({ items: next });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section', 'twork-builder')} initialOpen={true}>
                    <PanelColorSettings
                        title={__('Background', 'twork-builder')}
                        colorSettings={[
                            {
                                value: backgroundColor,
                                onChange: (val) => setAttributes({ backgroundColor: val }),
                                label: __('Background color', 'twork-builder'),
                            },
                        ]}
                    />
                    <RangeControl
                        label={__('Padding top (px)', 'twork-builder')}
                        value={paddingTop}
                        onChange={(val) => setAttributes({ paddingTop: val })}
                        min={0}
                        max={200}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(val) => setAttributes({ paddingBottom: val })}
                        min={0}
                        max={200}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Container', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Max width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(val) => setAttributes({ containerMaxWidth: val })}
                        min={800}
                        max={1920}
                        step={20}
                    />
                    <RangeControl
                        label={__('Horizontal padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(val) => setAttributes({ containerPadding: val })}
                        min={0}
                        max={80}
                        step={4}
                    />
                </PanelBody>

                <PanelBody title={__('Content', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Badge text', 'twork-builder')}
                        value={badgeText || ''}
                        onChange={(val) => setAttributes({ badgeText: val })}
                    />
                    <TextControl
                        label={__('Title', 'twork-builder')}
                        value={title || ''}
                        onChange={(val) => setAttributes({ title: val })}
                    />
                    <TextControl
                        label={__('Description', 'twork-builder')}
                        value={description || ''}
                        onChange={(val) => setAttributes({ description: val })}
                    />
                    <Divider />
                    <PanelBody title={__('Bullet list', 'twork-builder')} initialOpen={true}>
                        {(items || []).map((item, index) => (
                            <div key={index} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                                <TextControl
                                    value={item}
                                    onChange={(val) => updateItem(index, val)}
                                    placeholder={__('List item…', 'twork-builder')}
                                    style={{ flex: 1 }}
                                />
                                <Button
                                    icon="no-alt"
                                    label={__('Remove', 'twork-builder')}
                                    isDestructive
                                    isSmall
                                    onClick={() => removeItem(index)}
                                />
                            </div>
                        ))}
                        <Button
                            variant="secondary"
                            isSmall
                            onClick={addItem}
                        >
                            {__('Add item', 'twork-builder')}
                        </Button>
                    </PanelBody>
                </PanelBody>

                <PanelBody title={__('Image', 'twork-builder')} initialOpen={false}>
                    <MediaPlaceholder
                        onSelect={(media) =>
                            setAttributes({
                                imageUrl: media?.url || '',
                                imageAlt: media?.alt || imageAlt,
                            })
                        }
                        allowedTypes={['image']}
                        multiple={false}
                        labels={{ title: __('Home exercise image', 'twork-builder') }}
                    />
                    <TextControl
                        label={__('Alt text', 'twork-builder')}
                        value={imageAlt || ''}
                        onChange={(val) => setAttributes({ imageAlt: val })}
                    />
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="phy-container" style={containerStyle}>
                    <div className="phy-home-ex-grid">
                        <div className="phy-home-ex-content fade-up">
                            {badgeText && (
                                <span className="phy-hero-badge">
                                    {badgeText}
                                </span>
                            )}
                            <RichText
                                tagName="h2"
                                value={title}
                                onChange={(val) => setAttributes({ title: val })}
                                placeholder={__('Continue Healing at Home', 'twork-builder')}
                            />
                            <RichText
                                tagName="p"
                                value={description}
                                onChange={(val) => setAttributes({ description: val })}
                                placeholder={__('Description…', 'twork-builder')}
                                style={{ color: '#666', marginBottom: 30 }}
                            />
                            <ul className="phy-home-ex-list">
                                {(items || []).map((item, index) => (
                                    <li key={index}>
                                        <i className="fas fa-check-circle" aria-hidden="true" />{' '}
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="fade-up">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={imageAlt || ''}
                                    style={{
                                        borderRadius: 'var(--phy-radius, 20px)',
                                        boxShadow: 'var(--phy-shadow, 0 15px 35px rgba(0,0,0,0.06))',
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        borderRadius: 'var(--phy-radius, 20px)',
                                        boxShadow: 'var(--phy-shadow, 0 15px 35px rgba(0,0,0,0.06))',
                                        background: '#f0f0f0',
                                        minHeight: 260,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#999',
                                        fontSize: 14,
                                    }}
                                >
                                    {__('Home exercise image', 'twork-builder')}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

