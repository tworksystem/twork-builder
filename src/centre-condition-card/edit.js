import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaPlaceholder, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, BaseControl, SelectControl } from '@wordpress/components';

const ICON_TYPE_OPTIONS = [
    { value: 'fontawesome', label: __('Font Awesome', 'twork-builder') },
    { value: 'dashicon', label: __('WordPress (Dashicons)', 'twork-builder') },
    { value: 'image', label: __('Image / GIF', 'twork-builder') },
    { value: 'video', label: __('Video', 'twork-builder') },
];

const DASHICON_OPTIONS = [
    { value: 'dashicons-heart', label: __('Heart', 'twork-builder') },
    { value: 'dashicons-performance', label: __('Performance', 'twork-builder') },
    { value: 'dashicons-editor-help', label: __('Help', 'twork-builder') },
    { value: 'dashicons-plus-alt', label: __('Plus', 'twork-builder') },
    { value: 'dashicons-yes', label: __('Check', 'twork-builder') },
    { value: 'dashicons-admin-generic', label: __('Cog', 'twork-builder') },
    { value: 'dashicons-chart-line', label: __('Chart', 'twork-builder') },
];

function ConditionCardIconRender({ iconType, faClass, dashicon, imageUrl, videoUrl, className = '' }) {
    const wrap = (content) => (
        <span className={`centre-icon-wrap condition-card-icon ${className}`.trim()} aria-hidden="true">
            {content}
        </span>
    );
    if (iconType === 'image' && imageUrl) return wrap(<img src={imageUrl} alt="" className="centre-icon-img" />);
    if (iconType === 'video' && videoUrl) return wrap(<video src={videoUrl} className="centre-icon-video" muted loop playsInline autoPlay aria-hidden="true" />);
    if (iconType === 'dashicon' && dashicon) return wrap(<span className={`dashicons ${dashicon}`} />);
    if (faClass) return wrap(<i className={faClass} />);
    return null;
}

export default function Edit({ attributes, setAttributes }) {
    const { iconClass, iconType, iconDashicon, iconImageUrl, iconImageId, iconVideoUrl, iconVideoId, title } = attributes;
    const blockProps = useBlockProps({ className: 'condition-card twork-centre-condition-card-editor' });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Card', 'twork-builder')}>
                    <BaseControl label={__('Icon', 'twork-builder')} help={__('Choose icon type: Font Awesome, WordPress icon, image/GIF, or video.', 'twork-builder')}>
                        <SelectControl
                            label={__('Icon type', 'twork-builder')}
                            value={iconType || 'fontawesome'}
                            options={ICON_TYPE_OPTIONS}
                            onChange={(v) => setAttributes({ iconType: v })}
                        />
                        {(iconType || 'fontawesome') === 'fontawesome' && (
                            <TextControl
                                label={__('Font Awesome class', 'twork-builder')}
                                value={iconClass || 'fas fa-heart-broken'}
                                onChange={(v) => setAttributes({ iconClass: v || 'fas fa-heart-broken' })}
                                help={__('e.g. fas fa-heart-broken, fas fa-bolt', 'twork-builder')}
                            />
                        )}
                        {(iconType || 'fontawesome') === 'dashicon' && (
                            <SelectControl
                                label={__('WordPress Dashicon', 'twork-builder')}
                                value={iconDashicon || 'dashicons-heart'}
                                options={DASHICON_OPTIONS}
                                onChange={(v) => setAttributes({ iconDashicon: v })}
                            />
                        )}
                        {(iconType || 'fontawesome') === 'image' && (
                            !iconImageUrl ? (
                                <MediaPlaceholder
                                    onSelect={(media) => setAttributes({ iconImageUrl: media.url, iconImageId: media.id })}
                                    allowedTypes={['image']}
                                    multiple={false}
                                    labels={{ title: __('Icon image / GIF', 'twork-builder') }}
                                />
                            ) : (
                                <div>
                                    <img src={iconImageUrl} alt="" style={{ maxWidth: '100%', height: 'auto', marginBottom: 8 }} />
                                    <Button variant="secondary" size="small" onClick={() => setAttributes({ iconImageUrl: '', iconImageId: undefined })}>{__('Remove', 'twork-builder')}</Button>
                                </div>
                            )
                        )}
                        {(iconType || 'fontawesome') === 'video' && (
                            !iconVideoUrl ? (
                                <MediaPlaceholder
                                    onSelect={(media) => setAttributes({ iconVideoUrl: media.url, iconVideoId: media.id })}
                                    allowedTypes={['video']}
                                    multiple={false}
                                    labels={{ title: __('Icon video', 'twork-builder') }}
                                />
                            ) : (
                                <div>
                                    <video src={iconVideoUrl} style={{ maxWidth: '100%', marginBottom: 8 }} muted loop playsInline width={120} />
                                    <Button variant="secondary" size="small" onClick={() => setAttributes({ iconVideoUrl: '', iconVideoId: undefined })}>{__('Remove', 'twork-builder')}</Button>
                                </div>
                            )
                        )}
                    </BaseControl>
                    <TextControl label={__('Title', 'twork-builder')} value={title} onChange={(v) => setAttributes({ title: v })} />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <ConditionCardIconRender
                    iconType={iconType || 'fontawesome'}
                    faClass={iconClass || 'fas fa-heart-broken'}
                    dashicon={iconDashicon}
                    imageUrl={iconImageUrl}
                    videoUrl={iconVideoUrl}
                />
                <RichText
                    tagName="h4"
                    value={title}
                    onChange={(v) => setAttributes({ title: v })}
                    placeholder={__('Condition title…', 'twork-builder')}
                />
            </div>
        </>
    );
}
