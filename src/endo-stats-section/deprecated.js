/**
 * Deprecations for endo-stats-section save migrations.
 * Newest first — WP tries in order until one validates.
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const sharedAttributes = {
	showSection: { type: 'boolean', default: true },
	backgroundColor: { type: 'string', default: '#ffffff' },
	borderColor: { type: 'string', default: '#e0e0e0' },
	paddingTop: { type: 'number', default: 44 },
	paddingBottom: { type: 'number', default: 44 },
	marginTop: { type: 'number', default: -60 },
	containerMaxWidth: { type: 'number', default: 1200 },
	containerPadding: { type: 'number', default: 24 },
	columns: { type: 'number', default: 4 },
	columnsTablet: { type: 'number', default: 2 },
	columnsMobile: { type: 'number', default: 1 },
	gap: { type: 'number', default: 20 },
	cardRadius: { type: 'number', default: 28 },
	enableCounterAnimation: { type: 'boolean', default: true },
	animationOnScroll: { type: 'boolean', default: true },
	respectReducedMotion: { type: 'boolean', default: true },
};

/**
 * v2: inline grid on trust-card; no --endo-stats-margin-top.
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element|null} Saved markup.
 */
function saveV2( { attributes } ) {
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
		className: 'twork-endo-stats-section mk-endo-stats-section trust',
		style: {
			marginTop: `${ marginTop }px`,
			'--endo-stats-columns-desktop': colDesktop,
			'--endo-stats-columns-tablet': columnsTablet || 2,
			'--endo-stats-columns-mobile': columnsMobile || 1,
			'--endo-stats-gap': `${ gap || 20 }px`,
			'--endo-stats-card-radius': `${ cardRadius }px`,
			'--endo-container': `${ containerMaxWidth }px`,
		},
		'data-counter-animation': enableCounterAnimation ? '1' : '0',
		'data-animation': animationOnScroll ? '1' : '0',
		'data-reduced-motion': respectReducedMotion ? '1' : '0',
	} );

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
				className="endo-container"
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

/**
 * v1: trust-card had padding/colors only — no inline display:grid.
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element|null} Saved markup.
 */
function saveV1( { attributes } ) {
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

	const blockProps = useBlockProps.save( {
		className: 'twork-endo-stats-section mk-endo-stats-section trust',
		style: {
			marginTop: `${ marginTop }px`,
			'--endo-stats-columns-desktop': columns,
			'--endo-stats-columns-tablet': columnsTablet,
			'--endo-stats-columns-mobile': columnsMobile,
			'--endo-stats-gap': `${ gap }px`,
			'--endo-stats-card-radius': `${ cardRadius }px`,
			'--endo-container': `${ containerMaxWidth }px`,
		},
		'data-counter-animation': enableCounterAnimation ? '1' : '0',
		'data-animation': animationOnScroll ? '1' : '0',
		'data-reduced-motion': respectReducedMotion ? '1' : '0',
	} );

	const cardStyle = {
		backgroundColor,
		borderColor,
		paddingTop: `${ paddingTop }px`,
		paddingBottom: `${ paddingBottom }px`,
	};

	return (
		<section { ...blockProps }>
			<div
				className="endo-container"
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

export default [
	{
		attributes: sharedAttributes,
		save: saveV2,
		migrate( attributes ) {
			return { ...attributes };
		},
	},
	{
		attributes: sharedAttributes,
		save: saveV1,
		migrate( attributes ) {
			return { ...attributes };
		},
	},
];
