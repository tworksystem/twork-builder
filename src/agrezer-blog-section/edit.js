import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	RichText,
	MediaPlaceholder,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import metadata from './block.json';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionTitle,
		tagline,
		tagIcon,
		tagIconId,
		tagIconAlt,
		moreButtonUrl,
		moreButtonText,
		moreButtonNewTab,
		readMoreText,
		postsToShow,
		columns,
		orderBy,
		order,
		categoryIds,
		excludeIds,
		offset,
		imageSize,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerWidthPct,
		showAuthorMeta,
		authorPrefix,
		showCommentsMeta,
		commentPrefix,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-agrezer-blog-section-editor',
		} ),
		[]
	);

	const imageSizeOptions = [
		{ label: __( 'Thumbnail', 'twork-builder' ), value: 'thumbnail' },
		{ label: __( 'Medium', 'twork-builder' ), value: 'medium' },
		{ label: __( 'Medium large', 'twork-builder' ), value: 'medium_large' },
		{ label: __( 'Large', 'twork-builder' ), value: 'large' },
		{ label: __( 'Full', 'twork-builder' ), value: 'full' },
	];

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Post query', 'twork-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Number of posts', 'twork-builder' ) }
							value={ postsToShow }
							onChange={ ( val ) =>
								setAttributes( { postsToShow: val } )
							}
							min={ 1 }
							max={ 12 }
						/>

						<RangeControl
							label={ __( 'Columns (desktop)', 'twork-builder' ) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 4 }
						/>

						<RangeControl
							label={ __(
								'Offset (skip first N)',
								'twork-builder'
							) }
							value={ offset }
							onChange={ ( val ) =>
								setAttributes( { offset: val } )
							}
							min={ 0 }
							max={ 50 }
						/>

						<SelectControl
							label={ __( 'Order by', 'twork-builder' ) }
							value={ orderBy }
							options={ [
								{
									label: __(
										'Publish date',
										'twork-builder'
									),
									value: 'date',
								},
								{
									label: __(
										'Modified date',
										'twork-builder'
									),
									value: 'modified',
								},
								{
									label: __( 'Title', 'twork-builder' ),
									value: 'title',
								},
								{
									label: __(
										'Comment count',
										'twork-builder'
									),
									value: 'comment_count',
								},
								{
									label: __( 'Random', 'twork-builder' ),
									value: 'rand',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { orderBy: val } )
							}
						/>

						<SelectControl
							label={ __( 'Order', 'twork-builder' ) }
							value={ order }
							options={ [
								{
									label: __(
										'Newest first',
										'twork-builder'
									),
									value: 'DESC',
								},
								{
									label: __(
										'Oldest first',
										'twork-builder'
									),
									value: 'ASC',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { order: val } )
							}
						/>

						<TextControl
							label={ __(
								'Category IDs (comma-separated)',
								'twork-builder'
							) }
							value={ categoryIds }
							onChange={ ( val ) =>
								setAttributes( { categoryIds: val } )
							}
							help={ __(
								'Leave empty for all categories.',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __( 'Exclude post IDs', 'twork-builder' ) }
							value={ excludeIds }
							onChange={ ( val ) =>
								setAttributes( { excludeIds: val } )
							}
						/>

						<SelectControl
							label={ __(
								'Featured image size',
								'twork-builder'
							) }
							value={ imageSize }
							options={ imageSizeOptions }
							onChange={ ( val ) =>
								setAttributes( { imageSize: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __(
							'Tagline icon (accessibility)',
							'twork-builder'
						) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Icon alt text', 'twork-builder' ) }
							value={ tagIconAlt }
							onChange={ ( val ) =>
								setAttributes( { tagIconAlt: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Header & buttons', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( '“More news” URL', 'twork-builder' ) }
							value={ moreButtonUrl }
							onChange={ ( val ) =>
								setAttributes( { moreButtonUrl: val } )
							}
							help={ __(
								'Empty uses your Posts page (Settings → Reading) or the site home.',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __( '“More news” label', 'twork-builder' ) }
							value={ moreButtonText }
							onChange={ ( val ) =>
								setAttributes( { moreButtonText: val } )
							}
						/>

						<ToggleControl
							label={ __(
								'Open “More news” in new tab',
								'twork-builder'
							) }
							checked={ moreButtonNewTab }
							onChange={ ( val ) =>
								setAttributes( { moreButtonNewTab: val } )
							}
						/>

						<Divider />
						<TextControl
							label={ __(
								'Card “Read more” label',
								'twork-builder'
							) }
							value={ readMoreText }
							onChange={ ( val ) =>
								setAttributes( { readMoreText: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Card meta', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show author', 'twork-builder' ) }
							checked={ showAuthorMeta }
							onChange={ ( val ) =>
								setAttributes( { showAuthorMeta: val } )
							}
						/>

						{ showAuthorMeta && (
							<TextControl
								label={ __(
									'Author prefix (optional)',
									'twork-builder'
								) }
								value={ authorPrefix }
								onChange={ ( val ) =>
									setAttributes( { authorPrefix: val } )
								}
							/>
						) }
						<ToggleControl
							label={ __(
								'Show comment count',
								'twork-builder'
							) }
							checked={ showCommentsMeta }
							onChange={ ( val ) =>
								setAttributes( { showCommentsMeta: val } )
							}
						/>

						{ showCommentsMeta && (
							<TextControl
								label={ __(
									'Comment prefix (optional)',
									'twork-builder'
								) }
								value={ commentPrefix }
								onChange={ ( val ) =>
									setAttributes( { commentPrefix: val } )
								}
							/>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Max width (px)', 'twork-builder' ) }
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
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Padding top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
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
							min={ 0 }
							max={ 200 }
							step={ 4 }
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

			<div { ...blockProps }>
				<div className="twork-agrezer-blog-section-editor__chrome">
					<p className="twork-agrezer-blog-section-editor__hint">
						{ __(
							'Edit heading and tagline below. Post cards load from your site.',
							'twork-builder'
						) }
					</p>
					<div className="agrezer-blog__tagline">
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
										'Tagline icon',
										'twork-builder'
									),
								} }
							/>
						) : (
							<>
								<img
									src={ tagIcon }
									alt=""
									className="agrezer-blog__tag-icon"
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
						<RichText
							tagName="span"
							value={ tagline }
							onChange={ ( val ) =>
								setAttributes( { tagline: val } )
							}
							placeholder={ __( 'Tagline', 'twork-builder' ) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>
					</div>
					<RichText
						tagName="h2"
						className="agrezer-blog__title"
						value={ sectionTitle }
						onChange={ ( val ) =>
							setAttributes( { sectionTitle: val } )
						}
						placeholder={ __( 'Section heading', 'twork-builder' ) }
						allowedFormats={ [
							'core/bold',
							'core/italic',
							'core/underline',
						] }
						multiline="br"
					/>
				</div>

				<ServerSideRender
					block={ metadata.name }
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
