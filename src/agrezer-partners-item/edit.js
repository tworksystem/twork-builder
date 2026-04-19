import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	ToggleControl,
	RangeControl,
	SelectControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		image,
		imageAlt,
		name,
		showName,
		imageWidth,
		imageHeight,
		imageObjectFit,
		nameColor,
		nameFontSize,
		nameFontWeight,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-partners__item',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Image', 'twork-builder' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ __( 'Image width (px)', 'twork-builder' ) }
							value={ imageWidth }
							onChange={ ( val ) => setAttributes( { imageWidth: val } ) }
							min={ 50 }
							max={ 300 }
							step={ 1 }
						/>
						<RangeControl
							label={ __( 'Image height (px, 0 = auto)', 'twork-builder' ) }
							value={ imageHeight }
							onChange={ ( val ) => setAttributes( { imageHeight: val } ) }
							min={ 0 }
							max={ 300 }
							step={ 1 }
						/>
						<SelectControl
							label={ __( 'Image object fit', 'twork-builder' ) }
							value={ imageObjectFit }
							options={ [
								{ label: __( 'Contain', 'twork-builder' ), value: 'contain' },
								{ label: __( 'Cover', 'twork-builder' ), value: 'cover' },
								{ label: __( 'Fill', 'twork-builder' ), value: 'fill' },
							] }
							onChange={ ( val ) => setAttributes( { imageObjectFit: val } ) }
						/>
						<TextControl
							label={ __( 'Icon alt text', 'twork-builder' ) }
							value={ imageAlt }
							onChange={ ( val ) =>
								setAttributes( { imageAlt: val } )
							}
						/>
					</PanelBody>
					<PanelBody title={ __( 'Name', 'twork-builder' ) } initialOpen={ false }>
						<ToggleControl
							label={ __( 'Show partner name', 'twork-builder' ) }
							checked={ !! showName }
							onChange={ ( val ) => setAttributes( { showName: val } ) }
						/>
						<RangeControl
							label={ __( 'Name font size (rem x100)', 'twork-builder' ) }
							value={ Math.round( ( nameFontSize || 1.25 ) * 100 ) }
							onChange={ ( val ) =>
								setAttributes( { nameFontSize: ( val || 125 ) / 100 } )
							}
							min={ 70 }
							max={ 300 }
							step={ 5 }
						/>
						<RangeControl
							label={ __( 'Name font weight', 'twork-builder' ) }
							value={ nameFontWeight }
							onChange={ ( val ) => setAttributes( { nameFontWeight: val } ) }
							min={ 300 }
							max={ 900 }
							step={ 100 }
						/>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Name color', 'twork-builder' ) }
						colorSettings={ [
							{
								value: nameColor,
								onChange: ( val ) => setAttributes( { nameColor: val } ),
								label: __( 'Text color', 'twork-builder' ),
							},
						] }
					/>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ ! image ? (
					<MediaPlaceholder
						icon="format-image"
						onSelect={ ( media ) =>
							setAttributes( {
								image: media.url,
								imageId: media.id,
								imageAlt: media.alt || imageAlt,
							} )
						}
						allowedTypes={ [ 'image' ] }
						multiple={ false }
						labels={ {
							title: __( 'Partner icon', 'twork-builder' ),
						} }
					/>
				) : (
					<div className="twork-partners__item-media">
						<img
							src={ image }
							className="twork-partners__icon"
							alt=""
							style={ {
								width: `${ imageWidth }px`,
								height: imageHeight > 0 ? `${ imageHeight }px` : 'auto',
								objectFit: imageObjectFit,
							} }
						/>

						<Button
							isSecondary
							isSmall
							onClick={ () =>
								setAttributes( { image: '', imageId: null } )
							}
						>
							{ __( 'Replace', 'twork-builder' ) }
						</Button>
					</div>
				) }
				{ showName && (
					<RichText
						tagName="span"
						className="twork-partners__name"
						value={ name }
						onChange={ ( val ) => setAttributes( { name: val } ) }
						placeholder={ __( 'Partner name', 'twork-builder' ) }
						allowedFormats={ [] }
						style={ {
							color: nameColor,
							fontSize: `${ nameFontSize }rem`,
							fontWeight: nameFontWeight,
						} }
					/>
				) }
			</div>
		</>
	);
}
