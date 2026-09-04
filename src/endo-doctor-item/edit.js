import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	Button,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showItem,
		showPhoto,
		imageUrl,
		imageId,
		imageAlt,
		showTag,
		tagText,
		showSocial,
		showBookLink,
		bookUrl,
		bookAriaLabel,
		showProfileLink,
		profileUrl,
		profileAriaLabel,
		showName,
		name,
		showRole,
		role,
		showExperience,
		experienceText,
		showLanguages,
		languagesText,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'doc mk-endo-doctor-item',
		} ),
		[]
	);

	if ( showItem === false ) {
		return null;
	}

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Doctor Card', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Card', 'twork-builder' ) }
							checked={ showItem !== false }
							onChange={ ( value ) =>
								setAttributes( { showItem: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Photo', 'twork-builder' ) }
							checked={ showPhoto !== false }
							onChange={ ( value ) =>
								setAttributes( { showPhoto: value } )
							}
						/>
						{ showPhoto !== false && (
							<>
								<TextControl
									label={ __( 'Image Alt', 'twork-builder' ) }
									value={ imageAlt }
									onChange={ ( value ) =>
										setAttributes( { imageAlt: value } )
									}
								/>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ ( media ) =>
											setAttributes( {
												imageUrl: media.url,
												imageId: media.id,
												imageAlt: media.alt || imageAlt,
											} )
										}
										allowedTypes={ [ 'image' ] }
										value={ imageId }
										render={ ( { open } ) => (
											<div style={ { marginTop: 8 } }>
												{ imageUrl ? (
													<img
														src={ imageUrl }
														alt=""
														style={ {
															width: '100%',
															maxHeight: 140,
															objectFit: 'cover',
															marginBottom: 8,
															borderRadius: 8,
														} }
													/>
												) : null }
												<Button
													variant="secondary"
													onClick={ open }
												>
													{ imageUrl
														? __(
																'Replace Photo',
																'twork-builder'
														  )
														: __(
																'Upload Photo',
																'twork-builder'
														  ) }
												</Button>
											</div>
										) }
									/>
								</MediaUploadCheck>
							</>
						) }
						<ToggleControl
							label={ __( 'Show Tag', 'twork-builder' ) }
							checked={ showTag !== false }
							onChange={ ( value ) =>
								setAttributes( { showTag: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Social', 'twork-builder' ) }
							checked={ showSocial !== false }
							onChange={ ( value ) =>
								setAttributes( { showSocial: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Name', 'twork-builder' ) }
							checked={ showName !== false }
							onChange={ ( value ) =>
								setAttributes( { showName: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Role', 'twork-builder' ) }
							checked={ showRole !== false }
							onChange={ ( value ) =>
								setAttributes( { showRole: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Experience', 'twork-builder' ) }
							checked={ showExperience !== false }
							onChange={ ( value ) =>
								setAttributes( { showExperience: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Languages', 'twork-builder' ) }
							checked={ showLanguages !== false }
							onChange={ ( value ) =>
								setAttributes( { showLanguages: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				{ showPhoto !== false && (
					<div className="doc-photo">
						{ imageUrl ? (
							<img src={ imageUrl } alt={ imageAlt || name } />
						) : (
							<div
								className="doc-photo-placeholder"
								style={ {
									height: 200,
									background: '#eee',
								} }
							/>
						) }
						{ showTag !== false && (
							<RichText
								tagName="span"
								className="doc-tag"
								value={ tagText }
								onChange={ ( value ) =>
									setAttributes( { tagText: value } )
								}
								placeholder={ __( 'Tag', 'twork-builder' ) }
								withoutInteractiveFormatting
							/>
						) }
						{ showSocial !== false && (
							<div className="doc-social">
								{ showBookLink !== false && (
									<a
										href={ bookUrl || '#book' }
										aria-label={ bookAriaLabel }
									>
										<i
											className="fas fa-calendar-check"
											aria-hidden="true"
										/>
									</a>
								) }
								{ showProfileLink !== false && (
									<a
										href={ profileUrl || '#' }
										aria-label={ profileAriaLabel }
									>
										<i
											className="fas fa-user"
											aria-hidden="true"
										/>
									</a>
								) }
							</div>
						) }
					</div>
				) }
				<div className="doc-body">
					{ showName !== false && (
						<RichText
							tagName="h3"
							value={ name }
							onChange={ ( value ) =>
								setAttributes( { name: value } )
							}
							placeholder={ __( 'Doctor name', 'twork-builder' ) }
						/>
					) }
					{ showRole !== false && (
						<RichText
							tagName="span"
							className="doc-role"
							value={ role }
							onChange={ ( value ) =>
								setAttributes( { role: value } )
							}
							placeholder={ __( 'Role', 'twork-builder' ) }
							withoutInteractiveFormatting
						/>
					) }
					{ ( showExperience !== false ||
						showLanguages !== false ) && (
						<div className="doc-meta">
							{ showExperience !== false && (
								<span>
									<i
										className="fas fa-briefcase-medical"
										aria-hidden="true"
									/>
									<RichText
										tagName="span"
										value={ experienceText }
										onChange={ ( value ) =>
											setAttributes( {
												experienceText: value,
											} )
										}
										placeholder={ __(
											'18 yrs',
											'twork-builder'
										) }
										withoutInteractiveFormatting
									/>
								</span>
							) }
							{ showLanguages !== false && (
								<span>
									<i
										className="fas fa-language"
										aria-hidden="true"
									/>
									<RichText
										tagName="span"
										value={ languagesText }
										onChange={ ( value ) =>
											setAttributes( {
												languagesText: value,
											} )
										}
										placeholder={ __(
											'MM / EN',
											'twork-builder'
										) }
										withoutInteractiveFormatting
									/>
								</span>
							) }
						</div>
					) }
				</div>
			</article>
		</>
	);
}
