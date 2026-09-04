import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { itemId, eyebrow, title, subtitle, ctaLabel, ctaHref, imageUrl } =
		attributes;

	const blockProps = useBlockProps.save( {
		className: 'hero__slide',
		'data-carousel-slide': true,
		'data-item-id': itemId,
		'aria-hidden': 'true',
		style: imageUrl
			? {
					backgroundImage: `url(${ imageUrl })`,
					backgroundPosition: 'center right',
			  }
			: undefined,
	} );

	return (
		<article { ...blockProps }>
			<div className="hero__overlay">
				<div className="hero__inner l-section">
					<div className="hero__content">
						{ eyebrow && (
							<RichText.Content
								tagName="p"
								className="hero__eyebrow"
								value={ eyebrow }
							/>
						) }
						{ title && (
							<RichText.Content
								tagName="h1"
								className="hero__title"
								value={ title }
							/>
						) }
						{ subtitle && (
							<RichText.Content
								tagName="p"
								className="hero__subtitle"
								value={ subtitle }
							/>
						) }
						{ ctaLabel && (
							<a
								className="hero__cta btn btn--primary"
								href={ ctaHref || '#' }
							>
								{ ctaLabel }
								<span
									className="hero__cta-icon"
									aria-hidden="true"
								>
									{ ' ' }
									›
								</span>
							</a>
						) }
					</div>
				</div>
			</div>
		</article>
	);
}
