import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';

function ConditionsControl( { value, onChange } ) {
	return (
		<TextControl
			label={ __( 'Shows for conditions', 'twork-builder' ) }
			value={ value || '' }
			onChange={ onChange }
			help={ __(
				'Comma-separated keys from the selector. Leave empty to always show.',
				'twork-builder'
			) }
		/>
	);
}

export default function Edit( { attributes, setAttributes, isSelected } ) {
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
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'lp-est-row',
			'data-conditions': conditions || '',
		} ),
		[ conditions ]
	);

	if ( showItem === false ) {
		return null;
	}

	const hasBand = !! ( costBand && costBand.trim() );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Row', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show this row', 'twork-builder' ) }
							checked={ showItem }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
						<ConditionsControl
							value={ conditions }
							onChange={ ( value ) =>
								setAttributes( { conditions: value } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Cost', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Cost band', 'twork-builder' ) }
							help={ __(
								'Leave empty unless finance has signed the figure off. Empty renders the placeholder instead of a number.',
								'twork-builder'
							) }
							value={ costBand }
							onChange={ ( value ) =>
								setAttributes( { costBand: value } )
							}
						/>
						<TextControl
							label={ __(
								'Placeholder when empty',
								'twork-builder'
							) }
							value={ costPlaceholder }
							onChange={ ( value ) =>
								setAttributes( { costPlaceholder: value } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Call to action', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Label', 'twork-builder' ) }
							value={ ctaLabel }
							onChange={ ( value ) =>
								setAttributes( { ctaLabel: value } )
							}
						/>
						<TextControl
							label={ __( 'URL', 'twork-builder' ) }
							value={ ctaUrl }
							onChange={ ( value ) =>
								setAttributes( { ctaUrl: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				<RichText
					tagName="span"
					className="lp-est-name"
					value={ procedure }
					onChange={ ( value ) =>
						setAttributes( { procedure: value } )
					}
					placeholder={ __( 'Procedure', 'twork-builder' ) }
				/>
				<RichText
					tagName="span"
					className="lp-est-val"
					value={ stay }
					onChange={ ( value ) => setAttributes( { stay: value } ) }
					placeholder={ __( 'Usual stay', 'twork-builder' ) }
				/>
				<span
					className={
						hasBand ? 'lp-est-band' : 'lp-est-band is-on-request'
					}
				>
					{ hasBand ? costBand : costPlaceholder }
				</span>
				<span className="lp-est-cta">{ ctaLabel }</span>
			</div>
		</>
	);
}
