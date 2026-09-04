#!/usr/bin/env python3
"""Scaffold Shweghee Phase 2B shop blocks."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
COMPONENTS = ROOT / "shweghee" / "src" / "components"


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def read_css(name: str) -> str:
    p = COMPONENTS / name / f"{name}.css"
    return p.read_text(encoding="utf-8") if p.exists() else ""


def style(name: str, extra_import: str = "@import '../shared/shop-tokens.scss';\n") -> str:
    return f"@import '../shared/brand-tokens.scss';\n{extra_import}\n{read_css(name)}\n"


def bj(meta: dict) -> str:
    return json.dumps(
        {"$schema": "https://schemas.wp.org/trunk/block.json", "apiVersion": 3, "category": "twork-builder", "textdomain": "twork-builder", **meta},
        indent="\t",
        ensure_ascii=False,
    ) + "\n"


DYNAMIC_INDEX = """import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import metadata from './block.json';
import './style.scss';

registerBlockType( metadata.name, { ...metadata, edit: Edit, save: () => null } );
"""

STATIC_INDEX = """import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, { edit: Edit, save } );
"""

STATIC_INDEX_VIEW = STATIC_INDEX.replace(
    "import metadata from './block.json';",
    "import metadata from './block.json';\nimport './view.js';",
)


def scaffold_static(slug: str, name: str, title: str, css: str, attrs: dict, edit: str, save: str, view: bool = False) -> None:
    d = SRC / slug
    meta = {
        "name": name,
        "title": title,
        "keywords": ["shop", "shweghee", "woocommerce"],
        "attributes": attrs,
        "supports": {"html": False, "align": ["wide", "full"]},
        "editorScript": "file:./index.js",
        "style": "file:./style-index.css",
    }
    if view:
        meta["viewScript"] = "file:./view.js"
    write(d / "block.json", bj(meta))
    write(d / "index.js", STATIC_INDEX_VIEW if view else STATIC_INDEX)
    write(d / "edit.js", edit)
    write(d / "save.js", save)
    write(d / "style.scss", style(css))


def scaffold_dynamic(slug: str, name: str, title: str, css: str, attrs: dict, edit: str) -> None:
    d = SRC / slug
    write(
        d / "block.json",
        bj(
            {
                "name": name,
                "title": title,
                "keywords": ["shop", "woocommerce", "shweghee"],
                "attributes": attrs,
                "supports": {"html": False, "align": ["wide", "full"]},
                "editorScript": "file:./index.js",
                "style": "file:./style-index.css",
            }
        ),
    )
    write(d / "index.js", DYNAMIC_INDEX)
    write(d / "edit.js", edit)
    write(d / "style.scss", style(css))


CAROUSEL_EDIT = """import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
\tconst { sectionTitle, numberOfItems } = attributes;
\tconst blockProps = useStableBlockProps( { className: '%CLASS%' } );
\treturn (
\t\t<>
\t\t\t<InspectorControls>
\t\t\t\t<PanelBody title={ __( 'Products', 'twork-builder' ) }>
\t\t\t\t\t<TextControl label={ __( 'Title', 'twork-builder' ) } value={ sectionTitle } onChange={ ( v ) => setAttributes( { sectionTitle: v } ) } />
\t\t\t\t\t<RangeControl label={ __( 'Items', 'twork-builder' ) } value={ numberOfItems } onChange={ ( v ) => setAttributes( { numberOfItems: v } ) } min={ 1 } max={ 12 } />
\t\t\t\t</PanelBody>
\t\t\t</InspectorControls>
\t\t\t<section { ...blockProps }>
\t\t\t\t<div className="l-section"><h2>{ sectionTitle }</h2><p>{ __( 'WooCommerce products render on frontend.', 'twork-builder' ) }</p></div>
\t\t\t</section>
\t\t</>
\t);
}
"""

PRODUCT_ATTRS = {
    "sectionTitle": {"type": "string", "default": "Products"},
    "numberOfItems": {"type": "number", "default": 4},
    "source": {"type": "string", "default": "on_sale"},
}


def main() -> None:
    # back-to-top
    scaffold_static(
        "back-to-top",
        "twork/back-to-top",
        "Back To Top",
        "back-to-top",
        {},
        """import { useStableBlockProps } from '@twork-builder/editor-utils';
export default function Edit() {
\tconst blockProps = useStableBlockProps( { className: 'back-to-top back-to-top--editor' } );
\treturn <div { ...blockProps } aria-hidden="true">↑</div>;
}
""",
        """import { useBlockProps } from '@wordpress/block-editor';
