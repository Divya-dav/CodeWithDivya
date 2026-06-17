const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedData = require('./config/seeder');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB().then(() => {
  // Seed initial courses and admin
  seedData();
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes imports
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const courseRoutes = require('./routes/courseRoutes');
const contactRoutes = require('./routes/contactRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/payments', paymentRoutes);

// Base route for healthcheck
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Code With Divya API server' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
