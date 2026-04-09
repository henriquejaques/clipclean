const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const contentScript = fs.readFileSync(
  path.join(__dirname, '..', 'content.js'),
  'utf8'
);

const mockBrowserBridge = `
(() => {
  const listeners = [];
  const storageState = { enabled: true };
  const browser = {
    storage: {
      local: {
        get: async (key) => {
          if (typeof key === 'string') return { [key]: storageState[key] };
          return { ...storageState };
        },
        set: async (payload) => {
          Object.assign(storageState, payload);
        }
      },
      onChanged: {
        addListener: () => {}
      }
    },
    runtime: {
      onMessage: {
        addListener: (fn) => {
          listeners.push(fn);
        }
      }
    }
  };

  globalThis.browser = browser;

  // Emulate strict Chrome-style message channel behavior:
  // - sync response via sendResponse works
  // - return true keeps channel for async sendResponse
  // - Promise return is ignored (channel closes) to catch regressions
  globalThis.__sendMessage = async (message) => {
    const listener = listeners[listeners.length - 1];
    if (!listener) return undefined;

    let resolved = false;
    let responseValue;
    const sendResponse = (value) => {
      resolved = true;
      responseValue = value;
    };

    const ret = listener(message, {}, sendResponse);
    if (ret === true) {
      // wait for sendResponse in async branch
      for (let i = 0; i < 40; i += 1) {
        if (resolved) return responseValue;
        await new Promise((r) => setTimeout(r, 10));
      }
      return undefined;
    }

    if (resolved) return responseValue;
    if (ret && typeof ret.then === 'function') return undefined;
    return ret;
  };
})();
`;

function roomFixtureHtml() {
  return `
  <!doctype html>
  <html>
    <body>
      <div id="room_content">
        <p>
          Intro
          <button data-testid="glossary-term"><span>Recon</span></button>
          text.
        </p>
        <section data-sentry-source-file="tasks.tsx" id="tasks-root">
          <div>
            <h3>
              <button id="header-1" data-task-no="1" aria-controls="panel-1" aria-expanded="false">Task 1</button>
            </h3>
            <div id="panel-1" role="region"><p>First task content</p></div>
          </div>
          <div>
            <h3>
              <button id="header-2" data-task-no="2" aria-controls="panel-2" aria-expanded="false">Task 2</button>
            </h3>
            <div id="panel-2" role="region"><p>Second task content</p></div>
          </div>
        </section>
      </div>
    </body>
  </html>
  `;
}

test.beforeEach(async ({ page }) => {
  await page.setContent(roomFixtureHtml());
  await page.addScriptTag({ content: `${mockBrowserBridge}\n${contentScript}` });
});

test('auto-clean removes glossary buttons', async ({ page }) => {
  await expect(page.locator('#room_content button[data-testid="glossary-term"]')).toHaveCount(0);
  await expect(page.locator('#room_content')).toContainText('Recon');
});

test('task reader mode message flow toggles on and restores', async ({ page }) => {
  const activate = await page.evaluate(() => globalThis.__sendMessage({ type: 'clipclean:task-reader-mode' }));
  expect(activate).toBeTruthy();
  expect(activate.ok).toBe(true);
  expect(activate.taskCount).toBe(2);

  await expect(page.locator('#thm-read-all')).toBeVisible();
  await expect(page.locator('[data-thm-hidden-original="1"]')).toHaveCount(1);

  const stateOn = await page.evaluate(() => globalThis.__sendMessage({ type: 'clipclean:task-reader-state' }));
  expect(stateOn).toEqual({ ok: true, active: true });

  const restore = await page.evaluate(() => globalThis.__sendMessage({ type: 'clipclean:task-reader-restore' }));
  expect(restore).toEqual({ ok: true });
  await expect(page.locator('#thm-read-all')).toHaveCount(0);

  const stateOff = await page.evaluate(() => globalThis.__sendMessage({ type: 'clipclean:task-reader-state' }));
  expect(stateOff).toEqual({ ok: true, active: false });
});
