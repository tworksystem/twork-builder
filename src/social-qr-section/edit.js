import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
	Button,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';
const ALLOWED_BLOCKS = [ 'twork/social-qr-item' ];

const TEMPLATE = [
	[
		'twork/social-qr-item',
		{
			platform: 'facebook',
			footerLabel: 'https://www.facebook.com/jivakahospital',
			buttonText: 'Visit Facebook',
			buttonUrl: 'https://www.facebook.com/jivakahospital',
		},
	],
	[
		'twork/social-qr-item',
		{
			platform: 'instagram',
			footerLabel: 'https://www.instagram.com/jivakahospital/',
			buttonText: 'Visit Instagram',
			buttonUrl: 'https://www.instagram.com/jivakahospital/',
		},
	],
	[
		'twork/social-qr-item',
		{
			platform: 'tiktok',
			footerLabel: 'https://tiktok.me/@jivaka.hospital',
			buttonText: 'Visit TikTok',
			buttonUrl: 'https://tiktok.me/@jivaka.hospital',
		},
	],
	[
		'twork/social-qr-item',
		{
			platform: 'viber',
			footerLabel: 'Jivaka Hospital',
			buttonText: 'Chat on Viber',
			buttonUrl: '',
		},
	],
	[
		'twork/social-qr-item',
		{
			platform: 'telegram',
			footerLabel: 'Jivaka Hospital',
			buttonText: 'Chat on Telegram',
			buttonUrl: '',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionBgColor,
		paddingTop,
		paddingBottom,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		gridMarginTop,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		sectionTitleAlignment,
		showSectionSubtitle,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		sectionHeaderMaxWidth,
		sectionHeaderMarginBottom,
		containerMaxWidth,
		containerPadding,
		showHospitalLogo,
		hospitalLogoUrl,
		hospitalLogoId,
		cardWatermarkUrl,
		cardWatermarkId,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'mk-social-qr-section-editor',
			style: {
				backgroundColor: sectionBgColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ paddingBottom, paddingTop, sectionBgColor ]
	);

	const gridStyle = {
		'--grid-columns': columns,
		'--grid-gap': `${ gap }px`,
		'--hospital-logo-url': hospitalLogoUrl
			? `url(${ hospitalLogoUrl })`
			: 'none',
		'--card-watermark-url': cardWatermarkUrl
			? `url(${ cardWatermarkUrl })`
			: 'none',
		display: 'grid',
		gridTemplateColumns: `repeat(${ columns }, 1fr)`,
		gap: `${ gap }px`,
		marginTop: `${ gridMarginTop }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Header & Description', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Header', 'twork-builder' ) }
							checked={ showSectionTitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionTitle: val } )
							}
							help={ __(
								'Toggle On to display the section heading above the QR grid.',
								'twork-builder'
							) }
						/>

						{ showSectionTitle && (
							<>
								<TextControl
									label={ __(
										'Header Text',
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
									min={ 1.2 }
									max={ 3 }
									step={ 0.1 }
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
								'Show Description',
								'twork-builder'
							) }
							checked={ showSectionSubtitle }
							onChange={ ( val ) =>
								setAttributes( { showSectionSubtitle: val } )
							}
							help={ __(
								'Toggle On to display the section description below the header.',
								'twork-builder'
							) }
						/>

						{ showSectionSubtitle && (
							<>
								<TextControl
									label={ __(
										'Description Text',
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
										'Description Color',
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
									min={ 0.8 }
									max={ 2 }
									step={ 0.05 }
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Grid Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Columns (Desktop)', 'twork-builder' ) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 6 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Columns (Tablet)', 'twork-builder' ) }
							value={ columnsTablet }
							onChange={ ( val ) =>
								setAttributes( { columnsTablet: val } )
							}
							min={ 1 }
							max={ 4 }
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

						<RangeControl
							label={ __( 'Gap (px)', 'twork-builder' ) }
							value={ gap }
							onChange={ ( val ) => setAttributes( { gap: val } ) }
							min={ 8 }
							max={ 48 }
							step={ 2 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Card Branding', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show Hospital Logo on Cards',
								'twork-builder'
							) }
							checked={ showHospitalLogo }
							onChange={ ( val ) =>
								setAttributes( { showHospitalLogo: val } )
							}
						/>

						<BaseControl
							label={ __( 'Hospital Logo', 'twork-builder' ) }
						>
							{ ! hospitalLogoUrl ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											hospitalLogoUrl: media.url,
											hospitalLogoId: media.id,
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Hospital Logo',
											'twork-builder'
										),
									} }
								/>
							) : (
								<div>
									<img
										src={ hospitalLogoUrl }
										alt=""
										style={ {
											maxWidth: '80px',
											height: 'auto',
											marginBottom: '10px',
										} }
									/>

									<Button
										isSecondary
										onClick={ () =>
											setAttributes( {
												hospitalLogoUrl: '',
												hospitalLogoId: undefined,
											} )
										}
									>
										{ __( 'Remove Logo', 'twork-builder' ) }
									</Button>
								</div>
							) }
						</BaseControl>

						<Divider />

						<BaseControl
							label={ __(
								'Card Watermark Image',
								'twork-builder'
							) }
						>
							{ ! cardWatermarkUrl ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											cardWatermarkUrl: media.url,
											cardWatermarkId: media.id,
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Watermark',
											'twork-builder'
										),
									} }
								/>
							) : (
								<div>
									<img
										src={ cardWatermarkUrl }
										alt=""
										style={ {
											maxWidth: '100%',
											height: 'auto',
											marginBottom: '10px',
											borderRadius: '6px',
										} }
									/>

									<Button
										isSecondary
										onClick={ () =>
											setAttributes( {
												cardWatermarkUrl: '',
												cardWatermarkId: undefined,
											} )
										}
									>
										{ __(
											'Remove Watermark',
											'twork-builder'
										) }
									</Button>
								</div>
							) }
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Container & Padding', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Background', 'twork-builder' ) }
							colorSettings={ [
								{
									value: sectionBgColor,
									onChange: ( val ) =>
										setAttributes( {
											sectionBgColor: val,
										} ),
									label: __(
										'Section Background',
										'twork-builder'
									),
								},
							] }
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
							max={ 1920 }
							step={ 10 }
						/>

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
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="jivaka-container"
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						margin: '0 auto',
						padding: `0 ${ containerPadding }px`,
					} }
				>
					{ ( showSectionTitle || showSectionSubtitle ) && (
						<div
							className="section-header"
							style={ {
								textAlign: sectionTitleAlignment,
								maxWidth: `${ sectionHeaderMaxWidth }px`,
								margin: `0 auto ${ sectionHeaderMarginBottom }px`,
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
										'Header text...',
										'twork-builder'
									) }
									style={ {
										fontSize: `${ sectionTitleFontSize }rem`,
										fontWeight: sectionTitleFontWeight,
										color: sectionTitleColor,
										marginBottom: showSectionSubtitle
											? '10px'
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
										'Description text...',
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
						className="mk-social-qr-grid social-qr-grid"
						style={ gridStyle }
						data-columns={ columns }
						data-columns-tablet={ columnsTablet }
						data-columns-mobile={ columnsMobile }
						data-show-hospital-logo={ showHospitalLogo }
						data-hospital-logo={ hospitalLogoUrl || '' }
						data-card-watermark={ cardWatermarkUrl || '' }
					>
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
