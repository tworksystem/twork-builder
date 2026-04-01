import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { useMemo, useState, useCallback } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
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
	FormTokenField,
	Button,
	Spinner,
	Notice,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import { useEntityRecords } from '@wordpress/core-data';

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

	const [ categoryInputValue, setCategoryInputValue ] = useState( '' );
	const [ excludePostInputValue, setExcludePostInputValue ] = useState( '' );
	const [ categorySearchTerm, setCategorySearchTerm ] = useState( '' );
	const [ excludePostSearchTerm, setExcludePostSearchTerm ] = useState( '' );

	const debouncedSetCategorySearchTerm = useDebounce( ( value ) => {
		setCategorySearchTerm( value );
	}, 300 );

	const debouncedSetExcludePostSearchTerm = useDebounce( ( value ) => {
		setExcludePostSearchTerm( value );
	}, 300 );

	const normalizedCategoryIds = useMemo( () => {
		if ( Array.isArray( categoryIds ) ) {
			return categoryIds
				.map( ( id ) => parseInt( id, 10 ) )
				.filter( ( id ) => Number.isFinite( id ) && id > 0 );
		}
		// Backward-safe parser if old content still carries comma-separated text.
		return String( categoryIds || '' )
			.split( ',' )
			.map( ( s ) => parseInt( String( s ).trim(), 10 ) )
			.filter( ( id ) => Number.isFinite( id ) && id > 0 );
	}, [ categoryIds ] );

	const normalizedExcludeIds = useMemo( () => {
		if ( Array.isArray( excludeIds ) ) {
			return excludeIds
				.map( ( id ) => parseInt( id, 10 ) )
				.filter( ( id ) => Number.isFinite( id ) && id > 0 );
		}
		return String( excludeIds || '' )
			.split( ',' )
			.map( ( s ) => parseInt( String( s ).trim(), 10 ) )
			.filter( ( id ) => Number.isFinite( id ) && id > 0 );
	}, [ excludeIds ] );

	const restOrder = String( order || 'DESC' ).toLowerCase() === 'asc' ? 'asc' : 'desc';
	const restOrderByAllowed = [ 'date', 'modified', 'title' ];
	const restOrderBy = restOrderByAllowed.includes( orderBy )
		? orderBy
		: 'date';

	// Stable query object — a new literal each render breaks core-data caching and can 400 the REST API.
	// categories / exclude MUST be integer arrays (WP REST schema), not CSV strings.
	const postsQuery = useMemo( () => {
		const q = {
			per_page: Math.min( 12, Math.max( 1, postsToShow || 3 ) ),
			offset: Math.max( 0, offset || 0 ),
			orderby: restOrderBy,
			order: restOrder,
			_embed: true,
		};
		if ( normalizedCategoryIds.length ) {
			q.categories = [ ...normalizedCategoryIds ];
		}
		if ( normalizedExcludeIds.length ) {
			q.exclude = [ ...normalizedExcludeIds ];
		}
		return q;
	}, [
		postsToShow,
		offset,
		restOrderBy,
		restOrder,
		normalizedCategoryIds,
		normalizedExcludeIds,
	] );

	const { records: posts, isResolving } = useEntityRecords(
		'postType',
		'post',
		postsQuery
	);

	const safePosts = useMemo( () => {
		if ( Array.isArray( posts ) ) {
			return posts.filter( ( p ) => p && typeof p.id === 'number' );
		}
		return [];
	}, [ posts ] );

	const { records: categoryRecords = [], isResolving: isCategoriesResolving } =
		useEntityRecords( 'taxonomy', 'category', {
			per_page: 100,
			search: categorySearchTerm || undefined,
			orderby: 'name',
			order: 'asc',
			hide_empty: false,
		} );

	const {
		records: excludePostRecords = [],
		isResolving: isExcludePostsResolving,
	} = useEntityRecords( 'postType', 'post', {
		per_page: 100,
		search: excludePostSearchTerm || undefined,
		orderby: 'date',
		order: 'desc',
		_embed: false,
	} );

	const isCategorySearching =
		categoryInputValue !== categorySearchTerm || isCategoriesResolving;
	const isExcludePostsSearching =
		excludePostInputValue !== excludePostSearchTerm || isExcludePostsResolving;

	const safeCategoryRecords = Array.isArray( categoryRecords )
		? categoryRecords
		: [];
	const safeExcludePostRecords = Array.isArray( excludePostRecords )
		? excludePostRecords
		: [];

	const categoryIdToName = useMemo( () => {
		const entries = safeCategoryRecords
			.filter( ( term ) => term && typeof term.id === 'number' )
			.map( ( term ) => [ term.id, term.name || '' ] );
		return new Map( entries );
	}, [ safeCategoryRecords ] );

	const categorySuggestions = useMemo(
		() =>
			safeCategoryRecords
				.filter( ( term ) => term && term.name )
				.map( ( term ) => term.name ),
		[ safeCategoryRecords ]
	);

	const selectedCategoryTokens = useMemo(
		() =>
			normalizedCategoryIds.map(
				( id ) => categoryIdToName.get( id ) || `#${ id }`
			),
		[ normalizedCategoryIds, categoryIdToName ]
	);

	const postIdToTitle = useMemo( () => {
		const entries = safeExcludePostRecords
			.filter( ( p ) => p && typeof p.id === 'number' )
			.map( ( post ) => [
				post.id,
				post?.title?.rendered
					? post.title.rendered.replace( /<[^>]+>/g, '' )
					: __( '(Untitled)', 'twork-builder' ),
			] );
		return new Map( entries );
	}, [ safeExcludePostRecords ] );

	const postSuggestions = useMemo(
		() =>
			safeExcludePostRecords
				.filter( ( p ) => p && typeof p.id === 'number' )
				.map( ( post ) =>
					post?.title?.rendered
						? post.title.rendered.replace( /<[^>]+>/g, '' )
						: __( '(Untitled)', 'twork-builder' )
				)
				.filter( Boolean ),
		[ safeExcludePostRecords ]
	);

	const selectedExcludeTokens = useMemo(
		() =>
			normalizedExcludeIds.map(
				( id ) => postIdToTitle.get( id ) || `#${ id }`
			),
		[ normalizedExcludeIds, postIdToTitle ]
	);

	const onCategoryTokensChange = useCallback(
		( tokens ) => {
			const list = Array.isArray( tokens ) ? tokens : [];
			const idByName = new Map(
				safeCategoryRecords
					.filter( ( term ) => term && term.name && typeof term.id === 'number' )
					.map( ( term ) => [ term.name, term.id ] )
			);

			const ids = list
				.map( ( token ) => idByName.get( token ) )
				.filter( ( id ) => Number.isFinite( id ) );

			setAttributes( { categoryIds: [ ...new Set( ids ) ] } );
		},
		[ safeCategoryRecords, setAttributes ]
	);

	const onExcludeTokensChange = useCallback(
		( tokens ) => {
			const list = Array.isArray( tokens ) ? tokens : [];
			const idByTitle = new Map(
				safeExcludePostRecords
					.filter( ( p ) => p && typeof p.id === 'number' )
					.map( ( post ) => [
						post?.title?.rendered
							? post.title.rendered.replace( /<[^>]+>/g, '' )
							: __( '(Untitled)', 'twork-builder' ),
						post.id,
					] )
			);

			const ids = list
				.map( ( token ) => idByTitle.get( token ) )
				.filter( ( id ) => Number.isFinite( id ) );

			setAttributes( { excludeIds: [ ...new Set( ids ) ] } );
		},
		[ safeExcludePostRecords, setAttributes ]
	);

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-blog-section-editor',
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
						{ [ 'rand', 'comment_count' ].includes( orderBy ) && (
							<Notice status="info" isDismissible={ false }>
								{ __(
									'Editor preview uses publish date ordering for this mode. Frontend output still honors your selected order.',
									'twork-builder'
								) }
							</Notice>
						) }

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

						<FormTokenField
							label={ __( 'Categories', 'twork-builder' ) }
							value={ selectedCategoryTokens }
							suggestions={ categorySuggestions }
							onChange={ onCategoryTokensChange }
							onInputChange={ ( value ) => {
								const nextValue = value || '';
								setCategoryInputValue( nextValue );
								debouncedSetCategorySearchTerm( nextValue );
							} }
							placeholder={ __(
								'Type to search categories',
								'twork-builder'
							) }
							help={ __(
								'Leave empty for all categories.',
								'twork-builder'
							) }
						/>
						{ isCategorySearching && (
							<div className="components-base-control__help">
								<Spinner />
								{ ' ' }
								{ __( 'Searching categories…', 'twork-builder' ) }
							</div>
						) }

						<FormTokenField
							label={ __( 'Exclude posts', 'twork-builder' ) }
							value={ selectedExcludeTokens }
							suggestions={ postSuggestions }
							onChange={ onExcludeTokensChange }
							onInputChange={ ( value ) => {
								const nextValue = value || '';
								setExcludePostInputValue( nextValue );
								debouncedSetExcludePostSearchTerm( nextValue );
							} }
							placeholder={ __(
								'Type to search posts to exclude',
								'twork-builder'
							) }
						/>
						{ isExcludePostsSearching && (
							<div className="components-base-control__help">
								<Spinner />
								{ ' ' }
								{ __( 'Searching posts…', 'twork-builder' ) }
							</div>
						) }

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
				<div className="twork-blog-section-editor__chrome">
					<p className="twork-blog-section-editor__hint">
						{ __(
							'Edit heading and tagline below. Post cards load from your site.',
							'twork-builder'
						) }
					</p>
					<div className="twork-blog__tagline">
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
									className="twork-blog__tag-icon"
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
						className="twork-blog__title"
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
					/>
				</div>

				<section
					className="twork-blog wp-block-twork-posts-grid"
					style={ {
						backgroundColor,
						paddingTop: `${ paddingTop }px`,
						paddingBottom: `${ paddingBottom }px`,
						'--twork-blog-cols': Math.min(
							4,
							Math.max( 1, columns || 3 )
						),
						'--twork-blog-max': `${ containerMaxWidth }px`,
						'--twork-blog-width': `${ containerWidthPct }%`,
					} }
				>
					<div className="twork-blog__container">
						<div className="twork-blog__header-row">
							<div className="twork-blog__header-left">
								{ ( tagline || tagIcon ) && (
									<div className="twork-blog__tagline">
										{ tagIcon ? (
											<img
												src={ tagIcon }
												alt=""
												className="twork-blog__tag-icon"
											/>
										) : null }
										{ tagline ? <span>{ tagline }</span> : null }
									</div>
								) }
								{ sectionTitle ? (
									<h2
										className="twork-blog__title"
										dangerouslySetInnerHTML={ {
											__html: sectionTitle,
										} }
									/>
								) : null }
							</div>

							<div className="twork-blog__header-right">
								<a
									href={ moreButtonUrl || '#' }
									className="twork-blog__more-btn"
									tabIndex={ -1 }
									onClick={ ( e ) => e.preventDefault() }
								>
									{ moreButtonText || __( 'More News ↗', 'twork-builder' ) }
								</a>
							</div>
						</div>

						{ isResolving && (
							<div className="twork-blog__loading">
								<Spinner />
							</div>
						) }

						{ ! isResolving && safePosts.length === 0 && (
							<p className="twork-blog__empty">
								{ __(
									'No posts found for this query.',
									'twork-builder'
								) }
							</p>
						) }

						{ ! isResolving && safePosts.length > 0 && (
							<div className="twork-blog__grid">
								{ safePosts.map( ( post ) => {
									const titleText =
										post?.title?.rendered || __( '(Untitled)', 'twork-builder' );

									const authorName =
										post?._embedded?.author?.[ 0 ]?.name || '';

									const rawComment = post?.comment_count;
									const commentCountNum = Number( rawComment );
									const commentCountSafe = Number.isFinite( commentCountNum )
										? commentCountNum
										: null;

									const featured =
										post?._embedded?.[ 'wp:featuredmedia' ]?.[ 0 ];
									const imgUrl =
										featured?.media_details?.sizes?.[ imageSize ]
											?.source_url ||
										featured?.source_url ||
										'';

									const dateObj = post?.date ? new Date( post.date ) : null;
									const day = dateObj
										? String( dateObj.getDate() )
										: '';
									const month = dateObj
										? dateObj.toLocaleString( undefined, {
												month: 'short',
										  } )
										: '';

									const cardHref =
										typeof post?.link === 'string' && post.link
											? post.link
											: '#';

									return (
										<article
											className="twork-blog-card"
											key={ post.id }
										>
											<div className="twork-blog-card__img-box">
												{ imgUrl ? (
													<a
														href={ cardHref }
														className="twork-blog-card__img-link"
														tabIndex={ -1 }
														onClick={ ( e ) => e.preventDefault() }
													>
														<img
															src={ imgUrl }
															className="twork-blog-card__img"
															alt=""
														/>
													</a>
												) : (
													<a
														href={ cardHref }
														className="twork-blog-card__img-link twork-blog-card__img-link--placeholder"
														aria-hidden="true"
														tabIndex={ -1 }
														onClick={ ( e ) => e.preventDefault() }
													>
														<span className="twork-blog-card__img-placeholder" />
													</a>
												) }

												<div
													className="twork-blog-card__date"
													aria-hidden="true"
												>
													<span className="twork-blog-card__date-day">
														{ day }
													</span>
													<span className="twork-blog-card__date-month">
														{ month }
													</span>
												</div>
											</div>

											<div className="twork-blog-card__content">
												{ ( showAuthorMeta || showCommentsMeta ) && (
													<div className="twork-blog-card__meta">
														{ showAuthorMeta && (
															<span>
																{ authorPrefix || '' }
																{ authorName }
															</span>
														) }

														{ showCommentsMeta &&
															commentCountSafe !== null && (
																<span>
																	{ commentPrefix || '' }
																	{ commentCountSafe }{ ' ' }
																	{ commentCountSafe === 1
																		? __( 'Comment', 'twork-builder' )
																		: __( 'Comments', 'twork-builder' ) }
																</span>
															) }
													</div>
												) }

												<h3 className="twork-blog-card__title">
													<a
														href={ cardHref }
														onClick={ ( e ) => e.preventDefault() }
														dangerouslySetInnerHTML={ {
															__html: titleText,
														} }
													/>
												</h3>

												<div className="twork-blog-card__footer">
													<a
														href={ cardHref }
														className="twork-blog-card__read-btn"
														tabIndex={ -1 }
														onClick={ ( e ) => e.preventDefault() }
													>
														{ readMoreText || __( 'Read More', 'twork-builder' ) }
														<span className="icon-circle" aria-hidden="true">
															→
														</span>
													</a>
												</div>
											</div>
										</article>
									);
								} ) }
							</div>
						) }
					</div>
				</section>
			</div>
		</>
	);
}
