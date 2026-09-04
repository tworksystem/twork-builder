import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		showSection,
		backgroundColor,
		borderColor,
		paddingTop,
		paddingBottom,
		marginTop,
		containerMaxWidth,
		containerPadding,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		cardRadius,
		enableCounterAnimation,
		animationOnScroll,
		respectReducedMotion,
	} = attributes;

	if ( showSection === false ) {
		return null;
	}

	const colDesktop = columns || 4;

	const blockProps = useBlockProps.save( {
		className: 'twork-laparo-stats-section mk-laparo-stats-section trust',
		style: {
			marginTop: `${ marginTop }px`,
			'--laparo-stats-margin-top': `${ marginTop }px`,
			'--laparo-stats-columns-desktop': colDesktop,
			'--laparo-stats-columns-tablet': columnsTablet || 2,
			'--laparo-stats-columns-mobile': columnsMobile || 1,
			'--laparo-stats-gap': `${ gap || 20 }px`,
			'--laparo-stats-card-radius': `${ cardRadius }px`,
			'--laparo-container': `${ containerMaxWidth }px`,
		},
		'data-counter-animation': enableCounterAnimation ? '1' : '0',
		'data-animation': animationOnScroll ? '1' : '0',
		'data-reduced-motion': respectReducedMotion ? '1' : '0',
	} );

	/* Padding T/B attrs stay for saved markup stability; FE critical.css
	   clamps all sides with !important (laparoscopy.html SoT). */
	const cardStyle = {
		backgroundColor,
		borderColor,
		paddingTop: `${ paddingTop }px`,
		paddingBottom: `${ paddingBottom }px`,
		display: 'grid',
		gridTemplateColumns: `repeat(${ colDesktop }, minmax(0, 1fr))`,
		gap: `${ gap || 20 }px`,
		width: '100%',
	};

	return (
		<section { ...blockProps }>
			<div
				className="laparo-container"
				style={ { padding: `0 ${ containerPadding }px` } }
			>
				<div
					className={
						animationOnScroll ? 'trust-card reveal' : 'trust-card'
					}
					style={ cardStyle }
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
