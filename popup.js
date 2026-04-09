if (typeof browser !== 'undefined') {
  // Firefox: browser.* is available natively.
} else if (typeof chrome !== 'undefined') {
  // Chrome/Chromium: map chrome.* namespace for shared code.
  globalThis.browser = chrome;
} else {
  throw new Error('ClipClean: unsupported browser environment');
}

(() => {
  const STORAGE_KEY = 'enabled';
  const ROOM_PREFIX = 'https://tryhackme.com/room/';
  const toggle = document.getElementById('enabledToggle');
  const taskReaderToggle = document.getElementById('taskReaderToggle');
  const taskReaderLabel = document.getElementById('taskReaderLabel');
  const taskReaderHelp = document.getElementById('taskReaderHelp');
  const status = document.getElementById('status');
  let taskReaderActive = false;

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

  function renderTaskReaderToggle(active) {
    taskReaderActive = Boolean(active);
    taskReaderToggle.checked = taskReaderActive;
    taskReaderLabel.textContent = 'Task reader';
    taskReaderHelp.textContent = taskReaderActive
      ? 'Task Reader Mode is active in the current room tab.'
      : 'Shows a temporary expanded task view for this room tab only.';
  }

  async function getActiveRoomTab() {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id || !tab.url?.startsWith(ROOM_PREFIX)) return null;
    return tab;
  }

  async function refreshTaskReaderState() {
    try {
      const tab = await getActiveRoomTab();
      if (!tab) {
        renderTaskReaderToggle(false);
        taskReaderToggle.disabled = true;
        taskReaderToggle.title = 'Open a TryHackMe room tab first.';
        taskReaderHelp.textContent = 'Open a TryHackMe room tab to use Task Reader Mode.';
        taskReaderLabel.textContent = 'Task reader';
        return;
      }

      taskReaderToggle.disabled = false;
      taskReaderToggle.title = '';
      const state = await browser.tabs.sendMessage(tab.id, { type: 'clipclean:task-reader-state' });
      renderTaskReaderToggle(Boolean(state?.active));
    } catch (err) {
      console.warn('ClipClean:', err);
      renderTaskReaderToggle(false);
    }
  }

  async function init() {
    try {
      const stored = await browser.storage.local.get(STORAGE_KEY);
      const enabled = stored[STORAGE_KEY] !== false;
      toggle.checked = enabled;
      renderStatus(enabled, false);
      await refreshTaskReaderState();
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

  taskReaderToggle.addEventListener('change', async () => {
    try {
      const tab = await getActiveRoomTab();
      if (!tab) {
        status.textContent = 'Open a TryHackMe room tab first.';
        taskReaderToggle.checked = false;
        return;
      }

      let response;
      const shouldEnableReader = taskReaderToggle.checked;
      if (shouldEnableReader) {
        response = await browser.tabs.sendMessage(tab.id, { type: 'clipclean:task-reader-mode' });
        if (response?.ok) {
          renderTaskReaderToggle(true);
          status.textContent = `Task Reader Mode built for ${response.taskCount} tasks.`;
        } else {
          status.textContent = 'Task Reader Mode could not run on this page.';
        }
      } else {
        response = await browser.tabs.sendMessage(tab.id, { type: 'clipclean:task-reader-restore' });
        if (response?.ok) {
          renderTaskReaderToggle(false);
          status.textContent = 'Switched to original task view.';
        } else {
          status.textContent = 'Could not restore original task view.';
        }
      }
      await refreshTaskReaderState();
    } catch (err) {
      console.warn('ClipClean:', err);
      status.textContent = 'Task Reader Mode failed. Reload page and try again.';
      await refreshTaskReaderState();
    }
  });

  init();
})();
