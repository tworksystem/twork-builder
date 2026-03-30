import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/tele-process-card' ];
const TEMPLATE = [
	[
		'twork/tele-process-card',
		{
			stepNumber: 1,
			iconClass: 'fas fa-user-md',
			title: 'Choose Doctor',
			description:
				'Select a specialist from our list and view their available online schedules.',
		},
	],

	[
		'twork/tele-process-card',
		{
			stepNumber: 2,
			iconClass: 'fas fa-calendar-check',
			title: 'Book Slot',
			description:
				'Pick a time that works for you and make a secure online payment.',
		},
	],

	[
		'twork/tele-process-card',
		{
			stepNumber: 3,
			iconClass: 'fas fa-link',
			title: 'Get Link',
			description:
				'Receive a secure encrypted video meeting link via SMS or Email.',
		},
	],

	[
		'twork/tele-process-card',
		{
			stepNumber: 4,
			iconClass: 'fas fa-file-prescription',
			title: 'Consultation',
			description:
				'See the doctor and get your digital prescription instantly in the app.',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionPaddingTop,
		sectionPaddingBottom,
		containerMaxWidth,
		containerPadding,
		gridGap,
		minItemWidth,
		sectionAnchor,
		backgroundColor,
		showSectionTitle,
		sectionTitle,
		sectionSubtitle,
		sectionTitleColor,
		sectionSubtitleColor,
		sectionTitleAlignment,
		sectionTitleFontSize,
		sectionSubtitleFontSize,
		sectionHeaderMarginBottom,
		useHeaderFadeUp,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-tele-process-section-editor',
			style: {
				paddingTop: `${ sectionPaddingTop }px`,
				paddingBottom: `${ sectionPaddingBottom }px`,
				backgroundColor: backgroundColor || '#fff',
				position: 'relative',
				zIndex: 5,
			},
		} ),
		[ backgroundColor, sectionPaddingBottom, sectionPaddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(auto-fit, minmax(${ minItemWidth }px, 1fr))`,
		gap: `${ gridGap }px`,
	};

	const headerStyle = {
		textAlign: sectionTitleAlignment,
		marginBottom: `${ sectionHeaderMarginBottom }px`,
		maxWidth: '700px',
		marginLeft: sectionTitleAlignment === 'center' ? 'auto' : undefined,
		marginRight: sectionTitleAlignment === 'center' ? 'auto' : undefined,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Content', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show section header',
								'twork-builder'
							) }
							checked={ showSectionTitle || !! sectionSubtitle }
							onChange={ ( val ) =>
								setAttributes(
									val
										? { showSectionTitle: true }
										: {
												showSectionTitle: false,
												sectionSubtitle: '',
										  }
								)
							}
							help={ __(
								'Display a title and optional description above the process cards.',
								'twork-builder'
							) }
						/>

						{ ( showSectionTitle || sectionSubtitle ) && (
							<>
								<p
									style={ {
										margin: '0 0 12px 0',
										fontSize: '12px',
										color: '#757575',
									} }
								>
									{ __(
										'Click the title or description in the preview to edit directly.',
										'twork-builder'
									) }
								</p>
								<TextControl
									label={ __(
										'Title (or edit in preview)',
										'twork-builder'
									) }
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									placeholder={ __(
										'How It Works',
										'twork-builder'
									) }
								/>

								<TextControl
									label={ __(
										'Description (or edit in preview)',
										'twork-builder'
									) }
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
									placeholder={ __(
										'Optional intro text…',
										'twork-builder'
									) }
									help={ __(
										'Optional. You can also click "Add description…" in the preview to type.',
										'twork-builder'
									) }
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

								<ToggleControl
									label={ __(
										'Add fade-up class (for GSAP)',
										'twork-builder'
									) }
									checked={ useHeaderFadeUp }
									onChange={ ( val ) =>
										setAttributes( {
											useHeaderFadeUp: val,
										} )
									}
								/>
							</>
						) }
					</PanelBody>
					<PanelBody
						title={ __(
							'Title & Description styling',
							'twork-builder'
						) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Title color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: sectionTitleColor,
									onChange: ( val ) =>
										setAttributes( {
											sectionTitleColor: val || '#212121',
										} ),
									label: __( 'Title', 'twork-builder' ),
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
								setAttributes( { sectionTitleFontSize: val } )
							}
							min={ 1.2 }
							max={ 4 }
							step={ 0.1 }
						/>

						<Divider />
						<PanelColorSettings
							title={ __( 'Description color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: sectionSubtitleColor,
									onChange: ( val ) =>
										setAttributes( {
											sectionSubtitleColor:
												val || '#555555',
										} ),
									label: __( 'Description', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Description font size (rem)',
								'twork-builder'
							) }
							value={ sectionSubtitleFontSize }
							onChange={ ( val ) =>
								setAttributes( {
									sectionSubtitleFontSize: val,
								} )
							}
							min={ 0.9 }
							max={ 1.5 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __(
								'Header margin bottom (px)',
								'twork-builder'
							) }
							value={ sectionHeaderMarginBottom }
							onChange={ ( val ) =>
								setAttributes( {
									sectionHeaderMarginBottom: val,
								} )
							}
							min={ 24 }
							max={ 100 }
							step={ 4 }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Section', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Section anchor ID', 'twork-builder' ) }
							value={ sectionAnchor }
							onChange={ ( val ) =>
								setAttributes( {
									sectionAnchor: val || 'how-it-works',
								} )
							}
							help={ __(
								'Used for #how-it-works link. Leave empty to use block anchor.',
								'twork-builder'
							) }
						/>

						<PanelColorSettings
							title={ __( 'Background Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val || '#ffffff',
										} ),
									label: __( 'Background', 'twork-builder' ),
								},
							] }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Grid', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Gap Between Cards (px)',
								'twork-builder'
							) }
							value={ gridGap }
							onChange={ ( val ) =>
								setAttributes( { gridGap: val } )
							}
							min={ 16 }
							max={ 50 }
							step={ 2 }
						/>

						<RangeControl
							label={ __(
								'Min Card Width (px)',
								'twork-builder'
							) }
							value={ minItemWidth }
							onChange={ ( val ) =>
								setAttributes( { minItemWidth: val } )
							}
							min={ 200 }
							max={ 400 }
							step={ 10 }
							help={ __(
								'Used for auto-fit grid: minmax(minItemWidth, 1fr)',
								'twork-builder'
							) }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Section & Container', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Section Padding Top (px)',
								'twork-builder'
							) }
							value={ sectionPaddingTop }
							onChange={ ( val ) =>
								setAttributes( { sectionPaddingTop: val } )
							}
							min={ 40 }
							max={ 160 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Section Padding Bottom (px)',
								'twork-builder'
							) }
							value={ sectionPaddingBottom }
							onChange={ ( val ) =>
								setAttributes( { sectionPaddingBottom: val } )
							}
							min={ 40 }
							max={ 160 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1600 }
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
							min={ 12 }
							max={ 60 }
							step={ 4 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps } id={ sectionAnchor || undefined }>
				<div className="jivaka-container" style={ containerStyle }>
					{ ( showSectionTitle || sectionSubtitle ) && (
						<div
							className={ `section-header process-section-header ${
								useHeaderFadeUp ? 'fade-up' : ''
							}` }
							style={ headerStyle }
						>
							{ showSectionTitle && (
								<RichText
									tagName="h2"
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									placeholder={ __(
										'How It Works',
										'twork-builder'
									) }
									allowedFormats={ [] }
									style={ {
										fontSize: `${ sectionTitleFontSize }rem`,
										color: sectionTitleColor,
										marginBottom: sectionSubtitle
											? '12px'
											: '0',
									} }
								/>
							) }
							<RichText
								tagName="p"
								value={ sectionSubtitle }
								onChange={ ( val ) =>
									setAttributes( { sectionSubtitle: val } )
								}
								placeholder={ __(
									'Add description…',
									'twork-builder'
								) }
								allowedFormats={ [
									'core/bold',
									'core/italic',
								] }
								style={ {
									fontSize: `${ sectionSubtitleFontSize }rem`,
									color: sectionSubtitleColor,
									margin: 0,
									minHeight: '1.5em',
								} }
							/>
						</div>
					) }
					<div className="process-grid" style={ gridStyle }>
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
