const STORAGE_KEY = 'mg_cart_v1';

function readCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed;
  } catch {
    return {};
  }
}

function writeCart(cart) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function getCart() {
  return readCart();
}

export function getCartCount() {
  const cart = readCart();
  return Object.values(cart).reduce((sum, qty) => sum + (Number(qty) || 0), 0);
}

export function addToCart(productId, qty = 1) {
  const cart = readCart();
  const next = Math.max(0, (Number(cart[productId]) || 0) + (Number(qty) || 0));
  cart[productId] = next;
  if (cart[productId] <= 0) delete cart[productId];
  writeCart(cart);
}

export function removeFromCart(productId) {
  const cart = readCart();
  delete cart[productId];
  writeCart(cart);
}

export function setQty(productId, qty) {
  const cart = readCart();
  const next = Math.max(0, Math.floor(Number(qty) || 0));
  if (next <= 0) delete cart[productId];
  else cart[productId] = next;
  writeCart(cart);
}

