import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit({ attributes = {}, setAttributes }) {
    const { imageUrl = '', imageId, caption = '' } = attributes;
    const blockProps = useBlockProps({ className: 'tech-item twork-dept-tech-editor' });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Tech Item', 'twork-builder')}>
                    {!imageUrl ? (
                        <MediaPlaceholder
                            onSelect={(m) => setAttributes({ imageUrl: m.url, imageId: m.id })}
                            allowedTypes={['image']}
                            multiple={false}
                            labels={{ title: __('Tech Image', 'twork-builder') }}
                        />
                    ) : (
                        <div>
                            <img src={imageUrl} alt="" style={{ maxWidth: '100%', marginBottom: 8 }} />
                            <Button isSecondary isSmall onClick={() => setAttributes({ imageUrl: '', imageId: null })}>{__('Remove', 'twork-builder')}</Button>
                        </div>
                    )}
                    <TextControl label={__('Caption', 'twork-builder')} value={caption} onChange={(v) => setAttributes({ caption: v })} />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                {imageUrl ? <img src={imageUrl} alt={caption || ''} /> : <div style={{ height: 280, background: '#eee' }} />}
                <div className="tech-caption">{caption}</div>
            </div>
        </>
    );
}
