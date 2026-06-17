const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'divya_secret_key_12345_secure_jwt', {
    expiresIn: '30d',
  });
};

// @desc    Register a new student
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword, courseInterested } = req.body;

    // Validate inputs
    if (!name || !email || !phone || !password || !confirmPassword || !courseInterested) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already registered with this email' });
    }

    // Create student
    const user = await User.create({
      name,
      email,
      phone,
      password, // Password hashed automatically by mongoose pre-save hook
      courseInterested,
      role: 'student', // Registration form is for students only
      paymentStatus: 'Pending',
      courseStatus: 'Active',
    });

    if (user) {
      res.status(201).json({
        success: true,
        message: 'Registration successful! Please login.',
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }

    // Fetch user and include password field (since select: false is set on schema)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Check role mismatch
    if (user.role !== role) {
      return res.status(403).json({ success: false, message: `Access denied: Role mismatch` });
    }

    // Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Return token and user details
    res.status(200).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      courseInterested: user.courseInterested,
      paymentStatus: user.paymentStatus,
      courseStatus: user.courseStatus,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
