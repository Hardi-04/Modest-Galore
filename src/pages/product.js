import { getProductById } from '../store/products.js';

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export async function ProductPage(ctx) {
  const product = await getProductById(ctx.params.id);
  if (!product) {
    return `
      <section class="page page--white">
        <div class="page-inner">
          <h1 class="section-title">Product not found</h1>
          <p class="muted">We couldn’t find that item.</p>
          <a class="btn btn-solid" href="/shop">Back to shop</a>
        </div>
      </section>
    `;
  }

  return `
    <section class="page page--white">
      <div class="page-inner">
        <a href="/shop" class="muted" style="text-decoration:none;">← Back to shop</a>
        <div class="spacer-sm"></div>
        <div class="product-detail">
          <img src="${product.image}" alt="${escapeAttr(product.name)}" />
          <div class="card">
            <h1 class="section-title" style="margin-top:0;">${escapeHtml(product.name)}</h1>
            <p class="muted" style="margin-top:0;">${escapeHtml(product.category)}</p>
            <p style="font-size:1.15rem; margin: 0.75rem 0 1rem;"><span class="price">${formatPrice(product.price)}</span></p>
            <p class="muted" style="margin:0 0 1.25rem;">${escapeHtml(product.description)}</p>
            <div class="row">
              <button class="btn btn-solid" type="button" data-action="add-to-cart" data-id="${escapeAttr(product.id)}">Add to cart</button>
              <a class="btn btn-outline" href="/cart">Go to cart</a>
            </div>
          </div>
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

