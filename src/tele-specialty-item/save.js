import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { iconClass, title } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-tele-specialty-item-wrapper',
	} );

	return (
		<div { ...blockProps }>
			<div className="specialty-item stagger-card">
				<div className="spec-icon">
					<i
						className={ iconClass || 'fas fa-stethoscope' }
						aria-hidden="true"
					/>
				</div>
				<RichText.Content tagName="h5" value={ title } />
			</div>
		</div>
	);
}
