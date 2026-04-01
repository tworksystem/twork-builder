/**
 * Migrate Agrezer-branded blocks to structural twork/* blocks.
 *
 * Strategy:
 * - Copy existing src/agrezer-* directories into src/deprecated/<agrezer-dir>/ (keeps old block names working).
 * - In-place refactor original src/agrezer-* blocks:
 *   - Update block.json name/title/description/keywords/parent references
 *   - Update allowedBlocks + InnerBlocks templates + example.innerBlocks
 *   - Update editor-only selectors that reference old data-type block names
 *
 * Notes:
 * - This script intentionally does NOT attempt to rename folders; it keeps paths stable.
 * - Legacy copies preserve old markup/classes/styles for validation/back-compat.
 */

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(process.cwd());
const srcDir = path.join(repoRoot, 'src');
const deprecatedRoot = path.join(srcDir, 'deprecated');

/** @type {Record<string,string>} */
const nameMap = {
	'twork/agrezer-about-feature-item': 'twork/feature-item',
	'twork/agrezer-about-features-grid': 'twork/features-grid',
	'twork/agrezer-about-image-card': 'twork/image-card',
	'twork/agrezer-about-images-grid': 'twork/images-grid',
	'twork/agrezer-about-intro-feature': 'twork/intro-feature',
	'twork/agrezer-about-intro-section': 'twork/intro-section',
	'twork/agrezer-about-section': 'twork/info-section',
	'twork/agrezer-blog-section': 'twork/posts-grid',
	'twork/agrezer-contact-card-item': 'twork/contact-card',
	'twork/agrezer-contact-cards': 'twork/contact-cards',
	'twork/agrezer-contact-map': 'twork/contact-map',
	'twork/agrezer-greener-card-item': 'twork/image-link-card',
	'twork/agrezer-greener-cards-row': 'twork/cards-row',
	'twork/agrezer-greener-section': 'twork/highlights-section',
	'twork/agrezer-greener-stat-item': 'twork/stat-item',
	'twork/agrezer-greener-stats-row': 'twork/stats-row',
	'twork/agrezer-hero-feature-item': 'twork/hero-feature',
	'twork/agrezer-hero-section': 'twork/hero-section',
	'twork/agrezer-page-header-section': 'twork/page-header',
	'twork/agrezer-partners-item': 'twork/partner-item',
	'twork/agrezer-partners-section': 'twork/partners',
	'twork/agrezer-process-center': 'twork/process-center',
	'twork/agrezer-process-section': 'twork/process',
	'twork/agrezer-process-step': 'twork/process-step',
	'twork/agrezer-shop-grid-section': 'twork/products-grid',
	'twork/agrezer-stats-card': 'twork/stat-card',
	'twork/agrezer-stats-column': 'twork/stats-column',
	'twork/agrezer-stats-cta': 'twork/cta-block',
	'twork/agrezer-stats-section': 'twork/stats-section',
	'twork/agrezer-team-card': 'twork/team-member',
	'twork/agrezer-team-section': 'twork/team-section',
	'twork/agrezer-testimonial-slide': 'twork/testimonial',
	'twork/agrezer-testimonials-section': 'twork/testimonials',
	'twork/agrezer-third-section': 'twork/cta-cards-section',
	'twork/agrezer-third-section-card': 'twork/stat-image-card',
	'twork/agrezer-voices-slide': 'twork/voice',
	'twork/agrezer-voices-section': 'twork/voices',
	'twork/agrezer-why-choose-point-item': 'twork/benefit-point',
	'twork/agrezer-why-choose-section': 'twork/benefits-section',
};

