import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    PanelColorSettings,
    RichText,
} from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    SelectControl,
    ToggleControl,
    __experimentalDivider as ExperimentalDivider,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';

const Divider = ExperimentalDivider || function DividerFallback() {
    return <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #ddd' }} />;
};

const DEFAULT_ATTRS = {
    source: 'recent',
    categoryId: 0,
    numberOfItems: 4,
    orderBy: 'date',
    order: 'DESC',
    backgroundColor: '#fdfdfd',
    paddingTop: 80,
    paddingBottom: 80,
    containerMaxWidth: 1280,
    containerPadding: 24,
    showSectionHeader: true,
    sectionTitle: 'Our Facilities',
    sectionSubtitle: 'Fully equipped gym and therapy rooms.',
    headerAlign: 'center',
    headerMaxWidth: 700,
    cardWidth: 350,
    imageHeight: 220,
    gap: 20,
    animationOnScroll: true,
    staggerClass: 'stagger-up',
};

export default function Edit({ attributes = {}, setAttributes }) {
    const attrs = { ...DEFAULT_ATTRS, ...attributes };
    const {
        source,
        categoryId,
        numberOfItems,
        orderBy,
        order,
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        showSectionHeader,
        sectionTitle,
        sectionSubtitle,
        headerAlign,
        headerMaxWidth,
        cardWidth,
        imageHeight,
        gap,
        animationOnScroll,
    } = attrs;

    const categories = useSelect(
        (select) =>
            select('core')?.getEntityRecords('taxonomy', 'category', {
                per_page: -1,
                hide_empty: true,
            }) || [],
        []
    );

    const categoryOptions = [
        { label: __('All categories', 'twork-builder'), value: 0 },
        ...(categories || []).map((cat) => ({
            label: cat.name,
            value: cat.id,
        })),
    ];

    const blockProps = useBlockProps({
        className: 'phy-section twork-phy-facilities-section-editor',
        style: {
            backgroundColor,
            paddingTop: `${Number(paddingTop)}px`,
            paddingBottom: `${Number(paddingBottom)}px`,
            position: 'relative',
        },
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Posts source', 'twork-builder')} initialOpen={true}>
                    <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#666' }}>
                        {__(
                            'Facility cards are loaded from WordPress Posts. Set Featured Image, Title and Excerpt on each post.',
                            'twork-builder'
                        )}
                    </p>

                    <SelectControl
                        label={__('Source', 'twork-builder')}
                        value={source}
                        options={[
                            { label: __('Latest posts', 'twork-builder'), value: 'recent' },
                            { label: __('By category', 'twork-builder'), value: 'category' },
                        ]}
                        onChange={(val) => setAttributes({ source: val })}
                    />

                    {source === 'category' && (
                        <SelectControl
                            label={__('Category', 'twork-builder')}
                            value={categoryId || 0}
                            options={categoryOptions}
                            onChange={(val) => setAttributes({ categoryId: parseInt(val, 10) || 0 })}
                        />
                    )}

                    <RangeControl
                        label={__('Number of facilities', 'twork-builder')}
                        value={numberOfItems}
                        onChange={(val) => setAttributes({ numberOfItems: val })}
                        min={1}
                        max={12}
                        step={1}
                    />

                    <SelectControl
                        label={__('Order by', 'twork-builder')}
                        value={orderBy}
                        options={[
                            { label: __('Date', 'twork-builder'), value: 'date' },
                            { label: __('Title', 'twork-builder'), value: 'title' },
                            { label: __('Random', 'twork-builder'), value: 'rand' },
                        ]}
                        onChange={(val) => setAttributes({ orderBy: val })}
                    />

                    <SelectControl
                        label={__('Order', 'twork-builder')}
                        value={order}
                        options={[
                            { label: __('Newest first', 'twork-builder'), value: 'DESC' },
                            { label: __('Oldest first', 'twork-builder'), value: 'ASC' },
                        ]}
                        onChange={(val) => setAttributes({ order: val })}
                    />
                </PanelBody>

                <PanelBody title={__('Section layout', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        title={__('Background', 'twork-builder')}
                        colorSettings={[
                            {
                                value: backgroundColor,
                                onChange: (val) => setAttributes({ backgroundColor: val }),
                                label: __('Background color', 'twork-builder'),
                            },
                        ]}
                    />

                    <RangeControl
                        label={__('Padding top (px)', 'twork-builder')}
                        value={paddingTop}
                        onChange={(val) => setAttributes({ paddingTop: val })}
                        min={0}
                        max={160}
                        step={5}
                    />
                    <RangeControl
                        label={__('Padding bottom (px)', 'twork-builder')}
                        value={paddingBottom}
                        onChange={(val) => setAttributes({ paddingBottom: val })}
                        min={0}
                        max={160}
                        step={5}
                    />
                    <RangeControl
                        label={__('Container max width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(val) => setAttributes({ containerMaxWidth: val })}
                        min={800}
                        max={1920}
                        step={20}
                    />
                    <RangeControl
                        label={__('Horizontal padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(val) => setAttributes({ containerPadding: val })}
                        min={0}
                        max={80}
                        step={4}
                    />
                </PanelBody>

                <PanelBody title={__('Header', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Show header', 'twork-builder')}
                        checked={showSectionHeader}
                        onChange={(val) => setAttributes({ showSectionHeader: val })}
                    />
                    <RangeControl
                        label={__('Max width (px)', 'twork-builder')}
                        value={headerMaxWidth}
                        onChange={(val) => setAttributes({ headerMaxWidth: val })}
                        min={400}
                        max={900}
                        step={20}
                    />
                    <SelectControl
                        label={__('Alignment', 'twork-builder')}
                        value={headerAlign}
                        options={[
                            { label: __('Left', 'twork-builder'), value: 'left' },
                            { label: __('Center', 'twork-builder'), value: 'center' },
                            { label: __('Right', 'twork-builder'), value: 'right' },
                        ]}
                        onChange={(val) => setAttributes({ headerAlign: val })}
                    />
                </PanelBody>

                <PanelBody title={__('Slider cards', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Card width (px)', 'twork-builder')}
                        value={cardWidth}
                        onChange={(val) => setAttributes({ cardWidth: val })}
                        min={240}
                        max={480}
                        step={10}
                    />
                    <RangeControl
                        label={__('Image height (px)', 'twork-builder')}
                        value={imageHeight}
                        onChange={(val) => setAttributes({ imageHeight: val })}
                        min={160}
                        max={320}
                        step={10}
                    />
                    <RangeControl
                        label={__('Gap (px)', 'twork-builder')}
                        value={gap}
                        onChange={(val) => setAttributes({ gap: val })}
                        min={8}
                        max={40}
                        step={2}
                    />
                </PanelBody>

                <PanelBody title={__('Animation', 'twork-builder')} initialOpen={false}>
                    <ToggleControl
                        label={__('Enable fade-up classes', 'twork-builder')}
                        checked={animationOnScroll}
                        onChange={(val) => setAttributes({ animationOnScroll: val })}
                    />
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div
                    className="phy-container"
                    style={{
                        maxWidth: `${Number(containerMaxWidth)}px`,
                        margin: '0 auto',
                        padding: `0 ${Number(containerPadding)}px`,
                    }}
                >
                    {showSectionHeader && (
                        <div
                            className={`phy-header ${animationOnScroll ? 'fade-up' : ''}`}
                            style={{
                                textAlign: headerAlign,
                                maxWidth: `${Number(headerMaxWidth)}px`,
                                margin: '0 auto 30px',
                            }}
                        >
                            <RichText
                                tagName="h2"
                                value={sectionTitle}
                                onChange={(val) => setAttributes({ sectionTitle: val })}
                                placeholder={__('Our Facilities', 'twork-builder')}
                            />
                            <RichText
                                tagName="p"
                                value={sectionSubtitle}
                                onChange={(val) => setAttributes({ sectionSubtitle: val })}
                                placeholder={__('Fully equipped gym and therapy rooms.', 'twork-builder')}
                            />
                        </div>
                    )}

                    <div
                        className="phy-facility-slider twork-phy-facility-slider-preview"
                        style={{
                            display: 'block',
                        }}
                    >
                        <ServerSideRender
                            block="twork/phy-facilities-section"
                            attributes={attributes}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

