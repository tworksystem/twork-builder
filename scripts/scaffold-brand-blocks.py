#!/usr/bin/env python3
"""Scaffold Shweghee brand page blocks into src/."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"

INDEX_JS = """import {{ registerBlockType }} from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
{view_import}
registerBlockType( metadata.name, {{
	edit: Edit,
	save,{view_prop}
}} );
"""

CHILD_INDEX_JS = """import {{ registerBlockType }} from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {{
	edit: Edit,
	save,
}} );
"""

PARENT_EDIT = """import {{ __ }} from '@wordpress/i18n';
import {{ useStableBlockProps }} from '@twork-builder/editor-utils';
import {{
	InnerBlocks,
	InspectorControls,
	useInnerBlocksProps,
}} from '@wordpress/block-editor';
import {{ PanelBody, TextControl }} from '@wordpress/components';

const ALLOWED_BLOCKS = [ '{child_block}' ];
const TEMPLATE = {template};

export default function Edit( {{ attributes, setAttributes }} ) {{
	const {{ eyebrow, title, ctaLabel, ctaHref }} = attributes;
	const blockProps = useStableBlockProps( {{ className: '{editor_class}' }} );
	const innerBlocksProps = useInnerBlocksProps(
		{{ className: '{inner_class}' }},
		{{ allowedBlocks: ALLOWED_BLOCKS, template: TEMPLATE, templateLock: false }}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={{ __( 'Section', 'twork-builder' ) }}>
					<TextControl
						label={{ __( 'Eyebrow', 'twork-builder' ) }}
						value={{ eyebrow }}
						onChange={{ ( v ) => setAttributes( {{ eyebrow: v }} ) }}
					/>
					<TextControl
						label={{ __( 'Title', 'twork-builder' ) }}
						value={{ title }}
						onChange={{ ( v ) => setAttributes( {{ title: v }} ) }}
					/>
					{cta_controls}
				</PanelBody>
			</InspectorControls>
			<div {{ ...blockProps }}>
				<div className="l-section">
					<header className="section-head">
						{{ eyebrow && (
							<p className="section-head__eyebrow">{{ eyebrow }}</p>
						) }}
						{{ title && (
							<h2 className="section-head__title">{{ title }}</h2>
						) }}
					</header>
					<div {{ ...innerBlocksProps }} />
					{cta_editor}
				</div>
			</div>
		</>
	);
}}
"""

PARENT_SAVE = """import {{ useBlockProps, InnerBlocks, RichText }} from '@wordpress/block-editor';

export default function save( {{ attributes }} ) {{
	const {{ eyebrow, title, ctaLabel, ctaHref{extra_attrs} }} = attributes;
	const blockProps = useBlockProps.save( {{
		className: '{save_class}',
		'data-block': '{data_block}',
		'data-version': '1',
	}} );

	return (
		<section {{ ...blockProps }}{extra_section_attrs}>
			<div className="l-section">
				{{ eyebrow && (
					<header className="section-head">
						<p className="section-head__eyebrow">{{ eyebrow }}</p>
						{{ title && (
							<h2 className="section-head__title">{{ title }}</h2>
						) }}
					</header>
				) }}
				{{ ! eyebrow && title && (
					<header className="section-head">
						<h2 className="section-head__title">{{ title }}</h2>
					</header>
				) }}
				{extra_save_markup}
				<div className="{inner_class}" data-list="items">
					<InnerBlocks.Content />
				</div>
				{cta_save}
			</div>
		</section>
	);
}}
"""

CHILD_EDIT_RICHTEXT = """import {{ __ }} from '@wordpress/i18n';
import {{ useStableBlockProps }} from '@twork-builder/editor-utils';
import {{ RichText, InspectorControls, MediaUpload, MediaUploadCheck }} from '@wordpress/block-editor';
import {{ PanelBody, Button, TextControl }} from '@wordpress/components';

export default function Edit( {{ attributes, setAttributes }} ) {{
	const blockProps = useStableBlockProps( {{ className: '{child_class}' }} );
{fields_edit}
	return (
		<>
			<InspectorControls>
				<PanelBody title={{ __( 'Item', 'twork-builder' ) }}>
{inspector_fields}
				</PanelBody>
			</InspectorControls>
			<div {{ ...blockProps }} data-item-id="{{ itemId || '{default_id}' }}">
{fields_markup}
			</div>
		</>
	);
}}
"""

CHILD_SAVE_RICHTEXT = """import {{ useBlockProps, RichText }} from '@wordpress/block-editor';

