const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Data storage (in production, use a real database)
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ADMINS_FILE = path.join(DATA_DIR, 'admins.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Initialize data files
async function initializeData() {
  await ensureDataDir();

  // Initialize products
  try {
    await fs.access(PRODUCTS_FILE);
  } catch {
    const initialProducts = [
      {
        id: 'everyday-1',
        name: 'Everyday Abaya – Classic Flow',
        price: 39.0,
        category: 'Everyday Abayas',
        image: '/images/ba554afb0c2cdba91299e0a2000d7ab7.jpg',
        description: 'A breathable everyday abaya with a clean silhouette. Made for comfort, movement, and effortless styling from morning to evening.'
      },
      {
        id: 'luxury-1',
        name: 'Luxury Abaya – Satin Night',
        price: 79.0,
        category: 'Luxury Abayas',
        image: '/images/fc6cf8a75b82482ff62243e9e3fafc51.jpg',
        description: 'A luxe finish with a refined drape. Designed for special occasions while still feeling lightweight and elegant.'
      },
      {
        id: 'luxury-2',
        name: 'Luxury Abaya - satin class',
        price: 71.0,
        category: 'Luxury Abayas',
        image: '/images/luxury 2.jpg',
        description: 'A luxe finish with a refined drape. Designed for special occasions while still feeling lightweight and elegant.'
      },
      {
        id: 'eid-1',
        name: 'Eid Collection – Pearl Detail',
        price: 89.0,
        category: 'Eid Collection',
        image: '/images/b6a9d67831eec9bdceeb21b9519703bc.jpg',
        description: 'A festive piece with subtle detailing—celebration-ready while staying true to modest essentials.'
      },
      {
        id: 'new-1',
        name: 'New Arrival – Modern Minimal',
        price: 49.0,
        category: 'New Arrivals',
        image: '/images/d77e1257b3736c6ab9d8dc4e3888ef48.jpg',
        description: 'A modern cut with timeless appeal. Easy to pair with your daily staples and accessories.'
      }
    ];
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(initialProducts, null, 2));
  }

  // Initialize admins
  try {
    await fs.access(ADMINS_FILE);
  } catch {
    const hashedPassword = await bcrypt.hash('HardiHardi', 10);
    const initialAdmins = [{
      id: 'admin-1',
      username: 'admin',
      password: hashedPassword,
      createdAt: new Date().toISOString()
    }];
    await fs.writeFile(ADMINS_FILE, JSON.stringify(initialAdmins, null, 2));
  }
}

// Helper functions
async function readProducts() {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeProducts(products) {
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

async function readAdmins() {
  try {
    const data = await fs.readFile(ADMINS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Middleware to verify admin token
function verifyAdminToken(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await readProducts();
    const category = req.query.category;
    const filtered = category
      ? products.filter(p => p.category === category)
      : products;
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const products = await readProducts();
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password required' });
    }

    const admins = await readAdmins();
    const admin = admins[0]; // For simplicity, using first admin

    if (!admin) {
      return res.status(500).json({ error: 'Admin not configured' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, admin: { id: admin.id, username: admin.username } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Create product (admin only)
app.post('/api/products', verifyAdminToken, async (req, res) => {
  try {
    const { name, price, category, image, description } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Name, price, and category are required' });
    }

    const products = await readProducts();
    const id = uuidv4();

    const newProduct = {
      id,
      name: String(name).trim(),
      price: Number(price),
      category: String(category).trim(),
      image: String(image || '').trim(),
      description: String(description || '').trim()
    };

    products.push(newProduct);
    await writeProducts(products);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product (admin only)
app.put('/api/products/:id', verifyAdminToken, async (req, res) => {
  try {
    const { name, price, category, image, description } = req.body;
    const products = await readProducts();
    const index = products.findIndex(p => p.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updatedProduct = {
      ...products[index],
      name: name !== undefined ? String(name).trim() : products[index].name,
      price: price !== undefined ? Number(price) : products[index].price,
      category: category !== undefined ? String(category).trim() : products[index].category,
      image: image !== undefined ? String(image).trim() : products[index].image,
      description: description !== undefined ? String(description).trim() : products[index].description
    };

    products[index] = updatedProduct;
    await writeProducts(products);

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product (admin only)
app.delete('/api/products/:id', verifyAdminToken, async (req, res) => {
  try {
    const products = await readProducts();
    const filtered = products.filter(p => p.id !== req.params.id);

    if (filtered.length === products.length) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await writeProducts(filtered);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Serve frontend for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
async function startServer() {
  await initializeData();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Frontend served from: http://localhost:${PORT}`);
    console.log(`API available at: http://localhost:${PORT}/api`);
  });
}

startServer().catch(console.error);