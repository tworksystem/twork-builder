<?php
/**
 * Booking forms – REST list for CF7 / Formidable / WPForms / Fluent Forms.
 *
 * @package TworkBuilder
 * @since 1.0.9
 */

defined('ABSPATH') || exit;

/**
 * Allowed form providers and their shortcode builders.
 *
 * @return array<string, array{label:string, shortcode:callable}>
 */
function twork_booking_form_providers()
{
    return array(
        'cf7' => array(
            'label'     => 'Contact Form 7',
            'available' => class_exists('WPCF7_ContactForm') || defined('WPCF7_VERSION'),
            'shortcode' => static function ($id, $title = '') {
                $id = absint($id);
                $title = sanitize_text_field($title);
                $title = str_replace(array('"', "'"), '', $title);
                if ($title !== '') {
                    return sprintf('[contact-form-7 id="%d" title="%s"]', $id, $title);
                }
                return sprintf('[contact-form-7 id="%d"]', $id);
            },
        ),
        'formidable' => array(
            'label'     => 'Formidable Forms',
            'available' => class_exists('FrmForm') || function_exists('load_formidable_forms'),
            'shortcode' => static function ($id, $title = '') {
                unset($title);
                return sprintf('[formidable id=%d]', absint($id));
            },
        ),
        'wpforms' => array(
            'label'     => 'WPForms',
            'available' => function_exists('wpforms') || defined('WPFORMS_VERSION'),
            'shortcode' => static function ($id, $title = '') {
                unset($title);
                return sprintf('[wpforms id="%d"]', absint($id));
            },
        ),
        'fluentform' => array(
            'label'     => 'Fluent Forms',
            'available' => defined('FLUENTFORM') || function_exists('wpFluentForm'),
            'shortcode' => static function ($id, $title = '') {
                unset($title);
                return sprintf('[fluentform id="%d"]', absint($id));
            },
        ),
    );
}

/**
 * Collect forms from installed plugins.
 *
 * @return array{providers:array<int,array>,forms:array<int,array>}
 */
function twork_booking_collect_forms()
{
    $providers_meta = array();
    $forms          = array();
    $providers      = twork_booking_form_providers();

    foreach ($providers as $key => $provider) {
        $providers_meta[] = array(
            'id'        => $key,
            'label'     => $provider['label'],
            'available' => (bool) $provider['available'],
        );
    }

    // Contact Form 7
    if (!empty($providers['cf7']['available']) && class_exists('WPCF7_ContactForm')) {
        $cf7_forms = WPCF7_ContactForm::find(array('posts_per_page' => 100));
        if (is_array($cf7_forms)) {
            foreach ($cf7_forms as $form) {
                $id    = (int) $form->id();
                $title = $form->title();
                $forms[] = array(
                    'id'        => (string) $id,
                    'provider'  => 'cf7',
                    'title'     => $title,
                    'shortcode' => call_user_func($providers['cf7']['shortcode'], $id, $title),
                );
            }
        }
    }

    // Formidable
    if (!empty($providers['formidable']['available']) && class_exists('FrmForm')) {
        $frm_forms = FrmForm::get_published_forms();
        if (is_array($frm_forms)) {
            foreach ($frm_forms as $form) {
                $id    = isset($form->id) ? (int) $form->id : 0;
                $title = isset($form->name) ? (string) $form->name : '';
                if ($id <= 0) {
                    continue;
                }
                $forms[] = array(
                    'id'        => (string) $id,
                    'provider'  => 'formidable',
                    'title'     => $title,
                    'shortcode' => call_user_func($providers['formidable']['shortcode'], $id, $title),
                );
            }
        }
    }

    // WPForms
    if (!empty($providers['wpforms']['available']) && function_exists('wpforms')) {
        $wpforms = wpforms()->form->get('', array('order' => 'DESC', 'number' => 100));
        if (is_array($wpforms)) {
            foreach ($wpforms as $form) {
                $id    = isset($form->ID) ? (int) $form->ID : 0;
                $title = isset($form->post_title) ? (string) $form->post_title : '';
                if ($id <= 0) {
                    continue;
                }
                $forms[] = array(
                    'id'        => (string) $id,
                    'provider'  => 'wpforms',
                    'title'     => $title,
                    'shortcode' => call_user_func($providers['wpforms']['shortcode'], $id, $title),
                );
            }
        }
    }

        // Fluent Forms
        if (!empty($providers['fluentform']['available'])) {
            $fluent_ok = false;
            $rows      = array();
            if (function_exists('wpFluent')) {
                try {
                    $rows = wpFluent()->table('fluentform_forms')
                        ->where('status', 'published')
                        ->orderBy('id', 'DESC')
                        ->limit(100)
                        ->get();
                    $fluent_ok = true;
                } catch (Exception $e) {
                    $fluent_ok = false;
                }
            }
            if (!$fluent_ok) {
                global $wpdb;
                $table = $wpdb->prefix . 'fluentform_forms';
                // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared
                $exists = $wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $table));
                if ($exists === $table) {
                    // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared
                    $rows = $wpdb->get_results(
                        "SELECT id, title FROM {$table} WHERE status = 'published' ORDER BY id DESC LIMIT 100"
                    );
                }
            }
            if (is_array($rows) || is_object($rows)) {
                foreach ($rows as $row) {
                    $id    = isset($row->id) ? (int) $row->id : 0;
                    $title = isset($row->title) ? (string) $row->title : '';
                    if ($id <= 0) {
                        continue;
                    }
                    $forms[] = array(
                        'id'        => (string) $id,
                        'provider'  => 'fluentform',
                        'title'     => $title,
                        'shortcode' => call_user_func($providers['fluentform']['shortcode'], $id, $title),
                    );
                }
            }
        }

    return array(
        'providers' => $providers_meta,
        'forms'     => $forms,
    );
}

