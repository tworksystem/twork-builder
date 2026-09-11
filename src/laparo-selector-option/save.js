import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { showItem, label, conditionKey, icon } = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'lp-opt',
		type: 'button',
		'data-condition': ( conditionKey || '' ).toLowerCase(),
		'aria-pressed': 'false',
	} );

	return (
		<button { ...blockProps }>
			{ icon && <i className={ icon } aria-hidden="true" /> }
			<RichText.Content tagName="span" value={ label } />
		</button>
	);
}
