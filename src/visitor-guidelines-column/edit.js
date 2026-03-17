import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    PanelColorSettings
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    SelectControl,
    RangeControl,
    Button,
    BaseControl,
    __experimentalDivider as Divider
} from '@wordpress/components';

const DOS_COLOR = '#27ae60';
const DONTS_COLOR = '#c0392b';

export default function Edit({ attributes, setAttributes }) {
    const {
        columnType,
        title,
        titleIcon,
        itemIcon,
        listItems,
        titleColor,
        iconColor,
        titleFontSize,
        titleFontWeight,
        listItemFontSize,
        listItemColor,
        backgroundColor,
        borderColor,
        columnPadding,
        columnPaddingMobile
    } = attributes;

    const effectiveTitleColor = titleColor || (columnType === 'dos' ? DOS_COLOR : DONTS_COLOR);
    const effectiveIconColor = iconColor || (columnType === 'dos' ? DOS_COLOR : DONTS_COLOR);
    const effectiveBg = backgroundColor || (columnType === 'dos' ? '#e8f8f5' : '#fdedec');
    const effectiveBorder = borderColor || (columnType === 'dos' ? '#d1f2eb' : '#fadbd8');

    const blockProps = useBlockProps({
        className: `twork-visitor-guidelines-column-editor guide-col col-${columnType} fade-up`,
        style: {
            padding: `${columnPadding}px`,
            borderRadius: '12px',
            border: '2px dashed #e0e0e0',
            background: effectiveBg,
            borderColor: effectiveBorder
        }
    });

    const addListItem = () => {
        const newItem = {
            id: listItems.length ? Math.max(...listItems.map((i) => i.id)) + 1 : 1,
            text: __('New guideline item', 'twork-builder')
        };
        setAttributes({ listItems: [...listItems, newItem] });
    };

    const updateListItem = (id, text) => {
        const updated = listItems.map((item) => (item.id === id ? { ...item, text } : item));
        setAttributes({ listItems: updated });
    };

    const removeListItem = (id) => {
        setAttributes({ listItems: listItems.filter((item) => item.id !== id) });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Column Type', 'twork-builder')} initialOpen={true}>
                    <SelectControl
                        label={__('Column Type', 'twork-builder')}
                        value={columnType}
                        options={[
                            { label: __("Do's", 'twork-builder'), value: 'dos' },
                            { label: __("Don'ts", 'twork-builder'), value: 'donts' }
                        ]}
                        onChange={(val) => setAttributes({ columnType: val })}
                    />
                    <TextControl
                        label={__('Column Title', 'twork-builder')}
                        value={title}
                        onChange={(val) => setAttributes({ title: val })}
                        help={__("e.g. Do's or Don'ts", 'twork-builder')}
                    />
                    <TextControl
                        label={__('Title Icon Class', 'twork-builder')}
                        value={titleIcon}
                        onChange={(val) => setAttributes({ titleIcon: val })}
                        help={__('Font Awesome: fas fa-check-circle, fas fa-times-circle', 'twork-builder')}
                    />
                    <TextControl
                        label={__('List Item Icon Class', 'twork-builder')}
                        value={itemIcon}
                        onChange={(val) => setAttributes({ itemIcon: val })}
                        help={__('Font Awesome: fas fa-check, fas fa-times', 'twork-builder')}
                    />
                </PanelBody>

                <PanelBody title={__('Title Styling', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Title & Icon Color', 'twork-builder')}
                        colorSettings={[
                            { value: titleColor || (columnType === 'dos' ? DOS_COLOR : DONTS_COLOR), onChange: (val) => setAttributes({ titleColor: val || '' }), label: __('Title Color', 'twork-builder') },
                            { value: iconColor || (columnType === 'dos' ? DOS_COLOR : DONTS_COLOR), onChange: (val) => setAttributes({ iconColor: val || '' }), label: __('Icon Color', 'twork-builder') }
                        ]}
                    />
                    <RangeControl
                        label={__('Title Font Size (rem)', 'twork-builder')}
                        value={titleFontSize}
                        onChange={(val) => setAttributes({ titleFontSize: val })}
                        min={1}
                        max={2.5}
                        step={0.05}
                    />
                    <RangeControl
                        label={__('Title Font Weight', 'twork-builder')}
                        value={titleFontWeight}
                        onChange={(val) => setAttributes({ titleFontWeight: val })}
                        min={400}
                        max={900}
                        step={100}
                    />
                </PanelBody>

                <PanelBody title={__('List Items', 'twork-builder')} initialOpen={false}>
                    <BaseControl label={__('Guideline Items', 'twork-builder')}>
                        {listItems.map((item) => (
                            <div key={item.id} style={{ marginBottom: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <TextControl
                                    value={item.text}
                                    onChange={(val) => updateListItem(item.id, val)}
                                    style={{ flex: 1 }}
                                />
                                <Button isDestructive isSmall onClick={() => removeListItem(item.id)}>
                                    {__('Remove', 'twork-builder')}
                                </Button>
                            </div>
                        ))}
                        <Button isPrimary isSmall onClick={addListItem}>
                            {__('Add Item', 'twork-builder')}
                        </Button>
                    </BaseControl>
                    <Divider />
                    <PanelColorSettings
                        title={__('List Text Color', 'twork-builder')}
                        colorSettings={[
                            { value: listItemColor || '#212121', onChange: (val) => setAttributes({ listItemColor: val || '' }), label: __('Text Color', 'twork-builder') }
                        ]}
                    />
                    <RangeControl
                        label={__('List Font Size (rem)', 'twork-builder')}
                        value={listItemFontSize}
                        onChange={(val) => setAttributes({ listItemFontSize: val })}
                        min={0.85}
                        max={1.2}
                        step={0.05}
                    />
                </PanelBody>

                <PanelBody title={__('Column Styling', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Background & Border', 'twork-builder')}
                        colorSettings={[
                            { value: backgroundColor || (columnType === 'dos' ? '#e8f8f5' : '#fdedec'), onChange: (val) => setAttributes({ backgroundColor: val || '' }), label: __('Background', 'twork-builder') },
                            { value: borderColor || (columnType === 'dos' ? '#d1f2eb' : '#fadbd8'), onChange: (val) => setAttributes({ borderColor: val || '' }), label: __('Border Color', 'twork-builder') }
                        ]}
                    />
                    <RangeControl
                        label={__('Padding Desktop (px)', 'twork-builder')}
                        value={columnPadding}
                        onChange={(val) => setAttributes({ columnPadding: val })}
                        min={16}
                        max={50}
                        step={2}
                    />
                    <RangeControl
                        label={__('Padding Mobile (px)', 'twork-builder')}
                        value={columnPaddingMobile}
                        onChange={(val) => setAttributes({ columnPaddingMobile: val })}
                        min={16}
                        max={40}
                        step={2}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div
                    className="guide-title"
                    style={{
                        fontSize: `${titleFontSize}rem`,
                        fontWeight: titleFontWeight,
                        color: effectiveTitleColor,
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    {titleIcon && <i className={titleIcon} style={{ color: effectiveIconColor }} aria-hidden="true" />}
                    <RichText
                        tagName="span"
                        value={title}
                        onChange={(val) => setAttributes({ title: val })}
                        placeholder={__('Column title...', 'twork-builder')}
                    />
                </div>

                {listItems.length > 0 && (
                    <ul className="guide-list" style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                        {listItems.map((item) => (
                            <li
                                key={item.id}
                                style={{
                                    marginBottom: '15px',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '15px',
                                    fontSize: `${listItemFontSize}rem`,
                                    color: listItemColor || undefined
                                }}
                            >
                                {itemIcon && <i className={itemIcon} style={{ color: effectiveIconColor, marginTop: '4px', flexShrink: 0 }} aria-hidden="true" />}
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
