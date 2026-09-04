<?php
/**
 * Site Template Kits — registry, block serialization, page apply.
 *
 * @package TworkBuilder
 */

if (!defined('ABSPATH')) {
	exit;
}

class Twork_Site_Templates {

	const META_KIT_PAGE = '_twork_kit_page';
	const META_KIT_ID   = '_twork_kit_id';
	const OPTION_ACTIVE = 'twork_active_kit';
	const OPTION_LOG    = 'twork_kit_apply_log';

	/** @var array<string, array<int, array<string, mixed>>>|null */
	protected static $inner_templates = null;

	/**
	 * Absolute path to kits directory.
	 *
	 * @return string
	 */
	public static function kits_dir() {
		return TWORK_BUILDER_PATH . 'templates/kits';
	}

	/**
	 * Absolute path to block-default HTML fragments.
	 *
	 * @return string
	 */
	public static function defaults_dir() {
		return TWORK_BUILDER_PATH . 'templates/block-defaults';
	}

	/**
	 * List all kit summaries (id, label, description, page_count, preview, pages).
	 *
	 * @return array<int, array<string, mixed>>
	 */
	public static function list_kits() {
		$dir  = self::kits_dir();
		$kits = array();

		if (!is_dir($dir)) {
			return $kits;
		}

		$files = glob($dir . '/kit-*.json');
		if (!$files) {
			return $kits;
		}

		sort($files, SORT_NATURAL);

		foreach ($files as $file) {
			$data = self::read_kit_file($file);
			if (!$data) {
				continue;
			}

			$pages = array();
			if (!empty($data['pages']) && is_array($data['pages'])) {
				foreach ($data['pages'] as $page) {
					if (!is_array($page)) {
						continue;
					}
					$block_titles = array();
					if (!empty($page['blocks']) && is_array($page['blocks'])) {
						foreach ($page['blocks'] as $b) {
							if (empty($b['name'])) {
								continue;
							}
							$block_titles[] = self::block_title_from_name((string) $b['name']);
						}
					}
					$pages[] = array(
						'title'  => isset($page['title']) ? (string) $page['title'] : '',
						'slug'   => isset($page['slug']) ? (string) $page['slug'] : '',
						'front'  => !empty($page['is_front']),
						'blocks' => $block_titles,
					);
				}
			}

			$preview = '';
			if (!empty($data['preview'])) {
				$rel = ltrim((string) $data['preview'], '/');
				$path = TWORK_BUILDER_PATH . $rel;
				if (is_readable($path)) {
					$preview = TWORK_BUILDER_URL . $rel;
				}
			}

			$kits[] = array(
				'id'          => (int) $data['id'],
				'slug'        => isset($data['slug']) ? (string) $data['slug'] : '',
				'label'       => isset($data['label']) ? (string) $data['label'] : '',
				'description' => isset($data['description']) ? (string) $data['description'] : '',
				'page_count'  => count($pages),
				'preview'     => $preview,
				'pages'       => $pages,
			);
		}

		return $kits;
	}

	/**
	 * Resolve block.json path (build first, then src for local dev).
	 *
	 * @param string $slug Block slug without twork/.
	 * @return string Empty if missing.
	 */
	protected static function block_json_path($slug) {
		$slug = sanitize_title($slug);
		$candidates = array(
			TWORK_BUILDER_PATH . 'build/' . $slug . '/block.json',
			TWORK_BUILDER_PATH . 'src/' . $slug . '/block.json',
		);
		foreach ($candidates as $path) {
			if (is_readable($path)) {
				return $path;
			}
		}
		return '';
	}

	/**
	 * Human title from block name.
	 *
	 * @param string $name Block name e.g. twork/brand-header.
	 * @return string
	 */
	public static function block_title_from_name($name) {
		$slug = str_replace('twork/', '', $name);
		$bj   = self::block_json_path($slug);
		if ($bj !== '') {
			$data = json_decode((string) file_get_contents($bj), true);
			if (is_array($data) && !empty($data['title'])) {
				return (string) $data['title'];
			}
		}
		return ucwords(str_replace('-', ' ', $slug));
	}

