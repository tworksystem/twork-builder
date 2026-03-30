import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		sectionPaddingTop,
		sectionPaddingBottom,
		containerMaxWidth,
		containerPadding,
		showIcon,
		icon,
		iconSize,
		iconColor,
		iconMarginBottom,
		title,
		titleColor,
		titleFontSize,
		titleFontWeight,
		titleMarginBottom,
		description,
		descriptionColor,
		descriptionFontSize,
		boxBackgroundColor,
		boxPadding,
		boxBorderRadius,
		boxBorderStyle,
		boxBorderColor,
		boxBorderWidth,
		townships,
		townshipsGap,
		townshipsMarginTop,
		townshipBgColor,
		townshipTextColor,
		townshipPaddingVertical,
		townshipPaddingHorizontal,
		townshipBorderRadius,
		townshipFontWeight,
		animationOnScroll,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-amb-map-section amb-section',
		style: {
			paddingTop: `${ sectionPaddingTop }px`,
			paddingBottom: `${ sectionPaddingBottom }px`,
		},
		'data-animation': animationOnScroll,
	} );

	return (
		<section { ...blockProps }>
			<div
				className="amb-container jivaka-container"
				style={ {
					maxWidth: `${ containerMaxWidth }px`,
					margin: '0 auto',
					padding: `0 ${ containerPadding }px`,
				} }
			>
				<div
					className="amb-map-box twork-amb-map-box"
					style={ {
						backgroundColor: boxBackgroundColor,
						padding: `${ boxPadding }px`,
						borderRadius: `${ boxBorderRadius }px`,
						textAlign: 'center',
						border: `${ boxBorderWidth }px ${ boxBorderStyle } ${ boxBorderColor }`,
					} }
				>
					{ showIcon && icon && (
						<i
							className={ `fas ${ icon } amb-map-icon` }
							style={ {
								fontSize: `${ iconSize }rem`,
								color: iconColor,
								marginBottom: `${ iconMarginBottom }px`,
								display: 'block',
							} }
							aria-hidden="true"
						/>
					) }
					{ title && (
						<RichText.Content
							tagName="h2"
							value={ title }
							style={ {
								color: titleColor,
								fontSize: `${ titleFontSize }rem`,
								fontWeight: titleFontWeight,
								marginBottom: `${ titleMarginBottom }px`,
								marginTop: 0,
							} }
						/>
					) }
					{ description && (
						<RichText.Content
							tagName="p"
							value={ description }
							style={ {
								color: descriptionColor,
								fontSize: `${ descriptionFontSize }rem`,
								margin: 0,
							} }
						/>
					) }
					{ townships && townships.length > 0 && (
						<div
							className="amb-townships"
							style={ {
								display: 'flex',
								flexWrap: 'wrap',
								justifyContent: 'center',
								gap: `${ townshipsGap }px`,
								marginTop: `${ townshipsMarginTop }px`,
							} }
						>
							{ townships.map( ( t ) => (
								<span
									key={ t.id }
									className="amb-township"
									style={ {
										backgroundColor: townshipBgColor,
										color: townshipTextColor,
										padding: `${ townshipPaddingVertical }px ${ townshipPaddingHorizontal }px`,
										borderRadius: `${ townshipBorderRadius }px`,
										fontWeight: townshipFontWeight,
									} }
								>
									{ t.text }
								</span>
							) ) }
						</div>
					) }
				</div>
			</div>
		</section>
	);
}
