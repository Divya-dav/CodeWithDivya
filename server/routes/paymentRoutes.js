const express = require('express');
const {
  submitPayment,
  getPayments,
  updatePaymentStatus,
} = require('../controllers/paymentController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, submitPayment);
router.get('/', protect, adminOnly, getPayments);
router.put('/:id/status', protect, adminOnly, updatePaymentStatus);

module.exports = router;
