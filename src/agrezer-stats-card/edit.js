import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { image, alt, statValue, statLabel } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-stats-card',
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
							label={ __( 'Alt text', 'twork-builder' ) }
							value={ alt }
							onChange={ ( val ) =>
								setAttributes( { alt: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				{ ! image ? (
					<MediaPlaceholder
						onSelect={ ( media ) =>
							setAttributes( {
								image: media.url,
								imageId: media.id,
								alt: media.alt || alt,
							} )
						}
						allowedTypes={ [ 'image' ] }
						multiple={ false }
						labels={ {
							title: __( 'Stat card image', 'twork-builder' ),
						} }
					/>
				) : (
					<>
						<img
							className="twork-stats-card__image"
							src={ image }
							alt=""
						/>

						<div className="twork-stats-card__editor-bar">
							<Button
								isSecondary
								isSmall
								onClick={ () =>
									setAttributes( {
										image: '',
										imageId: null,
									} )
								}
							>
								{ __( 'Remove image', 'twork-builder' ) }
							</Button>
						</div>
					</>
				) }
				<div className="twork-stats-card__meta">
					<RichText
						tagName="p"
						className="twork-stats-card__value"
						value={ statValue }
						onChange={ ( val ) =>
							setAttributes( { statValue: val } )
						}
						placeholder={ __( '80%', 'twork-builder' ) }
					/>

					<RichText
						tagName="p"
						className="twork-stats-card__label"
						value={ statLabel }
						onChange={ ( val ) =>
							setAttributes( { statLabel: val } )
						}
						placeholder={ __( 'Label', 'twork-builder' ) }
					/>
				</div>
			</article>
		</>
	);
}
