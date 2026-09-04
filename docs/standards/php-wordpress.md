# PHP, WordPress and Drupal

Read `CODING-STANDARDS.md` first. Same 16 headings, stack-specific rules.

Applies to: PHP 8.2+, WordPress 6.x with Composer, Drupal 10/11, hosted on Kinsta or Sevalla.

---

## 1. Naming conventions

- **MUST** use `snake_case` for WordPress functions, hooks, and variables. WordPress core style wins inside a WordPress project.
- **MUST** use `PascalCase` for classes and `camelCase` for methods in framework or Drupal code, per PSR-12.
- **MUST** prefix every global WordPress function, hook, option, transient, and post meta key with `clickr_` or the client slug. Unprefixed names collide with plugins.
- **MUST** name theme template files to the WordPress hierarchy: `single-product.php`, `archive-news.php`.
- **MUST** name Drupal machine names in `snake_case`, matching the module folder: `clickr_forms`.
- **MUST** use `SCREAMING_SNAKE_CASE` for constants: `CLICKR_CACHE_TTL`.
- **NEVER** ship a file named `page-new.php`, `header-old.php`, `functions-backup.php`.

```php
// good
function clickr_render_price_block( array $atts ): string {}
add_action( 'init', 'clickr_register_order_type' );

// NEVER — will collide
function get_price() {}
```

## 2. Variable names

- **MUST** use full words: `$order_total_cents`, not `$ot`.
- **MUST** prefix a WP_Post variable with what it is: `$product_post`, not `$p`.
- **MUST** name `WP_Query` results clearly: `$featured_posts`, not `$query2`.
- **NEVER** use `$data`, `$args2`, `$temp` in merged code. `$args` for a genuine arguments array is fine.
- **NEVER** shadow a WordPress global name: no local `$post`, `$wpdb`, `$wp_query`.

## 3. Directory structure

- **MUST** manage WordPress with Composer. `wp-content` in git, core and plugins pulled by Composer.
- **MUST** use a child theme. Never edit a parent theme or core files.
- **MUST** keep custom logic in a plugin or a `mu-plugin`, not stuffed into `functions.php`. Split `functions.php` into includes once it passes 200 lines.
- **MUST** keep Drupal custom code in `web/modules/custom/` and themes in `web/themes/custom/`.
- **MUST** gitignore `wp-content/uploads/`, `wp-config.php`, `settings.php`, and `vendor/`.
- **MUST** commit `wp-config-sample` or `settings.local.php.example` instead of the real config.
- **NEVER** leave a deactivated plugin or unused theme in the tree. Remove it, do not just switch it off.

```
web/
  wp-content/
    themes/client-child/
    plugins/clickr-core/
      clickr-core.php
      includes/
composer.json
composer.lock
```

## 4. Globals

- **MUST** access `$wpdb` inside the function that needs it via `global $wpdb;`. Do not cache it in a class property that outlives the request.
- **NEVER** add a new global variable. Use a class, a static factory, or pass the value.
- **NEVER** store the current user or request state in a global or a static cache. Cron, CLI, and REST all reuse the process.
- **MUST** use the options or transient API for shared state, with a prefixed key, rather than a global.
- **MUST** use Drupal's service container. **NEVER** call `\Drupal::service()` inside a class that could take constructor injection.
- **MUST** namespace all custom classes: `namespace Clickr\Core;`.

## 5. Comments

- **MUST** use PHPDoc on public functions, with `@param` and `@return` types.
- **MUST** comment every hook you add, saying what fires it and why.
- **MUST** comment any WordPress or Drupal core quirk you worked around, with the version it applies to.
- **NEVER** leave a commented-out template block. Git holds it.

```php
/**
 * Adjusts the cart total for SG GST.
 *
 * Runs late (priority 99) because the client's shipping plugin
 * also filters this and must run first. Checked 2026-06-02.
 */
add_filter( 'woocommerce_calculated_total', 'clickr_apply_gst', 99, 2 );
```

## 6. Documentation

- **MUST** list in the README: PHP version, WordPress or Drupal version, required plugins and why, build commands, deploy target.
- **MUST** document every custom post type, taxonomy, ACF group, and Drupal content type, with what the editor uses it for.
- **MUST** document every cron job and what happens if it stops.
- **MUST** document every Composer patch, with a link to the upstream issue.
- **MUST** write an editor-facing note for anything a client edits, so handover does not depend on us.

## 7. Exception handling

- **MUST** use `try/catch` around every external call, file operation, and payment step.
- **MUST** check `is_wp_error()` on every WordPress function that can return `WP_Error`, including `wp_remote_get`, `wp_insert_post`, and `wp_mail`.
- **MUST** use `declare(strict_types=1);` in new class files so type errors surface early.
- **MUST** pass `JSON_THROW_ON_ERROR` to `json_decode` and `json_encode`.
- **NEVER** silence errors with `@`. Handle the failure.
- **NEVER** catch `\Throwable` just to keep the page rendering. Log it and show a clear fallback.
- **MUST** return a `WP_Error` from a REST callback rather than dying, so the client gets a proper status.
- **MUST** roll back or clean up partial writes when a multi-step operation fails.

