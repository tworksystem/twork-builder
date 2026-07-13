import { useBlockProps } from '@wordpress/block-editor';
import HeaderMarkup from './header-markup';

export default function save( { attributes } ) {
	const {
		logoUrl,
		logoImage,
		logoAlt,
		ctaText,
		ctaUrl,
		mobileCtaText,
		hotlineText,
		navItems,
		containerMaxWidth,
		containerPadding,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'jivaka-header-section-block',
		style: {
			'--jivaka-header-max-width':
				containerMaxWidth != null ? `${ containerMaxWidth }px` : undefined,
			'--jivaka-header-padding':
				containerPadding != null ? `${ containerPadding }px` : undefined,
		},
	} );

	return (
		<div { ...blockProps }>
			<HeaderMarkup
				logoUrl={ logoUrl }
				logoImage={ logoImage }
				logoAlt={ logoAlt }
				ctaText={ ctaText }
				ctaUrl={ ctaUrl }
				mobileCtaText={ mobileCtaText }
				hotlineText={ hotlineText }
				navItems={ navItems }
			/>
		</div>
	);
}
