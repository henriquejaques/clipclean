const STORAGE_KEY = 'enabled';
const toggle = document.getElementById('enabledToggle');
const status = document.getElementById('status');
const cleanBtn = document.getElementById('cleanNow');

function renderStatus(enabled, message) {
  if (message) {
    status.innerHTML = message;
    return;
  }
  status.innerHTML = enabled
    ? '<strong>On.</strong> Reload open room pages if needed.'
    : 'Off.';
}

function isSupportedTryHackMeRoom(url) {
  return /^https:\/\/tryhackme\.com\/room\//.test(url);
}

async function cleanCurrentTab() {
  try {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url) {
      renderStatus(null, 'No active tab found.');
      return;
    }
    if (!isSupportedTryHackMeRoom(tab.url)) {
      renderStatus(null, 'Not a TryHackMe room page.');
      return;
    }
    const response = await browser.tabs.sendMessage(tab.id, { type: 'CLIPCLEAN_CLEAN_NOW' });
    if (response && response.ok) {
      renderStatus(null, '<strong>Cleaned.</strong> Glossary terms removed.');
    } else {
      renderStatus(null, 'Cleanup completed.');
    }
  } catch (err) {
    renderStatus(null, `Error: ${err.message}`);
  }
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

cleanBtn.addEventListener('click', cleanCurrentTab);

init().catch(err => {
  status.textContent = `Error: ${err.message}`;
});
