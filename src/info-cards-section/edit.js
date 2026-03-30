import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
} from '@wordpress/block-editor';
import './editor.scss';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	__experimentalDivider as ExperimentalDivider,
	Divider as StableDivider,
} from '@wordpress/components';

const Divider =
	StableDivider ||
	ExperimentalDivider ||
	function DividerFallback() {
		return (
			<hr
				style={ {
					margin: '16px 0',
					border: 'none',
					borderTop: '1px solid #ddd',
				} }
			/>
		);
	};

const DEFAULT_ATTRS = {
	showSectionHeader: true,
	sectionTitle: 'Contact & Information',
	showSectionDescription: true,
	sectionDescription: 'Get in touch or find what you need.',
	headerAlign: 'center',
	backgroundColor: '#ffffff',
	paddingTop: 60,
	paddingBottom: 60,
	containerMaxWidth: 1100,
	containerPadding: 20,
	columns: 3,
	columnsTablet: 2,
	columnsMobile: 1,
	gap: 24,
	accentColor: '#dc3545',
	iconColor: '#dc3545',
	iconBackground: '#fff2e8',
	animationOnScroll: true,
	animationDelay: 120,
	animationType: 'fadeInUp',
};

export default function Edit( { attributes = {}, setAttributes, isSelected } ) {
	const attrs = { ...DEFAULT_ATTRS, ...attributes };
	const {
		showSectionHeader,
		sectionTitle,
		showSectionDescription,
		sectionDescription,
		headerAlign,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		accentColor,
		iconColor,
		iconBackground,
		animationOnScroll,
		animationDelay,
		animationType,
	} = attrs;

	const ALLOWED_BLOCKS = [ 'twork/info-card-item' ];
	const TEMPLATE = [
		[
			'twork/info-card-item',
			{
				iconClass: 'fas fa-phone-volume',
				title: 'Emergency Cases',
				subtitle: '24/7 Immediate Support',
				ctaText: '09-789 101 101',
				ctaUrl: 'tel:09789101101',
				ctaColor: '#dc3545',
			},
		],

		[
			'twork/info-card-item',
			{
				iconClass: 'fas fa-envelope-open-text',
				title: 'General Enquiry',
				subtitle: 'For appointments & info',
				ctaText: 'info@jivakahospital.com',
				ctaUrl: 'mailto:info@jivakahospital.com',
			},
		],

		[
			'twork/info-card-item',
			{
				iconClass: 'fas fa-map-marked-alt',
				title: 'Visit Us',
				subtitle: 'Corner of 101st Street & 57th St,',
				secondaryText: 'Mandalay, Myanmar',
				showCTA: false,
			},
		],
	];

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'info-cards-section info-cards-section-editor',
			style: {
				backgroundColor:
					backgroundColor || DEFAULT_ATTRS.backgroundColor,
				paddingTop: `${ Number( paddingTop ) }px`,
				paddingBottom: `${ Number( paddingBottom ) }px`,
				'--info-accent-color': accentColor || DEFAULT_ATTRS.accentColor,
				'--info-icon-color':
					iconColor ?? accentColor ?? DEFAULT_ATTRS.iconColor,
				'--info-icon-bg':
					iconBackground || DEFAULT_ATTRS.iconBackground,
				'--info-columns-desktop': columns,
				'--info-columns-tablet': columnsTablet,
				'--info-columns-mobile': columnsMobile,
				'--info-grid-gap': `${ Number( gap ) }px`,
			},
			'data-animation': animationOnScroll === true ? 'true' : 'false',
			'data-animation-type':
				typeof animationType === 'string'
					? animationType
					: DEFAULT_ATTRS.animationType,
			'data-animation-delay': Number( animationDelay ),
		} ),
		[
			DEFAULT_ATTRS,
			accentColor,
			animationDelay,
			animationOnScroll,
			animationType,
			backgroundColor,
			columns,
			columnsMobile,
			columnsTablet,
			gap,
			iconBackground,
			iconColor,
			paddingBottom,
			paddingTop,
		]
	);

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(${ columns }, minmax(0, 1fr))`,
		gap: `${ gap }px`,
		width: '100%',
		minWidth: 0,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Header & Description', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show section header',
								'twork-builder'
							) }
							help={ __(
								'Display a title above the cards.',
								'twork-builder'
							) }
							checked={ showSectionHeader }
							onChange={ ( val ) =>
								setAttributes( { showSectionHeader: val } )
							}
						/>

						<ToggleControl
							label={ __(
								'Show section description',
								'twork-builder'
							) }
							help={ __(
								'Display a short description above the cards.',
								'twork-builder'
							) }
							checked={ showSectionDescription }
							onChange={ ( val ) =>
								setAttributes( { showSectionDescription: val } )
							}
						/>

						<Divider />
						<SelectControl
							label={ __(
								'Header & description alignment',
								'twork-builder'
							) }
							help={ __(
								'Align title and description text above the cards.',
								'twork-builder'
							) }
							value={ headerAlign || 'center' }
							options={ [
								{
									value: 'left',
									label: __( 'Left', 'twork-builder' ),
								},
								{
									value: 'center',
									label: __( 'Center', 'twork-builder' ),
								},
								{
									value: 'right',
									label: __( 'Right', 'twork-builder' ),
								},
							] }
							onChange={ ( val ) =>
								setAttributes( {
									headerAlign: val || 'center',
								} )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Columns (Desktop)', 'twork-builder' ) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 1 }
							max={ 4 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Columns (Tablet)', 'twork-builder' ) }
							value={ columnsTablet }
							onChange={ ( val ) =>
								setAttributes( { columnsTablet: val } )
							}
							min={ 1 }
							max={ 3 }
							step={ 1 }
						/>

						<RangeControl
							label={ __( 'Columns (Mobile)', 'twork-builder' ) }
							value={ columnsMobile }
							onChange={ ( val ) =>
								setAttributes( { columnsMobile: val } )
							}
							min={ 1 }
							max={ 2 }
							step={ 1 }
						/>

						<Divider />
						<RangeControl
							label={ __( 'Gap (px)', 'twork-builder' ) }
							value={ gap }
							onChange={ ( val ) =>
								setAttributes( { gap: val } )
							}
							min={ 0 }
							max={ 60 }
							step={ 2 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Appearance', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ PanelColorSettings && (
							<PanelColorSettings
								title={ __(
									'Section Colors',
									'twork-builder'
								) }
								colorSettings={ [
									{
										value:
											backgroundColor ??
											DEFAULT_ATTRS.backgroundColor,
										onChange: ( val ) =>
											setAttributes( {
												backgroundColor: val,
											} ),
										label: __(
											'Section Background',
											'twork-builder'
										),
									},
									{
										value:
											iconColor ??
											accentColor ??
											DEFAULT_ATTRS.iconColor,
										onChange: ( val ) =>
											setAttributes( { iconColor: val } ),
										label: __(
											'Icon Color',
											'twork-builder'
										),
									},
									{
										value:
											iconBackground ??
											DEFAULT_ATTRS.iconBackground,
										onChange: ( val ) =>
											setAttributes( {
												iconBackground: val,
											} ),
										label: __(
											'Icon Background',
											'twork-builder'
										),
									},
									{
										value:
											accentColor ??
											DEFAULT_ATTRS.accentColor,
										onChange: ( val ) =>
											setAttributes( {
												accentColor: val,
											} ),
										label: __(
											'CTA Link Default',
											'twork-builder'
										),
									},
								] }
							/>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Spacing', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Padding Top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 160 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( val ) =>
								setAttributes( { paddingBottom: val } )
							}
							min={ 0 }
							max={ 160 }
							step={ 5 }
						/>

						<Divider />
						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 800 }
							max={ 1600 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container Padding (px)',
								'twork-builder'
							) }
							value={ containerPadding }
							onChange={ ( val ) =>
								setAttributes( { containerPadding: val } )
							}
							min={ 0 }
							max={ 80 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Animation', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Enable Stagger Animation',
								'twork-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>

						{ animationOnScroll && (
							<>
								<RangeControl
									label={ __(
										'Animation Delay (ms)',
										'twork-builder'
									) }
									value={ animationDelay }
									onChange={ ( val ) =>
										setAttributes( { animationDelay: val } )
									}
									min={ 0 }
									max={ 500 }
									step={ 20 }
								/>

								<select
									value={ animationType }
									onChange={ ( event ) =>
										setAttributes( {
											animationType: event.target.value,
										} )
									}
									style={ {
										width: '100%',
										marginTop: '10px',
									} }
								>
									<option value="fadeInUp">
										{ __( 'Fade In Up', 'twork-builder' ) }
									</option>
									<option value="fadeIn">
										{ __( 'Fade In', 'twork-builder' ) }
									</option>
									<option value="zoomIn">
										{ __( 'Zoom In', 'twork-builder' ) }
									</option>
								</select>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="jivaka-container"
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						margin: '0 auto',
						padding: `0 ${ containerPadding }px`,
					} }
				>
					{ ( showSectionHeader || showSectionDescription ) && (
						<div
							className="info-cards-section-header"
							style={ { textAlign: headerAlign || 'center' } }
						>
							{ showSectionHeader && (
								<RichText
									tagName="h2"
									className="info-cards-section-title"
									value={ sectionTitle }
									onChange={ ( val ) =>
										setAttributes( { sectionTitle: val } )
									}
									placeholder={ __(
										'Section title…',
										'twork-builder'
									) }
								/>
							) }
							{ showSectionDescription && (
								<RichText
									tagName="p"
									className="info-cards-section-description"
									value={ sectionDescription }
									onChange={ ( val ) =>
										setAttributes( {
											sectionDescription: val,
										} )
									}
									placeholder={ __(
										'Section description…',
										'twork-builder'
									) }
								/>
							) }
						</div>
					) }
					<div
						className="info-grid info-grid-editor"
						style={ gridStyle }
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							renderAppender={ InnerBlocks.ButtonBlockAppender }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
