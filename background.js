(() => {
  const STORAGE_KEY = 'enabled';

  const ICON_ON = {
    48: 'icons/clipclean_48x48_primary.png',
    96: 'icons/clipclean_96x96_primary.png'
  };
  const ICON_OFF = {
    48: 'icons/clipclean_48x48_secondary.png',
    96: 'icons/clipclean_96x96_secondary.png'
  };

  async function renderState(enabled) {
    const icon = enabled ? ICON_ON : ICON_OFF;
    await browser.action.setIcon({ path: icon });
    await browser.action.setBadgeText({ text: '' });
  }

  async function loadAndRender() {
    try {
      const stored = await browser.storage.local.get(STORAGE_KEY);
      const enabled = stored[STORAGE_KEY] !== false;
      await renderState(enabled);
    } catch (err) {
      console.warn('ClipClean:', err);
      await renderState(true);
    }
  }

  browser.runtime.onInstalled.addListener(loadAndRender);
  browser.runtime.onStartup.addListener(loadAndRender);

  browser.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local' || !changes[STORAGE_KEY]) return;
    const enabled = changes[STORAGE_KEY].newValue !== false;
    renderState(enabled);
  });
})();
