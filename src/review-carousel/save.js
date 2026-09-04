import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { eyebrow, title } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'testimonials',
		'data-block': 'twork/review-carousel',
		'data-version': '1',
		'data-testimonials': '1',
	} );

	return (
		<section { ...blockProps } aria-label="Testimonials">
			<div className="testimonials__inner l-section">
				<header className="section-head section-head--row">
					<div>
						{ eyebrow ? (
							<p className="section-head__eyebrow">{ eyebrow }</p>
						) : null }
						{ title ? (
							<h2 className="section-head__title">{ title }</h2>
						) : null }
					</div>
					<div
						className="carousel-dots testimonials__dots"
						data-testimonials-dots
					/>
				</header>
				<div className="testimonials__stage">
					<button
						type="button"
						className="carousel-nav__btn"
						data-action="testimonials-prev"
						aria-label="Previous"
					>
						‹
					</button>
					<div
						className="testimonials__track"
						data-list="items"
						data-testimonials-track
						tabIndex={ 0 }
					>
						<InnerBlocks.Content />
					</div>
					<button
						type="button"
						className="carousel-nav__btn"
						data-action="testimonials-next"
						aria-label="Next"
					>
						›
					</button>
				</div>
			</div>
		</section>
	);
}
