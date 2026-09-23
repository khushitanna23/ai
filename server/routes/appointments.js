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

// POST /api/appointments - Book a new demo call / appointment
router.post('/', async (req, res) => {
  try {
    const {
      clientName,
      name,
      clientEmail,
      email,
      clientPhone,
      phone,
      company,
      serviceType,
      industry,
      appointmentDate,
      preferredDate,
      appointmentTime,
      preferredTime,
      timezone,
      notes,
      bookedVia,
    } = req.body;

    const resolvedName = clientName || name;
    const resolvedEmail = clientEmail || email;
    const resolvedPhone = clientPhone || phone;
    const resolvedDate = appointmentDate || preferredDate;
    const resolvedTime = appointmentTime || preferredTime;
    const resolvedIndustry = industry || serviceType || 'AI Receptionist Demo';

    if (!resolvedName || !resolvedEmail || !resolvedPhone || !resolvedDate || !resolvedTime) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone number, preferred date, and preferred time are required.',
      });
    }

    const appointmentPayload = {
      clientName: resolvedName,
      clientEmail: resolvedEmail,
      clientPhone: resolvedPhone,
      company: company || 'Not specified',
      serviceType: resolvedIndustry,
      appointmentDate: resolvedDate,
      appointmentTime: resolvedTime,
      timezone: timezone || 'Local Time',
      status: 'scheduled',
      bookedVia: bookedVia || 'Website Demo Call Form',
      notes: notes || '',
    };

    const newAppt = await saveAppointment(appointmentPayload);

    console.log(`[Vedanco AI] Demo Call booked for: ${resolvedName} (${resolvedPhone}) on ${resolvedDate} at ${resolvedTime}`);

    // Dispatch email notification to khushitanna310@gmail.com
    let emailResult = { success: false };
    try {
      emailResult = await sendCallBookingNotification({
        ...appointmentPayload,
        industry: resolvedIndustry,
      });
    } catch (mailErr) {
      console.error('[Vedanco AI] Failed to dispatch booking email:', mailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: `Demo call scheduled successfully for ${resolvedDate} at ${resolvedTime}! Details sent to ${NOTIFICATION_EMAIL}.`,
      appointment: newAppt,
      notificationSent: emailResult.success,
      targetEmail: NOTIFICATION_EMAIL,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error booking appointment:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error booking appointment.',
    });
  }
});

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
