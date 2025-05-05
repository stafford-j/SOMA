const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json()); // Allows us to handle JSON data

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.method !== 'GET') {
    console.log('Request body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Request logging middleware
app.use((req, res, next) => {
  console.log("Request incoming to:", req.path);
  next();
});

// Import Routes
const authRoutes = require("./routes/auth");
const shareRoutes = require("./routes/shareRoutes");
const healthRecordRoutes = require("./routes/healthRecordRoutes");
// Temporarily commenting out access logs for MVP demo
// const accessLogRoutes = require("./routes/accessLogRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/share", shareRoutes);  // Correct path for shareRoutes
app.use("/api/health-records", healthRecordRoutes);
// Temporarily commenting out access logs for MVP demo
// app.use("/api/access-logs", accessLogRoutes);

// Home route (just for testing)
app.get("/", (req, res) => {
  res.send("Soma Companion Backend is Running!");
});

// Add some sample data for testing
const HealthRecord = require('./models/healthRecordModel');

// Create test records with a delay to ensure unique IDs
const createSampleRecords = async () => {
  // Create a test appointment record
  const sampleAppointment = HealthRecord.addRecord(
    "1742961914546", // userId
    "annual_physical",
    "Annual Check-up",
    {
      details: "Regular check-up with Dr. Smith",
      date: "2025-11-01", // Set to November 1, 2025 for upcoming appointments
      location: "Central Hospital",
      doctor: "Dr. Smith",
      duration: "30 minutes",
      reason: "Annual wellness exam",
      followUp: {
        required: true,
        date: "2026-11-01",
        notes: "Follow up in 12 months"
      }
    },
    "medical" // Specialty: medical
  );
  
  // Small delay to ensure unique IDs
  await new Promise(resolve => setTimeout(resolve, 10));
  
  // Create a test imaging record
  const sampleImaging = HealthRecord.addRecord(
    "1742961914546", // userId
    "imaging",
    "Spinal MRI",
    {
      details: "MRI of lumbar spine",
      date: new Date().toISOString().split('T')[0],
      location: "Radiology Center",
      doctor: "Dr. Radiology",
      reason: "Lower back pain",
      diagnosis: "L5-S1 disc herniation"
    },
    "medical" // Specialty: medical
  );
  
  // Small delay to ensure unique IDs
  await new Promise(resolve => setTimeout(resolve, 10));
  
  // Create a test trigger point therapy record
  const sampleTherapy = HealthRecord.addRecord(
    "1742961914546", // userId
    "trigger_point",
    "Trigger Point Therapy Session",
    {
      details: "Therapy session focusing on back trigger points",
      date: "2025-03-15",
      location: "Wellness Center",
      doctor: "Dr. Thompson",
      reason: "Muscle tension and back pain",
      diagnosis: "Myofascial pain syndrome"
    },
    "massage" // Specialty: massage
  );
  
  console.log("Sample data added successfully!");
};

// Execute the function to create sample records
createSampleRecords().catch(err => console.error("Error creating sample data:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));