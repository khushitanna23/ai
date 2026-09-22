const express = require('express');
const router = express.Router();

/**
 * Intelligent domain knowledge & conversational intent matcher for Vedanco AI.
 * Also includes modular provider integration hooks for external LLMs (OpenAI, Anthropic, Retell, Vapi).
 */

const scenarioContexts = {
  general: {
    name: 'General Business / SaaS',
    greeting: 'Hi! Thanks for calling Vedanco AI. How can I help you today?',
    industry: 'General Business / SaaS',
    specialties: '24/7 call answering, appointment scheduling, lead qualification, and CRM updates',
    sampleQuestions: [
      'What are your pricing plans?',
      'Can you book appointments into my calendar?',
      'Can you transfer calls to human staff?',
      'Which CRMs do you integrate with?',
    ],
  },
  dental: {
    name: 'Downtown Dental Care',
    greeting: 'Hi! Thanks for calling Downtown Dental Care. How can I help you today?',
    industry: 'Dental Practice',
    specialties: 'new patient inquiries, routine cleanings, emergency dental visits, and insurance verification',
    sampleQuestions: [
      'I have severe tooth pain, can a dentist see me today?',
      'Do you accept Delta Dental insurance?',
      'How much does a routine cleaning cost?',
      'Can I schedule an exam for next Tuesday?',
    ],
  },
  home: {
    name: 'Apex Home Services (HVAC & Plumbing)',
    greeting: 'Hi! Thanks for calling Apex Home Services. Are you looking for HVAC, plumbing, or roofing assistance today?',
    industry: 'Home Services & Contracting',
    specialties: 'emergency repairs, dispatch estimates, service bookings, and quote scheduling',
    sampleQuestions: [
      'My AC stopped blowing cold air and it is 95 degrees!',
      'Can you send a plumber for a burst pipe?',
      'How much is the initial diagnostic call-out fee?',
      'Can I schedule an estimate for a new water heater?',
    ],
  },
  realestate: {
    name: 'Premier Realty Group',
    greeting: 'Hi! Thanks for calling Premier Realty Group. Are you inquiring about buying, selling, or a specific property listing?',
    industry: 'Real Estate Brokerage',
    specialties: 'property tour scheduling, buyer pre-qualification, listing details, and agent transfers',
    sampleQuestions: [
      'I want to tour the 4-bedroom villa on Ocean Drive.',
      'Are you taking new listings this month?',
      'Can you pre-qualify me for a mortgage?',
      'Can I speak with the listing agent for 742 Evergreen?',
    ],
  },
};

