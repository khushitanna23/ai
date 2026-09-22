const mongoose = require('mongoose');

let isConnected = false;

// Event listeners for Mongoose connection lifecycle
mongoose.connection.on('connected', () => {
  isConnected = true;
  console.log(`[Vedanco AI Database] MongoDB connection established successfully.`);
});

mongoose.connection.on('error', (err) => {
  console.error(`[Vedanco AI Database] MongoDB connection error:`, err.message);
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn(`[Vedanco AI Database] MongoDB disconnected.`);
});

/**
 * Connect to MongoDB Atlas or local MongoDB instance
 */
const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vedanco_ai';
  
  console.log(`[Vedanco AI Database] Attempting connection to MongoDB...`);
  
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000, // 10s timeout ideal for Atlas
      autoIndex: true,
    });
    
    isConnected = true;
    const isAtlas = mongoUri.includes('mongodb.net') || mongoUri.startsWith('mongodb+srv://');
    console.log(`====================================================`);
    console.log(`[Vedanco AI Database] Connected: ${conn.connection.host}`);
    console.log(`[Vedanco AI Database] Database Name: ${conn.connection.name}`);
    console.log(`[Vedanco AI Database] Mode: ${isAtlas ? 'MongoDB Atlas (Cloud)' : 'MongoDB Local'}`);
    console.log(`====================================================`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.warn(`----------------------------------------------------`);
    console.warn(`[Vedanco AI Database Warning] Could not connect to MongoDB.`);
    console.warn(`Reason: ${error.message}`);
    if (error.message.includes('whitelist') || error.message.includes('Could not connect to any servers') || error.message.includes('tlsv1 alert')) {
      console.warn(`\n👉 [SOLUTION FOR MONGODB ATLAS]:`);
      console.warn(`   1. Open cloud.mongodb.com`);
      console.warn(`   2. Click 'Network Access' on the left menu under Security`);
      console.warn(`   3. Click 'Add IP Address' -> Select 'Allow Access From Anywhere' (0.0.0.0/0)`);
      console.warn(`   4. Click 'Confirm' (takes ~30 seconds to activate)\n`);
    }
    console.warn(`=> Fallback activated: Operating smoothly with In-Memory Database store.`);
    console.warn(`----------------------------------------------------`);

    // Auto-retry connecting every 20 seconds in background until Atlas IP whitelist is active
    if (!global._mongoRetryTimer) {
      global._mongoRetryTimer = setInterval(async () => {
        if (!isConnected) {
          console.log(`[Vedanco AI Database] Retrying connection to MongoDB Atlas...`);
          const retryConn = await connectDB();
          if (retryConn) {
            clearInterval(global._mongoRetryTimer);
            global._mongoRetryTimer = null;
          }
        }
      }, 20000);
      if (global._mongoRetryTimer.unref) {
        global._mongoRetryTimer.unref();
      }
    }
    return null;
  }
};

const getIsConnected = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

const getConnectionInfo = () => {
  const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  const stateCode = mongoose.connection.readyState;
  const mongoUri = process.env.MONGODB_URI || '';
  const isAtlas = mongoUri.includes('mongodb.net') || mongoUri.startsWith('mongodb+srv://');

  return {
    isConnected: getIsConnected(),
    state: states[stateCode] || 'Unknown',
    host: mongoose.connection.host || 'none',
    databaseName: mongoose.connection.name || 'in-memory',
    type: isAtlas ? 'MongoDB Atlas Cloud' : (getIsConnected() ? 'Local MongoDB' : 'In-Memory Fallback'),
  };
};

module.exports = {
  connectDB,
  getIsConnected,
  getConnectionInfo,
};
