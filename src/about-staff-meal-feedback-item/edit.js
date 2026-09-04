import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';

export default function Edit() {
	const blockProps = useStableBlockProps( () => ( {
		className: 'twork-about-staff-meal-feedback-item',
		style: {
			border: '2px dashed #ccc',
			padding: '16px',
			minHeight: '80px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: '#757575',
		},
	} ) );

	return (
		<div { ...blockProps }>{ __( 'Staff feedback', 'twork-builder' ) }</div>
	);
}
