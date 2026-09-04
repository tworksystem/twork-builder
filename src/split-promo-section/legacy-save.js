import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Pre-design-parity markup (no __inner; primary+dark CTAs).
 * @param root0
 * @param root0.attributes
 */
export default function legacySave( { attributes } ) {
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
		<section { ...blockProps } aria-label="Promo">
			<div className="l-section app-promo__grid">
				<div className="app-promo__visual">
					{ imageUrl && (
						<img
							src={ imageUrl }
							alt={ imageAlt || '' }
							loading="lazy"
						/>
					) }
				</div>
				<div className="app-promo__content">
					{ eyebrow && (
						<p className="section-head__eyebrow">{ eyebrow }</p>
					) }
					<RichText.Content
						tagName="h2"
						className="app-promo__title section-head__title"
						value={ title }
					/>
					<ul className="app-promo__features" data-list="features">
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
						{ primaryLabel && (
							<a
								className="btn btn--primary"
								href={ primaryHref || '#' }
							>
								{ primaryLabel }
							</a>
						) }
						{ secondaryLabel && (
							<a
								className="btn btn--dark"
								href={ secondaryHref || '#' }
							>
								{ secondaryLabel }
							</a>
						) }
					</div>
				</div>
			</div>
		</section>
	);
}
