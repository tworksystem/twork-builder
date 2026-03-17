import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = ['twork/dept-doc-card-item'];
const TEMPLATE = [
    ['twork/dept-doc-card-item', { name: 'Dr. Kyaw Swar', specialization: 'Interventional Cardiologist', qualifications: 'MBBS, M.Med.Sc, MRCP (UK)' }],
    ['twork/dept-doc-card-item', { name: 'Dr. Susan May', specialization: 'Cardiothoracic Surgeon', qualifications: 'MBBS, Dr.Med.Sc (Surgery)' }],
];

export default function Edit({ attributes, setAttributes }) {
    const { sectionId, title } = attributes;
    const blockProps = useBlockProps({ className: 'content-section twork-dept-specialists-editor' });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section', 'twork-builder')}>
                    <TextControl label={__('Section ID', 'twork-builder')} value={sectionId} onChange={(v) => setAttributes({ sectionId: v })} />
                    <TextControl label={__('Title', 'twork-builder')} value={title} onChange={(v) => setAttributes({ title: v })} />
                </PanelBody>
            </InspectorControls>
            <section {...blockProps} id={sectionId}>
                <h2>{title}</h2>
                <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} renderAppender={InnerBlocks.ButtonBlockAppender} />
            </section>
        </>
    );
}
