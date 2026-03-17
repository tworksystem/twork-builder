import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { question, answer } = attributes;

    const blockProps = useBlockProps({
        className: 'hc-faq-item twork-hc-faq-item-editor',
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('FAQ Item', 'twork-builder')} initialOpen={true}>
                    <p style={{ margin: 0, color: '#666', fontSize: 12 }}>
                        {__('Edit the question and answer in the canvas.', 'twork-builder')}
                    </p>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="hc-faq-q-editor" style={{ padding: '15px 0', fontWeight: 600, marginBottom: 8 }}>
                    <RichText
                        tagName="span"
                        value={question}
                        onChange={(val) => setAttributes({ question: val })}
                        placeholder={__('Question…', 'twork-builder')}
                    />
                    <i className="fas fa-plus" aria-hidden="true" style={{ marginLeft: 8, opacity: 0.7 }} />
                </div>
                <RichText
                    tagName="div"
                    className="hc-faq-a"
                    value={answer}
                    onChange={(val) => setAttributes({ answer: val })}
                    placeholder={__('Answer…', 'twork-builder')}
                    style={{ paddingBottom: 12, color: '#666', fontSize: '0.95rem' }}
                />
            </div>
        </>
    );
}
