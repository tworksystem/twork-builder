import { useBlockProps, RichText } from '@wordpress/block-editor';

function FeatureIcon( { variant = 'leaf', color = '#fff', size = 30 } ) {
	if ( variant === 'drop' ) {
		return (
			<svg
				viewBox="0 0 24 24"
				width={ size }
				height={ size }
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 21c4.5-2 7-5.2 7-9.4C19 7.4 15.8 5 12 5 8.2 5 5 7.4 5 11.6c0 4.2 2.5 7.4 7 9.4Z"
					stroke={ color }
					strokeWidth="1.8"
				/>
				<path
					d="M12 8.3v6.2"
					stroke={ color }
					strokeWidth="1.8"
					strokeLinecap="round"
				/>
				<path
					d="M9.8 11.1 12 13.4l2.2-2.3"
					stroke={ color }
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
				width={ size }
				height={ size }
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 3c5 5.5 5.5 9 0 18C6.5 12 7 8.5 12 3Z"
					stroke={ color }
					strokeWidth="1.8"
					strokeLinejoin="round"
				/>
				<path
					d="M9 12.2c1-.7 2-.9 3-.9s2 .2 3 .9"
					stroke={ color }
					strokeWidth="1.8"
					strokeLinecap="round"
				/>
			</svg>
		);
	}

	return (
		<svg
			viewBox="0 0 24 24"
			width={ size }
			height={ size }
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 21V10"
				stroke={ color }
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
			<path
				d="M12 10c-3.8 0-7-1.5-8-5 3.8.2 6.6 1 8 3.2"
				stroke={ color }
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
			<path
				d="M12 10c3.8 0 7-1.5 8-5-3.8.2-6.6 1-8 3.2"
				stroke={ color }
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export default function save( { attributes } ) {
	const {
		title,
		iconVariant,
		customIconUrl = '',
		customIconType = 'image',
		badgeColor,
		iconColor,
		iconSize,
		iconOffsetX,
		iconOffsetY,
		enableHoverAnimation,
	} = attributes;
	const urlTrim = String( customIconUrl || '' ).trim();
	const showCustomImage = iconVariant === 'image' && urlTrim !== '';

	const blockProps = useBlockProps.save( {
		className: `twork-hero-feature${
			enableHoverAnimation ? ' is-hover-anim-enabled' : ''
		}`,
		style: {
			'--twork-icon-x': `${ iconOffsetX }px`,
			'--twork-icon-y': `${ iconOffsetY }px`,
		},
	} );

	return (
		<article { ...blockProps }>
			<div className="twork-hero-feature__badge" aria-hidden="true">
				<svg
					className="twork-hero-feature__badge-svg"
					viewBox="0 0 100 100"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M50,2.5 c4.1,0,7.8,2.2,9.8,5.8 c3.4-2.3,7.9-2.5,11.5-0.5 c3.6,2,5.5,6.1,4.9,10.2 c4.2,0.4,7.8,3,9.2,6.9 c1.4,3.9,0.3,8.3-2.7,11.1 c3,2.8,4.1,7.2,2.7,11.1 c-1.4,3.9-5,6.5-9.2,6.9 c0.6,4.1-1.3,8.2-4.9,10.2 c-3.6,2-8.1,1.8-11.5-0.5 c-2,3.6-5.7,5.8-9.8,5.8 c-4.1,0-7.8-2.2-9.8-5.8 c-3.4,2.3-7.9,2.5-11.5,0.5 c-3.6-2-5.5-6.1-4.9-10.2 c-4.2-0.4-7.8-3-9.2-6.9 c-1.4-3.9-0.3-8.3,2.7-11.1 c-3-2.8-4.1-7.2-2.7-11.1 c1.4-3.9,5-6.5,9.2-6.9 c-0.6-4.1,1.3-8.2,4.9-10.2 c3.6-2,8.1-1.8,11.5,0.5 C42.2,4.7,45.9,2.5,50,2.5 z"
						fill={ badgeColor }
					/>
				</svg>
				<span className="twork-hero-feature__icon-wrap">
					{ showCustomImage && customIconType === 'video' && (
						<video
							src={ urlTrim }
							autoPlay
							muted
							loop
							playsInline
							aria-hidden="true"
							style={ {
								width: `${ iconSize }px`,
								height: `${ iconSize }px`,
							} }
						/>
					) }
					{ showCustomImage && customIconType !== 'video' && (
						<img
							src={ urlTrim }
							alt=""
							style={ {
								width: `${ iconSize }px`,
								height: `${ iconSize }px`,
							} }
						/>
					) }
					{ ! showCustomImage && iconVariant !== 'image' && (
						<FeatureIcon
							variant={ iconVariant }
							color={ iconColor }
							size={ iconSize }
						/>
					) }
				</span>
			</div>
			<RichText.Content
				tagName="h3"
				className="twork-hero-feature__title"
				value={ title }
			/>
		</article>
	);
}
