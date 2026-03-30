import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		gap,
		minColumnWidth,
		showSectionHeader,
		sectionTitle,
		sectionTitleColor,
		sectionTitleFontSize,
		sectionTitleFontWeight,
		sectionSubtitle,
		sectionSubtitleColor,
		sectionSubtitleFontSize,
		headerMaxWidth,
		headerMarginBottom,
		animationOnScroll,
		animationType,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'em-section twork-em-triage-section',
	} );

	const sectionStyle = {
		backgroundColor,
		paddingTop: `${ paddingTop }px`,
		paddingBottom: `${ paddingBottom }px`,
		position: 'relative',
	};

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
	};

	const headerStyle = {
		textAlign: 'center',
		maxWidth: `${ headerMaxWidth }px`,
		margin: `0 auto ${ headerMarginBottom }px`,
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(auto-fill, minmax(${ minColumnWidth }px, 1fr))`,
		gap: `${ gap }px`,
	};

	return (
		<section { ...blockProps } style={ sectionStyle }>
			<div className="em-container" style={ containerStyle }>
				{ showSectionHeader && (
					<div
						className={ `em-header ${
							animationOnScroll && animationType
								? animationType
								: ''
						}` }
						style={ headerStyle }
						data-animation={ animationOnScroll }
						data-animation-type={ animationType }
					>
						<RichText.Content
							tagName="h2"
							value={ sectionTitle }
							style={ {
								fontSize: `${ sectionTitleFontSize }rem`,
								fontWeight: sectionTitleFontWeight,
								color: sectionTitleColor,
								marginBottom: '15px',
								marginTop: 0,
							} }
						/>
						<RichText.Content
							tagName="p"
							value={ sectionSubtitle }
							style={ {
								fontSize: `${ sectionSubtitleFontSize }rem`,
								color: sectionSubtitleColor,
								margin: 0,
							} }
						/>
					</div>
				) }

				<div className="em-triage-grid" style={ gridStyle }>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
