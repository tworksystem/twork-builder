import { useBlockProps } from '@wordpress/block-editor';

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

export default function save( { attributes } ) {
	const {
		infoCards,
		formTitle,
		formDesc,
		submitLabel,
		honeypotName,
		subjects,
		recipientEmail,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'contact-form',
		'data-block': 'twork/contact-form-section',
		'data-version': '1',
	} );

	const hp = honeypotName || 'company';

	return (
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
									{ ( card.lines || [] ).map( ( line, i ) => (
										<span key={ i }>{ line }</span>
									) ) }
								</div>
							</div>
						</div>
					) ) }
				</div>
				<div className="contact-form__panel">
					{ formTitle && (
						<h2 className="contact-form__heading">{ formTitle }</h2>
					) }
					{ formDesc && (
						<p className="contact-form__desc">{ formDesc }</p>
					) }
					<form
						className="contact-form__form"
						data-action="contact-submit"
						noValidate
					>
						<input
							type="text"
							name={ hp }
							className="contact-form__hp u-hidden"
							tabIndex={ -1 }
							autoComplete="off"
							aria-hidden="true"
						/>
						{ recipientEmail ? (
							<input
								type="hidden"
								name="recipient"
								value={ recipientEmail }
							/>
						) : null }
						<div className="contact-form__row">
							<div className="contact-form__field">
								<label htmlFor="twork-contact-name">
									Name <span aria-hidden="true">*</span>
								</label>
								<input
									id="twork-contact-name"
									name="name"
									type="text"
									required
									maxLength={ 100 }
									autoComplete="name"
								/>
							</div>
							<div className="contact-form__field">
								<label htmlFor="twork-contact-phone">
									Phone <span aria-hidden="true">*</span>
								</label>
								<input
									id="twork-contact-phone"
									name="phone"
									type="tel"
									required
									maxLength={ 20 }
									pattern="[0-9+\-\s]+"
									autoComplete="tel"
									placeholder="09xxxxxxxxx"
								/>
							</div>
						</div>
						<div className="contact-form__field">
							<label htmlFor="twork-contact-email">Email</label>
							<input
								id="twork-contact-email"
								name="email"
								type="email"
								maxLength={ 120 }
								autoComplete="email"
							/>
						</div>
						<div className="contact-form__field">
							<label htmlFor="twork-contact-subject">
								Subject <span aria-hidden="true">*</span>
							</label>
							<select
								id="twork-contact-subject"
								name="subject"
								required
							>
								{ ( subjects || [] ).map( ( s ) => (
									<option key={ s.id } value={ s.id }>
										{ s.label }
									</option>
								) ) }
							</select>
						</div>
						<div className="contact-form__field">
							<label htmlFor="twork-contact-message">
								Message <span aria-hidden="true">*</span>
							</label>
							<textarea
								id="twork-contact-message"
								name="message"
								rows="5"
								required
								maxLength={ 2000 }
							/>
						</div>
						<button
							type="submit"
							className="btn btn--primary contact-form__submit"
						>
							{ submitLabel || 'SEND MESSAGE' }
						</button>
						<p
							className="contact-form__feedback u-hidden"
							data-field="feedback"
							role="status"
							aria-live="polite"
						/>
					</form>
					<noscript>
						<p className="contact-form__noscript">
							JavaScript မရှိပါက ဖုန်းဖြင့် ဆက်သွယ်ပါ။
						</p>
					</noscript>
				</div>
			</div>
		</section>
	);
}
