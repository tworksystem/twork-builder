import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'twork/agrezer-about-feature-item' ];
const TEMPLATE = [
	[
		'twork/agrezer-about-feature-item',
		{
			title: 'Farm Development',
			description:
				'Lorem Ipsum is simply dummy text of the printing industry.',
			iconVariant: 'growth',
		},
	],

	[
		'twork/agrezer-about-feature-item',
		{
			title: 'Crop Management',
			description:
				'Lorem Ipsum is simply dummy text of the printing industry.',
			iconVariant: 'barn',
		},
	],

	[
		'twork/agrezer-about-feature-item',
		{
			title: 'Soil Restoration',
			description:
				'Lorem Ipsum is simply dummy text of the printing industry.',
			iconVariant: 'soil',
		},
	],

	[
		'twork/agrezer-about-feature-item',
		{
			title: 'Organic Cultivation',
			description:
				'Lorem Ipsum is simply dummy text of the printing industry.',
			iconVariant: 'organic',
		},
	],
];

export default function Edit() {
	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'agrezer-about__features-grid twork-agrezer-about-features-grid-editor',
		} ),
		[]
	);

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
				templateLock={ false }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
			/>
		</div>
	);
}
