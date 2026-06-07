import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		author,
		category,
		date,
		dateIso,
		title,
		excerpt,
		href,
		imageUrl,
		imageAlt,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'blog-news__card',
	} );

	return (
		<article { ...blockProps }>
			{ imageUrl && (
				<a className="blog-news__media" href={ href || '#' }>
					<img
						src={ imageUrl }
						alt={ imageAlt || '' }
						width="380"
						height="240"
						loading="lazy"
						decoding="async"
					/>
				</a>
			) }
			{ ( author || category || date ) && (
				<p className="blog-news__meta">
					By{ ' ' }
					{ author && (
						<span className="blog-news__author">{ author }</span>
					) }{ ' ' }
					in{ ' ' }
					{ category && <strong>{ category }</strong> } on{ ' ' }
					{ date && (
						<time dateTime={ dateIso || '' }>{ date }</time>
					) }
				</p>
			) }
			{ title && (
				<h3 className="blog-news__title">
					<a href={ href || '#' }>
						<RichText.Content tagName="span" value={ title } />
					</a>
				</h3>
			) }
			{ excerpt && (
				<RichText.Content
					tagName="p"
					className="blog-news__excerpt"
					value={ excerpt }
				/>
			) }
		</article>
	);
}
