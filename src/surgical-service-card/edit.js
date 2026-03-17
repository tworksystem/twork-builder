import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Button } from '@wordpress/components';

const ICON_SUGGESTIONS = [
    'fas fa-procedures',
    'fas fa-dot-circle',
    'fas fa-crutch',
    'fas fa-stethoscope',
    'fas fa-heartbeat',
    'fas fa-user-md',
];

export default function Edit({ attributes, setAttributes }) {
    const { iconClass, title, description, listItems = [], linkText, linkUrl, linkTarget } = attributes;
    const blockProps = useBlockProps({
        className: 'service-card twork-surgical-service-card-editor stagger-up',
    });

    const addListItem = () => setAttributes({ listItems: [...listItems, __('New item', 'twork-builder')] });
    const removeListItem = (index) => setAttributes({ listItems: listItems.filter((_, i) => i !== index) });
    const updateListItem = (index, value) => setAttributes({
        listItems: listItems.map((item, i) => (i === index ? value : item)),
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Service Card', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Icon class (Font Awesome)', 'twork-builder')}
                        value={iconClass || 'fas fa-procedures'}
                        onChange={(v) => setAttributes({ iconClass: v || 'fas fa-procedures' })}
                        help={__('e.g. fas fa-procedures', 'twork-builder')}
                    />
                    <p style={{ fontSize: '11px', color: '#757575', marginTop: 4 }}>
                        {ICON_SUGGESTIONS.join(', ')}
                    </p>
                    <TextControl
                        label={__('Link URL', 'twork-builder')}
                        value={linkUrl}
                        onChange={(v) => setAttributes({ linkUrl: v || '#' })}
                    />
                    <TextControl
                        label={__('Link text', 'twork-builder')}
                        value={linkText}
                        onChange={(v) => setAttributes({ linkText: v || 'Read More' })}
                    />
                    <ToggleControl
                        label={__('Open link in new tab', 'twork-builder')}
                        checked={!!linkTarget}
                        onChange={(v) => setAttributes({ linkTarget: v })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <i className={`${iconClass || 'fas fa-procedures'} service-icon-bg`} aria-hidden="true" />
                <div className="service-content">
                    <div className="service-header">
                        <i className={iconClass || 'fas fa-procedures'} aria-hidden="true" />
                    </div>
                    <RichText
                        tagName="h3"
                        value={title}
                        onChange={(v) => setAttributes({ title: v })}
                        placeholder={__('Service title…', 'twork-builder')}
                    />
                    <RichText
                        tagName="p"
                        value={description}
                        onChange={(v) => setAttributes({ description: v })}
                        placeholder={__('Description…', 'twork-builder')}
                        style={{ color: '#64748b', marginBottom: 15 }}
                    />
                    {Array.isArray(listItems) && listItems.length > 0 && (
                        <ul style={{ color: '#475569', fontSize: '0.9rem', marginBottom: 15, paddingLeft: 20 }}>
                            {listItems.map((item, index) => (
                                <li key={index} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                                    <i className="fas fa-check" style={{ color: '#0093E9', marginRight: 5 }} aria-hidden="true" />
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => updateListItem(index, e.target.value)}
                                        style={{ flex: 1, border: '1px solid #ddd', padding: '4px 8px', borderRadius: 4 }}
                                    />
                                    <Button variant="secondary" size="small" isDestructive onClick={() => removeListItem(index)}>
                                        {__('Remove', 'twork-builder')}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <Button variant="secondary" size="small" onClick={addListItem} style={{ marginBottom: 15 }}>
                        {__('Add list item', 'twork-builder')}
                    </Button>
                    <a href={linkUrl || '#'} className="service-link" style={{ pointerEvents: 'none' }}>
                        {linkText || 'Read More'} <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }} aria-hidden="true" />
                    </a>
                </div>
            </div>
        </>
    );
}
