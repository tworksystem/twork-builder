import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { question, answer } = attributes;
	const blockProps = useBlockProps.save( { className: 'faq-item' } );

	return (
		<div { ...blockProps }>
			<button type="button" className="faq-question">
				{ question } <i className="fas fa-chevron-down" />
			</button>
			<div className="faq-answer">
				<p>{ answer }</p>
			</div>
		</div>
	);
}
