import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title, count, href, imageUrl, imageAlt } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'product-categories__card',
	} );

	return (
		<a { ...blockProps } href={ href || '#' }>
			<div className="product-categories__text">
				{ title && (
					<RichText.Content
						tagName="h3"
						className="product-categories__name"
						value={ title }
					/>
				) }
				{ count && (
					<RichText.Content
						tagName="p"
						className="product-categories__count"
						value={ count }
					/>
				) }
				<span
					className="product-categories__arrow"
					aria-hidden="true"
				>
					→
				</span>
			</div>
			{ imageUrl && (
				<img
					className="product-categories__img"
					src={ imageUrl }
					alt={ imageAlt || '' }
					width="140"
					height="140"
					loading="lazy"
					decoding="async"
				/>
			) }
		</a>
	);
}
