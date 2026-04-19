import { __ } from '@wordpress/i18n';
// eslint-disable-next-line import/no-unresolved -- workspace alias via webpack
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	Button,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

function CustomImagePlaceholder() {
	return (
		<svg
			className="twork-hero-feature__icon-placeholder"
			width="30"
			height="30"
			viewBox="0 0 24 24"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="12"
				cy="12"
				r="9.5"
				fill="none"
				stroke="rgba(255,255,255,0.35)"
				strokeWidth="1.5"
			/>
			<path
				d="M12 7v10M7 12h10"
				fill="none"
				stroke="rgba(255,255,255,0.95)"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}

function FeatureIcon( { variant = 'leaf', color = '#fff', size = 30 } ) {
	if ( variant === 'drop' ) {
		return (
			<svg
				viewBox="0 0 24 24"
				width={ size }
				height={ size }
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 21c4.5-2 7-5.2 7-9.4C19 7.4 15.8 5 12 5 8.2 5 5 7.4 5 11.6c0 4.2 2.5 7.4 7 9.4Z"
					stroke={ color }
					strokeWidth="1.8"
				/>
				<path
					d="M12 8.3v6.2"
					stroke={ color }
					strokeWidth="1.8"
					strokeLinecap="round"
				/>
				<path
					d="M9.8 11.1 12 13.4l2.2-2.3"
					stroke={ color }
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		);
	}

	if ( variant === 'sprout' ) {
		return (
			<svg
				viewBox="0 0 24 24"
				width={ size }
				height={ size }
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 3c5 5.5 5.5 9 0 18C6.5 12 7 8.5 12 3Z"
					stroke={ color }
					strokeWidth="1.8"
					strokeLinejoin="round"
				/>
				<path
					d="M9 12.2c1-.7 2-.9 3-.9s2 .2 3 .9"
					stroke={ color }
					strokeWidth="1.8"
					strokeLinecap="round"
				/>
			</svg>
		);
	}

	return (
		<svg
			viewBox="0 0 24 24"
			width={ size }
			height={ size }
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 21V10"
				stroke={ color }
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
			<path
				d="M12 10c-3.8 0-7-1.5-8-5 3.8.2 6.6 1 8 3.2"
				stroke={ color }
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
			<path
				d="M12 10c3.8 0 7-1.5 8-5-3.8.2-6.6 1-8 3.2"
				stroke={ color }
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		title,
		iconVariant,
		customIconUrl = '',
		customIconId,
		customIconType = 'image',
		badgeColor,
		iconColor,
		iconSize,
		iconOffsetX,
		iconOffsetY,
		enableHoverAnimation,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: `twork-hero-feature${
				enableHoverAnimation ? ' is-hover-anim-enabled' : ''
			}`,
			style: {
				'--twork-icon-x': `${ iconOffsetX }px`,
				'--twork-icon-y': `${ iconOffsetY }px`,
			},
		} ),
		[ enableHoverAnimation, iconOffsetX, iconOffsetY ]
	);

	const urlTrim = String( customIconUrl || '' ).trim();
	const showCustomImage = iconVariant === 'image' && urlTrim !== '';

	const onSelectIcon = ( media ) => {
		if ( ! media?.url ) {
			return;
		}
		const isVideo =
			media?.mime?.indexOf( 'video' ) === 0 ||
			/\.(mp4|webm)$/i.test( media.url );
		setAttributes( {
			customIconUrl: media.url,
			customIconId: media.id ?? undefined,
			customIconType: isVideo ? 'video' : 'image',
		} );
	};

	const onClearIcon = () => {
		setAttributes( {
			customIconUrl: '',
			customIconId: undefined,
			customIconType: 'image',
		} );
	};

	const renderIconArea = () => {
		if ( showCustomImage ) {
			if ( customIconType === 'video' ) {
				return (
					<video
						src={ urlTrim }
						autoPlay
						muted
						loop
						playsInline
						aria-hidden="true"
						style={ {
							width: `${ iconSize }px`,
							height: `${ iconSize }px`,
						} }
					/>
				);
			}
			return (
				<img
					src={ urlTrim }
					alt=""
					style={ {
						width: `${ iconSize }px`,
						height: `${ iconSize }px`,
					} }
				/>
			);
		}
		if ( iconVariant === 'image' ) {
			return <CustomImagePlaceholder />;
		}
		return (
			<FeatureIcon
				variant={ iconVariant }
				color={ iconColor }
				size={ iconSize }
			/>
		);
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Feature Settings', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Icon Variant', 'twork-builder' ) }
							value={ iconVariant }
							options={ [
								{
									label: __( 'Leaf', 'twork-builder' ),
									value: 'leaf',
								},
								{
									label: __( 'Drop', 'twork-builder' ),
									value: 'drop',
								},
								{
									label: __( 'Sprout', 'twork-builder' ),
									value: 'sprout',
								},
								{
									label: __(
										'Custom Media',
										'twork-builder'
									),
									value: 'image',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { iconVariant: val } )
							}
						/>

						{ iconVariant === 'image' && (
							<div style={ { marginTop: 12 } }>
								{ ! customIconUrl ? (
									<MediaUploadCheck>
										<MediaUpload
											onSelect={ onSelectIcon }
											allowedTypes={ [
												'image',
												'video',
											] }
											value={ customIconId }
											render={ ( { open } ) => (
												<Button
													variant="secondary"
													onClick={ open }
												>
													{ __(
														'Select icon media',
														'twork-builder'
													) }
												</Button>
											) }
										/>
									</MediaUploadCheck>
								) : (
									<>
										{ customIconType === 'video' && (
											<video
												src={ customIconUrl }
												autoPlay
												muted
												loop
												playsInline
												aria-hidden="true"
												style={ {
													width: 48,
													height: 48,
													objectFit: 'contain',
													display: 'block',
													marginBottom: 8,
												} }
											/>
										) }
										{ customIconType !== 'video' && (
											<img
												src={ customIconUrl }
												alt=""
												style={ {
													width: 48,
													height: 48,
													objectFit: 'contain',
													display: 'block',
													marginBottom: 8,
												} }
											/>
										) }
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ onSelectIcon }
												allowedTypes={ [
													'image',
													'video',
												] }
												value={ customIconId }
												render={ ( { open } ) => (
													<Button
														variant="secondary"
														onClick={ open }
														style={ {
															marginRight: 8,
														} }
													>
														{ __(
															'Replace media',
															'twork-builder'
														) }
													</Button>
												) }
											/>
										</MediaUploadCheck>
										<Button
											isDestructive
											isSmall
											onClick={ onClearIcon }
										>
											{ __(
												'Remove media',
												'twork-builder'
											) }
										</Button>
									</>
								) }
							</div>
						) }
						<RangeControl
							label={ __( 'Icon size (px)', 'twork-builder' ) }
							value={ iconSize }
							onChange={ ( val ) =>
								setAttributes( { iconSize: val } )
							}
							min={ 16 }
							max={ 56 }
							step={ 1 }
						/>
						<RangeControl
							label={ __(
								'Icon offset X (px)',
								'twork-builder'
							) }
							value={ iconOffsetX }
							onChange={ ( val ) =>
								setAttributes( { iconOffsetX: val ?? 0 } )
							}
							min={ -20 }
							max={ 20 }
							step={ 1 }
						/>
						<RangeControl
							label={ __(
								'Icon offset Y (px)',
								'twork-builder'
							) }
							value={ iconOffsetY }
							onChange={ ( val ) =>
								setAttributes( { iconOffsetY: val ?? 0 } )
							}
							min={ -20 }
							max={ 20 }
							step={ 1 }
						/>
						<ToggleControl
							label={ __(
								'Enable hover animation',
								'twork-builder'
							) }
							checked={ enableHoverAnimation }
							onChange={ ( val ) =>
								setAttributes( { enableHoverAnimation: val } )
							}
						/>
						<PanelColorSettings
							title={ __( 'Colors', 'twork-builder' ) }
							colorSettings={ [
								{
									value: badgeColor,
									onChange: ( val ) =>
										setAttributes( { badgeColor: val } ),
									label: __( 'Badge color', 'twork-builder' ),
								},
								{
									value: iconColor,
									onChange: ( val ) =>
										setAttributes( { iconColor: val } ),
									label: __( 'Icon color', 'twork-builder' ),
								},
							] }
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				<div className="twork-hero-feature__badge" aria-hidden="true">
					<svg
						className="twork-hero-feature__badge-svg"
						viewBox="0 0 100 100"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M50,2.5 c4.1,0,7.8,2.2,9.8,5.8 c3.4-2.3,7.9-2.5,11.5-0.5 c3.6,2,5.5,6.1,4.9,10.2 c4.2,0.4,7.8,3,9.2,6.9 c1.4,3.9,0.3,8.3-2.7,11.1 c3,2.8,4.1,7.2,2.7,11.1 c-1.4,3.9-5,6.5-9.2,6.9 c0.6,4.1-1.3,8.2-4.9,10.2 c-3.6,2-8.1,1.8-11.5-0.5 c-2,3.6-5.7,5.8-9.8,5.8 c-4.1,0-7.8-2.2-9.8-5.8 c-3.4,2.3-7.9,2.5-11.5,0.5 c-3.6-2-5.5-6.1-4.9-10.2 c-4.2-0.4-7.8-3-9.2-6.9 c-1.4-3.9-0.3-8.3,2.7-11.1 c-3-2.8-4.1-7.2-2.7-11.1 c1.4-3.9,5-6.5,9.2-6.9 c-0.6-4.1,1.3-8.2,4.9-10.2 c3.6-2,8.1-1.8,11.5,0.5 C42.2,4.7,45.9,2.5,50,2.5 z"
							fill={ badgeColor }
						/>
					</svg>
					<span className="twork-hero-feature__icon-wrap">
						{ renderIconArea() }
					</span>
				</div>
				<RichText
					tagName="h3"
					className="twork-hero-feature__title"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Feature title…', 'twork-builder' ) }
				/>
			</article>
		</>
	);
}
