import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { useMemo, useState, useCallback } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import {
	InspectorControls,
	RichText,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
	FontSizePicker,
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

/** Stable REST queries when there is nothing to fetch by ID (avoids invalid empty `include`). */
const NOOP_CATEGORY_QUERY = {
	slug: 'twork-posts-grid__noop--categories',
	per_page: 1,
};
const NOOP_POST_QUERY = {
	slug: 'twork-posts-grid__noop--posts',
	per_page: 1,
};

const IMAGE_SIZE_FALLBACK_ORDER = [
	'large',
	'medium_large',
	'medium',
	'thumbnail',
	'full',
];

/**
 * Merge two REST entity lists by numeric `id`. Items in `preferred` overwrite `base` on duplicates
 * so explicitly fetched (include=…) records win over search results.
 *
 * @param {Array} baseRecords
 * @param {Array} preferredRecords
 * @return {Array}
 */
function mergeEntityRecordsById( baseRecords, preferredRecords ) {
	const map = new Map();
	for ( const item of baseRecords ) {
		if ( item && typeof item.id === 'number' ) {
			map.set( item.id, item );
		}
	}
	for ( const item of preferredRecords ) {
		if ( item && typeof item.id === 'number' ) {
			map.set( item.id, item );
		}
	}
	return [ ...map.values() ];
}

/**
 * Resolve featured image URL from embedded media with size fallbacks.
 *
 * @param {Object|null|undefined} featuredMedia Embedded `wp:featuredmedia` item.
 * @param {string}                preferredSize Attribute slug (e.g. large).
 * @return {string} Empty string if nothing usable.
 */
function getFeaturedImageUrl( featuredMedia, preferredSize ) {
	if ( ! featuredMedia || typeof featuredMedia !== 'object' ) {
		return '';
	}
	const sizes = featuredMedia.media_details?.sizes;
	if ( sizes && typeof sizes === 'object' ) {
		const direct = sizes[ preferredSize ]?.source_url;
		if ( direct ) {
			return direct;
		}
		for ( const key of IMAGE_SIZE_FALLBACK_ORDER ) {
			const url = sizes[ key ]?.source_url;
			if ( url ) {
				return url;
			}
		}
		for ( const entry of Object.values( sizes ) ) {
			if ( entry?.source_url ) {
				return entry.source_url;
			}
		}
	}
	if ( typeof featuredMedia.source_url === 'string' && featuredMedia.source_url ) {
		return featuredMedia.source_url;
	}
	return '';
}

/** Parse "#123" tokens from FormTokenField when labels are unknown. */
function parseHashIdToken( token ) {
	if ( typeof token !== 'string' ) {
		return null;
	}
	const m = token.match( /^#(\d+)$/ );
	if ( ! m ) {
		return null;
	}
	const n = parseInt( m[ 1 ], 10 );
	return Number.isFinite( n ) && n > 0 ? n : null;
}

function getPostPlainTitle( post ) {
	if ( post?.title?.rendered ) {
		return post.title.rendered.replace( /<[^>]+>/g, '' );
	}
	return __( '(Untitled)', 'twork-builder' );
}

function hexToRgba( color, opacity ) {
	if ( typeof color !== 'string' || ! color.startsWith( '#' ) ) {
		return 'rgba(0, 0, 0, 0)';
	}
	const value = color.replace( '#', '' );
	if ( value.length !== 3 && value.length !== 6 ) {
		return 'rgba(0, 0, 0, 0)';
	}
	const normalize = value.length === 3
		? value
				.split( '' )
				.map( ( char ) => `${ char }${ char }` )
				.join( '' )
		: value;
	const int = parseInt( normalize, 16 );
	const r = ( int >> 16 ) & 255;
	const g = ( int >> 8 ) & 255;
	const b = int & 255;
	const safeOpacity = Math.min( 1, Math.max( 0, opacity ) );
	return `rgba(${ r }, ${ g }, ${ b }, ${ safeOpacity })`;
}

function isVideoAsset( url = '', mime = '' ) {
	if ( typeof mime === 'string' && mime.indexOf( 'video' ) === 0 ) {
		return true;
	}
	return /\.(mp4|webm|ogg)$/i.test( String( url ) );
}

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
		titleColor,
		titleFontSize,
		titleFontWeight,
		taglineColor,
		taglineBackgroundColor,
		taglineFontSize,
		taglineFontWeight,
		moreButtonTextColor,
		moreButtonBackgroundColor,
		moreButtonHoverTextColor,
		moreButtonHoverBackgroundColor,
		postTitleColor,
		postTitleHoverColor,
		postTitleFontSize,
		postTitleFontWeight,
		postMetaColor,
		postMetaIconColor,
		postMetaFontSize,
		postMetaFontWeight,
		dateBadgeBackgroundColor,
		dateBadgeTextColor,
		dateBadgeBorderRadius,
		readMoreTextColor,
		readMoreBackgroundColor,
		readMoreHoverTextColor,
		readMoreHoverBackgroundColor,
		readMoreIconColor,
		readMoreIconBackgroundColor,
		readMoreIconHoverColor,
		readMoreIconHoverBackgroundColor,
		cardBackgroundColor,
		cardBorderRadius,
		cardBorderColor,
		cardBorderWidth,
		cardBoxShadow,
		cardBoxShadowHover,
		cardHoverTranslateY,
		imageAspectRatio,
		imageObjectFit,
		imageHeight,
		imageBorderRadius,
		imageOverlayColor,
		imageOverlayOpacity,
		imageOverlayGradient,
		imageOverlayHoverColor,
		imageOverlayHoverOpacity,
		imageOverlayHoverGradient,
		tagIconMime,
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

	const selectedCategoriesQuery = useMemo( () => {
		if ( ! normalizedCategoryIds.length ) {
			return NOOP_CATEGORY_QUERY;
		}
		return {
			include: normalizedCategoryIds,
			per_page: Math.min( 100, normalizedCategoryIds.length ),
			hide_empty: false,
		};
	}, [ normalizedCategoryIds ] );

	const selectedExcludePostsQuery = useMemo( () => {
		if ( ! normalizedExcludeIds.length ) {
			return NOOP_POST_QUERY;
		}
		return {
			include: normalizedExcludeIds,
			per_page: Math.min( 100, normalizedExcludeIds.length ),
		};
	}, [ normalizedExcludeIds ] );

	const {
		records: selectedCategoryRecords = [],
		isResolving: isSelectedCategoriesResolving,
	} = useEntityRecords( 'taxonomy', 'category', selectedCategoriesQuery );

	const {
		records: selectedExcludePostRecords = [],
		isResolving: isSelectedExcludePostsResolving,
	} = useEntityRecords( 'postType', 'post', selectedExcludePostsQuery );

	const isCategorySearching =
		categoryInputValue !== categorySearchTerm ||
		isCategoriesResolving ||
		( normalizedCategoryIds.length > 0 && isSelectedCategoriesResolving );
	const isExcludePostsSearching =
		excludePostInputValue !== excludePostSearchTerm ||
		isExcludePostsResolving ||
		( normalizedExcludeIds.length > 0 && isSelectedExcludePostsResolving );

	const safeCategoryRecords = Array.isArray( categoryRecords )
		? categoryRecords
		: [];
	const safeExcludePostRecords = Array.isArray( excludePostRecords )
		? excludePostRecords
		: [];
	const safeSelectedCategoryRecords = Array.isArray( selectedCategoryRecords )
		? selectedCategoryRecords
		: [];
	const safeSelectedExcludePostRecords = Array.isArray(
		selectedExcludePostRecords
	)
		? selectedExcludePostRecords
		: [];

	const combinedCategoryRecords = useMemo(
		() =>
			mergeEntityRecordsById(
				safeCategoryRecords,
				safeSelectedCategoryRecords
			),
		[ safeCategoryRecords, safeSelectedCategoryRecords ]
	);

	const combinedExcludePostRecords = useMemo(
		() =>
			mergeEntityRecordsById(
				safeExcludePostRecords,
				safeSelectedExcludePostRecords
			),
		[ safeExcludePostRecords, safeSelectedExcludePostRecords ]
	);

	const categoryIdToName = useMemo( () => {
		const entries = combinedCategoryRecords
			.filter( ( term ) => term && typeof term.id === 'number' )
			.map( ( term ) => [ term.id, term.name || '' ] );
		return new Map( entries );
	}, [ combinedCategoryRecords ] );

	const categorySuggestions = useMemo(
		() =>
			combinedCategoryRecords
				.filter( ( term ) => term && term.name )
				.map( ( term ) => term.name ),
		[ combinedCategoryRecords ]
	);

	const selectedCategoryTokens = useMemo(
		() =>
			normalizedCategoryIds.map(
				( id ) => categoryIdToName.get( id ) || `#${ id }`
			),
		[ normalizedCategoryIds, categoryIdToName ]
	);

	const postIdToTitle = useMemo( () => {
		const entries = combinedExcludePostRecords
			.filter( ( p ) => p && typeof p.id === 'number' )
			.map( ( post ) => [ post.id, getPostPlainTitle( post ) ] );
		return new Map( entries );
	}, [ combinedExcludePostRecords ] );

	const postSuggestions = useMemo(
		() =>
			combinedExcludePostRecords
				.filter( ( p ) => p && typeof p.id === 'number' )
				.map( ( post ) => getPostPlainTitle( post ) )
				.filter( Boolean ),
		[ combinedExcludePostRecords ]
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
				combinedCategoryRecords
					.filter( ( term ) => term && term.name && typeof term.id === 'number' )
					.map( ( term ) => [ term.name, term.id ] )
			);

			const ids = list
				.map( ( token ) => {
					const byName = idByName.get( token );
					if ( Number.isFinite( byName ) ) {
						return byName;
					}
					return parseHashIdToken( token );
				} )
				.filter( ( id ) => Number.isFinite( id ) );

			setAttributes( { categoryIds: [ ...new Set( ids ) ] } );
		},
		[ combinedCategoryRecords, setAttributes ]
	);

	const onExcludeTokensChange = useCallback(
		( tokens ) => {
			const list = Array.isArray( tokens ) ? tokens : [];
			const idByTitle = new Map(
				combinedExcludePostRecords
					.filter( ( p ) => p && typeof p.id === 'number' )
					.map( ( post ) => [ getPostPlainTitle( post ), post.id ] )
			);

			const ids = list
				.map( ( token ) => {
					const byTitle = idByTitle.get( token );
					if ( Number.isFinite( byTitle ) ) {
						return byTitle;
					}
					return parseHashIdToken( token );
				} )
				.filter( ( id ) => Number.isFinite( id ) );

			setAttributes( { excludeIds: [ ...new Set( ids ) ] } );
		},
		[ combinedExcludePostRecords, setAttributes ]
	);

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-blog twork-blog-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--twork-blog-cols': Math.min( 4, Math.max( 1, columns || 3 ) ),
				'--twork-blog-max': `${ containerMaxWidth }px`,
				'--twork-blog-width': `${ containerWidthPct }%`,
				'--twork-title-color': titleColor,
				'--twork-title-size': `${ titleFontSize }px`,
				'--twork-title-weight': titleFontWeight,
				'--twork-tagline-color': taglineColor,
				'--twork-tagline-bg': taglineBackgroundColor,
				'--twork-tagline-size': `${ taglineFontSize }px`,
				'--twork-tagline-weight': taglineFontWeight,
				'--twork-more-text': moreButtonTextColor,
				'--twork-more-bg': moreButtonBackgroundColor,
				'--twork-more-text-hover': moreButtonHoverTextColor,
				'--twork-more-bg-hover': moreButtonHoverBackgroundColor,
				'--twork-card-title-color': postTitleColor,
				'--twork-card-title-hover': postTitleHoverColor,
				'--twork-card-title-size': `${ postTitleFontSize }px`,
				'--twork-card-title-weight': postTitleFontWeight,
				'--twork-meta-color': postMetaColor,
				'--twork-meta-icon-color': postMetaIconColor,
				'--twork-meta-size': `${ postMetaFontSize }px`,
				'--twork-meta-weight': postMetaFontWeight,
				'--twork-date-bg': dateBadgeBackgroundColor,
				'--twork-date-text': dateBadgeTextColor,
				'--twork-date-radius': `${ dateBadgeBorderRadius }px`,
				'--twork-read-text': readMoreTextColor,
				'--twork-read-bg': readMoreBackgroundColor,
				'--twork-read-text-hover': readMoreHoverTextColor,
				'--twork-read-bg-hover': readMoreHoverBackgroundColor,
				'--twork-read-icon': readMoreIconColor,
				'--twork-read-icon-bg': readMoreIconBackgroundColor,
				'--twork-read-icon-hover': readMoreIconHoverColor,
				'--twork-read-icon-bg-hover': readMoreIconHoverBackgroundColor,
				'--twork-card-bg': cardBackgroundColor,
				'--twork-card-radius': `${ cardBorderRadius }px`,
				'--twork-card-border': cardBorderColor,
				'--twork-card-border-width': `${ cardBorderWidth }px`,
				'--twork-card-shadow': cardBoxShadow,
				'--twork-card-shadow-hover': cardBoxShadowHover,
				'--twork-card-lift': `${ cardHoverTranslateY }px`,
				'--twork-img-height': `${ imageHeight }px`,
				'--twork-img-fit': imageObjectFit,
				'--twork-img-radius': `${ imageBorderRadius }px`,
				'--twork-img-aspect': imageAspectRatio === 'auto' ? 'auto' : imageAspectRatio,
				'--twork-img-overlay':
					imageOverlayGradient ||
					hexToRgba( imageOverlayColor, imageOverlayOpacity / 100 ),
				'--twork-img-overlay-hover':
					imageOverlayHoverGradient ||
					hexToRgba( imageOverlayHoverColor, imageOverlayHoverOpacity / 100 ),
			},
		} ),
		[
			backgroundColor,
			paddingTop,
			paddingBottom,
			columns,
			containerMaxWidth,
			containerWidthPct,
			titleColor,
			titleFontSize,
			titleFontWeight,
			taglineColor,
			taglineBackgroundColor,
			taglineFontSize,
			taglineFontWeight,
			moreButtonTextColor,
			moreButtonBackgroundColor,
			moreButtonHoverTextColor,
			moreButtonHoverBackgroundColor,
			postTitleColor,
			postTitleHoverColor,
			postTitleFontSize,
			postTitleFontWeight,
			postMetaColor,
			postMetaIconColor,
			postMetaFontSize,
			postMetaFontWeight,
			dateBadgeBackgroundColor,
			dateBadgeTextColor,
			dateBadgeBorderRadius,
			readMoreTextColor,
			readMoreBackgroundColor,
			readMoreHoverTextColor,
			readMoreHoverBackgroundColor,
			readMoreIconColor,
			readMoreIconBackgroundColor,
			readMoreIconHoverColor,
			readMoreIconHoverBackgroundColor,
			cardBackgroundColor,
			cardBorderRadius,
			cardBorderColor,
			cardBorderWidth,
			cardBoxShadow,
			cardBoxShadowHover,
			cardHoverTranslateY,
			imageAspectRatio,
			imageObjectFit,
			imageHeight,
			imageBorderRadius,
			imageOverlayColor,
			imageOverlayOpacity,
			imageOverlayGradient,
			imageOverlayHoverColor,
			imageOverlayHoverOpacity,
			imageOverlayHoverGradient,
		]
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
							'Header content',
							'twork-builder'
						) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'More button URL', 'twork-builder' ) }
							value={ moreButtonUrl }
							onChange={ ( val ) =>
								setAttributes( { moreButtonUrl: val } )
							}
						/>
						<TextControl
							label={ __( 'More button label', 'twork-builder' ) }
							value={ moreButtonText }
							onChange={ ( val ) =>
								setAttributes( { moreButtonText: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Open in new tab', 'twork-builder' ) }
							checked={ moreButtonNewTab }
							onChange={ ( val ) =>
								setAttributes( { moreButtonNewTab: val } )
							}
						/>
						<TextControl
							label={ __( 'Icon alt text', 'twork-builder' ) }
							value={ tagIconAlt }
							onChange={ ( val ) =>
								setAttributes( { tagIconAlt: val } )
							}
						/>
					</PanelBody>

					<PanelBody title={ __( 'Card content', 'twork-builder' ) } initialOpen={ false }>
						<TextControl
							label={ __( 'Card "Read More" label', 'twork-builder' ) }
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

					<PanelBody title={ __( 'Featured image', 'twork-builder' ) } initialOpen={ false }>
						<SelectControl
							label={ __( 'Image aspect ratio', 'twork-builder' ) }
							value={ imageAspectRatio }
							options={ [
								{ label: __( '16:9', 'twork-builder' ), value: '16/9' },
								{ label: __( '4:3', 'twork-builder' ), value: '4/3' },
								{ label: __( '1:1', 'twork-builder' ), value: '1/1' },
								{ label: __( 'Auto', 'twork-builder' ), value: 'auto' },
							] }
							onChange={ ( val ) => setAttributes( { imageAspectRatio: val } ) }
						/>
						<SelectControl
							label={ __( 'Object fit', 'twork-builder' ) }
							value={ imageObjectFit }
							options={ [
								{ label: __( 'Cover', 'twork-builder' ), value: 'cover' },
								{ label: __( 'Contain', 'twork-builder' ), value: 'contain' },
							] }
							onChange={ ( val ) => setAttributes( { imageObjectFit: val } ) }
						/>
						<RangeControl
							label={ __( 'Image height (px)', 'twork-builder' ) }
							value={ imageHeight }
							onChange={ ( val ) => setAttributes( { imageHeight: val } ) }
							min={ 120 }
							max={ 600 }
						/>
						<RangeControl
							label={ __( 'Image border radius (px)', 'twork-builder' ) }
							value={ imageBorderRadius }
							onChange={ ( val ) => setAttributes( { imageBorderRadius: val } ) }
							min={ 0 }
							max={ 40 }
						/>
						<RangeControl
							label={ __( 'Overlay opacity (%)', 'twork-builder' ) }
							value={ imageOverlayOpacity }
							onChange={ ( val ) => setAttributes( { imageOverlayOpacity: val } ) }
							min={ 0 }
							max={ 100 }
						/>
						<RangeControl
							label={ __( 'Overlay hover opacity (%)', 'twork-builder' ) }
							value={ imageOverlayHoverOpacity }
							onChange={ ( val ) => setAttributes( { imageOverlayHoverOpacity: val } ) }
							min={ 0 }
							max={ 100 }
						/>
						<TextControl
							label={ __( 'Overlay gradient (optional CSS)', 'twork-builder' ) }
							value={ imageOverlayGradient }
							onChange={ ( val ) => setAttributes( { imageOverlayGradient: val } ) }
							help={ __( 'Example: linear-gradient(180deg, rgba(0,0,0,.1), rgba(0,0,0,.45))', 'twork-builder' ) }
						/>
						<TextControl
							label={ __( 'Overlay hover gradient (optional CSS)', 'twork-builder' ) }
							value={ imageOverlayHoverGradient }
							onChange={ ( val ) => setAttributes( { imageOverlayHoverGradient: val } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Card box', 'twork-builder' ) } initialOpen={ false }>
						<RangeControl
							label={ __( 'Card border radius (px)', 'twork-builder' ) }
							value={ cardBorderRadius }
							onChange={ ( val ) => setAttributes( { cardBorderRadius: val } ) }
							min={ 0 }
							max={ 40 }
						/>
						<RangeControl
							label={ __( 'Card border width (px)', 'twork-builder' ) }
							value={ cardBorderWidth }
							onChange={ ( val ) => setAttributes( { cardBorderWidth: val } ) }
							min={ 0 }
							max={ 8 }
						/>
						<RangeControl
							label={ __( 'Card hover translate Y (px)', 'twork-builder' ) }
							value={ cardHoverTranslateY }
							onChange={ ( val ) => setAttributes( { cardHoverTranslateY: val } ) }
							min={ -50 }
							max={ 10 }
						/>
						<TextControl
							label={ __( 'Card box shadow', 'twork-builder' ) }
							value={ cardBoxShadow }
							onChange={ ( val ) => setAttributes( { cardBoxShadow: val } ) }
						/>
						<TextControl
							label={ __( 'Card box shadow (hover)', 'twork-builder' ) }
							value={ cardBoxShadowHover }
							onChange={ ( val ) => setAttributes( { cardBoxShadowHover: val } ) }
						/>
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

					<PanelBody title={ __( 'Typography', 'twork-builder' ) } initialOpen={ false }>
						<p>{ __( 'Section Title Size', 'twork-builder' ) }</p>
						<FontSizePicker
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: parseInt( val, 10 ) || 48 } )
							}
							fontSizes={ [] }
							fallbackFontSize={ titleFontSize || 48 }
							withSlider
						/>
						<SelectControl
							label={ __( 'Section Title Weight', 'twork-builder' ) }
							value={ titleFontWeight }
							options={ [
								{ label: '400', value: '400' },
								{ label: '500', value: '500' },
								{ label: '600', value: '600' },
								{ label: '700', value: '700' },
								{ label: '800', value: '800' },
							] }
							onChange={ ( val ) => setAttributes( { titleFontWeight: val } ) }
						/>
						<Divider />
						<p>{ __( 'Tagline Size', 'twork-builder' ) }</p>
						<FontSizePicker
							value={ taglineFontSize }
							onChange={ ( val ) =>
								setAttributes( { taglineFontSize: parseInt( val, 10 ) || 16 } )
							}
							fontSizes={ [] }
							fallbackFontSize={ taglineFontSize || 16 }
							withSlider
						/>
						<SelectControl
							label={ __( 'Tagline Weight', 'twork-builder' ) }
							value={ taglineFontWeight }
							options={ [
								{ label: '400', value: '400' },
								{ label: '500', value: '500' },
								{ label: '600', value: '600' },
								{ label: '700', value: '700' },
							] }
							onChange={ ( val ) => setAttributes( { taglineFontWeight: val } ) }
						/>
						<Divider />
						<p>{ __( 'Post Title Size', 'twork-builder' ) }</p>
						<FontSizePicker
							value={ postTitleFontSize }
							onChange={ ( val ) =>
								setAttributes( { postTitleFontSize: parseInt( val, 10 ) || 22 } )
							}
							fontSizes={ [] }
							fallbackFontSize={ postTitleFontSize || 22 }
							withSlider
						/>
						<SelectControl
							label={ __( 'Post Title Weight', 'twork-builder' ) }
							value={ postTitleFontWeight }
							options={ [
								{ label: '400', value: '400' },
								{ label: '500', value: '500' },
								{ label: '600', value: '600' },
								{ label: '700', value: '700' },
								{ label: '800', value: '800' },
							] }
							onChange={ ( val ) => setAttributes( { postTitleFontWeight: val } ) }
						/>
						<Divider />
						<p>{ __( 'Meta Size', 'twork-builder' ) }</p>
						<FontSizePicker
							value={ postMetaFontSize }
							onChange={ ( val ) =>
								setAttributes( { postMetaFontSize: parseInt( val, 10 ) || 15 } )
							}
							fontSizes={ [] }
							fallbackFontSize={ postMetaFontSize || 15 }
							withSlider
						/>
						<SelectControl
							label={ __( 'Meta Weight', 'twork-builder' ) }
							value={ postMetaFontWeight }
							options={ [
								{ label: '400', value: '400' },
								{ label: '500', value: '500' },
								{ label: '600', value: '600' },
								{ label: '700', value: '700' },
							] }
							onChange={ ( val ) => setAttributes( { postMetaFontWeight: val } ) }
						/>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Advanced colors', 'twork-builder' ) }
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
							{ value: titleColor, onChange: ( val ) => setAttributes( { titleColor: val } ), label: __( 'Section title', 'twork-builder' ) },
							{ value: taglineColor, onChange: ( val ) => setAttributes( { taglineColor: val } ), label: __( 'Tagline text', 'twork-builder' ) },
							{ value: taglineBackgroundColor, onChange: ( val ) => setAttributes( { taglineBackgroundColor: val } ), label: __( 'Tagline background', 'twork-builder' ) },
							{ value: moreButtonTextColor, onChange: ( val ) => setAttributes( { moreButtonTextColor: val } ), label: __( 'More button text', 'twork-builder' ) },
							{ value: moreButtonBackgroundColor, onChange: ( val ) => setAttributes( { moreButtonBackgroundColor: val } ), label: __( 'More button background', 'twork-builder' ) },
							{ value: moreButtonHoverTextColor, onChange: ( val ) => setAttributes( { moreButtonHoverTextColor: val } ), label: __( 'More button text (hover)', 'twork-builder' ) },
							{ value: moreButtonHoverBackgroundColor, onChange: ( val ) => setAttributes( { moreButtonHoverBackgroundColor: val } ), label: __( 'More button background (hover)', 'twork-builder' ) },
							{ value: postTitleColor, onChange: ( val ) => setAttributes( { postTitleColor: val } ), label: __( 'Post title', 'twork-builder' ) },
							{ value: postTitleHoverColor, onChange: ( val ) => setAttributes( { postTitleHoverColor: val } ), label: __( 'Post title (hover)', 'twork-builder' ) },
							{ value: postMetaColor, onChange: ( val ) => setAttributes( { postMetaColor: val } ), label: __( 'Meta text', 'twork-builder' ) },
							{ value: postMetaIconColor, onChange: ( val ) => setAttributes( { postMetaIconColor: val } ), label: __( 'Meta icon', 'twork-builder' ) },
							{ value: dateBadgeBackgroundColor, onChange: ( val ) => setAttributes( { dateBadgeBackgroundColor: val } ), label: __( 'Date badge background', 'twork-builder' ) },
							{ value: dateBadgeTextColor, onChange: ( val ) => setAttributes( { dateBadgeTextColor: val } ), label: __( 'Date badge text', 'twork-builder' ) },
							{ value: readMoreTextColor, onChange: ( val ) => setAttributes( { readMoreTextColor: val } ), label: __( 'Read more text', 'twork-builder' ) },
							{ value: readMoreHoverTextColor, onChange: ( val ) => setAttributes( { readMoreHoverTextColor: val } ), label: __( 'Read more text (hover)', 'twork-builder' ) },
							{ value: readMoreIconColor, onChange: ( val ) => setAttributes( { readMoreIconColor: val } ), label: __( 'Read more icon', 'twork-builder' ) },
							{ value: readMoreIconBackgroundColor, onChange: ( val ) => setAttributes( { readMoreIconBackgroundColor: val } ), label: __( 'Read more icon background', 'twork-builder' ) },
							{ value: readMoreIconHoverColor, onChange: ( val ) => setAttributes( { readMoreIconHoverColor: val } ), label: __( 'Read more icon (hover)', 'twork-builder' ) },
							{ value: readMoreIconHoverBackgroundColor, onChange: ( val ) => setAttributes( { readMoreIconHoverBackgroundColor: val } ), label: __( 'Read more icon background (hover)', 'twork-builder' ) },
							{ value: cardBackgroundColor, onChange: ( val ) => setAttributes( { cardBackgroundColor: val } ), label: __( 'Card background', 'twork-builder' ) },
							{ value: cardBorderColor, onChange: ( val ) => setAttributes( { cardBorderColor: val } ), label: __( 'Card border', 'twork-builder' ) },
							{ value: imageOverlayColor, onChange: ( val ) => setAttributes( { imageOverlayColor: val } ), label: __( 'Image overlay', 'twork-builder' ) },
							{ value: imageOverlayHoverColor, onChange: ( val ) => setAttributes( { imageOverlayHoverColor: val } ), label: __( 'Image overlay (hover)', 'twork-builder' ) },
						] }
					/>
				</InspectorControls>
			) }

			<section { ...blockProps }>
					<div className="twork-blog__container">
						<div className="twork-blog__header-row">
							<div className="twork-blog__header-left">
								<div className="twork-blog__tagline">
									{ ! tagIcon ? (
										<MediaPlaceholder
											icon="format-image"
											onSelect={ ( media ) =>
												setAttributes( {
													tagIcon: media.url,
													tagIconId: media.id,
													tagIconAlt: media.alt || tagIconAlt,
													tagIconMime: media.mime || '',
												} )
											}
											allowedTypes={ [ 'image', 'video' ] }
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
											{ isVideoAsset( tagIcon, tagIconMime ) ? (
												<video
													src={ tagIcon }
													className="twork-blog__tag-icon twork-blog__tag-icon--media"
													autoPlay
													loop
													muted
													playsInline
												/>
											) : (
												<img src={ tagIcon } alt="" className="twork-blog__tag-icon" />
											) }
											<MediaUploadCheck>
												<MediaUpload
													onSelect={ ( media ) =>
														setAttributes( {
															tagIcon: media.url,
															tagIconId: media.id,
															tagIconAlt: media.alt || tagIconAlt,
															tagIconMime: media.mime || '',
														} )
													}
													allowedTypes={ [ 'image', 'video' ] }
													value={ tagIconId }
													render={ ( { open } ) => (
														<Button isSecondary isSmall onClick={ open }>
															{ __( 'Replace icon media', 'twork-builder' ) }
														</Button>
													) }
												/>
											</MediaUploadCheck>
											<Button
												isDestructive
												isSmall
												onClick={ () => setAttributes( { tagIcon: '', tagIconId: null, tagIconMime: '' } ) }
											>
												{ __( 'Remove', 'twork-builder' ) }
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
										allowedFormats={ [
											'core/bold',
											'core/italic',
										] }
									/>
								</div>
								<RichText
									tagName="h2"
									className="twork-blog__title"
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									placeholder={ __(
										'Section heading',
										'twork-builder'
									) }
									allowedFormats={ [
										'core/bold',
										'core/italic',
										'core/underline',
									] }
								/>
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
									const imgUrl = getFeaturedImageUrl(
										featured,
										imageSize || 'large'
									);

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
														<img src={ imgUrl } className="twork-blog-card__img" alt="" />
														<span className="twork-blog-card__img-overlay" aria-hidden="true" />
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
																<span className="twork-blog-card__meta-icon" aria-hidden="true">●</span>
																{ authorPrefix || '' }
																{ authorName }
															</span>
														) }

														{ showCommentsMeta &&
															commentCountSafe !== null && (
																<span>
																	<span className="twork-blog-card__meta-icon" aria-hidden="true">●</span>
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
		</>
	);
}
