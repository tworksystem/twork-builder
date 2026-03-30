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
	ToggleControl,
	SelectControl,
	RangeControl,
	Button,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		category,
		isRecommended,
		ribbonText,
		packageName,
		packageNameColor,
		packageNameFontSize,
		packageNameFontWeight,
		currency,
		amount,
		priceColor,
		amountFontSize,
		description,
		descriptionColor,
		descriptionFontSize,
		features,
		featureTextColor,
		featureUnavailableColor,
		featureIconColor,
		featureFontSize,
		showButton,
		buttonText,
		buttonUrl,
		buttonTarget,
		buttonRel,
		buttonStyle,
		buttonBgColor,
		buttonTextColor,
		buttonBorderColor,
		buttonBorderRadius,
		buttonFontSize,
		buttonFontWeight,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: `twork-package-item-editor package-card ${
				isRecommended ? 'recommended' : ''
			}`,

			'data-category': category,
			style: {
				borderRadius: '8px',
				overflow: 'hidden',
				border: '2px dashed #e0e0e0',
				background: '#fafafa',
				display: 'flex',
				flexDirection: 'column',
			},
		} ),
		[ category, isRecommended ]
	);

	const addFeature = () => {
		setAttributes( {
			features: [
				...features,
				{ text: __( 'New feature', 'twork-builder' ), available: true },
			],
		} );
	};

	const updateFeature = ( index, field, value ) => {
		const updated = [ ...features ];
		updated[ index ] = { ...updated[ index ], [ field ]: value };
		setAttributes( { features: updated } );
	};

	const removeFeature = ( index ) => {
		const filtered = features.filter( ( _, i ) => i !== index );
		setAttributes( { features: filtered } );
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Package & Category', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Category (for filter)',
								'twork-builder'
							) }
							value={ category }
							onChange={ ( val ) =>
								setAttributes( { category: val } )
							}
							help={ __(
								'Must match a filter tab value (e.g. general, heart, women).',
								'twork-builder'
							) }
						/>

						<Divider />
						<ToggleControl
							label={ __(
								'Recommended / Highlight',
								'twork-builder'
							) }
							checked={ isRecommended }
							onChange={ ( val ) =>
								setAttributes( { isRecommended: val } )
							}
						/>

						{ isRecommended && (
							<TextControl
								label={ __( 'Ribbon Text', 'twork-builder' ) }
								value={ ribbonText }
								onChange={ ( val ) =>
									setAttributes( { ribbonText: val } )
								}
							/>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Package Name', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							colorSettings={ [
								{
									value: packageNameColor,
									onChange: ( val ) =>
										setAttributes( {
											packageNameColor: val,
										} ),
									label: __( 'Name Color', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Font Size (rem)', 'twork-builder' ) }
							value={ packageNameFontSize }
							onChange={ ( val ) =>
								setAttributes( { packageNameFontSize: val } )
							}
							min={ 0.8 }
							max={ 2 }
							step={ 0.1 }
						/>

						<RangeControl
							label={ __( 'Font Weight', 'twork-builder' ) }
							value={ packageNameFontWeight }
							onChange={ ( val ) =>
								setAttributes( { packageNameFontWeight: val } )
							}
							min={ 100 }
							max={ 900 }
							step={ 100 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Price', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Currency', 'twork-builder' ) }
							value={ currency }
							onChange={ ( val ) =>
								setAttributes( { currency: val } )
							}
						/>

						<TextControl
							label={ __( 'Amount', 'twork-builder' ) }
							value={ amount }
							onChange={ ( val ) =>
								setAttributes( { amount: val } )
							}
						/>

						<PanelColorSettings
							colorSettings={ [
								{
									value: priceColor,
									onChange: ( val ) =>
										setAttributes( { priceColor: val } ),
									label: __( 'Price Color', 'twork-builder' ),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Amount Font Size (rem)',
								'twork-builder'
							) }
							value={ amountFontSize }
							onChange={ ( val ) =>
								setAttributes( { amountFontSize: val } )
							}
							min={ 1.5 }
							max={ 4 }
							step={ 0.1 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Description', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
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
							min={ 0.7 }
							max={ 1.2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Features List', 'twork-builder' ) }
						initialOpen={ false }
					>
						<BaseControl
							label={ __( 'Features', 'twork-builder' ) }
						>
							{ features.map( ( feat, index ) => (
								<div
									key={ index }
									style={ {
										marginBottom: '10px',
										padding: '10px',
										border: '1px solid #e0e0e0',
										borderRadius: '4px',
									} }
								>
									<TextControl
										label={ __(
											'Feature text',
											'twork-builder'
										) }
										value={ feat.text }
										onChange={ ( val ) =>
											updateFeature( index, 'text', val )
										}
									/>

									<ToggleControl
										label={ __(
											'Available (check icon)',
											'twork-builder'
										) }
										checked={ feat.available }
										onChange={ ( val ) =>
											updateFeature(
												index,
												'available',
												val
											)
										}
									/>

									<Button
										isDestructive
										isSmall
										onClick={ () => removeFeature( index ) }
										style={ { marginTop: '8px' } }
									>
										{ __( 'Remove', 'twork-builder' ) }
									</Button>
								</div>
							) ) }
							<Button isPrimary isSmall onClick={ addFeature }>
								{ __( 'Add Feature', 'twork-builder' ) }
							</Button>
						</BaseControl>
						<Divider />
						<PanelColorSettings
							title={ __( 'Feature Colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: featureTextColor,
									onChange: ( val ) =>
										setAttributes( {
											featureTextColor: val,
										} ),
									label: __( 'Text Color', 'twork-builder' ),
								},
								{
									value: featureUnavailableColor,
									onChange: ( val ) =>
										setAttributes( {
											featureUnavailableColor: val,
										} ),
									label: __(
										'Unavailable Text Color',
										'twork-builder'
									),
								},
								{
									value: featureIconColor,
									onChange: ( val ) =>
										setAttributes( {
											featureIconColor: val,
										} ),
									label: __(
										'Check Icon Color',
										'twork-builder'
									),
								},
							] }
						/>

						<RangeControl
							label={ __(
								'Feature Font Size (rem)',
								'twork-builder'
							) }
							value={ featureFontSize }
							onChange={ ( val ) =>
								setAttributes( { featureFontSize: val } )
							}
							min={ 0.75 }
							max={ 1.2 }
							step={ 0.05 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Button', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Button', 'twork-builder' ) }
							checked={ showButton }
							onChange={ ( val ) =>
								setAttributes( { showButton: val } )
							}
						/>

						{ showButton && (
							<>
								<TextControl
									label={ __(
										'Button Text',
										'twork-builder'
									) }
									value={ buttonText }
									onChange={ ( val ) =>
										setAttributes( { buttonText: val } )
									}
								/>

								<TextControl
									label={ __(
										'Button URL',
										'twork-builder'
									) }
									value={ buttonUrl }
									onChange={ ( val ) =>
										setAttributes( { buttonUrl: val } )
									}
									type="url"
								/>

								<ToggleControl
									label={ __(
										'Open in New Tab',
										'twork-builder'
									) }
									checked={ buttonTarget }
									onChange={ ( val ) =>
										setAttributes( { buttonTarget: val } )
									}
								/>

								<TextControl
									label={ __( 'Rel', 'twork-builder' ) }
									value={ buttonRel }
									onChange={ ( val ) =>
										setAttributes( { buttonRel: val } )
									}
								/>

								<SelectControl
									label={ __(
										'Button Style',
										'twork-builder'
									) }
									value={ buttonStyle }
									options={ [
										{
											label: __(
												'Primary (filled)',
												'twork-builder'
											),
											value: 'primary',
										},
										{
											label: __(
												'Outline',
												'twork-builder'
											),
											value: 'outline',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { buttonStyle: val } )
									}
								/>

								<PanelColorSettings
									colorSettings={ [
										{
											value: buttonBgColor,
											onChange: ( val ) =>
												setAttributes( {
													buttonBgColor: val,
												} ),
											label: __(
												'Background',
												'twork-builder'
											),
										},
										{
											value: buttonTextColor,
											onChange: ( val ) =>
												setAttributes( {
													buttonTextColor: val,
												} ),
											label: __(
												'Text Color',
												'twork-builder'
											),
										},
										{
											value: buttonBorderColor,
											onChange: ( val ) =>
												setAttributes( {
													buttonBorderColor: val,
												} ),
											label: __(
												'Border Color',
												'twork-builder'
											),
										},
									] }
								/>

								<RangeControl
									label={ __(
										'Border Radius (px)',
										'twork-builder'
									) }
									value={ buttonBorderRadius }
									onChange={ ( val ) =>
										setAttributes( {
											buttonBorderRadius: val,
										} )
									}
									min={ 0 }
									max={ 30 }
									step={ 1 }
								/>

								<RangeControl
									label={ __(
										'Font Size (rem)',
										'twork-builder'
									) }
									value={ buttonFontSize }
									onChange={ ( val ) =>
										setAttributes( { buttonFontSize: val } )
									}
									min={ 0.7 }
									max={ 1.2 }
									step={ 0.05 }
								/>

								<RangeControl
									label={ __(
										'Font Weight',
										'twork-builder'
									) }
									value={ buttonFontWeight }
									onChange={ ( val ) =>
										setAttributes( {
											buttonFontWeight: val,
										} )
									}
									min={ 400 }
									max={ 900 }
									step={ 100 }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ isRecommended && ribbonText && (
					<div
						className="ribbon"
						style={ {
							position: 'absolute',
							top: 15,
							right: -30,
							background: '#f48b2a',
							color: '#fff',
							padding: '5px 40px',
							fontSize: '0.75rem',
							fontWeight: 700,
							transform: 'rotate(45deg)',
							textTransform: 'uppercase',
						} }
					>
						{ ribbonText }
					</div>
				) }
				<div
					className="pkg-header"
					style={ {
						padding: 30,
						textAlign: 'center',
						borderBottom: '1px solid #eee',
						background: 'linear-gradient(to bottom, #fff, #fcfcfc)',
					} }
				>
					<RichText
						tagName="h3"
						className="pkg-name"
						value={ packageName }
						onChange={ ( val ) =>
							setAttributes( { packageName: val } )
						}
						placeholder={ __( 'Package name...', 'twork-builder' ) }
						style={ {
							fontSize: `${ packageNameFontSize }rem`,
							fontWeight: packageNameFontWeight,
							color: packageNameColor,
							margin: '0 0 10px',
							textTransform: 'uppercase',
							letterSpacing: '0.5px',
						} }
					/>

					<div
						className="pkg-price"
						style={ {
							color: priceColor,
							display: 'flex',
							alignItems: 'flex-start',
							justifyContent: 'center',
							lineHeight: 1,
						} }
					>
						<span
							className="currency"
							style={ {
								fontSize: '1rem',
								marginTop: 5,
								marginRight: 2,
								fontWeight: 700,
							} }
						>
							{ currency }
						</span>
						<span
							className="amount"
							style={ {
								fontSize: `${ amountFontSize }rem`,
								fontWeight: 800,
							} }
						>
							{ amount }
						</span>
					</div>
					<RichText
						tagName="p"
						className="pkg-desc"
						value={ description }
						onChange={ ( val ) =>
							setAttributes( { description: val } )
						}
						placeholder={ __(
							'Short description...',
							'twork-builder'
						) }
						style={ {
							fontSize: `${ descriptionFontSize }rem`,
							color: descriptionColor,
							marginTop: 10,
						} }
					/>
				</div>
				<div
					className="pkg-body"
					style={ { padding: 30, flexGrow: 1 } }
				>
					<ul
						className="pkg-features"
						style={ { listStyle: 'none', padding: 0, margin: 0 } }
					>
						{ features.map( ( feat, index ) => (
							<li
								key={ index }
								className={
									feat.available ? '' : 'unavailable'
								}
								style={ {
									display: 'flex',
									alignItems: 'flex-start',
									marginBottom: 15,
									fontSize: `${ featureFontSize }rem`,
									color: feat.available
										? featureTextColor
										: featureUnavailableColor,
									textDecoration: feat.available
										? 'none'
										: 'line-through',
								} }
							>
								<i
									className={
										feat.available
											? 'fas fa-check-circle'
											: 'fas fa-times-circle'
									}
									style={ {
										color: feat.available
											? featureIconColor
											: '#ccc',
										marginRight: 12,
										marginTop: 4,
										fontSize: '1rem',
										flexShrink: 0,
									} }
									aria-hidden
								/>

								<span>{ feat.text }</span>
							</li>
						) ) }
					</ul>
				</div>
				{ showButton && (
					<div
						className="pkg-footer"
						style={ {
							padding: '0 30px 30px',
							textAlign: 'center',
						} }
					>
						<a
							href={ buttonUrl }
							className="jivaka-btn"
							style={ {
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: '100%',
								padding: '12px 30px',
								borderRadius: `${ buttonBorderRadius }px`,
								fontWeight: buttonFontWeight,
								fontSize: `${ buttonFontSize }rem`,
								textTransform: 'uppercase',
								letterSpacing: '0.5px',
								backgroundColor:
									buttonStyle === 'primary'
										? '#f48b2a'
										: buttonBgColor,
								color: buttonTextColor,
								border: `2px solid ${
									buttonStyle === 'primary'
										? 'transparent'
										: buttonBorderColor
								}`,

								textDecoration: 'none',
								cursor: 'pointer',
							} }
							target={ buttonTarget ? '_blank' : '_self' }
							rel={ buttonRel }
							onClick={ ( e ) => e.preventDefault() }
						>
							{ buttonText }
						</a>
					</div>
				) }
			</div>
		</>
	);
}
