<?php
/**
 * Contact Form Section — AJAX submit + wp_mail.
 *
 * @package TworkBuilder
 * @since 1.0.13
 */

defined( 'ABSPATH' ) || exit;

/**
 * Localize view script config (ajax URL + nonce + i18n).
 */
function twork_contact_form_localize_script() {
	$handle = 'twork-contact-form-section-view-script';

	if ( ! wp_script_is( $handle, 'registered' ) && ! wp_script_is( $handle, 'enqueued' ) ) {
		return;
	}

	wp_localize_script(
		$handle,
		'tworkContactForm',
		array(
			'ajaxUrl' => admin_url( 'admin-ajax.php' ),
			'nonce'   => wp_create_nonce( 'twork_contact_submit' ),
			'i18n'    => array(
				'required'  => __( 'ကျေးဇူးပြု၍ လိုအပ်သော အကွက်များ ဖြည့်ပါ။', 'twork-builder' ),
				'sending'   => __( 'ပို့နေပါသည်…', 'twork-builder' ),
				'success'   => __( 'ပို့ပြီးပါပြီ။ မကြာမီ ပြန်လည်ဆက်သွယ်ပါမည်။', 'twork-builder' ),
				'error'     => __( 'ပို့မရပါ။ ဖုန်းဖြင့် ဆက်သွယ်ပါ။', 'twork-builder' ),
				'rateLimit' => __( 'ခဏစောင့်ပြီးမှ ထပ်ပို့ပါ။', 'twork-builder' ),
			),
		)
	);
}
add_action( 'wp_enqueue_scripts', 'twork_contact_form_localize_script', 100 );

/**
 * Resolve mail recipient (never trust arbitrary client emails by default).
 *
 * @param string $requested Optional email from form hidden field.
 * @return string
 */
function twork_contact_form_resolve_recipient( $requested = '' ) {
	$admin = sanitize_email( get_option( 'admin_email' ) );
	$requested = sanitize_email( $requested );

	/**
	 * Filter the contact form recipient.
	 *
	 * @param string $admin     Site admin email.
	 * @param string $requested Sanitized requested recipient (may be empty).
	 */
	$filtered = apply_filters( 'twork_contact_form_recipient', $admin, $requested );

	if ( is_email( $filtered ) ) {
		return $filtered;
	}

	if ( is_email( $requested ) && (bool) apply_filters( 'twork_contact_form_allow_custom_recipient', true, $requested ) ) {
		return $requested;
	}

	return is_email( $admin ) ? $admin : '';
}

/**
 * Client IP for rate limiting (best-effort).
 *
 * @return string
 */
function twork_contact_form_client_ip() {
	$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '0.0.0.0';
	return $ip;
}

/**
 * AJAX handler: validate, rate-limit, send mail.
 */
