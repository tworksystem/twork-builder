#!/usr/bin/env python3
"""Scaffold Shweghee Phase 2A inner page blocks."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
COMPONENTS = ROOT / "shweghee" / "src" / "components"

INDEX = """import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, { edit: Edit, save } );
"""

INDEX_VIEW = INDEX.replace(
    "import metadata from './block.json';",
    "import metadata from './block.json';\nimport './view.js';",
)


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def read_css(component: str) -> str:
    p = COMPONENTS / component / f"{component}.css"
    return p.read_text(encoding="utf-8") if p.exists() else ""


def style_scss(component: str) -> str:
    css = read_css(component)
    extra = ""
    if component == "breadcrumb":
        extra = "\n:root { --shop-color-muted: #666; --shop-color-link: #ff7f00; }\n"
    return f"@import '../shared/brand-tokens.scss';\n{extra}\n{css}\n"


def block_json(meta: dict) -> str:
    data = {
        "$schema": "https://schemas.wp.org/trunk/block.json",
        "apiVersion": 3,
        "category": "twork-builder",
        "textdomain": "twork-builder",
        **meta,
    }
    return json.dumps(data, indent="\t", ensure_ascii=False) + "\n"


BLOCKS = []


def add_block(
    slug: str,
    name: str,
    title: str,
    component: str,
    save_class: str,
    attributes: dict,
    edit_js: str,
    save_js: str,
    view: bool = False,
    description: str = "",
) -> None:
    BLOCKS.append(
        {
            "slug": slug,
            "name": name,
            "title": title,
            "component": component,
            "save_class": save_class,
            "attributes": attributes,
            "edit_js": edit_js,
            "save_js": save_js,
            "view": view,
            "description": description,
        }
    )


# --- breadcrumb-nav ---
add_block(
    "breadcrumb-nav",
    "twork/breadcrumb-nav",
    "Breadcrumb Nav",
    "breadcrumb",
    "breadcrumb",
    {
        "items": {
            "type": "array",
            "default": [
                {"id": "home", "label": "Home", "href": "/"},
                {"id": "about", "label": "About", "href": "/about"},
            ],
        }
    },
    """import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextareaControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
\tconst { items } = attributes;
\tconst blockProps = useStableBlockProps( { className: 'breadcrumb' } );
\treturn (
\t\t<>
\t\t\t<InspectorControls>
\t\t\t\t<PanelBody title={ __( 'Breadcrumb items (JSON)', 'twork-builder' ) }>
\t\t\t\t\t<TextareaControl
\t\t\t\t\t\tlabel={ __( 'Items', 'twork-builder' ) }
\t\t\t\t\t\tvalue={ JSON.stringify( items, null, 2 ) }
\t\t\t\t\t\tonChange={ ( v ) => {
\t\t\t\t\t\t\ttry { setAttributes( { items: JSON.parse( v ) } ); } catch ( e ) { /* ignore */ }
\t\t\t\t\t\t} }
\t\t\t\t\t\trows={ 6 }
\t\t\t\t\t/>
\t\t\t\t</PanelBody>
\t\t\t</InspectorControls>
\t\t\t<nav { ...blockProps } aria-label="Breadcrumb">
\t\t\t\t<div className="breadcrumb__inner l-section">
\t\t\t\t\t<ol className="breadcrumb__list">
\t\t\t\t\t\t<li className="breadcrumb__item">
\t\t\t\t\t\t\t{ ( items || [] ).map( ( item, i ) => (
\t\t\t\t\t\t\t\t<span key={ item.id }>
\t\t\t\t\t\t\t\t\t{ i > 0 && <span className="breadcrumb__sep"> / </span> }
\t\t\t\t\t\t\t\t\t{ i === items.length - 1 ? (
\t\t\t\t\t\t\t\t\t\t<span className="breadcrumb__current">{ item.label }</span>
\t\t\t\t\t\t\t\t\t) : (
\t\t\t\t\t\t\t\t\t\t<a href={ item.href }>{ item.label }</a>
\t\t\t\t\t\t\t\t\t) }
\t\t\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t) ) }
\t\t\t\t\t\t</li>
\t\t\t\t\t</ol>
\t\t\t\t</div>
\t\t\t</nav>
\t\t</>
\t);
}
""",
    """import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