	/**
	 * Load full kit by numeric id.
	 *
	 * @param int $kit_id Kit id (1–9).
	 * @return array<string, mixed>|null
	 */
	public static function get_kit($kit_id) {
		$kit_id = absint($kit_id);
		$file   = self::kits_dir() . '/kit-' . sprintf('%02d', $kit_id) . '.json';

		if (!is_readable($file)) {
			foreach ((array) glob(self::kits_dir() . '/kit-*.json') as $candidate) {
				$data = self::read_kit_file($candidate);
				if ($data && (int) $data['id'] === $kit_id) {
					return $data;
				}
			}
			return null;
		}

		return self::read_kit_file($file);
	}

	/**
	 * Apply a kit: create/update pages with block stacks.
	 *
	 * @param int $kit_id Kit id.
	 * @return array<string, mixed> Result payload.
	 */
	public static function apply_kit($kit_id) {
		$kit_id = absint($kit_id);
		$kit    = self::get_kit($kit_id);

		$result = array(
			'ok'        => false,
			'kit_id'    => $kit_id,
			'created'   => array(),
			'updated'   => array(),
			'skipped'   => array(),
			'failed'    => array(),
			'warnings'  => array(),
			'front_id'  => 0,
			'message'   => '',
		);

		if (!$kit || empty($kit['pages']) || !is_array($kit['pages'])) {
			$result['message'] = __('Kit not found or has no pages.', 'twork-builder');
			update_option(self::OPTION_LOG, $result, false);
			return $result;
		}

		$front_id = 0;

		foreach ($kit['pages'] as $page_def) {
			if (!is_array($page_def) || empty($page_def['slug']) || empty($page_def['title'])) {
				$result['failed'][] = array(
					'slug'   => isset($page_def['slug']) ? (string) $page_def['slug'] : '(invalid)',
					'reason' => 'missing title/slug',
				);
				continue;
			}

			$slug   = sanitize_title($page_def['slug']);
			$title  = sanitize_text_field($page_def['title']);
			$blocks = isset($page_def['blocks']) && is_array($page_def['blocks']) ? $page_def['blocks'] : array();

			try {
				$content  = self::serialize_page_blocks($blocks);
				$existing = self::find_page_by_slug($slug);

				if ($existing) {
					$owned = (int) get_post_meta($existing->ID, self::META_KIT_PAGE, true) === 1;
					if (!$owned) {
						$result['skipped'][] = array(
							'slug'   => $slug,
							'id'     => (int) $existing->ID,
							'reason' => 'slug exists and is not a kit-owned page',
						);
						continue;
					}

					$update = wp_update_post(
						array(
							'ID'           => $existing->ID,
							'post_title'   => $title,
							'post_content' => $content,
							'post_status'  => 'publish',
						),
						true
					);

					if (is_wp_error($update)) {
						$result['failed'][] = array(
							'slug'   => $slug,
							'reason' => $update->get_error_message(),
						);
						continue;
					}

					update_post_meta($existing->ID, self::META_KIT_ID, $kit_id);
					update_post_meta($existing->ID, self::META_KIT_PAGE, 1);
					$result['updated'][] = array(
						'slug'  => $slug,
						'id'    => (int) $existing->ID,
						'title' => $title,
					);
					$page_id = (int) $existing->ID;
				} else {
					$page_id = wp_insert_post(
						array(
							'post_type'    => 'page',
							'post_title'   => $title,
							'post_name'    => $slug,
							'post_content' => $content,
							'post_status'  => 'publish',
						),
						true
					);

					if (is_wp_error($page_id) || !$page_id) {
						$result['failed'][] = array(
							'slug'   => $slug,
							'reason' => is_wp_error($page_id) ? $page_id->get_error_message() : 'insert failed',
						);
						continue;
					}

					update_post_meta($page_id, self::META_KIT_ID, $kit_id);
					update_post_meta($page_id, self::META_KIT_PAGE, 1);
					$result['created'][] = array(
						'slug'  => $slug,
						'id'    => (int) $page_id,
						'title' => $title,
					);
				}

				if (!empty($page_def['is_front'])) {
					$front_id = (int) $page_id;
				}
			} catch (Exception $e) {
				$result['failed'][] = array(
					'slug'   => $slug,
					'reason' => $e->getMessage(),
				);
			}
		}

		if ($front_id > 0) {
			update_option('show_on_front', 'page');
			update_option('page_on_front', $front_id);
			$result['front_id'] = $front_id;
		}

		update_option(self::OPTION_ACTIVE, $kit_id, false);

		$result['ok'] = empty($result['failed']);
		$result['message'] = sprintf(
			/* translators: 1: created count 2: updated count 3: skipped count 4: failed count */
			__('Kit applied — created: %1$d, updated: %2$d, skipped: %3$d, failed: %4$d.', 'twork-builder'),
			count($result['created']),
			count($result['updated']),
			count($result['skipped']),
			count($result['failed'])
		);

		update_option(self::OPTION_LOG, $result, false);

		return $result;
	}

