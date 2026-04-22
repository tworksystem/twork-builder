import { useBlockProps, RichText } from '@wordpress/block-editor';

const ICONS = {
	'diagonal-arrow': (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="7" y1="17" x2="17" y2="7" />
			<polyline points="7 7 17 7 17 17" />
		</svg>
	),
	'arrow-right': (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="5" y1="12" x2="19" y2="12" />
			<polyline points="12 5 19 12 12 19" />
		</svg>
	),
	external: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
			<polyline points="15 3 21 3 21 9" />
			<line x1="10" y1="14" x2="21" y2="3" />
		</svg>
	),
	plus: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	),
};

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
		showButtonIcon = true,
		buttonIconType = 'diagonal-arrow',
	} = attributes;

	const actionIcon = ICONS[ buttonIconType ] || ICONS[ 'diagonal-arrow' ];

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
					{ showButtonIcon && (
						<span
							className="twork-process__btn-icon"
							aria-hidden="true"
						>
							{ actionIcon }
						</span>
					) }
				</a>
			) }
		</div>
	);
}
