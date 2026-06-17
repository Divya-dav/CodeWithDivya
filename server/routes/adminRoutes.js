const express = require('express');
const {
  getStudents,
  getStats,
  updateStudentPayment,
  updateStudentStatus,
  deleteStudent,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply auth protection & admin authorization to all routes below
router.use(protect);
router.use(adminOnly);

router.get('/students', getStudents);
router.get('/stats', getStats);
router.put('/students/:id/payment', updateStudentPayment);
router.put('/students/:id/status', updateStudentStatus);
router.delete('/students/:id', deleteStudent);

module.exports = router;
