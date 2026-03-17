import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    Button,
    __experimentalDivider as Divider,
} from '@wordpress/components';
import { PanelColorSettings } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        price,
        priceUnit,
        features = [],
        buttonText,
        buttonUrl,
        buttonStyle,
        headBackground,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'hc-pkg-card twork-hc-package-card-editor',
    });

    const addFeature = () => setAttributes({ features: [...(features || []), __('New feature', 'twork-builder')] });
    const removeFeature = (index) => setAttributes({ features: features.filter((_, i) => i !== index) });
    const updateFeature = (index, value) => setAttributes({
        features: features.map((f, i) => (i === index ? value : f)),
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Package', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Price (e.g. 30,000)', 'twork-builder')}
                        value={price || ''}
                        onChange={(val) => setAttributes({ price: val || '' })}
                    />
                    <TextControl
                        label={__('Price unit (e.g. MMK / Day)', 'twork-builder')}
                        value={priceUnit || ''}
                        onChange={(val) => setAttributes({ priceUnit: val || '' })}
                    />
                    <Divider />
                    <TextControl
                        label={__('Button text', 'twork-builder')}
                        value={buttonText || ''}
                        onChange={(val) => setAttributes({ buttonText: val || 'Choose Plan' })}
                    />
                    <TextControl
                        label={__('Button URL', 'twork-builder')}
                        value={buttonUrl || ''}
                        onChange={(val) => setAttributes({ buttonUrl: val || '#' })}
                    />
                    <div style={{ marginTop: 12 }}>
                        <span style={{ display: 'block', marginBottom: 8 }}>{__('Button style', 'twork-builder')}</span>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <Button
                                variant={buttonStyle === 'outline' ? 'primary' : 'secondary'}
                                isSmall
                                onClick={() => setAttributes({ buttonStyle: 'outline' })}
                            >
                                {__('Outline', 'twork-builder')}
                            </Button>
                            <Button
                                variant={buttonStyle === 'primary' ? 'primary' : 'secondary'}
                                isSmall
                                onClick={() => setAttributes({ buttonStyle: 'primary' })}
                            >
                                {__('Primary', 'twork-builder')}
                            </Button>
                        </div>
                    </div>
                    {PanelColorSettings && (
                        <PanelColorSettings
                            title={__('Head background', 'twork-builder')}
                            colorSettings={[
                                {
                                    value: headBackground || undefined,
                                    onChange: (val) => setAttributes({ headBackground: val || '' }),
                                    label: __('Card head background (optional)', 'twork-builder'),
                                },
                            ]}
                        />
                    )}
                </PanelBody>
                <PanelBody title={__('Features list', 'twork-builder')} initialOpen={true}>
                    {(features || []).map((feature, index) => (
                        <div key={index} style={{ marginBottom: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
                            <TextControl
                                value={feature}
                                onChange={(val) => updateFeature(index, val)}
                                placeholder={__('Feature…', 'twork-builder')}
                                style={{ flex: 1 }}
                            />
                            <Button
                                icon="no-alt"
                                label={__('Remove', 'twork-builder')}
                                isDestructive
                                isSmall
                                onClick={() => removeFeature(index)}
                            />
                        </div>
                    ))}
                    <Button variant="secondary" isSmall onClick={addFeature} style={{ marginTop: 8 }}>
                        {__('Add feature', 'twork-builder')}
                    </Button>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div
                    className="hc-pkg-head"
                    style={headBackground ? { background: headBackground } : undefined}
                >
                    <RichText
                        tagName="h4"
                        value={title}
                        onChange={(val) => setAttributes({ title: val })}
                        placeholder={__('Package title…', 'twork-builder')}
                    />
                    <div className="hc-price">
                        {price || '30,000'}{' '}
                        <span>{priceUnit || 'MMK / Day'}</span>
                    </div>
                </div>
                <div className="hc-pkg-body">
                    <ul className="hc-pkg-list">
                        {(features || []).map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                    <a
                        href={buttonUrl || '#'}
                        className={`hc-btn ${buttonStyle === 'primary' ? 'hc-btn-primary' : 'hc-btn-outline'}`}
                        style={{ width: '100%', marginTop: 'auto' }}
                        onClick={(e) => e.preventDefault()}
                    >
                        {buttonText || 'Choose Plan'}
                    </a>
                </div>
            </div>
        </>
    );
}
