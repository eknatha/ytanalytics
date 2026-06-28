#!/usr/bin/env python3
"""
build.py — bundles src/ into a single self-contained dist/index.html

Reads src/index.html and inlines every local <script src="..."> (PapaParse,
Chart.js, the app) directly into the HTML, producing one zero-dependency file
that deploys cleanly to GitHub Pages. External CDN/font links are left as-is.

Usage:
    python3 build.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
DIST = ROOT / "dist"


def inline_scripts(html: str) -> str:
    """Replace <script src="local/path"></script> with <script>...contents...</script>."""
    pattern = re.compile(r'<script\s+src="([^"]+)"\s*></script>')

    def repl(match: re.Match) -> str:
        src_path = match.group(1)
        # leave absolute URLs (CDNs) untouched
        if src_path.startswith(("http://", "https://", "//")):
            return match.group(0)
        file_path = SRC / src_path
        if not file_path.exists():
            print(f"  ! warning: {src_path} not found, leaving reference", file=sys.stderr)
            return match.group(0)
        code = file_path.read_text(encoding="utf-8")
        print(f"  + inlined {src_path} ({len(code) // 1024} KB)")
        return f"<script>\n{code}\n</script>"

    return pattern.sub(repl, html)


def main() -> int:
    src_index = SRC / "index.html"
    if not src_index.exists():
        print("error: src/index.html not found", file=sys.stderr)
        return 1

    print("Building ytanalytics →")
    html = src_index.read_text(encoding="utf-8")
    bundled = inline_scripts(html)

    DIST.mkdir(exist_ok=True)
    out = DIST / "index.html"
    out.write_text(bundled, encoding="utf-8")

    # carry over deploy files if present at repo root
    for fname in (".nojekyll", "CNAME"):
        f = ROOT / fname
        if f.exists():
            (DIST / fname).write_text(f.read_text(encoding="utf-8"), encoding="utf-8")
            print(f"  + copied {fname} to dist/")

    size_kb = out.stat().st_size / 1024
    print(f"\nDone. dist/index.html — {size_kb:.0f} KB, zero external dependencies.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
