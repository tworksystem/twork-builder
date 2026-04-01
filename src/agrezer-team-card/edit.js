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
	ToggleControl,
	Button,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		image,
		imageAlt,
		name,
		role,
		profileUrl,
		profileOpenInNewTab,
		actionAriaLabel,
	} = attributes;

	const urlTrim = String( profileUrl || '' ).trim();
	const isRealLink = urlTrim !== '';

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-team-card',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Profile link', 'twork-builder' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Profile URL', 'twork-builder' ) }
							value={ profileUrl }
							onChange={ ( val ) =>
								setAttributes( { profileUrl: val } )
							}
							help={ __(
								'Leave empty to show the arrow as non-clickable (decorative).',
								'twork-builder'
							) }
						/>

						<ToggleControl
							label={ __( 'Open in new tab', 'twork-builder' ) }
							checked={ profileOpenInNewTab }
							onChange={ ( val ) =>
								setAttributes( { profileOpenInNewTab: val } )
							}
							disabled={ ! isRealLink }
						/>

						<TextControl
							label={ __(
								'Arrow button label (screen readers)',
								'twork-builder'
							) }
							value={ actionAriaLabel }
							onChange={ ( val ) =>
								setAttributes( { actionAriaLabel: val } )
							}
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Photo', 'twork-builder' ) }
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
						labels={ {
							title: __( 'Team member photo', 'twork-builder' ),
						} }
					/>
				) : (
					<img
						src={ image }
						alt=""
						className="twork-team-card__img"
					/>
				) }

				{ isRealLink ? (
					<a
						href={ urlTrim }
						className="twork-team-card__action"
						aria-label={ actionAriaLabel || 'View profile' }
						onClick={ ( e ) => e.preventDefault() }
					>
						<span aria-hidden="true">↗</span>
					</a>
				) : (
					<span
						className="twork-team-card__action twork-team-card__action--static"
						aria-hidden="true"
					>
						<span aria-hidden="true">↗</span>
					</span>
				) }

				<div className="twork-team-card__content">
					<RichText
						tagName="h3"
						className="twork-team-card__name"
						value={ name }
						onChange={ ( val ) => setAttributes( { name: val } ) }
						placeholder={ __( 'Name', 'twork-builder' ) }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
					/>

					<RichText
						tagName="p"
						className="twork-team-card__role"
						value={ role }
						onChange={ ( val ) => setAttributes( { role: val } ) }
						placeholder={ __( 'Role', 'twork-builder' ) }
						allowedFormats={ [] }
					/>
				</div>
			</article>
		</>
	);
}