function twork_contact_form_ajax_submit() {
	check_ajax_referer( 'twork_contact_submit', 'nonce' );

	$honeypot_keys = array( 'company', 'website', 'url' );
	foreach ( $honeypot_keys as $key ) {
		if ( ! empty( $_POST[ $key ] ) ) {
			wp_send_json_success(
				array(
					'message' => __( 'ပို့ပြီးပါပြီ။ မကြာမီ ပြန်လည်ဆက်သွယ်ပါမည်။', 'twork-builder' ),
				)
			);
		}
	}

	// Also check custom honeypot names that look filled.
	foreach ( $_POST as $key => $value ) {
		if ( in_array( $key, array( 'action', 'nonce', 'name', 'phone', 'email', 'subject', 'message', 'recipient' ), true ) ) {
			continue;
		}
		if ( is_string( $value ) && '' !== trim( $value ) && preg_match( '/^(company|website|url|fax|bot)/i', (string) $key ) ) {
			wp_send_json_success(
				array(
					'message' => __( 'ပို့ပြီးပါပြီ။ မကြာမီ ပြန်လည်ဆက်သွယ်ပါမည်။', 'twork-builder' ),
				)
			);
		}
	}

	$ip       = twork_contact_form_client_ip();
	$rate_key = 'twork_cf_' . md5( $ip );
	if ( get_transient( $rate_key ) ) {
		wp_send_json_error(
			array(
				'message' => __( 'ခဏစောင့်ပြီးမှ ထပ်ပို့ပါ။', 'twork-builder' ),
			),
			429
		);
	}

	$name    = isset( $_POST['name'] ) ? sanitize_text_field( wp_unslash( $_POST['name'] ) ) : '';
	$phone   = isset( $_POST['phone'] ) ? sanitize_text_field( wp_unslash( $_POST['phone'] ) ) : '';
	$email   = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
	$subject = isset( $_POST['subject'] ) ? sanitize_text_field( wp_unslash( $_POST['subject'] ) ) : '';
	$message = isset( $_POST['message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['message'] ) ) : '';
	$requested_recipient = isset( $_POST['recipient'] ) ? sanitize_email( wp_unslash( $_POST['recipient'] ) ) : '';

	if ( '' === $name || '' === $phone || '' === $message ) {
		wp_send_json_error(
			array(
				'message' => __( 'ကျေးဇူးပြု၍ လိုအပ်သော အကွက်များ ဖြည့်ပါ။', 'twork-builder' ),
			),
			400
		);
	}

	if ( strlen( $name ) > 100 || strlen( $phone ) > 20 || strlen( $message ) > 2000 ) {
		wp_send_json_error(
			array(
				'message' => __( 'ပို့မရပါ။ ဖုန်းဖြင့် ဆက်သွယ်ပါ။', 'twork-builder' ),
			),
			400
		);
	}

	$to = twork_contact_form_resolve_recipient( $requested_recipient );
	if ( ! is_email( $to ) ) {
		wp_send_json_error(
			array(
				'message' => __( 'ပို့မရပါ။ ဖုန်းဖြင့် ဆက်သွယ်ပါ။', 'twork-builder' ),
			),
			500
		);
	}

	$mail_subject = sprintf(
		/* translators: %s: subject slug or site name */
		__( '[Contact] %s', 'twork-builder' ),
		$subject ? $subject : wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES )
	);

	$lines   = array();
	$lines[] = 'Name: ' . $name;
	$lines[] = 'Phone: ' . $phone;
	if ( $email ) {
		$lines[] = 'Email: ' . $email;
	}
	if ( $subject ) {
		$lines[] = 'Subject: ' . $subject;
	}
	$lines[] = '';
	$lines[] = 'Message:';
	$lines[] = $message;
	$lines[] = '';
	$lines[] = 'IP: ' . $ip;
	$lines[] = 'Time: ' . gmdate( 'c' );

	$body    = implode( "\n", $lines );
	$headers = array( 'Content-Type: text/plain; charset=UTF-8' );
	if ( is_email( $email ) ) {
		$headers[] = 'Reply-To: ' . $email;
	}

	$sent = wp_mail( $to, $mail_subject, $body, $headers );

	/**
	 * Fires after a contact form submit attempt.
	 *
	 * @param bool  $sent Whether wp_mail reported success.
	 * @param array $payload Sanitized payload.
	 */
	do_action(
		'twork_contact_form_submitted',
		$sent,
		array(
			'name'    => $name,
			'phone'   => $phone,
			'email'   => $email,
			'subject' => $subject,
			'message' => $message,
			'to'      => $to,
		)
	);

	if ( ! $sent ) {
		wp_send_json_error(
			array(
				'message' => __( 'ပို့မရပါ။ ဖုန်းဖြင့် ဆက်သွယ်ပါ။', 'twork-builder' ),
			),
			500
		);
	}

	set_transient( $rate_key, 1, 30 );

	wp_send_json_success(
		array(
			'message' => __( 'ပို့ပြီးပါပြီ။ မကြာမီ ပြန်လည်ဆက်သွယ်ပါမည်။', 'twork-builder' ),
		)
	);
}
add_action( 'wp_ajax_twork_contact_submit', 'twork_contact_form_ajax_submit' );
add_action( 'wp_ajax_nopriv_twork_contact_submit', 'twork_contact_form_ajax_submit' );
