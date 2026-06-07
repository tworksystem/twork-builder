import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
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
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/brand-nav-item' ];

const NAV_TEMPLATE = [
	[ 'twork/brand-nav-item', { label: 'Home', url: '/', hasDropdown: false } ],
	[ 'twork/brand-nav-item', { label: 'Shop', url: '/shop', hasDropdown: false } ],
	[ 'twork/brand-nav-item', { label: 'About', url: '/about', hasDropdown: false } ],
	[ 'twork/brand-nav-item', { label: 'Blog', url: '/blog', hasDropdown: false } ],
	[ 'twork/brand-nav-item', { label: 'Wholesale', url: '/wholesale', hasDropdown: false } ],
	[ 'twork/brand-nav-item', { label: 'FAQ', url: '/faq', hasDropdown: false } ],
	[ 'twork/brand-nav-item', { label: 'Contact', url: '/contact', hasDropdown: false } ],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		logoImage,
		logoImageId,
		brandName,
		homeUrl,
		hotlineLabel,
		phone,
		showSearch,
		backgroundColor,
		stickyHeader,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: `twork-brand-header twork-brand-header--editor${
				stickyHeader ? ' twork-brand-header--sticky' : ''
			}`,
			style: {
				'--twork-brand-header-bg': backgroundColor || '#ffffff',
			},
		} ),
		[ backgroundColor, stickyHeader ]
	);

	const phoneDigits = ( phone || '' ).replace( /\D/g, '' );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Header Settings', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Sticky Header', 'twork-builder' ) }
							checked={ stickyHeader }
							onChange={ ( val ) =>
								setAttributes( { stickyHeader: val } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Search Icon', 'twork-builder' ) }
							checked={ showSearch }
							onChange={ ( val ) =>
								setAttributes( { showSearch: val } )
							}
						/>
						<PanelColorSettings
							title={ __( 'Background', 'twork-builder' ) }
							colorSettings={ [
								{
									value: backgroundColor,
									onChange: ( val ) =>
										setAttributes( {
											backgroundColor: val,
										} ),
									label: __(
										'Background Color',
										'twork-builder'
									),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Brand & Logo', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Brand Name', 'twork-builder' ) }
							value={ brandName }
							onChange={ ( val ) =>
								setAttributes( { brandName: val } )
							}
						/>
						<BaseControl label={ __( 'Home URL', 'twork-builder' ) }>
							<URLInput
								value={ homeUrl }
								onChange={ ( val ) =>
									setAttributes( { homeUrl: val } )
								}
							/>
						</BaseControl>
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
								<>
									<img
										src={ logoImage }
										alt=""
										style={ {
											display: 'block',
											maxWidth: 200,
											marginTop: 12,
										} }
									/>
									<Button
										variant="link"
										isDestructive
										onClick={ () =>
											setAttributes( {
												logoImage: '',
												logoImageId: null,
											} )
										}
									>
										{ __( 'Remove Logo', 'twork-builder' ) }
									</Button>
								</>
							) }
						</BaseControl>
					</PanelBody>

					<PanelBody
						title={ __( 'Hotline', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Hotline Label', 'twork-builder' ) }
							value={ hotlineLabel }
							onChange={ ( val ) =>
								setAttributes( { hotlineLabel: val } )
							}
						/>
						<TextControl
							label={ __( 'Phone Number', 'twork-builder' ) }
							value={ phone }
							onChange={ ( val ) =>
								setAttributes( { phone: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<header { ...blockProps } data-block="twork/brand-header">
				<div className="twork-brand-header__main">
					<div className="twork-brand-header__inner l-section">
						<a
							className="twork-brand-header__brand"
							href={ homeUrl || '/' }
							onClick={ ( e ) => e.preventDefault() }
							aria-label={ `${ brandName || 'Shwe Myanmar' } home` }
						>
							{ logoImage ? (
								<img
									className="twork-brand-header__brand-logo"
									src={ logoImage }
									alt={ brandName || 'Shwe Myanmar' }
									width="560"
									height="290"
								/>
							) : (
								<span className="twork-brand-header__brand-text">
									{ brandName || 'Shwe Myanmar' }
								</span>
							) }
						</a>

						<nav
							id="header-nav"
							className="twork-brand-header__nav"
							aria-label={ __( 'Main navigation', 'twork-builder' ) }
						>
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ NAV_TEMPLATE }
								templateLock={ false }
								renderAppender={ InnerBlocks.ButtonBlockAppender }
							/>
						</nav>

						<div className="twork-brand-header__actions">
							{ showSearch && (
								<button
									type="button"
									className="twork-brand-header__icon-btn"
									aria-label={ __( 'Search', 'twork-builder' ) }
								>
									<svg
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										aria-hidden="true"
									>
										<circle cx="11" cy="11" r="8" />
										<path d="m21 21-4.3-4.3" />
									</svg>
								</button>
							) }

							<div className="twork-brand-header__hotline">
								<span
									className="twork-brand-header__hotline-icon"
									aria-hidden="true"
								>
									<svg
										width="28"
										height="28"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
									>
										<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
									</svg>
								</span>
								<div>
									<p className="twork-brand-header__hotline-label">
										{ hotlineLabel }
									</p>
									<a
										className="twork-brand-header__hotline-phone"
										href={ phoneDigits ? `tel:${ phoneDigits }` : '#' }
										onClick={ ( e ) => e.preventDefault() }
									>
										{ phone }
									</a>
								</div>
							</div>

							<button
								className="twork-brand-header__toggle"
								type="button"
								data-action="menu-toggle"
								aria-expanded="false"
								aria-controls="header-nav"
							>
								<span className="u-hidden">
									{ __( 'Menu', 'twork-builder' ) }
								</span>
								<span
									className="twork-brand-header__toggle-bar"
									aria-hidden="true"
								/>
							</button>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
