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

const ALLOWED_BLOCKS = [ 'twork/endo-condition-item' ];

const TEMPLATE = [
	[
		'twork/endo-condition-item',
		{ iconClass: 'fas fa-fire', label: 'Persistent heartburn' },
	],
	[
		'twork/endo-condition-item',
		{ iconClass: 'fas fa-utensils', label: 'Difficulty swallowing' },
	],
	[
		'twork/endo-condition-item',
		{ iconClass: 'fas fa-droplet', label: 'Rectal bleeding' },
	],
	[
		'twork/endo-condition-item',
		{ iconClass: 'fas fa-weight-scale', label: 'Unexplained weight loss' },
	],
	[
		'twork/endo-condition-item',
		{ iconClass: 'fas fa-heart-crack', label: 'Upper abdominal pain' },
	],
	[
		'twork/endo-condition-item',
		{ iconClass: 'fas fa-arrows-rotate', label: 'Change in bowel habit' },
	],
	[
		'twork/endo-condition-item',
		{
			iconClass: 'fas fa-battery-quarter',
			label: 'Iron-deficiency anaemia',
		},
	],
	[
		'twork/endo-condition-item',
		{ iconClass: 'fas fa-bacteria', label: 'Suspected H. pylori' },
	],
	[
		'twork/endo-condition-item',
		{ iconClass: 'fas fa-dna', label: 'Family history of bowel cancer' },
	],
	[
		'twork/endo-condition-item',
		{ iconClass: 'fas fa-bowl-food', label: 'Chronic bloating' },
	],
	[
		'twork/endo-condition-item',
		{ iconClass: 'fas fa-clock-rotate-left', label: 'IBD surveillance' },
	],
	[
		'twork/endo-condition-item',
		{
			iconClass: 'fas fa-calendar-days',
			label: 'Routine screening at 45+',
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
		showIntro,
		introText,
		showUrgentNote,
		urgentNoteIcon,
		urgentNoteText,
		animationOnScroll,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'twork-endo-conditions-section mk-endo-conditions-section section',
			id: sectionId || undefined,
			style: {
				backgroundColor,
				paddingTop: `${ paddingTop }px`,
				paddingBottom: `${ paddingBottom }px`,
				'--endo-container': `${ containerMaxWidth }px`,
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

	const gridClassName = animationOnScroll ? 'cond-grid stagger' : 'cond-grid';
	const { children: gridChildren, ...gridProps } = useInnerBlocksProps(
		{ className: gridClassName },
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
							label={ __( 'Scroll Reveal', 'twork-builder' ) }
							checked={ animationOnScroll !== false }
							onChange={ ( value ) =>
								setAttributes( { animationOnScroll: value } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Intro Column', 'twork-builder' ) }
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
							label={ __( 'Show Intro', 'twork-builder' ) }
							checked={ showIntro !== false }
							onChange={ ( value ) =>
								setAttributes( { showIntro: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show Urgent Note', 'twork-builder' ) }
							checked={ showUrgentNote !== false }
							onChange={ ( value ) =>
								setAttributes( { showUrgentNote: value } )
							}
						/>
						{ showUrgentNote !== false && (
							<TextControl
								label={ __(
									'Urgent Note Icon',
									'twork-builder'
								) }
								value={ urgentNoteIcon }
								onChange={ ( value ) =>
									setAttributes( { urgentNoteIcon: value } )
								}
							/>
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

			<section { ...blockProps }>
				<div
					className="endo-container"
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						padding: `0 ${ containerPadding }px`,
					} }
				>
					<div className="cond-layout">
						<div
							className={
								animationOnScroll ? 'reveal' : undefined
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
							{ showIntro !== false && (
								<RichText
									tagName="p"
									className="cond-intro"
									value={ introText }
									onChange={ ( value ) =>
										setAttributes( { introText: value } )
									}
									placeholder={ __(
										'Intro text',
										'twork-builder'
									) }
								/>
							) }
							{ showUrgentNote !== false && (
								<div className="cond-note">
									{ urgentNoteIcon && (
										<i
											className={ urgentNoteIcon }
											aria-hidden="true"
										/>
									) }
									<RichText
										tagName="div"
										value={ urgentNoteText }
										onChange={ ( value ) =>
											setAttributes( {
												urgentNoteText: value,
											} )
										}
										placeholder={ __(
											'Urgent note',
											'twork-builder'
										) }
									/>
								</div>
							) }
						</div>

						<div { ...gridProps }>{ gridChildren }</div>
					</div>
				</div>
			</section>
		</>
	);
}
