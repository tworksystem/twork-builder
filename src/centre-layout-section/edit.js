import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	Button,
	BaseControl,
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

/** Icon type options: Image/GIF, Video, WordPress Dashicons, or Font Awesome */
const ICON_TYPE_OPTIONS = [
	{ value: 'fontawesome', label: __( 'Font Awesome', 'twork-builder' ) },
	{
		value: 'dashicon',
		label: __( 'WordPress (Dashicons)', 'twork-builder' ),
	},
	{ value: 'image', label: __( 'Image / GIF', 'twork-builder' ) },
	{ value: 'video', label: __( 'Video', 'twork-builder' ) },
];

/** Dashicons suitable for contact/phone/nav */
const DASHICON_OPTIONS = [
	{ value: 'dashicons-phone', label: __( 'Phone', 'twork-builder' ) },
	{ value: 'dashicons-email', label: __( 'Email', 'twork-builder' ) },
	{ value: 'dashicons-headset', label: __( 'Headset', 'twork-builder' ) },
	{ value: 'dashicons-location', label: __( 'Location', 'twork-builder' ) },
	{ value: 'dashicons-clock', label: __( 'Clock', 'twork-builder' ) },
	{ value: 'dashicons-heart', label: __( 'Heart', 'twork-builder' ) },
	{ value: 'dashicons-editor-help', label: __( 'Help', 'twork-builder' ) },
	{
		value: 'dashicons-arrow-right-alt2',
		label: __( 'Arrow right', 'twork-builder' ),
	},
	{
		value: 'dashicons-arrow-right',
		label: __( 'Arrow (alt)', 'twork-builder' ),
	},
	{ value: 'dashicons-admin-generic', label: __( 'Cog', 'twork-builder' ) },
	{ value: 'dashicons-yes', label: __( 'Check', 'twork-builder' ) },
];

/** Renders one icon by type (editor + save). className/style apply to wrapper for image/video. */
function CentreIconRender( {
	iconType,
	faClass,
	dashicon,
	imageUrl,
	videoUrl,
	className = '',
	style = {},
} ) {
	const wrap = ( content ) => (
		<span
			className={ `centre-icon-wrap ${ className }`.trim() }
			style={ style }
			aria-hidden="true"
		>
			{ content }
		</span>
	);

	if ( iconType === 'image' && imageUrl ) {
		return wrap(
			<img src={ imageUrl } alt="" className="centre-icon-img" />
		);
	}
	if ( iconType === 'video' && videoUrl ) {
		return wrap(
			<video
				src={ videoUrl }
				className="centre-icon-video"
				muted
				loop
				playsInline
				autoPlay
				aria-hidden="true"
			/>
		);
	}
	if ( iconType === 'dashicon' && dashicon ) {
		return wrap( <span className={ `dashicons ${ dashicon }` } /> );
	}
	if ( faClass ) {
		return wrap( <i className={ faClass } /> );
	}
	return null;
}

const ALLOWED_BLOCKS = [
	'twork/centre-overview-section',
	'twork/centre-treatments-section',
	'twork/centre-conditions-section',
	'twork/centre-doctors-section',
	'twork/centre-specialists-section',
	'twork/centre-technology-section',
	'twork/centre-faq-section',
	'twork/centre-cta-section',
];

