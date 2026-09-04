import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Pre-design-parity markup (no __inner; section-cta button).
 * @param root0
 * @param root0.attributes
 */
export default function legacySave( { attributes } ) {
	const { eyebrow, title, ctaLabel, ctaHref } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'product-categories',
		'data-block': 'twork/category-card-grid',
		'data-version': '1',
	} );

	return (
		<section { ...blockProps }>
			<div className="l-section">
				{ eyebrow && (
					<header className="section-head">
						<p className="section-head__eyebrow">{ eyebrow }</p>
						{ title && (
							<h2 className="section-head__title">{ title }</h2>
						) }
					</header>
				) }
				{ ! eyebrow && title && (
					<header className="section-head">
						<h2 className="section-head__title">{ title }</h2>
					</header>
				) }
				<div className="product-categories__grid" data-list="items">
					<InnerBlocks.Content />
				</div>
				{ ctaLabel && (
					<p className="section-cta">
						<a className="btn btn--primary" href={ ctaHref || '#' }>
							{ ctaLabel }
						</a>
					</p>
				) }
			</div>
		</section>
	);
}
