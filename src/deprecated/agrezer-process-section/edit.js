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

const ALLOWED_BLOCKS = [
	'twork/agrezer-process-step',
	'twork/agrezer-process-center',
];

const TEMPLATE = [
	[
		'twork/agrezer-process-step',
		{
			position: 'left',
			badgeNum: '01',
			stepTitle: 'Data-Driven Agricultural',
			stepText:
				'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
			showCta: true,
			ctaText: 'More Details',
			ctaUrl: '#',
		},
	],

	[
		'twork/agrezer-process-center',
		{
			alt: 'Process Wheel',
		},
	],

	[
		'twork/agrezer-process-step',
		{
			position: 'right',
			badgeNum: '02',
			stepTitle: 'Planting Material',
			stepText:
				'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
			showCta: false,
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerGutter,
		gridGap,
		taglineIcon,
		taglineText,
		sectionTitle,
		taglineColor,
		taglineIconColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
		wreathDecorationUrl,
	} = attributes;

	const wreathVar = wreathDecorationUrl
		? `url("${ String( wreathDecorationUrl )
				.replace( /\\/g, '\\\\' )
				.replace( /"/g, '\\"' ) }")`
		: undefined;

	const blockProps = useStableBlockProps(
		() => ( {
			className: `agrezer-process twork-agrezer-process-section-editor ${
				wreathDecorationUrl ? 'has-process-wreath' : ''
			}`,

			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--agrezer-process-grid-gap': `${ gridGap }px`,
				...( wreathVar
					? { '--agrezer-process-wreath': wreathVar }
					: {} ),
			},
		} ),
		[
			backgroundColor,
			gridGap,
			paddingBottom,
			paddingTop,
			wreathDecorationUrl,
			wreathVar,
		]
	);

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
		gap: `${ gridGap }px`,
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
									label: __( 'Icon', 'twork-builder' ),
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
						title={ __( 'Badge wreath', 'twork-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __(
								'Wreath image (optional)',
								'twork-builder'
							) }
							help={ __(
								'Upload wreath.png-style graphic behind step numbers.',
								'twork-builder'
							) }
						>
							{ ! wreathDecorationUrl ? (
								<MediaPlaceholder
									onSelect={ ( media ) =>
										setAttributes( {
											wreathDecorationUrl: media.url,
											wreathDecorationId: media.id,
										} )
									}
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Wreath decoration',
											'twork-builder'
										),
									} }
								/>
							) : (
								<div>
									<img
										src={ wreathDecorationUrl }
										alt=""
										style={ {
											maxWidth: '100%',
											maxHeight: 100,
											objectFit: 'contain',
										} }
									/>

									<Button
										isSecondary
										isSmall
										onClick={ () =>
											setAttributes( {
												wreathDecorationUrl: '',
												wreathDecorationId: null,
											} )
										}
									>
										{ __( 'Remove', 'twork-builder' ) }
									</Button>
								</div>
							) }
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Background', 'twork-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __(
										'Section background',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Grid gap (px)', 'twork-builder' ) }
							value={ gridGap }
							onChange={ ( val ) =>
								setAttributes( { gridGap: val } )
							}
							min={ 16 }
							max={ 48 }
							step={ 2 }
						/>

						<RangeControl
							label={ __( 'Max width (px)', 'twork-builder' ) }
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
							max={ 160 }
							step={ 4 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps } aria-labelledby="agrezer-process-title">
				<div className="agrezer-process__header">
					<p
						className="agrezer-process__tagline"
						style={ { color: taglineColor } }
					>
						<span
							className="agrezer-process__tagline-icon"
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
								'Agri Intelligence',
								'twork-builder'
							) }
							allowedFormats={ [] }
						/>
					</p>
					<RichText
						tagName="h2"
						id="agrezer-process-title"
						className="agrezer-process__title"
						value={ sectionTitle }
						onChange={ ( val ) =>
							setAttributes( { sectionTitle: val } )
						}
						placeholder={ __( 'Section title…', 'twork-builder' ) }
						style={ {
							color: titleColor,
							fontSize: `${ titleFontSize }rem`,
							fontWeight: titleFontWeight,
						} }
					/>
				</div>

				<div
					className="agrezer-process__container twork-agrezer-process__container-editor"
					style={ containerStyle }
				>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock="all"
					/>
				</div>
			</section>
		</>
	);
}