\tconst { items } = attributes;
\tconst blockProps = useBlockProps.save( {
\t\tclassName: 'breadcrumb',
\t\t'data-block': 'twork/breadcrumb-nav',
\t\t'data-version': '1',
\t} );
\tconst list = items || [];
\treturn (
\t\t<nav { ...blockProps } aria-label="Breadcrumb">
\t\t\t<div className="breadcrumb__inner l-section">
\t\t\t\t<ol className="breadcrumb__list" itemScope itemType="https://schema.org/BreadcrumbList">
\t\t\t\t\t{ list.map( ( item, i ) => (
\t\t\t\t\t\t<li
\t\t\t\t\t\t\tkey={ item.id }
\t\t\t\t\t\t\tclassName="breadcrumb__item"
\t\t\t\t\t\t\titemProp="itemListElement"
\t\t\t\t\t\t\titemScope
\t\t\t\t\t\t\titemType="https://schema.org/ListItem"
\t\t\t\t\t\t\tdata-item-id={ item.id }
\t\t\t\t\t\t>
\t\t\t\t\t\t\t{ i < list.length - 1 ? (
\t\t\t\t\t\t\t\t<a href={ item.href || '#' } itemProp="item">
\t\t\t\t\t\t\t\t\t<span itemProp="name">{ item.label }</span>
\t\t\t\t\t\t\t\t</a>
\t\t\t\t\t\t\t) : (
\t\t\t\t\t\t\t\t<span className="breadcrumb__current" itemProp="name" aria-current="page">
\t\t\t\t\t\t\t\t\t{ item.label }
\t\t\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t) }
\t\t\t\t\t\t\t<meta itemProp="position" content={ String( i + 1 ) } />
\t\t\t\t\t\t\t{ i < list.length - 1 && (
\t\t\t\t\t\t\t\t<span className="breadcrumb__sep" aria-hidden="true"> / </span>
\t\t\t\t\t\t\t) }
\t\t\t\t\t\t</li>
\t\t\t\t\t) ) }
\t\t\t\t</ol>
\t\t\t</div>
\t\t</nav>
\t);
}
""",
)

# --- brand-page-hero ---
add_block(
    "brand-page-hero",
    "twork/brand-page-hero",
    "Brand Page Hero",
    "page-hero",
    "page-hero",
    {
        "eyebrow": {"type": "string", "default": "OUR STORY"},
        "title": {"type": "string", "default": "About Shwe Myanmar"},
        "subtitle": {
            "type": "string",
            "default": "Mandalay heritage, natural ingredients, and trusted quality.",
        },
        "imageUrl": {
            "type": "string",
            "default": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=400&fit=crop&q=80",
        },
    },
    """import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
\tconst { eyebrow, title, subtitle, imageUrl } = attributes;
\tconst blockProps = useStableBlockProps( {
\t\tclassName: 'page-hero',
\t\tstyle: imageUrl ? { '--page-hero-bg': `url(${ imageUrl })` } : {},
\t} );
\treturn (
\t\t<>
\t\t\t<InspectorControls>
\t\t\t\t<PanelBody title={ __( 'Background', 'twork-builder' ) }>
\t\t\t\t\t<TextControl label={ __( 'Image URL', 'twork-builder' ) } value={ imageUrl } onChange={ ( v ) => setAttributes( { imageUrl: v } ) } />
\t\t\t\t</PanelBody>
\t\t\t</InspectorControls>
\t\t\t<section { ...blockProps } data-block="twork/brand-page-hero">
\t\t\t\t<div className="page-hero__inner l-section">
\t\t\t\t\t<div className="page-hero__content">
\t\t\t\t\t\t<RichText tagName="p" className="page-hero__eyebrow" value={ eyebrow } onChange={ ( v ) => setAttributes( { eyebrow: v } ) } />
\t\t\t\t\t\t<RichText tagName="h1" className="page-hero__title" value={ title } onChange={ ( v ) => setAttributes( { title: v } ) } />
\t\t\t\t\t\t<RichText tagName="p" className="page-hero__subtitle" value={ subtitle } onChange={ ( v ) => setAttributes( { subtitle: v } ) } />
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</section>
\t\t</>
\t);
}
""",
    """import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
