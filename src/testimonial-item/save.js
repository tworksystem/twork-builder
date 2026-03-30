/**
 * Twork Testimonial Item – Save
 * Output matches home.html: testimonial-card > testimonial-image-wrapper (img + quote-icon), blockquote, p.name, p.procedure.
 * Styling is handled by parent section CSS; no inline styles for consistency with static markup.
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { image, imageAlt, showQuoteIcon, name, procedure, location, quote } =
		attributes;

	const plainName =
		( typeof name === 'string'
			? name.replace( /<[^>]*>/g, '' ).trim()
			: '' ) || '';
	const altText =
		imageAlt || ( plainName ? `Patient ${ plainName }` : 'Patient' );

	const blockProps = useBlockProps.save( {
		className: 'testimonial-card animate-on-scroll',
	} );

	return (
		<div { ...blockProps }>
			<div className="testimonial-image-wrapper">
				{ image && <img src={ image } alt={ altText } /> }
				{ showQuoteIcon && <span className="quote-icon">"</span> }
			</div>
			{ quote && (
				<RichText.Content tagName="blockquote" value={ quote } />
			) }
			{ name && (
				<RichText.Content tagName="p" className="name" value={ name } />
			) }
			{ ( procedure || location ) && (
				<RichText.Content
					tagName="p"
					className="procedure"
					value={ procedure || location }
				/>
			) }
		</div>
	);
}
