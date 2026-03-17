import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    PanelColorSettings
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    SelectControl,
    __experimentalDivider as Divider
} from '@wordpress/components';

const ICON_OPTIONS = [
    { label: __('Shield', 'twork-builder'), value: 'fas fa-shield-alt' },
    { label: __('Umbrella', 'twork-builder'), value: 'fas fa-umbrella' },
    { label: __('Leaf', 'twork-builder'), value: 'fas fa-leaf' },
    { label: __('Building', 'twork-builder'), value: 'fas fa-building' },
    { label: __('Landmark', 'twork-builder'), value: 'fas fa-landmark' },
    { label: __('Hand Holding Heart', 'twork-builder'), value: 'fas fa-hand-holding-heart' },
    { label: __('Globe Asia', 'twork-builder'), value: 'fas fa-globe-asia' },
    { label: __('File Medical', 'twork-builder'), value: 'fas fa-file-medical' },
    { label: __('Heart', 'twork-builder'), value: 'fas fa-heart' },
    { label: __('Handshake', 'twork-builder'), value: 'fas fa-handshake' }
];

export default function Edit({ attributes, setAttributes }) {
    const {
        partnerName,
        iconClass,
        partnerNameColor,
        partnerNameFontSize,
        partnerNameFontWeight,
        partnerNameTextTransform,
        iconColor,
        iconSize,
        cardBgColor,
        cardBorderColor,
        cardBorderWidth,
        cardBorderRadius,
        cardPadding,
        cardMinHeight
    } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-insurance-partner-item-editor insurance-card',
        style: {
            borderRadius: `${cardBorderRadius}px`,
            minHeight: `${cardMinHeight}px`,
            padding: `${cardPadding}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #e0e0e0',
            background: '#fafafa'
        }
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Partner Name', 'twork-builder')} initialOpen={true}>
                    <SelectControl
                        label={__('Icon', 'twork-builder')}
                        value={iconClass}
                        options={ICON_OPTIONS}
                        onChange={(val) => setAttributes({ iconClass: val })}
                    />
                    <Divider />
                    <PanelColorSettings
                        title={__('Text Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: partnerNameColor,
                                onChange: (val) => setAttributes({ partnerNameColor: val }),
                                label: __('Partner Name', 'twork-builder')
                            },
                            {
                                value: iconColor,
                                onChange: (val) => setAttributes({ iconColor: val }),
                                label: __('Icon', 'twork-builder')
                            }
                        ]}
                    />
                    <RangeControl
                        label={__('Name Font Size (rem)', 'twork-builder')}
                        value={partnerNameFontSize}
                        onChange={(val) => setAttributes({ partnerNameFontSize: val })}
                        min={0.9}
                        max={1.5}
                        step={0.05}
                    />
                    <RangeControl
                        label={__('Font Weight', 'twork-builder')}
                        value={partnerNameFontWeight}
                        onChange={(val) => setAttributes({ partnerNameFontWeight: val })}
                        min={400}
                        max={900}
                        step={100}
                    />
                    <SelectControl
                        label={__('Text Transform', 'twork-builder')}
                        value={partnerNameTextTransform}
                        options={[
                            { label: __('None', 'twork-builder'), value: 'none' },
                            { label: __('Uppercase', 'twork-builder'), value: 'uppercase' },
                            { label: __('Capitalize', 'twork-builder'), value: 'capitalize' }
                        ]}
                        onChange={(val) => setAttributes({ partnerNameTextTransform: val })}
                    />
                    <RangeControl
                        label={__('Icon Size (rem)', 'twork-builder')}
                        value={iconSize}
                        onChange={(val) => setAttributes({ iconSize: val })}
                        min={1.5}
                        max={4}
                        step={0.1}
                    />
                </PanelBody>

                <PanelBody title={__('Card Styling', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Card Colors', 'twork-builder')}
                        colorSettings={[
                            {
                                value: cardBgColor,
                                onChange: (val) => setAttributes({ cardBgColor: val }),
                                label: __('Background', 'twork-builder')
                            },
                            {
                                value: cardBorderColor,
                                onChange: (val) => setAttributes({ cardBorderColor: val }),
                                label: __('Border', 'twork-builder')
                            }
                        ]}
                    />
                    <RangeControl
                        label={__('Border Width (px)', 'twork-builder')}
                        value={cardBorderWidth}
                        onChange={(val) => setAttributes({ cardBorderWidth: val })}
                        min={0}
                        max={5}
                        step={1}
                    />
                    <RangeControl
                        label={__('Border Radius (px)', 'twork-builder')}
                        value={cardBorderRadius}
                        onChange={(val) => setAttributes({ cardBorderRadius: val })}
                        min={0}
                        max={24}
                        step={1}
                    />
                    <RangeControl
                        label={__('Padding (px)', 'twork-builder')}
                        value={cardPadding}
                        onChange={(val) => setAttributes({ cardPadding: val })}
                        min={10}
                        max={40}
                        step={5}
                    />
                    <RangeControl
                        label={__('Min Height (px)', 'twork-builder')}
                        value={cardMinHeight}
                        onChange={(val) => setAttributes({ cardMinHeight: val })}
                        min={100}
                        max={220}
                        step={10}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div
                    className="partner-logo"
                    style={{
                        fontSize: `${partnerNameFontSize}rem`,
                        fontWeight: partnerNameFontWeight,
                        color: partnerNameColor,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '10px',
                        textTransform: partnerNameTextTransform,
                        textAlign: 'center'
                    }}
                >
                    <i
                        className={iconClass}
                        style={{
                            fontSize: `${iconSize}rem`,
                            color: iconColor,
                            transition: '0.3s'
                        }}
                        aria-hidden="true"
                    />
                    <RichText
                        tagName="span"
                        value={partnerName}
                        onChange={(val) => setAttributes({ partnerName: val })}
                        placeholder={__('Partner name...', 'twork-builder')}
                        withoutInteractiveFormatting
                    />
                </div>
            </div>
        </>
    );
}
