import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		showItem,
		metric,
		metricNote,
		valueA,
		valueB,
		scaleA,
		scaleB,
		showBars,
		labelA,
		labelB,
		conditions,
	} = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'lp-cmp-row',
		role: 'row',
		'data-conditions': conditions || '',
	} );

	return (
		<div { ...blockProps }>
			<div className="lp-cmp-key" role="rowheader">
				<RichText.Content tagName="span" value={ metric } />
				{ metricNote && (
					<RichText.Content tagName="small" value={ metricNote } />
				) }
			</div>
			<div className="lp-cmp-val" role="cell" data-label={ labelA }>
				<RichText.Content
					tagName="span"
					className="lp-cmp-a"
					value={ valueA }
				/>
				{ showBars && (
					<div className="lp-cmp-bar">
						<i data-scale={ String( scaleA ) } />
					</div>
				) }
			</div>
			<div className="lp-cmp-val" role="cell" data-label={ labelB }>
				<RichText.Content tagName="span" value={ valueB } />
				{ showBars && (
					<div className="lp-cmp-bar lp-cmp-bar--alt">
						<i data-scale={ String( scaleB ) } />
					</div>
				) }
			</div>
		</div>
	);
}
