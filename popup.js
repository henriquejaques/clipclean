(() => {
  const STORAGE_KEY = 'enabled';
  const toggle = document.getElementById('enabledToggle');
  const status = document.getElementById('status');

  function renderStatus(enabled, animate = false) {
    status.classList.remove('is-animating');
    status.replaceChildren();

    if (enabled) {
      const label = document.createElement('strong');
      label.className = 'state-on';
      label.textContent = 'On.';
      const detail = document.createElement('span');
      detail.className = 'status-detail';
      detail.textContent = 'Glossary buttons removed automatically.';
      status.appendChild(label);
      status.appendChild(document.createElement('br'));
      status.appendChild(detail);
    } else {
      const label = document.createElement('strong');
      label.className = 'state-off';
      label.textContent = 'Off.';
      const detail = document.createElement('span');
      detail.className = 'status-detail';
      detail.textContent = 'Reload room pages to restore buttons.';
      status.appendChild(label);
      status.appendChild(document.createElement('br'));
      status.appendChild(detail);
    }

    if (animate) {
      void status.offsetWidth;
      status.classList.add('is-animating');
      const onEnd = () => {
        status.classList.remove('is-animating');
        status.removeEventListener('animationend', onEnd);
      };
      status.addEventListener('animationend', onEnd);
    }
  }

  async function init() {
    try {
      const stored = await browser.storage.local.get(STORAGE_KEY);
      const enabled = stored[STORAGE_KEY] !== false;
      toggle.checked = enabled;
      renderStatus(enabled, false);
    } catch (err) {
      console.warn('ClipClean:', err);
      status.textContent = 'Error: ' + err.message;
    }
  }

  toggle.addEventListener('change', async () => {
    const enabled = toggle.checked;
    try {
      await browser.storage.local.set({ [STORAGE_KEY]: enabled });
      renderStatus(enabled, true);
    } catch (err) {
      console.warn('ClipClean:', err);
      toggle.checked = !enabled;
      renderStatus(!enabled, true);
    }
  });

  init();
})();
