import { useBlockProps, RichText } from '@wordpress/block-editor';

const mediaIconStyle = {
	width: '100%',
	height: '100%',
	objectFit: 'contain',
	borderRadius: '50%',
};

export default function save( { attributes } ) {
	const { slot, badgeText, pointText, mediaType, mediaUrl } = attributes;
	const safeSlot = Math.min( 5, Math.max( 1, slot || 1 ) );
	const isVideo = mediaUrl && mediaUrl.match( /\.(mp4|webm)$/i );

	const blockProps = useBlockProps.save( {
		className: `twork-why-choose__point twork-why-choose__point--${ safeSlot }`,
	} );

	return (
		<div { ...blockProps }>
			<div className="twork-why-choose__point-icon">
				{ mediaType === 'media' && mediaUrl ? (
					isVideo ? (
						<video src={ mediaUrl } autoPlay loop muted playsInline style={ mediaIconStyle } />
					) : (
						<img src={ mediaUrl } alt="" style={ mediaIconStyle } />
					)
				) : (
					badgeText
				) }
			</div>
			<RichText.Content tagName="p" className="twork-why-choose__point-text" value={ pointText } />
		</div>
	);
}
