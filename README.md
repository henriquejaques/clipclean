# ClipClean

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/henriquejaques)

Browser extension (Firefox and Chrome) that cleans TryHackMe glossary buttons for better Obsidian clipping.

## Why

TryHackMe wraps key terms in interactive glossary `<button>` elements. When you copy room content (or clip it with Obsidian Web Clipper), those buttons break the text flow and produce messy Markdown. ClipClean unwraps them back to plain text, keeping the original content and formatting intact.

## Install

**Firefox Add-ons (AMO):** *Coming soon* — listing copy and reviewer notes live in [AMO.md](AMO.md).

**Manual / Dev (Firefox):**

1. Run `./build-firefox.sh`
2. Firefox → `about:debugging` → Load Temporary Add-on → select `build/firefox/manifest.json`

**Manual / Dev (Chrome):**

1. Run `./build-chrome.sh`
2. Chrome → `chrome://extensions` → enable Developer mode → Load unpacked → select `build/chrome/`

**Requirements:** Firefox **140+** (Gecko minimum for `data_collection_permissions` on desktop; works on **Waterfox 140**—see [AMO.md](AMO.md)) and modern Chrome/Chromium (Manifest V3).

## How it works

- Toggle the switch in the popup to enable/disable auto-cleaning
- When enabled, glossary buttons matching `button[data-testid="glossary-term"]` inside `#room_content` are unwrapped automatically — including dynamic content loaded after the page renders
- Optional: use the **Task reader** toggle in the popup on a room tab to show a temporary expanded tasks view; toggle off to restore the accordion (per-tab, manual)
- The toolbar icon switches between the **primary** (on) and **secondary** (off) icon assets to show the current state
- Turning it off stops future cleaning; reload the page to restore original buttons

## Testing

- Install test dependencies: `npm ci`
- Run full cross-browser tests: `npm test`
- Run a single browser: `npm run test:chromium` or `npm run test:firefox`

## Privacy

Local storage only. No network requests, tracking, or data collection. See [PRIVACY.md](PRIVACY.md).

Not affiliated with TryHackMe.

## Support

If this project helps you, you can [buy me a coffee on Ko-fi](https://ko-fi.com/henriquejaques).

## Changelog

Release notes and version history: [CHANGELOG.md](CHANGELOG.md). GitHub [Releases](https://github.com/henriquejaques/clipclean/releases) include signed-off builds (`clipclean-firefox.zip` and `clipclean-chrome.zip`) when published.

## License

[MIT](LICENSE)
