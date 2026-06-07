import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	MediaPlaceholder,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Button,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [
	'twork/brand-footer-info-card',
	'twork/brand-footer-column',
];

const TEMPLATE = [
	[
		'twork/brand-footer-info-card',
		{
			label: 'CUSTOMER HOTLINE',
			lines: [ '095-2-55122', '095-2-55123', '095-9-200 1227' ],
			icon: 'phone',
		},
	],
	[
		'twork/brand-footer-info-card',
		{
			label: 'OFFICE ADDRESS',
			lines: [
				'Shwe Myanmar Foodstuff Industry',
				'Mandalay, Myanmar',
			],
			icon: 'pin',
		},
	],
	[
		'twork/brand-footer-info-card',
		{
			label: 'BUSINESS HOURS',
			lines: [
				'08:00 - 17:00, MMT (UTC+6:30)',
				'Monday - Saturday',
			],
			icon: 'clock',
		},
	],
	[
		'twork/brand-footer-column',
		{
			title: 'Help & Info',
			links: [
				{ id: 'l1', label: 'About Us', href: '/about' },
				{ id: 'l2', label: 'Contact Us', href: '/contact' },
				{ id: 'l3', label: 'Our Products', href: '/shop' },
				{ id: 'l4', label: 'Terms of Use', href: '/privacy' },
				{ id: 'l5', label: 'Policy', href: '/privacy' },
				{ id: 'l6', label: 'Wholesale', href: '/wholesale' },
				{ id: 'l7', label: 'FAQs', href: '/faq' },
				{ id: 'l8', label: 'Where to Buy', href: '/where-to-buy' },
			],
		},
	],
	[
		'twork/brand-footer-column',
		{
			title: 'Company',
			links: [
				{
					id: 'c1',
					label: 'Become A Distributor',
					href: '/wholesale',
				},
				{
					id: 'c2',
					label: 'Wholesale Orders',
					href: '/wholesale',
				},
				{
					id: 'c3',
					label: 'Our Story',
					href: '/about#story',
				},
				{ id: 'c4', label: 'Careers', href: '/careers' },
				{
					id: 'c5',
					label: 'Quality Standards',
					href: '/quality',
				},
				{
					id: 'c6',
					label: 'Accessibility',
					href: '/accessibility',
				},
			],
		},
	],
	[
		'twork/brand-footer-column',
		{
			title: 'Quick Links',
			links: [
				{ id: 'q1', label: 'Shop', href: '/shop' },
				{ id: 'q2', label: 'Butter Products', href: '/shop' },
				{ id: 'q3', label: 'Our Services', href: '/#services' },
				{
					id: 'q4',
					label: 'Where to Buy',
					href: '/where-to-buy',
				},
			],
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		brandPrefix,
		brandSuffix,
		description,
		copyright,
		pastureImageUrl,
		pastureImageId,
		pastureImageAlt,
		social,
		showBackToTop,
		backgroundColor,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'twork-brand-footer footer twork-brand-footer-editor',
			style: {
				backgroundColor: backgroundColor || '#f7fcff',
			},
		} ),
		[ backgroundColor ]
	);

	const updateSocial = ( index, field, value ) => {
		const next = ( social || [] ).map( ( item, i ) =>
			i === index ? { ...item, [ field ]: value } : item
		);
		setAttributes( { social: next } );
	};

	const addSocial = () => {
		setAttributes( {
			social: [
				...( social || [] ),
				{
					id: 'social_' + Date.now(),
					label: 'Social',
					href: '#',
				},
			],
		} );
	};

	const removeSocial = ( index ) => {
		setAttributes( {
			social: ( social || [] ).filter( ( _, i ) => i !== index ),
		} );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Brand', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Brand Prefix', 'twork-builder' ) }
							value={ brandPrefix }
							onChange={ ( val ) =>
								setAttributes( { brandPrefix: val } )
							}
						/>
						<TextControl
							label={ __( 'Brand Suffix', 'twork-builder' ) }
							value={ brandSuffix }
							onChange={ ( val ) =>
								setAttributes( { brandSuffix: val } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Pasture Image', 'twork-builder' ) }
						initialOpen={ false }
					>
						{ ! pastureImageUrl ? (
							<MediaPlaceholder
								onSelect={ ( media ) =>
									setAttributes( {
										pastureImageUrl: media.url,
										pastureImageId: media.id,
										pastureImageAlt:
											media.alt || pastureImageAlt,
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Pasture Image',
										'twork-builder'
									),
								} }
							/>
						) : (
							<>
								<img
									src={ pastureImageUrl }
									alt={ pastureImageAlt }
									style={ { width: '100%' } }
								/>
								<Button
									isSecondary
									onClick={ () =>
										setAttributes( {
											pastureImageUrl: '',
											pastureImageId: null,
										} )
									}
								>
									{ __( 'Remove Image', 'twork-builder' ) }
								</Button>
							</>
						) }
						<TextControl
							label={ __( 'Image Alt', 'twork-builder' ) }
							value={ pastureImageAlt }
							onChange={ ( val ) =>
								setAttributes( { pastureImageAlt: val } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Social Links', 'twork-builder' ) }
						initialOpen={ false }
					>
						{ ( social || [] ).map( ( item, index ) => (
							<div
								key={ item.id || index }
								style={ { marginBottom: 12 } }
							>
								<TextControl
									label={ __( 'Label', 'twork-builder' ) }
									value={ item.label || '' }
									onChange={ ( val ) =>
										updateSocial( index, 'label', val )
									}
								/>
								<TextControl
									label={ __( 'URL', 'twork-builder' ) }
									value={ item.href || '' }
									onChange={ ( val ) =>
										updateSocial( index, 'href', val )
									}
								/>
								<Button
									isDestructive
									isSmall
									onClick={ () => removeSocial( index ) }
								>
									{ __( 'Remove', 'twork-builder' ) }
								</Button>
							</div>
						) ) }
						<Button isSecondary onClick={ addSocial }>
							{ __( 'Add social link', 'twork-builder' ) }
						</Button>
					</PanelBody>
					<PanelBody
						title={ __( 'Options', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show back-to-top button',
								'twork-builder'
							) }
							checked={ showBackToTop !== false }
							onChange={ ( val ) =>
								setAttributes( { showBackToTop: val } )
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
				</InspectorControls>
			) }

			<footer { ...blockProps } data-block="footer">
				<div className="footer__top l-section">
					<p
						style={ {
							fontSize: 11,
							color: '#888',
							marginBottom: 8,
						} }
					>
						{ __(
							'Info cards (first blocks) render in the top grid on the front end.',
							'twork-builder'
						) }
					</p>
					<div
						className="footer__info-grid"
						data-list="infoCards"
					/>
				</div>
				<div className="footer__main l-section">
					<div className="footer__brand-col">
						<span className="footer__brand">
							<span>{ brandPrefix }</span>
							<span className="footer__brand-suffix">
								{ brandSuffix }
							</span>
						</span>
						<RichText
							tagName="p"
							className="footer__desc"
							value={ description }
							onChange={ ( val ) =>
								setAttributes( { description: val } )
							}
							placeholder={ __(
								'Description…',
								'twork-builder'
							) }
						/>
						<div className="footer__social">
							{ ( social || [] ).map( ( item, index ) => (
								<span
									key={ item.id || index }
									className="footer__social-link"
								>
									{ ( item.label || '?' ).charAt( 0 ) }
								</span>
							) ) }
						</div>
					</div>
					<div
						className="footer__columns"
						data-list="columns"
					/>
				</div>
				<div className="footer__bottom l-section">
					<RichText
						tagName="p"
						className="footer__copyright"
						value={ copyright }
						onChange={ ( val ) =>
							setAttributes( { copyright: val } )
						}
						placeholder={ __( 'Copyright…', 'twork-builder' ) }
					/>
				</div>
				{ pastureImageUrl && (
					<div className="footer__pasture">
						<img src={ pastureImageUrl } alt={ pastureImageAlt } />
					</div>
				) }
				<div className="brand-footer__blocks" data-list="items">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock={ false }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</div>
			</footer>
		</>
	);
}
