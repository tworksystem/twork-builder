import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	MediaPlaceholder,
	MediaUpload,
	PanelColorSettings,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	Button,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/team-member' ];
const TEMPLATE = [
	[
		'twork/team-member',
		{
			name: 'Harry Black',
			role: 'Chief Executive Officer',
		},
	],

	[
		'twork/team-member',
		{
			name: 'Marry Olson',
			role: 'Shop Keeper',
		},
	],

	[
		'twork/team-member',
		{
			name: 'Arun Patel',
			role: 'Chief Agronomist',
		},
	],
];

export default function Edit( {
	attributes,
	setAttributes,
	isSelected,
	clientId,
} ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerWidthPct,
		gridGap,
		columns,
		headerMarginBottom,
		tagIcon,
		tagIconId,
		tagIconAlt,
		taglineColor = '#1f1f1f',
		taglineFontSize = 17,
		tagIconSize = 20,
		taglineGap = 10,
		tagline,
		titleColor = '#131313',
		titleFontSize = 0,
		title,
	} = attributes;

	const parsedCols = Math.min(
		4,
		Math.max( 1, parseInt( columns, 10 ) || 3 )
	);

	const dynamicStyles = `
    #twork-block-${ clientId } {
        ${
			backgroundColor
				? `background-color: ${ backgroundColor } !important;`
				: ''
		}
        --tw-team-pt: ${
			paddingTop !== undefined ? paddingTop : 90
		}px;
        --tw-team-pb: ${
			paddingBottom !== undefined ? paddingBottom : 110
		}px;
        --twork-team-max: ${ containerMaxWidth }px;
        --twork-team-width-pct: ${ containerWidthPct }%;
        --twork-team-gap: ${ gridGap }px;
        --twork-team-cols: ${ parsedCols };
        --twork-team-header-mb: ${ headerMarginBottom }px;
        --tw-tag-color: ${ taglineColor };
        --tw-tag-size: ${ taglineFontSize }px;
        --tw-tag-icon-size: ${ tagIconSize }px;
        --tw-tag-gap: ${ taglineGap }px;
        --tw-team-title-color: ${ titleColor };
        ${
			titleFontSize >= 20
				? `--tw-team-title-size: ${ titleFontSize }px;`
				: ''
		}
    }
`;

	const blockProps = useBlockProps( {
		id: `twork-block-${ clientId }`,
		className: 'twork-team-section twork-team-section-editor',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'twork-team-section__grid',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Tagline', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Icon alt text', 'twork-builder' ) }
							value={ tagIconAlt }
							onChange={ ( val ) =>
								setAttributes( { tagIconAlt: val } )
							}
						/>

						<RangeControl
							label={ __(
								'Tagline font size (px)',
								'twork-builder'
							) }
							value={ taglineFontSize }
							onChange={ ( val ) =>
								setAttributes( { taglineFontSize: val } )
							}
							min={ 12 }
							max={ 40 }
						/>

						<RangeControl
							label={ __(
								'Tag icon size (px)',
								'twork-builder'
							) }
							value={ tagIconSize }
							onChange={ ( val ) =>
								setAttributes( { tagIconSize: val } )
							}
							min={ 10 }
							max={ 60 }
						/>

						<RangeControl
							label={ __( 'Tagline gap (px)', 'twork-builder' ) }
							value={ taglineGap }
							onChange={ ( val ) =>
								setAttributes( { taglineGap: val } )
							}
							min={ 0 }
							max={ 30 }
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
									className="twork-team-section__tag-icon"
									width={ tagIconSize }
									height={ tagIconSize }
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

					<PanelColorSettings
						title={ __( 'Tagline color', 'twork-builder' ) }
						colorSettings={ [
							{
								value: taglineColor,
								onChange: ( val ) =>
									setAttributes( { taglineColor: val } ),
								label: __( 'Tagline text', 'twork-builder' ),
							},
						] }
					/>

					<PanelBody
						title={ __( 'Title Settings', 'twork-builder' ) }
						initialOpen={ false }
					>
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
							label={ __(
								'Title font size (px)',
								'twork-builder'
							) }
							help={ __(
								'Reset to use the default responsive size. Custom: 20–100 px.',
								'twork-builder'
							) }
							value={ titleFontSize < 20 ? 20 : titleFontSize }
							onChange={ ( val ) =>
								setAttributes( {
									titleFontSize: val < 20 ? 0 : val,
								} )
							}
							min={ 20 }
							max={ 100 }
							allowReset
							resetFallbackValue={ 0 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Grid', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Columns (large screens)',
								'twork-builder'
							) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 4 }
						/>

						<RangeControl
							label={ __( 'Gap (px)', 'twork-builder' ) }
							value={ gridGap }
							onChange={ ( val ) =>
								setAttributes( { gridGap: val } )
							}
							min={ 8 }
							max={ 40 }
						/>

						<RangeControl
							label={ __(
								'Space below heading (px)',
								'twork-builder'
							) }
							value={ headerMarginBottom }
							onChange={ ( val ) =>
								setAttributes( { headerMarginBottom: val } )
							}
							min={ 16 }
							max={ 80 }
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
							label={ __( 'Padding top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 40 }
							max={ 200 }
							step={ 2 }
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
							step={ 2 }
						/>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Colors', 'twork-builder' ) }
						colorSettings={ [
							{
								value: backgroundColor,
								onChange: ( val ) =>
									setAttributes( { backgroundColor: val } ),
								label: __(
									'Section background',
									'twork-builder'
								),
							},
						] }
					/>
				</InspectorControls>
			) }

			<style
				dangerouslySetInnerHTML={ { __html: dynamicStyles } }
			/>
			<section { ...blockProps }>
				<div className="twork-team-section__container">
					<div className="twork-team-section__header">
						<div className="twork-team-section__tagline">
							{ tagIcon && (
								<MediaUpload
									onSelect={ ( media ) =>
										setAttributes( {
											tagIcon: media.url,
											tagIconId: media.id,
											tagIconAlt: media.alt || tagIconAlt,
										} )
									}
									allowedTypes={ [ 'image' ] }
									value={ tagIconId }
									render={ ( { open } ) => (
										<img
											src={ tagIcon }
											alt={ tagIconAlt || '' }
											className="twork-team-section__tag-icon"
											width={ tagIconSize }
											height={ tagIconSize }
											onClick={ open }
											role="button"
											tabIndex={ 0 }
											onKeyDown={ ( event ) => {
												if (
													event.key === 'Enter' ||
													event.key === ' '
												) {
													event.preventDefault();
													open();
												}
											} }
										/>
									) }
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
							className="twork-team-section__title"
							value={ title }
							onChange={ ( val ) =>
								setAttributes( { title: val } )
							}
							placeholder={ __(
								'Section title',
								'twork-builder'
							) }
							allowedFormats={ [
								'core/bold',
								'core/italic',
								'core/underline',
							] }
						/>
					</div>

					<div { ...innerBlocksProps } />
				</div>
			</section>
		</>
	);
}
