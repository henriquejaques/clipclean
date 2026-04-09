# Chrome Web Store listing copy (ClipClean for TryHackMe)

Use this document when completing the Chrome Web Store Developer Dashboard fields.

## Store Listing

### Name

ClipClean for TryHackMe

### Short description

Clean TryHackMe glossary buttons and expand all room tasks for better note-taking and clipping.

### Full description

**What it does**

TryHackMe wraps many terms in interactive glossary `<button>` elements. When you copy room text or clip a page (for example with Obsidian Web Clipper), those buttons can break reading flow and produce awkward Markdown. ClipClean unwraps those glossary controls back into normal text so what you copy matches what you read.

ClipClean also includes an optional **Task reader** toggle in the popup (only when the active tab is a TryHackMe room). Turn it **on** to build a temporary expanded task view above the original task accordion and hide the original task container; turn it **off** to restore the normal accordion. The popup may show how many tasks were expanded.

**How to use it**

1. Open any TryHackMe room: `https://tryhackme.com/room/...`
2. Click the extension icon and turn Auto-clean on/off.
3. With Auto-clean on, glossary buttons (`button[data-testid="glossary-term"]`) in `#room_content` are unwrapped automatically, including dynamically loaded content.
4. Optional: on a room tab, turn **Task reader** **on** in the popup for a temporary expanded task view; turn it **off** to restore the original accordion.
5. Turn Auto-clean off and reload the page if you want to restore original glossary buttons.

**Privacy**

Everything runs locally in your browser. The extension stores only local preferences (`storage`) and does not send data to external servers, analytics, or trackers.

**Notice**

Not affiliated with or endorsed by TryHackMe.

### Category

Productivity

### Language

English

### URLs

- Homepage URL: https://github.com/henriquejaques/clipclean
- Support URL: https://github.com/henriquejaques/clipclean/issues
- Privacy policy URL: https://github.com/henriquejaques/clipclean/blob/main/PRIVACY.md

## Privacy tab

### Single purpose description

Cleans TryHackMe glossary button elements and provides a task reader view so room content copies cleanly into notes.

### Permission justifications

- `storage`: Persists the user's on/off preference for automatic glossary cleanup.
- `tabs`: Detects whether the active tab is a TryHackMe room and sends Task reader (Task Reader Mode) on/off messages to that tab.
- `host_permissions` (`https://tryhackme.com/room/*`): Limits content script execution to TryHackMe room pages.

### Remote code

No, this extension does not use remote code.

### Data usage

The extension does not collect, transmit, or sell user data.

## Distribution tab

- Visibility: Public
- Regions: All regions

## Test instructions

Reviewer testing requires a free TryHackMe account.

1. Install the extension and open a room URL: `https://tryhackme.com/room/<room-name>`.
2. Turn Auto-clean on in the popup.
3. Confirm glossary buttons in `#room_content` are replaced by plain text.
4. Turn **Task reader** **on** in the popup.
5. Confirm expanded task content appears above the original accordion and original task container is hidden.
6. Turn **Task reader** **off** and confirm the original task view returns.
7. Turn Auto-clean off, reload the room, and confirm glossary buttons appear again.

## Screenshot guidance

Chrome Web Store requires at least one screenshot in `1280x800` or `640x400`.

Recommended:

1. Browser viewport showing a TryHackMe room with the extension popup open (both toggles visible).
2. TryHackMe room with Task Reader Mode active (expanded task view visible).
3. Optional: before/after state for glossary cleanup off vs on.