```php
$response = wp_remote_post( $endpoint, [ 'timeout' => 15, 'body' => $payload ] );

if ( is_wp_error( $response ) ) {
    clickr_log_error( 'vendor.sync_failed', [ 'reason' => $response->get_error_code() ] );
    return new WP_Error( 'sync_failed', __( 'Could not reach the service. Try again shortly.' ), [ 'status' => 502 ] );
}
```

## 8. Logging

- **MUST** log through one wrapper function per project, not scattered `error_log` calls.
- **MUST** set `WP_DEBUG` false and `WP_DEBUG_DISPLAY` false in production. `WP_DEBUG_LOG` may stay on to a path outside the web root.
- **MUST** use Drupal's logger channel: `\Drupal::logger('clickr_core')->error()`.
- **NEVER** use `var_dump`, `print_r`, `dd()`, or `dpm()` in merged code.
- **NEVER** log a full `$_POST`, `$_SERVER`, or a webhook body. Log named fields only.
- **NEVER** log a user email, NRIC, or card detail. Log the user ID.
- **MUST** log admin actions, role changes, plugin activations, and failed logins.
- **SHOULD** ship logs off the server. A `debug.log` on a Kinsta box is not monitoring.

## 9. Security controls

### Escaping and sanitising

- **MUST** sanitise on input and escape on output. Both, every time.
- **MUST** match the escape function to the context.

| Context | Function |
|---|---|
| HTML body text | `esc_html()` |
| HTML attribute | `esc_attr()` |
| URL | `esc_url()` |
| Value inside `<script>` | `wp_json_encode()` |
| Textarea | `esc_textarea()` |
| Allowed rich text | `wp_kses_post()` |

```php
// NEVER
echo '<a href="' . $_GET['next'] . '">' . $name . '</a>';

// good
printf( '<a href="%s">%s</a>', esc_url( $next ), esc_html( $name ) );
```

- **MUST** use Twig auto-escaping in Drupal. **NEVER** the `|raw` filter on user data.

### Queries

- **MUST** use `$wpdb->prepare()` on every custom query, even when the value came from your own dropdown.
- **NEVER** interpolate a variable into `$wpdb->query()`.
- **MUST** use Drupal's database API with placeholders, or the entity query.

```php
$rows = $wpdb->get_results(
    $wpdb->prepare( "SELECT id, total_cents FROM {$wpdb->prefix}orders WHERE user_id = %d LIMIT 50", $user_id )
);
```

### Capabilities, nonces, CSRF

- **MUST** check `current_user_can()` on every admin action, AJAX handler, and REST endpoint.
- **MUST** verify a nonce on every form and AJAX call.
- **MUST** set a real `permission_callback` on every `register_rest_route()`. **NEVER** `__return_true` unless the data is genuinely public.
- **NEVER** rely on `is_admin()` for permission. It only says which screen you are on.
- **MUST** use Drupal's Form API for its built-in CSRF token. Do not hand-roll forms.
- **MUST** check `$entity->access('update')` or a route `_permission` in Drupal.
- **NEVER** use `AllowUnsafeUpdates` style workarounds or privilege elevation to get past a permission error.

```php
register_rest_route( 'clickr/v1', '/orders', [
    'methods'             => 'GET',
    'callback'            => 'clickr_get_orders',
    'permission_callback' => fn() => current_user_can( 'edit_shop_orders' ),
] );
```

### Platform hardening

- **MUST** set `define( 'DISALLOW_FILE_EDIT', true );` in `wp-config.php`.
- **MUST** change the default `wp_` table prefix on new installs.
- **MUST** block PHP execution in `/wp-content/uploads/`.
- **MUST** install plugins only from WordPress.org, a paid vendor, or our own repo. Nothing cracked, nothing from a download site.
- **MUST** keep Drupal contrib modules on their security releases and watch the advisories.
- **SHOULD** disable XML-RPC unless a client integration needs it.
- **MUST** enable the host WAF and rate limiting where available.

### Dangerous PHP

- **NEVER** use `eval()`, `create_function()`, `extract()`, or variable variables on user input.
- **NEVER** `unserialize()` anything from a user. Use `json_decode()`.
- **MUST** compare secrets with `hash_equals()`, not `==`.
- **MUST** use `random_bytes()` or `wp_generate_password()` for tokens, never `rand()`.

## 10. Privacy controls

- **MUST** treat form entries, comments, and WooCommerce orders as personal data. Set a retention period and delete on it.
- **MUST** use WordPress's export and erase hooks so a PDPA request can be served: `wp_privacy_personal_data_exporters` and `..._erasers`.
- **NEVER** email a form submission containing NRIC, full card, or bank details.
- **NEVER** pull a production database into local without masking emails and phone numbers.
- **MUST** get client approval before adding any analytics, chat, heatmap, or AI plugin. Most of them ship personal data offshore.
- **MUST** keep media uploads holding personal documents out of the public uploads folder.
- **SHOULD** disable plugin telemetry and usage tracking on client sites.

