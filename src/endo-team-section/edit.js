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

const ALLOWED_BLOCKS = [ 'twork/endo-doctor-item' ];

const IMG_1 =
	'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=900&auto=format&fit=crop';
const IMG_2 =
	'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=900&auto=format&fit=crop';
const IMG_3 =
	'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=900&auto=format&fit=crop';

const TEMPLATE = [
	[
		'twork/endo-doctor-item',
		{
			imageUrl: IMG_1,
			imageAlt: 'Dr. Aung Kyaw Moe',
			tagText: 'Upper GI',
			name: 'Dr. Aung Kyaw Moe',
			role: 'Consultant Gastroenterologist',
			experienceText: '18 yrs',
			languagesText: 'MM / EN',
		},
	],
	[
		'twork/endo-doctor-item',
		{
			imageUrl: IMG_2,
			imageAlt: 'Dr. Su Myat Hnin',
			tagText: 'Colonoscopy',
			name: 'Dr. Su Myat Hnin',
			role: 'Consultant Colorectal Surgeon',
			experienceText: '14 yrs',
			languagesText: 'MM / EN',
		},
	],
	[
		'twork/endo-doctor-item',
		{
			imageUrl: IMG_3,
			imageAlt: 'Dr. Thet Naing Oo',
			tagText: 'ERCP & EUS',
			name: 'Dr. Thet Naing Oo',
			role: 'Interventional Endoscopist',
			experienceText: '21 yrs',
			languagesText: 'MM / EN',
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
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-endo-team-section mk-endo-team-section section',
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

			<section { ...blockProps }>
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

					<div
						className={
							animationOnScroll ? 'grid-3 stagger' : 'grid-3'
						}
					>
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							templateLock={ false }
						/>
					</div>
				</div>
			</section>
		</>
	);
}
