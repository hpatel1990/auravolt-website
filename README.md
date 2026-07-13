# Auravolt Website

Marketing website for **Auravolt Corp.** — custom battery integration
today, AI-driven energy intelligence next.

Plain HTML, CSS, and vanilla JavaScript. No build step, no frameworks,
no dependencies. Clone it, open it, edit it.

## Quick start (VS Code)

1. Open this folder in VS Code (`File → Open Folder…`)
2. Accept the prompt to install the recommended extensions
   (Live Server, Prettier, EditorConfig)
3. Right-click `index.html` → **Open with Live Server**

The site opens in your browser and auto-reloads every time you save a
file. Without Live Server, double-clicking `index.html` also works.

## Project structure

```
├── index.html                  Home
├── technology.html             Technology / Integration Core
├── product-manufacturers.html  Solutions → Product Manufacturers
├── battery-producers.html      Solutions → Battery Producers
├── critical-power.html         Industries → Critical Power
├── defense.html                Industries → Defense
├── commercial.html             Industries → Commercial
├── resources.html              Blog / News / White papers
├── about.html                  Company → About Us
├── careers.html                Company → Careers
├── contact.html                Get in Touch
├── privacy.html                Privacy policy (stub — needs legal review)
├── terms.html                  Terms of use (stub — needs legal review)
├── 404.html                    Not-found page (used by GitHub Pages)
│
├── css/styles.css              All colors, fonts, spacing, layout
├── js/script.js                Nav, menus, animations, filters
├── images/                     Logo assets (web + hi-res versions)
│
├── partials/                   MASTER copies of the shared header/footer
│   ├── header.html
│   └── footer.html
├── tools/sync_partials.py      Pushes partials into every page (see below)
├── .github/workflows/          Auto-deploy to GitHub Pages on every push
│
└── docs/EDITING.md             Detailed guide: text, colors, images, pages
```

## The one rule: shared header & footer

The nav header and footer appear on every page. To change them:

1. Edit `partials/header.html` or `partials/footer.html`
2. Run `python tools/sync_partials.py` from the repo root

That copies your change into all eleven pages. (Requires Python 3,
which macOS and most Linux systems have; on Windows install it from
python.org or the Microsoft Store.) If you'd rather not use the script,
you can edit the header in one page and copy the block between the
`HEADER:BEGIN` / `HEADER:END` comments into the others.

Everything else — page text, colors, images — is a normal single-file
edit. See **docs/EDITING.md** for a walkthrough.

## Putting it on GitHub

With [GitHub Desktop](https://desktop.github.com): `File → Add local
repository`, choose this folder, then **Publish repository**.

Or from the terminal:

```bash
git init
git add .
git commit -m "Initial Auravolt website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/auravolt-website.git
git push -u origin main
```

## Free hosting with GitHub Pages (automatic)

This repo ships with a GitHub Actions workflow
(`.github/workflows/deploy.yml`) that publishes the site on every push
to `main`. One-time setup:

1. On GitHub, open the repo → **Settings → Pages**
2. Under "Build and deployment", set Source to **GitHub Actions**

That's it. From then on, every `git push` deploys automatically — watch
progress in the repo's **Actions** tab. The site goes live at
`https://YOUR-USERNAME.github.io/auravolt-website/`.

To use the `auravolt.ai` domain later, add it as a custom domain on the
same Settings → Pages screen and follow GitHub's DNS instructions.

## Before going live — checklist

- [ ] Replace everything marked `[Placeholder]` (testimonials, team,
      job listings, resource articles, spec table values)
- [ ] Wire the contact form and newsletter form to a real handler
      (Formspree, Basin, Netlify Forms, or your CRM)
- [ ] Swap partner-logo placeholders for real logos (with permission)
- [ ] Re-verify the cited market statistics and keep the on-page
      attributions (Grand View Research, Mordor Intelligence)
- [ ] Have an attorney review and complete `privacy.html` and
      `terms.html`, then remove their template notices and `noindex` tags
- [ ] Set the final company address on the contact page

---

© 2026 Auravolt Corp. All rights reserved. This repository contains
proprietary brand assets and content; it is not open-source.
