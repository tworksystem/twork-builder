import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	PanelColorSettings,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		ctaTitle,
		ctaDescription,
		ctaButtonText,
		ctaButtonUrl,
		ctaButtonIcon,
		ctaBackgroundStart,
		ctaBackgroundEnd,
		containerMaxWidth,
		containerPadding,
		paddingTop,
		paddingBottom,
		paddingTopMobile,
		paddingBottomMobile,
		animationOnScroll,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-career-cta-section-editor',
			style: {
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ paddingBottom, paddingTop ]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Content', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Button Text', 'twork-builder' ) }
							value={ ctaButtonText }
							onChange={ ( val ) =>
								setAttributes( { ctaButtonText: val } )
							}
						/>

						<TextControl
							label={ __( 'Button URL', 'twork-builder' ) }
							value={ ctaButtonUrl }
							onChange={ ( val ) =>
								setAttributes( { ctaButtonUrl: val } )
							}
							help={ __(
								'e.g. mailto:hr@example.com',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __( 'Button Icon Class', 'twork-builder' ) }
							value={ ctaButtonIcon }
							onChange={ ( val ) =>
								setAttributes( { ctaButtonIcon: val } )
							}
							help={ __(
								'Font Awesome class. Leave empty for no icon.',
								'twork-builder'
							) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Background', 'twork-builder' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Gradient Colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: ctaBackgroundStart,
									onChange: ( val ) =>
										setAttributes( {
											ctaBackgroundStart: val,
										} ),
									label: __(
										'Gradient Start',
										'twork-builder'
									),
								},
								{
									value: ctaBackgroundEnd,
									onChange: ( val ) =>
										setAttributes( {
											ctaBackgroundEnd: val,
										} ),
									label: __(
										'Gradient End',
										'twork-builder'
									),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Layout', 'twork-builder' ) }
						initialOpen={ false }
					>
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
							min={ 16 }
							max={ 60 }
							step={ 5 }
						/>

						<Divider />
						<RangeControl
							label={ __( 'Padding Top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( val ) =>
								setAttributes( { paddingTop: val } )
							}
							min={ 30 }
							max={ 120 }
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
							min={ 30 }
							max={ 120 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Top Mobile (px)',
								'twork-builder'
							) }
							value={ paddingTopMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingTopMobile: val } )
							}
							min={ 24 }
							max={ 80 }
							step={ 5 }
						/>

						<RangeControl
							label={ __(
								'Padding Bottom Mobile (px)',
								'twork-builder'
							) }
							value={ paddingBottomMobile }
							onChange={ ( val ) =>
								setAttributes( { paddingBottomMobile: val } )
							}
							min={ 24 }
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
								'Enable Scroll Animation',
								'twork-builder'
							) }
							checked={ animationOnScroll }
							onChange={ ( val ) =>
								setAttributes( { animationOnScroll: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				<div style={ containerStyle }>
					<div
						className="career-cta fade-up"
						style={ {
							background: `linear-gradient(135deg, ${ ctaBackgroundStart } 0%, ${ ctaBackgroundEnd } 100%)`,
							borderRadius: '12px',
							padding: '60px 40px',
							textAlign: 'center',
							color: '#fff',
							position: 'relative',
							overflow: 'hidden',
						} }
					>
						<RichText
							tagName="h2"
							value={ ctaTitle }
							onChange={ ( val ) =>
								setAttributes( { ctaTitle: val } )
							}
							placeholder={ __(
								'CTA title...',
								'twork-builder'
							) }
							style={ {
								margin: '0 0 15px 0',
								fontSize: '2rem',
								color: '#fff',
							} }
						/>

						<RichText
							tagName="p"
							value={ ctaDescription }
							onChange={ ( val ) =>
								setAttributes( { ctaDescription: val } )
							}
							placeholder={ __(
								'CTA description...',
								'twork-builder'
							) }
							style={ {
								color: 'rgba(255, 255, 255, 0.7)',
								marginBottom: '30px',
								maxWidth: '600px',
								marginLeft: 'auto',
								marginRight: 'auto',
							} }
						/>

						<div contentEditable={ false }>
							<a
								href={ ctaButtonUrl }
								className="jivaka-btn btn-primary career-cta-btn"
								style={ {
									background: '#fff',
									color: 'var(--primary-orange, #f48b2a)',
								} }
							>
								{ ctaButtonIcon && (
									<i
										className={ ctaButtonIcon }
										aria-hidden="true"
										style={ { marginRight: '8px' } }
									/>
								) }
								{ ctaButtonText }
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
