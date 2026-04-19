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
		className: 'twork-about twork-about-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--twork-about-max-width': `${ containerMaxWidth }px`,
			'--twork-about-gutter': `${ containerGutter }px`,
		},
	} );

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
	};

	return (
		<section { ...blockProps }>
			<div className="twork-about__container" style={ containerStyle }>
				<div className="twork-about__header">
					<div className="twork-about__heading">
						<p
							className="twork-about__label"
							style={ { color: labelColor } }
						>
							<span
								className="twork-about__label-icon"
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
							className="twork-about__title"
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
