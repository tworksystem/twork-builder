/**
 * Strip remaining "agrezer" tokens from the *structural* block source set.
 *
 * - Targets: src/<agrezer-dir>/ (NOT src/deprecated/**)
 * - Rewrites:
 *   - CSS/JS class prefix "agrezer-" -> "twork-"
 *   - CSS var prefix "--agrezer-" -> "--twork-"
 *   - helper/editor class prefix "twork-agrezer-" -> "twork-"
 *   - section/editor class tokens "twork-agrezer" -> "twork"
 *
 * This keeps legacy content in src/deprecated/ intact for backward compatibility.
 */

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(process.cwd());
const srcDir = path.join(repoRoot, 'src');

function isAgrezerDir(name) {
	return name.startsWith('agrezer-');
}

function walkFiles(dir) {
	/** @type {string[]} */
	const files = [];
	for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, ent.name);
		if (ent.isDirectory()) files.push(...walkFiles(p));
		else files.push(p);
	}
	return files;
}

function rewriteText(txt) {
	return (
		txt
			// block wrapper/editor helper tokens
			.replaceAll('twork-agrezer-', 'twork-')
			.replaceAll('twork-agrezer', 'twork')
			// CSS variables
			.replaceAll('--agrezer-', '--twork-')
			// BEM base
			.replaceAll('agrezer-', 'twork-')
	);
}

function main() {
	const dirs = fs
		.readdirSync(srcDir, { withFileTypes: true })
		.filter((d) => d.isDirectory() && isAgrezerDir(d.name))
		.map((d) => path.join(srcDir, d.name));

	let changed = 0;
	for (const d of dirs) {
		for (const f of walkFiles(d)) {
			if (!/\.(js|scss|json)$/.test(f)) continue;
			const before = fs.readFileSync(f, 'utf8');
			const after = rewriteText(before);
			if (after !== before) {
				fs.writeFileSync(f, after);
				changed++;
			}
		}
	}
	console.log(`Updated ${changed} files.`);
}

main();

