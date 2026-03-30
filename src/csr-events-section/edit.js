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
		sectionTitleAlignment,
		sectionTitleMarginBottom,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		sectionSubtitleMarginBottom,
		containerMaxWidth,
		containerPadding,
		paddingTopMobile = 60,
		paddingBottomMobile = 60,
		containerPaddingMobile = 20,
		animationOnScroll,
		animationDelay,
	} = attributes;

	const ALLOWED_BLOCKS = [ 'twork/csr-event-item' ];
	const TEMPLATE = [
		[
			'twork/csr-event-item',
			{
				dateDay: '15',
				dateMonth: 'Nov',
				title: 'Free Eye Check-up Camp',
				location: 'Kyaukse Township',
				time: '8:00 AM – 4:00 PM',
				buttonText: 'Volunteer',
			},
		],

		[
			'twork/csr-event-item',
			{
				dateDay: '05',
				dateMonth: 'Dec',
				title: 'Annual Blood Donation Drive',
				location: 'Jivaka Hospital Main Hall',
				time: '9:00 AM – 3:00 PM',
				buttonText: 'Register',
			},
		],
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-csr-events-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				position: 'relative',
				'--padding-top-mobile': `${ paddingTopMobile }px`,
				'--padding-bottom-mobile': `${ paddingBottomMobile }px`,
				'--container-padding-mobile': `${ containerPaddingMobile }px`,
			},
		} ),
		[
			backgroundColor,
			containerPaddingMobile,
			paddingBottom,
			paddingBottomMobile,
			paddingTop,
			paddingTopMobile,
		]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
		zIndex: 2,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __(
							'Section Title & Subtitle',
							'twork-builder'
						) }
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
									min={ 1 }
									max={ 4 }
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
									min={ 300 }
									max={ 900 }
									step={ 100 }
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
									value={ sectionTitleMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleMarginBottom: val,
										} )
									}
									min={ 0 }
									max={ 50 }
									step={ 5 }
								/>
							</>
						) }
						<Divider />
						<ToggleControl
							label={ __(
								'Show Section Subtitle',
								'twork-builder'
							) }
							checked={ showSectionSubtitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionSubtitle: val } )
							}
						/>

						{ showSectionSubtitle && (
							<>
								<PanelColorSettings
									title={ __(
										'Subtitle Color',
										'twork-builder'
									) }
									colorSettings={ [
										{
											value: sectionSubtitleColor,
											onChange: ( val ) =>
												setAttributes( {
													sectionSubtitleColor: val,
												} ),
											label: __(
												'Subtitle Color',
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
									value={ sectionSubtitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitleFontSize: val,
										} )
									}
									min={ 0.8 }
									max={ 2 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Subtitle Margin Bottom (px)',
										'twork-builder'
									) }
									value={ sectionSubtitleMarginBottom }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitleMarginBottom: val,
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
						title={ __( 'Section Background', 'twork-builder' ) }
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
						title={ __( 'Container', 'twork-builder' ) }
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
							max={ 60 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Container Padding Mobile (px)',
								'twork-builder'
							) }
							value={ containerPaddingMobile }
							onChange={ ( val ) =>
								setAttributes( { containerPaddingMobile: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
							help={ __(
								'Used on smaller screens (e.g. mobile).',
								'twork-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Section Padding', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Padding Top (px)', 'twork-builder' ) }
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
								'Padding Bottom (px)',
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

						<RangeControl
							label={ __(
								'Padding Top Mobile (px)',
								'twork-builder'
							) }
							value={ paddingTopMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingTopMobile: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Bottom Mobile (px)',
								'twork-builder'
							) }
							value={ paddingBottomMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingBottomMobile: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
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
							<RangeControl
								label={ __(
									'Animation Delay (ms)',
									'twork-builder'
								) }
								value={ animationDelay }
								onChange={ ( val ) =>
									setAttributes( { animationDelay: val } )
								}
								min={ 0 }
								max={ 500 }
								step={ 50 }
							/>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div className="jivaka-container" style={ containerStyle }>
					{ ( showSectionTitle || showSectionSubtitle ) && (
						<div
							className="intro-text fade-up"
							style={ {
								textAlign: sectionTitleAlignment,
								maxWidth: '800px',
								margin: `0 auto ${ sectionSubtitleMarginBottom }px`,
							} }
						>
							{ showSectionTitle && (
								<RichText
									tagName="h2"
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									placeholder={ __(
										'Section Title...',
										'twork-builder'
									) }
									style={ {
										fontSize: `${ sectionTitleFontSize }rem`,
										fontWeight: sectionTitleFontWeight,
										color: sectionTitleColor,
										marginBottom: showSectionSubtitle
											? `${ sectionTitleMarginBottom }px`
											: '0',
									} }
								/>
							) }
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
										'Section Subtitle...',
										'twork-builder'
									) }
									style={ {
										fontSize: `${ sectionSubtitleFontSize }rem`,
										color: sectionSubtitleColor,
										margin: 0,
										lineHeight: 1.6,
									} }
								/>
							) }
						</div>
					) }

					<div className="csr-events-list">
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
