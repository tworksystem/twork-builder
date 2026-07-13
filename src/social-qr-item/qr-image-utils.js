export const OBJECT_FIT_OPTIONS = [
	{ label: 'Contain (full QR)', value: 'contain' },
	{ label: 'Cover (crop fill)', value: 'cover' },
];

export const FOCAL_PRESET_OPTIONS = [
	{ label: 'Center', value: 'center' },
	{ label: 'Top', value: 'top' },
	{ label: 'Bottom', value: 'bottom' },
	{ label: 'Left', value: 'left' },
	{ label: 'Right', value: 'right' },
	{ label: 'Top Left', value: 'top-left' },
	{ label: 'Top Right', value: 'top-right' },
	{ label: 'Bottom Left', value: 'bottom-left' },
	{ label: 'Bottom Right', value: 'bottom-right' },
];

export const FOCAL_PRESET_COORDS = {
	center: { x: 50, y: 50 },
	top: { x: 50, y: 0 },
	bottom: { x: 50, y: 100 },
	left: { x: 0, y: 50 },
	right: { x: 100, y: 50 },
	'top-left': { x: 0, y: 0 },
	'top-right': { x: 100, y: 0 },
	'bottom-left': { x: 0, y: 100 },
	'bottom-right': { x: 100, y: 100 },
};

export function getQrImageStyle( {
	qrImageObjectFit = 'contain',
	qrImagePositionX = 50,
	qrImagePositionY = 50,
	qrImageScale = 1,
} ) {
	const scale = Number( qrImageScale ) || 1;
	const positionX = Number( qrImagePositionX );
	const positionY = Number( qrImagePositionY );

	return {
		width: '100%',
		height: '100%',
		objectFit: qrImageObjectFit,
		objectPosition: `${ positionX }% ${ positionY }%`,
		display: 'block',
		transform: scale !== 1 ? `scale(${ scale })` : undefined,
		transformOrigin: `${ positionX }% ${ positionY }%`,
	};
}
