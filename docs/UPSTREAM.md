# Upstream

## Base version

This repository started from a local unpacked copy of the official `Obsidian Web Clipper` browser extension, version `1.4.0`.

## Why keep the unpacked build here

The patched changes target the built extension files directly because the immediate goal was to get a working WeChat-formula fix quickly and verify it against real pages.

Keeping the unpacked build inside `extension/` makes the repository easy to load and test:

- clone repository
- load `extension/` in Chrome
- test on a WeChat article page

## Structure choice

The repository root is documentation-first for public sharing.

- `README.md` is the project entry point.
- `docs/` explains what changed and where it came from.
- `extension/` is the unpacked folder you actually load into Chrome.

## Caveat

If you later want a cleaner long-term public project, the next step would be replacing direct built-file edits with a reproducible patching workflow or source-based build pipeline.
