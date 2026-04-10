# Chrome Web Store submission template

Purpose: this file is a concise, paste-ready checklist for Chrome Web Store submission and updates.

## Build

### Status

- N/A

### Package

- N/A

## Store Listing

### Title

- From `manifest.chrome.json` `name`: `ClipClean for TryHackMe`

### Summary

- From `manifest.chrome.json` `description`: `Clean TryHackMe glossary buttons and enable Task Reader Mode for easier note-taking and clipping.`

### Description

Use this paste-ready description (focused on what it does and why install):

ClipClean improves TryHackMe room pages for note-taking and clipping.

TryHackMe wraps many terms in interactive glossary buttons. Those controls can make copied text and clipped Markdown harder to read. ClipClean automatically unwraps those glossary controls into normal text so copied room content stays cleaner.

ClipClean also provides optional Task Reader Mode. On a TryHackMe room tab, toggle it on in the popup to build a temporary expanded task view above the original accordion. Toggle it off to restore the original task view.

Everything runs locally in the browser. No tracking or analytics.

### Category

- `Functionality & UI` (chosen value)

### Language

- English

### Store icon

- Use primary icon asset (`128x128`) from extension icons

### Global promo video

- N/A

### Screenshots

- Required: at least 1
- Format: JPEG or 24-bit PNG (no alpha)
- Size: `1280x800` or `640x400`
- Recommended max: up to 5
- Source folder: `screenshots/` (create/fill before submission)

### Small promo tile

- Optional
- Size: `440x280`
- Format: JPEG or 24-bit PNG (no alpha)

### Marquee promo tile

- Optional
- Size: `1400x560`
- Format: JPEG or 24-bit PNG (no alpha)

### Official URL

- N/A

### Homepage URL

- `https://github.com/henriquejaques/clipclean`

### Support URL

- `https://github.com/henriquejaques/clipclean/issues`

### Mature content

- No

## Privacy

Policy reference: [Chrome Web Store Program Policies](https://developer.chrome.com/webstore/program_policies)

### Single purpose

ClipClean improves TryHackMe room pages for note-taking and clipping by removing glossary button wrappers and offering manual Task Reader Mode.

### Permission justifications

- `storage`: stores the Auto-clean on/off preference locally.
- `tabs`: checks whether the active tab is a TryHackMe room and sends Task Reader Mode messages to that tab.
- `host_permissions` (`https://tryhackme.com/room/*`): limits script execution to TryHackMe room pages only.

### Remote code

- No, this extension does not use remote code.

### User data collection

- None. Leave collection categories unselected if the form allows.

### Certification disclosures

- Yes, confirm all applicable disclosures:
  - do not sell or transfer user data to third parties outside approved use cases
  - do not use or transfer user data for unrelated purposes
  - do not use or transfer user data for creditworthiness/lending

### Privacy policy URL

- `https://github.com/henriquejaques/clipclean/blob/main/PRIVACY.md`

## Distribution

- Payments: Free of charge
- Visibility: Public
- Regions: All regions

## Access

### Test Instructions

### Credentials

- Username: `fpxzojbynrtedzgrdx@nespj.com`
- Password: `Qwaszx12!`

### Additional instructions

Reviewer testing requires login to TryHackMe. After login:

1. Install extension and open `https://tryhackme.com/room/<room-name>`.
2. Turn Auto-clean on in popup.
3. Confirm glossary buttons in `#room_content` are replaced by plain text.
4. Turn Task Reader Mode on.
5. Confirm expanded tasks view appears and original task container is hidden.
6. Turn Task Reader Mode off and confirm original task view returns.
7. Turn Auto-clean off, reload room, and confirm glossary buttons return.

## Chrome Store update flow

No update submitted yet. For future version updates:

1. Bump manifest version.
2. Build package.
3. Update listing text only if feature behavior changed.
4. Paste release notes from `CHANGELOG.md`.
5. Re-validate privacy answers if permissions or data behavior changed.
