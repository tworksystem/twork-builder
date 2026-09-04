/**
 * Shared SelectControl option lists for recovered blocks.
 */
import { __ } from '@wordpress/i18n';

export const DEPARTMENT_OPTIONS = [
	{ value: 'heart', label: 'Heart Centre' },
	{ value: 'neuro', label: 'Neuro Centre' },
	{ value: 'cancer', label: 'Cancer Centre' },
	{ value: 'peds', label: 'Paediatrics' },
	{ value: 'general', label: 'General Medicine' },
	{ value: 'ent', label: 'ENT' },
	{ value: 'dental', label: 'Dental' },
];

export const GENDER_OPTIONS = [
	{ value: '', label: __( 'Not specified', 'twork-builder' ) },
	{ value: 'male', label: __( 'Male', 'twork-builder' ) },
	{ value: 'female', label: __( 'Female', 'twork-builder' ) },
];

export const ICON_TYPE_OPTIONS = [
	{ label: __( 'Font Awesome', 'twork-builder' ), value: 'fontawesome' },
	{ label: __( 'WordPress icon', 'twork-builder' ), value: 'dashicon' },
	{ label: __( 'Image / GIF', 'twork-builder' ), value: 'image' },
	{ label: __( 'Video', 'twork-builder' ), value: 'video' },
];

export const MEDIA_TYPE_OPTIONS = [
	{ label: __( 'Image', 'twork-builder' ), value: 'image' },
	{ label: __( 'Video', 'twork-builder' ), value: 'video' },
	{ label: __( 'Font Awesome', 'twork-builder' ), value: 'fontawesome' },
	{ label: __( 'WordPress icon', 'twork-builder' ), value: 'dashicon' },
];

export const PHOTO_TYPE_OPTIONS = [
	{ label: __( 'Image / GIF', 'twork-builder' ), value: 'image' },
	{ label: __( 'Video', 'twork-builder' ), value: 'video' },
	{ label: __( 'Font Awesome', 'twork-builder' ), value: 'fontawesome' },
	{ label: __( 'WordPress icon', 'twork-builder' ), value: 'dashicon' },
];

export const INFO_CARD_ICON_TYPE_OPTIONS = [
	{ label: __( 'Font Awesome', 'twork-builder' ), value: 'fontawesome' },
	{ label: __( 'WordPress icon', 'twork-builder' ), value: 'dashicon' },
	{ label: __( 'Image', 'twork-builder' ), value: 'image' },
];

export const DASHICON_OPTIONS = [
	{ label: __( 'Phone', 'twork-builder' ), value: 'dashicons-phone' },
	{ label: __( 'Email', 'twork-builder' ), value: 'dashicons-email' },
	{ label: __( 'Location', 'twork-builder' ), value: 'dashicons-location' },
	{ label: __( 'Heart', 'twork-builder' ), value: 'dashicons-heart' },
	{
		label: __( 'Admin users', 'twork-builder' ),
		value: 'dashicons-admin-users',
	},
	{
		label: __( 'Arrow right', 'twork-builder' ),
		value: 'dashicons-arrow-right-alt2',
	},
];

