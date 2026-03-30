import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/** Renders one icon by type for front-end save output. */
function CentreIconOutput( {
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

export default function save( { attributes } ) {
	const {
		sidebarHeader,
		navItems,
		contactIcon,
		contactIconType,
		contactDashicon,
		contactIconImageUrl,
		contactIconVideoUrl,
		contactPhoneIconType,
		contactPhoneIcon,
		contactPhoneDashicon,
		contactPhoneIconImageUrl,
		contactPhoneIconVideoUrl,
		navArrowIconType,
		navArrowIcon,
		navArrowDashicon,
		navArrowImageUrl,
		navArrowVideoUrl,
		contactTitle,
		contactText,
		contactPhone,
		contactPhoneUrl,
		showSidebarContact,
		contactBackgroundImage,
		containerMaxWidth,
		containerPadding,
		paddingTop,
		paddingBottom,
		sidebarWidth,
		gap,
	} = attributes;

	const contactWidgetStyle = contactBackgroundImage
		? {
				backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${ contactBackgroundImage })`,
				backgroundSize: 'cover',
		  }
		: undefined;

	const blockProps = useBlockProps.save( {
		className: 'twork-centre-layout-section section-padding',
		style: {
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--centre-sidebar-width': `${ sidebarWidth }px`,
			'--centre-gap': `${ gap }px`,
		},
	} );

	return (
		<section { ...blockProps }>
			<div
				className="centre-layout"
				style={ {
					'--centre-container-max': `${ containerMaxWidth }px`,
					'--centre-container-padding': `${ containerPadding }px`,
				} }
			>
				<div className="jivaka-container layout-grid centre-grid">
					<aside
						className="sidebar-wrapper"
						aria-label="Centre sidebar"
					>
						<div className="sidebar animate-sidebar">
							<div className="sidebar-header">
								{ sidebarHeader }
							</div>
							<nav
								className="sidebar-menu"
								aria-label="Clinical centres"
							>
								{ ( navItems || [] ).map( ( item, i ) => (
									<a
										key={ i }
										href={ item?.href || '#' }
										className={
											item?.active ? 'active' : ''
										}
									>
										{ item?.label || `Link ${ i + 1 }` }{ ' ' }
										<CentreIconOutput
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
						{ showSidebarContact !== false && (
							<div
								className="sidebar-contact animate-sidebar desktop-only"
								style={ contactWidgetStyle }
							>
								<CentreIconOutput
									iconType={
										contactIconType || 'fontawesome'
									}
									faClass={ contactIcon || 'fas fa-headset' }
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
									className="jivaka-btn btn-primary"
									style={ { width: '100%' } }
								>
									<CentreIconOutput
										iconType={
											contactPhoneIconType ||
											'fontawesome'
										}
										faClass={
											contactPhoneIcon || 'fas fa-phone'
										}
										dashicon={ contactPhoneDashicon }
										imageUrl={ contactPhoneIconImageUrl }
										videoUrl={ contactPhoneIconVideoUrl }
										className="sidebar-contact-phone-icon"
									/>{ ' ' }
									{ contactPhone || 'Call' }
								</a>
							</div>
						) }
					</aside>
					<div className="main-content">
						<InnerBlocks.Content />
						{ showSidebarContact !== false && (
							<div
								className="sidebar-contact animate-sidebar mobile-only"
								style={ contactWidgetStyle }
							>
								<CentreIconOutput
									iconType={
										contactIconType || 'fontawesome'
									}
									faClass={ contactIcon || 'fas fa-headset' }
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
									className="jivaka-btn btn-primary"
									style={ { width: '100%' } }
								>
									<CentreIconOutput
										iconType={
											contactPhoneIconType ||
											'fontawesome'
										}
										faClass={
											contactPhoneIcon || 'fas fa-phone'
										}
										dashicon={ contactPhoneDashicon }
										imageUrl={ contactPhoneIconImageUrl }
										videoUrl={ contactPhoneIconVideoUrl }
										className="sidebar-contact-phone-icon"
									/>{ ' ' }
									{ contactPhone || 'Call' }
								</a>
							</div>
						) }
					</div>
				</div>
			</div>
		</section>
	);
}
