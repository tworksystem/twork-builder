import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	Button,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		eyebrow,
		title,
		features,
		primaryHref,
		primaryLabel,
		secondaryHref,
		secondaryLabel,
		imageUrl,
		imageAlt,
	} = attributes;
	const blockProps = useStableBlockProps( { className: 'app-promo' } );
	const featuresText = ( features || [] ).join( '\n' );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Section', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Eyebrow', 'twork-builder' ) }
						value={ eyebrow }
						onChange={ ( v ) => setAttributes( { eyebrow: v } ) }
					/>
					<TextareaControl
						label={ __(
							'Features (one per line)',
							'twork-builder'
						) }
						value={ featuresText }
						onChange={ ( v ) =>
							setAttributes( {
								features: v
									.split( '\n' )
									.map( ( line ) => line.trim() )
									.filter( Boolean ),
							} )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'CTA Buttons', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Primary URL', 'twork-builder' ) }
						value={ primaryHref }
						onChange={ ( v ) =>
							setAttributes( { primaryHref: v } )
						}
					/>
					<TextControl
						label={ __( 'Primary label', 'twork-builder' ) }
						value={ primaryLabel }
						onChange={ ( v ) =>
							setAttributes( { primaryLabel: v } )
						}
					/>
					<TextControl
						label={ __( 'Secondary URL', 'twork-builder' ) }
						value={ secondaryHref }
						onChange={ ( v ) =>
							setAttributes( { secondaryHref: v } )
						}
					/>
					<TextControl
						label={ __( 'Secondary label', 'twork-builder' ) }
						value={ secondaryLabel }
						onChange={ ( v ) =>
							setAttributes( { secondaryLabel: v } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Image', 'twork-builder' ) }>
					<TextControl
						label={ __( 'Image alt', 'twork-builder' ) }
						value={ imageAlt }
						onChange={ ( v ) => setAttributes( { imageAlt: v } ) }
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									imageUrl: media.url,
									imageAlt:
										media.alt ||
										imageAlt ||
										media.title ||
										'',
								} )
							}
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<Button onClick={ open } variant="secondary">
									{ imageUrl
										? __( 'Change image', 'twork-builder' )
										: __(
												'Select image',
												'twork-builder'
										  ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>
			<section
				{ ...blockProps }
				data-block="twork/split-promo-section"
				aria-label="Orders and wholesale"
			>
				<div className="app-promo__inner l-section">
					<div className="app-promo__grid">
						<div className="app-promo__visual">
							{ imageUrl ? (
								<img
									src={ imageUrl }
									alt={ imageAlt || '' }
									width="560"
									height="480"
								/>
							) : (
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ ( media ) =>
											setAttributes( {
												imageUrl: media.url,
												imageAlt:
													media.alt ||
													imageAlt ||
													media.title ||
													'',
											} )
										}
										allowedTypes={ [ 'image' ] }
										render={ ( { open } ) => (
											<Button
												onClick={ open }
												variant="secondary"
												style={ {
													display: 'flex',
													width: '100%',
													minHeight: 200,
													alignItems: 'center',
													justifyContent: 'center',
												} }
											>
												{ __(
													'Select image',
													'twork-builder'
												) }
											</Button>
										) }
									/>
								</MediaUploadCheck>
							) }
						</div>
						<div className="app-promo__content">
							{ eyebrow ? (
								<p className="section-head__eyebrow">
									{ eyebrow }
								</p>
							) : null }
							<RichText
								tagName="h2"
								className="section-head__title app-promo__title"
								value={ title }
								onChange={ ( v ) =>
									setAttributes( { title: v } )
								}
								placeholder={ __( 'Title', 'twork-builder' ) }
							/>
							<ul className="app-promo__features">
								{ ( features || [] ).map( ( feature, i ) => (
									<li
										key={ i }
										className="app-promo__feature"
									>
										<span
											className="app-promo__check"
											aria-hidden="true"
										>
											✓
										</span>
										{ feature }
									</li>
								) ) }
							</ul>
							<div className="app-promo__stores">
								{ primaryLabel ? (
									<a
										className="app-promo__store btn btn--dark"
										href={ primaryHref || '#' }
										onClick={ ( e ) => e.preventDefault() }
									>
										{ primaryLabel }
									</a>
								) : null }
								{ secondaryLabel ? (
									<a
										className="app-promo__store btn btn--dark"
										href={ secondaryHref || '#' }
										onClick={ ( e ) => e.preventDefault() }
									>
										{ secondaryLabel }
									</a>
								) : null }
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
