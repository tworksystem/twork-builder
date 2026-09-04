import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components';

const ICONS = {
	phone: (
		<svg
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.2"
			aria-hidden="true"
		>
			<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
		</svg>
	),
	pin: (
		<svg
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.2"
			aria-hidden="true"
		>
			<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
			<circle cx="12" cy="10" r="3" />
		</svg>
	),
	clock: (
		<svg
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.2"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="10" />
			<polyline points="12 6 12 12 16 14" />
		</svg>
	),
};

function updateItem( list, index, patch ) {
	return ( list || [] ).map( ( item, i ) =>
		i === index ? { ...item, ...patch } : item
	);
}

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		infoCards,
		formTitle,
		formDesc,
		submitLabel,
		honeypotName,
		subjects,
		recipientEmail,
	} = attributes;

	const uid = ( clientId || 'preview' ).slice( 0, 8 );
	const blockProps = useStableBlockProps( {
		className: 'contact-form',
		'data-block': 'twork/contact-form-section',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Form', 'twork-builder' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __( 'Form title', 'twork-builder' ) }
						value={ formTitle || '' }
						onChange={ ( v ) => setAttributes( { formTitle: v } ) }
					/>
					<TextareaControl
						label={ __( 'Form description', 'twork-builder' ) }
						value={ formDesc || '' }
						onChange={ ( v ) => setAttributes( { formDesc: v } ) }
					/>
					<TextControl
						label={ __( 'Submit label', 'twork-builder' ) }
						value={ submitLabel || '' }
						onChange={ ( v ) =>
							setAttributes( { submitLabel: v } )
						}
					/>
					<TextControl
						label={ __(
							'Recipient email (optional)',
							'twork-builder'
						) }
						help={ __(
							'Leave empty to use the site admin email. Must be a valid address.',
							'twork-builder'
						) }
						type="email"
						value={ recipientEmail || '' }
						onChange={ ( v ) =>
							setAttributes( { recipientEmail: v } )
						}
					/>
					<TextControl
						label={ __( 'Honeypot field name', 'twork-builder' ) }
						value={ honeypotName || 'company' }
						onChange={ ( v ) =>
							setAttributes( { honeypotName: v || 'company' } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Subjects', 'twork-builder' ) }
					initialOpen={ false }
				>
					{ ( subjects || [] ).map( ( s, i ) => (
						<div
							key={ s.id || i }
							style={ { marginBottom: '12px' } }
						>
							<TextControl
								label={ __( 'Label', 'twork-builder' ) }
								value={ s.label || '' }
								onChange={ ( v ) =>
									setAttributes( {
										subjects: updateItem( subjects, i, {
											label: v,
										} ),
									} )
								}
							/>
							<TextControl
								label={ __( 'Value (id)', 'twork-builder' ) }
								value={ s.id || '' }
								onChange={ ( v ) =>
									setAttributes( {
										subjects: updateItem( subjects, i, {
											id: v,
										} ),
									} )
								}
							/>
							<Button
								isDestructive
								variant="link"
								onClick={ () =>
									setAttributes( {
										subjects: ( subjects || [] ).filter(
											( _, idx ) => idx !== i
										),
									} )
								}
							>
								{ __( 'Remove subject', 'twork-builder' ) }
							</Button>
							<Divider />
						</div>
					) ) }
					<Button
						variant="secondary"
						onClick={ () =>
							setAttributes( {
								subjects: [
									...( subjects || [] ),
									{
										id: `subject_${ Date.now() }`,
										label: 'New subject',
									},
								],
							} )
						}
					>
						{ __( 'Add subject', 'twork-builder' ) }
					</Button>
				</PanelBody>
				<PanelBody
					title={ __( 'Info cards', 'twork-builder' ) }
					initialOpen={ false }
				>
					{ ( infoCards || [] ).map( ( card, i ) => (
						<div
							key={ card.id || i }
							style={ { marginBottom: '12px' } }
						>
							<TextControl
								label={ __( 'Label', 'twork-builder' ) }
								value={ card.label || '' }
								onChange={ ( v ) =>
									setAttributes( {
										infoCards: updateItem( infoCards, i, {
											label: v,
										} ),
									} )
								}
							/>
							<TextControl
								label={ __(
									'Icon (phone|pin|clock)',
									'twork-builder'
								) }
								value={ card.icon || 'phone' }
								onChange={ ( v ) =>
									setAttributes( {
										infoCards: updateItem( infoCards, i, {
											icon: v,
										} ),
									} )
								}
							/>
							<TextareaControl
								label={ __(
									'Lines (one per line)',
									'twork-builder'
								) }
								value={ ( card.lines || [] ).join( '\n' ) }
								onChange={ ( v ) =>
									setAttributes( {
										infoCards: updateItem( infoCards, i, {
											lines: v
												.split( '\n' )
												.filter(
													( line ) => line !== ''
												),
										} ),
									} )
								}
							/>
							<Button
								isDestructive
								variant="link"
								onClick={ () =>
									setAttributes( {
										infoCards: ( infoCards || [] ).filter(
											( _, idx ) => idx !== i
										),
									} )
								}
							>
								{ __( 'Remove card', 'twork-builder' ) }
							</Button>
							<Divider />
						</div>
					) ) }
					<Button
						variant="secondary"
						onClick={ () =>
							setAttributes( {
								infoCards: [
									...( infoCards || [] ),
									{
										id: `card_${ Date.now() }`,
										label: 'INFO',
										lines: [ 'Detail' ],
										icon: 'phone',
									},
								],
							} )
						}
					>
						{ __( 'Add info card', 'twork-builder' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps } aria-label="Contact form">
				<div className="contact-form__inner l-section">
					<div className="contact-form__info" data-list="infoCards">
						{ ( infoCards || [] ).map( ( card ) => (
							<div
								key={ card.id }
								className="contact-form__info-card"
								data-item-id={ card.id }
							>
								<span
									className="contact-form__info-icon"
									aria-hidden="true"
								>
									{ ICONS[ card.icon ] || ICONS.phone }
								</span>
								<div>
									<p className="contact-form__info-label">
										{ card.label }
									</p>
									<div className="contact-form__info-lines">
										{ ( card.lines || [] ).map(
											( line, i ) => (
												<span key={ i }>{ line }</span>
											)
										) }
									</div>
								</div>
							</div>
						) ) }
					</div>
					<div className="contact-form__panel">
						{ formTitle && (
							<h2 className="contact-form__heading">
								{ formTitle }
							</h2>
						) }
						{ formDesc && (
							<p className="contact-form__desc">{ formDesc }</p>
						) }
						<form
							className="contact-form__form"
							data-action="contact-submit"
							noValidate
						>
							<div className="contact-form__row">
								<div className="contact-form__field">
									<label
										htmlFor={ `twork-contact-name-${ uid }` }
									>
										Name <span aria-hidden="true">*</span>
									</label>
									<input
										id={ `twork-contact-name-${ uid }` }
										type="text"
										readOnly
										tabIndex={ -1 }
									/>
								</div>
								<div className="contact-form__field">
									<label
										htmlFor={ `twork-contact-phone-${ uid }` }
									>
										Phone <span aria-hidden="true">*</span>
									</label>
									<input
										id={ `twork-contact-phone-${ uid }` }
										type="tel"
										placeholder="09xxxxxxxxx"
										readOnly
										tabIndex={ -1 }
									/>
								</div>
							</div>
							<div className="contact-form__field">
								<label
									htmlFor={ `twork-contact-email-${ uid }` }
								>
									Email
								</label>
								<input
									id={ `twork-contact-email-${ uid }` }
									type="email"
									readOnly
									tabIndex={ -1 }
								/>
							</div>
							<div className="contact-form__field">
								<label
									htmlFor={ `twork-contact-subject-${ uid }` }
								>
									Subject <span aria-hidden="true">*</span>
								</label>
								<select
									id={ `twork-contact-subject-${ uid }` }
									tabIndex={ -1 }
									disabled
								>
									{ ( subjects || [] ).map( ( s ) => (
										<option key={ s.id } value={ s.id }>
											{ s.label }
										</option>
									) ) }
								</select>
							</div>
							<div className="contact-form__field">
								<label
									htmlFor={ `twork-contact-message-${ uid }` }
								>
									Message <span aria-hidden="true">*</span>
								</label>
								<textarea
									id={ `twork-contact-message-${ uid }` }
									rows="5"
									readOnly
									tabIndex={ -1 }
								/>
							</div>
							<button
								type="button"
								className="btn btn--primary contact-form__submit"
								tabIndex={ -1 }
							>
								{ submitLabel || 'SEND MESSAGE' }
							</button>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}