/** @type {Record<string,{title:string,description:string,keywords?:string[]}>} */
const meta = {
	'twork/feature-item': {
		title: 'Feature Item',
		description: 'Single feature column with icon, title, and description.',
	},
	'twork/features-grid': {
		title: 'Features Grid',
		description: 'Grid container for feature items.',
	},
	'twork/image-card': {
		title: 'Image Card',
		description: 'Image card with overlay text and optional button.',
	},
	'twork/images-grid': {
		title: 'Images Grid',
		description: 'Grid container for image cards.',
	},
	'twork/intro-feature': {
		title: 'Intro Feature',
		description: 'Small feature label (intro list item).',
	},
	'twork/intro-section': {
		title: 'Intro Section',
		description: 'Intro section with media and feature list.',
	},
	'twork/info-section': {
		title: 'Info Section',
		description: 'Section with heading and nested content blocks.',
	},
	'twork/posts-grid': {
		title: 'Posts Grid',
		description: 'Dynamic posts grid (server-rendered).',
	},
	'twork/contact-card': {
		title: 'Contact Card',
		description: 'Single contact card item.',
	},
	'twork/contact-cards': {
		title: 'Contact Cards',
		description: 'Grid of contact card items.',
	},
	'twork/contact-map': {
		title: 'Contact Map',
		description: 'Contact map / embed section.',
	},
	'twork/image-link-card': {
		title: 'Image Link Card',
		description: 'Image card with title and link.',
	},
	'twork/cards-row': {
		title: 'Cards Row',
		description: 'Row/grid container for card items.',
	},
	'twork/highlights-section': {
		title: 'Highlights Section',
		description: 'Highlights section with stats row and cards row.',
	},
	'twork/stat-item': {
		title: 'Stat Item',
		description: 'Single stat item with icon, title and description.',
	},
	'twork/stats-row': {
		title: 'Stats Row',
		description: 'Row/grid container for stat items.',
	},
	'twork/hero-feature': {
		title: 'Hero Feature',
		description: 'Hero feature item.',
	},
	'twork/hero-section': {
		title: 'Hero Section',
		description: 'Hero section with background and feature items.',
	},
	'twork/page-header': {
		title: 'Page Header',
		description: 'Page header with title, background, and breadcrumb.',
	},
	'twork/partner-item': {
		title: 'Partner Item',
		description: 'Single partner/logo item.',
	},
	'twork/partners': {
		title: 'Partners',
		description: 'Partners marquee/row section.',
	},
	'twork/process-center': {
		title: 'Process Center',
		description: 'Center element in a process timeline/steps layout.',
	},
	'twork/process': {
		title: 'Process',
		description: 'Process section with steps and center element.',
	},
	'twork/process-step': {
		title: 'Process Step',
		description: 'Process step item.',
	},
	'twork/products-grid': {
		title: 'Products Grid',
		description: 'Dynamic products grid (server-rendered).',
	},
	'twork/stat-card': {
		title: 'Stat Card',
		description: 'Statistic image card.',
	},
	'twork/stats-column': {
		title: 'Stats Column',
		description: 'Column container for stats cards/CTA.',
	},
	'twork/cta-block': {
		title: 'CTA Block',
		description: 'Call-to-action block.',
	},
	'twork/stats-section': {
		title: 'Stats Section',
		description: 'Stats section with columns.',
	},
	'twork/team-member': {
		title: 'Team Member',
		description: 'Team member card.',
	},
	'twork/team-section': {
		title: 'Team Section',
		description: 'Team section with team member blocks.',
	},
	'twork/testimonial': {
		title: 'Testimonial',
		description: 'Single testimonial slide/card.',
	},
	'twork/testimonials': {
		title: 'Testimonials',
		description: 'Testimonials section/slider.',
	},
	'twork/cta-cards-section': {
		title: 'CTA + Cards Section',
		description: 'Intro row with optional CTA and stat-image cards.',
	},
	'twork/stat-image-card': {
		title: 'Stat Image Card',
		description: 'Image card with stat and label overlay.',
	},
	'twork/voice': {
		title: 'Voice',
		description: 'Single voice/testimonial slide.',
	},
	'twork/voices': {
		title: 'Voices',
		description: 'Voices/testimonials section.',
	},
	'twork/benefit-point': {
		title: 'Benefit Point',
		description: 'Numbered point item positioned on a stage.',
	},
	'twork/benefits-section': {
		title: 'Benefits Section',
		description: 'Hero stage with positioned benefit points.',
	},
};

