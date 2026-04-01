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
		className: 'twork-contact-map',
		style: {
			backgroundColor: sectionBackgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--twork-contact-map-container-bg': containerBackgroundColor,
			'--twork-contact-map-radius': `${ containerBorderRadius }px`,
			'--twork-map-min-h': `${ mapMinHeightDesktop }px`,
			'--twork-map-min-h-md': `${ mapMinHeightTablet }px`,
			'--twork-map-min-h-sm': `${ mapMinHeightMobile }px`,
		},
	} );

	const formActionAttr =
		formAction && formAction.trim() !== '' ? formAction : '#';

	return (
		<section { ...blockProps }>
			<div
				className="twork-contact-map__container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
				} }
			>
				<div className="twork-contact-map__form-wrap">
					<RichText.Content
						tagName="h2"
						className="twork-contact-map__title"
						value={ sectionTitle }
					/>
					<form
						className="twork-contact-map__form"
						action={ formActionAttr }
						method={ formMethod === 'get' ? 'get' : 'post' }
					>
						<input
							type="text"
							name="name"
							placeholder={ namePlaceholder }
							className="twork-contact-map__input"
							required
							autoComplete="name"
							aria-label={ namePlaceholder }
						/>
						<input
							type="tel"
							name="phone"
							placeholder={ phonePlaceholder }
							className="twork-contact-map__input"
							autoComplete="tel"
							aria-label={ phonePlaceholder }
						/>
						<input
							type="email"
							name="email"
							placeholder={ emailPlaceholder }
							className="twork-contact-map__input"
							required
							autoComplete="email"
							aria-label={ emailPlaceholder }
						/>
						<input
							type="text"
							name="subject"
							placeholder={ subjectPlaceholder }
							className="twork-contact-map__input"
							required
							aria-label={ subjectPlaceholder }
						/>
						<textarea
							name="message"
							placeholder={ messagePlaceholder }
							className="twork-contact-map__textarea"
							rows={ 5 }
							aria-label={ messagePlaceholder }
						/>
						<button
							type="submit"
							className="twork-contact-map__button"
						>
							{ submitButtonText }
						</button>
					</form>
				</div>
				<div className="twork-contact-map__map-wrap">
					{ iframeSrc ? (
						<iframe
							className="twork-contact-map__iframe"
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
							className="twork-contact-map__map-placeholder"
							role="img"
							aria-hidden="true"
						/>
					) }
				</div>
			</div>
		</section>
	);
}
