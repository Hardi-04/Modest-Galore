import { getProducts } from '../store/products.js';

export async function CategoryPage(ctx) {
  const raw = ctx.params.name || '';
  const category = decodeURIComponent(raw);
  const items = (await getProducts()).filter((p) => p.category === category);

  return `
    <section class="page page--white">
      <div class="page-inner">
        <a href="/" class="muted" style="text-decoration:none;">← Back to home</a>
        <div class="spacer-sm"></div>
        <h1 class="section-title">${escapeHtml(category)}</h1>
        <p class="muted lead">Choose from similar styles in this category.</p>

        ${
          items.length
            ? `
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
                            <span class="price">$${Number(p.price).toFixed(2)}</span>
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
            `
            : `
              <div class="card">
                <p style="margin:0;">No products found in this category yet.</p>
                <div class="spacer-md"></div>
                <a class="btn btn-solid" href="/shop">Go to shop</a>
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

