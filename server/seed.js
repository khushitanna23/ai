require('dotenv').config();
const mongoose = require('mongoose');
const { MongoLeadModel } = require('./models/Lead');
const { MongoAppointmentModel } = require('./models/Appointment');
const { MongoCallLogModel } = require('./models/CallLog');
const { MongoContactModel } = require('./models/Contact');

const sampleLeads = [
  {
    name: 'Dr. Michael Vance',
    email: 'm.vance@downtown-dental.com',
    phone: '+1 (555) 234-5678',
    company: 'Downtown Dental Care',
    industry: 'Dental Practice',
    estimatedCallVolume: '500-1000 calls/month',
    status: 'qualified',
    source: 'Website Demo Request',
    notes: 'Interested in automating after-hours appointment scheduling and insurance verification.',
    tags: ['Dental', 'High Intent', 'Urgent'],
  },
  {
    name: 'Sarah Jenkins',
    email: 'sarah@apex-homeservices.com',
    phone: '+1 (555) 876-5432',
    company: 'Apex Plumbing & HVAC',
    industry: 'Home Services & Contracting',
    estimatedCallVolume: '1000+ calls/month',
    status: 'new',
    source: 'Website Demo Request',
    notes: 'Needs 24/7 dispatch transfer for emergency burst pipes and HVAC failure.',
    tags: ['HVAC', 'Emergency Transfer', 'Scale Plan'],
  },
  {
    name: 'Robert Thorne',
    email: 'robert@thorne-realty.com',
    phone: '+1 (305) 555-4321',
    company: 'Premier Realty Group',
    industry: 'Real Estate Brokerage',
    estimatedCallVolume: '100-500 calls/month',
    status: 'converted',
    source: 'AI Receptionist Call',
    notes: 'Signed up for Professional plan ($1,999/mo). Wants calendar booking for buyer property tours.',
    tags: ['Real Estate', 'Signed Client'],
  },
  {
    name: 'Amanda Brooks',
    email: 'amanda@brookslegal.com',
    phone: '+1 (212) 555-9088',
    company: 'Brooks & Partners LLP',
    industry: 'Legal & Law Firms',
    estimatedCallVolume: '500-1000 calls/month',
    status: 'contacted',
    source: 'Website Demo Request',
    notes: 'Interested in bilingual Spanish/English intake capabilities.',
    tags: ['Legal', 'Bilingual'],
  },
];

const sampleAppointments = [
  {
    clientName: 'Dr. Michael Vance',
    clientEmail: 'm.vance@downtown-dental.com',
    clientPhone: '+1 (555) 234-5678',
    company: 'Downtown Dental Care',
    serviceType: 'Vedanco AI Custom Setup & Integration Demo',
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    appointmentTime: '11:00 AM',
    timezone: 'America/New_York (EST)',
    status: 'confirmed',
    bookedVia: 'AI Receptionist Live Engine',
    notes: 'Dentrix practice management integration walk-through.',
  },
  {
    clientName: 'Sarah Jenkins',
    clientEmail: 'sarah@apex-homeservices.com',
    clientPhone: '+1 (555) 876-5432',
    company: 'Apex Plumbing & HVAC',
    serviceType: 'Phone Tree & Dispatch Routing Walkthrough',
    appointmentDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    appointmentTime: '03:30 PM',
    timezone: 'America/Chicago (CST)',
    status: 'scheduled',
    bookedVia: 'Website Portal',
    notes: 'Focus on emergency on-call technician routing after 6 PM.',
  },
];

const sampleCalls = [
  {
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
  },
  {
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
  },
  {
    callerName: 'Marcus Bennett',
    callerPhone: '+1 (713) 445-1212',
    scenario: 'home',
    callDurationSeconds: 95,
    transcript: [
      { sender: 'ai', name: 'Apex Home Services AI', text: 'Hi! Thanks for calling Apex Home Services. Are you looking for HVAC, plumbing, or roofing assistance today?', timestamp: '09:05 AM' },
      { sender: 'user', name: 'Marcus Bennett', text: 'Our main AC compressor died and it is 98 degrees outside. Can we get an estimate on a replacement?', timestamp: '09:05 AM' },
      { sender: 'ai', name: 'Apex Home Services AI', text: 'I can provide your standard diagnostic fee policies, gather job site specifics, and schedule an on-site technician visit directly into ServiceTitan or your calendar.', timestamp: '09:06 AM' },
    ],
    summary: 'Customer requested emergency HVAC compressor replacement estimate. Gathered address and booked dispatch slot.',
    detectedIntent: 'HVAC Replacement Estimate',
    status: 'completed',
    qualificationStatus: 'High Urgency Lead',
  },
];

const sampleContacts = [
  {
    name: 'Emily Watson',
    email: 'emily@watsonlawgroup.com',
    phone: '+1 (212) 445-9871',
    subject: 'Twilio Custom SIP Trunk Integration',
    message: 'We currently have our own Twilio SIP infrastructure for 3 law offices. Can Vedanco AI plug directly into our existing numbers without porting?',
    status: 'unread',
  },
];

const seedDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vedanco_ai';
  console.log(`Connecting to MongoDB at: ${mongoUri}...`);

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log(`[Vedanco AI Seeder] Connected to MongoDB: ${mongoose.connection.host}`);

    // Clear existing sample collections or insert
    console.log('[Vedanco AI Seeder] Seeding Leads collection...');
    if (MongoLeadModel) {
      await MongoLeadModel.deleteMany({});
      await MongoLeadModel.insertMany(sampleLeads);
      console.log(`✓ Inserted ${sampleLeads.length} sample leads`);
    }

    console.log('[Vedanco AI Seeder] Seeding Appointments collection...');
    if (MongoAppointmentModel) {
      await MongoAppointmentModel.deleteMany({});
      await MongoAppointmentModel.insertMany(sampleAppointments);
      console.log(`✓ Inserted ${sampleAppointments.length} sample appointments`);
    }

    console.log('[Vedanco AI Seeder] Seeding CallLogs collection...');
    if (MongoCallLogModel) {
      await MongoCallLogModel.deleteMany({});
      await MongoCallLogModel.insertMany(sampleCalls);
      console.log(`✓ Inserted ${sampleCalls.length} sample call logs`);
    }

    console.log('[Vedanco AI Seeder] Seeding Contacts collection...');
    if (MongoContactModel) {
      await MongoContactModel.deleteMany({});
      await MongoContactModel.insertMany(sampleContacts);
      console.log(`✓ Inserted ${sampleContacts.length} sample contacts`);
    }

    console.log('====================================================');
    console.log('🎉 [Vedanco AI Seeder] Database seeded successfully!');
    console.log('====================================================');
    process.exit(0);
  } catch (error) {
    console.error('❌ [Vedanco AI Seeder Error]:', error.message);
    process.exit(1);
  }
};

seedDatabase();
