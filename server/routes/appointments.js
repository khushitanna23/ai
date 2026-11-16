const express = require('express');
const router = express.Router();
const {
  saveAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} = require('../models/Appointment');
const { sendCallBookingNotification, NOTIFICATION_EMAIL } = require('../services/emailService');

// Helper to parse date/time & caller details from various telephony & webhook formats
const parseDateTimePayload = (body = {}) => {
  // Check nested containers (Dialflow, Retell, Vapi, Bland, or custom webhook)
  const params =
    body.parameters ||
    body.queryResult?.parameters ||
    body.sessionInfo?.parameters ||
    body.args ||
    body.extracted_data ||
    body.call?.extracted_data ||
    body.data ||
    body.tool_call?.arguments ||
    {};

  let parsedParams = params;
  if (typeof params === 'string') {
    try {
      parsedParams = JSON.parse(params);
    } catch (e) {
      parsedParams = {};
    }
  }

  const merged = { ...body, ...parsedParams };

  // Resolve Phone
  let phone =
    merged.clientPhone ||
    merged.phone ||
    merged.callerPhone ||
    merged.caller_phone ||
    merged.customerPhone ||
    merged.customer_phone ||
    merged.customer_number ||
    merged.from ||
    merged.userPhone ||
    body.call?.customer?.number ||
    '9557149619';

  const cleanPhone = String(phone).replace(/\D/g, '').slice(-10) || '9557149619';

  // Resolve Name
  let name =
    merged.clientName ||
    merged.name ||
    merged.customerName ||
    merged.customer_name ||
    merged.callerName ||
    merged.caller_name ||
    `Caller (+91 ${cleanPhone})`;

  // Resolve Email
  let email =
    merged.clientEmail ||
    merged.email ||
    merged.customerEmail ||
    merged.customer_email ||
    `${cleanPhone}@vedanco.ai`;

  // Resolve Date & Time
  let rawDate =
    merged.appointmentDate ||
    merged.date ||
    merged.scheduledDate ||
    merged.preferredDate ||
    merged.slot_date ||
    merged['date-time'] ||
    merged.datetime ||
    merged.dateTime ||
    merged.date_time ||
    '';

  let rawTime =
    merged.appointmentTime ||
    merged.time ||
    merged.timeSlot ||
    merged.scheduledTime ||
    merged.preferredTime ||
    merged.slot_time ||
    '';

  // If rawDate contains a combined ISO or datetime (e.g. 2026-11-20T14:00:00Z)
  if (rawDate && (rawDate.includes('T') || rawDate.includes(' '))) {
    const parts = rawDate.split(/[T ]/);
    if (!rawTime && parts[1]) {
      rawTime = parts[1].slice(0, 5);
    }
    rawDate = parts[0];
  }

  // Handle relative dates
  const now = new Date();
  if (!rawDate || rawDate.toLowerCase() === 'today') {
    rawDate = now.toISOString().split('T')[0];
  } else if (rawDate.toLowerCase() === 'tomorrow') {
    const tomorrow = new Date(now.getTime() + 86400000);
    rawDate = tomorrow.toISOString().split('T')[0];
  }

  // Handle default time if empty
  if (!rawTime) {
    rawTime = '11:00 AM';
  } else {
    // Format simple time like "3pm", "3:00pm", "14:00"
    const lowerTime = String(rawTime).trim().toLowerCase();
    if (lowerTime.endsWith('pm') || lowerTime.endsWith('am')) {
      rawTime = rawTime.toUpperCase();
    } else if (lowerTime.includes(':')) {
      const [h, m] = lowerTime.split(':');
      const hourNum = parseInt(h, 10);
      if (!isNaN(hourNum)) {
        const period = hourNum >= 12 ? 'PM' : 'AM';
        const displayHour = hourNum % 12 || 12;
        rawTime = `${String(displayHour).padStart(2, '0')}:${m.slice(0, 2)} ${period}`;
      }
    }
  }

  return {
    name,
    email,
    phone: cleanPhone.length === 10 ? `+91 ${cleanPhone}` : phone,
    date: rawDate,
    time: rawTime,
    serviceType: merged.serviceType || merged.industry || merged.type || 'AI Voice Receptionist Demo & Consultation',
    company: merged.company || 'Not specified',
    timezone: merged.timezone || 'Asia/Kolkata (IST)',
    notes: merged.notes || merged.summary || merged.transcript || '',
    bookedVia: merged.bookedVia || 'AI Voice Call (Sneha)',
    callId: merged.callId || merged.reference || body.reference || '',
  };
};

