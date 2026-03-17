import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = ['twork/centre-treatment-card'];
const TEMPLATE = [
    ['twork/centre-treatment-card', { iconClass: 'fas fa-brain', title: 'Stroke Management', description: 'Rapid response "Golden Hour" treatment for ischemic and hemorrhagic strokes.' }],
    ['twork/centre-treatment-card', { iconClass: 'fas fa-microscope', title: 'Brain Tumor Surgery', description: 'Precision removal of tumors using neuro-navigation systems to protect healthy tissue.' }],
    ['twork/centre-treatment-card', { iconClass: 'fas fa-bone', title: 'Spinal Surgery', description: 'Treatments for slipped discs, spinal stenosis, and trauma with minimally invasive techniques.' }],
    ['twork/centre-treatment-card', { iconClass: 'fas fa-wave-square', title: 'EEG & EMG Services', description: 'Diagnostic testing for epilepsy, nerve damage, and muscle disorders.' }],
];

export default function Edit({ attributes, setAttributes }) {
    const { sectionId, title, subtitle } = attributes;
    const blockProps = useBlockProps({ className: 'content-section fade-up twork-centre-treatments-editor' });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section', 'twork-builder')}>
                    <TextControl label={__('Section ID', 'twork-builder')} value={sectionId} onChange={(v) => setAttributes({ sectionId: v })} />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps} id={sectionId}>
                <RichText tagName="h2" value={title} onChange={(v) => setAttributes({ title: v })} placeholder={__('Section title...', 'twork-builder')} />
                <RichText tagName="p" value={subtitle} onChange={(v) => setAttributes({ subtitle: v })} className="body-text" placeholder={__('Subtitle...', 'twork-builder')} />
                <div className="treatment-grid">
                    <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} templateLock={false} renderAppender={InnerBlocks.ButtonBlockAppender} />
                </div>
            </div>
        </>
    );
}
