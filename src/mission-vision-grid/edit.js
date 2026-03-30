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
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/mission-vision-item' ];
const TEMPLATE = [
	[
		'twork/mission-vision-item',
		{
			iconType: 'dashicon',
			iconValue: 'dashicons-bullseye',
			title: 'Our Mission',
		},
	],

	[
		'twork/mission-vision-item',
		{
			iconType: 'dashicon',
			iconValue: 'dashicons-visibility',
			title: 'Our Vision',
		},
	],

	[
		'twork/mission-vision-item',
		{
			iconType: 'dashicon',
			iconValue: 'dashicons-heart',
			title: 'Our Values',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		containerMaxWidth,
		containerPadding,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-mv-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ backgroundColor, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
	};

	const gridStyle = {
		'--mv-columns-desktop': columns,
		'--mv-columns-tablet': columnsTablet,
		'--mv-columns-mobile': columnsMobile,
		'--mv-grid-gap': `${ gap }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __(
							'Section Background & Spacing',
							'twork-builder'
						) }
						initialOpen={ true }
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

						<Divider />

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
					</PanelBody>

					<PanelBody
						title={ __( 'Layout Settings', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Columns (Desktop)', 'twork-builder' ) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 4 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Columns (Tablet)', 'twork-builder' ) }
							value={ columnsTablet }
							onChange={ ( val ) =>
								setAttributes( { columnsTablet: val } )
							}
							min={ 1 }
							max={ 3 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Columns (Mobile)', 'twork-builder' ) }
							value={ columnsMobile }
							onChange={ ( val ) =>
								setAttributes( { columnsMobile: val } )
							}
							min={ 1 }
							max={ 2 }
							step={ 1 }
						/>

						<Divider />

						<RangeControl
							label={ __(
								'Gap Between Cards (px)',
								'twork-builder'
							) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
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
								'Horizontal Padding (px)',
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
					</PanelBody>

					<PanelBody
						title={ __( 'Section Header', 'twork-builder' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __(
								'Show Section Title',
								'twork-builder'
							) }
							value={ showSectionTitle ? 'yes' : 'no' }
							options={ [
								{
									label: __( 'Show', 'twork-builder' ),
									value: 'yes',
								},
								{
									label: __( 'Hide', 'twork-builder' ),
									value: 'no',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( {
									showSectionTitle: val === 'yes',
								} )
							}
						/>

						{ showSectionTitle && (
							<>
								<RichText
									tagName="h2"
									className="section-title"
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									placeholder={ __(
										'Section title…',
										'twork-builder'
									) }
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
										'Title Font Size (rem)',
										'twork-builder'
									) }
									value={ sectionTitleFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											sectionTitleFontSize: val,
										} )
									}
									min={ 1.5 }
									max={ 4 }
									step={ 0.1 }
								/>

								<RangeControl
									label={ __(
										'Title Font Weight',
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
							</>
						) }

						<Divider />

						<SelectControl
							label={ __(
								'Show Section Subtitle',
								'twork-builder'
							) }
							value={ showSectionSubtitle ? 'yes' : 'no' }
							options={ [
								{
									label: __( 'Show', 'twork-builder' ),
									value: 'yes',
								},
								{
									label: __( 'Hide', 'twork-builder' ),
									value: 'no',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( {
									showSectionSubtitle: val === 'yes',
								} )
							}
						/>

						{ showSectionSubtitle && (
							<>
								<RichText
									tagName="p"
									className="section-subtitle"
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
									placeholder={ __(
										'Section subtitle…',
										'twork-builder'
									) }
								/>

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
										'Subtitle Font Size (rem)',
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
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="jivaka-container" style={ containerStyle }>
					{ ( showSectionTitle || showSectionSubtitle ) && (
						<div className="section-header">
							{ showSectionTitle && (
								<RichText
									tagName="h2"
									className="section-title"
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									style={ {
										color: sectionTitleColor,
										fontSize: `${ sectionTitleFontSize }rem`,
										fontWeight: sectionTitleFontWeight,
									} }
								/>
							) }

							{ showSectionSubtitle && (
								<RichText
									tagName="p"
									className="section-subtitle"
									value={ sectionSubtitle }
									onChange={ ( val ) =>
										setAttributes( {
											sectionSubtitle: val,
										} )
									}
									style={ {
										color: sectionSubtitleColor,
										fontSize: `${ sectionSubtitleFontSize }rem`,
									} }
								/>
							) }
						</div>
					) }

					<div className="mv-grid" style={ gridStyle }>
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
