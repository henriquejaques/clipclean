# Changelog

All notable changes to **ClipClean for TryHackMe** are documented in this file.

The format is inspired by [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) for extension releases (aligned with `manifest.json` `version`).

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