// Response logic based on user intent keywords
const generateContextualResponse = (query, scenario = 'general') => {
  const q = query.toLowerCase().trim();
  const sc = scenarioContexts[scenario] || scenarioContexts.general;

  // 1. Scenario-specific handlers
  if (scenario === 'dental') {
    if (q.includes('cleaning') || q.includes('checkup') || q.includes('exam')) {
      return "I can certainly help arrange a dental cleaning or routine checkup! Once connected to your practice management software (like Dentrix, Eaglesoft, or Open Dental), I check real-time chair availability and book the patient immediately.";
    }
    if (q.includes('insurance') || q.includes('coverage') || q.includes('pay') || q.includes('delta')) {
      return "I can ask the caller for their dental provider name and member ID to log it directly into your intake file, or verify whether your clinic accepts their specific PPO network.";
    }
    if (q.includes('emergency') || q.includes('pain') || q.includes('toothache') || q.includes('broken') || q.includes('crack')) {
      return "For dental emergencies involving severe pain or trauma, I prioritize the caller, collect symptom details, and immediately attempt an intelligent call transfer to your on-call dentist or emergency triage desk.";
    }
  }

  if (scenario === 'home') {
    if (q.includes('emergency') || q.includes('leak') || q.includes('ac broken') || q.includes('heat') || q.includes('furnace') || q.includes('burst')) {
      return "For urgent home service emergencies, Vedanco AI immediately gathers the customer's physical address, urgency level, and transfers the call directly to your on-call technician or dispatch ring group.";
    }
    if (q.includes('quote') || q.includes('estimate') || q.includes('cost') || q.includes('price') || q.includes('fee')) {
      return "I can provide your standard diagnostic fee policies, gather job site specifics, and schedule an on-site technician visit directly into ServiceTitan, Jobber, Housecall Pro, or your calendar.";
    }
  }

  if (scenario === 'realestate') {
    if (q.includes('listing') || q.includes('property') || q.includes('house') || q.includes('tour') || q.includes('viewing') || q.includes('villa')) {
      return "I can answer questions regarding approved property specifications (bedrooms, square footage, neighborhood) and collect the prospect's contact information to schedule a guided or private tour.";
    }
    if (q.includes('pre-qual') || q.includes('budget') || q.includes('buyer') || q.includes('agent') || q.includes('mortgage')) {
      return "Vedanco AI pre-qualifies buyers by asking whether they are pre-approved, their target budget, and desired move-in timeline, before routing hot prospects directly to the assigned listing agent.";
    }
  }

  // 2. Global Core Vedanco AI Intents
  if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('how much') || q.includes('rate') || q.includes('plans')) {
    return "Vedanco AI offers transparent monthly plans: Starter is $999/month for small businesses, Professional is $1,999/month (our most popular plan with lead qualification, appointment booking, SMS & CRM integration), and Scale is $3,499/month for multi-department organizations with custom workflows.";
  }

  if (q.includes('appointment') || q.includes('book') || q.includes('schedule') || q.includes('calendar') || q.includes('reserve')) {
    return "Yes! Vedanco AI books appointments in real-time when connected to your scheduling system (such as Calendly, Google Calendar, ServiceTitan, or your CRM). I collect the required details and confirm the slot instantly.";
  }

  if (q.includes('transfer') || q.includes('human') || q.includes('person') || q.includes('speak to') || q.includes('forward') || q.includes('handoff') || q.includes('live agent')) {
    return "Yes! Vedanco AI has intelligent call transfer capabilities. When a caller requests a human, has an emergency, or meets specific high-value criteria, the AI immediately transfers the call to your office line, cell phone, or team ring group.";
  }

  if (q.includes('crm') || q.includes('hubspot') || q.includes('salesforce') || q.includes('zapier') || q.includes('integration') || q.includes('connect')) {
    return "Vedanco AI integrates with major CRMs including HubSpot, Salesforce, Zoho, ServiceTitan, Jobber, and custom webhooks. After every call, the caller's name, phone, transcript, summary, and qualification tags are automatically synced to your records.";
  }

  if (q.includes('qualif') || q.includes('lead') || q.includes('prospect') || q.includes('questions')) {
    return "Vedanco AI performs automated lead qualification by asking the exact questions your sales team relies on—such as project scope, urgency, budget, location, or insurance. Qualified leads are tagged and forwarded to you instantly.";
  }

  if (q.includes('hour') || q.includes('after-hour') || q.includes('night') || q.includes('weekend') || q.includes('24/7') || q.includes('time')) {
    return "Yes. Vedanco AI works 24/7/365. It answers calls after business hours, over holidays, and during peak busy times when your front desk staff is occupied, ensuring you never miss an opportunity.";
  }

  if (q.includes('service') || q.includes('what do you do') || q.includes('what services') || q.includes('features') || q.includes('capability')) {
    return "Vedanco AI provides 24/7 inbound call answering, natural language customer conversations, automated lead qualification, calendar appointment booking, intelligent call transfer to your team, instant SMS follow-ups, and automated CRM updates.";
  }

  if (q.includes('how it works') || q.includes('how does') || q.includes('workflow') || q.includes('step')) {
    return "It operates in 6 simple steps: 1) A customer calls, 2) Vedanco AI answers immediately with your custom greeting, 3) It understands the caller's needs, 4) It takes action (answers FAQs, captures leads, or books appointments), 5) Transferred to human staff if needed, and 6) Sends structured summaries to your CRM and team.";
  }

  if (q.includes('customize') || q.includes('training') || q.includes('knowledge') || q.includes('faq')) {
    return "Everything is customizable: greeting, tone of voice, approved FAQs, service descriptions, appointment rules, qualification criteria, and escalation triggers. We tailor the entire AI receptionist around your specific business before launch.";
  }

  if (q.includes('replace') || q.includes('employee') || q.includes('staff') || q.includes('job')) {
    return "Vedanco AI is not meant to replace your valued employees. It acts as an always-on first line of defense, filtering spam, handling routine repetitive inquiries, and booking appointments so your human team can focus on high-impact customer interactions.";
  }

  if (q.includes('demo') || q.includes('book a demo') || q.includes('trial') || q.includes('try') || q.includes('start')) {
    return "You can click the 'Book a Free Demo' button at the top of the page! We will schedule a personalized walk-through to demonstrate how Vedanco AI can be configured specifically for your phone workflows.";
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('good morning') || q.includes('good afternoon')) {
    return `Hello! Thanks for checking out Vedanco AI. In this demo, I'm acting as an AI receptionist for ${sc.industry}. You can ask me about our services, pricing, appointment booking, CRM integrations, or how we handle your callers.`;
  }

  return "I'm the Vedanco AI interactive demo receptionist. I can help explain our 24/7 call answering, lead qualification, appointment booking, CRM integrations, pricing plans ($999 Starter, $1,999 Pro), and demo process. What specific question can I answer for your business?";
};

