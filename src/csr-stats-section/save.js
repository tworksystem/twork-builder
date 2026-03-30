import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		paddingHorizontal,
		columns,
		gap,
		borderRadius,
		boxShadow,
		boxShadowColor,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowOffsetX,
		boxShadowOffsetY,
		sectionMaxWidth,
		marginTop,
		containerMaxWidth,
		containerPadding,
		animationOnScroll,
		animationType,
		animationDelay,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-csr-stats-section',
	} );

	const sectionStyle = {
		backgroundColor,
		marginTop: `${ marginTop }px`,
		maxWidth: `${ sectionMaxWidth }px`,
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: `${ paddingTop }px ${ paddingHorizontal }px ${ paddingBottom }px`,
		borderRadius: `${ borderRadius }px`,
		boxShadow: boxShadow
			? `${ boxShadowOffsetX }px ${ boxShadowOffsetY }px ${ boxShadowBlur }px ${ boxShadowSpread }px ${ boxShadowColor }`
			: 'none',
		position: 'relative',
		zIndex: 5,
	};

	return (
		<div { ...blockProps }>
			<div
				className="jivaka-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
					position: 'relative',
				} }
			>
				<div
					className="stats-section fade-up"
					style={ sectionStyle }
					data-animation={ animationOnScroll }
					data-animation-type={ animationType }
					data-animation-delay={ animationDelay }
				>
					<div
						className="stats-grid"
						style={ {
							display: 'grid',
							gridTemplateColumns: `repeat(${ columns }, 1fr)`,
							gap: `${ gap }px`,
							textAlign: 'center',
						} }
					>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</div>
	);
}
