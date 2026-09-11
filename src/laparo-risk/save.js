import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { showItem, label, note, rate, ratePlaceholder, conditions } =
		attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'lp-risk-row',
		role: 'row',
		'data-conditions': conditions || '',
	} );

	const hasRate = ! ( ! rate || ! rate.trim() );

	return (
		<div { ...blockProps }>
			<div className="lp-risk-name" role="rowheader">
				<RichText.Content tagName="span" value={ label } />
				{ note && <RichText.Content tagName="small" value={ note } /> }
			</div>
			<div
				className={ hasRate ? 'lp-risk-rate' : 'lp-risk-rate is-empty' }
				role="cell"
			>
				{ hasRate ? rate : ratePlaceholder }
			</div>
		</div>
	);
}
