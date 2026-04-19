import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';

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
		taglineColor = '#1f1f1f',
		taglineFontSize = 17,
		tagIconSize = 20,
		taglineGap = 10,
		tagline,
		titleColor = '#131313',
		titleFontSize = 0,
		title,
	} = attributes;

	const blockStyle = {};
	if ( backgroundColor ) {
		blockStyle.backgroundColor = backgroundColor;
	}
	if ( paddingTop !== undefined ) {
		blockStyle[ '--tw-team-pt' ] = `${ paddingTop }px`;
	}
	if ( paddingBottom !== undefined ) {
		blockStyle[ '--tw-team-pb' ] = `${ paddingBottom }px`;
	}
	if ( containerMaxWidth ) {
		blockStyle[ '--twork-team-max' ] = `${ containerMaxWidth }px`;
	}
	if ( containerWidthPct ) {
		blockStyle[ '--twork-team-width-pct' ] = `${ containerWidthPct }px`;
	}
	if ( containerWidthPct ) {
		blockStyle[ '--twork-team-width-pct' ] = `${ containerWidthPct }%`;
	}
	if ( gridGap !== undefined ) {
		blockStyle[ '--twork-team-gap' ] = `${ gridGap }px`;
	}
	const parsedCols = Math.min(
		4,
		Math.max( 1, parseInt( columns, 10 ) || 3 )
	);
	if ( parsedCols ) {
		blockStyle[ '--twork-team-cols' ] = String( parsedCols );
	}
	if ( headerMarginBottom !== undefined ) {
		blockStyle[ '--twork-team-header-mb' ] = `${ headerMarginBottom }px`;
	}
	if ( taglineColor ) {
		blockStyle[ '--tw-tag-color' ] = taglineColor;
	}
	if ( taglineFontSize ) {
		blockStyle[ '--tw-tag-size' ] = `${ taglineFontSize }px`;
	}
	if ( tagIconSize ) {
		blockStyle[ '--tw-tag-icon-size' ] = `${ tagIconSize }px`;
	}
	if ( taglineGap !== undefined ) {
		blockStyle[ '--tw-tag-gap' ] = `${ taglineGap }px`;
	}
	if ( titleColor ) {
		blockStyle[ '--tw-team-title-color' ] = titleColor;
	}
	if ( titleFontSize >= 20 ) {
		blockStyle[ '--tw-team-title-size' ] = `${ titleFontSize }px`;
	}

	const blockProps = useBlockProps.save( {
		className: 'twork-team-section',
		style: blockStyle,
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'twork-team-section__grid',
	} );

	return (
		<section { ...blockProps }>
			<div className="twork-team-section__container">
				<div className="twork-team-section__header">
					<div className="twork-team-section__tagline">
						{ tagIcon && (
							<img
								src={ tagIcon }
								alt={ tagIconAlt || '' }
								className="twork-team-section__tag-icon"
								width={ tagIconSize }
								height={ tagIconSize }
								loading="lazy"
								decoding="async"
							/>
						) }
						<RichText.Content tagName="span" value={ tagline } />
					</div>
					<RichText.Content
						tagName="h2"
						className="twork-team-section__title"
						value={ title }
					/>
				</div>

				<div { ...innerBlocksProps } />
			</div>
		</section>
	);
}
