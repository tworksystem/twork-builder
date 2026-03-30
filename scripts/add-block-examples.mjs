/**
 * One-off / maintenance: add block.json "example" from attribute defaults + edit.js TEMPLATE.
 * Run: node scripts/add-block-examples.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');

const PLACEHOLDER_IMAGE =
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80';

function walk(dir) {
    const out = [];
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) out.push(...walk(p));
        else if (ent.name === 'block.json') out.push(p);
    }
    return out;
}

function extractBracketArray(str, openIdx) {
    let depth = 0;
    let inStr = false;
    let strChar = null;
    let escape = false;
    for (let i = openIdx; i < str.length; i++) {
        const c = str[i];
        if (escape) {
            escape = false;
            continue;
        }
        if (c === '\\' && inStr) {
            escape = true;
            continue;
        }
        if (!inStr && (c === '"' || c === "'" || c === '`')) {
            inStr = true;
            strChar = c;
            continue;
        }
        if (inStr && c === strChar) {
            inStr = false;
            strChar = null;
            continue;
        }
        if (inStr) continue;
        if (c === '[') depth++;
        if (c === ']') {
            depth--;
            if (depth === 0) return str.slice(openIdx, i + 1);
        }
    }
    return null;
}

function stripGettextCalls(s) {
    let out = s;
    out = out.replace(/__\(\s*'((?:\\'|[^'])*)'\s*,\s*'[^']*'\s*\)/g, (_, inner) => JSON.stringify(inner.replace(/\\'/g, "'")));
    out = out.replace(/__\(\s*"((?:\\"|[^"])*)"\s*,\s*"[^"]*"\s*\)/g, (_, inner) => JSON.stringify(inner.replace(/\\"/g, '"')));
    return out;
}

function evalArrayLiteral(literal) {
    const cleaned = stripGettextCalls(literal);
    try {
        return new Function(`"use strict"; return (${cleaned});`)();
    } catch {
        return null;
    }
}

function extractConstArray(source, varName) {
    const re = new RegExp(`const\\s+${varName}\\s*=\\s*\\[`, 'm');
    const m = re.exec(source);
    if (!m) return null;
    const openIdx = m.index + m[0].length - 1;
    return extractBracketArray(source, openIdx);
}

function collectTemplateLiteralsFromInnerBlocks(source) {
    const literals = [];
    let pos = 0;
    while (pos < source.length) {
        const ib = source.indexOf('<InnerBlocks', pos);
        if (ib === -1) break;
        const tagEnd = source.indexOf('>', ib);
        const tmpl = source.indexOf('template={', ib);
        if (tmpl === -1 || tmpl > tagEnd) {
            pos = ib + 12;
            continue;
        }
        const after = tmpl + 'template={'.length;
        const next = source[after];
        if (next === '[') {
            const lit = extractBracketArray(source, after);
            if (lit) literals.push(lit);
        } else {
            const id = source.slice(after).match(/^([A-Za-z_]\w*)/);
            if (id) {
                const lit = extractConstArray(source, id[1]);
                if (lit) literals.push(lit);
            }
        }
        pos = tmpl + 10;
    }
    return literals;
}

function extractPrimaryTemplateLiteral(source) {
    const m = source.match(/const\s+TEMPLATE\s*=\s*\[/);
    if (m) {
        const openIdx = m.index + m[0].length - 1;
        const lit = extractBracketArray(source, openIdx);
        if (lit) return lit;
    }
    const literals = collectTemplateLiteralsFromInnerBlocks(source);
    if (!literals.length) return null;
    let best = literals[0];
    let bestScore = scoreTemplateLiteral(best);
    for (let i = 1; i < literals.length; i++) {
        const sc = scoreTemplateLiteral(literals[i]);
        if (sc > bestScore) {
            best = literals[i];
            bestScore = sc;
        }
    }
    return best;
}

function scoreTemplateLiteral(lit) {
    const ev = evalArrayLiteral(lit);
    if (!Array.isArray(ev)) return 0;
    return ev.length;
}

function convertTemplateItem(item) {
    if (!Array.isArray(item) || item.length === 0) return null;
    const name = item[0];
    if (typeof name !== 'string') return null;
    let attrs = {};
    let i = 1;
    if (
        i < item.length &&
        item[i] !== null &&
        typeof item[i] === 'object' &&
        !Array.isArray(item[i])
    ) {
        attrs = JSON.parse(JSON.stringify(item[i]));
        i++;
    }
    const out = { name, attributes: attrs };
    if (i < item.length && Array.isArray(item[i])) {
        const innerBlocks = item[i].map(convertTemplateItem).filter(Boolean);
        if (innerBlocks.length) out.innerBlocks = innerBlocks;
    }
    return out;
}

function templateArrayToInnerBlocks(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.map(convertTemplateItem).filter(Boolean);
}

function defaultsFromSchema(attributesSchema) {
    const out = {};
    for (const [key, schema] of Object.entries(attributesSchema || {})) {
        if (!schema || typeof schema !== 'object') continue;
        if (!Object.prototype.hasOwnProperty.call(schema, 'default')) continue;
        const d = schema.default;
        if (d === undefined) continue;
        out[key] = JSON.parse(JSON.stringify(d));
    }
    return out;
}

function enrichEmptyImageLikeFields(attrs) {
    const skip = /formAction|formMethod|embed|mapEmbed|action|Method|orderBy|orderby|Url$/i;
    for (const key of Object.keys(attrs)) {
        const val = attrs[key];
        if (val !== '') continue;
        if (skip.test(key)) continue;
        const looksImage =
            /^(image|mainImage|subImage|heroImage|backgroundImage|featuredImage|thumbnail|photo|banner|avatar|graphic|logo|icon|badge|wheat|tractor|author|doctor)/i.test(
                key
            ) || /(Image|Photo|Banner|Thumbnail|Avatar|Url|url|URI)$/i.test(key);
        if (looksImage) attrs[key] = PLACEHOLDER_IMAGE;
    }
}

function shouldViewportWidth(meta) {
    const t = (meta.title || '').toLowerCase();
    const align = meta.supports?.align;
    if (Array.isArray(align) && (align.includes('full') || align.includes('wide'))) return true;
    if (t.includes('section') || t.includes('grid') || t.includes('layout') || t.includes('hero'))
        return true;
    return false;
}

function mergeExample(meta, editPath) {
    const attributes = defaultsFromSchema(meta.attributes);
    enrichEmptyImageLikeFields(attributes);

    let innerBlocks = [];
    if (editPath && fs.existsSync(editPath)) {
        const src = fs.readFileSync(editPath, 'utf8');
        if (/\bInnerBlocks\b/.test(src)) {
            const lit = extractPrimaryTemplateLiteral(src);
            if (lit) {
                const arr = evalArrayLiteral(lit);
                innerBlocks = templateArrayToInnerBlocks(arr);
            }
        }
    }

    const example = {};
    if (shouldViewportWidth(meta)) example.viewportWidth = 1200;
    if (Object.keys(attributes).length) example.attributes = attributes;
    if (innerBlocks.length) example.innerBlocks = innerBlocks;

    if (!example.attributes && !example.innerBlocks && !example.viewportWidth) {
        example.attributes = {};
    }
    return example;
}

function buildMetaWithExample(meta, example) {
    const out = {};
    let inserted = false;
    for (const k of Object.keys(meta)) {
        if (k === 'textdomain') {
            out.example = example;
            inserted = true;
        }
        out[k] = meta[k];
    }
    if (!inserted) {
        out.example = example;
    }
    return out;
}

function main() {
    const files = walk(SRC);
    let updated = 0;
    let skipped = 0;
    const errors = [];

    for (const jsonPath of files) {
        const text = fs.readFileSync(jsonPath, 'utf8');
        if (/"example"\s*:/.test(text)) {
            skipped++;
            continue;
        }
        let meta;
        try {
            meta = JSON.parse(text);
        } catch (e) {
            errors.push(`${jsonPath}: ${e.message}`);
            continue;
        }
        const dir = path.dirname(jsonPath);
        const editPath = path.join(dir, 'edit.js');
        const example = mergeExample(meta, editPath);

        let out;
        try {
            out = buildMetaWithExample(meta, example);
            JSON.parse(JSON.stringify(out));
        } catch (e) {
            errors.push(`${jsonPath}: example not serializable: ${e.message}`);
            continue;
        }

        fs.writeFileSync(jsonPath, JSON.stringify(out, null, 4) + '\n', 'utf8');
        updated++;
    }

    console.log(`Updated: ${updated}, skipped (had example): ${skipped}`);
    if (errors.length) {
        console.error('Errors:');
        errors.forEach((e) => console.error(e));
        process.exitCode = 1;
    }
}

main();
