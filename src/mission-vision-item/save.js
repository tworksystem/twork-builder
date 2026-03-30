import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		iconClass = 'fas fa-bullseye',
		iconType = '',
		iconValue = 'dashicons-bullseye',
		iconImageUrl = '',
		iconVideoUrl = '',
		iconVideoPosterUrl = '',
		title,
		description,
	} = attributes;

	const showImage = iconType === 'image' && iconImageUrl;
	const showVideo = iconType === 'video' && iconVideoUrl;
	const showDashicon = iconType === 'dashicon' && iconValue;
	const showLegacyIcon = ( iconType === '' || ! iconType ) && iconClass;

	function renderIconContent() {
		if ( showImage ) {
			return (
				<img
					src={ iconImageUrl }
					alt=""
					className="mv-icon-media"
					aria-hidden="true"
				/>
			);
		}
		if ( showVideo ) {
			return (
				<video
					src={ iconVideoUrl }
					poster={ iconVideoPosterUrl || undefined }
					muted
					loop
					playsInline
					className="mv-icon-media"
					aria-hidden="true"
				/>
			);
		}
		if ( showDashicon ) {
			return (
				<span
					className={ `dashicons ${ iconValue }` }
					aria-hidden="true"
				/>
			);
		}
		if ( showLegacyIcon ) {
			return <i className={ iconClass } aria-hidden="true" />;
		}
		return (
			<span className="dashicons dashicons-bullseye" aria-hidden="true" />
		);
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-mv-item',
	} );

	return (
		<div { ...blockProps }>
			<div className="mv-card">
				<div className="mv-icon">{ renderIconContent() }</div>

				<RichText.Content
					tagName="h3"
					className="mv-title"
					value={ title }
				/>

				<RichText.Content
					tagName="p"
					className="mv-text"
					value={ description }
				/>
			</div>
		</div>
	);
}
