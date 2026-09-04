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

const ALLOWED_BLOCKS = [ 'twork/laparo-cta-row' ];

const TEMPLATE = [
	[
		'twork/laparo-cta-row',
		{
			iconClass: 'fas fa-clock',
			title: 'Mon – Sun, 8:00 – 18:00',
			subtitle: 'Laparoscopy suite, Level 3',
		},
	],
	[
		'twork/laparo-cta-row',
		{
			iconClass: 'fas fa-bolt',
			title: 'Urgent slots within 48 hours',
			subtitle: 'For red-flag symptoms',
		},
	],
	[
		'twork/laparo-cta-row',
		{
			iconClass: 'fas fa-file-invoice-dollar',
			title: 'Fixed all-inclusive pricing',
			subtitle: 'Scope, sedation, report and recovery',
		},
	],
	[
		'twork/laparo-cta-row',
		{
			iconClass: 'fas fa-location-dot',
			title: 'Jivaka Hospital',
			subtitle: 'No. 1, Pyay Road, Yangon',
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
		showCtaWrap,
		showEyebrow,
		eyebrowText,
		showTitle,
		title,
		showSubtitle,
		subtitle,
		showPrimaryButton,
		primaryButtonText,
		primaryButtonUrl,
		primaryButtonIcon,
		showPrimaryButtonIcon,
		showSecondaryButton,
		secondaryButtonText,
		secondaryButtonUrl,
		secondaryButtonIcon,
		showSecondaryButtonIcon,
		enableMagneticButtons,
		animationOnScroll,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-laparo-cta-section mk-laparo-cta-section section',
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

	const magneticAttr = enableMagneticButtons ? { 'data-magnetic': true } : {};

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
							min={ 0 }
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
							label={ __( 'Magnetic Buttons', 'twork-builder' ) }
							checked={ enableMagneticButtons !== false }
							onChange={ ( value ) =>
								setAttributes( {
									enableMagneticButtons: value,
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
						title={ __( 'Content', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show CTA Wrap', 'twork-builder' ) }
							checked={ showCtaWrap !== false }
							onChange={ ( value ) =>
								setAttributes( { showCtaWrap: value } )
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
							label={ __( 'Show Subtitle', 'twork-builder' ) }
							checked={ showSubtitle !== false }
							onChange={ ( value ) =>
								setAttributes( { showSubtitle: value } )
							}
						/>
						<ToggleControl
							label={ __(
								'Show Primary Button',
								'twork-builder'
							) }
							checked={ showPrimaryButton !== false }
							onChange={ ( value ) =>
								setAttributes( { showPrimaryButton: value } )
							}
						/>
						{ showPrimaryButton !== false && (
							<TextControl
								label={ __( 'Primary URL', 'twork-builder' ) }
								value={ primaryButtonUrl }
								onChange={ ( value ) =>
									setAttributes( {
										primaryButtonUrl: value,
									} )
								}
							/>
						) }
						<ToggleControl
							label={ __(
								'Show Secondary Button',
								'twork-builder'
							) }
							checked={ showSecondaryButton !== false }
							onChange={ ( value ) =>
								setAttributes( {
									showSecondaryButton: value,
								} )
							}
						/>
						{ showSecondaryButton !== false && (
							<TextControl
								label={ __( 'Secondary URL', 'twork-builder' ) }
								value={ secondaryButtonUrl }
								onChange={ ( value ) =>
									setAttributes( {
										secondaryButtonUrl: value,
									} )
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
					className="laparo-container"
					style={ {
						maxWidth: `${ containerMaxWidth }px`,
						padding: `0 ${ containerPadding }px`,
					} }
				>
					{ showCtaWrap !== false && (
						<div
							className={
								animationOnScroll
									? 'cta-wrap reveal'
									: 'cta-wrap'
							}
						>
							<div className="cta-grid">
								<div>
									{ showEyebrow !== false && (
										<span className="eyebrow cta-eyebrow">
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
												setAttributes( {
													title: value,
												} )
											}
											placeholder={ __(
												'CTA title',
												'twork-builder'
											) }
										/>
									) }
									{ showSubtitle !== false && (
										<RichText
											tagName="p"
											value={ subtitle }
											onChange={ ( value ) =>
												setAttributes( {
													subtitle: value,
												} )
											}
											placeholder={ __(
												'CTA subtitle',
												'twork-builder'
											) }
										/>
									) }
									<div className="cta-actions">
										{ showPrimaryButton !== false && (
											<a
												className="btn btn-light"
												href={
													primaryButtonUrl ||
													'tel:012345678'
												}
												{ ...magneticAttr }
											>
												{ showPrimaryButtonIcon !==
													false &&
													primaryButtonIcon && (
														<i
															className={
																primaryButtonIcon
															}
															aria-hidden="true"
														/>
													) }
												<RichText
													tagName="span"
													value={ primaryButtonText }
													onChange={ ( value ) =>
														setAttributes( {
															primaryButtonText:
																value,
														} )
													}
													placeholder={ __(
														'Primary button',
														'twork-builder'
													) }
													withoutInteractiveFormatting
												/>
											</a>
										) }
										{ showSecondaryButton !== false && (
											<a
												className="btn btn-outline-light"
												href={
													secondaryButtonUrl || '#'
												}
												{ ...magneticAttr }
											>
												<RichText
													tagName="span"
													value={
														secondaryButtonText
													}
													onChange={ ( value ) =>
														setAttributes( {
															secondaryButtonText:
																value,
														} )
													}
													placeholder={ __(
														'Secondary button',
														'twork-builder'
													) }
													withoutInteractiveFormatting
												/>
												{ showSecondaryButtonIcon !==
													false &&
													secondaryButtonIcon && (
														<i
															className={
																secondaryButtonIcon
															}
															aria-hidden="true"
														/>
													) }
											</a>
										) }
									</div>
								</div>

								<div className="cta-panel">
									<InnerBlocks
										allowedBlocks={ ALLOWED_BLOCKS }
										template={ TEMPLATE }
										templateLock={ false }
									/>
								</div>
							</div>
						</div>
					) }
				</div>
			</section>
		</>
	);
}
