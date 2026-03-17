import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    MediaPlaceholder,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl, ToggleControl, Button } from '@wordpress/components';

const DEFAULT_LIST_ITEMS = [
    { id: '1', iconClass: 'fas fa-compress-arrows-alt', title: 'Micro Incisions', subtitle: 'Tiny cuts (0.5cm - 1cm) leading to better cosmetic results.' },
    { id: '2', iconClass: 'fas fa-running', title: 'Rapid Recovery', subtitle: 'Return to normal activities within days, not weeks.' },
];

export default function Edit({ attributes, setAttributes }) {
    const {
        sectionClass,
        label,
        title,
        description,
        listItems = DEFAULT_LIST_ITEMS,
        buttonText,
        buttonUrl,
        buttonTarget,
        imageUrl,
        imageId,
        imageAlt,
        badgeIcon,
        badgeTitle,
        badgeSubtitle,
        containerMaxWidth,
        containerPadding,
        gridGap,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'twork-split-section-editor',
    });

    const containerStyle = {
        maxWidth: `${containerMaxWidth}px`,
        margin: '0 auto',
        padding: `0 ${containerPadding}px`,
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: `${gridGap}px`,
    };

    const addListItem = () => {
        const items = Array.isArray(listItems) ? [...listItems] : [];
        items.push({
            id: String(Date.now()),
            iconClass: 'fas fa-check',
            title: __('New item', 'twork-builder'),
            subtitle: __('Description.', 'twork-builder'),
        });
        setAttributes({ listItems: items });
    };

    const removeListItem = (id) => {
        const items = (Array.isArray(listItems) ? listItems : []).filter((item) => item.id !== id);
        setAttributes({ listItems: items });
    };

    const updateListItem = (id, field, value) => {
        const items = (Array.isArray(listItems) ? listItems : []).map((item) =>
            item.id === id ? { ...item, [field]: value } : item
        );
        setAttributes({ listItems: items });
    };

    // Persist default list when block is new (empty listItems)
    useEffect(() => {
        if (Array.isArray(listItems) && listItems.length === 0) {
            setAttributes({ listItems: DEFAULT_LIST_ITEMS });
        }
    }, []);

    const items = Array.isArray(listItems) && listItems.length > 0 ? listItems : DEFAULT_LIST_ITEMS;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Section class', 'twork-builder')}
                        value={sectionClass}
                        onChange={(v) => setAttributes({ sectionClass: v || 'section-padding split-section' })}
                    />
                </PanelBody>
                <PanelBody title={__('Button', 'twork-builder')} initialOpen={false}>
                    <TextControl
                        label={__('Button text', 'twork-builder')}
                        value={buttonText}
                        onChange={(v) => setAttributes({ buttonText: v })}
                    />
                    <TextControl
                        label={__('Button URL', 'twork-builder')}
                        value={buttonUrl}
                        onChange={(v) => setAttributes({ buttonUrl: v || '#' })}
                    />
                    <ToggleControl
                        label={__('Open in new tab', 'twork-builder')}
                        checked={!!buttonTarget}
                        onChange={(v) => setAttributes({ buttonTarget: v })}
                    />
                </PanelBody>
                <PanelBody title={__('Floating badge', 'twork-builder')} initialOpen={false}>
                    <TextControl
                        label={__('Badge icon class', 'twork-builder')}
                        value={badgeIcon}
                        onChange={(v) => setAttributes({ badgeIcon: v || 'fas fa-star' })}
                    />
                    <TextControl label={__('Badge title', 'twork-builder')} value={badgeTitle} onChange={(v) => setAttributes({ badgeTitle: v })} />
                    <TextControl label={__('Badge subtitle', 'twork-builder')} value={badgeSubtitle} onChange={(v) => setAttributes({ badgeSubtitle: v })} />
                </PanelBody>
                <PanelBody title={__('Layout', 'twork-builder')} initialOpen={false}>
                    <RangeControl
                        label={__('Grid gap (px)', 'twork-builder')}
                        value={gridGap}
                        onChange={(v) => setAttributes({ gridGap: v })}
                        min={24}
                        max={80}
                        step={4}
                    />
                    <RangeControl
                        label={__('Container max width (px)', 'twork-builder')}
                        value={containerMaxWidth}
                        onChange={(v) => setAttributes({ containerMaxWidth: v })}
                        min={800}
                        max={1920}
                        step={10}
                    />
                    <RangeControl
                        label={__('Container padding (px)', 'twork-builder')}
                        value={containerPadding}
                        onChange={(v) => setAttributes({ containerPadding: v })}
                        min={0}
                        max={80}
                        step={4}
                    />
                </PanelBody>
            </InspectorControls>

            <section {...blockProps} className={sectionClass}>
                <div className="editor-label" style={{
                    textAlign: 'center',
                    padding: '10px',
                    background: '#2271b1',
                    color: '#fff',
                    fontWeight: '600',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                    borderRadius: '4px',
                }}>
                    {__('Split Section (Editor View)', 'twork-builder')}
                </div>
                <div className="container" style={containerStyle}>
                    <div className="split-grid" style={gridStyle}>
                        <div className="fade-up split-section-text">
                            <RichText
                                tagName="span"
                                value={label}
                                onChange={(v) => setAttributes({ label: v })}
                                placeholder={__('Minimally Invasive', 'twork-builder')}
                                style={{ color: '#80D0C7', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}
                            />
                            <RichText
                                tagName="h2"
                                value={title}
                                onChange={(v) => setAttributes({ title: v })}
                                placeholder={__('Laparoscopic Surgery', 'twork-builder')}
                                style={{ color: 'white', fontSize: '2.5rem', marginTop: 10, marginBottom: 12 }}
                            />
                            <RichText
                                tagName="p"
                                value={description}
                                onChange={(v) => setAttributes({ description: v })}
                                placeholder={__('Also known as Keyhole Surgery…', 'twork-builder')}
                                style={{ color: '#cbd5e1', marginBottom: 30 }}
                            />
                            <ul className="lap-list">
                                {items.map((item) => (
                                    <li key={item.id}>
                                        <i className={item.iconClass || 'fas fa-check'} aria-hidden="true" />
                                        <div>
                                            <input
                                                type="text"
                                                value={item.title || ''}
                                                onChange={(e) => updateListItem(item.id, 'title', e.target.value)}
                                                placeholder={__('Title', 'twork-builder')}
                                                style={{ display: 'block', width: '100%', marginBottom: 5, color: 'white', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 10px', borderRadius: 4 }}
                                            />
                                            <input
                                                type="text"
                                                value={item.subtitle || ''}
                                                onChange={(e) => updateListItem(item.id, 'subtitle', e.target.value)}
                                                placeholder={__('Subtitle', 'twork-builder')}
                                                style={{ display: 'block', width: '100%', color: '#94a3b8', fontSize: '0.9rem', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '4px 0' }}
                                            />
                                        </div>
                                        <Button variant="secondary" size="small" isDestructive onClick={() => removeListItem(item.id)}>
                                            {__('Remove', 'twork-builder')}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                            <Button variant="secondary" size="small" onClick={addListItem} style={{ marginBottom: 20 }}>
                                {__('Add list item', 'twork-builder')}
                            </Button>
                            <a href={buttonUrl || '#'} className="btn btn-primary" style={{ background: 'white', color: 'var(--secondary)', pointerEvents: 'none' }}>
                                {buttonText || 'Learn about Keyhole'}
                            </a>
                        </div>
                        <div className="lap-img-container fade-up">
                            {!imageUrl ? (
                                <MediaPlaceholder
                                    onSelect={(media) => setAttributes({ imageUrl: media.url, imageId: media.id, imageAlt: media.alt || '' })}
                                    allowedTypes={['image']}
                                    multiple={false}
                                    labels={{ title: __('Right column image', 'twork-builder') }}
                                />
                            ) : (
                                <div style={{ position: 'relative' }}>
                                    <img src={imageUrl} alt={imageAlt} style={{ width: '100%', height: 'auto', display: 'block' }} />
                                    <div className="floating-badge" style={{ position: 'absolute', bottom: 30, left: -20, background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 10px 40px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: 15, maxWidth: 250 }}>
                                        <i className={badgeIcon || 'fas fa-star'} style={{ fontSize: '2rem', color: '#FF8C00' }} aria-hidden="true" />
                                        <div>
                                            <strong style={{ display: 'block', color: 'var(--secondary)' }}>{badgeTitle}</strong>
                                            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{badgeSubtitle}</span>
                                        </div>
                                    </div>
                                    <Button variant="secondary" size="small" onClick={() => setAttributes({ imageUrl: '', imageId: undefined, imageAlt: '' })} style={{ marginTop: 10 }}>
                                        {__('Remove image', 'twork-builder')}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
