<?php
/**
 * Admin UI — Site Template Kits picker with Preview Design.
 *
 * @package TworkBuilder
 */

if (!defined('ABSPATH')) {
	exit;
}

class Twork_Template_Admin {

	const MENU_SLUG = 'twork-site-templates';
	const NONCE     = 'twork_apply_kit';

	/**
	 * Hook admin menu + actions.
	 *
	 * @return void
	 */
	public static function init() {
		add_action('admin_menu', array(__CLASS__, 'register_menu'));
		add_action('admin_post_twork_apply_kit', array(__CLASS__, 'handle_apply'));
		add_action('admin_enqueue_scripts', array(__CLASS__, 'enqueue_assets'));
	}

	/**
	 * Admin CSS for template picker.
	 *
	 * @param string $hook Current admin hook.
	 * @return void
	 */
	public static function enqueue_assets($hook) {
		if ($hook !== 'toplevel_page_' . self::MENU_SLUG) {
			return;
		}
		$css = TWORK_BUILDER_PATH . 'assets/css/twork-template-admin.css';
		if (!is_readable($css)) {
			return;
		}
		wp_enqueue_style(
			'twork-template-admin',
			TWORK_BUILDER_URL . 'assets/css/twork-template-admin.css',
			array(),
			(string) filemtime($css)
		);
	}

	/**
	 * Register top-level menu.
	 *
	 * @return void
	 */
	public static function register_menu() {
		add_menu_page(
			__('Twork Templates', 'twork-builder'),
			__('Twork Templates', 'twork-builder'),
			'manage_options',
			self::MENU_SLUG,
			array(__CLASS__, 'render_page'),
			'dashicons-layout',
			58
		);
	}

	/**
	 * Handle Apply form POST.
	 *
	 * @return void
	 */
	public static function handle_apply() {
		if (!current_user_can('manage_options')) {
			wp_die(esc_html__('Forbidden.', 'twork-builder'), 403);
		}

		check_admin_referer(self::NONCE);

		$kit_id = isset($_POST['kit_id']) ? absint($_POST['kit_id']) : 0;
		if ($kit_id < 1) {
			wp_safe_redirect(add_query_arg(array('page' => self::MENU_SLUG, 'twork_kit_err' => '1'), admin_url('admin.php')));
			exit;
		}

		$result = Twork_Site_Templates::apply_kit($kit_id);

		wp_safe_redirect(
			add_query_arg(
				array(
					'page'         => self::MENU_SLUG,
					'twork_kit_ok' => $result['ok'] ? '1' : '0',
					'twork_kit_id' => $kit_id,
				),
				admin_url('admin.php')
			)
		);
		exit;
	}

