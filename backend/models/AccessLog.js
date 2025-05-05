const mongoose = require('mongoose');

const AccessLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  recordId: {
    type: String,
    required: true
  },
  accessType: {
    type: String,
    enum: ['VIEW', 'EDIT', 'SHARE'],
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

// For MVP: since we're not using actual MongoDB, let's create a mock model
const mockAccessLogs = [];

const mockAccessLogModel = {
  find: function(query) {
    let results = [...mockAccessLogs];
    
    // Basic filtering
    if (query.recordId) {
      results = results.filter(log => log.recordId === query.recordId);
    }
    
    // Date filtering
    if (query.timestamp) {
      if (query.timestamp.$gte) {
        results = results.filter(log => new Date(log.timestamp) >= query.timestamp.$gte);
      }
      if (query.timestamp.$lte) {
        results = results.filter(log => new Date(log.timestamp) <= query.timestamp.$lte);
      }
    }
    
    // Sort, skip, limit chain methods
    return {
      sort: function() {
        // Sort by timestamp descending (newest first)
        results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        return this;
      },
      skip: function(n) {
        results = results.slice(n);
        return this;
      },
      limit: function(n) {
        results = results.slice(0, n);
        return this;
      },
      // Final execution returns the results
      exec: function() {
        return Promise.resolve(results);
      },
      // If exec is not called, just return the results
      then: function(resolve) {
        resolve(results);
        return Promise.resolve(results);
      }
    };
  }
};

// Constructor for new log entries
function AccessLog(data) {
  this.userId = data.userId;
  this.recordId = data.recordId;
  this.accessType = data.accessType;
  this.timestamp = new Date();
  this.ipAddress = data.ipAddress || 'Unknown';
  this.deviceInfo = data.deviceInfo || 'Unknown';
  
  // Add an ID for reference
  this._id = Date.now().toString();
}

AccessLog.find = mockAccessLogModel.find;
AccessLog.prototype.save = function() {
  mockAccessLogs.push(this);
  return Promise.resolve(this);
};

module.exports = AccessLog;