import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { itemId, name, imageUrl, imageAlt } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'partners__logo-cell',
		'data-item-id': itemId || undefined,
	} );

	if ( imageUrl ) {
		return (
			<div { ...blockProps }>
				<img
					className="partners__logo-img"
					src={ imageUrl }
					alt={
						imageAlt || ( name ? `${ name } — Shwe Myanmar` : '' )
					}
					width="120"
					height="48"
					loading="lazy"
					decoding="async"
				/>
				{ name ? (
					<span className="partners__logo-name">{ name }</span>
				) : null }
			</div>
		);
	}

	return (
		<div { ...blockProps }>
			{ name ? (
				<span className="partners__logo-text">{ name }</span>
			) : null }
		</div>
	);
}
