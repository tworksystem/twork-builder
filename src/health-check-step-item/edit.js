import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { icon, title, description } = attributes;

    const blockProps = useBlockProps({
        className: 'chk-step-item stagger-up twork-chk-step-item-editor',
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Step settings', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Icon class', 'twork-builder')}
                        value={icon || ''}
                        onChange={(val) => setAttributes({ icon: val })}
                        help={__('Font Awesome class, e.g. fas fa-ban, fas fa-calendar-check, fas fa-vial', 'twork-builder')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="chk-step-icon">
                    {icon ? <i className={icon} aria-hidden="true" /> : <i className="fas fa-circle" aria-hidden="true" />}
                </div>
                <RichText
                    tagName="h4"
                    value={title}
                    onChange={(val) => setAttributes({ title: val })}
                    placeholder={__('Step title', 'twork-builder')}
                />
                <RichText
                    tagName="p"
                    value={description}
                    onChange={(val) => setAttributes({ description: val })}
                    placeholder={__('Step description…', 'twork-builder')}
                    style={{ fontSize: '0.9rem', color: '#666' }}
                />
            </div>
        </>
    );
}
