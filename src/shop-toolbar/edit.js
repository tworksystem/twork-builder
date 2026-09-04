import { useStableBlockProps } from '@twork-builder/editor-utils';
export default function Edit( { attributes } ) {
	const { resultsText } = attributes;
	const blockProps = useStableBlockProps( { className: 'shop-toolbar' } );
	return (
		<div { ...blockProps } data-block="twork/shop-toolbar">
			<p>{ resultsText }</p>
		</div>
	);
}
