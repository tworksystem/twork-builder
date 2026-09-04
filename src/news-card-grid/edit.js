import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/news-card' ];
const TEMPLATE = [
	[
		'twork/news-card',
		{
			itemId: 'post_1',
			author: 'Shwe Myanmar',
			category: 'Product',
			date: 'March 15, 2026',
			dateIso: '2026-03-15',
			title: 'Introducing Our 10 Viss Bulk Pack',
			excerpt:
				'Our flagship 10 Viss (≈ 16.33 kg) butter pack is now available for wholesale and commercial customers across Myanmar.',
			href: '/blog/',
		},
	],
	[
		'twork/news-card',
		{
			itemId: 'post_2',
			author: 'Shwe Myanmar',
			category: 'Quality',
			date: 'February 28, 2026',
			dateIso: '2026-02-28',
			title: 'How We Maintain Natural Taste',
			excerpt:
				'Learn about our quality control process that ensures every pack of Shwe Myanmar butter delivers natural scent and natural taste.',
			href: '/blog/',
		},
	],
	[
		'twork/news-card',
		{
			itemId: 'post_3',
			author: 'Shwe Myanmar',
			category: 'News',
			date: 'January 10, 2026',
			dateIso: '2026-01-10',
			title: 'Mandalay Production Facility Update',
			excerpt:
				'Shwe Myanmar Foodstuff Industry continues to invest in our Mandalay facility to meet growing demand for premium butter and ghee.',
			href: '/blog/',
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { eyebrow, title } = attributes;
	const blockProps = useStableBlockProps( {
		className: 'blog-news',
	} );
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'blog-news__grid', 'data-list': 'posts' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Section', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Eyebrow', 'twork-builder' ) }
						value={ eyebrow }
						onChange={ ( v ) => setAttributes( { eyebrow: v } ) }
					/>
					<TextControl
						label={ __( 'Title', 'twork-builder' ) }
						value={ title }
						onChange={ ( v ) => setAttributes( { title: v } ) }
					/>
				</PanelBody>
			</InspectorControls>
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
					<div { ...innerBlocksProps } />
				</div>
			</section>
		</>
	);
}
