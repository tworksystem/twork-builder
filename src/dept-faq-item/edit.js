import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes = {}, setAttributes }) {
    const { question = '', answer = '' } = attributes;
    const blockProps = useBlockProps({ className: 'faq-item twork-dept-faq-editor' });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('FAQ', 'twork-builder')}>
                    <TextControl label={__('Question', 'twork-builder')} value={question} onChange={(v) => setAttributes({ question: v })} />
                    <TextControl label={__('Answer', 'twork-builder')} value={answer} onChange={(v) => setAttributes({ answer: v })} multiline />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <button type="button" className="faq-question" disabled>
                    {question} <i className="fas fa-chevron-down" />
                </button>
                <div className="faq-answer" style={{ maxHeight: 'none', overflow: 'visible' }}>
                    <p>{answer}</p>
                </div>
            </div>
        </>
    );
}
