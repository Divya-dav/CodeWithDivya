const User = require('../models/User');
const Course = require('../models/Course');

// @desc    Get student profile
// @route   GET /api/students/profile
// @access  Private (Student)
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get student enrolled courses
// @route   GET /api/students/my-course
// @access  Private (Student)
const getMyCourse = async (req, res) => {
  try {
    const student = await User.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const interest = student.courseInterested;
    let query = {};

    if (interest === 'C') {
      query = { title: { $regex: /C Language/i } };
    } else if (interest === 'Python') {
      query = { title: { $regex: /Python/i } };
    } else if (interest === 'Both') {
      query = { title: { $in: [ /C Language/i, /Python/i ] } };
      // Alternatively, find all courses matching either C or Python:
      const courses = await Course.find({
        $or: [
          { title: { $regex: /C Language/i } },
          { title: { $regex: /Python/i } }
        ]
      });
      return res.status(200).json({
        success: true,
        data: courses,
      });
    } else {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const courses = await Course.find(query);
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProfile,
  getMyCourse,
};
