import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    PanelColorSettings,
    RichText
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
    TextControl,
    Button,
    BaseControl,
    __experimentalDivider as Divider
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        paddingTopMobile,
        paddingBottomMobile,
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontSizeMobile,
        sectionTitleFontWeight,
        showSectionSubtitle,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        sectionTitleAlignment,
        sectionHeaderMarginBottom,
        tabsMarginBottom,
        tabs,
        containerMaxWidth,
        containerPadding,
        gridColumns,
        gridColumnsTablet,
        gridColumnsMobile,
        gridGap,
        gridAutoRows
    } = attributes;

    const ALLOWED_BLOCKS = ['twork/gallery-item'];
    const TEMPLATE = [
        ['twork/gallery-item', { imageUrl: 'https://jivakahospital.com/wp-content/uploads/2025/10/img-box-04.jpg', imageAlt: 'Cath Lab', category: 'tech' }],
        ['twork/gallery-item', { imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800', imageAlt: 'Room', category: 'rooms' }],
        ['twork/gallery-item', { imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', imageAlt: 'Lobby', category: 'amenity' }],
        ['twork/gallery-item', { imageUrl: 'https://jivakahospital.com/wp-content/uploads/2025/10/img-box-02.jpg', imageAlt: 'OT Room', category: 'tech' }],
        ['twork/gallery-item', { imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800', imageAlt: 'Reception', category: 'amenity' }],
        ['twork/gallery-item', { imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800', imageAlt: 'Corridor', category: 'rooms' }],
        ['twork/gallery-item', { imageUrl: 'https://images.unsplash.com/photo-1554743365-a80c1243316e?auto=format&fit=crop&q=80&w=800', imageAlt: 'Cafeteria', category: 'amenity' }],
        ['twork/gallery-item', { imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800', imageAlt: 'MRI Scan', category: 'tech' }],
        ['twork/gallery-item', { imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800', imageAlt: 'VIP Room', category: 'rooms' }],
        ['twork/gallery-item', { imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800', imageAlt: 'Laboratory', category: 'tech' }],
        ['twork/gallery-item', { imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800', imageAlt: 'Exterior', category: 'amenity' }],
        ['twork/gallery-item', { imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', imageAlt: 'ICU', category: 'rooms' }]
    ];

    const blockProps = useBlockProps({
        className: 'twork-gallery-section-editor',
        style: {
            backgroundColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            position: 'relative'
        }
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        position: 'relative',
        zIndex: 2
    };

    const sectionHeaderStyle = {
        textAlign: sectionTitleAlignment,
        marginBottom: `${sectionHeaderMarginBottom}px`
    };

    const tabsStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: `${tabsMarginBottom}px`,
        flexWrap: 'wrap'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gap: `${gridGap}px`,
        gridAutoRows: `${gridAutoRows}px`
    };

    const addTab = () => {
        const newId = tabs.length ? Math.max(...tabs.map((t) => t.id)) + 1 : 1;
        setAttributes({ tabs: [...tabs, { id: newId, label: __('New Tab', 'twork-builder'), filter: `filter-${newId}` }] });
    };

    const updateTab = (id, field, value) => {
        setAttributes({
            tabs: tabs.map((t) => (t.id === id ? { ...t, [field]: value } : t))
        });
    };

    const removeTab = (id) => {
        setAttributes({ tabs: tabs.filter((t) => t.id !== id) });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section Title', 'twork-builder')} initialOpen={true}>
                    <ToggleControl label={__('Show Section Title', 'twork-builder')} checked={showSectionTitle} onChange={(val) => setAttributes({ showSectionTitle: val })} />
                    {showSectionTitle && (
                        <>
                            <TextControl label={__('Title Text', 'twork-builder')} value={sectionTitle} onChange={(val) => setAttributes({ sectionTitle: val })} />
                            <PanelColorSettings title={__('Title Color', 'twork-builder')} colorSettings={[{ value: sectionTitleColor, onChange: (val) => setAttributes({ sectionTitleColor: val }), label: __('Title Color', 'twork-builder') }]} />
                            <RangeControl label={__('Font Size (rem)', 'twork-builder')} value={sectionTitleFontSize} onChange={(val) => setAttributes({ sectionTitleFontSize: val })} min={1} max={4} step={0.1} />
                            <RangeControl label={__('Font Size Mobile (rem)', 'twork-builder')} value={sectionTitleFontSizeMobile} onChange={(val) => setAttributes({ sectionTitleFontSizeMobile: val })} min={1} max={3} step={0.1} />
                            <RangeControl label={__('Font Weight', 'twork-builder')} value={sectionTitleFontWeight} onChange={(val) => setAttributes({ sectionTitleFontWeight: val })} min={100} max={900} step={100} />
                            <SelectControl
                                label={__('Alignment', 'twork-builder')}
                                value={sectionTitleAlignment}
                                options={[
                                    { label: __('Left', 'twork-builder'), value: 'left' },
                                    { label: __('Center', 'twork-builder'), value: 'center' },
                                    { label: __('Right', 'twork-builder'), value: 'right' }
                                ]}
                                onChange={(val) => setAttributes({ sectionTitleAlignment: val })}
                            />
                            <RangeControl label={__('Header Margin Bottom (px)', 'twork-builder')} value={sectionHeaderMarginBottom} onChange={(val) => setAttributes({ sectionHeaderMarginBottom: val })} min={20} max={80} step={5} />
                        </>
                    )}
                    <Divider />
                    <ToggleControl label={__('Show Section Subtitle', 'twork-builder')} checked={showSectionSubtitle} onChange={(val) => setAttributes({ showSectionSubtitle: val })} />
                    {showSectionSubtitle && (
                        <>
                            <TextControl label={__('Subtitle Text', 'twork-builder')} value={sectionSubtitle} onChange={(val) => setAttributes({ sectionSubtitle: val })} />
                            <PanelColorSettings title={__('Subtitle Color', 'twork-builder')} colorSettings={[{ value: sectionSubtitleColor, onChange: (val) => setAttributes({ sectionSubtitleColor: val }), label: __('Subtitle Color', 'twork-builder') }]} />
                            <RangeControl label={__('Font Size (rem)', 'twork-builder')} value={sectionSubtitleFontSize} onChange={(val) => setAttributes({ sectionSubtitleFontSize: val })} min={0.8} max={1.5} step={0.05} />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Filter Tabs', 'twork-builder')} initialOpen={true}>
                    <BaseControl label={__('Tabs (label = button text, filter = data-category value)', 'twork-builder')}>
                        {tabs.map((tab) => (
                            <div key={tab.id} style={{ marginBottom: '12px', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <TextControl label={__('Label', 'twork-builder')} value={tab.label} onChange={(val) => updateTab(tab.id, 'label', val)} style={{ flex: '1 1 120px' }} />
                                <TextControl label={__('Filter value', 'twork-builder')} value={tab.filter} onChange={(val) => updateTab(tab.id, 'filter', val)} help={__('Use "all" for show-all tab', 'twork-builder')} style={{ flex: '1 1 100px' }} />
                                <Button isDestructive isSmall onClick={() => removeTab(tab.id)} disabled={tabs.length <= 1}>
                                    {__('Remove', 'twork-builder')}
                                </Button>
                            </div>
                        ))}
                        <Button isPrimary isSmall onClick={addTab}>
                            {__('Add Tab', 'twork-builder')}
                        </Button>
                    </BaseControl>
                    <RangeControl label={__('Tabs Margin Bottom (px)', 'twork-builder')} value={tabsMarginBottom} onChange={(val) => setAttributes({ tabsMarginBottom: val })} min={20} max={60} step={5} />
                </PanelBody>

                <PanelBody title={__('Section Background', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings title={__('Background Color', 'twork-builder')} colorSettings={[{ value: backgroundColor, onChange: (val) => setAttributes({ backgroundColor: val }), label: __('Background Color', 'twork-builder') }]} />
                </PanelBody>

                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl label={__('Grid Columns (Desktop)', 'twork-builder')} value={gridColumns} onChange={(val) => setAttributes({ gridColumns: val })} min={1} max={6} step={1} />
                    <RangeControl label={__('Grid Columns (Tablet)', 'twork-builder')} value={gridColumnsTablet} onChange={(val) => setAttributes({ gridColumnsTablet: val })} min={1} max={4} step={1} />
                    <RangeControl label={__('Grid Columns (Mobile)', 'twork-builder')} value={gridColumnsMobile} onChange={(val) => setAttributes({ gridColumnsMobile: val })} min={1} max={2} step={1} />
                    <RangeControl label={__('Grid Gap (px)', 'twork-builder')} value={gridGap} onChange={(val) => setAttributes({ gridGap: val })} min={0} max={30} step={5} />
                    <RangeControl label={__('Row Height (px)', 'twork-builder')} value={gridAutoRows} onChange={(val) => setAttributes({ gridAutoRows: val })} min={150} max={400} step={10} />
                </PanelBody>

                <PanelBody title={__('Container', 'twork-builder')} initialOpen={false}>
                    <RangeControl label={__('Max Width (px)', 'twork-builder')} value={containerMaxWidth} onChange={(val) => setAttributes({ containerMaxWidth: val })} min={800} max={1920} step={10} />
                    <RangeControl label={__('Container Padding (px)', 'twork-builder')} value={containerPadding} onChange={(val) => setAttributes({ containerPadding: val })} min={0} max={60} step={5} />
                </PanelBody>

                <PanelBody title={__('Section Padding', 'twork-builder')} initialOpen={false}>
                    <RangeControl label={__('Padding Top (px)', 'twork-builder')} value={paddingTop} onChange={(val) => setAttributes({ paddingTop: val })} min={0} max={200} step={5} />
                    <RangeControl label={__('Padding Bottom (px)', 'twork-builder')} value={paddingBottom} onChange={(val) => setAttributes({ paddingBottom: val })} min={0} max={200} step={5} />
                    <RangeControl label={__('Padding Top Mobile (px)', 'twork-builder')} value={paddingTopMobile} onChange={(val) => setAttributes({ paddingTopMobile: val })} min={0} max={120} step={5} />
                    <RangeControl label={__('Padding Bottom Mobile (px)', 'twork-builder')} value={paddingBottomMobile} onChange={(val) => setAttributes({ paddingBottomMobile: val })} min={0} max={120} step={5} />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="jivaka-container" style={containerStyle}>
                    {(showSectionTitle || showSectionSubtitle) && (
                        <div className="section-header fade-up" style={sectionHeaderStyle}>
                            {showSectionTitle && (
                                <RichText
                                    tagName="h2"
                                    value={sectionTitle}
                                    onChange={(val) => setAttributes({ sectionTitle: val })}
                                    placeholder={__('Section Title...', 'twork-builder')}
                                    style={{ fontSize: `${sectionTitleFontSize}rem`, fontWeight: sectionTitleFontWeight, color: sectionTitleColor, marginBottom: showSectionSubtitle ? '10px' : '0' }}
                                />
                            )}
                            {showSectionSubtitle && (
                                <RichText
                                    tagName="p"
                                    value={sectionSubtitle}
                                    onChange={(val) => setAttributes({ sectionSubtitle: val })}
                                    placeholder={__('Subtitle...', 'twork-builder')}
                                    style={{ fontSize: `${sectionSubtitleFontSize}rem`, color: sectionSubtitleColor, margin: 0 }}
                                />
                            )}
                        </div>
                    )}

                    {tabs.length > 0 && (
                        <div className="gallery-tabs fade-up" style={tabsStyle}>
                            {tabs.map((tab, index) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    className={`tab-btn ${index === 0 ? 'active' : ''}`}
                                    data-filter={tab.filter}
                                    style={{ padding: '10px 25px', border: 'none', background: index === 0 ? '#f48b2a' : '#fff', color: index === 0 ? '#fff' : '#666', borderRadius: '30px', fontWeight: 700, cursor: 'default' }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="gallery-grid twork-gallery-grid" style={gridStyle} data-columns={gridColumns}>
                        <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} renderAppender={InnerBlocks.ButtonBlockAppender} />
                    </div>
                </div>
            </div>
        </>
    );
}