\tconst { eyebrow, title, subtitle, imageUrl } = attributes;
\tconst blockProps = useBlockProps.save( {
\t\tclassName: 'page-hero',
\t\t'data-block': 'twork/brand-page-hero',
\t\t'data-version': '1',
\t\tstyle: imageUrl ? { '--page-hero-bg': `url(${ imageUrl })` } : undefined,
\t} );
\treturn (
\t\t<section { ...blockProps } aria-label="Page hero">
\t\t\t<div className="page-hero__inner l-section">
\t\t\t\t<div className="page-hero__content">
\t\t\t\t\t{ eyebrow && <RichText.Content tagName="p" className="page-hero__eyebrow" value={ eyebrow } /> }
\t\t\t\t\t{ title && <RichText.Content tagName="h1" className="page-hero__title" value={ title } /> }
\t\t\t\t\t{ subtitle && <RichText.Content tagName="p" className="page-hero__subtitle" value={ subtitle } /> }
\t\t\t\t</div>
\t\t\t</div>
\t\t</section>
\t);
}
""",
)

# --- page-not-found-section ---
add_block(
    "page-not-found-section",
    "twork/page-not-found-section",
    "Page Not Found Section",
    "page-not-found",
    "page-not-found",
    {
        "code": {"type": "string", "default": "404"},
        "title": {"type": "string", "default": "Oops! Page Not Found"},
        "text": {
            "type": "string",
            "default": "ဤစာမျက်နှာကို ရှာမတွေ့ပါ။ အောက်ပါ လင့်ခ်များမှ ဆက်လက်ရှာဖွေနိုင်ပါသည်။",
        },
        "links": {
            "type": "array",
            "default": [
                {"id": "home", "label": "Go Home", "href": "/"},
                {"id": "shop", "label": "Browse Shop", "href": "/shop"},
                {"id": "contact", "label": "Contact Us", "href": "/contact"},
            ],
        },
    },
    """import { __ } from '@wordpress/i18n';
import { useStableBlockProps } from '@twork-builder/editor-utils';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
\tconst { code, title, text, links } = attributes;
\tconst blockProps = useStableBlockProps( { className: 'page-not-found' } );
\treturn (
\t\t<>
\t\t\t<InspectorControls>
\t\t\t\t<PanelBody title={ __( '404', 'twork-builder' ) }>
\t\t\t\t\t<TextControl label={ __( 'Code', 'twork-builder' ) } value={ code } onChange={ ( v ) => setAttributes( { code: v } ) } />
\t\t\t\t</PanelBody>
\t\t\t</InspectorControls>
\t\t\t<section { ...blockProps }>
\t\t\t\t<div className="page-not-found__inner l-section">
\t\t\t\t\t<p className="page-not-found__code">{ code }</p>
\t\t\t\t\t<RichText tagName="h1" className="page-not-found__title" value={ title } onChange={ ( v ) => setAttributes( { title: v } ) } />
\t\t\t\t\t<RichText tagName="p" className="page-not-found__text" value={ text } onChange={ ( v ) => setAttributes( { text: v } ) } />
\t\t\t\t\t<div className="page-not-found__links">
\t\t\t\t\t\t{ ( links || [] ).map( ( link ) => (
\t\t\t\t\t\t\t<a key={ link.id } className="btn btn--outline" href={ link.href }>{ link.label }</a>
\t\t\t\t\t\t) ) }
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</section>
\t\t</>
\t);
}
""",
    """import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
