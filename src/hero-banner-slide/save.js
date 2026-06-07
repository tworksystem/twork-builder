import { RichText, useBlockProps } from '@wordpress/block-editor';

const ALLOWED_BG = new Set( [
	'center',
	'center right',
	'center left',
	'right center',
	'left center',
] );

function safeBgPosition( position ) {
	const normalized = String( position || 'center right' )
		.trim()
		.toLowerCase();
	return ALLOWED_BG.has( normalized ) ? normalized : 'center right';
}

export default function save( { attributes } ) {
	const {
		eyebrow,
		title,
		subtitle,
		ctaLabel,
		ctaHref,
		imageUrl,
		imageAlt,
		backgroundPosition,
		headingLevel,
	} = attributes;

	const TitleTag = headingLevel === 'h1' ? 'h1' : 'h2';

	const bgPosition = safeBgPosition( backgroundPosition );
	const slideStyle = {
		backgroundPosition: bgPosition,
		...( imageUrl
			? {
					backgroundImage: `url(${ imageUrl })`,
			  }
			: {} ),
	};

	const blockProps = useBlockProps.save( {
		className: 'twork-hero-banner-carousel__slide',
		style: slideStyle,
		'data-carousel-slide': true,
		'aria-hidden': 'true',
		...( imageAlt ? { 'aria-label': imageAlt } : {} ),
	} );

	return (
		<article { ...blockProps }>
			<div className="twork-hero-banner-carousel__overlay">
				<div className="twork-hero-banner-carousel__inner l-section">
					<div className="twork-hero-banner-carousel__content">
						{ eyebrow && (
							<RichText.Content
								tagName="p"
								className="twork-hero-banner-carousel__eyebrow"
								value={ eyebrow }
							/>
						) }
						{ title && (
							<RichText.Content
								tagName={ TitleTag }
								className="twork-hero-banner-carousel__title"
								value={ title }
							/>
						) }
						{ subtitle && (
							<RichText.Content
								tagName="p"
								className="twork-hero-banner-carousel__subtitle"
								value={ subtitle }
							/>
						) }
						{ ctaLabel && (
							<a
								className="twork-hero-banner-carousel__cta btn btn--primary"
								href={ ctaHref || '#' }
							>
								<RichText.Content tagName="span" value={ ctaLabel } />
								<span
									className="twork-hero-banner-carousel__cta-icon"
									aria-hidden="true"
								>
									{' '}
									›
								</span>
							</a>
						) }
					</div>
				</div>
			</div>
		</article>
	);
}
