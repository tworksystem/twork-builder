import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Allow only http(s) embed URLs for the iframe.
 *
 * @param {string} url Raw URL.
 * @return {string}
 */
function safeIframeSrc( url ) {
	if ( ! url || typeof url !== 'string' ) {
		return '';
	}
	const t = url.trim();
	if ( /^https?:\/\//i.test( t ) ) {
		return t;
	}
	return '';
}

export default function save( { attributes } ) {
	const {
		sectionTitle,
		formAction,
		formMethod,
		namePlaceholder,
		phonePlaceholder,
		emailPlaceholder,
		subjectPlaceholder,
		messagePlaceholder,
		submitButtonText,
		mapEmbedUrl,
		mapIframeTitle,
		sectionBackgroundColor,
		containerBackgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerBorderRadius,
		mapMinHeightDesktop,
		mapMinHeightTablet,
		mapMinHeightMobile,
	} = attributes;

	const iframeSrc = safeIframeSrc( mapEmbedUrl );

	const blockProps = useBlockProps.save( {
		className: 'agrezer-contact-map',
		style: {
			backgroundColor: sectionBackgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--agrezer-contact-map-container-bg': containerBackgroundColor,
			'--agrezer-contact-map-radius': `${ containerBorderRadius }px`,
			'--agrezer-map-min-h': `${ mapMinHeightDesktop }px`,
			'--agrezer-map-min-h-md': `${ mapMinHeightTablet }px`,
			'--agrezer-map-min-h-sm': `${ mapMinHeightMobile }px`,
		},
	} );

	const formActionAttr =
		formAction && formAction.trim() !== '' ? formAction : '#';

	return (
		<section { ...blockProps }>
			<div
				className="agrezer-contact-map__container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
				} }
			>
				<div className="agrezer-contact-map__form-wrap">
					<RichText.Content
						tagName="h2"
						className="agrezer-contact-map__title"
						value={ sectionTitle }
					/>
					<form
						className="agrezer-contact-map__form"
						action={ formActionAttr }
						method={ formMethod === 'get' ? 'get' : 'post' }
					>
						<input
							type="text"
							name="name"
							placeholder={ namePlaceholder }
							className="agrezer-contact-map__input"
							required
							autoComplete="name"
							aria-label={ namePlaceholder }
						/>
						<input
							type="tel"
							name="phone"
							placeholder={ phonePlaceholder }
							className="agrezer-contact-map__input"
							autoComplete="tel"
							aria-label={ phonePlaceholder }
						/>
						<input
							type="email"
							name="email"
							placeholder={ emailPlaceholder }
							className="agrezer-contact-map__input"
							required
							autoComplete="email"
							aria-label={ emailPlaceholder }
						/>
						<input
							type="text"
							name="subject"
							placeholder={ subjectPlaceholder }
							className="agrezer-contact-map__input"
							required
							aria-label={ subjectPlaceholder }
						/>
						<textarea
							name="message"
							placeholder={ messagePlaceholder }
							className="agrezer-contact-map__textarea"
							rows={ 5 }
							aria-label={ messagePlaceholder }
						/>
						<button
							type="submit"
							className="agrezer-contact-map__button"
						>
							{ submitButtonText }
						</button>
					</form>
				</div>
				<div className="agrezer-contact-map__map-wrap">
					{ iframeSrc ? (
						<iframe
							className="agrezer-contact-map__iframe"
							title={
								mapIframeTitle ||
								__( 'Map location', 'twork-builder' )
							}
							src={ iframeSrc }
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							allowFullScreen
						/>
					) : (
						<div
							className="agrezer-contact-map__map-placeholder"
							role="img"
							aria-hidden="true"
						/>
					) }
				</div>
			</div>
		</section>
	);
}
