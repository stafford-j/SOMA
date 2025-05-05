const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();
const PORT = 8088;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage (placeholder for Autonomi storage)
const healthRecords = {};

// Health check endpoint
app.get('/health', (req, res) => {
  res.send('Autonomi bridge service is running');
});

// Store a health record
app.post('/records', (req, res) => {
  const record = req.body;
  const recordId = 'record_' + Date.now();
  
  // Store the record in our in-memory database
  // This would eventually be replaced with Autonomi storage
  healthRecords[recordId] = {
    ...record,
    id: recordId
  };
  
  console.log(`Stored record: ${record.title} with ID: ${recordId}`);
  
  res.json({
    status: 'success',
    message: 'Record stored (simulated Autonomi storage)',
    data: {
      id: recordId
    }
  });
});

// Retrieve a health record
app.get('/records/:id', (req, res) => {
  const recordId = req.params.id;
  
  if (healthRecords[recordId]) {
    res.json(healthRecords[recordId]);
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Record not found'
    });
  }
});

// List all records (for demo purposes)
app.get('/records', (req, res) => {
  res.json(Object.values(healthRecords));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Autonomi bridge service running at http://localhost:${PORT}`);
  console.log('Note: This is currently using in-memory storage as a placeholder for Autonomi');
});
