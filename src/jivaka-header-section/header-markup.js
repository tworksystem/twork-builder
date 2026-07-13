import { Fragment } from '@wordpress/element';
import { resolveNavItems } from './nav-data';

function DesktopNavItem( { item } ) {
	if ( item.type === 'dropdown' && Array.isArray( item.children ) ) {
		return (
			<li className="has-dropdown">
				<a href={ item.url || '#' } className="menu-link">
					{ item.label }{ ' ' }
					<i className="fas fa-chevron-down" aria-hidden="true"></i>
				</a>
				<ul className="dropdown-menu">
					{ item.children.map( ( child, index ) => (
						<li key={ `${ child.label }-${ index }` }>
							<a href={ child.url }>{ child.label }</a>
						</li>
					) ) }
				</ul>
			</li>
		);
	}

	if ( item.type === 'mega' && Array.isArray( item.children ) ) {
		return (
			<li className="has-mega-menu">
				<a href={ item.url || '#' } className="menu-link">
					{ item.label }{ ' ' }
					<i className="fas fa-chevron-down" aria-hidden="true"></i>
				</a>
				<div className="mega-menu">
					<div className="mega-menu-content">
						{ item.children.map( ( group, groupIndex ) => (
							<div
								className="mega-column"
								key={ `${ group.groupTitle }-${ groupIndex }` }
							>
								<h4>{ group.groupTitle }</h4>
								<ul>
									{ ( group.links || [] ).map(
										( link, linkIndex ) => (
											<li
												key={ `${ link.label }-${ linkIndex }` }
											>
												<a href={ link.url }>
													{ link.label }
												</a>
											</li>
										)
									) }
								</ul>
							</div>
						) ) }
					</div>
				</div>
			</li>
		);
	}

	return (
		<li>
			<a href={ item.url } className="menu-link">
				{ item.label }
			</a>
		</li>
	);
}

function MobileNavItem( { item } ) {
	if (
		( item.type === 'dropdown' || item.type === 'mega' ) &&
		Array.isArray( item.children )
	) {
		return (
			<li className="nav-item has-mobile-dropdown">
				<div
					className="mobile-dropdown-head"
					role="button"
					tabIndex={ 0 }
					aria-expanded="false"
				>
					<span className="nav-link">{ item.label }</span>
					<i className="fas fa-plus" aria-hidden="true"></i>
				</div>
				<ul className="mobile-dropdown-body">
					{ item.type === 'mega'
						? item.children.map( ( group, groupIndex ) => (
								<Fragment
									key={ `${ group.groupTitle }-${ groupIndex }` }
								>
									<span className="group-title">
										{ group.groupTitle }
									</span>
									{ ( group.links || [] ).map(
										( link, linkIndex ) => (
											<li
												key={ `${ link.label }-${ linkIndex }` }
											>
												<a href={ link.url }>
													{ link.label }
												</a>
											</li>
										)
									) }
								</Fragment>
						  ) )
						: item.children.map( ( child, index ) => (
								<li key={ `${ child.label }-${ index }` }>
									<a href={ child.url }>{ child.label }</a>
								</li>
						  ) ) }
				</ul>
			</li>
		);
	}

	return (
		<li className="nav-item">
			<a href={ item.url } className="nav-link">
				{ item.label }
			</a>
		</li>
	);
}

export default function HeaderMarkup( {
	logoUrl = '/',
	logoImage,
	logoAlt = 'Jivaka Hospital Logo',
	ctaText = 'Book Now',
	ctaUrl = '/appointment/',
	hotlineText = '09-789 101 101',
	navItems = [],
	mobileCtaText = 'Book Appointment',
} ) {
	const items = resolveNavItems( navItems );

	return (
		<div className="jivaka-header-container">
			<header className="header">
				<div className="jivaka-inner-container">
					<a href={ logoUrl } className="header-logo">
						{ logoImage ? (
							<img src={ logoImage } alt={ logoAlt } />
						) : null }
					</a>

					<nav className="desktop-nav" aria-label="Primary navigation">
						<ul className="main-nav-list">
							{ items.map( ( item, index ) => (
								<DesktopNavItem
									key={ `${ item.label }-${ index }` }
									item={ item }
								/>
							) ) }
						</ul>
						<a
							href={ ctaUrl }
							className="jivaka-btn jivaka-btn-primary"
						>
							{ ctaText }
						</a>
					</nav>

					<button
						className="nav-toggle"
						type="button"
						aria-label="Open Navigation"
						aria-expanded="false"
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>

				<div className="mobile-nav-overlay">
					<div className="mobile-nav-content">
						<ul className="mobile-nav-list">
							{ items.map( ( item, index ) => (
								<MobileNavItem
									key={ `${ item.label }-mobile-${ index }` }
									item={ item }
								/>
							) ) }
						</ul>

						<div className="mobile-nav-footer">
							<a
								href={ ctaUrl }
								className="jivaka-btn jivaka-btn-primary full-width"
							>
								{ mobileCtaText }
							</a>
							<div className="quick-contact">
								<p>
									<i
										className="fas fa-phone"
										aria-hidden="true"
									></i>{ ' ' }
									24/7 Hotline:{ ' ' }
									<strong>{ hotlineText }</strong>
								</p>
							</div>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}
