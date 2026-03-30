import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { stepNumber, title, description } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'em-step stagger-up',
	} );

	return (
		<div { ...blockProps }>
			<div className="em-step-num">{ stepNumber }</div>
			<RichText.Content tagName="h4" value={ title } />
			<RichText.Content tagName="p" value={ description } />
		</div>
	);
}
