# Obsidian Web Clipper Patched

Patched unpacked build of `Obsidian Web Clipper 1.4.0` with improved formula capture for WeChat Official Account articles.

## Why this repo exists

The stock clipper often drops formulas on `mp.weixin.qq.com` pages because many formulas are rendered as nested SVG but stored in `data-formula` attributes.

This patched build adds a WeChat-specific preprocessing step so formulas are converted into LaTeX-friendly nodes before the existing extraction pipeline turns the page into Markdown.

## Quick start

1. Clone this repository.
2. Open `chrome://extensions`.
3. Enable `Developer mode`.
4. Click `Load unpacked`.
5. Select the `extension/` folder from this repository.

## Repo layout

```text
.
├── README.md
├── docs/
│   ├── PATCHES.md
│   └── UPSTREAM.md
└── extension/
    ├── manifest.json
    ├── content.js
    ├── wechat-formula-preprocess.js
    └── ...
```

## What is patched

- `extension/manifest.json`
  Loads an extra content script for WeChat formula preprocessing.
- `extension/wechat-formula-preprocess.js`
  Marks `data-formula` nodes so the clipper can treat them as math.
- `extension/content.js`
  Rewrites WeChat formula nodes inside a cloned extraction document before Defuddle runs.

Detailed notes live in [docs/PATCHES.md](docs/PATCHES.md).

## Notes

- Load the `extension/` folder, not the repository root.
- This build uses a separate local extension identity, so it should not replace the Chrome Web Store install.
- The repository currently contains a patched unpacked build for convenience. See [docs/UPSTREAM.md](docs/UPSTREAM.md) for source notes.
