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
	SelectControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		sectionTitleTextTransform,
		sectionTitleLetterSpacing,
		sectionTitleAlignment,
		titleMarginBottom,
		containerMaxWidth,
		containerPadding,
		gridMinWidth,
		gap,
		logoMaxWidth,
		logoOpacity,
		logoGrayscale,
		logoHoverOpacity,
		logoHoverScale,
		animationOnScroll,
		animationType,
	} = attributes;

	const ALLOWED_BLOCKS = [ 'twork/csr-partner-logo-item' ];
	const TEMPLATE = [
		[ 'twork/csr-partner-logo-item', { placeholderColor: '#f48b2a' } ],
		[ 'twork/csr-partner-logo-item', { placeholderColor: '#e3f2fd' } ],
		[ 'twork/csr-partner-logo-item', { placeholderColor: '#f3e5f5' } ],
		[ 'twork/csr-partner-logo-item', { placeholderColor: '#e8f5e9' } ],
		[ 'twork/csr-partner-logo-item', { placeholderColor: '#fff3e0' } ],
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-csr-partners-section-editor csr-partners-section',
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
		zIndex: 2,
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(auto-fit, minmax(${ gridMinWidth }px, 1fr))`,
		gap: `${ gap }px`,
		alignItems: 'center',
		justifyItems: 'center',
		marginTop: showSectionTitle ? 0 : `${ titleMarginBottom }px`,
		'--logo-max-width': `${ logoMaxWidth }px`,
		'--logo-opacity': logoOpacity,
		'--logo-grayscale': logoGrayscale ? '100%' : '0%',
		'--logo-hover-opacity': logoHoverOpacity,
		'--logo-hover-scale': logoHoverScale,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section Title', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show Section Title',
								'twork-builder'
							) }
							checked={ showSectionTitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionTitle: val } )
							}
						/>

						{ showSectionTitle && (
							<>
								<TextControl
									label={ __(
										'Title Text',
										'twork-builder'
									) }
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
								/>

								<PanelColorSettings
									title={ __(
										'Title Color',
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
												'Title Color',
												'twork-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Font Size (rem)',
										'twork-builder'
									) }
									value={ sectionTitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontSize: val,
										} )
									}
									min={ 0.7 }
									max={ 2 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Font Weight',
										'twork-builder'
									) }
									value={ sectionTitleFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontWeight: val,
										} )
									}
									min={ 100 }
									max={ 900 }
									step={ 100 }
								/>

								<SelectControl
									label={ __(
										'Text Transform',
										'twork-builder'
									) }
									value={ sectionTitleTextTransform }
									options={ [
										{
											label: __(
												'None',
												'twork-builder'
											),
											value: 'none',
										},
										{
											label: __(
												'Uppercase',
												'twork-builder'
											),
											value: 'uppercase',
										},
										{
											label: __(
												'Lowercase',
												'twork-builder'
											),
											value: 'lowercase',
										},
										{
											label: __(
												'Capitalize',
												'twork-builder'
											),
											value: 'capitalize',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleTextTransform: val,
										} )
									}
								/>

								<RangeControl
									label={ __(
										'Letter Spacing (px)',
										'twork-builder'
									) }
									value={ sectionTitleLetterSpacing }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleLetterSpacing: val,
										} )
									}
									min={ 0 }
									max={ 8 }
									step={ 1 }
								/>

								<SelectControl
									label={ __( 'Alignment', 'twork-builder' ) }
									value={ sectionTitleAlignment }
									options={ [
										{
											label: __(
												'Left',
												'twork-builder'
											),
											value: 'left',
										},
										{
											label: __(
												'Center',
												'twork-builder'
											),
											value: 'center',
										},
										{
											label: __(
												'Right',
												'twork-builder'
											),
											value: 'right',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleAlignment: val,
										} )
									}
								/>

								<RangeControl
									label={ __(
										'Title Margin Bottom (px)',
										'twork-builder'
									) }
									value={ titleMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											titleMarginBottom: val,
										} )
									}
									min={ 20 }
									max={ 120 }
									step={ 5 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Layout Settings', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Min Logo Width (px)',
								'twork-builder'
							) }
							value={ gridMinWidth }
							onChange={ ( val ) =>
								setAttributes( { gridMinWidth: val } )
							}
							min={ 80 }
							max={ 300 }
							step={ 10 }
							help={ __(
								'Minimum width per grid cell',
								'twork-builder'
							) }
						/>

						<RangeControl
							label={ __(
								'Gap Between Logos (px)',
								'twork-builder'
							) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 10 }
							max={ 80 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Logo Max Width (px)',
								'twork-builder'
							) }
							value={ logoMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { logoMaxWidth: val } )
							}
							min={ 80 }
							max={ 250 }
							step={ 10 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Logo Styling', 'twork-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Logo Opacity', 'twork-builder' ) }
							value={ logoOpacity }
							onChange={ ( val ) =>
								setAttributes( { logoOpacity: val } )
							}
							min={ 0.3 }
							max={ 1 }
							step={ 0.1 }
						/>

						<ToggleControl
							label={ __(
								'Grayscale (color on hover)',
								'twork-builder'
							) }
							checked={ logoGrayscale }
							onChange={ ( val ) =>
								setAttributes( { logoGrayscale: val } )
							}
							help={ __(
								'Logos in grayscale by default, full color on hover.',
								'twork-builder'
							) }
						/>

						<Divider />
						<RangeControl
							label={ __( 'Hover Opacity', 'twork-builder' ) }
							value={ logoHoverOpacity }
							onChange={ ( val ) =>
								setAttributes( { logoHoverOpacity: val } )
							}
							min={ 0.8 }
							max={ 1 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Hover Scale', 'twork-builder' ) }
							value={ logoHoverScale }
							onChange={ ( val ) =>
								setAttributes( { logoHoverScale: val } )
							}
							min={ 1 }
							max={ 1.3 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Container Settings', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Max Width (px)', 'twork-builder' ) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1920 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container Padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 100 }
							step={ 5 }
						/>

						<Divider />
						<RangeControl
							label={ __(
								'Section Padding Top (px)',
								'twork-builder'
							) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Section Padding Bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Background', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Background Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __(
										'Background Color',
										'twork-builder'
									),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable Scroll Animation',
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
									'Animation Type',
									'twork-builder'
								) }
								value={ animationType }
								options={ [
									{
										label: __(
											'Fade In Up',
											'twork-builder'
										),
										value: 'fadeInUp',
									},
									{
										label: __( 'Fade In', 'twork-builder' ),
										value: 'fadeIn',
									},
									{
										label: __(
											'Slide In Left',
											'twork-builder'
										),
										value: 'slideInLeft',
									},
									{
										label: __(
											'Slide In Right',
											'twork-builder'
										),
										value: 'slideInRight',
									},
									{
										label: __( 'Zoom In', 'twork-builder' ),
										value: 'zoomIn',
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

			<section
				{ ...blockProps }
				data-animation={ animationOnScroll }
				data-animation-type={ animationType }
			>
				<div className="jivaka-container" style={ containerStyle }>
					{ showSectionTitle && (
						<RichText
							tagName="h3"
							value={ sectionTitle }
							onChange={ ( val ) =>
								setAttributes( { sectionTitle: val } )
							}
							placeholder={ __(
								'In Collaboration With',
								'twork-builder'
							) }
							className="csr-partners-title"
							style={ {
								textAlign: sectionTitleAlignment,
								color: sectionTitleColor,
								fontWeight: sectionTitleFontWeight,
								fontSize: `${ sectionTitleFontSize }rem`,
								textTransform: sectionTitleTextTransform,
								letterSpacing: `${ sectionTitleLetterSpacing }px`,
								margin: `0 0 ${ titleMarginBottom }px 0`,
							} }
						/>
					) }
					<div
						className={ `logo-grid${
							animationOnScroll ? ' fade-up' : ''
						} twork-csr-partners-grid` }
						style={ gridStyle }
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
