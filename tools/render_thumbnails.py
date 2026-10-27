#!/usr/bin/env python3
"""Render the hand-drawn publication thumbnails in tools/thumbnails/*.svg.

These are illustrations for papers whose figures are not openly available
(TraffSign, CARL-D, drivable road region). Every other thumbnail is cropped
from a paper figure by tools/build_assets.py.

A browser renders the SVGs so that Urdu text is shaped correctly.

    python3 -m pip install playwright pillow && python3 -m playwright install chromium
    python3 tools/render_thumbnails.py
"""

from __future__ import annotations

import io
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

SITE = Path(__file__).resolve().parents[1]
SOURCES = SITE / "tools" / "thumbnails"
THUMBS = SITE / "assets" / "img" / "publication_preview"
SIZE = (480, 360)  # same as the cropped thumbnails


def main() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": SIZE[0], "height": SIZE[1]})
        for svg in sorted(SOURCES.glob("*.svg")):
            page.set_content(f"<body style='margin:0'>{svg.read_text()}</body>")
            page.wait_for_timeout(300)  # let the system fonts load
            png = page.screenshot(clip={"x": 0, "y": 0, "width": SIZE[0], "height": SIZE[1]})
            out = THUMBS / f"{svg.stem}.jpg"
            Image.open(io.BytesIO(png)).convert("RGB").save(out, quality=88, optimize=True, progressive=True)
            print("wrote", out.relative_to(SITE))
        browser.close()


if __name__ == "__main__":
    main()
