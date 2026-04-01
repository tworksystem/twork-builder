import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { image, imageAlt, name } = attributes;

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
						<TextControl
							label={ __( 'Icon alt text', 'twork-builder' ) }
							value={ imageAlt }
							onChange={ ( val ) =>
								setAttributes( { imageAlt: val } )
							}
						/>
					</PanelBody>
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
				<RichText
					tagName="span"
					className="twork-partners__name"
					value={ name }
					onChange={ ( val ) => setAttributes( { name: val } ) }
					placeholder={ __( 'Partner name', 'twork-builder' ) }
					allowedFormats={ [] }
				/>
			</div>
		</>
	);
}
