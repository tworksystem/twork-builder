import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';
import {
	PanelBody,
	TextControl,
	RangeControl,
	Button,
} from '@wordpress/components';
import HeaderMarkup from './header-markup';
import NavInspectorControls from './nav-inspector-controls';
import { bootJivakaHeaders } from './header-init';
import { resolveNavItems } from './nav-data';

export default function Edit( { attributes, setAttributes } ) {
	const {
		logoUrl,
		logoImage,
		logoImageId,
		logoAlt,
		ctaText,
		ctaUrl,
		mobileCtaText,
		hotlineText,
		navItems,
		containerMaxWidth,
		containerPadding,
	} = attributes;

	const resolvedNavItems = resolveNavItems( navItems );
	const blockRef = useRef( null );

	useEffect( () => {
		if ( ! blockRef.current ) {
			return;
		}

		bootJivakaHeaders( blockRef.current );
	}, [
		resolvedNavItems,
		logoUrl,
		logoImage,
		ctaText,
		ctaUrl,
		mobileCtaText,
		hotlineText,
	] );

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'jivaka-header-section-block mk-jivaka-header-editor wp-block-twork-jivaka-header-section',
			style: {
				'--jivaka-header-max-width':
					containerMaxWidth != null
						? `${ containerMaxWidth }px`
						: undefined,
				'--jivaka-header-padding':
					containerPadding != null
						? `${ containerPadding }px`
						: undefined,
			},
		} ),
		[ containerMaxWidth, containerPadding ]
	);

	function onSelectLogo( media ) {
		if ( ! media || ! media.url ) {
			return;
		}

		setAttributes( {
			logoImage: media.url,
			logoImageId: media.id,
			logoAlt: media.alt || logoAlt,
		} );
	}

	function onRemoveLogo() {
		setAttributes( {
			logoImage: '',
			logoImageId: undefined,
		} );
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Logo', 'twork-builder' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __( 'Logo Link URL', 'twork-builder' ) }
						value={ logoUrl }
						onChange={ ( value ) =>
							setAttributes( { logoUrl: value } )
						}
					/>
					<TextControl
						label={ __( 'Logo Alt Text', 'twork-builder' ) }
						value={ logoAlt }
						onChange={ ( value ) =>
							setAttributes( { logoAlt: value } )
						}
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectLogo }
							allowedTypes={ [ 'image' ] }
							value={ logoImageId }
							render={ ( { open } ) => (
								<div style={ { marginTop: '12px' } }>
									{ logoImage ? (
										<img
											src={ logoImage }
											alt={ logoAlt }
											style={ {
												maxHeight: '60px',
												marginBottom: '12px',
												display: 'block',
											} }
										/>
									) : null }
									<Button
										variant="secondary"
										onClick={ open }
									>
										{ logoImage
											? __(
													'Replace Logo',
													'twork-builder'
											  )
											: __(
													'Upload Logo',
													'twork-builder'
											  ) }
									</Button>
									{ logoImage ? (
										<Button
											variant="link"
											isDestructive
											onClick={ onRemoveLogo }
											style={ { marginLeft: '8px' } }
										>
											{ __(
												'Remove Logo',
												'twork-builder'
											) }
										</Button>
									) : null }
								</div>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>

				<NavInspectorControls
					navItems={ navItems }
					setAttributes={ setAttributes }
				/>

				<PanelBody
					title={ __( 'Call To Action', 'twork-builder' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Desktop Button Text', 'twork-builder' ) }
						value={ ctaText }
						onChange={ ( value ) =>
							setAttributes( { ctaText: value } )
						}
					/>
					<TextControl
						label={ __( 'Mobile Button Text', 'twork-builder' ) }
						value={ mobileCtaText }
						onChange={ ( value ) =>
							setAttributes( { mobileCtaText: value } )
						}
					/>
					<TextControl
						label={ __( 'Button URL', 'twork-builder' ) }
						value={ ctaUrl }
						onChange={ ( value ) =>
							setAttributes( { ctaUrl: value } )
						}
					/>
					<TextControl
						label={ __( 'Hotline Number', 'twork-builder' ) }
						value={ hotlineText }
						onChange={ ( value ) =>
							setAttributes( { hotlineText: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Layout', 'twork-builder' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __(
							'Container Max Width (px)',
							'twork-builder'
						) }
						value={ containerMaxWidth }
						onChange={ ( value ) =>
							setAttributes( { containerMaxWidth: value } )
						}
						min={ 960 }
						max={ 1440 }
					/>
					<RangeControl
						label={ __(
							'Container Padding (px)',
							'twork-builder'
						) }
						value={ containerPadding }
						onChange={ ( value ) =>
							setAttributes( { containerPadding: value } )
						}
						min={ 12 }
						max={ 60 }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps } ref={ blockRef }>
				<HeaderMarkup
					logoUrl={ logoUrl }
					logoImage={ logoImage }
					logoAlt={ logoAlt }
					ctaText={ ctaText }
					ctaUrl={ ctaUrl }
					mobileCtaText={ mobileCtaText }
					hotlineText={ hotlineText }
					navItems={ resolvedNavItems }
				/>
			</div>
		</>
	);
}
