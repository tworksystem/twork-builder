import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	PanelColorSettings,
} from '@wordpress/components';

const ICON_OPTIONS = [
	{ value: 'fa-heartbeat', label: __( 'Heartbeat', 'twork-builder' ) },
	{ value: 'fa-lungs', label: __( 'Lungs', 'twork-builder' ) },
	{ value: 'fa-map-marker-alt', label: __( 'Map Marker', 'twork-builder' ) },
	{ value: 'fa-first-aid', label: __( 'First Aid', 'twork-builder' ) },
	{ value: 'fa-stethoscope', label: __( 'Stethoscope', 'twork-builder' ) },
	{ value: 'fa-syringe', label: __( 'Syringe', 'twork-builder' ) },
	{ value: 'fa-ambulance', label: __( 'Ambulance', 'twork-builder' ) },
	{ value: 'fa-heart-pulse', label: __( 'Heart Pulse', 'twork-builder' ) },
	{ value: 'fa-bolt', label: __( 'Bolt', 'twork-builder' ) },
	{ value: 'fa-shield-alt', label: __( 'Shield', 'twork-builder' ) },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		icon,
		title,
		description,
		iconColor,
		iconSize,
		iconMarginBottom,
		titleColor,
		titleFontSize,
		titleFontWeight,
		titleMarginBottom,
		descriptionColor,
		descriptionFontSize,
		itemPadding,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-amb-tech-item-editor amb-tech-item',
			style: {
				padding: `${ itemPadding }px`,
				background: 'rgba(255, 255, 255, 0.05)',
				borderRadius: '8px',
				border: '1px solid rgba(255, 255, 255, 0.1)',
				borderColor: 'rgba(255, 255, 255, 0.1)',
			},
		} ),
		[ itemPadding ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Icon', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Font Awesome Icon Class',
								'twork-builder'
							) }
							value={ icon }
							onChange={ ( val ) =>
								setAttributes( { icon: val || 'fa-circle' } )
							}
							help={ __(
								'e.g. fa-heartbeat, fa-lungs, fa-first-aid',
								'twork-builder'
							) }
						/>

						<PanelColorSettings
							title={ __( 'Icon Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: iconColor,
									onChange: ( val ) =>
										setAttributes( { iconColor: val } ),
									label: __( 'Color', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Icon Size (rem)', 'twork-builder' ) }
							value={ iconSize }
							onChange={ ( val ) =>
								setAttributes( { iconSize: val } )
							}
							min={ 1.5 }
							max={ 4 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __(
								'Icon Margin Bottom (px)',
								'twork-builder'
							) }
							value={ iconMarginBottom }
							onChange={ ( val ) =>
								setAttributes( { iconMarginBottom: val } )
							}
							min={ 0 }
							max={ 40 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Title', 'twork-builder' ) }
						initialOpen={ false }
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
							max={ 2 }
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
							label={ __( 'Item Padding (px)', 'twork-builder' ) }
							value={ itemPadding }
							onChange={ ( val ) =>
								setAttributes( { itemPadding: val } )
							}
							min={ 16 }
							max={ 50 }
							step={ 2 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ icon && (
					<i
						className={ `fas ${ icon } amb-tech-icon` }
						style={ {
							fontSize: `${ iconSize }rem`,
							color: iconColor,
							marginBottom: `${ iconMarginBottom }px`,
							display: 'block',
						} }
						aria-hidden
					/>
				) }
				<RichText
					tagName="h3"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Title...', 'twork-builder' ) }
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
					placeholder={ __( 'Description...', 'twork-builder' ) }
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
