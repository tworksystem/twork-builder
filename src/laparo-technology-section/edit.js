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
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import {
	EndoIconPicker,
	EndoFlexibleIcon,
	eyebrowIconKeys,
	hasIconValue,
	mapIconAttrs,
} from '@twork-builder/shared/endo-icon-picker';

const EYEBROW_KEYS = eyebrowIconKeys();

const ALLOWED_BLOCKS = [ 'twork/laparo-tech-item' ];

const IMG_0 =
	'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200&auto=format&fit=crop';
const IMG_1 =
	'https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=1200&auto=format&fit=crop';
const IMG_2 =
	'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?q=80&w=1200&auto=format&fit=crop';
const IMG_3 =
	'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop';

const TEMPLATE = [
	[
		'twork/laparo-tech-item',
		{
			stageIndex: 0,
			hudLabel: '4K Ultra-HD Imaging',
			imageUrl: IMG_0,
			imageAlt: '4K laparoscopy tower',
			itemNumber: '01',
			title: '4K Ultra-HD & Narrow-Band Imaging',
			description:
				'Olympus EVIS X1 towers render mucosal detail at four times full-HD resolution, with narrow-band light that makes early dysplasia visible before it becomes a lesion.',
		},
	],
	[
		'twork/laparo-tech-item',
		{
			stageIndex: 1,
			hudLabel: '4K Laparoscopy Tower',
			imageUrl: IMG_1,
			imageAlt: '4K laparoscopy imaging',
			itemNumber: '02',
			title: '4K Laparoscopy Tower',
			description:
				'A real-time computer-aided detection layer flags suspicious tissue on-screen during the withdrawal phase, raising adenoma detection rates by up to 14%.',
		},
	],
	[
		'twork/laparo-tech-item',
		{
			stageIndex: 2,
			hudLabel: 'Automated Reprocessing',
			imageUrl: IMG_2,
			imageAlt: 'Automated reprocessing suite',
			itemNumber: '03',
			title: 'Traceable Automated Reprocessing',
			description:
				'Every scope passes a validated wash cycle with a barcode-tracked audit trail, so the instrument used for your procedure is verifiable to the minute.',
		},
	],
	[
		'twork/laparo-tech-item',
		{
			stageIndex: 3,
			hudLabel: 'Monitored Recovery',
			imageUrl: IMG_3,
			imageAlt: 'Recovery bay',
			itemNumber: '04',
			title: 'Monitored Recovery Bays',
			description:
				'Private bays with continuous pulse-oximetry and a dedicated recovery nurse, so sedation wears off under observation — not in a corridor.',
		},
	],
];

