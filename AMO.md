# AMO listing copy (ClipClean for TryHackMe)

Use the sections below in [Firefox Add-ons Developer Hub](https://addons.mozilla.org/developers/). Manifest `strict_min_version` is **109.0** (MV3); keep AMO “Supported versions” aligned with that floor.

## Homepage

https://github.com/henriquejaques/clipclean

## Support email

henriquemjaques@gmail.com

## Support site (issues)

https://github.com/henriquejaques/clipclean/issues

## Compatibility

**Desktop Firefox only.** In the listing’s compatibility controls, **do not** mark the add-on as compatible with Firefox for Android unless you have explicitly tested it there.

---

## Summary (short description)

Same intent as `manifest.json` `description`; adjust length to fit AMO’s summary field if needed:

> Toggle cleanup of TryHackMe glossary buttons so captured notes keep the text and formatting.

---

## Full description (for the listing)

**What it does**

TryHackMe wraps many terms in interactive glossary `<button>` elements. When you copy room text or clip a page (for example with Obsidian Web Clipper), those buttons break reading flow and produce awkward Markdown. ClipClean unwraps those glossary controls back into normal text so what you copy matches what you read, with structure and formatting preserved where possible.

**How to use it**

1. Install the extension and open any TryHackMe room: `https://tryhackme.com/room/...`
2. Click the toolbar icon. Use the switch to turn cleaning **on** or **off**.
3. With cleaning **on**, glossary buttons (`button[data-testid="glossary-term"]`) inside `#room_content` are unwrapped automatically, including content loaded after the page first renders.
4. The toolbar icon uses the **primary** asset when cleaning is on and the **secondary** asset when it is off (distinct on/off states).
5. Turning cleaning off stops further changes; **reload the room** if you want the original glossary buttons back.

**Privacy**

Everything runs locally in your browser. Only your on/off preference is stored (`browser.storage.local`). The extension is scoped to `https://tryhackme.com/room/*`. It does not send data to external servers, analytics, or trackers. Details: [PRIVACY.md](PRIVACY.md) in the repository.

**Notice**

Not affiliated with or endorsed by TryHackMe.

---

## Suggested tags

`tryhackme` · `cybersecurity` · `notes` · `clipboard` · `markdown` · `education`

*(Pick the subset AMO allows.)*

## Suggested categories

Choose what best fits AMO’s category list (e.g. **Tabs** or **Web Development** if nothing else fits; “security learning” often maps imperfectly—use the closest honest category).

---

## Notes to reviewers

**Account:** Verification requires a **TryHackMe account** (free tier is enough). Sign in at https://tryhackme.com — you can test in **any** room after logging in.

**Steps:**

1. Install the add-on and ensure cleaning is **on** (toolbar **primary** icon; popup switch enabled).
2. Open a room URL, e.g. `https://tryhackme.com/room/<room-name>` (any public or enrolled room you can access).
3. In the main room task/content area, find terms that appear as glossary **buttons** (hover/tooltip behavior is optional to check).
4. With cleaning **on**, those controls should be replaced by plain text in the DOM (buttons no longer wrapping those terms in `#room_content`).
5. Toggle cleaning **off** in the popup, **reload** the page — glossary buttons should return.
6. Copy a paragraph of room text (or use your clipper) and confirm copied text reads naturally without stray button artifacts when cleaning was on before copy.

**Login:** Some rooms or actions may require login; the extension only matches `https://tryhackme.com/room/*` and does not handle authentication beyond normal page use.
