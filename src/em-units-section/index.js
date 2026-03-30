/**
 * Twork Emergency Units Section – Block registration
 * Specialized Emergency Units – displays WordPress posts as unit cards. Dynamic block (PHP render).
 */
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null, // Dynamic block – rendered by PHP
} );
