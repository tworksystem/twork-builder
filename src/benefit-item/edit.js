import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		icon,
		iconColor,
		iconBgColor,
		iconSize,
		iconSizePx,
		title,
		titleColor,
		titleFontSize,
		titleFontWeight,
		description,
		descriptionColor,
		descriptionFontSize,
		cardPadding,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-benefit-item-editor benefit-card',
			style: {
				padding: `${ cardPadding }px 30px`,
				background: '#fff',
				borderRadius: 'var(--radius, 12px)',
				border: '2px dashed #e0e0e0',
				textAlign: 'center',
				transition: '0.3s',
			},
		} ),
		[ cardPadding ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Icon Settings', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Icon Class', 'twork-builder' ) }
							value={ icon }
							onChange={ ( val ) =>
								setAttributes( { icon: val } )
							}
							help={ __(
								'Font Awesome class. e.g. fas fa-user-md, fas fa-heartbeat',
								'twork-builder'
							) }
						/>

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
							min={ 1 }
							max={ 3 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __(
								'Icon Circle Size (px)',
								'twork-builder'
							) }
							value={ iconSizePx }
							onChange={ ( val ) =>
								setAttributes( { iconSizePx: val } )
							}
							min={ 50 }
							max={ 100 }
							step={ 5 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Title', 'twork-builder' ) }
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
							label={ __( 'Font Size (rem)', 'twork-builder' ) }
							value={ titleFontSize }
							onChange={ ( val ) =>
								setAttributes( { titleFontSize: val } )
							}
							min={ 1 }
							max={ 1.5 }
							step={ 0.05 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'twork-builder' ) }
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
						title={ __( 'Description', 'twork-builder' ) }
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
							label={ __( 'Font Size (rem)', 'twork-builder' ) }
							value={ descriptionFontSize }
							onChange={ ( val ) =>
								setAttributes( { descriptionFontSize: val } )
							}
							min={ 0.8 }
							max={ 1.2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Card Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Card Padding (px)', 'twork-builder' ) }
							value={ cardPadding }
							onChange={ ( val ) =>
								setAttributes( { cardPadding: val } )
							}
							min={ 20 }
							max={ 60 }
							step={ 5 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div
					className="b-icon"
					style={ {
						width: `${ iconSizePx }px`,
						height: `${ iconSizePx }px`,
						background: iconBgColor,
						borderRadius: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '0 auto 25px',
						fontSize: `${ iconSize }rem`,
						color: iconColor,
					} }
				>
					{ icon && <i className={ icon } aria-hidden="true" /> }
				</div>
				<RichText
					tagName="h4"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Title...', 'twork-builder' ) }
					style={ {
						margin: '0 0 10px 0',
						fontSize: `${ titleFontSize }rem`,
						fontWeight: titleFontWeight,
						color: titleColor,
					} }
				/>

				<RichText
					tagName="p"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __( 'Description...', 'twork-builder' ) }
					style={ {
						fontSize: `${ descriptionFontSize }rem`,
						color: descriptionColor,
						margin: 0,
					} }
				/>
			</div>
		</>
	);
}
