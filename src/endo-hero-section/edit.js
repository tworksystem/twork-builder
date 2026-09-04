import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	RangeControl,
	Button,
} from '@wordpress/components';
import {
	EndoIconPicker,
	EndoFlexibleIcon,
	eyebrowIconKeys,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

const EYEBROW_KEYS = eyebrowIconKeys();

const ALLOWED_BLOCKS = [ 'twork/endo-hero-float-card' ];
const TEMPLATE = [
	[
		'twork/endo-hero-float-card',
		{
			positionSlot: 'fc-1',
			iconClass: 'fas fa-bed-pulse',
			title: 'Painless',
			subtitle: 'Sedation by consultants',
		},
	],
	[
		'twork/endo-hero-float-card',
		{
			positionSlot: 'fc-2',
			iconClass: 'fas fa-file-waveform',
			iconBgColor: '#f8f9fa',
			iconColor: '#212121',
			title: '30 min',
			subtitle: 'Report turnaround',
		},
	],
	[
		'twork/endo-hero-float-card',
		{
			positionSlot: 'fc-3',
			iconClass: 'fas fa-shield-heart',
			title: 'Same day',
			subtitle: 'Home in 2 hours',
		},
	],
];

function ProofAvatarRow( { avatars, onChange } ) {
	const list = Array.isArray( avatars ) ? avatars : [];

	function updateAvatar( index, patch ) {
		const next = list.map( ( item, i ) =>
			i === index ? { ...item, ...patch } : item
		);
		onChange( next );
	}

	return (
		<div style={ { marginTop: '12px' } }>
			<strong>{ __( 'Proof Avatars', 'twork-builder' ) }</strong>
			{ list.map( ( avatar, index ) => (
				<div
					key={ `proof-avatar-${ index }` }
					style={ {
						marginTop: '12px',
						padding: '12px',
						border: '1px solid #ddd',
						borderRadius: '6px',
					} }
				>
					<ToggleControl
						label={ __( 'Show Avatar', 'twork-builder' ) }
						checked={ avatar.showAvatar !== false }
						onChange={ ( value ) =>
							updateAvatar( index, { showAvatar: value } )
						}
					/>
					{ avatar.showAvatar !== false && (
						<>
							<TextControl
								label={ __( 'Alt Text', 'twork-builder' ) }
								value={ avatar.alt || '' }
								onChange={ ( value ) =>
									updateAvatar( index, { alt: value } )
								}
							/>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) =>
										updateAvatar( index, {
											url: media.url,
											id: media.id,
											alt: media.alt || avatar.alt,
										} )
									}
									allowedTypes={ [ 'image' ] }
									value={ avatar.id }
									render={ ( { open } ) => (
										<div style={ { marginTop: '8px' } }>
											{ avatar.url ? (
												<img
													src={ avatar.url }
													alt=""
													style={ {
														width: '42px',
														height: '42px',
														borderRadius: '50%',
														objectFit: 'cover',
														marginBottom: '8px',
													} }
												/>
											) : null }
											<Button
												variant="secondary"
												onClick={ open }
											>
												{ avatar.url
													? __(
															'Replace Avatar',
															'twork-builder'
													  )
													: __(
															'Upload Avatar',
															'twork-builder'
													  ) }
											</Button>
											{ avatar.url ? (
												<Button
													variant="link"
													isDestructive
													onClick={ () =>
														updateAvatar( index, {
															url: '',
															id: 0,
														} )
													}
												>
													{ __(
														'Remove',
														'twork-builder'
													) }
												</Button>
											) : null }
										</div>
									) }
								/>
							</MediaUploadCheck>
						</>
					) }
				</div>
			) ) }
		</div>
	);
}

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showSection,
		sectionId,
		showAurora,
		showEyebrow,
		eyebrowText,
		showTitle,
		titleLine1,
		titleLine2,
		titleLine3,
		titleLine3Highlight,
		showLead,
		leadText,
		showPrimaryCta,
		primaryCtaText,
		primaryCtaUrl,
		showSecondaryCta,
		secondaryCtaText,
		secondaryCtaUrl,
		showProof,
		proofAvatars,
		proofRatingText,
		proofSubtext,
		showStars,
		showVisual,
		heroImageUrl,
		heroImageId,
		heroImageAlt,
		showScanBeam,
		containerMaxWidth,
		paddingTop,
		paddingBottom,
		animationOnScroll,
		respectReducedMotion,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-endo-hero-section mk-endo-hero-section hero',
			id: sectionId || undefined,
			style: {
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ sectionId, paddingTop, paddingBottom ]
	);

	if ( showSection === false ) {
		return null;
	}

	const containerStyle = {
		maxWidth: `${ containerMaxWidth }px`,
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Section', 'twork-builder' ) }
							checked={ showSection !== false }
							onChange={ ( value ) =>
								setAttributes( { showSection: value } )
							}
						/>
						<TextControl
							label={ __(
								'Section ID (anchor)',
								'twork-builder'
							) }
							value={ sectionId }
							onChange={ ( value ) =>
								setAttributes( { sectionId: value } )
							}
						/>
						<ToggleControl
							label={ __(
								'Show Aurora Background',
								'twork-builder'
							) }
							checked={ showAurora !== false }
							onChange={ ( value ) =>
								setAttributes( { showAurora: value } )
							}
						/>
						<RangeControl
							label={ __( 'Padding Top (px)', 'twork-builder' ) }
							value={ paddingTop }
							onChange={ ( value ) =>
								setAttributes( { paddingTop: value } )
							}
							min={ 40 }
							max={ 160 }
							step={ 5 }
						/>
						<RangeControl
							label={ __(
								'Padding Bottom (px)',
								'twork-builder'
							) }
							value={ paddingBottom }
							onChange={ ( value ) =>
								setAttributes( { paddingBottom: value } )
							}
							min={ 60 }
							max={ 200 }
							step={ 5 }
						/>
						<RangeControl
							label={ __(
								'Container Max Width (px)',
								'twork-builder'
							) }
							value={ containerMaxWidth }
							onChange={ ( value ) =>
								setAttributes( { containerMaxWidth: value } )
							}
							min={ 900 }
							max={ 1400 }
							step={ 20 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Content', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Eyebrow', 'twork-builder' ) }
							checked={ showEyebrow !== false }
							onChange={ ( value ) =>
								setAttributes( { showEyebrow: value } )
							}
						/>
						{ showEyebrow !== false && (
							<EndoIconPicker
								label={ __( 'Eyebrow icon', 'twork-builder' ) }
								attributes={ attributes }
								setAttributes={ setAttributes }
								keys={ EYEBROW_KEYS }
							/>
						) }
						<ToggleControl
							label={ __( 'Show Title', 'twork-builder' ) }
							checked={ showTitle !== false }
							onChange={ ( value ) =>
								setAttributes( { showTitle: value } )
							}
						/>
						{ showTitle !== false && (
							<ToggleControl
								label={ __(
									'Highlight Last Title Line',
									'twork-builder'
								) }
								checked={ titleLine3Highlight !== false }
								onChange={ ( value ) =>
									setAttributes( {
										titleLine3Highlight: value,
									} )
								}
							/>
						) }
						<ToggleControl
							label={ __( 'Show Lead', 'twork-builder' ) }
							checked={ showLead !== false }
							onChange={ ( value ) =>
								setAttributes( { showLead: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Primary CTA', 'twork-builder' ) }
							checked={ showPrimaryCta !== false }
							onChange={ ( value ) =>
								setAttributes( { showPrimaryCta: value } )
							}
						/>
						{ showPrimaryCta !== false && (
							<TextControl
								label={ __(
									'Primary CTA URL',
									'twork-builder'
								) }
								value={ primaryCtaUrl }
								onChange={ ( value ) =>
									setAttributes( { primaryCtaUrl: value } )
								}
							/>
						) }
						<ToggleControl
							label={ __(
								'Show Secondary CTA',
								'twork-builder'
							) }
							checked={ showSecondaryCta !== false }
							onChange={ ( value ) =>
								setAttributes( { showSecondaryCta: value } )
							}
						/>
						{ showSecondaryCta !== false && (
							<TextControl
								label={ __(
									'Secondary CTA URL',
									'twork-builder'
								) }
								value={ secondaryCtaUrl }
								onChange={ ( value ) =>
									setAttributes( { secondaryCtaUrl: value } )
								}
							/>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Social Proof', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Proof Strip', 'twork-builder' ) }
							checked={ showProof !== false }
							onChange={ ( value ) =>
								setAttributes( { showProof: value } )
							}
						/>
						{ showProof !== false && (
							<>
								<ToggleControl
									label={ __(
										'Show Stars',
										'twork-builder'
									) }
									checked={ showStars !== false }
									onChange={ ( value ) =>
										setAttributes( { showStars: value } )
									}
								/>
								<ProofAvatarRow
									avatars={ proofAvatars }
									onChange={ ( value ) =>
										setAttributes( { proofAvatars: value } )
									}
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Hero Visual', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Show Visual Column',
								'twork-builder'
							) }
							checked={ showVisual !== false }
							onChange={ ( value ) =>
								setAttributes( { showVisual: value } )
							}
						/>
						{ showVisual !== false && (
							<>
								<ToggleControl
									label={ __(
										'Show Scan Beam',
										'twork-builder'
									) }
									checked={ showScanBeam !== false }
									onChange={ ( value ) =>
										setAttributes( { showScanBeam: value } )
									}
								/>
								<TextControl
									label={ __(
										'Image Alt Text',
										'twork-builder'
									) }
									value={ heroImageAlt }
									onChange={ ( value ) =>
										setAttributes( { heroImageAlt: value } )
									}
								/>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ ( media ) =>
											setAttributes( {
												heroImageUrl: media.url,
												heroImageId: media.id,
												heroImageAlt:
													media.alt || heroImageAlt,
											} )
										}
										allowedTypes={ [ 'image' ] }
										value={ heroImageId }
										render={ ( { open } ) => (
											<div
												style={ { marginTop: '12px' } }
											>
												{ heroImageUrl ? (
													<img
														src={ heroImageUrl }
														alt={ heroImageAlt }
														style={ {
															width: '100%',
															maxHeight: '200px',
															objectFit: 'cover',
															marginBottom:
																'12px',
															borderRadius:
																'12px',
														} }
													/>
												) : null }
												<Button
													variant="secondary"
													onClick={ open }
												>
													{ heroImageUrl
														? __(
																'Replace Hero Image',
																'twork-builder'
														  )
														: __(
																'Upload Hero Image',
																'twork-builder'
														  ) }
												</Button>
												{ heroImageUrl ? (
													<Button
														variant="link"
														isDestructive
														onClick={ () =>
															setAttributes( {
																heroImageUrl:
																	'',
																heroImageId:
																	undefined,
															} )
														}
													>
														{ __(
															'Remove Image',
															'twork-builder'
														) }
													</Button>
												) : null }
											</div>
										) }
									/>
								</MediaUploadCheck>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Motion', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __(
								'Scroll Reveal Animation',
								'twork-builder'
							) }
							checked={ animationOnScroll !== false }
							onChange={ ( value ) =>
								setAttributes( { animationOnScroll: value } )
							}
						/>
						<ToggleControl
							label={ __(
								'Respect Reduced Motion',
								'twork-builder'
							) }
							checked={ respectReducedMotion !== false }
							onChange={ ( value ) =>
								setAttributes( { respectReducedMotion: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<header { ...blockProps }>
				{ showAurora !== false && (
					<>
						<div className="aurora aurora-1" aria-hidden="true" />
						<div className="aurora aurora-2" aria-hidden="true" />
					</>
				) }
				<div className="endo-container" style={ containerStyle }>
					<div className="hero-grid">
						<div
							className={
								animationOnScroll
									? 'hero-content reveal'
									: 'hero-content'
							}
						>
							{ showEyebrow !== false && (
								<span className="eyebrow">
									{ hasIconValue(
										mapIconAttrs( attributes, EYEBROW_KEYS )
									) && (
										<EndoFlexibleIcon
											attributes={ attributes }
											keys={ EYEBROW_KEYS }
										/>
									) }
									<RichText
										tagName="span"
										value={ eyebrowText }
										onChange={ ( value ) =>
											setAttributes( {
												eyebrowText: value,
											} )
										}
										placeholder={ __(
											'Eyebrow',
											'twork-builder'
										) }
										withoutInteractiveFormatting
									/>
								</span>
							) }
							{ showTitle !== false && (
								<h1>
									<RichText
										tagName="span"
										value={ titleLine1 }
										onChange={ ( value ) =>
											setAttributes( {
												titleLine1: value,
											} )
										}
										placeholder={ __(
											'Title line 1',
											'twork-builder'
										) }
										withoutInteractiveFormatting
									/>
									<br />
									<RichText
										tagName="span"
										value={ titleLine2 }
										onChange={ ( value ) =>
											setAttributes( {
												titleLine2: value,
											} )
										}
										placeholder={ __(
											'Title line 2',
											'twork-builder'
										) }
										withoutInteractiveFormatting
									/>
									<br />
									{ titleLine3 &&
										( titleLine3Highlight ? (
											<span className="hero-title-highlight">
												<RichText
													tagName="span"
													value={ titleLine3 }
													onChange={ ( value ) =>
														setAttributes( {
															titleLine3: value,
														} )
													}
													placeholder={ __(
														'Title line 3',
														'twork-builder'
													) }
													withoutInteractiveFormatting
												/>
											</span>
										) : (
											<RichText
												tagName="span"
												value={ titleLine3 }
												onChange={ ( value ) =>
													setAttributes( {
														titleLine3: value,
													} )
												}
												placeholder={ __(
													'Title line 3',
													'twork-builder'
												) }
												withoutInteractiveFormatting
											/>
										) ) }
								</h1>
							) }
							{ showLead !== false && (
								<RichText
									tagName="p"
									className="hero-lead"
									value={ leadText }
									onChange={ ( value ) =>
										setAttributes( { leadText: value } )
									}
									placeholder={ __(
										'Lead paragraph',
										'twork-builder'
									) }
								/>
							) }
							<div className="hero-actions">
								{ showPrimaryCta !== false && (
									<span className="btn btn-primary">
										<RichText
											tagName="span"
											value={ primaryCtaText }
											onChange={ ( value ) =>
												setAttributes( {
													primaryCtaText: value,
												} )
											}
											placeholder={ __(
												'Primary CTA',
												'twork-builder'
											) }
											withoutInteractiveFormatting
										/>
										<i
											className="fas fa-arrow-right"
											aria-hidden="true"
										/>
									</span>
								) }
								{ showSecondaryCta !== false && (
									<span className="btn btn-ghost">
										<RichText
											tagName="span"
											value={ secondaryCtaText }
											onChange={ ( value ) =>
												setAttributes( {
													secondaryCtaText: value,
												} )
											}
											placeholder={ __(
												'Secondary CTA',
												'twork-builder'
											) }
											withoutInteractiveFormatting
										/>
									</span>
								) }
							</div>
							{ showProof !== false && (
								<div className="hero-proof">
									<div className="avatars">
										{ ( proofAvatars || [] )
											.filter(
												( a ) =>
													a.showAvatar !== false &&
													a.url
											)
											.map( ( avatar, index ) => (
												<img
													key={ `avatar-${ index }` }
													src={ avatar.url }
													alt={ avatar.alt || '' }
													loading="lazy"
												/>
											) ) }
									</div>
									<div className="proof-text">
										<strong>
											<RichText
												tagName="span"
												value={ proofRatingText }
												onChange={ ( value ) =>
													setAttributes( {
														proofRatingText: value,
													} )
												}
												withoutInteractiveFormatting
											/>
											{ showStars !== false && (
												<span className="stars">
													<i
														className="fas fa-star"
														aria-hidden="true"
													/>
													<i
														className="fas fa-star"
														aria-hidden="true"
													/>
													<i
														className="fas fa-star"
														aria-hidden="true"
													/>
													<i
														className="fas fa-star"
														aria-hidden="true"
													/>
													<i
														className="fas fa-star"
														aria-hidden="true"
													/>
												</span>
											) }
										</strong>
										<RichText
											tagName="span"
											value={ proofSubtext }
											onChange={ ( value ) =>
												setAttributes( {
													proofSubtext: value,
												} )
											}
											withoutInteractiveFormatting
										/>
									</div>
								</div>
							) }
						</div>
						{ showVisual !== false && (
							<div
								className={
									animationOnScroll
										? 'hero-visual reveal'
										: 'hero-visual'
								}
							>
								<div className="hero-frame">
									{ showScanBeam !== false && (
										<span
											className="scan-beam"
											aria-hidden="true"
										/>
									) }
									{ heroImageUrl ? (
										<img
											src={ heroImageUrl }
											alt={ heroImageAlt }
										/>
									) : (
										<div
											style={ {
												height: '400px',
												background: '#e8e8e8',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												color: '#666',
											} }
										>
											{ __(
												'Upload hero image',
												'twork-builder'
											) }
										</div>
									) }
								</div>
								<InnerBlocks
									allowedBlocks={ ALLOWED_BLOCKS }
									template={ TEMPLATE }
									templateLock={ false }
								/>
							</div>
						) }
					</div>
				</div>
			</header>
		</>
	);
}
