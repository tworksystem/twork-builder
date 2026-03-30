import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		backgroundImage,
		backgroundImageId,
		tagText,
		title,
		description,
		showSearch,
		searchPlaceholder,
		popularText,
		pill1Text,
		pill1IconClass,
		pill2Text,
		pill2IconClass,
		minHeight,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'ph-hero twork-ph-hero-section',
			style: {
				minHeight: `${ minHeight }px`,
			},
		} ),
		[ minHeight ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Background image', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ ! backgroundImage ? (
							<MediaPlaceholder
								onSelect={ ( media ) =>
									setAttributes( {
										backgroundImage: media.url,
										backgroundImageId: media.id,
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __( 'Hero image', 'twork-builder' ),
								} }
							/>
						) : (
							<div>
								<img
									src={ backgroundImage }
									alt=""
									style={ {
										width: '100%',
										height: 'auto',
										marginBottom: 10,
									} }
								/>

								<button
									type="button"
									className="components-button is-secondary is-small"
									onClick={ () =>
										setAttributes( {
											backgroundImage: '',
											backgroundImageId: null,
										} )
									}
								>
									{ __( 'Remove image', 'twork-builder' ) }
								</button>
							</div>
						) }

						<Divider />

						<RangeControl
							label={ __(
								'Minimum height (px)',
								'twork-builder'
							) }
							value={ minHeight }
							onChange={ ( val ) =>
								setAttributes( { minHeight: val } )
							}
							min={ 400 }
							max={ 800 }
							step={ 20 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Content', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Tag text', 'twork-builder' ) }
							value={ tagText }
							onChange={ ( val ) =>
								setAttributes( { tagText: val } )
							}
							placeholder={ __(
								'Official Hospital Pharmacy',
								'twork-builder'
							) }
						/>

						<Divider />

						<ToggleControl
							label={ __( 'Show search box', 'twork-builder' ) }
							checked={ showSearch }
							onChange={ ( val ) =>
								setAttributes( { showSearch: val } )
							}
						/>

						{ showSearch && (
							<>
								<TextControl
									label={ __(
										'Search placeholder',
										'twork-builder'
									) }
									value={ searchPlaceholder }
									onChange={ ( val ) =>
										setAttributes( {
											searchPlaceholder: val,
										} )
									}
								/>

								<TextControl
									label={ __(
										'Popular text',
										'twork-builder'
									) }
									help={ __(
										'Short helper text under the search bar.',
										'twork-builder'
									) }
									value={ popularText }
									onChange={ ( val ) =>
										setAttributes( { popularText: val } )
									}
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Floating pills', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Pill 1 text', 'twork-builder' ) }
							value={ pill1Text }
							onChange={ ( val ) =>
								setAttributes( { pill1Text: val } )
							}
						/>

						<TextControl
							label={ __( 'Pill 1 icon class', 'twork-builder' ) }
							help={ __(
								'Font Awesome class, e.g. "fas fa-shipping-fast".',
								'twork-builder'
							) }
							value={ pill1IconClass }
							onChange={ ( val ) =>
								setAttributes( { pill1IconClass: val } )
							}
						/>

						<Divider />

						<TextControl
							label={ __( 'Pill 2 text', 'twork-builder' ) }
							value={ pill2Text }
							onChange={ ( val ) =>
								setAttributes( { pill2Text: val } )
							}
						/>

						<TextControl
							label={ __( 'Pill 2 icon class', 'twork-builder' ) }
							help={ __(
								'Font Awesome class, e.g. "fas fa-shield-alt".',
								'twork-builder'
							) }
							value={ pill2IconClass }
							onChange={ ( val ) =>
								setAttributes( { pill2IconClass: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div className="ph-container">
					<div className="ph-hero-grid">
						<div className="ph-hero-text fade-up">
							{ tagText && (
								<span className="ph-hero-tag">
									<i
										className="fas fa-check-circle"
										aria-hidden="true"
									/>{ ' ' }
									{ tagText }
								</span>
							) }

							<RichText
								tagName="h1"
								value={ title }
								onChange={ ( val ) =>
									setAttributes( { title: val } )
								}
								placeholder={ __(
									'Authentic Medicine,\nDelivered to You.',
									'twork-builder'
								) }
							/>

							<RichText
								tagName="p"
								value={ description }
								onChange={ ( val ) =>
									setAttributes( { description: val } )
								}
								placeholder={ __(
									"Order prescriptions, OTC medicines, and wellness products from Jivaka Hospital's trusted inventory. 100% genuine and safe.",
									'twork-builder'
								) }
							/>

							{ showSearch && (
								<>
									<div className="ph-search-box">
										<input
											type="text"
											className="ph-search-input"
											placeholder={ searchPlaceholder }
											readOnly
										/>

										<button
											className="ph-search-btn"
											type="button"
											onClick={ ( e ) =>
												e.preventDefault()
											}
										>
											<i
												className="fas fa-search"
												aria-hidden="true"
											/>
										</button>
									</div>
									{ popularText && (
										<p className="ph-popular-text">
											{ popularText }
										</p>
									) }
								</>
							) }
						</div>

						<div className="ph-hero-img-wrap fade-up">
							{ backgroundImage && (
								<img
									src={ backgroundImage }
									alt=""
									className="ph-hero-img"
								/>
							) }

							{ ( pill1Text || pill1IconClass ) && (
								<div className="floating-pill fp-1">
									{ pill1IconClass && (
										<i
											className={ pill1IconClass }
											aria-hidden="true"
										/>
									) }
									{ pill1Text && <span>{ pill1Text }</span> }
								</div>
							) }

							{ ( pill2Text || pill2IconClass ) && (
								<div className="floating-pill fp-2">
									{ pill2IconClass && (
										<i
											className={ pill2IconClass }
											aria-hidden="true"
										/>
									) }
									{ pill2Text && <span>{ pill2Text }</span> }
								</div>
							) }
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
