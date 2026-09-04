import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		showItem,
		showStars,
		starCount,
		showQuote,
		quote,
		showAuthorImage,
		authorImageUrl,
		authorImageAlt,
		showAuthorName,
		authorName,
		showAuthorDetail,
		authorDetail,
	} = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'quote mk-endo-testimonial-item',
	} );

	const stars = Math.max( 0, Math.min( 5, starCount || 0 ) );

	return (
		<figure { ...blockProps }>
			{ showStars !== false && stars > 0 && (
				<span className="stars" aria-hidden="true">
					{ Array.from( { length: stars } ).map( ( _, i ) => (
						<i
							key={ `star-${ i }` }
							className="fas fa-star"
							aria-hidden="true"
						/>
					) ) }
				</span>
			) }
			{ showQuote !== false && quote && (
				<RichText.Content tagName="p" value={ quote } />
			) }
			<div className="quote-by">
				{ showAuthorImage !== false && authorImageUrl && (
					<img
						src={ authorImageUrl }
						alt={ authorImageAlt || '' }
						loading="lazy"
					/>
				) }
				<div>
					{ showAuthorName !== false && authorName && (
						<RichText.Content
							tagName="strong"
							value={ authorName }
						/>
					) }
					{ showAuthorDetail !== false && authorDetail && (
						<RichText.Content
							tagName="span"
							value={ authorDetail }
						/>
					) }
				</div>
			</div>
		</figure>
	);
}
