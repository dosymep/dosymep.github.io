# CV — Personal Website

[English](README.md) · [Русский](README.ru.md)

A personal portfolio and resume built with Preact and Vite. The page includes an introduction, skills, work experience,
education, and social links, with English and Russian translations and light and dark themes.

Live website: [dosymep.net](https://dosymep.net) · [dosymep.github.io](https://dosymep.github.io)

The **Download resume** button opens the browser's print dialog, where the page can be printed or saved as a PDF.

## Getting started

Use Node.js 24 LTS (24.15 or later), matching `.nvmrc` and GitHub Actions. The Yarn 4 version is pinned
in the `packageManager` field of `package.json`. Dependencies use a standard `node_modules/` directory.

Install Corepack and enable Yarn:

```bash
npm install --global corepack@0.36.0
corepack enable yarn
```

From the repository root, install dependencies and start the development server:

```bash
yarn install --immutable
yarn dev
```

The install command uses the committed lockfile without changing it. After editing dependencies in `package.json`,
run `yarn install` to update `yarn.lock` and commit both files.

Open the local URL printed in the terminal. Vite reloads the page as source files change.

## Commands

| Command                            | Purpose                                      |
|------------------------------------|----------------------------------------------|
| `yarn dev`                         | Start the development server.                |
| `yarn build`                       | Create a production build in `public/`.      |
| `yarn preview`                     | Serve the existing production build locally. |
| `yarn test`                        | Run all tests once.                          |
| `yarn test:watch`                  | Rerun tests as files change.                 |
| `yarn test tests/settings.test.js` | Run the settings tests only.                 |

To preview the production site:

```bash
yarn build
yarn preview
```

The `public/` directory is generated and ignored by Git. Edit the source files to make changes to the website.

## Project structure

```text
.github/
  dependabot.yml         Dependency update configuration
  workflows/main.yml     Tests, build, and deployment
.nvmrc                   Node.js version used locally and in CI
.yarnrc.yml              Yarn settings and dependency metadata corrections
src/
  assets/                Static files copied to the build root
  components/            Page sections and shared UI components
  icons/                 SVG icons loaded as Preact components
  lib/                   Browser settings and SVG loading logic
  resources/
    translations.json    English and Russian page content
  style/                 Global styles and theme variables
  main.jsx               Application entry point
tests/                   Unit and component tests
index.html               HTML entry point
vite.config.js           Build, HTML localization, and test configuration
yarn.lock                Locked dependency versions
```

## Content and localization

Page text is stored in [`src/resources/translations.json`](src/resources/translations.json), under the `en` and `ru`
locale keys. Each locale contains these sections:

| Section    | Content                                                           |
|------------|-------------------------------------------------------------------|
| `page`     | Browser tab title.                                                |
| `header`   | Logo description, language switch label, and theme button labels. |
| `about`    | Introduction, name, biography, location, and resume button label. |
| `features` | Section headings, work experience, and education.                 |
| `skills`   | Skill names and expand/collapse button labels.                    |
| `social`   | Link tooltips and accessible labels.                              |
| `footer`   | Footer text.                                                      |

Edit the relevant values in both locales when updating content. Keep the same keys and corresponding list entries across
translations, and use unique labels within each skills list. Components receive the selected translation through
`content` in `SettingsContext`.

Switching languages updates the page content, image descriptions, link labels, document title, and the HTML `lang`
attribute. The initial HTML uses Russian metadata; the application applies the selected locale when it starts.

Adding another language also requires updating language detection and switching in [
`src/lib/settings.js`](src/lib/settings.js) and [
`src/components/settings/index.jsx`](src/components/settings/index.jsx), along with language button labels and tests.

Social link destinations are configured in [`src/components/social/index.jsx`](src/components/social/index.jsx). Static
images and the favicon are stored in `src/assets/`; SVG icons are stored in `src/icons/`.

## Language and theme preferences

On each page load, saved preferences take priority over browser settings. Without a saved choice:

- **Language:** the first supported language in `navigator.languages` is used. Regional variants such as `ru-RU` and
  `en-US` are matched to `ru` and `en`. If the language list is unavailable or empty, the application checks
  `navigator.language`. If no supported language is found, it uses English.
- **Theme:** `prefers-color-scheme` determines whether to use the dark theme. The fallback is the light theme.

Manual changes are saved in `localStorage` under the `settings` key, using named values:

```json
{
  "theme": "dark",
  "locale": "en"
}
```

Supported values are `light` or `dark` for `theme`, and `ru` or `en` for `locale`. Only manually selected preferences
are saved. Changing the theme leaves the language automatic, and changing the language leaves the theme automatic,
unless the other preference was already saved.

Automatic choices are recalculated on the next page load. Previously saved boolean settings (`dark` and `eng`) are
converted to the named format when the application starts. Invalid saved values fall back to browser preferences. If
storage is blocked, manual changes work for the current page session.

To reset both preferences, run this in the browser console for the website:

```js
localStorage.removeItem('settings')
location.reload()
```

## Testing

All tests are in [`tests/`](tests/). Vitest runs the suite, while Preact Testing Library and jsdom provide component
rendering and DOM interaction.

The suite covers:

- Browser preference detection, independent persistence, legacy settings, and unavailable storage.
- Language and theme switching, saved preferences, and page metadata.
- Expandable sections and skill lists, including language changes while expanded.
- Social link destinations and accessible labels.
- The resume button's call to the browser print dialog.
- SVG loading and icon replacement.
- Translation structure, nonempty text, and unique skill labels.

Shared browser defaults and cleanup are configured in `tests/setup.js`. Add new tests under `tests/` with a `.test.js`
or `.test.jsx` suffix. DOM tests cover behavior; check layout, appearance, and print output in a browser.

## Deployment and dependency updates

The [`main` workflow](.github/workflows/main.yml) tests and builds pull requests targeting `main`, pushes to `main`,
and manual runs. The build job uses Node.js from `.nvmrc`, Corepack, and `yarn install --immutable`, then
uploads
`public/` as an artifact. A separate deployment job downloads that artifact and publishes it to `gh-pages` only
for pushes to `main` and manual runs on `main`. Pull requests do not deploy. Repository write permission is limited
to the deployment job.

[`Dependabot`](.github/dependabot.yml) checks GitHub Actions and JavaScript dependencies every Wednesday. JavaScript
updates cover `package.json` and `yarn.lock`, including development dependencies. Updates are grouped separately by
ecosystem and target the `main` branch.