export default function save( {{ attributes }} ) {{
	const {{ itemId{save_destructure} }} = attributes;
	const blockProps = useBlockProps.save( {{
		className: '{child_class}',
		'data-item-id': itemId,
	}} );

	return (
		<div {{ ...blockProps }}>
{save_markup}
		</div>
	);
}}
"""

STYLE_SCSS = """@import '../shared/brand-tokens.scss';

{component_css}
"""


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def read_css(component: str) -> str:
    css_path = ROOT / "shweghee" / "src" / "components" / component / f"{component}.css"
    if css_path.exists():
        return css_path.read_text(encoding="utf-8")
    return ""


def make_block_json(data: dict) -> str:
    base = {
        "$schema": "https://schemas.wp.org/trunk/block.json",
        "apiVersion": 3,
        "category": "twork-builder",
        "textdomain": "twork-builder",
        **data,
    }
    return json.dumps(base, indent="\t") + "\n"


def scaffold_child(slug: str, meta: dict) -> None:
    folder = SRC / slug
    fields = meta["fields"]
    destructure = ", ".join(f["attr"] for f in fields)
    save_destructure = (", " + destructure) if destructure else ""

    inspector = []
    fields_edit = []
    fields_markup = []
    save_markup = []

    for f in fields:
        attr = f["attr"]
        if f.get("type") == "image":
            fields_edit.append(
                f"\tconst {{ {attr} }} = attributes;"
            )
            inspector.append(
                f"""\t\t\t\t<MediaUploadCheck>
\t\t\t\t\t<MediaUpload
\t\t\t\t\t\tonSelect={{ ( media ) => setAttributes( {{ {attr}: media.url }} ) }}
\t\t\t\t\t\tallowedTypes={{ [ 'image' ] }}
\t\t\t\t\t\trender={{ ( {{ open }} ) => (
\t\t\t\t\t\t\t<Button onClick={{ open }} variant="secondary">
\t\t\t\t\t\t\t\t{{ {attr} ? __( 'Change image', 'twork-builder' ) : __( 'Select image', 'twork-builder' ) }}
\t\t\t\t\t\t\t</Button>
\t\t\t\t\t\t) }}
\t\t\t\t\t/>
\t\t\t\t</MediaUploadCheck>"""
            )
            fields_markup.append(
                f"\t\t\t{{ {attr} && <img src={{ {attr} }} alt=\"\" /> }}"
            )
            save_markup.append(
                f"\t\t\t{{ {attr} && <img src={{ {attr} }} alt=\"\" /> }}"
            )
        elif f.get("rich"):
            fields_edit.append(f"\tconst {{ {attr} }} = attributes;")
            inspector.append(
                f"""\t\t\t\t<TextControl
\t\t\t\t\tlabel={{ __( '{f["label"]}', 'twork-builder' ) }}
\t\t\t\t\tvalue={{ {attr} }}
\t\t\t\t\tonChange={{ ( v ) => setAttributes( {{ {attr}: v }} ) }}
\t\t\t\t/>"""
            )
            tag = f.get("tag", "p")
            cls = f.get("class", "")
            class_attr = f' className="{cls}"' if cls else ""
            fields_markup.append(
                f"\t\t\t<RichText tagName=\"{tag}\"{class_attr} value={{ {attr} }} onChange={{ ( v ) => setAttributes( {{ {attr}: v }} ) }} placeholder={{ __( '{f["label"]}', 'twork-builder' ) }} />"
            )
            save_markup.append(
                f"\t\t\t<RichText.Content tagName=\"{tag}\"{class_attr} value={{ {attr} }} />"
            )
        else:
            fields_edit.append(f"\tconst {{ {attr} }} = attributes;")
            inspector.append(
                f"""\t\t\t\t<TextControl
