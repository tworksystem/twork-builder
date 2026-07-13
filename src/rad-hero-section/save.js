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
		className: 'rad-hero mk-rad-hero-section',
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
							<span className="rad-hero-badge">
								{ badgeText }
							</span>
						) }
						<RichText.Content
							tagName="h1"
							className="rad-hero-title"
							value={ title }
						/>
						<RichText.Content
							tagName="p"
							className="rad-hero-description"
							value={ description }
						/>
						{ buttonText && (
							<a
								href={ buttonUrl || '#' }
								className="rad-btn rad-hero-cta"
							>
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
