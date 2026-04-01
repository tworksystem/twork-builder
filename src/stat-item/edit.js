import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		statNumber,
		statLabel,
		numberColor,
		numberFontSize,
		numberFontWeight,
		labelColor,
		labelFontSize,
		labelFontWeight,
		labelTextTransform,
		// Fallback for alternate stat-item schema (icon-based variants)
		iconVariant,
		title: iconTitle,
		description: iconDescription,
	} = attributes;

	// If this instance is coming from an example/template that uses the icon-based schema,
	// derive CSR fields so hover previews don't render empty.
	const derivedStatNumber =
		statNumber ?? ( typeof iconTitle === 'string' ? iconTitle.split('%')[0] + '%' : undefined );
	const derivedStatLabel =
		statLabel ?? iconTitle ?? iconDescription ?? '';
	const derivedNumberColor = numberColor ?? '#f48b2a';
	const derivedLabelColor = labelColor ?? '#212121';
	const derivedNumberFontSize = numberFontSize ?? 2.5;
	const derivedNumberFontWeight = numberFontWeight ?? 900;
	const derivedLabelFontSize = labelFontSize ?? 0.95;
	const derivedLabelFontWeight = labelFontWeight ?? 700;
	const derivedLabelTextTransform = labelTextTransform ?? 'uppercase';

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-stat-item-editor stat-item',
			style: {
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center',
			},
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Stat Number', 'twork-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Number Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: numberColor,
									onChange: ( val ) =>
										setAttributes( { numberColor: val } ),
									label: __(
										'Number Color',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'twork-builder' ) }
							value={ numberFontSize }
							onChange={ ( val ) =>
								setAttributes( { numberFontSize: val } )
							}
							min={ 1 }
							max={ 4 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'twork-builder' ) }
							value={ numberFontWeight }
							onChange={ ( val ) =>
								setAttributes( { numberFontWeight: val } )
							}
							min={ 100 }
							max={ 900 }
							step={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Stat Label', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Label Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: labelColor,
									onChange: ( val ) =>
										setAttributes( { labelColor: val } ),
									label: __( 'Label Color', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'twork-builder' ) }
							value={ labelFontSize }
							onChange={ ( val ) =>
								setAttributes( { labelFontSize: val } )
							}
							min={ 0.7 }
							max={ 1.5 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'twork-builder' ) }
							value={ labelFontWeight }
							onChange={ ( val ) =>
								setAttributes( { labelFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>

						<SelectControl
							label={ __( 'Text Transform', 'twork-builder' ) }
							value={ labelTextTransform }
							options={ [
								{
									label: __( 'None', 'twork-builder' ),
									value: 'none',
								},
								{
									label: __( 'Uppercase', 'twork-builder' ),
									value: 'uppercase',
								},
								{
									label: __( 'Lowercase', 'twork-builder' ),
									value: 'lowercase',
								},
								{
									label: __( 'Capitalize', 'twork-builder' ),
									value: 'capitalize',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { labelTextTransform: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<RichText
					tagName="h3"
					value={ derivedStatNumber }
					onChange={ ( val ) => setAttributes( { statNumber: val } ) }
					placeholder={ __( '50+', 'twork-builder' ) }
					style={ {
						fontSize: `${ derivedNumberFontSize }rem`,
						fontWeight: derivedNumberFontWeight,
						color: derivedNumberColor,
						margin: 0,
						lineHeight: 1.2,
					} }
					withoutInteractiveFormatting
				/>

				<RichText
					tagName="p"
					value={ derivedStatLabel }
					onChange={ ( val ) => setAttributes( { statLabel: val } ) }
					placeholder={ __( 'Rural Medical Camps', 'twork-builder' ) }
					style={ {
						fontSize: `${ derivedLabelFontSize }rem`,
						fontWeight: derivedLabelFontWeight,
						color: derivedLabelColor,
						textTransform: derivedLabelTextTransform,
						margin: '5px 0 0 0',
						lineHeight: 1.3,
					} }
					withoutInteractiveFormatting
				/>
			</div>
		</>
	);
}
