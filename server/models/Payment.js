const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Please add student name'],
    },
    email: {
      type: String,
      required: [true, 'Please add student email'],
    },
    course: {
      type: String,
      required: [true, 'Please add course name'],
      enum: ['C', 'Python', 'Both'],
    },
    transactionId: {
      type: String,
      required: [true, 'Please add transaction ID'],
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid'],
      default: 'Pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
