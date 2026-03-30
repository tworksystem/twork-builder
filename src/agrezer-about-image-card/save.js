import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		variant,
		image,
		alt,
		overlayText,
		overlayButtonText,
		overlayButtonUrl,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className:
			variant === 'overlay'
				? 'agrezer-about-card agrezer-about-card--overlay'
				: 'agrezer-about-card',
	} );

	return (
		<article { ...blockProps }>
			{ image && <img src={ image } alt={ alt || '' } /> }
			{ variant === 'overlay' && image && (
				<div className="agrezer-about-card__overlay">
					<RichText.Content
						tagName="p"
						className="agrezer-about-card__overlay-text"
						value={ overlayText }
					/>
					<a
						href={ overlayButtonUrl || '#' }
						className="agrezer-about-card__overlay-btn"
					>
						<RichText.Content
							tagName="span"
							value={ overlayButtonText }
						/>
						<span aria-hidden="true">↗</span>
					</a>
				</div>
			) }
		</article>
	);
}
