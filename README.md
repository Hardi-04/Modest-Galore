# Modest Galore - Full Stack E-commerce

A modern e-commerce site for modest fashion with a complete backend API.

## Features

- 🛍️ **Product Catalog** - Browse abayas and modest fashion
- 🔐 **Admin Panel** - Manage products with authentication
- 🛒 **Shopping Cart** - Add items to cart
- 📱 **Responsive Design** - Works on all devices
- 🔄 **Real-time Updates** - Products sync across all users

## Tech Stack

### Frontend
- **Vite** - Build tool and dev server
- **Vanilla JavaScript** - No frameworks for simplicity
- **CSS** - Custom styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **File-based storage** - Easy to upgrade to database

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. **Clone and setup frontend:**
   ```bash
   npm install
   ```

2. **Setup backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Start both servers:**
   ```bash
   # Terminal 1 - Frontend (port 5173)
   npm run dev

   # Terminal 2 - Backend (port 3002)
   cd backend
   $env:PORT=3002; npm run dev
   ```

4. **Open your browser:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3002/api

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/health` - Health check

## Admin Access

- **URL:** `/admin`
- **Password:** `HardiHardi`
- **Features:**
  - Add new products
  - Edit existing products
  - Delete products
  - Search and filter products

## Project Structure

```
├── backend/                 # Express.js API server
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── data/               # File-based storage
├── src/                    # Frontend source
│   ├── pages/              # Page components
│   ├── store/              # Data management
│   └── styles.css          # Global styles
├── public/                 # Static assets
├── dist/                   # Built frontend
└── package.json            # Frontend dependencies
```

## Deployment

### Backend Deployment
The backend can be deployed to:
- **Heroku**
- **Railway**
- **Vercel** (serverless)
- **DigitalOcean**
- **AWS**

### Frontend Deployment
The frontend can be deployed to:
- **Vercel**
- **Netlify**
- **GitHub Pages**
- **Any static hosting**

### Environment Variables
Create a `.env` file in the root:
```
VITE_API_URL=https://your-backend-url.com/api
```

## Database Upgrade

Currently using file-based storage. To upgrade to a database:

1. **Install database package:**
   ```bash
   cd backend
   npm install mongoose  # for MongoDB
   # or
   npm install pg        # for PostgreSQL
   ```

2. **Update server.js** to use database instead of files

3. **Environment variables:**
   ```
   DATABASE_URL=your-database-connection-string
   ```

## WhatsApp Checkout

The Checkout button opens WhatsApp with a pre-filled message that includes product names and **image links**.

For the seller to open the image links, set your public site URL (once deployed):

```bash
# Windows PowerShell
$env:VITE_PUBLIC_SITE_URL="https://your-domain.com"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own e-commerce site!


