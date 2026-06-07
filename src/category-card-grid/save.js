import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		eyebrow,
		title,
		ctaLabel,
		ctaHref,
		showCtaCard,
		columns,
		padding,
		backgroundColor,
		containerMaxWidth,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'product-categories twork-category-card-grid',
		style: {
			backgroundColor: backgroundColor || '#ffffff',
			paddingTop: `${ padding }px`,
			paddingBottom: `${ padding }px`,
			'--category-columns': columns,
		},
		'data-block': 'twork/category-card-grid',
	} );

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: '0 1.25rem',
	};

	const gridStyle = {
		gridTemplateColumns: `repeat(${ columns || 3 }, 1fr)`,
	};

	return (
		<section { ...blockProps }>
			<div
				className="product-categories__inner l-section"
				style={ containerStyle }
			>
				{ ( eyebrow || title ) && (
					<header className="section-head">
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
								className="section-head__title"
								value={ title }
							/>
						) }
					</header>
				) }

				<div
					className="product-categories__grid"
					data-list="items"
					style={ gridStyle }
				>
					<InnerBlocks.Content />
					{ showCtaCard && ( ctaLabel || ctaHref ) && (
						<a
							className="product-categories__card product-categories__card--cta"
							href={ ctaHref || '#' }
						>
							<span>{ ctaLabel || 'See all products' }</span>
							<span
								className="product-categories__cta-arrow"
								aria-hidden="true"
							>
								→
							</span>
						</a>
					) }
				</div>
			</div>
		</section>
	);
}
