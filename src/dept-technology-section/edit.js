import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = ['twork/dept-tech-item'];
const TEMPLATE = [
    ['twork/dept-tech-item', { caption: 'Philips Azurion Cath Lab' }],
    ['twork/dept-tech-item', { caption: 'Modular Cardiac OT' }],
];

export default function Edit({ attributes, setAttributes }) {
    const { sectionId, title, intro } = attributes;
    const blockProps = useBlockProps({ className: 'content-section twork-dept-technology-editor' });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section', 'twork-builder')}>
                    <TextControl label={__('Section ID', 'twork-builder')} value={sectionId} onChange={(v) => setAttributes({ sectionId: v })} />
                    <TextControl label={__('Title', 'twork-builder')} value={title} onChange={(v) => setAttributes({ title: v })} />
                    <TextControl label={__('Intro', 'twork-builder')} value={intro} onChange={(v) => setAttributes({ intro: v })} multiline />
                </PanelBody>
            </InspectorControls>
            <section {...blockProps} id={sectionId}>
                <h2>{title}</h2>
                <p>{intro}</p>
                <div className="tech-grid">
                    <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} renderAppender={InnerBlocks.ButtonBlockAppender} />
                </div>
            </section>
        </>
    );
}
