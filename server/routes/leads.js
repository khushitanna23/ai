const express = require('express');
const router = express.Router();
const {
  saveLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getLeadsStats,
} = require('../models/Lead');

// POST /api/leads - Book a Demo / Contact inquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, industry, estimatedCallVolume, notes, tags } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone number are required.',
      });
    }

    const newLead = await saveLead({
      name,
      email,
      phone,
      company: company || 'Not specified',
      industry: industry || 'General Business',
      estimatedCallVolume: estimatedCallVolume || '100-500 calls/month',
      notes: notes || '',
      tags: tags || ['Website Demo'],
      source: 'Website Demo Request',
    });

    console.log(`[Vedanco AI] New Demo Request recorded for: ${name} (${email})`);

    return res.status(201).json({
      success: true,
      message: 'Demo request received successfully! Our team will contact you within 24 business hours to set up your tailored demonstration.',
      lead: newLead,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error saving lead:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error while processing your demo request.',
    });
  }
});

// GET /api/leads/stats - Summary statistics of leads
router.get('/stats', async (req, res) => {
  try {
    const stats = await getLeadsStats();
    return res.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error fetching lead stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch lead stats.',
    });
  }
});

// GET /api/leads - Get captured leads (Internal/Admin with filtering)
router.get('/', async (req, res) => {
  try {
    const { status, industry, search } = req.query;
    const leads = await getLeads({ status, industry, search });
    return res.json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error fetching leads:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while fetching leads.',
    });
  }
});

// GET /api/leads/:id - Get single lead detail
router.get('/:id', async (req, res) => {
  try {
    const lead = await getLeadById(req.params.id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: `Lead not found with id: ${req.params.id}`,
      });
    }
    return res.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error fetching lead by id:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching lead details.',
    });
  }
});

// PATCH /api/leads/:id - Update lead status or notes
router.patch('/:id', async (req, res) => {
  try {
    const updated = await updateLead(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Lead not found with id: ${req.params.id}`,
      });
    }
    return res.json({
      success: true,
      message: 'Lead updated successfully.',
      lead: updated,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error updating lead:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating lead.',
    });
  }
});

// DELETE /api/leads/:id - Remove a lead
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteLead(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Lead not found with id: ${req.params.id}`,
      });
    }
    return res.json({
      success: true,
      message: 'Lead deleted successfully.',
    });
  } catch (error) {
    console.error('[Vedanco AI] Error deleting lead:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting lead.',
    });
  }
});

module.exports = router;
