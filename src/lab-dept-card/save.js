import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { iconClass, title } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'lab-dept-card',
	} );

	return (
		<div { ...blockProps }>
			<div className="lab-hex-icon">
				{ iconClass && (
					<i className={ iconClass } aria-hidden="true" />
				) }
			</div>
			{ title && <RichText.Content tagName="h3" value={ title } /> }
		</div>
	);
}
