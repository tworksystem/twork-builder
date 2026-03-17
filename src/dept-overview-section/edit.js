import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { sectionId, title, leadText, content, imageUrl, imageId, imageAlt } = attributes;
    const blockProps = useBlockProps({ className: 'content-section twork-dept-overview-editor' });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Section', 'twork-builder')}>
                    <TextControl
                        label={__('Section ID (anchor)', 'twork-builder')}
                        value={sectionId}
                        onChange={(v) => setAttributes({ sectionId: v })}
                        help={__('Used for sidebar nav links, e.g. #overview', 'twork-builder')}
                    />
                </PanelBody>
                <PanelBody title={__('Image', 'twork-builder')}>
                    {!imageUrl ? (
                        <MediaPlaceholder
                            onSelect={(m) => setAttributes({ imageUrl: m.url, imageId: m.id, imageAlt: m.alt || '' })}
                            allowedTypes={['image']}
                        />
                    ) : (
                        <div>
                            <img src={imageUrl} alt="" style={{ maxWidth: '100%', marginBottom: 8 }} />
                            <TextControl label={__('Alt', 'twork-builder')} value={imageAlt} onChange={(v) => setAttributes({ imageAlt: v })} />
                            <Button isSecondary isSmall onClick={() => setAttributes({ imageUrl: '', imageId: null, imageAlt: '' })}>
                                {__('Remove', 'twork-builder')}
                            </Button>
                        </div>
                    )}
                </PanelBody>
            </InspectorControls>
            <section {...blockProps} id={sectionId}>
                <RichText tagName="h2" value={title} onChange={(v) => setAttributes({ title: v })} placeholder={__('Title...', 'twork-builder')} />
                <RichText tagName="p" value={leadText} onChange={(v) => setAttributes({ leadText: v })} className="lead-text" placeholder={__('Lead text...', 'twork-builder')} />
                <RichText tagName="p" value={content} onChange={(v) => setAttributes({ content: v })} placeholder={__('Content...', 'twork-builder')} />
                {imageUrl && <img src={imageUrl} alt={imageAlt} style={{ borderRadius: 12, marginTop: 30, width: '100%', objectFit: 'cover', height: 400 }} />}
            </section>
        </>
    );
}
