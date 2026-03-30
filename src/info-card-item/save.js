import { useBlockProps, RichText } from '@wordpress/block-editor';

const DEFAULT_ATTRS = {
	iconType: 'fontawesome',
	iconClass: 'fas fa-phone-volume',
	dashicon: 'dashicons-phone',
	iconImageId: 0,
	iconImageUrl: '',
	iconColor: '',
	iconBackground: '',
	title: '',
	subtitle: '',
	secondaryText: '',
	showTitle: true,
	showDescription: true,
	showSecondary: true,
	ctaText: '',
	ctaUrl: '',
	ctaColor: '#dc3545',
	showCTA: true,
	openInNewTab: false,
};

function IconOutput( { iconType, iconClass, dashicon, iconImageUrl } ) {
	if ( iconType === 'image' && iconImageUrl ) {
		return <img src={ iconImageUrl } alt="" className="info-icon-img" />;
	}
	if ( iconType === 'dashicon' && dashicon ) {
		return (
			<span className={ `dashicons ${ dashicon }` } aria-hidden="true" />
		);
	}
	if ( iconClass ) {
		return <i className={ iconClass } aria-hidden="true" />;
	}
	return null;
}

export default function save( { attributes = {} } ) {
	const attrs = { ...DEFAULT_ATTRS, ...attributes };
	const {
		iconType,
		iconClass,
		dashicon,
		iconImageUrl,
		iconColor,
		iconBackground,
		title,
		subtitle,
		secondaryText,
		showTitle,
		showDescription,
		showSecondary,
		ctaText,
		ctaUrl,
		ctaColor,
		showCTA,
		openInNewTab,
	} = attrs;

	const blockProps = useBlockProps.save( {
		className: 'info-card animate-stagger',
		style: {
			'--info-card-cta-color': ctaColor,
			...( iconColor && { '--info-card-icon-color': iconColor } ),
			...( iconBackground && { '--info-card-icon-bg': iconBackground } ),
		},
	} );

	return (
		<div { ...blockProps }>
			<div className="info-icon">
				<IconOutput
					iconType={ iconType }
					iconClass={ iconClass }
					dashicon={ dashicon }
					iconImageUrl={ iconImageUrl }
				/>
			</div>
			{ showTitle && title && (
				<RichText.Content tagName="h3" value={ title } />
			) }
			{ showDescription && subtitle && (
				<RichText.Content tagName="p" value={ subtitle } />
			) }
			{ showSecondary && secondaryText && (
				<RichText.Content tagName="p" value={ secondaryText } />
			) }
			{ showCTA && ctaText && (
				<a
					href={ ctaUrl || '#' }
					className="info-card-link"
					style={ { color: ctaColor } }
					target={ openInNewTab ? '_blank' : undefined }
					rel={ openInNewTab ? 'noopener noreferrer' : undefined }
				>
					{ ctaText }
				</a>
			) }
		</div>
	);
}
