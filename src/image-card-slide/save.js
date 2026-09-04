import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { itemId, title, ctaLabel, href, imageUrl, imageAlt } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'services-carousel__card',
		'data-carousel-slide': true,
		'data-item-id': itemId || undefined,
		'aria-hidden': 'true',
	} );

	return (
		<article { ...blockProps }>
			<div className="services-carousel__media">
				{ imageUrl ? (
					<img
						src={ imageUrl }
						alt={ imageAlt || '' }
						width="380"
						height="280"
						loading="lazy"
						decoding="async"
					/>
				) : null }
			</div>
			<div className="services-carousel__box">
				<RichText.Content
					tagName="h3"
					className="services-carousel__card-title"
					value={ title }
				/>
				{ ctaLabel ? (
					<a className="services-carousel__link" href={ href || '#' }>
						{ ctaLabel }
					</a>
				) : null }
			</div>
		</article>
	);
}