\tconst { code, title, text, links } = attributes;
\tconst blockProps = useBlockProps.save( {
\t\tclassName: 'page-not-found',
\t\t'data-block': 'twork/page-not-found-section',
\t\t'data-version': '1',
\t} );
\treturn (
\t\t<section { ...blockProps } aria-label="Page not found">
\t\t\t<div className="page-not-found__inner l-section">
\t\t\t\t<p className="page-not-found__code">{ code }</p>
\t\t\t\t<RichText.Content tagName="h1" className="page-not-found__title" value={ title } />
\t\t\t\t<RichText.Content tagName="p" className="page-not-found__text" value={ text } />
\t\t\t\t<div className="page-not-found__links" data-list="links">
\t\t\t\t\t{ ( links || [] ).map( ( link ) => (
\t\t\t\t\t\t<a key={ link.id } className="btn btn--outline" href={ link.href || '#' } data-item-id={ link.id }>{ link.label }</a>
\t\t\t\t\t) ) }
\t\t\t\t</div>
\t\t\t</div>
\t\t</section>
\t);
}
""",
)

# Generic array-section template for remaining blocks - use simplified edit/save
GENERIC_BLOCKS = [
    (
        "blog-list-section",
        "twork/blog-list-section",
        "Blog List Section",
        "blog-list",
        "blog-list",
        {
            "posts": {
                "type": "array",
                "default": [
                    {
                        "id": "post_1",
                        "author": "Shwe Myanmar",
                        "category": "Product",
                        "date": "March 15, 2026",
                        "dateIso": "2026-03-15",
                        "title": "Introducing Our 10 Viss Bulk Pack",
                        "excerpt": "Our flagship 10 Viss bulk pack is now available.",
                        "href": "/blog/introducing-10-viss",
                        "imageUrl": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&q=80",
                        "imageAlt": "10 Viss pack",
                    }
                ],
            }
        },
    ),
    (
        "blog-article-section",
        "twork/blog-article-section",
        "Blog Article Section",
        "blog-article",
        "blog-article",
        {
            "author": {"type": "string", "default": "Shwe Myanmar"},
            "category": {"type": "string", "default": "Product"},
            "date": {"type": "string", "default": "March 15, 2026"},
            "dateIso": {"type": "string", "default": "2026-03-15"},
            "title": {"type": "string", "default": "Introducing Our 10 Viss Bulk Pack"},
            "imageUrl": {
                "type": "string",
                "default": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=450&fit=crop&q=80",
            },
            "imageAlt": {"type": "string", "default": "10 Viss pack"},
            "paragraphs": {
                "type": "array",
                "default": [
                    "Shwe Myanmar Foodstuff Industry is proud to introduce our flagship 10 Viss bulk butter pack.",
                    "Designed for wholesale customers, restaurants, and commercial kitchens across Myanmar.",
                ],
            },
            "relatedPosts": {"type": "array", "default": []},
        },
    ),
    (
        "about-story-section",
        "twork/about-story-section",
        "About Story Section",
        "about-story",
        "about-story",
        {
            "eyebrow": {"type": "string", "default": "WHO WE ARE"},
            "title": {"type": "string", "default": "Shwe Myanmar Foodstuff Industry"},
            "paragraphs": {"type": "array", "default": ["Premium butter and ghee from Mandalay, Myanmar."]},
            "ctaLabel": {"type": "string", "default": "VIEW OUR PRODUCTS"},
            "ctaHref": {"type": "string", "default": "/shop"},
            "imageUrl": {"type": "string", "default": ""},
            "imageAlt": {"type": "string", "default": ""},
            "milestones": {"type": "array", "default": []},
            "values": {"type": "array", "default": []},
        },
    ),
    (
        "quality-section",
        "twork/quality-section",
        "Quality Section",
        "quality-section",
        "quality-section",
        {
            "eyebrow": {"type": "string", "default": "OUR COMMITMENT"},
            "title": {"type": "string", "default": "Natural Quality, Every Batch"},
            "paragraphs": {"type": "array", "default": []},
            "steps": {"type": "array", "default": []},
            "standards": {"type": "array", "default": []},
        },
    ),
    (
        "where-to-buy-section",
        "twork/where-to-buy-section",
        "Where To Buy Section",
        "where-to-buy-section",
        "where-to-buy",
        {
            "eyebrow": {"type": "string", "default": "NATIONWIDE DISTRIBUTION"},
            "title": {"type": "string", "default": "Serving Customers Across Myanmar"},
            "paragraphs": {"type": "array", "default": []},
            "regions": {"type": "array", "default": []},
            "tips": {"type": "array", "default": []},
        },
    ),
    (
        "careers-section",
        "twork/careers-section",
        "Careers Section",
        "careers-section",
        "careers-section",
        {
            "eyebrow": {"type": "string", "default": "WORK WITH US"},
            "title": {"type": "string", "default": "Grow With Shwe Myanmar"},
            "paragraphs": {"type": "array", "default": []},
            "benefits": {"type": "array", "default": []},
            "positions": {"type": "array", "default": []},
        },
    ),
    (
        "wholesale-section",
        "twork/wholesale-section",
        "Wholesale Section",
        "wholesale-section",
        "wholesale-section",
        {
            "eyebrow": {"type": "string", "default": "BULK SUPPLY"},
            "title": {"type": "string", "default": "Wholesale Orders & Distribution"},
            "intro": {"type": "string", "default": ""},
            "benefits": {"type": "array", "default": []},
            "formTitle": {"type": "string", "default": "Wholesale Inquiry"},
            "submitLabel": {"type": "string", "default": "SUBMIT INQUIRY"},
            "honeypotName": {"type": "string", "default": "url"},
        },
        True,
    ),
    (
        "contact-form-section",
        "twork/contact-form-section",
        "Contact Form Section",
        "contact-form",
        "contact-form",
        {
            "infoCards": {"type": "array", "default": []},
            "formTitle": {"type": "string", "default": "Send Us a Message"},
            "formDesc": {"type": "string", "default": ""},
            "submitLabel": {"type": "string", "default": "SEND MESSAGE"},
            "honeypotName": {"type": "string", "default": "company"},
            "subjects": {"type": "array", "default": []},
        },
        True,
    ),
    (
        "legal-content-section",
        "twork/legal-content-section",
        "Legal Content Section",
        "legal-content",
        "legal-content",
        {
            "lastUpdated": {"type": "string", "default": "June 1, 2026"},
            "sections": {"type": "array", "default": []},
        },
        True,
    ),
]

GENERIC_EDIT = """import {{ __ }} from '@wordpress/i18n';
import {{ useStableBlockProps }} from '@twork-builder/editor-utils';
import {{ InspectorControls, RichText }} from '@wordpress/block-editor';
import {{ PanelBody, TextControl, TextareaControl }} from '@wordpress/components';

