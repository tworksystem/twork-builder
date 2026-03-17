import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { iconClass, title, subtitle } = attributes;

    const blockProps = useBlockProps({
        className: 'paed-cond-card paed-stagger twork-paed-cond-card-editor',
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Condition card', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Icon class (Font Awesome)', 'twork-builder')}
                        value={iconClass || ''}
                        onChange={(val) => setAttributes({ iconClass: val || 'fas fa-lungs' })}
                        help={__('e.g. fas fa-lungs, fas fa-temperature-high, fas fa-baby', 'twork-builder')}
                    />
                    <TextControl
                        label={__('Title', 'twork-builder')}
                        value={title || ''}
                        onChange={(val) => setAttributes({ title: val })}
                    />
                    <TextControl
                        label={__('Subtitle (examples)', 'twork-builder')}
                        value={subtitle || ''}
                        onChange={(val) => setAttributes({ subtitle: val })}
                        help={__('e.g. Asthma, Pneumonia', 'twork-builder')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="paed-cond-icon">
                    {iconClass && <i className={iconClass} aria-hidden="true" />}
                </div>
                <RichText
                    tagName="h5"
                    value={title}
                    onChange={(val) => setAttributes({ title: val })}
                    placeholder={__('Condition title…', 'twork-builder')}
                />
                <RichText
                    tagName="span"
                    value={subtitle}
                    onChange={(val) => setAttributes({ subtitle: val })}
                    placeholder={__('e.g. Asthma, Pneumonia', 'twork-builder')}
                />
            </div>
        </>
    );
}
