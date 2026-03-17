import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = ['twork/feature-card'];
const TEMPLATE = [
    ['twork/feature-card', { title: 'Advanced Tech', description: '4K Laparoscopy towers and modern modular operation theaters.', iconClass: 'fas fa-microscope' }],
    ['twork/feature-card', { title: 'Expert Team', description: 'Senior consultants with over 20 years of surgical experience.', iconClass: 'fas fa-user-md' }],
    ['twork/feature-card', { title: 'Patient Centric', description: 'Personalized care plans ensuring comfort and safety.', iconClass: 'fas fa-heart-pulse' }],
];

export default function Edit({ attributes, setAttributes }) {
    const {
        sectionId,
        containerClass,
        columns,
        columnsTablet,
        columnsMobile,
        gap,
        containerMaxWidth,
        containerPadding,
        gridMinItemWidth,
    } = attributes;

    const blockProps = useBlockProps({
        className: `twork-features-section-editor ${(containerClass || 'container').trim()}`.trim(),
        id: sectionId || undefined,
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
    };

    const gridStyle = {
        '--features-columns': columns,
        '--features-gap': `${gap}px`,
        '--features-min-item': `${gridMinItemWidth}px`,
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${gridMinItemWidth}px, 1fr))`,
        gap: `${gap}px`,
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Section ID (anchor)', 'twork-builder')}
                        value={sectionId}
                        onChange={(v) => setAttributes({ sectionId: v || 'about' })}
                        help={__('e.g. #about for in-page links', 'twork-builder')}
                    />
                    <TextControl
                        label={__('Container class', 'twork-builder')}
                        value={containerClass}
                        onChange={(v) => setAttributes({ containerClass: v || 'container' })}
                    />
                </PanelBody>
                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Columns (Desktop)', 'twork-builder')}
                        value={columns}
                        onChange={(v) => setAttributes({ columns: v })}
                        min={1}
                        max={6}
                        step={1}
                    />
                    <RangeControl
                        label={__('Columns (Tablet)', 'twork-builder')}
                        value={columnsTablet}
                        onChange={(v) => setAttributes({ columnsTablet: v })}
                        min={1}
                        max={4}
                        step={1}
                    />
                    <RangeControl
                        label={__('Columns (Mobile)', 'twork-builder')}
                        value={columnsMobile}
                        onChange={(v) => setAttributes({ columnsMobile: v })}
                        min={1}
                        max={2}
                        step={1}
                    />
                    <RangeControl
                        label={__('Gap (px)', 'twork-builder')}
                        value={gap}
                        onChange={(v) => setAttributes({ gap: v })}
                        min={0}
                        max={60}
                        step={5}
                    />
                    <RangeControl
                        label={__('Min card width (px)', 'twork-builder')}
                        value={gridMinItemWidth}
                        onChange={(v) => setAttributes({ gridMinItemWidth: v })}
                        min={200}
                        max={400}
                        step={10}
                        help={__('auto-fit minmax value', 'twork-builder')}
                    />
                </PanelBody>
                <PanelBody title={__('Container', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Max width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(v) => setAttributes({ containerMaxWidth: v })}
                        min={800}
                        max={1920}
                        step={10}
                    />
                    <RangeControl
                        label={__('Padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(v) => setAttributes({ containerPadding: v })}
                        min={0}
                        max={80}
                        step={4}
                    />
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="editor-label" style={{
                    textAlign: 'center',
                    padding: '10px',
                    background: '#2271b1',
                    color: '#fff',
                    fontWeight: '600',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                    borderRadius: '4px',
                }}>
                    {__('Features Section (Editor View)', 'twork-builder')}
                </div>
                <div style={containerStyle}>
                    <div
                        className="twork-features-grid-container features-grid"
                        style={gridStyle}
                        data-columns={columns}
                    >
                        <InnerBlocks
                            allowedBlocks={ALLOWED_BLOCKS}
                            template={TEMPLATE}
                            templateLock={false}
                            renderAppender={InnerBlocks.ButtonBlockAppender}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