function ensureDir(p) {
	fs.mkdirSync(p, { recursive: true });
}

function copyDir(src, dest) {
	ensureDir(dest);
	for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
		const from = path.join(src, ent.name);
		const to = path.join(dest, ent.name);
		if (ent.isDirectory()) copyDir(from, to);
		else fs.copyFileSync(from, to);
	}
}

function readText(p) {
	return fs.readFileSync(p, 'utf8');
}

function writeText(p, txt) {
	fs.writeFileSync(p, txt);
}

function replaceAll(str, replacements) {
	let out = str;
	for (const [from, to] of replacements) {
		out = out.split(from).join(to);
	}
	return out;
}

function isAgrezerDirName(name) {
	return name.startsWith('agrezer-');
}

function listAgrezerDirs() {
	return fs
		.readdirSync(srcDir, { withFileTypes: true })
		.filter((d) => d.isDirectory() && isAgrezerDirName(d.name))
		.map((d) => d.name)
		.sort();
}

function updateBlockJson(blockJsonPath) {
	const raw = readText(blockJsonPath);
	/** @type {any} */
	const json = JSON.parse(raw);

	const oldName = json.name;
	const newName = nameMap[oldName];
	if (!newName) return;

	json.name = newName;
	json.title = meta[newName]?.title ?? json.title;
	json.description = meta[newName]?.description ?? json.description;
	json.textdomain = 'twork-builder';
	if (Array.isArray(json.keywords)) {
		json.keywords = json.keywords.filter((k) => !String(k).includes('agrezer'));
	}

	if (Array.isArray(json.parent)) {
		json.parent = json.parent.map((p) => nameMap[p] ?? p);
	}

	// example.innerBlocks references
	if (json.example && Array.isArray(json.example.innerBlocks)) {
		for (const b of json.example.innerBlocks) {
			if (b && typeof b === 'object' && typeof b.name === 'string') {
				b.name = nameMap[b.name] ?? b.name;
			}
		}
	}

	writeText(blockJsonPath, JSON.stringify(json, null, '\t') + '\n');
}

function updateSourceFile(filePath) {
	let txt = readText(filePath);
	// Update block names in JS/SCSS/JSON-ish strings
	for (const [oldName, newName] of Object.entries(nameMap)) {
		txt = txt.split(oldName).join(newName);
	}
	writeText(filePath, txt);
}

function main() {
	ensureDir(deprecatedRoot);

	const agrezerDirs = listAgrezerDirs();
	console.log(`Found ${agrezerDirs.length} agrezer block dirs.`);

	// 1) Copy to deprecated (legacy)
	for (const dir of agrezerDirs) {
		const src = path.join(srcDir, dir);
		const dest = path.join(deprecatedRoot, dir);
		if (!fs.existsSync(dest)) {
			copyDir(src, dest);
		}
	}

	// 2) Update originals
	for (const dir of agrezerDirs) {
		const base = path.join(srcDir, dir);
		const blockJson = path.join(base, 'block.json');
		if (fs.existsSync(blockJson)) updateBlockJson(blockJson);

		for (const name of fs.readdirSync(base)) {
			const fp = path.join(base, name);
			if (!fs.statSync(fp).isFile()) continue;
			if (/\.(js|scss|json)$/.test(name)) updateSourceFile(fp);
		}
	}

	// 3) Update cross-references across src (templates/allowedBlocks/data-type selectors)
	for (const rel of fs.readdirSync(srcDir)) {
		const p = path.join(srcDir, rel);
		if (!fs.statSync(p).isDirectory()) continue;
		// skip legacy copies
		if (rel === 'deprecated') continue;
		// update any JS/SCSS in other dirs that referenced agrezer block names
		for (const ent of fs.readdirSync(p)) {
			const fp = path.join(p, ent);
			if (!fs.existsSync(fp) || !fs.statSync(fp).isFile()) continue;
			if (/\.(js|scss|json)$/.test(ent)) {
				updateSourceFile(fp);
			}
		}
	}

	console.log('Done. Legacy blocks copied to src/deprecated/.');
}

main();

