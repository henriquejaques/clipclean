const STORAGE_KEY = 'enabled';
const toggle = document.getElementById('enabledToggle');
const status = document.getElementById('status');

function renderStatus(enabled) {
  status.innerHTML = enabled
    ? '<strong>On.</strong> Reload open room pages if needed.'
    : 'Off.';
}

async function init() {
  const stored = await browser.storage.local.get(STORAGE_KEY);
  const enabled = stored[STORAGE_KEY] !== false;
  toggle.checked = enabled;
  renderStatus(enabled);
}

toggle.addEventListener('change', async () => {
  const enabled = toggle.checked;
  await browser.storage.local.set({ [STORAGE_KEY]: enabled });
  renderStatus(enabled);
});

init().catch(err => {
  status.textContent = `Error: ${err.message}`;
});