export default function Edit( {{ attributes, setAttributes }} ) {{
\tconst {{ eyebrow, title, intro, formTitle, submitLabel, lastUpdated, paragraphs }} = attributes;
\tconst blockProps = useStableBlockProps( {{ className: '{save_class}' }} );
\treturn (
\t\t<>
\t\t\t<InspectorControls>
\t\t\t\t<PanelBody title={{ __( 'Content', 'twork-builder' ) }}>
\t\t\t\t\t{{ eyebrow !== undefined && (
\t\t\t\t\t\t<TextControl label={{ __( 'Eyebrow', 'twork-builder' ) }} value={{ eyebrow || '' }} onChange={{ ( v ) => setAttributes( {{ eyebrow: v }} ) }} />
\t\t\t\t\t) }}
\t\t\t\t\t{{ title !== undefined && (
\t\t\t\t\t\t<TextControl label={{ __( 'Title', 'twork-builder' ) }} value={{ title || '' }} onChange={{ ( v ) => setAttributes( {{ title: v }} ) }} />
\t\t\t\t\t) }}
\t\t\t\t\t{{ intro !== undefined && (
\t\t\t\t\t\t<TextareaControl label={{ __( 'Intro', 'twork-builder' ) }} value={{ intro || '' }} onChange={{ ( v ) => setAttributes( {{ intro: v }} ) }} />
\t\t\t\t\t) }}
\t\t\t\t\t{{ formTitle !== undefined && (
\t\t\t\t\t\t<TextControl label={{ __( 'Form title', 'twork-builder' ) }} value={{ formTitle || '' }} onChange={{ ( v ) => setAttributes( {{ formTitle: v }} ) }} />
\t\t\t\t\t) }}
\t\t\t\t\t{{ lastUpdated !== undefined && (
\t\t\t\t\t\t<TextControl label={{ __( 'Last updated', 'twork-builder' ) }} value={{ lastUpdated || '' }} onChange={{ ( v ) => setAttributes( {{ lastUpdated: v }} ) }} />
\t\t\t\t\t) }}
\t\t\t\t</PanelBody>
\t\t\t</InspectorControls>
\t\t\t<section {{ ...blockProps }} data-block="{name}">
\t\t\t\t<div className="l-section">
\t\t\t\t\t{{ eyebrow && <p className="section-head__eyebrow">{{ eyebrow }}</p> }}
\t\t\t\t\t{{ title && <RichText tagName="h2" className="section-head__title" value={{ title }} onChange={{ ( v ) => setAttributes( {{ title: v }} ) }} /> }}
\t\t\t\t\t{{ intro && <p>{{ intro }}</p> }}
\t\t\t\t\t{{ formTitle && <h3>{{ formTitle }}</h3> }}
\t\t\t\t\t{{ Array.isArray( paragraphs ) && paragraphs.map( ( p, i ) => <p key={{ i }}>{{ p }}</p> ) }}
\t\t\t\t\t<p className="editor-hint">{{ __( 'Configure arrays via block attributes / patterns.', 'twork-builder' ) }}</p>
\t\t\t\t</div>
\t\t\t</section>
\t\t</>
\t);
}}
"""

GENERIC_SAVE = """import {{ useBlockProps, RichText }} from '@wordpress/block-editor';

