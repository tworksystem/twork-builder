import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		sectionPaddingTop,
		sectionPaddingBottom,
		containerMaxWidth,
		containerPadding,
		showSectionTitle,
		sectionTitle,
		sectionSubtitle,
		sectionTitleColor,
		sectionSubtitleColor,
		sectionTitleAlignment,
		sectionTitleFontSize,
		sectionSubtitleFontSize,
		sectionHeaderMarginBottom,
		gridGap,
		minItemWidth,
		useFadeUp,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-tele-specialty-section section-padding',
		style: {
			paddingTop: `${ sectionPaddingTop }px`,
			paddingBottom: `${ sectionPaddingBottom }px`,
		},
	} );

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	const headerStyle = {
		textAlign: sectionTitleAlignment,
		marginBottom: `${ sectionHeaderMarginBottom }px`,
		maxWidth: '700px',
		marginLeft: 'auto',
		marginRight: 'auto',
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(auto-fill, minmax(${ minItemWidth }px, 1fr))`,
		gap: `${ gridGap }px`,
	};

	return (
		<section { ...blockProps }>
			<div className="jivaka-container" style={ containerStyle }>
				{ ( showSectionTitle || sectionSubtitle ) && (
					<div
						className={ `section-header ${
							useFadeUp ? 'fade-up' : ''
						}` }
						style={ headerStyle }
					>
						{ showSectionTitle && (
							<RichText.Content
								tagName="h2"
								value={ sectionTitle }
								style={ {
									fontSize: `${ sectionTitleFontSize }rem`,
									color: sectionTitleColor,
									marginBottom: '15px',
								} }
							/>
						) }
						{ sectionSubtitle && (
							<RichText.Content
								tagName="p"
								value={ sectionSubtitle }
								style={ {
									fontSize: `${ sectionSubtitleFontSize }rem`,
									color: sectionSubtitleColor,
									margin: 0,
								} }
							/>
						) }
					</div>
				) }

				<div className="specialty-grid" style={ gridStyle }>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
