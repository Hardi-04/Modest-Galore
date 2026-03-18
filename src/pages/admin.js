import { getProducts, upsertProduct, deleteProduct } from '../store/products.js';
import { loginAdmin, logoutAdmin, getAdminToken } from '../security.js';

const ADMIN_PASSWORD = 'HardiHardi'; // fallback, but now uses API

export async function AdminPage(ctx) {
  const authed = isAuthed();
  if (!authed) {
    return renderLogin();
  }
  return await renderDashboard(ctx);
}

function isAuthed() {
  return getAdminToken() !== null;
}

function renderLogin() {
  return `
    <section class="page page--white admin auth-page">
      <div class="page-inner admin-auth-inner">
        <div class="card admin-auth-card">
          <h1 class="section-title">Admin login</h1>
          <p class="muted">Enter the admin password to manage products.</p>
          <form data-admin-auth="form" class="admin-auth-form">
            <label class="admin-label" for="admin-password">Password</label>
            <input id="admin-password" class="admin-input" type="password" autocomplete="current-password" required />
            <button class="btn btn-solid admin-auth-btn" type="submit">Login</button>
            <p class="admin-auth-error muted" data-admin-auth="error" hidden>Incorrect password.</p>
          </form>
        </div>
      </div>
    </section>
  `;
}

