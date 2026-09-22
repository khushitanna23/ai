require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, getConnectionInfo } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Route imports
const leadsRouter = require('./routes/leads');
const appointmentsRouter = require('./routes/appointments');
const callsRouter = require('./routes/calls');
const contactsRouter = require('./routes/contacts');
const aiRouter = require('./routes/ai');
const statsRouter = require('./routes/stats');

const app = express();
const PORT = process.env.PORT || 5000;
// CORS already required above and applied below

// Connect to Database
connectDB();

// Core Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging (clean format)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    if (req.originalUrl.startsWith('/api')) {
      const duration = Date.now() - start;
      console.log(`[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    }
  });
  next();
});

// Health Check Endpoint (Comprehensive)
app.get('/api/health', (req, res) => {
  const dbInfo = getConnectionInfo();
  res.json({
    status: 'ok',
    service: 'Vedanco AI Receptionist API Platform',
    brand: 'Vedanco AI',
    domain: 'ai.vedanco.com',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: dbInfo,
    endpoints: {
      leads: '/api/leads',
      appointments: '/api/appointments',
      calls: '/api/calls',
      contacts: '/api/contacts',
      aiChat: '/api/ai/chat',
      aiScenarios: '/api/ai/scenarios',
      aiQualify: '/api/ai/qualify',
      aiSummarize: '/api/ai/summarize',
      dashboardStats: '/api/stats/dashboard',
    },
  });
});

// API Routes Registration
app.use('/api/leads', leadsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/calls', callsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/ai', aiRouter);
app.use('/api/stats', statsRouter);

// Serve client build in production if available
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send('Vedanco AI Platform API is running. Client is in development mode on http://localhost:5173');
    }
  });
});

// 404 & Global Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`   VEDANCO AI - 24/7 AI RECEPTIONIST SERVER`);
  console.log(`   Port:     http://localhost:${PORT}`);
  console.log(`   Health:   http://localhost:${PORT}/api/health`);
  console.log(`   Stats:    http://localhost:${PORT}/api/stats/dashboard`);
  console.log(`====================================================`);
});

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('\nGracefully shutting down Vedanco AI Server...');
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});

app.server = server;
module.exports = app;
