import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText,
    PanelColorSettings,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, ToggleControl, RangeControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        sectionTitle,
        sectionSubtitle,
        sectionTitleColor,
        sectionSubtitleColor,
        columnHeaders,
        rows,
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        secondaryColor,
        checkColor,
        crossColor,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'chk-section chk-compare-section twork-health-check-compare-editor',
        style: {
            backgroundColor: backgroundColor || '#f4f8fb',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            '--chk-secondary': secondaryColor || '#005f73',
            '--chk-check-color': checkColor || '#2ecc71',
            '--chk-cross-color': crossColor || '#e74c3c',
        },
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
    };

    const cols = Array.isArray(columnHeaders) ? columnHeaders : [];
    const dataRows = Array.isArray(rows) ? rows : [];
    const valueCount = Math.max(0, cols.length - 1);

    const addColumn = () => {
        const newHeader = __('New', 'twork-builder');
        setAttributes({
            columnHeaders: [...cols, newHeader],
            rows: dataRows.map((r) => ({
                feature: r.feature,
                values: [...(r.values || []), false],
            })),
        });
    };

    const updateColumn = (index, value) => {
        const next = [...cols];
        next[index] = value;
        setAttributes({ columnHeaders: next });
    };

    const removeColumn = (index) => {
        if (cols.length <= 1) return;
        setAttributes({
            columnHeaders: cols.filter((_, i) => i !== index),
            rows: dataRows.map((r) => ({
                feature: r.feature,
                values: (r.values || []).filter((_, i) => i !== index - 1),
            })),
        });
    };

    const addRow = () => {
        setAttributes({
            rows: [...dataRows, { feature: __('New feature', 'twork-builder'), values: Array(valueCount).fill(false) }],
        });
    };

    const updateRowFeature = (rowIndex, value) => {
        const next = [...dataRows];
        next[rowIndex] = { ...next[rowIndex], feature: value };
        setAttributes({ rows: next });
    };

    const updateRowValue = (rowIndex, colIndex, value) => {
        const next = [...dataRows];
        const vals = [...(next[rowIndex].values || [])];
        vals[colIndex] = !!value;
        next[rowIndex] = { ...next[rowIndex], values: vals };
        setAttributes({ rows: next });
    };

    const removeRow = (rowIndex) => {
        setAttributes({ rows: dataRows.filter((_, i) => i !== rowIndex) });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section header', 'twork-builder')} initialOpen={true}>
                    <PanelColorSettings
                        colorSettings={[
                            { value: sectionTitleColor, onChange: (v) => setAttributes({ sectionTitleColor: v ?? undefined }), label: __('Title color', 'twork-builder') },
                            { value: sectionSubtitleColor, onChange: (v) => setAttributes({ sectionSubtitleColor: v ?? undefined }), label: __('Subtitle color', 'twork-builder') },
                        ]}
                    />
                </PanelBody>
                <PanelBody title={__('Table columns', 'twork-builder')} initialOpen={true}>
                    {cols.map((h, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                            <TextControl value={h} onChange={(v) => updateColumn(i, v)} placeholder={i === 0 ? __('Test / Service', 'twork-builder') : __('Column', 'twork-builder')} style={{ flex: 1 }} />
                            {cols.length > 1 && <Button isDestructive isSmall onClick={() => removeColumn(i)} icon="no-alt" aria-label={__('Remove column', 'twork-builder')} />}
                        </div>
                    ))}
                    <Button isSecondary isSmall onClick={addColumn}>{__('Add column', 'twork-builder')}</Button>
                </PanelBody>
                <PanelBody title={__('Table rows', 'twork-builder')} initialOpen={false}>
                    {dataRows.map((row, rowIndex) => (
                        <div key={rowIndex} style={{ border: '1px solid #ddd', borderRadius: 4, padding: 12, marginBottom: 12 }}>
                            <TextControl label={__('Feature name', 'twork-builder')} value={row.feature || ''} onChange={(v) => updateRowFeature(rowIndex, v)} style={{ marginBottom: 8 }} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {(row.values || []).map((val, colIndex) => (
                                    <ToggleControl
                                        key={colIndex}
                                        label={cols[colIndex + 1] || `Col ${colIndex + 1}`}
                                        checked={!!val}
                                        onChange={(v) => updateRowValue(rowIndex, colIndex, v)}
                                    />
                                ))}
                            </div>
                            <Button isDestructive isSmall onClick={() => removeRow(rowIndex)} style={{ marginTop: 8 }}>{__('Remove row', 'twork-builder')}</Button>
                        </div>
                    ))}
                    <Button isSecondary isSmall onClick={addRow}>{__('Add row', 'twork-builder')}</Button>
                </PanelBody>
                <PanelBody title={__('Colors', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        colorSettings={[
                            { value: backgroundColor, onChange: (v) => setAttributes({ backgroundColor: v ?? undefined }), label: __('Section background', 'twork-builder') },
                            { value: secondaryColor, onChange: (v) => setAttributes({ secondaryColor: v ?? undefined }), label: __('Header text', 'twork-builder') },
                            { value: checkColor, onChange: (v) => setAttributes({ checkColor: v ?? undefined }), label: __('Check icon', 'twork-builder') },
                            { value: crossColor, onChange: (v) => setAttributes({ crossColor: v ?? undefined }), label: __('Cross icon', 'twork-builder') },
                        ]}
                    />
                </PanelBody>
                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl label={__('Padding top (px)', 'twork-builder')} value={paddingTop} onChange={(v) => setAttributes({ paddingTop: v })} min={0} max={200} step={5} />
                    <RangeControl label={__('Padding bottom (px)', 'twork-builder')} value={paddingBottom} onChange={(v) => setAttributes({ paddingBottom: v })} min={0} max={200} step={5} />
                    <RangeControl label={__('Container max width (px)', 'twork-builder')} value={containerMaxWidth} onChange={(v) => setAttributes({ containerMaxWidth: v })} min={800} max={1400} step={20} />
                    <RangeControl label={__('Container padding (px)', 'twork-builder')} value={containerPadding} onChange={(v) => setAttributes({ containerPadding: v })} min={0} max={80} step={5} />
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="chk-container" style={containerStyle}>
                    <div className="chk-header fade-up">
                        <RichText tagName="h2" value={sectionTitle} onChange={(v) => setAttributes({ sectionTitle: v })} placeholder={__('Package Comparison', 'twork-builder')} style={{ color: sectionTitleColor, marginBottom: 15, marginTop: 0 }} />
                        <RichText tagName="p" value={sectionSubtitle} onChange={(v) => setAttributes({ sectionSubtitle: v })} style={{ color: sectionSubtitleColor, margin: 0 }} />
                    </div>
                    <div className="chk-table-wrap fade-up">
                        <table className="chk-table">
                            <thead>
                                <tr>
                                    {cols.map((h, i) => (
                                        <th key={i}>{h || (i === 0 ? __('Test / Service', 'twork-builder') : __('Column', 'twork-builder'))}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {dataRows.map((row, rowIndex) => {
                                    const vals = Array.from({ length: valueCount }, (_, i) => (row.values || [])[i] ?? false);
                                    return (
                                    <tr key={rowIndex}>
                                        <td>{row.feature || '—'}</td>
                                        {vals.map((val, colIndex) => (
                                            <td key={colIndex}>
                                                {val ? <i className="fas fa-check chk-check" aria-hidden="true" /> : <i className="fas fa-times chk-cross" aria-hidden="true" />}
                                            </td>
                                        ))}
                                    </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}
