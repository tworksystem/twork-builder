<?php
/**
 * About Milestones Section — front-end render.
 *
 * @package TworkBuilder
 */

defined( 'ABSPATH' ) || exit;

/**
 * Default attributes for twork/about-milestones-section.
 *
 * @return array<string, mixed>
 */
function twork_about_milestones_default_attributes() {
	return array(
		'timelineEyebrow' => 'OUR JOURNEY',
		'timelineTitle'   => 'Milestones',
		'milestones'      => array(
			array(
				'id'    => 'm1',
				'year'  => 'Founded',
				'title' => 'Mandalay Origins',
				'text'  => 'Shwe Myanmar Foodstuff Industry established in Mandalay, bringing traditional butter-making heritage to modern production.',
			),
			array(
				'id'    => 'm2',
				'year'  => 'Growth',
				'title' => 'Nationwide Distribution',
				'text'  => 'Expanded distribution across Myanmar — Mandalay, Yangon, Sagaing, Shan, and Magway regions.',
			),
			array(
				'id'    => 'm3',
				'year'  => 'Today',
				'title' => '10 Viss Bulk Launch',
				'text'  => 'Introduced our flagship 10 Viss (≈16.33 kg) bulk pack for wholesale and commercial customers.',
			),
		),
	);
}

/**
 * Build milestones markup (shared with about-story-section).
 *
 * @param array<string, mixed> $atts Attributes with timelineEyebrow, timelineTitle, milestones.
 * @return string
 */
function twork_build_about_milestones_markup( array $atts ) {
	$defaults = twork_about_milestones_default_attributes();
	$atts     = wp_parse_args( $atts, $defaults );

	if ( empty( $atts['milestones'] ) ) {
		$atts['milestones'] = $defaults['milestones'];
	}
	if ( empty( $atts['timelineEyebrow'] ) ) {
		$atts['timelineEyebrow'] = $defaults['timelineEyebrow'];
	}
	if ( empty( $atts['timelineTitle'] ) ) {
		$atts['timelineTitle'] = $defaults['timelineTitle'];
	}

	$html = '<div class="about-story__milestones">';
	$html .= '<header class="section-head">';
	$html .= '<p class="section-head__eyebrow">' . esc_html( (string) $atts['timelineEyebrow'] ) . '</p>';
	$html .= '<h2 class="section-head__title">' . esc_html( (string) $atts['timelineTitle'] ) . '</h2>';
	$html .= '</header>';

	if ( ! empty( $atts['milestones'] ) && is_array( $atts['milestones'] ) ) {
		$html .= '<div class="about-story__timeline" data-list="milestones">';
		foreach ( $atts['milestones'] as $item ) {
			if ( ! is_array( $item ) ) {
				continue;
			}
			$html .= sprintf(
				'<div class="about-story__milestone" data-item-id="%1$s">',
				esc_attr( isset( $item['id'] ) ? (string) $item['id'] : '' )
			);
			if ( ! empty( $item['year'] ) ) {
				$html .= '<span class="about-story__year">' . esc_html( (string) $item['year'] ) . '</span>';
			}
			if ( ! empty( $item['title'] ) ) {
				$html .= '<h3 class="about-story__milestone-title">' . esc_html( (string) $item['title'] ) . '</h3>';
			}
			if ( ! empty( $item['text'] ) ) {
				$html .= '<p class="about-story__milestone-text">' . esc_html( (string) $item['text'] ) . '</p>';
			}
			$html .= '</div>';
		}
		$html .= '</div>';
	}

	$html .= '</div>';

	return $html;
}

/**
 * Render callback for twork/about-milestones-section.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Saved inner HTML.
 * @param WP_Block $block      Block instance.
 * @return string
 */
function twork_render_about_milestones_section( $attributes, $content, $block ) {
	$wrapper_attrs = get_block_wrapper_attributes(
		array(
			'class'        => 'about-milestones about-story',
			'data-block'   => 'twork/about-milestones-section',
			'data-version' => '1',
		)
	);

	$html = '<section ' . $wrapper_attrs . ' aria-label="Milestones">';
	$html .= '<div class="about-milestones__inner l-section">';
	$html .= twork_build_about_milestones_markup( $attributes );
	$html .= '</div>';
	$html .= '</section>';

	return $html;
}
