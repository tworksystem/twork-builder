import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		showSectionTitle,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		showViewAllLink,
		viewAllText,
		viewAllUrl,
		viewAllOpensInNewTab,
		viewAllLinkColor,
		viewAllLinkFontWeight,
		headerMarginBottom,
		gridColumns,
		gridColumnsTablet,
		gridColumnsMobile,
		gridGap,
		itemHeight,
		containerMaxWidth,
		containerPadding,
		animationOnScroll,
		animationDelay,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'section-padding twork-csr-moments-gallery-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			position: 'relative',
			'--grid-columns-tablet': gridColumnsTablet,
			'--grid-columns-mobile': gridColumnsMobile,
			'--grid-gap': `${ gridGap }px`,
			'--item-height': `${ itemHeight }px`,
		},
		'data-animation': animationOnScroll,
		'data-animation-delay': animationDelay,
	} );

	return (
		<section { ...blockProps }>
			<div
				className="jivaka-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
					position: 'relative',
					zIndex: 2,
				} }
			>
				{ ( showSectionTitle || showViewAllLink ) && (
					<div
						className="moments-gallery-header"
						style={ {
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
							marginBottom: `${ headerMarginBottom }px`,
							flexWrap: 'wrap',
							gap: '15px',
						} }
					>
						{ showSectionTitle && (
							<RichText.Content
								tagName="h2"
								value={ sectionTitle }
								style={ {
									margin: 0,
									fontSize: `${ sectionTitleFontSize }rem`,
									fontWeight: sectionTitleFontWeight,
									color: sectionTitleColor,
								} }
							/>
						) }
						{ showViewAllLink && viewAllText && (
							<a
								href={ viewAllUrl || '#' }
								target={
									viewAllOpensInNewTab ? '_blank' : '_self'
								}
								rel={
									viewAllOpensInNewTab
										? 'noopener noreferrer'
										: undefined
								}
								style={ {
									color: viewAllLinkColor,
									fontWeight: viewAllLinkFontWeight,
									textDecoration: 'none',
								} }
							>
								{ viewAllText }{ ' ' }
								<i
									className="fas fa-arrow-right"
									aria-hidden="true"
								/>
							</a>
						) }
					</div>
				) }

				<div
					className="gallery-grid"
					style={ {
						display: 'grid',
						gridTemplateColumns: `repeat(${ gridColumns }, 1fr)`,
						gap: `${ gridGap }px`,
						gridAutoRows: `${ itemHeight }px`,
						marginTop: '40px',
					} }
					data-columns={ gridColumns }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
