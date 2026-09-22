const mongoose = require('mongoose');
const { getIsConnected } = require('../config/db');

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    subject: {
      type: String,
      trim: true,
      default: 'General Inquiry',
    },
    message: {
      type: String,
      required: [true, 'Message cannot be empty'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['unread', 'read', 'replied', 'archived'],
      default: 'unread',
    },
  },
  {
    timestamps: true,
  }
);

let MongoContactModel;
try {
  MongoContactModel = mongoose.model('Contact', ContactSchema);
} catch (e) {
  MongoContactModel = mongoose.models.Contact;
}

// In-memory fallback
let memoryContacts = [
  {
    _id: 'contact_sample_1',
    name: 'Emily Watson',
    email: 'emily@watsonlawgroup.com',
    phone: '+1 (212) 445-9871',
    subject: 'Twilio Custom SIP Trunk Integration',
    message: 'We currently have our own Twilio SIP infrastructure for 3 law offices. Can Vedanco AI plug directly into our existing numbers without porting?',
    status: 'unread',
    createdAt: new Date(Date.now() - 4 * 3600000),
    updatedAt: new Date(Date.now() - 4 * 3600000),
  },
];

const saveContact = async (data) => {
  if (getIsConnected() && MongoContactModel) {
    const contact = new MongoContactModel(data);
    return await contact.save();
  } else {
    const contact = {
      _id: 'contact_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9),
      ...data,
      phone: data.phone || '',
      subject: data.subject || 'General Inquiry',
      status: data.status || 'unread',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryContacts.unshift(contact);
    return contact;
  }
};

const getContacts = async (filter = {}) => {
  if (getIsConnected() && MongoContactModel) {
    const query = {};
    if (filter.status) query.status = filter.status;
    return await MongoContactModel.find(query).sort({ createdAt: -1 });
  } else {
    let results = [...memoryContacts];
    if (filter.status) {
      results = results.filter((c) => c.status === filter.status);
    }
    return results;
  }
};

const getContactById = async (id) => {
  if (getIsConnected() && MongoContactModel) {
    return await MongoContactModel.findById(id);
  } else {
    return memoryContacts.find((c) => String(c._id) === String(id)) || null;
  }
};

const updateContactStatus = async (id, status) => {
  if (getIsConnected() && MongoContactModel) {
    return await MongoContactModel.findByIdAndUpdate(id, { status }, { new: true });
  } else {
    const contact = memoryContacts.find((c) => String(c._id) === String(id));
    if (!contact) return null;
    contact.status = status;
    contact.updatedAt = new Date();
    return contact;
  }
};

const deleteContact = async (id) => {
  if (getIsConnected() && MongoContactModel) {
    const res = await MongoContactModel.findByIdAndDelete(id);
    return !!res;
  } else {
    const initialLen = memoryContacts.length;
    memoryContacts = memoryContacts.filter((c) => String(c._id) !== String(id));
    return memoryContacts.length < initialLen;
  }
};

module.exports = {
  MongoContactModel,
  saveContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
};
