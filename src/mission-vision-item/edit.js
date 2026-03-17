import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	BaseControl,
	Button,
	SelectControl
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const {
		iconClass = 'fas fa-bullseye',
		iconType = '',
		iconValue = 'dashicons-bullseye',
		iconImageUrl = '',
		iconImageId,
		iconVideoUrl = '',
		iconVideoId,
		iconVideoPosterUrl = '',
		title,
		description
	} = attributes;

	const blockProps = useBlockProps({
		className: 'twork-mv-item-editor'
	});

	// Effective display: prefer iconType when set; else legacy iconClass
	const showDashicon = iconType === 'dashicon';
	const showImage = iconType === 'image' && iconImageUrl;
	const showVideo = iconType === 'video' && iconVideoUrl;
	const showLegacyIcon = (iconType === 'legacy' || (iconType === '' && iconClass)) && iconClass;

	function renderIconContent() {
		if (showImage) {
			return <img src={iconImageUrl} alt="" className="mv-icon-media" aria-hidden="true" />;
		}
		if (showVideo) {
			return (
				<video
					src={iconVideoUrl}
					poster={iconVideoPosterUrl || undefined}
					muted
					loop
					playsInline
					className="mv-icon-media"
					aria-hidden="true"
				/>
			);
		}
		if (showDashicon && iconValue) {
			return <span className={`dashicons ${iconValue}`} aria-hidden="true" />;
		}
		if (showLegacyIcon) {
			return <i className={iconClass} aria-hidden="true" />;
		}
		return <span className="dashicons dashicons-bullseye" aria-hidden="true" />;
	}

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody
					title={__('Card Content', 'twork-builder')}
					initialOpen={true}
				>
					<SelectControl
						label={__('Icon / media', 'twork-builder')}
						value={iconType || 'legacy'}
						options={[
							{ label: __('WordPress icon (Dashicons)', 'twork-builder'), value: 'dashicon' },
							{ label: __('Image / GIF', 'twork-builder'), value: 'image' },
							{ label: __('Video', 'twork-builder'), value: 'video' },
							{ label: __('Custom class (e.g. Font Awesome)', 'twork-builder'), value: 'legacy' }
						]}
						onChange={(val) => setAttributes({
							iconType: val === 'legacy' ? '' : val,
							...(val !== 'image' && { iconImageUrl: '', iconImageId: null }),
							...(val !== 'video' && { iconVideoUrl: '', iconVideoId: null, iconVideoPosterUrl: '' })
						})}
					/>

					{iconType === 'dashicon' && (
						<TextControl
							label={__('Dashicon class', 'twork-builder')}
							value={iconValue}
							onChange={(val) => setAttributes({ iconValue: val })}
							help={__('e.g. dashicons-bullseye, dashicons-visibility, dashicons-heart', 'twork-builder')}
						/>
					)}

					{iconType === 'image' && (
						<BaseControl label={__('Image / GIF', 'twork-builder')}>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => setAttributes({
										iconImageUrl: media.url,
										iconImageId: media.id
									})}
									allowedTypes={['image']}
									value={iconImageId}
									render={({ open }) => (
										<>
											{iconImageUrl ? (
												<div style={{ marginBottom: 8 }}>
													<img src={iconImageUrl} alt="" style={{ maxWidth: '100%', height: 60, objectFit: 'contain' }} />
													<div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
														<Button variant="primary" onClick={open}>{__('Replace', 'twork-builder')}</Button>
														<Button variant="secondary" isDestructive onClick={() => setAttributes({ iconImageUrl: '', iconImageId: null })}>{__('Remove', 'twork-builder')}</Button>
													</div>
												</div>
											) : (
												<Button variant="secondary" onClick={open} style={{ width: '100%' }}>{__('Choose image or GIF', 'twork-builder')}</Button>
											)}
										</>
									)}
								/>
							</MediaUploadCheck>
						</BaseControl>
					)}

					{iconType === 'video' && (
						<BaseControl label={__('Video', 'twork-builder')}>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => setAttributes({
										iconVideoUrl: media.url,
										iconVideoId: media.id,
										iconVideoPosterUrl: media.image?.src || iconVideoPosterUrl || ''
									})}
									allowedTypes={['video']}
									value={iconVideoId}
									render={({ open }) => (
										<>
											{iconVideoUrl ? (
												<div style={{ marginBottom: 8 }}>
													<video src={iconVideoUrl} muted style={{ width: '100%', maxHeight: 120, borderRadius: 4 }} />
													<div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
														<Button variant="primary" onClick={open}>{__('Replace', 'twork-builder')}</Button>
														<Button variant="secondary" isDestructive onClick={() => setAttributes({ iconVideoUrl: '', iconVideoId: null, iconVideoPosterUrl: '' })}>{__('Remove', 'twork-builder')}</Button>
													</div>
												</div>
											) : (
												<Button variant="secondary" onClick={open} style={{ width: '100%' }}>{__('Choose video', 'twork-builder')}</Button>
											)}
										</>
									)}
								/>
							</MediaUploadCheck>
						</BaseControl>
					)}

					{(iconType === 'legacy' || iconType === '') && (
						<TextControl
							label={__('Icon class (e.g. Font Awesome)', 'twork-builder')}
							help={__('Example: fas fa-bullseye, fas fa-eye, fas fa-heart', 'twork-builder')}
							value={iconClass}
							onChange={(val) => setAttributes({ iconClass: val })}
						/>
					)}

					<TextControl
						label={__('Title', 'twork-builder')}
						value={title}
						onChange={(val) => setAttributes({ title: val })}
					/>

					<TextareaControl
						label={__('Description', 'twork-builder')}
						value={description}
						onChange={(val) => setAttributes({ description: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<div className="mv-card">
				<div className="mv-icon">
					{renderIconContent()}
				</div>

				<RichText
					tagName="h3"
					className="mv-title"
					value={title}
					onChange={(val) => setAttributes({ title: val })}
					placeholder={__('Card title…', 'twork-builder')}
				/>

				<RichText
					tagName="p"
					className="mv-text"
					value={description}
					onChange={(val) => setAttributes({ description: val })}
					placeholder={__('Card description…', 'twork-builder')}
				/>
			</div>
		</div>
	);
}