	/**
	 * Build post_content from kit block definitions.
	 *
	 * @param array<int, array<string, mixed>> $blocks Block defs.
	 * @return string
	 */
	public static function serialize_page_blocks(array $blocks) {
		$parsed = array();

		foreach ($blocks as $def) {
			if (!is_array($def) || empty($def['name'])) {
				continue;
			}
			$parsed[] = self::build_block_array($def);
		}

		if (empty($parsed)) {
			return '';
		}

		if (function_exists('serialize_blocks')) {
			return serialize_blocks($parsed);
		}

		$out = '';
		foreach ($parsed as $block) {
			$out .= self::serialize_block_fallback($block);
		}
		return $out;
	}

	/**
	 * Convert kit def → WP block array (with materialized markup).
	 *
	 * @param array<string, mixed> $def Kit block def.
	 * @return array<string, mixed>
	 */
	protected static function build_block_array(array $def) {
		$name  = (string) $def['name'];
		$attrs = isset($def['attrs']) && is_array($def['attrs']) ? $def['attrs'] : array();
		$inner = isset($def['inner']) && is_array($def['inner']) ? $def['inner'] : array();

		$attrs = self::merge_block_defaults($name, $attrs);

		if (empty($inner)) {
			$inner = self::inner_template_for($name);
		}

		$inner_blocks = array();
		foreach ($inner as $child) {
			if (!is_array($child) || empty($child['name'])) {
				continue;
			}
			$inner_blocks[] = self::build_block_array($child);
		}

		list($inner_html, $inner_content) = self::materialize_markup($name, $attrs, $inner_blocks);

		return array(
			'blockName'    => $name,
			'attrs'        => $attrs,
			'innerBlocks'  => $inner_blocks,
			'innerHTML'    => $inner_html,
			'innerContent' => $inner_content,
		);
	}

	/**
	 * Merge block.json attribute defaults under kit attrs.
	 *
	 * @param string               $name  Block name.
	 * @param array<string, mixed> $attrs Kit attrs.
	 * @return array<string, mixed>
	 */
	protected static function merge_block_defaults($name, array $attrs) {
		$slug = str_replace('twork/', '', $name);
		$file = self::block_json_path($slug);
		if ($file === '') {
			return $attrs;
		}
		$data = json_decode((string) file_get_contents($file), true);
		if (!is_array($data) || empty($data['attributes']) || !is_array($data['attributes'])) {
			return $attrs;
		}
		foreach ($data['attributes'] as $key => $schema) {
			if (!is_array($schema) || !array_key_exists('default', $schema)) {
				continue;
			}
			if (!array_key_exists($key, $attrs)) {
				$attrs[ $key ] = $schema['default'];
			}
		}
		return $attrs;
	}

	/**
	 * Load InnerBlocks TEMPLATE map.
	 *
	 * @return array<string, array<int, array<string, mixed>>>
	 */
	protected static function load_inner_templates() {
		if (null !== self::$inner_templates) {
			return self::$inner_templates;
		}
		$file = self::kits_dir() . '/inner-templates.json';
		if (!is_readable($file)) {
			self::$inner_templates = array();
			return self::$inner_templates;
		}
		$data = json_decode((string) file_get_contents($file), true);
		self::$inner_templates = is_array($data) ? $data : array();
		return self::$inner_templates;
	}

