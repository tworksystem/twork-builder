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
    TextControl,
    __experimentalDivider as Divider
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        icon,
        iconColor,
        iconSize,
        title,
        titleColor,
        titleFontSize,
        titleFontWeight,
        description,
        descriptionColor,
        descriptionFontSize,
        cardPadding,
        cardPaddingMobile,
        cardGap
    } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-exclusive-service-item-editor svc-card',
        style: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: `${cardGap}px`,
            padding: `${cardPadding}px`,
            background: '#fff',
            borderRadius: 'var(--radius, 12px)',
            border: '2px dashed #e0e0e0',
            transition: '0.3s'
        }
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Icon Settings', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Icon Class', 'twork-builder')}
                        value={icon}
                        onChange={(val) => setAttributes({ icon: val })}
                        help={__('Font Awesome icon class. e.g. fas fa-language, fas fa-plane-arrival', 'twork-builder')}
                    />
                    <PanelColorSettings
                        title={__('Icon Color', 'twork-builder')}
                        colorSettings={[
                            { value: iconColor, onChange: (val) => setAttributes({ iconColor: val }), label: __('Icon Color', 'twork-builder') }
                        ]}
                    />
                    <RangeControl
                        label={__('Icon Size (rem)', 'twork-builder')}
                        value={iconSize}
                        onChange={(val) => setAttributes({ iconSize: val })}
                        min={1}
                        max={4}
                        step={0.1}
                    />
                </PanelBody>

                <PanelBody title={__('Title', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Title Color', 'twork-builder')}
                        colorSettings={[
                            { value: titleColor, onChange: (val) => setAttributes({ titleColor: val }), label: __('Title Color', 'twork-builder') }
                        ]}
                    />
                    <RangeControl
                        label={__('Font Size (rem)', 'twork-builder')}
                        value={titleFontSize}
                        onChange={(val) => setAttributes({ titleFontSize: val })}
                        min={0.9}
                        max={1.5}
                        step={0.05}
                    />
                    <RangeControl
                        label={__('Font Weight', 'twork-builder')}
                        value={titleFontWeight}
                        onChange={(val) => setAttributes({ titleFontWeight: val })}
                        min={400}
                        max={900}
                        step={100}
                    />
                </PanelBody>

                <PanelBody title={__('Description', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Description Color', 'twork-builder')}
                        colorSettings={[
                            { value: descriptionColor, onChange: (val) => setAttributes({ descriptionColor: val }), label: __('Description Color', 'twork-builder') }
                        ]}
                    />
                    <RangeControl
                        label={__('Font Size (rem)', 'twork-builder')}
                        value={descriptionFontSize}
                        onChange={(val) => setAttributes({ descriptionFontSize: val })}
                        min={0.8}
                        max={1.2}
                        step={0.05}
                    />
                </PanelBody>

                <PanelBody title={__('Card Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Card Padding - Desktop (px)', 'twork-builder')}
                        value={cardPadding}
                        onChange={(val) => setAttributes({ cardPadding: val })}
                        min={15}
                        max={50}
                        step={5}
                    />
                    <RangeControl
                        label={__('Card Padding - Mobile (px)', 'twork-builder')}
                        value={cardPaddingMobile}
                        onChange={(val) => setAttributes({ cardPaddingMobile: val })}
                        min={12}
                        max={40}
                        step={5}
                    />
                    <RangeControl
                        label={__('Gap Between Icon & Content (px)', 'twork-builder')}
                        value={cardGap}
                        onChange={(val) => setAttributes({ cardGap: val })}
                        min={10}
                        max={40}
                        step={5}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {icon && (
                    <div className="svc-icon" style={{ flexShrink: 0 }}>
                        <i
                            className={icon}
                            aria-hidden="true"
                            style={{
                                fontSize: `${iconSize}rem`,
                                color: iconColor
                            }}
                        />
                    </div>
                )}
                <div className="svc-info" style={{ flex: 1, minWidth: 0 }}>
                    <RichText
                        tagName="h4"
                        value={title}
                        onChange={(val) => setAttributes({ title: val })}
                        placeholder={__('Service title...', 'twork-builder')}
                        style={{
                            fontSize: `${titleFontSize}rem`,
                            fontWeight: titleFontWeight,
                            color: titleColor,
                            margin: '0 0 5px 0'
                        }}
                    />
                    <RichText
                        tagName="p"
                        value={description}
                        onChange={(val) => setAttributes({ description: val })}
                        placeholder={__('Service description...', 'twork-builder')}
                        style={{
                            fontSize: `${descriptionFontSize}rem`,
                            color: descriptionColor,
                            margin: 0
                        }}
                    />
                </div>
            </div>
        </>
    );
}
