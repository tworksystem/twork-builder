import { useBlockProps, RichText } from '@wordpress/block-editor';
import {
	getMediaColumnStyle,
	normalizeMediaSlides,
} from './media-helpers';

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
		showBookButton = true,
		bookButtonText,
		bookButtonOpenInNewTab,
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
		rightColumnMode = 'booking',
		showDepartmentDropdown = true,
		mediaType = 'image',
		mediaImage,
		mediaImageAlt,
		slideshowImages = [],
		slideshowInterval,
		mediaVideoUrl,
		videoPosterUrl,
		videoLoop,
		videoMuted,
		videoAutoplay,
		mediaBorderRadius,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'help-section jivaka-section',
		style: {
			backgroundColor: backgroundColor || undefined,
			paddingTop: paddingTop != null ? `${ paddingTop }px` : undefined,
			paddingBottom:
				paddingBottom != null ? `${ paddingBottom }px` : undefined,
		},
		'data-right-column-mode': rightColumnMode || 'booking',
	} );

	const containerStyle = {
		maxWidth:
			containerMaxWidth != null ? `${ containerMaxWidth }px` : undefined,
		margin: '0 auto',
		padding:
			containerPadding != null ? `0 ${ containerPadding }px` : undefined,
		'--help-container-max':
			containerMaxWidth != null ? `${ containerMaxWidth }px` : undefined,
		'--help-container-padding':
			containerPadding != null ? `${ containerPadding }px` : undefined,
	};

	const gridStyle = {
		gap: gridGap != null ? `${ gridGap }px` : undefined,
		'--help-grid-gap': gridGap != null ? `${ gridGap }px` : undefined,
	};

	const cardStyle = {
		backgroundColor: cardBgColor || undefined,
		border: cardBorderColor ? `1px solid ${ cardBorderColor }` : undefined,
		padding: cardPadding != null ? `${ cardPadding }px` : undefined,
		borderRadius: '5px',
	};

	const mediaColumnStyle = getMediaColumnStyle( mediaBorderRadius );

	const options =
		Array.isArray( selectOptions ) && selectOptions.length
			? selectOptions
			: [ { value: '', label: 'Select Department' } ];

	const slides = normalizeMediaSlides( slideshowImages );
	const isMediaMode = rightColumnMode === 'media';
	const isImageMedia = ! mediaType || mediaType === 'image';
	const isSlideshowMedia = mediaType === 'slideshow';
	const isVideoMedia = mediaType === 'video';

	const bookButtonTarget = bookButtonOpenInNewTab ? '_blank' : undefined;
	const bookButtonRel = bookButtonOpenInNewTab
		? 'noopener noreferrer'
		: undefined;

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

					{ isMediaMode ? (
						<div
							className="help-media-column"
							style={ mediaColumnStyle }
							data-media-type={ mediaType || 'image' }
						>
							{ isImageMedia && mediaImage && (
								<img
									src={ mediaImage }
									alt={ mediaImageAlt || '' }
									className="help-media-image"
									decoding="async"
								/>
							) }

							{ isSlideshowMedia && slides.length > 0 && (
								<div
									className="help-media-slideshow"
									data-slideshow-interval={
										Number( slideshowInterval ) || 5000
									}
									data-slideshow-count={ slides.length }
								>
									{ slides.map( ( img, index ) => (
										<img
											key={ index }
											src={ img.url }
											alt={ img.alt || '' }
											className={
												'help-media-slide' +
												( index === 0
													? ' is-active'
													: '' )
											}
											decoding="async"
										/>
									) ) }
								</div>
							) }

							{ isVideoMedia && mediaVideoUrl && (
								<div className="help-media-video-wrap">
									<video
										className="help-media-video"
										src={ mediaVideoUrl }
										poster={ videoPosterUrl || undefined }
										autoPlay={ videoAutoplay }
										muted={ videoMuted }
										loop={ videoLoop }
										playsInline
									/>
								</div>
							) }
						</div>
					) : (
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
							{ showDepartmentDropdown && (
								<div className="custom-select-wrapper">
									<select
										className="help-dept-select"
										name={ selectName || 'doctors' }
										aria-label={
											selectAriaLabel ||
											'Select Department'
										}
									>
										{ options.map( ( opt, i ) => (
											<option
												key={ i }
												value={ opt?.value ?? '' }
												data-book-url={
													opt?.bookUrl || ''
												}
											>
												{ opt?.label ?? '' }
											</option>
										) ) }
									</select>
								</div>
							) }

							{ showBookButton && (
								<a
									href="#"
									className="jivaka-btn help-book-btn is-disabled"
									data-help-book-btn="true"
									target={ bookButtonTarget }
									rel={ bookButtonRel }
									aria-disabled="true"
									tabIndex={ -1 }
								>
									{ bookButtonText || 'BOOK NOW' }
								</a>
							) }
						</div>
					) }
				</div>
			</div>
		</section>
	);
}
