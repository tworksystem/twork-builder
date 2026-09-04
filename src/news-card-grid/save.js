import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { eyebrow, title } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'blog-news',
		'data-block': 'twork/news-card-grid',
		'data-version': '1',
	} );

	return (
		<section { ...blockProps } aria-label="Latest news">
			<div className="blog-news__inner l-section">
				<header className="section-head">
					{ eyebrow ? (
						<p className="section-head__eyebrow">{ eyebrow }</p>
					) : null }
					{ title ? (
						<h2 className="section-head__title">{ title }</h2>
					) : null }
				</header>
				<div className="blog-news__grid" data-list="posts">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
