import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	BaseControl,
	SelectControl,
} from '@wordpress/components';

const ICON_TYPE_OPTIONS = [
	{ value: 'fontawesome', label: __( 'Font Awesome', 'twork-builder' ) },
	{
		value: 'dashicon',
		label: __( 'WordPress (Dashicons)', 'twork-builder' ),
	},
	{ value: 'image', label: __( 'Image / GIF', 'twork-builder' ) },
	{ value: 'video', label: __( 'Video', 'twork-builder' ) },
];

const DASHICON_OPTIONS = [
	{
		value: 'dashicons-arrow-right-alt2',
		label: __( 'Arrow right', 'twork-builder' ),
	},
	{
		value: 'dashicons-arrow-right',
		label: __( 'Arrow (alt)', 'twork-builder' ),
	},
	{ value: 'dashicons-external', label: __( 'External', 'twork-builder' ) },
	{ value: 'dashicons-admin-links', label: __( 'Link', 'twork-builder' ) },
];

function ViewAllIconRender( {
	iconType,
	faClass,
	dashicon,
	imageUrl,
	videoUrl,
} ) {
	const wrap = ( content ) => (
		<span
			className="centre-icon-wrap centre-view-all-icon"
			aria-hidden="true"
		>
			{ content }
		</span>
	);

	if ( iconType === 'image' && imageUrl )
		return wrap(
			<img src={ imageUrl } alt="" className="centre-icon-img" />
		);
	if ( iconType === 'video' && videoUrl )
		return wrap(
			<video
				src={ videoUrl }
				className="centre-icon-video"
				muted
				loop
				playsInline
				autoPlay
				aria-hidden="true"
			/>
		);
	if ( iconType === 'dashicon' && dashicon )
		return wrap( <span className={ `dashicons ${ dashicon }` } /> );
	if ( faClass ) return wrap( <i className={ faClass } /> );
	return null;
}

