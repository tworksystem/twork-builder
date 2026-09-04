import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { eyebrow, title, ctaLabel, ctaHref } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'product-categories',
		'data-block': 'twork/category-card-grid',
		'data-version': '1',
	} );

	return (
		<section { ...blockProps } aria-label="Product categories">
			<div className="product-categories__inner l-section">
				<header className="section-head">
					{ eyebrow ? (
						<p className="section-head__eyebrow">{ eyebrow }</p>
					) : null }
					{ title ? (
						<h2 className="section-head__title">{ title }</h2>
					) : null }
				</header>
				<div className="product-categories__grid" data-list="items">
					<InnerBlocks.Content />
					{ ctaLabel ? (
						<a
							className="product-categories__card product-categories__card--cta"
							href={ ctaHref || '/shop/' }
						>
							<span>{ ctaLabel }</span>
							<span
								className="product-categories__cta-arrow"
								aria-hidden="true"
							>
								→
							</span>
						</a>
					) : null }
				</div>
			</div>
		</section>
	);
}
