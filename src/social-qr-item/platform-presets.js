export const PLATFORM_PRESETS = {
	facebook: {
		label: 'Facebook',
		icon: 'fab fa-facebook-f',
		badgeClass: 'social-qr-badge--facebook',
		defaultFooter: 'https://www.facebook.com/jivakahospital',
		defaultButtonUrl: 'https://www.facebook.com/jivakahospital',
		defaultButtonText: 'Visit Facebook',
	},
	instagram: {
		label: 'Instagram',
		icon: 'fab fa-instagram',
		badgeClass: 'social-qr-badge--instagram',
		defaultFooter: 'https://www.instagram.com/jivakahospital/',
		defaultButtonUrl: 'https://www.instagram.com/jivakahospital/',
		defaultButtonText: 'Visit Instagram',
	},
	tiktok: {
		label: 'TikTok',
		icon: 'fab fa-tiktok',
		badgeClass: 'social-qr-badge--tiktok',
		defaultFooter: 'https://tiktok.me/@jivaka.hospital',
		defaultButtonUrl: 'https://tiktok.me/@jivaka.hospital',
		defaultButtonText: 'Visit TikTok',
	},
	viber: {
		label: 'Viber',
		icon: 'fab fa-viber',
		badgeClass: 'social-qr-badge--viber',
		defaultFooter: 'Jivaka Hospital',
		defaultButtonUrl: '',
		defaultButtonText: 'Chat on Viber',
	},
	telegram: {
		label: 'Telegram',
		icon: 'fab fa-telegram-plane',
		badgeClass: 'social-qr-badge--telegram',
		defaultFooter: 'Jivaka Hospital',
		defaultButtonUrl: '',
		defaultButtonText: 'Chat on Telegram',
	},
};

export const PLATFORM_OPTIONS = Object.entries( PLATFORM_PRESETS ).map(
	( [ value, preset ] ) => ( {
		label: preset.label,
		value,
	} )
);

export function getPlatformPreset( platform ) {
	return PLATFORM_PRESETS[ platform ] || PLATFORM_PRESETS.facebook;
}
