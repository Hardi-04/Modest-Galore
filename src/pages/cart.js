import { getProductById } from '../store/products.js';
import { getCart } from '../store/cart.js';

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export async function CartPage() {
  const cart = getCart();
  const entries = await Promise.all(
    Object.entries(cart)
      .map(async ([id, qty]) => ({ product: await getProductById(id), qty: Number(qty) || 0 }))
  );
  const validEntries = entries.filter((x) => x.product && x.qty > 0);

  const subtotal = validEntries.reduce((sum, x) => sum + x.product.price * x.qty, 0);

  return `
    <section class="page page--white">
      <div class="page-inner">
        <h1 class="section-title">Your cart</h1>
        <p class="muted">Cart state is saved in your browser (localStorage).</p>

        ${
          validEntries.length === 0
            ? `
              <div class="card">
                <p style="margin:0;">Your cart is empty.</p>
                <div style="height: 1rem;"></div>
                <a class="btn btn-solid" href="/shop">Continue shopping</a>
              </div>
            `
            : `
              <div class="card cart-list">
                ${validEntries
                  .map(
                    ({ product, qty }) => `
                      <div class="cart-item">
                        <img src="${product.image}" alt="${escapeAttr(product.name)}" />
                        <div>
                          <h3>${escapeHtml(product.name)}</h3>
                          <div class="muted">${escapeHtml(product.category)} • <span class="price">${formatPrice(product.price)}</span></div>
                        </div>
                        <div class="cart-actions">
                          <label class="muted" style="font-size:0.9rem;" for="qty-${escapeAttr(product.id)}">Qty</label>
                          <input id="qty-${escapeAttr(product.id)}" class="qty-input" type="number" min="1" step="1" value="${qty}" data-action="set-qty" data-id="${escapeAttr(product.id)}" />
                          <button class="btn btn-danger" type="button" data-action="remove-from-cart" data-id="${escapeAttr(product.id)}">Remove</button>
                        </div>
                      </div>
                    `
                  )
                  .join('')}
              </div>

              <div style="height: 1rem;"></div>
              <div class="card" style="display:flex; justify-content:space-between; align-items:center; gap:1rem; flex-wrap:wrap;">
                <div class="muted">Subtotal</div>
                <div style="font-size:1.1rem;"><span class="price">${formatPrice(subtotal)}</span></div>
              </div>

              <div style="height: 1rem;"></div>
              <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
                <a class="btn btn-outline" href="/shop">Add more items</a>
                <button class="btn btn-solid" type="button" data-action="checkout">Checkout</button>
              </div>
            `
        }
      </div>
    </section>
  `;
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

