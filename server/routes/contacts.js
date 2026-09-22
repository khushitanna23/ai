const express = require('express');
const router = express.Router();
const {
  saveContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} = require('../models/Contact');

// POST /api/contacts - Submit contact / inquiry form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.',
      });
    }

    const newContact = await saveContact({
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
      status: 'unread',
    });

    console.log(`[Vedanco AI] New Contact message received from: ${name} (${email})`);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will get back to you shortly.',
      contact: newContact,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error saving contact message:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error processing contact inquiry.',
    });
  }
});

// GET /api/contacts - List all contact inquiries
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const contacts = await getContacts({ status });
    return res.json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error fetching contacts:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch contact inquiries.',
    });
  }
});

// GET /api/contacts/:id - Get single inquiry
router.get('/:id', async (req, res) => {
  try {
    const contact = await getContactById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: `Contact not found with id: ${req.params.id}`,
      });
    }
    return res.json({
      success: true,
      contact,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error fetching contact by id:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching contact inquiry.',
    });
  }
});

// PATCH /api/contacts/:id/status - Update contact inquiry status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required.',
      });
    }
    const updated = await updateContactStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Contact not found with id: ${req.params.id}`,
      });
    }
    return res.json({
      success: true,
      message: 'Contact status updated.',
      contact: updated,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error updating contact status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update status.',
    });
  }
});

// DELETE /api/contacts/:id - Delete inquiry
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteContact(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Contact not found with id: ${req.params.id}`,
      });
    }
    return res.json({
      success: true,
      message: 'Contact deleted successfully.',
    });
  } catch (error) {
    console.error('[Vedanco AI] Error deleting contact:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete contact.',
    });
  }
});

module.exports = router;
