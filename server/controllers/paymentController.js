const Payment = require('../models/Payment');
const User = require('../models/User');

// @desc    Submit payment transaction proof
// @route   POST /api/payments
// @access  Private (Student)
const submitPayment = async (req, res) => {
  try {
    const { studentName, email, course, transactionId } = req.body;

    if (!studentName || !email || !course || !transactionId) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Check if transaction ID has already been submitted
    const transactionExists = await Payment.findOne({ transactionId });
    if (transactionExists) {
      return res.status(400).json({ success: false, message: 'This transaction ID has already been submitted' });
    }

    // Save payment details
    const payment = await Payment.create({
      studentName,
      email,
      course,
      transactionId,
      status: 'Pending',
    });

    // Optionally update student's paymentStatus to Pending in User database
    await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { paymentStatus: 'Pending' }
    );

    res.status(201).json({
      success: true,
      message: 'Payment details submitted successfully! Pending admin verification.',
      data: payment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all payment claims
// @route   GET /api/payments
// @access  Private (Admin)
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update payment claims verification status
// @route   PUT /api/payments/:id/status
// @access  Private (Admin)
const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'Paid' or 'Pending'

    if (!status || !['Pending', 'Paid'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid payment status' });
    }

    // Update payment claim
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found' });
    }

    // Update the corresponding student's user account paymentStatus
    await User.findOneAndUpdate(
      { email: payment.email.toLowerCase() },
      { paymentStatus: status }
    );

    res.status(200).json({
      success: true,
      message: `Payment marked as ${status} successfully. Student status updated.`,
      data: payment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  submitPayment,
  getPayments,
  updatePaymentStatus,
};
