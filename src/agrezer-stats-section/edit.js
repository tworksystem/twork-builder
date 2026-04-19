import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/stats-column' ];

const TEMPLATE = [
	[
		'twork/stats-column',
		{},
		[
			[
				'twork/stat-card',
				{
					image: 'https://images.unsplash.com/photo-1631368647931-4f3ec6d1df92?auto=format&fit=crop&w=1000&q=80',
					alt: 'Corn cobs and leaves',
					statValue: '80%',
					statLabel: 'Efficiency',
				},
			],
		],
	],

	[
		'twork/stats-column',
		{},
		[
			[
				'twork/cta-block',
				{
					buttonText: 'Get In Touch',
					buttonUrl: '#',
				},
			],

			[
				'twork/stat-card',
				{
					image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80',
					alt: 'Scattered corn grains',
					statValue: '98%',
					statLabel: 'Increase in Yields',
				},
			],
		],
	],

	[
		'twork/stats-column',
		{},
		[
			[
				'twork/stat-card',
				{
					image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1000&q=80',
					alt: 'Corn stalk growth',
					statValue: '50%',
					statLabel: 'Farm Growth',
				},
			],
		],
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerGutter,
		taglineIcon,
		taglineText,
		sectionTitle,
		description,
		taglineColor,
		taglineIconColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
		descColor,
		descFontSize,
		headerBorderColor,
		gridGap,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'twork-stats twork-stats-section-editor',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--twork-stats-grid-gap': `${ gridGap }px`,
		},
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'twork-stats__grid twork-stats__grid-editor',
			style: { gap: `${ gridGap }px` },
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: 'all',
		}
	);

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
	};

	const headerStyle = {
		borderBottomColor: headerBorderColor,
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
									label: __(
										'Tagline text',
										'twork-builder'
									),
								},
								{
									value: taglineIconColor,
									onChange: ( val ) =>
										setAttributes( {
											taglineIconColor: val,
										} ),
									label: __(
										'Tagline icon',
										'twork-builder'
									),
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
									label: __( 'Title color', 'twork-builder' ),
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

						<Divider />
						<PanelColorSettings
							title={ __( 'Description', 'twork-builder' ) }
							colorSettings={ [
								{
									value: descColor,
									onChange: ( val ) =>
										setAttributes( { descColor: val } ),
									label: __(
										'Description color',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Description size (rem)',
								'twork-builder'
							) }
							value={ descFontSize }
							onChange={ ( val ) =>
								setAttributes( { descFontSize: val } )
							}
							min={ 0.85 }
							max={ 1.25 }
							step={ 0.01 }
						/>

						<PanelColorSettings
							title={ __( 'Header border', 'twork-builder' ) }
							colorSettings={ [
								{
									value: headerBorderColor,
									onChange: ( val ) =>
										setAttributes( {
											headerBorderColor: val,
										} ),
									label: __(
										'Border color',
										'twork-builder'
									),
								},
							] }
						/>
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

						<RangeControl
							label={ __( 'Grid gap (px)', 'twork-builder' ) }
							value={ gridGap }
							onChange={ ( val ) =>
								setAttributes( { gridGap: val } )
							}
							min={ 12 }
							max={ 48 }
							step={ 2 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps } aria-labelledby="twork-stats-title">
				<div
					className="twork-stats__container"
					style={ containerStyle }
				>
					<div
						className="twork-stats__header"
						style={ headerStyle }
					>
						<div className="twork-stats__header-left">
							<p
								className="twork-stats__tagline"
								style={ { color: taglineColor } }
							>
								<span
									className="twork-stats__tagline-icon"
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
										'Sustainable Farming',
										'twork-builder'
									) }
									allowedFormats={ [] }
								/>
							</p>
							<RichText
								tagName="h2"
								id="twork-stats-title"
								className="twork-stats__title"
								value={ sectionTitle }
								onChange={ ( val ) =>
									setAttributes( { sectionTitle: val } )
								}
								placeholder={ __(
									'Section title…',
									'twork-builder'
								) }
								style={ {
									color: titleColor,
									fontSize: `${ titleFontSize }rem`,
									fontWeight: titleFontWeight,
								} }
							/>
						</div>
						<RichText
							tagName="p"
							className="twork-stats__desc"
							value={ description }
							onChange={ ( val ) =>
								setAttributes( { description: val } )
							}
							placeholder={ __(
								'Description…',
								'twork-builder'
							) }
							style={ {
								color: descColor,
								fontSize: `${ descFontSize }rem`,
							} }
						/>
					</div>

					<div { ...innerBlocksProps } />
				</div>
			</section>
		</>
	);
}
