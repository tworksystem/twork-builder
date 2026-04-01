import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	MediaPlaceholder,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	Button,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/agrezer-about-intro-feature' ];
const TEMPLATE = [
	[ 'twork/agrezer-about-intro-feature', { label: 'World Class Services' } ],
	[ 'twork/agrezer-about-intro-feature', { label: 'Fresh Organic Foods' } ],
	[ 'twork/agrezer-about-intro-feature', { label: '100% Quality Foods' } ],
	[ 'twork/agrezer-about-intro-feature', { label: 'Professional Farmers' } ],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerWidthPct,
		columnGap,
		mainImage,
		mainImageId,
		mainImageAlt,
		subImage,
		subImageId,
		subImageAlt,
		badgeImage,
		badgeImageId,
		badgeImageAlt,
		showShape,
		shapeColor,
		showBadge,
		enableBadgeSpin,
		tagIcon,
		tagIconId,
		tagIconAlt,
		tagline,
		title,
		description,
		authorImage,
		authorImageId,
		authorImageAlt,
		authorName,
		authorRole,
		signatureText,
		signatureColor,
		signatureFontSize,
		signatureFontFamily,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'agrezer-about-intro twork-agrezer-about-intro-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--agrezer-about-intro-max': `${ containerMaxWidth }px`,
				'--agrezer-about-intro-width-pct': `${ containerWidthPct }%`,
				'--agrezer-about-intro-gap': `${ columnGap }px`,
			},
			'data-badge-spin': enableBadgeSpin ? 'true' : 'false',
		} ),
		[
			backgroundColor,
			columnGap,
			containerMaxWidth,
			containerWidthPct,
			enableBadgeSpin,
			paddingBottom,
			paddingTop,
		]
	);

	const renderImageField = ( key, idKey, altKey, label, className ) => {
		const url = attributes[ key ];
		const alt = attributes[ altKey ];
		return ! url ? (
			<MediaPlaceholder
				icon="format-image"
				onSelect={ ( media ) =>
					setAttributes( {
						[ key ]: media.url,
						[ idKey ]: media.id,
						[ altKey ]: media.alt || alt,
					} )
				}
				allowedTypes={ [ 'image' ] }
				multiple={ false }
				labels={ { title: label } }
			/>
		) : (
			<>
				<img
					src={ url }
					alt=""
					className={ className }
					style={ { maxWidth: '100%', height: 'auto' } }
				/>

				<Button
					isSecondary
					isSmall
					onClick={ () =>
						setAttributes( { [ key ]: '', [ idKey ]: null } )
					}
				>
					{ __( 'Remove', 'twork-builder' ) }
				</Button>
			</>
		);
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Left column images', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Main image alt', 'twork-builder' ) }
							value={ mainImageAlt }
							onChange={ ( val ) =>
								setAttributes( { mainImageAlt: val } )
							}
						/>

						{ renderImageField(
							'mainImage',
							'mainImageId',
							'mainImageAlt',
							__( 'Main photo', 'twork-builder' ),
							'agrezer-about-intro__img-main'
						) }
						<TextControl
							label={ __(
								'Secondary image alt',
								'twork-builder'
							) }
							value={ subImageAlt }
							onChange={ ( val ) =>
								setAttributes( { subImageAlt: val } )
							}
						/>

						{ renderImageField(
							'subImage',
							'subImageId',
							'subImageAlt',
							__( 'Overlapping square', 'twork-builder' ),
							'agrezer-about-intro__img-sub'
						) }
						<ToggleControl
							label={ __( 'Show yellow shape', 'twork-builder' ) }
							checked={ showShape }
							onChange={ ( val ) =>
								setAttributes( { showShape: val } )
							}
						/>

						{ showShape && (
							<TextControl
								label={ __(
									'Shape color (CSS)',
									'twork-builder'
								) }
								value={ shapeColor }
								onChange={ ( val ) =>
									setAttributes( { shapeColor: val } )
								}
							/>
						) }
						<ToggleControl
							label={ __(
								'Show wreath / badge',
								'twork-builder'
							) }
							checked={ showBadge }
							onChange={ ( val ) =>
								setAttributes( { showBadge: val } )
							}
						/>

						{ showBadge && (
							<>
								<TextControl
									label={ __(
										'Badge image alt',
										'twork-builder'
									) }
									value={ badgeImageAlt }
									onChange={ ( val ) =>
										setAttributes( { badgeImageAlt: val } )
									}
								/>

								{ renderImageField(
									'badgeImage',
									'badgeImageId',
									'badgeImageAlt',
									__( 'Badge graphic', 'twork-builder' ),
									'agrezer-about-intro__badge-img'
								) }
								<ToggleControl
									label={ __(
										'Rotate badge slowly',
										'twork-builder'
									) }
									checked={ enableBadgeSpin }
									onChange={ ( val ) =>
										setAttributes( {
											enableBadgeSpin: val,
										} )
									}
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Tagline icon', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Icon alt', 'twork-builder' ) }
							value={ tagIconAlt }
							onChange={ ( val ) =>
								setAttributes( { tagIconAlt: val } )
							}
						/>

						{ ! tagIcon ? (
							<MediaPlaceholder
								icon="format-image"
								onSelect={ ( media ) =>
									setAttributes( {
										tagIcon: media.url,
										tagIconId: media.id,
										tagIconAlt: media.alt || tagIconAlt,
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Small tagline icon',
										'twork-builder'
									),
								} }
							/>
						) : (
							<>
								<img
									src={ tagIcon }
									alt=""
									className="agrezer-about-intro__tag-icon"
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											tagIcon: '',
											tagIconId: null,
										} )
									}
								>
									{ __( 'Remove icon', 'twork-builder' ) }
								</Button>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Author', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Author photo alt', 'twork-builder' ) }
							value={ authorImageAlt }
							onChange={ ( val ) =>
								setAttributes( { authorImageAlt: val } )
							}
						/>

						{ renderImageField(
							'authorImage',
							'authorImageId',
							'authorImageAlt',
							__( 'Author headshot', 'twork-builder' ),
							'agrezer-about-intro__author-img'
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Signature', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Font family (CSS)', 'twork-builder' ) }
							value={ signatureFontFamily }
							onChange={ ( val ) =>
								setAttributes( { signatureFontFamily: val } )
							}
						/>

						<RangeControl
							label={ __( 'Font size (rem)', 'twork-builder' ) }
							value={ signatureFontSize }
							onChange={ ( val ) =>
								setAttributes( { signatureFontSize: val } )
							}
							min={ 1 }
							max={ 4 }
							step={ 0.1 }
						/>

						<PanelColorSettings
							title={ __( 'Signature color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: signatureColor,
									onChange: ( val ) =>
										setAttributes( {
											signatureColor: val,
										} ),
									label: __( 'Color', 'twork-builder' ),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Container max width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 600 }
							max={ 1600 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container width (%)',
								'twork-builder'
							) }
							value={ containerWidthPct }
							onChange={ ( val ) =>
								setAttributes( { containerWidthPct: val } )
							}
							min={ 70 }
							max={ 100 }
						/>

						<RangeControl
							label={ __( 'Column gap (px)', 'twork-builder' ) }
							value={ columnGap }
							onChange={ ( val ) =>
								setAttributes( { columnGap: val } )
							}
							min={ 24 }
							max={ 120 }
							step={ 4 }
						/>

						<RangeControl
							label={ __( 'Padding top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 40 }
							max={ 200 }
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
							min={ 40 }
							max={ 200 }
							step={ 4 }
						/>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Section', 'twork-builder' ) }
						colorSettings={ [
							{
								value: backgroundColor,
								onChange: ( val ) =>
									setAttributes( { backgroundColor: val } ),
								label: __( 'Background', 'twork-builder' ),
							},
						] }
					/>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="agrezer-about-intro__container">
					<div className="agrezer-about-intro__left">
						<div className="agrezer-about-intro__images-wrapper">
							{ showShape && (
								<div
									className="agrezer-about-intro__shape"
									style={ { backgroundColor: shapeColor } }
								/>
							) }
							{ mainImage ? (
								<img
									src={ mainImage }
									alt=""
									className="agrezer-about-intro__img-main"
								/>
							) : (
								<div className="agrezer-about-intro__img-main agrezer-about-intro__media-placeholder">
									<MediaPlaceholder
										icon="format-image"
										onSelect={ ( media ) =>
											setAttributes( {
												mainImage: media.url,
												mainImageId: media.id,
												mainImageAlt:
													media.alt || mainImageAlt,
											} )
										}
										allowedTypes={ [ 'image' ] }
										labels={ {
											title: __(
												'Main image',
												'twork-builder'
											),
										} }
									/>
								</div>
							) }
							{ subImage ? (
								<img
									src={ subImage }
									alt=""
									className="agrezer-about-intro__img-sub"
								/>
							) : (
								<div className="agrezer-about-intro__img-sub agrezer-about-intro__sub-placeholder">
									<MediaPlaceholder
										icon="format-image"
										onSelect={ ( media ) =>
											setAttributes( {
												subImage: media.url,
												subImageId: media.id,
												subImageAlt:
													media.alt || subImageAlt,
											} )
										}
										allowedTypes={ [ 'image' ] }
										labels={ {
											title: __(
												'Secondary image',
												'twork-builder'
											),
										} }
									/>
								</div>
							) }
							{ showBadge &&
								( badgeImage ? (
									<div className="agrezer-about-intro__badge">
										<img
											src={ badgeImage }
											alt=""
											className="agrezer-about-intro__badge-img"
										/>
									</div>
								) : (
									<div className="agrezer-about-intro__badge">
										<MediaPlaceholder
											icon="format-image"
											onSelect={ ( media ) =>
												setAttributes( {
													badgeImage: media.url,
													badgeImageId: media.id,
													badgeImageAlt:
														media.alt ||
														badgeImageAlt,
												} )
											}
											allowedTypes={ [ 'image' ] }
											labels={ {
												title: __(
													'Badge',
													'twork-builder'
												),
											} }
										/>
									</div>
								) ) }
						</div>
					</div>

					<div className="agrezer-about-intro__right">
						<div className="agrezer-about-intro__tagline">
							{ tagIcon && (
								<img
									src={ tagIcon }
									alt=""
									className="agrezer-about-intro__tag-icon"
								/>
							) }
							<RichText
								tagName="span"
								value={ tagline }
								onChange={ ( val ) =>
									setAttributes( { tagline: val } )
								}
								placeholder={ __( 'Tagline', 'twork-builder' ) }
								allowedFormats={ [
									'core/bold',
									'core/italic',
								] }
							/>
						</div>

						<RichText
							tagName="h2"
							className="agrezer-about-intro__title"
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
							placeholder={ __( 'Heading', 'twork-builder' ) }
							allowedFormats={ [
								'core/bold',
								'core/italic',
								'core/underline',
							] }
							multiline="br"
						/>

						<RichText
							tagName="p"
							className="agrezer-about-intro__desc"
							value={ description }
							onChange={ ( val ) =>
								setAttributes( { description: val } )
							}
							placeholder={ __(
								'Description…',
								'twork-builder'
							) }
						/>

						<div className="agrezer-about-intro__features agrezer-about-intro__features--editor">
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
								templateLock={ false }
								renderAppender={
									InnerBlocks.ButtonBlockAppender
								}
							/>
						</div>

						<div className="agrezer-about-intro__author-row">
							<div className="agrezer-about-intro__author-info">
								{ authorImage ? (
									<img
										src={ authorImage }
										alt=""
										className="agrezer-about-intro__author-img"
									/>
								) : (
									<MediaPlaceholder
										icon="format-image"
										onSelect={ ( media ) =>
											setAttributes( {
												authorImage: media.url,
												authorImageId: media.id,
												authorImageAlt:
													media.alt || authorImageAlt,
											} )
										}
										allowedTypes={ [ 'image' ] }
										labels={ {
											title: __(
												'Author',
												'twork-builder'
											),
										} }
									/>
								) }
								<div className="agrezer-about-intro__author-text">
									<RichText
										tagName="h4"
										className="agrezer-about-intro__author-name"
										value={ authorName }
										onChange={ ( val ) =>
											setAttributes( { authorName: val } )
										}
										placeholder={ __(
											'Name',
											'twork-builder'
										) }
										allowedFormats={ [] }
									/>

									<RichText
										tagName="span"
										className="agrezer-about-intro__author-role"
										value={ authorRole }
										onChange={ ( val ) =>
											setAttributes( { authorRole: val } )
										}
										placeholder={ __(
											'Role',
											'twork-builder'
										) }
										allowedFormats={ [] }
									/>
								</div>
							</div>

							<div
								className="agrezer-about-intro__signature"
								style={ {
									fontFamily: signatureFontFamily,
									fontSize: `${ signatureFontSize }rem`,
									color: signatureColor,
								} }
							>
								<RichText
									tagName="span"
									value={ signatureText }
									onChange={ ( val ) =>
										setAttributes( { signatureText: val } )
									}
									placeholder={ __(
										'Signature',
										'twork-builder'
									) }
									allowedFormats={ [] }
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
