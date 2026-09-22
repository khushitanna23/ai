const mongoose = require('mongoose');
const { getIsConnected } = require('../config/db');

const TranscriptItemSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      enum: ['user', 'ai', 'system'],
      required: true,
    },
    name: {
      type: String,
      default: 'Caller',
    },
    text: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  },
  { _id: false }
);

const CallLogSchema = new mongoose.Schema(
  {
    callerName: {
      type: String,
      default: 'Inbound Caller',
      trim: true,
    },
    callerPhone: {
      type: String,
      default: '+1 (800) 555-0100',
      trim: true,
    },
    scenario: {
      type: String,
      default: 'general',
      trim: true,
    },
    callDurationSeconds: {
      type: Number,
      default: 60,
      min: 0,
    },
    transcript: [TranscriptItemSchema],
    summary: {
      type: String,
      default: 'AI receptionist handled inbound inquiry, provided answers, and qualified the lead.',
    },
    detectedIntent: {
      type: String,
      default: 'General Inquiry',
    },
    status: {
      type: String,
      enum: ['completed', 'transferred', 'missed', 'in-progress'],
      default: 'completed',
    },
    qualificationStatus: {
      type: String,
      default: 'Qualified & Verified',
    },
    transferredTo: {
      type: String,
      default: null,
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

let MongoCallLogModel;
try {
  MongoCallLogModel = mongoose.model('CallLog', CallLogSchema);
} catch (e) {
  MongoCallLogModel = mongoose.models.CallLog;
}

// In-memory fallback call logs
let memoryCallLogs = [
  {
    _id: 'call_sample_1',
    callerName: 'David Miller',
    callerPhone: '+1 (415) 890-1234',
    scenario: 'dental',
    callDurationSeconds: 84,
    transcript: [
      { sender: 'ai', name: 'Downtown Dental AI', text: 'Hi! Thanks for calling Downtown Dental Care. How can I help you today?', timestamp: '10:14 AM' },
      { sender: 'user', name: 'David Miller', text: 'Hi, I cracked a molar this morning and I am in severe pain. Can someone see me today?', timestamp: '10:14 AM' },
      { sender: 'ai', name: 'Downtown Dental AI', text: 'For dental emergencies involving severe pain or trauma, I prioritize the caller, collect symptom details, and immediately attempt an intelligent call transfer to your on-call dentist or triage desk.', timestamp: '10:15 AM' },
    ],
    summary: 'Emergency dental call regarding cracked molar and sharp pain. Call prioritized and transferred to on-call triage desk.',
    detectedIntent: 'Emergency Dental Assistance',
    status: 'transferred',
    qualificationStatus: 'Emergency • High Priority',
    transferredTo: '+1 (415) 890-9999 (Dr. Triage Desk)',
    createdAt: new Date(Date.now() - 3 * 3600000),
    updatedAt: new Date(Date.now() - 3 * 3600000),
  },
  {
    _id: 'call_sample_2',
    callerName: 'Elena Rostova',
    callerPhone: '+1 (305) 777-3321',
    scenario: 'realestate',
    callDurationSeconds: 110,
    transcript: [
      { sender: 'ai', name: 'Premier Realty AI', text: 'Hi! Thanks for calling Premier Realty Group. Are you inquiring about buying, selling, or a specific property listing?', timestamp: '02:30 PM' },
      { sender: 'user', name: 'Elena Rostova', text: 'I would like to schedule a private tour for the 4-bedroom villa on Ocean Drive this Saturday.', timestamp: '02:31 PM' },
      { sender: 'ai', name: 'Premier Realty AI', text: 'I can answer questions regarding approved property specifications and collect the prospect contact information to schedule a guided or private tour.', timestamp: '02:31 PM' },
    ],
    summary: 'Prospect interested in touring 4-bedroom oceanfront listing on Saturday. Pre-qualification questions answered and appointment requested.',
    detectedIntent: 'Property Tour Scheduling',
    status: 'completed',
    qualificationStatus: 'Pre-Qualified Buyer ($1.5M+)',
    transferredTo: null,
    createdAt: new Date(Date.now() - 5 * 3600000),
    updatedAt: new Date(Date.now() - 5 * 3600000),
  },
];

const saveCallLog = async (data) => {
  if (getIsConnected() && MongoCallLogModel) {
    const call = new MongoCallLogModel(data);
    return await call.save();
  } else {
    const call = {
      _id: 'call_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9),
      ...data,
      callerName: data.callerName || 'Inbound Caller',
      callerPhone: data.callerPhone || '+1 (800) 555-0100',
      scenario: data.scenario || 'general',
      callDurationSeconds: data.callDurationSeconds || 45,
      transcript: data.transcript || [],
      summary: data.summary || 'AI receptionist handled inbound inquiry.',
      detectedIntent: data.detectedIntent || 'General Inquiry',
      status: data.status || 'completed',
      qualificationStatus: data.qualificationStatus || 'Qualified & Verified',
      transferredTo: data.transferredTo || null,
      notes: data.notes || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryCallLogs.unshift(call);
    return call;
  }
};

const getCallLogs = async (filter = {}) => {
  if (getIsConnected() && MongoCallLogModel) {
    const query = {};
    if (filter.scenario) query.scenario = filter.scenario;
    if (filter.status) query.status = filter.status;
    if (filter.search) {
      const regex = new RegExp(filter.search, 'i');
      query.$or = [{ callerName: regex }, { callerPhone: regex }, { detectedIntent: regex }, { summary: regex }];
    }
    const limit = parseInt(filter.limit) || 50;
    return await MongoCallLogModel.find(query).sort({ createdAt: -1 }).limit(limit);
  } else {
    let results = [...memoryCallLogs];
    if (filter.scenario) {
      results = results.filter((c) => c.scenario === filter.scenario);
    }
    if (filter.status) {
      results = results.filter((c) => c.status === filter.status);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      results = results.filter(
        (c) =>
          c.callerName.toLowerCase().includes(q) ||
          c.callerPhone.includes(q) ||
          c.detectedIntent.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q)
      );
    }
    const limit = parseInt(filter.limit) || 50;
    return results.slice(0, limit);
  }
};

const getCallById = async (id) => {
  if (getIsConnected() && MongoCallLogModel) {
    return await MongoCallLogModel.findById(id);
  } else {
    return memoryCallLogs.find((c) => String(c._id) === String(id)) || null;
  }
};

const deleteCallLog = async (id) => {
  if (getIsConnected() && MongoCallLogModel) {
    const res = await MongoCallLogModel.findByIdAndDelete(id);
    return !!res;
  } else {
    const initialLen = memoryCallLogs.length;
    memoryCallLogs = memoryCallLogs.filter((c) => String(c._id) !== String(id));
    return memoryCallLogs.length < initialLen;
  }
};

const getCallsAnalytics = async () => {
  const calls = await getCallLogs({ limit: 500 });
  const totalCalls = calls.length;
  const totalDuration = calls.reduce((acc, c) => acc + (c.callDurationSeconds || 0), 0);
  const avgDuration = totalCalls > 0 ? Math.round(totalDuration / totalCalls) : 0;
  
  const byScenario = {};
  const byStatus = { completed: 0, transferred: 0, missed: 0 };

  calls.forEach((c) => {
    byScenario[c.scenario] = (byScenario[c.scenario] || 0) + 1;
    if (byStatus[c.status] !== undefined) {
      byStatus[c.status]++;
    }
  });

  return {
    totalCalls,
    totalDurationSeconds: totalDuration,
    avgDurationSeconds: avgDuration,
    byScenario,
    byStatus,
  };
};

module.exports = {
  MongoCallLogModel,
  saveCallLog,
  getCallLogs,
  getCallById,
  deleteCallLog,
  getCallsAnalytics,
};
