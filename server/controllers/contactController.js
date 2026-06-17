const Contact = require('../models/Contact');

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get in touch soon.',
      data: contact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin)
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  submitContact,
  getContacts,
};
