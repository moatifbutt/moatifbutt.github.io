# moatifbutt.github.io

Personal academic website of Muhammad Atif Butt, built with [Jekyll](https://jekyllrb.com/) and the
[al-folio](https://github.com/alshedivat/al-folio) v1.2 starter. Layouts and theme styles come from
the `al_folio_*` gems (see `Gemfile`), so this repository only holds content, configuration, and a
small layer of custom styles and demos.

## Preview locally

```bash
tools/serve.sh            # http://127.0.0.1:4000, reloads when you save a file
```

Restart it after changing `_config.yml`. The first run installs gems into `vendor/bundle`.
Requirements: Homebrew `ruby@3.3` and `imagemagick` (`brew install ruby@3.3 imagemagick`).

## Publish

Push to `master`. The GitHub Action in `.github/workflows/deploy.yml` builds the site and pushes the
result to the `gh-pages` branch. In the repository settings, **Pages → Source** must be set to
"Deploy from a branch", branch `gh-pages`, folder `/ (root)`.

## Where things live

| What | File(s) |
| --- | --- |
| Name, site description, feature switches | `_config.yml` |
| Home page text, intro box (`intro:`), photo | `_pages/about.md`, `assets/img/prof_pic.jpg` |
| Home page layout (name beside the photo) | `_layouts/about.liquid`, a local copy of the theme's layout |
| Social links (email, Scholar, GitHub, LinkedIn, CV) | `_data/socials.yml` |
| Contact pills at the top of the bio | `_includes/social_pills.liquid` |
| Project cards (not shown now; add `{% include research_palette.liquid %}` to `_pages/about.md` to bring them back) | `_includes/research_palette.liquid` |
| Publications | `_bibliography/papers.bib` |
| Publication thumbnails | `assets/img/publication_preview/` |
| Hover-to-explore frames on thumbnails | `_data/preview_frames.yml` |
| Venue badge colors | `_data/venues.yml` |
| Co-author homepage links | `_data/coauthors.yml` |
| News items | `_news/*.md` (one file per item) |
| Project pages with demos | `_projects/*.md` |
| Demo data | `_data/demos/*.yml` |
| Demo images | `assets/demos/<project>/` |
| Demo scripts | `assets/js/custom/` |
| Thesis page | `_pages/thesis.md` |
| CV page / PDF | `_pages/cv.md`, `assets/pdf/CV.pdf` |
| Custom styles | `_sass/_custom.scss` and `_sass/custom/` (fonts in `_typography.scss`, navbar blur and animations in `_motion.scss`) |
| Scroll reveal and thumbnail hover | `assets/js/custom/enhance.js`, loaded by `_includes/enhance.liquid` |
| Fonts (Inter, Newsreader, JetBrains Mono) | `third_party_libraries.google_fonts` in `_config.yml` |
| Image preparation | `tools/build_assets.py` |
| Drawn thumbnails (TraffSign, CARL-D, drivable road; no open figures) | `tools/thumbnails/*.svg`, rendered by `tools/render_thumbnails.py` |

## Common edits

**Add a paper.** Add an entry to `_bibliography/papers.bib` (the header of that file lists the
extra fields). Use `topic` for the publication filters (`color`, `benchmark`, `editing`,
`privacy`, `driving`, `trustworthy`), `selected = {true}` to show it on the home page, and
`preview = {name.jpg}` for a thumbnail in `assets/img/publication_preview/`. If you add a new
topic, also add a button for it in `_pages/publications.md`.

**Add a news item.** Create `_news/YYYY-MM-short-name.md`:

```markdown
---
layout: post
date: 2026-11-01
inline: true
related_posts: false
---

[MyPaper](/projects/mypaper/) is accepted at **CVPR 2027**.
```

**Update the CV.** Replace `assets/pdf/CV.pdf` with the new export (keep the file name).

**Change the photo.** Replace `assets/img/prof_pic.jpg` (square or portrait works best).

**Add a project page.** Copy one of `_projects/*.md`, change the front matter (`permalink`,
`title`, `importance` for ordering, `palette_color` for the home page chip, `venue`, `authors`,
`links`) and the text. A page without a demo simply leaves out the `{% include demo.liquid %}` line.
For a new demo, add images under `assets/demos/<name>/`, data in `_data/demos/<name>.yml`, and a
script in `assets/js/custom/` that follows the pattern of the existing ones (each script finds its
`[data-demo="<name>"]` container and reads the JSON inside it).

**Regenerate demo images and thumbnails.** All images are cropped from the paper figures (the
local paper sources in `~/Desktop/Data` and arXiv HTML figures), never generated:

```bash
python3 -m pip install pillow pymupdf
python3 tools/build_assets.py
```

## Customizations on top of al-folio

To keep theme updates painless, everything custom is kept apart from the theme:

- `assets/css/main.scss` is a copy of the theme file with one added line, `@use "custom";`.
  After a theme update, compare it with the gem's version
  (`bundle exec al-folio upgrade overrides diff assets/css/main.scss`).
- `_layouts/bib_meta.liquid` and `_includes/{demo,project_header,research_palette}.liquid` are new
  files, not overrides of theme files.
- `purgecss.config.js` safelists the custom class names, since the demos create elements at runtime.
- The upstream al-folio test suite, agent files, and maintainer workflows were removed; only
  `deploy.yml` is kept.

## Updating al-folio

```bash
bundle update al_folio_core            # or another al_* gem
bundle exec al-folio upgrade audit     # reports config changes the new version expects
```

Check the [al-folio releases](https://github.com/alshedivat/al-folio/releases) for anything that
needs a manual change, then preview locally before pushing.
