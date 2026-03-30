import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
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
		value: 'dashicons-arrow-down-alt2',
		label: __( 'Arrow down', 'twork-builder' ),
	},
	{
		value: 'dashicons-arrow-down',
		label: __( 'Arrow down (alt)', 'twork-builder' ),
	},
	{
		value: 'dashicons-arrow-right-alt2',
		label: __( 'Arrow right', 'twork-builder' ),
	},
	{ value: 'dashicons-plus-alt', label: __( 'Plus', 'twork-builder' ) },
];

function FaqAccordionIconRender( {
	iconType,
	faClass,
	dashicon,
	imageUrl,
	videoUrl,
} ) {
	const wrap = ( content ) => (
		<span
			className="centre-icon-wrap faq-accordion-icon"
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

export default function Edit( { attributes = {}, setAttributes, isSelected } ) {
	const {
		question = '',
		answer = '',
		accordionIconType,
		accordionIcon,
		accordionDashicon,
		accordionIconImageUrl,
		accordionIconImageId,
		accordionIconVideoUrl,
		accordionIconVideoId,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'faq-item twork-centre-faq-item-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody title={ __( 'FAQ', 'twork-builder' ) }>
						<TextControl
							label={ __( 'Question', 'twork-builder' ) }
							value={ question }
							onChange={ ( v ) =>
								setAttributes( { question: v } )
							}
						/>

						<TextControl
							label={ __( 'Answer', 'twork-builder' ) }
							value={ answer }
							onChange={ ( v ) => setAttributes( { answer: v } ) }
							multiline
						/>

						<BaseControl
							label={ __( 'Accordion icon', 'twork-builder' ) }
							help={ __(
								'Icon shown next to the question (e.g. chevron).',
								'twork-builder'
							) }
						>
							<SelectControl
								label={ __( 'Icon type', 'twork-builder' ) }
								value={ accordionIconType || 'fontawesome' }
								options={ ICON_TYPE_OPTIONS }
								onChange={ ( v ) =>
									setAttributes( { accordionIconType: v } )
								}
							/>

							{ ( accordionIconType || 'fontawesome' ) ===
								'fontawesome' && (
								<TextControl
									label={ __(
										'Font Awesome class',
										'twork-builder'
									) }
									value={
										accordionIcon || 'fas fa-chevron-down'
									}
									onChange={ ( v ) =>
										setAttributes( {
											accordionIcon:
												v || 'fas fa-chevron-down',
										} )
									}
								/>
							) }
							{ ( accordionIconType || 'fontawesome' ) ===
								'dashicon' && (
								<SelectControl
									label={ __( 'Dashicon', 'twork-builder' ) }
									value={
										accordionDashicon ||
										'dashicons-arrow-down-alt2'
									}
									options={ DASHICON_OPTIONS }
									onChange={ ( v ) =>
										setAttributes( {
											accordionDashicon: v,
										} )
									}
								/>
							) }
							{ ( accordionIconType || 'fontawesome' ) ===
								'image' &&
								( ! accordionIconImageUrl ? (
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( {
												accordionIconImageUrl:
													media.url,
												accordionIconImageId: media.id,
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
											src={ accordionIconImageUrl }
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
													accordionIconImageUrl: '',
													accordionIconImageId:
														undefined,
												} )
											}
										>
											{ __( 'Remove', 'twork-builder' ) }
										</Button>
									</div>
								) ) }
							{ ( accordionIconType || 'fontawesome' ) ===
								'video' &&
								( ! accordionIconVideoUrl ? (
									<MediaPlaceholder
										onSelect={ ( media ) =>
											setAttributes( {
												accordionIconVideoUrl:
													media.url,
												accordionIconVideoId: media.id,
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
											src={ accordionIconVideoUrl }
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
													accordionIconVideoUrl: '',
													accordionIconVideoId:
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
				<button type="button" className="faq-btn" disabled>
					{ question }{ ' ' }
					<FaqAccordionIconRender
						iconType={ accordionIconType || 'fontawesome' }
						faClass={ accordionIcon || 'fas fa-chevron-down' }
						dashicon={ accordionDashicon }
						imageUrl={ accordionIconImageUrl }
						videoUrl={ accordionIconVideoUrl }
					/>
				</button>
				<div
					className="faq-content"
					style={ { maxHeight: 'none', overflow: 'visible' } }
				>
					<p style={ { marginBottom: 20 } }>{ answer }</p>
				</div>
			</div>
		</>
	);
}
