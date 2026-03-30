import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		image,
		imageAlt,
		imageHeight,
		imageObjectFit,
		imageObjectPosition,
		iconClass,
		iconColor,
		iconBgColor,
		iconSize,
		title,
		titleColor,
		titleFontSize,
		titleFontWeight,
		description,
		descriptionColor,
		descriptionFontSize,
		contentPadding,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'initiative-card stagger-card animate-on-scroll',
	} );

	return (
		<div { ...blockProps }>
			{ image && (
				<div
					className="init-img-wrap"
					style={ { height: `${ imageHeight }px` } }
				>
					<img
						decoding="async"
						src={ image }
						alt={ imageAlt || title || '' }
						style={ {
							width: '100%',
							height: '100%',
							objectFit: imageObjectFit,
							objectPosition: imageObjectPosition,
							display: 'block',
						} }
					/>
				</div>
			) }
			<div
				className="init-content"
				style={ {
					padding: `${ contentPadding }px`,
				} }
			>
				<div
					className="init-icon"
					style={ {
						color: iconColor,
						backgroundColor: iconBgColor,
						fontSize: `${ iconSize }rem`,
						width: '50px',
						height: '50px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: '50%',
						marginBottom: '15px',
					} }
				>
					<i
						className={ iconClass || 'fas fa-heart' }
						aria-hidden="true"
					/>
				</div>
				{ title && (
					<RichText.Content
						tagName="h3"
						value={ title }
						style={ {
							fontSize: `${ titleFontSize }rem`,
							fontWeight: titleFontWeight,
							color: titleColor,
							margin: '0 0 10px 0',
							lineHeight: 1.3,
						} }
					/>
				) }
				{ description && (
					<RichText.Content
						tagName="p"
						value={ description }
						style={ {
							fontSize: `${ descriptionFontSize }rem`,
							color: descriptionColor,
							margin: 0,
							lineHeight: 1.6,
						} }
					/>
				) }
			</div>
		</div>
	);
}
