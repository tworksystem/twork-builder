import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	Button,
	BaseControl,
	__experimentalDivider as ExperimentalDivider,
	Divider as StableDivider,
} from '@wordpress/components';
import { useDoctorCardFilterOptions } from '@twork-builder/shared/use-doctor-card-filter-options';
import {
	getDepartmentLabelFromList,
	toSelectOptions,
} from '@twork-builder/shared/doctor-filter-data';

const Divider = StableDivider || ExperimentalDivider;

export default function Edit( {
	attributes,
	setAttributes,
	isSelected,
	context,
	clientId,
} ) {
	const {
		doctorImage,
		doctorImageId,
		imageHeight,
		imageObjectFit,
		imageObjectPosition,
		showImage = true,
		showBadge,
		badgeText,
		departmentSlug,
		departmentLabel,
		doctorName,
		qualifications,
		gender,
		profileUrl,
		profileOpenInNewTab,
		bookUrl,
		bookOpenInNewTab,
		profileButtonText,
		bookButtonText,
		showButtons = true,
		showProfileButton = true,
		showBookButton = true,
	} = attributes;

	const { departments, genders } = useDoctorCardFilterOptions(
		clientId,
		context
	);
	const departmentOptions = toSelectOptions( departments );
	const genderOptions = toSelectOptions( genders );

	const showProfile = showButtons && showProfileButton;
	const showBook = showButtons && showBookButton;
	const hasActions = showProfile || showBook;
	const isSingleAction = hasActions && showProfile !== showBook;

	const cardClassName = [
		'mk-doctor-card-item-editor',
		'doctor-card',
		showImage ? '' : 'doctor-card--no-image',
	]
		.filter( Boolean )
		.join( ' ' );

	const actionsClassName = [
		'doc-actions',
		isSingleAction ? 'doc-actions--single' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	const blockProps = useStableBlockProps(
		() => ( {
			className: cardClassName,
		} ),
		[ cardClassName ]
	);

	const displayDeptLabel =
		departmentLabel ||
		getDepartmentLabelFromList( departmentSlug, departments );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Doctor Image', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __( 'Show Image', 'twork-builder' ) }
							checked={ showImage }
							onChange={ ( val ) =>
								setAttributes( { showImage: val } )
							}
						/>

						{ showImage && (
							<>
								{ ! doctorImage ? (
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( {
												doctorImage: media.url,
												doctorImageId: media.id,
											} )
										}
										allowedTypes={ [ 'image' ] }
										multiple={ false }
										labels={ {
											title: __(
												'Doctor Photo',
												'twork-builder'
											),
										} }
									/>
								) : (
									<div>
										<img
											src={ doctorImage }
											alt=""
											style={ {
												width: '100%',
												height: 'auto',
												marginBottom: '10px',
												display: 'block',
												borderRadius: '6px',
											} }
										/>

										<Button
											isSecondary
											isSmall
											onClick={ () =>
												setAttributes( {
													doctorImage: '',
													doctorImageId: null,
												} )
											}
										>
											{ __(
												'Remove Image',
												'twork-builder'
											) }
										</Button>
									</div>
								) }
								<Divider />
								<BaseControl
									label={ __(
										'Image Height (px)',
										'twork-builder'
									) }
								>
									<input
										type="number"
										min={ 200 }
										max={ 400 }
										step={ 10 }
										value={ imageHeight }
										onChange={ ( e ) =>
											setAttributes( {
												imageHeight:
													parseInt(
														e.target.value,
														10
													) || 260,
											} )
										}
										className="components-text-control__input"
									/>
								</BaseControl>
								<SelectControl
									label={ __(
										'Object Fit',
										'twork-builder'
									) }
									value={ imageObjectFit }
									options={ [
										{
											label: __(
												'Cover',
												'twork-builder'
											),
											value: 'cover',
										},
										{
											label: __(
												'Contain',
												'twork-builder'
											),
											value: 'contain',
										},
										{
											label: __(
												'Fill',
												'twork-builder'
											),
											value: 'fill',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( { imageObjectFit: val } )
									}
								/>

								<SelectControl
									label={ __(
										'Object Position',
										'twork-builder'
									) }
									value={ imageObjectPosition }
									options={ [
										{
											label: __(
												'Top Center',
												'twork-builder'
											),
											value: 'top center',
										},
										{
											label: __(
												'Center',
												'twork-builder'
											),
											value: 'center',
										},
										{
											label: __(
												'Top',
												'twork-builder'
											),
											value: 'top',
										},
										{
											label: __(
												'Bottom',
												'twork-builder'
											),
											value: 'bottom',
										},
									] }
									onChange={ ( val ) =>
										setAttributes( {
											imageObjectPosition: val,
										} )
									}
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Availability Badge', 'twork-builder' ) }
						initialOpen={ false }
					>
						<ToggleControl
							label={ __( 'Show Badge', 'twork-builder' ) }
							checked={ showBadge }
							onChange={ ( val ) =>
								setAttributes( { showBadge: val } )
							}
						/>

						{ showBadge && (
							<TextControl
								label={ __( 'Badge Text', 'twork-builder' ) }
								value={ badgeText }
								onChange={ ( val ) =>
									setAttributes( { badgeText: val } )
								}
							/>
						) }
					</PanelBody>

					<PanelBody
						title={ __(
							'Department & Gender (for filtering)',
							'twork-builder'
						) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Department (slug)', 'twork-builder' ) }
							value={ departmentSlug }
							options={ departmentOptions }
							onChange={ ( val ) =>
								setAttributes( {
									departmentSlug: val,
									departmentLabel: getDepartmentLabelFromList(
										val,
										departments
									),
								} )
							}
							help={ __(
								'Used for filter; also sets label if not custom.',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __(
								'Department Label (display)',
								'twork-builder'
							) }
							value={ departmentLabel }
							onChange={ ( val ) =>
								setAttributes( { departmentLabel: val } )
							}
							help={ __(
								'Override display text, e.g. "Heart Centre".',
								'twork-builder'
							) }
						/>

						<SelectControl
							label={ __( 'Gender', 'twork-builder' ) }
							value={ gender }
							options={ genderOptions }
							onChange={ ( val ) =>
								setAttributes( { gender: val } )
							}
							help={ __( 'Used for filter.', 'twork-builder' ) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Doctor Info', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Doctor Name', 'twork-builder' ) }
							value={ doctorName }
							onChange={ ( val ) =>
								setAttributes( { doctorName: val } )
							}
							help={ __(
								'Used for search filter and card title.',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __( 'Qualifications', 'twork-builder' ) }
							value={ qualifications }
							onChange={ ( val ) =>
								setAttributes( { qualifications: val } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Action Buttons', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show Action Buttons',
								'twork-builder'
							) }
							checked={ showButtons }
							onChange={ ( val ) =>
								setAttributes( { showButtons: val } )
							}
							help={ __(
								'Turn off to hide all buttons on this card.',
								'twork-builder'
							) }
						/>

						{ showButtons && (
							<>
								<ToggleControl
									label={ __(
										'Show Profile Button',
										'twork-builder'
									) }
									checked={ showProfileButton }
									onChange={ ( val ) =>
										setAttributes( {
											showProfileButton: val,
										} )
									}
								/>

								<ToggleControl
									label={ __(
										'Show Book Button',
										'twork-builder'
									) }
									checked={ showBookButton }
									onChange={ ( val ) =>
										setAttributes( {
											showBookButton: val,
										} )
									}
								/>
							</>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Links', 'twork-builder' ) }
						initialOpen={ false }
					>
						{ showButtons && showProfileButton && (
							<>
								<TextControl
									label={ __(
										'Profile URL',
										'twork-builder'
									) }
									value={ profileUrl }
									onChange={ ( val ) =>
										setAttributes( { profileUrl: val } )
									}
									type="url"
								/>

								<ToggleControl
									label={ __(
										'Profile: Open in new tab',
										'twork-builder'
									) }
									checked={ profileOpenInNewTab }
									onChange={ ( val ) =>
										setAttributes( {
											profileOpenInNewTab: val,
										} )
									}
								/>

								<TextControl
									label={ __(
										'Profile Button Text',
										'twork-builder'
									) }
									value={ profileButtonText }
									onChange={ ( val ) =>
										setAttributes( {
											profileButtonText: val,
										} )
									}
								/>

								<Divider />
							</>
						) }

						{ showButtons && showBookButton && (
							<>
								<TextControl
									label={ __( 'Book URL', 'twork-builder' ) }
									value={ bookUrl }
									onChange={ ( val ) =>
										setAttributes( { bookUrl: val } )
									}
									type="url"
								/>

								<ToggleControl
									label={ __(
										'Book: Open in new tab',
										'twork-builder'
									) }
									checked={ bookOpenInNewTab }
									onChange={ ( val ) =>
										setAttributes( {
											bookOpenInNewTab: val,
										} )
									}
								/>

								<TextControl
									label={ __(
										'Book Button Text',
										'twork-builder'
									) }
									value={ bookButtonText }
									onChange={ ( val ) =>
										setAttributes( {
											bookButtonText: val,
										} )
									}
								/>
							</>
						) }

						{ ! showButtons && (
							<p style={ { margin: 0, color: '#757575' } }>
								{ __(
									'Enable action buttons to edit link settings.',
									'twork-builder'
								) }
							</p>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ showImage && (
					<div
						className="doc-img-wrapper"
						style={ {
							position: 'relative',
							height: `${ imageHeight }px`,
							overflow: 'hidden',
						} }
					>
						{ doctorImage ? (
							<img
								src={ doctorImage }
								alt={ doctorName }
								style={ {
									width: '100%',
									height: '100%',
									objectFit: imageObjectFit,
									objectPosition: imageObjectPosition,
									display: 'block',
								} }
							/>
						) : (
							<div
								style={ {
									width: '100%',
									height: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#999',
									fontSize: '14px',
								} }
							>
								{ __( 'Doctor photo', 'twork-builder' ) }
							</div>
						) }

						{ showBadge && badgeText && (
							<span className="doc-badge">{ badgeText }</span>
						) }
					</div>
				) }

				<div className="doc-content">
					<span className="doc-dept">{ displayDeptLabel }</span>
					<RichText
						tagName="h4"
						value={ doctorName }
						onChange={ ( val ) =>
							setAttributes( { doctorName: val } )
						}
						placeholder={ __( 'Doctor name…', 'twork-builder' ) }
						className="doc-name"
					/>

					<RichText
						tagName="p"
						value={ qualifications }
						onChange={ ( val ) =>
							setAttributes( { qualifications: val } )
						}
						placeholder={ __( 'Qualifications…', 'twork-builder' ) }
						className="doc-qual"
					/>

					{ hasActions && (
						<div className={ actionsClassName }>
							{ showProfile && (
								<a
									href={ profileUrl || '#' }
									className="jivaka-btn btn-outline"
									style={ { pointerEvents: 'none' } }
									onClick={ ( e ) => e.preventDefault() }
								>
									{ profileButtonText }
								</a>
							) }
							{ showBook && (
								<a
									href={ bookUrl || '#' }
									className="jivaka-btn btn-primary"
									style={ { pointerEvents: 'none' } }
									onClick={ ( e ) => e.preventDefault() }
								>
									{ bookButtonText }
								</a>
							) }
						</div>
					) }
				</div>
			</div>
		</>
	);
}
