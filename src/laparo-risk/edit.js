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
	const { showItem, label, note, rate, ratePlaceholder, conditions } =
		attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'lp-risk-row',
			'data-conditions': conditions || '',
		} ),
		[ conditions ]
	);

	if ( showItem === false ) {
		return null;
	}

	const hasRate = ! ( ! rate || ! rate.trim() );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Risk', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show this risk', 'twork-builder' ) }
							checked={ showItem }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
						<TextControl
							label={ __( 'Rate', 'twork-builder' ) }
							help={ __(
								'Leave empty rather than guess. An empty rate renders a dash, which is honest; an invented percentage is not.',
								'twork-builder'
							) }
							value={ rate }
							onChange={ ( value ) =>
								setAttributes( { rate: value } )
							}
						/>
						<TextControl
							label={ __(
								'Placeholder when empty',
								'twork-builder'
							) }
							value={ ratePlaceholder }
							onChange={ ( value ) =>
								setAttributes( { ratePlaceholder: value } )
							}
						/>
						<ConditionsControl
							value={ conditions }
							onChange={ ( value ) =>
								setAttributes( { conditions: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				<div className="lp-risk-name">
					<RichText
						tagName="span"
						value={ label }
						onChange={ ( value ) =>
							setAttributes( { label: value } )
						}
						placeholder={ __( 'Complication', 'twork-builder' ) }
					/>
					<RichText
						tagName="small"
						value={ note }
						onChange={ ( value ) =>
							setAttributes( { note: value } )
						}
						placeholder={ __( 'Qualifier', 'twork-builder' ) }
					/>
				</div>
				<div
					className={
						hasRate ? 'lp-risk-rate' : 'lp-risk-rate is-empty'
					}
				>
					{ hasRate ? rate : ratePlaceholder }
				</div>
			</div>
		</>
	);
}
