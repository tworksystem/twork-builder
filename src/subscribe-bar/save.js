import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title, placeholder, buttonLabel, honeypotName } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'newsletter',
		'data-block': 'twork/subscribe-bar',
		'data-version': '1',
	} );

	return (
		<section { ...blockProps } aria-label="Newsletter">
			<div className="newsletter__banner">
				<div className="newsletter__inner l-section">
					<div className="newsletter__cta">
						<RichText.Content
							tagName="p"
							className="newsletter__title"
							value={ title }
						/>
					</div>
					<form
						className="newsletter__form"
						data-action="newsletter-submit"
						noValidate
					>
						<label className="u-hidden" htmlFor="newsletter-email">
							Email
						</label>
						<input
							type="text"
							name={ honeypotName || 'website' }
							className="newsletter__hp u-hidden"
							tabIndex={ -1 }
							autoComplete="off"
							aria-hidden="true"
						/>
						<input
							id="newsletter-email"
							className="newsletter__input"
							type="email"
							name="email"
							placeholder={ placeholder }
							required
						/>
						<button
							className="newsletter__button btn btn--dark"
							type="submit"
						>
							{ buttonLabel }
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
