import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { iconClass, title, description } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'rad-why-item stagger-up',
	} );

	return (
		<div { ...blockProps }>
			<div className="rad-why-icon">
				{ iconClass && (
					<i className={ iconClass } aria-hidden="true" />
				) }
			</div>
			{ title && <RichText.Content tagName="h4" value={ title } /> }
			{ description && (
				<RichText.Content
					tagName="p"
					className="rad-why-description"
					value={ description }
				/>
			) }
		</div>
	);
}
