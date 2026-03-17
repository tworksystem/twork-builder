import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText,
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    SelectControl,
} from '@wordpress/components';

const ICON_OPTIONS = [
    { label: __('Thermometer (Acute Illnesses)', 'twork-builder'), value: 'fas fa-thermometer-half' },
    { label: __('Heartbeat (Chronic)', 'twork-builder'), value: 'fas fa-heartbeat' },
    { label: __('Shield (Preventative)', 'twork-builder'), value: 'fas fa-user-shield' },
    { label: __('Lungs (Respiratory)', 'twork-builder'), value: 'fas fa-lungs' },
    { label: __('Capsules (GI Health)', 'twork-builder'), value: 'fas fa-capsules' },
    { label: __('Virus (Infectious)', 'twork-builder'), value: 'fas fa-virus' },
    { label: __('Band Aid (Procedures)', 'twork-builder'), value: 'fas fa-band-aid' },
    { label: __('Syringe (Vaccinations)', 'twork-builder'), value: 'fas fa-syringe' },
    { label: __('Allergies', 'twork-builder'), value: 'fas fa-allergies' },
];

export default function Edit({ attributes, setAttributes }) {
    const {
        icon,
        title,
        description,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'jivaka-gm-service-card twork-gm-service-item-editor',
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Service Item', 'twork-builder')} initialOpen={true}>
                    <SelectControl
                        label={__('Icon Preset', 'twork-builder')}
                        value={icon}
                        options={ICON_OPTIONS}
                        onChange={(val) => setAttributes({ icon: val })}
                    />
                    <TextControl
                        label={__('Icon Class (Font Awesome)', 'twork-builder')}
                        value={icon}
                        onChange={(val) => setAttributes({ icon: val })}
                        help={__('Example: fas fa-heartbeat', 'twork-builder')}
                    />
                    <TextControl
                        label={__('Title', 'twork-builder')}
                        value={title}
                        onChange={(val) => setAttributes({ title: val })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="jivaka-gm-icon-box">
                    <i className={icon || 'fas fa-stethoscope'} />
                </div>
                <RichText
                    tagName="h3"
                    value={title}
                    onChange={(val) => setAttributes({ title: val })}
                    placeholder={__('Service title...', 'twork-builder')}
                />
                <RichText
                    tagName="p"
                    value={description}
                    onChange={(val) => setAttributes({ description: val })}
                    placeholder={__('Service description...', 'twork-builder')}
                />
            </div>
        </>
    );
}

