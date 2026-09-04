import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { autoplayMs } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'hero',
		'data-block': 'twork/hero-banner-carousel',
		'data-version': '1',
	} );

	return (
		<section { ...blockProps } aria-label="Hero">
			<div
				className="hero__wrap"
				role="region"
				aria-roledescription="carousel"
				data-brand-carousel="1"
				data-autoplay-ms={ autoplayMs }
			>
				<div className="hero__track" data-list="slides">
					<InnerBlocks.Content />
				</div>
				<button
					type="button"
					className="hero__arrow hero__arrow--prev"
					data-action="carousel-prev"
					aria-label="Previous slide"
				>
					‹
				</button>
				<button
					type="button"
					className="hero__arrow hero__arrow--next"
					data-action="carousel-next"
					aria-label="Next slide"
				>
					›
				</button>
				<div className="hero__dots carousel-dots" role="tablist" />
			</div>
		</section>
	);
}
