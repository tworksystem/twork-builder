import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerGutter,
		labelText,
		labelIcon,
		sectionTitle,
		labelColor,
		labelIconColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'agrezer-about twork-agrezer-about-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--agrezer-about-max-width': `${ containerMaxWidth }px`,
			'--agrezer-about-gutter': `${ containerGutter }px`,
		},
	} );

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
	};

	return (
		<section { ...blockProps } aria-labelledby="agrezer-about-title">
			<div className="agrezer-about__container" style={ containerStyle }>
				<div className="agrezer-about__header">
					<div className="agrezer-about__heading">
						<p
							className="agrezer-about__label"
							style={ { color: labelColor } }
						>
							<span
								className="agrezer-about__label-icon"
								style={ { color: labelIconColor } }
								aria-hidden="true"
							>
								{ labelIcon }
							</span>
							<RichText.Content
								tagName="span"
								value={ labelText }
							/>
						</p>
						<RichText.Content
							tagName="h2"
							id="agrezer-about-title"
							className="agrezer-about__title"
							value={ sectionTitle }
							style={ {
								color: titleColor,
								fontSize: `${ titleFontSize }rem`,
								fontWeight: titleFontWeight,
							} }
						/>
					</div>
				</div>

				<InnerBlocks.Content />
			</div>
		</section>
	);
}
