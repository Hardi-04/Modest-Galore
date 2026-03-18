import { getCartCount } from './store/cart.js';
import { isAdminAuthed } from './security.js';

export async function renderLayout(ctx) {
  const route = ctx.route;
  const title = route?.title ?? 'Modest Galore';
  document.title = title;

  const cartCount = getCartCount();

  const content = route ? await route.render(ctx) : renderRedirectTo404();

  return `
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <header class="header">
      <a href="/" class="logo" aria-label="Modest Galore">
        <span class="logo-icon" aria-hidden="true">▲</span>
        MODEST GALORE
      </a>
      <nav class="nav" aria-label="Primary">
        <a href="/" data-nav="home">Home</a>
        <a href="/shop" data-nav="shop">Shop</a>
        <a href="/about" data-nav="about">About</a>
        <a href="/contact" data-nav="contact">Contact</a>
        ${isAdminAuthed() ? '<a href="/admin" data-nav="admin">Admin</a>' : ''}
        <a href="/cart" data-nav="cart">Cart <span class="cart-pill" aria-label="${cartCount} items in cart">${cartCount}</span></a>
      </nav>
      <button type="button" class="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="mobile-nav">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>

    <main id="main-content" class="app-main">
      ${content}
      ${renderFooter()}
    </main>
  `;
}

function renderRedirectTo404() {
  // router will navigate to /404 in ui handlers on first render
  return `<section class="page"><div class="page-inner"><h1 class="section-title">Not found</h1></div></section>`;
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer-social">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="footer-icon footer-icon--ig">Instagram</a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">𝕏</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
        <a href="https://wa.me/233256459524" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="footer-icon footer-icon--wa">WhatsApp</a>
      </div>
      <p class="footer-copy">&copy; Modest Galore. All rights reserved.</p>
    </footer>
  `;
}

