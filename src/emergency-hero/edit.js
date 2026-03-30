import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	Button,
} from '@wordpress/components';

export default function Edit( { attributes = {}, setAttributes, isSelected } ) {
	const {
		backgroundImage,
		backgroundImageId,
		badgeText,
		title,
		description,
		showButton1,
		button1Text,
		button1Url,
		button1Pulse,
		showButton2,
		button2Text,
		button2Url,
		containerMaxWidth,
		containerPadding,
		heroHeight,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'em-hero twork-emergency-hero-editor',
			style: {
				position: 'relative',
				height: `${ heroHeight || 600 }px`,
				display: 'flex',
				alignItems: 'center',
				overflow: 'hidden',
				background: '#0b1c2c',
				color: '#fff',
			},
		} ),
		[ heroHeight ]
	);

	const containerStyle = {
		position: 'relative',
		zIndex: 2,
		width: '100%',
		maxWidth: `${ containerMaxWidth || 1280 }px`,
		margin: '0 auto',
		padding: `0 ${ containerPadding || 20 }px`,
		textAlign: 'center',
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Background', 'twork-builder' ) }
						initialOpen={ true }
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										backgroundImage: media.url,
										backgroundImageId: media.id,
									} )
								}
								allowedTypes={ [ 'image' ] }
								value={ backgroundImageId }
								render={ ( { open } ) => (
									<>
										{ backgroundImage && (
											<div style={ { marginBottom: 8 } }>
												<img
													src={ backgroundImage }
													alt=""
													style={ {
														width: '100%',
														borderRadius: 4,
													} }
												/>

												<div
													style={ {
														marginTop: 8,
														display: 'flex',
														gap: 8,
													} }
												>
													<Button
														variant="primary"
														onClick={ open }
													>
														{ __(
															'Replace',
															'twork-builder'
														) }
													</Button>
													<Button
														variant="secondary"
														isDestructive
														onClick={ () =>
															setAttributes( {
																backgroundImage:
																	'',
																backgroundImageId:
																	null,
															} )
														}
													>
														{ __(
															'Remove',
															'twork-builder'
														) }
													</Button>
												</div>
											</div>
										) }
										{ ! backgroundImage && (
											<Button
												variant="secondary"
												onClick={ open }
												style={ { width: '100%' } }
											>
												{ __(
													'Choose image',
													'twork-builder'
												) }
											</Button>
										) }
									</>
								) }
							/>
						</MediaUploadCheck>
					</PanelBody>
					<PanelBody
						title={ __( 'Buttons', 'twork-builder' ) }
						initialOpen={ true }
					>
						<ToggleControl
							label={ __(
								'Show primary button',
								'twork-builder'
							) }
							checked={ showButton1 !== false }
							onChange={ ( v ) =>
								setAttributes( { showButton1: v } )
							}
						/>

						{ showButton1 !== false && (
							<>
								<TextControl
									label={ __(
										'Primary text',
										'twork-builder'
									) }
									value={ button1Text }
									onChange={ ( v ) =>
										setAttributes( { button1Text: v } )
									}
								/>

								<TextControl
									label={ __(
										'Primary URL',
										'twork-builder'
									) }
									value={ button1Url }
									onChange={ ( v ) =>
										setAttributes( { button1Url: v } )
									}
								/>

								<ToggleControl
									label={ __(
										'Pulse animation',
										'twork-builder'
									) }
									checked={ button1Pulse !== false }
									onChange={ ( v ) =>
										setAttributes( { button1Pulse: v } )
									}
								/>
							</>
						) }
						<ToggleControl
							label={ __(
								'Show secondary button',
								'twork-builder'
							) }
							checked={ showButton2 !== false }
							onChange={ ( v ) =>
								setAttributes( { showButton2: v } )
							}
						/>

						{ showButton2 !== false && (
							<>
								<TextControl
									label={ __(
										'Secondary text',
										'twork-builder'
									) }
									value={ button2Text }
									onChange={ ( v ) =>
										setAttributes( { button2Text: v } )
									}
								/>

								<TextControl
									label={ __(
										'Secondary URL',
										'twork-builder'
									) }
									value={ button2Url }
									onChange={ ( v ) =>
										setAttributes( { button2Url: v } )
									}
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }
			<header { ...blockProps }>
				{ backgroundImage && (
					<img
						src={ backgroundImage }
						alt=""
						className="em-hero-bg"
						style={ {
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							opacity: 0.4,
							zIndex: 1,
						} }
					/>
				) }
				<div className="em-container" style={ containerStyle }>
					<div className="em-hero-content">
						<RichText
							tagName="span"
							value={ badgeText }
							onChange={ ( v ) =>
								setAttributes( { badgeText: v } )
							}
							placeholder={ __( 'Badge…', 'twork-builder' ) }
							className="em-hero-badge"
						/>

						<RichText
							tagName="h1"
							value={ title }
							onChange={ ( v ) => setAttributes( { title: v } ) }
							placeholder={ __( 'Title…', 'twork-builder' ) }
							className="em-hero-title"
						/>

						<RichText
							tagName="p"
							value={ description }
							onChange={ ( v ) =>
								setAttributes( { description: v } )
							}
							placeholder={ __(
								'Description…',
								'twork-builder'
							) }
							className="em-hero-desc"
						/>

						<div
							className="em-hero-buttons"
							style={ {
								display: 'flex',
								gap: 20,
								justifyContent: 'center',
								flexWrap: 'wrap',
								marginTop: 24,
							} }
						>
							{ showButton1 !== false && button1Text && (
								<a
									href={ button1Url }
									className={ `em-btn em-btn-primary ${
										button1Pulse !== false
											? 'em-btn-pulse'
											: ''
									}` }
									onClick={ ( e ) => e.preventDefault() }
								>
									<i className="fas fa-phone-alt" />{ ' ' }
									{ button1Text }
								</a>
							) }
							{ showButton2 !== false && button2Text && (
								<a
									href={ button2Url }
									className="em-btn em-btn-glass"
									style={ {
										background: 'rgba(255,255,255,0.2)',
										color: '#fff',
										backdropFilter: 'blur(5px)',
										border: '1px solid #fff',
									} }
									onClick={ ( e ) => e.preventDefault() }
								>
									{ button2Text }
								</a>
							) }
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
