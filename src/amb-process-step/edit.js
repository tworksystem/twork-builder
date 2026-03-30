import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	PanelColorSettings,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		title,
		description,
		titleColor,
		titleFontSize,
		titleFontWeight,
		titleMarginBottom,
		descriptionColor,
		descriptionFontSize,
		stepPadding,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-amb-process-step-editor amb-step',
			style: {
				position: 'relative',
				padding: `${ stepPadding }px`,
				textAlign: 'center',
			},
		} ),
		[ stepPadding ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Title', 'twork-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Title Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: titleColor,
									onChange: ( val ) =>
										setAttributes( { titleColor: val } ),
									label: __( 'Color', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'twork-builder' ) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1 }
							max={ 1.8 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'twork-builder' ) }
							value={ titleFontWeight }
							onChange={ ( val ) =>
								setAttributes( { titleFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>

						<RangeControl
							label={ __(
								'Margin Bottom (px)',
								'twork-builder'
							) }
							value={ titleMarginBottom }
							onChange={ ( val ) =>
								setAttributes( { titleMarginBottom: val } )
							}
							min={ 0 }
							max={ 30 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Description', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Description Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: descriptionColor,
									onChange: ( val ) =>
										setAttributes( {
											descriptionColor: val,
										} ),
									label: __( 'Color', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'twork-builder' ) }
							value={ descriptionFontSize }
							onChange={ ( val ) =>
								setAttributes( { descriptionFontSize: val } )
							}
							min={ 0.8 }
							max={ 1.2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Step Padding (px)', 'twork-builder' ) }
							value={ stepPadding }
							onChange={ ( val ) =>
								setAttributes( { stepPadding: val } )
							}
							min={ 12 }
							max={ 40 }
							step={ 2 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<RichText
					tagName="h4"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Step title...', 'twork-builder' ) }
					style={ {
						color: titleColor,
						fontSize: `${ titleFontSize }rem`,
						fontWeight: titleFontWeight,
						marginBottom: `${ titleMarginBottom }px`,
						marginTop: 0,
					} }
				/>

				<RichText
					tagName="p"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __( 'Step description...', 'twork-builder' ) }
					style={ {
						color: descriptionColor,
						fontSize: `${ descriptionFontSize }rem`,
						margin: 0,
					} }
				/>
			</div>
		</>
	);
}
