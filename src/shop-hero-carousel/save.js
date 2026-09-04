import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { slides, autoplayMs } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'shop-hero',
		'data-block': 'twork/shop-hero-carousel',
		'data-version': '1',
	} );

	return (
		<section { ...blockProps } aria-label="Shop promotions">
			<div
				className="shop-hero__wrap"
				data-brand-carousel="1"
				data-autoplay-ms={ autoplayMs }
				role="region"
				aria-roledescription="carousel"
			>
				<div className="shop-hero__track" data-list="slides">
					{ ( slides || [] ).map( ( slide, index ) => (
						<article
							key={ slide.id || index }
							className={ `shop-hero__slide${
								index === 0 ? ' is-active' : ''
							}` }
							data-carousel-slide
							data-item-id={ slide.id }
							aria-hidden={ index === 0 ? 'false' : 'true' }
							style={
								slide.imageUrl
									? {
											backgroundImage: `url(${ slide.imageUrl })`,
									  }
									: undefined
							}
						>
							<div className="shop-hero__overlay">
								<div className="shop-hero__content shop-header__container">
									{ slide.eyebrow && (
										<p className="shop-hero__eyebrow">
											{ slide.eyebrow }
										</p>
									) }
									{ index === 0 ? (
										<h1 className="shop-hero__title">
											{ slide.title }
										</h1>
									) : (
										<p className="shop-hero__title shop-hero__title--duplicate">
											{ slide.title }
										</p>
									) }
									{ slide.highlight && (
										<p className="shop-hero__highlight">
											{ slide.highlight }
										</p>
									) }
									{ slide.subtitle && (
										<p className="shop-hero__subtitle">
											{ slide.subtitle }
										</p>
									) }
									{ slide.ctaLabel && (
										<a
											className="shop-hero__cta"
											href={ slide.ctaHref || '#' }
										>
											{ slide.ctaLabel }
										</a>
									) }
								</div>
							</div>
						</article>
					) ) }
				</div>
				<button
					type="button"
					className="shop-hero__arrow shop-hero__arrow--prev"
					data-action="carousel-prev"
					aria-label="Previous"
				>
					‹
				</button>
				<button
					type="button"
					className="shop-hero__arrow shop-hero__arrow--next"
					data-action="carousel-next"
					aria-label="Next"
				>
					›
				</button>
				<div className="shop-hero__dots carousel-dots" role="tablist" />
			</div>
		</section>
	);
}
