import { useStableBlockProps } from '@twork-builder/editor-utils';
export default function Edit() {
	return (
		<div { ...useStableBlockProps( { className: 'product-grid' } ) }>
			<p>WooCommerce product grid renders on frontend.</p>
		</div>
	);
}
