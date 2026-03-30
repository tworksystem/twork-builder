import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { iconClass, title, description } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'feature-card stagger-up',
	} );

	return (
		<div { ...blockProps }>
			<div className="feature-icon" aria-hidden="true">
				<i className={ iconClass || 'fas fa-microscope' } />
			</div>
			<RichText.Content
				tagName="h4"
				value={ title }
				className="feature-card-title"
			/>
			<RichText.Content
				tagName="p"
				value={ description }
				className="feature-card-description"
				style={ { color: '#64748b', fontSize: '0.95rem' } }
			/>
		</div>
	);
}
