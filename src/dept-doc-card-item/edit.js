import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

export default function Edit( { attributes = {}, setAttributes, isSelected } ) {
	const {
		imageUrl = '',
		imageId,
		name = '',
		specialization = '',
		qualifications = '',
		profileUrl = '#',
	} = attributes;
	const blockProps = useStableBlockProps(
		() => ( {
			className: 'doc-card twork-dept-doc-card-editor',
		} ),
		[]
	);

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelBody title={ __( 'Doctor', 'twork-builder' ) }>
						{ ! imageUrl ? (
							<MediaPlaceholder
								onSelect={ ( m ) =>
									setAttributes( {
										imageUrl: m.url,
										imageId: m.id,
									} )
								}
								allowedTypes={ [ 'image' ] }
								multiple={ false }
								labels={ {
									title: __(
										'Doctor Photo',
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

								<Button
									isSecondary
									isSmall
									onClick={ () =>
										setAttributes( {
											imageUrl: '',
											imageId: null,
										} )
									}
								>
									{ __( 'Remove', 'twork-builder' ) }
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
							label={ __( 'Qualifications', 'twork-builder' ) }
							value={ qualifications }
							onChange={ ( v ) =>
								setAttributes( { qualifications: v } )
							}
						/>

						<TextControl
							label={ __( 'Profile URL', 'twork-builder' ) }
							value={ profileUrl }
							onChange={ ( v ) =>
								setAttributes( { profileUrl: v } )
							}
						/>
					</PanelBody>
				</InspectorControls>
			) }
			<div { ...blockProps }>
				{ imageUrl ? (
					<img src={ imageUrl } alt={ name } className="doc-img" />
				) : (
					<div
						className="doc-img-placeholder"
						style={ {
							width: 110,
							height: 110,
							borderRadius: '50%',
							background: '#eee',
						} }
					/>
				) }
				<div className="doc-info">
					<h4>{ name }</h4>
					<span>{ specialization }</span>
					<p>{ qualifications }</p>
				</div>
				<a
					href={ profileUrl }
					className="doc-btn"
					style={ { pointerEvents: 'none' } }
				>
					View Profile
				</a>
			</div>
		</>
	);
}
