/**
 * Mk Blog Section – Block registration
 * Dynamic block rendered in PHP (see mk_render_blog_section).
 */
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null, // Dynamic render via PHP
} );
