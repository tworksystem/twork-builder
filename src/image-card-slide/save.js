import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title, ctaLabel, href, imageUrl, imageAlt } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'image-card-carousel__card',
		'data-carousel-slide': true,
	} );

	return (
		<article { ...blockProps }>
			<div className="image-card-carousel__media">
				{ imageUrl && (
					<img
						src={ imageUrl }
						alt={ imageAlt || '' }
						width="380"
						height="280"
						loading="lazy"
						decoding="async"
					/>
				) }
			</div>
			<div className="image-card-carousel__box">
				{ title && (
					<RichText.Content
						tagName="h3"
						className="image-card-carousel__card-title"
						value={ title }
					/>
				) }
				{ ( ctaLabel || href ) && (
					<a
						className="image-card-carousel__link"
						href={ href || '#' }
					>
						{ ctaLabel || 'Learn more' }
					</a>
				) }
			</div>
		</article>
	);
}