export default function save( {{ attributes }} ) {{
\tconst attrs = attributes;
\tconst blockProps = useBlockProps.save( {{
\t\tclassName: '{save_class}',
\t\t'data-block': '{name}',
\t\t'data-version': '1',
\t}} );
\treturn (
\t\t<section {{ ...blockProps }}>
\t\t\t<div className="{save_class}__inner l-section">
\t\t\t\t{{ attrs.eyebrow && <p className="section-head__eyebrow">{{ attrs.eyebrow }}</p> }}
\t\t\t\t{{ attrs.title && <RichText.Content tagName="h2" className="section-head__title" value={{ attrs.title }} /> }}
\t\t\t\t{{ attrs.intro && <p>{{ attrs.intro }}</p> }}
\t\t\t\t{{ Array.isArray( attrs.paragraphs ) && attrs.paragraphs.map( ( p, i ) => <p key={{ i }}>{{ p }}</p> ) }}
\t\t\t\t{{ attrs.lastUpdated && <p className="legal-content__updated">Last updated: {{ attrs.lastUpdated }}</p> }}
\t\t\t\t{{ attrs.formTitle && <h3>{{ attrs.formTitle }}</h3> }}
\t\t\t</div>
\t\t</section>
\t);
}}
"""

FORM_VIEW = """( function () {
\t'use strict';
\tfunction initForm( rootEl, selector ) {
\t\tconst form = rootEl.querySelector( selector );
\t\tif ( ! form || form.dataset.formInit ) return;
\t\tform.dataset.formInit = '1';
\t\tform.addEventListener( 'submit', function ( e ) {
\t\t\te.preventDefault();
\t\t\tconst hp = form.querySelector( '[class*="__hp"]' );
\t\t\tif ( hp && hp.value ) return;
\t\t\tconst feedback = rootEl.querySelector( '[data-field="feedback"]' );
\t\t\tif ( feedback ) {
\t\t\t\tfeedback.classList.remove( 'u-hidden' );
\t\t\t\tfeedback.textContent = 'Thank you! Connect a form plugin to store submissions.';
\t\t\t}
\t\t\tform.reset();
\t\t} );
\t}
\tfunction initAll() {
\t\tdocument.querySelectorAll( '.contact-form[data-block="twork/contact-form-section"]' ).forEach( function ( el ) {
\t\t\tinitForm( el, '[data-action="contact-submit"]' );
\t\t} );
\t\tdocument.querySelectorAll( '.wholesale-section[data-block="twork/wholesale-section"]' ).forEach( function ( el ) {
\t\t\tinitForm( el, '[data-action="wholesale-submit"]' );
\t\t} );
\t}
\tif ( document.readyState === 'loading' ) document.addEventListener( 'DOMContentLoaded', initAll );
\telse initAll();
} )();
"""

LEGAL_VIEW = """import '../shared/brand-accordion.js';
( function () {
\t'use strict';
\tfunction initLegal() {
\t\tdocument.querySelectorAll( '.legal-content[data-block="twork/legal-content-section"]' ).forEach( function ( el ) {
\t\t\tif ( el.dataset.legalInit ) return;
\t\t\tel.dataset.legalInit = '1';
\t\t\tel.querySelectorAll( '[data-accordion-item]' ).forEach( function ( item ) {
\t\t\t\tconst trigger = item.querySelector( '[data-action="accordion-toggle"]' );
\t\t\t\tconst panel = item.querySelector( '[data-accordion-panel]' );
\t\t\t\tif ( ! trigger || ! panel ) return;
\t\t\t\tif ( item.dataset.open === 'true' ) {
\t\t\t\t\titem.classList.add( 'is-open' );
\t\t\t\t\ttrigger.setAttribute( 'aria-expanded', 'true' );
\t\t\t\t\tpanel.hidden = false;
\t\t\t\t}
\t\t\t\ttrigger.addEventListener( 'click', function () {
\t\t\t\t\tconst open = trigger.getAttribute( 'aria-expanded' ) === 'true';
\t\t\t\t\ttrigger.setAttribute( 'aria-expanded', open ? 'false' : 'true' );
\t\t\t\t\tpanel.hidden = open;
\t\t\t\t\titem.classList.toggle( 'is-open', ! open );
\t\t\t\t} );
\t\t\t} );
\t\t} );
\t}
\tif ( document.readyState === 'loading' ) document.addEventListener( 'DOMContentLoaded', initLegal );
\telse initLegal();
} )();
"""


def generic_edit(name: str, save_class: str) -> str:
    return GENERIC_EDIT.replace("{name}", name).replace("{save_class}", save_class).replace("{{", "{").replace("}}", "}")


def generic_save(name: str, save_class: str) -> str:
    return GENERIC_SAVE.replace("{name}", name).replace("{save_class}", save_class).replace("{{", "{").replace("}}", "}")


for entry in GENERIC_BLOCKS:
    if len(entry) == 6:
        slug, name, title, component, save_class, attributes = entry
        view = False
    else:
        slug, name, title, component, save_class, attributes, view = entry
    add_block(
        slug,
        name,
        title,
        component,
        save_class,
        attributes,
        generic_edit(name, save_class),
        generic_save(name, save_class),
        view=view,
    )


def main() -> None:
    for b in BLOCKS:
        folder = SRC / b["slug"]
        meta = {
            "name": b["name"],
            "title": b["title"],
            "description": b.get("description", "Shweghee inner page block."),
            "keywords": ["brand", "shweghee", "inner-page"],
            "attributes": b["attributes"],
            "supports": {"html": False, "align": ["wide", "full"]},
            "editorScript": "file:./index.js",
            "style": "file:./style-index.css",
        }
        if b.get("view"):
            meta["viewScript"] = "file:./view.js"
        write(folder / "block.json", block_json(meta))
        write(folder / "index.js", INDEX_VIEW if b.get("view") else INDEX)
        write(folder / "edit.js", b["edit_js"])
        write(folder / "save.js", b["save_js"])
        write(folder / "style.scss", style_scss(b["component"]))
        if b["slug"] == "contact-form-section" or b["slug"] == "wholesale-section":
            write(folder / "view.js", FORM_VIEW)
        if b["slug"] == "legal-content-section":
            write(folder / "view.js", LEGAL_VIEW)
        print(f"  {b['slug']}")


if __name__ == "__main__":
    main()
