const express = require('express');
const router = express.Router();
const { getLeads, getLeadsStats } = require('../models/Lead');
const { getAppointments } = require('../models/Appointment');
const { getCallLogs, getCallsAnalytics } = require('../models/CallLog');
const { getConnectionInfo } = require('../config/db');

// GET /api/stats/dashboard - Combined analytics dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const [leadStats, appointments, callAnalytics] = await Promise.all([
      getLeadsStats(),
      getAppointments(),
      getCallsAnalytics(),
    ]);

    const totalLeads = leadStats.total;
    const qualifiedLeads = (leadStats.byStatus.qualified || 0) + (leadStats.byStatus.converted || 0);
    const totalAppointments = appointments.length;
    const totalCalls = callAnalytics.totalCalls;

    // Conversion rate: leads converted / total leads
    const conversionRate = totalLeads > 0
      ? ((qualifiedLeads / totalLeads) * 100).toFixed(1) + '%'
      : '0.0%';

    const dbInfo = getConnectionInfo();

    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      database: dbInfo,
      metrics: {
        totalLeads,
        qualifiedLeads,
        totalCalls,
        totalAppointments,
        conversionRate,
        averageCallDurationSec: callAnalytics.avgDurationSeconds,
      },
      leadBreakdown: leadStats.byStatus,
      callBreakdown: callAnalytics.byStatus,
      scenarioBreakdown: callAnalytics.byScenario,
    });
  } catch (error) {
    console.error('[Vedanco AI] Error generating dashboard stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate dashboard analytics.',
    });
  }
});

module.exports = router;
