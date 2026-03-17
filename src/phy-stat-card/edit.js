import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { statNumber, label } = attributes;

    const blockProps = useBlockProps({
        className: 'phy-stat-card twork-phy-stat-card-editor',
        style: {
            padding: '30px',
            textAlign: 'center',
            background: '#fff',
            borderRadius: '20px',
            borderBottom: '5px solid var(--phy-primary, #f48b2a)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.06)',
        },
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Stat card', 'twork-builder')} initialOpen={true}>
                    <TextControl
                        label={__('Number / value', 'twork-builder')}
                        value={statNumber || ''}
                        onChange={(val) => setAttributes({ statNumber: val || '5k+' })}
                        help={__('e.g. 5k+, 10+, 98%, 15', 'twork-builder')}
                    />
                    <TextControl
                        label={__('Label', 'twork-builder')}
                        value={label || ''}
                        onChange={(val) => setAttributes({ label: val || 'Happy Patients' })}
                        help={__('Short label under the number', 'twork-builder')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <RichText
                    tagName="span"
                    className="phy-stat-num"
                    value={statNumber}
                    onChange={(val) => setAttributes({ statNumber: val || '5k+' })}
                    placeholder={__('5k+', 'twork-builder')}
                    style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: 'var(--phy-primary, #f48b2a)',
                        display: 'block',
                        marginBottom: 4,
                    }}
                />
                <RichText
                    tagName="p"
                    value={label}
                    onChange={(val) => setAttributes({ label: val || 'Happy Patients' })}
                    placeholder={__('Happy Patients', 'twork-builder')}
                    style={{
                        margin: 0,
                        fontSize: '1rem',
                        color: '#555',
                    }}
                />
            </div>
        </>
    );
}
