/**
 * Whitelist icon SVGs for why-choose-us (design keys only).
 */
import { createElement } from '@wordpress/element';

const SIZE = {
	width: 32,
	height: 32,
	viewBox: '0 0 24 24',
	fill: 'none',
	stroke: 'currentColor',
	strokeWidth: '1.5',
	'aria-hidden': true,
};

const PATHS = {
	cube: createElement(
		'svg',
		SIZE,
		createElement( 'path', {
			d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
		} )
	),
	star: createElement(
		'svg',
		SIZE,
		createElement( 'polygon', {
			points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2',
		} )
	),
	truck: createElement(
		'svg',
		SIZE,
		createElement( 'rect', { x: '1', y: '3', width: '15', height: '13' } ),
		createElement( 'polygon', {
			points: '16 8 20 8 23 11 23 16 16 16 16 8',
		} ),
		createElement( 'circle', { cx: '5.5', cy: '18.5', r: '2.5' } ),
		createElement( 'circle', { cx: '18.5', cy: '18.5', r: '2.5' } )
	),
	tag: createElement(
		'svg',
		SIZE,
		createElement( 'path', {
			d: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z',
		} ),
		createElement( 'line', { x1: '7', y1: '7', x2: '7.01', y2: '7' } )
	),
	cherry: createElement(
		'svg',
		SIZE,
		createElement( 'path', {
			d: 'M12 22c-4 0-6-3-6-6 0-3 2-5 6-8 4 3 6 5 6 8 0 3-2 6-6 6z',
		} ),
		createElement( 'path', { d: 'M12 8V2' } ),
		createElement( 'path', { d: 'M8 4c2 2 4 2 4 4' } )
	),
	cert: createElement(
		'svg',
		SIZE,
		createElement( 'path', {
			d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
		} ),
		createElement( 'polyline', { points: '14 2 14 8 20 8' } ),
		createElement( 'line', { x1: '16', y1: '13', x2: '8', y2: '13' } ),
		createElement( 'line', { x1: '16', y1: '17', x2: '8', y2: '17' } )
	),
};

export const ICON_OPTIONS = [
	{ label: 'Cube', value: 'cube' },
	{ label: 'Star', value: 'star' },
	{ label: 'Truck', value: 'truck' },
	{ label: 'Tag', value: 'tag' },
	{ label: 'Cherry', value: 'cherry' },
	{ label: 'Cert', value: 'cert' },
];

export function getFeatureIcon( key ) {
	return PATHS[ key ] || PATHS.cube;
}
