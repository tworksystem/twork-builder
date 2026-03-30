import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { statNumber, label } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'phy-stat-card stagger-up',
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="span"
				className="phy-stat-num"
				value={ statNumber || '5k+' }
			/>
			<RichText.Content tagName="p" value={ label || 'Happy Patients' } />
		</div>
	);
}
