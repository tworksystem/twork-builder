import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    PanelColorSettings
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
    __experimentalDivider as Divider
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        marginTop,
        containerMaxWidth,
        containerPadding,
        gap,
        borderRadius,
        boxShadow,
        boxShadowColor,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowOffsetX,
        boxShadowOffsetY,
        animationOnScroll,
        animationType
    } = attributes;

    const ALLOWED_BLOCKS = ['twork/em-stat-item'];
    const TEMPLATE = [
        ['twork/em-stat-item', { iconClass: 'fas fa-clock', statValue: '24/7', statLabel: 'Open All Day' }],
        ['twork/em-stat-item', { iconClass: 'fas fa-user-md', statValue: '10+', statLabel: 'ER Specialists' }],
        ['twork/em-stat-item', { iconClass: 'fas fa-ambulance', statValue: '15 min', statLabel: 'Avg. Response' }],
        ['twork/em-stat-item', { iconClass: 'fas fa-bed', statValue: '20+', statLabel: 'ICU Beds' }]
    ];

    const blockProps = useBlockProps({
        className: 'twork-em-stats-section-editor',
        style: {
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

    const statsWrapperStyle = {
        background: backgroundColor,
        color: '#fff',
        padding: `${paddingTop}px 0 ${paddingBottom}px`,
        marginTop: `${marginTop}px`,
        position: 'relative',
        zIndex: 5,
        borderRadius: `${borderRadius}px`,
        boxShadow: boxShadow
            ? `${boxShadowOffsetX}px ${boxShadowOffsetY}px ${boxShadowBlur}px ${boxShadowSpread}px ${boxShadowColor}`
            : 'none'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: `${gap}px`,
        textAlign: 'center'
    };

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={__('Section Appearance', 'twork-builder')}
                    initialOpen={true}
                >
                    <PanelColorSettings
                        title={__('Background Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: backgroundColor,
                                onChange: (val) => setAttributes({ backgroundColor: val }),
                                label: __('Background Color', 'twork-builder')
                            }
                        ]}
                    />

                    <Divider />

                    <RangeControl
                        label={__('Padding Top (px)', 'twork-builder')}
                        value={paddingTop}
                        onChange={(val) => setAttributes({ paddingTop: val })}
                        min={20}
                        max={80}
                        step={5}
                    />

                    <RangeControl
                        label={__('Padding Bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(val) => setAttributes({ paddingBottom: val })}
                        min={20}
                        max={80}
                        step={5}
                    />

                    <RangeControl
                        label={__('Margin Top (px)', 'twork-builder')}
                        value={marginTop}
                        onChange={(val) => setAttributes({ marginTop: val })}
                        min={-120}
                        max={0}
                        step={5}
                        help={__('Negative value overlaps hero (e.g. -50)', 'twork-builder')}
                    />

                    <RangeControl
                        label={__('Border Radius (px)', 'twork-builder')}
                        value={borderRadius}
                        onChange={(val) => setAttributes({ borderRadius: val })}
                        min={0}
                        max={50}
                        step={1}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Layout', 'twork-builder')}
                    initialOpen={false}
                >
                    <RangeControl
                        label={__('Gap Between Items (px)', 'twork-builder')}
                        value={gap}
                        onChange={(val) => setAttributes({ gap: val })}
                        min={10}
                        max={40}
                        step={5}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Container', 'twork-builder')}
                    initialOpen={false}
                >
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
                        max={60}
                        step={5}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Box Shadow', 'twork-builder')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Enable Box Shadow', 'twork-builder')}
                        checked={boxShadow}
                        onChange={(val) => setAttributes({ boxShadow: val })}
                    />

                    {boxShadow && (
                        <>
                            <PanelColorSettings
                                title={__('Shadow Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: boxShadowColor,
                                        onChange: (val) => setAttributes({ boxShadowColor: val }),
                                        label: __('Shadow Color', 'twork-builder')
                                    }
                                ]}
                            />
                            <RangeControl
                                label={__('Blur (px)', 'twork-builder')}
                                value={boxShadowBlur}
                                onChange={(val) => setAttributes({ boxShadowBlur: val })}
                                min={0}
                                max={80}
                                step={1}
                            />
                            <RangeControl
                                label={__('Spread (px)', 'twork-builder')}
                                value={boxShadowSpread}
                                onChange={(val) => setAttributes({ boxShadowSpread: val })}
                                min={-20}
                                max={20}
                                step={1}
                            />
                            <RangeControl
                                label={__('Offset X (px)', 'twork-builder')}
                                value={boxShadowOffsetX}
                                onChange={(val) => setAttributes({ boxShadowOffsetX: val })}
                                min={-20}
                                max={20}
                                step={1}
                            />
                            <RangeControl
                                label={__('Offset Y (px)', 'twork-builder')}
                                value={boxShadowOffsetY}
                                onChange={(val) => setAttributes({ boxShadowOffsetY: val })}
                                min={-20}
                                max={20}
                                step={1}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody
                    title={__('Animation', 'twork-builder')}
                    initialOpen={false}
                >
                    <ToggleControl
                        label={__('Enable scroll animation', 'twork-builder')}
                        checked={animationOnScroll}
                        onChange={(val) => setAttributes({ animationOnScroll: val })}
                    />

                    {animationOnScroll && (
                        <SelectControl
                            label={__('Animation type', 'twork-builder')}
                            value={animationType}
                            options={[
                                { label: __('Fade up', 'twork-builder'), value: 'fade-up' },
                                { label: __('Fade in', 'twork-builder'), value: 'fadeIn' },
                                { label: __('None', 'twork-builder'), value: 'none' }
                            ]}
                            onChange={(val) => setAttributes({ animationType: val })}
                        />
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="em-container" style={containerStyle}>
                    <div
                        className={`em-stats ${animationOnScroll ? animationType : ''}`}
                        style={statsWrapperStyle}
                        data-animation={animationOnScroll}
                        data-animation-type={animationType}
                    >
                        <div className="em-stats-grid" style={gridStyle}>
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
