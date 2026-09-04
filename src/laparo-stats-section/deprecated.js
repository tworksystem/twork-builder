/**
 * Deprecations for laparo-stats-section save migrations.
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
 * v2: inline grid on trust-card; no --laparo-stats-margin-top.
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
		className: 'twork-laparo-stats-section mk-laparo-stats-section trust',
		style: {
			marginTop: `${ marginTop }px`,
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
		className: 'twork-laparo-stats-section mk-laparo-stats-section trust',
		style: {
			marginTop: `${ marginTop }px`,
			'--laparo-stats-columns-desktop': columns,
			'--laparo-stats-columns-tablet': columnsTablet,
			'--laparo-stats-columns-mobile': columnsMobile,
			'--laparo-stats-gap': `${ gap }px`,
			'--laparo-stats-card-radius': `${ cardRadius }px`,
			'--laparo-container': `${ containerMaxWidth }px`,
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
