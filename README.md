# 🧱 Twork Builder

> **Professional WordPress Gutenberg Blocks Plugin** — purpose-built for the Twork Ecosystem  
> Enterprise-grade page building blocks for hospitals, clinics, corporate sites, and e-commerce.

[![License: GPL v2 or later](https://img.shields.io/badge/License-GPL%20v2%2B-blue.svg)](LICENSE)
[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-7.4%2B-purple.svg)](https://php.net/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Gutenberg](https://img.shields.io/badge/Gutenberg-Blocks-orange.svg)](https://developer.wordpress.org/block-editor/)

**Current Version:** `1.0.8` · **220+ Custom Blocks** · **GPL v2 or later**

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Requirements](#-requirements)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Block Catalog](#-block-catalog)
- [Patient Guide Blocks](#-patient-guide-blocks-new-in-v108)
- [Brand Page Blocks](#-brand-page-blocks-industry-agnostic)
- [Shweghee Reference Site](#-shweghee-reference-site)
- [Available Scripts](#️-available-scripts)
- [Development Workflow](#-development-workflow)
- [Block Architecture](#️-block-architecture)
- [PHP Render Callbacks](#-php-render-callbacks)
- [Frontend Assets](#-frontend-assets)
- [HTML Page Templates](#-html-page-templates)
- [Build & Deployment](#-build--deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Commit Convention](#-commit-convention)
- [License & Support](#-license--support)

---

## 🌟 Overview

**Twork Builder** is a production-ready WordPress plugin that delivers **220+ custom Gutenberg blocks** for building modern, responsive websites within the Twork Ecosystem. It powers hospital portals, corporate marketing sites, pharmacy shops, CSR pages, food & retail brand sites, and specialty department layouts — all editable through the native WordPress Block Editor.

Built with **ES6+**, **SCSS**, **@wordpress/scripts**, and **WordPress best practices**, the plugin is designed for:

- 🏥 **Healthcare & hospital websites** — departments, doctors, health checks, emergency units, patient guides
- 🥑 **Agrezer / Avocado brand sites** — hero sections, stats, testimonials, shop grids
- 🧈 **Food & retail brand sites** — Shweghee-style home pages with carousels, categories, and reviews
- 🛒 **WooCommerce integration** — pharmacy categories, popular products, shop layouts
- 🏢 **Corporate & CSR pages** — mission/vision, awards, events, initiatives
- 📱 **Fully responsive layouts** — mobile-first SCSS with editor/frontend parity

---

## ✨ Key Features

| Feature | Description |
| --- | --- |
| 🎨 **220+ Custom Blocks** | Pre-built sections, cards, grids, heroes, FAQs, timelines, and more |
| 🏪 **Brand Page Suite** | Industry-agnostic header, carousels, grids, FAQ, newsletter, and footer blocks |
| 🏥 **Patient Guide Suite** | Visiting hours, visitor guidelines (Do's & Don'ts) — new in v1.0.8 |
| 🧪 **Static-to-Block QA** | `shweghee/` reference site for visual parity before WordPress migration |
| 🚀 **Modern Dev Stack** | ES6+, SCSS, Webpack via `@wordpress/scripts` |
| 📦 **Production Builds** | Minified bundles, PHP copy to `build/`, plugin ZIP generator |
| 🔧 **Developer Tooling** | Sync scripts, style import patching, block recovery utilities |
| 📱 **Responsive by Default** | Mobile-first SCSS with fluid spacing and breakpoint-aware layouts |
| ⚡ **Performance Focused** | Conditional script enqueue, scoped block styles, optimized builds |
| 🧩 **Dynamic PHP Blocks** | Server-side render callbacks for blog, shop, updates, and CPT-driven content |
| 🎯 **Editor Experience** | Dedicated block category, inspector controls, editor-only styles |
| 🗂️ **Deprecated Block Support** | Legacy blocks preserved under `src/deprecated/` for safe migration |

---

## 📦 Requirements

| Dependency | Minimum Version |
| --- | --- |
| **WordPress** | 6.0+ |
| **PHP** | 7.4+ |
| **Node.js** | 18.0+ |
| **npm** | 9.0+ |

**Optional integrations:**

- 🛒 **WooCommerce** — required for pharmacy and Agrezer shop blocks
- 📰 **Custom Post Types** — Awards, CSR Initiatives, Emergency Units (included in plugin)

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/tworksystem/twork-builder.git
cd twork-builder
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Development Mode (Watch)

```bash
npm start
```

Starts the development build with **hot reload** — recompiles automatically on file changes in `src/`.

> 💡 `npm start` runs `sync-src-from-mk.py` and `patch-style-imports.py` before Webpack. Hand-written blocks in `SKIP_BLOCKS` are never overwritten.

### 4️⃣ Production Build

```bash
npm run build
```

Builds minified, optimized assets into `build/`. Uses **8 GB Node heap** by default to handle the large block set.

> 💡 **Out of memory?** Run:
>
> ```bash
> NODE_OPTIONS=--max-old-space-size=8192 npm run build
> ```

### 5️⃣ Create Plugin ZIP

```bash
./create-zip.sh
```

Generates `twork-builder-{version}.zip` in the project root — ready for WordPress upload (under 2 MB target).

### 6️⃣ Install in WordPress

**Via Admin Dashboard:**

`Plugins → Add New → Upload Plugin → twork-builder-1.0.8.zip → Activate`

**Via WP-CLI:**

```bash
wp plugin install twork-builder-1.0.8.zip --activate
```

---

## 📁 Project Structure

```
twork-builder/
├── 📂 src/                          # Block source (ES6, SCSS, block.json)
│   ├── agrezer-*/                   # Agrezer / Avocado brand blocks
│   ├── health-check-*/              # Health check package blocks
│   ├── em-*/                        # Emergency department blocks
│   ├── rad-*/                       # Radiology & imaging blocks
│   ├── phy-*/                       # Physiotherapy blocks
│   ├── ph-*/                        # Pharmacy / WooCommerce blocks
│   ├── csr-*/                       # CSR & community blocks
│   ├── brand-*/                     # Industry-agnostic brand page blocks
│   ├── visiting-info-section/       # Patient guide — visiting hours (v1.0.8)
│   ├── visiting-hours-item/         # Visiting hours ward child block
│   ├── visitor-guidelines-section/  # Do's & Don'ts guidelines section
│   ├── visitor-guidelines-column/   # Guidelines column child block
│   ├── amb-process-section/         # Ambulance process flow section
│   ├── amb-process-step/            # Ambulance process step child
│   ├── hero-banner-*/               # Hero carousel parent + slide child
│   ├── deprecated/                  # Legacy blocks (migration-safe)
│   └── global.scss                  # Shared global stylesheet
├── 📂 shweghee/                     # Static reference site (block migration QA)
│   ├── src/components/              # One section per folder (HTML/CSS/JS)
│   ├── src/pages/                   # Home, shop, about, blog, and more
│   └── docs/                        # Architecture + block mapping guides
├── 📂 build/                        # Compiled output (generated — do not edit)
├── 📂 assets/
│   ├── images/                      # Static image assets
│   └── js/                          # Frontend init scripts (conditionally enqueued)
├── 📂 includes/                     # PHP classes & render callbacks
├── 📂 scripts/                      # Dev & migration utilities
│   ├── sync-src-from-mk.py          # Sync blocks from mk-builder source
│   ├── patch-style-imports.py       # Fix SCSS import paths post-sync
│   ├── fix-recovered-blocks.py      # Recover corrupted block metadata
│   └── extract-src.py               # Extract block sources from build
├── 📄 *.html                        # Static page layout references
├── 📄 twork-builder.php             # Main plugin bootstrap (v1.0.8)
├── 📄 webpack.config.js             # Custom Webpack / Sass config
├── 📄 create-zip.sh                 # Production ZIP creator
├── 📄 package.json
└── 📄 README.md
```

---

## 🧩 Block Catalog

Blocks are registered automatically from `build/` and appear under **"Twork Builder Blocks"** in the Gutenberg inserter.

### 🥑 Agrezer / Avocado Brand

Hero sections, about pages, stats, testimonials, partners, process flows, shop grids, blog layouts, contact cards, greener/sustainability sections, and why-choose layouts.

```
agrezer-hero-section · agrezer-about-section · agrezer-stats-section
agrezer-testimonials-section · agrezer-partners-section · agrezer-shop-grid-section
agrezer-why-choose-section · agrezer-voices-section · agrezer-blog-section · …
```

### 🏥 Hospital & Clinical

Department layouts, centre pages, doctor directories, emergency units, neuro/radiology/physio sections, health check packages, and patient guides.

```
emergency-hero · doctor-search-filter-section · health-check-packages-section
neuro-centre-section · rad-stats-section · phy-conditions-section · paediatrics-hero · …
```

### 🛒 Pharmacy & E-Commerce

WooCommerce-powered shop categories, popular products, and Agrezer product grids.

```
ph-shop-category-section · ph-popular-products-section · agrezer-shop-grid-section
```

### 🌍 CSR & Corporate

Awards, initiatives, events, moments gallery, mission/vision, accreditations, and team sections.

```
csr-initiatives-section · csr-events-section · csr-stats-section
accreditation-section · mission-vision-grid · team-members-grid · …
```

### 🧱 Layout & Utility

Containers, page heroes, timelines, story grids, feature sections, navigation, and shared structural blocks.

```
container · page-hero · timeline · story-grid · features-section · twork-nav-item · …
```

---

## 🏥 Patient Guide Blocks (New in v1.0.8)

Purpose-built blocks for **hospital patient guide pages** — visiting policies, ward hours, and visitor conduct guidelines.

| Block | Slug | Description |
| --- | --- | --- |
| 🕐 Visiting Information Section | `twork/visiting-info-section` | Two-column layout with visiting hours card + image |
| ⏰ Visiting Hours Item | `twork/visiting-hours-item` | Ward name, time slot, and icon child block |
| 📋 Visitor Guidelines Section | `twork/visitor-guidelines-section` | Do's & Don'ts multi-column guidelines layout |
| 📌 Visitor Guidelines Column | `twork/visitor-guidelines-column` | Single Do's or Don'ts column with list items |

### 🏠 Recommended Patient Guide Stack

```
page-hero → visiting-info-section → visitor-guidelines-section → contact-section
```

**Static reference:** `patient-guide.html` at project root.

> 📌 **Note:** `visitor-guidelines-*` and `amb-process-*` blocks are **hand-written** and listed in `SKIP_BLOCKS` inside `scripts/sync-src-from-mk.py` — they are never overwritten by the sync pipeline.

---

## 🏪 Brand Page Blocks (Industry-Agnostic)

A complete **home-page block suite** with sector-neutral naming (`twork/*`). Designed for food, retail, healthcare, and corporate brand sites.

### 🧭 Navigation & Shell

| Block | Slug | Description |
| --- | --- | --- |
| 🏷️ Brand Header | `twork/brand-header` | Logo, hotline, search toggle, sticky header, mobile menu |
| 🔗 Brand Nav Item | `twork/brand-nav-item` | Child nav link with optional dropdown |
| 🦶 Brand Footer | `twork/brand-footer` | Multi-column footer shell |

### 🎠 Hero & Carousels

| Block | Slug | Description |
| --- | --- | --- |
| 🖼️ Hero Banner Carousel | `twork/hero-banner-carousel` | Fade hero slider with autoplay, arrows, and dots |
| 🃏 Image Card Carousel | `twork/image-card-carousel` | Services / features horizontal carousel |

### 🎯 Conversion & Engagement

| Block | Slug | Description |
| --- | --- | --- |
| ❓ FAQ Accordion Section | `twork/faq-accordion-section` | Accessible FAQ accordion with FAQPage schema |
| ✉️ Subscribe Bar | `twork/subscribe-bar` | Email newsletter strip with honeypot anti-spam |
| 📱 Split Promo Section | `twork/split-promo-section` | App download / split-layout CTA |

---

## 🧈 Shweghee Reference Site

The `shweghee/` directory is a **modular static HTML/CSS/JS reference site** used for design QA and WordPress block migration.

### 🚀 Run Locally

```bash
cd shweghee/src
python3 -m http.server 8080
# Home: http://localhost:8080/pages/home.html
```

### 🔄 Static → Block Migration Workflow

1. 🎨 **Design** — Build or refine section in `shweghee/src/components/<section>/`
2. 📋 **Map** — Add row to `shweghee/docs/block-mapping.md`
3. 🧱 **Scaffold** — Create matching block in `src/<block-name>/`
4. 🎨 **Port styles** — Move `*.css` → block `style.scss`
5. ⚡ **Port scripts** — Move `init*` logic → block `view.js`
6. ✅ **QA** — Visual compare static page vs. WordPress editor + frontend

---

## 🛠️ Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | 🔁 Development mode with watch & hot reload |
| `npm run build` | 📦 Production build (minified, PHP copied to `build/`) |
| `npm run sync-src` | 🔄 Sync block sources from mk-builder (respects `SKIP_BLOCKS`) |
| `npm run extract-src` | 📤 Extract block sources from `build/` output |
| `./create-zip.sh` | 🗜️ Create WordPress-ready plugin ZIP (production files only) |

---

## 🔄 Development Workflow

```mermaid
flowchart LR
    A[Edit src/] --> B[npm start]
    B --> C[Test in WP Editor]
    C --> D{Ready?}
    D -->|No| A
    D -->|Yes| E[npm run build]
    E --> F[./create-zip.sh]
    F --> G[Deploy to WordPress]
```

1. ✏️ **Edit** block files in `src/<block-name>/`
2. 🔁 **Watch** with `npm start` during development
3. 🧪 **Test** in the WordPress Block Editor and on the frontend
4. 📦 **Build** with `npm run build` before release
5. 🗜️ **Package** with `./create-zip.sh` for deployment
6. 🚀 **Deploy** via WordPress admin or WP-CLI

---

## 🏗️ Block Architecture

Each block in `src/` follows a consistent, WordPress-standard structure:

```
src/my-block/
├── block.json          # 📋 Metadata, attributes, supports, asset handles
├── index.js            # 🔌 Block registration entry point
├── edit.js             # ✏️  Editor component (React)
├── save.js             # 💾 Frontend save output (or null for dynamic blocks)
├── style.scss          # 🎨 Frontend styles
├── editor.scss         # 🖥️  Editor-only styles (optional)
├── view.js             # ⚡ Frontend JavaScript (optional)
└── render.php          # 🐘 Server-side render (dynamic blocks only)
```

### Build Pipeline

`@wordpress/scripts` + custom `webpack.config.js`:

- ✅ Compiles SCSS → CSS with modern Sass API
- ✅ Bundles JavaScript via Webpack
- ✅ Minifies with Terser (`parallel: false` for memory safety)
- ✅ Copies `render.php` to `build/` via `WP_COPY_PHP_FILES_TO_DIST=1`
- ✅ Emits shared `build/global.css` from `src/global.scss`
- ✅ Webpack aliases: `@twork-builder/editor-utils`, `@twork-builder/shared`

---

## 🐘 PHP Render Callbacks

Dynamic blocks with server-side rendering live in `includes/`:

| Class | Purpose |
| --- | --- |
| `class-twork-award.php` | 🏆 Award custom post type & block support |
| `class-twork-blog-section.php` | 📰 Blog layout with featured posts, grid, sidebar |
| `class-twork-csr-initiative.php` | 🌱 CSR initiative post meta |
| `class-twork-em-units-section.php` | 🚑 Emergency units from posts |
| `class-twork-ph-shop-category-section.php` | 🛒 Pharmacy categories (WooCommerce) |
| `class-twork-ph-popular-products-section.php` | ⭐ Popular products (WooCommerce) |
| `class-twork-phy-facilities-section.php` | 💪 Physio facilities from posts |
| `class-twork-updates-section.php` | 📢 Hospital news & updates section |

Blocks are auto-registered by scanning `build/*/block.json` in `twork-builder.php`.

---

## ⚡ Frontend Assets

Frontend JavaScript is **registered globally** and **enqueued conditionally** per page in `twork-builder.php`:

```
assets/js/
├── jivaka-header-init.js       # Header navigation
├── hero-new-init.js            # Hero animations
├── doctor-directory-init.js    # Doctor search/filter
├── amb-process-section-init.js # Ambulance process interactions
├── csr-initiatives-init.js     # CSR interactions
└── … (30+ init scripts)
```

**CDN libraries** (loaded when needed):

- 🎠 **Swiper.js** — carousels & sliders
- 🎬 **GSAP** — scroll & entrance animations
- 🎨 **Font Awesome** — icon library

---

## 📄 HTML Page Templates

Static HTML reference layouts are included at the project root for design QA and block composition planning:

```
home.html · about.html · contact.html · blog.html · pharmacy.html
health-check-up.html · neuro-centre.html · csr.html · patient-guide.html · …
```

---

## 🚢 Build & Deployment

### Development / Staging

```bash
npm run build
# Copy plugin folder or symlink into wp-content/plugins/
```

### Production Release

```bash
npm run build
./create-zip.sh
# Upload twork-builder-1.0.8.zip to production WordPress
```

### ✅ Checklist Before Release

- [ ] `npm run build` completes without errors
- [ ] Blocks render correctly in editor and frontend
- [ ] Dynamic blocks tested with live post/product data
- [ ] Responsive layouts verified (mobile, tablet, desktop)
- [ ] Plugin ZIP installs cleanly on a fresh WordPress instance
- [ ] ZIP size under 2 MB WordPress upload limit

---

## 🔧 Troubleshooting

### ❌ Build fails or runs out of memory

```bash
node --version          # Must be >= 18.0.0
rm -rf node_modules && npm install
NODE_OPTIONS=--max-old-space-size=8192 npm run build
```

### ❌ Blocks not appearing in the editor

1. Ensure `build/` exists — run `npm run build`
2. Check WordPress debug log: `WP_DEBUG_LOG` in `wp-config.php`
3. Validate `block.json` files are valid JSON
4. Clear WordPress object/page cache

### ❌ Sync script overwrites hand-written blocks

Add the block folder name to `SKIP_BLOCKS` in `scripts/sync-src-from-mk.py`.

### ❌ WooCommerce blocks show empty data

1. Confirm WooCommerce is installed and activated
2. Ensure products/categories exist in the WooCommerce catalog
3. Check PHP render callback logs in `wp-content/debug.log`

---

## 🤝 Contributing

We welcome contributions! Please follow this workflow:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch: `git checkout -b feature/my-feature`
3. ✍️ **Commit** with the [commit convention](#-commit-convention) below
4. 📤 **Push** to your fork: `git push origin feature/my-feature`
5. 🔀 **Open** a Pull Request with a clear description and test plan

---

## 📝 Commit Convention

This project follows **Conventional Commits** with a date-stamped prefix:

```
<type>: DDMMYYYY - <professional description>
```

| Type | When to Use | Example |
| --- | --- | --- |
| `feat` | ✨ New feature or enhancement | `feat: 13072026 - add visiting info blocks for patient guide pages` |
| `fix` | 🐛 Bug fix | `fix: 13072026 - restore FAQ accordion keyboard navigation on mobile` |
| `docs` | 📚 Documentation only | `docs: 13072026 - expand README with patient guide block catalog` |
| `refactor` | ♻️ Code restructure (no behavior change) | `refactor: 13072026 - modernize stats section spacing architecture` |
| `style` | 💅 Formatting / SCSS-only | `style: 13072026 - normalize hero section typography tokens` |
| `chore` | 🔧 Tooling, deps, config | `chore: 13072026 - bump plugin version to 1.0.8` |
| `perf` | ⚡ Performance improvement | `perf: 13072026 - defer non-critical frontend init scripts` |
| `test` | 🧪 Tests | `test: 13072026 - add block registration smoke tests` |

**Rules:**

- ✅ Use lowercase type prefix
- ✅ Use present tense, imperative mood ("add", "fix", "update")
- ✅ Keep the first line under 72 characters when possible
- ✅ Add body paragraphs for complex changes if needed

---

## 📜 License & Support

### License

This project is licensed under the **GPL v2 or later** — see [LICENSE](LICENSE) for details.

### Support

**T-Work System Co., Ltd.**

- 🌐 **Website:** [https://www.tworksystem.com](https://www.tworksystem.com)
- 🔗 **Plugin URI:** [https://www.tworksystem.com/twork-builder](https://www.tworksystem.com/twork-builder)
- 🐙 **GitHub:** [https://github.com/tworksystem/twork-builder](https://github.com/tworksystem/twork-builder)

### Author

**Maw Kunn Myat** — [@mawkunnmyat](https://github.com/mawkunnmyat)  
📧 mapoeeiphyu2017.miitinternship@gmail.com

---

**🏢 T-Work System Co., Ltd.**

© 2026 T-Work System Co., Ltd. All rights reserved.

_Built with ❤️ for the Twork Ecosystem_
