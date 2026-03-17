import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    MediaPlaceholder,
    InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, SelectControl } from '@wordpress/components';

const ICON_PRESETS = [
    { value: 'fas fa-brain', label: 'Brain / Neuro (fas fa-brain)' },
    { value: 'fas fa-microscope', label: 'Microscope / Lab (fas fa-microscope)' },
    { value: 'fas fa-bone', label: 'Spine / Bone (fas fa-bone)' },
    { value: 'fas fa-wave-square', label: 'EEG / EMG (fas fa-wave-square)' },
    { value: 'fas fa-user-md', label: 'Doctor (fas fa-user-md)' },
    { value: 'fas fa-heartbeat', label: 'Emergency / Critical care (fas fa-heartbeat)' },
];

export default function Edit({ attributes = {}, setAttributes }) {
    const {
        iconType = 'icon',
        icon = 'fas fa-brain',
        imageUrl,
        imageId,
        title = '',
        text = '',
    } = attributes;

    const blockProps = useBlockProps({
        className: 'treatment-card stagger-card twork-neuro-treatment-item-editor',
    });

    const useImage = iconType === 'image';

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Treatment Card', 'twork-builder')} initialOpen={true}>
                    <ToggleControl
                        label={__('Use image instead of icon', 'twork-builder')}
                        checked={useImage}
                        onChange={(val) =>
                            setAttributes({ iconType: val ? 'image' : 'icon' })
                        }
                        help={__(
                            'Toggle between a Font Awesome icon or a custom image.',
                            'twork-builder'
                        )}
                    />
                    {!useImage && (
                        <>
                            <SelectControl
                                label={__('Icon preset', 'twork-builder')}
                                value={icon}
                                options={[
                                    { value: '', label: __('Custom / None', 'twork-builder') },
                                    ...ICON_PRESETS.map((p) => ({
                                        value: p.value,
                                        label: __(p.label, 'twork-builder'),
                                    })),
                                ]}
                                onChange={(val) => setAttributes({ icon: val })}
                            />
                            <TextControl
                                label={__('Custom icon class', 'twork-builder')}
                                value={icon}
                                onChange={(val) => setAttributes({ icon: val })}
                                help={__(
                                    'e.g. fas fa-brain',
                                    'twork-builder'
                                )}
                            />
                        </>
                    )}
                    {useImage && (
                        <div className="treatment-image-control">
                            {imageUrl ? (
                                <>
                                    <img
                                        src={imageUrl}
                                        alt=""
                                        style={{
                                            width: '100%',
                                            borderRadius: 8,
                                            marginBottom: 8,
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="components-button is-secondary is-small"
                                        onClick={() =>
                                            setAttributes({
                                                imageUrl: '',
                                                imageId: null,
                                            })
                                        }
                                    >
                                        {__('Remove image', 'twork-builder')}
                                    </button>
                                </>
                            ) : (
                                <MediaPlaceholder
                                    onSelect={(media) =>
                                        setAttributes({
                                            imageUrl: media.url,
                                            imageId: media.id,
                                        })
                                    }
                                    allowedTypes={['image']}
                                    multiple={false}
                                    labels={{ title: __('Treatment image', 'twork-builder') }}
                                />
                            )}
                        </div>
                    )}
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                {!useImage && <i className={icon} />}
                {useImage && imageUrl && (
                    <img src={imageUrl} alt="" className="treatment-media" />
                )}
                {useImage && !imageUrl && (
                    <span className="treatment-media-placeholder">
                        {__('Add image in sidebar', 'twork-builder')}
                    </span>
                )}
                <RichText
                    tagName="h4"
                    value={title}
                    onChange={(val) => setAttributes({ title: val })}
                    placeholder={__('Treatment title…', 'twork-builder')}
                />
                <RichText
                    tagName="p"
                    value={text}
                    onChange={(val) => setAttributes({ text: val })}
                    placeholder={__('Description…', 'twork-builder')}
                />
            </div>
        </>
    );
}