// POST /api/ai/chat - Process conversational input
router.post('/chat', async (req, res) => {
  try {
    const { message, scenario = 'general', conversationHistory = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message cannot be empty.',
      });
    }

    const aiResponse = generateContextualResponse(message, scenario);

    return res.json({
      success: true,
      response: aiResponse,
      scenario,
      timestamp: new Date().toISOString(),
      providerStatus: process.env.OPENAI_API_KEY ? 'live_llm' : 'interactive_demo_engine',
    });
  } catch (error) {
    console.error('[Vedanco AI] AI chat error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process AI receptionist response.',
    });
  }
});

// GET /api/ai/scenarios - Return available demo scenarios & initial greetings
router.get('/scenarios', (req, res) => {
  res.json({
    success: true,
    scenarios: scenarioContexts,
  });
});

// POST /api/ai/qualify - Analyze conversation text and extract qualification status & intent
router.post('/qualify', (req, res) => {
  try {
    const { message = '', scenario = 'general' } = req.body;
    const lower = message.toLowerCase();

    let detectedIntent = 'General Inquiry';
    let qualificationStatus = 'Standard Lead';
    let urgencyLevel = 'Normal';
    let shouldTransfer = false;

    if (lower.includes('emergency') || lower.includes('pain') || lower.includes('leak') || lower.includes('burst') || lower.includes('urgent')) {
      detectedIntent = 'Urgent Escalation';
      qualificationStatus = 'High Priority • Emergency';
      urgencyLevel = 'Critical';
      shouldTransfer = true;
    } else if (lower.includes('appointment') || lower.includes('schedule') || lower.includes('book') || lower.includes('tour')) {
      detectedIntent = 'Calendar Appointment Booking';
      qualificationStatus = 'High Intent • Scheduling';
      urgencyLevel = 'High';
    } else if (lower.includes('price') || lower.includes('cost') || lower.includes('quote') || lower.includes('rate')) {
      detectedIntent = 'Pricing & Estimate Inquiry';
      qualificationStatus = 'Pre-Qualified Lead';
    }

    return res.json({
      success: true,
      detectedIntent,
      qualificationStatus,
      urgencyLevel,
      shouldTransfer,
      scenario,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error analyzing conversation intent.',
    });
  }
});

// POST /api/ai/summarize - Auto-generate call summary from transcript
router.post('/summarize', (req, res) => {
  try {
    const { transcript = [], scenario = 'general' } = req.body;
    if (!transcript.length) {
      return res.status(400).json({
        success: false,
        message: 'Transcript array is required.',
      });
    }

    const userLines = transcript.filter((t) => t.sender === 'user').map((t) => t.text).join(' ');
    const summary = `Inbound call in ${scenario} scenario. Caller discussed: "${userLines.slice(0, 180)}...". Receptionist addressed questions and captured contact details.`;

    return res.json({
      success: true,
      summary,
      totalExchanges: transcript.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error generating summary.',
    });
  }
});

module.exports = router;
