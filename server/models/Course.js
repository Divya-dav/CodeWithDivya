const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a course title'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    priceFirst20: {
      type: Number,
      required: [true, 'Please add price for the first 20 students'],
    },
    priceAfter20: {
      type: Number,
      required: [true, 'Please add price after first 20 students'],
    },
    duration: {
      type: String,
      default: '1 month',
    },
    topics: {
      type: [String],
      required: [true, 'Please add list of topics'],
    },
    schedule: {
      type: String,
      required: [true, 'Please add a class schedule'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Course', courseSchema);
