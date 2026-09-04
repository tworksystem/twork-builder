import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		showItem,
		showQuestion,
		question,
		showAnswer,
		answer,
		showToggleIcon,
		toggleIconClass,
	} = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'faq mk-endo-faq-item',
	} );

	return (
		<div { ...blockProps }>
			{ showQuestion !== false && question && (
				<button type="button" className="faq-q">
					<RichText.Content tagName="span" value={ question } />
					{ showToggleIcon !== false && toggleIconClass && (
						<i className={ toggleIconClass } aria-hidden="true" />
					) }
				</button>
			) }
			{ showAnswer !== false && answer && (
				<div className="faq-a">
					<RichText.Content
						tagName="div"
						className="faq-a-inner"
						value={ answer }
					/>
				</div>
			) }
		</div>
	);
}
