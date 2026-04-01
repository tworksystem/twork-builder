import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

export default function save( { attributes } ) {
	const {
		title,
		anchor,
		backgroundImage,
		backgroundPosition,
		overlayColor,
		graphicImage,
		graphicAlt,
		graphicMaxWidth,
		breadcrumbs,
		separatorChar,
		containerMaxWidth,
		containerWidthPct,
		paddingTop,
		paddingBottom,
		containerMinHeight,
		enableTractorAnimation,
		fallbackBgColor,
	} = attributes;

	const crumbs =
		Array.isArray( breadcrumbs ) && breadcrumbs.length ? breadcrumbs : [];

	const blockProps = useBlockProps.save( {
		className: 'agrezer-page-header twork-agrezer-page-header-section',
		style: {
			backgroundColor: fallbackBgColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--agrezer-page-header-overlay': overlayColor,
			'--agrezer-page-header-max': `${ containerMaxWidth }px`,
			'--agrezer-page-header-width-pct': `${ containerWidthPct }%`,
			'--agrezer-page-header-min-h': `${ containerMinHeight }px`,
		},
		'data-tractor-anim': enableTractorAnimation ? 'true' : 'false',
	} );

	const titleId = anchor ? `${ anchor }-title` : undefined;

	return (
		<section { ...blockProps } aria-labelledby={ titleId || undefined }>
			<div
				className="agrezer-page-header__bg"
				style={
					backgroundImage
						? {
								backgroundImage: `url(${ backgroundImage })`,
								backgroundPosition,
						  }
						: undefined
				}
				aria-hidden="true"
			/>

			<div className="agrezer-page-header__container">
				<div className="agrezer-page-header__content">
					<RichText.Content
						tagName="h1"
						id={ titleId }
						className="agrezer-page-header__title"
						value={ title }
					/>

					{ crumbs.length > 0 && (
						<nav
							className="agrezer-page-header__breadcrumb-nav"
							aria-label="Breadcrumb"
						>
							<ul className="agrezer-page-header__breadcrumb">
								{ crumbs.map( ( crumb, index ) => {
									const label = crumb?.label ?? '';
									const url = crumb?.url ?? '';
									const isCurrent =
										String( url ).trim() === '';

									return (
										<Fragment key={ index }>
											{ index > 0 && (
												<li
													className="separator"
													aria-hidden="true"
												>
													{ separatorChar || '•' }
												</li>
											) }
											<li
												className={
													isCurrent
														? 'active'
														: undefined
												}
												{ ...( isCurrent
													? { 'aria-current': 'page' }
													: {} ) }
											>
												{ ! isCurrent ? (
													<a href={ url }>
														{ label }
													</a>
												) : (
													label
												) }
											</li>
										</Fragment>
									);
								} ) }
							</ul>
						</nav>
					) }
				</div>

				{ graphicImage && (
					<div
						className="agrezer-page-header__graphic"
						aria-hidden="true"
					>
						<img
							src={ graphicImage }
							alt={ graphicAlt || '' }
							className="agrezer-page-header__img"
							style={ { maxWidth: `${ graphicMaxWidth }px` } }
							loading="lazy"
							decoding="async"
						/>
					</div>
				) }
			</div>
		</section>
	);
}
