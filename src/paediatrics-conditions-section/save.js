import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		showSectionHeader,
		sectionTitle,
		sectionSubtitle,
		sectionTitleColor,
		sectionSubtitleColor,
		sectionTitleFontSize,
		sectionSubtitleFontSize,
		minColumnWidth,
		gap,
		animationOnScroll,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className:
			'paed-section paed-conditions-section twork-paed-conditions-section',
		style: {
			backgroundColor: backgroundColor || '#ffffff',
			paddingTop: `${ Number( paddingTop ) }px`,
			paddingBottom: `${ Number( paddingBottom ) }px`,
			position: 'relative',
		},
		'data-animation': animationOnScroll ? 'true' : 'false',
	} );

	return (
		<section { ...blockProps }>
			<div
				className="paed-container"
				style={ {
					maxWidth: `${ Number( containerMaxWidth ) }px`,
					margin: '0 auto',
					padding: `0 ${ Number( containerPadding ) }px`,
					position: 'relative',
				} }
			>
				{ showSectionHeader && (
					<div
						className="paed-header paed-fade-up"
						style={ { marginBottom: '60px' } }
					>
						{ sectionTitle && (
							<RichText.Content
								tagName="h2"
								value={ sectionTitle }
								style={ {
									fontSize: `${ Number(
										sectionTitleFontSize
									) }rem`,
									color: sectionTitleColor,
									marginBottom: '15px',
									marginTop: 0,
									textAlign: 'center',
								} }
							/>
						) }
						{ sectionSubtitle && (
							<RichText.Content
								tagName="p"
								value={ sectionSubtitle }
								style={ {
									fontSize: `${ Number(
										sectionSubtitleFontSize
									) }rem`,
									color: sectionSubtitleColor,
									margin: 0,
									textAlign: 'center',
								} }
							/>
						) }
					</div>
				) }
				<div
					className="paed-conditions-grid"
					style={ {
						display: 'grid',
						gridTemplateColumns: `repeat(auto-fill, minmax(${ Number(
							minColumnWidth
						) }px, 1fr))`,
						gap: `${ Number( gap ) }px`,
					} }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
