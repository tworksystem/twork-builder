import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from '@wordpress/components';

const ICONS = [
    { value: 'fa-heart-broken', label: 'Heart Broken' },
    { value: 'fa-bolt', label: 'Bolt' },
    { value: 'fa-heartbeat', label: 'Heartbeat' },
    { value: 'fa-child', label: 'Child' },
    { value: 'fa-procedures', label: 'Procedures' },
    { value: 'fa-user-md', label: 'User MD' },
];

export default function Edit({ attributes = {}, setAttributes }) {
    const { icon = 'fa-heart-broken', title = '' } = attributes;
    const blockProps = useBlockProps({ className: 'condition-card twork-dept-condition-editor' });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Condition', 'twork-builder')}>
                    <SelectControl
                        label={__('Icon', 'twork-builder')}
                        value={icon}
                        options={ICONS}
                        onChange={(v) => setAttributes({ icon: v })}
                    />
                    <TextControl label={__('Title', 'twork-builder')} value={title} onChange={(v) => setAttributes({ title: v })} />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <i className={`fas ${icon}`} />
                <h4>{title}</h4>
            </div>
        </>
    );
}
