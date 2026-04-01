import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerGutter,
		taglineIcon,
		taglineText,
		sectionTitle,
		taglineColor,
		taglineIconColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
		tractorImage,
		tractorAlt,
		tractorMaxWidth,
		stageMinHeight,
		waveDecorationUrl,
	} = attributes;

	const shapeVar = waveDecorationUrl
		? `url("${ String( waveDecorationUrl )
				.replace( /\\/g, '\\\\' )
				.replace( /"/g, '\\"' ) }")`
		: undefined;

	const blockProps = useBlockProps.save( {
		className: `agrezer-why-choose twork-agrezer-why-choose-section ${
			waveDecorationUrl ? 'has-wave-decoration' : ''
		}`,
		style: {
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			...( shapeVar ? { '--agrezer-why-choose-shape': shapeVar } : {} ),
		},
	} );

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
	};

	const stageStyle = {
		minHeight: `${ stageMinHeight }px`,
	};

	return (
		<section { ...blockProps } aria-labelledby="agrezer-why-choose-title">
			<div
				className="agrezer-why-choose__container"
				style={ containerStyle }
			>
				<div className="agrezer-why-choose__header">
					<p
						className="agrezer-why-choose__tagline"
						style={ { color: taglineColor } }
					>
						<span
							className="agrezer-why-choose__tagline-icon"
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
						id="agrezer-why-choose-title"
						className="agrezer-why-choose__title"
						value={ sectionTitle }
						style={ {
							color: titleColor,
							fontSize: `${ titleFontSize }rem`,
							fontWeight: titleFontWeight,
						} }
					/>
				</div>

				<div className="agrezer-why-choose__stage" style={ stageStyle }>
					<div className="agrezer-why-choose__tractor-wrapper">
						{ tractorImage && (
							<img
								src={ tractorImage }
								className="agrezer-why-choose__tractor"
								alt={ tractorAlt || '' }
								style={ { maxWidth: `${ tractorMaxWidth }px` } }
							/>
						) }
					</div>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
