import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		metaTitle,
		mainTitleLine1,
		mainTitleHighlight,
		mainTitleLine2,
		mainDescription,
		subText,
		iconClass,
		bookingMetaTitle,
		bookingTitle,
		bookingDescription,
		selectOptions,
		selectName,
		selectAriaLabel,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		gridGap,
		highlightColor,
		cardBgColor,
		cardBorderColor,
		cardPadding,
		bookingTitleColor,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'help-section jivaka-section',
		style: {
			backgroundColor: backgroundColor || undefined,
			paddingTop: paddingTop != null ? `${ paddingTop }px` : undefined,
			paddingBottom:
				paddingBottom != null ? `${ paddingBottom }px` : undefined,
		},
	} );

	const containerStyle = {
		maxWidth:
			containerMaxWidth != null ? `${ containerMaxWidth }px` : undefined,
		margin: '0 auto',
		padding:
			containerPadding != null ? `0 ${ containerPadding }px` : undefined,
	};

	const gridStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: gridGap != null ? `${ gridGap }px` : undefined,
	};

	const cardStyle = {
		backgroundColor: cardBgColor || undefined,
		border: cardBorderColor ? `1px solid ${ cardBorderColor }` : undefined,
		padding: cardPadding != null ? `${ cardPadding }px` : undefined,
		borderRadius: '5px',
	};

	const options =
		Array.isArray( selectOptions ) && selectOptions.length
			? selectOptions
			: [ { value: '', label: 'Select Department' } ];

	return (
		<section { ...blockProps }>
			<div className="jivaka-container" style={ containerStyle }>
				<div className="help-content-grid" style={ gridStyle }>
					<div className="help-text-content">
						<RichText.Content
							tagName="p"
							className="meta-title"
							value={ metaTitle }
						/>
						<h2 className="help-section-title">
							<RichText.Content
								tagName="span"
								value={ mainTitleLine1 }
							/>
							<br />
							<RichText.Content
								tagName="span"
								className="highlight-red"
								value={ mainTitleHighlight }
								style={
									highlightColor
										? { color: highlightColor }
										: undefined
								}
							/>{ ' ' }
							<RichText.Content
								tagName="span"
								value={ mainTitleLine2 }
							/>
						</h2>
						<RichText.Content
							tagName="p"
							value={ mainDescription }
							className="help-main-desc"
						/>
						<p
							className="help-sub-text"
							style={ { fontSize: '0.9rem', marginTop: '10px' } }
						>
							<i
								className={ iconClass || 'fas fa-mobile-alt' }
								style={
									highlightColor
										? { color: highlightColor }
										: undefined
								}
								aria-hidden
							/>{ ' ' }
							<RichText.Content
								tagName="span"
								value={ subText }
							/>
						</p>
					</div>

					<div className="help-booking-card" style={ cardStyle }>
						<RichText.Content
							tagName="p"
							className="meta-title"
							value={ bookingMetaTitle }
						/>
						<RichText.Content
							tagName="h3"
							value={ bookingTitle }
							style={
								bookingTitleColor
									? { color: bookingTitleColor }
									: undefined
							}
						/>
						<RichText.Content
							tagName="p"
							value={ bookingDescription }
							className="help-booking-desc"
						/>
						<div className="custom-select-wrapper">
							<select
								name={ selectName || 'doctors' }
								aria-label={
									selectAriaLabel || 'Select Department'
								}
							>
								{ options.map( ( opt, i ) => (
									<option
										key={ i }
										value={ opt?.value ?? '' }
									>
										{ opt?.label ?? '' }
									</option>
								) ) }
							</select>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
