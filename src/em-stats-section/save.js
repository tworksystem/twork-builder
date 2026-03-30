import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		marginTop,
		containerMaxWidth,
		containerPadding,
		gap,
		borderRadius,
		boxShadow,
		boxShadowColor,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowOffsetX,
		boxShadowOffsetY,
		animationOnScroll,
		animationType,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-em-stats-section',
	} );

	const statsClass = [ 'em-stats' ]
		.concat( animationOnScroll && animationType ? animationType : [] )
		.filter( Boolean )
		.join( ' ' );

	const statsStyle = {
		background: backgroundColor,
		color: '#fff',
		padding: `${ paddingTop }px 0 ${ paddingBottom }px`,
		marginTop: `${ marginTop }px`,
		position: 'relative',
		zIndex: 5,
		borderRadius: `${ borderRadius }px`,
		boxShadow: boxShadow
			? `${ boxShadowOffsetX }px ${ boxShadowOffsetY }px ${ boxShadowBlur }px ${ boxShadowSpread }px ${ boxShadowColor }`
			: 'none',
	};

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
		gap: `${ gap }px`,
		textAlign: 'center',
	};

	return (
		<div { ...blockProps }>
			<div
				className="em-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
					position: 'relative',
				} }
			>
				<div
					className={ statsClass }
					style={ statsStyle }
					data-animation={ animationOnScroll }
					data-animation-type={ animationType }
				>
					<div className="em-stats-grid" style={ gridStyle }>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</div>
	);
}
