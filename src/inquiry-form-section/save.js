import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		sectionPaddingTop,
		sectionPaddingBottom,
		sectionPaddingTopMobile,
		sectionPaddingBottomMobile,
		containerMaxWidth,
		containerPadding,
		containerPaddingMobile,
		wrapperMarginTop,
		leftBackgroundImage,
		leftOverlayColor,
		leftOverlayOpacity,
		leftContentPadding,
		leftContentPaddingMobile,
		leftTitle,
		leftTitleColor,
		leftTitleFontSize,
		leftDescription,
		leftDescriptionColor,
		leftDescriptionFontSize,
		leftPhone,
		leftEmail,
		leftContactColor,
		leftContactFontSize,
		formPadding,
		formPaddingMobile,
		formAction,
		formMethod,
		fullNameLabel,
		fullNamePlaceholder,
		countryLabel,
		countryPlaceholder,
		phoneLabel,
		phonePlaceholder,
		emailLabel,
		emailPlaceholder,
		specialtyLabel,
		specialtyOptions,
		messageLabel,
		messagePlaceholder,
		submitButtonText,
		submitButtonBgColor,
		submitButtonTextColor,
		animationOnScroll,
	} = attributes;

	const specialtyOptionsList = ( specialtyOptions || '' )
		.split( '\n' )
		.filter( Boolean );

	const blockProps = useBlockProps.save( {
		className:
			'twork-inquiry-form-section inquiry-form-block section-padding services-section',
		style: {
			'--section-padding-top': `${ sectionPaddingTop }px`,
			'--section-padding-bottom': `${ sectionPaddingBottom }px`,
			'--section-padding-top-mobile': `${ sectionPaddingTopMobile }px`,
			'--section-padding-bottom-mobile': `${ sectionPaddingBottomMobile }px`,
			'--container-padding': `${ containerPadding }px`,
			'--container-padding-mobile': `${ containerPaddingMobile }px`,
			'--left-content-padding': `${ leftContentPadding }px`,
			'--left-content-padding-mobile': `${ leftContentPaddingMobile }px`,
			'--form-padding': `${ formPadding }px`,
			'--form-padding-mobile': `${ formPaddingMobile }px`,
			'--wrapper-margin-top': `${ wrapperMarginTop }px`,
		},
		'data-animation': animationOnScroll,
	} );

	const inquiryImgStyle = {
		background: leftBackgroundImage
			? `url(${ leftBackgroundImage }) center/cover no-repeat`
			: '#f0f0f0',
	};

	return (
		<section { ...blockProps }>
			<div
				className="jivaka-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
				} }
			>
				<div
					className="inquiry-wrapper fade-up"
					style={ {
						background: '#fff',
						borderRadius: 'var(--radius, 12px)',
						boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
						overflow: 'hidden',
					} }
				>
					<div className="inquiry-img" style={ inquiryImgStyle }>
						<div
							className="inquiry-overlay"
							style={ {
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								background: leftOverlayColor,
								opacity: leftOverlayOpacity,
							} }
						/>
						<div
							className="inquiry-text"
							style={ {
								position: 'relative',
								zIndex: 2,
								color: '#fff',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								height: '100%',
							} }
						>
							{ leftTitle && (
								<RichText.Content
									tagName="h3"
									value={ leftTitle }
									style={ {
										fontSize: `${ leftTitleFontSize }rem`,
										margin: '0 0 20px 0',
										color: leftTitleColor,
									} }
								/>
							) }
							{ leftDescription && (
								<RichText.Content
									tagName="p"
									value={ leftDescription }
									style={ {
										fontSize: `${ leftDescriptionFontSize }rem`,
										opacity: 0.9,
										margin: 0,
										color: leftDescriptionColor,
									} }
								/>
							) }
							<ul
								style={ {
									marginTop: '20px',
									listStyle: 'none',
									padding: 0,
								} }
							>
								{ leftPhone && (
									<li style={ { marginBottom: '10px' } }>
										<i
											className="fas fa-phone-alt"
											style={ { marginRight: '8px' } }
											aria-hidden="true"
										/>
										<span
											style={ {
												color: leftContactColor,
												fontSize: `${ leftContactFontSize }rem`,
											} }
										>
											{ leftPhone }
										</span>
									</li>
								) }
								{ leftEmail && (
									<li>
										<i
											className="fas fa-envelope"
											style={ { marginRight: '8px' } }
											aria-hidden="true"
										/>
										<span
											style={ {
												color: leftContactColor,
												fontSize: `${ leftContactFontSize }rem`,
											} }
										>
											{ leftEmail }
										</span>
									</li>
								) }
							</ul>
						</div>
					</div>

					<div className="form-container">
						<form
							action={ formAction || undefined }
							method={ formMethod }
						>
							<div className="form-group">
								<label htmlFor="inquiry-fullname">
									{ fullNameLabel }
								</label>
								<input
									type="text"
									id="inquiry-fullname"
									name="fullname"
									className="form-control"
									placeholder={ fullNamePlaceholder }
								/>
							</div>
							<div className="form-row form-row-2col">
								<div className="form-group">
									<label htmlFor="inquiry-country">
										{ countryLabel }
									</label>
									<input
										type="text"
										id="inquiry-country"
										name="country"
										className="form-control"
										placeholder={ countryPlaceholder }
									/>
								</div>
								<div className="form-group">
									<label htmlFor="inquiry-phone">
										{ phoneLabel }
									</label>
									<input
										type="text"
										id="inquiry-phone"
										name="phone"
										className="form-control"
										placeholder={ phonePlaceholder }
									/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="inquiry-email">
									{ emailLabel }
								</label>
								<input
									type="email"
									id="inquiry-email"
									name="email"
									className="form-control"
									placeholder={ emailPlaceholder }
								/>
							</div>
							<div className="form-group">
								<label htmlFor="inquiry-specialty">
									{ specialtyLabel }
								</label>
								<select
									id="inquiry-specialty"
									name="specialty"
									className="form-control"
								>
									{ specialtyOptionsList.map( ( opt, i ) => (
										<option
											key={ i }
											value={ i === 0 ? '' : opt }
										>
											{ opt }
										</option>
									) ) }
								</select>
							</div>
							<div className="form-group">
								<label htmlFor="inquiry-message">
									{ messageLabel }
								</label>
								<textarea
									id="inquiry-message"
									name="message"
									className="form-control"
									placeholder={ messagePlaceholder }
									rows={ 5 }
								/>
							</div>
							<button
								type="submit"
								className="jivaka-btn btn-primary inquiry-submit"
								style={ {
									width: '100%',
									background: submitButtonBgColor,
									color: submitButtonTextColor,
									border: 'none',
									padding: '12px 28px',
									borderRadius: '6px',
									fontWeight: 700,
									cursor: 'pointer',
									textTransform: 'uppercase',
									fontSize: '0.8rem',
									letterSpacing: '0.8px',
									transition: 'all 0.3s ease',
								} }
							>
								{ submitButtonText }
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
