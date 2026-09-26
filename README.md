# psychotherapie-bausch.de

The website of Dr. phil. Paul Bausch's practice for psychotherapy in Schopfheim and Freiburg. It is a static [Astro](https://docs.astro.build) site with Tailwind CSS and DaisyUI, no CMS and no client-side framework. German lives at the root (`/`, `/impressum/`, `/datenschutz/`), English under `/en/` (`/en/`, `/en/legal-notice/`, `/en/privacy/`).

## Run it locally

Node is pinned in `.nvmrc`.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # writes the static site to dist/
```

## Edit the content

All text is Markdown in `src/content/`. Every German file has an English counterpart with the same `translationKey`; change both.

| What | Where |
|---|---|
| Welcome block (hero), page title, closing "Erstgespräch" sentence | `src/content/pages/de/angebot.md`, `src/content/pages/en/home.md` (frontmatter `hero`, `cta`) |
| Treatment focus and methods | `src/content/sections/<lang>/schwerpunkte.md` / `focus.md` |
| About me and CV | `src/content/sections/<lang>/ueber-mich.md` / `about.md`: the intro is the Markdown body, the CV rows are the `cv` list (`current: true` for "Seit …" rows), the publications sentence and links are `links` |
| Locations text | `src/content/sections/<lang>/standorte.md` / `locations.md`: the intro is the body, each card's sentence is `locations[].text` |
| Impressum, Datenschutz | `src/content/pages/de/impressum.md`, `datenschutz.md` and `en/legal-notice.md`, `en/privacy.md` |
| Buttons, labels, email hint, crisis note | `src/i18n/ui.ts` |

The one-pager shows the sections in their `order`. A section appears in the header nav only if it has a `navLabel`, and its `anchor` is the `#…` in the URL.

**Practice facts** – addresses, weekdays, billing options, phone, email, coordinates – live only in `src/data/practice.ts`. The location cards, the footer, the contact box and the search-engine data (JSON-LD) all read from there, so a new phone number or a changed billing option is one edit. Add a location there and give it a sentence in both `standorte`/`locations` files. The one exception: the four legal pages spell out the addresses, phone and email as plain text, so update them too when a fact changes.

**Photo**: the portrait is `src/assets/Portrait_cutout.png` (a transparent cut-out, made on a Mac with `swift scripts/cutout.swift photo.jpg out.png`). To swap it, replace the file or point `hero.image` in both home files at a new image in `src/assets/`, then run `node scripts/og-image.mjs` to redraw the link preview image (`public/og-image.jpg`).

## Search engines and AI assistants

Nothing to maintain by hand: every page carries a description, canonical URL, `de`/`en` hreflang links and social preview tags (`src/layouts/BaseLayout.astro`); the home pages carry schema.org data built from `practice.ts` (`src/data/jsonld.ts`); `/robots.txt` (`src/pages/robots.txt.ts`) welcomes all crawlers and points to the sitemap; `/llms.txt` (`src/pages/llms.txt.ts`) gives AI assistants the practice in plain Markdown, generated from the same content files.

## Change the colours

The whole palette is in `src/styles/global.css`: the `bausch` theme block (primary, backgrounds, text, footer) and `--color-muted` under `@theme`. Each colour carries its contrast ratio in a comment. Keep every text colour at 4.5:1 or more against its background (WCAG AA); check with any contrast checker before committing.

## Deploy

Two branches, both built by `.github/workflows/deploy.yml` (official actions only):

| Branch | Role | What a push does |
|---|---|---|
| `main` | Staging: all work lands here | Builds the site as a check, publishes nothing |
| `production` | The live site, `https://psychotherapie-bausch.de` | Builds and publishes to GitHub Pages |

There is no staging URL: GitHub Pages serves one site per repository. Preview `main` locally instead:

```bash
npm run dev       # live-reloading preview on http://localhost:4321
npm run build && npm run preview   # the exact production build
```

To publish, fast-forward `production` to `main` and push:

```bash
git checkout production && git merge --ff-only main && git push && git checkout main
```

A run takes about a minute; follow it under the repo's Actions tab or with `gh run list`. Never commit on `production` directly, so the fast-forward always works.

### `SITE_URL` and `BASE_PATH`

The build targets `https://psychotherapie-bausch.de/` by default (`astro.config.mjs`). Two optional repository variables (Settings → Secrets and variables → Actions → Variables) override it, for example to build for another host or a sub-path. Any build whose host is not `psychotherapie-bausch.de` marks every page `noindex`. Internal links go through `import.meta.env.BASE_URL`, so they work under any base path.

## Principles

- No request reaches a third party without the visitor's action: fonts are self-hosted, there are no CDNs, no tracking and no maps.
- The old v1 URLs (`ueber_mich.html`, `kontakt.html`, …) keep working as redirect stubs (`src/pages/[legacy].ts`).
