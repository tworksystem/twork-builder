import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, BaseControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		columns,
		columnsTablet,
		gap,
		iconWrapBgColor,
	} = attributes;

	const ALLOWED_BLOCKS = [ 'twork/contact-card' ];
	const TEMPLATE = [
		[
			'twork/contact-card',
			{
				title: __( 'Mobile', 'twork-builder' ),
				subtitle: __( 'Free Dial Number', 'twork-builder' ),
				contentType: 'link',
				linkUrl: 'tel:+15284567592',
				linkText: __( '✆ + (528) 456-7592', 'twork-builder' ),
				iconAlt: __( 'Phone', 'twork-builder' ),
			},
		],

		[
			'twork/contact-card',
			{
				title: __( 'Email', 'twork-builder' ),
				subtitle: __( 'Feel Free to Mail', 'twork-builder' ),
				contentType: 'link',
				linkUrl: 'mailto:info@agrezen.com',
				linkText: __( '✉ info@agrezen.com', 'twork-builder' ),
				iconAlt: __( 'Email', 'twork-builder' ),
			},
		],

		[
			'twork/contact-card',
			{
				title: __( 'Address', 'twork-builder' ),
				subtitle: __( 'Our form Address', 'twork-builder' ),
				contentType: 'text',
				plainText: __(
					'132, Tic St, Kingston, NY, USA',
					'twork-builder'
				),
				iconAlt: __( 'Address', 'twork-builder' ),
			},
		],
	];

	const blockProps = useBlockProps( {
		className: 'twork-contact-cards',
		style: {
			backgroundColor,
			paddingTop: `${ paddingTop }px`,
			paddingBottom: `${ paddingBottom }px`,
		},
	} );

	const gridStyle = {
		'--twork-contact-cols': columns,
		'--twork-contact-cols-md': columnsTablet,
		'--twork-contact-gap': `${ gap }px`,
		'--twork-icon-wrap-bg': iconWrapBgColor,
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
	};

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'twork-contact-cards__container',
			style: gridStyle,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
		}
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen
					>
						<RangeControl
							label={ __( 'Padding top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( v ) =>
								setAttributes( { paddingTop: v } )
							}
							min={ 0 }
							max={ 200 }
							step={ 2 }
						/>

						<RangeControl
							label={ __(
								'Padding bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( v ) =>
								setAttributes( { paddingBottom: v } )
							}
							min={ 0 }
							max={ 200 }
							step={ 2 }
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
							min={ 600 }
							max={ 1600 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Horizontal padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( v ) =>
								setAttributes( { containerPadding: v } )
							}
							min={ 0 }
							max={ 80 }
							step={ 2 }
						/>

						<RangeControl
							label={ __( 'Columns (desktop)', 'twork-builder' ) }
							value={ columns }
							onChange={ ( v ) =>
								setAttributes( { columns: v } )
							}
							min={ 1 }
							max={ 4 }
						/>

						<RangeControl
							label={ __(
								'Columns (tablet & below)',
								'twork-builder'
							) }
							value={ columnsTablet }
							onChange={ ( v ) =>
								setAttributes( { columnsTablet: v } )
							}
							min={ 1 }
							max={ 3 }
						/>

						<RangeControl
							label={ __( 'Gap (px)', 'twork-builder' ) }
							value={ gap }
							onChange={ ( v ) => setAttributes( { gap: v } ) }
							min={ 0 }
							max={ 48 }
						/>

						<BaseControl
							label={ __(
								'Icon circle background',
								'twork-builder'
							) }
						>
							<input
								type="color"
								value={ iconWrapBgColor }
								onChange={ ( e ) =>
									setAttributes( {
										iconWrapBgColor: e.target.value,
									} )
								}
							/>
						</BaseControl>
						<BaseControl
							label={ __(
								'Section background',
								'twork-builder'
							) }
						>
							<input
								type="color"
								value={ backgroundColor }
								onChange={ ( e ) =>
									setAttributes( {
										backgroundColor: e.target.value,
									} )
								}
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div { ...innerBlocksProps } />
			</section>
		</>
	);
}
