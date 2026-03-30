import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		sectionPaddingTop,
		sectionPaddingBottom,
		containerMaxWidth,
		containerPadding,
		gridGap,
		minItemWidth,
		sectionAnchor,
		backgroundColor,
		showSectionTitle,
		sectionTitle,
		sectionSubtitle,
		sectionTitleColor,
		sectionSubtitleColor,
		sectionTitleAlignment,
		sectionTitleFontSize,
		sectionSubtitleFontSize,
		sectionHeaderMarginBottom,
		useHeaderFadeUp,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-tele-process-section process-section',
		id: sectionAnchor || undefined,
		style: {
			paddingTop: `${ sectionPaddingTop }px`,
			paddingBottom: `${ sectionPaddingBottom }px`,
			backgroundColor: backgroundColor || '#fff',
			position: 'relative',
			zIndex: 5,
		},
	} );

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(auto-fit, minmax(${ minItemWidth }px, 1fr))`,
		gap: `${ gridGap }px`,
	};

	const headerStyle = {
		textAlign: sectionTitleAlignment,
		marginBottom: `${ sectionHeaderMarginBottom }px`,
		maxWidth: '700px',
		marginLeft: sectionTitleAlignment === 'center' ? 'auto' : undefined,
		marginRight: sectionTitleAlignment === 'center' ? 'auto' : undefined,
	};

	return (
		<section { ...blockProps }>
			<div className="jivaka-container" style={ containerStyle }>
				{ ( showSectionTitle || sectionSubtitle ) && (
					<div
						className={ `section-header process-section-header ${
							useHeaderFadeUp ? 'fade-up' : ''
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
									marginBottom: sectionSubtitle
										? '12px'
										: '0',
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
				<div className="process-grid" style={ gridStyle }>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
