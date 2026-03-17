import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, BaseControl, __experimentalDivider as Divider } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { iconClass, cardTitle, listItems } = attributes;

    const blockProps = useBlockProps({
        className: 'em-triage-card twork-em-triage-card-editor',
        style: {
            background: '#fff',
            border: '1px solid #eee',
            borderRadius: '16px',
            padding: '30px 25px',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left'
        }
    });

    const raw = (iconClass || 'fas fa-heartbeat').trim();
    const parts = raw.split(/\s+/).filter(Boolean);
    const hasFa = parts.some((p) => p === 'fa' || p === 'fas' || p === 'far' || p === 'fab');
    const iconClassResolved = hasFa ? raw : 'fas ' + raw;

    const addItem = () => {
        const id = Date.now();
        setAttributes({
            listItems: [...(listItems || []), { id, text: __('New sign or symptom', 'twork-builder') }]
        });
    };

    const updateItem = (id, text) => {
        const updated = (listItems || []).map((item) => (item.id === id ? { ...item, text } : item));
        setAttributes({ listItems: updated });
    };

    const removeItem = (id) => {
        setAttributes({ listItems: (listItems || []).filter((item) => item.id !== id) });
    };

    const items = Array.isArray(listItems) ? listItems : [];

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Triage Card', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Icon class (Font Awesome)', 'twork-builder')}
                        value={iconClass || ''}
                        onChange={(val) => setAttributes({ iconClass: val || 'fas fa-heartbeat' })}
                        help={__('e.g. fas fa-heartbeat, fas fa-lungs, fas fa-brain', 'twork-builder')}
                    />
                </PanelBody>

                <PanelBody title={__('List Items', 'twork-builder')} initialOpen={true}>
                    <BaseControl label={__('Signs / symptoms', 'twork-builder')}>
                        {items.map((item) => (
                            <div key={item.id} style={{ marginBottom: 8, display: 'flex', gap: 6 }}>
                                <TextControl
                                    value={item.text}
                                    onChange={(val) => updateItem(item.id, val)}
                                    style={{ flex: 1 }}
                                />
                                <Button isDestructive isSmall onClick={() => removeItem(item.id)}>
                                    {__('Remove', 'twork-builder')}
                                </Button>
                            </div>
                        ))}
                        <Button isPrimary isSmall onClick={addItem}>
                            {__('Add item', 'twork-builder')}
                        </Button>
                    </BaseControl>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="em-triage-head" style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 15 }}>
                    <div className="em-triage-icon" style={{
                        width: 50,
                        height: 50,
                        background: '#fffbf7',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#f48b2a',
                        fontSize: '1.4rem',
                        flexShrink: 0
                    }}>
                        <i className={iconClassResolved} aria-hidden="true" />
                    </div>
                    <RichText
                        tagName="h4"
                        value={cardTitle}
                        onChange={(val) => setAttributes({ cardTitle: val })}
                        placeholder={__('Card title...', 'twork-builder')}
                        style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700 }}
                        withoutInteractiveFormatting
                    />
                </div>

                <ul className="em-triage-list" style={{ paddingLeft: 0, listStyle: 'none', margin: 0, flexGrow: 1 }}>
                    {items.map((item) => (
                        <li
                            key={item.id}
                            style={{
                                position: 'relative',
                                paddingLeft: 15,
                                marginBottom: 8,
                                fontSize: '0.9rem',
                                color: '#555'
                            }}
                        >
                            {item.text}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
