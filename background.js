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

  const BADGE_ON  = { text: 'ON',  color: '#0f766e' };
  const BADGE_OFF = { text: 'OFF', color: '#6b7280' };

  async function renderState(enabled) {
    const badge = enabled ? BADGE_ON : BADGE_OFF;
    const icon  = enabled ? ICON_ON  : ICON_OFF;
    await browser.action.setIcon({ path: icon });
    await browser.action.setBadgeText({ text: badge.text });
    await browser.action.setBadgeBackgroundColor({ color: badge.color });
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