/**
 * Sanitize an embedded form shortcode (allowlist tags only).
 *
 * @param string $shortcode Raw shortcode.
 * @return string
 */
function twork_booking_sanitize_form_shortcode($shortcode)
{
    $shortcode = trim((string) $shortcode);
    if ($shortcode === '' || strpos($shortcode, '<') !== false) {
        return '';
    }

    $allowed = array(
        'contact-form-7',
        'formidable',
        'wpforms',
        'fluentform',
        'fluentform_modal',
    );

    if (!preg_match('/^\[([a-z0-9_-]+)\b/i', $shortcode, $m)) {
        return '';
    }

    $tag = strtolower($m[1]);
    if (!in_array($tag, $allowed, true)) {
        return '';
    }

    // Strip any attribute that looks like event handlers / javascript.
    if (preg_match('/on\w+\s*=|javascript:/i', $shortcode)) {
        return '';
    }

    return $shortcode;
}

/**
 * Recursively collect twork/doctor-card-item attrs from parsed blocks.
 * Also resolves core/block reusable refs when possible.
 *
 * @param array $blocks Parsed blocks.
 * @param array $out    Accumulator (by ref).
 * @param array $seen_refs Avoid infinite reusable loops.
 * @return array
 */
function twork_booking_collect_doctor_cards_from_blocks(array $blocks, array &$out = array(), array &$seen_refs = array())
{
    foreach ($blocks as $block) {
        if (!is_array($block)) {
            continue;
        }

        $name = isset($block['blockName']) ? (string) $block['blockName'] : '';

        if ($name === 'twork/doctor-card-item') {
            $attrs = isset($block['attrs']) && is_array($block['attrs']) ? $block['attrs'] : array();
            $out[] = array(
                'departmentSlug'  => isset($attrs['departmentSlug']) ? (string) $attrs['departmentSlug'] : '',
                'departmentLabel' => isset($attrs['departmentLabel']) ? (string) $attrs['departmentLabel'] : '',
                'doctorName'      => isset($attrs['doctorName']) ? (string) $attrs['doctorName'] : '',
            );
        }

        if ($name === 'core/block' && !empty($block['attrs']['ref'])) {
            $ref_id = (int) $block['attrs']['ref'];
            if ($ref_id > 0 && !isset($seen_refs[$ref_id])) {
                $seen_refs[$ref_id] = true;
                $ref_post = get_post($ref_id);
                if ($ref_post instanceof WP_Post && !empty($ref_post->post_content)) {
                    twork_booking_collect_doctor_cards_from_blocks(
                        parse_blocks($ref_post->post_content),
                        $out,
                        $seen_refs
                    );
                }
            }
        }

        if (!empty($block['innerBlocks']) && is_array($block['innerBlocks'])) {
            twork_booking_collect_doctor_cards_from_blocks($block['innerBlocks'], $out, $seen_refs);
        }
    }

    return $out;
}

