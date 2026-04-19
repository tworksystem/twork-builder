import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Button } from '@wordpress/components';
import { GreenerStatIcon } from './icons';

const mediaIconStyle = { objectFit: 'contain', display: 'block' };

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		iconVariant,
		title,
		description,
		statNumber,
		statLabel,
		mediaType,
		mediaUrl,
	} = attributes;

	const safeIconVariant = iconVariant ?? 'growth';
	const safeTitle = title ?? statLabel ?? ( statNumber ? String( statNumber ) : '' );
	const safeDescription = description ?? '';
	const isVideo = mediaUrl && mediaUrl.match( /\.(mp4|webm)$/i );
	const blockProps = useStableBlockProps( () => ( { className: 'twork-greener-stat' } ), [] );

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody title={ __( 'Icon', 'twork-builder' ) } initialOpen={ true }>
						<SelectControl
							label={ __( 'Icon Type', 'twork-builder' ) }
							value={ mediaType || 'svg' }
							options={ [
								{ label: __( 'Predefined SVG', 'twork-builder' ), value: 'svg' },
								{ label: __( 'Custom Image/Video', 'twork-builder' ), value: 'media' },
							] }
							onChange={ ( val ) => setAttributes( { mediaType: val } ) }
						/>
						{ ( mediaType || 'svg' ) === 'svg' && (
							<SelectControl
								label={ __( 'Icon style', 'twork-builder' ) }
								value={ iconVariant }
								options={ [
									{ label: __( 'Growth / leaf', 'twork-builder' ), value: 'growth' },
									{ label: __( 'Organic globe', 'twork-builder' ), value: 'organic' },
								] }
								onChange={ ( val ) => setAttributes( { iconVariant: val } ) }
							/>
						) }
						{ mediaType === 'media' && (
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ [ 'image', 'video' ] }
									onSelect={ ( media ) => setAttributes( { mediaUrl: media?.url || '' } ) }
									value={ mediaUrl }
									render={ ( { open } ) => (
										<div>
											<Button variant="secondary" onClick={ open }>
												{ mediaUrl ? __( 'Replace media', 'twork-builder' ) : __( 'Upload media', 'twork-builder' ) }
											</Button>
											{ !! mediaUrl && (
												<Button variant="link" isDestructive onClick={ () => setAttributes( { mediaUrl: '' } ) }>
													{ __( 'Remove media', 'twork-builder' ) }
												</Button>
											) }
										</div>
									) }
								/>
							</MediaUploadCheck>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				{ mediaType === 'media' && mediaUrl ? (
					isVideo ? (
						<video src={ mediaUrl } autoPlay loop muted playsInline className="twork-greener-stat__icon" style={ mediaIconStyle } />
					) : (
						<img src={ mediaUrl } alt="" className="twork-greener-stat__icon" style={ mediaIconStyle } />
					)
				) : (
					<GreenerStatIcon variant={ safeIconVariant } />
				) }
				<RichText tagName="h3" className="twork-greener-stat__title" value={ safeTitle } onChange={ ( val ) => setAttributes( { title: val } ) } placeholder={ __( 'Stat title', 'twork-builder' ) } />
				<RichText tagName="p" className="twork-greener-stat__text" value={ safeDescription } onChange={ ( val ) => setAttributes( { description: val } ) } placeholder={ __( 'Description…', 'twork-builder' ) } />
			</article>
		</>
	);
}