\t\t\t\t\tlabel={{ __( '{f["label"]}', 'twork-builder' ) }}
\t\t\t\t\tvalue={{ {attr} }}
\t\t\t\t\tonChange={{ ( v ) => setAttributes( {{ {attr}: v }} ) }}
\t\t\t\t/>"""
            )

    attrs = {"itemId": {"type": "string", "default": meta.get("default_id", "item_1")}}
    for f in fields:
        attrs[f["attr"]] = {"type": "string", "default": f.get("default", "")}

    block_json = make_block_json(
        {
            "name": meta["name"],
            "title": meta["title"],
            "parent": meta["parents"],
            "description": meta.get("description", ""),
            "keywords": meta.get("keywords", ["brand", "shweghee"]),
            "attributes": attrs,
            "supports": {"html": False},
            "editorScript": "file:./index.js",
        }
    )

    write(folder / "block.json", block_json)
    write(folder / "index.js", CHILD_INDEX_JS)
    write(
        folder / "edit.js",
        CHILD_EDIT_RICHTEXT.format(
            child_class=meta.get("child_class", slug.replace("-", "__")),
            default_id=meta.get("default_id", "item_1"),
            fields_edit="\n".join(dict.fromkeys(fields_edit)),
            inspector_fields="\n".join(inspector),
            fields_markup="\n".join(fields_markup) or "\t\t\t<p>Item</p>",
        ),
    )
    write(
        folder / "save.js",
        CHILD_SAVE_RICHTEXT.format(
            child_class=meta.get("child_class", slug.replace("-", "__")),
            save_destructure=save_destructure,
            save_markup="\n".join(save_markup) or "\t\t\t<p>Item</p>",
        ),
    )


def scaffold_parent(slug: str, meta: dict) -> None:
    folder = SRC / slug
    child = meta["child"]
    child_name = f"twork/{child}"

    attrs = {
        "eyebrow": {"type": "string", "default": meta.get("eyebrow", "")},
        "title": {"type": "string", "default": meta.get("title", "")},
    }
    for k, v in meta.get("extra_attrs", {}).items():
        attrs[k] = v

    block_data = {
        "name": meta["name"],
        "title": meta["title"],
        "description": meta.get("description", ""),
        "keywords": meta.get("keywords", ["brand", "shweghee"]),
        "attributes": attrs,
        "supports": {"html": False, "align": ["wide", "full"]},
        "editorScript": "file:./index.js",
        "style": "file:./style-index.css",
    }
    if meta.get("viewScript"):
        block_data["viewScript"] = "file:./view.js"

    write(folder / "block.json", make_block_json(block_data))

    view_import = "import './view.js';\n" if meta.get("viewScript") else ""
    view_prop = "\n\tview: undefined," if False else ""
    # viewScript in block.json handles frontend; no view in registerBlockType

    write(
        folder / "index.js",
        INDEX_JS.format(view_import=view_import, view_prop=""),
    )

    cta_controls = ""
    cta_editor = ""
    cta_save = ""
    if meta.get("has_cta"):
        cta_controls = """
					<TextControl
						label={ __( 'CTA Label', 'twork-builder' ) }
						value={ ctaLabel }
						onChange={ ( v ) => setAttributes( { ctaLabel: v } ) }
					/>
					<TextControl
						label={ __( 'CTA URL', 'twork-builder' ) }
						value={ ctaHref }
						onChange={ ( v ) => setAttributes( { ctaHref: v } ) }
					/>"""
        cta_editor = """
					{ ctaLabel && (
						<p className="section-cta">
							<a href={ ctaHref || '#' }>{ ctaLabel }</a>
						</p>
					) }"""
        cta_save = """
				{ ctaLabel && (
					<p className="section-cta">
						<a className="btn btn--primary" href={ ctaHref || '#' }>{ ctaLabel }</a>
					</p>
				) }"""
        attrs["ctaLabel"] = {"type": "string", "default": meta.get("ctaLabel", "")}
        attrs["ctaHref"] = {"type": "string", "default": meta.get("ctaHref", "#")}

    write(
        folder / "edit.js",
        PARENT_EDIT.format(
            child_block=child_name,
            template=json.dumps(meta.get("template", []), indent="\t"),
            editor_class=meta.get("editor_class", slug),
            inner_class=meta.get("inner_class", f"{slug}__grid"),
            cta_controls=cta_controls,
            cta_editor=cta_editor,
        ),
    )

    extra_attrs = ""
    extra_section_attrs = ""
    extra_save_markup = ""
    if meta.get("carousel"):
        extra_section_attrs = '\n\t\t\tdata-brand-carousel="1"\n\t\t\tdata-autoplay-ms="{0}"'.format(
            meta.get("autoplayMs", 6000)
        )
        extra_save_markup = """
				<div className="carousel-shell" data-brand-carousel="1" data-autoplay-ms="{autoplay}">""".format(
            autoplay=meta.get("autoplayMs", 6000)
        )
        # We'll close carousel-shell in inner - actually simplify save

    save_content = PARENT_SAVE.format(
        save_class=meta.get("save_class", slug),
        data_block=meta["name"],
        inner_class=meta.get("inner_class", f"{slug}__grid"),
        extra_attrs=", ctaLabel, ctaHref" if meta.get("has_cta") else "",
        extra_section_attrs=extra_section_attrs.replace("\n\t\t\t", "\n\t\t") if extra_section_attrs else "",
        extra_save_markup=extra_save_markup,
        cta_save=cta_save,
    )
    write(folder / "save.js", save_content)

    css = read_css(meta.get("css_component", slug.replace("-section", "").replace("-grid", "")))
    write(folder / "style.scss", STYLE_SCSS.format(component_css=css))


# --- Child block definitions ---
CHILDREN = [
    {
        "slug": "brand-nav-item",
        "name": "twork/brand-nav-item",
        "title": "Brand Nav Item",
        "parents": ["twork/brand-header"],
        "child_class": "header__nav-link",
        "default_id": "home",
        "fields": [
            {"attr": "label", "label": "Label", "rich": True, "tag": "span", "default": "Home"},
            {"attr": "href", "label": "URL", "default": "/"},
        ],
    },
    {
        "slug": "hero-banner-slide",
        "name": "twork/hero-banner-slide",
        "title": "Hero Banner Slide",
        "parents": ["twork/hero-banner-carousel"],
        "child_class": "hero__slide",
        "default_id": "slide_1",
        "fields": [
            {"attr": "eyebrow", "label": "Eyebrow", "rich": True, "tag": "p", "class": "hero__eyebrow", "default": "SHWE MYANMAR"},
            {"attr": "title", "label": "Title", "rich": True, "tag": "h1", "class": "hero__title", "default": "Hero Title"},
            {"attr": "subtitle", "label": "Subtitle", "rich": True, "tag": "p", "class": "hero__subtitle", "default": ""},
            {"attr": "ctaLabel", "label": "CTA Label", "default": "VIEW PRODUCTS"},
            {"attr": "ctaHref", "label": "CTA URL", "default": "#"},
            {"attr": "imageUrl", "label": "Background Image", "type": "image", "default": ""},
        ],
    },
    {
        "slug": "image-card-slide",
        "name": "twork/image-card-slide",
        "title": "Image Card Slide",
        "parents": ["twork/image-card-carousel"],
        "child_class": "services-carousel__card",
        "default_id": "svc_1",
        "fields": [
            {"attr": "title", "label": "Title", "rich": True, "tag": "h3", "default": "Service"},
            {"attr": "ctaLabel", "label": "CTA Label", "default": "Learn more"},
            {"attr": "href", "label": "URL", "default": "#"},
            {"attr": "imageUrl", "label": "Image", "type": "image", "default": ""},
        ],
    },
    {
        "slug": "numbered-feature-item",
        "name": "twork/numbered-feature-item",
        "title": "Numbered Feature Item",
        "parents": ["twork/numbered-features-grid"],
        "child_class": "why-choose-us__item",
        "default_id": "why_1",
        "fields": [
            {"attr": "number", "label": "Number", "default": "01"},
            {"attr": "title", "label": "Title", "rich": True, "tag": "h3", "default": "Feature"},
            {"attr": "text", "label": "Text", "rich": True, "tag": "p", "default": ""},
        ],
    },
    {
        "slug": "category-card",
        "name": "twork/category-card",
        "title": "Category Card",
        "parents": ["twork/category-card-grid"],
        "child_class": "product-categories__card",
        "default_id": "cat_1",
        "fields": [
            {"attr": "title", "label": "Title", "rich": True, "tag": "h3", "default": "Category"},
            {"attr": "count", "label": "Count", "default": ""},
            {"attr": "href", "label": "URL", "default": "#"},
            {"attr": "imageUrl", "label": "Image", "type": "image", "default": ""},
        ],
    },
    {
        "slug": "logo-showcase-item",
        "name": "twork/logo-showcase-item",
        "title": "Logo Showcase Item",
        "parents": ["twork/logo-showcase-section"],
        "child_class": "partners__logo",
        "default_id": "logo_1",
        "fields": [
            {"attr": "name", "label": "Name", "default": "Partner"},
            {"attr": "imageUrl", "label": "Logo", "type": "image", "default": ""},
        ],
    },
    {
        "slug": "news-card",
        "name": "twork/news-card",
        "title": "News Card",
        "parents": ["twork/news-card-grid"],
        "child_class": "blog-news__card",
        "default_id": "post_1",
        "fields": [
            {"attr": "title", "label": "Title", "rich": True, "tag": "h3", "default": "News"},
            {"attr": "excerpt", "label": "Excerpt", "rich": True, "tag": "p", "default": ""},
            {"attr": "date", "label": "Date", "default": ""},
            {"attr": "href", "label": "URL", "default": "#"},
            {"attr": "imageUrl", "label": "Image", "type": "image", "default": ""},
        ],
    },
    {
        "slug": "review-card",
        "name": "twork/review-card",
        "title": "Review Card",
        "parents": ["twork/review-carousel"],
        "child_class": "testimonials__card",
        "default_id": "t_1",
        "fields": [
            {"attr": "text", "label": "Review", "rich": True, "tag": "blockquote", "default": ""},
            {"attr": "name", "label": "Name", "rich": True, "tag": "p", "class": "name", "default": ""},
            {"attr": "location", "label": "Location", "default": ""},
            {"attr": "avatarUrl", "label": "Avatar", "type": "image", "default": ""},
        ],
    },
    {
        "slug": "faq-accordion-item",
        "name": "twork/faq-accordion-item",
        "title": "FAQ Accordion Item",
        "parents": ["twork/faq-accordion-section"],
        "child_class": "faq__item",
        "default_id": "faq_1",
        "fields": [
            {"attr": "question", "label": "Question", "rich": True, "tag": "span", "class": "faq__question", "default": "Question?"},
            {"attr": "answer", "label": "Answer", "rich": True, "tag": "p", "default": ""},
        ],
    },
    {
        "slug": "brand-footer-info-card",
        "name": "twork/brand-footer-info-card",
        "title": "Brand Footer Info Card",
        "parents": ["twork/brand-footer"],
        "child_class": "footer__info-card",
        "default_id": "info_phone",
        "fields": [
            {"attr": "label", "label": "Label", "default": "CUSTOMER HOTLINE"},
            {"attr": "lines", "label": "Lines (comma-separated)", "default": "095-2-55122"},
            {"attr": "icon", "label": "Icon", "default": "phone"},
        ],
    },
    {
        "slug": "brand-footer-column",
        "name": "twork/brand-footer-column",
        "title": "Brand Footer Column",
        "parents": ["twork/brand-footer"],
        "child_class": "footer__column",
        "default_id": "col_help",
        "fields": [
            {"attr": "columnTitle", "label": "Column Title", "rich": True, "tag": "h4", "default": "Help & Info"},
            {"attr": "linksJson", "label": "Links JSON", "default": "[]"},
        ],
    },
]

PARENTS = [
    {
        "slug": "numbered-features-grid",
        "name": "twork/numbered-features-grid",
        "title": "Numbered Features Grid",
        "child": "numbered-feature-item",
        "css_component": "why-choose-us",
        "save_class": "why-choose-us",
        "inner_class": "why-choose-us__grid",
        "eyebrow": "WHY CHOOSE SHWE MYANMAR",
        "title": "Reasons To Choose Us.",
        "template": [
            ["twork/numbered-feature-item", {"itemId": "why_1", "number": "01", "title": "Natural Ingredients", "text": "Carefully selected natural ingredients."}],
            ["twork/numbered-feature-item", {"itemId": "why_2", "number": "02", "title": "Consistent Quality", "text": "Every batch meets strict standards."}],
        ],
    },
    {
        "slug": "category-card-grid",
        "name": "twork/category-card-grid",
        "title": "Category Card Grid",
        "child": "category-card",
        "css_component": "product-categories",
        "save_class": "product-categories",
        "inner_class": "product-categories__grid",
        "eyebrow": "OUR PRODUCT RANGE",
        "title": "Shwe Myanmar Main Products.",
        "has_cta": True,
        "ctaLabel": "See all products",
        "ctaHref": "/shop",
        "template": [
            ["twork/category-card", {"itemId": "cat_butter", "title": "Butter", "count": "3 Sizes"}],
            ["twork/category-card", {"itemId": "cat_ghee", "title": "Ghee", "count": "2 Sizes"}],
        ],
    },
    {
        "slug": "logo-showcase-section",
        "name": "twork/logo-showcase-section",
        "title": "Logo Showcase Section",
        "child": "logo-showcase-item",
        "css_component": "partners",
        "save_class": "partners",
        "inner_class": "partners__logos",
        "eyebrow": "DISTRIBUTION NETWORK",
        "title": "Serving Customers Across Myanmar.",
        "template": [
            ["twork/logo-showcase-item", {"itemId": "logo_1", "name": "Mandalay Region"}],
            ["twork/logo-showcase-item", {"itemId": "logo_2", "name": "Yangon Region"}],
        ],
    },
    {
        "slug": "news-card-grid",
        "name": "twork/news-card-grid",
        "title": "News Card Grid",
        "child": "news-card",
        "css_component": "blog-news",
        "save_class": "blog-news",
        "inner_class": "blog-news__grid",
        "eyebrow": "NEWS & UPDATES",
        "title": "Latest From Shwe Myanmar.",
        "template": [
            ["twork/news-card", {"itemId": "post_1", "title": "Introducing Our 10 Viss Bulk Pack"}],
        ],
    },
    {
        "slug": "image-card-carousel",
        "name": "twork/image-card-carousel",
        "title": "Image Card Carousel",
        "child": "image-card-slide",
        "css_component": "services-carousel",
        "save_class": "services-carousel",
        "inner_class": "services-carousel__track",
        "eyebrow": "WHAT SHWE MYANMAR DOES",
        "title": "Our Core Services.",
        "viewScript": True,
        "carousel": True,
        "template": [
            ["twork/image-card-slide", {"itemId": "svc_1", "title": "Butter & Ghee Production"}],
            ["twork/image-card-slide", {"itemId": "svc_2", "title": "Quality Control"}],
        ],
    },
    {
        "slug": "review-carousel",
        "name": "twork/review-carousel",
        "title": "Review Carousel",
        "child": "review-card",
        "css_component": "testimonials",
        "save_class": "testimonials",
        "inner_class": "testimonials__track",
        "eyebrow": "CUSTOMER REVIEWS",
        "title": "What Our Customers Say.",
        "viewScript": True,
        "carousel": True,
        "template": [
            ["twork/review-card", {"itemId": "t_1", "name": "Daw Khin M.", "location": "Mandalay"}],
        ],
    },
    {
        "slug": "faq-accordion-section",
        "name": "twork/faq-accordion-section",
        "title": "FAQ Accordion Section",
        "child": "faq-accordion-item",
        "css_component": "faq",
        "save_class": "faq faq-accordion-section",
        "inner_class": "faq__list",
        "eyebrow": "USEFUL INFORMATION",
        "title": "Frequently Asked Questions",
        "viewScript": True,
        "extra_attrs": {
            "contactText": {"type": "string", "default": "Still have more questions?"},
            "contactLinkLabel": {"type": "string", "default": "Contact us"},
            "contactHref": {"type": "string", "default": "/contact"},
        },
        "template": [
            ["twork/faq-accordion-item", {"itemId": "faq_1", "question": "What products does Shwe Myanmar make?", "answer": "Premium butter and ghee."}],
        ],
    },
]


def main() -> None:
    for child in CHILDREN:
        scaffold_child(child["slug"], child)
        print(f"  child: {child['slug']}")

    for parent in PARENTS:
        scaffold_parent(parent["slug"], parent)
        print(f"  parent: {parent['slug']}")

    print("Scaffold complete (shell + grid/carousel parents). Manual blocks: brand-header, hero-banner-carousel, brand-footer, split-promo-section, subscribe-bar")


if __name__ == "__main__":
    main()
