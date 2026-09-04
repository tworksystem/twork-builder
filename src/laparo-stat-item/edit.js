import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	TextControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showItem,
		showNumber,
		countValue,
		countSuffix,
		suffixHighlight,
		showLabel,
		statLabel,
		numberColor,
		highlightColor,
		labelColor,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'stat mk-laparo-stat-item',
		} ),
		[]
	);

	if ( showItem === false ) {
		return null;
	}

	const displayNumber =
		typeof countValue === 'number'
			? countValue.toLocaleString()
			: String( countValue || '0' );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Stat Item', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Item', 'twork-builder' ) }
							checked={ showItem !== false }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Number', 'twork-builder' ) }
							checked={ showNumber !== false }
							onChange={ ( value ) =>
								setAttributes( { showNumber: value } )
							}
						/>
						{ showNumber !== false && (
							<>
								<RangeControl
									label={ __(
										'Count Value',
										'twork-builder'
									) }
									value={ countValue }
									onChange={ ( value ) =>
										setAttributes( { countValue: value } )
									}
									min={ 0 }
									max={ 100000 }
									step={ 1 }
								/>
								<TextControl
									label={ __(
										'Suffix (plain)',
										'twork-builder'
									) }
									value={ countSuffix }
									onChange={ ( value ) =>
										setAttributes( { countSuffix: value } )
									}
									help={ __(
										'e.g. + after the number',
										'twork-builder'
									) }
								/>
								<TextControl
									label={ __(
										'Suffix Highlight',
										'twork-builder'
									) }
									value={ suffixHighlight }
									onChange={ ( value ) =>
										setAttributes( {
											suffixHighlight: value,
										} )
									}
									help={ __(
										'Styled suffix e.g. .4% or min',
										'twork-builder'
									) }
								/>
								<TextControl
									label={ __(
										'Number Color',
										'twork-builder'
									) }
									value={ numberColor }
									onChange={ ( value ) =>
										setAttributes( { numberColor: value } )
									}
								/>
								<TextControl
									label={ __(
										'Highlight Color',
										'twork-builder'
									) }
									value={ highlightColor }
									onChange={ ( value ) =>
										setAttributes( {
											highlightColor: value,
										} )
									}
								/>
							</>
						) }
						<ToggleControl
							label={ __( 'Show Label', 'twork-builder' ) }
							checked={ showLabel !== false }
							onChange={ ( value ) =>
								setAttributes( { showLabel: value } )
							}
						/>
						{ showLabel !== false && (
							<TextControl
								label={ __( 'Label Color', 'twork-builder' ) }
								value={ labelColor }
								onChange={ ( value ) =>
									setAttributes( { labelColor: value } )
								}
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ showNumber !== false && (
					<div
						className="num"
						data-count={ countValue }
						data-suffix={
							suffixHighlight
								? `<em>${ suffixHighlight }</em>`
								: countSuffix || ''
						}
						style={ { color: numberColor } }
					>
						{ displayNumber }
						{ suffixHighlight ? (
							<em style={ { color: highlightColor } }>
								{ suffixHighlight }
							</em>
						) : (
							countSuffix
						) }
					</div>
				) }
				{ showLabel !== false && (
					<RichText
						tagName="span"
						className="lbl"
						value={ statLabel }
						onChange={ ( value ) =>
							setAttributes( { statLabel: value } )
						}
						placeholder={ __( 'Label', 'twork-builder' ) }
						style={ { color: labelColor } }
						withoutInteractiveFormatting
					/>
				) }
			</div>
		</>
	);
}
