import { useBlockProps, RichText } from '@wordpress/block-editor';

function FeatureIcon( { variant = 'leaf' } ) {
	if ( variant === 'drop' ) {
		return (
			<svg
				viewBox="0 0 24 24"
				width="30"
				height="30"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 21c4.5-2 7-5.2 7-9.4C19 7.4 15.8 5 12 5 8.2 5 5 7.4 5 11.6c0 4.2 2.5 7.4 7 9.4Z"
					stroke="#fff"
					strokeWidth="1.8"
				/>
				<path
					d="M12 8.3v6.2"
					stroke="#fff"
					strokeWidth="1.8"
					strokeLinecap="round"
				/>
				<path
					d="M9.8 11.1 12 13.4l2.2-2.3"
					stroke="#fff"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		);
	}

	if ( variant === 'sprout' ) {
		return (
			<svg
				viewBox="0 0 24 24"
				width="30"
				height="30"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 3c5 5.5 5.5 9 0 18C6.5 12 7 8.5 12 3Z"
					stroke="#fff"
					strokeWidth="1.8"
					strokeLinejoin="round"
				/>
				<path
					d="M9 12.2c1-.7 2-.9 3-.9s2 .2 3 .9"
					stroke="#fff"
					strokeWidth="1.8"
					strokeLinecap="round"
				/>
			</svg>
		);
	}

	return (
		<svg
			viewBox="0 0 24 24"
			width="30"
			height="30"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 21V10"
				stroke="#fff"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
			<path
				d="M12 10c-3.8 0-7-1.5-8-5 3.8.2 6.6 1 8 3.2"
				stroke="#fff"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
			<path
				d="M12 10c3.8 0 7-1.5 8-5-3.8.2-6.6 1-8 3.2"
				stroke="#fff"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export default function save( { attributes } ) {
	const { title, iconVariant } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'agrezer-hero-feature',
	} );

	return (
		<article { ...blockProps }>
			<div className="agrezer-hero-feature__badge" aria-hidden="true">
				<FeatureIcon variant={ iconVariant } />
			</div>
			<RichText.Content
				tagName="h3"
				className="agrezer-hero-feature__title"
				value={ title }
			/>
		</article>
	);
}
