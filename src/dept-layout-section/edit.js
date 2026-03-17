import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    TextControl,
    __experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [
    'twork/dept-overview-section',
    'twork/dept-conditions-section',
    'twork/dept-specialists-section',
    'twork/dept-technology-section',
    'twork/dept-faq-section',
];

const TEMPLATE = [
    ['twork/dept-overview-section', {}],
    ['twork/dept-conditions-section', {}],
    ['twork/dept-specialists-section', {}],
    ['twork/dept-technology-section', {}],
    ['twork/dept-faq-section', {}],
];

export default function Edit({ attributes, setAttributes }) {
    const {
        navItems,
        sidebarTitle,
        sidebarDesc,
        sidebarButtonText,
        sidebarButtonUrl,
        sidebarPhone,
        containerMaxWidth,
        containerPadding,
        paddingTop,
        paddingBottom,
        sidebarWidth,
        gap,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-dept-layout-section twork-dept-layout-editor',
        style: {
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    const updateNavItem = (index, field, value) => {
        const next = [...(navItems || [])];
        if (!next[index]) next[index] = { label: '', href: '#' };
        next[index] = { ...next[index], [field]: value };
        setAttributes({ navItems: next });
    };

    const deptLayoutStyle = {
        '--dept-container-max': `${containerMaxWidth}px`,
        '--dept-container-padding': `${containerPadding}px`,
    };

    const containerStyle = {
        '--dept-sidebar-width': `${sidebarWidth}px`,
        '--dept-gap': `${gap}px`,
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Sidebar Nav', 'twork-builder')} initialOpen={true}>
                    {(navItems || []).map((item, i) => (
                        <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #ddd' }}>
                            <TextControl
                                label={`${__('Link', 'twork-builder')} ${i + 1} ${__('Label', 'twork-builder')}`}
                                value={item?.label || ''}
                                onChange={(v) => updateNavItem(i, 'label', v)}
                            />
                            <TextControl
                                label={`${__('Link', 'twork-builder')} ${i + 1} ${__('URL', 'twork-builder')}`}
                                value={item?.href || '#'}
                                onChange={(v) => updateNavItem(i, 'href', v || '#')}
                            />
                        </div>
                    ))}
                </PanelBody>

                <PanelBody title={__('Sidebar Widget', 'twork-builder')} initialOpen={false}>
                    <TextControl
                        label={__('Title', 'twork-builder')}
                        value={sidebarTitle}
                        onChange={(v) => setAttributes({ sidebarTitle: v })}
                    />
                    <TextControl
                        label={__('Description', 'twork-builder')}
                        value={sidebarDesc}
                        onChange={(v) => setAttributes({ sidebarDesc: v })}
                        multiline
                    />
                    <TextControl
                        label={__('Button Text', 'twork-builder')}
                        value={sidebarButtonText}
                        onChange={(v) => setAttributes({ sidebarButtonText: v })}
                    />
                    <TextControl
                        label={__('Button URL', 'twork-builder')}
                        value={sidebarButtonUrl}
                        onChange={(v) => setAttributes({ sidebarButtonUrl: v })}
                    />
                    <TextControl
                        label={__('Phone', 'twork-builder')}
                        value={sidebarPhone}
                        onChange={(v) => setAttributes({ sidebarPhone: v })}
                    />
                </PanelBody>

                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Container Max Width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(v) => setAttributes({ containerMaxWidth: v })}
                        min={800}
                        max={1920}
                        step={10}
                    />
                    <RangeControl
                        label={__('Container Padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(v) => setAttributes({ containerPadding: v })}
                        min={0}
                        max={80}
                        step={5}
                    />
                    <RangeControl
                        label={__('Sidebar Width (px)', 'twork-builder')}
                        value={sidebarWidth}
                        onChange={(v) => setAttributes({ sidebarWidth: v })}
                        min={200}
                        max={400}
                        step={10}
                    />
                    <RangeControl
                        label={__('Gap (px)', 'twork-builder')}
                        value={gap}
                        onChange={(v) => setAttributes({ gap: v })}
                        min={20}
                        max={80}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding Top (px)', 'twork-builder')}
                        value={paddingTop}
                        onChange={(v) => setAttributes({ paddingTop: v })}
                        min={40}
                        max={120}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding Bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(v) => setAttributes({ paddingBottom: v })}
                        min={40}
                        max={120}
                        step={5}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="dept-layout" style={deptLayoutStyle}>
                    <div className="jivaka-container dept-grid" style={containerStyle}>
                        <aside className="dept-sidebar">
                            <nav className="sidebar-nav" aria-label={__('Section navigation', 'twork-builder')}>
                                {(navItems || []).map((item, i) => (
                                    <a
                                        key={i}
                                        href={item?.href || '#'}
                                        className="dept-editor-nav-link"
                                        onClick={(e) => e.preventDefault()}
                                        role="presentation"
                                    >
                                        {item?.label || `Link ${i + 1}`} <i className="fas fa-chevron-right" />
                                    </a>
                                ))}
                            </nav>
                            <div className="sidebar-widget desktop-only">
                                <h4>{sidebarTitle}</h4>
                                <p>{sidebarDesc}</p>
                                <span className="jivaka-btn btn-primary dept-editor-btn">
                                    {sidebarButtonText}
                                </span>
                                <div className="sidebar-widget-phone">
                                    <i className="fas fa-phone-alt" /> {sidebarPhone}
                                </div>
                            </div>
                        </aside>
                        <div className="content-area dept-content-area-editor">
                            <div className="dept-editor-label">
                                {__('Content Sections', 'twork-builder')}
                            </div>
                            <InnerBlocks
                                allowedBlocks={ALLOWED_BLOCKS}
                                template={TEMPLATE}
                                renderAppender={InnerBlocks.ButtonBlockAppender}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
