/**
 * Adds `isSelected` to Edit() props and wraps each <InspectorControls>...</InspectorControls>
 * in `{isSelected && ( ... )}` for editor performance when many blocks are on the canvas.
 *
 * Run: node scripts/gate-inspector-is-selected.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, '..', 'src');

function walk(dir) {
    const out = [];
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) out.push(...walk(p));
        else if (ent.name === 'edit.js') out.push(p);
    }
    return out;
}

function hasIsSelectedInSignature(content) {
    const m = content.match(/export\s+default\s+function\s+Edit\s*\(/);
    if (!m) {
        return false;
    }
    const start = m.index + m[0].length;
    let depth = 1;
    let i = start;
    for (; i < content.length && depth > 0; i++) {
        const ch = content[i];
        if (ch === '(') {
            depth++;
        } else if (ch === ')') {
            depth--;
        }
    }
    const props = content.slice(start, i - 1);
    return /\bisSelected\b/.test(props);
}

function addIsSelectedToSignature(content) {
    if (hasIsSelectedInSignature(content)) {
        return content;
    }
    let c = content;
    // Order: more specific patterns first
    c = c.replace(
        /export\s+default\s+function\s+Edit\s*\(\s*\{\s*attributes\s*,\s*setAttributes\s*,\s*clientId\s*\}\s*\)/g,
        'export default function Edit({ attributes, setAttributes, clientId, isSelected })'
    );
    c = c.replace(
        /export\s+default\s+function\s+Edit\s*\(\s*\{\s*attributes\s*=\s*\{\}\s*,\s*setAttributes\s*\}\s*\)/g,
        'export default function Edit({ attributes = {}, setAttributes, isSelected })'
    );
    c = c.replace(
        /export\s+default\s+function\s+Edit\s*\(\s*\{\s*attributes\s*,\s*setAttributes\s*\}\s*\)/g,
        'export default function Edit({ attributes, setAttributes, isSelected })'
    );
    return c;
}

function wrapInspectorBlocks(content) {
    const OPEN = '<InspectorControls>';
    const CLOSE = '</InspectorControls>';
    let out = '';
    let i = 0;

    while (i < content.length) {
        const start = content.indexOf(OPEN, i);
        if (start === -1) {
            out += content.slice(i);
            break;
        }

        const before = content.slice(Math.max(0, start - 120), start);
        if (/\bisSelected\s*&&\s*\(\s*$/s.test(before.trimEnd())) {
            const closeIdx = content.indexOf(CLOSE, start);
            if (closeIdx === -1) {
                out += content.slice(i);
                break;
            }
            const end = closeIdx + CLOSE.length;
            out += content.slice(i, end);
            i = end;
            continue;
        }

        const lineStart = content.lastIndexOf('\n', start) + 1;
        const indent = content.slice(lineStart, start);
        // Slice only through the newline before <InspectorControls>, not its indent (we re-emit indent in the wrapper).
        out += content.slice(i, lineStart);
        const closeIdx = content.indexOf(CLOSE, start);
        if (closeIdx === -1) {
            out += content.slice(start);
            break;
        }
        const end = closeIdx + CLOSE.length;
        const block = content.slice(start, end);

        out += `${indent}{isSelected && (\n${indent}    ${block}\n${indent})}`;
        i = end;
    }

    return out;
}

function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('<InspectorControls>')) {
        return false;
    }

    let next = addIsSelectedToSignature(content);
    if (!hasIsSelectedInSignature(next)) {
        console.warn('Skip (no matching Edit signature):', filePath);
        return false;
    }

    next = wrapInspectorBlocks(next);
    if (next === content) {
        return false;
    }

    fs.writeFileSync(filePath, next, 'utf8');
    return true;
}

function main() {
    const files = walk(SRC);
    let n = 0;
    for (const f of files) {
        try {
            if (processFile(f)) {
                n++;
                console.log('Updated:', path.relative(SRC, f));
            }
        } catch (e) {
            console.error('Error:', f, e.message);
        }
    }
    console.log('Total updated:', n);
}

main();
