import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerGutter,
		mainColumnGap,
		mainImage,
		mainImageAlt,
		taglineIcon,
		taglineText,
		sectionTitle,
		taglineColor,
		taglineIconColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'agrezer-greener twork-agrezer-greener-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--agrezer-greener-gap': `${ mainColumnGap }px`,
		},
	} );

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
		gap: `${ mainColumnGap }px`,
	};

	return (
		<section { ...blockProps } aria-labelledby="agrezer-greener-title">
			<div
				className="agrezer-greener__container"
				style={ containerStyle }
			>
				<div className="agrezer-greener__left">
					{ mainImage && (
						<img
							src={ mainImage }
							className="agrezer-greener__main-img"
							alt={ mainImageAlt || '' }
						/>
					) }
				</div>

				<div className="agrezer-greener__right">
					<header className="agrezer-greener__header">
						<p
							className="agrezer-greener__tagline"
							style={ { color: taglineColor } }
						>
							<span
								className="agrezer-greener__tagline-icon"
								style={ { color: taglineIconColor } }
								aria-hidden="true"
							>
								{ taglineIcon }
							</span>
							<RichText.Content
								tagName="span"
								value={ taglineText }
							/>
						</p>
						<RichText.Content
							tagName="h2"
							id="agrezer-greener-title"
							className="agrezer-greener__title"
							value={ sectionTitle }
							style={ {
								color: titleColor,
								fontSize: `${ titleFontSize }rem`,
								fontWeight: titleFontWeight,
							} }
						/>
					</header>

					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
