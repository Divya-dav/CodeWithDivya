const User = require('../models/User');
const Course = require('../models/Course');

const seedData = async () => {
  try {
    // 1. Seed Courses if database is empty
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      console.log('Seeding courses...');
      await Course.create([
        {
          title: 'C Language',
          description: 'Beginner-friendly C language class covering procedural coding, memory layouts, arrays, and standard libraries.',
          priceFirst20: 499,
          priceAfter20: 499,
          duration: '1 month',
          schedule: '7:20 PM to 8:40 PM',
          topics: [
            'Introduction to C',
            'Variables and Data Types',
            'Operators',
            'Input and Output',
            'Conditional Statements',
            'Loops',
            'Functions',
            'Arrays',
            'Strings',
            'Pointers',
            'Structures',
            'File Handling',
            'Practice Programs'
          ]
        },
        {
          title: 'Python Programming',
          description: 'Comprehensive guide to Python syntax, structures, modules, file IO, and simple software script creation.',
          priceFirst20: 499,
          priceAfter20: 499,
          duration: '1 month',
          schedule: '7:20 PM to 8:40 PM',
          topics: [
            'Python Basics',
            'Variables',
            'Input and Output',
            'Conditions',
            'Loops',
            'Functions',
            'Lists',
            'Tuples',
            'Dictionaries',
            'Strings',
            'File Handling',
            'Mini Projects'
          ]
        }
      ]);
      console.log('Courses seeded successfully!');
    }

    // 2. Seed Admin User if not exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      console.log('Creating default admin account...');
      await User.create({
        name: 'Divya',
        email: 'codewithdivyaa@gmail.com',
        phone: '9963080169',
        password: 'Divya@407', // Will be hashed automatically by Mongoose pre-save
        role: 'admin',
        courseInterested: 'Both',
        paymentStatus: 'Paid',
        courseStatus: 'Active'
      });
      console.log('Admin account created: email = codewithdivyaa@gmail.com, password = Divya@407');
    }
  } catch (error) {
    console.error('Error seeding data:', error.message);
  }
};

module.exports = seedData;
