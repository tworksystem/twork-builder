import { __ } from '@wordpress/i18n';

export const DEFAULT_SOCIAL_LINKS = [
	{
		platform: 'facebook',
		url: 'https://www.facebook.com/jivakahospital',
		iconClass: 'fab fa-facebook-f',
		ariaLabel: 'Facebook',
		enabled: true,
	},
	{
		platform: 'instagram',
		url: 'https://www.instagram.com/jivakahospital/',
		iconClass: 'fab fa-instagram',
		ariaLabel: 'Instagram',
		enabled: true,
	},
	{
		platform: 'tiktok',
		url: 'https://www.tiktok.com/@jivaka.hospital',
		iconClass: 'fab fa-tiktok',
		ariaLabel: 'TikTok',
		enabled: true,
	},
	{
		platform: 'telegram',
		url: 'https://t.me/jivakahospital',
		iconClass: 'fab fa-telegram-plane',
		ariaLabel: 'Telegram',
		enabled: true,
	},
	{
		platform: 'viber',
		url: 'https://chats.viber.com/jivakahospital',
		iconClass: 'fab fa-viber',
		ariaLabel: 'Viber',
		enabled: true,
	},
];

export const DEFAULT_QUICK_LINKS = [
	{ label: 'About Us', url: 'about', enabled: true },
	{ label: 'Find a Doctor', url: 'doctors', enabled: true },
	{ label: 'Health Packages', url: 'packages', enabled: true },
	{ label: 'Patient Guide', url: 'patient-guide', enabled: true },
	{ label: 'Contact Us', url: 'contact', enabled: true },
];

export const DEFAULT_DEPARTMENT_LINKS = [
	{ label: 'Heart Centre', url: 'heart-centre', enabled: true },
	{ label: 'Neuro Centre', url: 'neuro-centre', enabled: true },
	{ label: 'Orthopaedics', url: 'orthopaedic-centre', enabled: true },
];

export const DEFAULT_LEGAL_LINKS = [
	{ label: 'Privacy Policy', url: '#', enabled: true },
	{ label: 'Terms of Service', url: '#', enabled: true },
	{ label: 'Sitemap', url: '#', enabled: true },
];

export function resolveLinkList( items, fallback = [] ) {
	if ( ! Array.isArray( items ) || items.length === 0 ) {
		return fallback.map( ( item ) => ( { ...item } ) );
	}

	return items.map( ( item ) => ( {
		label: item.label || '',
		url: item.url || '#',
		enabled: item.enabled !== false,
	} ) );
}

export function resolveSocialLinks( items ) {
	if ( ! Array.isArray( items ) || items.length === 0 ) {
		return DEFAULT_SOCIAL_LINKS.map( ( item ) => ( { ...item } ) );
	}

	return items.map( ( item ) => ( {
		platform: item.platform || '',
		url: item.url || '#',
		iconClass: item.iconClass || 'fas fa-link',
		ariaLabel: item.ariaLabel || item.platform || __( 'Social Link', 'twork-builder' ),
		enabled: item.enabled !== false,
	} ) );
}

export function createFooterLink( label = '' ) {
	return {
		label: label || __( 'New Link', 'twork-builder' ),
		url: '#',
		enabled: true,
	};
}

export function cloneLinkList( items ) {
	return ( items || [] ).map( ( item ) => ( { ...item } ) );
}

export function updateLinkListItem( items, index, patch ) {
	const next = cloneLinkList( items );
	if ( ! next[ index ] ) {
		return items;
	}
	next[ index ] = { ...next[ index ], ...patch };
	return next;
}

export function getEditableLinkList( items, fallback = [] ) {
	return resolveLinkList( items, fallback );
}
