import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { posts } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'blog-list',
		'data-block': 'twork/blog-list-section',
		'data-version': '1',
	} );

	return (
		<section { ...blockProps } aria-label="Blog posts">
			<div className="blog-list__inner l-section">
				<div className="blog-list__grid" data-list="posts">
					{ ( posts || [] ).map( ( post ) => (
						<article
							key={ post.id }
							className="blog-list__card"
							data-item-id={ post.id }
						>
							{ post.imageUrl && (
								<a
									className="blog-list__media"
									href={ post.href || '#' }
								>
									<img
										src={ post.imageUrl }
										alt={ post.imageAlt || '' }
										width="380"
										height="240"
										loading="lazy"
										decoding="async"
									/>
								</a>
							) }
							<p className="blog-list__meta">
								By{ ' ' }
								<span className="blog-list__author">
									{ post.author }
								</span>
								{ post.category && (
									<>
										{ ' ' }
										in <strong>{ post.category }</strong>
									</>
								) }
								{ post.date && (
									<>
										{ ' ' }
										on{ ' ' }
										<time dateTime={ post.dateIso || '' }>
											{ post.date }
										</time>
									</>
								) }
							</p>
							<h2 className="blog-list__title">
								<a href={ post.href || '#' }>{ post.title }</a>
							</h2>
							{ post.excerpt && (
								<p className="blog-list__excerpt">
									{ post.excerpt }
								</p>
							) }
							<a
								className="blog-list__read-more"
								href={ post.href || '#' }
							>
								Read more →
							</a>
						</article>
					) ) }
				</div>
			</div>
		</section>
	);
}
