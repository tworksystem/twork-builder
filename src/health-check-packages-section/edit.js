import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    RichText,
    PanelColorSettings,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, Button, BaseControl, ToggleControl } from '@wordpress/components';

const ALLOWED_BLOCKS = ['twork/health-check-package-card'];
const TEMPLATE = [
    ['twork/health-check-package-card', {
        category: 'basic',
        title: 'Basic Checkup',
        price: '45,000',
        listItems: ['CBC (Blood Count)', 'Urine Routine', 'Fasting Blood Sugar', 'Physical Exam'],
        buttonText: 'Book Now',
        buttonUrl: '#',
        isPopular: false,
    }],
    ['twork/health-check-package-card', {
        category: 'basic',
        title: 'Master Health',
        price: '90,000',
        listItems: ['All Basic Tests', 'Liver Function Test', 'Kidney Function Test', 'ECG & Chest X-Ray', 'Lipid Profile'],
        buttonText: 'Book Now',
        buttonUrl: '#',
        isPopular: true,
    }],
    ['twork/health-check-package-card', {
        category: 'basic',
        title: 'Executive',
        price: '150,000',
        listItems: ['All Master Tests', 'Ultrasound Abdomen', 'Hepatitis B & C', 'Thyroid (TSH)', 'Doctor Consultation'],
        buttonText: 'Book Now',
        buttonUrl: '#',
        isPopular: false,
    }],
    ['twork/health-check-package-card', {
        category: 'special',
        title: 'Heart Check',
        price: '120,000',
        listItems: ['Cardiac Markers', 'ECG & ECHO', 'Lipid Profile', 'Cardiologist Consult'],
        buttonText: 'Book Now',
        buttonUrl: '#',
        isPopular: false,
    }],
    ['twork/health-check-package-card', {
        category: 'special',
        title: 'Diabetes Care',
        price: '80,000',
        listItems: ['HbA1c (3 Months)', 'Kidney Function', 'Eye Checkup', 'Foot Exam'],
        buttonText: 'Book Now',
        buttonUrl: '#',
        isPopular: false,
    }],
    ['twork/health-check-package-card', {
        category: 'gender',
        title: "Women's Wellness",
        price: '110,000',
        listItems: ['Pap Smear', 'Breast Exam', 'Thyroid Profile', 'Bone Calcium'],
        buttonText: 'Book Now',
        buttonUrl: '#',
        isPopular: false,
    }],
    ['twork/health-check-package-card', {
        category: 'gender',
        title: "Men's Vitality",
        price: '110,000',
        listItems: ['PSA (Prostate)', 'Lung Function', 'Stress Test', 'Uric Acid'],
        buttonText: 'Book Now',
        buttonUrl: '#',
        isPopular: false,
    }],
];

