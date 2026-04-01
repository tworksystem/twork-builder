import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	PanelColorSettings,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	BaseControl,
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/benefit-point' ];

const POINT_TEMPLATE = [
	[
		'twork/benefit-point',
		{
			slot: 1,
			badgeText: '01',
			pointText: 'Health From of the Earth',
		},
	],

	[
		'twork/benefit-point',
		{
			slot: 2,
			badgeText: '02',
			pointText: 'Rooted in Sustainable Growth',
		},
	],

	[
		'twork/benefit-point',
		{
			slot: 3,
			badgeText: '03',
			pointText: 'Technology Meets the Soil Flow',
		},
	],

	[
		'twork/benefit-point',
		{
			slot: 4,
			badgeText: '04',
			pointText: 'Fields of Shared Prosperity',
		},
	],

	[
		'twork/benefit-point',
		{
			slot: 5,
			badgeText: '05',
			pointText: 'Seeds Sprouting Sustainable',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerGutter,
		taglineIcon,
		taglineText,
		sectionTitle,
		taglineColor,
		taglineIconColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
		tractorImage,
		tractorAlt,
		tractorMaxWidth,
		stageMinHeight,
		waveDecorationUrl,
	} = attributes;

	const shapeVar = waveDecorationUrl
		? `url("${ String( waveDecorationUrl )
				.replace( /\\/g, '\\\\' )
				.replace( /"/g, '\\"' ) }")`
		: undefined;

	const blockProps = useStableBlockProps(
		() => ( {
			className: `twork-why-choose twork-why-choose-section-editor ${
				waveDecorationUrl ? 'has-wave-decoration' : ''
			}`,

			style: {
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				...( shapeVar
					? { '--twork-why-choose-shape': shapeVar }
					: {} ),
			},
		} ),
		[ paddingBottom, paddingTop, shapeVar, waveDecorationUrl ]
	);

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
	};

	const stageStyle = {
		minHeight: `${ stageMinHeight }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Header', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Tagline icon (emoji)',
								'twork-builder'
							) }
							value={ taglineIcon }
							onChange={ ( val ) =>
								setAttributes( { taglineIcon: val } )
							}
						/>

						<PanelColorSettings
							title={ __( 'Tagline', 'twork-builder' ) }
							colorSettings={ [
								{
									value: taglineColor,
									onChange: ( val ) =>
										setAttributes( { taglineColor: val } ),
									label: __( 'Text', 'twork-builder' ),
								},
								{
									value: taglineIconColor,
									onChange: ( val ) =>
										setAttributes( {
											taglineIconColor: val,
										} ),
									label: __( 'Icon tint', 'twork-builder' ),
								},
							] }
						/>

						<Divider />
						<PanelColorSettings
							title={ __( 'Title', 'twork-builder' ) }
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
							label={ __( 'Title size (rem)', 'twork-builder' ) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1.5 }
							max={ 4 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Title weight', 'twork-builder' ) }
							value={ titleFontWeight }
							onChange={ ( val ) =>
								setAttributes( { titleFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Tractor image', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Alt text', 'twork-builder' ) }
							value={ tractorAlt }
							onChange={ ( val ) =>
								setAttributes( { tractorAlt: val } )
							}
						/>

						<RangeControl
							label={ __( 'Max width (px)', 'twork-builder' ) }
							value={ tractorMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { tractorMaxWidth: val } )
							}
							min={ 280 }
							max={ 800 }
							step={ 10 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Stage', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Min height (px)', 'twork-builder' ) }
							value={ stageMinHeight }
							onChange={ ( val ) =>
								setAttributes( { stageMinHeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 10 }
						/>

						<RangeControl
							label={ __( 'Padding top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 160 }
							step={ 4 }
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
							min={ 0 }
							max={ 120 }
							step={ 4 }
						/>

						<RangeControl
							label={ __(
								'Content max width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 960 }
							max={ 1440 }
							step={ 10 }
						/>

						<RangeControl
							label={ __( 'Side gutter (px)', 'twork-builder' ) }
							value={ containerGutter }
							onChange={ ( val ) =>
								setAttributes( { containerGutter: val } )
							}
							min={ 12 }
							max={ 48 }
							step={ 2 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Bottom decoration', 'twork-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __(
								'Wave / shape image (optional)',
								'twork-builder'
							) }
							help={ __(
								'Uses theme asset e.g. shape-12.webp, or upload any wide strip.',
								'twork-builder'
							) }
						>
							{ ! waveDecorationUrl ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											waveDecorationUrl: media.url,
											waveDecorationId: media.id,
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Decoration image',
											'twork-builder'
										),
									} }
								/>
							) : (
								<div>
									<img
										src={ waveDecorationUrl }
										alt=""
										style={ {
											width: '100%',
											maxHeight: 80,
											objectFit: 'contain',
										} }
									/>

									<Button
										isSecondary
										isSmall
										onClick={ () =>
											setAttributes( {
												waveDecorationUrl: '',
												waveDecorationId: null,
											} )
										}
									>
										{ __( 'Remove', 'twork-builder' ) }
									</Button>
								</div>
							) }
						</BaseControl>
					</PanelBody>
				</InspectorControls>
			) }

			<section
				{ ...blockProps }
				aria-labelledby="twork-why-choose-title"
			>
				<div
					className="twork-why-choose__container"
					style={ containerStyle }
				>
					<div className="twork-why-choose__header">
						<p
							className="twork-why-choose__tagline"
							style={ { color: taglineColor } }
						>
							<span
								className="twork-why-choose__tagline-icon"
								style={ { color: taglineIconColor } }
								aria-hidden="true"
							>
								{ taglineIcon }
							</span>
							<RichText
								tagName="span"
								value={ taglineText }
								onChange={ ( val ) =>
									setAttributes( { taglineText: val } )
								}
								placeholder={ __(
									'Why Choose Our Farm',
									'twork-builder'
								) }
								allowedFormats={ [] }
							/>
						</p>
						<RichText
							tagName="h2"
							id="twork-why-choose-title"
							className="twork-why-choose__title"
							value={ sectionTitle }
							onChange={ ( val ) =>
								setAttributes( { sectionTitle: val } )
							}
							placeholder={ __( 'Title…', 'twork-builder' ) }
							style={ {
								color: titleColor,
								fontSize: `${ titleFontSize }rem`,
								fontWeight: titleFontWeight,
							} }
						/>
					</div>

					<div
						className="twork-why-choose__stage twork-why-choose__stage-editor"
						style={ stageStyle }
					>
						<div className="twork-why-choose__tractor-wrapper">
							{ ! tractorImage ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											tractorImage: media.url,
											tractorImageId: media.id,
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Tractor image',
											'twork-builder'
										),
									} }
								/>
							) : (
								<img
									src={ tractorImage }
									className="twork-why-choose__tractor"
									alt=""
									style={ {
										maxWidth: `${ tractorMaxWidth }px`,
									} }
								/>
							) }
						</div>

						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ POINT_TEMPLATE }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
