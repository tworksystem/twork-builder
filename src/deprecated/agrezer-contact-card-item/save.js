import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Sanitize href for tel:, mailto:, http(s), relative paths.
 *
 * @param {string} url Raw URL.
 * @return {string}
 */
function safeHref( url ) {
	if ( ! url || typeof url !== 'string' ) {
		return '';
	}
	const t = url.trim();
	if ( /^(tel:|mailto:|https?:|\/\/)/i.test( t ) ) {
		return t;
	}
	if ( t.startsWith( '/' ) ) {
		return t;
	}
	if ( t.startsWith( '#' ) ) {
		return t;
	}
	return '';
}

export default function save( { attributes } ) {
	const {
		iconUrl,
		iconAlt,
		title,
		subtitle,
		contentType,
		linkUrl,
		linkText,
		plainText,
		cardBgColor,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'agrezer-contact-card',
		style: {
			backgroundColor: cardBgColor,
		},
	} );

	const href = safeHref( linkUrl );

	return (
		<article { ...blockProps }>
			{ iconUrl && (
				<div className="agrezer-contact-card__icon-wrap">
					<img
						src={ iconUrl }
						alt={ iconAlt || '' }
						className="agrezer-contact-card__icon"
						width={ 24 }
						height={ 24 }
						loading="lazy"
						decoding="async"
					/>
				</div>
			) }
			<RichText.Content
				tagName="h3"
				className="agrezer-contact-card__title"
				value={ title }
			/>
			<RichText.Content
				tagName="p"
				className="agrezer-contact-card__subtitle"
				value={ subtitle }
			/>
			{ contentType === 'link' && href && (
				<a href={ href } className="agrezer-contact-card__link">
					{ linkText || linkUrl }
				</a>
			) }
			{ contentType === 'link' && ! href && ( linkText || linkUrl ) && (
				<p className="agrezer-contact-card__text">
					{ linkText || linkUrl }
				</p>
			) }
			{ contentType === 'text' && (
				<RichText.Content
					tagName="p"
					className="agrezer-contact-card__text"
					value={ plainText }
				/>
			) }
		</article>
	);
}
