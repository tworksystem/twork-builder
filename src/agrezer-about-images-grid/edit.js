import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'twork/image-card' ];
const TEMPLATE = [
	[
		'twork/image-card',
		{
			variant: 'simple',
			image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1400&q=80',
			alt: 'Tractor in field',
		},
	],

	[
		'twork/image-card',
		{
			variant: 'overlay',
			image: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&w=1400&q=80',
			alt: 'Farmer in corn field',
			overlayText:
				'Agriculture nurtures life through organic growth, sustainable farming.',
			overlayButtonText: 'About Us',
			overlayButtonUrl: '#',
		},
	],
];

export default function Edit() {
	const blockProps = useBlockProps( {
		className:
			'twork-about__images-grid twork-about-images-grid-editor',
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		templateLock: false,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return <div { ...innerBlocksProps } />;
}
