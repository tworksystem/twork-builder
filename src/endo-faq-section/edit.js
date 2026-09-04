import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	RangeControl,
} from '@wordpress/components';
import {
	EndoIconPicker,
	EndoFlexibleIcon,
	eyebrowIconKeys,
	asideButtonIconKeys,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

const EYEBROW_KEYS = eyebrowIconKeys();
const ASIDE_BUTTON_KEYS = asideButtonIconKeys();

const ALLOWED_BLOCKS = [ 'twork/endo-faq-item' ];

const TEMPLATE = [
	[
		'twork/endo-faq-item',
		{
			question: 'Does an endoscopy hurt?',
			answer: 'Not usually. With sedation most patients remember nothing at all. Without sedation, a gastroscopy feels like pressure and gagging for a few seconds, and a colonoscopy feels like trapped wind. Biopsies are painless — the gut lining has no pain nerves.',
		},
	],
	[
		'twork/endo-faq-item',
		{
			question: 'How long does the whole visit take?',
			answer: 'Plan for three hours door to door. The examination itself is 15–40 minutes; the rest is admission, sedation recovery and your results discussion.',
		},
	],
	[
		'twork/endo-faq-item',
		{
			question: 'Can I drive myself home?',
			answer: 'Only if you have had no sedation. After sedation you must not drive, operate machinery, drink alcohol or sign legal documents for 24 hours, and an adult must accompany you home.',
		},
	],
	[
		'twork/endo-faq-item',
		{
			question: 'When will I get my results?',
			answer: 'Visual findings and a printed report with images are given before you leave, typically within 30 minutes. Biopsy histology takes 5–7 working days and is discussed at a follow-up appointment.',
		},
	],
	[
		'twork/endo-faq-item',
		{
			question: 'Is it safe? What are the risks?',
			answer: 'Endoscopy is very safe. Serious complications such as bleeding or perforation occur in fewer than 1 in 1,000 diagnostic procedures, and slightly more when polyps are removed. Your consultant will explain your individual risk during consent.',
		},
	],
	[
		'twork/endo-faq-item',
		{
			question: 'Do you accept insurance?',
			answer: 'Yes — we are recognised by all major local and international insurers, and we will confirm your cover and any excess in writing before your appointment. Self-pay package pricing is fixed and all-inclusive.',
		},
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		showSection,
		sectionId,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		showAside,
		showEyebrow,
		eyebrowText,
		showTitle,
		title,
		showIntro,
		introText,
		showAsideButton,
		asideButtonText,
		asideButtonUrl,
		showAsideButtonIcon,
		animationOnScroll,
		enableAccordion,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-endo-faq-section mk-endo-faq-section section',
			id: sectionId || undefined,
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
			},
		} ),
		[ sectionId, backgroundColor, paddingTop, paddingBottom ]
	);

	if ( showSection === false ) {
		return null;
	}

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
							label={ __( 'Section ID', 'twork-builder' ) }
							value={ sectionId }
							onChange={ ( value ) =>
								setAttributes( { sectionId: value } )
							}
						/>
						<TextControl
							label={ __( 'Background Color', 'twork-builder' ) }
							value={ backgroundColor }
							onChange={ ( value ) =>
								setAttributes( { backgroundColor: value } )
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
							min={ 40 }
							max={ 160 }
						/>
						<ToggleControl
							label={ __(
								'Accordion (front-end)',
								'twork-builder'
							) }
							checked={ enableAccordion !== false }
							onChange={ ( value ) =>
								setAttributes( { enableAccordion: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Scroll Reveal', 'twork-builder' ) }
							checked={ animationOnScroll !== false }
							onChange={ ( value ) =>
								setAttributes( { animationOnScroll: value } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Aside Column', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Aside', 'twork-builder' ) }
							checked={ showAside !== false }
							onChange={ ( value ) =>
								setAttributes( { showAside: value } )
							}
						/>
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
						<ToggleControl
							label={ __( 'Show Intro', 'twork-builder' ) }
							checked={ showIntro !== false }
							onChange={ ( value ) =>
								setAttributes( { showIntro: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Aside Button', 'twork-builder' ) }
							checked={ showAsideButton !== false }
							onChange={ ( value ) =>
								setAttributes( { showAsideButton: value } )
							}
						/>
						{ showAsideButton !== false && (
							<>
								<TextControl
									label={ __(
										'Button URL',
										'twork-builder'
									) }
									value={ asideButtonUrl }
									onChange={ ( value ) =>
										setAttributes( {
											asideButtonUrl: value,
										} )
									}
								/>
								<ToggleControl
									label={ __(
										'Show Button Icon',
										'twork-builder'
									) }
									checked={ showAsideButtonIcon !== false }
									onChange={ ( value ) =>
										setAttributes( {
											showAsideButtonIcon: value,
										} )
									}
								/>
								{ showAsideButtonIcon !== false && (
									<EndoIconPicker
										label={ __(
											'Aside button icon',
											'twork-builder'
										) }
										attributes={ attributes }
										setAttributes={ setAttributes }
										keys={ ASIDE_BUTTON_KEYS }
									/>
								) }
							</>
						) }
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
				</InspectorControls>
			) }

			<section
				{ ...blockProps }
				data-accordion={ enableAccordion ? '1' : '0' }
			>
				<div
					className="endo-container"
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						padding: `0 ${ containerPadding }px`,
					} }
				>
					<div className="faq-layout">
						{ showAside !== false && (
							<aside
								className={
									animationOnScroll
										? 'faq-aside reveal'
										: 'faq-aside'
								}
							>
								{ showEyebrow !== false && (
									<span className="eyebrow">
										{ hasIconValue(
											mapIconAttrs(
												attributes,
												EYEBROW_KEYS
											)
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
									<RichText
										tagName="h2"
										value={ title }
										onChange={ ( value ) =>
											setAttributes( { title: value } )
										}
										placeholder={ __(
											'Section title',
											'twork-builder'
										) }
									/>
								) }
								{ showIntro !== false && (
									<RichText
										tagName="p"
										className="faq-intro"
										value={ introText }
										onChange={ ( value ) =>
											setAttributes( {
												introText: value,
											} )
										}
										placeholder={ __(
											'Intro text',
											'twork-builder'
										) }
									/>
								) }
								{ showAsideButton !== false && (
									<a
										className="btn btn-primary faq-aside-btn"
										href={ asideButtonUrl || '#book' }
									>
										<RichText
											tagName="span"
											value={ asideButtonText }
											onChange={ ( value ) =>
												setAttributes( {
													asideButtonText: value,
												} )
											}
											placeholder={ __(
												'Button text',
												'twork-builder'
											) }
											withoutInteractiveFormatting
										/>
										{ showAsideButtonIcon !== false &&
											hasIconValue(
												mapIconAttrs(
													attributes,
													ASIDE_BUTTON_KEYS
												)
											) && (
												<EndoFlexibleIcon
													attributes={ attributes }
													keys={ ASIDE_BUTTON_KEYS }
												/>
											) }
									</a>
								) }
							</aside>
						) }

						<div
							className={
								animationOnScroll
									? 'faq-list stagger'
									: 'faq-list'
							}
						>
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
								templateLock={ false }
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