export default function Edit({ attributes, setAttributes }) {
    const {
        sectionTitle,
        sectionSubtitle,
        sectionTitleColor,
        sectionSubtitleColor,
        tabs,
        backgroundColor,
        paddingTop,
        paddingBottom,
        containerMaxWidth,
        containerPadding,
        primaryColor,
        secondaryColor,
        tabActiveBg,
        tabActiveText,
        animationOnScroll,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'chk-section twork-health-check-packages-section-editor',
        style: {
            backgroundColor: backgroundColor || '#fff',
            paddingTop: `${paddingTop}px`,
            paddingBottom: `${paddingBottom}px`,
            '--chk-primary': primaryColor || '#f48b2a',
            '--chk-secondary': secondaryColor || '#005f73',
        },
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
    };

    const addTab = () => {
        setAttributes({
            tabs: [...tabs, { label: __('New tab', 'twork-builder'), value: 'new' }],
        });
    };

    const updateTab = (index, field, value) => {
        const next = [...tabs];
        next[index] = { ...next[index], [field]: value };
        setAttributes({ tabs: next });
    };

    const removeTab = (index) => {
        if (tabs.length <= 1) return;
        setAttributes({ tabs: tabs.filter((_, i) => i !== index) });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section header', 'twork-builder')} initialOpen={true}>
                    <PanelColorSettings
                        colorSettings={[
                            { value: sectionTitleColor, onChange: (v) => setAttributes({ sectionTitleColor: v ?? undefined }), label: __('Title color', 'twork-builder') },
                            { value: sectionSubtitleColor, onChange: (v) => setAttributes({ sectionSubtitleColor: v ?? undefined }), label: __('Subtitle color', 'twork-builder') },
                        ]}
                    />
                </PanelBody>
                <PanelBody title={__('Tabs', 'twork-builder')} initialOpen={true}>
                    {tabs.map((tab, index) => (
                        <div key={index} style={{ marginBottom: 12, padding: 10, border: '1px solid #ddd', borderRadius: 4 }}>
                            <TextControl label={__('Label', 'twork-builder')} value={tab.label} onChange={(v) => updateTab(index, 'label', v)} />
                            <TextControl label={__('Value (slug)', 'twork-builder')} value={tab.value} onChange={(v) => updateTab(index, 'value', v)} help={__('Must match category on cards: e.g. basic, special, gender', 'twork-builder')} />
                            {tabs.length > 1 && <Button isDestructive isSmall onClick={() => removeTab(index)} style={{ marginTop: 8 }}>{__('Remove tab', 'twork-builder')}</Button>}
                        </div>
                    ))}
                    <Button isSecondary isSmall onClick={addTab}>{__('Add tab', 'twork-builder')}</Button>
                </PanelBody>
                <PanelBody title={__('Colors', 'twork-builder')} initialOpen={false}>
                    <PanelColorSettings
                        colorSettings={[
                            { value: backgroundColor, onChange: (v) => setAttributes({ backgroundColor: v ?? undefined }), label: __('Section background', 'twork-builder') },
                            { value: primaryColor, onChange: (v) => setAttributes({ primaryColor: v ?? undefined }), label: __('Primary', 'twork-builder') },
                            { value: secondaryColor, onChange: (v) => setAttributes({ secondaryColor: v ?? undefined }), label: __('Secondary', 'twork-builder') },
                            { value: tabActiveBg, onChange: (v) => setAttributes({ tabActiveBg: v ?? undefined }), label: __('Tab active background', 'twork-builder') },
                            { value: tabActiveText, onChange: (v) => setAttributes({ tabActiveText: v ?? undefined }), label: __('Tab active text', 'twork-builder') },
                        ]}
                    />
                </PanelBody>
                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl label={__('Padding top (px)', 'twork-builder')} value={paddingTop} onChange={(v) => setAttributes({ paddingTop: v })} min={0} max={200} step={5} />
                    <RangeControl label={__('Padding bottom (px)', 'twork-builder')} value={paddingBottom} onChange={(v) => setAttributes({ paddingBottom: v })} min={0} max={200} step={5} />
                    <RangeControl label={__('Container max width (px)', 'twork-builder')} value={containerMaxWidth} onChange={(v) => setAttributes({ containerMaxWidth: v })} min={800} max={1400} step={20} />
                    <RangeControl label={__('Container padding (px)', 'twork-builder')} value={containerPadding} onChange={(v) => setAttributes({ containerPadding: v })} min={0} max={80} step={5} />
                    <ToggleControl
                        label={__('Animation on scroll', 'twork-builder')}
                        checked={!!animationOnScroll}
                        onChange={(v) => setAttributes({ animationOnScroll: v })}
                    />
                </PanelBody>
            </InspectorControls>

            <section {...blockProps} id="packages">
                <div className="chk-container" style={containerStyle}>
                    <div className="chk-header fade-up">
                        <RichText
                            tagName="h2"
                            value={sectionTitle}
                            onChange={(v) => setAttributes({ sectionTitle: v })}
                            placeholder={__('Our Packages', 'twork-builder')}
                            style={{ color: sectionTitleColor, marginBottom: 15, marginTop: 0 }}
                        />
                        <RichText
                            tagName="p"
                            value={sectionSubtitle}
                            onChange={(v) => setAttributes({ sectionSubtitle: v })}
                            style={{ color: sectionSubtitleColor, margin: 0 }}
                        />
                    </div>
                    <div className="chk-tabs-wrapper fade-up" style={{ marginBottom: 50 }}>
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`chk-tab-btn ${index === 0 ? 'active' : ''}`}
                                data-tab={tab.value}
                                style={{
                                    margin: '0 5px 10px',
                                    background: index === 0 ? (tabActiveBg || secondaryColor) : '#fff',
                                    color: index === 0 ? (tabActiveText || '#fff') : '#666',
                                    border: `2px solid ${index === 0 ? (tabActiveBg || secondaryColor) : '#eee'}`,
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="chk-pkg-grid twork-chk-pkg-grid-editor" data-active="basic" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 30 }}>
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
