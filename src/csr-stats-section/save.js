import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const DEFAULT_ATTS = {
	backgroundColor: '#f8f9fa',
	paddingTop: 40,
	paddingBottom: 40,
	paddingHorizontal: 40,
	columns: 4,
	columnsTablet: 2,
	columnsMobile: 1,
	gap: 30,
	borderRadius: 12,
	boxShadow: true,
	boxShadowColor: 'rgba(0, 0, 0, 0.08)',
	boxShadowBlur: 30,
	boxShadowSpread: 0,
	boxShadowOffsetX: 0,
	boxShadowOffsetY: 10,
	sectionMaxWidth: 1100,
	marginTop: -60,
	containerMaxWidth: 1200,
	containerPadding: 20,
	animationOnScroll: true,
	animationType: 'fadeInUp',
	animationDelay: 100,
};

const ANIMATION_CLASS_MAP = {
	fadeInUp: 'fade-up',
	fadeIn: 'fade-in',
	slideInLeft: 'slide-in-left',
	slideInRight: 'slide-in-right',
	zoomIn: 'zoom-in',
};

export default function save( { attributes } ) {
	const attrs = { ...DEFAULT_ATTS, ...attributes };
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		paddingHorizontal,
		columns,
		columnsTablet,
		columnsMobile,
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
	} = attrs;

	const animationClass =
		animationOnScroll && animationType
			? ANIMATION_CLASS_MAP[ animationType ] || 'fade-up'
			: '';

	const blockProps = useBlockProps.save( {
		className: 'mk-csr-stats-section',
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
					className={ `stats-section${
						animationClass ? ` ${ animationClass }` : ''
					}` }
					style={ sectionStyle }
					data-animation={ animationOnScroll }
					data-animation-type={ animationType }
					data-animation-delay={ animationDelay }
					data-columns={ columns }
					data-columns-tablet={ columnsTablet }
					data-columns-mobile={ columnsMobile }
				>
					<div
						className="stats-grid"
						style={ {
							display: 'grid',
							gridTemplateColumns: `repeat(${ columns }, 1fr)`,
							gap: `${ gap }px`,
							textAlign: 'center',
							'--csr-stats-columns': columns,
							'--csr-stats-columns-tablet': columnsTablet,
							'--csr-stats-columns-mobile': columnsMobile,
						} }
					>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</div>
	);
}
