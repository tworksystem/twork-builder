import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { useState } from '@wordpress/element';
import {
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
	RichText,
	URLInput,
} from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	ButtonGroup,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ICONS = {
	'diagonal-arrow': (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="7" y1="17" x2="17" y2="7" />
			<polyline points="7 7 17 7 17 17" />
		</svg>
	),
	'arrow-right': (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="5" y1="12" x2="19" y2="12" />
			<polyline points="12 5 19 12 12 19" />
		</svg>
	),
	external: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
			<polyline points="15 3 21 3 21 9" />
			<line x1="10" y1="14" x2="21" y2="3" />
		</svg>
	),
	plus: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	),
};

const ALLOWED_BLOCKS = [ 'twork/nav-item' ];
const TEMPLATE = [
	[ 'twork/nav-item', { label: 'Home', url: '#' } ],
	[ 'twork/nav-item', { label: 'About', url: '#' } ],
	[ 'twork/nav-item', { label: 'Services', url: '#', hasDropdown: true } ],
	[ 'twork/nav-item', { label: 'Contact', url: '#' } ],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const [ previewMode, setPreviewMode ] = useState( 'desktop' );

	const {
		isSticky,
		backgroundColor,
		textColor,
		hoverColor,
		headerHeight,
		containerMaxWidth,
		navAlignment,
		logoType,
		logoIcon,
		logoText,
		logoImage,
		logoImageId,
		showSearchIcon,
		showCtaButton,
		ctaText,
		ctaUrl,
		showCtaIcon,
		ctaIconType,
		ctaBgColor,
		ctaTextColor,
		ctaBorderRadius,
		boxShadow,
	} = attributes;

	const ctaIcon = ICONS[ ctaIconType ] || ICONS[ 'diagonal-arrow' ];
	const navJustifyMap = {
		left: 'flex-start',
		center: 'center',
		right: 'flex-end',
	};
	const navJustify = navJustifyMap[ navAlignment ] || 'center';
	const editorIsMobilePreview = previewMode === 'mobile';

	const blockProps = useStableBlockProps(
		() => ( {
			className: `twork-header twork-header--editor${
				editorIsMobilePreview ? ' is-active twork-header--preview-mobile' : ''
			}`,
			style: {
				'--twork-header-bg': backgroundColor,
				'--twork-header-text': textColor,
				'--twork-header-hover': hoverColor,
				'--twork-header-height': `${ headerHeight }px`,
				'--twork-header-container-max': `${ containerMaxWidth }px`,
				'--twork-header-nav-justify': navJustify,
				'--twork-header-cta-bg': ctaBgColor,
				'--twork-header-cta-text': ctaTextColor,
				'--twork-header-cta-radius': `${ ctaBorderRadius }px`,
				'--twork-header-shadow': boxShadow
					? '0 8px 30px rgba(0, 0, 0, 0.08)'
					: 'none',
			},
		} ),
		[
			backgroundColor,
			boxShadow,
			containerMaxWidth,
			ctaBgColor,
			ctaBorderRadius,
			ctaTextColor,
			headerHeight,
			hoverColor,
			navJustify,
			editorIsMobilePreview,
			textColor,
		]
	);

	const renderLogo = () => {
		const textNode = (
			<RichText
				tagName="span"
				value={ logoText }
				onChange={ ( val ) => setAttributes( { logoText: val } ) }
				placeholder={ __( 'Logo text', 'twork-builder' ) }
			/>
		);
		const imageNode =
			logoImage ? <img src={ logoImage } alt="" /> : null;
		const iconNode = <span className="twork-header__logo-icon">{ logoIcon || '🥑' }</span>;

		switch ( logoType ) {
			case 'icon-text':
				return (
					<>
						{ iconNode }
						{textNode}
					</>
				);
			case 'image-text':
				return (
					<>
						{ imageNode }
						{textNode}
					</>
				);
			case 'image':
				return imageNode || textNode;
			case 'text':
			default:
				return textNode;
		}
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Editor Preview', 'twork-builder' ) }
						initialOpen={ true }
					>
						<BaseControl
							label={ __( 'Preview Mode', 'twork-builder' ) }
						>
							<ButtonGroup>
								<Button
									isPressed={ previewMode === 'desktop' }
									onClick={ () => setPreviewMode( 'desktop' ) }
								>
									{ __( 'Desktop', 'twork-builder' ) }
								</Button>
								<Button
									isPressed={ previewMode === 'mobile' }
									onClick={ () => setPreviewMode( 'mobile' ) }
								>
									{ __( 'Mobile', 'twork-builder' ) }
								</Button>
							</ButtonGroup>
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Header Settings', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Sticky Header', 'twork-builder' ) }
							checked={ isSticky }
							onChange={ ( val ) => setAttributes( { isSticky: val } ) }
						/>
						<ToggleControl
							label={ __( 'Enable Header Shadow', 'twork-builder' ) }
							checked={ boxShadow }
							onChange={ ( val ) => setAttributes( { boxShadow: val } ) }
						/>
						<RangeControl
							label={ __( 'Header Height (px)', 'twork-builder' ) }
							value={ headerHeight }
							onChange={ ( val ) => setAttributes( { headerHeight: val } ) }
							min={ 56 }
							max={ 140 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Container Max Width (px)', 'twork-builder' ) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 900 }
							max={ 1920 }
							step={ 10 }
						/>
						<SelectControl
							label={ __( 'Menu Alignment', 'twork-builder' ) }
							value={ navAlignment }
							options={ [
								{ label: __( 'Left', 'twork-builder' ), value: 'left' },
								{ label: __( 'Center', 'twork-builder' ), value: 'center' },
								{ label: __( 'Right', 'twork-builder' ), value: 'right' },
							] }
							onChange={ ( val ) => setAttributes( { navAlignment: val } ) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Logo Settings', 'twork-builder' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Logo Type', 'twork-builder' ) }
							value={ logoType }
							options={ [
								{ label: __( 'Text Logo', 'twork-builder' ), value: 'text' },
								{
									label: __( 'Icon + Text Logo', 'twork-builder' ),
									value: 'icon-text',
								},
								{
									label: __( 'Image + Text Logo', 'twork-builder' ),
									value: 'image-text',
								},
								{ label: __( 'Image Logo', 'twork-builder' ), value: 'image' },
							] }
							onChange={ ( val ) => setAttributes( { logoType: val } ) }
						/>

						{ ( logoType === 'text' || logoType === 'icon-text' || logoType === 'image-text' ) && (
							<TextControl
								label={ __( 'Logo Text', 'twork-builder' ) }
								value={ logoText }
								onChange={ ( val ) => setAttributes( { logoText: val } ) }
							/>
						) }

						{ logoType === 'icon-text' && (
							<TextControl
								label={ __( 'Logo Icon', 'twork-builder' ) }
								value={ logoIcon }
								onChange={ ( val ) => setAttributes( { logoIcon: val } ) }
								help={ __( 'Emoji or short icon text.', 'twork-builder' ) }
							/>
						) }

						{ ( logoType === 'image' || logoType === 'image-text' ) && (
							<BaseControl label={ __( 'Logo Image', 'twork-builder' ) }>
								<MediaUploadCheck>
									<MediaUpload
										allowedTypes={ [ 'image' ] }
										value={ logoImageId }
										onSelect={ ( media ) =>
											setAttributes( {
												logoImage: media?.url || '',
												logoImageId: media?.id || null,
											} )
										}
										render={ ( { open } ) => (
											<Button variant="secondary" onClick={ open }>
												{ logoImage
													? __( 'Replace Logo', 'twork-builder' )
													: __( 'Upload Logo', 'twork-builder' ) }
											</Button>
										) }
									/>
								</MediaUploadCheck>
								{ logoImage && (
									<Button
										variant="link"
										isDestructive
										onClick={ () =>
											setAttributes( { logoImage: '', logoImageId: null } )
										}
									>
										{ __( 'Remove Logo', 'twork-builder' ) }
									</Button>
								) }
							</BaseControl>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'CTA & Actions', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Search Icon', 'twork-builder' ) }
							checked={ showSearchIcon }
							onChange={ ( val ) =>
								setAttributes( { showSearchIcon: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Show CTA Button', 'twork-builder' ) }
							checked={ showCtaButton }
							onChange={ ( val ) =>
								setAttributes( { showCtaButton: val } )
							}
						/>

						{ showCtaButton && (
							<>
								<TextControl
									label={ __( 'CTA Text', 'twork-builder' ) }
									value={ ctaText }
									onChange={ ( val ) =>
										setAttributes( { ctaText: val } )
									}
								/>
								<BaseControl label={ __( 'CTA URL', 'twork-builder' ) }>
									<URLInput
										value={ ctaUrl }
										onChange={ ( val ) =>
											setAttributes( { ctaUrl: val } )
										}
									/>
								</BaseControl>
								<Divider />
								<ToggleControl
									label={ __( 'Show CTA Icon', 'twork-builder' ) }
									checked={ showCtaIcon }
									onChange={ ( val ) =>
										setAttributes( { showCtaIcon: val } )
									}
								/>
								<SelectControl
									label={ __( 'CTA Icon Type', 'twork-builder' ) }
									value={ ctaIconType }
									disabled={ ! showCtaIcon }
									options={ [
										{
											label: __( 'Diagonal Arrow', 'twork-builder' ),
											value: 'diagonal-arrow',
										},
										{
											label: __( 'Arrow Right', 'twork-builder' ),
											value: 'arrow-right',
										},
										{
											label: __( 'External', 'twork-builder' ),
											value: 'external',
										},
										{ label: __( 'Plus', 'twork-builder' ), value: 'plus' },
									] }
									onChange={ ( val ) =>
										setAttributes( { ctaIconType: val } )
									}
								/>
								<RangeControl
									label={ __( 'CTA Border Radius (px)', 'twork-builder' ) }
									value={ ctaBorderRadius }
									onChange={ ( val ) =>
										setAttributes( { ctaBorderRadius: val } )
									}
									min={ 0 }
									max={ 60 }
									step={ 1 }
								/>
							</>
						) }
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Color Settings', 'twork-builder' ) }
						colorSettings={ [
							{
								label: __( 'Header Background', 'twork-builder' ),
								value: backgroundColor,
								onChange: ( val ) =>
									setAttributes( { backgroundColor: val } ),
							},
							{
								label: __( 'Text Color', 'twork-builder' ),
								value: textColor,
								onChange: ( val ) => setAttributes( { textColor: val } ),
							},
							{
								label: __( 'Hover Color', 'twork-builder' ),
								value: hoverColor,
								onChange: ( val ) => setAttributes( { hoverColor: val } ),
							},
							{
								label: __( 'CTA Background', 'twork-builder' ),
								value: ctaBgColor,
								onChange: ( val ) => setAttributes( { ctaBgColor: val } ),
							},
							{
								label: __( 'CTA Text Color', 'twork-builder' ),
								value: ctaTextColor,
								onChange: ( val ) => setAttributes( { ctaTextColor: val } ),
							},
						] }
					/>
				</InspectorControls>
			) }

			<header { ...blockProps }>
				<div className="twork-header__preview-badge" aria-hidden="true">
					{ previewMode === 'mobile'
						? __( '📱 Mobile Preview', 'twork-builder' )
						: __( '💻 Desktop Preview', 'twork-builder' ) }
				</div>
				<div className="twork-header__container">
					<div className="twork-header__logo">
						{ renderLogo() }
					</div>

					<nav className="twork-header__nav">
						<div className="twork-header__nav-list">
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
								renderAppender={ InnerBlocks.ButtonBlockAppender }
							/>
						</div>
					</nav>

					<div className="twork-header__actions">
						{ showSearchIcon && (
							<button
								type="button"
								className="twork-header__search"
								aria-label={ __( 'Search', 'twork-builder' ) }
							>
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.25"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
									focusable="false"
								>
									<circle cx="11" cy="11" r="7" />
									<line x1="21" y1="21" x2="16.65" y2="16.65" />
								</svg>
							</button>
						) }

						{ showCtaButton && (
							<a href={ ctaUrl || '#' } className="twork-header__cta">
								<span className="twork-header__cta-label">
									{ ctaText || __( 'Get In Touch', 'twork-builder' ) }
								</span>
								{ showCtaIcon && (
									<span className="twork-header__cta-icon" aria-hidden="true">
										{ ctaIcon }
									</span>
								) }
							</a>
						) }

						<button
							type="button"
							className="twork-header__hamburger"
							aria-expanded="false"
							aria-label={ __( 'Toggle menu', 'twork-builder' ) }
						>
							<span />
							<span />
							<span />
						</button>
					</div>
				</div>
			</header>
		</>
	);
}
