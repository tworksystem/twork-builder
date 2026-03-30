import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		showSectionTitle,
		sectionTitle,
		sectionSubtitle,
		sectionTitleColor,
		sectionSubtitleColor,
		gap,
		animationOnScroll,
		animationType,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'hc-section twork-hc-testimonials-section',
		style: {
			backgroundColor: backgroundColor || '#fafafa',
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
		},
		'data-animation': animationOnScroll,
		'data-animation-type': animationType || 'fade-up',
	} );

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
		gap: `${ gap }px`,
	};

	return (
		<section { ...blockProps }>
			<div className="hc-container" style={ containerStyle }>
				{ showSectionTitle && ( sectionTitle || sectionSubtitle ) && (
					<div
						className={ `hc-header ${
							animationOnScroll && animationType
								? animationType
								: ''
						}` }
						style={ {
							textAlign: 'center',
							maxWidth: 700,
							margin: '0 auto 50px',
						} }
					>
						{ sectionTitle && (
							<RichText.Content
								tagName="h2"
								value={ sectionTitle }
								style={ {
									color: sectionTitleColor || '#212121',
									marginBottom: 15,
								} }
							/>
						) }
						{ sectionSubtitle && (
							<RichText.Content
								tagName="p"
								value={ sectionSubtitle }
								style={ {
									color: sectionSubtitleColor || '#555',
									margin: 0,
								} }
							/>
						) }
					</div>
				) }
				<div className="hc-testi-grid" style={ gridStyle }>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
