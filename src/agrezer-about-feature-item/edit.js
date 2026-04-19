import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button } from '@wordpress/components';
import { AboutFeatureIcon } from './icons';

const mediaIconStyle = {
	width: '50px',
	height: '50px',
	objectFit: 'contain',
};

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		title,
		description,
		iconVariant,
		iconType,
		mediaUrl,
		mediaId,
		mediaType,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( { className: 'twork-about-feature' } ),
		[]
	);

	const onSelectMedia = ( media ) => {
		if ( ! media || ! media.url ) {
			return;
		}
		setAttributes( {
			mediaId: media.id,
			mediaUrl: media.url,
			mediaType: media.type === 'video' ? 'video' : 'image',
		} );
	};

	const clearMedia = () => {
		setAttributes( {
			mediaId: undefined,
			mediaUrl: '',
			mediaType: 'image',
		} );
	};

	const renderIconPreview = () => {
		if ( iconType !== 'media' || ! mediaUrl ) {
			return <AboutFeatureIcon variant={ iconVariant } />;
		}
		if ( mediaType === 'video' ) {
			return (
				<video
					className="twork-about-feature__icon"
					src={ mediaUrl }
					autoPlay
					loop
					muted
					playsInline
					style={ mediaIconStyle }
				/>
			);
		}
		return (
			<img
				className="twork-about-feature__icon"
				src={ mediaUrl }
				alt=""
				style={ mediaIconStyle }
			/>
		);
	};

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Icon & media', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Icon source', 'twork-builder' ) }
							value={ iconType }
							options={ [
								{
									label: __(
										'Predefined SVG',
										'twork-builder'
									),
									value: 'svg',
								},
								{
									label: __(
										'Custom media',
										'twork-builder'
									),
									value: 'media',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { iconType: val } )
							}
						/>

						{ iconType === 'svg' && (
							<SelectControl
								label={ __( 'Icon style', 'twork-builder' ) }
								value={ iconVariant }
								options={ [
									{
										label: __(
											'Growth / arrow',
											'twork-builder'
										),
										value: 'growth',
									},
									{
										label: __( 'Barn', 'twork-builder' ),
										value: 'barn',
									},
									{
										label: __(
											'Soil / tools',
											'twork-builder'
										),
										value: 'soil',
									},
									{
										label: __(
											'Organic plant',
											'twork-builder'
										),
										value: 'organic',
									},
								] }
								onChange={ ( val ) =>
									setAttributes( { iconVariant: val } )
								}
							/>
						) }

						{ iconType === 'media' && (
							<>
								{ ! mediaUrl ? (
									<MediaPlaceholder
										icon="format-image"
										labels={ {
											title: __(
												'Feature icon media',
												'twork-builder'
											),
											instructions: __(
												'Upload an image, GIF, or short video.',
												'twork-builder'
											),
										} }
										onSelect={ onSelectMedia }
										accept="image/*,video/*"
										allowedTypes={ [ 'image', 'video' ] }
									/>
								) : (
									<>
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ onSelectMedia }
												allowedTypes={ [
													'image',
													'video',
												] }
												value={ mediaId }
												render={ ( { open } ) => (
													<Button
														variant="secondary"
														onClick={ open }
														style={ {
															marginBottom: 8,
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
											variant="link"
											isDestructive
											onClick={ clearMedia }
										>
											{ __(
												'Remove media',
												'twork-builder'
											) }
										</Button>
									</>
								) }
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				<div className="twork-about-feature__icon-wrap">
					{ renderIconPreview() }
				</div>
				<RichText
					tagName="h3"
					className="twork-about-feature__title"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Title', 'twork-builder' ) }
				/>

				<RichText
					tagName="p"
					className="twork-about-feature__desc"
					value={ description }
					onChange={ ( val ) =>
						setAttributes( { description: val } )
					}
					placeholder={ __( 'Description', 'twork-builder' ) }
				/>
			</article>
		</>
	);
}
