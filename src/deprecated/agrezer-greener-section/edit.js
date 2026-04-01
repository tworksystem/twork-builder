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
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [
	'twork/agrezer-greener-stats-row',
	'twork/agrezer-greener-cards-row',
];

const TEMPLATE = [
	[
		'twork/agrezer-greener-stats-row',
		{},
		[
			[
				'twork/agrezer-greener-stat-item',
				{
					iconVariant: 'growth',
					title: '80% Pure Growth',
					description:
						'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
				},
			],

			[
				'twork/agrezer-greener-stat-item',
				{
					iconVariant: 'organic',
					title: '95% Organic Roots',
					description:
						'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
				},
			],
		],
	],

	[
		'twork/agrezer-greener-cards-row',
		{},
		[
			[
				'twork/agrezer-greener-card-item',
				{
					title: 'Organic Farm Solutions',
					linkText: 'Read More',
					linkUrl: '#',
					image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef385a?auto=format&fit=crop&w=900&q=80',
					alt: 'Organic farm solutions',
				},
			],

			[
				'twork/agrezer-greener-card-item',
				{
					title: 'The Eco-Friendly Farming',
					linkText: 'Read More',
					linkUrl: '#',
					image: 'https://images.unsplash.com/photo-1625246333195-f8989295e467?auto=format&fit=crop&w=900&q=80',
					alt: 'Eco-friendly farming',
				},
			],

			[
				'twork/agrezer-greener-card-item',
				{
					title: 'Organic Produce Supply',
					linkText: 'Read More',
					linkUrl: '#',
					image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
					alt: 'Organic produce supply',
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
		mainColumnGap,
		mainImage,
		mainImageAlt,
		taglineIcon,
		taglineText,
		sectionTitle,
		taglineColor,
		taglineIconColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'agrezer-greener twork-agrezer-greener-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--agrezer-greener-gap': `${ mainColumnGap }px`,
			},
		} ),
		[ backgroundColor, mainColumnGap, paddingBottom, paddingTop ]
	);

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
		gap: `${ mainColumnGap }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Left image', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Alt text', 'twork-builder' ) }
							value={ mainImageAlt }
							onChange={ ( val ) =>
								setAttributes( { mainImageAlt: val } )
							}
						/>
					</PanelBody>

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
									label: __( 'Background', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Column gap (px)', 'twork-builder' ) }
							value={ mainColumnGap }
							onChange={ ( val ) =>
								setAttributes( { mainColumnGap: val } )
							}
							min={ 24 }
							max={ 96 }
							step={ 4 }
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

			<section { ...blockProps } aria-labelledby="agrezer-greener-title">
				<div
					className="agrezer-greener__container"
					style={ containerStyle }
				>
					<div className="agrezer-greener__left">
						{ ! mainImage ? (
							<MediaPlaceholder
								onSelect={ ( media ) =>
									setAttributes( {
										mainImage: media.url,
										mainImageId: media.id,
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Main image (farmer)',
										'twork-builder'
									),
								} }
							/>
						) : (
							<div className="agrezer-greener__left-inner">
								<img
									src={ mainImage }
									className="agrezer-greener__main-img"
									alt=""
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											mainImage: '',
											mainImageId: null,
										} )
									}
								>
									{ __( 'Replace image', 'twork-builder' ) }
								</Button>
							</div>
						) }
					</div>

					<div className="agrezer-greener__right">
						<header className="agrezer-greener__header">
							<p
								className="agrezer-greener__tagline"
								style={ { color: taglineColor } }
							>
								<span
									className="agrezer-greener__tagline-icon"
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
										'Agro Excellence',
										'twork-builder'
									) }
									allowedFormats={ [] }
								/>
							</p>
							<RichText
								tagName="h2"
								id="agrezer-greener-title"
								className="agrezer-greener__title"
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
						</header>

						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock="all"
						/>
					</div>
				</div>
			</section>
		</>
	);
}
