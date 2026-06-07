import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { eyebrow, title, prevLabel, nextLabel } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'testimonials twork-review-carousel',
	} );

	return (
		<section { ...blockProps }>
			<div className="testimonials__inner l-section">
				<header className="section-head section-head--row">
					<div>
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
					</div>
					<div
						className="carousel-dots testimonials__dots"
						data-review-dots=""
					/>
				</header>
				<div className="testimonials__stage">
					<button
						type="button"
						className="carousel-nav__btn"
						data-action="review-prev"
						aria-label={ prevLabel || 'Previous' }
					>
						‹
					</button>
					<div
						className="testimonials__track"
						data-review-track=""
						tabIndex={ 0 }
						role="list"
					>
						<InnerBlocks.Content />
					</div>
					<button
						type="button"
						className="carousel-nav__btn"
						data-action="review-next"
						aria-label={ nextLabel || 'Next' }
					>
						›
					</button>
				</div>
			</div>
		</section>
	);
}