/**
 * Collect doctor cards from a page/post ID.
 *
 * @param int $page_id Post ID.
 * @return array|WP_Error
 */
function twork_booking_collect_doctor_cards_for_page($page_id)
{
    $page_id = absint($page_id);
    if ($page_id <= 0) {
        return new WP_Error(
            'twork_invalid_page',
            __('Invalid page ID.', 'twork-builder'),
            array('status' => 400)
        );
    }

    $post = get_post($page_id);
    if (!$post instanceof WP_Post) {
        return new WP_Error(
            'twork_page_not_found',
            __('Page not found.', 'twork-builder'),
            array('status' => 404)
        );
    }

    if (!current_user_can('edit_post', $page_id) && !current_user_can('edit_posts')) {
        return new WP_Error(
            'twork_forbidden',
            __('You cannot read this page.', 'twork-builder'),
            array('status' => 403)
        );
    }

    $cards = array();
    $seen_refs = array();
    twork_booking_collect_doctor_cards_from_blocks(
        parse_blocks((string) $post->post_content),
        $cards,
        $seen_refs
    );

    $departments = array();
    $dept_seen = array();
    foreach ($cards as $card) {
        $slug = isset($card['departmentSlug']) ? trim((string) $card['departmentSlug']) : '';
        if ($slug === '') {
            continue;
        }
        $norm = strtolower($slug);
        if (isset($dept_seen[$norm])) {
            // Prefer a non-empty label if we see one later.
            if (
                empty($departments[$dept_seen[$norm]]['label']) ||
                $departments[$dept_seen[$norm]]['label'] === $departments[$dept_seen[$norm]]['value']
            ) {
                $label = isset($card['departmentLabel']) ? trim((string) $card['departmentLabel']) : '';
                if ($label !== '') {
                    $departments[$dept_seen[$norm]]['label'] = $label;
                }
            }
            continue;
        }
        $label = isset($card['departmentLabel']) ? trim((string) $card['departmentLabel']) : '';
        $departments[] = array(
            'value' => $slug,
            'label' => $label !== '' ? $label : $slug,
        );
        $dept_seen[$norm] = count($departments) - 1;
    }

    return array(
        'pageId'      => $page_id,
        'pageTitle'   => get_the_title($post),
        'cards'       => $cards,
        'departments' => array_values($departments),
        'count'       => count($cards),
    );
}

/**
 * Register REST routes: forms + doctor-cards + booking form schema proxy
 */
