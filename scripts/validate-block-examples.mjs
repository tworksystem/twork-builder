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

function isBlockJson(p) {
	return p.endsWith('/block.json') || path.basename(p) === 'block.json';
}

function blockNameToPathMap() {
	/** @type {Map<string,string>} */
	const m = new Map();
	const files = walk(srcDir).filter((p) => isBlockJson(p) && !p.startsWith(deprecatedDir));
	for (const fp of files) {
		const j = readJson(fp);
		if (j?.name) m.set(j.name, fp);
	}
	return m;
}

function validateExampleForBlock(blockJson, blockPath, blockNameToPath) {
	const attrs = blockJson.attributes ?? {};
	const attrKeys = new Set(Object.keys(attrs));
	const errors = [];

	function validateExampleInner(inner, parentBlockName) {
		if (!inner || typeof inner !== 'object') return;
		const innerName = inner.name;
		if (typeof innerName !== 'string') return;

		if (!blockNameToPath.has(innerName)) {
			errors.push(
				`${parentBlockName}: example.innerBlocks contains unknown block name "${innerName}" (${blockPath})`
			);
		}

		const innerPath = blockNameToPath.get(innerName);
		if (!innerPath) return;

		const innerJson = readJson(innerPath);
		const innerAttrKeys = new Set(
			Object.keys(innerJson.attributes ?? {})
		);

		if (inner.attributes && typeof inner.attributes === 'object') {
			for (const k of Object.keys(inner.attributes)) {
				if (!innerAttrKeys.has(k)) {
					errors.push(
						`${innerName}: example.attributes contains unknown key "${k}" (referenced from ${parentBlockName}; ${blockPath})`
					);
				}
			}
		}

		if (inner.innerBlocks) {
			for (const child of inner.innerBlocks) {
				validateExampleInner(child, innerName);
			}
		}
	}

	if (!blockJson.example || typeof blockJson.example !== 'object') return errors;

	const ex = blockJson.example;

	// Validate top-level example.attributes keys
	if (ex.attributes && typeof ex.attributes === 'object') {
		for (const k of Object.keys(ex.attributes)) {
			if (!attrKeys.has(k)) {
				errors.push(
					`${blockJson.name}: example.attributes contains unknown key "${k}" (${blockPath})`
				);
			}
		}
	}

	// Validate nested innerBlocks
	if (Array.isArray(ex.innerBlocks)) {
		for (const inner of ex.innerBlocks) {
			validateExampleInner(inner, blockJson.name);
		}
	}

	return errors;
}

function main() {
	const blockNameToPath = blockNameToPathMap();
	const blockJsonFiles = walk(srcDir).filter(
		(p) => isBlockJson(p) && !p.startsWith(deprecatedDir)
	);

	/** @type {string[]} */
	const errors = [];
	for (const fp of blockJsonFiles) {
		const j = readJson(fp);
		if (!j?.name) continue;
		errors.push(
			...validateExampleForBlock(j, fp, blockNameToPath)
		);
	}

	if (errors.length) {
		console.error(`Example validation found ${errors.length} issue(s):`);
		for (const e of errors) console.error(`- ${e}`);
		process.exitCode = 1;
	} else {
		console.log('Example validation: no mismatches found.');
	}
}

main();

