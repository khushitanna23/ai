export const demoScenarios = {
  general: {
    id: 'general',
    name: 'General Business',
    badge: 'Vedanco AI Head Office',
    initialGreeting: 'Hi! Thanks for calling Vedanco AI. How can I help you today?',
    suggestedPrompts: [
      'What services do you provide?',
      'How much does it cost?',
      'Can you book an appointment?',
      'Can you transfer calls to my staff?',
      'Can it work after business hours?',
    ],
  },
  dental: {
    id: 'dental',
    name: 'Dental Clinic',
    badge: 'Downtown Dental Practice',
    initialGreeting: 'Hi! Thanks for calling Downtown Dental Care. How can I help you today?',
    suggestedPrompts: [
      'Can I book a dental cleaning appointment?',
      'Do you accept Delta Dental insurance?',
      'I have a severe toothache emergency.',
      'What are your office hours this week?',
    ],
  },
  home: {
    id: 'home',
    name: 'Home Services',
    badge: 'Apex HVAC & Plumbing Services',
    initialGreeting: 'Hi! Thanks for calling Apex Home Services. Are you looking for HVAC, plumbing, or roofing assistance today?',
    suggestedPrompts: [
      'Our AC stopped cooling and it is 90 degrees.',
      'How much do you charge for a plumbing estimate?',
      'Can someone come out tomorrow morning?',
      'Do you offer 24/7 emergency repair dispatch?',
    ],
  },
  realestate: {
    id: 'realestate',
    name: 'Real Estate',
    badge: 'Premier Realty Group',
    initialGreeting: 'Hi! Thanks for calling Premier Realty Group. Are you inquiring about buying, selling, or a specific property listing?',
    suggestedPrompts: [
      'I want to schedule a tour for 742 Evergreen Terrace.',
      'Can you tell me the listing price and square footage?',
      'Are you taking new listings in this neighborhood?',
      'Can I speak with a licensed listing agent?',
    ],
  },
};

/**
 * Intelligent client-side fallback engine matching intents accurately
 * so the demo functions smoothly in any environment.
 */
