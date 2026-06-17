const User = require('../models/User');

// @desc    Get all students (with search and filter)
// @route   GET /api/admin/students
// @access  Private (Admin)
const getStudents = async (req, res) => {
  try {
    const { search, course } = req.query;
    let query = { role: 'student' };

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Course filter
    if (course && course !== 'All') {
      query.courseInterested = course;
    }

    const students = await User.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get analytics and stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const cStudents = await User.countDocuments({ role: 'student', courseInterested: 'C' });
    const pythonStudents = await User.countDocuments({ role: 'student', courseInterested: 'Python' });
    const bothStudents = await User.countDocuments({ role: 'student', courseInterested: 'Both' });

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        cStudents,
        pythonStudents,
        bothStudents,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update student payment status
// @route   PUT /api/admin/students/:id/payment
// @access  Private (Admin)
const updateStudentPayment = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    if (!paymentStatus || !['Pending', 'Paid'].includes(paymentStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid payment status value' });
    }

    const student = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'student' },
      { paymentStatus },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Student payment status updated successfully',
      data: student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update student course status
// @route   PUT /api/admin/students/:id/status
// @access  Private (Admin)
const updateStudentStatus = async (req, res) => {
  try {
    const { courseStatus } = req.body;

    if (!courseStatus || !['Active', 'Completed'].includes(courseStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid course status value' });
    }

    const student = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'student' },
      { courseStatus },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Student course status updated successfully',
      data: student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete student profile
// @route   DELETE /api/admin/students/:id
// @access  Private (Admin)
const deleteStudent = async (req, res) => {
  try {
    const student = await User.findOneAndDelete({ _id: req.params.id, role: 'student' });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Student record deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getStudents,
  getStats,
  updateStudentPayment,
  updateStudentStatus,
  deleteStudent,
};
