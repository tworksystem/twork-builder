import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		title,
		text,
		buttonText,
		buttonUrl,
		gradientStart,
		gradientEnd,
		padding = 50,
		borderRadius = 12,
	} = attributes;
	const blockProps = useBlockProps.save( {
		className: 'centre-cta fade-up',
		style: {
			background: `linear-gradient(135deg, ${ gradientStart } 0%, ${ gradientEnd } 100%)`,
			padding: `${ padding }px`,
			borderRadius: `${ borderRadius }px`,
			textAlign: 'center',
			color: '#fff',
			boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
		},
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="h3"
				value={ title }
				className="centre-cta-title"
			/>
			<RichText.Content
				tagName="p"
				value={ text }
				className="centre-cta-text"
			/>
			<a
				href={ buttonUrl || '#' }
				className="jivaka-btn btn-primary centre-cta-btn"
			>
				{ buttonText || 'Book Appointment' }
			</a>
		</div>
	);
}
