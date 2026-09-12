const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

const { login, register } = require('./controllers/authController');
const { authenticateToken, isAdmin } = require("./middleware/authMiddleware");

const { getAllCustomers, getCustomerById, getCustomerOrders } = require('./controllers/customersController');
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductStats } = require('./controllers/productsController');
const { getAllOrders, getOrderMonthlyStats } = require('./controllers/ordersController');

// Auth Routes
app.post('/api/login', login);
app.post('/api/users/register', register);
app.post('/api/register', register);

// Customers Routes
app.get('/api/customers', authenticateToken, isAdmin, getAllCustomers);
app.get('/api/customers/:id', authenticateToken, isAdmin, getCustomerById);
app.get('/api/customers/:id/orders', authenticateToken, isAdmin, getCustomerOrders);

// Stats Route (Chart.js Slide 8-9 & 24) - Restricted to Admin
app.get('/api/stats', authenticateToken, isAdmin, getProductStats);
app.get('/api/products/stats', authenticateToken, isAdmin, getProductStats);
app.get('/api/orders/stats/monthly', authenticateToken, isAdmin, getOrderMonthlyStats);

// Products Routes
app.get('/api/products', authenticateToken, getAllProducts);
app.get('/api/products/:id', getProductById);
app.post('/api/products', authenticateToken, isAdmin, createProduct);
app.put('/api/products/:id', authenticateToken, isAdmin, updateProduct);
app.delete('/api/products/:id', authenticateToken, isAdmin, deleteProduct);

// Orders Routes
app.get('/api/orders', authenticateToken, isAdmin, getAllOrders);

// Error-handling middleware
app.use(function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
