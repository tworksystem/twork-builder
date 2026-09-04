import { useStableBlockProps } from '@twork-builder/editor-utils';
export default function Edit() {
	const blockProps = useStableBlockProps( {
		className: 'back-to-top back-to-top--editor',
	} );
	return (
		<div { ...blockProps } aria-hidden="true">
			↑
		</div>
	);
}
