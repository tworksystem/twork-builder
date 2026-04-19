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
		image,
		imageAlt,
		name,
		role,
		profileUrl,
		profileOpenInNewTab,
		actionAriaLabel,
		showActionIcon = true,
		actionIconType = 'diagonal-arrow',
		actionBgColor = '#94cf37',
		actionIconColor = '#ffffff',
	} = attributes;

	const url = String( profileUrl || '' ).trim();
	const hasLink = url !== '';

	const blockStyle = {};
	if ( actionBgColor ) {
		blockStyle[ '--tw-card-action-bg' ] = actionBgColor;
	}
	if ( actionIconColor ) {
		blockStyle[ '--tw-card-action-color' ] = actionIconColor;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-team-card',
		style: blockStyle,
	} );

	const actionIcon = ICONS[ actionIconType ] || ICONS[ 'diagonal-arrow' ];

	return (
		<article { ...blockProps }>
			{ image && (
				<img
					src={ image }
					alt={ imageAlt || '' }
					className="twork-team-card__img"
					loading="lazy"
					decoding="async"
				/>
			) }
			{ showActionIcon &&
				( hasLink ? (
					<a
						href={ url }
						className="twork-team-card__action"
						aria-label={ actionAriaLabel || 'View profile' }
						{ ...( profileOpenInNewTab
							? { target: '_blank', rel: 'noopener noreferrer' }
							: {} ) }
					>
						{ actionIcon }
					</a>
				) : (
					<span
						className="twork-team-card__action twork-team-card__action--static"
						aria-hidden="true"
					>
						{ actionIcon }
					</span>
				) ) }
			<div className="twork-team-card__content">
				<RichText.Content
					tagName="h3"
					className="twork-team-card__name"
					value={ name }
				/>
				<RichText.Content
					tagName="p"
					className="twork-team-card__role"
					value={ role }
				/>
			</div>
		</article>
	);
}
