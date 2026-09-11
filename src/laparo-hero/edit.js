import {
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	SectionPanel,
	sectionStyle,
} from '@twork-builder/shared/laparo-legacy-section';

const ALLOWED_BLOCKS = [ 'twork/laparo-hero-card' ];
const TEMPLATE = [
	[ 'twork/laparo-hero-card', {} ],
	[
		'twork/laparo-hero-card',
		{
			icon: 'fas fa-bed',
			title: 'Same or next day',
			caption: 'Discharge for most cases',
			position: 'bottom-right',
		},
	],
	[
		'twork/laparo-hero-card',
		{
			icon: 'fas fa-video',
			title: '4K laparoscope',
			caption: 'Magnified, lit, recorded',
			position: 'bottom-left',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showSection,
		sectionId,
		eyebrow,
		eyebrowIcon,
		heading,
		headingAccent,
		lead,
		primaryLabel,
		primaryUrl,
		secondaryLabel,
		secondaryUrl,
		imageUrl,
		imageAlt,
		showPorts,
		proofTitle,
		proofText,
		showStars,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-laparo-hero',
			id: sectionId || undefined,
			style: sectionStyle( attributes ),
		} ),
		[
			sectionId,
			attributes.paddingTop,
			attributes.paddingBottom,
			attributes.containerMaxWidth,
		]
	);

	return showSection === false ? null : (
		<>
			{ isSelected && (
				<InspectorControls>
					<SectionPanel
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
					<PanelBody
						title={ __( 'Image', 'twork-builder' ) }
						initialOpen={ true }
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										imageUrl: media.url,
										imageId: media.id,
										imageAlt: media.alt || '',
									} )
								}
								allowedTypes={ [ 'image' ] }
								value={ attributes.imageId }
								render={ ( { open } ) => (
									<Button
										variant="secondary"
										onClick={ open }
									>
										{ imageUrl
											? __(
													'Replace image',
													'twork-builder'
											  )
											: __(
													'Select image',
													'twork-builder'
											  ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
						<TextControl
							label={ __( 'Alt text', 'twork-builder' ) }
							help={ __(
								'Describe the image for someone who cannot see it.',
								'twork-builder'
							) }
							value={ imageAlt }
							onChange={ ( value ) =>
								setAttributes( { imageAlt: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show port marks', 'twork-builder' ) }
							checked={ showPorts }
							onChange={ ( value ) =>
								setAttributes( { showPorts: value } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Actions', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Eyebrow icon', 'twork-builder' ) }
							value={ eyebrowIcon }
							onChange={ ( value ) =>
								setAttributes( { eyebrowIcon: value } )
							}
						/>
						<TextControl
							label={ __( 'Primary label', 'twork-builder' ) }
							value={ primaryLabel }
							onChange={ ( value ) =>
								setAttributes( { primaryLabel: value } )
							}
						/>
						<TextControl
							label={ __( 'Primary URL', 'twork-builder' ) }
							value={ primaryUrl }
							onChange={ ( value ) =>
								setAttributes( { primaryUrl: value } )
							}
						/>
						<TextControl
							label={ __( 'Secondary label', 'twork-builder' ) }
							value={ secondaryLabel }
							onChange={ ( value ) =>
								setAttributes( { secondaryLabel: value } )
							}
						/>
						<TextControl
							label={ __( 'Secondary URL', 'twork-builder' ) }
							value={ secondaryUrl }
							onChange={ ( value ) =>
								setAttributes( { secondaryUrl: value } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Proof line', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Title', 'twork-builder' ) }
							value={ proofTitle }
							onChange={ ( value ) =>
								setAttributes( { proofTitle: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show stars', 'twork-builder' ) }
							checked={ showStars }
							onChange={ ( value ) =>
								setAttributes( { showStars: value } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<header { ...blockProps }>
				<div className="lp-shell">
					<div className="lp-hero-grid">
						<div className="lp-hero-content">
							<RichText
								tagName="span"
								className="lp-eyebrow"
								value={ eyebrow }
								onChange={ ( value ) =>
									setAttributes( { eyebrow: value } )
								}
								placeholder={ __( 'Eyebrow', 'twork-builder' ) }
							/>
							<h1>
								<RichText
									tagName="span"
									value={ heading }
									onChange={ ( value ) =>
										setAttributes( { heading: value } )
									}
									placeholder={ __(
										'Headline',
										'twork-builder'
									) }
								/>
								<br />
								<RichText
									tagName="span"
									className="lp-hero-accent"
									value={ headingAccent }
									onChange={ ( value ) =>
										setAttributes( {
											headingAccent: value,
										} )
									}
									placeholder={ __(
										'Accent line',
										'twork-builder'
									) }
								/>
							</h1>
							<RichText
								tagName="p"
								className="lp-hero-lead"
								value={ lead }
								onChange={ ( value ) =>
									setAttributes( { lead: value } )
								}
								placeholder={ __( 'Lead', 'twork-builder' ) }
							/>
							<div className="lp-hero-actions">
								<span className="lp-btn lp-btn--primary">
									{ primaryLabel }
								</span>
								<span className="lp-btn lp-btn--ghost">
									{ secondaryLabel }
								</span>
							</div>
							<div className="lp-hero-proof">
								<div>
									<strong>{ proofTitle }</strong>
									<RichText
										tagName="span"
										value={ proofText }
										onChange={ ( value ) =>
											setAttributes( {
												proofText: value,
											} )
										}
										placeholder={ __(
											'Proof line',
											'twork-builder'
										) }
									/>
								</div>
							</div>
						</div>
						<div className="lp-hero-visual">
							<div className="lp-hero-frame">
								{ imageUrl && (
									<img
										src={ imageUrl }
										alt={ imageAlt || '' }
									/>
								) }
							</div>
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
								templateLock={ false }
							/>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