	/**
	 * Render admin page.
	 *
	 * @return void
	 */
	public static function render_page() {
		if (!current_user_can('manage_options')) {
			return;
		}

		$kits   = Twork_Site_Templates::list_kits();
		$active = (int) get_option(Twork_Site_Templates::OPTION_ACTIVE, 0);
		$log    = get_option(Twork_Site_Templates::OPTION_LOG, null);
		$ok     = isset($_GET['twork_kit_ok']) ? sanitize_text_field(wp_unslash($_GET['twork_kit_ok'])) : null;

		?>
		<div class="wrap twork-templates-wrap">
			<h1><?php echo esc_html__('Twork Site Templates', 'twork-builder'); ?></h1>
			<p class="twork-templates-intro"><?php echo esc_html__('Template တစ်ခုရွေးပြီး Apply လုပ်လိုက်တာနဲ့ သက်ဆိုင်ရာ Pages + block sections အကုန် auto ဖန်တီး/update ဖြစ်ပါမယ်။ Preview နှိပ်ပြီး pages/blocks detail ကြည့်နိုင်ပါတယ်။', 'twork-builder'); ?></p>

			<?php if ($ok === '1') : ?>
				<div class="notice notice-success is-dismissible"><p>
					<?php echo esc_html(is_array($log) && !empty($log['message']) ? $log['message'] : __('Kit applied successfully.', 'twork-builder')); ?>
				</p></div>
			<?php elseif ($ok === '0') : ?>
				<div class="notice notice-warning is-dismissible"><p>
					<?php echo esc_html(is_array($log) && !empty($log['message']) ? $log['message'] : __('Kit applied with errors. See log below.', 'twork-builder')); ?>
				</p></div>
			<?php endif; ?>

			<?php if (empty($kits)) : ?>
				<div class="notice notice-error"><p><?php echo esc_html__('No kit JSON files found in templates/kits/.', 'twork-builder'); ?></p></div>
			<?php endif; ?>

			<div class="twork-kits">
				<?php foreach ($kits as $kit) : ?>
					<?php
					$kit_id   = (int) $kit['id'];
					$is_active = $active === $kit_id;
					$detail_id = 'twork-kit-detail-' . $kit_id;
					?>
					<article class="twork-kit-card<?php echo $is_active ? ' is-active' : ''; ?>">
						<div class="twork-kit-card__preview">
							<?php if (!empty($kit['preview'])) : ?>
								<img src="<?php echo esc_url($kit['preview']); ?>" alt="<?php echo esc_attr($kit['label']); ?>" loading="lazy" width="640" height="360" />
							<?php else : ?>
								<div class="twork-kit-card__preview-fallback" aria-hidden="true">
									<span><?php echo esc_html(sprintf(/* translators: %d kit number */ __('Template %d', 'twork-builder'), $kit_id)); ?></span>
								</div>
							<?php endif; ?>
							<?php if ($is_active) : ?>
								<span class="twork-kit-card__badge"><?php echo esc_html__('Active', 'twork-builder'); ?></span>
							<?php endif; ?>
						</div>

						<div class="twork-kit-card__body">
							<h2 class="twork-kit-card__title">
								<?php
								echo esc_html(
									sprintf(
										/* translators: 1: kit number 2: kit label */
										__('Template %1$d — %2$s', 'twork-builder'),
										$kit_id,
										$kit['label']
									)
								);
								?>
							</h2>
							<p class="twork-kit-card__desc"><?php echo esc_html($kit['description']); ?></p>
							<p class="twork-kit-card__meta">
								<strong><?php echo esc_html(sprintf(/* translators: %d: page count */ __('%d pages', 'twork-builder'), (int) $kit['page_count'])); ?></strong>
							</p>

							<details class="twork-kit-card__details" id="<?php echo esc_attr($detail_id); ?>">
								<summary><?php echo esc_html__('Preview Design — Pages & Blocks', 'twork-builder'); ?></summary>
								<div class="twork-kit-card__detail-body">
									<?php if (!empty($kit['pages']) && is_array($kit['pages'])) : ?>
										<?php foreach ($kit['pages'] as $page) : ?>
											<section class="twork-kit-page">
												<h3 class="twork-kit-page__title">
													<?php echo esc_html($page['title']); ?>
													<code><?php echo esc_html($page['slug']); ?></code>
													<?php if (!empty($page['front'])) : ?>
														<span class="twork-kit-page__front"><?php echo esc_html__('Front', 'twork-builder'); ?></span>
													<?php endif; ?>
												</h3>
												<?php if (!empty($page['blocks'])) : ?>
													<ul class="twork-kit-blocks">
														<?php foreach ($page['blocks'] as $bt) : ?>
															<li><?php echo esc_html($bt); ?></li>
														<?php endforeach; ?>
													</ul>
												<?php else : ?>
													<p class="twork-kit-page__empty"><?php echo esc_html__('No blocks listed.', 'twork-builder'); ?></p>
												<?php endif; ?>
											</section>
										<?php endforeach; ?>
									<?php else : ?>
										<p><?php echo esc_html__('No page detail available.', 'twork-builder'); ?></p>
									<?php endif; ?>
								</div>
							</details>

							<form class="twork-kit-card__form" method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" onsubmit="return confirm('<?php echo esc_js(__('Apply this template? Kit-owned pages will be created or updated. Existing non-kit pages with the same slug will be skipped.', 'twork-builder')); ?>');">
								<input type="hidden" name="action" value="twork_apply_kit" />
								<input type="hidden" name="kit_id" value="<?php echo esc_attr((string) $kit_id); ?>" />
								<?php wp_nonce_field(self::NONCE); ?>
								<?php
								submit_button(
									sprintf(
										/* translators: %d: template number */
										__('Apply Template %d', 'twork-builder'),
										$kit_id
									),
									'primary',
									'submit',
									false
								);
								?>
							</form>
						</div>
					</article>
				<?php endforeach; ?>
			</div>

			<?php if (is_array($log) && (!empty($log['created']) || !empty($log['updated']) || !empty($log['skipped']) || !empty($log['failed']))) : ?>
				<hr />
				<h2><?php echo esc_html__('Last apply log', 'twork-builder'); ?></h2>
				<?php self::render_log_table(__('Created', 'twork-builder'), isset($log['created']) ? $log['created'] : array()); ?>
				<?php self::render_log_table(__('Updated', 'twork-builder'), isset($log['updated']) ? $log['updated'] : array()); ?>
				<?php self::render_log_table(__('Skipped', 'twork-builder'), isset($log['skipped']) ? $log['skipped'] : array(), true); ?>
				<?php self::render_log_table(__('Failed', 'twork-builder'), isset($log['failed']) ? $log['failed'] : array(), true); ?>
			<?php endif; ?>

			<p class="twork-templates-note">
				<?php echo esc_html__('Apply ပြီး block markup ပါပြီးသား pages ထွက်ပါမယ်။ Dynamic Woo/CPT blocks က dependencies ရှိမှ frontend မှာ data ပြပါမယ်။', 'twork-builder'); ?>
			</p>
		</div>
		<?php
	}

