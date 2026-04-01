import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { image, imageAlt, label } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-about-intro__feature',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Icon', 'twork-builder' ) }
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
							title: __( 'Feature icon', 'twork-builder' ),
						} }
					/>
				) : (
					<>
						<img
							src={ image }
							alt=""
							className="twork-about-intro__feature-icon"
						/>

						<Button
							isSecondary
							isSmall
							onClick={ () =>
								setAttributes( { image: '', imageId: null } )
							}
						>
							{ __( 'Replace icon', 'twork-builder' ) }
						</Button>
					</>
				) }
				<RichText
					tagName="span"
					value={ label }
					onChange={ ( val ) => setAttributes( { label: val } ) }
					placeholder={ __( 'Feature label', 'twork-builder' ) }
					allowedFormats={ [] }
				/>
			</div>
		</>
	);
}
