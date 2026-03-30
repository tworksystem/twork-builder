import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'twork/agrezer-greener-stat-item' ];
const TEMPLATE = [
	[
		'twork/agrezer-greener-stat-item',
		{
			iconVariant: 'growth',
			title: '80% Pure Growth',
			description:
				'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		},
	],

	[
		'twork/agrezer-greener-stat-item',
		{
			iconVariant: 'organic',
			title: '95% Organic Roots',
			description:
				'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
		},
	],
];

export default function Edit() {
	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'agrezer-greener__stats twork-agrezer-greener-stats-row-editor',
		} ),
		[]
	);

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
			/>
		</div>
	);
}
