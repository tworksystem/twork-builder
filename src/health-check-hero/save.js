import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		badgeText,
		badgeColor,
		title,
		titleGradientStart,
		titleGradientEnd,
		description,
		descriptionColor,
		buttonText,
		buttonUrl,
		buttonOpenInNewTab,
		imageUrl,
		imageAlt,
		badgeIcon,
		badgeValue,
		badgeLabel,
		badgeLabelColor,
		badgeValueColor,
		primaryColor,
		secondaryColor,
		showOverlayShape,
		overlayGradientStart,
		overlayGradientEnd,
		containerMaxWidth,
		containerPadding,
		minHeight,
		animationOnScroll,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'chk-hero twork-health-check-hero',
		style: {
			minHeight: `${ minHeight }px`,
			'--chk-primary': primaryColor || '#f48b2a',
			'--chk-secondary': secondaryColor || '#005f73',
			'--chk-gradient': showOverlayShape
				? `linear-gradient(135deg, ${
						overlayGradientStart || '#005f73'
				  } 0%, ${ overlayGradientEnd || '#0a9396' } 100%)`
				: 'transparent',
			'--chk-gradient-text': `linear-gradient(45deg, ${
				titleGradientStart || '#005f73'
			}, ${ titleGradientEnd || '#f48b2a' })`,
		},
		'data-animation': animationOnScroll ? 'true' : 'false',
	} );

	const buttonTarget = buttonOpenInNewTab ? '_blank' : undefined;
	const buttonRel = buttonOpenInNewTab ? 'noopener noreferrer' : undefined;

	return (
		<header { ...blockProps }>
			{ showOverlayShape && (
				<div
					className="chk-hero-overlay-shape"
					aria-hidden="true"
					style={ {
						position: 'absolute',
						top: 0,
						right: 0,
						width: '45%',
						height: '100%',
						background: `linear-gradient(135deg, ${
							overlayGradientStart || '#005f73'
						} 0%, ${ overlayGradientEnd || '#0a9396' } 100%)`,
						borderBottomLeftRadius: '300px',
						zIndex: 0,
					} }
				/>
			) }
			<div
				className="chk-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
					position: 'relative',
					zIndex: 1,
				} }
			>
				<div className="chk-hero-grid">
					<div className="chk-hero-text fade-up">
						{ badgeText && (
							<span
								style={ {
									color:
										badgeColor || primaryColor || '#f48b2a',
									fontWeight: 700,
									letterSpacing: '2px',
								} }
							>
								{ badgeText }
							</span>
						) }
						{ title && (
							<RichText.Content
								tagName="h1"
								className="chk-hero-title"
								value={ title }
								style={ {
									background: `linear-gradient(45deg, ${
										titleGradientStart || '#005f73'
									}, ${ titleGradientEnd || '#f48b2a' })`,
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									backgroundClip: 'text',
									margin: '0 0 20px',
									fontSize: 'clamp(3rem, 5vw, 4.5rem)',
									fontWeight: 900,
								} }
							/>
						) }
						{ description && (
							<RichText.Content
								tagName="p"
								value={ description }
								style={ {
									fontSize: '1.2rem',
									color: descriptionColor || '#666',
									marginBottom: '30px',
									maxWidth: '550px',
								} }
							/>
						) }
						{ buttonText && (
							<a
								href={ buttonUrl || '#' }
								className="chk-btn"
								target={ buttonTarget }
								rel={ buttonRel }
							>
								{ buttonText }
							</a>
						) }
					</div>
					<div className="chk-hero-img-box fade-up">
						{ imageUrl ? (
							<img
								src={ imageUrl }
								alt={ imageAlt || '' }
								className="chk-hero-img"
								loading="eager"
								decoding="async"
							/>
						) : (
							<div
								className="chk-hero-img chk-hero-img-placeholder"
								aria-hidden="true"
							>
								<span className="chk-hero-img-placeholder-text">
									Hero image
								</span>
							</div>
						) }
						<div className="chk-badge">
							{ badgeIcon && (
								<i className={ badgeIcon } aria-hidden="true" />
							) }
							<div>
								{ badgeValue && (
									<strong
										style={ {
											color:
												badgeValueColor ||
												secondaryColor,
										} }
									>
										{ badgeValue }
									</strong>
								) }
								{ badgeLabel && (
									<small
										style={ {
											color: badgeLabelColor || '#666',
										} }
									>
										{ badgeLabel }
									</small>
								) }
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
