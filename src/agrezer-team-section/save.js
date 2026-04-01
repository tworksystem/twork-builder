import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
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
		className: 'twork-team-section twork-team-section',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--twork-team-max': `${ containerMaxWidth }px`,
			'--twork-team-width-pct': `${ containerWidthPct }%`,
			'--twork-team-gap': `${ gridGap }px`,
			'--twork-team-cols': String( cols ),
			'--twork-team-header-mb': `${ headerMarginBottom }px`,
		},
	} );

	return (
		<section { ...blockProps }>
			<div className="twork-team-section__container">
				<div className="twork-team-section__header">
					{ ( tagline || tagIcon ) && (
						<div className="twork-team-section__tagline">
							{ tagIcon && (
								<img
									src={ tagIcon }
									alt={ tagIconAlt || '' }
									className="twork-team-section__tag-icon"
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
							className="twork-team-section__title"
							value={ title }
						/>
					) }
				</div>

				<div className="twork-team-section__grid">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
}
