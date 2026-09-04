import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		brandName,
		logoUrl,
		homeUrl,
		searchPlaceholder,
		language,
		currency,
		cartTotal,
		recentLabel,
		utilityLinks,
		categories,
		menuItems,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'shop-header',
		'data-block': 'twork/shop-header',
		'data-version': '1',
	} );

	return (
		<header { ...blockProps }>
			<div className="shop-header__utility">
				<div className="shop-header__utility-inner l-section shop-header__container">
					<nav
						className="shop-header__utility-nav"
						aria-label="Utility"
					>
						{ ( utilityLinks || [] ).map( ( link ) => (
							<a
								key={ link.id }
								href={ link.href || '#' }
								data-item-id={ link.id }
							>
								{ link.label }
							</a>
						) ) }
						<button type="button" className="shop-header__lang">
							{ language }
						</button>
						<button type="button" className="shop-header__currency">
							{ currency }
						</button>
					</nav>
				</div>
			</div>
			<div className="shop-header__main">
				<div className="shop-header__main-inner l-section shop-header__container">
					<a
						className="shop-header__brand"
						href={ homeUrl || '/' }
						aria-label={ `${ brandName } home` }
					>
						{ logoUrl ? (
							<img
								className="shop-header__brand-logo"
								src={ logoUrl }
								alt={ brandName }
								loading="eager"
							/>
						) : (
							<span className="shop-header__brand-text">
								{ brandName }
							</span>
						) }
					</a>
					<form
						className="shop-header__search"
						role="search"
						method="get"
						action="/"
					>
						<select
							className="shop-header__search-cat"
							name="product_cat"
							aria-label="Category"
						>
							{ ( categories || [] ).map( ( cat ) => (
								<option key={ cat.id } value={ cat.id }>
									{ cat.label }
								</option>
							) ) }
						</select>
						<input
							className="shop-header__search-input"
							type="search"
							name="s"
							placeholder={ searchPlaceholder }
						/>
						<input type="hidden" name="post_type" value="product" />
						<button
							type="submit"
							className="shop-header__search-btn"
							aria-label="Search"
						>
							Search
						</button>
					</form>
					<a className="shop-header__cart" href="/cart">
						<span
							className="shop-header__cart-total"
							data-field="cartTotal"
						>
							{ cartTotal }
						</span>
					</a>
					<button
						type="button"
						className="shop-header__menu-toggle"
						data-action="shop-menu-toggle"
						aria-expanded="false"
						aria-controls="shop-header-nav"
					>
						<span
							className="shop-header__toggle-bar"
							aria-hidden="true"
						/>
					</button>
				</div>
			</div>
			<div className="shop-header__nav-bar">
				<div className="shop-header__nav-inner l-section shop-header__container">
					<button
						type="button"
						className="shop-header__browse"
						data-action="browse-toggle"
						aria-expanded="false"
					>
						Browse Categories
					</button>
					<nav
						id="shop-header-nav"
						className="shop-header__nav"
						aria-label="Main"
						data-list="menuItems"
					>
						{ ( menuItems || [] ).map( ( item ) => (
							<a
								key={ item.id }
								className="shop-header__nav-link"
								href={ item.href || '#' }
								data-item-id={ item.id }
							>
								{ item.label }
							</a>
						) ) }
					</nav>
					<a className="shop-header__recent" href="#">
						{ recentLabel }
					</a>
				</div>
			</div>
		</header>
	);
}
