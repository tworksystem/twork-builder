import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerGutter,
		taglineIcon,
		taglineText,
		sectionTitle,
		description,
		taglineColor,
		taglineIconColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
		descColor,
		descFontSize,
		headerBorderColor,
		gridGap,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-stats twork-stats-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--twork-stats-grid-gap': `${ gridGap }px`,
		},
	} );

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
	};

	const headerStyle = {
		borderBottomColor: headerBorderColor,
	};

	return (
		<section { ...blockProps } aria-labelledby="twork-stats-title">
			<div className="twork-stats__container" style={ containerStyle }>
				<div className="twork-stats__header" style={ headerStyle }>
					<div className="twork-stats__header-left">
						<p
							className="twork-stats__tagline"
							style={ { color: taglineColor } }
						>
							<span
								className="twork-stats__tagline-icon"
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
							id="twork-stats-title"
							className="twork-stats__title"
							value={ sectionTitle }
							style={ {
								color: titleColor,
								fontSize: `${ titleFontSize }rem`,
								fontWeight: titleFontWeight,
							} }
						/>
					</div>
					<RichText.Content
						tagName="p"
						className="twork-stats__desc"
						value={ description }
						style={ {
							color: descColor,
							fontSize: `${ descFontSize }rem`,
						} }
					/>
				</div>

				<div
					className="twork-stats__grid"
					style={ { gap: `${ gridGap }px` } }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
