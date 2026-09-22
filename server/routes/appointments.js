const express = require('express');
const router = express.Router();
const {
  saveAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} = require('../models/Appointment');

// POST /api/appointments - Book a new appointment
router.post('/', async (req, res) => {
  try {
    const { clientName, clientEmail, clientPhone, company, serviceType, appointmentDate, appointmentTime, timezone, notes, bookedVia } = req.body;

    if (!clientName || !clientEmail || !clientPhone || !appointmentDate || !appointmentTime) {
      return res.status(400).json({
        success: false,
        message: 'clientName, clientEmail, clientPhone, appointmentDate, and appointmentTime are required.',
      });
    }

    const newAppt = await saveAppointment({
      clientName,
      clientEmail,
      clientPhone,
      company: company || 'Not specified',
      serviceType: serviceType || 'Demo & Consultation',
      appointmentDate,
      appointmentTime,
      timezone: timezone || 'America/New_York (EST)',
      status: 'scheduled',
      bookedVia: bookedVia || 'AI Receptionist Live Engine',
      notes: notes || '',
    });

    console.log(`[Vedanco AI] Appointment booked for: ${clientName} on ${appointmentDate} at ${appointmentTime}`);

    return res.status(201).json({
      success: true,
      message: `Appointment scheduled successfully for ${appointmentDate} at ${appointmentTime}!`,
      appointment: newAppt,
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
