# Twork Builder

> Professional WordPress Gutenberg Blocks Plugin for the Twork Ecosystem

[![License: GPL v2 or later](https://img.shields.io/badge/License-GPL%20v2%20or%20later-blue.svg)](https://www.gnu.org/licenses/gpl-2.0.html)
[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-7.4%2B-blue.svg)](https://www.php.net/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0%2B-green.svg)](https://nodejs.org/)

## Overview

**Twork Builder** is a comprehensive WordPress plugin that provides a collection of custom Gutenberg blocks designed specifically for the Twork Ecosystem. Built with modern web technologies and WordPress best practices, this plugin enables developers and content creators to build professional, responsive websites with ease.

## Features

- 🎨 **Custom Gutenberg Blocks** - Rich collection of pre-built blocks for common website components
- 🚀 **Modern Development Stack** - Built with ES6+, SCSS, and WordPress Scripts
- 📦 **Production Ready** - Optimized builds with minification and code splitting
- 🔧 **Developer Friendly** - Hot reload, watch mode, and comprehensive build tools
- 📱 **Responsive Design** - All blocks are mobile-first and fully responsive
- ⚡ **Performance Optimized** - Lightweight and fast-loading blocks

## Requirements

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **WordPress**: >= 6.0
- **PHP**: >= 7.4

## Quick Start

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tworksystem/twork-builder.git
   cd twork-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Development Mode**
   ```bash
   npm start
   ```
   This starts the development build with watch mode (auto-recompiles on file changes).

4. **Production Build**
   ```bash
   npm run build
   ```
   Builds the plugin for production (minified and optimized).  
   The build runs with increased Node.js heap (4GB) to avoid out-of-memory on large block sets. If you still see `JavaScript heap out of memory`, run:
   ```bash
   NODE_OPTIONS=--max-old-space-size=8192 npm run build
   ```

5. **Create Plugin ZIP**
   ```bash
   npm run plugin-zip
   ```
   Creates a WordPress-ready zip file for installation.

## Project Structure

```
twork-builder/
├── src/                      # Source files (ES6, SCSS)
│   ├── banner-shape/         # Banner shape block
│   ├── container/            # Container block
│   ├── mission-vision-grid/  # Mission/Vision grid block
│   ├── mission-vision-item/   # Mission/Vision item block
│   ├── page-hero/            # Page hero block
│   ├── service-item/         # Service item block
│   ├── services-grid/        # Services grid block
│   ├── story-grid/           # Story grid block
│   ├── story-item/           # Story item block
│   ├── team-intro/           # Team introduction block
│   ├── team-member/          # Team member block
│   ├── team-member-item/     # Team member item block
│   ├── team-members-grid/    # Team members grid block
│   ├── text-heading-and-content/ # Text heading and content block
│   ├── timeline/             # Timeline block
│   ├── timeline-item/        # Timeline item block
│   └── timeline-wrapper/     # Timeline wrapper block
├── build/                    # Compiled files (generated)
├── assets/                   # Static assets (images, external libs)
│   ├── images/               # Image assets
│   └── js/                   # External JavaScript files
├── twork-builder.php         # Main plugin file
├── package.json              # Build configuration
└── webpack.config.js         # Webpack configuration
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development mode with watch |
| `npm run build` | Build for production |
| `npm run plugin-zip` | Build and create WordPress-ready zip |
| `npm run zip` | Create zip only (requires build first) |
| `npm run lint:js` | Lint JavaScript files |
| `npm run lint:css` | Lint CSS/SCSS files |
| `npm run format` | Format JavaScript files |
| `npm run packages-update` | Update WordPress packages |

## Development Workflow

1. **Make changes** to files in `src/` directory
2. **Run `npm start`** for development (watch mode)
3. **Test** your changes in WordPress
4. **Build for production** with `npm run build`
5. **Create plugin zip** with `npm run plugin-zip` when ready to deploy

## Block Structure

Each block in `src/` follows a standard structure:

- `block.json` - Block metadata and configuration
- `index.js` - Main block registration
- `edit.js` - Editor component
- `save.js` - Frontend save component
- `style.scss` - Frontend styles
- `editor.scss` or `editor.css` - Editor-only styles (optional)
- `view.js` - Frontend JavaScript (optional)

## Building Blocks

The plugin uses `@wordpress/scripts` which automatically:

- Compiles SCSS files to CSS
- Bundles JavaScript with Webpack
- Minifies and optimizes code
- Generates source maps (in development)
- Handles WordPress block dependencies

## Deployment

### For Development/Testing

```bash
npm run build
```

### For Production/Release

```bash
npm run plugin-zip
```

Upload the generated `twork-builder.zip` to WordPress via:
- **Admin Dashboard** → Plugins → Add New → Upload Plugin
- **WP-CLI**: `wp plugin install twork-builder.zip --activate`

## WordPress Block Registration

Blocks are automatically registered from the `build/` directory. The main plugin file (`twork-builder.php`) scans the build directory and registers all blocks that have a valid `block.json` file.

## Dependencies

### Frontend Dependencies (Already Included)

- **Swiper.js** - For carousel/slider blocks
- **UIKit** - UI framework components
- **GSAP** - Animation library (loaded from CDN)
- **Font Awesome** - Icon library (loaded from CDN)

### Build Dependencies

- `@wordpress/scripts` - WordPress build tooling
- `sass` - SCSS compiler

## Troubleshooting

### Build fails

1. Ensure Node.js >= 18.0.0: `node --version`
2. Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
3. Check for syntax errors in source files

### Blocks not appearing in WordPress

1. Ensure `build/` directory exists (run `npm run build`)
2. Check WordPress debug log for errors
3. Verify `block.json` files are valid JSON
4. Clear WordPress cache

### Styles not loading

1. Ensure SCSS files are properly imported in block files
2. Run build process: `npm run build`
3. Check browser console for 404 errors
4. Verify block.json `style` property points to correct file

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: 22012026 - Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the GPL v2 or later License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, questions, or support requests, please contact:

**T-Work System Co., Ltd.**

- **Website**: [https://www.tworksystem.com](https://www.tworksystem.com)
- **Plugin URI**: [https://www.tworksystem.com/twork-builder](https://www.tworksystem.com/twork-builder)

## Author

**Maw Kunn Myat** ([@mawkunnmyat](https://github.com/mawkunnmyat))

---

**Organization**: T-Work System Co., Ltd.

© 2026 T-Work System Co., Ltd. All rights reserved.
