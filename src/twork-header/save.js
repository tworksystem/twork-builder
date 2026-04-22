import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

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
		isSticky,
		backgroundColor,
		textColor,
		hoverColor,
		headerHeight,
		containerMaxWidth,
		navAlignment,
		logoType,
		logoIcon,
		logoText,
		logoImage,
		showSearchIcon,
		showCtaButton,
		ctaText,
		ctaUrl,
		showCtaIcon,
		ctaIconType,
		ctaBgColor,
		ctaTextColor,
		ctaBorderRadius,
		boxShadow,
	} = attributes;

	const ctaIcon = ICONS[ ctaIconType ] || ICONS[ 'diagonal-arrow' ];
	const navJustifyMap = {
		left: 'flex-start',
		center: 'center',
		right: 'flex-end',
	};
	const navJustify = navJustifyMap[ navAlignment ] || 'center';

	const renderLogo = () => {
		const textNode = (
			<RichText.Content tagName="span" value={ logoText || 'My Avocado' } />
		);
		const imageNode = logoImage ? <img src={ logoImage } alt="" /> : null;
		const iconNode = (
			<span className="twork-header__logo-icon">{ logoIcon || '🥑' }</span>
		);

		switch ( logoType ) {
			case 'icon-text':
				return (
					<>
						{ iconNode }
						{textNode}
					</>
				);
			case 'image-text':
				return (
					<>
						{ imageNode }
						{textNode}
					</>
				);
			case 'image':
				return imageNode || textNode;
			case 'text':
			default:
				return textNode;
		}
	};

	const blockProps = useBlockProps.save( {
		className: `twork-header${ isSticky ? ' twork-header--sticky' : '' }`,
		style: {
			'--twork-header-bg': backgroundColor,
			'--twork-header-text': textColor,
			'--twork-header-hover': hoverColor,
			'--twork-header-height': `${ headerHeight }px`,
			'--twork-header-container-max': `${ containerMaxWidth }px`,
			'--twork-header-nav-justify': navJustify,
			'--twork-header-cta-bg': ctaBgColor,
			'--twork-header-cta-text': ctaTextColor,
			'--twork-header-cta-radius': `${ ctaBorderRadius }px`,
			'--twork-header-shadow': boxShadow
				? '0 8px 30px rgba(0, 0, 0, 0.08)'
				: 'none',
		},
		'data-sticky': isSticky ? 'true' : 'false',
	} );

	return (
		<header { ...blockProps }>
			<div className="twork-header__container">
				<div className="twork-header__logo">
					{ renderLogo() }
				</div>

				<nav className="twork-header__nav">
					<div className="twork-header__nav-list">
						<InnerBlocks.Content />
					</div>
				</nav>

				<div className="twork-header__actions">
					{ showSearchIcon && (
						<button
							type="button"
							className="twork-header__search"
							aria-label="Search"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.25"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true"
								focusable="false"
							>
								<circle cx="11" cy="11" r="7" />
								<line x1="21" y1="21" x2="16.65" y2="16.65" />
							</svg>
						</button>
					) }

					{ showCtaButton && (
						<a href={ ctaUrl || '#' } className="twork-header__cta">
							<span className="twork-header__cta-label">
								{ ctaText || 'Get In Touch' }
							</span>
							{ showCtaIcon && (
								<span className="twork-header__cta-icon" aria-hidden="true">
									{ ctaIcon }
								</span>
							) }
						</a>
					) }

					<button
						type="button"
						className="twork-header__hamburger"
						aria-expanded="false"
						aria-label="Toggle menu"
					>
						<span />
						<span />
						<span />
					</button>
				</div>
			</div>
		</header>
	);
}
