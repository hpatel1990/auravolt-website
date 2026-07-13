#!/usr/bin/env python3
"""
Sync the shared header and footer into every page.

The nav header and footer appear on all pages. Instead of editing
eleven files, edit the master copies in partials/header.html and
partials/footer.html, then run:

    python tools/sync_partials.py

Every *.html file in the repo root will have the content between its
HEADER:BEGIN/END and FOOTER:BEGIN/END markers replaced with the
master copies.
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
header = (ROOT / "partials" / "header.html").read_text().strip()
footer = (ROOT / "partials" / "footer.html").read_text().strip()

for page in sorted(ROOT.glob("*.html")):
    text = page.read_text()
    new = re.sub(r"(<!-- HEADER:BEGIN -->).*?(<!-- HEADER:END -->)",
                 lambda m: f"{m.group(1)}\n{header}\n{m.group(2)}", text, flags=re.S)
    new = re.sub(r"(<!-- FOOTER:BEGIN -->).*?(<!-- FOOTER:END -->)",
                 lambda m: f"{m.group(1)}\n{footer}\n{m.group(2)}", new, flags=re.S)
    if new != text:
        page.write_text(new)
        print(f"updated  {page.name}")
    else:
        print(f"in sync  {page.name}")
print("Done.")
