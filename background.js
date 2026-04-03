(() => {
  const STORAGE_KEY = 'enabled';

  const BADGE_ON  = { text: 'ON',  color: '#0f766e' };
  const BADGE_OFF = { text: 'OFF', color: '#6b7280' };

  function getBadgeState(enabled) {
    return enabled ? BADGE_ON : BADGE_OFF;
  }

  async function renderBadge(enabled) {
    const state = getBadgeState(enabled);
    await browser.browserAction.setBadgeText({ text: state.text });
    await browser.browserAction.setBadgeBackgroundColor({ color: state.color });
  }

  async function loadAndRenderBadge() {
    try {
      const stored = await browser.storage.local.get(STORAGE_KEY);
      const enabled = stored[STORAGE_KEY] !== false;
      await renderBadge(enabled);
    } catch (_) {
      await renderBadge(true);
    }
  }

  browser.runtime.onInstalled.addListener(loadAndRenderBadge);
  browser.runtime.onStartup.addListener(loadAndRenderBadge);

  browser.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local' || !changes[STORAGE_KEY]) return;
    const enabled = changes[STORAGE_KEY].newValue !== false;
    renderBadge(enabled);
  });
})();
