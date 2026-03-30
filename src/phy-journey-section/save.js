import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

const DEFAULT_ATTRS = {
	backgroundColor: 'transparent',
	paddingTop: 60,
	paddingBottom: 60,
	containerMaxWidth: 1280,
	containerPadding: 24,
	showSectionTitle: true,
	sectionTitle: 'Your Road to Recovery',
	showSectionSubtitle: true,
	sectionSubtitle: 'A structured approach to getting you back to 100%.',
	headerAlign: 'center',
	animationOnScroll: true,
	animationType: 'fade-up',
	animationDelay: 100,
};

export default function save( { attributes = {} } ) {
	const attrs = { ...DEFAULT_ATTRS, ...attributes };
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		showSectionTitle,
		sectionTitle,
		showSectionSubtitle,
		sectionSubtitle,
		headerAlign,
		animationOnScroll,
		animationType,
		animationDelay,
	} = attrs;

	const blockProps = useBlockProps.save( {
		className: 'phy-section twork-phy-journey-section',
		style: {
			backgroundColor,
			paddingTop: `${ Number( paddingTop ) }px`,
			paddingBottom: `${ Number( paddingBottom ) }px`,
			position: 'relative',
		},
		'data-animation': animationOnScroll ? 'true' : 'false',
		'data-animation-type': animationType,
		'data-animation-delay': Number( animationDelay ),
	} );

	return (
		<section { ...blockProps }>
			<div
				className="phy-container"
				style={ {
					maxWidth: `${ Number( containerMaxWidth ) }px`,
					margin: '0 auto',
					padding: `0 ${ Number( containerPadding ) }px`,
				} }
			>
				{ ( showSectionTitle || showSectionSubtitle ) && (
					<div
						className={ `phy-header ${
							animationOnScroll ? animationType : ''
						}` }
						style={ {
							textAlign: headerAlign,
							maxWidth: 700,
							margin: '0 auto 50px',
						} }
					>
						{ showSectionTitle && sectionTitle && (
							<RichText.Content
								tagName="h2"
								value={ sectionTitle }
							/>
						) }
						{ showSectionSubtitle && sectionSubtitle && (
							<RichText.Content
								tagName="p"
								value={ sectionSubtitle }
							/>
						) }
					</div>
				) }

				<div
					className={ `phy-journey-container ${
						animationOnScroll ? 'stagger-up' : ''
					}` }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
