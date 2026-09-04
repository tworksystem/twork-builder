import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		brandName,
		logoUrl,
		homeUrl,
		searchPlaceholder,
		cartTotal,
		menuItems,
	} = attributes;
	const blockProps = useStableBlockProps( {
		className: 'shop-header shop-header-editor',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Brand', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Brand name', 'twork-builder' ) }
						value={ brandName }
						onChange={ ( v ) => setAttributes( { brandName: v } ) }
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( { logoUrl: media.url } )
							}
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<Button onClick={ open } variant="secondary">
									{ logoUrl
										? __( 'Change logo', 'twork-builder' )
										: __( 'Select logo', 'twork-builder' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>
			<header { ...blockProps } data-block="twork/shop-header">
				<div className="shop-header__main">
					<div className="shop-header__main-inner l-section shop-header__container">
						<a
							className="shop-header__brand"
							href={ homeUrl || '#' }
						>
							{ logoUrl ? (
								<img
									className="shop-header__brand-logo"
									src={ logoUrl }
									alt={ brandName }
								/>
							) : (
								brandName
							) }
						</a>
						<form
							className="shop-header__search"
							onSubmit={ ( e ) => e.preventDefault() }
						>
							<input
								className="shop-header__search-input"
								type="search"
								placeholder={ searchPlaceholder }
								disabled
							/>
						</form>
						<span className="shop-header__cart-total">
							{ cartTotal }
						</span>
					</div>
				</div>
				<nav className="shop-header__nav">
					{ ( menuItems || [] ).map( ( item ) => (
						<a key={ item.id } href={ item.href }>
							{ item.label }
						</a>
					) ) }
				</nav>
			</header>
		</>
	);
}
