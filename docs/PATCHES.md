# Patches

## Goal

Preserve formulas when clipping WeChat Official Account articles from `mp.weixin.qq.com` into Obsidian Markdown.

## Patch summary

### 1. Extra WeChat content script

File: `extension/wechat-formula-preprocess.js`

- Runs only on `mp.weixin.qq.com` article pages.
- Finds top-level nodes with `data-formula`.
- Copies the LaTeX string into `data-latex`.
- Marks nodes with classes that the clipper's existing math rules already understand.

### 2. Extraction-document rewrite

File: `extension/content.js`

- Before Defuddle parses the page, the code clones the current document for extraction.
- In the cloned document, each top-level `data-formula` node is replaced with a synthetic math node.
- Inline formulas become span-like math nodes.
- Block formulas become div-like math nodes with block-display hints.

This avoids depending on the live page layout and keeps the WeChat fix scoped to extraction.

### 3. Manifest registration

File: `extension/manifest.json`

- Adds `wechat-formula-preprocess.js` to the content-script list.
- Keeps the patched build as a separate local extension identity.

## Manual test flow

1. Reload the unpacked extension in `chrome://extensions`.
2. Refresh a WeChat article page that contains formulas.
3. Use the patched clipper to clip the page.
4. Confirm formulas appear in the generated Markdown as LaTeX instead of disappearing.