const TEMPLATE = [
	[ 'twork/centre-overview-section', {} ],
	[ 'twork/centre-treatments-section', {} ],
	[ 'twork/centre-conditions-section', {} ],
	[ 'twork/centre-doctors-section', {} ],
	[ 'twork/centre-specialists-section', {} ],
	[ 'twork/centre-technology-section', {} ],
	[ 'twork/centre-faq-section', {} ],
	[ 'twork/centre-cta-section', {} ],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sidebarHeader,
		navItems,
		contactIcon,
		contactIconType,
		contactDashicon,
		contactIconImageUrl,
		contactIconImageId,
		contactIconVideoUrl,
		contactIconVideoId,
		contactPhoneIconType,
		contactPhoneIcon,
		contactPhoneDashicon,
		contactPhoneIconImageUrl,
		contactPhoneIconImageId,
		contactPhoneIconVideoUrl,
		contactPhoneIconVideoId,
		navArrowIconType,
		navArrowIcon,
		navArrowDashicon,
		navArrowImageUrl,
		navArrowImageId,
		navArrowVideoUrl,
		navArrowVideoId,
		contactTitle,
		contactText,
		contactPhone,
		contactPhoneUrl,
		showSidebarContact,
		contactBackgroundImage,
		contactBackgroundImageId,
		containerMaxWidth,
		containerPadding,
		paddingTop,
		paddingBottom,
		sidebarWidth,
		gap,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-centre-layout-section twork-centre-layout-editor',
			style: {
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ paddingBottom, paddingTop ]
	);

	const updateNavItem = ( index, field, value ) => {
		const next = [ ...( navItems || [] ) ];
		if ( ! next[ index ] )
			next[ index ] = { label: '', href: '#', active: false };
		next[ index ] = { ...next[ index ], [ field ]: value };
		setAttributes( { navItems: next } );
	};

	const addNavItem = () => {
		setAttributes( {
			navItems: [
				...( navItems || [] ),
				{ label: '', href: '#', active: false },
			],
		} );
	};

	const removeNavItem = ( index ) => {
		const next = ( navItems || [] ).filter( ( _, i ) => i !== index );
		setAttributes( { navItems: next } );
	};

	const layoutStyle = {
		'--centre-container-max': `${ containerMaxWidth }px`,
		'--centre-container-padding': `${ containerPadding }px`,
		'--centre-sidebar-width': `${ sidebarWidth }px`,
		'--centre-gap': `${ gap }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Sidebar Menu', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Sidebar Header', 'twork-builder' ) }
							value={ sidebarHeader }
							onChange={ ( v ) =>
								setAttributes( {
									sidebarHeader: v || 'Clinical Centres',
								} )
							}
							help={ __(
								'e.g. Clinical Centres',
								'twork-builder'
							) }
						/>

						<Divider />
						{ ( navItems || [] ).map( ( item, i ) => (
							<div
								key={ i }
								style={ {
									marginBottom: 16,
									paddingBottom: 16,
									borderBottom: '1px solid #ddd',
								} }
							>
								<TextControl
									label={ `${ __(
										'Link',
										'twork-builder'
									) } ${ i + 1 } ${ __(
										'Label',
										'twork-builder'
									) }` }
									value={ item?.label || '' }
									onChange={ ( v ) =>
										updateNavItem( i, 'label', v )
									}
								/>

								<TextControl
									label={ `${ __(
										'Link',
										'twork-builder'
									) } ${ i + 1 } ${ __(
										'URL',
										'twork-builder'
									) }` }
									value={ item?.href || '#' }
									onChange={ ( v ) =>
										updateNavItem( i, 'href', v || '#' )
									}
								/>

								<ToggleControl
									label={ __(
										'Current page (active)',
										'twork-builder'
									) }
									checked={ !! item?.active }
									onChange={ ( v ) =>
										updateNavItem( i, 'active', v )
									}
									help={ __(
										'Highlight this link as the current page',
										'twork-builder'
									) }
								/>

								<Button
									isDestructive
									isSmall
									onClick={ () => removeNavItem( i ) }
									style={ { marginTop: 8 } }
								>
									{ __( 'Remove link', 'twork-builder' ) }
								</Button>
							</div>
						) ) }
						<Button isSecondary isSmall onClick={ addNavItem }>
							{ __( 'Add link', 'twork-builder' ) }
						</Button>
						<Divider />
						<BaseControl
							label={ __(
								'Nav link arrow icon',
								'twork-builder'
							) }
							help={ __(
								'Icon shown after each menu link.',
								'twork-builder'
							) }
						>
							<SelectControl
								label={ __( 'Icon type', 'twork-builder' ) }
								value={ navArrowIconType || 'fontawesome' }
								options={ ICON_TYPE_OPTIONS }
								onChange={ ( v ) =>
									setAttributes( { navArrowIconType: v } )
								}
							/>

							{ ( navArrowIconType || 'fontawesome' ) ===
								'fontawesome' && (
								<TextControl
									label={ __(
										'Font Awesome class',
										'twork-builder'
									) }
									value={
										navArrowIcon || 'fas fa-chevron-right'
									}
									onChange={ ( v ) =>
										setAttributes( {
											navArrowIcon:
												v || 'fas fa-chevron-right',
										} )
									}
									help={ __(
										'e.g. fas fa-chevron-right',
										'twork-builder'
									) }
								/>
							) }
							{ ( navArrowIconType || 'fontawesome' ) ===
								'dashicon' && (
								<SelectControl
									label={ __( 'Dashicon', 'twork-builder' ) }
									value={
										navArrowDashicon ||
										'dashicons-arrow-right-alt2'
									}
									options={ DASHICON_OPTIONS }
									onChange={ ( v ) =>
										setAttributes( { navArrowDashicon: v } )
									}
								/>
							) }
							{ ( navArrowIconType || 'fontawesome' ) ===
								'image' && (
								<>
									{ ! navArrowImageUrl ? (
										<MediaPlaceholder
											onSelect={ ( media ) =>
												setAttributes( {
													navArrowImageUrl: media.url,
													navArrowImageId: media.id,
												} )
											}
											allowedTypes={ [ 'image' ] }
											multiple={ false }
											labels={ {
												title: __(
													'Arrow icon (image/GIF)',
													'twork-builder'
												),
											} }
										/>
									) : (
										<div>
											<img
												src={ navArrowImageUrl }
												alt=""
												style={ {
													maxWidth: '100%',
													height: 'auto',
													marginBottom: 8,
												} }
											/>

											<Button
												isSecondary
												isSmall
												onClick={ () =>
													setAttributes( {
														navArrowImageUrl: '',
														navArrowImageId:
															undefined,
													} )
												}
											>
												{ __(
													'Remove',
													'twork-builder'
												) }
											</Button>
										</div>
									) }
								</>
							) }
							{ ( navArrowIconType || 'fontawesome' ) ===
								'video' && (
								<>
									{ ! navArrowVideoUrl ? (
										<MediaPlaceholder
											onSelect={ ( media ) =>
												setAttributes( {
													navArrowVideoUrl: media.url,
													navArrowVideoId: media.id,
												} )
											}
											allowedTypes={ [ 'video' ] }
											multiple={ false }
											labels={ {
												title: __(
													'Arrow icon (video)',
													'twork-builder'
												),
											} }
										/>
									) : (
										<div>
											<video
												src={ navArrowVideoUrl }
												style={ {
													maxWidth: '100%',
													marginBottom: 8,
												} }
												muted
												loop
												playsInline
												width={ 120 }
											/>

											<Button
												isSecondary
												isSmall
												onClick={ () =>
													setAttributes( {
														navArrowVideoUrl: '',
														navArrowVideoId:
															undefined,
													} )
												}
											>
												{ __(
													'Remove',
													'twork-builder'
												) }
											</Button>
										</div>
									) }
								</>
							) }
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __(
							'Sidebar Contact Widget',
							'twork-builder'
						) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show contact widget',
								'twork-builder'
							) }
							checked={ showSidebarContact !== false }
							onChange={ ( v ) =>
								setAttributes( { showSidebarContact: v } )
							}
							help={ __(
								'Display the emergency/contact box in sidebar and on mobile.',
								'twork-builder'
							) }
						/>

						{ showSidebarContact !== false && (
							<>
								<Divider />
								<BaseControl
									label={ __(
										'Background image',
										'twork-builder'
									) }
									help={ __(
										'Optional. Leave empty to use default background.',
										'twork-builder'
									) }
								>
									{ ! contactBackgroundImage ? (
										<MediaPlaceholder
											onSelect={ ( media ) =>
												setAttributes( {
													contactBackgroundImage:
														media.url,
													contactBackgroundImageId:
														media.id,
												} )
											}
											allowedTypes={ [ 'image' ] }
											multiple={ false }
											labels={ {
												title: __(
													'Contact widget background',
													'twork-builder'
												),
											} }
										/>
									) : (
										<div>
											<img
												src={ contactBackgroundImage }
												alt=""
												style={ {
													width: '100%',
													height: 'auto',
													marginBottom: 10,
												} }
											/>

											<Button
												isSecondary
												isSmall
												onClick={ () =>
													setAttributes( {
														contactBackgroundImage:
															'',
														contactBackgroundImageId:
															undefined,
													} )
												}
											>
												{ __(
													'Remove image',
													'twork-builder'
												) }
											</Button>
										</div>
									) }
								</BaseControl>
								<Divider />
								<BaseControl
									label={ __(
										'Contact widget icon (main)',
										'twork-builder'
									) }
									help={ __(
										'Large icon above the title.',
										'twork-builder'
									) }
								>
									<SelectControl
										label={ __(
											'Icon type',
											'twork-builder'
										) }
										value={
											contactIconType || 'fontawesome'
										}
										options={ ICON_TYPE_OPTIONS }
										onChange={ ( v ) =>
											setAttributes( {
												contactIconType: v,
											} )
										}
									/>

									{ ( contactIconType || 'fontawesome' ) ===
										'fontawesome' && (
										<TextControl
											label={ __(
												'Font Awesome class',
												'twork-builder'
											) }
											value={
												contactIcon || 'fas fa-headset'
											}
											onChange={ ( v ) =>
												setAttributes( {
													contactIcon:
														v || 'fas fa-headset',
												} )
											}
											help={ __(
												'e.g. fas fa-headset',
												'twork-builder'
											) }
										/>
									) }
									{ ( contactIconType || 'fontawesome' ) ===
										'dashicon' && (
										<SelectControl
											label={ __(
												'WordPress Dashicon',
												'twork-builder'
											) }
											value={
												contactDashicon ||
												'dashicons-phone'
											}
											options={ DASHICON_OPTIONS }
											onChange={ ( v ) =>
												setAttributes( {
													contactDashicon: v,
												} )
											}
										/>
									) }
									{ ( contactIconType || 'fontawesome' ) ===
										'image' && (
										<>
											{ ! contactIconImageUrl ? (
												<MediaPlaceholder
													onSelect={ ( media ) =>
														setAttributes( {
															contactIconImageUrl:
																media.url,
															contactIconImageId:
																media.id,
														} )
													}
													allowedTypes={ [ 'image' ] }
													multiple={ false }
													labels={ {
														title: __(
															'Icon image / GIF',
															'twork-builder'
														),
													} }
												/>
											) : (
												<div>
													<img
														src={
															contactIconImageUrl
														}
														alt=""
														style={ {
															maxWidth: '100%',
															height: 'auto',
															marginBottom: 8,
														} }
													/>

													<Button
														isSecondary
														isSmall
														onClick={ () =>
															setAttributes( {
																contactIconImageUrl:
																	'',
																contactIconImageId:
																	undefined,
															} )
														}
													>
														{ __(
															'Remove',
															'twork-builder'
														) }
													</Button>
												</div>
											) }
										</>
									) }
									{ ( contactIconType || 'fontawesome' ) ===
										'video' && (
										<>
											{ ! contactIconVideoUrl ? (
												<MediaPlaceholder
													onSelect={ ( media ) =>
														setAttributes( {
															contactIconVideoUrl:
																media.url,
															contactIconVideoId:
																media.id,
														} )
													}
													allowedTypes={ [ 'video' ] }
													multiple={ false }
													labels={ {
														title: __(
															'Icon video',
															'twork-builder'
														),
													} }
												/>
											) : (
												<div>
													<video
														src={
															contactIconVideoUrl
														}
														style={ {
															maxWidth: '100%',
															marginBottom: 8,
														} }
														muted
														loop
														playsInline
														width={ 120 }
													/>

													<Button
														isSecondary
														isSmall
														onClick={ () =>
															setAttributes( {
																contactIconVideoUrl:
																	'',
																contactIconVideoId:
																	undefined,
															} )
														}
													>
														{ __(
															'Remove',
															'twork-builder'
														) }
													</Button>
												</div>
											) }
										</>
									) }
								</BaseControl>
								<Divider />
								<BaseControl
									label={ __(
										'Phone button icon',
										'twork-builder'
									) }
									help={ __(
										'Icon inside the call button.',
										'twork-builder'
									) }
								>
									<SelectControl
										label={ __(
											'Icon type',
											'twork-builder'
										) }
										value={
											contactPhoneIconType ||
											'fontawesome'
										}
										options={ ICON_TYPE_OPTIONS }
										onChange={ ( v ) =>
											setAttributes( {
												contactPhoneIconType: v,
											} )
										}
									/>

									{ ( contactPhoneIconType ||
										'fontawesome' ) === 'fontawesome' && (
										<TextControl
											label={ __(
												'Font Awesome class',
												'twork-builder'
											) }
											value={
												contactPhoneIcon ||
												'fas fa-phone'
											}
											onChange={ ( v ) =>
												setAttributes( {
													contactPhoneIcon:
														v || 'fas fa-phone',
												} )
											}
											help={ __(
												'e.g. fas fa-phone',
												'twork-builder'
											) }
										/>
									) }
									{ ( contactPhoneIconType ||
										'fontawesome' ) === 'dashicon' && (
										<SelectControl
											label={ __(
												'WordPress Dashicon',
												'twork-builder'
											) }
											value={
												contactPhoneDashicon ||
												'dashicons-phone'
											}
											options={ DASHICON_OPTIONS }
											onChange={ ( v ) =>
												setAttributes( {
													contactPhoneDashicon: v,
												} )
											}
										/>
									) }
									{ ( contactPhoneIconType ||
										'fontawesome' ) === 'image' && (
										<>
											{ ! contactPhoneIconImageUrl ? (
												<MediaPlaceholder
													onSelect={ ( media ) =>
														setAttributes( {
															contactPhoneIconImageUrl:
																media.url,
															contactPhoneIconImageId:
																media.id,
														} )
													}
													allowedTypes={ [ 'image' ] }
													multiple={ false }
													labels={ {
														title: __(
															'Button icon (image/GIF)',
															'twork-builder'
														),
													} }
												/>
											) : (
												<div>
													<img
														src={
															contactPhoneIconImageUrl
														}
														alt=""
														style={ {
															maxWidth: '100%',
															height: 'auto',
															marginBottom: 8,
														} }
													/>

													<Button
														isSecondary
														isSmall
														onClick={ () =>
															setAttributes( {
																contactPhoneIconImageUrl:
																	'',
																contactPhoneIconImageId:
																	undefined,
															} )
														}
													>
														{ __(
															'Remove',
															'twork-builder'
														) }
													</Button>
												</div>
											) }
										</>
									) }
									{ ( contactPhoneIconType ||
										'fontawesome' ) === 'video' && (
										<>
											{ ! contactPhoneIconVideoUrl ? (
												<MediaPlaceholder
													onSelect={ ( media ) =>
														setAttributes( {
															contactPhoneIconVideoUrl:
																media.url,
															contactPhoneIconVideoId:
																media.id,
														} )
													}
													allowedTypes={ [ 'video' ] }
													multiple={ false }
													labels={ {
														title: __(
															'Button icon (video)',
															'twork-builder'
														),
													} }
												/>
											) : (
												<div>
													<video
														src={
															contactPhoneIconVideoUrl
														}
														style={ {
															maxWidth: '100%',
															marginBottom: 8,
														} }
														muted
														loop
														playsInline
														width={ 120 }
													/>

													<Button
														isSecondary
														isSmall
														onClick={ () =>
															setAttributes( {
																contactPhoneIconVideoUrl:
																	'',
																contactPhoneIconVideoId:
																	undefined,
															} )
														}
													>
														{ __(
															'Remove',
															'twork-builder'
														) }
													</Button>
												</div>
											) }
										</>
									) }
								</BaseControl>
								<Divider />
								<TextControl
									label={ __( 'Title', 'twork-builder' ) }
									value={ contactTitle }
									onChange={ ( v ) =>
										setAttributes( { contactTitle: v } )
									}
								/>

								<TextControl
									label={ __(
										'Description',
										'twork-builder'
									) }
									value={ contactText }
									onChange={ ( v ) =>
										setAttributes( { contactText: v } )
									}
									multiline
								/>

								<TextControl
									label={ __(
										'Phone number (display)',
										'twork-builder'
									) }
									value={ contactPhone }
									onChange={ ( v ) =>
										setAttributes( { contactPhone: v } )
									}
								/>

								<TextControl
									label={ __( 'Phone URL', 'twork-builder' ) }
									value={ contactPhoneUrl }
									onChange={ ( v ) =>
										setAttributes( {
											contactPhoneUrl: v || 'tel:',
										} )
									}
									help={ __(
										'e.g. tel:09789101101',
										'twork-builder'
									) }
								/>
							</>
						) }
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
							onChange={ ( v ) =>
								setAttributes( { containerMaxWidth: v } )
							}
							min={ 800 }
							max={ 1920 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( v ) =>
								setAttributes( { containerPadding: v } )
							}
							min={ 0 }
							max={ 80 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Sidebar width (px)',
								'twork-builder'
							) }
							value={ sidebarWidth }
							onChange={ ( v ) =>
								setAttributes( { sidebarWidth: v } )
							}
							min={ 200 }
							max={ 400 }
							step={ 10 }
						/>

						<RangeControl
							label={ __( 'Gap (px)', 'twork-builder' ) }
							value={ gap }
							onChange={ ( v ) => setAttributes( { gap: v } ) }
							min={ 20 }
							max={ 80 }
							step={ 5 }
						/>

						<RangeControl
							label={ __( 'Padding top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( v ) =>
								setAttributes( { paddingTop: v } )
							}
							min={ 40 }
							max={ 120 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( v ) =>
								setAttributes( { paddingBottom: v } )
							}
							min={ 40 }
							max={ 120 }
							step={ 5 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section
				{ ...blockProps }
				className={ [ blockProps.className, 'section-padding' ]
					.filter( Boolean )
					.join( ' ' ) }
			>
				<div className="centre-layout" style={ layoutStyle }>
					<div className="jivaka-container layout-grid centre-grid">
						<aside
							className="sidebar-wrapper"
							aria-label={ __(
								'Centre sidebar',
								'twork-builder'
							) }
						>
							<div className="centre-editor-sidebar-label">
								{ __(
									'Sidebar – edit in block settings (right panel)',
									'twork-builder'
								) }
							</div>
							<div className="sidebar animate-sidebar">
								<div className="sidebar-header">
									{ sidebarHeader }
								</div>
								<nav
									className="sidebar-menu"
									aria-label={ __(
										'Clinical centres',
										'twork-builder'
									) }
								>
									{ ( navItems || [] ).map( ( item, i ) => (
										<a
											key={ i }
											href={ item?.href || '#' }
											className={
												item?.active ? 'active' : ''
											}
											onClick={ ( e ) =>
												e.preventDefault()
											}
											role="presentation"
										>
											{ item?.label || `Link ${ i + 1 }` }{ ' ' }
											<CentreIconRender
												iconType={
													navArrowIconType ||
													'fontawesome'
												}
												faClass={
													navArrowIcon ||
													'fas fa-chevron-right'
												}
												dashicon={ navArrowDashicon }
												imageUrl={ navArrowImageUrl }
												videoUrl={ navArrowVideoUrl }
												className="centre-nav-arrow-icon"
											/>
										</a>
									) ) }
								</nav>
							</div>
							{ showSidebarContact !== false ? (
								<div
									className="sidebar-contact animate-sidebar"
									style={
										contactBackgroundImage
											? {
													backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${ contactBackgroundImage })`,
													backgroundSize: 'cover',
											  }
											: undefined
									}
								>
									<CentreIconRender
										iconType={
											contactIconType || 'fontawesome'
										}
										faClass={
											contactIcon || 'fas fa-headset'
										}
										dashicon={ contactDashicon }
										imageUrl={ contactIconImageUrl }
										videoUrl={ contactIconVideoUrl }
										className="sidebar-contact-main-icon"
										style={ {
											fontSize: '3rem',
											marginBottom: '15px',
											display: 'block',
										} }
									/>

									<h3>{ contactTitle }</h3>
									<p>{ contactText }</p>
									<a
										href={ contactPhoneUrl || 'tel:' }
										className="jivaka-btn btn-primary centre-editor-phone-btn"
										style={ { width: '100%' } }
										onClick={ ( e ) => e.preventDefault() }
										role="presentation"
										aria-label={
											contactPhone
												? undefined
												: __(
														'Emergency phone – set in block settings',
														'twork-builder'
												  )
										}
									>
										<CentreIconRender
											iconType={
												contactPhoneIconType ||
												'fontawesome'
											}
											faClass={
												contactPhoneIcon ||
												'fas fa-phone'
											}
											dashicon={ contactPhoneDashicon }
											imageUrl={
												contactPhoneIconImageUrl
											}
											videoUrl={
												contactPhoneIconVideoUrl
											}
											className="sidebar-contact-phone-icon"
										/>{ ' ' }
										{ contactPhone ||
											__(
												'Phone number',
												'twork-builder'
											) }
									</a>
								</div>
							) : (
								<div
									className="centre-editor-sidebar-label"
									style={ { opacity: 0.7 } }
								>
									{ __(
										'Contact widget hidden (enable in Sidebar Contact Widget settings)',
										'twork-builder'
									) }
								</div>
							) }
						</aside>
						<div className="main-content centre-content-area-editor">
							<div className="centre-editor-label">
								{ __(
									'Content sections – add, remove, or reorder below',
									'twork-builder'
								) }
							</div>
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
								templateLock={ false }
								renderAppender={
									InnerBlocks.ButtonBlockAppender
								}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
