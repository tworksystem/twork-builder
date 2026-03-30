import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/em-doc-card' ];

const TEMPLATE = [
	[
		'twork/em-doc-card',
		{
			imageUrl:
				'https://jivakahospital.com/wp-content/uploads/2025/12/img-team-member-03.jpg',
			role: 'Head of Emergency',
			name: 'Dr. Aung Kyaw',
			specialty: 'Trauma Specialist',
		},
	],

	[
		'twork/em-doc-card',
		{
			imageUrl: 'https://i.pravatar.cc/400?img=11',
			role: 'Cardiologist',
			name: 'Dr. Zaw Win',
			specialty: 'Acute Cardiac Care',
		},
	],

	[
		'twork/em-doc-card',
		{
			imageUrl: 'https://i.pravatar.cc/400?img=5',
			role: 'Anesthesiologist',
			name: 'Dr. Thida Soe',
			specialty: 'Critical Care',
		},
	],

	[
		'twork/em-doc-card',
		{
			imageUrl: 'https://i.pravatar.cc/400?img=33',
			role: 'Physician',
			name: 'Dr. Min Htet',
			specialty: 'Pediatric Emergency',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		gap,
		minColumnWidth,
		showSectionHeader,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		headerMaxWidth,
		headerMarginBottom,
		animationOnScroll,
		animationType,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-em-doc-section-editor em-section',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	const headerStyle = {
		textAlign: 'center',
		maxWidth: `${ headerMaxWidth }px`,
		margin: `0 auto ${ headerMarginBottom }px`,
	};

	// Editor: fixed 3 columns so cards appear in a row (InnerBlocks + display:contents in SCSS).
	const gridStyle = {
		'--grid-columns': 3,
		'--grid-gap': `${ gap }px`,
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 1fr)',
		gap: `${ gap }px`,
	};

	const headerAnimClass =
		animationOnScroll && animationType ? animationType : '';

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section background', 'twork-builder' ) }
						initialOpen={ true }
					>
						<PanelColorSettings
							title={ __( 'Background color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __(
										'Background color',
										'twork-builder'
									),
								},
							] }
						/>

						<Divider />
						<RangeControl
							label={ __( 'Padding top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 40 }
							max={ 160 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 40 }
							max={ 160 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section header', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show header', 'twork-builder' ) }
							checked={ showSectionHeader }
							onChange={ ( val ) =>
								setAttributes( { showSectionHeader: val } )
							}
						/>

						{ showSectionHeader && (
							<>
								<TextControl
									label={ __( 'Title', 'twork-builder' ) }
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
								/>

								<PanelColorSettings
									title={ __(
										'Title color',
										'twork-builder'
									) }
									colorSettings={ [
										{
											value: sectionTitleColor,
											onChange: ( val ) =>
												setAttributes( {
													sectionTitleColor: val,
												} ),
											label: __(
												'Title color',
												'twork-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Title font size (rem)',
										'twork-builder'
									) }
									value={ sectionTitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontSize: val,
										} )
									}
									min={ 1.5 }
									max={ 3.5 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Title font weight',
										'twork-builder'
									) }
									value={ sectionTitleFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontWeight: val,
										} )
									}
									min={ 400 }
									max={ 900 }
									step={ 100 }
								/>

								<Divider />
								<ToggleControl
									label={ __(
										'Show subtitle',
										'twork-builder'
									) }
									checked={ showSectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											showSectionSubtitle: val,
										} )
									}
								/>

								{ showSectionSubtitle && (
									<>
										<TextControl
											label={ __(
												'Subtitle',
												'twork-builder'
											) }
											value={ sectionSubtitle }
											onChange={ ( val ) =>
												setAttributes( {
													sectionSubtitle: val,
												} )
											}
										/>

										<PanelColorSettings
											title={ __(
												'Subtitle color',
												'twork-builder'
											) }
											colorSettings={ [
												{
													value: sectionSubtitleColor,
													onChange: ( val ) =>
														setAttributes( {
															sectionSubtitleColor:
																val,
														} ),
													label: __(
														'Subtitle color',
														'twork-builder'
													),
												},
											] }
										/>

										<RangeControl
											label={ __(
												'Subtitle font size (rem)',
												'twork-builder'
											) }
											value={ sectionSubtitleFontSize }
											onChange={ ( val ) =>
												setAttributes( {
													sectionSubtitleFontSize:
														val,
												} )
											}
											min={ 0.8 }
											max={ 1.3 }
											step={ 0.05 }
										/>
									</>
								) }
								<RangeControl
									label={ __(
										'Header max width (px)',
										'twork-builder'
									) }
									value={ headerMaxWidth }
									onChange={ ( val ) =>
										setAttributes( { headerMaxWidth: val } )
									}
									min={ 480 }
									max={ 900 }
									step={ 10 }
								/>

								<RangeControl
									label={ __(
										'Header margin bottom (px)',
										'twork-builder'
									) }
									value={ headerMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											headerMarginBottom: val,
										} )
									}
									min={ 20 }
									max={ 80 }
									step={ 5 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Grid layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Min column width (px)',
								'twork-builder'
							) }
							value={ minColumnWidth }
							onChange={ ( val ) =>
								setAttributes( { minColumnWidth: val } )
							}
							min={ 200 }
							max={ 360 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Gap between cards (px)',
								'twork-builder'
							) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 16 }
							max={ 60 }
							step={ 4 }
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

						{ animationOnScroll && (
							<SelectControl
								label={ __(
									'Animation type',
									'twork-builder'
								) }
								value={ animationType }
								options={ [
									{
										label: __( 'Fade up', 'twork-builder' ),
										value: 'fade-up',
									},
									{
										label: __( 'Fade in', 'twork-builder' ),
										value: 'fadeIn',
									},
								] }
								onChange={ ( val ) =>
									setAttributes( { animationType: val } )
								}
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="em-container" style={ containerStyle }>
					{ showSectionHeader && (
						<div
							className={ `em-header ${ headerAnimClass }` }
							style={ headerStyle }
						>
							<RichText
								tagName="h2"
								value={ sectionTitle }
								onChange={ ( val ) =>
									setAttributes( { sectionTitle: val } )
								}
								placeholder={ __(
									'Emergency Specialists',
									'twork-builder'
								) }
								style={ {
									fontSize: `${ sectionTitleFontSize }rem`,
									fontWeight: sectionTitleFontWeight,
									color: sectionTitleColor,
									marginBottom: showSectionSubtitle ? 10 : 0,
									marginTop: 0,
								} }
							/>

							{ showSectionSubtitle && (
								<RichText
									tagName="p"
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
									placeholder={ __(
										'Add optional subtitle…',
										'twork-builder'
									) }
									style={ {
										fontSize: `${ sectionSubtitleFontSize }rem`,
										color: sectionSubtitleColor,
										margin: 0,
									} }
								/>
							) }
						</div>
					) }
					<div
						className="em-doc-grid twork-em-doc-grid-container"
						style={ gridStyle }
						data-columns={ 3 }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
