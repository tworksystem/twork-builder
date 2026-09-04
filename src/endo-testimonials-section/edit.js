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
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

const EYEBROW_KEYS = eyebrowIconKeys();

const ALLOWED_BLOCKS = [ 'twork/endo-testimonial-item' ];

const AV_1 =
	'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop';
const AV_2 =
	'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop';
const AV_3 =
	'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&auto=format&fit=crop';
const AV_4 =
	'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop';

const TEMPLATE = [
	[
		'twork/endo-testimonial-item',
		{
			quote: 'I had put off a colonoscopy for four years. The prep was the hardest part, and even that was manageable. I woke up and it was already finished.',
			authorImageUrl: AV_1,
			authorName: 'Khin Mar Aye',
			authorDetail: 'Colonoscopy, March 2026',
		},
	],
	[
		'twork/endo-testimonial-item',
		{
			quote: 'Two small polyps were removed during the same appointment. The consultant showed me the images and explained everything before I left.',
			authorImageUrl: AV_2,
			authorName: 'U Zaw Win',
			authorDetail: 'Polypectomy, January 2026',
		},
	],
	[
		'twork/endo-testimonial-item',
		{
			quote: 'Years of reflux, finally an answer in one morning. The report was in my hand before I got in the taxi home.',
			authorImageUrl: AV_3,
			authorName: 'Daw Nilar Kyi',
			authorDetail: 'Gastroscopy, February 2026',
		},
	],
	[
		'twork/endo-testimonial-item',
		{
			quote: 'The nurse called me the evening before to check I understood the prep. That one call took all my anxiety away.',
			authorImageUrl: AV_4,
			authorName: 'Ma Thiri Soe',
			authorDetail: 'Screening, April 2026',
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
		showEyebrow,
		eyebrowText,
		showTitle,
		title,
		showSubtitle,
		subtitle,
		showMarquee,
		enableMarquee,
		duplicateForLoop,
		animationOnScroll,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'twork-endo-testimonials-section mk-endo-testimonials-section section bg-white',
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
							label={ __( 'Show Marquee', 'twork-builder' ) }
							checked={ showMarquee !== false }
							onChange={ ( value ) =>
								setAttributes( { showMarquee: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Enable Marquee', 'twork-builder' ) }
							checked={ enableMarquee !== false }
							onChange={ ( value ) =>
								setAttributes( { enableMarquee: value } )
							}
						/>
						<ToggleControl
							label={ __(
								'Duplicate For Loop',
								'twork-builder'
							) }
							checked={ duplicateForLoop !== false }
							onChange={ ( value ) =>
								setAttributes( { duplicateForLoop: value } )
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
						title={ __( 'Header', 'twork-builder' ) }
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
						<ToggleControl
							label={ __( 'Show Subtitle', 'twork-builder' ) }
							checked={ showSubtitle !== false }
							onChange={ ( value ) =>
								setAttributes( { showSubtitle: value } )
							}
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
				</InspectorControls>
			) }

			<section
				{ ...blockProps }
				data-marquee={ enableMarquee ? '1' : '0' }
				data-duplicate-loop={ duplicateForLoop ? '1' : '0' }
			>
				<div
					className="endo-container"
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						padding: `0 ${ containerPadding }px`,
					} }
				>
					<div
						className={
							animationOnScroll
								? 'section-head reveal'
								: 'section-head'
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
						{ showSubtitle !== false && (
							<RichText
								tagName="p"
								value={ subtitle }
								onChange={ ( value ) =>
									setAttributes( { subtitle: value } )
								}
								placeholder={ __(
									'Section subtitle',
									'twork-builder'
								) }
							/>
						) }
					</div>
				</div>

				{ showMarquee !== false && (
					<div
						className={
							animationOnScroll ? 'marquee reveal' : 'marquee'
						}
					>
						<div className="marquee-row endo-testimonials-row is-static">
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ TEMPLATE }
								templateLock={ false }
							/>
						</div>
					</div>
				) }
			</section>
		</>
	);
}
