import { __ } from '@wordpress/i18n';
import {
	RichText,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, ToggleControl, Button, SelectControl, ColorPalette, BaseControl } from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';

const DEFAULT_CRUMBS = [
	{ label: 'Home', url: '/' },
	{ label: 'About Us', url: '' },
];

const THEME_COLORS = [
	{ name: 'White', color: '#ffffff' },
	{ name: 'Dark Green', color: '#0c2614' },
	{ name: 'Accent Green', color: '#8bc34a' },
];

const DEFAULT_BG_COLOR = '#0c2614';
const DEFAULT_OVERLAY_OPACITY = 85;

function parseLegacyOverlayColor( legacyOverlayColor ) {
	if ( typeof legacyOverlayColor !== 'string' ) {
		return null;
	}
	const rgbaMatch = legacyOverlayColor
		.replaceAll( ' ', '' )
		.match( /^rgba?\((\d+),(\d+),(\d+)(?:,([0-9.]+))?\)$/i );
	if ( ! rgbaMatch ) {
		return null;
	}
	const r = Number( rgbaMatch[ 1 ] );
	const g = Number( rgbaMatch[ 2 ] );
	const b = Number( rgbaMatch[ 3 ] );
	const a = rgbaMatch[ 4 ] !== undefined ? Number( rgbaMatch[ 4 ] ) : 1;
	if ( [ r, g, b, a ].some( ( n ) => Number.isNaN( n ) ) ) {
		return null;
	}
	const clampedA = Math.max( 0, Math.min( 1, a ) );
	const toHex = ( n ) => Math.max( 0, Math.min( 255, n ) ).toString( 16 ).padStart( 2, '0' );
	return {
		color: `#${ toHex( r ) }${ toHex( g ) }${ toHex( b ) }`,
		opacity: Math.round( clampedA * 100 ),
	};
}

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		title,
		backgroundType,
		backgroundVideo,
		backgroundImage,
		backgroundImageId,
		backgroundColor,
		overlayOpacity,
		titleColor,
		titleFontSize,
		breadcrumbColor,
		breadcrumbActiveColor,
		backgroundPosition,
		graphicImage,
		graphicImageId,
		graphicAlt,
		graphicMaxWidth,
		overlayColor,
		breadcrumbs,
		separatorChar,
		containerMaxWidth,
		containerWidthPct,
		paddingTop,
		paddingBottom,
		containerMinHeight,
		enableTractorAnimation,
		fallbackBgColor,
		hasMigratedLegacyBg,
	} = attributes;

	const crumbs = Array.isArray( breadcrumbs ) && breadcrumbs.length ? breadcrumbs : DEFAULT_CRUMBS;

	const updateCrumb = ( index, field, value ) => {
		const next = crumbs.map( ( c, i ) => ( i === index ? { ...c, [ field ]: value } : c ) );
		setAttributes( { breadcrumbs: next } );
	};

	const addCrumb = () => {
		setAttributes( {
			breadcrumbs: [ ...crumbs, { label: __( 'New item', 'twork-builder' ), url: '' } ],
		} );
	};

	const removeCrumb = ( index ) => {
		if ( crumbs.length < 2 ) {
			return;
		}
		setAttributes( { breadcrumbs: crumbs.filter( ( _, i ) => i !== index ) } );
	};

	// Backward compatibility: map legacy overlayColor/fallbackBgColor into new attributes.
	useEffect( () => {
		if ( hasMigratedLegacyBg ) {
			return;
		}

		const patch = {};

		if (
			typeof fallbackBgColor === 'string' &&
			fallbackBgColor &&
			backgroundColor === DEFAULT_BG_COLOR
		) {
			patch.backgroundColor = fallbackBgColor;
		}

		const parsedLegacyOverlay = parseLegacyOverlayColor( overlayColor );
		if ( parsedLegacyOverlay ) {
			if ( backgroundColor === DEFAULT_BG_COLOR ) {
				patch.backgroundColor = parsedLegacyOverlay.color;
			}
			if ( overlayOpacity === DEFAULT_OVERLAY_OPACITY ) {
				patch.overlayOpacity = parsedLegacyOverlay.opacity;
			}
		}

		patch.hasMigratedLegacyBg = true;
		setAttributes( patch );
	}, [
		backgroundColor,
		fallbackBgColor,
		hasMigratedLegacyBg,
		overlayColor,
		overlayOpacity,
		setAttributes,
	] );

	const blockProps = useBlockProps( {
		className: 'twork-page-header twork-page-header-section twork-page-header-section-editor',
		style: {
			'--tw-bg-color': backgroundColor,
			'--tw-overlay-opacity': `${ overlayOpacity / 100 }`,
			'--tw-title-size': `${ titleFontSize }px`,
			'--tw-title-color': titleColor,
			'--tw-crumb-color': breadcrumbColor,
			'--tw-crumb-active-color': breadcrumbActiveColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--twork-page-header-max': `${ containerMaxWidth }px`,
			'--twork-page-header-width-pct': `${ containerWidthPct }%`,
			'--twork-page-header-min-h': `${ containerMinHeight }px`,
		},
		'data-tractor-anim': enableTractorAnimation ? 'true' : 'false',
	} );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody title={ __( 'Background Settings', 'twork-builder' ) } initialOpen={ true }>
						<SelectControl
							label={ __( 'Background type', 'twork-builder' ) }
							value={ backgroundType }
							options={ [
								{ label: __( 'Image', 'twork-builder' ), value: 'image' },
								{ label: __( 'Video', 'twork-builder' ), value: 'video' },
								{ label: __( 'Color', 'twork-builder' ), value: 'color' },
							] }
							onChange={ ( value ) => setAttributes( { backgroundType: value } ) }
						/>

						{ backgroundType === 'image' && (
							<>
								{ ! backgroundImage ? (
									<MediaPlaceholder
										icon="format-image"
										onSelect={ ( media ) => setAttributes( { backgroundImage: media.url, backgroundImageId: media.id } ) }
										allowedTypes={ [ 'image' ] }
										multiple={ false }
										labels={ { title: __( 'Header background image', 'twork-builder' ) } }
									/>
								) : (
									<>
										<img src={ backgroundImage } alt="" style={ { width: '100%', maxHeight: 140, objectFit: 'cover', borderRadius: 6 } } />
										<Button isSecondary isSmall onClick={ () => setAttributes( { backgroundImage: '', backgroundImageId: null } ) }>
											{ __( 'Remove image', 'twork-builder' ) }
										</Button>
									</>
								) }
								<SelectControl
									label={ __( 'Background position', 'twork-builder' ) }
									value={ backgroundPosition }
									options={ [
										{ label: __( 'Center', 'twork-builder' ), value: 'center center' },
										{ label: __( 'Top', 'twork-builder' ), value: 'center top' },
										{ label: __( 'Bottom', 'twork-builder' ), value: 'center bottom' },
										{ label: __( 'Left', 'twork-builder' ), value: 'left center' },
										{ label: __( 'Right', 'twork-builder' ), value: 'right center' },
									] }
									onChange={ ( value ) => setAttributes( { backgroundPosition: value } ) }
								/>
							</>
						) }

						{ backgroundType === 'video' && (
							<>
								{ ! backgroundVideo ? (
									<MediaPlaceholder
										icon="video-alt3"
										onSelect={ ( media ) => setAttributes( { backgroundVideo: media.url } ) }
										allowedTypes={ [ 'video' ] }
										multiple={ false }
										labels={ { title: __( 'Background video', 'twork-builder' ) } }
									/>
								) : (
									<>
										<video src={ backgroundVideo } style={ { width: '100%', maxHeight: 180, borderRadius: 6 } } muted playsInline />
										<Button isSecondary isSmall onClick={ () => setAttributes( { backgroundVideo: '' } ) }>
											{ __( 'Remove video', 'twork-builder' ) }
										</Button>
									</>
								) }
							</>
						) }

						<BaseControl label={ __( 'Background color', 'twork-builder' ) }>
							<ColorPalette
								colors={ THEME_COLORS }
								value={ backgroundColor }
								onChange={ ( value ) => setAttributes( { backgroundColor: value || '#0c2614' } ) }
							/>
						</BaseControl>

						<RangeControl
							label={ __( 'Overlay opacity (%)', 'twork-builder' ) }
							value={ overlayOpacity }
							onChange={ ( value ) => setAttributes( { overlayOpacity: value || 0 } ) }
							min={ 0 }
							max={ 100 }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Title Settings', 'twork-builder' ) } initialOpen={ false }>
						<TextControl label={ __( 'Page title', 'twork-builder' ) } value={ title } onChange={ ( value ) => setAttributes( { title: value } ) } />
						<RangeControl
							label={ __( 'Title size (px)', 'twork-builder' ) }
							value={ titleFontSize }
							onChange={ ( value ) => setAttributes( { titleFontSize: value || 0 } ) }
							min={ 24 }
							max={ 120 }
						/>
						<BaseControl label={ __( 'Title color', 'twork-builder' ) }>
							<ColorPalette colors={ THEME_COLORS } value={ titleColor } onChange={ ( value ) => setAttributes( { titleColor: value || '#ffffff' } ) } />
						</BaseControl>
					</PanelBody>

					<PanelBody title={ __( 'Breadcrumb Settings', 'twork-builder' ) } initialOpen={ false }>
						<TextControl label={ __( 'Separator', 'twork-builder' ) } value={ separatorChar } onChange={ ( value ) => setAttributes( { separatorChar: value } ) } />
						<BaseControl label={ __( 'Breadcrumb text color', 'twork-builder' ) }>
							<ColorPalette colors={ THEME_COLORS } value={ breadcrumbColor } onChange={ ( value ) => setAttributes( { breadcrumbColor: value || '#ffffff' } ) } />
						</BaseControl>
						<BaseControl label={ __( 'Active breadcrumb color', 'twork-builder' ) }>
							<ColorPalette colors={ THEME_COLORS } value={ breadcrumbActiveColor } onChange={ ( value ) => setAttributes( { breadcrumbActiveColor: value || '#8bc34a' } ) } />
						</BaseControl>
						{ crumbs.map( ( crumb, index ) => (
							<div key={ index } style={ { marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #ddd' } }>
								<TextControl label={ __( 'Label', 'twork-builder' ) } value={ crumb.label } onChange={ ( value ) => updateCrumb( index, 'label', value ) } />
								<TextControl label={ __( 'URL (empty = current)', 'twork-builder' ) } value={ crumb.url } onChange={ ( value ) => updateCrumb( index, 'url', value ) } placeholder="/" />
								<Button isDestructive isSmall disabled={ crumbs.length < 2 } onClick={ () => removeCrumb( index ) }>
									{ __( 'Remove', 'twork-builder' ) }
								</Button>
							</div>
						) ) }
						<Button isSecondary onClick={ addCrumb }>
							{ __( 'Add crumb', 'twork-builder' ) }
						</Button>
					</PanelBody>

					<PanelBody title={ __( 'Graphic Settings', 'twork-builder' ) } initialOpen={ false }>
						<TextControl label={ __( 'Image alt text', 'twork-builder' ) } value={ graphicAlt } onChange={ ( value ) => setAttributes( { graphicAlt: value } ) } />
						{ ! graphicImage ? (
							<MediaPlaceholder
								icon="format-image"
								onSelect={ ( media ) => setAttributes( { graphicImage: media.url, graphicImageId: media.id, graphicAlt: media.alt || graphicAlt } ) }
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ { title: __( 'Side graphic (PNG/SVG)', 'twork-builder' ) } }
							/>
						) : (
							<>
								<img src={ graphicImage } alt="" style={ { maxWidth: graphicMaxWidth, height: 'auto' } } />
								<Button isSecondary isSmall onClick={ () => setAttributes( { graphicImage: '', graphicImageId: null } ) }>
									{ __( 'Remove graphic', 'twork-builder' ) }
								</Button>
							</>
						) }
						<RangeControl label={ __( 'Max width (px)', 'twork-builder' ) } value={ graphicMaxWidth } onChange={ ( value ) => setAttributes( { graphicMaxWidth: value } ) } min={ 200 } max={ 640 } step={ 10 } />
						<ToggleControl label={ __( 'Slide-in animation', 'twork-builder' ) } checked={ enableTractorAnimation } onChange={ ( value ) => setAttributes( { enableTractorAnimation: value } ) } />
					</PanelBody>

					<PanelBody title={ __( 'Layout Settings', 'twork-builder' ) } initialOpen={ false }>
						<RangeControl label={ __( 'Container max width (px)', 'twork-builder' ) } value={ containerMaxWidth } onChange={ ( value ) => setAttributes( { containerMaxWidth: value } ) } min={ 600 } max={ 1600 } step={ 10 } />
						<RangeControl label={ __( 'Container width (%)', 'twork-builder' ) } value={ containerWidthPct } onChange={ ( value ) => setAttributes( { containerWidthPct: value } ) } min={ 70 } max={ 100 } />
						<RangeControl label={ __( 'Padding top (px)', 'twork-builder' ) } value={ paddingTop } onChange={ ( value ) => setAttributes( { paddingTop: value } ) } min={ 60 } max={ 280 } step={ 4 } />
						<RangeControl label={ __( 'Padding bottom (px)', 'twork-builder' ) } value={ paddingBottom } onChange={ ( value ) => setAttributes( { paddingBottom: value } ) } min={ 40 } max={ 200 } step={ 4 } />
						<RangeControl label={ __( 'Content row min height (px)', 'twork-builder' ) } value={ containerMinHeight } onChange={ ( value ) => setAttributes( { containerMinHeight: value } ) } min={ 120 } max={ 400 } step={ 10 } />
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				{ backgroundType === 'video' && backgroundVideo && (
					<div className="twork-page-header__video-layer" aria-hidden="true">
						<video src={ backgroundVideo } autoPlay muted loop playsInline />
					</div>
				) }
				{ backgroundType === 'image' && backgroundImage && (
					<div className="twork-page-header__image-layer" style={ { backgroundImage: `url(${ backgroundImage })`, backgroundPosition } } aria-hidden="true" />
				) }
				<div className="twork-page-header__bg-overlay" aria-hidden="true" />

				<div className="twork-page-header__container">
					<div className="twork-page-header__content">
						<RichText
							tagName="h1"
							className="twork-page-header__title"
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
							placeholder={ __( 'Page title', 'twork-builder' ) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>

						{ crumbs.length > 0 && (
							<nav
								className="twork-page-header__breadcrumb-nav"
								aria-label="Breadcrumb"
							>
								<ul className="twork-page-header__breadcrumb">
									{ crumbs.map( ( crumb, index ) => {
										const label = crumb?.label ?? '';
										const url = crumb?.url ?? '';
										const isCurrent =
											String( url ).trim() === '';
										return (
											<Fragment key={ index }>
												{ index > 0 && (
													<li
														className="separator"
														aria-hidden="true"
													>
														{ separatorChar || '•' }
													</li>
												) }
												<li
													className={
														isCurrent
															? 'active'
															: undefined
													}
													{ ...( isCurrent
														? {
																'aria-current':
																	'page',
														  }
														: {} ) }
												>
													{ ! isCurrent ? (
														<a
															href={ url }
															onClick={ ( event ) =>
																event.preventDefault()
															}
														>
															{ label }
														</a>
													) : (
														label
													) }
												</li>
											</Fragment>
										);
									} ) }
								</ul>
							</nav>
						) }
					</div>

					{ graphicImage ? (
						<div className="twork-page-header__graphic">
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										graphicImage: media.url,
										graphicImageId: media.id,
										graphicAlt: media.alt || graphicAlt,
									} )
								}
								allowedTypes={ [ 'image' ] }
								value={ graphicImageId }
								render={ ( { open } ) => (
									<img
										src={ graphicImage }
										alt={ graphicAlt || '' }
										className="twork-page-header__img"
										style={ { maxWidth: `${ graphicMaxWidth }px` } }
										onClick={ open }
										role="button"
										tabIndex={ 0 }
										onKeyDown={ ( event ) => {
											if ( event.key === 'Enter' || event.key === ' ' ) {
												event.preventDefault();
												open();
											}
										} }
									/>
								) }
							/>
						</div>
					) : (
						<div className="twork-page-header__graphic twork-page-header__graphic--placeholder">
							<MediaPlaceholder
								icon="format-image"
								onSelect={ ( media ) => setAttributes( { graphicImage: media.url, graphicImageId: media.id, graphicAlt: media.alt || graphicAlt } ) }
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ { title: __( 'Graphic', 'twork-builder' ) } }
							/>
						</div>
					) }
				</div>
			</section>
		</>
	);
}
