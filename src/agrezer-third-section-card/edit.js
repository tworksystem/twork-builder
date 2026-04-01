import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	Button,
} from '@wordpress/components';

const ALIGN_OPTIONS = [
	{ label: __( 'Left (default layout)', 'twork-builder' ), value: 'left' },
	{ label: __( 'Center (raised)', 'twork-builder' ), value: 'center' },
	{ label: __( 'Right', 'twork-builder' ), value: 'right' },
];

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const { image, imageAlt, stat, label, cardAlign } = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: `twork-third-section__card twork-third-section__card--${ cardAlign }`,
		} ),
		[ cardAlign ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Card layout', 'twork-builder' ) }
						initialOpen={ true }
					>
						<SelectControl
							label={ __( 'Column style', 'twork-builder' ) }
							value={ cardAlign }
							options={ ALIGN_OPTIONS }
							onChange={ ( val ) =>
								setAttributes( { cardAlign: val } )
							}
							help={ __(
								'Center card is visually offset upward on large screens.',
								'twork-builder'
							) }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Image', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Image alt text', 'twork-builder' ) }
							value={ imageAlt }
							onChange={ ( val ) =>
								setAttributes( { imageAlt: val } )
							}
						/>

						{ image && (
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
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
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
							title: __(
								'Card background image',
								'twork-builder'
							),
						} }
					/>
				) : (
					<img
						src={ image }
						alt=""
						className="twork-third-section__card-img"
					/>
				) }
				<div className="twork-third-section__card-content">
					<RichText
						tagName="h3"
						className="twork-third-section__stat"
						value={ stat }
						onChange={ ( val ) => setAttributes( { stat: val } ) }
						placeholder={ __( '80%', 'twork-builder' ) }
						allowedFormats={ [ 'core/bold' ] }
					/>

					<RichText
						tagName="p"
						className="twork-third-section__label"
						value={ label }
						onChange={ ( val ) => setAttributes( { label: val } ) }
						placeholder={ __( 'Label', 'twork-builder' ) }
						allowedFormats={ [] }
					/>
				</div>
			</article>
		</>
	);
}
