import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { icon, title, description } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'jivaka-gm-service-card',
	} );

	return (
		<div { ...blockProps }>
			<div className="jivaka-gm-icon-box">
				<i className={ icon || 'fas fa-stethoscope' } />
			</div>
			<RichText.Content tagName="h3" value={ title } />
			<RichText.Content tagName="p" value={ description } />
		</div>
	);
}
