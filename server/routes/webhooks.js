const express = require('express');
const router = express.Router();
const { saveAppointment } = require('../models/Appointment');
const { saveCallLog } = require('../models/CallLog');
const { sendCallBookingNotification, NOTIFICATION_EMAIL } = require('../services/emailService');

/**
 * Universal Webhook Handler for Telephony AI Agents & Voice Calls
 * Supports Dialflow, Neura-call, Vapi, Retell, Bland AI, Twilio, and standard webhooks.
 */
const handleVoiceWebhook = async (req, res) => {
  try {
    const body = req.body || {};
    console.log('[Vedanco AI Webhook] Received payload:', JSON.stringify(body).slice(0, 300));

    // Extract parameters from potential nested structures
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

    // Phone extraction
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
    const formattedPhone = cleanPhone.length === 10 ? `+91 ${cleanPhone}` : String(phone);

    // Name extraction
    let name =
      merged.clientName ||
      merged.name ||
      merged.customerName ||
      merged.customer_name ||
      merged.callerName ||
      merged.caller_name ||
      `Caller (${formattedPhone})`;

    // Email extraction
    let email =
      merged.clientEmail ||
      merged.email ||
      merged.customerEmail ||
      `${cleanPhone}@vedanco.ai`;

    // Date extraction
    let rawDate =
      merged.appointmentDate ||
      merged.date ||
      merged.scheduledDate ||
      merged.preferredDate ||
      merged.slot_date ||
      merged['date-time'] ||
      merged.datetime ||
      merged.dateTime ||
      '';

    // Time extraction
    let rawTime =
      merged.appointmentTime ||
      merged.time ||
      merged.timeSlot ||
      merged.scheduledTime ||
      merged.preferredTime ||
      merged.slot_time ||
      '';

    // If combined datetime string
    if (rawDate && (rawDate.includes('T') || rawDate.includes(' '))) {
      const parts = rawDate.split(/[T ]/);
      if (!rawTime && parts[1]) {
        rawTime = parts[1].slice(0, 5);
      }
      rawDate = parts[0];
    }

    // Relative dates
    const now = new Date();
    if (!rawDate || rawDate.toLowerCase() === 'today') {
      rawDate = now.toISOString().split('T')[0];
    } else if (rawDate.toLowerCase() === 'tomorrow') {
      const tomorrow = new Date(now.getTime() + 86400000);
      rawDate = tomorrow.toISOString().split('T')[0];
    }

    if (!rawTime) {
      rawTime = '11:00 AM';
    } else {
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

    // Service & Notes
    const serviceType = merged.serviceType || merged.industry || merged.type || 'AI Voice Receptionist Demo & Consultation';
    const notes = merged.notes || merged.summary || merged.transcript || 'Appointment booked during live AI voice call';

    // 1. Save appointment in MongoDB
    const appointmentRecord = await saveAppointment({
      clientName: name,
      customerName: name,
      callerName: name,
      clientEmail: email,
      customerEmail: email,
      clientPhone: formattedPhone,
      customerPhone: formattedPhone,
      callerPhone: formattedPhone,
      appointmentDate: rawDate,
      date: rawDate,
      scheduledDate: rawDate,
      appointmentTime: rawTime,
      timeSlot: rawTime,
      scheduledTime: rawTime,
      serviceType,
      type: serviceType,
      status: 'scheduled',
      bookedVia: 'AI Voice Call (Sneha / Telephony Webhook)',
      notes,
    });

    console.log(`[Vedanco AI Webhook] SUCCESS! Appointment saved to MongoDB: ID=${appointmentRecord._id}, Date=${rawDate}, Time=${rawTime}, Phone=${formattedPhone}`);

    // 2. Also log the call session into MongoDB
    try {
      await saveCallLog({
        callerName: name,
        callerPhone: formattedPhone,
        scenario: 'general',
        callDurationSeconds: Number(merged.duration || merged.callDurationSeconds || 45),
        summary: `Live voice call completed. Appointment scheduled for ${rawDate} at ${rawTime}.`,
        detectedIntent: 'Appointment Booking',
        status: 'completed',
        qualificationStatus: 'High Intent • Appointment Booked',
        notes: `Ref: ${appointmentRecord.bookingReference || ''}. Notes: ${notes}`,
      });
    } catch (callLogErr) {
      console.warn('[Vedanco AI Webhook] Non-critical call log notice:', callLogErr.message);
    }

    // 3. Dispatch admin email notification
    try {
      await sendCallBookingNotification({
        clientName: name,
        clientPhone: formattedPhone,
        clientEmail: email,
        appointmentDate: rawDate,
        appointmentTime: rawTime,
        serviceType,
        notes,
      });
    } catch (mailErr) {
      console.warn('[Vedanco AI Webhook] Email notice:', mailErr.message);
    }

    // Response formatted for various AI Voice Platforms
    return res.status(200).json({
      success: true,
      message: `Appointment successfully booked for ${rawDate} at ${rawTime}! Stored in MongoDB.`,
      result: `Appointment successfully booked for ${rawDate} at ${rawTime}!`,
      fulfillmentText: `Thank you! Your appointment has been scheduled for ${rawDate} at ${rawTime}. Sneha has saved it in our system.`,
      fulfillment_response: {
        messages: [
          {
            text: {
              text: [`Your appointment has been scheduled for ${rawDate} at ${rawTime}.`],
            },
          },
        ],
      },
      appointment: appointmentRecord,
      targetEmail: NOTIFICATION_EMAIL,
    });
  } catch (err) {
    console.error('[Vedanco AI Webhook] Failed to process webhook:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to process voice webhook.',
      error: err.message,
    });
  }
};

router.post('/', handleVoiceWebhook);
router.post('/call', handleVoiceWebhook);
router.post('/appointment', handleVoiceWebhook);

module.exports = router;
