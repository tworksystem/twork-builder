import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { question, answer } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'faq-item',
	} );

	return (
		<div { ...blockProps }>
			<button type="button" className="faq-btn">
				<RichText.Content tagName="span" value={ question } />
				<i className="fas fa-chevron-down" aria-hidden />
			</button>
			<div className="faq-content">
				<RichText.Content tagName="div" value={ answer } />
			</div>
		</div>
	);
}
