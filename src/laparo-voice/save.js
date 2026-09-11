import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { showItem, quote, name, context, imageUrl, imageAlt } = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'lp-vc-quote',
	} );

	return (
		<div { ...blockProps }>
			<span className="lp-vc-mark" aria-hidden="true">
				“
			</span>
			<RichText.Content tagName="blockquote" value={ quote } />
			<div className="lp-vc-who">
				{ imageUrl && (
					<img
						src={ imageUrl }
						alt={ imageAlt || '' }
						loading="lazy"
						decoding="async"
					/>
				) }
				<div>
					<RichText.Content tagName="strong" value={ name } />
					<RichText.Content tagName="span" value={ context } />
				</div>
			</div>
		</div>
	);
}
