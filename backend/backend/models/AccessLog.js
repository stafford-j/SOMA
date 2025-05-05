const mongoose = require('mongoose');

// Access Log Schema
const AccessLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User'  // Reference to the User model
  },
  recordId: {
    type: String,
    required: true
  },
  accessType: {
    type: String,
    enum: ['VIEW', 'SHARE', 'EDIT'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String
  },
  deviceInfo: {
    type: String
  }
});

// Create the model
const AccessLog = mongoose.model('AccessLog', AccessLogSchema);

module.exports = AccessLog;