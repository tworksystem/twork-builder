import { useStableBlockProps } from '@twork-builder/editor-utils';
export default function Edit() {
	return (
		<div { ...useStableBlockProps( { className: 'product-detail' } ) }>
			<p>
				Single product detail (current product on single-product
				template).
			</p>
		</div>
	);
}
