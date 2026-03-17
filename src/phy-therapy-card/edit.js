import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    MediaPlaceholder,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { imageUrl, title, description } = attributes;

    const blockProps = useBlockProps({
        className: 'phy-service-card twork-phy-therapy-card-editor',
        style: {
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px',
            backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '30px',
        },
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Therapy card', 'twork-builder')} initialOpen={true}>
                    <MediaPlaceholder
                        onSelect={(media) =>
                            setAttributes({
                                imageUrl: media?.url || '',
                            })
                        }
                        allowedTypes={['image']}
                        multiple={false}
                        labels={{ title: __('Background image', 'twork-builder') }}
                    />
                    <TextControl
                        label={__('Title', 'twork-builder')}
                        value={title || ''}
                        onChange={(val) => setAttributes({ title: val || 'Manual Therapy' })}
                    />
                    <TextControl
                        label={__('Description', 'twork-builder')}
                        value={description || ''}
                        onChange={(val) => setAttributes({ description: val || '' })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="phy-svc-content">
                    <RichText
                        tagName="h3"
                        value={title}
                        onChange={(val) => setAttributes({ title: val || 'Manual Therapy' })}
                        placeholder={__('Manual Therapy', 'twork-builder')}
                    />
                    <RichText
                        tagName="p"
                        value={description}
                        onChange={(val) => setAttributes({ description: val })}
                        placeholder={__('Therapy description…', 'twork-builder')}
                    />
                </div>
            </div>
        </>
    );
}

