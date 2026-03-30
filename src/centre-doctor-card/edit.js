import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		imageUrl,
		imageId,
		imageAlt,
		name,
		specialization,
		profileUrl,
		profileLinkText,
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className:
				'doctor-card-mini stagger-doc twork-centre-doctor-card-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody
						title={ __( 'Doctor', 'twork-builder' ) }
						initialOpen={ true }
					>
						{ ! imageUrl ? (
							<MediaPlaceholder
								onSelect={ ( m ) =>
									setAttributes( {
										imageUrl: m.url,
										imageId: m.id,
										imageAlt: m.alt || name || '',
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Doctor photo',
										'twork-builder'
									),
								} }
							/>
						) : (
							<div>
								<img
									src={ imageUrl }
									alt=""
									style={ {
										maxWidth: '100%',
										marginBottom: 8,
									} }
								/>

								<TextControl
									label={ __(
										'Image alt text',
										'twork-builder'
									) }
									value={ imageAlt }
									onChange={ ( v ) =>
										setAttributes( { imageAlt: v } )
									}
									help={ __(
										'Accessibility; e.g. doctor name',
										'twork-builder'
									) }
								/>

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											imageUrl: '',
											imageId: null,
											imageAlt: '',
										} )
									}
								>
									{ __( 'Remove image', 'twork-builder' ) }
								</Button>
							</div>
						) }
						<TextControl
							label={ __( 'Name', 'twork-builder' ) }
							value={ name }
							onChange={ ( v ) => setAttributes( { name: v } ) }
						/>

						<TextControl
							label={ __( 'Specialization', 'twork-builder' ) }
							value={ specialization }
							onChange={ ( v ) =>
								setAttributes( { specialization: v } )
							}
						/>

						<TextControl
							label={ __( 'Profile URL', 'twork-builder' ) }
							value={ profileUrl }
							onChange={ ( v ) =>
								setAttributes( { profileUrl: v || '#' } )
							}
						/>

						<TextControl
							label={ __( 'Button text', 'twork-builder' ) }
							value={ profileLinkText }
							onChange={ ( v ) =>
								setAttributes( { profileLinkText: v } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				<div className="doc-img-wrap">
					{ imageUrl ? (
						<img src={ imageUrl } alt={ imageAlt || name } />
					) : (
						<div
							className="doc-img-placeholder"
							aria-hidden="true"
						/>
					) }
				</div>
				<div className="doc-info">
					<h4>{ name }</h4>
					<span>{ specialization }</span>
					<br />
					<a
						href={ profileUrl || '#' }
						className="btn-outline-dark"
						onClick={ ( e ) => e.preventDefault() }
						role="presentation"
						aria-label={
							profileLinkText
								? undefined
								: __( 'View profile', 'twork-builder' )
						}
					>
						{ profileLinkText ||
							__( 'View Profile', 'twork-builder' ) }
					</a>
				</div>
			</div>
		</>
	);
}
