import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		itemId,
		title,
		excerpt,
		author,
		category,
		date,
		dateIso,
		href,
		imageUrl,
		imageAlt,
	} = attributes;
	const blockProps = useBlockProps.save( {
		className: 'blog-news__card',
		'data-item-id': itemId || undefined,
	} );
	const link = href || '#';

	return (
		<article { ...blockProps }>
			<a className="blog-news__media" href={ link }>
				{ imageUrl ? (
					<img
						src={ imageUrl }
						alt={ imageAlt || '' }
						width="380"
						height="240"
						loading="lazy"
						decoding="async"
					/>
				) : null }
			</a>
			{ author || category || date ? (
				<p className="blog-news__meta">
					{ author ? (
						<>
							{ 'By ' }
							<span className="blog-news__author">
								{ author }
							</span>
						</>
					) : null }
					{ category ? (
						<>
							{ ' in ' }
							<strong>{ category }</strong>
						</>
					) : null }
					{ date ? (
						<>
							{ ' on ' }
							<time dateTime={ dateIso || undefined }>
								{ date }
							</time>
						</>
					) : null }
				</p>
			) : null }
			<h3 className="blog-news__title">
				<a href={ link }>{ title }</a>
			</h3>
			{ excerpt ? (
				<p className="blog-news__excerpt">{ excerpt }</p>
			) : null }
		</article>
	);
}
