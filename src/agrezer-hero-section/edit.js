import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { memo, useMemo, useCallback } from '@wordpress/element';
import {
	InspectorControls,
	InnerBlocks,
	RichText,
	PanelColorSettings,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/hero-feature' ];
const TEMPLATE = [
	[
		'twork/hero-feature',
		{ title: 'Healthy Soil<br />Solutions', iconVariant: 'leaf' },
	],
	[
		'twork/hero-feature',
		{ title: 'Pure Organic<br />Growth', iconVariant: 'drop' },
	],
	[
		'twork/hero-feature',
		{ title: 'Nature-Driven<br />Innovation', iconVariant: 'sprout' },
	],
];

const TaglineIcon = memo( function TaglineIcon() {
	return (
		<svg
			className="twork-hero__tagline-icon"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path d="M12 22v-6.4" />
			<path d="M12 15.6c-4.8 0-8.4-2.4-9.6-6.4 3.7.2 6.5 1.1 8.4 2.8 1.2-2.4 1.3-5.1.3-8 4 1.1 6.7 3.6 8 7.4-1.7 2.7-4.1 4.1-7.1 4.2Z" />
		</svg>
	);
} );

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		taglineText,
		title,
		description,
		buttonText,
		buttonUrl,
		buttonLinkTarget,
		backgroundImage,
		backgroundImageId,
		overlayColor,
		containerMaxWidth,
		containerPadding,
		paddingTop,
		paddingBottom,
		featuresGap,
	} = attributes;

	const sectionStyle = useMemo(
		() => ( {
			backgroundImage: backgroundImage
				? `url(${ backgroundImage })`
				: 'none',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
			'--twork-container-max-width': `${ containerMaxWidth }px`,
			'--twork-container-padding': `${ containerPadding }px`,
			'--twork-features-gap': `${ featuresGap }px`,
		} ),
		[
			backgroundImage,
			paddingTop,
			paddingBottom,
			containerMaxWidth,
			containerPadding,
			featuresGap,
		]
	);

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'twork-hero twork-hero--bg twork-hero-section-editor',
			style: sectionStyle,
		} ),
		[ sectionStyle ]
	);

	const onTagline = useCallback(
		( val ) => setAttributes( { taglineText: val } ),
		[ setAttributes ]
	);
	const onButtonText = useCallback(
		( val ) => setAttributes( { buttonText: val } ),
		[ setAttributes ]
	);
	const onTitle = useCallback(
		( val ) => setAttributes( { title: val } ),
		[ setAttributes ]
	);
	const onDescription = useCallback(
		( val ) => setAttributes( { description: val } ),
		[ setAttributes ]
	);
	const onOverlayColor = useCallback(
		( val ) => setAttributes( { overlayColor: val } ),
		[ setAttributes ]
	);
	const onSelectBg = useCallback(
		( media ) =>
			setAttributes( {
				backgroundImage: media.url,
				backgroundImageId: media.id,
			} ),
		[ setAttributes ]
	);
	const onRemoveBg = useCallback(
		() => setAttributes( { backgroundImage: '', backgroundImageId: null } ),
		[ setAttributes ]
	);
	const onMaxW = useCallback(
		( val ) => setAttributes( { containerMaxWidth: val } ),
		[ setAttributes ]
	);
	const onPad = useCallback(
		( val ) => setAttributes( { containerPadding: val } ),
		[ setAttributes ]
	);
	const onPadTop = useCallback(
		( val ) => setAttributes( { paddingTop: val } ),
		[ setAttributes ]
	);
	const onPadBottom = useCallback(
		( val ) => setAttributes( { paddingBottom: val } ),
		[ setAttributes ]
	);
	const onFeaturesGap = useCallback(
		( val ) => setAttributes( { featuresGap: val } ),
		[ setAttributes ]
	);
	const onButtonUrl = useCallback(
		( val ) => setAttributes( { buttonUrl: val || '#' } ),
		[ setAttributes ]
	);
	const onButtonTarget = useCallback(
		( val ) => setAttributes( { buttonLinkTarget: val } ),
		[ setAttributes ]
	);

	const href = buttonUrl && buttonUrl.trim() !== '' ? buttonUrl : '#';

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Hero Content', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Tagline text', 'twork-builder' ) }
							value={ taglineText }
							onChange={ onTagline }
						/>

						<TextControl
							label={ __( 'Button text', 'twork-builder' ) }
							value={ buttonText }
							onChange={ onButtonText }
						/>

						<TextControl
							label={ __( 'Button URL', 'twork-builder' ) }
							value={ buttonUrl }
							onChange={ onButtonUrl }
							help={ __(
								'Link for the primary CTA button.',
								'twork-builder'
							) }
						/>

						<ToggleControl
							label={ __( 'Open button link in new tab', 'twork-builder' ) }
							checked={ buttonLinkTarget }
							onChange={ onButtonTarget }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Background', 'twork-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __( 'Background image', 'twork-builder' ) }
						>
							{ ! backgroundImage ? (
								<MediaPlaceholder
									onSelect={ onSelectBg }
									allowedTypes={ [ 'image' ] }
									multiple={ false }
									labels={ {
										title: __(
											'Background Image',
											'twork-builder'
										),
									} }
								/>
							) : (
								<div>
									<img
										src={ backgroundImage }
										alt=""
										style={ {
											width: '100%',
											marginBottom: '10px',
										} }
									/>

									<Button
										isSecondary
										isSmall
										onClick={ onRemoveBg }
									>
										{ __(
											'Remove image',
											'twork-builder'
										) }
									</Button>
								</div>
							) }
						</BaseControl>
						<PanelColorSettings
							title={ __( 'Overlay Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: overlayColor,
									onChange: onOverlayColor,
									label: __(
										'Overlay Color',
										'twork-builder'
									),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __(
								'Container max width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ onMaxW }
							min={ 900 }
							max={ 1600 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ onPad }
							min={ 0 }
							max={ 80 }
							step={ 2 }
						/>

						<RangeControl
							label={ __( 'Top padding (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ onPadTop }
							min={ 0 }
							max={ 240 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Bottom padding (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ onPadBottom }
							min={ 0 }
							max={ 240 }
							step={ 5 }
						/>

						<Divider />
						<RangeControl
							label={ __( 'Features gap (px)', 'twork-builder' ) }
							value={ featuresGap }
							onChange={ onFeaturesGap }
							min={ 0 }
							max={ 40 }
							step={ 1 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps } aria-labelledby="twork-hero-title">
				<div
					className="twork-hero__overlay"
					style={ { backgroundColor: overlayColor } }
				/>

				<div className="twork-hero__container">
					<div className="twork-hero__content">
						<div className="twork-hero__tagline">
							<TaglineIcon />
							<RichText
								tagName="span"
								className="twork-hero__tagline-text"
								value={ taglineText }
								onChange={ onTagline }
								placeholder={ __(
									'Agriculture & Organic Farms',
									'twork-builder'
								) }
							/>
						</div>
						<RichText
							tagName="h1"
							id="twork-hero-title"
							className="twork-hero__title"
							value={ title }
							onChange={ onTitle }
							placeholder={ __(
								'Rooted in Nature,<br />Growing the Future',
								'twork-builder'
							) }
						/>

						<RichText
							tagName="p"
							className="twork-hero__desc"
							value={ description }
							onChange={ onDescription }
							placeholder={ __(
								'Hero description...',
								'twork-builder'
							) }
						/>

						<a
							href={ href }
							className="twork-hero__btn"
							target={ buttonLinkTarget ? '_blank' : undefined }
							rel={
								buttonLinkTarget
									? 'noopener noreferrer'
									: undefined
							}
							onClick={ ( e ) => e.preventDefault() }
						>
							<RichText
								tagName="span"
								value={ buttonText }
								onChange={ onButtonText }
								placeholder={ __(
									'Explore More',
									'twork-builder'
								) }
							/>
							<span aria-hidden="true">&#x2197;</span>
						</a>
					</div>

					<div className="twork-hero__features-wrapper">
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
