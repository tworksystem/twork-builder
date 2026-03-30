import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	PanelColorSettings,
	MediaPlaceholder,
	RichText,
	URLInput,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	Button,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		badgeText,
		badgeColor,
		title,
		titleGradientStart,
		titleGradientEnd,
		description,
		descriptionColor,
		buttonText,
		buttonUrl,
		buttonOpenInNewTab,
		imageUrl,
		imageId,
		imageAlt,
		badgeIcon,
		badgeValue,
		badgeLabel,
		badgeLabelColor,
		badgeValueColor,
		primaryColor,
		secondaryColor,
		showOverlayShape,
		overlayGradientStart,
		overlayGradientEnd,
		containerMaxWidth,
		containerPadding,
		minHeight,
		animationOnScroll,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'chk-hero twork-health-check-hero-editor',
			style: {
				minHeight: `${ Math.max( minHeight || 600, 500 ) }px`,
				position: 'relative',
				overflow: 'visible',
				backgroundColor: '#fff',
				boxSizing: 'border-box',
				'--chk-primary': primaryColor || '#f48b2a',
				'--chk-secondary': secondaryColor || '#005f73',
				'--chk-gradient': showOverlayShape
					? `linear-gradient(135deg, ${
							overlayGradientStart || '#005f73'
					  } 0%, ${ overlayGradientEnd || '#0a9396' } 100%)`
					: 'transparent',
				'--chk-gradient-text': `linear-gradient(45deg, ${
					titleGradientStart || '#005f73'
				}, ${ titleGradientEnd || '#f48b2a' })`,
			},
		} ),
		[
			minHeight,
			overlayGradientEnd,
			overlayGradientStart,
			primaryColor,
			secondaryColor,
			showOverlayShape,
			titleGradientEnd,
			titleGradientStart,
		]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
		position: 'relative',
		zIndex: 1,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Content', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Badge (above title)',
								'twork-builder'
							) }
							value={ badgeText || '' }
							onChange={ ( v ) =>
								setAttributes( { badgeText: v } )
							}
							help={ __(
								'e.g. PREVENTIVE CARE',
								'twork-builder'
							) }
						/>

						<BaseControl
							label={ __( 'Title', 'twork-builder' ) }
							help={ __(
								'Use &lt;br&gt; for line break',
								'twork-builder'
							) }
						>
							<RichText
								tagName="h1"
								value={ title }
								onChange={ ( v ) =>
									setAttributes( { title: v } )
								}
								placeholder={ __(
									'Prioritize Your Health Today.',
									'twork-builder'
								) }
								multiline="br"
								style={ { margin: 0 } }
							/>
						</BaseControl>
						<RichText
							tagName="p"
							value={ description }
							onChange={ ( v ) =>
								setAttributes( { description: v } )
							}
							placeholder={ __(
								'Description…',
								'twork-builder'
							) }
						/>

						<Divider />
						<TextControl
							label={ __( 'Button text', 'twork-builder' ) }
							value={ buttonText || '' }
							onChange={ ( v ) =>
								setAttributes( { buttonText: v } )
							}
						/>

						<BaseControl
							label={ __( 'Button URL', 'twork-builder' ) }
						>
							<URLInput
								value={ buttonUrl || '' }
								onChange={ ( v ) =>
									setAttributes( { buttonUrl: v } )
								}
							/>
						</BaseControl>
						<ToggleControl
							label={ __( 'Open in new tab', 'twork-builder' ) }
							checked={ !! buttonOpenInNewTab }
							onChange={ ( v ) =>
								setAttributes( { buttonOpenInNewTab: v } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Hero image', 'twork-builder' ) }
						initialOpen={ false }
					>
						{ ! imageUrl ? (
							<MediaPlaceholder
								onSelect={ ( media ) =>
									setAttributes( {
										imageUrl: media.url,
										imageId: media.id,
										imageAlt: media.alt || 'Checkup',
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __( 'Hero image', 'twork-builder' ),
								} }
							/>
						) : (
							<div>
								<img
									src={ imageUrl }
									alt=""
									style={ {
										width: '100%',
										height: 'auto',
										marginBottom: 10,
									} }
								/>

								<TextControl
									label={ __( 'Alt text', 'twork-builder' ) }
									value={ imageAlt || '' }
									onChange={ ( v ) =>
										setAttributes( { imageAlt: v } )
									}
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											imageUrl: '',
											imageId: null,
											imageAlt: '',
										} )
									}
									style={ { marginTop: 8 } }
								>
									{ __( 'Remove image', 'twork-builder' ) }
								</Button>
							</div>
						) }
					</PanelBody>
					<PanelBody
						title={ __( 'Floating badge', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Icon class', 'twork-builder' ) }
							value={ badgeIcon || '' }
							onChange={ ( v ) =>
								setAttributes( { badgeIcon: v } )
							}
							help={ __(
								'e.g. fas fa-heartbeat',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __( 'Value', 'twork-builder' ) }
							value={ badgeValue || '' }
							onChange={ ( v ) =>
								setAttributes( { badgeValue: v } )
							}
						/>

						<TextControl
							label={ __( 'Label', 'twork-builder' ) }
							value={ badgeLabel || '' }
							onChange={ ( v ) =>
								setAttributes( { badgeLabel: v } )
							}
						/>

						<PanelColorSettings
							colorSettings={ [
								{
									value: badgeValueColor,
									onChange: ( v ) =>
										setAttributes( {
											badgeValueColor: v ?? undefined,
										} ),
									label: __( 'Value color', 'twork-builder' ),
								},
								{
									value: badgeLabelColor,
									onChange: ( v ) =>
										setAttributes( {
											badgeLabelColor: v ?? undefined,
										} ),
									label: __( 'Label color', 'twork-builder' ),
								},
							] }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Colors', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							colorSettings={ [
								{
									value: primaryColor,
									onChange: ( v ) =>
										setAttributes( {
											primaryColor: v ?? undefined,
										} ),
									label: __(
										'Primary (badge, button)',
										'twork-builder'
									),
								},
								{
									value: secondaryColor,
									onChange: ( v ) =>
										setAttributes( {
											secondaryColor: v ?? undefined,
										} ),
									label: __( 'Secondary', 'twork-builder' ),
								},
								{
									value: badgeColor,
									onChange: ( v ) =>
										setAttributes( {
											badgeColor: v ?? undefined,
										} ),
									label: __(
										'Top badge text',
										'twork-builder'
									),
								},
								{
									value: titleGradientStart,
									onChange: ( v ) =>
										setAttributes( {
											titleGradientStart: v ?? undefined,
										} ),
									label: __(
										'Title gradient start',
										'twork-builder'
									),
								},
								{
									value: titleGradientEnd,
									onChange: ( v ) =>
										setAttributes( {
											titleGradientEnd: v ?? undefined,
										} ),
									label: __(
										'Title gradient end',
										'twork-builder'
									),
								},
								{
									value: descriptionColor,
									onChange: ( v ) =>
										setAttributes( {
											descriptionColor: v ?? undefined,
										} ),
									label: __(
										'Description text',
										'twork-builder'
									),
								},
							] }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Background shape', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show gradient shape (right)',
								'twork-builder'
							) }
							checked={ !! showOverlayShape }
							onChange={ ( v ) =>
								setAttributes( { showOverlayShape: v } )
							}
						/>

						{ showOverlayShape && (
							<PanelColorSettings
								colorSettings={ [
									{
										value: overlayGradientStart,
										onChange: ( v ) =>
											setAttributes( {
												overlayGradientStart:
													v ?? undefined,
											} ),
										label: __(
											'Gradient start',
											'twork-builder'
										),
									},
									{
										value: overlayGradientEnd,
										onChange: ( v ) =>
											setAttributes( {
												overlayGradientEnd:
													v ?? undefined,
											} ),
										label: __(
											'Gradient end',
											'twork-builder'
										),
									},
								] }
							/>
						) }
					</PanelBody>
					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Min height (px)', 'twork-builder' ) }
							value={ minHeight }
							onChange={ ( v ) =>
								setAttributes( { minHeight: v } )
							}
							min={ 400 }
							max={ 1000 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container max width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( v ) =>
								setAttributes( { containerMaxWidth: v } )
							}
							min={ 800 }
							max={ 1400 }
							step={ 20 }
						/>

						<RangeControl
							label={ __(
								'Container padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( v ) =>
								setAttributes( { containerPadding: v } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
						/>

						<ToggleControl
							label={ __(
								'Animation on scroll',
								'twork-builder'
							) }
							checked={ !! animationOnScroll }
							onChange={ ( v ) =>
								setAttributes( { animationOnScroll: v } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<header { ...blockProps }>
				{ showOverlayShape && (
					<div
						className="chk-hero-overlay-shape"
						aria-hidden="true"
						style={ {
							position: 'absolute',
							top: 0,
							right: 0,
							width: '45%',
							height: '100%',
							background: `linear-gradient(135deg, ${
								overlayGradientStart || '#005f73'
							} 0%, ${ overlayGradientEnd || '#0a9396' } 100%)`,
							borderBottomLeftRadius: '300px',
							zIndex: 0,
						} }
					/>
				) }
				<div className="chk-container" style={ containerStyle }>
					<div className="chk-hero-grid">
						<div className="chk-hero-text fade-up">
							{ badgeText && (
								<span
									style={ {
										color: badgeColor || primaryColor,
										fontWeight: 700,
										letterSpacing: '2px',
									} }
								>
									{ badgeText }
								</span>
							) }
							<RichText
								tagName="h1"
								value={ title }
								onChange={ ( v ) =>
									setAttributes( { title: v } )
								}
								placeholder={ __(
									'Prioritize Your Health Today.',
									'twork-builder'
								) }
								multiline="br"
								style={ {
									background: `linear-gradient(45deg, ${
										titleGradientStart || '#005f73'
									}, ${ titleGradientEnd || '#f48b2a' })`,
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									backgroundClip: 'text',
									margin: '0 0 20px',
									fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
									fontWeight: 900,
								} }
							/>

							<RichText
								tagName="p"
								value={ description }
								onChange={ ( v ) =>
									setAttributes( { description: v } )
								}
								style={ {
									fontSize: '1.2rem',
									color: descriptionColor || '#666',
									marginBottom: '30px',
									maxWidth: '550px',
								} }
							/>

							{ buttonText && (
								<a
									href={ buttonUrl || '#' }
									className="chk-btn"
									style={ { pointerEvents: 'none' } }
									onClick={ ( e ) => e.preventDefault() }
								>
									{ buttonText }
								</a>
							) }
						</div>
						<div className="chk-hero-img-box fade-up">
							{ imageUrl ? (
								<img
									src={ imageUrl }
									alt={ imageAlt || '' }
									className="chk-hero-img"
									style={ {
										width: '100%',
										height: 500,
										objectFit: 'cover',
										borderRadius: 30,
									} }
								/>
							) : (
								<div
									className="chk-hero-img chk-hero-img-placeholder"
									style={ {
										width: '100%',
										height: 500,
										borderRadius: 30,
										background: '#f0f0f0',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										color: '#999',
										fontSize: '1rem',
									} }
								>
									{ __( 'Add hero image', 'twork-builder' ) }
								</div>
							) }
							<div className="chk-badge">
								{ badgeIcon && (
									<i
										className={ badgeIcon }
										aria-hidden="true"
										style={ {
											color: primaryColor,
											fontSize: '2rem',
										} }
									/>
								) }
								<div>
									{ badgeValue && (
										<strong
											style={ {
												color:
													badgeValueColor ||
													secondaryColor,
											} }
										>
											{ badgeValue }
										</strong>
									) }
									{ badgeLabel && (
										<small
											style={ {
												color:
													badgeLabelColor || '#666',
											} }
										>
											{ badgeLabel }
										</small>
									) }
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