/** Curated Dashicons for Endoscopy EndoIconPicker grid. */
export const ENDO_DASHICON_OPTIONS = [
	{ value: 'dashicons-heart', label: __( 'Heart', 'twork-builder' ) },
	{ value: 'dashicons-plus-alt', label: __( 'Plus', 'twork-builder' ) },
	{ value: 'dashicons-yes', label: __( 'Yes', 'twork-builder' ) },
	{ value: 'dashicons-yes-alt', label: __( 'Yes alt', 'twork-builder' ) },
	{ value: 'dashicons-no', label: __( 'No', 'twork-builder' ) },
	{ value: 'dashicons-warning', label: __( 'Warning', 'twork-builder' ) },
	{ value: 'dashicons-info', label: __( 'Info', 'twork-builder' ) },
	{ value: 'dashicons-editor-help', label: __( 'Help', 'twork-builder' ) },
	{ value: 'dashicons-star-filled', label: __( 'Star', 'twork-builder' ) },
	{ value: 'dashicons-flag', label: __( 'Flag', 'twork-builder' ) },
	{ value: 'dashicons-location', label: __( 'Location', 'twork-builder' ) },
	{
		value: 'dashicons-location-alt',
		label: __( 'Location alt', 'twork-builder' ),
	},
	{ value: 'dashicons-phone', label: __( 'Phone', 'twork-builder' ) },
	{ value: 'dashicons-email', label: __( 'Email', 'twork-builder' ) },
	{ value: 'dashicons-admin-users', label: __( 'Users', 'twork-builder' ) },
	{ value: 'dashicons-admin-user', label: __( 'User', 'twork-builder' ) },
	{ value: 'dashicons-groups', label: __( 'Groups', 'twork-builder' ) },
	{
		value: 'dashicons-businessman',
		label: __( 'Businessman', 'twork-builder' ),
	},
	{ value: 'dashicons-calendar', label: __( 'Calendar', 'twork-builder' ) },
	{
		value: 'dashicons-calendar-alt',
		label: __( 'Calendar alt', 'twork-builder' ),
	},
	{ value: 'dashicons-clock', label: __( 'Clock', 'twork-builder' ) },
	{
		value: 'dashicons-backup',
		label: __( 'Backup / time', 'twork-builder' ),
	},
	{ value: 'dashicons-clipboard', label: __( 'Clipboard', 'twork-builder' ) },
	{
		value: 'dashicons-media-document',
		label: __( 'Document', 'twork-builder' ),
	},
	{ value: 'dashicons-media-text', label: __( 'Text', 'twork-builder' ) },
	{ value: 'dashicons-portfolio', label: __( 'Portfolio', 'twork-builder' ) },
	{ value: 'dashicons-hammer', label: __( 'Hammer', 'twork-builder' ) },
	{ value: 'dashicons-admin-tools', label: __( 'Tools', 'twork-builder' ) },
	{ value: 'dashicons-admin-generic', label: __( 'Cog', 'twork-builder' ) },
	{
		value: 'dashicons-admin-settings',
		label: __( 'Settings', 'twork-builder' ),
	},
	{
		value: 'dashicons-performance',
		label: __( 'Performance', 'twork-builder' ),
	},
	{ value: 'dashicons-chart-bar', label: __( 'Chart bar', 'twork-builder' ) },
	{
		value: 'dashicons-chart-line',
		label: __( 'Chart line', 'twork-builder' ),
	},
	{
		value: 'dashicons-chart-area',
		label: __( 'Chart area', 'twork-builder' ),
	},
	{ value: 'dashicons-analytics', label: __( 'Analytics', 'twork-builder' ) },
	{
		value: 'dashicons-visibility',
		label: __( 'Visibility', 'twork-builder' ),
	},
	{ value: 'dashicons-search', label: __( 'Search', 'twork-builder' ) },
	{ value: 'dashicons-filter', label: __( 'Filter', 'twork-builder' ) },
	{ value: 'dashicons-update', label: __( 'Update', 'twork-builder' ) },
	{ value: 'dashicons-migrate', label: __( 'Migrate', 'twork-builder' ) },
	{
		value: 'dashicons-arrow-right-alt',
		label: __( 'Arrow right', 'twork-builder' ),
	},
	{
		value: 'dashicons-arrow-right-alt2',
		label: __( 'Arrow right 2', 'twork-builder' ),
	},
	{
		value: 'dashicons-arrow-left-alt',
		label: __( 'Arrow left', 'twork-builder' ),
	},
	{
		value: 'dashicons-arrow-up-alt',
		label: __( 'Arrow up', 'twork-builder' ),
	},
	{
		value: 'dashicons-arrow-down-alt',
		label: __( 'Arrow down', 'twork-builder' ),
	},
	{ value: 'dashicons-plus', label: __( 'Plus small', 'twork-builder' ) },
	{ value: 'dashicons-minus', label: __( 'Minus', 'twork-builder' ) },
	{ value: 'dashicons-dismiss', label: __( 'Dismiss', 'twork-builder' ) },
	{ value: 'dashicons-marker', label: __( 'Marker', 'twork-builder' ) },
	{ value: 'dashicons-tag', label: __( 'Tag', 'twork-builder' ) },
	{ value: 'dashicons-category', label: __( 'Category', 'twork-builder' ) },
	{ value: 'dashicons-building', label: __( 'Building', 'twork-builder' ) },
	{ value: 'dashicons-store', label: __( 'Store', 'twork-builder' ) },
	{ value: 'dashicons-cart', label: __( 'Cart', 'twork-builder' ) },
	{ value: 'dashicons-shield', label: __( 'Shield', 'twork-builder' ) },
	{ value: 'dashicons-lock', label: __( 'Lock', 'twork-builder' ) },
	{ value: 'dashicons-unlock', label: __( 'Unlock', 'twork-builder' ) },
	{ value: 'dashicons-awards', label: __( 'Awards', 'twork-builder' ) },
	{ value: 'dashicons-smiley', label: __( 'Smiley', 'twork-builder' ) },
	{ value: 'dashicons-format-image', label: __( 'Image', 'twork-builder' ) },
	{ value: 'dashicons-format-video', label: __( 'Video', 'twork-builder' ) },
	{
		value: 'dashicons-video-alt3',
		label: __( 'Video alt', 'twork-builder' ),
	},
	{
		value: 'dashicons-microphone',
		label: __( 'Microphone', 'twork-builder' ),
	},
	{ value: 'dashicons-megaphone', label: __( 'Megaphone', 'twork-builder' ) },
	{ value: 'dashicons-lightbulb', label: __( 'Lightbulb', 'twork-builder' ) },
	{ value: 'dashicons-sos', label: __( 'SOS', 'twork-builder' ) },
	{ value: 'dashicons-tickets-alt', label: __( 'Tickets', 'twork-builder' ) },
	{
		value: 'dashicons-universal-access',
		label: __( 'Accessibility', 'twork-builder' ),
	},
	{
		value: 'dashicons-universal-access-alt',
		label: __( 'Accessibility alt', 'twork-builder' ),
	},
];

