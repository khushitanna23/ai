const express = require('express');
const router = express.Router();
const {
  saveCallLog,
  getCallLogs,
  getCallById,
  deleteCallLog,
  getCallsAnalytics,
} = require('../models/CallLog');
const { saveAppointment } = require('../models/Appointment');

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
      appointmentDate,
      appointmentTime,
      date,
      time,
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

    // If an appointment was booked during this call, save it directly to MongoDB
    let bookedAppointment = null;
    const resolvedDate = appointmentDate || date;
    const resolvedTime = appointmentTime || time;
    if (resolvedDate && resolvedTime) {
      try {
        bookedAppointment = await saveAppointment({
          clientName: callerName || 'Inbound Caller',
          clientPhone: callerPhone || '+91 9557149619',
          appointmentDate: resolvedDate,
          appointmentTime: resolvedTime,
          serviceType: scenario || 'AI Voice Demo',
          notes: notes || summary || 'Booked during phone call session',
          bookedVia: 'AI Voice Call Session',
          callId: String(newCall._id || ''),
        });
        console.log(`[Vedanco AI] Appointment automatically stored in MongoDB from call session!`);
      } catch (apptErr) {
        console.error('[Vedanco AI] Failed to auto-save appointment from call:', apptErr.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Call session logged successfully.',
      call: newCall,
      appointment: bookedAppointment,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error logging call session:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error logging call session.',
    });
  }
});

// POST /api/calls/appointment - Book appointment from call
router.post('/appointment', async (req, res) => {
  try {
    const {
      callId,
      callerName,
      name,
      callerPhone,
      phone,
      appointmentDate,
      date,
      appointmentTime,
      time,
      notes,
      scenario,
    } = req.body;

    const resolvedPhone = callerPhone || phone || '+91 9557149619';
    const resolvedName = callerName || name || `Caller (${resolvedPhone})`;
    const resolvedDate = appointmentDate || date || new Date().toISOString().split('T')[0];
    const resolvedTime = appointmentTime || time || '11:00 AM';

    const newAppt = await saveAppointment({
      clientName: resolvedName,
      clientPhone: resolvedPhone,
      appointmentDate: resolvedDate,
      appointmentTime: resolvedTime,
      serviceType: scenario || 'AI Voice Receptionist Demo',
      notes: notes || 'Booked during call',
      bookedVia: 'AI Voice Call (Sneha)',
      callId: callId || '',
    });

    return res.status(201).json({
      success: true,
      message: `Appointment scheduled successfully for ${resolvedDate} at ${resolvedTime}! Stored in MongoDB.`,
      appointment: newAppt,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error booking appointment from call.',
    });
  }
});

// POST /api/calls/webhook - Telephony webhook for incoming call events
router.post('/webhook', async (req, res) => {
  try {
    const body = req.body || {};
    const phone = body.phone || body.callerPhone || body.customer_number || body.caller_phone || body.from || '+91 9557149619';
    const date = body.appointmentDate || body.date || body.scheduledDate || body.datetime?.split('T')[0] || body.slot_date;
    const time = body.appointmentTime || body.time || body.scheduledTime || body.timeSlot || body.slot_time || '11:00 AM';

    let appt = null;
    if (date) {
      appt = await saveAppointment({
        clientPhone: phone,
        clientName: body.name || body.callerName || `Caller (${phone})`,
        appointmentDate: date,
        appointmentTime: time,
        notes: body.notes || body.summary || body.transcript || 'Booked via telephony webhook',
        bookedVia: 'AI Voice Call Webhook',
      });
      console.log(`[Vedanco AI Webhook] Call appointment stored in MongoDB: ${date} at ${time}`);
    }

    return res.json({
      success: true,
      message: 'Call webhook processed successfully.',
      result: date ? `Appointment confirmed for ${date} at ${time}` : 'Call recorded',
      fulfillmentText: date ? `Your appointment has been booked for ${date} at ${time}.` : 'Call event received.',
      appointment: appt,
    });
  } catch (error) {
    console.error('[Vedanco AI Webhook] Error:', error);
    return res.status(500).json({ success: false, message: error.message });
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