	/**
	 * Default inner block defs for a parent.
	 *
	 * @param string $name Block name.
	 * @return array<int, array<string, mixed>>
	 */
	protected static function inner_template_for($name) {
		$map = self::load_inner_templates();
		return isset($map[ $name ]) && is_array($map[ $name ]) ? $map[ $name ] : array();
	}

	/**
	 * Build innerHTML + innerContent from default fragment + children.
	 *
	 * @param string                    $name         Block name.
	 * @param array<string, mixed>      $attrs        Attributes.
	 * @param array<int, array<string, mixed>> $inner_blocks Built children.
	 * @return array{0:string,1:array<int, string|null>}
	 */
	protected static function materialize_markup($name, array $attrs, array $inner_blocks) {
		$slug = str_replace('twork/', '', $name);
		$file = self::defaults_dir() . '/' . $slug . '.html';

		if (!is_readable($file)) {
			if (empty($inner_blocks)) {
				return array( '', array() );
			}
			$inner_content = array();
			foreach ($inner_blocks as $_) {
				$inner_content[] = null;
			}
			return array( '', $inner_content );
		}

		$tpl = (string) file_get_contents($file);
		$tpl = self::fill_special_slots($tpl, $attrs);
		$tpl = self::fill_attr_placeholders($tpl, $attrs);

		if (strpos($tpl, '{{INNER}}') === false) {
			if (empty($inner_blocks)) {
				return array( $tpl, array( $tpl ) );
			}
			// Template has no INNER slot but children exist — append children after markup.
			$chunks = array( $tpl );
			foreach ($inner_blocks as $_) {
				$chunks[] = null;
			}
			return array( $tpl, $chunks );
		}

		$parts = explode('{{INNER}}', $tpl, 2);
		$before = $parts[0];
		$after  = isset($parts[1]) ? $parts[1] : '';

		if (empty($inner_blocks)) {
			$html = $before . $after;
			return array( $html, array( $html ) );
		}

		$inner_content   = array( $before );
		$inner_html_bits = array( $before );
		foreach ($inner_blocks as $child) {
			$inner_content[] = null;
			$child_html      = isset($child['innerHTML']) ? (string) $child['innerHTML'] : '';
			$inner_html_bits[] = $child_html;
		}
		$inner_content[]   = $after;
		$inner_html_bits[] = $after;

		return array( implode('', $inner_html_bits), $inner_content );
	}

