import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import {
	MediaPlaceholder,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Button,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		logoUrl,
		logoId,
		logoAlt,
		placeholderColor,
		linkUrl,
		linkTarget,
		linkRel,
	} = attributes;

	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'twork-csr-partner-logo-item-editor partner-logo-wrap csr-partner-logo-wrap',
			style: {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '80px',
				padding: '20px',
				borderRadius: '8px',
				background: logoUrl ? 'transparent' : placeholderColor,
				border: logoUrl ? 'none' : '2px dashed rgba(0,0,0,0.1)',
				opacity: logoUrl ? 1 : 0.9,
			},
		} ),
		[ logoUrl, placeholderColor ]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Logo Image', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ ! logoUrl ? (
							<MediaPlaceholder
								onSelect={ ( media ) =>
									setAttributes( {
										logoUrl: media.url,
										logoId: media.id,
										logoAlt: media.alt || '',
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Partner Logo',
										'twork-builder'
									),
								} }
							/>
						) : (
							<div>
								<img
									src={ logoUrl }
									alt=""
									style={ {
										width: '100%',
										maxWidth: 120,
										height: 'auto',
										marginBottom: '10px',
									} }
								/>

								<TextControl
									label={ __( 'Alt Text', 'twork-builder' ) }
									value={ logoAlt }
									onChange={ ( val ) =>
										setAttributes( { logoAlt: val } )
									}
									help={ __(
										'For accessibility (e.g., Red Cross)',
										'twork-builder'
									) }
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											logoUrl: '',
											logoId: null,
											logoAlt: '',
										} )
									}
									style={ { marginTop: '10px' } }
								>
									{ __( 'Replace Logo', 'twork-builder' ) }
								</Button>
							</div>
						) }
					</PanelBody>

					<PanelBody
						title={ __(
							'Placeholder (when no logo)',
							'twork-builder'
						) }
						initialOpen={ false }
					>
						<PanelColorSettings
							title={ __( 'Placeholder Color', 'twork-builder' ) }
							colorSettings={ [
								{
									value: placeholderColor,
									onChange: ( val ) =>
										setAttributes( {
											placeholderColor: val,
										} ),
									label: __(
										'Placeholder Color',
										'twork-builder'
									),
								},
							] }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Link', 'twork-builder' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Link URL', 'twork-builder' ) }
							value={ linkUrl }
							onChange={ ( val ) =>
								setAttributes( { linkUrl: val } )
							}
							placeholder="https://"
							help={ __(
								'Optional: Link to partner website',
								'twork-builder'
							) }
						/>

						{ linkUrl && (
							<>
								<ToggleControl
									label={ __(
										'Open in New Tab',
										'twork-builder'
									) }
									checked={ linkTarget === '_blank' }
									onChange={ ( val ) =>
										setAttributes( {
											linkTarget: val
												? '_blank'
												: '_self',
										} )
									}
								/>

								<TextControl
									label={ __( 'Link Rel', 'twork-builder' ) }
									value={ linkRel }
									onChange={ ( val ) =>
										setAttributes( { linkRel: val } )
									}
									help={ __(
										'e.g., noopener noreferrer',
										'twork-builder'
									) }
								/>
							</>
						) }
					</PanelBody>
				</InspectorControls>
			) }

			<div { ...blockProps }>
				{ ! logoUrl ? (
					<span
						className="csr-partner-placeholder"
						aria-hidden="true"
					/>
				) : linkUrl ? (
					<a
						href={ linkUrl }
						target={ linkTarget }
						rel={ linkRel }
						onClick={ ( e ) => e.preventDefault() }
						style={ {
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						} }
					>
						<img
							src={ logoUrl }
							alt={ logoAlt }
							className="partner-logo"
							style={ { maxWidth: 120, height: 'auto' } }
						/>
					</a>
				) : (
					<img
						src={ logoUrl }
						alt={ logoAlt }
						className="partner-logo"
						style={ { maxWidth: 120, height: 'auto' } }
					/>
				) }
			</div>
		</>
	);
}
