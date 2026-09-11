import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { showItem, label, title, body, imageUrl, imageAlt } = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'lp-tech-item',
		'data-label': label || '',
	} );

	return (
		<article { ...blockProps }>
			{ imageUrl && (
				<img
					className="lp-tech-shot"
					src={ imageUrl }
					alt={ imageAlt || '' }
					loading="lazy"
					decoding="async"
				/>
			) }
			<h3>
				<RichText.Content tagName="span" value={ title } />
			</h3>
			<RichText.Content tagName="p" value={ body } />
		</article>
	);
}
