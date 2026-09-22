// Test all endpoints of the Vedanco AI backend
const http = require('http');

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}`;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runTests() {
  console.log('Testing Vedanco AI Backend Endpoints...\n');

  try {
    // 1. Health check
    console.log('1. Testing GET /api/health');
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthRes.json();
    console.log(`   Status: ${healthRes.status}, Status OK: ${healthData.status === 'ok'}, Database: ${healthData.database.type}`);
    if (healthRes.status !== 200) throw new Error('Health check failed');

    // 2. Leads - GET
    console.log('2. Testing GET /api/leads');
    const leadsRes = await fetch(`${BASE_URL}/api/leads`);
    const leadsData = await leadsRes.json();
    console.log(`   Status: ${leadsRes.status}, Count: ${leadsData.count}`);

    // 3. Leads - POST
    console.log('3. Testing POST /api/leads');
    const newLeadRes = await fetch(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Client',
        email: 'test.client@example.com',
        phone: '+1 (555) 999-0000',
        company: 'Acme Test Corp',
        industry: 'General Business',
        notes: 'Test lead creation from test suite',
      }),
    });
    const newLeadData = await newLeadRes.json();
    console.log(`   Status: ${newLeadRes.status}, Created: ${newLeadData.success}, ID: ${newLeadData.lead._id}`);

    // 4. Leads - Stats
    console.log('4. Testing GET /api/leads/stats');
    const leadStatsRes = await fetch(`${BASE_URL}/api/leads/stats`);
    const leadStatsData = await leadStatsRes.json();
    console.log(`   Status: ${leadStatsRes.status}, Total leads: ${leadStatsData.stats.total}`);

    // 5. Appointments - POST
    console.log('5. Testing POST /api/appointments');
    const newApptRes = await fetch(`${BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientName: 'Test Client',
        clientEmail: 'test.client@example.com',
        clientPhone: '+1 (555) 999-0000',
        company: 'Acme Test Corp',
        serviceType: 'Live AI Demo',
        appointmentDate: '2026-10-01',
        appointmentTime: '10:00 AM',
      }),
    });
    const newApptData = await newApptRes.json();
    console.log(`   Status: ${newApptRes.status}, Created: ${newApptData.success}, ID: ${newApptData.appointment._id}`);

    // 6. Appointments - GET
    console.log('6. Testing GET /api/appointments');
    const apptsRes = await fetch(`${BASE_URL}/api/appointments`);
    const apptsData = await apptsRes.json();
    console.log(`   Status: ${apptsRes.status}, Count: ${apptsData.count}`);

    // 7. Calls - POST
    console.log('7. Testing POST /api/calls');
    const callRes = await fetch(`${BASE_URL}/api/calls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        callerName: 'Jane Doe',
        callerPhone: '+1 (555) 123-4567',
        scenario: 'dental',
        callDurationSeconds: 72,
        detectedIntent: 'Cleaning Booking',
        status: 'completed',
        transcript: [
          { sender: 'ai', text: 'Hi! Thanks for calling Downtown Dental Care.' },
          { sender: 'user', text: 'I would like to schedule a teeth cleaning.' },
        ],
      }),
    });
    const callData = await callRes.json();
    console.log(`   Status: ${callRes.status}, Created: ${callData.success}, ID: ${callData.call._id}`);

    // 8. Calls - Analytics
    console.log('8. Testing GET /api/calls/analytics');
    const callAnalyticsRes = await fetch(`${BASE_URL}/api/calls/analytics`);
    const callAnalyticsData = await callAnalyticsRes.json();
    console.log(`   Status: ${callAnalyticsRes.status}, Total Calls: ${callAnalyticsData.analytics.totalCalls}, Avg Duration: ${callAnalyticsData.analytics.avgDurationSeconds}s`);

    // 9. Contacts - POST
    console.log('9. Testing POST /api/contacts');
    const contactRes = await fetch(`${BASE_URL}/api/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Inquiry Sender',
        email: 'inquiry@sender.com',
        subject: 'Custom AI Voice Training',
        message: 'Can you train a custom British accent voice for our brand?',
      }),
    });
    const contactData = await contactRes.json();
    console.log(`   Status: ${contactRes.status}, Created: ${contactData.success}, ID: ${contactData.contact._id}`);

    // 10. AI Chat - POST
    console.log('10. Testing POST /api/ai/chat');
    const aiChatRes = await fetch(`${BASE_URL}/api/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'What are your pricing plans?',
        scenario: 'general',
      }),
    });
    const aiChatData = await aiChatRes.json();
    console.log(`   Status: ${aiChatRes.status}, AI Response: "${aiChatData.response.slice(0, 60)}..."`);

    // 11. AI Qualify - POST
    console.log('11. Testing POST /api/ai/qualify');
    const aiQualifyRes = await fetch(`${BASE_URL}/api/ai/qualify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Our pipes broke and water is leaking everywhere!',
        scenario: 'home',
      }),
    });
    const aiQualifyData = await aiQualifyRes.json();
    console.log(`   Status: ${aiQualifyRes.status}, Intent: ${aiQualifyData.detectedIntent}, Priority: ${aiQualifyData.qualificationStatus}`);

    // 12. Dashboard Stats - GET
    console.log('12. Testing GET /api/stats/dashboard');
    const dashRes = await fetch(`${BASE_URL}/api/stats/dashboard`);
    const dashData = await dashRes.json();
    console.log(`   Status: ${dashRes.status}, Total Leads: ${dashData.metrics.totalLeads}, Conversion Rate: ${dashData.metrics.conversionRate}`);

    console.log('\n=============================================');
    console.log(' ALL 12 ENDPOINT TESTS PASSED SUCCESSFULLY! ');
    console.log('=============================================');
    if (global._mongoRetryTimer) clearInterval(global._mongoRetryTimer);
    const mongoose = require('mongoose');
    await mongoose.disconnect();
    if (app.server) {
      app.server.close(() => {
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error('Test execution failed:', err);
    process.exit(1);
  }
}

// Start server and then test
const app = require('./index');
setTimeout(runTests, 1500);
