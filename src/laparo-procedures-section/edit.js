import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	useInnerBlocksProps,
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

const ALLOWED_BLOCKS = [ 'twork/laparo-procedure-item' ];
const TEMPLATE = [
	[
		'twork/laparo-procedure-item',
		{
			cardLayout: 'wide',
			iconClass: 'fas fa-notes-medical',
			title: 'Laparoscopic Cholecystectomy',
			description:
				'A slim, flexible camera examines the oesophagus, stomach and duodenum to investigate reflux, ulcers, difficulty swallowing and unexplained anaemia.',
			chips: [
				{
					showChip: true,
					iconClass: 'fas fa-clock',
					text: '10–15 min',
				},
				{
					showChip: true,
					iconClass: 'fas fa-syringe',
					text: 'Sedation optional',
				},
				{
					showChip: true,
					iconClass: 'fas fa-house-medical',
					text: 'Day case',
				},
			],
		},
	],
	[
		'twork/laparo-procedure-item',
		{
			cardLayout: 'wide',
			iconClass: 'fas fa-diagram-project',
			iconBgColor: '#fff9f2',
			iconColor: '#e67a22',
			title: 'Hernia Repair (TAPP/TEP)',
			description:
				'Minimally invasive keyhole procedure with smaller scars, less pain, and a faster return to daily life.',
			chips: [
				{
					showChip: true,
					iconClass: 'fas fa-clock',
					text: '20–40 min',
				},
				{
					showChip: true,
					iconClass: 'fas fa-shield-heart',
					text: 'Cancer prevention',
				},
				{
					showChip: true,
					iconClass: 'fas fa-flask',
					text: 'Biopsy on the spot',
				},
			],
		},
	],
	[
		'twork/laparo-procedure-item',
		{
			iconClass: 'fas fa-wave-square',
			iconBgColor: '#f8f9fa',
			iconColor: '#212121',
			title: 'Appendectomy',
			description:
				'Laparoscopic treatment of bile duct stones, strictures and jaundice — no open surgery needed.',
			chips: [
				{
					showChip: true,
					iconClass: 'fas fa-user-doctor',
					text: 'Advanced',
				},
			],
			showLink: false,
		},
	],
	[
		'twork/laparo-procedure-item',
		{
			iconClass: 'fas fa-satellite-dish',
			iconBgColor: '#f8f9fa',
			iconColor: '#212121',
			title: 'Laparoscopic Ultrasound',
			description:
				'High-resolution imaging of the pancreas and GI wall with fine-needle sampling in one sitting.',
			chips: [
				{
					showChip: true,
					iconClass: 'fas fa-crosshairs',
					text: 'Precise staging',
				},
			],
			showLink: false,
		},
	],
	[
		'twork/laparo-procedure-item',
		{
			iconClass: 'fas fa-capsules',
			iconBgColor: '#f7e7e5',
			iconColor: '#c0392b',
			title: 'Capsule Laparoscopy',
			description:
				'Swallow a vitamin-sized camera and let it survey the small bowel — no sedation, no discomfort.',
			chips: [
				{
					showChip: true,
					iconClass: 'fas fa-feather',
					text: 'Non-invasive',
				},
			],
			showLink: false,
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
		animationOnScroll,
		enableCardSpotlight,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'twork-laparo-procedures-section mk-laparo-procedures-section section',
			id: sectionId || undefined,
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--laparo-container': `${ containerMaxWidth }px`,
			},
		} ),
		[
			sectionId,
			backgroundColor,
			paddingTop,
			paddingBottom,
			containerMaxWidth,
		]
	);

	const bentoClassName = animationOnScroll ? 'bento stagger' : 'bento';
	const innerBlocksProps = useInnerBlocksProps(
		{ className: bentoClassName },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
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
								'Card Spotlight on Hover',
								'twork-builder'
							) }
							checked={ enableCardSpotlight !== false }
							onChange={ ( value ) =>
								setAttributes( {
									enableCardSpotlight: value,
								} )
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
				data-card-spotlight={ enableCardSpotlight ? '1' : '0' }
			>
				<div
					className="laparo-container"
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
					<div { ...innerBlocksProps } />
				</div>
			</section>
		</>
	);
}