async function renderDashboard(ctx) {
  const products = await getProducts();
  const editingId = ctx.query.get('edit') || '';
  const editing = editingId ? products.find((p) => p.id === editingId) : null;

  return `
    <section class="page page--white admin">
      <div class="page-inner admin-layout">
        <aside class="admin-sidebar">
          <h2 class="admin-sidebar-title">Admin</h2>
          <nav class="admin-nav">
            <button class="admin-nav-link" type="button" data-admin-nav="products">Products</button>
            <button class="admin-nav-link" type="button" data-admin-nav="add">Add product</button>
          </nav>
          <button class="admin-logout" type="button" data-admin-action="logout">Log out</button>
        </aside>

        <div class="admin-main">
          <header class="admin-main-header">
            <div>
              <h1 class="section-title">Products</h1>
              <p class="muted">Manage items that appear in your shop and categories.</p>
            </div>
            <button class="btn btn-outline" type="button" data-admin-nav="add">+ Add product</button>
          </header>

          <section class="admin-grid">
            <div class="admin-panel">
              <div class="admin-panel-header">
                <h2>All products</h2>
                <input
                  type="search"
                  placeholder="Search by name or category"
                  class="admin-input admin-search"
                  data-admin-filter="search"
                />
              </div>
              <div class="admin-table" data-admin-products="table">
                ${products
                  .map(
                    (p) => `
                      <article class="admin-row">
                        <div class="admin-row-main">
                          <img src="${p.image}" alt="${escapeAttr(p.name)}" class="admin-row-img" />
                          <div>
                            <div class="admin-row-title">${escapeHtml(p.name)}</div>
                            <div class="admin-row-sub muted">${escapeHtml(p.category)} • $${Number(p.price).toFixed(
                              2
                            )}</div>
                          </div>
                        </div>
                        <div class="admin-row-actions">
                          <button class="btn btn-outline admin-row-btn" type="button" data-admin-edit="${escapeAttr(
                            p.id
                          )}">Edit</button>
                          <button class="btn btn-danger admin-row-btn" type="button" data-admin-delete="${escapeAttr(
                            p.id
                          )}">Delete</button>
                        </div>
                      </article>
                    `
                  )
                  .join('')}
              </div>
            </div>

            <div class="admin-panel">
              <h2>${editing ? 'Edit product' : 'Add product'}</h2>
              <form class="admin-form" data-admin-form="product">
                <input type="hidden" name="id" value="${editing ? escapeAttr(editing.id) : ''}" />

                <label class="admin-label">Name
                  <input class="admin-input" type="text" name="name" required value="${
                    editing ? escapeAttr(editing.name) : ''
                  }"/>
                </label>

                <label class="admin-label">Price (USD)
                  <input class="admin-input" type="number" step="0.01" min="0" name="price" required value="${
                    editing ? escapeAttr(editing.price) : ''
                  }"/>
                </label>

                <label class="admin-label">Category
                  <input class="admin-input" type="text" name="category" list="admin-categories" required value="${
                    editing ? escapeAttr(editing.category) : ''
                  }"/>
                </label>

                <label class="admin-label">Image URL
                  <input class="admin-input" type="text" name="image" placeholder="/images/..." value="${
                    editing ? escapeAttr(editing.image) : ''
                  }"/>
                </label>

                <label class="admin-label">Description
                  <textarea class="admin-input admin-textarea" name="description" rows="3">${
                    editing ? escapeHtml(editing.description) : ''
                  }</textarea>
                </label>

                <div class="admin-form-footer">
                  <button class="btn btn-solid" type="submit">${editing ? 'Save changes' : 'Add product'}</button>
                  ${editing ? '<button class="btn btn-outline" type="button" data-admin-action="cancel-edit">Cancel</button>' : ''}
                </div>

                <div class="admin-image-preview" data-admin-image-preview>
                  ${
                    editing
                      ? `<img src="${escapeAttr(editing.image)}" alt="${escapeAttr(
                          editing.name
                        )}" /><span class="muted">Preview</span>`
                      : '<span class="muted">Image preview will appear here.</span>'
                  }
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>

      <datalist id="admin-categories">
        <option value="Everyday Abayas"></option>
        <option value="Luxury Abayas"></option>
        <option value="Eid Collection"></option>
        <option value="New Arrivals"></option>
      </datalist>
    </section>
  `;
}

export async function initAdminHandlers({ rootEl, router, ctx }) {
  // Login form
  const authForm = rootEl.querySelector('[data-admin-auth="form"]');
  if (authForm instanceof HTMLFormElement) {
    const errorEl = rootEl.querySelector('[data-admin-auth="error"]');
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pwd = rootEl.querySelector('#admin-password')?.value || '';

      try {
        await loginAdmin(pwd);
        router.navigate('/admin');
      } catch (error) {
        if (errorEl) {
          errorEl.textContent = error.message;
          errorEl.hidden = false;
        }
      }
    });
    return;
  }

  // Only wire dashboard handlers if authed
  if (!isAuthed()) return;

  const products = await getProducts();

  // Sidebar nav
  rootEl.querySelectorAll('[data-admin-nav]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = (e.currentTarget || e.target).getAttribute('data-admin-nav');
      if (target === 'add') {
        const url = new URL(window.location.href);
        url.searchParams.delete('edit');
        router.navigate(url.pathname + url.search);
      }
      if (target === 'products') {
        router.navigate('/admin');
      }
    });
  });

  // Logout
  const logoutBtn = rootEl.querySelector('[data-admin-action="logout"]');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logoutAdmin();
      router.navigate('/admin');
    });
  }

  // Search filter (simple client-side filter)
  const searchInput = rootEl.querySelector('[data-admin-filter="search"]');
  const table = rootEl.querySelector('[data-admin-products="table"]');
  if (searchInput instanceof HTMLInputElement && table) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      table.querySelectorAll('.admin-row').forEach((row) => {
        const text = row.textContent?.toLowerCase() || '';
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  // Edit & delete
  rootEl.querySelectorAll('[data-admin-edit]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-admin-edit');
      if (!id) return;
      const url = new URL(window.location.href);
      url.searchParams.set('edit', id);
      router.navigate(url.pathname + url.search);
    });
  });

  rootEl.querySelectorAll('[data-admin-delete]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-admin-delete');
      if (!id) return;
      if (!window.confirm('Remove this product?')) return;

      try {
        const token = getAdminToken();
        await deleteProduct(id, token);
        router.navigate('/admin');
      } catch (error) {
        alert('Failed to delete product: ' + error.message);
      }
    });
  });

  // Product form
  const form = rootEl.querySelector('[data-admin-form="product"]');
  if (form instanceof HTMLFormElement) {
    const imageInput = form.querySelector('input[name="image"]');
    const preview = rootEl.querySelector('[data-admin-image-preview]');

    if (imageInput instanceof HTMLInputElement && preview) {
      imageInput.addEventListener('input', () => {
        const src = imageInput.value.trim();
        if (!src) {
          preview.innerHTML = '<span class="muted">Image preview will appear here.</span>';
          return;
        }
        preview.innerHTML = `<img src="${escapeAttr(src)}" alt="Preview" /><span class="muted">Preview</span>`;
      });
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const token = getAdminToken();

      try {
        const product = await upsertProduct({
          id: fd.get('id')?.toString() || '',
          name: fd.get('name')?.toString() || '',
          price: fd.get('price')?.toString() || '',
          category: fd.get('category')?.toString() || '',
          image: fd.get('image')?.toString() || '',
          description: fd.get('description')?.toString() || ''
        }, token);

        const url = new URL(window.location.href);
        url.searchParams.set('edit', product.id);
        router.navigate(url.pathname + url.search);
      } catch (error) {
        alert('Failed to save product: ' + error.message);
      }
    });
  }

  const cancelBtn = rootEl.querySelector('[data-admin-action="cancel-edit"]');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      const url = new URL(window.location.href);
      url.searchParams.delete('edit');
      router.navigate(url.pathname + url.search);
    });
  }
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

