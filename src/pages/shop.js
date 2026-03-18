import { getProducts } from '../store/products.js';

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export async function ShopPage(ctx) {
  const category = ctx.query.get('category');
  const all = await getProducts();
  const items = category ? all.filter((p) => p.category === category) : all;

  return `
    <section class="page page--white">
      <div class="page-inner">
        <h1 class="section-title">Shop</h1>
        <p class="muted lead">${category ? `Showing: <strong>${escapeHtml(category)}</strong>` : 'Browse our featured pieces.'}</p>

        <div class="product-grid" role="list">
          ${items
            .map(
              (p) => `
                <article class="product-card" role="listitem">
                  <a href="/product/${encodeURIComponent(p.id)}" aria-label="View ${escapeAttr(p.name)}">
                    <img src="${p.image}" alt="${escapeAttr(p.name)}" loading="lazy" />
                  </a>
                  <div class="product-card-body">
                    <h2 class="product-card-title">${escapeHtml(p.name)}</h2>
                    <div class="product-card-meta">
                      <span>${escapeHtml(p.category)}</span>
                      <span class="price">${formatPrice(p.price)}</span>
                    </div>
                    <div class="row">
                      <a class="btn btn-outline" href="/product/${encodeURIComponent(p.id)}">Details</a>
                      <button class="btn btn-solid" type="button" data-action="add-to-cart" data-id="${escapeAttr(p.id)}">Add to cart</button>
                    </div>
                  </div>
                </article>
              `
            )
            .join('')}
        </div>
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

