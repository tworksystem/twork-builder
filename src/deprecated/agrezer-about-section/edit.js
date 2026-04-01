import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [
	'twork/agrezer-about-features-grid',
	'twork/agrezer-about-images-grid',
];

const TEMPLATE = [
	[ 'twork/agrezer-about-features-grid', {} ],
	[ 'twork/agrezer-about-images-grid', {} ],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerGutter,
		labelText,
		labelIcon,
		sectionTitle,
		labelColor,
		labelIconColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'agrezer-about twork-agrezer-about-section-editor',
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--agrezer-about-max-width': `${ containerMaxWidth }px`,
				'--agrezer-about-gutter': `${ containerGutter }px`,
			},
		} ),
		[
			backgroundColor,
			containerGutter,
			containerMaxWidth,
			paddingBottom,
			paddingTop,
		]
	);

	const containerStyle = {
		width: `min(100% - ${
			containerGutter * 2
		}px, ${ containerMaxWidth }px)`,
		marginInline: 'auto',
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section header', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Label icon (emoji)',
								'twork-builder'
							) }
							value={ labelIcon }
							onChange={ ( val ) =>
								setAttributes( { labelIcon: val } )
							}
							help={ __(
								'Single emoji or short symbol.',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __( 'Label text', 'twork-builder' ) }
							value={ labelText }
							onChange={ ( val ) =>
								setAttributes( { labelText: val } )
							}
						/>

						<PanelColorSettings
							title={ __( 'Label color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: labelColor,
									onChange: ( val ) =>
										setAttributes( { labelColor: val } ),
									label: __(
										'Label text color',
										'twork-builder'
									),
								},
							] }
						/>

						<PanelColorSettings
							title={ __( 'Label icon tint', 'twork-builder' ) }
							colorSettings={ [
								{
									value: labelIconColor,
									onChange: ( val ) =>
										setAttributes( {
											labelIconColor: val,
										} ),
									label: __( 'Icon color', 'twork-builder' ),
								},
							] }
						/>

						<Divider />
						<PanelColorSettings
							title={ __( 'Title color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: titleColor,
									onChange: ( val ) =>
										setAttributes( { titleColor: val } ),
									label: __(
										'Heading color',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Title size (rem)', 'twork-builder' ) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1.5 }
							max={ 4.5 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Title weight', 'twork-builder' ) }
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
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
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
										'Background color',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Max content width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( val ) =>
								setAttributes( { containerMaxWidth: val } )
							}
							min={ 960 }
							max={ 1440 }
							step={ 10 }
						/>

						<RangeControl
							label={ __( 'Side gutter (px)', 'twork-builder' ) }
							value={ containerGutter }
							onChange={ ( val ) =>
								setAttributes( { containerGutter: val } )
							}
							min={ 12 }
							max={ 48 }
							step={ 2 }
						/>

						<RangeControl
							label={ __( 'Padding top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 0 }
							max={ 160 }
							step={ 4 }
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
							max={ 160 }
							step={ 4 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps } aria-labelledby="agrezer-about-title">
				<div
					className="agrezer-about__container"
					style={ containerStyle }
				>
					<div className="agrezer-about__header">
						<div className="agrezer-about__heading">
							<p
								className="agrezer-about__label"
								style={ { color: labelColor } }
							>
								<span
									className="agrezer-about__label-icon"
									style={ { color: labelIconColor } }
									aria-hidden="true"
								>
									{ labelIcon }
								</span>
								<RichText
									tagName="span"
									value={ labelText }
									onChange={ ( val ) =>
										setAttributes( { labelText: val } )
									}
									placeholder={ __(
										'About Us',
										'twork-builder'
									) }
									allowedFormats={ [] }
								/>
							</p>
							<RichText
								tagName="h2"
								id="agrezer-about-title"
								className="agrezer-about__title"
								value={ sectionTitle }
								onChange={ ( val ) =>
									setAttributes( { sectionTitle: val } )
								}
								placeholder={ __(
									'Section title…',
									'twork-builder'
								) }
								style={ {
									color: titleColor,
									fontSize: `${ titleFontSize }rem`,
									fontWeight: titleFontWeight,
								} }
							/>
						</div>
					</div>

					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock="all"
					/>
				</div>
			</section>
		</>
	);
}
