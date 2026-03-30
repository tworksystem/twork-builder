import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const DEFAULT_ATTS = {
	backgroundColor: 'transparent',
	paddingTop: 0,
	paddingBottom: 60,
	marginTop: -50,
	containerMaxWidth: 1280,
	containerPadding: 24,
	columns: 4,
	gap: 30,
	cardPadding: 30,
	cardBorderRadius: 20,
	cardBorderBottomWidth: 5,
	primaryColor: '#f48b2a',
	animationOnScroll: true,
	staggerClass: 'stagger-up',
};

export default function save( { attributes } ) {
	const attrs = { ...DEFAULT_ATTS, ...attributes };
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		marginTop,
		containerMaxWidth,
		containerPadding,
		columns,
		gap,
		cardPadding,
		cardBorderRadius,
		cardBorderBottomWidth,
		primaryColor,
		animationOnScroll,
		staggerClass,
	} = attrs;

	const blockProps = useBlockProps.save( {
		className: 'twork-phy-stats-section',
		style: {
			backgroundColor: backgroundColor || 'transparent',
			paddingTop: `${ Number( paddingTop ) }px`,
			paddingBottom: `${ Number( paddingBottom ) }px`,
			marginTop: `${ Number( marginTop ) }px`,
			position: 'relative',
			zIndex: 3,
			'--phy-primary': primaryColor || DEFAULT_ATTS.primaryColor,
			'--phy-stat-gap': `${ Number( gap ) }px`,
			'--phy-stat-columns': columns,
			'--phy-stat-card-padding': `${ Number( cardPadding ) }px`,
			'--phy-stat-card-radius': `${ Number( cardBorderRadius ) }px`,
			'--phy-stat-card-border-bottom': `${ Number(
				cardBorderBottomWidth
			) }px solid ${ primaryColor || DEFAULT_ATTS.primaryColor }`,
		},
		'data-animation': animationOnScroll ? 'true' : 'false',
		'data-stagger-class': staggerClass || 'stagger-up',
	} );

	return (
		<div { ...blockProps }>
			<div
				className="phy-container"
				style={ {
					maxWidth: `${ Number( containerMaxWidth ) }px`,
					margin: '0 auto',
					padding: `0 ${ Number( containerPadding ) }px`,
					position: 'relative',
				} }
			>
				<div
					className="phy-stats-grid"
					style={ {
						display: 'grid',
						gridTemplateColumns: `repeat(${
							Number( columns ) || 4
						}, minmax(200px, 1fr))`,
						gap: `${ Number( gap ) || 30 }px`,
						width: '100%',
					} }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
