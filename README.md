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

**Practice facts** – addresses, weekdays, billing options, phone, email, coordinates – live only in `src/data/practice.ts`. The location cards, the footer, the contact box and the search-engine data (JSON-LD) all read from there, so a new phone number or a changed billing option is one edit. Add a location there and give it a sentence in both `standorte`/`locations` files.

Paragraphs in the legal pages marked `<mark class="review">…</mark>` are awaiting Paul's review; delete the marker once he confirms the text.

**Photo**: the portrait is `src/assets/Portrait_cutout.png` (a transparent cut-out). To swap it, replace the file or point `hero.image` in both home files at a new image in `src/assets/`.

## Change the colours

The whole palette is in `src/styles/global.css`: the `bausch` theme block (primary, backgrounds, text, footer) and `--color-muted` under `@theme`. Each colour carries its contrast ratio in a comment. Keep every text colour at 4.5:1 or more against its background (WCAG AA); check with any contrast checker before committing.

## Deploy

Every push to `main` builds and publishes the site to GitHub Pages (`.github/workflows/deploy.yml`, official actions only). The run takes about a minute; follow it under the repo's Actions tab or with `gh run list`.

### Staging vs. the real domain: `SITE_URL` and `BASE_PATH`

The same code builds for the staging URL and for the custom domain. Two repository variables (Settings → Secrets and variables → Actions → Variables) select which:

| | `SITE_URL` | `BASE_PATH` |
|---|---|---|
| Staging | `https://metzelfetz.github.io` | `/psychotherapie-bausch/` |
| Custom domain | `https://psychotherapie-bausch.de` | `/` (or leave unset) |

Without them the build defaults to the custom domain (`astro.config.mjs`). Any build whose host is not `psychotherapie-bausch.de` marks every page `noindex`, so staging never shows up in search engines. Internal links go through `import.meta.env.BASE_URL`, so they work under both.

## Principles

- No request reaches a third party without the visitor's action: fonts are self-hosted, there are no CDNs, no tracking and no maps.
- The old v1 URLs (`ueber_mich.html`, `kontakt.html`, …) keep working as redirect stubs (`src/pages/[legacy].ts`).
