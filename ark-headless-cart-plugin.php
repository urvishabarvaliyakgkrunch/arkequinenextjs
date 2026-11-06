<?php
/**
 * Plugin Name: ARK Headless Cart (Subscription Plan Support)
 * Description: Bridges the headless Next.js frontend's add-to-cart call to WCSATT's existing classic-form subscription-plan mechanism, so each plan (Buy Now / Monthly / Every 3 months) gets its own real, correctly-discounted cart line instead of merging into one. Does not reimplement any pricing/scheme logic — that stays in enfold-child/functions.php's existing WCSATT hooks (ARK_SUB_DISCOUNT_FIRST/RETURNING, sync_qty_and_price_for_3_month_subscription, etc.).
 * Version: 1.0.0
 * Author: ARK Equine (internal — not for distribution)
 *
 * Not deployed automatically — copy this file (or the folder it lives in) into
 * wp-content/plugins/ on ark-equine.com and activate it from wp-admin → Plugins.
 * See PROJECT-CONTEXT.md's "Subscription pricing: real backend fix" section for the
 * full story of why this endpoint exists.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // No direct access.
}

/**
 * ARK Equine — headless Next.js subscription-plan cart support.
 *
 * Problem: WooCommerce's Store API /cart/add-item only accepts {id, quantity} — no field for
 * "which plan", so every add of the same product gets the same WooCommerce cart item key and
 * gets merged into one line. The classic site never hits this because WCSATT's own add-to-cart
 * form posts a hidden "convert_to_sub_{product_id}" field (the exact same param the product page
 * already mirrors in its own URL as ?convert_to_sub_{id}=1_month/3_month/0) which WCSATT's own
 * already-installed hooks read to build a distinct "wcsatt_data" cart item with the real
 * first-time/returning discount (see ARK_SUB_DISCOUNT_FIRST/RETURNING and
 * sync_qty_and_price_for_3_month_subscription() already in this theme's functions.php).
 *
 * Fix: don't reimplement any pricing/scheme logic — just simulate that same form field before
 * adding to the cart, so WCSATT's own real, already-working hooks do everything (scheme, cart
 * item key, quantity sync, 10%/15% rate). This endpoint only bridges the headless Store API call
 * to that existing classic-form mechanism.
 */

add_action( 'rest_api_init', function () {
	register_rest_route(
		'ark/v1',
		'/cart/add-item',
		array(
			'methods'             => 'POST',
			'callback'            => 'ark_headless_add_item_with_plan',
			'permission_callback' => '__return_true',
		)
	);
} );

function ark_headless_add_item_with_plan( WP_REST_Request $request ) {
	if ( ! function_exists( 'WC' ) ) {
		return new WP_Error( 'woocommerce_not_active', 'WooCommerce not active', array( 'status' => 500 ) );
	}

	$product_id = absint( $request->get_param( 'id' ) );
	$quantity   = max( 1, absint( $request->get_param( 'quantity' ) ) );
	// one_time | monthly | every_3_months — mapped to WCSATT's own scheme keys, the same ones
	// the Next.js product page already sends as ?convert_to_sub_{id}=... in its own URL.
	$plan       = sanitize_key( $request->get_param( 'plan' ) ?: 'one_time' );

	if ( ! $product_id ) {
		return new WP_Error( 'invalid_product', 'Missing product id', array( 'status' => 400 ) );
	}

	$scheme_map = array(
		'one_time'       => '0',
		'monthly'        => '1_month',
		'every_3_months' => '3_month',
	);
	$scheme_key = $scheme_map[ $plan ] ?? '0';

	// Simulate WCSATT's own add-to-cart form field so its already-installed hooks do the real
	// work (scheme, wcsatt_data cart item key, 10%/15% rate, quantity sync) — not duplicated here.
	if ( '0' !== $scheme_key ) {
		$field_name              = 'convert_to_sub_' . $product_id;
		$_REQUEST[ $field_name ] = $scheme_key;
		$_POST[ $field_name ]    = $scheme_key;
	}

	// Delegate the actual add-to-cart call to the Store API's OWN add-item route (via an internal
	// sub-request) instead of calling WC()->cart->add_to_cart() directly after a manual
	// wc_load_cart(). That earlier approach used a cookie-based WC_Session identity, which is NOT
	// the same session the headless frontend's Cart-Token header maps to — WooCommerce Blocks'
	// Store API package replaces WC()->session with its own SessionHandler that identifies the
	// guest session via the "Cart-Token" header (there are no cookies in this headless, separate
	// -origin setup). The mismatch meant every add here landed in a session that was discarded at
	// the end of the PHP request, invisible to the very next GET /wc/store/v1/cart — the
	// "previous item disappears" / "basket is empty after reload" bug. Routing through the real
	// Store API route makes this call bootstrap/persist the exact same session every other cart
	// call (GET /cart, update-item, remove-item, the Next.js proxy's own calls) already uses
	// correctly, while WCSATT's hook (reading $_REQUEST, set above) still fires either way.
	$internal = new WP_REST_Request( 'POST', '/wc/store/v1/cart/add-item' );
	$internal->set_header( 'Content-Type', 'application/json' );
	if ( $request->get_header( 'cart_token' ) ) {
		$internal->set_header( 'Cart-Token', $request->get_header( 'cart_token' ) );
	}
	if ( $request->get_header( 'nonce' ) ) {
		$internal->set_header( 'Nonce', $request->get_header( 'nonce' ) );
	}
	$internal->set_body( wp_json_encode( array( 'id' => $product_id, 'quantity' => $quantity ) ) );
	$response = rest_do_request( $internal );

	if ( $response->is_error() ) {
		return $response;
	}

	// Carry the internal response's headers (Nonce, Cart-Token) onto our own response — these are
	// how the headless frontend's session stays identified across calls (see storeApi.ts). The
	// previous version of this endpoint only returned get_data(), silently dropping them, which
	// on its own was enough to make every call here start a brand-new anonymous session.
	$final = rest_ensure_response( $response->get_data() );
	foreach ( $response->get_headers() as $key => $value ) {
		$final->header( $key, $value );
	}
	return $final;
}
