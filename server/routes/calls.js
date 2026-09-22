const express = require('express');
const router = express.Router();
const {
  saveCallLog,
  getCallLogs,
  getCallById,
  deleteCallLog,
  getCallsAnalytics,
} = require('../models/CallLog');

// POST /api/calls - Save completed AI receptionist call session
router.post('/', async (req, res) => {
  try {
    const {
      callerName,
      callerPhone,
      scenario,
      callDurationSeconds,
      transcript,
      summary,
      detectedIntent,
      status,
      qualificationStatus,
      transferredTo,
      notes,
    } = req.body;

    const newCall = await saveCallLog({
      callerName: callerName || 'Inbound Caller',
      callerPhone: callerPhone || '+1 (800) 555-0100',
      scenario: scenario || 'general',
      callDurationSeconds: Number(callDurationSeconds) || 45,
      transcript: transcript || [],
      summary: summary || 'AI Receptionist answered caller questions and logged details.',
      detectedIntent: detectedIntent || 'General Inquiry',
      status: status || 'completed',
      qualificationStatus: qualificationStatus || 'Qualified & Verified',
      transferredTo: transferredTo || null,
      notes: notes || '',
    });

    console.log(`[Vedanco AI] Call session logged: Scenario=${newCall.scenario}, Duration=${newCall.callDurationSeconds}s, Status=${newCall.status}`);

    return res.status(201).json({
      success: true,
      message: 'Call session logged successfully.',
      call: newCall,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error logging call session:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error logging call session.',
    });
  }
});

// GET /api/calls/analytics - Call analytics & performance metrics
router.get('/analytics', async (req, res) => {
  try {
    const analytics = await getCallsAnalytics();
    return res.json({
      success: true,
      analytics,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error fetching call analytics:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch call analytics.',
    });
  }
});

// GET /api/calls - List recent calls
router.get('/', async (req, res) => {
  try {
    const { scenario, status, search, limit } = req.query;
    const calls = await getCallLogs({ scenario, status, search, limit });
    return res.json({
      success: true,
      count: calls.length,
      calls,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error fetching calls:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch call logs.',
    });
  }
});

// GET /api/calls/:id - Get single call log with transcript
router.get('/:id', async (req, res) => {
  try {
    const call = await getCallById(req.params.id);
    if (!call) {
      return res.status(404).json({
        success: false,
        message: `Call log not found with id: ${req.params.id}`,
      });
    }
    return res.json({
      success: true,
      call,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error fetching call by id:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch call details.',
    });
  }
});

// DELETE /api/calls/:id - Delete a call log
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteCallLog(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Call log not found with id: ${req.params.id}`,
      });
    }
    return res.json({
      success: true,
      message: 'Call log deleted successfully.',
    });
  } catch (error) {
    console.error('[Vedanco AI] Error deleting call log:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete call log.',
    });
  }
});

module.exports = router;
