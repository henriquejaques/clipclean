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
  const ROOM_SELECTOR = '#room_content';
  const BUTTON_SELECTOR = 'button[data-testid="glossary-term"]';
  const TASKS_ROOT_SELECTOR = '#room_content [data-sentry-source-file="tasks.tsx"]';
  const TASK_HEADER_SELECTOR = 'button[id^="header-"][data-task-no]';
  const READ_ALL_ID = 'thm-read-all';
  const HIDDEN_MARKER_ATTR = 'data-thm-hidden-original';
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

  function restoreOriginalTasksView() {
    document.getElementById(READ_ALL_ID)?.remove();
    document.querySelectorAll(`[${HIDDEN_MARKER_ATTR}="1"]`).forEach((el) => {
      el.style.display = '';
      el.removeAttribute(HIDDEN_MARKER_ATTR);
    });
    console.log('ClipClean Task Reader Mode: original tasks view restored.');
  }

  function findTasksRoot() {
    const room = document.querySelector(ROOM_SELECTOR);
    return room?.querySelector('[data-sentry-source-file="tasks.tsx"]') || document.querySelector(TASKS_ROOT_SELECTOR);
  }

  function getTaskHeaders(tasksRoot) {
    return Array.from(tasksRoot.querySelectorAll(TASK_HEADER_SELECTOR)).sort(
      (a, b) => Number(a.dataset.taskNo || 0) - Number(b.dataset.taskNo || 0)
    );
  }

  function createReadAllContainer(tasksRoot) {
    const readAll = document.createElement('section');
    readAll.id = READ_ALL_ID;
    readAll.style.cssText = `
      background:#0f172a;color:#e2e8f0;border:1px solid #334155;border-radius:10px;
      padding:16px;margin:16px 0;position:relative;z-index:9999;
    `;
    const h2 = document.createElement('h2');
    h2.style.cssText = 'margin:0 0 12px 0';
    h2.textContent = 'Task Reader Mode (local temporary view)';
    readAll.appendChild(h2);
    tasksRoot.parentElement?.insertBefore(readAll, tasksRoot);
    return readAll;
  }

  async function expandAndCloneTask(header) {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    if (header.getAttribute('aria-expanded') !== 'true') {
      header.click();
      await sleep(180);
    }

    const title = header.innerText.replace(/\s+/g, ' ').trim();
    const panelId = header.getAttribute('aria-controls');
    let panel = panelId ? document.getElementById(panelId) : null;

    if (!panel) {
      panel = header.closest('h3, div, section')?.parentElement?.querySelector('[role="region"]') || null;
    }

    const article = document.createElement('article');
    article.style.cssText = 'border-top:1px solid #334155;padding-top:12px;margin-top:12px;';
    const h3 = document.createElement('h3');
    h3.style.cssText = 'margin:0 0 8px 0';
    h3.textContent = title || 'Untitled Task';
    article.appendChild(h3);

    if (!panel) {
      const info = document.createElement('p');
      info.textContent = 'Panel not found for this task.';
      article.appendChild(info);
      return article;
    }

    const clone = panel.cloneNode(true);
    clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
    clone.removeAttribute('id');
    clone.querySelectorAll('[hidden]').forEach((el) => el.removeAttribute('hidden'));
    clone.removeAttribute('hidden');
    clone.style.display = 'block';
    clone.style.height = 'auto';
    clone.style.maxHeight = 'none';
    clone.style.overflow = 'visible';
    clone.style.opacity = '1';
    article.appendChild(clone);
    return article;
  }

  function hideOriginalTasksRoot(tasksRoot) {
    tasksRoot.setAttribute(HIDDEN_MARKER_ATTR, '1');
    tasksRoot.style.display = 'none';
  }

  function isTaskReaderModeActive() {
    return Boolean(document.getElementById(READ_ALL_ID) && document.querySelector(`[${HIDDEN_MARKER_ATTR}="1"]`));
  }

  async function buildTryHackMeReadAllView() {
    window.__thmRestoreOriginal?.();
    restoreOriginalTasksView();

    const tasksRoot = findTasksRoot();
    if (!tasksRoot) {
      console.log('ClipClean Task Reader Mode: could not find tasks.tsx root.');
      return { ok: false, reason: 'tasks-root-not-found' };
    }

    const headers = getTaskHeaders(tasksRoot);
    if (!headers.length) {
      console.log('ClipClean Task Reader Mode: no task headers found.');
      return { ok: false, reason: 'headers-not-found' };
    }

    const readAll = createReadAllContainer(tasksRoot);
    for (const header of headers) {
      const section = await expandAndCloneTask(header);
      readAll.appendChild(section);
    }

    hideOriginalTasksRoot(tasksRoot);
    window.__thmRestoreOriginal = restoreOriginalTasksView;
    console.log('ClipClean Task Reader Mode: inserted custom view and hid original tasks container.');
    return { ok: true, taskCount: headers.length };
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

  function watchMessages() {
    browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message?.type === 'clipclean:task-reader-mode') {
        buildTryHackMeReadAllView()
          .then((result) => sendResponse(result))
          .catch((err) => {
            console.warn('ClipClean:', err);
            sendResponse({ ok: false, reason: 'task-reader-error' });
          });
        return true;
      }
      if (message?.type === 'clipclean:task-reader-restore') {
        restoreOriginalTasksView();
        sendResponse({ ok: true });
        return false;
      }
      if (message?.type === 'clipclean:task-reader-state') {
        sendResponse({ ok: true, active: isTaskReaderModeActive() });
        return false;
      }
      return false;
    });
  }

  async function init() {
    await loadEnabled();
    unwrapGlossaryButtons();
    startObserver();
    watchStorage();
    watchMessages();
    window.__thmRestoreOriginal = restoreOriginalTasksView;
    window.__thmBuildTaskReaderMode = buildTryHackMeReadAllView;
  }

  init();
})();
