import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	SelectControl,
	ToggleControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ICON_OPTIONS = [
	{
		label: __( 'Certificate', 'twork-builder' ),
		value: 'fas fa-certificate',
	},
	{ label: __( 'Globe', 'twork-builder' ), value: 'fas fa-globe' },
	{ label: __( 'Shield Alt', 'twork-builder' ), value: 'fas fa-shield-alt' },
	{ label: __( 'Award', 'twork-builder' ), value: 'fas fa-award' },
	{ label: __( 'Medal', 'twork-builder' ), value: 'fas fa-medal' },
	{ label: __( 'Star', 'twork-builder' ), value: 'fas fa-star' },
	{
		label: __( 'Check Circle', 'twork-builder' ),
		value: 'fas fa-check-circle',
	},
	{ label: __( 'Hospital', 'twork-builder' ), value: 'fas fa-hospital' },
	{ label: __( 'Heartbeat', 'twork-builder' ), value: 'fas fa-heartbeat' },
	{ label: __( 'Ribbon', 'twork-builder' ), value: 'fas fa-ribbon' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		iconClass,
		certTitle,
		certBadge,
		certDescription,
		iconColor,
		iconSize,
		iconBgColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
		badgeBgColor,
		badgeTextColor,
		badgeFontSize,
		badgeFontWeight,
		badgeBorderRadius,
		descriptionColor,
		descriptionFontSize,
		descriptionLineHeight,
		cardPadding,
		cardPaddingHorizontal,
		cardBorderRadius,
		cardBorderColor,
		cardBorderWidth,
		cardBgColor,
		showTopBarOnHover,
		topBarColor,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'twork-accreditation-cert-card-editor cert-card stagger-up',
			style: {
				padding: `${ cardPadding }px ${ cardPaddingHorizontal }px`,
				borderRadius: `${ cardBorderRadius }px`,
				border: `2px dashed #e0e0e0`,
				background: '#fafafa',
				textAlign: 'center',
			},
		} ),
		[ cardBorderRadius, cardPadding, cardPaddingHorizontal ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Content', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Icon', 'twork-builder' ) }
							value={ iconClass }
							options={ ICON_OPTIONS }
							onChange={ ( val ) =>
								setAttributes( { iconClass: val } )
							}
						/>

						<TextControl
							label={ __(
								'Certification Title',
								'twork-builder'
							) }
							value={ certTitle }
							onChange={ ( val ) =>
								setAttributes( { certTitle: val } )
							}
							help={ __(
								'e.g., ISO 9001:2015, JCI Accreditation',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __( 'Badge Text', 'twork-builder' ) }
							value={ certBadge }
							onChange={ ( val ) =>
								setAttributes( { certBadge: val } )
							}
							help={ __(
								'e.g., Certified Since 2018, Gold Seal of Approval',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __( 'Description', 'twork-builder' ) }
							value={ certDescription }
							onChange={ ( val ) =>
								setAttributes( { certDescription: val } )
							}
							help={ __(
								'Short description of the certification',
								'twork-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Icon Styling', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Icon Colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: iconColor,
									onChange: ( val ) =>
										setAttributes( { iconColor: val } ),
									label: __( 'Icon Color', 'twork-builder' ),
								},
								{
									value: iconBgColor,
									onChange: ( val ) =>
										setAttributes( { iconBgColor: val } ),
									label: __(
										'Icon Background',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Icon Size (rem)', 'twork-builder' ) }
							value={ iconSize }
							onChange={ ( val ) =>
								setAttributes( { iconSize: val } )
							}
							min={ 1.5 }
							max={ 4 }
							step={ 0.1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Title Styling', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Title Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: titleColor,
									onChange: ( val ) =>
										setAttributes( { titleColor: val } ),
									label: __( 'Title Color', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Title Font Size (rem)',
								'twork-builder'
							) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1 }
							max={ 2 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Title Font Weight', 'twork-builder' ) }
							value={ titleFontWeight }
							onChange={ ( val ) =>
								setAttributes( { titleFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Badge Styling', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Badge Colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: badgeBgColor,
									onChange: ( val ) =>
										setAttributes( { badgeBgColor: val } ),
									label: __(
										'Badge Background',
										'twork-builder'
									),
								},
								{
									value: badgeTextColor,
									onChange: ( val ) =>
										setAttributes( {
											badgeTextColor: val,
										} ),
									label: __( 'Badge Text', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Badge Font Size (rem)',
								'twork-builder'
							) }
							value={ badgeFontSize }
							onChange={ ( val ) =>
								setAttributes( { badgeFontSize: val } )
							}
							min={ 0.6 }
							max={ 1.2 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Badge Font Weight', 'twork-builder' ) }
							value={ badgeFontWeight }
							onChange={ ( val ) =>
								setAttributes( { badgeFontWeight: val } )
							}
							min={ 400 }
							max={ 900 }
							step={ 100 }
						/>

						<RangeControl
							label={ __(
								'Badge Border Radius (px)',
								'twork-builder'
							) }
							value={ badgeBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { badgeBorderRadius: val } )
							}
							min={ 0 }
							max={ 50 }
							step={ 1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Description Styling', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Description Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: descriptionColor,
									onChange: ( val ) =>
										setAttributes( {
											descriptionColor: val,
										} ),
									label: __(
										'Description Color',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Description Font Size (rem)',
								'twork-builder'
							) }
							value={ descriptionFontSize }
							onChange={ ( val ) =>
								setAttributes( { descriptionFontSize: val } )
							}
							min={ 0.8 }
							max={ 1.3 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Line Height', 'twork-builder' ) }
							value={ descriptionLineHeight }
							onChange={ ( val ) =>
								setAttributes( { descriptionLineHeight: val } )
							}
							min={ 1.2 }
							max={ 2 }
							step={ 0.1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Card Styling', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Card Colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: cardBgColor,
									onChange: ( val ) =>
										setAttributes( { cardBgColor: val } ),
									label: __( 'Background', 'twork-builder' ),
								},
								{
									value: cardBorderColor,
									onChange: ( val ) =>
										setAttributes( {
											cardBorderColor: val,
										} ),
									label: __( 'Border', 'twork-builder' ),
								},
								{
									value: topBarColor,
									onChange: ( val ) =>
										setAttributes( { topBarColor: val } ),
									label: __(
										'Hover Top Bar',
										'twork-builder'
									),
								},
							] }
						/>

						<ToggleControl
							label={ __(
								'Show Top Bar on Hover',
								'twork-builder'
							) }
							checked={ showTopBarOnHover }
							onChange={ ( val ) =>
								setAttributes( { showTopBarOnHover: val } )
							}
						/>

						<RangeControl
							label={ __(
								'Card Border Radius (px)',
								'twork-builder'
							) }
							value={ cardBorderRadius }
							onChange={ ( val ) =>
								setAttributes( { cardBorderRadius: val } )
							}
							min={ 0 }
							max={ 24 }
							step={ 1 }
						/>

						<RangeControl
							label={ __(
								'Card Border Width (px)',
								'twork-builder'
							) }
							value={ cardBorderWidth }
							onChange={ ( val ) =>
								setAttributes( { cardBorderWidth: val } )
							}
							min={ 0 }
							max={ 5 }
							step={ 1 }
						/>

						<RangeControl
							label={ __(
								'Padding Vertical (px)',
								'twork-builder'
							) }
							value={ cardPadding }
							onChange={ ( val ) =>
								setAttributes( { cardPadding: val } )
							}
							min={ 20 }
							max={ 80 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Horizontal (px)',
								'twork-builder'
							) }
							value={ cardPaddingHorizontal }
							onChange={ ( val ) =>
								setAttributes( { cardPaddingHorizontal: val } )
							}
							min={ 15 }
							max={ 50 }
							step={ 5 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="cert-icon"
					style={ {
						width: '80px',
						height: '80px',
						margin: '0 auto 25px',
						background: iconBgColor,
						borderRadius: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: `${ iconSize }rem`,
						color: iconColor,
					} }
				>
					<i className={ iconClass } aria-hidden="true" />
				</div>
				<RichText
					tagName="h3"
					value={ certTitle }
					onChange={ ( val ) => setAttributes( { certTitle: val } ) }
					placeholder={ __(
						'Certification title...',
						'twork-builder'
					) }
					style={ {
						margin: '0 0 10px',
						fontSize: `${ titleFontSize }rem`,
						fontWeight: titleFontWeight,
						color: titleColor,
					} }
				/>

				<RichText
					tagName="span"
					value={ certBadge }
					onChange={ ( val ) => setAttributes( { certBadge: val } ) }
					placeholder={ __( 'Badge text...', 'twork-builder' ) }
					style={ {
						display: 'inline-block',
						background: badgeBgColor,
						color: badgeTextColor,
						padding: '4px 12px',
						borderRadius: `${ badgeBorderRadius }px`,
						fontSize: `${ badgeFontSize }rem`,
						fontWeight: badgeFontWeight,
						marginBottom: '15px',
					} }
				/>

				<RichText
					tagName="p"
					value={ certDescription }
					onChange={ ( val ) =>
						setAttributes( { certDescription: val } )
					}
					placeholder={ __( 'Description...', 'twork-builder' ) }
					style={ {
						margin: 0,
						fontSize: `${ descriptionFontSize }rem`,
						color: descriptionColor,
						lineHeight: descriptionLineHeight,
					} }
				/>
			</div>
		</>
	);
}
