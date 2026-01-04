import Contact from '../models/Contact.js';

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Add authentication later)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private (Add authentication later)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact message not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
