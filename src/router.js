function normalizePath(pathname) {
  if (!pathname) return '/';
  if (!pathname.startsWith('/')) pathname = `/${pathname}`;
  return pathname.replace(/\/+$/, '') || '/';
}

function compileRoute(pattern) {
  if (pattern === '/' || pattern === '') {
    return { re: /^\/$/, keys: [] };
  }

  const keys = [];
  const reSrc = pattern
    .split('/')
    .filter(Boolean)
    .map((seg) => {
      if (seg.startsWith(':')) {
        keys.push(seg.slice(1));
        return '([^/]+)';
      }
      return seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('/');

  const re = new RegExp(`^/${reSrc}$`);
  return { re, keys };
}

export function createRouter({ routes, onRouteChange }) {
  const compiled = routes.map((r) => ({
    ...r,
    _compiled: compileRoute(r.path)
  }));

  function match(pathname) {
    pathname = normalizePath(pathname);

    for (const r of compiled) {
      const m = pathname.match(r._compiled.re);
      if (!m) continue;
      const params = {};
      r._compiled.keys.forEach((k, i) => {
        params[k] = decodeURIComponent(m[i + 1]);
      });
      return { route: r, params, pathname };
    }

    return null;
  }

  function navigate(to) {
    const url = new URL(to, window.location.origin);
    window.history.pushState({}, '', url.pathname + url.search + url.hash);
    notify();
  }

  function notify() {
    const m = match(window.location.pathname);
    const ctx = m
      ? { pathname: m.pathname, params: m.params, query: new URLSearchParams(window.location.search), route: m.route }
      : { pathname: normalizePath(window.location.pathname), params: {}, query: new URLSearchParams(window.location.search), route: null };

    onRouteChange(ctx);
  }

  function start() {
    window.addEventListener('popstate', notify);
    document.addEventListener('click', (e) => {
      const a = e.target instanceof Element ? e.target.closest('a') : null;
      if (!a) return;
      if (a.target && a.target !== '_self') return;
      if (a.hasAttribute('download')) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (href.startsWith('http://') || href.startsWith('https://')) return;
      e.preventDefault();
      navigate(href);
    });
    notify();
  }

  return { start, navigate, match };
}

