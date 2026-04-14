# Obsidian Web Clipper Patched

This is a local patched copy of `Obsidian Web Clipper 1.4.0`.

## What changed

- Added `wechat-formula-preprocess.js`
- Registered it in `manifest.json` as an extra content script
- The script targets `mp.weixin.qq.com` article pages and injects off-screen LaTeX fallback text for nodes with `data-formula`

## Why

The stock clipper loses formulas from WeChat Official Account articles because many formulas are stored as:

- `span[data-formula="..."]`
- nested inline SVG for display

The fallback text makes the existing extractor and Markdown conversion pipeline see:

- inline math as `$...$`
- block math as `$$...$$`

without visibly changing the page.

## How to load it

1. Open `chrome://extensions`
2. Enable `Developer mode`
3. Click `Load unpacked`
4. Select this folder:

```text
/Users/yijunrong/Library/CloudStorage/OneDrive-个人/数学笔记/tools/obsidian-web-clipper-patched
```

## Notes

- This is safer than editing the Chrome Web Store installed copy directly.
- Chrome Web Store auto-updates will not preserve local patches.
- This patch is aimed at WeChat articles that expose formulas via `data-formula`.
- The manifest now uses a separate local identity, so it should not override the Chrome Web Store version when loaded unpacked.
