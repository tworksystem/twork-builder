import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { showItem, when, title, body, conditions } = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'lp-jr-step',
		'data-conditions': conditions || '',
	} );

	return (
		<article { ...blockProps }>
			<RichText.Content
				tagName="span"
				className="lp-jr-when"
				value={ when }
			/>
			<RichText.Content tagName="h3" value={ title } />
			<RichText.Content tagName="p" value={ body } />
		</article>
	);
}
