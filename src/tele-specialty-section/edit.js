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
	ToggleControl,
	TextControl,
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/tele-specialty-item' ];
const TEMPLATE = [
	[
		'twork/tele-specialty-item',
		{ iconClass: 'fas fa-stethoscope', title: 'General Medicine' },
	],

	[
		'twork/tele-specialty-item',
		{ iconClass: 'fas fa-allergies', title: 'Dermatology' },
	],

	[
		'twork/tele-specialty-item',
		{ iconClass: 'fas fa-baby', title: 'Pediatrics' },
	],

	[
		'twork/tele-specialty-item',
		{ iconClass: 'fas fa-brain', title: 'Psychology' },
	],

	[
		'twork/tele-specialty-item',
		{ iconClass: 'fas fa-female', title: 'Gynecology' },
	],

	[
		'twork/tele-specialty-item',
		{ iconClass: 'fas fa-carrot', title: 'Nutrition / Diet' },
	],

	[
		'twork/tele-specialty-item',
		{ iconClass: 'fas fa-heartbeat', title: 'Cardiology Follow-up' },
	],

	[
		'twork/tele-specialty-item',
		{ iconClass: 'fas fa-notes-medical', title: 'Report Review' },
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionPaddingTop,
		sectionPaddingBottom,
		containerMaxWidth,
		containerPadding,
		showSectionTitle,
		sectionTitle,
		sectionSubtitle,
		sectionTitleColor,
		sectionSubtitleColor,
		sectionTitleAlignment,
		sectionTitleFontSize,
		sectionSubtitleFontSize,
		sectionHeaderMarginBottom,
		gridGap,
		minItemWidth,
		useFadeUp,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-tele-specialty-section-editor',
			style: {
				paddingTop: `${ sectionPaddingTop }px`,
				paddingBottom: `${ sectionPaddingBottom }px`,
			},
		} ),
		[ sectionPaddingBottom, sectionPaddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	const headerStyle = {
		textAlign: sectionTitleAlignment,
		marginBottom: `${ sectionHeaderMarginBottom }px`,
		maxWidth: '700px',
		marginLeft: 'auto',
		marginRight: 'auto',
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(auto-fill, minmax(${ minItemWidth }px, 1fr))`,
		gap: `${ gridGap }px`,
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
									label={ __( 'Title', 'twork-builder' ) }
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
								/>

								<TextControl
									label={ __(
										'Description',
										'twork-builder'
									) }
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
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
							</>
						) }
						<Divider />
						<ToggleControl
							label={ __(
								'Add fade-up class (section header)',
								'twork-builder'
							) }
							checked={ useFadeUp }
							onChange={ ( val ) =>
								setAttributes( { useFadeUp: val } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Title & Description', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Title Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: sectionTitleColor,
									onChange: ( val ) =>
										setAttributes( {
											sectionTitleColor: val,
										} ),
									label: __( 'Title Color', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Title Font Size (rem)',
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
							title={ __( 'Description Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: sectionSubtitleColor,
									onChange: ( val ) =>
										setAttributes( {
											sectionSubtitleColor: val,
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
								'Header Margin Bottom (px)',
								'twork-builder'
							) }
							value={ sectionHeaderMarginBottom }
							onChange={ ( val ) =>
								setAttributes( {
									sectionHeaderMarginBottom: val,
								} )
							}
							min={ 30 }
							max={ 100 }
							step={ 5 }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Grid', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Gap Between Items (px)',
								'twork-builder'
							) }
							value={ gridGap }
							onChange={ ( val ) =>
								setAttributes( { gridGap: val } )
							}
							min={ 12 }
							max={ 50 }
							step={ 1 }
						/>

						<RangeControl
							label={ __(
								'Min Item Width (px)',
								'twork-builder'
							) }
							value={ minItemWidth }
							onChange={ ( val ) =>
								setAttributes( { minItemWidth: val } )
							}
							min={ 160 }
							max={ 320 }
							step={ 10 }
							help={ __(
								'Used for auto-fill grid: minmax(minItemWidth, 1fr)',
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
							max={ 200 }
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
							max={ 200 }
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

			<section { ...blockProps }>
				<div className="jivaka-container" style={ containerStyle }>
					{ ( showSectionTitle || sectionSubtitle ) && (
						<div
							className={ `section-header ${
								useFadeUp ? 'fade-up' : ''
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
										'Available for Tele-Consultation',
										'twork-builder'
									) }
									style={ {
										fontSize: `${ sectionTitleFontSize }rem`,
										color: sectionTitleColor,
										marginBottom: '15px',
									} }
								/>
							) }
							{ sectionSubtitle && (
								<RichText
									tagName="p"
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
									placeholder={ __(
										'Not all conditions require…',
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

					<div className="specialty-grid" style={ gridStyle }>
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