	/**
	 * Fill footer array slots and similar.
	 *
	 * @param string               $tpl   Template.
	 * @param array<string, mixed> $attrs Attrs.
	 * @return string
	 */
	protected static function fill_special_slots($tpl, array $attrs) {
		if (strpos($tpl, '{{FOOTER_INFO_CARDS}}') !== false) {
			$cards = '';
			if (!empty($attrs['infoCards']) && is_array($attrs['infoCards'])) {
				foreach ($attrs['infoCards'] as $card) {
					if (!is_array($card)) {
						continue;
					}
					$lines = '';
					if (!empty($card['lines']) && is_array($card['lines'])) {
						foreach ($card['lines'] as $line) {
							$lines .= '<span>' . esc_html((string) $line) . '</span>';
						}
					}
					$cards .= sprintf(
						'<div class="footer__info-card" data-item-id="%1$s"><div><p class="footer__info-label">%2$s</p><div class="footer__info-lines">%3$s</div></div></div>',
						esc_attr(isset($card['id']) ? (string) $card['id'] : ''),
						esc_html(isset($card['label']) ? (string) $card['label'] : ''),
						$lines
					);
				}
			}
			$tpl = str_replace('{{FOOTER_INFO_CARDS}}', $cards, $tpl);
		}

		if (strpos($tpl, '{{FOOTER_COLUMNS}}') !== false) {
			$cols = '';
			if (!empty($attrs['columns']) && is_array($attrs['columns'])) {
				foreach ($attrs['columns'] as $col) {
					if (!is_array($col)) {
						continue;
					}
					$links = '';
					if (!empty($col['links']) && is_array($col['links'])) {
						foreach ($col['links'] as $link) {
							if (!is_array($link)) {
								continue;
							}
							$links .= sprintf(
								'<li data-item-id="%1$s"><a href="%2$s">%3$s</a></li>',
								esc_attr(isset($link['id']) ? (string) $link['id'] : ''),
								esc_url(isset($link['href']) ? (string) $link['href'] : '#'),
								esc_html(isset($link['label']) ? (string) $link['label'] : '')
							);
						}
					}
					$cols .= sprintf(
						'<div class="footer__column" data-item-id="%1$s"><h4 class="footer__column-title">%2$s</h4><ul class="footer__links">%3$s</ul></div>',
						esc_attr(isset($col['id']) ? (string) $col['id'] : ''),
						esc_html(isset($col['title']) ? (string) $col['title'] : ''),
						$links
					);
				}
			}
			$tpl = str_replace('{{FOOTER_COLUMNS}}', $cols, $tpl);
		}

		if (strpos($tpl, '{{ABOUT_STORY_PARAGRAPHS}}') !== false) {
			$paragraphs = '';
			if (!empty($attrs['paragraphs']) && is_array($attrs['paragraphs'])) {
				foreach ($attrs['paragraphs'] as $paragraph) {
					if (!is_string($paragraph) || $paragraph === '') {
						continue;
					}
					$paragraphs .= '<p class="about-story__para">' . esc_html($paragraph) . '</p>';
				}
			}
			$tpl = str_replace('{{ABOUT_STORY_PARAGRAPHS}}', $paragraphs, $tpl);
		}

		if (strpos($tpl, '{{ABOUT_STORY_IMAGE}}') !== false) {
			$image = '';
			if (!empty($attrs['imageUrl']) && is_string($attrs['imageUrl'])) {
				$image = sprintf(
					'<div class="about-story__intro-media"><img class="about-story__image" src="%1$s" alt="%2$s" width="560" height="400" loading="lazy" decoding="async" /></div>',
					esc_url($attrs['imageUrl']),
					esc_attr(isset($attrs['imageAlt']) ? (string) $attrs['imageAlt'] : '')
				);
			}
			$tpl = str_replace('{{ABOUT_STORY_IMAGE}}', $image, $tpl);
		}

		if (strpos($tpl, '{{ABOUT_STORY_MILESTONES}}') !== false) {
			$milestones = '';
			if (!empty($attrs['milestones']) && is_array($attrs['milestones'])) {
				foreach ($attrs['milestones'] as $item) {
					if (!is_array($item)) {
						continue;
					}
					$milestones .= sprintf(
						'<div class="about-story__milestone" data-item-id="%1$s">',
						esc_attr(isset($item['id']) ? (string) $item['id'] : '')
					);
					if (!empty($item['year'])) {
						$milestones .= '<span class="about-story__year">' . esc_html((string) $item['year']) . '</span>';
					}
					if (!empty($item['title'])) {
						$milestones .= '<h3 class="about-story__milestone-title">' . esc_html((string) $item['title']) . '</h3>';
					}
					if (!empty($item['text'])) {
						$milestones .= '<p class="about-story__milestone-text">' . esc_html((string) $item['text']) . '</p>';
					}
					$milestones .= '</div>';
				}
			}
			$tpl = str_replace('{{ABOUT_STORY_MILESTONES}}', $milestones, $tpl);
		}

		if (strpos($tpl, '{{ABOUT_STORY_VALUES}}') !== false) {
			$values = '';
			if (!empty($attrs['values']) && is_array($attrs['values'])) {
				foreach ($attrs['values'] as $item) {
					if (!is_array($item)) {
						continue;
					}
					$values .= sprintf(
						'<div class="about-story__value" data-item-id="%1$s">',
						esc_attr(isset($item['id']) ? (string) $item['id'] : '')
					);
					if (!empty($item['number'])) {
						$values .= '<span class="about-story__value-num">' . esc_html((string) $item['number']) . '</span>';
					}
					if (!empty($item['title'])) {
						$values .= '<h3 class="about-story__value-title">' . esc_html((string) $item['title']) . '</h3>';
					}
					if (!empty($item['text'])) {
						$values .= '<p class="about-story__value-text">' . esc_html((string) $item['text']) . '</p>';
					}
					$values .= '</div>';
				}
			}
			$tpl = str_replace('{{ABOUT_STORY_VALUES}}', $values, $tpl);
		}

		return $tpl;
	}

