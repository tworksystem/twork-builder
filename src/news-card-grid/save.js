import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { eyebrow, title } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'blog-news twork-news-card-grid',
	} );

	return (
		<section { ...blockProps }>
			<div className="blog-news__inner l-section">
				<header className="section-head">
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
				</header>
				<div className="blog-news__grid">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
