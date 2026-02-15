# Dev instructions

Install the dependencies:

``` shell
npm install
```

If you want to start the dev server:

``` shell
npm run dev
```

If you want to build it for production:

``` shell
npm run build
```

If you want to preview a build:

``` shell
npm run preview
```

# Analytics (Umami)

This app uses [Umami Cloud](https://cloud.umami.is/) for lightweight, privacy-focused analytics.

- Website script: `https://cloud.umami.is/script.js`
- Website ID: `a186d7bd-e0b7-40c2-9c6c-c6a46fa78d38`
- Tracked custom events (namespaced):
  - `memory-cards:game_started`
  - `memory-cards:recall_started`
  - `memory-cards:game_completed`

No high-frequency interaction events are tracked.

# Credits

Font used is [VG5000](https://velvetyne.fr/fonts/vg5000/) by [Justin Bihan](https://velvetyne.fr/authors/justin-bihan/).

Card assets: https://pl.wikipedia.org/wiki/Wikipedysta:ToasterCoder/Pasjans

Favicon: https://feathericons.com

Form controls are based on:
- https://moderncss.dev/custom-css-styles-for-form-inputs-and-textareas/
- https://moderncss.dev/pure-css-custom-checkbox-style/
- https://moderncss.dev/custom-select-styles-with-pure-css/
