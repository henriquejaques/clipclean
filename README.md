# ClipClean

Firefox extension that cleans TryHackMe glossary buttons for better Obsidian clipping.

## Why

TryHackMe wraps key terms in interactive glossary `<button>` elements. When you copy room content (or clip it with Obsidian Web Clipper), those buttons break the text flow and produce messy Markdown. ClipClean unwraps them back to plain text, keeping the original content and formatting intact.

## Install

**Firefox Add-ons (AMO):** *Coming soon*

**Manual / Dev:**
Firefox → `about:debugging` → Load Temporary Add-on → select `manifest.json`

## How it works

- Toggle the switch in the popup to enable/disable auto-cleaning
- When enabled, glossary buttons inside `#room_content` are unwrapped automatically — including dynamic content loaded after the page renders
- The toolbar icon changes between green (on) and gray (off) to show the current state
- Turning it off stops future cleaning; reload the page to restore original buttons

## Privacy

Local storage only. No network requests, tracking, or data collection. See [PRIVACY.md](PRIVACY.md).

Not affiliated with TryHackMe.

## License

[MIT](LICENSE)