export const getLocalAiResponse = (userInput, scenarioId = 'general') => {
  const query = userInput.toLowerCase().trim();

  // Dental Specific
  if (scenarioId === 'dental') {
    if (query.includes('cleaning') || query.includes('checkup') || query.includes('exam')) {
      return 'I can definitely help you arrange a dental cleaning! Once your clinic connects its practice scheduling system (such as Dentrix or Eaglesoft), I can check real-time open slots and book the patient immediately.';
    }
    if (query.includes('insurance') || query.includes('delta') || query.includes('ppo') || query.includes('coverage')) {
      return 'I can verify whether your insurance network is in-network from your approved clinic FAQs, collect your Member ID and Group Number, and attach them to your patient file for the front desk.';
    }
    if (query.includes('emergency') || query.includes('pain') || query.includes('toothache') || query.includes('hurt')) {
      return 'For urgent dental pain, I immediately gather your symptoms, assess emergency severity, and transfer the call directly to your on-call dentist or emergency triage line.';
    }
  }

  // Home Services Specific
  if (scenarioId === 'home') {
    if (query.includes('ac') || query.includes('leak') || query.includes('emergency') || query.includes('heat') || query.includes('broken')) {
      return "For urgent home emergencies like an AC failure or burst pipe, Vedanco AI gathers the caller's physical address, verifies safety, and initiates an immediate call transfer to your on-call technician or dispatch line.";
    }
    if (query.includes('estimate') || query.includes('quote') || query.includes('cost') || query.includes('fee')) {
      return 'I can share your standard diagnostic fee policy and collect the job location and scope to schedule an on-site technician estimate directly into ServiceTitan or Jobber.';
    }
    if (query.includes('dispatch') || query.includes('tomorrow') || query.includes('schedule') || query.includes('technician')) {
      return 'I can check your technician dispatch windows and book arrival slots based on zip code and job requirements once your scheduling calendar is connected.';
    }
  }

  // Real Estate Specific
  if (scenarioId === 'realestate') {
    if (query.includes('tour') || query.includes('showing') || query.includes('schedule') || query.includes('visit')) {
      return 'I can help coordinate a private property tour! Once connected to your calendar, I collect the buyer’s contact details, confirm pre-approval status, and schedule a showing with the assigned agent.';
    }
    if (query.includes('price') || query.includes('listing') || query.includes('property') || query.includes('square')) {
      return 'I can answer questions regarding approved MLS listing specifications (bedrooms, bathrooms, asking price, HOA fees) and email the caller a detailed property flyer.';
    }
    if (query.includes('agent') || query.includes('speak') || query.includes('broker')) {
      return 'I can qualify the caller’s timeline and budget, and then immediately transfer the call to the listing agent or schedule a consultation callback.';
    }
  }

  // Global Intents
  if (query.includes('price') || query.includes('pricing') || query.includes('cost') || query.includes('how much') || query.includes('rate') || query.includes('plans')) {
    return 'Vedanco AI offers 3 simple monthly plans: Starter is $999/month, Professional is $1,999/month (our most popular plan with lead qualification, appointment booking, SMS follow-up, and CRM integration), and Scale is $3,499/month for advanced multi-department requirements.';
  }

  if (query.includes('appointment') || query.includes('book') || query.includes('schedule') || query.includes('calendar')) {
    return 'Yes. Vedanco AI can book appointments when connected to a compatible scheduling system (such as Google Calendar, Calendly, Acuity, or ServiceTitan). I can help collect the required details and schedule the appointment according to your configured rules.';
  }

  if (query.includes('transfer') || query.includes('human') || query.includes('staff') || query.includes('employee') || query.includes('person') || query.includes('handoff')) {
    return 'Yes! Vedanco AI features intelligent call transfer. You can configure custom rules so urgent emergencies, high-value leads, or specific caller requests are forwarded directly to your team’s phones or desk lines.';
  }

  if (query.includes('crm') || query.includes('hubspot') || query.includes('salesforce') || query.includes('integrate') || query.includes('connect')) {
    return 'Vedanco AI connects with popular CRMs like HubSpot, Salesforce, Zoho, ServiceTitan, and Jobber. Captured caller details, transcripts, qualification tags, and appointment links are synced automatically after each call.';
  }

  if (query.includes('qualif') || query.includes('lead') || query.includes('prospect') || query.includes('capture')) {
    return 'Vedanco AI automatically qualifies inbound callers by asking your predetermined screening questions—such as timeline, project budget, service location, or insurance—allowing your sales team to focus on hot prospects.';
  }

  if (query.includes('hour') || query.includes('after-hour') || query.includes('night') || query.includes('weekend') || query.includes('24/7') || query.includes('closed')) {
    return 'Yes! Vedanco AI operates 24/7/365. It answers calls after business hours, during weekends, holidays, and overflow periods when your office staff is busy on another line.';
  }

  if (query.includes('service') || query.includes('what do you do') || query.includes('what can you do') || query.includes('features')) {
    return 'Vedanco AI provides 24/7 call answering, natural conversational inquiry handling, automated appointment scheduling, lead qualification, intelligent call transfers to your team, SMS follow-ups, and automated CRM summaries.';
  }

  if (query.includes('demo') || query.includes('trial') || query.includes('try') || query.includes('start')) {
    return 'You can click the "Book a Free Demo" button in the top navigation or right on this page! Our team will set up a customized demo tailored to your company’s call flow.';
  }

  if (query.includes('how it works') || query.includes('workflow') || query.includes('steps')) {
    return 'The process is simple: 1) Customer calls your business, 2) Vedanco AI answers immediately with your greeting, 3) It understands their intent, 4) It answers questions, qualifies the lead, or books a slot, 5) Transfers to your staff if required, and 6) Sends structured notes to your CRM.';
  }

  if (query.includes('sms') || query.includes('text') || query.includes('follow up') || query.includes('follow-up')) {
    return 'Yes. After a call, Vedanco AI can automatically trigger an SMS text to the caller with your calendar link, address directions, intake form, or confirmation details.';
  }

  if (query.includes('replace') || query.includes('staff') || query.includes('employee')) {
    return 'Vedanco AI is designed to augment your front desk, not replace your people. It handles repetitive FAQs, filters spam, and captures after-hours leads so your team can focus on complex customer needs.';
  }

  if (query.includes('hi') || query.includes('hello') || query.includes('hey') || query.includes('good morning') || query.includes('good afternoon')) {
    return "Hello! I am Sneha, your Vedanco AI receptionist. You can ask me any question about our 24/7 call answering, pricing, appointment booking, CRM integrations, or industry-specific workflows.";
  }

  // Fallback
  return "I'm Sneha, the Vedanco AI demo receptionist. I can help explain our AI receptionist, call handling, lead qualification, appointment booking, integrations, pricing, and demo process. What would you like to know?";
};
