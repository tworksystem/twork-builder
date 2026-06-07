import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { name, imageUrl, imageAlt } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'partners__logo-cell',
	} );

	if ( imageUrl ) {
		return (
			<div { ...blockProps }>
				<img
					className="partners__logo-img"
					src={ imageUrl }
					alt={ imageAlt || name || '' }
					width="120"
					height="48"
					loading="lazy"
					decoding="async"
				/>
				{ name && (
					<RichText.Content
						tagName="span"
						className="partners__logo-name"
						value={ name }
					/>
				) }
			</div>
		);
	}

	return (
		<div { ...blockProps }>
			{ name && (
				<RichText.Content
					tagName="span"
					className="partners__logo-text"
					value={ name }
				/>
			) }
		</div>
	);
}
