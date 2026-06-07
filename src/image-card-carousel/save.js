import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		sectionEyebrow,
		sectionTitle,
		autoplayMs,
		padding,
		backgroundColor,
		containerMaxWidth,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'image-card-carousel twork-image-card-carousel',
		style: {
			backgroundColor: backgroundColor || '#ffffff',
			paddingTop: `${ padding }px`,
			paddingBottom: `${ padding }px`,
		},
		'data-block': 'twork/image-card-carousel',
		'data-autoplay-ms': String( autoplayMs ?? 6000 ),
	} );

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: '0 1.25rem',
	};

	return (
		<section { ...blockProps }>
			<div
				className="image-card-carousel__inner l-section"
				style={ containerStyle }
			>
				{ ( sectionEyebrow || sectionTitle ) && (
					<header className="section-head">
						{ sectionEyebrow && (
							<RichText.Content
								tagName="p"
								className="section-head__eyebrow"
								value={ sectionEyebrow }
							/>
						) }
						{ sectionTitle && (
							<RichText.Content
								tagName="h2"
								className="section-head__title"
								value={ sectionTitle }
							/>
						) }
					</header>
				) }

				<div
					className="image-card-carousel__stage"
					role="region"
					aria-label={ sectionTitle || 'Services carousel' }
				>
					<div
						className="image-card-carousel__track"
						data-list="items"
					>
						<InnerBlocks.Content />
					</div>
				</div>

				<div className="carousel-nav" aria-hidden="true">
					<div
						className="carousel-dots image-card-carousel__dots"
						data-carousel-dots
					/>
				</div>
			</div>
		</section>
	);
}
