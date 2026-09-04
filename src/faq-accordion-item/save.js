import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { itemId, question, answer } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'faq__item',
		'data-accordion-item': true,
		'data-item-id': itemId,
	} );

	return (
		<div { ...blockProps }>
			<button
				type="button"
				className="faq__trigger"
				data-action="accordion-toggle"
				aria-expanded="false"
			>
				<RichText.Content
					tagName="span"
					className="faq__question"
					value={ question }
				/>
				<span className="faq__icon" aria-hidden="true" />
			</button>
			<div className="faq__panel" data-accordion-panel hidden>
				<RichText.Content tagName="p" value={ answer } />
			</div>
		</div>
	);
}
