const API_BASE = import.meta.env?.VITE_API_URL || 'http://localhost:3001/api';

// Remove localStorage storage functions and replace with API calls

export async function getProducts() {
  try {
    const response = await fetch(`${API_BASE}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function upsertProduct(partial, token) {
  try {
    const isNew = !partial.id;
    const url = isNew ? `${API_BASE}/products` : `${API_BASE}/products/${partial.id}`;
    const method = isNew ? 'POST' : 'PUT';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify({
        name: partial.name,
        price: partial.price,
        category: partial.category,
        image: partial.image,
        description: partial.description
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving product:', error);
    throw error;
  }
}

export async function deleteProduct(id, token) {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

