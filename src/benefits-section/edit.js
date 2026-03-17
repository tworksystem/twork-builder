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
    TextControl,
    __experimentalDivider as Divider
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        paddingTopMobile,
        paddingBottomMobile,
        minColumnWidth,
        gap,
        gapMobile,
        showSectionHeader,
        sectionTitle,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontSizeMobile,
        sectionSubtitle,
        sectionSubtitleColor,
        sectionSubtitleFontSize,
        sectionSubtitleMaxWidth,
        showHeaderLine,
        headerLineColor,
        headerMarginBottom,
        containerMaxWidth,
        containerPadding,
        containerPaddingMobile,
        animationOnScroll,
        animationDelay,
        animationType
    } = attributes;

    const ALLOWED_BLOCKS = ['twork/benefit-item'];
    const TEMPLATE = [
        ['twork/benefit-item', { icon: 'fas fa-user-md', title: 'Professional Growth', description: 'Continuous learning opportunities, workshops, and international training programs.' }],
        ['twork/benefit-item', { icon: 'fas fa-heartbeat', title: 'Work-Life Balance', description: 'Flexible shift schedules and leave policies to help you maintain a healthy lifestyle.' }],
        ['twork/benefit-item', { icon: 'fas fa-users', title: 'Inclusive Culture', description: 'A collaborative environment where every voice is heard and teamwork is celebrated.' }],
        ['twork/benefit-item', { icon: 'fas fa-briefcase-medical', title: 'Modern Facilities', description: 'Work with state-of-the-art medical technology and advanced infrastructure.' }],
        ['twork/benefit-item', { icon: 'fas fa-hand-holding-usd', title: 'Competitive Benefits', description: 'Attractive salary packages, health insurance, and performance-based bonuses.' }],
        ['twork/benefit-item', { icon: 'fas fa-globe-asia', title: 'Community Impact', description: 'Participate in CSR initiatives and medical outreach programs across Myanmar.' }]
    ];

    const blockProps = useBlockProps({
        className: 'twork-benefits-section-editor',
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
        position: 'relative'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}px, 1fr))`,
        gap: `${gap}px`
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section Background', 'twork-builder')} initialOpen={true}>
                    <PanelColorSettings
                        title={__('Background Color', 'twork-builder')}
                        colorSettings={[
                            { value: backgroundColor, onChange: (val) => setAttributes({ backgroundColor: val }), label: __('Background Color', 'twork-builder') }
                        ]}
                    />
                </PanelBody>

                <PanelBody title={__('Section Header', 'twork-builder')} initialOpen={true}>
                    <ToggleControl
                        label={__('Show Section Header', 'twork-builder')}
                        checked={showSectionHeader}
                        onChange={(val) => setAttributes({ showSectionHeader: val })}
                    />
                    {showSectionHeader && (
                        <>
                            <TextControl
                                label={__('Title', 'twork-builder')}
                                value={sectionTitle}
                                onChange={(val) => setAttributes({ sectionTitle: val })}
                            />
                            <PanelColorSettings
                                title={__('Title Color', 'twork-builder')}
                                colorSettings={[
                                    { value: sectionTitleColor, onChange: (val) => setAttributes({ sectionTitleColor: val }), label: __('Title Color', 'twork-builder') }
                                ]}
                            />
                            <RangeControl
                                label={__('Title Font Size (rem)', 'twork-builder')}
                                value={sectionTitleFontSize}
                                onChange={(val) => setAttributes({ sectionTitleFontSize: val })}
                                min={1.5}
                                max={3}
                                step={0.1}
                            />
                            <Divider />
                            <TextControl
                                label={__('Subtitle', 'twork-builder')}
                                value={sectionSubtitle}
                                onChange={(val) => setAttributes({ sectionSubtitle: val })}
                            />
                            <PanelColorSettings
                                title={__('Subtitle Color', 'twork-builder')}
                                colorSettings={[
                                    { value: sectionSubtitleColor, onChange: (val) => setAttributes({ sectionSubtitleColor: val }), label: __('Subtitle Color', 'twork-builder') }
                                ]}
                            />
                            <RangeControl
                                label={__('Subtitle Max Width (px)', 'twork-builder')}
                                value={sectionSubtitleMaxWidth}
                                onChange={(val) => setAttributes({ sectionSubtitleMaxWidth: val })}
                                min={400}
                                max={800}
                                step={50}
                            />
                            <Divider />
                            <ToggleControl
                                label={__('Show Decorative Line', 'twork-builder')}
                                checked={showHeaderLine}
                                onChange={(val) => setAttributes({ showHeaderLine: val })}
                            />
                            {showHeaderLine && (
                                <PanelColorSettings
                                    title={__('Line Color', 'twork-builder')}
                                    colorSettings={[
                                        { value: headerLineColor, onChange: (val) => setAttributes({ headerLineColor: val }), label: __('Line Color', 'twork-builder') }
                                    ]}
                                />
                            )}
                            <RangeControl
                                label={__('Header Margin Bottom (px)', 'twork-builder')}
                                value={headerMarginBottom}
                                onChange={(val) => setAttributes({ headerMarginBottom: val })}
                                min={30}
                                max={80}
                                step={5}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Min Column Width (px)', 'twork-builder')}
                        value={minColumnWidth}
                        onChange={(val) => setAttributes({ minColumnWidth: val })}
                        min={220}
                        max={400}
                        step={10}
                    />
                    <RangeControl
                        label={__('Gap (px)', 'twork-builder')}
                        value={gap}
                        onChange={(val) => setAttributes({ gap: val })}
                        min={16}
                        max={50}
                        step={5}
                    />
                    <RangeControl
                        label={__('Gap Mobile (px)', 'twork-builder')}
                        value={gapMobile}
                        onChange={(val) => setAttributes({ gapMobile: val })}
                        min={12}
                        max={40}
                        step={5}
                    />
                </PanelBody>

                <PanelBody title={__('Section Padding', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Padding Top (px)', 'twork-builder')}
                        value={paddingTop}
                        onChange={(val) => setAttributes({ paddingTop: val })}
                        min={40}
                        max={150}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding Bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(val) => setAttributes({ paddingBottom: val })}
                        min={40}
                        max={150}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding Top Mobile (px)', 'twork-builder')}
                        value={paddingTopMobile}
                        onChange={(val) => setAttributes({ paddingTopMobile: val })}
                        min={40}
                        max={100}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding Bottom Mobile (px)', 'twork-builder')}
                        value={paddingBottomMobile}
                        onChange={(val) => setAttributes({ paddingBottomMobile: val })}
                        min={40}
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
                        <>
                            <RangeControl
                                label={__('Animation Delay (ms)', 'twork-builder')}
                                value={animationDelay}
                                onChange={(val) => setAttributes({ animationDelay: val })}
                                min={0}
                                max={300}
                                step={50}
                            />
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div style={containerStyle}>
                    {showSectionHeader && (
                        <div
                            className="section-header fade-up"
                            style={{
                                textAlign: 'center',
                                marginBottom: `${headerMarginBottom}px`
                            }}
                        >
                            <RichText
                                tagName="h2"
                                value={sectionTitle}
                                onChange={(val) => setAttributes({ sectionTitle: val })}
                                placeholder={__('Section title...', 'twork-builder')}
                                style={{
                                    fontSize: `${sectionTitleFontSize}rem`,
                                    margin: '0 0 15px 0',
                                    color: sectionTitleColor
                                }}
                            />
                            <RichText
                                tagName="p"
                                value={sectionSubtitle}
                                onChange={(val) => setAttributes({ sectionSubtitle: val })}
                                placeholder={__('Subtitle...', 'twork-builder')}
                                style={{
                                    color: sectionSubtitleColor,
                                    fontSize: `${sectionSubtitleFontSize}rem`,
                                    maxWidth: `${sectionSubtitleMaxWidth}px`,
                                    margin: '0 auto'
                                }}
                            />
                            {showHeaderLine && (
                                <div
                                    className="line"
                                    style={{
                                        width: '60px',
                                        height: '4px',
                                        background: headerLineColor,
                                        margin: '20px auto 0',
                                        borderRadius: '2px'
                                    }}
                                />
                            )}
                        </div>
                    )}

                    <div
                        className="twork-benefits-grid benefits-grid"
                        style={gridStyle}
                        data-min-column-width={minColumnWidth}
                        data-gap={gap}
                        data-gap-mobile={gapMobile}
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
