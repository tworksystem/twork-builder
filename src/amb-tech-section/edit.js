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
    SelectControl
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        marginTop,
        clipPath,
        clipPathPolygon,
        gridMinWidth,
        gap,
        containerMaxWidth,
        containerPadding,
        showSectionTitle,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        sectionTitleMarginBottom,
        showSectionSubtitle,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        sectionSubtitleMarginBottom,
        animationOnScroll,
        animationDelay
    } = attributes;

    const ALLOWED_BLOCKS = ['twork/amb-tech-item'];
    const TEMPLATE = [
        ['twork/amb-tech-item', { icon: 'fa-heartbeat', title: 'Defibrillator', description: 'Immediate response for cardiac arrest patients.' }],
        ['twork/amb-tech-item', { icon: 'fa-lungs', title: 'Mobile Ventilator', description: 'Respiratory support for critical breathing issues.' }],
        ['twork/amb-tech-item', { icon: 'fa-map-marker-alt', title: 'GPS Tracking', description: 'Real-time location sharing with the hospital ER.' }],
        ['twork/amb-tech-item', { icon: 'fa-first-aid', title: 'Trauma Kit', description: 'Comprehensive supplies for accident stabilization.' }]
    ];

    const blockProps = useBlockProps({
        className: 'twork-amb-tech-section-editor',
        style: {
            backgroundColor,
            color: '#fff',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            marginTop: `${marginTop}px`,
            position: 'relative',
            clipPath: clipPath ? `polygon(${clipPathPolygon})` : 'none'
        }
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
        position: 'relative',
        zIndex: 2
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${gridMinWidth}px, 1fr))`,
        gap: `${gap}px`
    };

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={__('Section Title & Subtitle', 'twork-builder')}
                    initialOpen={true}
                >
                    <ToggleControl
                        label={__('Show Section Title', 'twork-builder')}
                        checked={showSectionTitle}
                        onChange={(val) => setAttributes({ showSectionTitle: val })}
                    />
                    {showSectionTitle && (
                        <>
                            <PanelColorSettings
                                title={__('Title Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: sectionTitleColor,
                                        onChange: (val) => setAttributes({ sectionTitleColor: val }),
                                        label: __('Title Color', 'twork-builder')
                                    }
                                ]}
                            />
                            <RangeControl
                                label={__('Title Font Size (rem)', 'twork-builder')}
                                value={sectionTitleFontSize}
                                onChange={(val) => setAttributes({ sectionTitleFontSize: val })}
                                min={1.5}
                                max={4}
                                step={0.1}
                            />
                            <RangeControl
                                label={__('Title Font Weight', 'twork-builder')}
                                value={sectionTitleFontWeight}
                                onChange={(val) => setAttributes({ sectionTitleFontWeight: val })}
                                min={100}
                                max={900}
                                step={100}
                            />
                            <SelectControl
                                label={__('Title Alignment', 'twork-builder')}
                                value={sectionTitleAlignment}
                                options={[
                                    { label: __('Left', 'twork-builder'), value: 'left' },
                                    { label: __('Center', 'twork-builder'), value: 'center' },
                                    { label: __('Right', 'twork-builder'), value: 'right' }
                                ]}
                                onChange={(val) => setAttributes({ sectionTitleAlignment: val })}
                            />
                            <RangeControl
                                label={__('Title Margin Bottom (px)', 'twork-builder')}
                                value={sectionTitleMarginBottom}
                                onChange={(val) => setAttributes({ sectionTitleMarginBottom: val })}
                                min={0}
                                max={50}
                                step={5}
                            />
                        </>
                    )}

                    <ToggleControl
                        label={__('Show Section Subtitle', 'twork-builder')}
                        checked={showSectionSubtitle}
                        onChange={(val) => setAttributes({ showSectionSubtitle: val })}
                    />
                    {showSectionSubtitle && (
                        <>
                            <PanelColorSettings
                                title={__('Subtitle Color', 'twork-builder')}
                                colorSettings={[
                                    {
                                        value: sectionSubtitleColor,
                                        onChange: (val) => setAttributes({ sectionSubtitleColor: val }),
                                        label: __('Subtitle Color', 'twork-builder')
                                    }
                                ]}
                            />
                            <RangeControl
                                label={__('Subtitle Font Size (rem)', 'twork-builder')}
                                value={sectionSubtitleFontSize}
                                onChange={(val) => setAttributes({ sectionSubtitleFontSize: val })}
                                min={0.8}
                                max={2}
                                step={0.1}
                            />
                            <RangeControl
                                label={__('Subtitle Margin Bottom (px)', 'twork-builder')}
                                value={sectionSubtitleMarginBottom}
                                onChange={(val) => setAttributes({ sectionSubtitleMarginBottom: val })}
                                min={20}
                                max={100}
                                step={5}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Section Style', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Background Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: backgroundColor,
                                onChange: (val) => setAttributes({ backgroundColor: val }),
                                label: __('Background', 'twork-builder')
                            }
                        ]}
                    />
                    <RangeControl
                        label={__('Margin Top (px)', 'twork-builder')}
                        value={marginTop}
                        onChange={(val) => setAttributes({ marginTop: val })}
                        min={-200}
                        max={100}
                        step={10}
                        help={__('Negative value overlaps previous section', 'twork-builder')}
                    />
                    <ToggleControl
                        label={__('Skewed Section (clip-path)', 'twork-builder')}
                        checked={clipPath}
                        onChange={(val) => setAttributes({ clipPath: val })}
                    />
                    <RangeControl
                        label={__('Padding Top (px)', 'twork-builder')}
                        value={paddingTop}
                        onChange={(val) => setAttributes({ paddingTop: val })}
                        min={40}
                        max={250}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding Bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(val) => setAttributes({ paddingBottom: val })}
                        min={40}
                        max={200}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Grid Min Width (px)', 'twork-builder')}
                        value={gridMinWidth}
                        onChange={(val) => setAttributes({ gridMinWidth: val })}
                        min={200}
                        max={400}
                        step={10}
                        help={__('Min width per item (auto-fit grid)', 'twork-builder')}
                    />
                    <RangeControl
                        label={__('Gap (px)', 'twork-builder')}
                        value={gap}
                        onChange={(val) => setAttributes({ gap: val })}
                        min={0}
                        max={60}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Container', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Max Width (px)', 'twork-builder')}
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

                <PanelBody title={__('Animation', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Enable Scroll Animation', 'twork-builder')}
                        checked={animationOnScroll}
                        onChange={(val) => setAttributes({ animationOnScroll: val })}
                    />
                    {animationOnScroll && (
                        <RangeControl
                            label={__('Stagger Delay (ms)', 'twork-builder')}
                            value={animationDelay}
                            onChange={(val) => setAttributes({ animationDelay: val })}
                            min={0}
                            max={300}
                            step={20}
                        />
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div style={containerStyle}>
                    <div
                        className="editor-label"
                        style={{
                            textAlign: 'center',
                            padding: '10px',
                            background: '#2271b1',
                            color: '#fff',
                            fontWeight: '600',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            marginBottom: '20px',
                            borderRadius: '4px'
                        }}
                    >
                        {__('Ambulance Tech Section (ICU on Wheels)', 'twork-builder')}
                    </div>

                    {(showSectionTitle || showSectionSubtitle) && (
                        <div
                            className="section-header amb-tech-header amb-header"
                            style={{
                                textAlign: sectionTitleAlignment,
                                maxWidth: '700px',
                                margin: '0 auto',
                                marginBottom: `${sectionSubtitleMarginBottom}px`
                            }}
                        >
                            {showSectionTitle && (
                                <RichText
                                    tagName="h2"
                                    value={sectionTitle}
                                    onChange={(val) => setAttributes({ sectionTitle: val })}
                                    placeholder={__('Section Title...', 'twork-builder')}
                                    className="section-title"
                                    style={{
                                        fontSize: `${sectionTitleFontSize}rem`,
                                        fontWeight: sectionTitleFontWeight,
                                        color: sectionTitleColor,
                                        marginBottom: showSectionSubtitle ? `${sectionTitleMarginBottom}px` : '0',
                                        marginTop: 0
                                    }}
                                />
                            )}
                            {showSectionSubtitle && (
                                <RichText
                                    tagName="p"
                                    value={sectionSubtitle}
                                    onChange={(val) => setAttributes({ sectionSubtitle: val })}
                                    placeholder={__('Subtitle...', 'twork-builder')}
                                    className="section-subtitle"
                                    style={{
                                        fontSize: `${sectionSubtitleFontSize}rem`,
                                        color: sectionSubtitleColor,
                                        margin: 0
                                    }}
                                />
                            )}
                        </div>
                    )}

                    <div
                        className="twork-amb-tech-grid-container amb-tech-grid"
                        style={gridStyle}
                    >
                        <InnerBlocks
                            allowedBlocks={ALLOWED_BLOCKS}
                            template={TEMPLATE}
                            renderAppender={InnerBlocks.ButtonBlockAppender}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