	/**
	 * Render a simple log table.
	 *
	 * @param string            $heading     Table heading.
	 * @param array<int, mixed> $rows        Rows.
	 * @param bool              $show_reason Show reason column.
	 * @return void
	 */
	protected static function render_log_table($heading, array $rows, $show_reason = false) {
		if (empty($rows)) {
			return;
		}
		?>
		<h3><?php echo esc_html($heading); ?></h3>
		<table class="widefat striped" style="max-width:720px;">
			<thead>
				<tr>
					<th><?php echo esc_html__('Title / Slug', 'twork-builder'); ?></th>
					<th><?php echo esc_html__('ID', 'twork-builder'); ?></th>
					<?php if ($show_reason) : ?>
						<th><?php echo esc_html__('Reason', 'twork-builder'); ?></th>
					<?php endif; ?>
					<th><?php echo esc_html__('Edit', 'twork-builder'); ?></th>
				</tr>
			</thead>
			<tbody>
				<?php foreach ($rows as $row) : ?>
					<?php
					$id    = isset($row['id']) ? (int) $row['id'] : 0;
					$label = isset($row['title']) ? $row['title'] : (isset($row['slug']) ? $row['slug'] : '');
					?>
					<tr>
						<td><?php echo esc_html((string) $label); ?><?php if (!empty($row['slug'])) : ?> <code><?php echo esc_html($row['slug']); ?></code><?php endif; ?></td>
						<td><?php echo $id ? esc_html((string) $id) : '—'; ?></td>
						<?php if ($show_reason) : ?>
							<td><?php echo esc_html(isset($row['reason']) ? (string) $row['reason'] : ''); ?></td>
						<?php endif; ?>
						<td>
							<?php if ($id) : ?>
								<a href="<?php echo esc_url(get_edit_post_link($id, 'raw')); ?>"><?php echo esc_html__('Edit', 'twork-builder'); ?></a>
							<?php else : ?>
								—
							<?php endif; ?>
						</td>
					</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
		<?php
	}
}

Twork_Template_Admin::init();
