import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
	'twork/agrezer-stats-cta',
	'twork/agrezer-stats-card',
];

export default function Edit() {
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'agrezer-stats__col twork-agrezer-stats-column-editor',
		} ),
		[]
	);

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
			/>
		</div>
	);
}
