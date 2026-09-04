#!/usr/bin/env python3
"""Regenerate kit preview PNGs (1280x720 page-look) via SVG + ImageMagick."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "templates"

KITS = [
    (1, "#00ccff", "#ff7f00", "#0a1628", "#083344", "Shwe Myanmar", "Natural Flavor. Premium Quality.", "Home · Shop · Product · Brand pages",
     [("Core Services", "Carousel of brand services"), ("Why Choose Us", "Numbered feature grid"), ("Main Products", "Category card grid")]),
    (2, "#0ea5e9", "#0369a1", "#0c4a6e", "#082f49", "Hospital Core", "Compassionate Care. Modern Medicine.", "Doctors · Packages · Patient Guide",
     [("Latest Updates", "News & hospital notices"), ("Health Packages", "Care package section"), ("Find a Doctor", "Doctor directory")]),
    (3, "#10b981", "#059669", "#064e3b", "#022c22", "Pharmacy Shop", "Medicines & Wellness, Delivered.", "Shop · Offers · Best sellers",
     [("Categories", "Featured category carousel"), ("Daily Offers", "Deal products row"), ("Best Sellers", "Woo product grid")]),
    (4, "#34d399", "#1b4d3e", "#0f172a", "#022c22", "CSR Corporate", "Impact Beyond Business.", "Stats · Initiatives · Careers",
     [("Impact Stats", "CSR metrics strip"), ("Initiatives", "Project cards"), ("Partners", "Logo showcase")]),
    (5, "#818cf8", "#4f46e5", "#1e1b4b", "#312e81", "Specialty Centre", "Neurology & Specialist Care.", "Overview · Doctors · Treatments",
     [("Centre Overview", "Hero + intro"), ("Specialists", "Doctor cards"), ("Treatments", "Treatment grid")]),
    (6, "#f87171", "#dc2626", "#450a0a", "#7f1d1d", "Emergency Care", "24/7 Emergency Response.", "Triage · Fleet · ER Doctors",
     [("Call Dispatch", "Emergency CTA"), ("Ambulance Fleet", "Vehicle cards"), ("ER Units", "Unit directory")]),
    (7, "#2dd4bf", "#0f766e", "#134e4a", "#115e59", "Health Check-up", "Screen Early. Stay Ahead.", "Steps · Packages · Checklist",
     [("Journey Steps", "Process timeline"), ("Packages", "Screening plans"), ("Compare", "Package compare")]),
    (8, "#60a5fa", "#2563eb", "#1e3a5f", "#1e40af", "Telemedicine", "Care Anywhere. Book Online.", "Consult · Process · Booking",
     [("Video Consult", "Specialty cards"), ("How it Works", "Process section"), ("Book Now", "Booking layout")]),
    (9, "#a78bfa", "#7c3aed", "#2e1065", "#4c1d95", "Lab & Radiology", "Precision Diagnostics.", "Lab · Imaging · Technology",
     [("Laboratory", "Lab services"), ("Radiology", "Imaging suite"), ("Technology", "Equipment grid")]),
]


def esc(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def svg_for(kit) -> str:
    kid, a1, a2, bg, mid, brand, hero, sub, cards = kit
    slug = brand.lower().replace(" ", "-")
    parts = [
        f'''<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
<defs>
  <linearGradient id="h{kid}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="{bg}"/>
    <stop offset="50%" stop-color="{mid}"/>
    <stop offset="100%" stop-color="{a2}"/>
  </linearGradient>
  <linearGradient id="m{kid}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="{a2}"/>
    <stop offset="100%" stop-color="{a1}"/>
  </linearGradient>
</defs>
<rect width="1280" height="720" fill="#f1f5f9"/>
<rect width="1280" height="36" fill="#e2e8f0"/>
<circle cx="22" cy="18" r="6" fill="#f87171"/>
<circle cx="42" cy="18" r="6" fill="#fbbf24"/>
<circle cx="62" cy="18" r="6" fill="#34d399"/>
<rect x="90" y="10" width="420" height="16" rx="8" fill="#fff"/>
<text x="104" y="22" fill="#64748b" font-family="ui-sans-serif,system-ui,sans-serif" font-size="11">yoursite.test / {esc(slug)}</text>
<rect y="36" width="1280" height="56" fill="{bg}"/>
<text x="40" y="72" fill="#fff" font-family="ui-sans-serif,system-ui,sans-serif" font-size="18" font-weight="700">{esc(brand)}</text>
<text x="860" y="72" fill="rgba(255,255,255,0.88)" font-family="ui-sans-serif,system-ui,sans-serif" font-size="13">Home   Services   About   Contact</text>
<rect y="92" width="1280" height="300" fill="url(#h{kid})"/>
<text x="48" y="150" fill="rgba(255,255,255,0.75)" font-family="ui-sans-serif,system-ui,sans-serif" font-size="12" font-weight="600">TEMPLATE {kid}  ·  LIVE PAGE PREVIEW</text>
<text x="48" y="210" fill="#fff" font-family="ui-sans-serif,system-ui,sans-serif" font-size="40" font-weight="700">{esc(hero)}</text>
<text x="48" y="250" fill="rgba(255,255,255,0.9)" font-family="ui-sans-serif,system-ui,sans-serif" font-size="15">{esc(sub)}</text>
<rect x="48" y="278" width="150" height="42" rx="8" fill="{a1}"/>
<text x="70" y="305" fill="#0a1628" font-family="ui-sans-serif,system-ui,sans-serif" font-size="14" font-weight="700">Explore pages</text>
<rect x="760" y="130" width="460" height="230" rx="16" fill="url(#m{kid})" opacity="0.95"/>
<rect x="790" y="160" width="190" height="110" rx="10" fill="rgba(255,255,255,0.22)"/>
<rect x="1000" y="160" width="190" height="110" rx="10" fill="rgba(255,255,255,0.16)"/>
<rect x="790" y="286" width="400" height="14" rx="4" fill="rgba(255,255,255,0.35)"/>
<rect x="790" y="310" width="260" height="10" rx="3" fill="rgba(255,255,255,0.22)"/>
'''
    ]
    for i, ((title, desc), x) in enumerate(zip(cards, [48, 448, 848])):
        bar = a1 if i == 0 else a2
        parts.append(
            f'''<rect x="{x}" y="420" width="384" height="200" rx="14" fill="#fff" stroke="#e2e8f0"/>
<rect x="{x}" y="420" width="384" height="96" rx="14" fill="{bar}" opacity="0.18"/>
<rect x="{x+16}" y="436" width="352" height="64" rx="8" fill="{bar}" opacity="0.55"/>
<text x="{x+20}" y="546" fill="#0f172a" font-family="ui-sans-serif,system-ui,sans-serif" font-size="17" font-weight="700">{esc(title)}</text>
<text x="{x+20}" y="572" fill="#64748b" font-family="ui-sans-serif,system-ui,sans-serif" font-size="13">{esc(desc)}</text>
<rect x="{x+20}" y="590" width="120" height="8" rx="3" fill="#cbd5e1"/>
'''
        )
    parts.append(
        f'''<rect y="648" width="1280" height="72" fill="{bg}"/>
<text x="48" y="680" fill="#fff" font-family="ui-sans-serif,system-ui,sans-serif" font-size="13" font-weight="600">{esc(brand)}  ·  real page stack preview</text>
<text x="980" y="680" fill="rgba(255,255,255,0.7)" font-family="ui-sans-serif,system-ui,sans-serif" font-size="12">Header · Hero · Sections · Footer</text>
</svg>
'''
    )
    return "".join(parts)


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    for kit in KITS:
        kid = kit[0]
        svg_path = OUT / f"kit-{kid:02d}.gen.svg"
        png_path = OUT / f"kit-{kid:02d}.png"
        svg_path.write_text(svg_for(kit), encoding="utf-8")
        subprocess.run(
            [
                "magick",
                str(svg_path),
                "-strip",
                "-background",
                "white",
                "-alpha",
                "remove",
                "-alpha",
                "off",
                "-depth",
                "8",
                str(png_path),
            ],
            check=True,
        )
        svg_path.unlink(missing_ok=True)
        old_svg = OUT / f"kit-{kid:02d}.svg"
        old_svg.unlink(missing_ok=True)
        print(f"OK {png_path.name} ({png_path.stat().st_size // 1024} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
