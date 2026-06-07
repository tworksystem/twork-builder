import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { question, answer, isOpenByDefault } = attributes;

	const blockProps = useBlockProps.save( {
		className: `faq__item${ isOpenByDefault ? ' is-open' : '' }`,
		'data-accordion-item': 'true',
		...( isOpenByDefault ? { 'data-open': 'true' } : {} ),
	} );

	return (
		<details { ...blockProps } open={ isOpenByDefault || undefined }>
			<summary
				className="faq__trigger"
				data-action="accordion-toggle"
				aria-expanded={ isOpenByDefault ? 'true' : 'false' }
			>
				<RichText.Content
					tagName="span"
					className="faq__question"
					value={ question }
				/>
				<span className="faq__icon" aria-hidden="true" />
			</summary>
			<div className="faq__panel" data-accordion-panel>
				<RichText.Content tagName="p" value={ answer } />
			</div>
		</details>
	);
}
