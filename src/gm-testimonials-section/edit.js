import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    RichText,
    PanelColorSettings,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
} from '@wordpress/components';

const ALLOWED_BLOCKS = ['twork/gm-review-card'];
const TEMPLATE = [
    ['twork/gm-review-card', {
        reviewText: '"Dr. Thida Win is incredibly patient and thorough. She explained my condition clearly and the treatment plan has worked wonders for my diabetes management."',
        reviewerName: 'U Kyaw Zin',
        reviewerLabel: 'Diabetes Patient',
    }],
    ['twork/gm-review-card', {
        reviewText: '"I always come here for my family\'s check-ups. The nursing staff is friendly, and the doctors are top-notch. Highly recommended for general care."',
        reviewerName: 'Daw Aye Aye',
        reviewerLabel: 'Regular Check-up',
    }],
    ['twork/gm-review-card', {
        reviewText: '"The Hypertension clinic helped me get my blood pressure under control. The follow-up system is excellent."',
        reviewerName: 'U Myint Soe',
        reviewerLabel: 'Hypertension Patient',
    }],
];

export default function Edit({ attributes, setAttributes }) {
    const {
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        showSectionTitle,
        sectionTitle,
        sectionSubtitle,
        sectionTitleColor,
        sectionSubtitleColor,
        sectionTitleAlignment,
        sectionTitleFontSize,
        sectionSubtitleFontSize,
        gridGap,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-gm-testimonials-section twork-gm-testimonials-section-editor jivaka-gm-section',
        style: {
            backgroundColor,
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
        },
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
    };

    const headerStyle = {
        textAlign: sectionTitleAlignment,
    };

    const gridStyle = {
        gap: `${gridGap}px`,
    };

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={__('Section Content', 'twork-builder')}
                    initialOpen={true}
                >
                    <ToggleControl
                        label={__('Show Section Title', 'twork-builder')}
                        checked={showSectionTitle}
                        onChange={(val) => setAttributes({ showSectionTitle: val })}
                    />
                    {showSectionTitle && (
                        <>
                            <RichText
                                tagName="h2"
                                value={sectionTitle}
                                onChange={(val) => setAttributes({ sectionTitle: val })}
                                placeholder={__('Patient Stories', 'twork-builder')}
                            />
                            <RichText
                                tagName="p"
                                value={sectionSubtitle}
                                onChange={(val) => setAttributes({ sectionSubtitle: val })}
                                placeholder={__('What our patients say...', 'twork-builder')}
                            />
                            <SelectControl
                                label={__('Title Alignment', 'twork-builder')}
                                value={sectionTitleAlignment}
                                options={[
                                    { label: __('Left', 'twork-builder'), value: 'left' },
                                    { label: __('Center', 'twork-builder'), value: 'center' },
                                    { label: __('Right', 'twork-builder'), value: 'right' },
                                ]}
                                onChange={(val) => setAttributes({ sectionTitleAlignment: val })}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody
                    title={__('Typography & Colors', 'twork-builder')}
                    initialOpen={false}
                >
                    <PanelColorSettings
                        title={__('Title Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: sectionTitleColor,
                                onChange: (val) => setAttributes({ sectionTitleColor: val }),
                                label: __('Title Color', 'twork-builder'),
                            },
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
                    <PanelColorSettings
                        title={__('Subtitle Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: sectionSubtitleColor,
                                onChange: (val) => setAttributes({ sectionSubtitleColor: val }),
                                label: __('Subtitle Color', 'twork-builder'),
                            },
                        ]}
                    />
                    <RangeControl
                        label={__('Subtitle Font Size (rem)', 'twork-builder')}
                        value={sectionSubtitleFontSize}
                        onChange={(val) => setAttributes({ sectionSubtitleFontSize: val })}
                        min={0.9}
                        max={2}
                        step={0.1}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Layout', 'twork-builder')}
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
                        max={80}
                        step={4}
                    />
                    <RangeControl
                        label={__('Grid Gap (px)', 'twork-builder')}
                        value={gridGap}
                        onChange={(val) => setAttributes({ gridGap: val })}
                        min={10}
                        max={60}
                        step={2}
                    />
                    <RangeControl
                        label={__('Padding Top (px)', 'twork-builder')}
                        value={paddingTop}
                        onChange={(val) => setAttributes({ paddingTop: val })}
                        min={40}
                        max={160}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding Bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(val) => setAttributes({ paddingBottom: val })}
                        min={40}
                        max={160}
                        step={5}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Background', 'twork-builder')}
                    initialOpen={false}
                >
                    <PanelColorSettings
                        title={__('Background Color', 'twork-builder')}
                        colorSettings={[
                            {
                                value: backgroundColor,
                                onChange: (val) => setAttributes({ backgroundColor: val }),
                                label: __('Background Color', 'twork-builder'),
                            },
                        ]}
                    />
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="jivaka-gm-container" style={containerStyle}>
                    {(showSectionTitle || sectionSubtitle) && (
                        <div className="jivaka-gm-header-center gm-anim-fade" style={headerStyle}>
                            {showSectionTitle && (
                                <RichText
                                    tagName="h2"
                                    value={sectionTitle}
                                    onChange={(val) => setAttributes({ sectionTitle: val })}
                                    placeholder={__('Patient Stories', 'twork-builder')}
                                    style={{
                                        color: sectionTitleColor,
                                        fontSize: `${sectionTitleFontSize}rem`,
                                    }}
                                />
                            )}
                            {sectionSubtitle && (
                                <RichText
                                    tagName="p"
                                    value={sectionSubtitle}
                                    onChange={(val) => setAttributes({ sectionSubtitle: val })}
                                    placeholder={__('What our patients say...', 'twork-builder')}
                                    style={{
                                        color: sectionSubtitleColor,
                                        fontSize: `${sectionSubtitleFontSize}rem`,
                                    }}
                                />
                            )}
                        </div>
                    )}

                    <div className="jivaka-gm-testimonials" style={gridStyle}>
                        <InnerBlocks
                            allowedBlocks={ALLOWED_BLOCKS}
                            template={TEMPLATE}
                            renderAppender={InnerBlocks.ButtonBlockAppender}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
