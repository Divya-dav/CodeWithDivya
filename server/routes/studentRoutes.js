const express = require('express');
const { getProfile, getMyCourse } = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', protect, getProfile);
router.get('/my-course', protect, getMyCourse);

module.exports = router;
