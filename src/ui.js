import { getProductById } from './store/products.js';
import { INSTAGRAM_USERNAME, PUBLIC_SITE_URL, SMS_NUMBER_E164, WHATSAPP_NUMBER } from './config.js';
import { addToCart, getCart, removeFromCart, setQty } from './store/cart.js';
import { initAdminHandlers } from './pages/admin.js';

export async function initUiHandlers({ rootEl, ctx, router }) {
  // Attach delegated handlers once per app mount (since rootEl persists across route renders)
  if (!rootEl.__mgDelegatesAttached) {
    rootEl.__mgDelegatesAttached = true;

    rootEl.addEventListener('click', async (e) => {
      const btn = e.target instanceof Element ? e.target.closest('[data-action]') : null;
      if (!btn) return;
      const action = btn.getAttribute('data-action');

      if (action === 'add-to-cart') {
        const id = btn.getAttribute('data-id');
        if (!id) return;
        addToCart(id, 1);
        updateCartPill(rootEl);
        flashAdded(btn);
        return;
      }

      if (action === 'remove-from-cart') {
        const id = btn.getAttribute('data-id');
        if (!id) return;
        removeFromCart(id);
        updateCartPill(rootEl);
        router.navigate('/cart');
        return;
      }

      if (action === 'checkout') {
        const cart = getCart();
        // Get all product details asynchronously
        const productPromises = Object.keys(cart).map(id => getProductById(id));
        const products = await Promise.all(productPromises);
        const productMap = Object.fromEntries(
          Object.keys(cart).map((id, index) => [id, products[index]])
        );

        const items = Object.entries(cart)
          .map(([id, qty]) => ({ product: productMap[id], qty: Number(qty) || 0 }))
          .filter((x) => x.product && x.qty > 0)
          .map(({ product, qty }) => ({
            id: product.id,
            name: product.name,
            qty,
            image: product.image,
            imageUrl: toAbsolutePublicUrl(product.image),
            productUrl: toAbsolutePublicUrl(`/product/${encodeURIComponent(product.id)}`)
          }));

        // Put URLs on their own lines to encourage WhatsApp link previews (when URLs are public).
        const lines = items.map(
          (it) => `- ${it.name} (Qty: ${it.qty})\n${it.imageUrl}\n${it.productUrl}`
        );

        const message =
          `Hello, I want to buy these item(s):\n\n` +
          (lines.length ? lines.join('\n') : '(Cart is empty)') +
          `\n\nThank you.`;

        showCheckoutModal({ rootEl, message, items });
        return;
      }
    });

    rootEl.addEventListener('change', (e) => {
      const input = e.target instanceof Element ? e.target.closest('[data-action]') : null;
      if (!input) return;
      const action = input.getAttribute('data-action');

      if (action === 'set-qty' && input instanceof HTMLInputElement) {
        const id = input.getAttribute('data-id');
        const qty = Number(input.value);
        if (!id || !Number.isFinite(qty)) return;
        setQty(id, qty);
        updateCartPill(rootEl);
        router.navigate('/cart');
      }
    });
  }

  // Mobile menu
  const menuBtn = rootEl.querySelector('.menu-btn');
  const nav = rootEl.querySelector('.nav');
  if (menuBtn && nav) {
    const close = () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    };
    const toggle = () => {
      const isOpen = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    };
    menuBtn.addEventListener('click', toggle);
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
  }

  // Not found: redirect to /404 without crashing
  if (!ctx.route && ctx.pathname !== '/404') {
    router.navigate('/404');
    return;
  }

  // Initialize admin handlers if on admin page
  if (ctx.pathname === '/admin') {
    initAdminHandlers({ rootEl, router, ctx });
  }
}

function toAbsolutePublicUrl(pathOrUrl) {
  const s = String(pathOrUrl || '').trim();
  if (!s) return '';
  if (s.startsWith('http://') || s.startsWith('https://')) return s;

  const base = PUBLIC_SITE_URL || window.location.origin;
  return new URL(s.startsWith('/') ? s : `/${s}`, base).toString();
}

function updateCartPill(rootEl) {
  const cart = getCart();
  const count = Object.values(cart).reduce((sum, qty) => sum + (Number(qty) || 0), 0);
  const pill = rootEl.querySelector('.cart-pill');
  if (pill) {
    pill.textContent = String(count);
    pill.setAttribute('aria-label', `${count} items in cart`);
  }
}

function flashAdded(btn) {
  if (!(btn instanceof HTMLElement)) return;
  const original = btn.textContent;
  btn.textContent = 'Added';
  btn.style.opacity = '0.9';
  window.setTimeout(() => {
    btn.textContent = original || 'Add to cart';
    btn.style.opacity = '';
  }, 900);
}

