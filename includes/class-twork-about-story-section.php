<?php
/**
 * About Story Section — front-end render from attributes.
 *
 * @package TworkBuilder
 */

defined('ABSPATH') || exit;

/**
 * Default attributes for twork/about-story-section.
 *
 * @return array<string, mixed>
 */
function twork_about_story_default_attributes() {
	return array(
		'eyebrow'          => 'WHO WE ARE',
		'title'            => 'Shwe Myanmar Foodstuff Industry',
		'paragraphs'       => array(
			'Shwe Myanmar (ရွှေမြန်မာ) is a registered trademark of Shwe Myanmar Foodstuff Industry, proudly based in Mandalay, Myanmar. We specialize in premium butter (ထောပတ်) and ghee (နွားချဉ်ထောပတ်) for households, restaurants, and commercial kitchens nationwide.',
			'Our motto — သဘာဝ အနံ့ သဘာဝ အရသာ (Natural scent, natural taste) — reflects our commitment to authentic flavor using carefully selected natural ingredients and traditional craftsmanship combined with modern quality standards.',
			'From our 1 Viss retail packs to our flagship 10 Viss bulk size, we offer options for every kitchen and every business.',
		),
		'ctaLabel'         => 'VIEW OUR PRODUCTS',
		'ctaHref'          => '/shop',
		'imageUrl'         => 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=560&h=400&fit=crop&q=80',
		'imageAlt'         => 'Shwe Myanmar butter production',
		'timelineEyebrow'  => 'OUR JOURNEY',
		'timelineTitle'    => 'Milestones',
		'milestones'       => array(
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
		'valuesEyebrow'    => 'OUR VALUES',
		'valuesTitle'      => 'What We Stand For',
		'values'           => array(
			array(
				'id'     => 'v1',
				'number' => '01',
				'title'  => 'Natural Quality',
				'text'   => 'Carefully selected ingredients for authentic butter and ghee flavor.',
			),
			array(
				'id'     => 'v2',
				'number' => '02',
				'title'  => 'Consistency',
				'text'   => 'Every batch meets strict quality standards from our Mandalay facility.',
			),
			array(
				'id'     => 'v3',
				'number' => '03',
				'title'  => 'Accessibility',
				'text'   => 'Premium products at fair prices for families and businesses alike.',
			),
		),
	);
}

/**
 * Render callback for twork/about-story-section.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Saved inner HTML (unused when attrs drive output).
 * @param WP_Block $block      Block instance.
 * @return string
 */
function twork_render_about_story_section( $attributes, $content, $block ) {
	$defaults = twork_about_story_default_attributes();
	$atts     = wp_parse_args( $attributes, $defaults );

	if ( empty( $atts['milestones'] ) ) {
		$atts['milestones'] = $defaults['milestones'];
	}
	if ( empty( $atts['values'] ) ) {
		$atts['values'] = $defaults['values'];
	}
	if ( empty( $atts['paragraphs'] ) ) {
		$atts['paragraphs'] = $defaults['paragraphs'];
	}
	if ( empty( $atts['timelineEyebrow'] ) ) {
		$atts['timelineEyebrow'] = $defaults['timelineEyebrow'];
	}
	if ( empty( $atts['timelineTitle'] ) ) {
		$atts['timelineTitle'] = $defaults['timelineTitle'];
	}
	if ( empty( $atts['valuesEyebrow'] ) ) {
		$atts['valuesEyebrow'] = $defaults['valuesEyebrow'];
	}
	if ( empty( $atts['valuesTitle'] ) ) {
		$atts['valuesTitle'] = $defaults['valuesTitle'];
	}

	$wrapper_attrs = get_block_wrapper_attributes(
		array(
			'class'        => 'about-story',
			'data-block'   => 'twork/about-story-section',
			'data-version' => '1',
		)
	);

	$html = '<section ' . $wrapper_attrs . '>';
	$html .= '<div class="about-story__inner l-section">';

	$html .= '<div class="about-story__intro" id="story">';
	$html .= '<div class="about-story__intro-text">';
	$html .= '<header class="section-head section-head--row"><div>';

	if ( ! empty( $atts['eyebrow'] ) ) {
		$html .= '<p class="section-head__eyebrow">' . esc_html( (string) $atts['eyebrow'] ) . '</p>';
	}
	if ( ! empty( $atts['title'] ) ) {
		$html .= '<h2 class="section-head__title">' . esc_html( (string) $atts['title'] ) . '</h2>';
	}

	$html .= '</div></header>';

	if ( ! empty( $atts['paragraphs'] ) && is_array( $atts['paragraphs'] ) ) {
		foreach ( $atts['paragraphs'] as $paragraph ) {
			if ( ! is_string( $paragraph ) || $paragraph === '' ) {
				continue;
			}
			$html .= '<p class="about-story__para">' . esc_html( $paragraph ) . '</p>';
		}
	}

	if ( ! empty( $atts['ctaLabel'] ) ) {
		$html .= sprintf(
			'<a class="btn btn--primary" href="%1$s">%2$s</a>',
			esc_url( (string) ( $atts['ctaHref'] ?: '#' ) ),
			esc_html( (string) $atts['ctaLabel'] )
		);
	}

	$html .= '</div>';

	if ( ! empty( $atts['imageUrl'] ) ) {
		$html .= '<div class="about-story__intro-media">';
		$html .= sprintf(
			'<img class="about-story__image" src="%1$s" alt="%2$s" width="560" height="400" loading="lazy" decoding="async" />',
			esc_url( (string) $atts['imageUrl'] ),
			esc_attr( (string) ( $atts['imageAlt'] ?? '' ) )
		);
		$html .= '</div>';
	}

	$html .= '</div>';

	if ( function_exists( 'twork_build_about_milestones_markup' ) ) {
		$html .= twork_build_about_milestones_markup( $atts );
	}

	$html .= '<div class="about-story__values">';
	$html .= '<header class="section-head">';

	if ( ! empty( $atts['valuesEyebrow'] ) ) {
		$html .= '<p class="section-head__eyebrow">' . esc_html( (string) $atts['valuesEyebrow'] ) . '</p>';
	}
	if ( ! empty( $atts['valuesTitle'] ) ) {
		$html .= '<h2 class="section-head__title">' . esc_html( (string) $atts['valuesTitle'] ) . '</h2>';
	}

	$html .= '</header>';

	if ( ! empty( $atts['values'] ) && is_array( $atts['values'] ) ) {
		$html .= '<div class="about-story__values-grid" data-list="values">';
		foreach ( $atts['values'] as $item ) {
			if ( ! is_array( $item ) ) {
				continue;
			}
			$html .= sprintf(
				'<div class="about-story__value" data-item-id="%1$s">',
				esc_attr( isset( $item['id'] ) ? (string) $item['id'] : '' )
			);
			if ( ! empty( $item['number'] ) ) {
				$html .= '<span class="about-story__value-num">' . esc_html( (string) $item['number'] ) . '</span>';
			}
			if ( ! empty( $item['title'] ) ) {
				$html .= '<h3 class="about-story__value-title">' . esc_html( (string) $item['title'] ) . '</h3>';
			}
			if ( ! empty( $item['text'] ) ) {
				$html .= '<p class="about-story__value-text">' . esc_html( (string) $item['text'] ) . '</p>';
			}
			$html .= '</div>';
		}
		$html .= '</div>';
	}

	$html .= '</div>';
	$html .= '</div>';
	$html .= '</section>';

	return $html;
}