## 11. Dependency management

- **MUST** manage plugins, themes, and core in `composer.json` with a committed `composer.lock`.
- **MUST** run `composer audit` before merge.
- **MUST** patch contrib or third-party plugins through `cweagans/composer-patches`, never by editing files in place.
- **MUST** record each paid plugin's licence owner and renewal date in the README.
- **NEVER** commit `vendor/`.
- **NEVER** install a plugin because it is popular. Check the last update date, open issues, and known CVEs.
- **SHOULD** count plugins. Every plugin is attack surface and load time. Twenty is a smell.

## 12. API design

- **MUST** register custom endpoints under a namespaced route: `clickr/v1/...`. Never add to `wp/v2`.
- **MUST** declare `args` with `validate_callback` and `sanitize_callback` for every parameter.
- **MUST** return `WP_REST_Response` with a real status code, and `WP_Error` for failures.
- **MUST** paginate, with a server-side cap on `per_page`.
- **MUST** disable or restrict the parts of the default REST API a client site does not use, especially user enumeration on `wp/v2/users`.
- **MUST** verify webhook signatures on any inbound vendor webhook, before touching the body.
- **NEVER** accept an action-defining parameter like `?do=delete`. Use the HTTP verb.
- **SHOULD** use `rest_pre_serve_request` or a header filter to set CORS to an allow-list, never `*`.

## 13. Database practices

- **MUST** create custom tables through `dbDelta()` in an activation routine, with a stored schema version for upgrades.
- **MUST** index the columns you query. Post meta lookups on a large site need a custom table, not more meta.
- **MUST** use the options API for settings, transients for cache, and a custom table for anything with rows that grow.
- **MUST** set `autoload` false on large options. Autoloaded options load on every request.
- **NEVER** use `posts_per_page => -1` or `nopaging => true` on a query that can grow.
- **NEVER** run a `meta_query` on an unindexed key across a large posts table. Restructure the data.
- **NEVER** run `SELECT *`. Name the columns.
- **NEVER** write raw SQL against `wp_users` or `wp_posts` to change data. Use the API so hooks fire.
- **MUST** put Drupal schema changes in `hook_update_N()` update hooks.
- **MUST** back up and get human approval before running a migration against a live client database.
- **SHOULD** clean orphaned post meta and expired transients on a schedule.

## 14. Performance guidelines

- **MUST** fix the query count first. `WP_Query` inside a loop is the usual cause.
- **MUST** cache expensive results in a transient or the object cache, with a deliberate TTL and a clear invalidation point.
- **MUST** enable page caching at the host, and exclude cart, checkout, and logged-in pages explicitly.
- **MUST** use `wp_enqueue_script` and `wp_enqueue_style` with a version string. **NEVER** hardcode a `<script>` tag in a template.
- **MUST** load scripts only on the pages that need them.
- **MUST** serve responsive images through `wp_get_attachment_image()` so `srcset` is generated.
- **MUST** build CSS against the block structure, since editors use Gutenberg or the WYSIWYG.
- **MUST** treat responsive as one adapting stylesheet, not a separate mobile version. Factor breakpoints in while building desktop.
- **MUST** get a lead check-in on responsive behaviour before client review 1.
- **MUST** hold Core Web Vitals green: LCP under 2.5s, CLS under 0.1, INP under 200ms.
- **SHOULD** replace a page builder section with a block when it is the thing making the page slow.
- **SHOULD** review `robots.txt` and crawl limits on high-traffic sites. Aggressive bot traffic has taken client sites down before, and badly behaved bots ignore `robots.txt`, so back it up with WAF rules.

## 15. Version control

- **MUST** commit `wp-content/themes/*` custom code, `wp-content/plugins/*` custom plugins, `composer.json`, and `composer.lock`.
- **MUST** gitignore core, contrib plugins pulled by Composer, `uploads/`, and all config holding credentials.
- **NEVER** commit a database dump. Not even a small one.
- **NEVER** edit files on the production server. If someone did, pull the change into git before deploying over it.
- **MUST** branch from `main` with the standard prefixes and never push to `main` directly.
- **MUST** watch repo size. `git.clickrlabs.com` has run out of disk before because of committed assets.

## 16. Commit hygiene

- **MUST** use `type(scope): what changed`, scope being the theme, plugin, or module: `fix(clickr-core): escape order note output`.
- **MUST** separate a Composer update commit from a code change commit.
- **MUST** commit the lockfile in the same commit as the `composer.json` change.
- **NEVER** commit generated CSS or JS build output alongside source in the same commit without saying so in the message.
- **MUST** get two approvals on any PR touching checkout, payments, user roles, or a form that collects personal data.