	/**
	 * Replace {{attr:key}} placeholders.
	 *
	 * @param string               $tpl   Template.
	 * @param array<string, mixed> $attrs Attrs.
	 * @return string
	 */
	protected static function fill_attr_placeholders($tpl, array $attrs) {
		return (string) preg_replace_callback(
			'/\{\{attr:([a-zA-Z0-9_]+)\}\}/',
			function ($m) use ($attrs) {
				$key = $m[1];
				if (!isset($attrs[ $key ]) || is_array($attrs[ $key ])) {
					return '';
				}
				return esc_attr((string) $attrs[ $key ]);
			},
			$tpl
		);
	}

	/**
	 * Find published/draft page by slug.
	 *
	 * @param string $slug Post name.
	 * @return WP_Post|null
	 */
	protected static function find_page_by_slug($slug) {
		$posts = get_posts(
			array(
				'name'           => $slug,
				'post_type'      => 'page',
				'post_status'    => array('publish', 'draft', 'pending', 'private'),
				'posts_per_page' => 1,
				'no_found_rows'  => true,
			)
		);

		return !empty($posts[0]) ? $posts[0] : null;
	}

	/**
	 * Decode kit JSON file.
	 *
	 * @param string $file Absolute path.
	 * @return array<string, mixed>|null
	 */
	protected static function read_kit_file($file) {
		$raw = file_get_contents($file);
		if (false === $raw || '' === $raw) {
			return null;
		}
		$data = json_decode($raw, true);
		if (!is_array($data) || empty($data['id'])) {
			return null;
		}
		return $data;
	}

	/**
	 * Minimal serialize fallback.
	 *
	 * @param array<string, mixed> $block Block array.
	 * @return string
	 */
	protected static function serialize_block_fallback(array $block) {
		$name  = $block['blockName'];
		$attrs = !empty($block['attrs']) ? ' ' . wp_json_encode($block['attrs']) : '';

		$content = '';
		if (!empty($block['innerContent']) && is_array($block['innerContent'])) {
			$index = 0;
			foreach ($block['innerContent'] as $chunk) {
				if (is_string($chunk)) {
					$content .= $chunk;
				} elseif (isset($block['innerBlocks'][ $index ])) {
					$content .= self::serialize_block_fallback($block['innerBlocks'][ $index ]);
					++$index;
				}
			}
		} elseif (!empty($block['innerHTML'])) {
			$content = (string) $block['innerHTML'];
		}

		if ($content === '' && empty($block['innerBlocks'])) {
			return sprintf("<!-- wp:%s%s /-->\n\n", $name, $attrs);
		}

		return sprintf("<!-- wp:%s%s -->\n%s<!-- /wp:%s -->\n\n", $name, $attrs, $content, $name);
	}
}

/**
 * Frontend hydrate: muted placeholder only when static twork block still has no markup.
 *
 * @param string               $block_content Rendered HTML.
 * @param array<string, mixed> $block         Parsed block.
 * @return string
 */
function twork_kit_hydrate_empty_block($block_content, $block) {
	if ($block_content !== '' && $block_content !== null && trim((string) $block_content) !== '') {
		return $block_content;
	}

	if (empty($block['blockName']) || strpos($block['blockName'], 'twork/') !== 0) {
		return $block_content;
	}

	$registry = WP_Block_Type_Registry::get_instance();
	$type     = $registry->get_registered($block['blockName']);
	if ($type && $type->render_callback) {
		return $block_content;
	}

	$slug = str_replace('twork/', '', $block['blockName']);

	// Silent structural placeholder — no visible title list.
	return sprintf(
		'<section class="twork-kit-shell twork-kit-shell--%1$s" data-block="%2$s" data-twork-kit-shell="1" aria-hidden="true" style="min-height:1px;margin:0;padding:0;"></section>',
		esc_attr(sanitize_html_class($slug)),
		esc_attr($block['blockName'])
	);
}
add_filter('render_block', 'twork_kit_hydrate_empty_block', 10, 2);
