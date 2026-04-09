# Changelog

All notable changes to **ClipClean for TryHackMe** are documented in this file.

The format is inspired by [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for extension releases (aligned with manifest versions).

## [1.5.0] - 2026-04-09

### Added

- Task Reader Mode (manual popup toggle): builds a temporary expanded task view for the current room tab and can restore the original task view.
- Chrome Web Store support with dedicated Chrome manifest (`manifest.chrome.json`) and package build script (`build-chrome.sh`).
- 128x128 icon support in manifests for store requirements.
- `CHROME_STORE.md` with listing copy, privacy declarations, and reviewer testing guidance.
- `TODO.md` to track future work.
- Playwright regression test suite for glossary cleanup and Task Reader Mode messaging behavior.
- GitHub Actions workflow to run tests on Chromium and Firefox for pushes and pull requests.

### Changed

- Switched to per-browser manifest sources: `manifest.firefox.json` and `manifest.chrome.json`.
- Updated build flow to generate isolated browser build folders (`build/firefox`, `build/chrome`) and zip artifacts (`clipclean-firefox.zip`, `clipclean-chrome.zip`).
- Updated extension description and docs to reflect both glossary cleanup and Task Reader Mode.
- Added explicit browser-environment detection in runtime scripts for shared Firefox/Chrome code paths.
- `AMO.md`, `CHROME_STORE.md`, and README describe **Task reader** as a popup toggle (on/off, room tab only).

### Fixed

- Firefox: `strict_min_version` **140.0** so `data_collection_permissions` is valid on desktop Gecko (Firefox **140+**) and compatible with **Waterfox 140**, without raising the floor to **142** (required only for the same key on Firefox for Android).
- Task Reader UI: headings built with `createElement` and `textContent` instead of `innerHTML` for automated review (“unsafe assignment to innerHTML”).

## [1.4.1] - 2026-04-05

### Fixed

- AMO / Firefox: declare `browser_specific_settings.gecko.data_collection_permissions` with `required: ["none"]` so the add-on satisfies Mozilla’s built-in data collection consent requirement for new submissions.

### Changed

- `PRIVACY.md`: note the manifest data-collection declaration and link to Mozilla’s documentation.

### Added

- `CHANGELOG.md` (this file).

## [1.4.0] - 2026-04-03

### Added

- Firefox **Manifest V3** extension scoped to `https://tryhackme.com/room/*`.
- Content script unwraps TryHackMe glossary controls matching `button[data-testid="glossary-term"]` inside `#room_content`, including content added after load (`MutationObserver`).
- Popup toggle for auto-clean; state persisted with `browser.storage.local`.
- Toolbar icon reflects on/off state (primary vs secondary artwork).
- `strict_min_version` **109.0** for MV3 baseline compatibility.
- `AMO.md` listing and reviewer copy; README and `PRIVACY.md` aligned with behavior.
- Ko-fi sponsor link and `.github/FUNDING.yml` for the GitHub **Sponsor** button.

## Earlier development

- **2026-04-03:** Initial implementation, docs, license, and tooling (e.g. `build.sh` for `clipclean.zip`).
