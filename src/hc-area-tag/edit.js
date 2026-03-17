import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { label } = attributes;

    const blockProps = useBlockProps({
        className: 'hc-area-tag twork-hc-area-tag-editor',
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Area tag', 'twork-builder')} initialOpen={true}>
                    <p style={{ margin: 0, color: '#666', fontSize: 12 }}>
                        {__('Edit the tag text in the canvas.', 'twork-builder')}
                    </p>
                </PanelBody>
            </InspectorControls>

            <span {...blockProps}>
                <RichText
                    tagName="span"
                    value={label}
                    onChange={(val) => setAttributes({ label: val })}
                    placeholder={__('Township or area…', 'twork-builder')}
                    withoutInteractiveFormatting
                />
            </span>
        </>
    );
}
