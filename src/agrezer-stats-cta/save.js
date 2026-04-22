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
		buttonText,
		buttonUrl,
		showButtonIcon = true,
		buttonIconType = 'diagonal-arrow',
		responsiveOrder = 'default',
		hideOnMobile = false,
		mobileAlign = '',
	} = attributes;

	const actionIcon = ICONS[ buttonIconType ] || ICONS[ 'diagonal-arrow' ];
	const responsiveClasses = [
		responsiveOrder === 'first' ? 'is-order-first-mobile' : '',
		responsiveOrder === 'last' ? 'is-order-last-mobile' : '',
		hideOnMobile ? 'is-hidden-mobile' : '',
		mobileAlign === 'left' ? 'is-mobile-align-left' : '',
		mobileAlign === 'center' ? 'is-mobile-align-center' : '',
		mobileAlign === 'right' ? 'is-mobile-align-right' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	const blockProps = useBlockProps.save( {
		className: [ 'twork-stats__btn-wrap', responsiveClasses ]
			.filter( Boolean )
			.join( ' ' ),
	} );

	return (
		<div { ...blockProps }>
			<a href={ buttonUrl || '#' } className="twork-stats__btn">
				<RichText.Content tagName="span" value={ buttonText } />
				{ showButtonIcon && (
					<span className="twork-stats__btn-icon" aria-hidden="true">
						{ actionIcon }
					</span>
				) }
			</a>
		</div>
	);
}
