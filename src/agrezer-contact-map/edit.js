import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	RangeControl,
	BaseControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionTitle,
		formAction,
		formMethod,
		namePlaceholder,
		phonePlaceholder,
		emailPlaceholder,
		subjectPlaceholder,
		messagePlaceholder,
		submitButtonText,
		mapEmbedUrl,
		mapIframeTitle,
		sectionBackgroundColor,
		containerBackgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerBorderRadius,
		mapMinHeightDesktop,
		mapMinHeightTablet,
		mapMinHeightMobile,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-contact-map-editor',
			style: {
				backgroundColor: sectionBackgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--twork-contact-map-container-bg': containerBackgroundColor,
				'--twork-contact-map-radius': `${ containerBorderRadius }px`,
				'--twork-map-min-h': `${ mapMinHeightDesktop }px`,
				'--twork-map-min-h-md': `${ mapMinHeightTablet }px`,
				'--twork-map-min-h-sm': `${ mapMinHeightMobile }px`,
			},
		} ),
		[
			containerBackgroundColor,
			containerBorderRadius,
			mapMinHeightDesktop,
			mapMinHeightMobile,
			mapMinHeightTablet,
			paddingBottom,
			paddingTop,
			sectionBackgroundColor,
		]
	);

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
		margin: '0 auto',
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Form', 'twork-builder' ) }
						initialOpen
					>
						<TextControl
							label={ __( 'Form action URL', 'twork-builder' ) }
							value={ formAction }
							onChange={ ( v ) =>
								setAttributes( { formAction: v } )
							}
							help={ __(
								'Endpoint to receive submissions (e.g. Contact Form 7, admin-ajax, or custom REST). Leave empty to use #.',
								'twork-builder'
							) }
						/>

						<SelectControl
							label={ __( 'HTTP method', 'twork-builder' ) }
							value={ formMethod }
							options={ [
								{ label: 'POST', value: 'post' },
								{ label: 'GET', value: 'get' },
							] }
							onChange={ ( v ) =>
								setAttributes( { formMethod: v } )
							}
						/>

						<TextControl
							label={ __(
								'Name field placeholder',
								'twork-builder'
							) }
							value={ namePlaceholder }
							onChange={ ( v ) =>
								setAttributes( { namePlaceholder: v } )
							}
						/>

						<TextControl
							label={ __( 'Phone placeholder', 'twork-builder' ) }
							value={ phonePlaceholder }
							onChange={ ( v ) =>
								setAttributes( { phonePlaceholder: v } )
							}
						/>

						<TextControl
							label={ __( 'Email placeholder', 'twork-builder' ) }
							value={ emailPlaceholder }
							onChange={ ( v ) =>
								setAttributes( { emailPlaceholder: v } )
							}
						/>

						<TextControl
							label={ __(
								'Subject placeholder',
								'twork-builder'
							) }
							value={ subjectPlaceholder }
							onChange={ ( v ) =>
								setAttributes( { subjectPlaceholder: v } )
							}
						/>

						<TextControl
							label={ __(
								'Message placeholder',
								'twork-builder'
							) }
							value={ messagePlaceholder }
							onChange={ ( v ) =>
								setAttributes( { messagePlaceholder: v } )
							}
						/>

						<TextControl
							label={ __(
								'Submit button text',
								'twork-builder'
							) }
							value={ submitButtonText }
							onChange={ ( v ) =>
								setAttributes( { submitButtonText: v } )
							}
						/>
					</PanelBody>
					<PanelBody title={ __( 'Map', 'twork-builder' ) }>
						<TextControl
							label={ __( 'Embed URL (https)', 'twork-builder' ) }
							value={ mapEmbedUrl }
							onChange={ ( v ) =>
								setAttributes( { mapEmbedUrl: v } )
							}
							help={ __(
								'Google Maps embed or any https iframe URL.',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __(
								'Iframe title (accessibility)',
								'twork-builder'
							) }
							value={ mapIframeTitle }
							onChange={ ( v ) =>
								setAttributes( { mapIframeTitle: v } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Layout & colors', 'twork-builder' ) }
					>
						<RangeControl
							label={ __( 'Padding top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( v ) =>
								setAttributes( { paddingTop: v } )
							}
							min={ 0 }
							max={ 120 }
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
							min={ 40 }
							max={ 160 }
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
							min={ 800 }
							max={ 1400 }
							step={ 10 }
						/>

						<RangeControl
							label={ __(
								'Container corner radius (px)',
								'twork-builder'
							) }
							value={ containerBorderRadius }
							onChange={ ( v ) =>
								setAttributes( { containerBorderRadius: v } )
							}
							min={ 0 }
							max={ 32 }
						/>

						<BaseControl
							label={ __(
								'Section background',
								'twork-builder'
							) }
						>
							<input
								type="color"
								value={ sectionBackgroundColor }
								onChange={ ( e ) =>
									setAttributes( {
										sectionBackgroundColor: e.target.value,
									} )
								}
							/>
						</BaseControl>
						<BaseControl
							label={ __(
								'Card / form area background',
								'twork-builder'
							) }
						>
							<input
								type="color"
								value={ containerBackgroundColor }
								onChange={ ( e ) =>
									setAttributes( {
										containerBackgroundColor:
											e.target.value,
									} )
								}
							/>
						</BaseControl>
						<RangeControl
							label={ __(
								'Map min height — desktop (px)',
								'twork-builder'
							) }
							value={ mapMinHeightDesktop }
							onChange={ ( v ) =>
								setAttributes( { mapMinHeightDesktop: v } )
							}
							min={ 280 }
							max={ 720 }
						/>

						<RangeControl
							label={ __(
								'Map min height — tablet (px)',
								'twork-builder'
							) }
							value={ mapMinHeightTablet }
							onChange={ ( v ) =>
								setAttributes( { mapMinHeightTablet: v } )
							}
							min={ 240 }
							max={ 600 }
						/>

						<RangeControl
							label={ __(
								'Map min height — mobile (px)',
								'twork-builder'
							) }
							value={ mapMinHeightMobile }
							onChange={ ( v ) =>
								setAttributes( { mapMinHeightMobile: v } )
							}
							min={ 200 }
							max={ 480 }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<section { ...blockProps }>
				<div
					className="twork-contact-map__container"
					style={ containerStyle }
				>
					<div className="twork-contact-map__form-wrap">
						<RichText
							tagName="h2"
							className="twork-contact-map__title"
							value={ sectionTitle }
							onChange={ ( v ) =>
								setAttributes( { sectionTitle: v } )
							}
							placeholder={ __(
								'Section heading…',
								'twork-builder'
							) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>

						<form
							className="twork-contact-map__form"
							onSubmit={ ( e ) => e.preventDefault() }
						>
							<input
								type="text"
								name="name"
								placeholder={ namePlaceholder }
								className="twork-contact-map__input"
								readOnly
								tabIndex={ -1 }
								aria-hidden="true"
							/>

							<input
								type="tel"
								name="phone"
								placeholder={ phonePlaceholder }
								className="twork-contact-map__input"
								readOnly
								tabIndex={ -1 }
								aria-hidden="true"
							/>

							<input
								type="email"
								name="email"
								placeholder={ emailPlaceholder }
								className="twork-contact-map__input"
								readOnly
								tabIndex={ -1 }
								aria-hidden="true"
							/>

							<input
								type="text"
								name="subject"
								placeholder={ subjectPlaceholder }
								className="twork-contact-map__input"
								readOnly
								tabIndex={ -1 }
								aria-hidden="true"
							/>

							<textarea
								name="message"
								placeholder={ messagePlaceholder }
								className="twork-contact-map__textarea"
								rows={ 5 }
								readOnly
								tabIndex={ -1 }
								aria-hidden="true"
							/>

							<button
								type="button"
								className="twork-contact-map__button"
							>
								{ submitButtonText }
							</button>
						</form>
					</div>
					<div className="twork-contact-map__map-wrap">
						{ mapEmbedUrl &&
						/^https?:\/\//i.test( mapEmbedUrl.trim() ) ? (
							<iframe
								className="twork-contact-map__iframe"
								title={
									mapIframeTitle ||
									__( 'Map', 'twork-builder' )
								}
								src={ mapEmbedUrl.trim() }
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							/>
						) : (
							<div className="twork-contact-map__map-placeholder twork-contact-map__map-placeholder--editor">
								<p>
									{ __(
										'Add a map embed URL in the sidebar.',
										'twork-builder'
									) }
								</p>
							</div>
						) }
					</div>
				</div>
			</section>
		</>
	);
}
