import { useBlockProps } from '@wordpress/block-editor';
import FooterMarkup from './footer-markup';

export default function save( { attributes } ) {
	const { containerMaxWidth, primaryColor } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'jivaka-footer-section-block',
		style: {
			'--jf-container-max-width':
				containerMaxWidth != null
					? `${ containerMaxWidth }px`
					: undefined,
			'--jf-primary': primaryColor || '#f6892e',
		},
	} );

	return (
		<div { ...blockProps }>
			<FooterMarkup { ...attributes } />
		</div>
	);
}
