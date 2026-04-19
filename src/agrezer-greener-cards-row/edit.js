import { useStableBlockProps } from '@twork-builder/editor-utils';
import { useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'twork/image-link-card' ];
const TEMPLATE = [
	[
		'twork/image-link-card',
		{
			title: 'Organic Farm Solutions',
			linkText: 'Read More',
			linkUrl: '#',
			image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef385a?auto=format&fit=crop&w=900&q=80',
			alt: 'Organic farm solutions',
		},
	],
	[
		'twork/image-link-card',
		{
			title: 'The Eco-Friendly Farming',
			linkText: 'Read More',
			linkUrl: '#',
			image: 'https://images.unsplash.com/photo-1625246333195-f8989295e467?auto=format&fit=crop&w=900&q=80',
			alt: 'Eco-friendly farming',
		},
	],
	[
		'twork/image-link-card',
		{
			title: 'Organic Produce Supply',
			linkText: 'Read More',
			linkUrl: '#',
			image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
			alt: 'Organic produce supply',
		},
	],
];

export default function Edit() {
	const blockProps = useStableBlockProps(
		() => ( { className: 'twork-greener__cards twork-greener-cards-row-editor' } ),
		[]
	);
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );
	return <div { ...innerBlocksProps } />;
}
