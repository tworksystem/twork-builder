import { useStableBlockProps } from '@twork-builder/editor-utils';
import { useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
	'twork/cta-block',
	'twork/stat-card',
];

export default function Edit() {
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-stats__col twork-stats-column-editor',
		} ),
		[]
	);

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return <div { ...innerBlocksProps } />;
}
