# ClipClean

A minimal Firefox extension for cleaning TryHackMe room pages before clipping to Obsidian (or similar).

## What it does
Removes glossary button wrappers (`button[data-testid="glossary-term"]`) inside `#room_content`, keeping text and formatting intact for clean Markdown.

## Features
- Popup toggle (on/off, persists locally)
- Handles dynamic/SPA content (MutationObserver)
- Light/dark mode aware popup
- Narrow, simple UI
- Firefox-first WebExtension
- Local-only: no tracking, no remote calls

## Status
- Works on TryHackMe room pages
- Idempotent (safe to run repeatedly)

## Limitations
- Disabling stops future unwrapping but doesn't restore already-cleaned buttons (reload page)

## Install (development)
1. Clone this repo
2. Firefox: `about:debugging#/runtime/this-firefox` → "Load Temporary Add-on" → select `manifest.json`

## Next priorities
- "Clean now" button
- Reversible disable (without reload)
- Toolbar badge for state
- Fallback selectors (DOM changes)
- Multi-room testing
- Icons & packaging
- Chrome compat (later)

## Privacy & Affiliation
- **Local only**: state in browser storage, nothing sent anywhere
- **No affiliation** with TryHackMe
- Minimal permissions: storage + tryhackme.com access

Built with ❤️ for clean notes.
