import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    SelectControl
} from '@wordpress/components';

const ICON_OPTIONS = [
    { label: __('Stethoscope (General Medicine)', 'twork-builder'), value: 'fas fa-stethoscope' },
    { label: __('Allergies (Dermatology)', 'twork-builder'), value: 'fas fa-allergies' },
    { label: __('Baby (Pediatrics)', 'twork-builder'), value: 'fas fa-baby' },
    { label: __('Brain (Psychology)', 'twork-builder'), value: 'fas fa-brain' },
    { label: __('Female (Gynecology)', 'twork-builder'), value: 'fas fa-female' },
    { label: __('Carrot (Nutrition)', 'twork-builder'), value: 'fas fa-carrot' },
    { label: __('Heartbeat (Cardiology)', 'twork-builder'), value: 'fas fa-heartbeat' },
    { label: __('Notes Medical (Report Review)', 'twork-builder'), value: 'fas fa-notes-medical' },
    { label: __('User MD', 'twork-builder'), value: 'fas fa-user-md' },
    { label: __('Lungs', 'twork-builder'), value: 'fas fa-lungs' },
];

export default function Edit({ attributes, setAttributes }) {
    const { iconClass, title } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-tele-specialty-item-editor'
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Specialty Item', 'twork-builder')} initialOpen={true}>
                    <SelectControl
                        label={__('Icon', 'twork-builder')}
                        value={iconClass}
                        options={ICON_OPTIONS}
                        onChange={(val) => setAttributes({ iconClass: val })}
                    />
                    <TextControl
                        label={__('Icon Class (Font Awesome)', 'twork-builder')}
                        value={iconClass}
                        onChange={(val) => setAttributes({ iconClass: val })}
                        help={__('Override: e.g. fas fa-stethoscope', 'twork-builder')}
                    />
                    <TextControl
                        label={__('Title', 'twork-builder')}
                        value={title}
                        onChange={(val) => setAttributes({ title: val })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps} className="specialty-item stagger-card">
                <div className="spec-icon">
                    <i className={iconClass || 'fas fa-stethoscope'} aria-hidden="true" />
                </div>
                <RichText
                    tagName="h5"
                    value={title}
                    onChange={(val) => setAttributes({ title: val })}
                    placeholder={__('Specialty title…', 'twork-builder')}
                />
            </div>
        </>
    );
}
