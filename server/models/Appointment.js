const mongoose = require('mongoose');
const { getIsConnected } = require('../config/db');

const AppointmentSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      default: 'Phone Caller',
      trim: true,
    },
    customerName: {
      type: String,
      trim: true,
    },
    callerName: {
      type: String,
      trim: true,
    },
    clientEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: 'caller@vedanco.ai',
    },
    customerEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    clientPhone: {
      type: String,
      required: [true, 'Client phone number is required'],
      trim: true,
    },
    customerPhone: {
      type: String,
      trim: true,
    },
    callerPhone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: 'Individual / Not specified',
    },
    serviceType: {
      type: String,
      default: 'AI Voice Receptionist Demo & Consultation',
      trim: true,
    },
    type: {
      type: String,
      default: 'Discovery Consultation',
    },
    appointmentDate: {
      type: String,
      required: [true, 'Appointment date is required (YYYY-MM-DD)'],
    },
    date: {
      type: String,
    },
    scheduledDate: {
      type: String,
    },
    appointmentTime: {
      type: String,
      required: [true, 'Appointment time is required (e.g. 10:00 AM)'],
    },
    timeSlot: {
      type: String,
    },
    scheduledTime: {
      type: String,
    },
    scheduledDateTime: {
      type: Date,
    },
    bookingReference: {
      type: String,
      trim: true,
    },
    callId: {
      type: String,
      trim: true,
    },
    timezone: {
      type: String,
      default: 'Asia/Kolkata (IST)',
    },
    status: {
      type: String,
      default: 'scheduled',
    },
    bookedVia: {
      type: String,
      default: 'AI Voice Call (Sneha)',
      trim: true,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

let MongoAppointmentModel;
try {
  MongoAppointmentModel = mongoose.model('Appointment', AppointmentSchema);
} catch (e) {
  MongoAppointmentModel = mongoose.models.Appointment;
}

// In-memory fallback store
let memoryAppointments = [
  {
    _id: 'appt_sample_1',
    clientName: 'Dr. Robert Harrison',
    clientEmail: 'harrison@bostondental.org',
    clientPhone: '+1 (617) 555-0199',
    company: 'Boston Dental Associates',
    serviceType: 'AI Receptionist Custom Setup Demo',
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    appointmentTime: '02:00 PM',
    timezone: 'America/New_York (EST)',
    status: 'scheduled',
    bookedVia: 'AI Receptionist Live Engine',
    notes: 'Inquiring about integration with Dentrix calendar and automated patient SMS reminder.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const saveAppointment = async (data) => {
  const refCode = data.bookingReference || 'VED-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const phone = data.clientPhone || data.customerPhone || data.callerPhone || data.phone || '+91 9557149619';
  const name = data.clientName || data.customerName || data.callerName || data.name || `Caller (${phone})`;
  const digits = phone.replace(/\D/g, '') || 'caller';
  const email = data.clientEmail || data.customerEmail || data.email || `${digits}@vedanco.ai`;
  const date = data.appointmentDate || data.date || data.scheduledDate || data.preferredDate || new Date().toISOString().split('T')[0];
  const time = data.appointmentTime || data.timeSlot || data.scheduledTime || data.preferredTime || data.time || '11:00 AM';

  const appointmentRecord = {
    ...data,
    bookingReference: refCode,
    clientName: name,
    customerName: name,
    callerName: name,
    clientPhone: phone,
    customerPhone: phone,
    callerPhone: phone,
    clientEmail: email,
    customerEmail: email,
    appointmentDate: date,
    date: date,
    scheduledDate: date,
    appointmentTime: time,
    timeSlot: time,
    scheduledTime: time,
    company: data.company || 'Individual / Not specified',
    serviceType: data.serviceType || data.type || 'AI Voice Receptionist Demo & Consultation',
    type: data.type || data.serviceType || 'Discovery Consultation',
    timezone: data.timezone || 'Asia/Kolkata (IST)',
    status: data.status || 'scheduled',
    bookedVia: data.bookedVia || 'AI Voice Call (Sneha)',
    notes: data.notes || '',
    callId: data.callId || '',
  };

  if (getIsConnected() && MongoAppointmentModel) {
    const appt = new MongoAppointmentModel(appointmentRecord);
    return await appt.save();
  } else {
    const appt = {
      _id: 'appt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9),
      ...appointmentRecord,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryAppointments.unshift(appt);
    return appt;
  }
};

const getAppointments = async (filter = {}) => {
  if (getIsConnected() && MongoAppointmentModel) {
    const query = {};
    if (filter.status) query.status = filter.status;
    if (filter.date) {
      query.$or = [{ appointmentDate: filter.date }, { date: filter.date }, { scheduledDate: filter.date }];
    }
    if (filter.search) {
      const regex = new RegExp(filter.search, 'i');
      query.$or = [
        { clientName: regex },
        { customerName: regex },
        { callerName: regex },
        { clientEmail: regex },
        { clientPhone: regex },
        { customerPhone: regex },
        { callerPhone: regex },
        { bookingReference: regex },
      ];
    }
    return await MongoAppointmentModel.find(query).sort({ appointmentDate: 1, date: 1, appointmentTime: 1, timeSlot: 1 });
  } else {
    let results = [...memoryAppointments];
    if (filter.status) {
      results = results.filter((a) => a.status === filter.status);
    }
    if (filter.date) {
      results = results.filter((a) => a.appointmentDate === filter.date || a.date === filter.date || a.scheduledDate === filter.date);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      results = results.filter(
        (a) =>
          (a.clientName && a.clientName.toLowerCase().includes(q)) ||
          (a.customerName && a.customerName.toLowerCase().includes(q)) ||
          (a.clientEmail && a.clientEmail.toLowerCase().includes(q)) ||
          (a.clientPhone && a.clientPhone.includes(q)) ||
          (a.bookingReference && a.bookingReference.toLowerCase().includes(q))
      );
    }
    return results;
  }
};

const getAppointmentById = async (id) => {
  if (getIsConnected() && MongoAppointmentModel) {
    return await MongoAppointmentModel.findById(id);
  } else {
    return memoryAppointments.find((a) => String(a._id) === String(id)) || null;
  }
};

const updateAppointment = async (id, updateData) => {
  if (getIsConnected() && MongoAppointmentModel) {
    return await MongoAppointmentModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  } else {
    const index = memoryAppointments.findIndex((a) => String(a._id) === String(id));
    if (index === -1) return null;
    memoryAppointments[index] = {
      ...memoryAppointments[index],
      ...updateData,
      updatedAt: new Date(),
    };
    return memoryAppointments[index];
  }
};

const deleteAppointment = async (id) => {
  if (getIsConnected() && MongoAppointmentModel) {
    const res = await MongoAppointmentModel.findByIdAndDelete(id);
    return !!res;
  } else {
    const initialLen = memoryAppointments.length;
    memoryAppointments = memoryAppointments.filter((a) => String(a._id) !== String(id));
    return memoryAppointments.length < initialLen;
  }
};

module.exports = {
  MongoAppointmentModel,
  saveAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
