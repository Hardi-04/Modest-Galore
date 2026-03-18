import { HomePage } from './pages/home.js';
import { ShopPage } from './pages/shop.js';
import { AdminPage } from './pages/admin.js';
import { CategoryPage } from './pages/category.js';
import { ProductPage } from './pages/product.js';
import { CartPage } from './pages/cart.js';
import { AboutPage } from './pages/about.js';
import { ContactPage } from './pages/contact.js';
import { NotFoundPage } from './pages/not-found.js';

export const routes = [
  { path: '/', title: 'Modest Galore – Modest Fashion & Abayas', render: HomePage },
  { path: '/shop', title: 'Shop – Modest Galore', render: ShopPage },
  { path: '/admin', title: 'Admin – Modest Galore', render: AdminPage },
  { path: '/category/:name', title: 'Category – Modest Galore', render: CategoryPage },
  { path: '/product/:id', title: 'Product – Modest Galore', render: ProductPage },
  { path: '/cart', title: 'Cart – Modest Galore', render: CartPage },
  { path: '/about', title: 'About – Modest Galore', render: AboutPage },
  { path: '/contact', title: 'Contact – Modest Galore', render: ContactPage },
  { path: '/404', title: 'Not found – Modest Galore', render: NotFoundPage }
];

