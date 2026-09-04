import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		author,
		category,
		date,
		dateIso,
		title,
		imageUrl,
		imageAlt,
		paragraphs,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'blog-article',
		'data-block': 'twork/blog-article-section',
		'data-version': '1',
	} );

	return (
		<article { ...blockProps }>
			<div className="blog-article__inner l-section">
				<header className="blog-article__header">
					<p className="blog-article__meta">
						By <span>{ author }</span>
						{ category && (
							<>
								{ ' ' }
								in <strong>{ category }</strong>
							</>
						) }
						{ date && (
							<>
								{ ' ' }
								on{ ' ' }
								<time dateTime={ dateIso || '' }>{ date }</time>
							</>
						) }
					</p>
					{ title && (
						<RichText.Content
							tagName="h1"
							className="blog-article__title"
							value={ title }
						/>
					) }
				</header>
				{ imageUrl && (
					<img
						className="blog-article__image"
						src={ imageUrl }
						alt={ imageAlt || '' }
						width="800"
						height="450"
						loading="eager"
						decoding="async"
					/>
				) }
				<div className="blog-article__body">
					{ ( paragraphs || [] ).map( ( p, i ) => (
						<p key={ i } className="blog-article__para">
							{ p }
						</p>
					) ) }
				</div>
			</div>
		</article>
	);
}
