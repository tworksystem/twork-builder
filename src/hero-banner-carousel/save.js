import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { autoplayMs, paddingTop, paddingBottom } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-hero-banner-carousel',
		style: {
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
		},
		'data-autoplay-ms': String( autoplayMs ?? 7000 ),
	} );

	return (
		<section { ...blockProps }>
			<div
				className="twork-hero-banner-carousel__wrap"
				role="region"
				aria-roledescription="carousel"
				aria-label="Hero"
			>
				<div
					className="twork-hero-banner-carousel__track"
					data-list="slides"
				>
					<InnerBlocks.Content />
				</div>
				<button
					type="button"
					className="twork-hero-banner-carousel__arrow twork-hero-banner-carousel__arrow--prev"
					data-action="carousel-prev"
					aria-label="Previous slide"
				>
					‹
				</button>
				<button
					type="button"
					className="twork-hero-banner-carousel__arrow twork-hero-banner-carousel__arrow--next"
					data-action="carousel-next"
					aria-label="Next slide"
				>
					›
				</button>
				<div
					className="twork-hero-banner-carousel__dots carousel-dots"
					role="tablist"
					data-carousel-dots=""
				/>
			</div>
		</section>
	);
}
