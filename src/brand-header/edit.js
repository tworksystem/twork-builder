import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'twork/brand-nav-item' ];
const TEMPLATE = [
	[ 'twork/brand-nav-item', { itemId: 'home', label: 'Home', href: '/' } ],
	[
		'twork/brand-nav-item',
		{ itemId: 'shop', label: 'Shop', href: '/shop' },
	],
	[
		'twork/brand-nav-item',
		{ itemId: 'about', label: 'About', href: '/about' },
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { brandName, logoUrl, homeUrl, hotlineLabel, phone } = attributes;
	const blockProps = useStableBlockProps( {
		className: 'header brand-header-editor',
	} );
	const navProps = useInnerBlocksProps(
		{ className: 'header__nav', id: 'header-nav' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Brand', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Brand name', 'twork-builder' ) }
						value={ brandName }
						onChange={ ( v ) => setAttributes( { brandName: v } ) }
					/>
					<TextControl
						label={ __( 'Home URL', 'twork-builder' ) }
						value={ homeUrl }
						onChange={ ( v ) => setAttributes( { homeUrl: v } ) }
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									logoUrl: media.url,
									logoId: media.id,
								} )
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
				<PanelBody title={ __( 'Hotline', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Label', 'twork-builder' ) }
						value={ hotlineLabel }
						onChange={ ( v ) =>
							setAttributes( { hotlineLabel: v } )
						}
					/>
					<TextControl
						label={ __( 'Phone', 'twork-builder' ) }
						value={ phone }
						onChange={ ( v ) => setAttributes( { phone: v } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<header { ...blockProps } data-block="twork/brand-header">
				<div className="header__main">
					<div className="header__inner l-section">
						<a className="header__brand" href={ homeUrl || '#' }>
							{ logoUrl ? (
								<img
									className="header__brand-logo"
									src={ logoUrl }
									alt={ brandName }
								/>
							) : (
								<span className="header__brand-text">
									{ brandName }
								</span>
							) }
						</a>
						<nav aria-label="Main navigation" { ...navProps } />
						<div className="header__actions">
							<div className="header__hotline">
								<div>
									<p className="header__hotline-label">
										{ hotlineLabel }
									</p>
									<span className="header__hotline-phone">
										{ phone }
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