export default function save() {
\treturn null;
}
""",
        view=True,
    )
    write(
        SRC / "back-to-top" / "view.js",
        """(function(){'use strict';
function init(){var btn=document.querySelector('[data-block="twork/back-to-top"]');if(!btn){btn=document.createElement('button');btn.type='button';btn.className='back-to-top';btn.dataset.block='twork/back-to-top';btn.setAttribute('aria-label','Back to top');btn.textContent='↑';document.body.appendChild(btn);}
var rm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function onScroll(){btn.classList.toggle('is-visible',window.scrollY>400);}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
btn.addEventListener('click',function(){window.scrollTo({top:0,behavior:rm?'auto':'smooth'});});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();})();
""",
    )
    write(SRC / "back-to-top" / "style.scss", "@import '../shared/brand-tokens.scss';\n.back-to-top{position:fixed;right:1.5rem;bottom:1.5rem;width:44px;height:44px;border-radius:50%;border:0;background:var(--shop-color-accent,#ff7f00);color:#fff;font-size:1.25rem;cursor:pointer;opacity:0;visibility:hidden;transition:opacity .2s;z-index:200;}.back-to-top.is-visible{opacity:1;visibility:visible;}\n")

    # shop-toolbar
    scaffold_static(
        "shop-toolbar",
        "twork/shop-toolbar",
        "Shop Toolbar",
        "shop-toolbar",
        {
            "resultsText": {"type": "string", "default": "Showing all products"},
            "defaultSort": {"type": "string", "default": "default"},
            "defaultPerPage": {"type": "number", "default": 12},
            "defaultLayout": {"type": "string", "default": "grid-4"},
        },
        """import { useStableBlockProps } from '@twork-builder/editor-utils';
export default function Edit({ attributes }) {
\tconst { resultsText } = attributes;
\tconst blockProps = useStableBlockProps({ className: 'shop-toolbar' });
\treturn <div { ...blockProps } data-block="twork/shop-toolbar"><p>{ resultsText }</p></div>;
}
""",
        """import { useBlockProps } from '@wordpress/block-editor';
export default function save({ attributes }) {
\tconst { resultsText, defaultSort, defaultPerPage, defaultLayout } = attributes;
\treturn (
\t\t<div { ...useBlockProps.save({ className: 'shop-toolbar', 'data-block': 'twork/shop-toolbar', 'data-version': '1', 'data-default-sort': defaultSort, 'data-default-per-page': defaultPerPage, 'data-default-layout': defaultLayout }) }>
\t\t\t<p className="shop-toolbar__results" data-field="results">{ resultsText }</p>
\t\t\t<div className="shop-toolbar__controls" data-list="controls">
\t\t\t\t<label><span>Sort</span><select data-action="toolbar-sort" defaultValue={ defaultSort }><option value="default">Default</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="latest">Latest</option></select></label>
\t\t\t\t<label><span>Show</span><select data-action="toolbar-per-page" defaultValue={ String(defaultPerPage) }><option value="12">12</option><option value="24">24</option><option value="48">48</option></select></label>
\t\t\t\t<div className="shop-toolbar__layout" role="group" aria-label="Layout"><button type="button" data-action="toolbar-layout" data-layout="grid-4" aria-pressed="true">Grid</button><button type="button" data-action="toolbar-layout" data-layout="list" aria-pressed="false">List</button></div>
\t\t\t</div>
\t\t</div>
\t);
}
""",
        view=True,
    )
    write(SRC / "shop-toolbar" / "view.js", "import '../shared/shop-toolbar-grid.js';\n")

    # dynamic carousels + grid + detail
    for slug, title, css, source_default in [
        ("daily-offers-carousel", "Daily Offers Carousel", "daily-offers", "on_sale"),
        ("best-sellers-carousel", "Best Sellers Carousel", "best-sellers", "best_selling"),
        ("featured-categories-carousel", "Featured Categories Carousel", "featured-categories", "categories"),
    ]:
        attrs = dict(PRODUCT_ATTRS)
        attrs["source"] = {"type": "string", "default": source_default}
        if slug == "featured-categories-carousel":
            attrs = {"sectionTitle": {"type": "string", "default": "Featured Categories"}, "numberOfItems": {"type": "number", "default": 6}}
        scaffold_dynamic(
            slug,
            f"twork/{slug}",
            title,
            css,
            attrs,
            CAROUSEL_EDIT.replace("%CLASS%", css),
        )

    scaffold_dynamic(
        "product-grid-section",
        "twork/product-grid-section",
        "Product Grid Section",
        "product-grid",
        {"columns": {"type": "number", "default": 4}, "perPage": {"type": "number", "default": 12}},
        """import { useStableBlockProps } from '@twork-builder/editor-utils';
export default function Edit() {
\treturn <div { ...useStableBlockProps({ className: 'product-grid' }) }><p>WooCommerce product grid renders on frontend.</p></div>;
}
""",
    )

    scaffold_dynamic(
        "product-detail-section",
        "twork/product-detail-section",
        "Product Detail Section",
        "product-detail",
        {"productId": {"type": "number", "default": 0}},
        """import { useStableBlockProps } from '@twork-builder/editor-utils';
export default function Edit() {
\treturn <div { ...useStableBlockProps({ className: 'product-detail' }) }><p>Single product detail (current product on single-product template).</p></div>;
}
""",
    )

    print("Shop blocks scaffolded (static: back-to-top, shop-toolbar; dynamic: 5)")


if __name__ == "__main__":
    main()
