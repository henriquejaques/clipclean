(() => {
  const STORAGE_KEY = 'enabled';
  const ROOM_SELECTOR = '#room_content';
  const BUTTON_SELECTOR = 'button[data-testid="glossary-term"]';
  let enabled = true;
  let observer = null;

  async function loadEnabled() {
    try {
      const stored = await browser.storage.local.get(STORAGE_KEY);
      enabled = stored[STORAGE_KEY] !== false;
    } catch (_) {
      enabled = true;
    }
  }

  function unwrapGlossaryButtons(root = document) {
    if (!enabled) return;

    const room = root.querySelector?.(ROOM_SELECTOR) || document.querySelector(ROOM_SELECTOR);
    if (!room) return;

    const buttons = room.querySelectorAll(BUTTON_SELECTOR);
    for (const button of buttons) {
      if (!button.isConnected) continue;
      const fragment = document.createDocumentFragment();
      while (button.firstChild) {
        fragment.appendChild(button.firstChild);
      }
      button.replaceWith(fragment);
    }
  }

  function startObserver() {
    if (observer) observer.disconnect();

    observer = new MutationObserver((mutations) => {
      if (!enabled) return;
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;

          if (node.matches?.(BUTTON_SELECTOR) || node.querySelector?.(BUTTON_SELECTOR) || node.id === 'room_content' || node.querySelector?.(ROOM_SELECTOR)) {
            unwrapGlossaryButtons(document);
            return;
          }
        }
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  function watchStorage() {
    browser.storage.onChanged.addListener((changes, area) => {
      if (area !== 'local' || !changes[STORAGE_KEY]) return;
      enabled = changes[STORAGE_KEY].newValue !== false;
      if (enabled) {
        unwrapGlossaryButtons(document);
      }
    });
  }

  async function init() {
    await loadEnabled();
    unwrapGlossaryButtons(document);
    startObserver();
    watchStorage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
