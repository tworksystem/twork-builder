import { InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { ConditionsControl } from '@twork-builder/shared/laparo-legacy-section';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showItem,
		metric,
		metricNote,
		valueA,
		valueB,
		labelA,
		labelB,
		showBars,
		scaleA,
		scaleB,
		conditions,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'lp-cmp-row',
			'data-conditions': conditions || '',
		} ),
		[ conditions ]
	);

	return showItem === false ? null : (
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
						title={ __( 'Bars', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show scale bars', 'twork-builder' ) }
							help={ __(
								'Bars are relative, not absolute. Leave them off for rows that are not a quantity.',
								'twork-builder'
							) }
							checked={ showBars }
							onChange={ ( value ) =>
								setAttributes( { showBars: value } )
							}
						/>
						{ showBars && (
							<>
								<RangeControl
									label={ __(
										'Keyhole bar',
										'twork-builder'
									) }
									value={ scaleA }
									onChange={ ( value ) =>
										setAttributes( { scaleA: value } )
									}
									min={ 0 }
									max={ 1 }
									step={ 0.01 }
								/>
								<RangeControl
									label={ __( 'Open bar', 'twork-builder' ) }
									value={ scaleB }
									onChange={ ( value ) =>
										setAttributes( { scaleB: value } )
									}
									min={ 0 }
									max={ 1 }
									step={ 0.01 }
								/>
							</>
						) }
					</PanelBody>
					<PanelBody
						title={ __( 'Mobile labels', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Label A', 'twork-builder' ) }
							help={ __(
								'Shown above the value on narrow screens.',
								'twork-builder'
							) }
							value={ labelA }
							onChange={ ( value ) =>
								setAttributes( { labelA: value } )
							}
						/>
						<TextControl
							label={ __( 'Label B', 'twork-builder' ) }
							value={ labelB }
							onChange={ ( value ) =>
								setAttributes( { labelB: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				<div className="lp-cmp-key">
					<RichText
						tagName="span"
						value={ metric }
						onChange={ ( value ) =>
							setAttributes( { metric: value } )
						}
						placeholder={ __( 'Measure', 'twork-builder' ) }
					/>
					<RichText
						tagName="small"
						value={ metricNote }
						onChange={ ( value ) =>
							setAttributes( { metricNote: value } )
						}
						placeholder={ __( 'Qualifier', 'twork-builder' ) }
					/>
				</div>
				<div className="lp-cmp-val" data-label={ labelA }>
					<RichText
						tagName="span"
						className="lp-cmp-a"
						value={ valueA }
						onChange={ ( value ) =>
							setAttributes( { valueA: value } )
						}
						placeholder={ __( 'Keyhole', 'twork-builder' ) }
					/>
					{ showBars && (
						<div className="lp-cmp-bar">
							<i
								style={ {
									transform: `scaleX(${ scaleA })`,
								} }
							/>
						</div>
					) }
				</div>
				<div className="lp-cmp-val" data-label={ labelB }>
					<RichText
						tagName="span"
						value={ valueB }
						onChange={ ( value ) =>
							setAttributes( { valueB: value } )
						}
						placeholder={ __( 'Open surgery', 'twork-builder' ) }
					/>
					{ showBars && (
						<div className="lp-cmp-bar lp-cmp-bar--alt">
							<i
								style={ {
									transform: `scaleX(${ scaleB })`,
								} }
							/>
						</div>
					) }
				</div>
			</div>
		</>
	);
}
