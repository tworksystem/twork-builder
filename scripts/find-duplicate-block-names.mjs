import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(process.cwd());
const srcDir = path.join(repoRoot, 'src');
const deprecatedDir = path.join(srcDir, 'deprecated');

function walk(dir) {
	const out = [];
	for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, ent.name);
		if (ent.isDirectory()) out.push(...walk(p));
		else out.push(p);
	}
	return out;
}

function readJson(p) {
	return JSON.parse(fs.readFileSync(p, 'utf8'));
}

const blockJsonFiles = walk(srcDir).filter(
	(p) => p.endsWith('/block.json') && !p.startsWith(deprecatedDir)
);

/** @type {Map<string,string[]>} */
const map = new Map();

for (const fp of blockJsonFiles) {
	const j = readJson(fp);
	if (!j?.name) continue;
	const arr = map.get(j.name) ?? [];
	arr.push(fp);
	map.set(j.name, arr);
}

const dupes = [...map.entries()].filter(([, v]) => v.length > 1);
if (!dupes.length) {
	console.log('No duplicate block names found (excluding deprecated).');
	process.exit(0);
}

console.log(`Found ${dupes.length} duplicate block name(s):`);
for (const [name, paths] of dupes) {
	console.log(`- ${name} (${paths.length})`);
	for (const p of paths) console.log(`  - ${path.relative(repoRoot, p)}`);
}

