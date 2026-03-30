import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { image, alt, title, linkText, linkUrl } = attributes;
	const blockProps = useStableBlockProps(
		() => ( { className: 'agrezer-greener-card' } ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Link', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'URL', 'twork-builder' ) }
							value={ linkUrl }
							onChange={ ( val ) =>
								setAttributes( { linkUrl: val } )
							}
						/>

						<TextControl
							label={ __( 'Image alt', 'twork-builder' ) }
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
							title: __( 'Card image', 'twork-builder' ),
						} }
					/>
				) : (
					<>
						<img
							className="agrezer-greener-card__img"
							src={ image }
							alt=""
						/>

						<div className="agrezer-greener-card__editor-tools">
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
				<RichText
					tagName="h4"
					className="agrezer-greener-card__title"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Card title', 'twork-builder' ) }
				/>

				<div className="agrezer-greener-card__link agrezer-greener-card__link--editor">
					<RichText
						tagName="span"
						value={ linkText }
						onChange={ ( val ) =>
							setAttributes( { linkText: val } )
						}
						placeholder={ __( 'Read More', 'twork-builder' ) }
					/>

					<span aria-hidden="true">-&gt;</span>
				</div>
			</article>
		</>
	);
}
