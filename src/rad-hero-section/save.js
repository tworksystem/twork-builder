import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundImage,
		badgeText,
		title,
		description,
		buttonText,
		buttonUrl,
		minHeight,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'rad-hero twork-rad-hero-section',
	} );

	const headerStyle = {
		minHeight: `${ minHeight }px`,
	};

	return (
		<header { ...blockProps } style={ headerStyle }>
			{ backgroundImage && (
				<img src={ backgroundImage } alt="" className="rad-hero-bg" />
			) }
			<div className="rad-container rad-hero-content">
				<div className="rad-hero-grid">
					<div className="rad-hero-copy fade-up">
						{ badgeText && (
							<span
								style={ {
									color: 'var(--rad-primary)',
									fontWeight: 700,
									letterSpacing: '2px',
									textTransform: 'uppercase',
								} }
							>
								{ badgeText }
							</span>
						) }
						<RichText.Content tagName="h1" value={ title } />
						<RichText.Content tagName="p" value={ description } />
						{ buttonText && (
							<a href={ buttonUrl || '#' } className="rad-btn">
								{ buttonText }
							</a>
						) }
					</div>
					<div className="rad-hero-empty" />
				</div>
			</div>
		</header>
	);
}
