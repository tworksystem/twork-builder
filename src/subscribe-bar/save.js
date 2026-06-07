import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title, placeholder, buttonLabel, honeypotName, backgroundColor } =
		attributes;

	const blockProps = useBlockProps.save( {
		className: 'twork-subscribe-bar newsletter',
		'data-block': 'twork/subscribe-bar',
	} );

	return (
		<section { ...blockProps }>
			<div
				className="newsletter__banner"
				style={ { backgroundColor: backgroundColor || '#ffff00' } }
			>
				<div className="newsletter__inner l-section">
					<div className="newsletter__cta">
						<span className="newsletter__icon" aria-hidden="true">
							<svg
								width="32"
								height="32"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								aria-hidden="true"
								focusable="false"
							>
								<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
								<polyline points="22,6 12,13 2,6" />
							</svg>
						</span>
						{ title && (
							<RichText.Content
								tagName="p"
								className="newsletter__title"
								value={ title }
								data-field="title"
							/>
						) }
					</div>
					<form
						className="newsletter__form"
						data-action="newsletter-submit"
						novalidate
					>
						<input
							type="text"
							name={ honeypotName || 'website' }
							className="newsletter__hp u-hidden"
							tabIndex="-1"
							autoComplete="off"
							aria-hidden="true"
						/>
						<label className="newsletter__field u-hidden">
							<span>Email</span>
							<input
								className="newsletter__input"
								type="email"
								name="email"
								placeholder={ placeholder || 'Your email address' }
								required
								autoComplete="email"
							/>
						</label>
						<button
							className="newsletter__button btn btn--dark"
							type="submit"
						>
							{ buttonLabel || 'SUBSCRIBE' }
						</button>
					</form>
					<p
						className="newsletter__feedback u-hidden"
						data-field="feedback"
						role="status"
						aria-live="polite"
					/>
				</div>
			</div>
		</section>
	);
}
