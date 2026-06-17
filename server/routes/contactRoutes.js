const express = require('express');
const { submitContact, getContacts } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', submitContact);
router.get('/', protect, adminOnly, getContacts);

module.exports = router;
