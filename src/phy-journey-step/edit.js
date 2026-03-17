import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { title, description } = attributes;

    const blockProps = useBlockProps({
        className: 'phy-journey-item twork-phy-journey-step-editor',
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Journey step', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Title (with step number)', 'twork-builder')}
                        value={title || ''}
                        onChange={(val) => setAttributes({ title: val })}
                        help={__('e.g. \"1. Initial Assessment\"', 'twork-builder')}
                    />
                    <TextControl
                        label={__('Short description', 'twork-builder')}
                        value={description || ''}
                        onChange={(val) => setAttributes({ description: val })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <RichText
                    tagName="h3"
                    value={title}
                    onChange={(val) => setAttributes({ title: val })}
                    placeholder={__('1. Initial Assessment', 'twork-builder')}
                />
                <RichText
                    tagName="p"
                    value={description}
                    onChange={(val) => setAttributes({ description: val })}
                    placeholder={__('Step description…', 'twork-builder')}
                />
            </div>
        </>
    );
}

