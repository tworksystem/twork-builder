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

export default function save( { attributes } ) {
	const {
		variant,
		mediaType = 'image',
		mediaUrl,
		mediaAlt,
		videoAutoplay = true,
		videoLoop = true,
		videoMuted = true,
		videoControls = false,
		backgroundColor = '#9db37a',
		objectFit = 'cover',
		overlayText,
		overlayButtonText,
		overlayButtonUrl,
		showButtonIcon = true,
		buttonIconType = 'diagonal-arrow',
	} = attributes;

	const actionIcon = ICONS[ buttonIconType ] || ICONS[ 'diagonal-arrow' ];

	const blockProps = useBlockProps.save( {
		className: [
			'twork-about-card',
			variant === 'overlay' ? 'twork-about-card--overlay' : '',
			`is-media-${ mediaType }`,
		]
			.filter( Boolean )
			.join( ' ' ),
	} );

	return (
		<article { ...blockProps }>
			{ mediaType === 'image' && mediaUrl && (
				<img src={ mediaUrl } alt={ mediaAlt || '' } style={ { objectFit } } />
			) }

			{ mediaType === 'video' && mediaUrl && (
				<video
					src={ mediaUrl }
					autoPlay={ videoAutoplay }
					loop={ videoLoop }
					muted={ videoMuted }
					controls={ videoControls }
					playsInline
					style={ { objectFit } }
				/>
			) }

			{ mediaType === 'color' && (
				<div
					className="twork-about-card__color-bg"
					style={ { backgroundColor } }
					aria-hidden="true"
				/>
			) }

			{ variant === 'overlay' && (
				<div className="twork-about-card__overlay">
					<RichText.Content
						tagName="p"
						className="twork-about-card__overlay-text"
						value={ overlayText }
					/>
					<a
						href={ overlayButtonUrl || '#' }
						className="twork-about-card__overlay-btn"
					>
						<RichText.Content
							tagName="span"
							value={ overlayButtonText }
						/>
						{ showButtonIcon && (
							<span
								className="twork-about-card__overlay-btn-icon"
								aria-hidden="true"
							>
								{ actionIcon }
							</span>
						) }
					</a>
				</div>
			) }
		</article>
	);
}
