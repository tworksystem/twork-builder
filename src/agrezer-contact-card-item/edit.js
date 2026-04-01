import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	RichText,
	MediaPlaceholder,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	BaseControl,
	Button,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		iconUrl,
		iconId,
		iconAlt,
		title,
		subtitle,
		contentType,
		linkUrl,
		linkText,
		plainText,
		cardBgColor,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className: 'twork-contact-card-item-editor',
			style: {
				backgroundColor: cardBgColor,
			},
		} ),
		[ cardBgColor ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Card', 'twork-builder' ) }
						initialOpen
					>
						{ iconUrl && (
							<Button
								isDestructive
								variant="secondary"
								onClick={ () =>
									setAttributes( {
										iconUrl: '',
										iconId: 0,
									} )
								}
							>
								{ __( 'Remove icon', 'twork-builder' ) }
							</Button>
						) }
						<SelectControl
							label={ __( 'Bottom content', 'twork-builder' ) }
							value={ contentType }
							options={ [
								{
									label: __(
										'Clickable link (tel, mail, URL)',
										'twork-builder'
									),
									value: 'link',
								},
								{
									label: __(
										'Plain text (e.g. address)',
										'twork-builder'
									),
									value: 'text',
								},
							] }
							onChange={ ( v ) =>
								setAttributes( { contentType: v } )
							}
						/>

						{ contentType === 'link' && (
							<>
								<TextControl
									label={ __( 'Link URL', 'twork-builder' ) }
									value={ linkUrl }
									onChange={ ( v ) =>
										setAttributes( { linkUrl: v } )
									}
									help={ __(
										'Use tel:, mailto:, or https://',
										'twork-builder'
									) }
								/>

								<TextControl
									label={ __(
										'Link label',
										'twork-builder'
									) }
									value={ linkText }
									onChange={ ( v ) =>
										setAttributes( { linkText: v } )
									}
								/>
							</>
						) }
						{ contentType === 'text' && (
							<TextControl
								label={ __(
									'Address / text',
									'twork-builder'
								) }
								value={ plainText }
								onChange={ ( v ) =>
									setAttributes( { plainText: v } )
								}
							/>
						) }
						<BaseControl
							label={ __( 'Card background', 'twork-builder' ) }
						>
							<input
								type="color"
								value={ cardBgColor }
								onChange={ ( e ) =>
									setAttributes( {
										cardBgColor: e.target.value,
									} )
								}
							/>
						</BaseControl>
						<TextControl
							label={ __( 'Icon alt text', 'twork-builder' ) }
							value={ iconAlt }
							onChange={ ( v ) =>
								setAttributes( { iconAlt: v } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }

			<article { ...blockProps }>
				<div className="twork-contact-card__icon-wrap">
					{ iconUrl ? (
						<img
							src={ iconUrl }
							alt={ iconAlt || '' }
							className="twork-contact-card__icon"
							width={ 24 }
							height={ 24 }
						/>
					) : (
						<MediaPlaceholder
							labels={ {
								title: __( 'Icon image', 'twork-builder' ),
							} }
							onSelect={ ( media ) => {
								setAttributes( {
									iconUrl: media.url,
									iconId: media.id,
									iconAlt: media.alt || iconAlt,
								} );
							} }
							allowedTypes={ [ 'image' ] }
							multiple={ false }
							icons={ false }
						/>
					) }
				</div>
				<RichText
					tagName="h3"
					className="twork-contact-card__title"
					value={ title }
					onChange={ ( v ) => setAttributes( { title: v } ) }
					placeholder={ __( 'Title', 'twork-builder' ) }
					allowedFormats={ [] }
				/>

				<RichText
					tagName="p"
					className="twork-contact-card__subtitle"
					value={ subtitle }
					onChange={ ( v ) => setAttributes( { subtitle: v } ) }
					placeholder={ __( 'Subtitle', 'twork-builder' ) }
					allowedFormats={ [] }
				/>

				{ contentType === 'link' ? (
					<p className="twork-contact-card__link-wrap">
						<span className="twork-contact-card__link twork-contact-card__link--preview">
							{ linkText ||
								linkUrl ||
								__( 'Link', 'twork-builder' ) }
						</span>
					</p>
				) : (
					<RichText
						tagName="p"
						className="twork-contact-card__text"
						value={ plainText }
						onChange={ ( v ) => setAttributes( { plainText: v } ) }
						placeholder={ __( 'Plain text', 'twork-builder' ) }
						allowedFormats={ [] }
					/>
				) }
			</article>
		</>
	);
}
