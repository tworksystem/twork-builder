<?php
/**
 * Server-side render: twork/about-story-section
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Saved inner HTML (unused).
 * @var WP_Block $block      Block instance.
 *
 * @package TworkBuilder
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'twork_render_about_story_section' ) ) {
	return '';
}

return twork_render_about_story_section( $attributes, $content, $block );
