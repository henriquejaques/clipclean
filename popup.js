(() => {
  const STORAGE_KEY = 'enabled';
  const toggle = document.getElementById('enabledToggle');
  const status = document.getElementById('status');

  function renderStatus(enabled) {
    status.textContent = '';
    if (enabled) {
      const strong = document.createElement('strong');
      strong.textContent = 'On.';
      status.appendChild(strong);
      status.appendChild(document.createTextNode(' Glossary buttons removed automatically.'));
    } else {
      status.textContent = 'Off. Reload room pages to restore buttons.';
    }
  }

  async function init() {
    try {
      const stored = await browser.storage.local.get(STORAGE_KEY);
      const enabled = stored[STORAGE_KEY] !== false;
      toggle.checked = enabled;
      renderStatus(enabled);
    } catch (err) {
      console.warn('ClipClean:', err);
      status.textContent = 'Error: ' + err.message;
    }
  }

  toggle.addEventListener('change', async () => {
    const enabled = toggle.checked;
    try {
      await browser.storage.local.set({ [STORAGE_KEY]: enabled });
      renderStatus(enabled);
    } catch (err) {
      console.warn('ClipClean:', err);
      toggle.checked = !enabled;
      renderStatus(!enabled);
    }
  });

  init();
})();
