import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
    useBlockProps,
    InspectorControls
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    TextControl,
    ToggleControl,
    Button,
    BaseControl,
    Divider as StableDivider,
    __experimentalDivider as ExperimentalDivider
} from '@wordpress/components';

// Avoid React #130: experimental Divider may be undefined in some WP versions
const Divider = StableDivider || ExperimentalDivider || function DividerFallback() {
    return <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #ddd' }} />;
};

export default function Edit({ attributes, setAttributes }) {
    const {
        sectionPaddingBottom,
        sectionMarginTop,
        sectionMarginBottom,
        containerMaxWidth,
        containerPadding,
        tab1Id,
        tab1Label,
        tab2Id,
        tab2Label,
        scheduleTitle,
        scheduleRows,
        experienceTitle,
        experienceItems,
        bookingSidebarId,
        bookingTitle,
        consultationFeeLabel,
        consultationFeeAmount,
        formDateLabel,
        formNameLabel,
        formNamePlaceholder,
        formButtonText,
        hotlineText
    } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-profile-tabs-section-editor',
        style: {
            paddingBottom: `${sectionPaddingBottom}px`,
            marginTop: `${sectionMarginTop}px`,
            marginBottom: `${sectionMarginBottom}px`,
            border: '2px dashed #e0e0e0',
            borderRadius: '8px',
            position: 'relative'
        }
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        position: 'relative'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: '40px',
        alignItems: 'start'
    };

    const addScheduleRow = () => {
        const newId = scheduleRows.length ? Math.max(...scheduleRows.map(r => r.id)) + 1 : 1;
        setAttributes({
            scheduleRows: [...scheduleRows, { id: newId, day: __('Day', 'twork-builder'), time: __('Time', 'twork-builder'), showAvailableTag: false, availableTagText: '' }]
        });
    };

    const updateScheduleRow = (id, field, value) => {
        setAttributes({
            scheduleRows: scheduleRows.map(row => row.id === id ? { ...row, [field]: value } : row)
        });
    };

    const removeScheduleRow = (id) => {
        setAttributes({ scheduleRows: scheduleRows.filter(r => r.id !== id) });
    };

    const addExperienceItem = () => {
        const newId = experienceItems.length ? Math.max(...experienceItems.map(e => e.id)) + 1 : 1;
        setAttributes({
            experienceItems: [...experienceItems, { id: newId, year: __('Year', 'twork-builder'), description: __('Description', 'twork-builder') }]
        });
    };

    const updateExperienceItem = (id, field, value) => {
        setAttributes({
            experienceItems: experienceItems.map(item => item.id === id ? { ...item, [field]: value } : item)
        });
    };

    const removeExperienceItem = (id) => {
        setAttributes({ experienceItems: experienceItems.filter(e => e.id !== id) });
    };

    // Editor tab state: matches frontend behavior so preview is accurate
    const [activeTab, setActiveTab] = useState(tab1Id);

    const handleTabClick = (tabId) => (e) => {
        e.preventDefault();
        setActiveTab(tabId);
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section', 'twork-builder')} initialOpen={true}>
                    <RangeControl
                        label={__('Padding Bottom (px)', 'twork-builder')}
                        value={sectionPaddingBottom}
                        onChange={(val) => setAttributes({ sectionPaddingBottom: val })}
                        min={0}
                        max={200}
                        step={5}
                    />
                    <RangeControl
                        label={__('Margin Top (px)', 'twork-builder')}
                        value={sectionMarginTop}
                        onChange={(val) => setAttributes({ sectionMarginTop: val })}
                        min={0}
                        max={100}
                        step={5}
                    />
                    <RangeControl
                        label={__('Margin Bottom (px)', 'twork-builder')}
                        value={sectionMarginBottom}
                        onChange={(val) => setAttributes({ sectionMarginBottom: val })}
                        min={0}
                        max={100}
                        step={5}
                    />
                    <RangeControl
                        label={__('Container Max Width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(val) => setAttributes({ containerMaxWidth: val })}
                        min={800}
                        max={1920}
                        step={10}
                    />
                    <RangeControl
                        label={__('Container Padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(val) => setAttributes({ containerPadding: val })}
                        min={0}
                        max={100}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Tab Labels', 'twork-builder')} initialOpen={false}>
                    <TextControl label={__('Tab 1 ID', 'twork-builder')} value={tab1Id} onChange={(val) => setAttributes({ tab1Id: val })} help={__('Used for tab panel id', 'twork-builder')} />
                    <TextControl label={__('Tab 1 Label', 'twork-builder')} value={tab1Label} onChange={(val) => setAttributes({ tab1Label: val })} />
                    <TextControl label={__('Tab 2 ID', 'twork-builder')} value={tab2Id} onChange={(val) => setAttributes({ tab2Id: val })} />
                    <TextControl label={__('Tab 2 Label', 'twork-builder')} value={tab2Label} onChange={(val) => setAttributes({ tab2Label: val })} />
                </PanelBody>

                <PanelBody title={__('Schedule Table', 'twork-builder')} initialOpen={false}>
                    <TextControl label={__('Schedule Title', 'twork-builder')} value={scheduleTitle} onChange={(val) => setAttributes({ scheduleTitle: val })} />
                    <BaseControl label={__('Schedule Rows', 'twork-builder')}>
                        {scheduleRows.map((row) => (
                            <div key={row.id} style={{ marginBottom: 12, padding: 10, background: '#f9f9f9', borderRadius: 4, border: '1px solid #e0e0e0' }}>
                                <TextControl label={__('Day', 'twork-builder')} value={row.day} onChange={(val) => updateScheduleRow(row.id, 'day', val)} />
                                <TextControl label={__('Time', 'twork-builder')} value={row.time} onChange={(val) => updateScheduleRow(row.id, 'time', val)} />
                                <ToggleControl
                                    label={__('Show available tag', 'twork-builder')}
                                    checked={row.showAvailableTag}
                                    onChange={(val) => updateScheduleRow(row.id, 'showAvailableTag', val)}
                                    style={{ marginTop: 8 }}
                                />
                                {row.showAvailableTag && (
                                    <TextControl label={__('Available tag text', 'twork-builder')} value={row.availableTagText} onChange={(val) => updateScheduleRow(row.id, 'availableTagText', val)} />
                                )}
                                <Button isDestructive isSmall onClick={() => removeScheduleRow(row.id)} style={{ marginTop: 8 }}>{__('Remove', 'twork-builder')}</Button>
                            </div>
                        ))}
                        <Button isPrimary isSmall onClick={addScheduleRow}>{__('Add Row', 'twork-builder')}</Button>
                    </BaseControl>
                </PanelBody>

                <PanelBody title={__('Experience / Education', 'twork-builder')} initialOpen={false}>
                    <TextControl label={__('Experience Title', 'twork-builder')} value={experienceTitle} onChange={(val) => setAttributes({ experienceTitle: val })} />
                    <BaseControl label={__('Experience Items', 'twork-builder')}>
                        {experienceItems.map((item) => (
                            <div key={item.id} style={{ marginBottom: 12, padding: 10, background: '#f9f9f9', borderRadius: 4, border: '1px solid #e0e0e0' }}>
                                <TextControl label={__('Year', 'twork-builder')} value={item.year} onChange={(val) => updateExperienceItem(item.id, 'year', val)} />
                                <TextControl label={__('Description', 'twork-builder')} value={item.description} onChange={(val) => updateExperienceItem(item.id, 'description', val)} />
                                <Button isDestructive isSmall onClick={() => removeExperienceItem(item.id)} style={{ marginTop: 8 }}>{__('Remove', 'twork-builder')}</Button>
                            </div>
                        ))}
                        <Button isPrimary isSmall onClick={addExperienceItem}>{__('Add Item', 'twork-builder')}</Button>
                    </BaseControl>
                </PanelBody>

                <PanelBody title={__('Booking Sidebar', 'twork-builder')} initialOpen={false}>
                    <TextControl label={__('Sidebar ID (anchor)', 'twork-builder')} value={bookingSidebarId} onChange={(val) => setAttributes({ bookingSidebarId: val })} help={__('e.g. #book for Book Appointment link', 'twork-builder')} />
                    <TextControl label={__('Booking Title', 'twork-builder')} value={bookingTitle} onChange={(val) => setAttributes({ bookingTitle: val })} />
                    <TextControl label={__('Consultation Fee Label', 'twork-builder')} value={consultationFeeLabel} onChange={(val) => setAttributes({ consultationFeeLabel: val })} />
                    <TextControl label={__('Consultation Fee Amount', 'twork-builder')} value={consultationFeeAmount} onChange={(val) => setAttributes({ consultationFeeAmount: val })} />
                    {Divider && <Divider />}
                    <TextControl label={__('Date Label', 'twork-builder')} value={formDateLabel} onChange={(val) => setAttributes({ formDateLabel: val })} />
                    <TextControl label={__('Name Label', 'twork-builder')} value={formNameLabel} onChange={(val) => setAttributes({ formNameLabel: val })} />
                    <TextControl label={__('Name Placeholder', 'twork-builder')} value={formNamePlaceholder} onChange={(val) => setAttributes({ formNamePlaceholder: val })} />
                    <TextControl label={__('Button Text', 'twork-builder')} value={formButtonText} onChange={(val) => setAttributes({ formButtonText: val })} />
                    <TextControl label={__('Hotline Text', 'twork-builder')} value={hotlineText} onChange={(val) => setAttributes({ hotlineText: val })} />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="jivaka-container" style={containerStyle}>
                    <div className="profile-grid" style={gridStyle}>
                        <div className="main-content animate-item">
                            <div className="tabs-nav" style={{ display: 'flex', borderBottom: '2px solid #eee', marginBottom: 30, gap: 20 }} role="tablist">
                                <button
                                    type="button"
                                    className={'tab-btn' + (activeTab === tab1Id ? ' active' : '')}
                                    style={{
                                        padding: '15px 10px',
                                        fontWeight: 700,
                                        color: activeTab === tab1Id ? '#f48b2a' : '#666',
                                        border: 'none',
                                        background: 'none',
                                        borderBottom: '3px solid ' + (activeTab === tab1Id ? '#f48b2a' : 'transparent'),
                                        cursor: 'pointer'
                                    }}
                                    onClick={handleTabClick(tab1Id)}
                                    data-tab={tab1Id}
                                    id={`tab-${tab1Id}-editor`}
                                    role="tab"
                                    aria-selected={activeTab === tab1Id}
                                    aria-controls={tab1Id}
                                >
                                    {tab1Label}
                                </button>
                                <button
                                    type="button"
                                    className={'tab-btn' + (activeTab === tab2Id ? ' active' : '')}
                                    style={{
                                        padding: '15px 10px',
                                        fontWeight: 700,
                                        color: activeTab === tab2Id ? '#f48b2a' : '#666',
                                        border: 'none',
                                        background: 'none',
                                        borderBottom: '3px solid ' + (activeTab === tab2Id ? '#f48b2a' : 'transparent'),
                                        cursor: 'pointer'
                                    }}
                                    onClick={handleTabClick(tab2Id)}
                                    data-tab={tab2Id}
                                    id={`tab-${tab2Id}-editor`}
                                    role="tab"
                                    aria-selected={activeTab === tab2Id}
                                    aria-controls={tab2Id}
                                >
                                    {tab2Label}
                                </button>
                            </div>

                            <div
                                id={tab1Id}
                                className={'tab-content' + (activeTab === tab1Id ? ' active' : '')}
                                role="tabpanel"
                                aria-labelledby={`tab-${tab1Id}-editor`}
                                style={{ display: activeTab === tab1Id ? 'block' : 'none', marginBottom: 30 }}
                            >
                                <h3 style={{ marginBottom: 20 }}>{scheduleTitle}</h3>
                                <table className="schedule-table" style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', border: '1px solid #eee', borderRadius: 8, overflow: 'hidden' }}>
                                    <tbody>
                                        {scheduleRows.map((row) => (
                                            <tr key={row.id} style={{ borderBottom: '1px solid #eee' }}>
                                                <th style={{ padding: '15px 20px', textAlign: 'left', background: '#f9f9f9', fontWeight: 700, width: '30%' }}>{row.day}</th>
                                                <td style={{ padding: '15px 20px' }}>
                                                    {row.time}
                                                    {row.showAvailableTag && row.availableTagText && (
                                                        <span className="available-tag" style={{ marginLeft: 10, background: '#e6fffa', color: '#00b894', padding: '3px 10px', borderRadius: 4, fontSize: '0.8rem', fontWeight: 600 }}>{row.availableTagText}</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div
                                id={tab2Id}
                                className={'tab-content' + (activeTab === tab2Id ? ' active' : '')}
                                role="tabpanel"
                                aria-labelledby={`tab-${tab2Id}-editor`}
                                style={{ display: activeTab === tab2Id ? 'block' : 'none', marginBottom: 20 }}
                            >
                                <h3 style={{ marginBottom: 20 }}>{experienceTitle}</h3>
                                <ul style={{ listStyle: 'disc', paddingLeft: 20, color: '#666' }}>
                                    {experienceItems.map((item) => (
                                        <li key={item.id} style={{ marginBottom: 8 }}><strong>{item.year}:</strong> {item.description}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="booking-sidebar animate-item" style={{ background: '#fff', border: '1px solid #eee', padding: 30, borderRadius: 8, boxShadow: '0 5px 20px rgba(0,0,0,0.05)', position: 'sticky', top: 100 }}>
                            <h3 style={{ color: '#f48b2a', marginTop: 0 }}>{bookingTitle}</h3>
                            <p style={{ marginBottom: 20 }}>{consultationFeeLabel} <strong>{consultationFeeAmount}</strong></p>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div style={{ marginBottom: 15 }}>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 5 }}>{formDateLabel}</label>
                                    <input type="date" readOnly disabled style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 5 }} />
                                </div>
                                <div style={{ marginBottom: 20 }}>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: 5 }}>{formNameLabel}</label>
                                    <input type="text" placeholder={formNamePlaceholder} readOnly disabled style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 5 }} />
                                </div>
                                <button type="button" className="jivaka-btn btn-primary" style={{ width: '100%', padding: '12px 30px', borderRadius: 5, fontWeight: 700, background: '#f48b2a', color: '#fff', border: 'none', cursor: 'default' }}>{formButtonText}</button>
                            </form>
                            <p style={{ fontSize: '0.8rem', marginTop: 15, textAlign: 'center' }}>Hotline: {hotlineText}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
