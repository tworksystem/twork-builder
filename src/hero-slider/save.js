/**
 * Hero Slider Block Save Component
 *
 * Renders the frontend output for the Hero Slider block.
 * Matches the exact structure from jivakahospital/index.html
 *
 * Features:
 * - Exact HTML structure matching reference design
 * - Semantic HTML with proper classes
 * - Inline styles for dynamic content
 * - Plain CSS/JS only – no external slider libraries
 * - Navigation buttons and pagination
 * - Accessible markup
 *
 * @param {Object} props Component props
 * @param {Object} props.attributes Block attributes
 * @returns {JSX.Element} The frontend HTML output
 */

import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { slides, autoplayDelay, effect } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'twork-hero-slider-section hero-section hero-slider',
		'data-effect': effect,
		'data-autoplay-delay': autoplayDelay,
	} );

	return (
		<section { ...blockProps }>
			<div className="swiper-wrapper">
				{ slides.map( ( slide, index ) => {
					// Background image with gradient overlay (matching HTML structure exactly)
					const backgroundImage = slide.backgroundImage
						? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${ slide.backgroundImage })`
						: '';

					return (
						<div
							key={ `slide-${ index }` }
							className="swiper-slide"
							style={ {
								backgroundImage: backgroundImage,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								display: 'flex',
								alignItems: 'center',
							} }
						>
							<div className="jivaka-container">
								{ slide.metaTitle && (
									<>
										<p
											className="hero__meta-title"
											style={ {
												fontSize:
													slide.metaTitleFontSize ||
													'0.75rem',
												color:
													slide.metaTitleColor ||
													'rgba(255, 255, 255, 0.9)',
												letterSpacing:
													slide.metaTitleLetterSpacing ||
													'3px',
											} }
											data-font-size-mobile={
												slide.metaTitleFontSizeMobile ||
												'0.65rem'
											}
											data-letter-spacing-mobile={
												slide.metaTitleLetterSpacingMobile ||
												'2px'
											}
										>
											{ slide.metaTitle }
										</p>
										{ slide.showSeparator !== false && (
											<div
												className="hero__separator"
												style={ {
													backgroundColor:
														slide.separatorColor ||
														'#f48b2a',
													width:
														slide.separatorWidth ||
														'60px',
													height:
														slide.separatorHeight ||
														'3px',
													borderRadius:
														slide.separatorBorderRadius ||
														'2px',
													opacity:
														slide.separatorOpacity ||
														'1',
													marginTop:
														slide.separatorMarginTop ||
														'0px',
													marginBottom:
														slide.separatorMarginBottom ||
														'20px',
													marginLeft:
														slide.separatorAlignment ===
														'left'
															? '0'
															: 'auto',
													marginRight:
														slide.separatorAlignment ===
														'right'
															? '0'
															: 'auto',
												} }
												data-width-mobile={
													slide.separatorWidthMobile ||
													'50px'
												}
												data-height-mobile={
													slide.separatorHeightMobile ||
													'2px'
												}
												data-margin-bottom-mobile={
													slide.separatorMarginBottomMobile ||
													'15px'
												}
											/>
										) }
									</>
								) }
								{ slide.title && slide.title.trim() && (
									<h1
										style={ {
											fontSize:
												slide.titleFontSize || '4rem',
											lineHeight:
												slide.titleLineHeight || '1.2',
											fontWeight:
												slide.titleFontWeight || '900',
											marginBottom: '20px',
										} }
										data-font-size-tablet={
											slide.titleFontSizeTablet ||
											'3.5rem'
										}
										data-font-size-mobile={
											slide.titleFontSizeMobile ||
											'2.5rem'
										}
										dangerouslySetInnerHTML={ {
											__html: ( () => {
												const html = (
													slide.title || ''
												).trim();
												if ( ! html ) return '';

												const parts =
													html.split(
														/(<br\s*\/?>)/i
													);
												const firstLineColor =
													slide.titlePart1Color ||
													'#f48b2a';
												const secondLineColor =
													slide.titlePart2Color ||
													'#2c3e50';

												return parts
													.map( ( part, idx ) => {
														if (
															part.match(
																/<br\s*\/?>/i
															)
														)
															return part;
														if ( part.trim() ) {
															const lineIndex =
																parts
																	.slice(
																		0,
																		idx
																	)
																	.filter(
																		( p ) =>
																			p.match(
																				/<br\s*\/?>/i
																			)
																	).length;
															const color =
																lineIndex === 0
																	? firstLineColor
																	: secondLineColor;
															return `<span style="color: ${ color }">${ part }</span>`;
														}
														return part;
													} )
													.join( '' );
											} )(),
										} }
									/>
								) }
								{ slide.description && (
									<p
										style={ {
											fontSize:
												slide.descriptionFontSize ||
												'1.2rem',
											color:
												slide.descriptionColor ||
												'rgba(255, 255, 255, 0.95)',
											lineHeight:
												slide.descriptionLineHeight ||
												'1.6',
											marginBottom: '30px',
											maxWidth: '500px',
										} }
										data-font-size-tablet={
											slide.descriptionFontSizeTablet ||
											'1.1rem'
										}
										data-font-size-mobile={
											slide.descriptionFontSizeMobile ||
											'0.95rem'
										}
										data-line-height-mobile={
											slide.descriptionLineHeightMobile ||
											'1.6'
										}
									>
										{ slide.description }
									</p>
								) }
								<div className="hero__buttons">
									{ slide.primaryButtonText && (
										<a
											href={ slide.primaryButtonLink }
											className="jivaka-btn jivaka-btn-primary"
											style={ {
												fontSize:
													slide.primaryButtonFontSize ||
													'0.9rem',
												padding:
													slide.primaryButtonPadding ||
													'12px 28px',
												marginRight: '15px',
											} }
											data-font-size-mobile={
												slide.primaryButtonFontSizeMobile ||
												'0.85rem'
											}
											data-padding-mobile={
												slide.primaryButtonPaddingMobile ||
												'14px 30px'
											}
										>
											{ slide.primaryButtonText }
										</a>
									) }
									{ slide.secondaryButtonText && (
										<a
											href={ slide.secondaryButtonLink }
											className="jivaka-btn jivaka-btn-secondary"
											style={ {
												fontSize:
													slide.secondaryButtonFontSize ||
													'0.9rem',
												padding:
													slide.secondaryButtonPadding ||
													'12px 28px',
											} }
											data-font-size-mobile={
												slide.secondaryButtonFontSizeMobile ||
												'0.85rem'
											}
											data-padding-mobile={
												slide.secondaryButtonPaddingMobile ||
												'14px 30px'
											}
										>
											{ slide.secondaryButtonText }
										</a>
									) }
								</div>
							</div>
						</div>
					);
				} ) }
			</div>
			<div className="swiper-button-next"></div>
			<div className="swiper-button-prev"></div>
			<div className="swiper-pagination"></div>
		</section>
	);
}