function twork_booking_register_forms_rest()
{
    register_rest_route(
        'twork/v1',
        '/forms',
        array(
            'methods'             => 'GET',
            'permission_callback' => static function () {
                return current_user_can('edit_posts');
            },
            'callback'            => static function () {
                return rest_ensure_response(twork_booking_collect_forms());
            },
        )
    );

    register_rest_route(
        'twork/v1',
        '/doctor-cards',
        array(
            'methods'             => 'GET',
            'permission_callback' => static function () {
                return current_user_can('edit_posts');
            },
            'args'                => array(
                'page_id' => array(
                    'required'          => true,
                    'type'              => 'integer',
                    'sanitize_callback' => 'absint',
                ),
            ),
            'callback'            => static function (WP_REST_Request $request) {
                $result = twork_booking_collect_doctor_cards_for_page(
                    (int) $request->get_param('page_id')
                );
                if (is_wp_error($result)) {
                    return $result;
                }
                return rest_ensure_response($result);
            },
        )
    );

    register_rest_route(
        'twork/v1',
        '/booking-form-schema',
        array(
            'methods'             => 'GET',
            'permission_callback' => '__return_true',
            'args'                => array(
                'url' => array(
                    'required'          => true,
                    'type'              => 'string',
                    'sanitize_callback' => 'esc_url_raw',
                ),
                'fields_path' => array(
                    'required'          => false,
                    'type'              => 'string',
                    'default'           => '',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'method' => array(
                    'required'          => false,
                    'type'              => 'string',
                    'default'           => 'GET',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
            ),
            'callback'            => 'twork_booking_proxy_form_schema',
        )
    );
}
add_action('rest_api_init', 'twork_booking_register_forms_rest');

/**
 * Whether a host/IP is blocked for SSRF-safe outbound fetches.
 *
 * @param string $host Hostname or IP.
 * @return bool
 */
function twork_booking_is_blocked_host($host)
{
    $host = strtolower(trim((string) $host));
    if ($host === '' || $host === 'localhost' || substr($host, -6) === '.local') {
        return true;
    }

    $ips = array();
    if (filter_var($host, FILTER_VALIDATE_IP)) {
        $ips[] = $host;
    } else {
        $resolved = gethostbynamel($host);
        if (is_array($resolved)) {
            $ips = $resolved;
        }
    }

    foreach ($ips as $ip) {
        if (!filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
            return true;
        }
    }

    return false;
}

/**
 * Read a dotted path from nested arrays/objects.
 *
 * @param mixed  $root Root payload.
 * @param string $path Dotted path.
 * @return mixed
 */
function twork_booking_get_by_path($root, $path)
{
    $path = trim((string) $path);
    if ($path === '') {
        return $root;
    }
    $parts = preg_split('/\\.|(?:\\[|\\])/', $path, -1, PREG_SPLIT_NO_EMPTY);
    if (!is_array($parts)) {
        return null;
    }
    $cur = $root;
    foreach ($parts as $part) {
        if (is_array($cur) && array_key_exists($part, $cur)) {
            $cur = $cur[$part];
            continue;
        }
        if (is_object($cur) && isset($cur->{$part})) {
            $cur = $cur->{$part};
            continue;
        }
        return null;
    }
    return $cur;
}

/**
 * Plain text from mixed value (strip tags).
 *
 * @param mixed $value Raw.
 * @return string
 */
function twork_booking_safe_text($value)
{
    return trim(wp_strip_all_tags((string) ($value ?? '')));
}

/**
 * Normalize one option.
 *
 * @param mixed $opt   Raw option.
 * @param int   $index Index.
 * @return array{value:string,label:string}|null
 */
function twork_booking_normalize_option($opt, $index = 0)
{
    if ($opt === null) {
        return null;
    }
    if (is_string($opt) || is_numeric($opt)) {
        $text = twork_booking_safe_text($opt);
        return $text !== '' ? array('value' => $text, 'label' => $text) : null;
    }
    if (!is_array($opt) && !is_object($opt)) {
        return null;
    }
    $row = (array) $opt;
    $value = twork_booking_safe_text(
        $row['value'] ?? $row['id'] ?? $row['key'] ?? $row['slug'] ?? $row['name'] ?? $index
    );
    $label = twork_booking_safe_text(
        $row['label'] ?? $row['title'] ?? $row['name'] ?? $row['text'] ?? $value
    );
    if ($value === '' && $label === '') {
        return null;
    }
    return array(
        'value' => $value !== '' ? $value : $label,
        'label' => $label !== '' ? $label : $value,
    );
}

/**
 * Normalize one field object.
 *
 * @param mixed $raw   Raw field.
 * @param int   $index Index.
 * @return array|null
 */
function twork_booking_normalize_api_field($raw, $index = 0)
{
    $allowed = array('text', 'tel', 'email', 'date', 'number', 'textarea', 'select', 'checkbox', 'radio', 'hidden');

    if (is_string($raw)) {
        $label = twork_booking_safe_text($raw);
        $name  = sanitize_key(strtolower(preg_replace('/[^a-z0-9_]+/i', '_', $label)));
        if ($name === '') {
            return null;
        }
        return array(
            'name'        => $name,
            'label'       => $label,
            'type'        => 'text',
            'required'    => false,
            'placeholder' => '',
            'options'     => array(),
            'fullWidth'   => false,
            'section'     => '',
        );
    }

    if (!is_array($raw) && !is_object($raw)) {
        return null;
    }
    $row = (array) $raw;
    $name = twork_booking_safe_text(
        $row['name'] ?? $row['key'] ?? $row['id'] ?? $row['field'] ?? $row['fieldName'] ?? $row['slug'] ?? ('field_' . ($index + 1))
    );
    $name = sanitize_key(strtolower(preg_replace('/[^a-z0-9_]+/i', '_', $name)));
    if ($name === '') {
        return null;
    }

    $type = strtolower(twork_booking_safe_text($row['type'] ?? $row['inputType'] ?? $row['fieldType'] ?? $row['component'] ?? 'text'));
    $type_map = array(
        'phone'      => 'tel',
        'mobile'     => 'tel',
        'telephone'  => 'tel',
        'textbox'    => 'text',
        'string'     => 'text',
        'longtext'   => 'textarea',
        'multiline'  => 'textarea',
        'dropdown'   => 'select',
        'list'       => 'select',
        'choice'     => 'select',
        'boolean'    => 'checkbox',
        'check'      => 'checkbox',
        'datetime'   => 'date',
    );
    if (isset($type_map[$type])) {
        $type = $type_map[$type];
    }
    if (!in_array($type, $allowed, true)) {
        $type = 'text';
    }

    $options_raw = $row['options'] ?? $row['choices'] ?? $row['values'] ?? $row['items'] ?? $row['enum'] ?? array();
    $options     = array();
    if (is_array($options_raw)) {
        foreach ($options_raw as $i => $opt) {
            $n = twork_booking_normalize_option($opt, (int) $i);
            if ($n) {
                $options[] = $n;
            }
        }
    }

    $required = !empty($row['required']) || !empty($row['isRequired']) || !empty($row['mandatory']);
    if (!$required && isset($row['rules']) && is_array($row['rules'])) {
        $required = !empty($row['rules']['required']);
    }

    return array(
        'name'        => $name,
        'label'       => twork_booking_safe_text($row['label'] ?? $row['title'] ?? $row['caption'] ?? $row['placeholder'] ?? $name),
        'type'        => $type,
        'required'    => (bool) $required,
        'placeholder' => twork_booking_safe_text($row['placeholder'] ?? $row['hint'] ?? ''),
        'options'     => $options,
        'fullWidth'   => !empty($row['fullWidth']) || !empty($row['full_width']) || $type === 'textarea',
        'section'     => twork_booking_safe_text($row['section'] ?? $row['group'] ?? ''),
    );
}

/**
 * Extract fields array from heterogeneous payloads.
 *
 * @param mixed  $payload     Decoded JSON.
 * @param string $fields_path Optional path.
 * @return array
 */
function twork_booking_extract_fields_array($payload, $fields_path = '')
{
    if ($fields_path !== '') {
        $at = twork_booking_get_by_path($payload, $fields_path);
        if (is_array($at) && array_keys($at) === range(0, count($at) - 1)) {
            return $at;
        }
        if (is_array($at) && isset($at['fields']) && is_array($at['fields'])) {
            return $at['fields'];
        }
    }

    if (is_array($payload) && array_keys($payload) === range(0, count($payload) - 1)) {
        return $payload;
    }
    if (!is_array($payload) && !is_object($payload)) {
        return array();
    }
    $root = (array) $payload;
    $data = isset($root['data']) ? (array) $root['data'] : $root;
    $form = isset($data['form']) ? (array) $data['form'] : (isset($root['form']) ? (array) $root['form'] : array());

    $candidates = array(
        $root['fields'] ?? null,
        $root['items'] ?? null,
        $root['formFields'] ?? null,
        $root['form_fields'] ?? null,
        $root['schema'] ?? null,
        $data['fields'] ?? null,
        $data['items'] ?? null,
        $data['formFields'] ?? null,
        $form['fields'] ?? null,
        $form['items'] ?? null,
        (isset($root['result']) && is_array($root['result'])) ? ($root['result']['fields'] ?? null) : null,
        (isset($root['payload']) && is_array($root['payload'])) ? ($root['payload']['fields'] ?? null) : null,
    );

    foreach ($candidates as $c) {
        if (is_array($c) && count($c) > 0) {
            return $c;
        }
    }
    return array();
}

/**
 * Normalize booking form schema from arbitrary backend JSON.
 *
 * @param mixed  $payload     Decoded JSON.
 * @param string $fields_path Optional fields path.
 * @return array{fields:array,submitUrl:string,ok:bool}
 */
function twork_booking_normalize_form_schema($payload, $fields_path = '')
{
    $raw_fields = twork_booking_extract_fields_array($payload, $fields_path);
    $fields     = array();
    $seen       = array();
    foreach ($raw_fields as $i => $raw) {
        $field = twork_booking_normalize_api_field($raw, (int) $i);
        if (!$field || isset($seen[$field['name']])) {
            continue;
        }
        $seen[$field['name']] = true;
        $fields[] = $field;
    }

    $root = is_array($payload) ? $payload : (is_object($payload) ? (array) $payload : array());
    $data = isset($root['data']) && is_array($root['data']) ? $root['data'] : $root;
    $form = isset($data['form']) && is_array($data['form']) ? $data['form'] : (isset($root['form']) && is_array($root['form']) ? $root['form'] : array());

    // Synthesize from booking list payloads when no explicit fields.
    if (count($fields) === 0) {
        $departments = isset($data['departments']) && is_array($data['departments']) ? $data['departments'] : array();
        $doctors     = isset($data['doctors']) && is_array($data['doctors']) ? $data['doctors'] : array();
        $times       = isset($data['timeSlots']) && is_array($data['timeSlots'])
            ? $data['timeSlots']
            : (isset($data['time_slots']) && is_array($data['time_slots']) ? $data['time_slots'] : array());

        if (count($departments) > 0) {
            $opts = array();
            foreach ($departments as $j => $row) {
                $n = twork_booking_normalize_option($row, (int) $j);
                if ($n) {
                    $opts[] = $n;
                }
            }
            $fields[] = array(
                'name'        => 'department',
                'label'       => 'Department',
                'type'        => 'select',
                'required'    => true,
                'placeholder' => '',
                'options'     => $opts,
                'fullWidth'   => false,
                'section'     => 'appointment',
            );
        }
        if (count($doctors) > 0) {
            $opts = array();
            foreach ($doctors as $j => $row) {
                if (is_string($row) || is_numeric($row)) {
                    $n = twork_booking_normalize_option($row, (int) $j);
                } else {
                    $arr  = (array) $row;
                    $name = twork_booking_safe_text($arr['name'] ?? $arr['doctorName'] ?? $arr['title'] ?? $arr['label'] ?? '');
                    $n    = $name !== '' ? array('value' => $name, 'label' => $name) : null;
                }
                if ($n) {
                    $opts[] = $n;
                }
            }
            $fields[] = array(
                'name'        => 'doctor',
                'label'       => 'Doctor',
                'type'        => 'select',
                'required'    => false,
                'placeholder' => '',
                'options'     => $opts,
                'fullWidth'   => false,
                'section'     => 'appointment',
            );
        }
        if (count($times) > 0) {
            $opts = array();
            foreach ($times as $j => $row) {
                $n = twork_booking_normalize_option($row, (int) $j);
                if ($n) {
                    $opts[] = $n;
                }
            }
            $fields[] = array(
                'name'        => 'preferred_time',
                'label'       => 'Preferred Time',
                'type'        => 'select',
                'required'    => false,
                'placeholder' => '',
                'options'     => $opts,
                'fullWidth'   => false,
                'section'     => 'appointment',
            );
        }
    }

    $submit_url = twork_booking_safe_text(
        $root['submitUrl'] ?? $root['submit_url'] ?? $root['action'] ?? $data['submitUrl'] ?? $data['submit_url'] ?? $form['action'] ?? ''
    );

    return array(
        'fields'    => $fields,
        'submitUrl' => $submit_url,
        'ok'        => count($fields) > 0,
    );
}

/**
 * Proxy + normalize external booking form schema (CORS / XSS safe).
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response|WP_Error
 */
function twork_booking_proxy_form_schema(WP_REST_Request $request)
{
    $url = (string) $request->get_param('url');
    $fields_path = (string) $request->get_param('fields_path');
    $method = strtoupper((string) $request->get_param('method') ?: 'GET');
    if (!in_array($method, array('GET', 'POST'), true)) {
        $method = 'GET';
    }

    if ($url === '' || !wp_http_validate_url($url)) {
        return new WP_Error(
            'twork_invalid_url',
            __('Invalid API URL.', 'twork-builder'),
            array('status' => 400)
        );
    }

    $parts = wp_parse_url($url);
    $scheme = isset($parts['scheme']) ? strtolower((string) $parts['scheme']) : '';
    $host   = isset($parts['host']) ? (string) $parts['host'] : '';
    if (!in_array($scheme, array('http', 'https'), true) || $host === '') {
        return new WP_Error(
            'twork_invalid_url',
            __('Only http(s) API URLs are allowed.', 'twork-builder'),
            array('status' => 400)
        );
    }
    if (twork_booking_is_blocked_host($host)) {
        return new WP_Error(
            'twork_blocked_host',
            __('That host cannot be requested.', 'twork-builder'),
            array('status' => 400)
        );
    }

    $args = array(
        'timeout'     => 12,
        'redirection' => 2,
        'headers'     => array(
            'Accept' => 'application/json',
        ),
    );
    $response = $method === 'POST'
        ? wp_remote_post($url, $args)
        : wp_remote_get($url, $args);

    if (is_wp_error($response)) {
        return new WP_Error(
            'twork_fetch_failed',
            __('Could not reach the booking API.', 'twork-builder'),
            array('status' => 502)
        );
    }

    $code = (int) wp_remote_retrieve_response_code($response);
    $body = (string) wp_remote_retrieve_body($response);
    if ($code < 200 || $code >= 300) {
        return new WP_Error(
            'twork_bad_upstream',
            __('Booking API returned an error.', 'twork-builder'),
            array('status' => 502)
        );
    }
    if (strlen($body) > 512000) {
        return new WP_Error(
            'twork_payload_too_large',
            __('Booking API payload is too large.', 'twork-builder'),
            array('status' => 413)
        );
    }

    $decoded = json_decode($body, true);
    if (!is_array($decoded) && !is_object($decoded)) {
        return new WP_Error(
            'twork_invalid_json',
            __('Booking API did not return JSON.', 'twork-builder'),
            array('status' => 502)
        );
    }

    $schema = twork_booking_normalize_form_schema($decoded, $fields_path);
    if (empty($schema['ok'])) {
        return new WP_Error(
            'twork_empty_schema',
            __('No form fields could be normalized from the API response.', 'twork-builder'),
            array('status' => 422)
        );
    }

    return rest_ensure_response($schema);
}