// Common booking handler logic
const handleCreateAppointment = async (req, res) => {
  try {
    const parsed = parseDateTimePayload(req.body);

    const appointmentPayload = {
      clientName: parsed.name,
      customerName: parsed.name,
      callerName: parsed.name,
      clientEmail: parsed.email,
      customerEmail: parsed.email,
      clientPhone: parsed.phone,
      customerPhone: parsed.phone,
      callerPhone: parsed.phone,
      company: parsed.company,
      serviceType: parsed.serviceType,
      appointmentDate: parsed.date,
      date: parsed.date,
      scheduledDate: parsed.date,
      appointmentTime: parsed.time,
      timeSlot: parsed.time,
      scheduledTime: parsed.time,
      timezone: parsed.timezone,
      status: 'scheduled',
      bookedVia: parsed.bookedVia,
      notes: parsed.notes,
      callId: parsed.callId,
    };

    const newAppt = await saveAppointment(appointmentPayload);

    console.log(`[Vedanco AI] Appointment booked in MongoDB for: ${parsed.name} (${parsed.phone}) on ${parsed.date} at ${parsed.time}`);

    // Dispatch email notification to khushitanna310@gmail.com
    let emailResult = { success: false };
    try {
      emailResult = await sendCallBookingNotification({
        ...appointmentPayload,
        industry: parsed.serviceType,
      });
    } catch (mailErr) {
      console.error('[Vedanco AI] Failed to dispatch booking email:', mailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: `Appointment scheduled successfully for ${parsed.date} at ${parsed.time}! Details stored in MongoDB and sent to ${NOTIFICATION_EMAIL}.`,
      result: `Appointment scheduled successfully for ${parsed.date} at ${parsed.time}!`,
      fulfillmentText: `Great! Your appointment has been successfully scheduled for ${parsed.date} at ${parsed.time}.`,
      appointment: newAppt,
      notificationSent: emailResult.success,
      targetEmail: NOTIFICATION_EMAIL,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error booking appointment in MongoDB:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error booking appointment.',
    });
  }
};

// POST /api/appointments - Book a new demo call / appointment
router.post('/', handleCreateAppointment);

// POST /api/appointments/webhook - Direct webhook endpoint for telephony AI agents (Dialflow / Neura-call)
router.post('/webhook', handleCreateAppointment);

// POST /api/appointments/book-from-call - Dedicated endpoint for in-call appointment bookings
router.post('/book-from-call', handleCreateAppointment);

// GET /api/appointments - List appointments with optional filters
router.get('/', async (req, res) => {
  try {
    const { status, date, search } = req.query;
    const appointments = await getAppointments({ status, date, search });
    return res.json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error fetching appointments:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments.',
    });
  }
});

// GET /api/appointments/:id - Single appointment detail
router.get('/:id', async (req, res) => {
  try {
    const appt = await getAppointmentById(req.params.id);
    if (!appt) {
      return res.status(404).json({
        success: false,
        message: `Appointment not found with id: ${req.params.id}`,
      });
    }
    return res.json({
      success: true,
      appointment: appt,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error fetching appointment by id:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch appointment details.',
    });
  }
});

// PATCH /api/appointments/:id - Update status or reschedule
router.patch('/:id', async (req, res) => {
  try {
    const updated = await updateAppointment(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Appointment not found with id: ${req.params.id}`,
      });
    }
    return res.json({
      success: true,
      message: 'Appointment updated successfully.',
      appointment: updated,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error updating appointment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update appointment.',
    });
  }
});

// DELETE /api/appointments/:id - Cancel/delete appointment
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteAppointment(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Appointment not found with id: ${req.params.id}`,
      });
    }
    return res.json({
      success: true,
      message: 'Appointment deleted successfully.',
    });
  } catch (error) {
    console.error('[Vedanco AI] Error deleting appointment:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete appointment.',
    });
  }
});

module.exports = router;
