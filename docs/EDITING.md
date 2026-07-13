# Editing Guide

Everything you need for day-to-day edits, organized by what you're
trying to change. All edits can be done in VS Code with the site
running in Live Server so you see changes instantly on save.

## Changing text on a page

Each page is its own file (see the map in the README). Open the file,
find the text, change it, save. Conventions used throughout:

- Headlines live in `<h1>`, `<h2>`, `<h3>` tags
- Body copy lives in `<p>` tags
- Small mono labels (like "PHASE 01") live in `<span>` or `<div>`
  elements — edit the words, keep the tags
- Anything marked `[Placeholder]` must be replaced or deleted before
  launch

Tip: use VS Code's global search (Ctrl/Cmd + Shift + F) to find a
phrase across all pages at once.

## Changing the header (nav) or footer

These are shared across all pages. Edit the master copies:

- `partials/header.html` — logo, menu items, dropdowns, CTA button
- `partials/footer.html` — link columns, newsletter, copyright line

Then run from the repo root:

```bash
python tools/sync_partials.py
```

The script rewrites the header/footer blocks in every page file. You'll
see `updated <page>` for each file it touched.

## Changing colors

Open `css/styles.css`. Every color is defined once at the top in the
`:root` block:

| Variable | What it controls |
|---|---|
| `--volt`, `--volt-bright`, `--volt-deep` | The brand greens (accents, buttons, gradients) |
| `--graphite`, `--graphite-2` | Dark hero and dark section backgrounds |
| `--paper` | Light page background |
| `--ink` | Main text color |
| `--slate` | Secondary/muted text |
| `--line` | Borders and dividers |

Change a hex value, save, and it updates site-wide.

## Changing fonts

Fonts are loaded from Google Fonts in the `<head>` of every page and
assigned in `:root`:

- `--font-display` — the wide technical headline face (Michroma)
- `--font-body` — paragraphs and UI (IBM Plex Sans)
- `--font-mono` — labels, data, eyebrows (IBM Plex Mono)

To swap a font: update the Google Fonts `<link>` (easiest via the
partials + sync script if you want it everywhere), then change the
variable in `styles.css`.

## Swapping images

Drop replacements into `images/` using the same filenames:

- `symbol.png` — the diamond logo mark (transparent background)
- `wordmark-dark.png` — AURAVOLT lettering for light backgrounds
- `wordmark-white.png` — AURAVOLT lettering for dark backgrounds

The `*-hd.png` files are high-resolution copies for decks and print;
the site itself doesn't load them.

## Adding a new page

1. Duplicate the page file closest to what you want (e.g. copy
   `defense.html` → `events.html`)
2. In the new file, update the `<title>`, the `<meta name="description">`,
   the `<body data-page="events">` value, and the content
3. Add a link to it in `partials/header.html` and/or
   `partials/footer.html`, then run `python tools/sync_partials.py`
4. If the page belongs to a dropdown group (Solutions, Industries,
   Company), add one line to `NAV_GROUPS` in `js/script.js` so the
   parent menu highlights correctly

## Removing a page

Delete the file, remove its links from the partials, run the sync
script. Done.

## The animations

Anything with the class `reveal` fades up when scrolled into view. Add
`class="reveal"` to a block to give it the effect, remove the class to
make it static. Users with "reduce motion" enabled in their OS see no
animations at all — that's intentional, leave it be.

## Forms

The contact form (`contact.html`) and the newsletter form (footer) are
visual demos. To make them real, the quickest path is a form service:
create a free endpoint at Formspree or Basin, then set it as the
`action` attribute of the `<form>` tag and remove the demo handler in
`js/script.js` (the block at the bottom marked "Contact form").
