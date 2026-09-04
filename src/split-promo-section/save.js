import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		eyebrow,
		title,
		features,
		primaryHref,
		primaryLabel,
		secondaryHref,
		secondaryLabel,
		imageUrl,
		imageAlt,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'app-promo',
		'data-block': 'twork/split-promo-section',
		'data-version': '1',
	} );

	return (
		<section { ...blockProps } aria-label="Orders and wholesale">
			<div className="app-promo__inner l-section">
				<div className="app-promo__grid">
					<div className="app-promo__visual">
						{ imageUrl ? (
							<img
								src={ imageUrl }
								alt={ imageAlt || '' }
								width="560"
								height="480"
								loading="lazy"
								decoding="async"
							/>
						) : null }
					</div>
					<div className="app-promo__content">
						{ eyebrow ? (
							<p className="section-head__eyebrow">{ eyebrow }</p>
						) : null }
						<RichText.Content
							tagName="h2"
							className="section-head__title app-promo__title"
							value={ title }
						/>
						<ul
							className="app-promo__features"
							data-list="features"
						>
							{ ( features || [] ).map( ( feature, i ) => (
								<li key={ i } className="app-promo__feature">
									<span
										className="app-promo__check"
										aria-hidden="true"
									>
										✓
									</span>
									{ feature }
								</li>
							) ) }
						</ul>
						<div className="app-promo__stores">
							{ primaryLabel ? (
								<a
									className="app-promo__store btn btn--dark"
									href={ primaryHref || '#' }
								>
									{ primaryLabel }
								</a>
							) : null }
							{ secondaryLabel ? (
								<a
									className="app-promo__store btn btn--dark"
									href={ secondaryHref || '#' }
								>
									{ secondaryLabel }
								</a>
							) : null }
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
