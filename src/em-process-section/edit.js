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

const ALLOWED_BLOCKS = [ 'twork/em-process-step' ];

const TEMPLATE = [
	[
		'twork/em-process-step',
		{
			stepNumber: '1',
			title: 'Arrival',
			description: 'Ambulance or walk-in.',
		},
	],

	[
		'twork/em-process-step',
		{
			stepNumber: '2',
			title: 'Triage',
			description: 'Quick severity assessment.',
		},
	],

	[
		'twork/em-process-step',
		{
			stepNumber: '3',
			title: 'Diagnosis',
			description: 'Rapid labs and imaging.',
		},
	],

	[
		'twork/em-process-step',
		{
			stepNumber: '4',
			title: 'Treatment',
			description: 'Surgery or ICU admission.',
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
		columns,
		showSectionHeader,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		headerMaxWidth,
		headerMarginBottom,
		animationOnScroll,
		animationType,
		animationDelay,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-em-process-section-editor em-section',
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

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(${ columns }, 1fr)`,
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
								<TextControl
									label={ __( 'Subtitle', 'twork-builder' ) }
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
													sectionSubtitleColor: val,
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
											sectionSubtitleFontSize: val,
										} )
									}
									min={ 0.8 }
									max={ 1.3 }
									step={ 0.05 }
								/>

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
						title={ __( 'Process grid', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Columns (desktop)', 'twork-builder' ) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 6 }
							step={ 1 }
						/>

						<RangeControl
							label={ __(
								'Gap between steps (px)',
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
							<>
								<SelectControl
									label={ __(
										'Animation type',
										'twork-builder'
									) }
									value={ animationType }
									options={ [
										{
											label: __(
												'Fade up',
												'twork-builder'
											),
											value: 'fade-up',
										},
										{
											label: __(
												'Fade in',
												'twork-builder'
											),
											value: 'fadeIn',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { animationType: val } )
									}
								/>

								<RangeControl
									label={ __(
										'Stagger delay per step (ms)',
										'twork-builder'
									) }
									value={ animationDelay }
									onChange={ ( val ) =>
										setAttributes( { animationDelay: val } )
									}
									min={ 0 }
									max={ 400 }
									step={ 50 }
								/>
							</>
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
									'Our Emergency Process',
									'twork-builder'
								) }
								style={ {
									fontSize: `${ sectionTitleFontSize }rem`,
									fontWeight: sectionTitleFontWeight,
									color: sectionTitleColor,
									marginBottom: 15,
									marginTop: 0,
								} }
							/>

							<RichText
								tagName="p"
								value={ sectionSubtitle }
								onChange={ ( val ) =>
									setAttributes( { sectionSubtitle: val } )
								}
								placeholder={ __(
									'We prioritize speed and precision.',
									'twork-builder'
								) }
								style={ {
									fontSize: `${ sectionSubtitleFontSize }rem`,
									color: sectionSubtitleColor,
									margin: 0,
								} }
							/>
						</div>
					) }
					<div
						className="em-process-grid"
						style={ gridStyle }
						data-columns={ columns }
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
