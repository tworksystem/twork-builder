import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		showItem,
		procedure,
		stay,
		costBand,
		costPlaceholder,
		ctaLabel,
		ctaUrl,
		conditions,
	} = attributes;

	if ( showItem === false ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'lp-est-row',
		role: 'row',
		'data-conditions': conditions || '',
	} );

	const hasBand = !! ( costBand && costBand.trim() );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="span"
				className="lp-est-name"
				role="rowheader"
				value={ procedure }
			/>
			<RichText.Content
				tagName="span"
				className="lp-est-val"
				role="cell"
				value={ stay }
			/>
			<span
				className={
					hasBand ? 'lp-est-band' : 'lp-est-band is-on-request'
				}
				role="cell"
			>
				{ hasBand ? costBand : costPlaceholder }
			</span>
			<span role="cell">
				{ ctaLabel && ctaUrl && (
					<a className="lp-est-cta" href={ ctaUrl }>
						{ ctaLabel }
					</a>
				) }
			</span>
		</div>
	);
}
