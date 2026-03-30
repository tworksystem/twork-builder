/**
 * Agrezer Shop Grid — editor (ServerSideRender + Inspector).
 */
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import metadata from './block.json';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		categoryTitle,
		productsTitle,
		contactTitle,
		showCategoryWidget,
		showMiniProductsWidget,
		showContactWidget,
		categoriesHideEmpty,
		categoriesLimit,
		categoriesTopLevelOnly,
		miniProductsCount,
		miniProductsSource,
		productsPerPage,
		gridColumns,
		gridColumnsTablet,
		gridColumnsMobile,
		defaultOrderby,
		showToolbar,
		showPagination,
		mainCategoryId,
		contactAddress,
		contactPhone,
		contactEmail,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-agrezer-shop-grid-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Sidebar — WooCommerce', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show category list',
								'twork-builder'
							) }
							checked={ showCategoryWidget }
							onChange={ ( val ) =>
								setAttributes( { showCategoryWidget: val } )
							}
						/>

						{ showCategoryWidget && (
							<>
								<TextControl
									label={ __(
										'Category widget title',
										'twork-builder'
									) }
									value={ categoryTitle }
									onChange={ ( val ) =>
										setAttributes( { categoryTitle: val } )
									}
								/>

								<ToggleControl
									label={ __(
										'Hide empty categories',
										'twork-builder'
									) }
									checked={ categoriesHideEmpty }
									onChange={ ( val ) =>
										setAttributes( {
											categoriesHideEmpty: val,
										} )
									}
								/>

								<ToggleControl
									label={ __(
										'Top-level categories only',
										'twork-builder'
									) }
									checked={ categoriesTopLevelOnly }
									onChange={ ( val ) =>
										setAttributes( {
											categoriesTopLevelOnly: val,
										} )
									}
								/>

								<RangeControl
									label={ __(
										'Max categories (0 = all)',
										'twork-builder'
									) }
									value={ categoriesLimit }
									onChange={ ( val ) =>
										setAttributes( {
											categoriesLimit: val,
										} )
									}
									min={ 0 }
									max={ 50 }
								/>
							</>
						) }
						<Divider />
						<ToggleControl
							label={ __(
								'Show mini products',
								'twork-builder'
							) }
							checked={ showMiniProductsWidget }
							onChange={ ( val ) =>
								setAttributes( { showMiniProductsWidget: val } )
							}
						/>

						{ showMiniProductsWidget && (
							<>
								<TextControl
									label={ __(
										'Products widget title',
										'twork-builder'
									) }
									value={ productsTitle }
									onChange={ ( val ) =>
										setAttributes( { productsTitle: val } )
									}
								/>

								<RangeControl
									label={ __(
										'Number of mini products',
										'twork-builder'
									) }
									value={ miniProductsCount }
									onChange={ ( val ) =>
										setAttributes( {
											miniProductsCount: val,
										} )
									}
									min={ 1 }
									max={ 12 }
								/>

								<SelectControl
									label={ __(
										'Mini products source',
										'twork-builder'
									) }
									value={ miniProductsSource }
									options={ [
										{
											label: __(
												'By average rating',
												'twork-builder'
											),
											value: 'rating',
										},
										{
											label: __(
												'Featured products',
												'twork-builder'
											),
											value: 'featured',
										},
										{
											label: __(
												'On sale',
												'twork-builder'
											),
											value: 'on_sale',
										},
										{
											label: __(
												'Popularity (sales)',
												'twork-builder'
											),
											value: 'popularity',
										},
										{
											label: __(
												'Recent',
												'twork-builder'
											),
											value: 'recent',
										},
										{
											label: __(
												'Random',
												'twork-builder'
											),
											value: 'rand',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											miniProductsSource: val,
										} )
									}
								/>
							</>
						) }
						<Divider />
						<ToggleControl
							label={ __(
								'Show contact widget',
								'twork-builder'
							) }
							checked={ showContactWidget }
							onChange={ ( val ) =>
								setAttributes( { showContactWidget: val } )
							}
						/>

						{ showContactWidget && (
							<>
								<TextControl
									label={ __(
										'Contact widget title',
										'twork-builder'
									) }
									value={ contactTitle }
									onChange={ ( val ) =>
										setAttributes( { contactTitle: val } )
									}
								/>

								<TextControl
									label={ __( 'Address', 'twork-builder' ) }
									value={ contactAddress }
									onChange={ ( val ) =>
										setAttributes( { contactAddress: val } )
									}
								/>

								<TextControl
									label={ __( 'Phone', 'twork-builder' ) }
									value={ contactPhone }
									onChange={ ( val ) =>
										setAttributes( { contactPhone: val } )
									}
								/>

								<TextControl
									label={ __( 'Email', 'twork-builder' ) }
									value={ contactEmail }
									onChange={ ( val ) =>
										setAttributes( { contactEmail: val } )
									}
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __(
							'Main grid — WooCommerce',
							'twork-builder'
						) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Products per page', 'twork-builder' ) }
							value={ productsPerPage }
							onChange={ ( val ) =>
								setAttributes( { productsPerPage: val } )
							}
							min={ 1 }
							max={ 48 }
						/>

						<TextControl
							label={ __(
								'Filter by category ID (0 = all products)',
								'twork-builder'
							) }
							value={
								mainCategoryId ? String( mainCategoryId ) : ''
							}
							onChange={ ( val ) =>
								setAttributes( {
									mainCategoryId: val
										? parseInt( val, 10 ) || 0
										: 0,
								} )
							}
							help={ __(
								'Restrict the main grid to one WooCommerce product category.',
								'twork-builder'
							) }
						/>

						<SelectControl
							label={ __(
								'Default sort (frontend can override)',
								'twork-builder'
							) }
							value={ defaultOrderby }
							options={ [
								{
									label: __(
										'Default (menu order)',
										'twork-builder'
									),
									value: 'default',
								},
								{
									label: __( 'Newest', 'twork-builder' ),
									value: 'date',
								},
								{
									label: __(
										'Price: low to high',
										'twork-builder'
									),
									value: 'price',
								},
								{
									label: __(
										'Price: high to low',
										'twork-builder'
									),
									value: 'price-desc',
								},
								{
									label: __( 'Popularity', 'twork-builder' ),
									value: 'popularity',
								},
								{
									label: __(
										'Average rating',
										'twork-builder'
									),
									value: 'rating',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { defaultOrderby: val } )
							}
						/>

						<ToggleControl
							label={ __(
								'Show toolbar (results + sort)',
								'twork-builder'
							) }
							checked={ showToolbar }
							onChange={ ( val ) =>
								setAttributes( { showToolbar: val } )
							}
						/>

						<ToggleControl
							label={ __( 'Show pagination', 'twork-builder' ) }
							checked={ showPagination }
							onChange={ ( val ) =>
								setAttributes( { showPagination: val } )
							}
						/>

						<Divider />
						<RangeControl
							label={ __(
								'Grid columns (desktop)',
								'twork-builder'
							) }
							value={ gridColumns }
							onChange={ ( val ) =>
								setAttributes( { gridColumns: val } )
							}
							min={ 1 }
							max={ 6 }
						/>

						<RangeControl
							label={ __(
								'Grid columns (tablet)',
								'twork-builder'
							) }
							value={ gridColumnsTablet }
							onChange={ ( val ) =>
								setAttributes( { gridColumnsTablet: val } )
							}
							min={ 1 }
							max={ 4 }
						/>

						<RangeControl
							label={ __(
								'Grid columns (mobile)',
								'twork-builder'
							) }
							value={ gridColumnsMobile }
							onChange={ ( val ) =>
								setAttributes( { gridColumnsMobile: val } )
							}
							min={ 1 }
							max={ 2 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout & background', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Padding top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 200 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Container max width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 900 }
							max={ 1600 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Horizontal padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 5 }
						/>

						<p className="components-base-control__help">
							{ __( 'Background color:', 'twork-builder' ) }
						</p>
						<input
							type="color"
							value={ backgroundColor }
							onChange={ ( e ) =>
								setAttributes( {
									backgroundColor: e.target.value,
								} )
							}
							aria-label={ __(
								'Background color',
								'twork-builder'
							) }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<ServerSideRender
					block={ metadata.name }
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
