import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { iconClass, statValue, statLabel } = attributes;

    const blockProps = useBlockProps({
        className: 'em-stat-item twork-em-stat-item-editor',
        style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#fff'
        }
    });

    const raw = (iconClass || 'fas fa-clock').trim();
    const parts = raw.split(/\s+/).filter(Boolean);
    const hasFa = parts.some((p) => p === 'fa' || p === 'fas' || p === 'far' || p === 'fab');
    const iconClassResolved = hasFa ? raw : 'fas ' + raw;

    return (
        <>
            <InspectorControls>
                <PanelBody
                    title={__('Stat Item', 'twork-builder')}
                    initialOpen={true}
                >
                    <TextControl
                        label={__('Icon class (Font Awesome)', 'twork-builder')}
                        value={iconClass || ''}
                        onChange={(val) => setAttributes({ iconClass: val || 'fas fa-clock' })}
                        help={__('e.g. fas fa-clock, fas fa-user-md, fas fa-ambulance, fas fa-bed', 'twork-builder')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {iconClassResolved && (
                    <i className={iconClassResolved} aria-hidden="true" style={{ fontSize: '2rem', marginBottom: '10px', opacity: 0.8 }} />
                )}
                <RichText
                    tagName="h3"
                    value={statValue}
                    onChange={(val) => setAttributes({ statValue: val })}
                    placeholder={__('24/7', 'twork-builder')}
                    style={{
                        fontSize: '1.5rem',
                        margin: 0,
                        color: '#fff',
                        lineHeight: 1.2
                    }}
                    withoutInteractiveFormatting
                />
                <RichText
                    tagName="p"
                    value={statLabel}
                    onChange={(val) => setAttributes({ statLabel: val })}
                    placeholder={__('Open All Day', 'twork-builder')}
                    style={{
                        fontSize: '1rem',
                        margin: '5px 0 0 0',
                        color: '#fff',
                        opacity: 0.95,
                        lineHeight: 1.3
                    }}
                    withoutInteractiveFormatting
                />
            </div>
        </>
    );
}
