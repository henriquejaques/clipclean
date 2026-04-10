# AMO submission template

Purpose: this file is a concise, paste-ready checklist for AMO submission and updates.

## Core listing fields

### Homepage

- `https://github.com/henriquejaques/clipclean`

### Support email

- `henriquemjaques@gmail.com`

### Support site

- `https://github.com/henriquejaques/clipclean/issues`

### Compatibility

- Desktop Firefox only
- AMO compatibility: tick Firefox
- Keep Gecko `strict_min_version` aligned with `manifest.firefox.json` (`140.0`)

### Summary (short description)

- From manifest description: `Clean TryHackMe glossary buttons and enable Task Reader Mode for easier note-taking and clipping.`

### Full description

ClipClean improves TryHackMe room pages for note-taking and clipping.

TryHackMe wraps many terms in interactive glossary buttons. Those controls can make copied text and clipped Markdown harder to read. ClipClean automatically unwraps those glossary controls into normal text so copied room content stays cleaner.

ClipClean also provides optional Task Reader Mode. On a TryHackMe room tab, toggle it on in the popup to build a temporary expanded task view above the original accordion. Toggle it off to restore the original task view.

Everything runs locally in the browser. No tracking or analytics.

### Suggested tags

- `tryhackme`, `cybersecurity`, `notes`, `clipboard`, `markdown`, `education`

### Suggested category

- Use closest AMO fit (typically `Tabs` or `Web Development`)

## AMO new submission flow

1. How to distribute this version: `On this site`
2. Upload file: `clipclean-firefox.zip`
3. Applications compatibility: tick Firefox
4. Release notes: copy from `CHANGELOG.md` for the target version
5. Notes to reviewer: paste section below

## AMO update flow

1. Upload new package
2. Applications compatibility: tick Firefox
3. Release notes: copy from `CHANGELOG.md` for the new version
4. Notes to reviewer: paste section below (refresh only if behavior changed)

## Notes to reviewer (paste-ready)

Test account for TryHackMe:

- Username: `fpxzojbynrtedzgrdx@nespj.com`
- Password: `Qwaszx12!`

Reviewer steps:

1. Install the add-on and open `https://tryhackme.com/room/<room-name>`.
2. Ensure Auto-clean is on in the popup.
3. Confirm glossary `button[data-testid="glossary-term"]` elements in `#room_content` are replaced by plain text.
4. Enable Task Reader Mode in popup and confirm expanded tasks view appears while original task container is hidden.
5. Disable Task Reader Mode and confirm original task view returns.
6. Turn Auto-clean off, reload room, and confirm glossary buttons return.

Notes:

- Extension scope is `https://tryhackme.com/room/*`.
- Not affiliated with TryHackMe.
