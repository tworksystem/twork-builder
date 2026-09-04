import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { showItem } = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-about-staff-meal-feedback-item',
	} );

	return <article { ...blockProps } />;
}
