(() => {
  const STORAGE_KEY = 'enabled';
  const ROOM_SELECTOR = '#room_content';
  const BUTTON_SELECTOR = 'button[data-testid="glossary-term"]';
  let enabled = true;
  let observer = null;
  let running = false;

  async function loadEnabled() {
    try {
      const stored = await browser.storage.local.get(STORAGE_KEY);
      enabled = stored[STORAGE_KEY] !== false;
    } catch (err) {
      console.warn('ClipClean:', err);
      enabled = true;
    }
  }

  function unwrapGlossaryButtons() {
    if (!enabled || running) return;
    running = true;
    try {
      const room = document.querySelector(ROOM_SELECTOR);
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
    } finally {
      running = false;
    }
  }

  function startObserver() {
    if (observer) observer.disconnect();

    const target = document.querySelector(ROOM_SELECTOR) || document.documentElement;

    observer = new MutationObserver((mutations) => {
      if (!enabled) return;
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;

          if (node.matches?.(BUTTON_SELECTOR) || node.querySelector?.(BUTTON_SELECTOR) || node.id === 'room_content' || node.querySelector?.(ROOM_SELECTOR)) {
            unwrapGlossaryButtons();
            return;
          }
        }
      }
    });

    observer.observe(target, {
      childList: true,
      subtree: true
    });
  }

  function watchStorage() {
    browser.storage.onChanged.addListener((changes, area) => {
      if (area !== 'local' || !changes[STORAGE_KEY]) return;
      enabled = changes[STORAGE_KEY].newValue !== false;
      if (enabled) {
        unwrapGlossaryButtons();
      }
    });
  }

  async function init() {
    await loadEnabled();
    unwrapGlossaryButtons();
    startObserver();
    watchStorage();
  }

  init();
})();