/** Curated Font Awesome (solid) for Endoscopy EndoIconPicker grid. */
export const ENDO_FA_OPTIONS = [
	{ value: 'fas fa-heart', label: __( 'Heart', 'twork-builder' ) },
	{
		value: 'fas fa-heart-crack',
		label: __( 'Heart crack', 'twork-builder' ),
	},
	{
		value: 'fas fa-shield-heart',
		label: __( 'Shield heart', 'twork-builder' ),
	},
	{
		value: 'fas fa-stethoscope',
		label: __( 'Stethoscope', 'twork-builder' ),
	},
	{ value: 'fas fa-user-doctor', label: __( 'Doctor', 'twork-builder' ) },
	{ value: 'fas fa-user-nurse', label: __( 'Nurse', 'twork-builder' ) },
	{ value: 'fas fa-user', label: __( 'User', 'twork-builder' ) },
	{ value: 'fas fa-hospital', label: __( 'Hospital', 'twork-builder' ) },
	{
		value: 'fas fa-house-medical',
		label: __( 'House medical', 'twork-builder' ),
	},
	{
		value: 'fas fa-house-chimney-medical',
		label: __( 'House chimney medical', 'twork-builder' ),
	},
	{ value: 'fas fa-ambulance', label: __( 'Ambulance', 'twork-builder' ) },
	{
		value: 'fas fa-kit-medical',
		label: __( 'Medical kit', 'twork-builder' ),
	},
	{
		value: 'fas fa-briefcase-medical',
		label: __( 'Briefcase medical', 'twork-builder' ),
	},
	{
		value: 'fas fa-notes-medical',
		label: __( 'Notes medical', 'twork-builder' ),
	},
	{
		value: 'fas fa-comment-medical',
		label: __( 'Comment medical', 'twork-builder' ),
	},
	{
		value: 'fas fa-hand-holding-medical',
		label: __( 'Hand holding medical', 'twork-builder' ),
	},
	{ value: 'fas fa-syringe', label: __( 'Syringe', 'twork-builder' ) },
	{ value: 'fas fa-pills', label: __( 'Pills', 'twork-builder' ) },
	{ value: 'fas fa-capsules', label: __( 'Capsules', 'twork-builder' ) },
	{ value: 'fas fa-flask', label: __( 'Flask', 'twork-builder' ) },
	{ value: 'fas fa-microscope', label: __( 'Microscope', 'twork-builder' ) },
	{ value: 'fas fa-dna', label: __( 'DNA', 'twork-builder' ) },
	{ value: 'fas fa-bacteria', label: __( 'Bacteria', 'twork-builder' ) },
	{ value: 'fas fa-virus', label: __( 'Virus', 'twork-builder' ) },
	{ value: 'fas fa-lungs', label: __( 'Lungs', 'twork-builder' ) },
	{ value: 'fas fa-brain', label: __( 'Brain', 'twork-builder' ) },
	{ value: 'fas fa-eye', label: __( 'Eye', 'twork-builder' ) },
	{ value: 'fas fa-tooth', label: __( 'Tooth', 'twork-builder' ) },
	{ value: 'fas fa-bone', label: __( 'Bone', 'twork-builder' ) },
	{ value: 'fas fa-bed', label: __( 'Bed', 'twork-builder' ) },
	{ value: 'fas fa-bed-pulse', label: __( 'Bed pulse', 'twork-builder' ) },
	{ value: 'fas fa-wheelchair', label: __( 'Wheelchair', 'twork-builder' ) },
	{ value: 'fas fa-crutch', label: __( 'Crutch', 'twork-builder' ) },
	{ value: 'fas fa-fire', label: __( 'Fire', 'twork-builder' ) },
	{ value: 'fas fa-bolt', label: __( 'Bolt', 'twork-builder' ) },
	{ value: 'fas fa-droplet', label: __( 'Droplet', 'twork-builder' ) },
	{ value: 'fas fa-feather', label: __( 'Feather', 'twork-builder' ) },
	{ value: 'fas fa-utensils', label: __( 'Utensils', 'twork-builder' ) },
	{ value: 'fas fa-bowl-food', label: __( 'Bowl food', 'twork-builder' ) },
	{ value: 'fas fa-mug-hot', label: __( 'Mug hot', 'twork-builder' ) },
	{ value: 'fas fa-mug-saucer', label: __( 'Mug saucer', 'twork-builder' ) },
	{ value: 'fas fa-ban', label: __( 'Ban', 'twork-builder' ) },
	{
		value: 'fas fa-weight-scale',
		label: __( 'Weight scale', 'twork-builder' ),
	},
	{
		value: 'fas fa-battery-quarter',
		label: __( 'Battery low', 'twork-builder' ),
	},
	{
		value: 'fas fa-clipboard-list',
		label: __( 'Clipboard list', 'twork-builder' ),
	},
	{
		value: 'fas fa-clipboard-user',
		label: __( 'Clipboard user', 'twork-builder' ),
	},
	{ value: 'fas fa-list-check', label: __( 'List check', 'twork-builder' ) },
	{ value: 'fas fa-check', label: __( 'Check', 'twork-builder' ) },
	{
		value: 'fas fa-circle-check',
		label: __( 'Circle check', 'twork-builder' ),
	},
	{ value: 'fas fa-xmark', label: __( 'X mark', 'twork-builder' ) },
	{ value: 'fas fa-plus', label: __( 'Plus', 'twork-builder' ) },
	{
		value: 'fas fa-triangle-exclamation',
		label: __( 'Warning', 'twork-builder' ),
	},
	{ value: 'fas fa-circle-info', label: __( 'Info', 'twork-builder' ) },
	{
		value: 'fas fa-circle-question',
		label: __( 'Question', 'twork-builder' ),
	},
	{ value: 'fas fa-calendar', label: __( 'Calendar', 'twork-builder' ) },
	{
		value: 'fas fa-calendar-check',
		label: __( 'Calendar check', 'twork-builder' ),
	},
	{
		value: 'fas fa-calendar-day',
		label: __( 'Calendar day', 'twork-builder' ),
	},
	{
		value: 'fas fa-calendar-days',
		label: __( 'Calendar days', 'twork-builder' ),
	},
	{ value: 'fas fa-clock', label: __( 'Clock', 'twork-builder' ) },
	{
		value: 'fas fa-clock-rotate-left',
		label: __( 'Clock rotate', 'twork-builder' ),
	},
	{ value: 'fas fa-route', label: __( 'Route', 'twork-builder' ) },
	{ value: 'fas fa-location-dot', label: __( 'Location', 'twork-builder' ) },
	{ value: 'fas fa-car-side', label: __( 'Car', 'twork-builder' ) },
	{ value: 'fas fa-phone', label: __( 'Phone', 'twork-builder' ) },
	{
		value: 'fas fa-phone-volume',
		label: __( 'Phone volume', 'twork-builder' ),
	},
	{ value: 'fas fa-envelope', label: __( 'Envelope', 'twork-builder' ) },
	{ value: 'fas fa-language', label: __( 'Language', 'twork-builder' ) },
	{ value: 'fas fa-star', label: __( 'Star', 'twork-builder' ) },
	{ value: 'fas fa-microchip', label: __( 'Microchip', 'twork-builder' ) },
	{
		value: 'fas fa-diagram-project',
		label: __( 'Diagram', 'twork-builder' ),
	},
	{
		value: 'fas fa-wave-square',
		label: __( 'Wave square', 'twork-builder' ),
	},
	{ value: 'fas fa-crosshairs', label: __( 'Crosshairs', 'twork-builder' ) },
	{
		value: 'fas fa-satellite-dish',
		label: __( 'Satellite', 'twork-builder' ),
	},
	{
		value: 'fas fa-file-waveform',
		label: __( 'File waveform', 'twork-builder' ),
	},
	{
		value: 'fas fa-file-invoice-dollar',
		label: __( 'Invoice', 'twork-builder' ),
	},
	{ value: 'fas fa-arrows-rotate', label: __( 'Rotate', 'twork-builder' ) },
	{
		value: 'fas fa-arrow-right',
		label: __( 'Arrow right', 'twork-builder' ),
	},
	{ value: 'fas fa-gear', label: __( 'Gear', 'twork-builder' ) },
	{ value: 'fas fa-shield', label: __( 'Shield', 'twork-builder' ) },
];
