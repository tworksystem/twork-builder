import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, Button, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { category, title, price, currency, listItems, buttonText, buttonUrl, isPopular } = attributes;

    const blockProps = useBlockProps({
        className: `chk-pkg-card stagger-up twork-chk-pkg-card-editor ${isPopular ? 'popular' : ''}`,
        'data-category': category || 'basic',
    });

    const addItem = () => {
        setAttributes({ listItems: [...(listItems || []), __('New item', 'twork-builder')] });
    };

    const updateItem = (index, value) => {
        const next = [...(listItems || [])];
        next[index] = value;
        setAttributes({ listItems: next });
    };

    const removeItem = (index) => {
        setAttributes({ listItems: (listItems || []).filter((_, i) => i !== index) });
    };

    const items = Array.isArray(listItems) ? listItems : [];
    const categoryOptions = [
        { label: __('General Wellness', 'twork-builder'), value: 'basic' },
        { label: __('Specialized', 'twork-builder'), value: 'special' },
        { label: __('Men & Women', 'twork-builder'), value: 'gender' },
    ];

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Package card', 'twork-builder')} initialOpen={true}>
                    <SelectControl
                        label={__('Tab / Category', 'twork-builder')}
                        value={category || 'basic'}
                        options={categoryOptions}
                        onChange={(v) => setAttributes({ category: v })}
                    />
                    <TextControl
                        label={__('Title', 'twork-builder')}
                        value={title || ''}
                        onChange={(v) => setAttributes({ title: v })}
                    />
                    <TextControl
                        label={__('Price', 'twork-builder')}
                        value={price || ''}
                        onChange={(v) => setAttributes({ price: v })}
                        help={__('e.g. 45,000', 'twork-builder')}
                    />
                    <TextControl
                        label={__('Currency', 'twork-builder')}
                        value={currency || ''}
                        onChange={(v) => setAttributes({ currency: v })}
                    />
                    <ToggleControl
                        label={__('Popular / Recommended', 'twork-builder')}
                        checked={!!isPopular}
                        onChange={(v) => setAttributes({ isPopular: v })}
                    />
                    <TextControl
                        label={__('Button text', 'twork-builder')}
                        value={buttonText || ''}
                        onChange={(v) => setAttributes({ buttonText: v })}
                    />
                    <TextControl
                        label={__('Button URL', 'twork-builder')}
                        value={buttonUrl || ''}
                        onChange={(v) => setAttributes({ buttonUrl: v })}
                    />
                </PanelBody>
                <PanelBody title={__('List items', 'twork-builder')} initialOpen={true}>
                    {items.map((item, index) => (
                        <div key={index} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                            <TextControl value={item} onChange={(v) => updateItem(index, v)} style={{ flex: 1 }} />
                            <Button isDestructive isSmall onClick={() => removeItem(index)} icon="no-alt" aria-label={__('Remove', 'twork-builder')} />
                        </div>
                    ))}
                    <Button isSecondary isSmall onClick={addItem}>{__('Add item', 'twork-builder')}</Button>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <RichText tagName="h3" value={title} onChange={(v) => setAttributes({ title: v })} placeholder={__('Package name', 'twork-builder')} />
                <div className="chk-price">
                    {price || '0'} <span>{currency || 'MMK'}</span>
                </div>
                {items.length > 0 && (
                    <ul className="chk-list">
                        {items.map((item, index) => (
                            <li key={index}><i className="fas fa-check" aria-hidden="true" />{item}</li>
                        ))}
                    </ul>
                )}
                {buttonText && (
                    <a
                        href={buttonUrl || '#'}
                        className={`chk-btn ${isPopular ? '' : 'chk-btn-outline'}`}
                        style={isPopular ? {} : { background: 'transparent', border: '2px solid var(--chk-primary)', color: 'var(--chk-primary)' }}
                        onClick={(e) => e.preventDefault()}
                    >
                        {buttonText}
                    </a>
                )}
            </div>
        </>
    );
}
