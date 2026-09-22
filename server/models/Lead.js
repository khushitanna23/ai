const mongoose = require('mongoose');
const { getIsConnected } = require('../config/db');

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Lead name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Lead email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Lead phone number is required'],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: 'Not specified',
    },
    industry: {
      type: String,
      default: 'General Business',
      trim: true,
    },
    estimatedCallVolume: {
      type: String,
      default: '100-500 calls/month',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'converted', 'closed'],
      default: 'new',
    },
    source: {
      type: String,
      default: 'Website Demo Request',
    },
    notes: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: ['Website Demo'],
    },
  },
  {
    timestamps: true,
  }
);

let MongoLeadModel;
try {
  MongoLeadModel = mongoose.model('Lead', LeadSchema);
} catch (e) {
  MongoLeadModel = mongoose.models.Lead;
}

// In-memory fallback store when DB is disconnected
let memoryLeads = [
  {
    _id: 'lead_sample_1',
    name: 'Michael Vance',
    email: 'm.vance@downtown-dental.com',
    phone: '+1 (555) 234-5678',
    company: 'Downtown Dental Care',
    industry: 'Dental Practice',
    estimatedCallVolume: '500-1000 calls/month',
    status: 'qualified',
    source: 'Website Demo Request',
    notes: 'Interested in automating after-hours appointment scheduling and insurance check.',
    tags: ['Dental', 'High Intent'],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    _id: 'lead_sample_2',
    name: 'Sarah Jenkins',
    email: 'sarah@apex-homeservices.com',
    phone: '+1 (555) 876-5432',
    company: 'Apex Plumbing & HVAC',
    industry: 'Home Services & Contracting',
    estimatedCallVolume: '1000+ calls/month',
    status: 'new',
    source: 'Website Demo Request',
    notes: 'Needs 24/7 dispatch transfer for emergency burst pipes and heating outages.',
    tags: ['HVAC', 'Emergency Transfer'],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
];

/**
 * Save a new Lead
 */
const saveLead = async (data) => {
  if (getIsConnected() && MongoLeadModel) {
    const lead = new MongoLeadModel(data);
    return await lead.save();
  } else {
    const lead = {
      _id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9),
      ...data,
      company: data.company || 'Not specified',
      industry: data.industry || 'General Business',
      estimatedCallVolume: data.estimatedCallVolume || '100-500 calls/month',
      status: data.status || 'new',
      source: data.source || 'Website Demo Request',
      notes: data.notes || '',
      tags: data.tags || ['Website Demo'],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryLeads.unshift(lead);
    return lead;
  }
};

/**
 * Get leads with optional filtering and search
 */
const getLeads = async (filter = {}) => {
  if (getIsConnected() && MongoLeadModel) {
    const query = {};
    if (filter.status) query.status = filter.status;
    if (filter.industry) query.industry = filter.industry;
    if (filter.search) {
      const regex = new RegExp(filter.search, 'i');
      query.$or = [{ name: regex }, { email: regex }, { company: regex }, { phone: regex }];
    }
    return await MongoLeadModel.find(query).sort({ createdAt: -1 });
  } else {
    let results = [...memoryLeads];
    if (filter.status) {
      results = results.filter((l) => l.status === filter.status);
    }
    if (filter.industry) {
      results = results.filter((l) => l.industry === filter.industry);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      results = results.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q) ||
          l.phone.includes(q)
      );
    }
    return results;
  }
};

/**
 * Get single lead by ID
 */
const getLeadById = async (id) => {
  if (getIsConnected() && MongoLeadModel) {
    return await MongoLeadModel.findById(id);
  } else {
    return memoryLeads.find((l) => String(l._id) === String(id)) || null;
  }
};

/**
 * Update lead by ID
 */
const updateLead = async (id, updateData) => {
  if (getIsConnected() && MongoLeadModel) {
    return await MongoLeadModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  } else {
    const index = memoryLeads.findIndex((l) => String(l._id) === String(id));
    if (index === -1) return null;
    memoryLeads[index] = {
      ...memoryLeads[index],
      ...updateData,
      updatedAt: new Date(),
    };
    return memoryLeads[index];
  }
};

/**
 * Delete lead by ID
 */
const deleteLead = async (id) => {
  if (getIsConnected() && MongoLeadModel) {
    const res = await MongoLeadModel.findByIdAndDelete(id);
    return !!res;
  } else {
    const initialLen = memoryLeads.length;
    memoryLeads = memoryLeads.filter((l) => String(l._id) !== String(id));
    return memoryLeads.length < initialLen;
  }
};

/**
 * Lead Statistics
 */
const getLeadsStats = async () => {
  const leads = await getLeads();
  const total = leads.length;
  const byStatus = {
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    qualified: leads.filter((l) => l.status === 'qualified').length,
    converted: leads.filter((l) => l.status === 'converted').length,
    closed: leads.filter((l) => l.status === 'closed').length,
  };
  return { total, byStatus };
};

module.exports = {
  MongoLeadModel,
  saveLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getLeadsStats,
};
