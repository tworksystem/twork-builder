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
		className: `twork-why-choose twork-why-choose-section ${
			waveDecorationUrl ? 'has-wave-decoration' : ''
		}`,
		style: {
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			...( shapeVar ? { '--twork-why-choose-shape': shapeVar } : {} ),
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
		<section { ...blockProps } aria-labelledby="twork-why-choose-title">
			<div
				className="twork-why-choose__container"
				style={ containerStyle }
			>
				<div className="twork-why-choose__header">
					<p
						className="twork-why-choose__tagline"
						style={ { color: taglineColor } }
					>
						<span
							className="twork-why-choose__tagline-icon"
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
						id="twork-why-choose-title"
						className="twork-why-choose__title"
						value={ sectionTitle }
						style={ {
							color: titleColor,
							fontSize: `${ titleFontSize }rem`,
							fontWeight: titleFontWeight,
						} }
					/>
				</div>

				<div className="twork-why-choose__stage" style={ stageStyle }>
					<div className="twork-why-choose__tractor-wrapper">
						{ tractorImage && (
							<img
								src={ tractorImage }
								className="twork-why-choose__tractor"
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
