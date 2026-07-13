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
	{ label: __( 'Admin users', 'twork-builder' ), value: 'dashicons-admin-users' },
	{ label: __( 'Arrow right', 'twork-builder' ), value: 'dashicons-arrow-right-alt2' },
];