const ALLOWED_BLOCKS = [ 'twork/centre-doctor-card' ];
const TEMPLATE = [
	[
		'twork/centre-doctor-card',
		{ name: 'Dr. Susan May', specialization: 'Neurosurgeon' },
	],

	[
		'twork/centre-doctor-card',
		{ name: 'Dr. Nilar', specialization: 'Neurologist' },
	],

	[
		'twork/centre-doctor-card',
		{ name: 'Dr. Zaw Win', specialization: 'Spine Surgeon' },
	],
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		sectionId,
		title,
		viewAllText,
		viewAllUrl,
		viewAllIconType,
		viewAllIcon,
		viewAllDashicon,
		viewAllIconImageUrl,
		viewAllIconImageId,
		viewAllIconVideoUrl,
		viewAllIconVideoId,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'content-section fade-up twork-centre-doctors-editor',
			id: sectionId,
		} ),
		[ sectionId ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Section', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __(
								'Section ID (anchor)',
								'twork-builder'
							) }
							value={ sectionId }
							onChange={ ( v ) =>
								setAttributes( {
									sectionId: v || 'specialists',
								} )
							}
							help={ __(
								'e.g. #specialists for anchor links',
								'twork-builder'
							) }
						/>

						<TextControl
							label={ __(
								'View All link text',
								'twork-builder'
							) }
							value={ viewAllText }
							onChange={ ( v ) =>
								setAttributes( { viewAllText: v } )
							}
						/>

						<TextControl
							label={ __( 'View All URL', 'twork-builder' ) }
							value={ viewAllUrl }
							onChange={ ( v ) =>
								setAttributes( { viewAllUrl: v || '#' } )
							}
						/>

						<BaseControl
							label={ __(
								'View All link icon',
								'twork-builder'
							) }
							help={ __(
								'Icon shown after the link text.',
								'twork-builder'
							) }
						>
							<SelectControl
								label={ __( 'Icon type', 'twork-builder' ) }
								value={ viewAllIconType || 'fontawesome' }
								options={ ICON_TYPE_OPTIONS }
								onChange={ ( v ) =>
									setAttributes( { viewAllIconType: v } )
								}
							/>

							{ ( viewAllIconType || 'fontawesome' ) ===
								'fontawesome' && (
								<TextControl
									label={ __(
										'Font Awesome class',
										'twork-builder'
									) }
									value={
										viewAllIcon || 'fas fa-arrow-right'
									}
									onChange={ ( v ) =>
										setAttributes( {
											viewAllIcon:
												v || 'fas fa-arrow-right',
										} )
									}
								/>
							) }
							{ ( viewAllIconType || 'fontawesome' ) ===
								'dashicon' && (
								<SelectControl
									label={ __( 'Dashicon', 'twork-builder' ) }
									value={
										viewAllDashicon ||
										'dashicons-arrow-right-alt2'
									}
									options={ DASHICON_OPTIONS }
									onChange={ ( v ) =>
										setAttributes( { viewAllDashicon: v } )
									}
								/>
							) }
							{ ( viewAllIconType || 'fontawesome' ) ===
								'image' &&
								( ! viewAllIconImageUrl ? (
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( {
												viewAllIconImageUrl: media.url,
												viewAllIconImageId: media.id,
											} )
										}
										allowedTypes={ [ 'image' ] }
										multiple={ false }
										labels={ {
											title: __(
												'Icon image / GIF',
												'twork-builder'
											),
										} }
									/>
								) : (
									<div>
										<img
											src={ viewAllIconImageUrl }
											alt=""
											style={ {
												maxWidth: '100%',
												marginBottom: 8,
											} }
										/>

										<Button
											isSecondary
											isSmall
											onClick={ () =>
												setAttributes( {
													viewAllIconImageUrl: '',
													viewAllIconImageId:
														undefined,
												} )
											}
										>
											{ __( 'Remove', 'twork-builder' ) }
										</Button>
									</div>
								) ) }
							{ ( viewAllIconType || 'fontawesome' ) ===
								'video' &&
								( ! viewAllIconVideoUrl ? (
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( {
												viewAllIconVideoUrl: media.url,
												viewAllIconVideoId: media.id,
											} )
										}
										allowedTypes={ [ 'video' ] }
										multiple={ false }
										labels={ {
											title: __(
												'Icon video',
												'twork-builder'
											),
										} }
									/>
								) : (
									<div>
										<video
											src={ viewAllIconVideoUrl }
											style={ {
												maxWidth: '100%',
												marginBottom: 8,
											} }
											muted
											loop
											playsInline
											width={ 120 }
										/>

										<Button
											isSecondary
											isSmall
											onClick={ () =>
												setAttributes( {
													viewAllIconVideoUrl: '',
													viewAllIconVideoId:
														undefined,
												} )
											}
										>
											{ __( 'Remove', 'twork-builder' ) }
										</Button>
									</div>
								) ) }
						</BaseControl>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				<div className="centre-doctors-header">
					<RichText
						tagName="h2"
						value={ title }
						onChange={ ( v ) => setAttributes( { title: v } ) }
						placeholder={ __(
							'Our Neuro Specialists',
							'twork-builder'
						) }
						className="centre-doctors-title"
					/>

					<a
						href={ viewAllUrl || '#' }
						className="centre-view-all-link"
						onClick={ ( e ) => e.preventDefault() }
						role="presentation"
						aria-label={
							viewAllText
								? undefined
								: __( 'View all specialists', 'twork-builder' )
						}
					>
						{ viewAllText || __( 'View All', 'twork-builder' ) }{ ' ' }
						<ViewAllIconRender
							iconType={ viewAllIconType || 'fontawesome' }
							faClass={ viewAllIcon || 'fas fa-arrow-right' }
							dashicon={ viewAllDashicon }
							imageUrl={ viewAllIconImageUrl }
							videoUrl={ viewAllIconVideoUrl }
						/>
					</a>
				</div>
				<div className="dept-doctors">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock={ false }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</div>
			</div>
		</>
	);
}
