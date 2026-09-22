const mongoose = require('mongoose');
const { getIsConnected } = require('../config/db');

const AppointmentSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    clientEmail: {
      type: String,
      required: [true, 'Client email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    clientPhone: {
      type: String,
      required: [true, 'Client phone number is required'],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: 'Individual / Not specified',
    },
    serviceType: {
      type: String,
      default: 'Demo & Consultation',
      trim: true,
    },
    appointmentDate: {
      type: String,
      required: [true, 'Appointment date is required (YYYY-MM-DD)'],
    },
    appointmentTime: {
      type: String,
      required: [true, 'Appointment time is required (e.g. 10:00 AM)'],
    },
    timezone: {
      type: String,
      default: 'America/New_York (EST)',
    },
    status: {
      type: String,
      enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
      default: 'scheduled',
    },
    bookedVia: {
      type: String,
      default: 'AI Receptionist Live Engine',
      trim: true,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
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
  if (getIsConnected() && MongoAppointmentModel) {
    const appt = new MongoAppointmentModel(data);
    return await appt.save();
  } else {
    const appt = {
      _id: 'appt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9),
      ...data,
      company: data.company || 'Individual / Not specified',
      serviceType: data.serviceType || 'Demo & Consultation',
      timezone: data.timezone || 'America/New_York (EST)',
      status: data.status || 'scheduled',
      bookedVia: data.bookedVia || 'AI Receptionist Live Engine',
      notes: data.notes || '',
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
    if (filter.date) query.appointmentDate = filter.date;
    if (filter.search) {
      const regex = new RegExp(filter.search, 'i');
      query.$or = [{ clientName: regex }, { clientEmail: regex }, { clientPhone: regex }];
    }
    return await MongoAppointmentModel.find(query).sort({ appointmentDate: 1, appointmentTime: 1 });
  } else {
    let results = [...memoryAppointments];
    if (filter.status) {
      results = results.filter((a) => a.status === filter.status);
    }
    if (filter.date) {
      results = results.filter((a) => a.appointmentDate === filter.date);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      results = results.filter(
        (a) =>
          a.clientName.toLowerCase().includes(q) ||
          a.clientEmail.toLowerCase().includes(q) ||
          a.clientPhone.includes(q)
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
