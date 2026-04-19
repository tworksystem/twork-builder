import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

/**
 * Previous save markup for twork/agrezer-team-section (conditional tagline/title).
 * Kept so existing content validates after save.js is aligned with edit.js.
 *
 * @param {Object} props            Props passed to the deprecated save.
 * @param {Object} props.attributes Block attributes.
 */
export default function saveDeprecated( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerWidthPct,
		gridGap,
		columns,
		headerMarginBottom,
		tagIcon,
		tagIconAlt,
		tagline,
		title,
	} = attributes;

	const cols = Math.min( 4, Math.max( 1, parseInt( columns, 10 ) || 3 ) );

	const blockProps = useBlockProps.save( {
		className: 'agrezer-team-section twork-agrezer-team-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--agrezer-team-max': `${ containerMaxWidth }px`,
			'--agrezer-team-width-pct': `${ containerWidthPct }%`,
			'--agrezer-team-gap': `${ gridGap }px`,
			'--agrezer-team-cols': String( cols ),
			'--agrezer-team-header-mb': `${ headerMarginBottom }px`,
		},
	} );

	return (
		<section { ...blockProps }>
			<div className="agrezer-team-section__container">
				<div className="agrezer-team-section__header">
					{ ( tagline || tagIcon ) && (
						<div className="agrezer-team-section__tagline">
							{ tagIcon && (
								<img
									src={ tagIcon }
									alt={ tagIconAlt || '' }
									className="agrezer-team-section__tag-icon"
									width="20"
									height="20"
									loading="lazy"
									decoding="async"
								/>
							) }
							{ tagline && (
								<RichText.Content
									tagName="span"
									value={ tagline }
								/>
							) }
						</div>
					) }
					{ title && (
						<RichText.Content
							tagName="h2"
							className="agrezer-team-section__title"
							value={ title }
						/>
					) }
				</div>

				<div className="agrezer-team-section__grid">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
