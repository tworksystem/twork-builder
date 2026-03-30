import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		badge,
		title,
		subtitle,
		primaryButtonText,
		primaryButtonUrl,
		outlineButtonText,
		outlineButtonUrl,
		outlineButtonLight,
		backgroundImage,
		backgroundOverlay,
		backgroundOverlayColor,
		backgroundOverlayOpacity,
		imageUrl,
		imageAlt,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		minHeight,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'paed-hero twork-paediatrics-hero',
		style: {
			paddingTop: `${ Number( paddingTop ) }px`,
			paddingBottom: `${ Number( paddingBottom ) }px`,
			minHeight: `${ Number( minHeight ) }px`,
		},
	} );

	const layoutStyle = {
		maxWidth: `${ Number( containerMaxWidth ) }px`,
		margin: '0 auto',
		padding: `0 ${ Number( containerPadding ) }px`,
	};

	const outlineBtnStyle = outlineButtonLight
		? { color: '#fff', borderColor: '#fff' }
		: undefined;

	return (
		<header { ...blockProps }>
			{ backgroundImage && (
				<img src={ backgroundImage } alt="" className="paed-hero-bg" />
			) }
			{ backgroundImage && backgroundOverlay && (
				<div
					className="paed-hero-overlay"
					style={ {
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: backgroundOverlayColor,
						opacity: backgroundOverlayOpacity,
						zIndex: 1,
					} }
				/>
			) }
			<div
				className="paed-hero-layout paed-animate-hero"
				style={ layoutStyle }
			>
				<div className="paed-hero-text">
					{ badge && <span className="paed-badge">{ badge }</span> }
					{ title && (
						<RichText.Content
							tagName="h1"
							className="paed-title"
							value={ title }
						/>
					) }
					{ subtitle && (
						<RichText.Content
							tagName="p"
							className="paed-subtitle"
							value={ subtitle }
						/>
					) }
					<div className="paed-hero-buttons">
						{ primaryButtonText && (
							<a
								href={ primaryButtonUrl || '#' }
								className="paed-btn paed-btn-primary"
							>
								{ primaryButtonText }
							</a>
						) }
						{ outlineButtonText && (
							<a
								href={ outlineButtonUrl || '#' }
								className="paed-btn paed-btn-outline"
								style={ outlineBtnStyle }
							>
								{ outlineButtonText }
							</a>
						) }
					</div>
				</div>
				<div className="paed-hero-img-col">
					{ imageUrl ? (
						<img
							src={ imageUrl }
							alt={ imageAlt || '' }
							className="paed-hero-visual"
							decoding="async"
						/>
					) : null }
				</div>
			</div>
		</header>
	);
}
