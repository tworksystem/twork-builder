/**
 * Twork Updates Section – Block registration
 * Hospital News & Updates – displays WordPress posts. Dynamic block (PHP render).
 */
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null, // Dynamic block – rendered by PHP
} );
