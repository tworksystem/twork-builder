import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		eyebrow,
		title,
		features,
		primaryCtaHref,
		primaryCtaLabel,
		secondaryCtaHref,
		secondaryCtaLabel,
		imageUrl,
		imageAlt,
		backgroundColor,
		padding,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-split-promo-section app-promo',
		style: {
			backgroundColor: backgroundColor || '#f7fcff',
			paddingBlock: `${ padding }px`,
		},
		'data-block': 'app-promo',
	} );

	return (
		<section { ...blockProps }>
			<div className="app-promo__inner l-section">
				<div className="app-promo__grid">
					{ imageUrl && (
						<div className="app-promo__visual">
							<img
								src={ imageUrl }
								alt={ imageAlt || '' }
								width="560"
								height="480"
								loading="lazy"
								decoding="async"
							/>
						</div>
					) }
					<div className="app-promo__content">
						{ eyebrow && (
							<RichText.Content
								tagName="p"
								className="section-head__eyebrow"
								value={ eyebrow }
							/>
						) }
						{ title && (
							<RichText.Content
								tagName="h2"
								className="section-head__title app-promo__title"
								value={ title }
							/>
						) }
						{ ( features || [] ).length > 0 && (
							<ul className="app-promo__features">
								{ ( features || [] ).map( ( feature, index ) =>
									feature ? (
										<li
											key={ index }
											className="app-promo__feature"
										>
											<span
												className="app-promo__check"
												aria-hidden="true"
											>
												✓
											</span>
											{ feature }
										</li>
									) : null
								) }
							</ul>
						) }
						<div className="app-promo__stores">
							{ primaryCtaLabel && (
								<a
									className="app-promo__store btn btn--dark"
									href={ primaryCtaHref || '#' }
								>
									{ primaryCtaLabel }
								</a>
							) }
							{ secondaryCtaLabel && (
								<a
									className="app-promo__store btn btn--dark"
									href={ secondaryCtaHref || '#' }
								>
									{ secondaryCtaLabel }
								</a>
							) }
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
