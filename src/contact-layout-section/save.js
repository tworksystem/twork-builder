import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		accordionHeading,
		locationHeading,
		locationHeadingMarginTop,
		mapEmbedUrl,
		mapHeight,
		formTitle,
		formNameLabel,
		formPhoneLabel,
		formMessageLabel,
		buttonText,
		formId,
		layoutGap,
		containerMaxWidth,
		containerPadding,
		paddingBottom,
		primaryColor,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-contact-layout-section',
		style: {
			paddingBottom: `${ paddingBottom }px`,
			'--contact-primary': primaryColor,
		},
	} );

	const layoutStyle = {
		display: 'grid',
		gridTemplateColumns: '1fr 1.2fr',
		gap: `${ layoutGap }px`,
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
	};

	return (
		<section { ...blockProps }>
			<div className="contact-layout" style={ layoutStyle }>
				<div className="contact-details animate-up">
					<RichText.Content
						tagName="h2"
						value={ accordionHeading }
						className="contact-details-heading"
					/>
					<div className="hotline-accordion">
						<InnerBlocks.Content />
					</div>
					<RichText.Content
						tagName="h2"
						value={ locationHeading }
						style={ {
							marginTop: `${ locationHeadingMarginTop }px`,
						} }
					/>
					<div
						className="map-container"
						style={ { height: `${ mapHeight }px` } }
					>
						{ mapEmbedUrl && (
							<iframe
								src={ mapEmbedUrl }
								title="Map"
								allowFullScreen
								loading="lazy"
								style={ {
									width: '100%',
									height: '100%',
									border: 'none',
								} }
							/>
						) }
					</div>
				</div>

				<div className="contact-form-wrapper animate-up">
					<RichText.Content
						tagName="h3"
						value={ formTitle }
						className="form-title"
					/>
					<form id={ formId || 'contactForm' }>
						<div className="form-group">
							<input
								type="text"
								id="name"
								className="form-control"
								placeholder=" "
								required
							/>
							<label htmlFor="name" className="form-label">
								{ formNameLabel }
							</label>
						</div>
						<div className="form-group">
							<input
								type="tel"
								id="phone"
								className="form-control"
								placeholder=" "
								required
							/>
							<label htmlFor="phone" className="form-label">
								{ formPhoneLabel }
							</label>
						</div>
						<div className="form-group">
							<textarea
								id="message"
								className="form-control"
								placeholder=" "
								required
								rows={ 4 }
							/>
							<label htmlFor="message" className="form-label">
								{ formMessageLabel }
							</label>
						</div>
						<button
							type="submit"
							className="jivaka-btn btn-primary"
							style={ { width: '100%', border: 'none' } }
						>
							{ buttonText }
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}
