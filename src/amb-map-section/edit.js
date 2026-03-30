import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	ToggleControl,
	Button,
	BaseControl,
	PanelColorSettings,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionPaddingTop,
		sectionPaddingBottom,
		containerMaxWidth,
		containerPadding,
		showIcon,
		icon,
		iconSize,
		iconColor,
		iconMarginBottom,
		title,
		titleColor,
		titleFontSize,
		titleFontWeight,
		titleMarginBottom,
		description,
		descriptionColor,
		descriptionFontSize,
		boxBackgroundColor,
		boxPadding,
		boxBorderRadius,
		boxBorderStyle,
		boxBorderColor,
		boxBorderWidth,
		townships = [],
		townshipsGap,
		townshipsMarginTop,
		townshipBgColor,
		townshipTextColor,
		townshipPaddingVertical,
		townshipPaddingHorizontal,
		townshipBorderRadius,
		townshipFontWeight,
		animationOnScroll,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-amb-map-section-editor',
			style: {
				paddingTop: `${ sectionPaddingTop }px`,
				paddingBottom: `${ sectionPaddingBottom }px`,
			},
		} ),
		[ sectionPaddingBottom, sectionPaddingTop ]
	);

	const addTownship = () => {
		const id = townships.length
			? Math.max( ...townships.map( ( t ) => t.id ) ) + 1
			: 1;
		setAttributes( {
			townships: [
				...townships,
				{ id, text: __( 'New area', 'twork-builder' ) },
			],
		} );
	};

	const updateTownship = ( id, text ) => {
		setAttributes( {
			townships: townships.map( ( t ) =>
				t.id === id ? { ...t, text } : t
			),
		} );
	};

	const removeTownship = ( id ) => {
		setAttributes( {
			townships: townships.filter( ( t ) => t.id !== id ),
		} );
	};

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
	};

	const boxStyle = {
		backgroundColor: boxBackgroundColor,
		padding: `${ boxPadding }px`,
		borderRadius: `${ boxBorderRadius }px`,
		textAlign: 'center',
		border: `${ boxBorderWidth }px ${ boxBorderStyle } ${ boxBorderColor }`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Icon', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Icon', 'twork-builder' ) }
							checked={ showIcon }
							onChange={ ( val ) =>
								setAttributes( { showIcon: val } )
							}
						/>

						{ showIcon && (
							<>
								<TextControl
									label={ __(
										'Font Awesome Class',
										'twork-builder'
									) }
									value={ icon }
									onChange={ ( val ) =>
										setAttributes( {
											icon: val || 'fa-map-marked-alt',
										} )
									}
									help={ __(
										'e.g. fa-map-marked-alt',
										'twork-builder'
									) }
								/>

								<PanelColorSettings
									title={ __(
										'Icon Color',
										'twork-builder'
									) }
									colorSettings={ [
										{
											value: iconColor,
											onChange: ( val ) =>
												setAttributes( {
													iconColor: val,
												} ),
											label: __(
												'Color',
												'twork-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Icon Size (rem)',
										'twork-builder'
									) }
									value={ iconSize }
									onChange={ ( val ) =>
										setAttributes( { iconSize: val } )
									}
									min={ 1.5 }
									max={ 5 }
									step={ 0.25 }
								/>

								<RangeControl
									label={ __(
										'Icon Margin Bottom (px)',
										'twork-builder'
									) }
									value={ iconMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											iconMarginBottom: val,
										} )
									}
									min={ 0 }
									max={ 40 }
									step={ 5 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Title & Description', 'twork-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Title Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: titleColor,
									onChange: ( val ) =>
										setAttributes( { titleColor: val } ),
									label: __( 'Title Color', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Title Font Size (rem)',
								'twork-builder'
							) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1.2 }
							max={ 3 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Title Font Weight', 'twork-builder' ) }
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
								'Title Margin Bottom (px)',
								'twork-builder'
							) }
							value={ titleMarginBottom }
							onChange={ ( val ) =>
								setAttributes( { titleMarginBottom: val } )
							}
							min={ 0 }
							max={ 40 }
							step={ 5 }
						/>

						<hr
							style={ {
								margin: '16px 0',
								border: 'none',
								borderTop: '1px solid #ddd',
							} }
						/>

						<PanelColorSettings
							title={ __( 'Description Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: descriptionColor,
									onChange: ( val ) =>
										setAttributes( {
											descriptionColor: val,
										} ),
									label: __(
										'Description Color',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Description Font Size (rem)',
								'twork-builder'
							) }
							value={ descriptionFontSize }
							onChange={ ( val ) =>
								setAttributes( { descriptionFontSize: val } )
							}
							min={ 0.9 }
							max={ 1.5 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Townships / Areas', 'twork-builder' ) }
						initialOpen={ true }
					>
						<BaseControl
							label={ __( 'Location tags', 'twork-builder' ) }
						>
							{ townships.map( ( t ) => (
								<div
									key={ t.id }
									style={ {
										display: 'flex',
										gap: '8px',
										marginBottom: '8px',
										alignItems: 'center',
									} }
								>
									<TextControl
										value={ t.text }
										onChange={ ( val ) =>
											updateTownship( t.id, val )
										}
										style={ { flex: 1 } }
									/>

									<Button
										isDestructive
										isSmall
										onClick={ () => removeTownship( t.id ) }
									>
										{ __( 'Remove', 'twork-builder' ) }
									</Button>
								</div>
							) ) }
							<Button isPrimary isSmall onClick={ addTownship }>
								{ __( 'Add township / area', 'twork-builder' ) }
							</Button>
						</BaseControl>
						<hr
							style={ {
								margin: '16px 0',
								border: 'none',
								borderTop: '1px solid #ddd',
							} }
						/>

						<RangeControl
							label={ __(
								'Gap between tags (px)',
								'twork-builder'
							) }
							value={ townshipsGap }
							onChange={ ( val ) =>
								setAttributes( { townshipsGap: val } )
							}
							min={ 5 }
							max={ 30 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Tags margin top (px)',
								'twork-builder'
							) }
							value={ townshipsMarginTop }
							onChange={ ( val ) =>
								setAttributes( { townshipsMarginTop: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Township tag style', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Tag colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: townshipBgColor,
									onChange: ( val ) =>
										setAttributes( {
											townshipBgColor: val,
										} ),
									label: __( 'Background', 'twork-builder' ),
								},
								{
									value: townshipTextColor,
									onChange: ( val ) =>
										setAttributes( {
											townshipTextColor: val,
										} ),
									label: __( 'Text', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Padding vertical (px)',
								'twork-builder'
							) }
							value={ townshipPaddingVertical }
							onChange={ ( val ) =>
								setAttributes( {
									townshipPaddingVertical: val,
								} )
							}
							min={ 5 }
							max={ 25 }
							step={ 1 }
						/>

						<RangeControl
							label={ __(
								'Padding horizontal (px)',
								'twork-builder'
							) }
							value={ townshipPaddingHorizontal }
							onChange={ ( val ) =>
								setAttributes( {
									townshipPaddingHorizontal: val,
								} )
							}
							min={ 10 }
							max={ 50 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Border radius (px)',
								'twork-builder'
							) }
							value={ townshipBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { townshipBorderRadius: val } )
							}
							min={ 0 }
							max={ 50 }
							step={ 5 }
						/>

						<RangeControl
							label={ __( 'Font weight', 'twork-builder' ) }
							value={ townshipFontWeight }
							onChange={ ( val ) =>
								setAttributes( { townshipFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Box style', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Box', 'twork-builder' ) }
							colorSettings={ [
								{
									value: boxBackgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											boxBackgroundColor: val,
										} ),
									label: __( 'Background', 'twork-builder' ),
								},
								{
									value: boxBorderColor,
									onChange: ( val ) =>
										setAttributes( {
											boxBorderColor: val,
										} ),
									label: __(
										'Border color',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Box padding (px)', 'twork-builder' ) }
							value={ boxPadding }
							onChange={ ( val ) =>
								setAttributes( { boxPadding: val } )
							}
							min={ 30 }
							max={ 100 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Border radius (px)',
								'twork-builder'
							) }
							value={ boxBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { boxBorderRadius: val } )
							}
							min={ 0 }
							max={ 30 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Border width (px)', 'twork-builder' ) }
							value={ boxBorderWidth }
							onChange={ ( val ) =>
								setAttributes( { boxBorderWidth: val } )
							}
							min={ 0 }
							max={ 8 }
							step={ 1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section & container', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Section padding top (px)',
								'twork-builder'
							) }
							value={ sectionPaddingTop }
							onChange={ ( val ) =>
								setAttributes( { sectionPaddingTop: val } )
							}
							min={ 0 }
							max={ 150 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Section padding bottom (px)',
								'twork-builder'
							) }
							value={ sectionPaddingBottom }
							onChange={ ( val ) =>
								setAttributes( { sectionPaddingBottom: val } )
							}
							min={ 0 }
							max={ 150 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Container max width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 600 }
							max={ 1920 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 80 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable scroll animation',
								'twork-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div style={ containerStyle }>
					<div
						className="editor-label"
						style={ {
							textAlign: 'center',
							padding: '10px',
							background: '#2271b1',
							color: '#fff',
							fontWeight: '600',
							fontSize: '12px',
							textTransform: 'uppercase',
							marginBottom: '20px',
							borderRadius: '4px',
						} }
					>
						{ __(
							'Ambulance Map / Coverage Section',
							'twork-builder'
						) }
					</div>

					<div
						className="amb-map-box twork-amb-map-box"
						style={ boxStyle }
					>
						{ showIcon && icon && (
							<i
								className={ `fas ${ icon } amb-map-icon` }
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
							tagName="h2"
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
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
							placeholder={ __(
								'Description...',
								'twork-builder'
							) }
							style={ {
								color: descriptionColor,
								fontSize: `${ descriptionFontSize }rem`,
								margin: 0,
							} }
						/>

						{ townships && townships.length > 0 && (
							<div
								className="amb-townships"
								style={ {
									display: 'flex',
									flexWrap: 'wrap',
									justifyContent: 'center',
									gap: `${ townshipsGap }px`,
									marginTop: `${ townshipsMarginTop }px`,
								} }
							>
								{ townships.map( ( t ) => (
									<span
										key={ t.id }
										className="amb-township"
										style={ {
											background: townshipBgColor,
											color: townshipTextColor,
											padding: `${ townshipPaddingVertical }px ${ townshipPaddingHorizontal }px`,
											borderRadius: `${ townshipBorderRadius }px`,
											fontWeight: townshipFontWeight,
										} }
									>
										{ t.text }
									</span>
								) ) }
							</div>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
