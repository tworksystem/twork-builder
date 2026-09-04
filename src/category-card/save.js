import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { itemId, title, count, href, imageUrl, imageAlt } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'product-categories__card',
		'data-item-id': itemId || undefined,
		href: href || '#',
	} );

	return (
		<a { ...blockProps }>
			<div className="product-categories__text">
				<RichText.Content
					tagName="h3"
					className="product-categories__name"
					value={ title }
				/>
				{ count ? (
					<p className="product-categories__count">{ count }</p>
				) : null }
				<span className="product-categories__arrow" aria-hidden="true">
					→
				</span>
			</div>
			{ imageUrl ? (
				<img
					className="product-categories__img"
					src={ imageUrl }
					alt={ imageAlt || '' }
					width="140"
					height="140"
					loading="lazy"
					decoding="async"
				/>
			) : null }
		</a>
	);
}
