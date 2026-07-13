import { useBlockProps } from '@wordpress/block-editor';
import { getPlatformPreset } from './platform-presets';
import { getQrImageStyle } from './qr-image-utils';

export default function save( { attributes } ) {
	const {
		platform,
		platformLabel,
		showPlatformBadge,
		qrImage,
		qrImageAlt,
		qrImageObjectFit,
		qrImagePositionX,
		qrImagePositionY,
		qrImageScale,
		footerLabel,
		showFooterLabel,
		showButton,
		buttonText,
		buttonUrl,
		buttonTarget,
		buttonBgColor,
		buttonTextColor,
		buttonHoverBgColor,
		buttonFontSize,
		buttonFontWeight,
		buttonPaddingVertical,
		buttonPaddingHorizontal,
		buttonBorderRadius,
		buttonMarginTop,
	} = attributes;

	if ( ! qrImage ) {
		return null;
	}

	const preset = getPlatformPreset( platform );
	const displayLabel = platformLabel || preset.label;
	const qrImageStyle = getQrImageStyle( {
		qrImageObjectFit,
		qrImagePositionX,
		qrImagePositionY,
		qrImageScale,
	} );

	const blockProps = useBlockProps.save( {
		className: 'social-qr-item-wrapper fade-up',
		'data-platform': platform,
		style: {
			'--button-margin-top': `${ buttonMarginTop }px`,
			'--button-bg': buttonBgColor,
			'--button-color': buttonTextColor,
			'--button-hover-bg': buttonHoverBgColor || buttonBgColor,
		},
	} );

	return (
		<div { ...blockProps }>
			<div className="social-qr-card" data-platform={ platform }>
				{ showPlatformBadge && (
					<div
						className={ `social-qr-badge ${ preset.badgeClass }` }
					>
						<i
							className={ preset.icon }
							aria-hidden="true"
						/>
						<span>{ displayLabel }</span>
					</div>
				) }

				<div className="social-qr-code-wrap">
					<img
						src={ qrImage }
						alt={ qrImageAlt || `${ displayLabel } QR Code` }
						loading="lazy"
						decoding="async"
						style={ qrImageStyle }
					/>
				</div>

				{ showFooterLabel && footerLabel && (
					<p className="social-qr-footer">{ footerLabel }</p>
				) }
			</div>

			{ showButton && buttonText && (
				<a
					href={ buttonUrl || '#' }
					className="jivaka-btn social-qr-btn"
					target={ buttonTarget ? '_blank' : undefined }
					rel={
						buttonTarget ? 'noopener noreferrer' : undefined
					}
					style={ {
						display: 'inline-flex',
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: `${ buttonMarginTop }px`,
						padding: `${ buttonPaddingVertical }px ${ buttonPaddingHorizontal }px`,
						borderRadius: `${ buttonBorderRadius }px`,
						fontWeight: buttonFontWeight,
						fontSize: `${ buttonFontSize }rem`,
						backgroundColor: buttonBgColor,
						color: buttonTextColor,
						textDecoration: 'none',
						width: '100%',
						textAlign: 'center',
						boxSizing: 'border-box',
						transition: 'background-color 0.3s ease',
					} }
				>
					{ buttonText }
				</a>
			) }
		</div>
	);
}
