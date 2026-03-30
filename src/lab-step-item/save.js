import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { stepNumber = '1', title = '', description = '' } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'lab-step-row stagger-up',
	} );

	return (
		<div { ...blockProps }>
			<div className="lab-step-num">{ stepNumber || '1' }</div>
			<div className="lab-step-content">
				<RichText.Content tagName="h4" value={ title } />
				<RichText.Content tagName="p" value={ description } />
			</div>
		</div>
	);
}
