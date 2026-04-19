import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'twork/feature-item' ];
const TEMPLATE = [
	[
		'twork/feature-item',
		{
			title: 'Farm Development',
			description:
				'Lorem Ipsum is simply dummy text of the printing industry.',
			iconVariant: 'growth',
		},
	],

	[
		'twork/feature-item',
		{
			title: 'Crop Management',
			description:
				'Lorem Ipsum is simply dummy text of the printing industry.',
			iconVariant: 'barn',
		},
	],

	[
		'twork/feature-item',
		{
			title: 'Soil Restoration',
			description:
				'Lorem Ipsum is simply dummy text of the printing industry.',
			iconVariant: 'soil',
		},
	],

	[
		'twork/feature-item',
		{
			title: 'Organic Cultivation',
			description:
				'Lorem Ipsum is simply dummy text of the printing industry.',
			iconVariant: 'organic',
		},
	],
];

export default function Edit() {
	const blockProps = useBlockProps( {
		className:
			'twork-about__features-grid twork-about-features-grid-editor',
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		templateLock: false,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return <div { ...innerBlocksProps } />;
}
