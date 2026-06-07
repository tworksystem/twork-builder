import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'twork/news-card' ];
const TEMPLATE = [
	[
		'twork/news-card',
		{
			author: 'Shwe Myanmar',
			category: 'Product',
			date: 'March 15, 2026',
			dateIso: '2026-03-15',
			title: 'Introducing Our 10 Viss Bulk Pack',
			excerpt:
				'Our flagship 10 Viss (≈ 16.33 kg) butter pack is now available for wholesale and commercial customers across Myanmar.',
			href: '/pages/blog-single.html?id=post_1',
			imageUrl:
				'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&q=80',
			imageAlt: '10 Viss Shwe Myanmar butter pack',
		},
	],
	[
		'twork/news-card',
		{
			author: 'Shwe Myanmar',
			category: 'Quality',
			date: 'February 28, 2026',
			dateIso: '2026-02-28',
			title: 'How We Maintain Natural Taste',
			excerpt:
				'Learn about our quality control process that ensures every pack of Shwe Myanmar butter delivers natural scent and natural taste.',
			href: '/pages/blog-single.html?id=post_2',
			imageUrl:
				'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop&q=80',
			imageAlt: 'Quality control at Shwe Myanmar',
		},
	],
	[
		'twork/news-card',
		{
			author: 'Shwe Myanmar',
			category: 'News',
			date: 'January 10, 2026',
			dateIso: '2026-01-10',
			title: 'Mandalay Production Facility Update',
			excerpt:
				'Shwe Myanmar Foodstuff Industry continues to invest in our Mandalay facility to meet growing demand for premium butter and ghee.',
			href: '/pages/blog-single.html?id=post_3',
			imageUrl:
				'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop&q=80',
			imageAlt: 'Mandalay production facility',
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { eyebrow, title } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'blog-news twork-news-card-grid twork-news-card-grid-editor',
		} ),
		[]
	);

	return (
		<section { ...blockProps }>
			<div className="blog-news__inner l-section">
				<header className="section-head">
					<RichText
						tagName="p"
						className="section-head__eyebrow"
						value={ eyebrow }
						onChange={ ( val ) => setAttributes( { eyebrow: val } ) }
						placeholder={ __( 'NEWS & UPDATES', 'twork-builder' ) }
					/>
					<RichText
						tagName="h2"
						className="section-head__title"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __(
							'Latest From Shwe Myanmar.',
							'twork-builder'
						) }
					/>
				</header>
				<div className="blog-news__grid">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock={ false }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</div>
			</div>
		</section>
	);
}
