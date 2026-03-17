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
    RangeControl,
    __experimentalDivider as Divider
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        wardName,
        timeSlot,
        iconClass,
        wardNameColor,
        wardNameFontSize,
        wardNameFontWeight,
        timeSlotColor,
        timeSlotFontSize,
        timeSlotBgColor,
        iconColor,
        rowPaddingVertical
    } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-visiting-hours-item-editor hours-row',
        style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: `${rowPaddingVertical}px 0`,
            borderBottom: '1px dashed #eee',
            gap: '16px',
            flexWrap: 'wrap'
        }
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Ward / Area', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Ward Name', 'twork-builder')}
                        value={wardName}
                        onChange={(val) => setAttributes({ wardName: val })}
                        help={__('e.g. General Ward, ICU / CCU', 'twork-builder')}
                    />
                    <TextControl
                        label={__('Icon Class', 'twork-builder')}
                        value={iconClass}
                        onChange={(val) => setAttributes({ iconClass: val })}
                        help={__('Font Awesome class, e.g. fas fa-procedures, fas fa-heartbeat', 'twork-builder')}
                    />
                    <PanelColorSettings
                        title={__('Ward Name Color', 'twork-builder')}
                        colorSettings={[
                            { value: wardNameColor, onChange: (val) => setAttributes({ wardNameColor: val }), label: __('Text Color', 'twork-builder') },
                            { value: iconColor, onChange: (val) => setAttributes({ iconColor: val }), label: __('Icon Color', 'twork-builder') }
                        ]}
                    />
                    <RangeControl
                        label={__('Font Size (rem)', 'twork-builder')}
                        value={wardNameFontSize}
                        onChange={(val) => setAttributes({ wardNameFontSize: val })}
                        min={0.9}
                        max={1.5}
                        step={0.05}
                    />
                    <RangeControl
                        label={__('Font Weight', 'twork-builder')}
                        value={wardNameFontWeight}
                        onChange={(val) => setAttributes({ wardNameFontWeight: val })}
                        min={400}
                        max={900}
                        step={100}
                    />
                </PanelBody>

                <PanelBody title={__('Time Slot', 'twork-builder')} initialOpen={false}>
                    <TextControl
                        label={__('Time Slot Text', 'twork-builder')}
                        value={timeSlot}
                        onChange={(val) => setAttributes({ timeSlot: val })}
                        help={__('e.g. 10:00 AM – 8:00 PM or 24 Hours Allowed', 'twork-builder')}
                    />
                    <PanelColorSettings
                        title={__('Time Slot Styling', 'twork-builder')}
                        colorSettings={[
                            { value: timeSlotColor, onChange: (val) => setAttributes({ timeSlotColor: val }), label: __('Text Color', 'twork-builder') },
                            { value: timeSlotBgColor, onChange: (val) => setAttributes({ timeSlotBgColor: val }), label: __('Background Color', 'twork-builder') }
                        ]}
                    />
                    <RangeControl
                        label={__('Font Size (rem)', 'twork-builder')}
                        value={timeSlotFontSize}
                        onChange={(val) => setAttributes({ timeSlotFontSize: val })}
                        min={0.75}
                        max={1.2}
                        step={0.05}
                    />
                </PanelBody>

                <PanelBody title={__('Row Spacing', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Padding Vertical (px)', 'twork-builder')}
                        value={rowPaddingVertical}
                        onChange={(val) => setAttributes({ rowPaddingVertical: val })}
                        min={8}
                        max={30}
                        step={2}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <span
                    className="ward-name"
                    style={{
                        fontWeight: wardNameFontWeight,
                        fontSize: `${wardNameFontSize}rem`,
                        color: wardNameColor,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        flex: 1,
                        minWidth: 0
                    }}
                >
                    {iconClass && <i className={iconClass} style={{ color: iconColor, flexShrink: 0 }} aria-hidden="true" />}
                    <RichText
                        tagName="span"
                        value={wardName}
                        onChange={(val) => setAttributes({ wardName: val })}
                        placeholder={__('Ward name...', 'twork-builder')}
                        style={{ border: 'none', background: 'none' }}
                    />
                </span>
                <span
                    className="time-slot"
                    style={{
                        fontWeight: 500,
                        color: timeSlotColor,
                        background: timeSlotBgColor,
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontSize: `${timeSlotFontSize}rem`,
                        flexShrink: 0
                    }}
                >
                    <RichText
                        tagName="span"
                        value={timeSlot}
                        onChange={(val) => setAttributes({ timeSlot: val })}
                        placeholder={__('Time slot...', 'twork-builder')}
                        style={{ border: 'none', background: 'none' }}
                    />
                </span>
            </div>
        </>
    );
}
