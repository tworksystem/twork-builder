/**
 * Twork Testimonial Section – Editor
 * Matches home.html: section-top-link, meta-title, h2 with highlight, subtitle, testimonials-grid.
 */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    PanelColorSettings,
    RichText,
    MediaPlaceholder
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    ToggleControl,
    SelectControl,
    TextControl,
    Button,
    BaseControl,
    __experimentalDivider as Divider
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        backgroundColor,
        backgroundImage,
        backgroundImageId,
        backgroundOverlay,
        backgroundOverlayColor,
        backgroundOverlayOpacity,
        paddingTop,
        paddingBottom,
        paddingTopMobile,
        paddingBottomMobile,
        showSectionTopLink,
        sectionTopLinkText,
        sectionTopLinkUrl,
        showMetaTitle,
        metaTitle,
        metaTitleColor,
        metaTitleFontSize,
        metaTitleFontSizeTablet,
        metaTitleFontSizeMobile,
        showSectionTitle,
        sectionTitle,
        highlightText,
        highlightColor,
        showSubtitle,
        subtitle,
        subtitleColor,
        subtitleFontSize,
        subtitleFontSizeTablet,
        subtitleFontSizeMobile,
        columns,
        columnsTablet,
        columnsMobile,
        gap,
        gapMobile,
        minColumnWidth,
        sectionTitleColor,
        sectionTitleFontSize,
        sectionTitleFontSizeTablet,
        sectionTitleFontSizeMobile,
        sectionTitleFontWeight,
        sectionTitleAlignment,
        sectionTitleAlignmentTablet,
        sectionTitleAlignmentMobile,
        sectionTitleMarginBottom,
        containerMaxWidth,
        containerPadding,
        containerPaddingMobile,
        cardBorderRadius,
        cardBorderColor,
        cardBoxShadow,
        animationOnScroll,
        animationDelay,
        animationType
    } = attributes;

    const ALLOWED_BLOCKS = ['twork/testimonial-item'];
    const TEMPLATE = [
        ['twork/testimonial-item', {
            image: 'https://i.pravatar.cc/150?img=25',
            name: 'Laraine Flemming',
            procedure: 'CBR',
            quote: 'Professionals in their work, the surgery went well and I was able to go on with my life within just a few weeks. Recommended!'
        }],
        ['twork/testimonial-item', {
            image: 'https://i.pravatar.cc/150?img=60',
            name: 'Herbie Hannes',
            procedure: 'Valve Prolapse Repair',
            quote: 'I am deeply grateful to Dr. Chase for his expertise and care. He practices both the science and the art of cardiac surgery.'
        }],
        ['twork/testimonial-item', {
            image: 'https://i.pravatar.cc/150?img=56',
            name: 'William Smith',
            procedure: 'TMR',
            quote: 'I felt like 102 before, now I feel like 52, thanks to Dr. Chase and his team. Their expertise is second to none!'
        }],
        ['twork/testimonial-item', {
            image: 'https://i.pravatar.cc/150?img=47',
            name: 'Ellen Norton',
            procedure: 'Pacemaker Implementation',
            quote: 'They gave me much more than health - they gave me my life back. One that I can still enjoy with my family and grandchildren.'
        }]
    ];

    const blockProps = useBlockProps({
        className: 'twork-testimonial-section-editor testimonials-section jivaka-section',
        style: {
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: `${paddingTop ?? 80}px`,
            paddingBottom: `${paddingBottom ?? 80}px`,
            position: 'relative',
            '--padding-top-mobile': `${paddingTopMobile ?? 60}px`,
            '--padding-bottom-mobile': `${paddingBottomMobile ?? 60}px`,
            '--container-padding': `${containerPadding ?? 20}px`,
            '--container-padding-mobile': `${containerPaddingMobile ?? 20}px`,
            '--columns': columns ?? 4,
            '--columns-tablet': columnsTablet ?? 3,
            '--columns-mobile': columnsMobile ?? 1,
            '--gap': `${gap ?? 20}px`,
            '--gap-mobile': `${gapMobile ?? 40}px`,
            '--meta-font-size': `${metaTitleFontSize ?? 0.9}rem`,
            '--meta-font-size-tablet': `${metaTitleFontSizeTablet ?? 0.85}rem`,
            '--meta-font-size-mobile': `${metaTitleFontSizeMobile ?? 0.8}rem`,
            '--section-title-font-size': `${sectionTitleFontSize ?? 2.5}rem`,
            '--section-title-font-size-tablet': `${sectionTitleFontSizeTablet ?? 2.2}rem`,
            '--section-title-font-size-mobile': `${sectionTitleFontSizeMobile ?? 1.8}rem`,
            '--section-title-alignment': sectionTitleAlignment ?? 'center',
            '--section-title-alignment-tablet': sectionTitleAlignmentTablet ?? 'center',
            '--section-title-alignment-mobile': sectionTitleAlignmentMobile ?? 'center',
            '--subtitle-font-size': `${subtitleFontSize ?? 1.1}rem`,
            '--subtitle-font-size-tablet': `${subtitleFontSizeTablet ?? 1.05}rem`,
            '--subtitle-font-size-mobile': `${subtitleFontSizeMobile ?? 1}rem`
        }
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth ?? 1200}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding ?? 20}px`,
        position: 'relative',
        zIndex: 2
    };
    const containerClassName = 'jivaka-container';

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section Background', 'twork-builder')} initialOpen={true}>
                    <PanelColorSettings
                        title={__('Background Color', 'twork-builder')}
                        colorSettings={[{ value: backgroundColor, onChange: (val) => setAttributes({ backgroundColor: val }), label: __('Background', 'twork-builder') }]}
                    />
                    <Divider />
                    <BaseControl label={__('Background Image', 'twork-builder')}>
                        {!backgroundImage ? (
                            <MediaPlaceholder
                                onSelect={(media) => setAttributes({ backgroundImage: media.url, backgroundImageId: media.id })}
                                allowedTypes={['image']}
                                multiple={false}
                                labels={{ title: __('Background Image', 'twork-builder') }}
                            />
                        ) : (
                            <div>
                                <img src={backgroundImage} alt="" style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                                <Button isSecondary isSmall onClick={() => setAttributes({ backgroundImage: '', backgroundImageId: null })}>
                                    {__('Remove', 'twork-builder')}
                                </Button>
                            </div>
                        )}
                    </BaseControl>
                    {backgroundImage && (
                        <>
                            <Divider />
                            <ToggleControl label={__('Overlay', 'twork-builder')} checked={backgroundOverlay} onChange={(val) => setAttributes({ backgroundOverlay: val })} />
                            {backgroundOverlay && (
                                <>
                                    <PanelColorSettings
                                        title={__('Overlay Color', 'twork-builder')}
                                        colorSettings={[{ value: backgroundOverlayColor, onChange: (val) => setAttributes({ backgroundOverlayColor: val }), label: __('Overlay', 'twork-builder') }]}
                                    />
                                    <RangeControl label={__('Overlay Opacity', 'twork-builder')} value={backgroundOverlayOpacity} onChange={(val) => setAttributes({ backgroundOverlayOpacity: val })} min={0} max={1} step={0.1} />
                                </>
                            )}
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Top Link', 'twork-builder')} initialOpen={false}>
                    <ToggleControl label={__('Show Top Link', 'twork-builder')} checked={showSectionTopLink} onChange={(val) => setAttributes({ showSectionTopLink: val })} />
                    {showSectionTopLink && (
                        <>
                            <TextControl label={__('Link Text', 'twork-builder')} value={sectionTopLinkText} onChange={(val) => setAttributes({ sectionTopLinkText: val })} />
                            <TextControl label={__('Link URL', 'twork-builder')} value={sectionTopLinkUrl} onChange={(val) => setAttributes({ sectionTopLinkUrl: val })} placeholder="#" />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Section Title', 'twork-builder')} initialOpen={true}>
                    <ToggleControl label={__('Show Meta Title', 'twork-builder')} checked={showMetaTitle} onChange={(val) => setAttributes({ showMetaTitle: val })} />
                    {showMetaTitle && (
                        <>
                            <TextControl label={__('Meta Title', 'twork-builder')} value={metaTitle} onChange={(val) => setAttributes({ metaTitle: val })} />
                            <PanelColorSettings title={__('Meta Title Color', 'twork-builder')} colorSettings={[{ value: metaTitleColor, onChange: (val) => setAttributes({ metaTitleColor: val }), label: __('Color', 'twork-builder') }]} />
                            <RangeControl label={__('Meta Font Size (rem)', 'twork-builder')} value={metaTitleFontSize ?? 0.9} onChange={(val) => setAttributes({ metaTitleFontSize: val })} min={0.6} max={1.4} step={0.05} />
                        </>
                    )}

                    <Divider />

                    <ToggleControl label={__('Show Heading', 'twork-builder')} checked={showSectionTitle} onChange={(val) => setAttributes({ showSectionTitle: val })} />
                    {showSectionTitle && (
                        <>
                            <TextControl label={__('Heading (before highlight)', 'twork-builder')} value={sectionTitle} onChange={(val) => setAttributes({ sectionTitle: val })} help={__('e.g. "Patient " for "Patient testimonials"', 'twork-builder')} />
                            <TextControl label={__('Highlighted Text', 'twork-builder')} value={highlightText} onChange={(val) => setAttributes({ highlightText: val })} help={__('Word to highlight in dark color', 'twork-builder')} />
                            <PanelColorSettings title={__('Heading Color', 'twork-builder')} colorSettings={[{ value: sectionTitleColor, onChange: (val) => setAttributes({ sectionTitleColor: val }), label: __('Color', 'twork-builder') }]} />
                            <PanelColorSettings title={__('Highlight Color', 'twork-builder')} colorSettings={[{ value: highlightColor, onChange: (val) => setAttributes({ highlightColor: val }), label: __('Highlight', 'twork-builder') }]} />
                            <RangeControl label={__('Font Size Desktop (rem)', 'twork-builder')} value={sectionTitleFontSize ?? 2.5} onChange={(val) => setAttributes({ sectionTitleFontSize: val })} min={1} max={4} step={0.1} />
                            <RangeControl label={__('Font Size Tablet (rem)', 'twork-builder')} value={sectionTitleFontSizeTablet ?? 2.2} onChange={(val) => setAttributes({ sectionTitleFontSizeTablet: val })} min={1} max={3.5} step={0.1} />
                            <RangeControl label={__('Font Size Mobile (rem)', 'twork-builder')} value={sectionTitleFontSizeMobile ?? 1.8} onChange={(val) => setAttributes({ sectionTitleFontSizeMobile: val })} min={1} max={2.5} step={0.1} />
                            <RangeControl label={__('Font Weight', 'twork-builder')} value={sectionTitleFontWeight} onChange={(val) => setAttributes({ sectionTitleFontWeight: val })} min={100} max={900} step={100} />
                            <SelectControl label={__('Alignment Desktop', 'twork-builder')} value={sectionTitleAlignment} options={[{ label: __('Left', 'twork-builder'), value: 'left' }, { label: __('Center', 'twork-builder'), value: 'center' }, { label: __('Right', 'twork-builder'), value: 'right' }]} onChange={(val) => setAttributes({ sectionTitleAlignment: val })} />
                            <SelectControl label={__('Alignment Tablet', 'twork-builder')} value={sectionTitleAlignmentTablet ?? 'center'} options={[{ label: __('Left', 'twork-builder'), value: 'left' }, { label: __('Center', 'twork-builder'), value: 'center' }, { label: __('Right', 'twork-builder'), value: 'right' }]} onChange={(val) => setAttributes({ sectionTitleAlignmentTablet: val })} />
                            <SelectControl label={__('Alignment Mobile', 'twork-builder')} value={sectionTitleAlignmentMobile ?? 'center'} options={[{ label: __('Left', 'twork-builder'), value: 'left' }, { label: __('Center', 'twork-builder'), value: 'center' }, { label: __('Right', 'twork-builder'), value: 'right' }]} onChange={(val) => setAttributes({ sectionTitleAlignmentMobile: val })} />
                            <RangeControl label={__('Margin Bottom (px)', 'twork-builder')} value={sectionTitleMarginBottom} onChange={(val) => setAttributes({ sectionTitleMarginBottom: val })} min={0} max={50} step={5} />
                        </>
                    )}

                    <Divider />

                    <ToggleControl label={__('Show Subtitle', 'twork-builder')} checked={showSubtitle} onChange={(val) => setAttributes({ showSubtitle: val })} />
                    {showSubtitle && (
                        <>
                            <TextControl label={__('Subtitle', 'twork-builder')} value={subtitle} onChange={(val) => setAttributes({ subtitle: val })} />
                            <PanelColorSettings title={__('Subtitle Color', 'twork-builder')} colorSettings={[{ value: subtitleColor, onChange: (val) => setAttributes({ subtitleColor: val }), label: __('Color', 'twork-builder') }]} />
                            <RangeControl label={__('Subtitle Font Size (rem)', 'twork-builder')} value={subtitleFontSize ?? 1.1} onChange={(val) => setAttributes({ subtitleFontSize: val })} min={0.8} max={1.6} step={0.05} />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl label={__('Columns (Desktop)', 'twork-builder')} value={columns} onChange={(val) => setAttributes({ columns: val })} min={1} max={6} step={1} />
                    <RangeControl label={__('Columns (Tablet)', 'twork-builder')} value={columnsTablet} onChange={(val) => setAttributes({ columnsTablet: val })} min={1} max={4} step={1} />
                    <RangeControl label={__('Columns (Mobile)', 'twork-builder')} value={columnsMobile} onChange={(val) => setAttributes({ columnsMobile: val })} min={1} max={2} step={1} />
                    <RangeControl label={__('Gap (px)', 'twork-builder')} value={gap} onChange={(val) => setAttributes({ gap: val })} min={0} max={60} step={5} />
                    <RangeControl label={__('Gap Mobile (px)', 'twork-builder')} value={gapMobile} onChange={(val) => setAttributes({ gapMobile: val })} min={0} max={60} step={5} />
                </PanelBody>

                <PanelBody title={__('Container & Spacing', 'twork-builder')} initialOpen={false}>
                    <RangeControl label={__('Max Width (px)', 'twork-builder')} value={containerMaxWidth} onChange={(val) => setAttributes({ containerMaxWidth: val })} min={800} max={1920} step={10} />
                    <RangeControl label={__('Container Padding Desktop (px)', 'twork-builder')} value={containerPadding} onChange={(val) => setAttributes({ containerPadding: val })} min={0} max={60} step={5} />
                    <RangeControl label={__('Container Padding Mobile (px)', 'twork-builder')} value={containerPaddingMobile} onChange={(val) => setAttributes({ containerPaddingMobile: val })} min={0} max={40} step={5} />
                    <RangeControl label={__('Padding Top Desktop (px)', 'twork-builder')} value={paddingTop} onChange={(val) => setAttributes({ paddingTop: val })} min={0} max={200} step={5} />
                    <RangeControl label={__('Padding Bottom Desktop (px)', 'twork-builder')} value={paddingBottom} onChange={(val) => setAttributes({ paddingBottom: val })} min={0} max={200} step={5} />
                    <RangeControl label={__('Padding Top Mobile (px)', 'twork-builder')} value={paddingTopMobile} onChange={(val) => setAttributes({ paddingTopMobile: val })} min={0} max={120} step={5} />
                    <RangeControl label={__('Padding Bottom Mobile (px)', 'twork-builder')} value={paddingBottomMobile} onChange={(val) => setAttributes({ paddingBottomMobile: val })} min={0} max={120} step={5} />
                </PanelBody>

                <PanelBody title={__('Animation', 'twork-builder')} initialOpen={false}>
                    <ToggleControl label={__('Scroll Animation', 'twork-builder')} checked={animationOnScroll} onChange={(val) => setAttributes({ animationOnScroll: val })} />
                    {animationOnScroll && (
                        <>
                            <SelectControl label={__('Animation Type', 'twork-builder')} value={animationType} options={[
                                { label: __('Fade In Up', 'twork-builder'), value: 'fadeInUp' },
                                { label: __('Fade In', 'twork-builder'), value: 'fadeIn' },
                                { label: __('Slide In Left', 'twork-builder'), value: 'slideInLeft' },
                                { label: __('Slide In Right', 'twork-builder'), value: 'slideInRight' },
                                { label: __('Zoom In', 'twork-builder'), value: 'zoomIn' }
                            ]} onChange={(val) => setAttributes({ animationType: val })} />
                            <RangeControl label={__('Animation Delay (ms)', 'twork-builder')} value={animationDelay} onChange={(val) => setAttributes({ animationDelay: val })} min={0} max={500} step={50} />
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {backgroundImage && backgroundOverlay && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: backgroundOverlayColor, opacity: backgroundOverlayOpacity, zIndex: 1 }} />
                )}

                <div className={containerClassName} style={containerStyle}>
                    {showSectionTopLink && (
                        <div className="section-top-link">
                            <a href={sectionTopLinkUrl || '#'}>{sectionTopLinkText}</a>
                        </div>
                    )}

                    {(showMetaTitle || showSectionTitle || showSubtitle) && (
                        <div className="jivaka-section-title">
                            {showMetaTitle && (
                                <RichText tagName="p" className="meta-title" value={metaTitle} onChange={(val) => setAttributes({ metaTitle: val })} placeholder={__('Meta title...', 'twork-builder')} />
                            )}
                            {showSectionTitle && (
                                <h2>
                                    {sectionTitle || __('Patient ', 'twork-builder')}
                                    {highlightText && <span className="highlight-dark">{sectionTitle && !sectionTitle.endsWith(' ') ? ' ' : ''}{highlightText}</span>}
                                </h2>
                            )}
                            {showSubtitle && (
                                <RichText tagName="p" className="subtitle" value={subtitle} onChange={(val) => setAttributes({ subtitle: val })} placeholder={__('Subtitle...', 'twork-builder')} />
                            )}
                        </div>
                    )}

                    <div className="twork-testimonial-grid testimonials-grid">
                        <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} renderAppender={InnerBlocks.ButtonBlockAppender} />
                    </div>
                </div>
            </div>
        </>
    );
}
