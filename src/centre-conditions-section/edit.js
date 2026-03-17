import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

const ALLOWED_BLOCKS = ['twork/centre-condition-card'];
const TEMPLATE = [
    ['twork/centre-condition-card', { iconClass: 'fas fa-heart-broken', title: 'Coronary Artery Disease' }],
    ['twork/centre-condition-card', { iconClass: 'fas fa-bolt', title: 'Arrhythmia' }],
    ['twork/centre-condition-card', { iconClass: 'fas fa-heartbeat', title: 'Heart Failure' }],
    ['twork/centre-condition-card', { iconClass: 'fas fa-child', title: 'Congenital Defects' }],
    ['twork/centre-condition-card', { iconClass: 'fas fa-procedures', title: 'Valvular Disease' }],
    ['twork/centre-condition-card', { iconClass: 'fas fa-user-md', title: 'Hypertension' }],
];

export default function Edit({ attributes, setAttributes }) {
    const { sectionId, title, showSection } = attributes;
    const blockProps = useBlockProps({
        className: 'content-section fade-up twork-centre-conditions-editor',
        id: sectionId,
    });

    if (showSection === false) {
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Conditions Section', 'twork-builder')} initialOpen={true}>
                        <ToggleControl
                            label={__('Show section', 'twork-builder')}
                            checked={false}
                            onChange={(v) => setAttributes({ showSection: v })}
                            help={__('Display this section on the page. When off, hidden in Editor, Front-end, and Responsive.', 'twork-builder')}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps} className={(blockProps.className || '') + ' centre-conditions-section-placeholder'} style={{ padding: 20, background: '#f5f5f5', border: '1px dashed #ccc', borderRadius: 8 }}>
                    <div className="editor-label editor-label--hidden" style={{ textAlign: 'center', padding: '10px 16px', background: '#856404', color: '#fff', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', marginBottom: 12, borderRadius: 4 }}>
                        {__('Conditions We Treat (Hidden)', 'twork-builder')}
                    </div>
                    <p style={{ margin: 0, color: '#666', fontSize: '13px', lineHeight: 1.5 }}>{__('Conditions section is hidden. Turn “Show section” on in block settings to display it.', 'twork-builder')}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Conditions Section', 'twork-builder')} initialOpen={true}>
                    <ToggleControl
                        label={__('Show section', 'twork-builder')}
                        checked={showSection !== false}
                        onChange={(v) => setAttributes({ showSection: v })}
                        help={__('Display this section on the page. When off, hidden in Editor, Front-end, and Responsive.', 'twork-builder')}
                    />
                    <TextControl
                        label={__('Section ID (anchor)', 'twork-builder')}
                        value={sectionId}
                        onChange={(v) => setAttributes({ sectionId: v || 'conditions' })}
                        help={__('e.g. #conditions for sidebar links', 'twork-builder')}
                    />
                    <TextControl
                        label={__('Section title', 'twork-builder')}
                        value={title}
                        onChange={(v) => setAttributes({ title: v })}
                    />
                </PanelBody>
            </InspectorControls>
            <section {...blockProps} id={sectionId}>
                <RichText
                    tagName="h2"
                    value={title}
                    onChange={(v) => setAttributes({ title: v })}
                    placeholder={__('Conditions We Treat', 'twork-builder')}
                />
                <div className="conditions-grid">
                    <InnerBlocks
                        allowedBlocks={ALLOWED_BLOCKS}
                        template={TEMPLATE}
                        templateLock={false}
                        renderAppender={InnerBlocks.ButtonBlockAppender}
                    />
                </div>
            </section>
        </>
    );
}
