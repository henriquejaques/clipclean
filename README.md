# ClipClean

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/henriquejaques)

Firefox extension that cleans TryHackMe glossary buttons for better Obsidian clipping.

## Why

TryHackMe wraps key terms in interactive glossary `<button>` elements. When you copy room content (or clip it with Obsidian Web Clipper), those buttons break the text flow and produce messy Markdown. ClipClean unwraps them back to plain text, keeping the original content and formatting intact.

## Install

**Firefox Add-ons (AMO):** *Coming soon* — listing copy and reviewer notes live in [AMO.md](AMO.md).

**Manual / Dev:**
Firefox → `about:debugging` → Load Temporary Add-on → select `manifest.json`

**Requirements:** Firefox **109+** (Manifest V3; see `strict_min_version` in `manifest.json`).

## How it works

- Toggle the switch in the popup to enable/disable auto-cleaning
- When enabled, glossary buttons matching `button[data-testid="glossary-term"]` inside `#room_content` are unwrapped automatically — including dynamic content loaded after the page renders
- The toolbar icon switches between the **primary** (on) and **secondary** (off) icon assets to show the current state
- Turning it off stops future cleaning; reload the page to restore original buttons

## Privacy

Local storage only. No network requests, tracking, or data collection. See [PRIVACY.md](PRIVACY.md).

Not affiliated with TryHackMe.

## Support

If this project helps you, you can [buy me a coffee on Ko-fi](https://ko-fi.com/henriquejaques).

## License

[MIT](LICENSE)
