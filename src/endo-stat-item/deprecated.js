/**
 * v1 save rendered literal "0" in .num (JS filled the final value).
 * Keep for validation of existing posts; migrate attributes unchanged.
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

const v1Attributes = {
	showItem: { type: 'boolean', default: true },
	showNumber: { type: 'boolean', default: true },
	countValue: { type: 'number', default: 18500 },
	countSuffix: { type: 'string', default: '' },
	suffixHighlight: { type: 'string', default: '' },
	showLabel: { type: 'boolean', default: true },
	statLabel: { type: 'string', default: 'Procedures completed' },
	numberColor: { type: 'string', default: '#212121' },
	highlightColor: { type: 'string', default: '#f48b2a' },
	labelColor: { type: 'string', default: '#666666' },
};

function saveV1( { attributes } ) {
	const {
		showItem,
		showNumber,
		countValue,
		countSuffix,
		suffixHighlight,
		showLabel,
		statLabel,
		numberColor,
		labelColor,
	} = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'stat mk-endo-stat-item',
	} );

	const suffixAttr = suffixHighlight
		? `<em>${ suffixHighlight }</em>`
		: countSuffix || '';

	return (
		<div { ...blockProps }>
			{ showNumber !== false && (
				<div
					className="num"
					data-count={ countValue }
					data-suffix={ suffixAttr }
					style={ numberColor ? { color: numberColor } : undefined }
				>
					0
				</div>
			) }
			{ showLabel !== false && statLabel && (
				<RichText.Content
					tagName="span"
					className="lbl"
					value={ statLabel }
					style={ labelColor ? { color: labelColor } : undefined }
				/>
			) }
		</div>
	);
}

export default [
	{
		attributes: v1Attributes,
		save: saveV1,
		migrate( attributes ) {
			return { ...attributes };
		},
	},
];