function showCheckoutModal({ rootEl, message, items }) {
  const existing = rootEl.querySelector('[data-modal="checkout-fallback"]');
  if (existing) existing.remove();

  const waUrl = `https://wa.me/${encodeURIComponent(WHATSAPP_NUMBER)}?text=${encodeURIComponent(message)}`;
  const igUrl = `https://ig.me/m/${encodeURIComponent(INSTAGRAM_USERNAME)}`;
  const smsUrl = `sms:${encodeURIComponent(SMS_NUMBER_E164)}?body=${encodeURIComponent(message)}`;

  const safeItems = Array.isArray(items) ? items : [];
  const visibleItems = safeItems.slice(0, 3);
  const remainingCount = Math.max(0, safeItems.length - visibleItems.length);

  const itemsHtml = safeItems.length
    ? `
      <div class="modal-items" role="list" aria-label="Order items">
        ${visibleItems
          .map(
            (it) => `
              <div class="modal-item" role="listitem">
                <img class="modal-item-img" src="${escapeAttr(it.image)}" alt="${escapeAttr(it.name)}" />
                <div class="modal-item-body">
                  <div class="modal-item-name">${escapeHtml(it.name)}</div>
                  <div class="modal-item-meta muted">Qty: ${Number(it.qty) || 1}</div>
                  <button class="modal-item-link" type="button" data-action="open-image" data-src="${escapeAttr(
                    it.imageUrl
                  )}" data-alt="${escapeAttr(it.name)}">Open image</button>
                </div>
              </div>
            `
          )
          .join('')}
        ${
          remainingCount
            ? `<div class="modal-items-more muted">+ ${remainingCount} more item${remainingCount === 1 ? '' : 's'}</div>`
            : ''
        }
      </div>
    `
    : '';

  const modal = document.createElement('div');
  modal.setAttribute('data-modal', 'checkout-fallback');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="Checkout options">
      <button class="modal-close" type="button" aria-label="Close" data-action="close-modal">✕</button>
      <h2 class="modal-title">Send your order</h2>
      <p class="muted modal-subtitle">Choose how you want to message the seller. Instagram doesn’t support auto-fill, so we’ll copy your message for you.</p>

      ${itemsHtml}

      <div class="modal-actions">
        <a class="btn btn-solid" href="${waUrl}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <button class="btn btn-outline" type="button" data-action="open-instagram">Instagram DM</button>
        <a class="btn btn-outline" href="${smsUrl}">SMS</a>
        <button class="btn btn-light-blue" type="button" data-action="copy-order-message">Copy message</button>
      </div>

      <details class="modal-details">
        <summary>Preview message</summary>
        <pre class="modal-pre"></pre>
      </details>
    </div>
  `;

  const pre = modal.querySelector('.modal-pre');
  if (pre) pre.textContent = message;

  modal.addEventListener('click', async (e) => {
    const el = e.target instanceof Element ? e.target.closest('[data-action]') : null;
    if (!el) {
      if (e.target === modal) modal.remove();
      return;
    }
    const action = el.getAttribute('data-action');
    if (action === 'close-modal') {
      modal.remove();
      return;
    }
    if (action === 'open-image') {
      const src = el.getAttribute('data-src') || '';
      const alt = el.getAttribute('data-alt') || 'Product image';
      openImageLightbox({ rootEl, src, alt, dimSelector: '[data-modal=\"checkout-fallback\"]' });
      return;
    }
    if (action === 'open-instagram') {
      try {
        await navigator.clipboard.writeText(message);
        el.textContent = 'Copied — opening…';
        window.setTimeout(() => {
          el.textContent = 'Instagram DM';
          window.open(igUrl, '_blank', 'noopener,noreferrer');
        }, 250);
      } catch {
        // fallback: open first, then let user copy
        window.open(igUrl, '_blank', 'noopener,noreferrer');
        window.prompt('Copy this message, then paste in Instagram:', message);
      }
      return;
    }
    if (action === 'copy-order-message') {
      try {
        await navigator.clipboard.writeText(message);
        el.textContent = 'Copied';
        window.setTimeout(() => (el.textContent = 'Copy message'), 900);
      } catch {
        // fallback
        window.prompt('Copy this message:', message);
      }
    }
  });

  document.addEventListener(
    'keydown',
    (ev) => {
      if (ev.key === 'Escape') modal.remove();
    },
    { once: true }
  );

  rootEl.appendChild(modal);
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function escapeAttr(s) {
  return escapeHtml(s);
}

function openImageLightbox({ rootEl, src, alt, dimSelector }) {
  if (!src) return;
  const existing = document.querySelector('[data-modal="image-lightbox"]');
  if (existing) existing.remove();

  const toDim = dimSelector ? document.querySelector(dimSelector) : null;
  if (toDim) toDim.classList.add('is-dimmed');

  const lb = document.createElement('div');
  lb.setAttribute('data-modal', 'image-lightbox');
  lb.className = 'lightbox-overlay';
  lb.innerHTML = `
    <div class="lightbox" role="dialog" aria-modal="true" aria-label="Image preview">
      <button class="lightbox-close" type="button" aria-label="Close image" data-action="close-lightbox">✕</button>
      <img class="lightbox-img" src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" />
    </div>
  `;

  const close = () => {
    lb.remove();
    if (toDim) toDim.classList.remove('is-dimmed');
  };

  lb.addEventListener('click', (e) => {
    const el = e.target instanceof Element ? e.target.closest('[data-action]') : null;
    if (el?.getAttribute('data-action') === 'close-lightbox' || e.target === lb) {
      close();
    }
  });

  document.addEventListener(
    'keydown',
    (ev) => {
      if (ev.key === 'Escape') close();
    },
    { once: true }
  );

  document.body.appendChild(lb);
}