export default function Edit( {
	attributes,
	setAttributes,
	isSelected,
	clientId,
} ) {
	const {
		showSection,
		sectionId,
		backgroundColor,
		paddingTop,
		paddingBottom,
		containerMaxWidth,
		containerPadding,
		showStickyStage,
		showHud,
		showHudDot,
		showEyebrow,
		eyebrowText,
		showTitle,
		title,
		showIntro,
		introText,
		animationOnScroll,
		enableStageSync,
	} = attributes;

	const stageItems = useSelect(
		( select ) => {
			const { getBlocks } = select( 'core/block-editor' );
			return getBlocks( clientId )
				.filter(
					( block ) =>
						block.name === 'twork/laparo-tech-item' &&
						block.attributes.showItem !== false
				)
				.map( ( block, loopIndex ) => ( {
					clientId: block.clientId,
					stageIndex:
						typeof block.attributes.stageIndex === 'number'
							? block.attributes.stageIndex
							: loopIndex,
					imageUrl: block.attributes.imageUrl || '',
					imageAlt:
						block.attributes.imageAlt ||
						block.attributes.hudLabel ||
						'',
					hudLabel: block.attributes.hudLabel || '',
					showImage: block.attributes.showImage !== false,
				} ) );
		},
		[ clientId ]
	);

	const selectedClientId = useSelect(
		( select ) => select( 'core/block-editor' ).getSelectedBlockClientId(),
		[]
	);

	const activeItem = useMemo( () => {
		if ( ! stageItems.length ) {
			return null;
		}
		const selected = stageItems.find(
			( item ) => item.clientId === selectedClientId
		);
		return selected || stageItems[ 0 ];
	}, [ stageItems, selectedClientId ] );

	const activeStageIndex = activeItem ? activeItem.stageIndex : 0;
	const hudLabelText =
		( activeItem && activeItem.hudLabel ) ||
		TEMPLATE[ 0 ][ 1 ].hudLabel ||
		__( 'Stage label', 'twork-builder' );
	const hudIndexText = stageItems.length
		? `${ String( activeStageIndex + 1 ).padStart( 2, '0' ) } / ${ String(
				stageItems.length
		  ).padStart( 2, '0' ) }`
		: '01 / 04';

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'twork-laparo-technology-section mk-laparo-technology-section section tech',
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
							label={ __( 'Show Sticky Stage', 'twork-builder' ) }
							checked={ showStickyStage !== false }
							onChange={ ( value ) =>
								setAttributes( { showStickyStage: value } )
							}
						/>
						<ToggleControl
							label={ __(
								'Stage Sync (front-end)',
								'twork-builder'
							) }
							checked={ enableStageSync !== false }
							onChange={ ( value ) =>
								setAttributes( { enableStageSync: value } )
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
							label={ __( 'Show Intro', 'twork-builder' ) }
							checked={ showIntro !== false }
							onChange={ ( value ) =>
								setAttributes( { showIntro: value } )
							}
						/>
						<ToggleControl
							label={ __( 'Show HUD', 'twork-builder' ) }
							checked={ showHud !== false }
							onChange={ ( value ) =>
								setAttributes( { showHud: value } )
							}
						/>
						{ showHud !== false && (
							<ToggleControl
								label={ __( 'Show HUD Dot', 'twork-builder' ) }
								checked={ showHudDot !== false }
								onChange={ ( value ) =>
									setAttributes( { showHudDot: value } )
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

			<section
				{ ...blockProps }
				data-stage-sync={ enableStageSync ? '1' : '0' }
			>
				<div
					className="laparo-container"
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						padding: `0 ${ containerPadding }px`,
					} }
				>
					<div className="tech-grid">
						{ showStickyStage !== false && (
							<div
								className={
									animationOnScroll
										? 'tech-sticky reveal'
										: 'tech-sticky'
								}
							>
								<div className="tech-stage laparo-tech-stage">
									<div
										className="laparo-tech-stage-images"
										aria-hidden="true"
									>
										{ stageItems.map( ( item ) => {
											if (
												! item.showImage ||
												! item.imageUrl
											) {
												return null;
											}
											return (
												<img
													key={ item.clientId }
													src={ item.imageUrl }
													alt={ item.imageAlt }
													data-stage={ String(
														item.stageIndex
													) }
													className={
														item.stageIndex ===
														activeStageIndex
															? 'is-active'
															: undefined
													}
												/>
											);
										} ) }
									</div>
									{ showHud !== false && (
										<div className="tech-hud">
											<span>
												{ showHudDot !== false && (
													<span
														className="hud-dot"
														aria-hidden="true"
													/>
												) }
												<span className="laparo-tech-hud-label">
													{ hudLabelText }
												</span>
											</span>
											<span className="laparo-tech-hud-index">
												{ hudIndexText }
											</span>
										</div>
									) }
								</div>
							</div>
						) }

						<div>
							<div
								className={
									animationOnScroll ? 'reveal' : undefined
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
										className="tech-intro"
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
							</div>

							<div className="tech-list">
								<InnerBlocks
									allowedBlocks={ ALLOWED_BLOCKS }
									template={ TEMPLATE }
									templateLock={ false }
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
