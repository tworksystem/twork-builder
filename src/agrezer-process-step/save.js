import { useBlockProps, RichText } from '@wordpress/block-editor';

const badgeMediaStyle = {
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	borderRadius: '50%',
};

export default function save( { attributes } ) {
	const {
		position,
		badgeNum,
		mediaType,
		mediaUrl,
		stepTitle,
		stepText,
		showCta,
		ctaText,
		ctaUrl,
	} = attributes;

	const side = position === 'right' ? 'right' : 'left';
	const isVideo = mediaUrl && mediaUrl.match( /\.(mp4|webm)$/i );

	const blockProps = useBlockProps.save( {
		className: `twork-process__step twork-process__step--${ side }`,
	} );

	return (
		<div { ...blockProps }>
			<div className="twork-process__badge-wrapper">
				<div className="twork-process__badge">
					{ mediaType === 'media' && mediaUrl ? (
						isVideo ? (
							<video
								src={ mediaUrl }
								autoPlay
								loop
								muted
								playsInline
								style={ badgeMediaStyle }
							/>
						) : (
							<img src={ mediaUrl } alt="" style={ badgeMediaStyle } />
						)
					) : (
						<span className="twork-process__badge-num">{ badgeNum }</span>
					) }
				</div>
			</div>
			<RichText.Content
				tagName="h3"
				className="twork-process__step-title"
				value={ stepTitle }
			/>
			<RichText.Content
				tagName="p"
				className="twork-process__step-text"
				value={ stepText }
			/>
			{ showCta && (
				<a href={ ctaUrl || '#' } className="twork-process__btn">
					<RichText.Content tagName="span" value={ ctaText } />
					<span aria-hidden="true">↗</span>
				</a>
			) }
		</div>
	);
}
