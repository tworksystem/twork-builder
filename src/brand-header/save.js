import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { brandName, logoUrl, homeUrl, hotlineLabel, phone } = attributes;
	const tel = ( phone || '' ).replace( /\D/g, '' );

	const blockProps = useBlockProps.save( {
		className: 'header',
		'data-block': 'twork/brand-header',
		'data-version': '1',
	} );

	return (
		<header { ...blockProps }>
			<div className="header__main">
				<div className="header__inner l-section">
					<a
						className="header__brand"
						href={ homeUrl || '/' }
						aria-label={ `${ brandName } home` }
					>
						{ logoUrl ? (
							<img
								className="header__brand-logo"
								src={ logoUrl }
								alt={ brandName }
								width="560"
								height="290"
								loading="eager"
								decoding="async"
							/>
						) : (
							<span className="header__brand-text">
								{ brandName }
							</span>
						) }
					</a>
					<nav
						id="header-nav"
						className="header__nav"
						aria-label="Main navigation"
						data-list="menuItems"
					>
						<InnerBlocks.Content />
					</nav>
					<div className="header__actions">
						<button
							type="button"
							className="header__icon-btn"
							aria-label="Search"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								aria-hidden="true"
							>
								<circle cx="11" cy="11" r="8" />
								<path d="m21 21-4.3-4.3" />
							</svg>
						</button>
						<div className="header__hotline">
							<div>
								<p className="header__hotline-label">
									{ hotlineLabel }
								</p>
								<a
									className="header__hotline-phone"
									href={ tel ? `tel:${ tel }` : '#' }
								>
									{ phone }
								</a>
							</div>
						</div>
						<button
							className="header__toggle"
							type="button"
							data-action="menu-toggle"
							aria-expanded="false"
							aria-controls="header-nav"
						>
							<span className="u-hidden">Menu</span>
							<span
								className="header__toggle-bar"
								aria-hidden="true"
							/>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}
