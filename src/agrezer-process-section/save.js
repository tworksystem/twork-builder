import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerGutter,
		gridGap,
		taglineIcon,
		taglineText,
		sectionTitle,
		taglineColor,
		taglineIconColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
		wreathDecorationUrl,
	} = attributes;

	const wreathVar = wreathDecorationUrl
		? `url("${ String( wreathDecorationUrl )
				.replace( /\\/g, '\\\\' )
				.replace( /"/g, '\\"' ) }")`
		: undefined;

	const blockProps = useBlockProps.save( {
		className: `twork-process twork-process-section ${
			wreathDecorationUrl ? 'has-process-wreath' : ''
		}`,
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--twork-process-grid-gap': `${ gridGap }px`,
			...( wreathVar ? { '--twork-process-wreath': wreathVar } : {} ),
		},
	} );

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
		gap: `${ gridGap }px`,
	};

	return (
		<section { ...blockProps } aria-labelledby="twork-process-title">
			<div className="twork-process__header">
				<p
					className="twork-process__tagline"
					style={ { color: taglineColor } }
				>
					<span
						className="twork-process__tagline-icon"
						style={ { color: taglineIconColor } }
						aria-hidden="true"
					>
						{ taglineIcon }
					</span>
					<RichText.Content tagName="span" value={ taglineText } />
				</p>
				<RichText.Content
					tagName="h2"
					id="twork-process-title"
					className="twork-process__title"
					value={ sectionTitle }
					style={ {
						color: titleColor,
						fontSize: `${ titleFontSize }rem`,
						fontWeight: titleFontWeight,
					} }
				/>
			</div>

			<div
				className="twork-process__container"
				style={ containerStyle }
			>
				<InnerBlocks.Content />
			</div>
		</section>
	);
}
