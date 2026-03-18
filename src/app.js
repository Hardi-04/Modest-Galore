import { createRouter } from './router.js';
import { renderLayout } from './layout.js';
import { routes } from './routes.js';
import { initUiHandlers } from './ui.js';

export function mountApp(rootEl) {
  if (!rootEl) throw new Error('Missing #app root element');

  const router = createRouter({
    routes,
    onRouteChange: async (ctx) => {
      rootEl.innerHTML = await renderLayout(ctx);
      await initUiHandlers({ rootEl, ctx, router });
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  });

  router.start();
}

