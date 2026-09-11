import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { showItem, question, answer, conditions } = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'lp-faq-item',
		'data-conditions': conditions || '',
	} );

	return (
		<div { ...blockProps }>
			<button type="button" className="lp-faq-q" aria-expanded="false">
				<RichText.Content tagName="span" value={ question } />
				<i className="fas fa-plus" aria-hidden="true" />
			</button>
			<div className="lp-faq-a">
				<RichText.Content tagName="p" value={ answer } />
			</div>
		</div>
	);
}
